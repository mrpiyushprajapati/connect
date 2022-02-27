const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    // return res.end('<h1>express is up for connect</h1>');

    // console.log(req.cookies);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: 'lets CONNECT',
    //         posts: posts
    //     });
    // })

    try {
        //populate the user of each post
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        
        let users = await User.find({});
        
        return res.render('home', {
            title: 'lets CONNECT',
            posts: posts,
            all_users: users
        });

    } catch(error) {
        console.log('Error', error);
        return;
    }
}

//module.exports.actionName=function(req, res){}