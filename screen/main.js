const { app , BrowserWindow } = require('electron');

app.on('ready', ()=>{

    // Import screen module when our app is ready
    const {screen} = require('electron');

    // Get sizes
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;

    let window = new BrowserWindow({width:width, height:height});

    window.loadFile('index.html')

});