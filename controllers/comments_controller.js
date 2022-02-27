const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes');

module.exports.create = async function(req, res){
    try {
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            req.flash('success', 'Comment added!');

            return res.redirect('/');
        }
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){
    try {
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){

            let postID = comment.post;

            comment.remove();

            let post = await Post.findByIdAndUpdate(postID, { $pull: {comments: req.params.id}});

            req.flash('success', 'Comment deleted!');

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