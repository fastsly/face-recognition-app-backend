const { response } = require('express');
const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const fs = require('fs')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const database ={
    users:[
        {
            id: '123',
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        }
    ],
    login:[
        {
            id:'1234',
            hash:'',
            email:'johndoe@gmail.com'
        }
    ]
}

app.get('/',(req,res) =>{
    //res.json(database.users)
    // fs.readFile('/', 'utf8', function (err,data) {
    //     if (err) {
    //       return console.log(err);
    //     }
        
    //   });
    //send a file through http
    //   res.status(200).sendFile(__dirname+'/prezenta2020aprilie.xlsx')
})

app.post('/signin', (req,res) =>{
    // bcrypt.compare("bacon", hash, function(err, res) {
    //     // res == true
    // });
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            res.json('success')
    } else {
        res.status(400).json('User doesn\'t exist or password incorrect')
    }  
})

app.post('/register', (req,res) => {
    const { email, name, password } = req.body
    
    bcrypt.hash(password, null, null, (err, hash) => {
        // Store hash in your password DB.
        console.log(hash)
        database.login.push({
            id:'',
            hash:hash
        })
    });

    database.users.push({
        id: '126',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.status(200).json(database.users[(database.users.length-1)])
})

app.get('/profile/:id',(req,res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            found = true;
           return res.json(user)
        }
    })
    if (!found){
        res.status(404).json('No such user!')
    }
})

app.post("/image",(req,res) =>{
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            user.entries++
            found = true;
           return res.json(user)
        }
    })
    if (!found){
        res.status(404).json('No such user!')
    }

})

bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// // Load hash from your password DB.

// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3003, () => {
    console.log("Server is running!")
})