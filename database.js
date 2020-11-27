var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

const schema = {
    'create': [
        {
            'table': `CREATE TABLE notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title text,
                content text,
                color text,
                archived boolean,
                deleted boolean
            )`,
            'insert': 'INSERT INTO notes (title, content, color, archived, deleted) VALUES (?,?,?,?,?)',
            'data': [
                ["Test Note","This is the first test note.\n\nYou can edit or create other notes.", "transparent", false, false],
                ["Test Note 2","This is the second test note.\n\nYou can edit or create other notes.", "transparent", false, false]
            ]
        }
    ],
    'drop': [
        `DROP TABLE notes`
    ]
}

let db = new sqlite3.Database(DBSOURCE, (err) => {
    console.log();
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.');
        if (process.argv[2] && process.argv[2] == 'reset') {
            console.log('Dropping tables.');
            schema.drop.forEach((entry) => {
                db.run(entry,
                (err) => {
                    //if (err) console.log(err);
                }
                )
            });
        }
        else {
            console.log('Updating Schema.');
    		schema.create.forEach((entry) => {
                db.run(entry.table,
                (err) => {
                    if (err) {
                    //    console.log(err);
                    }else{
                        // insert default data
                        entry.data.forEach(row => db.run(entry.insert, row, (err) => console.log(err)))
                    }
                })
            });
        }
        console.log('Database ready.');
    }
});


module.exports = db
