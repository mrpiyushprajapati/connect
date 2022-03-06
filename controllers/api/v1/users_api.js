const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try {
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: "Invalid Username/Password"
            });
        }

        return res.status(200).json({
            message: "Signed in successfully, Hers's your token please keep it safe!",
            data: {
                token: jwt.sign(user.toJSON(), 'connect', {expiresIn: '100000'})
            }
        })
    } catch (error) {
        console.log('***', error);
        return res.status(500).json({
            message: "Internal error!"
        });
    }
}