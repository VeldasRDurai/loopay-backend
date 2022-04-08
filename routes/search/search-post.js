const { users } = require('../../database/database');

const personalDetailsPost = async ( req, res, next ) => {
    try{
        const { search } = req.body;

        const user = await users.findOne({
            'username': search });
        if( user !== null ){
            res.status(200).json({message:"Username already taken"});
            return;
        }
        res.status(200).json({message:"Username available"});
        return;
    } catch(e){
        console.log(e);
        res.status(500).send("Internal server error"); 
        return;
    }
}

module.exports = personalDetailsPost;