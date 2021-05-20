const {app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const fs = require("fs");

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
let mainWindow

function createWindow () {
    mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
})

    // mainWindow.loadURL(
    // url.format({
    //     pathname: path.join(__dirname, `/dist/index.html`),
    //     protocol: "file:",
    //     slashes: true
    // })
    // );

    mainWindow.loadFile(path.join(__dirname, `/dist/index.html`))

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
    mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }

/**
 * Exports out the passed addresses to the current application folder inside an output folder
 */
ipcMain.on("exportAddresses", (event, addresses) => {
    const jsonData = JSON.stringify(addresses, undefined, 2);
    const outputFile = path.join(__dirname, 'output/exported_addresses.json');
    ensureDirectoryExistence(outputFile);
    fs.writeFile(outputFile, jsonData, {
        flag: "w"
      }, (error, data) => {
        if (error){
            console.error("error: " + error);
        }
    });
});