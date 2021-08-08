const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.connect("connection", socket => {
    socket.connect("connectRoom", box => {
        socket.join(box);
    });
});


mongoose.connect('mongodb+srv://onministack:onministack@goweek-backend.0toen.mongodb.net/onministack?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next)=>{
    req.io = io;

    return next();
})


app.use(express.json()); // FOR SEVER TO UNDERSTAND THE REQUESTS IN JSON FORMAT
app.use(express.urlencoded({extended: true})); //TO ALLOW UPLOADING FILES, AND SENDING FILES
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.use(require('./routes'));


server.listen(process.env.PORT || 3333);