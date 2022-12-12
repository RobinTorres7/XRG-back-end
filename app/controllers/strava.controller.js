const request = require('request');
const profile = require('../models/profile.model')
const {getProfile}= require('./profile.controller')
// const StravaApiV3 = require('strava_api_v3');

const updateDataStrava = (req, res) => {
    try {
        const urlStrava = "https://www.strava.com/oauth/token?client_id=71959&client_secret=3484ca115734ab8bc14811ac059b76cedefc1e0b&code=" + req.body.code + "&grant_type=authorization_code";
        request.post({
            url: urlStrava,

        }, async function (error, response, body) {
            try {
                const objectStrava = JSON.parse(body)
                if (!objectStrava) {
                    return res.status(400).json({
                        ok: false,
                        message: "Objeto no encontrado Strava"
                    })
                }

                 /* console.log(objectStrava); */
                // refreshToken(objectStrava.refresh_token);
                // // dataUserStrava();
                const accesToken = await refreshToken(objectStrava.refresh_token)
                /* console.log(accesToken); */
                const getStats = await dataUserStrava(objectStrava.athlete.id, accesToken.access_token)
                experienceMat = getStats.all_ride_totals.distance / 10;
                followerStrava = objectStrava.athlete.follower;
                
                
                
               /*  const idDemo = getProfile(res);
             
                console.log(idDemo); */
                const statsAthleteUpDated = await profile.findOneAndUpdate(
                  
                
                  { idAccount: idDemo }, 
                  {
                    experience: experienceMat,
                    followers: followerStrava,                    
                      
                      
                  },
                 );


             /*  console.log(statsAthleteUpDated); */



              if (!statsAthleteUpDated) {
                  await profile.create({
                      idAccount: idDemo,
                      experience:experienceMat ,
                      followers: followerStrava,

                  });
              }
              res.status(200).json({
                  ok: true,
              });
          
          







                
                
            } catch (error) {
                console.log(error);
            };


        });
    } catch (error) {
        console.log(error);
    }
}


const refreshToken = (refresh_token) => {
    // console.log(refresh_token);
    return new Promise((resolve, reject) => {
        const urlStravaData = `https://www.strava.com/oauth/token?client_id=71959&client_secret=3484ca115734ab8bc14811ac059b76cedefc1e0b&grant_type=refresh_token&refresh_token=${refresh_token}`
        /* console.log(urlStravaData); */
        request.post({
            url: urlStravaData
        }, function (error, response, body) {
            try {
                const newTokenData = JSON.parse(body);
                /* console.log(newTokenData); */
                return resolve(newTokenData);

            } catch (error) {
                console.log(error);
                reject(false);
            };

        });
    })
}

const dataUserStrava = (id,access_token) => {

    return new Promise((resolve, reject) => {

    try {
        /* const urlStravaAthlete = `https://www.strava.com/api/v3/segment_efforts/${id}?access_token=${access_token}`; */
       
        const urlStravaAthlete = `https://www.strava.com/api/v3/athletes/${id}/stats?access_token=${access_token}`;
        request.get({
            url: urlStravaAthlete,

        },
            function (error, response, body) {
                try {
                    const athleteStrava = JSON.parse(body)
                    if (!athleteStrava) {
                        return res.status(400).json({
                            ok: false,
                            message: "Objeto no encontrado Strava"
                        })
                    }
                    
                    
                    
                    return resolve(athleteStrava);
                    
                } catch (error) {
                    console.log(error);
                    reject(false);
                }

            });
        /* console.log(urlStravaAthlete); */
    } catch (error) {

    }
});
}






module.exports = updateDataStrava;