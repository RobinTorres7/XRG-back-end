const { application } = require("express")

module.exports = (app =>{
    app.use('/api/accounts',require('./accounts.route.js'))
    app.use('/api/auth',require('./auth.route.js'))
    app.use('/api/profile',require('./profile.route.js'))
    app.use('/api/strava',require('./strava.route.js'))
    app.use('/api/challenge',require('./challenge.route.js'))
    app.use('/api/ad',require('./ad.route.js'))
    app.use('/api/story',require('./story.route.js'))
    app.use('/api/route',require('./route.route.js'))
  


})