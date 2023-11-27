/* Main Program */

const File = require('./file')
const { app, BrowserWindow, Menu, nativeTheme, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    win.loadFile('src/index.html')

    win.webContents.openDevTools()

    return win;
}

const createMenu = (win) => {
    const isMac = process.platform === 'darwin'

    const file = new File()

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
                    accelerator: 'CommandOrControl+O',
                    click: () => {
                        file.open_file()
                        console.log('Open file')
                    }
                },
                {
                    label: 'Save',
                    accelerator: 'CommandOrControl+S',
                    click: () => {
                        win.webContents.send('get-content')
                        console.log('Save file')
                    }
                },
                {
                    click: () => win.webContents.send('update-counter', 1),
                    label: 'Increment'
                },
                {
                    click: () => win.webContents.send('update-counter', -1),
                    label: 'Decrement'
                }
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
                        await shell.openExternal('https://github.com/sagedemage/TextEditor2')
                    }
                }
            ]
        }
    ]

    // IPC
    ipcMain.on('write-content', (event, file_content) => {
        file.save_file(file_content)
    })

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

// use the system's theme
nativeTheme.themeSource = 'system'

app.whenReady().then(() => {
    ipcMain.on('counter-value', (_event, value) => {
        console.log(value) // will print value to Node console
    })

    const win = createWindow()
    createMenu(win)

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
