const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name');

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        
        req.flash('success', 'Post published!');
        return res.redirect('back');

    } catch (error) {
         req.flash('error', error);
         console.log(error);
         return res.redirect('back');
    }

}

module.exports.destroy = async function(req, res){
   try {
        let post = await Post.findById(req.params.id);

        //.id means converting object id in string
        if(post.user == req.user.id){

            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted!"
                });
            }

            req.flash('success', 'Post deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized!');
            return res.redirect('back');
        }

   } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
   }
}