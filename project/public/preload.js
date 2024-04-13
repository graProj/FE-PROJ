const { contextBridge } = require('electron');
const { ipcRenderer } = require('electron/renderer');


    
    
contextBridge.exposeInMainWorld('display', {
  source: async() => { 
    const sourceId = ipcRenderer.sendSync('ping'); 
    console.log("sourId:",sourceId)
    
    return sourceId;
  }
   
})