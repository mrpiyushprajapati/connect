const Comment = require('../models/comment');
const Post = require('../models/post');
const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try {
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.unshift(comment);
            post.save();

            comment = await comment.populate('user', 'name email');
            // commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('error in creating a queue');
                    return;
                }

                // console.log('job enqueued', job.id);
            })

            if (req.xhr){
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success', 'Comment added!');

            res.redirect('/');
        }
    } catch (error) {
        req.flash('error', error);
        return;
    }
}

module.exports.destroy = async function(req, res){
    try {
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){

            let postID = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postID, { $pull: {comments: req.params.id}});

            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment deleted!"
                });
            }

            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
            
        }else{
            req.flash('error', 'Unauthorized!');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', error);
        return;
    }
}