import Versions from './components/Versions'
import icons from './assets/icons.svg'
const { ipcRenderer } = window.require('electron')
import { useEffect, useState } from 'react'

function App() {
  const [remoteCode, setRemoteCode] = useState('')
  const [localCode, setLocalCode] = useState('')
  const [controlText, setControlText] = useState('')
  const login = async () => {
    let code = await ipcRenderer.invoke('login')
    console.log('code has been recived', code);
    setLocalCode(code)
  }
  const handleCtrlState = async (e, name, type) => {
    let text = ``
    console.log('被控制type', type);
    if (type == 1) {
      // 控制别人
      text = `正在远程控制 ${name}`
    } else if (type == 2) {
      // 被人控制
      text = `被人控制中 ${name}`
    }
    console.log('被控制了');
    setControlText(text)
  }

  useEffect(() => {
    login()
    ipcRenderer.on('control-state-change', handleCtrlState)
    return () => {
      ipcRenderer.removeListener('control-state-change', handleCtrlState)
    }
  }, [])
  const startControl = (code) => {
    ipcRenderer.send('control', remoteCode)
  }
  return (
    <div className="container">
      <Versions></Versions>
      <div className="ctxbox">
        {
          controlText == '' ? <>
            <div className='yourCode'>你的控制码{localCode}{controlText}</div>
            <div className="ctrlBox">
              <input className='controlInput' type="text" value={remoteCode} onChange={(e) => {
                setRemoteCode(e.target.value)
              }} />
              <button className='btnConfirm' onClick={() => startControl(remoteCode)}>确认</button>
            </div>
          </> : <>
            <div>{controlText}</div>
          </>
        }
      </div>
      {/* <svg className="hero-logo" viewBox="0 0 900 300">
        <use xlinkHref={`${icons}#electron`} />
      </svg> */}


      {/* <div className="links">
        <div className="link-item">
          <a target="_blank" href="https://evite.netlify.app" rel="noopener noreferrer">
            Documentation
          </a>
        </div>
        <div className="link-item link-dot">•</div>
        <div className="link-item">
          <a
            target="_blank"
            href="https://github.com/alex8088/electron-vite"
            rel="noopener noreferrer"
          >
            Getting Help
          </a>
        </div>
        <div className="link-item link-dot">•</div>
        <div className="link-item">
          <a
            target="_blank"
            href="https://github.com/alex8088/quick-start/tree/master/packages/create-electron"
            rel="noopener noreferrer"
          >
            create-electron
          </a>
        </div>
      </div> */}

      {/* <div className="features">
        <div className="feature-item">
          <article>
            <h2 className="title">Configuring</h2>
            <p className="detail">
              Config with <span>electron.vite.config.ts</span> and refer to the{' '}
              <a target="_blank" href="https://evite.netlify.app/config/" rel="noopener noreferrer">
                config guide
              </a>
              .
            </p>
          </article>
        </div>
        <div className="feature-item">
          <article>
            <h2 className="title">HMR</h2>
            <p className="detail">
              Edit <span>src/renderer</span> files to test HMR. See{' '}
              <a
                target="_blank"
                href="https://evite.netlify.app/guide/hmr-in-renderer.html"
                rel="noopener noreferrer"
              >
                docs
              </a>
              .
            </p>
          </article>
        </div>
        <div className="feature-item">
          <article>
            <h2 className="title">Hot Reloading</h2>
            <p className="detail">
              Run{' '}
              <span>
                {"'"}electron-vite dev --watch{"'"}
              </span>{' '}
              to enable. See{' '}
              <a
                target="_blank"
                href="https://evite.netlify.app/guide/hot-reloading.html"
                rel="noopener noreferrer"
              >
                docs
              </a>
              .
            </p>
          </article>
        </div>
        <div className="feature-item">
          <article>
            <h2 className="title">Debugging</h2>
            <p className="detail">
              Check out <span>.vscode/launch.json</span>. See{' '}
              <a
                target="_blank"
                href="https://evite.netlify.app/guide/debugging.html"
                rel="noopener noreferrer"
              >
                docs
              </a>
              .
            </p>
          </article>
        </div>
        <div className="feature-item">
          <article>
            <h2 className="title">Source Code Protection</h2>
            <p className="detail">
              Supported via built-in plugin <span>bytecodePlugin</span>. See{' '}
              <a
                target="_blank"
                href="https://evite.netlify.app/guide/source-code-protection.html"
                rel="noopener noreferrer"
              >
                docs
              </a>
              .
            </p>
          </article>
        </div>
        <div className="feature-item">
          <article>
            <h2 className="title">Packaging</h2>
            <p className="detail">
              Use{' '}
              <a target="_blank" href="https://www.electron.build" rel="noopener noreferrer">
                electron-builder
              </a>{' '}
              and pre-configured to pack your app.
            </p>
          </article>
        </div>
      </div> */}
    </div>
  )
}

export default App
