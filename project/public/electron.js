const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron/main');
const path = require('node:path');
const robot = require("@hurdlegroup/robotjs");

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // Ensure this path is correct and points to your React app's entry point
  mainWindow.loadFile(`${path.join(__dirname, "../build/index.html")}`);

  ipcMain.on('ping', async (event)=>{
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    event.returnValue = sources[0].id
    // for (const source of sources) {
    //   console.log(source)
    //   if (source.id === 'screen:0:0') {
    //     console.log(source.id)
    //     event.returnValue = source.id
    //   }
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorDescription);
  });

  ipcMain.on('remote-coordinates', (event, coordinates) => {
    let { remoteX, remoteY, eventType } = coordinates;
    if (eventType === 'mousedown') {
      console.log('isMousedown?');
      robot.moveMouse(remoteX, remoteY);
      robot.mouseToggle("down");
    } else if (eventType === 'mouseup') {
      console.log("isMouseUp?");
      robot.dragMouse(remoteX, remoteY);
      robot.mouseToggle("up");
    }
  });

  ipcMain.on('remote-keyPress', (event, String) => {
    let pressedKey = String.toLowerCase();
    let askiiStr = pressedKey.charCodeAt(0);
    if (pressedKey !== 'meta') {
      if (askiiStr < 12593 || askiiStr > 12643) {
        robot.keyToggle(pressedKey, 'down');
        setTimeout(() => {
          robot.keyToggle(pressedKey, 'up');
        }, 500);
      } else return;
    } else return;
  });
  ipcMain.on('image', async (event) => {
    try {
      const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
      for (const source of sources) {
        if (source.id === 'screen:0:0') {
          console.log('Captured screen at', new Date());
          const image = source.thumbnail.toDataURL();
          event.returnValue = image;
        }
      }
    } catch (error) {
      console.error('Error capturing screen:', error);
      event.returnValue = null;
    }
  });
});