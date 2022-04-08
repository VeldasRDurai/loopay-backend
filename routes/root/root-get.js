const { users } = require('../../database/database');

const rootGet = async (req, res, next) => {
    try {
        const user = await users.findOne({'email': req.email},
            ['email', 'name', 'username', 'gotPersonalDetails']);
        res.status(200).json({
            email:user.email,
            name: user.name, 
            username: user.username, 
            gotPersonalDetails: user.gotPersonalDetails
        });
        return;
    } catch(e) {
        console.log(e);
        res.status(500).send("Internal server error"); 
        return;
    }
}

module.exports = rootGet;