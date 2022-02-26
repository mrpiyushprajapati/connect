const moongose = require('mongoose');

const commentSchema = new moongose.Schema({
    content: {
        type: String,
        required: true
    },
    //comment belongs to a user
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
});

const Comment = moongose.model('Comment', commentSchema);

module.exports = Comment;