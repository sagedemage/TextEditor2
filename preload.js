const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
    handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
    handleContent: (callback) => ipcRenderer.on('set-content', callback)
})
