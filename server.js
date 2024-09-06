const express = require("express");

const sql = require("mssql/msnodesqlv8")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

var config = {
    server : process.env.SERVER,
    database : process.env.DATABASE,
    driver : process.env.DRIVER,
    options : {
        trustedConnection : false,
    }

}

const db = sql.connect(config, function(err){
    if(err) throw err;
    console.log("Database Connected")
})

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