// Import modules
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// Create our window variable
let window = null;

// All windows closed event handler
app.on('window-all-closed', function() {

    // If we are on MacOS, then app.quit()
    if (process.platform == 'darwin')
        app.quit();
});

// Wait until the app is ready
app.on('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 1200px
    width: 1200,
    // Set the initial height to 700px
    height: 700,
    // Set the title bar style
    titleBarStyle: 'hidden-inset',
    // Set the background color to black
    backgroundColor: "#111",
    // Don't show the window until it's ready, this prevents any white flickering
    show: false
  });

  // Load our HTML file
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));


  // Wait until window is ready to show
  window.on('ready-to-show', () => {
    window.show()
  });

  // Window closed event handler
  window.on('closed', () => {
    window = null;
  })

});
