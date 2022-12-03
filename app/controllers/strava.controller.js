const request = require('request');


const updateDataStrava = (req, res) => {
  try {
    console.log('api profile works');
    const urlStrava = "https://www.strava.com/oauth/token?client_id=71959&client_secret=3484ca115734ab8bc14811ac059b76cedefc1e0b&code=" + req.body.code + "&grant_type=authorization_code";
    request.post({
      //   headers: {'content-type' : 'application/x-www-form-urlencoded'},
      url: urlStrava,
      //   body:    "mes=heydude"
    }, function (error, response, body) {
      try {
        const objectStrava = JSON.parse(body)
        if (!objectStrava) {
          return res.status(400).json({
            ok: false,
            message: "Objeto no encontrado Strava"
          })
        }
        console.log(objectStrava);
        console.log(objectStrava.athlete.id);
        //   console.log(response);

      } catch (error) {
        console.log(error);
      }

    });
  } catch (error) {
    console.log(error);
  }
}




module.exports = updateDataStrava;