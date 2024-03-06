const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 650,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
  })
  
  // This puts the app window in the top left
  // its for convience while coding.
  /* win.setPosition(-6, -1); */

  win.loadFile('index.html')
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