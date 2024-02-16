import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Book_Store"
})

app.get("/",(req,res)=>{
    res.json("Hello this is backend");

})


app.get("/books",(req,res)=>{
    const q = "SELECT * FROM book"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})


app.post("/books",(req,res)=>{
    const q = "INSERT INTO book (`title`,`description`,`cover`) VALUES(?) "
    const values = ["title from backend","description from backend","cover from backend"]
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})


app.listen(8800, ()=>{
    console.log("Connected to backend")

})