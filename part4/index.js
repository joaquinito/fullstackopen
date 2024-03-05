/*
Entry point for the application. 
This file only imports the actual application from the app.js file and then starts 
the application. The function info of the logger-module is used for the console printout 
telling that the application is running.
*/

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})