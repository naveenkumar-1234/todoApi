// import express from "express";
// import mysql from "mysql2";
// import cors from "cors";


// const app = express();
// app.use(cors()); 
// app.use(express.json());

// const dataBase=mysql.createConnection({
//     host:'sql6.freesqldatabase.com',
//     database:'sql6692251',
//     user:'sql6692251',
//     // port:3306,
//     password:'8sSM2t4RSr'
// })
// const connection=dataBase.connect((err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Connected successfully");
//     }
// })
// app.get('/users',(req,resp)=>{
//     dataBase.query('select * from users;',(err,res)=>{
//         if(res.length<=0){
//             resp.json({error:"no data"})
//         }else{
//             resp.json(res)
//         }
//     })
// })

// app.listen('8000',()=>{
//     console.log("Running")
// })

import bcrypt from 'bcrypt'

bcrypt.hash("hello",20,function(err,hashedPassword){
    console.log(hashedPassword)
})
