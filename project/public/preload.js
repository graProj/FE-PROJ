const { contextBridge } = require('electron');
const { ipcRenderer } = require('electron/renderer');

window.addEventListener('DOMContentLoaded', () => {
  const dragElement = document.querySelector('.draggable');
  const closeElement = document.querySelector('.close-window');
  dragElement.addEventListener('mousedown', (event) => {
    ipcRenderer.send('start-drag', { x: event.screenX, y: event.screenY });
  });
  closeElement.addEventListener('click', () => {
    ipcRenderer.send('close')
  });
  
});

contextBridge.exposeInMainWorld('display', {
  source: async () => { 
    const sourceId = await ipcRenderer.invoke('ping'); 
    console.log("sourceId:", sourceId);
    return sourceId;
  },
  resize : () => {
    console.log("실행함?")
    ipcRenderer.send('resize')
  },
  default : () => {
    console.log("실행함?")
    ipcRenderer.send('default')
  },
  image: async () => {
    const source = ipcRenderer.sendSync('image');
    return source;
  }
   
})
contextBridge.exposeInMainWorld('remote', {
  source: (remoteX, remoteY, eventType) => {
    // const width = window.screen.width * window.devicePixelRatio;
    // const height = window.screen.height * window.devicePixelRatio;
    // remoteX =  remoteX * (width/1000);
    // remoteY = remoteY*(height/(1000*(height/ width)));
    ipcRenderer.send('remote-coordinates', { remoteX, remoteY ,eventType });
  },
  keyup: (pressedKey) => { 
    ipcRenderer.send('keyup', pressedKey); //ressedKey를 직접 인자로 전달
  },
  keydown: (pressedKey) => { 
    ipcRenderer.send('keydown', pressedKey); //ressedKey를 직접 인자로 전달
  },
  escape: (pressedKey) => {
    ipcRenderer.send('keyup', pressedKey);
  }
});
