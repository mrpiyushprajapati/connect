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
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
                // model: 'User'
            }
            // populate: {
            //     path: 'likes'
            // }
        }).populate('likes');
        
        // console.log(posts);

        let users = await User.find({});
        
        if(req.isAuthenticated()){
            let friends = await User.findById(req.user.id).populate('friendList', 'name');
            return res.render('home', {
                title: 'lets CONNECT',
                posts : posts,
                all_users : users,
                friends : friends.friendList
            });
        }else{
            return res.render('home', {
                title: 'lets CONNECT',
                posts : posts,
                all_users : users
            });
        }

    } catch(error) {
        console.log('Error', error);
        return;
    }
}

//module.exports.actionName=function(req, res){}