// import express
const express = require("express");

// set up express app
const app = express();

// setting up routes
 app.use(require("./routes"));

app.get('/home', function(req,res){
    console.log('here');
});

//listen for request
app.listen(process.env.port || 3000, function(){
    console.log('now listening to request');
});