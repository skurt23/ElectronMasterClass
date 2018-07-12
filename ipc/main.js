const { app , BrowserWindow, ipcMain } = require('electron');


app.on('ready', ()=>{

    require('devtron').install();

    let window = new BrowserWindow({width:600, height:600});

    window.loadFile('index.html');

    // Subscribe to our event with ipcMain
    ipcMain.on('send', function (event, data) {
        console.log(data);

        // Send text to renderer process with a new event
        event.sender.send('return', 'Vuelve al Renderer')
    })

});