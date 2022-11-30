const request = require('request');


const updateDataStrava = (req,res)=>{
    console.log('api profile works');
    console.log(req.body);
    }
    
   
request.post({
//   headers: {'content-type' : 'application/x-www-form-urlencoded'},
  url:     `https://www.strava.com/oauth/token?client_id=71959&client_secret=3484ca115734ab8bc14811ac059b76cedefc1e0b&code=${req.body.code}&grant_type=authorization_code`,
//   body:    "mes=heydude"
}, function(error, response, body){
  console.log(body);
});

module.exports = updateDataStrava;