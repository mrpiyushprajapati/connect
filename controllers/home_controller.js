const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    // return res.end('<h1>express is up for connect</h1>');

    // console.log(req.cookies);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: 'lets CONNECT',
    //         posts: posts
    //     });
    // })

    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        User.find({}, function(err, users){
            if(err){
                console.log('error finding in user');
                return;
            }

            return res.render('home', {
                title: 'lets CONNECT',
                posts: posts,
                all_users: users
            });
        });
    });
}

//module.exports.actionName=function(req, res){}