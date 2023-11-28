"use strict";const m=require("./file"),{app:o,BrowserWindow:c,Menu:l,nativeTheme:w,ipcMain:b}=require("electron"),a=require("node:path"),i=()=>{const e=new c({width:800,height:600,webPreferences:{nodeIntegration:!0,contextIsolation:!0,enableRemoteModule:!0,preload:a.join(__dirname,"preload.js")}});return e.loadFile(a.join(__dirname,"../renderer/main_window/index.html")),e.webContents.openDevTools(),e},s=e=>{const t=process.platform==="darwin",r=new m,p=[...t?[{label:o.name,submenu:[{role:"about"},{type:"separator"},{role:"services"},{type:"separator"},{role:"hide"},{role:"hideOthers"},{role:"unhide"},{type:"separator"},{role:"quit"}]}]:[],{label:"File",submenu:[{label:"Open File",accelerator:"CommandOrControl+O",click:()=>{r.open_file()}},{label:"Save",accelerator:"CommandOrControl+S",click:()=>{e.webContents.send("get-content")}}]},{label:"View",submenu:[{role:"reload"},{role:"forceReload"},{role:"toggleDevTools"},{type:"separator"},{role:"resetZoom"},{role:"zoomIn"},{role:"zoomOut"},{type:"separator"},{role:"togglefullscreen"}]},{label:"Window",submenu:[{role:"minimize"},...t?[{type:"separator"},{role:"front"},{type:"separator"},{role:"window"}]:[{role:"close"}]]},{role:"help",submenu:[{label:"Learn More",click:async()=>{const{shell:n}=require("electron");await n.openExternal("https://github.com/sagedemage/TextEditor2")}}]}];b.on("write-content",(n,d)=>{r.save_file(d)});const u=l.buildFromTemplate(p);l.setApplicationMenu(u)};w.themeSource="system";o.whenReady().then(()=>{const e=i();s(e),o.on("activate",()=>{c.getAllWindows().length===0&&(i(),s())})});o.on("window-all-closed",()=>{process.platform!=="darwin"&&o.quit()});
