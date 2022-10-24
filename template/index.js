
const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs');

// Load the cli generated config file
var config = JSON.parse(fs.readFileSync(path.join(__dirname,'config.json'), 'utf8'));

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname,'/assets/logo.png'),
    title: config.name
  })

  // and load the index.html of the app.
  mainWindow.loadURL(config.link)
  mainWindow.removeMenu()

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  
  mainWindow.maximize();
  mainWindow.show();
  // Stop title from changing
  mainWindow.on("page-title-updated", (e) => {
    e.preventDefault();
  });
}


app.whenReady().then(() => {
  createWindow()
  console.log(path.join(__dirname,'favicon.png'))

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

