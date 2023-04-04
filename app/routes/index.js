const express = require('express')

const router = express.Router()
const fs = require('fs')

const routesPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../middleware/utils')

// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter((file) => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file)
  // Prevents loading of this file and auth file
  return routeFile !== 'index' && routeFile !== 'auth'
    ? router.use(`/${routeFile}`, require(`./${routeFile}`))
    : ''
})

/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
  console.log('hola')
  res.send('Hello World!')
  // res.status(200).send('Hello word')
  // res.render('index')
})

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  })
})

// elastic.init(router)
module.exports = router