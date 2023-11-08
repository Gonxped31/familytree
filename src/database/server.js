
const express = require("express");
const bcrypt = require('bcrypt');
const saltRounds = 12;
const fs = require('fs');
const path = require("path"); // Import the 'path' module
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 3000;

const databaseName = "familyTreeDb.db";
let db;

const graphTabName = "graphs";
const usersTabName = "users";
/*
app.use(express.static(`${process.cwd()}/public/`))

app.get('*', async (req, res) => {
    await res.sendFile(`${process.cwd()}/public/index.html`, (err) => {
        if (err) {
            res.status(500).send(err)
        }
    })
});
*/

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
                db.run(`CREATE TABLE ${usersTabName} (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, email TEXT, password TEXT)`);
                db.run(`CREATE TABLE ${graphTabName} (name TEXT, nodes TEXT, edges TEXT)`);

                const stmt = db.prepare(`INSERT INTO ${usersTabName} VALUES (null, ?, ?, ?, ?)`);
                stmt.run("Sam", "Gbian", "gonxped31@gmail.com", "1234");
                stmt.finalize();
            })
        }
    });
}

app.use(express.json());

/* GRAPH CODE */

// API to add a graph to the database
app.post('/', (req, res) => {
    console.log("Request received.");
    const newData = req.body;

    console.log(`Adding data to '${graphTabName}'.`);
    db.run(`INSERT INTO ${graphTabName} (name, nodes, edges) VALUES (?, ?, ?)`, [newData.graphName, JSON.stringify(newData.nodes), JSON.stringify(newData.edges)], (err) => {
        if (err) {
            console.error('Error adding data to the database:', err.message);
            res.status(500).json({ error: 'An error occurred while adding data.' });
        } else {
            console.log('Data added successfully');
            res.status(200).json({ message: 'Data added successfully' });
        }
    });
});

// API for retreive a graph
app.get('/', (req, res) => {
    console.log("Retreiving data")
    const graphName = req.query.graphName;

    db.get(`SELECT * FROM ${graphTabName} WHERE name = ?`, [graphName], (err, row) =>{
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
        db.all(`SELECT name FROM ${graphTabName}`, (err, rows) => {
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

    db.run(`DELETE FROM ${graphTabName} WHERE name = ?`, [name], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log("Data deleted successfully.");
        res.json({ message: 'Data deleted successfully' });
    });
});


/* USER CODE */
// API to add a user
app.post('/addUser', (req, res) => {
    const newUser = req.body;
    const stmt = db.prepare(`INSERT INTO ${usersTabName} VALUES (null, ?, ?, ?, ?)`);

    // encrypte the user password
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(500).json({ error: `An error occurred while adding a new user.` });
        } else {
            const encryptedPassword = hash;
            console.log(`Adding ${newUser.lastName} to the database...`)
            try {
                stmt.run(newUser.firstName, newUser.lastName, newUser.email, encryptedPassword);
                stmt.finalize();
                console.log(`${newUser.lastName} have been added succesfully.`)
                res.status(200).json({ message: 'User saved successfully' });
            } catch (error) {
                console.log("Error: ", error.message);
                res.status(500).json({ error: 'An error occurred while adding data.' });
            }
        }
    });
});

// API to check if a user exist (based on the email only)
app.get('/verifyUserExistence', (req, res) => {
    console.log("Checking user existance...");
    const email = req.query.data;
    db.get(`SELECT * FROM ${usersTabName} WHERE email = ?`, [email], (err, row) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(500).json({ error: `An error occurred while checking a user existence based on the email: ${err.message}` });
        } else {
            if (!row) {
                console.log(`The user with the email '${email}' doesn't exist.`);
                res.json({ message: "User not found" });
            } else {
                console.log(`Found the user with the email '${email}'.`);
                res.json({ message: row });
            }
        }
    })
});

// API to verify user password and the email for sign in
app.get('/verifypassword', (req, res) => {
    const datas = req.query.data.split(',');
    const userEmail = datas[0];
    const enteredPassword = datas[1];

    // Get the hashed password from the database
    db.get(`SELECT password FROM ${usersTabName} WHERE email = ?`, [userEmail], (err, row) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(500).json({ error: `An error occurred while getting a user password for verification` });
        } else {
            // Another verification for the user email
            if (!row) {
                res.json(false);
            } else {
                bcrypt.compare(enteredPassword, row.password, (err, result) => {
                    if (err) {
                        console.log(`Error: ${err.message}`);
                        res.status(500).json({ error: `An error occurred while verifying the user password` });
                    } else {
                        if (result) {
                            console.log(`Password matches.`);
                        } else {
                            console.log(`Password doesn't match.`);
                        }
                        res.json(result);
                    }
                });
            }
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});