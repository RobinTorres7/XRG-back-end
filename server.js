require('dotenv').config(); // esto ayuda a leer las variables de entorno
const mongoose = require ('mongoose');
const express = require('express')
const app = express();
const cors = require('cors')
 app.use(express.json());
 app.use(cors());

 const{SERVER_PORT, SERVER_HOST, MONGODB_URI} = process.env
require('./app/routes')(app);
mongoose.connect(MONGODB_URI).then(()=>{
    app.listen(SERVER_PORT, () =>{
        console.log(`DB connected and listening on  ${SERVER_HOST}:${SERVER_PORT}!`) ;
     })
    
}).catch((err) => {
console.log(err);
})
