var user_input = require('../models/user_input');

module.exports = function(app)
{
    app.get('/', function(req, res) {
        console.log(req.session);
        console.log(req.sessionID);
        
        res.render('index', {
            title: "Collection Manager"
        })
    });
    app.get('/create', function(req, res) {
        res.render('create', {
            title: "Create New Entry"
        })
    });
    app.get('/delete', function(req, res) {
        res.render('delete', {
            title: "Delete Entry"
        })
    });
    app.get('/update', function(req, res) {
        res.render('update', {
            title: "Update Entry"
        })
    });
    app.get('/search', function(req, res) {
        res.render('search', {
            title: "Search Collection"
        })
    });
    app.get('/read', function(req, res) {
        res.render('read', {
            title: "View Collection"
        })
    });
    app.post('/create', function(req, res) {
        var new_media = new user_input()
        new_media.title = req.body.title
        new_media.author = req.body.author
        new_media.type = req.body.type
        new_media.user = req.sessionID
        new_media.description = req.body.description 

        new_media.save(function(err){
            if(err){
                console.log(err)
                res.json({result: 0 })
            }
            res.json({result: 1 });
        })
    });
    app.post('/read', function(req,res){
        user_input.find({}, {"_id":false})
        .then(function(output){
            res.json(output)
        })
        .catch((err) => {
            console.error(err);
            res.send("Error")
        })
    });
    app.post('/titlesearch', function(req,res){
        user_input.find({title:req.body.title}, {"_id":false})
        .then(function(output){
            if(output === undefined ||output.length ==0){
                res.send("Nothing")
            }else{
                res.json(output)
            }
        })
        .catch((err) => {
            console.error(err);
            res.send("Error")
        })
    });
    app.post('/authorsearch', function(req,res){
        user_input.find({author:req.body.author}, {"_id":false})
        .then(function(output){
            if(output === undefined ||output.length ==0){
                res.send("Nothing")
            }else{
                res.json(output)
            }
        })
        .catch((err) => {
            console.error(err);
            res.send("Error")
        })
    });
    app.post('/typesearch', function(req,res){
        user_input.find({type:req.body.type}, {"_id":false})
        .then(function(output){
            if(output === undefined ||output.length ==0){
                res.send("Nothing")
            }else{
                res.json(output)
            }
        })
        .catch((err) => {
            console.error(err);
            res.send("Error")
        })
    });
    app.post('/update', function(req,res){
        user_input.update({title:req.body.title},
            {title:req.body.title,
            author:req.body.author,
            type:req.body.type,
            user:req.sessionID,
            description:req.body.description
            })
        .then(function(output){
            res.json(output)
        })
        .catch((err) => {
            console.error(err);
            res.send("Error")
        })
    });
    app.post('/delete', function(req,res){
        user_input.remove({title:req.body.title})
        .then(function(output){
            res.json(output)
        })
        .catch((err) => {
            console.error(err);
            res.send("Error")
        })
    });
}