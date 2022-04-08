const { users } = require('../../database/database');

const personalDetailsPost = async ( req, res, next ) => {
    try{
        const { 
            username,
            name
        } = req.body;
        const email = req.email;

        const user = await users.findOne({'username': username});
        if( user !== null ){
            res.status(401).send("Username already taken");
            return;
        }

        await users.updateOne({'email': email},{
            'username'  : username,
            'name' : name,
            'gotPersonalDetails' : true
        });
        
        res.status(200).send("SUCCESS");
        return;
    } catch(e){
        console.log(e);
        res.status(500).send("Internal server error"); 
        return;
    }
}

module.exports = personalDetailsPost;