import express from "express";
import mysql from "mysql";
import cors from 'cors'

const app = express();


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Book_Store"
});

app.use(express.json())
app.use(cors())


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

    const values = [
        req.body.title,
        req.body.description,
        req.body.cover
    ];


    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has entered successfully.");
    });
});



app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM book WHERE id =?"
    db.query(q,[bookId],(err,data)=>{
        if(err) res.json(err);
        return res.json("Book removed");
    })
})

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE book SET `title` =?,`description`=?, `cover`=? WHERE id = ?";
    const values = [
        req.body.title,req.body.description,req.body.cover
    ]

    db.query(q,[...values,bookId],(err,data)=>{
        if(err) res.json(err);
        return res.json("Book has been updated");
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend");

});