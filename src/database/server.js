
const express = require("express");
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 3000;

// create a database
const databaseName = "familyTreeDb.db";
let db;
if (fs.existsSync(databaseName)){
    db = new sqlite3.Database(databaseName, sqlite3.OPEN_READWRITE, (err) => {
        if (err){
            console.log(`Error opening the databse: ${databaseName}.`);
        } else {
            console.log("Data base opened successfully.");
        }
    });
} else {
    db = new sqlite3.Database(databaseName, (err) => {
        if (err) {
            console.log("Error creating the database.");
        } else {
            console.log("Database created succesfully.");
            // create tables and add some datas
            db.serialize(() => {
                db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, last_name TEXT, first_name TEXT, pseudo TEXT, courriel TEXT)");
                db.run(`CREATE TABLE graphs (name TEXT, nodes TEXT, edges TEXT)`);

                const stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?)");
                stmt.run(0, "Sam", "Gbian", "gonxped31", "samirgbian31@gmail.com");
                stmt.finalize();
            })
        }
    });
}

app.use(express.json());

// API to add a graph to the database
app.post('/', (req, res) => {
    console.log("Request received.");
    const newData = req.body;
    const tableName = "graphs";

    db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [tableName], (err, row) => {
        if (err) {
          console.error('Error checking table existence:', err);
        } else {
            console.log(`Adding data to '${tableName}'.`);

            db.run(`INSERT INTO ${tableName} (name, nodes, edges) VALUES (?, ?, ?)`, [newData.graphName, JSON.stringify(newData.nodes), JSON.stringify(newData.edges)], (err) => {
                if (err) {
                    console.error('Error adding data to the database:', err.message);
                    res.status(500).json({ error: 'An error occurred while adding data.' });
                } else {
                    console.log('Data added successfully');
                    res.status(200).json({ message: 'Data added successfully' });
                }
            })
        }
    });
})


// API for retreive a graph
app.get('/', (req, res) => {
    console.log("Retreiving data")
    const graphName = req.query.graphName;
    const tableName = "graphs";

    db.get(`SELECT * FROM ${tableName} WHERE name = ?`, [graphName], (err, row) =>{
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(500).json({ error: err.message });
            return;
        }

        if (!row) {
            console.log("Data not found")
        } else {
            console.log("Data retreived successfully.")
        }
        res.json(row);
    });
});

// API to get all the graphs name
app.get('/viewGraphs', (req, res) => {
    console.log("Loading graphs");
    try {
        db.all(`SELECT name FROM graphs`, (err, rows) => {
            if (err) {
                console.log(`Error: ${err.message}`);
                res.status(500).json({ error: err.message });
                return;
            }

            if (rows.length === 0) {
                console.log("Database is empty");
                res.json([]);
            } else {
                console.log("Graphs loaded");
                const graphNames = rows.map((row) => row.name);
                res.json(graphNames);
            }
        });
    } catch (err) {
        console.error("An error occurred:", err);
        res.status(500).json({ error: err.message });
    }
});


// API to modify an existing data (going to use it for the profile modification if needed)
/*app.put('/update/:id', (req, res) => {
    const updatedData = req.body; // Updated data typically in the request body
    const id = req.params.id; // ID of the record to be updated
    // Use SQLite to update data in the database
    // You should perform data validation and sanitation before updating it in the database.
    db.run('UPDATE your_table SET column1 = ?, column2 = ? WHERE id = ?', [updatedData.value1, updatedData.value2, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Data updated successfully' });
    });
});*/

// API to delete a graph
app.delete('/', (req, res) => {
    console.log("Deleting data...");
    const name = req.query.graphName;
    console.log(name);

    db.run('DELETE FROM graphs WHERE name = ?', [name], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log("Data deleted successfully.");
        res.json({ message: 'Data deleted successfully' });
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})