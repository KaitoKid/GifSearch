const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const Tray = electron.Tray
const Menu = electron.Menu

// Launch window on shortcut
const globalShortcut = electron.globalShortcut

app.on('ready', function() {
  globalShortcut.register('CommandOrControl+Alt+G', function() {
    if (mainWindow.isDestroyed()) {
      createWindow()
    } else {
      mainWindow.destroy();
      createWindow();
    }
  })
})

app.on('will-quit', function() {
  globalShortcut.unregisterAll()
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
    skipTaskbar: true
  }))

  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, iconName)
  appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([{
    label: 'Remove',
    click: function () {
      event.sender.send('tray-removed')
    }
  }])
  appIcon.setToolTip('Electron Demo in the tray.')
  appIcon.setContextMenu(contextMenu)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  //mainWindow.on('closed', function () {
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  //mainWindow = null
  //})

  // Minimize to tray
  mainWindow.on('minimize', function(event) {
    event.preventDefault()
    mainWindow.hide();
  });

  // Close to tray
  mainWindow.on('close', function(event) {
    //event.preventDefault()
    mainWindow.hide();
  });

  // Make menu
  //const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Menu.setApplicationMenu(contextMenu);

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
