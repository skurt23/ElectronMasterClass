/**
 * If you want to try the Touchbar, you must open Xcode -> Window menu -> Show Touchbar
 */

const { app , BrowserWindow } = require('electron');

// Import our Touchbar
const touchbar = require('./touchbar');

app.on('ready', ()=>{

    let window = new BrowserWindow({width:600, height:600});

    // Set the touchbar
    window.setTouchBar(touchbar);

    window.loadFile('index.html')

});