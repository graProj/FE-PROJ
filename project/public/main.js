const { app, BrowserWindow } = require("electron");
const path = require("path");

let win;

function createWindow() {
  // 동적 import를 통해 electron-is-dev 모듈을 가져옵니다.
  import('electron-is-dev').then((isDev) => {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    win.loadURL(
      isDev.default // import로 가져온 모듈은 .default로 접근합니다.
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );

    win.on("closed", function () {
      win = null;
    });
  }).catch((err) => {
    console.error("Error loading electron-is-dev module:", err);
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (win === null) {
    createWindow();
  }
});
