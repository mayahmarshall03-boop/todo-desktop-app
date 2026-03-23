const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 900,
    minWidth: 500,
    minHeight: 600,
    resizable: true,
    center: true
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);