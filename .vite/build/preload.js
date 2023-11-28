"use strict";const{contextBridge:t,ipcRenderer:n}=require("electron");t.exposeInMainWorld("electronAPI",{handleSetContent:e=>n.on("set-content",e),handleGetContent:e=>n.on("get-content",e)});
