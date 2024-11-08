const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        contact: resolve(__dirname, 'contact.html'),
        work: resolve(__dirname, 'work.html'),
        tdfprocess: resolve(__dirname, 'tdfprocess.html'),
        proj3about: resolve(__dirname, 'proj3about.html')
      }
    }
  }
})