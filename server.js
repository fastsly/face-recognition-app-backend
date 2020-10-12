const { response } = require('express');
const express = require('express');

const app = express()
app.use(express.json())

const database ={
    users:[
        {
            id: '123',
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'pass',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/',(req,res) =>{
    res.sendStatus(200)
})

app.post('/signin', (req,res) =>{
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            res.json('success')
    } else {
        res.status(400).json('User doesn\'t exist or password incorrect')
    }
    
})

app.listen(3000, () => {
    console.log("Server is running!")
})