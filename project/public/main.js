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
      console.log(source)
      if (source.name === '전체 화면') {
        console.log(source.id)
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
// const text = "원격 테스트"
//   setTimeout(() => {
//     const screenSize = robot.getScreenSize();
//     let centerX = screenSize.width / 2;
//     let centerY = screenSize.height / 2;
//     robot.moveMouse(centerX, centerY);
//     centerX = 558 
//     centerY = 640
//     robot.scrollMouse(500, 0);
//     robot.moveMouseSmooth(centerX, centerY);
//     setTimeout(() => {
//       robot.mouseClick();
//       for (let i = 0; i < text.length; i++) {
//         setTimeout((char) => {
//             robot.typeString(char);
//             console.log(char);
//         }, 200 * i, text[i]);
//     }
//   }, 500);
  
//   }, 5000);

});


