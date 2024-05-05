const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
 
const app = express();
const port = 3001
 
app.use(express.json());
app.use(cors());
 
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "my-app"
})
 
app.post('/register', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
 
    con.query("INSERT INTO users (email, name, password) VALUES (?, ?, ?)", [email, name, password], 
        (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT DETAILS!"})
            }
        }
    )
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    con.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], 
        (err, result) => {
            if(err){
                req.setEncoding({err: err});
            }else{
                if(result.length > 0){
                    res.send(result);
                }else{
                    res.send({message: "WRONG Email OR PASSWORD!"})
                }
            }
        }
    )
});
 // Route API pour récupérer les données du tableau de bord
app.get('/api/dashboard', (req, res) => {
    const sql = 'SELECT * FROM dashboard';
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})