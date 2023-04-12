import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './src/renderer/src/main.jsx'),
        control: resolve(__dirname, './src/renderer/control/main.jsx'),
      }
    }
  },
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, './src/renderer/index.html'),
          control: resolve(__dirname, './src/renderer/control.html'),
        }
      }
      // rollupOptions: {
      //   input: {
      //     main: resolve(__dirname, './src/renderer/src/main.jsx'),
      //     control: resolve(__dirname, './src/renderer/control/main.jsx'),
      //   }
      // }
    },
    plugins: [react()]
  },

})
