import peer from 'events'
const { desktopCapturer } = window.require('electron')

// const peer = new EventEmitter()

console.log('peer', peer);

async function getScreenStream() {
    console.log('desktopCapturer', desktopCapturer);
    const sources = await desktopCapturer.getSources({
        types: ['screen']
    })
    navigator.webkitGetUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sources[0].id,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height,
            }
        }
    }, stream => {
        peer.emit('add-stream', stream)
    }, err => {
        console.error('错误',err);
    })
}

getScreenStream()

export {
    peer
}
