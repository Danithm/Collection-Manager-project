const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const connectMDB = require('./models/connectMongoDB');
connectMDB();

app.use(session({
    secret: 'your password',
    resave: false,
    saveUninitialized: false,
    store:new FileStore() //save session in files
}))

app.use(express.static('public')); //default path
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile); //rendering html

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//call router module after adding all middleware
const router = require('./router/router')(app)

app.listen(3000, function() {
    console.log('Listening on port 3000!')
});