const { application } = require("express")

module.exports = (app =>{
    app.use('/api/accounts',require('./accounts.route.js'))
    app.use('/api/auth',require('./auth.route.js'))
    app.use('/api/profile',require('./profile.route.js'))
    app.use('/api/strava',require('./strava.route.js'))


})