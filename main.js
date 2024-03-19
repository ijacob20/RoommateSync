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
  /* win.setPosition(-6, -1); */

  win.loadFile('views/chores.html')
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