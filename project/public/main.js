const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron/main')
const path = require('node:path')
const robot = require("@hurdlegroup/robotjs");

let mainWindow

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadURL(`http://localhost:3000/`);
  
  ipcMain.on('ping', async (event)=>{
    const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
    for (const source of sources) {
      console.log(source)
      if (source.name === '전체 화면') {
        console.log(source.id)
        event.returnValue = source.id
      }
  }});
const text = "개 피곤하다"
  setTimeout(() => {
    const screenSize = robot.getScreenSize();
    let centerX = screenSize.width / 2;
    let centerY = screenSize.height / 2;
    robot.moveMouse(centerX, centerY);
    centerX = 558 
    centerY = 640
    robot.scrollMouse(500, 0);
    robot.moveMouseSmooth(centerX, centerY);
    setTimeout(() => {
      robot.mouseClick();
      for (let i = 0; i < text.length; i++) {
        setTimeout((char) => {
            robot.typeString(char);
            console.log(char);
        }, 200 * i, text[i]);
    }
  }, 500);
  
  }, 5000);
});


