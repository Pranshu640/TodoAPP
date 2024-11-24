const express = require('express');
const { globalAgent } = require('http');
const app = express();

app.use(express.json());

const mysql = require('mysql2');

const port = 8080;
const path = require('path');

app.use(express.urlencoded({extended :true}));

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "public")));

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'you',
    password : 'hello'
})

app.listen(port , () => {
    console.log('help');
})

app.get('/' , (req , res) => {
    res.render('Home.ejs');
})

{
    //this group hold the joining with prior account

    app.get('/continue' , (req , res) =>{
        res.send('non active page');
    })

    app.post('/continue' , (req , res) => {
        email = req.body.Email;
        pass = req.body.pass;
        
        try{
            q = 'Select password, id,name from users where email = ?'
            connection.query(q , [email] , (err , result)=> {
                if (err) throw err;
                console.log(result);
                if (email=='' || pass==''){
                    res.redirect('/');
                }
                else if (result[0].password === pass){
                    tableName = result[0].name+result[0].id;
                    res.redirect(`/todo/${tableName}`);
                }else{
                    res.redirect('/');
                }
            })
        }catch(err){
            console.log(err);
        }
        
    })
}




{
    //this group holds the create account code

app.get('/create' , (req , res) => {
    res.send('non active page');
})

app.post('/create', (req, res) => {
    console.log('Request body received:', req.body);
    const { username, email, pass } = req.body;

    if (!username || !email || !pass) {
        console.error('Invalid input: All fields are required.');
        return res.status(400).send('All fields are required.');
    }

    // Query to fetch all user IDs
    const getUsersQuery = 'SELECT id FROM users';

    try {
        console.log('Fetching existing user IDs...');
        connection.query(getUsersQuery, (err, result) => {
            if (err) {
                console.error('Error fetching user IDs:', err);
                return res.status(500).send('Error fetching user data.');
            }

            // Generate a unique ID for the new user
            console.log('Generating unique ID...');
            const finalid = idMakeer(result);
            const tableName = username + finalid;
            const userDetails = [finalid, username, email, pass];

            // Insert new user into the `users` table
            const insertUserQuery = 'INSERT INTO users VALUES (?, ?, ?, ?)';
            console.log('Inserting new user into the database...');

            connection.query(insertUserQuery, userDetails, (err, result) => {
                if (err) {
                    console.error('Error adding user to database:', err);
                    return res.status(500).send('Error adding user to database.');
                }

                console.log('User added successfully. Creating task table...');

                // Create a new task table for the user
                const createTableQuery = 'CREATE TABLE ?? (Task VARCHAR(200), status BOOLEAN)';
                connection.query(createTableQuery, [tableName], (err, result) => {
                    try {
                        let q = "INSERT INTO ?? VALUES ('Add a Task' , 0),('Create Account' , 1)"
                        connection.query(q , [tableName] , (err , result) => {
                            if (err) throw err;
                            console.log('done');
                        })
                    }catch(err){
                        console.log(err);
                    }
                    if (err) {
                        console.error('Error creating task table:', err);
                        return res.status(500).send('Error creating task table.');
                    }

                    console.log('Task table created successfully.');
                    ;
                    res.redirect(`/todo/${tableName}`);
                });
            });
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).send('An unexpected error occurred.');
    }
});


}


app.get('/todo/:id' , (req , res) => {
    console.log(req.params);
    q = 'SELECT * FROM ??';
    try{
        
        connection.query(q , [req.params.id] , (err , result) => {
            let id = req.params.id;
            if (err) throw err;
            // console.log(result);
            res.render('todo.ejs', { result , id });
        })
    }catch(err){
        console.log(err);
    }
    
})

// app.post('/updateTaskStatus' , (req , res) => {
//     console.log(req.params);
//     console.log(req.body);
//     console.log('req accepted');
//     res.send({});
// })

app.post('/updateTaskStatus', (req, res) => {
    console.log('Request body:', req.body);  // Log the request body to verify

    const { tableName, taskName, status } = req.body;

    const q = 'UPDATE ?? SET status = ? WHERE Task = ?';
    const values = [tableName, status, taskName];

    try 
    {connection.query(q , values , (err , result) => {
        if (err) throw err;
        res.redirect(`/todo/${tableName}`)
    })
    }catch(err){
        console.log(err);
    }

});

// Other routes and middleware...

app.post('/addtasks' , (req , res) => {
    let {id , task} = req.body;

    let q = 'INSERT INTO ?? VALUES (?,0)'
    try{
       connection.query(q,[id,task] , (err , result) => {
            if (err) throw err;
            res.redirect(`/todo/${id}`);
    }) 
    }catch(err){
        console.log(err);
    }
    
})

let idMakeer = (result) => {
    // Extract all existing IDs into a Set for fast lookup
    const existingIds = new Set(result.map((record) => record.id));

    while (true) {
        // Generate a random ID
        const id_ = ((Math.floor(Math.random() * 100000)) + 1).toString();

        // Check if the generated ID is unique
        if (!existingIds.has(id_)) {
            return id_;
        }
    }
};

let PseudoData = (a) => {
    try {
        let q = "INSERT INTO ?? VALUES ('Add a Task' , 0),('Create Account')"
        connection.query(q , [a] , (err , result) => {
            console.log('done');
        })
    }catch(err){
        console.log(err);
    }
}