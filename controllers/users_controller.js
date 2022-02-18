module.exports.profile=function(req, res){
    // return res.end('<h1>user profiles if up</h1>')

    return res.render('profile', {
        title: 'Profile'
    });
}