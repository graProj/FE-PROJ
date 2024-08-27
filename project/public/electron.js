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
  mainWindow.loadURL('http://localhost:3000');

  ipcMain.handle('ping', async () => {
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    // for (const source of sources) {
    //   console.log(source)
    //   if (source.id === 'screen:0:0') {
    //     console.log(source.id)
    //     return source.id;
    //   }
    // }
    return sources[0].id;
});

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorDescription);
  });

  ipcMain.on('remote-coordinates', (event, coordinates) => {
    let { remoteX, remoteY, eventType } = coordinates;
    console.log(coordinates)
    if (eventType === 'mousedown') {
      console.log('isMousedown?');
      robot.moveMouse(remoteX, remoteY);
      robot.mouseClick("left");
    } 
    else if (eventType === 'mouseup') {
      console.log("isMouseUp?");
      robot.dragMouse(remoteX, remoteY);
      robot.mouseToggle("up");
    }
    else if (eventType === 'contextmenu') {
      robot.dragMouse(remoteX, remoteY);
      robot.mouseClick("right");
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
      const source = sources[0];
      const image = source.thumbnail.toDataURL();
      event.returnValue = image;
      
    } catch (error) {
      console.error('Error capturing screen:', error);
      event.returnValue = null;
    }
  });
});