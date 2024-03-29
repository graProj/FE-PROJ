const { app, BrowserWindow } = require("electron");
const path = require("path");
const robot = require("@hurdlegroup/robotjs");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);

  win.on("closed", function () {
    win = null;
  });

  // 마우스 클릭 코드와 콘솔 출력 추가
  setTimeout(() => {
    console.log("마우스 클릭을 수행하기 전");
    robot.mouseClick();
    console.log("마우스 클릭을 수행한 후");
  }, 7000);
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
