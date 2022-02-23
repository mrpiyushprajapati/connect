const Post = require('../models/post');

module.exports.home=function(req, res){
    // return res.end('<h1>express is up for connect</h1>');

    // console.log(req.cookies);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: 'lets CONNECT',
    //         posts: posts
    //     });
    // })

    //populate the user of each post
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home', {
            title: 'lets CONNECT',
            posts: posts
        });
    })
}

//module.exports.actionName=function(req, res){}