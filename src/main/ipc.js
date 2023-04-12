const {ipcMain} = require('electron')
import {send} from './mainWin'
import createControlWindow from './control';

export default function() {
    console.log('ipcMain is called');
    ipcMain.handle('login', async() => {
        let code = Math.floor(Math.random() * (999999-100000) + 10000)
        return code
    })
    ipcMain.on('control', async (e, remoteCode) => {
        console.log('on control', remoteCode);
        send('control-state-change', remoteCode, 1)
        createControlWindow()
    })
}