const peer = require('./peer-control.js')
console.log(peer);

// peer.on('add-stream', stream => {
//     play(stream)
// })

// function play(stream) {
//     const video = document.getElementById('screen-video')
//     video.srcObject = stream
//     video.onloadedmetadata=() => {
//         video.play()
//     }
// }