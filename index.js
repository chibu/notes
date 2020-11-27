const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
var db = require("./database.js");


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.route("/api/notes/")
    .get((req, res, next) => {
        var sql = "SELECT * FROM notes WHERE archived = 0 AND deleted = 0 ORDER BY id DESC"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":rows
            })
          });
    })
    .post((req, res, next) => {
        var sql = "INSERT INTO notes (title, content, archived, deleted) VALUES (?,?,false,false)"
        var params = [req.body.title, req.body.content]

        db.all(sql, params, (err, rows) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            var sql = "SELECT * FROM notes WHERE id = ?"
            var params = [this.lastID]
            db.all(sql, params, (err, rows) => {
                if (err) {
                  res.status(400).json({"error":err.message});
                  return;
                }
                res.json({
                    "message":"success",
                    "data":rows
                })
              });
          });
    });

app.route("/api/notes/archive/")
    .get((req, res, next) => {
        var sql = "SELECT * FROM notes WHERE archived = 1 ORDER BY id DESC"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":rows
            })
          });
    })

app.route("/api/notes/trash/")
    .get((req, res, next) => {
        var sql = "SELECT * FROM notes WHERE deleted = 1 ORDER BY id DESC"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":rows
            })
          });
    })

app.route("/api/notes/all/")
    .get((req, res, next) => {
        var sql = "SELECT * FROM notes ORDER BY id DESC"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":rows
            })
          });
    })

app.route("/api/notes/:noteid")
    .get((req, res, next) => {
        var sql = "SELECT * FROM notes WHERE id = ?"
        var params = [req.params.noteid]
        db.all(sql, params, (err, rows) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":rows
            })
          });
    })
    .post((req, res, next) => {
        var sql = '';
        var params = [];


        sql = 'UPDATE notes SET title = ?, content = ?, color = ?, archived = ?, deleted = ? WHERE id = ?';
        params = [req.body.title, req.body.content, req.body.color, req.body.archived ? '1' : '0', req.body.deleted ? '1' : '0', req.params.noteid];
        console.log(params);
        db.run(sql, params);


        res.json({
            "message":"saved"
        })


    });



app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
