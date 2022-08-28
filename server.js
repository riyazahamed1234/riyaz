import mysql from 'mysql';
import express from 'express';
import data from  './data.js';
import cors from 'cors';
import bodyParser from 'body-parser';

 const app = express();
  app.get('/api/products',(req, res)=>{
   res.send(data.products);
 });
 app.use(cors());
 app.use(express.json());
 app.get('/',(req,res)=>{
    res.send('sever is ready');
 });
 const encoder = bodyParser.urlencoded();

app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodejs"
});
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});
app.get("./fronted/src/components/login/Loginform",function(req,res){
    res.sendFile(__dirname+"./fronted/src/components/login/Loginform.js");

});
app.post("./fronted/src/components/login/Loginform",encoder,function(req,res){
    var username = req.body.username;
    var password =req.body.password;
    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0){
            res.redirect("/welcome");
        } else {
            res.redirect("/log");
        }
        res.end();
    });
});
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "welcome.html");
});
 const port = process.env.PORT ||5000;
 app.listen(5000, () => {
    console.log(`server at https://localhost:${port}`);
 });