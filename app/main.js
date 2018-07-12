const { app , BrowserWindow } = require('electron');

const devtron = require('devtron');

app.on('ready', ()=>{

    // Install Devtron extension for devtools
    devtron.install();

    // Create our window
    let window = new BrowserWindow({width:600, height:600});

    // Load our HTML file
    window.loadFile(`${__dirname}/index.html`)

});

// All windows closed event handler
app.on('window-all-closed', function() {

    // If you are on MacOS, then app.quit()
    if (process.platform == 'darwin') {
        app.quit();
    }
});

// Blur event handler
app.on('browser-window-blur', function() {
    //Pierde el foco y se ejecuta la función
        console.log('blur')
});

// Focus event handler
app.on('browser-window-focus', function() {
    console.log('focus')
});



