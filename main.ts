const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({ width: 1024, height: 768 });
  win.loadFile('dist/ultra-marketplace/index.html');
}

app.whenReady().then(() => {
  createWindow();
});
