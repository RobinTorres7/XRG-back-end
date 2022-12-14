const request = require('request');
const profile = require('../models/profile.model')



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

                 /* console.log(objectStrava);  */
                // refreshToken(objectStrava.refresh_token);
               
                const accesToken = await refreshToken(objectStrava.refresh_token)
                 /* console.log(accesToken);  */

                 /* Obteniendo estadisticas del usuario */
                const getStats = await dataUserStrava(objectStrava.athlete.id, accesToken.access_token)
                experienceProvi =getStats.all_ride_totals.distance / 10000;
               
                console.log(getStats);
               
                experienceMat = Math.trunc(experienceProvi); 


                /* Validación Disciplina */
                getRecentMovingTime = getStats.recent_ride_totals.moving_time/3600
                console.log(getRecentMovingTime);
                const userDiscipline = discipline (getRecentMovingTime);
               /*  console.log(userDiscipline); */
               

                /*Obteniendo PR de Rutas legensarias*/ 
                /* Segmento Belisario Patios */
                const belisarioPatiosId = 3178893
                const getPatiosSegment = await dataRouteUserStrava(belisarioPatiosId, accesToken.access_token)
                const patiosPrSeconds = getPatiosSegment.athlete_segment_stats.pr_elapsed_time
                
                const getUserPrPatios =  getPrSegment(patiosPrSeconds)
                /* console.log(getUserPrPatios); */

                /* Performance Belisario Patios */
                const bestTimePatiosBelisario = 876
                const performancePatiosTimeUserBest = Math.round( 95 - (((patiosPrSeconds - bestTimePatiosBelisario)/60) *5) )
                /* console.log(performancePatiosTimeUserBest); */
                


                /* Segmento La Vega el Vino */
                const laVegaElVinoId =  1319693  
                const getVegaVinoSegment = await dataRouteUserStrava(laVegaElVinoId, accesToken.access_token)
                const vegaVinoPrSeconds = getVegaVinoSegment.athlete_segment_stats.pr_elapsed_time  
                const getUserPrVegaVino =  getPrSegment(vegaVinoPrSeconds) 
              /*   console.log(getUserPrVegaVino); */ 

              /* Performance La Vega El Vino */
              const bestTimeVegaVino = 4320
              const performanceVegaVinoTimeUserBest = Math.round( 95 - (((vegaVinoPrSeconds - bestTimeVegaVino)/60) *1.1) )
              /* console.log(performancePatiosTimeUserBest); */
              const performanceUser = []
             
                
                /* Segmento Yerbabuena */
                const yerbabuenaVaraId = 2489686
                const getYerbabuenaVaraSegment = await dataRouteUserStrava(yerbabuenaVaraId, accesToken.access_token)
                const yerbabuenaVaraPrSeconds = getYerbabuenaVaraSegment.athlete_segment_stats.pr_elapsed_time  
                const getUserPrYerbabuenaVara =  getPrSegment(yerbabuenaVaraPrSeconds)
                /* console.log(getUserPrYerbabuenaVara);  */

                /* Performance Yerbabuena */
                const bestTimeYerbabuena = 660
                const performanceYerbabuenaTimeUserBest = Math.round( 95 - (((yerbabuenaVaraPrSeconds - bestTimeYerbabuena)/60) *5.5) )
                console.log(performanceYerbabuenaTimeUserBest);
           
                
                /* Crono autopista */

                const cronoAutopistaId = 7481694
                const getCronoAutopistaSegment = await dataRouteUserStrava(cronoAutopistaId, accesToken.access_token)
                const cronoAutopistaPrSeconds = getCronoAutopistaSegment.athlete_segment_stats.pr_elapsed_time  
                const getUserPrCronoAutopista =  getPrSegment(cronoAutopistaPrSeconds)
                /* console.log(getUserPrCronoAutopista);  */

                /* Performance Crono Regreso */
                const bestTimeAutopista = 510
                const performanceCronoTimeUserBest = Math.round( 95 - (((cronoAutopistaPrSeconds - bestTimeAutopista)/60) *10) )
               

                /* Mesitas El Salto */
                const mesitasElsaltoId = 1334595
                const getMesitasElsaltoaSegment = await dataRouteUserStrava(mesitasElsaltoId, accesToken.access_token)
                const mesitasElsaltoPrSeconds = getMesitasElsaltoaSegment.athlete_segment_stats.pr_elapsed_time  
                const getUserPrMesitasElsalto =  getPrSegment(mesitasElsaltoPrSeconds)
                /* console.log(getUserPrMesitasElsalto); */ 

                /* Performance Mesitas El Salto */
                const bestTimeMesitasSalto = 2364
                const performanceMesitasSaltoTimeUserBest = Math.round( 95 - (((mesitasElsaltoPrSeconds - bestTimeMesitasSalto)/60) *1) )
                performanceUser.push(performanceVegaVinoTimeUserBest,performancePatiosTimeUserBest,performanceCronoTimeUserBest, performanceMesitasSaltoTimeUserBest,performanceYerbabuenaTimeUserBest);


                const routesTimeUser = []
                routesTimeUser.push(getUserPrMesitasElsalto,getUserPrVegaVino,getUserPrPatios, getUserPrYerbabuenaVara, getUserPrCronoAutopista, );
                

                /* console.log(routesTimeUser); */


                






                
                followerStrava = objectStrava.athlete.follower;

                
                
                console.log(req.user);

                const statsAthleteUpDated = await profile.findOneAndUpdate(


                    { idAccount: req.user.id },
                    {
                        experience: experienceMat,
                        followers: followerStrava,
                        routesTime:routesTimeUser,
                        discipline:userDiscipline,
                        performance:performanceUser,
                        },
                );
                /*  console.log(statsAthleteUpDated); */
                if (!statsAthleteUpDated) {
                    await profile.create({
                        idAccount: req.user.id,
                        experience: experienceMat,
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

const dataUserStrava = (id, access_token) => {

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

const dataRouteUserStrava = (id, access_token) => {

    return new Promise((resolve, reject) => {

        try {
            /* const urlStravaAthlete = `https://www.strava.com/api/v3/segment_efforts/${id}?access_token=${access_token}`; */

            const urlStravaSegment = `https://www.strava.com/api/v3/segments/${id}?access_token=${access_token}`;
            request.get({
                url: urlStravaSegment,

            },
                function (error, response, body) {
                    try {
                        const segmentStrava = JSON.parse(body)
                        if (!segmentStrava) {
                            return res.status(400).json({
                                ok: false,
                                message: "Objeto no encontrado Strava"
                            })
                        }



                        return resolve(segmentStrava);

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

const getPrSegment = (segmentPrSeconds)=>{
    firtsPrminuts = segmentPrSeconds/60
    prSegmentOperation = Math.trunc(firtsPrminuts);
    residualResult = firtsPrminuts - prSegmentOperation
    secondsSegmentPr = residualResult * 60
    secondsRoundedSegmentPr = Math.round(secondsSegmentPr)

    if(prSegmentOperation > 60){
    firtsPrHour =  prSegmentOperation / 60
    prHourOperation = Math.trunc(firtsPrHour)
    minutsResidual = firtsPrHour - prHourOperation
    minutsSegmentPr = minutsResidual *60
    minutsRoundedSegmentPr =Math.round(minutsSegmentPr)
    segmentPrUser = `${prHourOperation}:${minutsRoundedSegmentPr}':${secondsRoundedSegmentPr}"`

    }else {
        segmentPrUser = `${prSegmentOperation}':${secondsRoundedSegmentPr}"`
    }
    
    return segmentPrUser
    
}

const discipline = (movingTimeUser)=>{
    if (movingTimeUser>20){
        disciplineUser= "cien"  
    } else if (movingTimeUser<20 && movingTimeUser>15) {
        disciplineUser= "ochocinco" 
    } else if (movingTimeUser<15 && movingTimeUser>10){
        disciplineUser= "setenta" 
    } else if (movingTimeUser<10 && movingTimeUser>5){
        disciplineUser= "cincuenta" 
    } else {
        disciplineUser= "doscinco"
    }
    return  disciplineUser


}






module.exports = updateDataStrava;
