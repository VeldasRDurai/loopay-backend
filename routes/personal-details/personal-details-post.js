
const personalDetailsPost = async ( req, res, next ) => {
    try{
        
        res.status(200).send("SUCCESS");
        return;
    } catch(e){
        console.log(e);
        res.status(500).send("Internal server error"); 
        return;
    }
}

module.exports = personalDetailsPost;