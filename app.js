// import express
const express = require("express");

// import body praser 
const bodyPraser = require("body-parser");


// set up express app
const app = express();

// utilize body parser
app.use(bodyPraser.json());
// setting up routes
 app.use(require("./routes"));

app.get('/home', function(req,res){
    console.log('here');
});

//listen for request
app.listen(process.env.port || 3000, function(){
    console.log('now listening to request');
});