import express from "express";
import mysql from "mysql2";
import cors from "cors";
import * as dotenv from "dotenv";
import bcrypt from 'bcrypt'

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(cors()); 
app.use(express.json());

//creating connection database
const dataBase = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME, 
});

//Connect
dataBase.connect((err) => {
  if (err) {
    console.log("Unable to connect dataBase!");
  } else {
    console.log("Database connected");
  }
});

//list of users

app.get("/users", (req, resp) => {
  const statement = "select * from todoUsers;";
  dataBase.query(statement, (err, res) => {
    if (err) {
      resp.status(500).json({ error: "Cannot fetch users data" });
    }
    resp.status(200).json(res);
  });
});

//List of todo
app.get("/todo", (req, resp) => {
  const statement = "select * from todoTasks;";
  dataBase.query(statement, (err, res) => {
    if (err) {
      resp.status(500).send("Cannot fetch users data");
    } else {
      resp.status(200).json(res);
    }
  });
});

app.post("/signup", (req, resp) => {
  let encryptPass
  const { user_name, user_email, user_password } = req.body;
  // bcrypt.hash(user_password,process.env.SALT,(err,res)=>{
  //    if(err){
  //     console.log("Error while encryption of Password")
  //    }else{
  //     encryptPass=res
  //    }
  // })
  
  const statement =
    "insert into todoUsers(user_name,user_email,user_password) values(?,?,?);";
  dataBase.query(
    statement,
    [user_name, user_email, user_password],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        resp.status(200).json({ user: "successfully added" });
      }
    }
  );
});

app.post("/login", (req, resp) => {
  const { user_name, user_password } = req.body;
  const statement =
    "select user_name from todoUsers where user_name=? and user_password=?";
  dataBase.query(statement, [user_name, user_password], (err, res) => {
    if (err) {
      resp.status(500).json({ error: "Invalid user" });
    } else if (res.length <= 0) {
      console.log("empty");
      resp.status(400).json({ error: "Invalid user" });
    } else {
      resp.status(200).json(res);
    }
  });
});

//listening port
app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
