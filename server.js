const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
require ('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
//app.use(routes);

//Wait for database to connect then allow server to listen to requests
sequelize.sync({ force: false}).then(() => {   //connect database
        app.listen(PORT, () => 
        console.log("Server listening on port: "+ PORT));  //server listening for requests
      });    
    