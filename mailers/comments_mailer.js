const nodeMailer = require('../config/nodemailer');

//newComment = function(comment){}
//module.exports = newComment;

//this is another way of exporting a method
exports.newComment = (comment)=>{
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'mailpiyushprajapati@gmail.com',
        to: comment.user.email,
        subject: "New comment published!",
        html: htmlString
    }, (err, info)=>{
        if(err){
            console.log('error in sending mail', err);
            return;
        }

        console.log('Mail sent!', info);
        return;
    })
}