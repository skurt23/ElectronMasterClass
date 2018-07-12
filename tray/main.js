const { app , BrowserWindow, Tray, Menu } = require('electron');

app.on('ready', ()=>{
    // Create a new Tray with our icon
    appIcon = new Tray('Your Image');

    // Create menu for our Tray
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Prueba', type: 'radio'},
        {label: 'Prueba2', type: 'radio'}
    ]);

    // Set 'Prueba2' value to false
    contextMenu.items[1].checked = false;

    // Add context menu to our Tray
    appIcon.setContextMenu(contextMenu);

    let window = new BrowserWindow({width:800, height:600});

    window.loadFile('index.html')

});