const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')


const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
server.use(middlewares)
server.use(router)
server.listen(5150, () => {
  console.log('JSON Server is running at port 5150')
})

const createWindow = () => {
  const win = new BrowserWindow({

    //width: 800,
    //height: 650,
    
    //width: 1080,
    //height: 3000,


    show: false,
    width: 1024,
    height: 768,

    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      } 
    })
    
  win.setMenuBarVisibility(false)
  win.setMinimumSize(800,600)

  win.once('ready-to-show', () => {
    win.show()
  });

  
  // This puts the app window in the top left
  // its for convience while coding.
  win.setPosition(-6, -1);
  win.loadFile('./views/menu.html');

  /* win.loadFile('signup.html') */

  /* win.loadFile('index.html') */
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('goToSecondScreen', () => {
  mainWindow.loadFile('second_screen.html');
});


//configuring app to express

//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

//create application
const application = express();

//configure application
let port = 3000;
let host = 'localhost';
let url = 'mongodb+srv://demo:demo123@cluster0.pxbjzad.mongodb.net/4155-finalproject?retryWrites=true&w=majority&appName=Cluster0'
application.set('view engine', 'ejs');

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/demos', 
                {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(()=>{
  application.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

//mount middlware
application.use(express.static('public'));
application.use(express.urlencoded({extended: true}));
application.use(morgan('tiny'));
application.use(methodOverride('_method'));

application.use(session({
    secret: 'dajsdklmvsdf',
    resave: false, 
    saveUninitialized: false,
    cookie:{maxAge: 60*60*1000},
    store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/demos'})
}));

application.use(flash());

application.use((req, res, next)=>{
    //console.log(req.session);
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

//set up routes
app.get('/', (req, res)=>{
  res.render('index');
});

app.use('/users', userRoutes);

app.use((req, res, next) => {
  let err = new Error('The server cannot locate ' + req.url);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next)=>{
  console.log(err.stack);
  if(!err.status) {
      err.status = 500;
      err.message = ("Internal Server Error");
  }

  res.status(err.status);
  res.render('error', {error: err});
});