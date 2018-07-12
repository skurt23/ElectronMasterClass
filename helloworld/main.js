const { app , BrowserWindow } = require('electron');

app.on('ready', ()=>{

    let window = new BrowserWindow({width:600, height:600});

    window.loadFile('index.html')

});