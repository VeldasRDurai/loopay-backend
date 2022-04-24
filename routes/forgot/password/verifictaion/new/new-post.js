const bcrypt  = require('bcryptjs');

const { users } = require('../../../../../database/database');

const newPost = async ( req, res, next ) => {
    try {
        const { password } = req.body;
        const hashedPassword = 
            await bcrypt.hash( password.toString(), 10 );
        await users.updateOne({ 'email': req.email },{
            'hashedPassword': hashedPassword
        });
        res.status(200).json({});
        return;
    } catch(e){
        console.log(e);
        res.status(500).json({
            errorNo : 0,
            errorMessage : 'Internal server error'
        }); 
        return;
    }
};

module.exports = newPost;