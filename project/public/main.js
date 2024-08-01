const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron/main')
const path = require('node:path')
const robot = require("@hurdlegroup/robotjs");

const io = require("socket.io-client")("http://3.39.22.211:5004/");

app.whenReady().then(() => {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadURL('http://localhost:3000');
  ipcMain.on('ping', async (event)=>{
    const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
    for (const source of sources) {
      if (source.id === 'screen:0:0') {
        console.log(source.thumbnail.toJPEG(0.5))
        event.returnValue = source.id
      }
  }});
  
  ipcMain.on('remote-coordinates', (event, coordinates) => {
 
    let { remoteX, remoteY, eventType } = coordinates;
    if(eventType === 'mousedown')
    {
      console.log('isMousedown?')
      robot.moveMouse(remoteX,remoteY);
      robot.mouseToggle("down");
      
    }
    else if(eventType === 'mouseup'){
      console.log("isMouseUp?")
      robot.dragMouse(remoteX, remoteY);
      robot.mouseToggle("up");
    }
    
  });
  ipcMain.on('remote-keyPress', (event, String) => {
    let pressedKey = String.toLowerCase();
    let askiiStr = pressedKey.charCodeAt(0);
    if(pressedKey!=='meta'){if(askiiStr<12593||askiiStr> 12643 ){
      robot.keyToggle(pressedKey, 'down'); // 키를 누른 상태로 변경

      setTimeout(() => {
          robot.keyToggle(pressedKey, 'up'); // 0.5초 후에 키를 뗀 상태로 변경
      }, 500);
    }
    else return; 
    }
    else return;
    // 여기서 pressedKey 변수를 원하는 대로 처리할 수 있습니다
  });
  setInterval(async () => {
    try {
      const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
      for (const source of sources) {
        if (source.id === 'screen:0:0') {
          console.log('Captured screen at', new Date());
          source.thumbnail.toJPEG(0.5);
        }
      }
    } catch (error) {
      console.error('Error capturing screen:', error);
    }
  }, 10000); // 10000ms = 10초

});


