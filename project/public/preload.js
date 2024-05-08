const { contextBridge} = require('electron');
const { ipcRenderer } = require('electron/renderer');


    
contextBridge.exposeInMainWorld('display', {
  source: async() => { 
    const sourceId = ipcRenderer.sendSync('ping'); 
    console.log("sourId:",sourceId)
    
    return sourceId;
  }
   
})
contextBridge.exposeInMainWorld('remote', {
  source: (remoteX, remoteY) => {
    const width = window.screen.width * window.devicePixelRatio;
    const height = window.screen.height * window.devicePixelRatio;
    remoteX =  remoteX * (width/700);
    remoteY = remoteY*(height/(700*(height/ width)));
    console.log(width)
    console.log(height)
    ipcRenderer.send('remote-coordinates', { remoteX, remoteY });
  },
  key: (pressedKey) => { 
    ipcRenderer.send('remote-keyPress', pressedKey); //ressedKey를 직접 인자로 전달
  }
});