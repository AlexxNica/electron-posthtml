'use strict'

const app = require('electron').app

const html = require('posthtml-package-html')({
  include: { root: './client/', encoding: 'utf-8' }
})

const posthtml = require('../index')(html)

const BrowserWindow = require('electron').BrowserWindow

app.on('ready', () => {
  // Main Window
  let main = new BrowserWindow({
    width: 1200,
    height: 900,
    position: 'center',
    resizable: true,
    frame: false
  })
  main.loadURL(`file://${__dirname}/client/index.html`)
  main.webContents.openDevTools()
  main.on('closed', () => {
    main = null
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
