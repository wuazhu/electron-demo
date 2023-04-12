import React, { useEffect, useRef } from 'react'
// import Versions from '../src/components/Versions'
import {peer} from './peer-control'
const { ipcRenderer } = window.require('electron')


function App() {
  let videoRef = useRef(null)
  const handleStreamEv = () => {
    ipcRenderer.on('SET_SOURCE', async (e, sourceId) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sourceId,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        })
        handleStream(stream)
      } catch (e) {
        handleError(e)
      }
    })
  }
  function handleStream (stream) {
    console.log('ref' , videoRef);
    // videoRef.current.src = stream
    // videoRef.current.onloadedmetadata = function() {
    //   videoRef.current.play()
    // }
  }
  
  function handleError (e) {
    console.error('错误了',e)
  }
  useEffect(() => {
    handleStreamEv()
  }, [])
  
  return (
    <div className="container" onClick={play}>
      <video id="screen-video" ref={videoRef}></video>
    </div>
  )
}

export default App
