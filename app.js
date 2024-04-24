// import express
const express = require("express");
require('dotenv').config()
global.refreshTokenList = [];

// import body praser 
const bodyPraser = require("body-parser");


// set up express app
const app = express();
var cors = require('cors');
app.use(cors());

// utilize body parser
app.use(bodyPraser.json());
// setting up routes
 app.use(require("./routes"));


//listen for request
const PORT = process.env.PORT;
app.listen(PORT, function(){
    console.log('now listening to request');
});