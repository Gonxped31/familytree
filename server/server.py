from flask import Flask, request, session, jsonify, render_template
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os
import sqlite3
import json
import hashlib

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)
app.secret_key = 'hamburger-fouberg'

# Function to create a hashed table name from an email
def getHashedTableName(email):
    hashed_email = hashlib.sha256(email.encode()).hexdigest()
    return f"user_{hashed_email}"

@app.route('/')
def index():
    return {"member": ["member1", "member2", "member3"]}

### Users routes ###
@app.route('/addUser', methods=['POST'])
def add_user():
    new_user = request.json
    stmt = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)"
    graph_tab_name = getHashedTableName(new_user['email'])

    # Encrypt the user password
    hashed_password = bcrypt.generate_password_hash(new_user['password']).decode('utf-8')

    with sqlite3.connect('familyTreeDb.db') as conn:
        cursor = conn.cursor()
        cursor.execute(stmt, (new_user['firstName'], new_user['lastName'], new_user['email'], hashed_password))
        conn.commit()
        cursor.execute(f"CREATE TABLE {graph_tab_name} (name TEXT, nodes TEXT, edges TEXT)")

    return jsonify({'message': 'User saved successfully'}), 200

# Update user informations
@app.route('/updateUser', methods=['PUT'])
def update_user():
    updated_data = request.json
    user_id = updated_data['id']
    updated_values = (updated_data['firstName'], updated_data['lastName'], updated_data['email'], user_id)

    with sqlite3.connect('familyTreeDb.db') as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET first_name=?, last_name=?, email=? WHERE id=?", updated_values)
        conn.commit()

    return jsonify({'message': 'User updated successfully'}), 200

# Verify user existence
@app.route('/verifyUserExistence', methods=['GET'])
def verify_user_existence():
    email = request.args.get('data')

    with sqlite3.connect('familyTreeDb.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email=?", [email])
        row = cursor.fetchone()

        if row:
            return jsonify({'message': row})
        else:
            return jsonify({'message': 'User not found'})

# Sign in
@app.route('/signin', methods=['GET'])
def sign_in():
    user_data = request.args.get('data').split(',')
    user_email = user_data[0]
    entered_password = user_data[1]

    with sqlite3.connect('familyTreeDb.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email=?", [user_email])
        row = cursor.fetchone()

        if not row:
            print("This user doesn't exist")
            return jsonify(False)

        stored_password = row[4]

        if bcrypt.check_password_hash(stored_password, entered_password):
            print("User found. Creating session")
            session['user'] = {'firstName': row[1], 'email': row[3]}

            return jsonify(True)
        else:
            print("This user doesn't exist")
            return jsonify(False)


### Graphs routes ###
# Save a graph
@app.route('/saveGraph', methods=['POST'])
def save_graph():
    print("Request received.")
    new_data = request.json
    user = session.get('user')
    graph_tab_name = getHashedTableName(user['email'])

    print(f"Adding data to {user['firstName']}'s table if it exists.")
    
    with sqlite3.connect('familyTreeDb.db') as conn:
        cursor = conn.cursor()

        # Check user existence
        cursor.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name=?", [graph_tab_name])
        row = cursor.fetchone()

        if row:
            cursor.execute(f"INSERT INTO {graph_tab_name} (name, nodes, edges) VALUES (?, ?, ?)",
                           [new_data['graphName'], json.dumps(new_data['nodes']), json.dumps(new_data['edges'])])
            conn.commit()
            print('Data added successfully')
            return jsonify({'message': 'Data added successfully'}), 200
        else:
            print(f"Table with the name '{user['email']}' doesn't exist.")

    return jsonify({'error': 'An error occurred while adding data.'}), 500

# Update graph information
@app.route('/updateGraph', methods=['PUT'])
def update_graph():
    try:
        updated_data = request.json
        graph_tab_name = getHashedTableName(session['user']['email'])
        updated_values = (json.dumps(updated_data['nodes']), json.dumps(updated_data['edges']), updated_data['graphName'])

        with sqlite3.connect('familyTreeDb.db') as conn:
            cursor = conn.cursor()
            cursor.execute(f"UPDATE {graph_tab_name} SET nodes=?, edges=? WHERE name=?", updated_values)
            conn.commit()

        return jsonify({'message': 'Graph updated successfully'}), 200
    except Exception as e:
        print(f"Error updating graph: {str(e)}")
        abort(500)  # Internal Server Error

# Delete a graph
@app.route('/deleteGraph/<graph_name>', methods=['DELETE'])
def delete_graph(graph_name):
    graph_tab_name = getHashedTableName(session['user']['email'])

    with sqlite3.connect('familyTreeDb.db') as conn:
        try:
            cursor = conn.cursor()
            cursor.execute(f"DELETE FROM {graph_tab_name} WHERE name=?", [graph_name])
            conn.commit()
        except sqlite3.Error as e:
            conn.rollback()
            return jsonify({'error': 'Error deleting graph', 'details': str(e)}), 500

# Retreive a graph
@app.route('/retreiveGraph/<graph_name>', methods=['GET'])
def retrieve_graph(graph_name):
    print("Retrieving data")
    graph_tab_name = getHashedTableName(session['user']['email'])

    with sqlite3.connect('familyTreeDb.db') as conn:
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM {graph_tab_name} WHERE name=?", [graph_name])
        row = cursor.fetchone()

        if row:
            print("Data retrieved successfully.")
            return jsonify(row)
        else:
            print("Data not found")

    return jsonify({}), 200

# Get all graphs
@app.route('/getGraphs', methods=['GET'])
def get_graphs():
    print("Loading graphs")
    graph_tab_name = getHashedTableName(session['user']['email'])

    with sqlite3.connect('familyTreeDb.db') as conn:
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM {graph_tab_name}")
        rows = cursor.fetchall()

        if len(rows) == 0:
            print("Database is empty")
            return jsonify([])
        else:
            print("Graphs loaded")
            return jsonify(rows)


if __name__ == '__main__':
    app.run(debug=True)
