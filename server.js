const express = require("express");


const app = express();
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

PORT = process.env.PORT || 3000;

app.get("/",function(req,res){

    res.send("<h1> welcome in Akash Project</h1>")

});

app.get("/",function(req,res){
    res.send("<p> About Page</p>")
})

app.listen(PORT, function(){
    console.log(`server is start at port ${PORT} `)
})