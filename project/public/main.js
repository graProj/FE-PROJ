const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron/main')
const path = require('node:path')

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
});


