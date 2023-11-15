/* Main Program */

const File = require("./file")
const { app, BrowserWindow, Menu } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    win.loadFile('index.html')

    win.webContents.openDevTools()
}

const createMenu = () => {
    const isMac = process.platform === 'darwin'

    let file = new File()

    const template = [
        ...(isMac
            ? [{
                label: app.name,
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    { role: 'services' },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideOthers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            }]
            : []),
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open File',
                    click: async () => {
                        console.log("Open file")
                        file.open_file()
                    }
                },
                {
                    label: 'Save',
                    click: async () => {
                        console.log("Save file")
                        file.save_file()
                    }
                },
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(isMac
                    ? [
                        { type: 'separator' },
                        { role: 'front' },
                        { type: 'separator' },
                        { role: 'window' }
                    ]
                    : [
                        { role: 'close' }
                    ])
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: async () => {
                        const { shell } = require('electron')
                        await shell.openExternal('https://electronjs.org')
                    }
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
    createWindow()
    createMenu()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
            createMenu()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
