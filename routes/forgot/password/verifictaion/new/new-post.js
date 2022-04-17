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
        res.status(200).send("SUCCESS");
        return;
    } catch(e){
        console.log(e);
        res.status(500).send("Internal server error"); 
        return;
    }
};

module.exports = newPost;