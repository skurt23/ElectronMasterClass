const { app , BrowserWindow, globalShortcut, Menu } = require('electron');

// Create our template
const template = [
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'pasteandmatchstyle'},
            {role: 'delete'},
            {role: 'selectall'}
        ]
    },
    {
        label: 'View',
        submenu: [
            {role: 'reload'},
            {role: 'forcereload'},
            {role: 'toggledevtools'},
            {type: 'separator'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
        ]
    },
    {
        role: 'window',
        submenu: [
            {role: 'minimize'},
            {role: 'close'}
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                accelerator: 'Command+K',
                click () { require('electron').shell.openExternal('https://plataforma.keepcoding.io') }
            }
        ]
    }
];

// If we are on MacOS
if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'services', submenu: []},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}
        ]
    });

    // Edit menu
    template[1].submenu.push(
        {type: 'separator'},
        {
            label: 'Speech',
            submenu: [
                {role: 'startspeaking'},
                {role: 'stopspeaking'}
            ]
        }
    );

    // Window menu
    template[3].submenu = [
        {role: 'close'},
        {role: 'minimize'},
        {role: 'zoom'},
        {type: 'separator'},
        {role: 'front'}
    ]
}

// Create Menu object from template
const menu = Menu.buildFromTemplate(template);

app.on('ready', ()=>{


    // Register a Global Shortcut
    const ret = globalShortcut.register('Ctrl+E', () => {
        console.log('CtrlE is pressed')
    });

    let window = new BrowserWindow({width:600, height:600});

    window.loadFile('index.html');

    // Open devTools
    window.openDevTools();

    // Set our menu
    Menu.setApplicationMenu(menu);
});

app.on('will-quit', () => {

    // Unregister our Global Shortcuts
   globalShortcut.unregister('Ctrl+E');
   globalShortcut.unregisterAll()
});