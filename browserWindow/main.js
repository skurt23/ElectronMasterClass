const { app , BrowserWindow } = require('electron');

// Require electron-reload
require('electron-reload')(__dirname);

app.on('ready', ()=>{

    let window = new BrowserWindow({
        width:600,
        height:600,
        show: false, // Show BrowserWindow
        frame: false, // Hide frame
        // titleBarStyle: 'hidden', - Alternative for MacOS of frame=false
        // parent: window - Parent of this window
        // x: 600 - X position
        // y: 600 - Y position
        // center: true - Center
        // resizable: true - Allow resize your window
        // modal: true - Its a modal
        // backgroungColor: '#FFF' - Background color
        // darkTheme: true - Dark Theme for your app
        // webPreferences: {devTools: false - Disable devtools, javascript: false - Disable Javascript} - Set your web settings
    });
    window.loadFile('index.html');


    // BrowserWindow.getAllWindows() - Get all windows

    // BrowserWindow.addExtension(path) - Add Chrome extension
    // BrowserWindow.addDevToolsExtension(path) - Add Devtools extension

    // Window ready to show handler
    // window.on('ready-to-show', ()=>{
    //      window.show()
    // });

    // Web did finish load event handler
    window.webContents.on("did-finish-load", () => {
        window.show()
    });

    // Window closed event handler
    window.on('close', () => {
        window = null;
    });

});