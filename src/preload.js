const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    handleSetContent: (callback) => ipcRenderer.on('set-content', callback),
    handleGetContent: (callback) => ipcRenderer.on('get-content', callback)
})
