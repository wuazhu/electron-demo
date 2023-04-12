import icon from '../../resources/icon.png?asset'
import { join } from 'path'
import {BrowserWindow, shell} from 'electron'
import { is } from '@electron-toolkit/utils'

let controlWin
export default function createControlWindow() {
    // Create the browser window.
    controlWin = new BrowserWindow({
      width: 1200,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        // preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
      }
    })
    controlWin.webContents.openDevTools()
  
  
    controlWin.on('ready-to-show', () => {
      controlWin.show()
    })
  
    controlWin.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
  
    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        const url = process.env['ELECTRON_RENDERER_URL']+'/control.html'
        console.log('url---',url);
      controlWin.loadURL(url)
    } else {
        console.log('else');
        controlWin.loadFile(join(__dirname, '../renderer/control/index.html'))
    }
}
export {
    controlWin
}
