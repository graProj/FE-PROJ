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
  source: (remoteX, remoteY, eventType) => {
    const width = window.screen.width * window.devicePixelRatio;
    const height = window.screen.height * window.devicePixelRatio;
    remoteX =  remoteX * (width/700);
    remoteY = remoteY*(height/(700*(height/ width)));
    ipcRenderer.send('remote-coordinates', { remoteX, remoteY ,eventType });
  },
  key: (pressedKey) => { 
    console.log(pressedKey.charCodeAt(0))
    ipcRenderer.send('remote-keyPress', pressedKey); //ressedKey를 직접 인자로 전달
  }
});