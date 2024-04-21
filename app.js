// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.setMenuBarVisibility(false)
  mainWindow.setMinimumSize(800,600)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  });


  // and load the index.html of the app.
  setTimeout(function() {
    console.log('waiting ....');
    mainWindow.loadURL('http://localhost:3000/');
},1000);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');

const choreRoutes = require('./routes/choreRoutes');


// create app
const application = express();

// configure app
let port = 3000;
let host = 'localhost';
application.set("views", path.join(__dirname, "..", "/app/views"));
application.set('view engine', 'ejs');

// connect to MongoDB
mongoose.connect('mongodb+srv://demo:demo123@cluster0.pxbjzad.mongodb.net/4155-finalproject?retryWrites=true&w=majority&appName=Cluster0', 
                {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
    //start the server
    application.listen(port, host, ()=>{
    console.log('Server is running on port', port);
});
})
.catch(err=>console.log(err.message));

// mount middleware
application.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb+srv://demo:demo123@cluster0.pxbjzad.mongodb.net/4155-finalproject?retryWrites=true&w=majority&appName=Cluster0'}),
        cookie: {maxAge: 60*60*1000}
        })
);
application.use(flash());

application.use((req, res, next) => {
    // console.log(req.session);
    res.locals.user = req.session.user||null;
    // res.locals.fName = req.session.fName;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

application.use(express.static(path.join(__dirname, "..", "/app/public")));
application.use(express.urlencoded({extended: true}));
application.use(morgan('tiny'));
application.use(methodOverride('_method'));

// set up routes
application.use('/', mainRoutes);
application.use('/events', eventRoutes);
application.use('/users', userRoutes);
application.use('/chores', choreRoutes);

application.use((req, res, next)=> {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

application.use((err, req, res, next)=>{
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal server error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});

