import icon from '../../resources/icon.png?asset'
import { join } from 'path'
import {BrowserWindow, shell} from 'electron'
import { is } from '@electron-toolkit/utils'
let mainWindow 
export default function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
      }
    })
    mainWindow.webContents.openDevTools()
  
  
    mainWindow.on('ready-to-show', () => {
      mainWindow.show()
    })
  
    mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
  
    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

const send = (channel, ...args) => {
    mainWindow.webContents.send(channel, ...args)
}
export {
    mainWindow,
    send
} 