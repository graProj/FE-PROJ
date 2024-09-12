const { app, BrowserWindow, ipcMain, desktopCapturer, screen } = require('electron/main');
const path = require('node:path');
const Inko = require('inko')
const robot = require("@hurdlegroup/robotjs");
const os = require('os');
const platform = os.platform();
let isHangul = false;
let inko = new Inko();
app.whenReady().then(() => {
  
  const primaryDisplay = screen.getPrimaryDisplay();
  let width=0;
  let height=0;
  
  const dict = {
    "arrowright" : "right",
    "arrowleft" : "left",
    "arrowup" : "up",
    "arrowdown" : "down",
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // frame:false,
    // resizable:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // 추가
    },
  });
  


  // mainWindow.removeMenu();
  // Ensure this path is correct and points to your React app's entry point
  mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  if (platform === 'win32') {
    const primaryDisplay = screen.getPrimaryDisplay();
    width = primaryDisplay.bounds.width*primaryDisplay.scaleFactor;
    height = primaryDisplay.bounds.height*primaryDisplay.scaleFactor;
  } 
  else if (platform === 'darwin') {
    width = primaryDisplay.size.width;
    height = primaryDisplay.size.height;
  }
  ipcMain.on('close', () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });
  ipcMain.on('resize', () => {
    mainWindow.setResizable(true);
    mainWindow.setSize(300,300);
    mainWindow.setResizable(false);
  })
  ipcMain.on('default', () => {
    mainWindow.setResizable(true);
    mainWindow.setSize(800,600);
    mainWindow.setResizable(false);

  })
  ipcMain.handle('ping', async () => {
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    return sources[0].id;
});
 
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorDescription);
  });

   ipcMain.on('remote-coordinates', (event, coordinates) => {
    let { remoteX, remoteY, eventType } = coordinates;
    remoteX = remoteX *(width/1536);
    remoteY = remoteY *(height/864);
    
    if (eventType === 'mousedown') {
      robot.mouseToggle("down", "left");
    }
    else if (eventType === 'mouseup') {
      robot.mouseToggle("up", "left");
    }
    else if (eventType === 'right-mouseup') {
      robot.mouseToggle("up", "right");
    }
    else if (eventType === 'right-mousedown') {
      robot.mouseToggle("down", "right");
    }
    else if (eventType === 'mousemove') {
      robot.moveMouseSmooth(remoteX, remoteY,1);
    } 
  
  });
   // isHangul을 false로 초기화
  ipcMain.on('keydown', (event, String) => {
    
    try {
      let askiiStr;
      let pressedKey = String.toLowerCase();
      if(pressedKey.length===1){
        askiiStr= pressedKey.charCodeAt(0);
      }
      else{
        askiiStr = `\+${pressedKey.charCodeAt(0)}`.charCodeAt(0);
      }
      
      if (pressedKey === 'hangulmode') {
        isHangul = !isHangul; // 'hangulmode' 키를 눌렀을 때만 isHangul을 토글
        return;
      }
      // 다른 키를 눌렀을 때 isHangul이 변경되지 않도록 함
      if (pressedKey in dict) {
        let value = dict[pressedKey];
        robot.keyToggle(value, 'down');
        return;
      }
      if (pressedKey !== 'meta' && pressedKey !== 'process') {
        if (askiiStr < 12593 || askiiStr > 12643) {
          if (isHangul && 33<=askiiStr<=126) {
            let hangulKey = inko.en2ko(pressedKey);
            robot.typeString(hangulKey);
          } else {
            robot.keyToggle(pressedKey, 'down');
          }
        } else {
          robot.typeString(pressedKey);
        }
      }
    } catch {
      return;
    }
  });
  ipcMain.on('keyup', (event, String) => {
    try {
      let pressedKey = String.toLowerCase();
    let askiiStr = pressedKey.charCodeAt(0);
    if (pressedKey === 'hangulmode') {
      return;
    }
    if(pressedKey in dict){
      let value = dict[pressedKey];
      robot.keyToggle(value, 'up');
      return;
    }
    if (pressedKey !== 'meta'||pressedKey !== 'process') {
      if (askiiStr < 12593 || askiiStr > 12643) {
        if (isHangul) {
          return;
        } else {
          robot.keyToggle(pressedKey, 'up');
          robot.unicodeTap
        }
      } else return;
    } else return;}
    catch{
      return;
    }
  });
  ipcMain.on('image', async (event) => {s
    try {
      const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
      const source = sources[0];
      const image = source.thumbnail.toDataURL();
      event.returnValue = image;
      
    } catch (error) {
      event.returnValue = null;
    }
  });
});
