const express = require("express");
const sql = require("mssql")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

var config = {
    server: process.env.SERVER,
    port: 1433,
    database: process.env.DATABASE,
    user: 'sa',
    password: process.env.PASSWORD,
    options: {
        encrypt: true, // Required for Azure or other environments
        trustServerCertificate: true // Disables strict SSL validation
    }

}
//console.log("Database Con " , config)

const db = sql.connect(config, function (err) {
    if (err) {
        console.error("Database connection failed: ", err); // Log the error
        return err;
    } else {
        console.log("Database connected successfully");
    }
})
//console.log(db,"asasasa");
PORT = process.env.PORT || 3000;


app.get("/getUser", async function (req, res) {
    let query1 = "select * from tbl_login"

    const akash = await db.query(query1);
    console.log(akash.recordset, "asasasas");
    res.json({ data: akash.recordset })
})


app.post("/saveUser", async function (req, res) {
    const request = db.request();

    request.input('email', sql.VarChar(45), req.body.email);
    let query1 = `insert into tbl_login(email) VALUES(@email)`
    console.log(req.body, "body");


    const akash = await request.query(query1);
    //    console.log(akash.recordset,"asasasas");
    res.json({ msg: 'Saved successfully' })

})
app.put("/updateUser/:id", async function (req, res) {
    const request = db.request();

    request
    .input('id', sql.VarChar(45), req.params.id)
    .input('email', sql.VarChar(45), req.body.email)
    let query1 = `update tbl_login set email=@email where id=@id`
    console.log(req.body, "body");


    const akash = await request.query(query1);
    //    console.log(akash.recordset,"asasasas");
    res.json({ msg: 'update data  successfully' })

})


app.delete("/deleteUser/:id", async function (req, res) {
    const request = db.request();

    request.input('id', sql.VarChar(45), req.params.id);
    let query1 = `delete from tbl_login where id=@id`

    const akash = await request.query(query1);
    //    console.log(akash.recordset,"asasasas");
    res.json({ msg: 'Deleted user successfully' })

})


app.get("/", function (req, res) {

    res.send("<h1> welcome in Akash Project</h1>")

});

app.get("/", function (req, res) {
    res.send("<p> About Page</p>")
})

app.listen(PORT, function () {
    console.log(`server is start at port ${PORT} `)
})