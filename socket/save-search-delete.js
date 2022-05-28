const { users } = require('../database/database');
const { MAINPAGE_SEARCH_MODE, } = require('../database/currentModeTypes');

const saveSearchDelete = async ({ 
    email,
    socket 
}) => {
    try{
        console.log('save-search-delete : ',{ 
            email
        });
        await users.updateOne({'email':email},{
            'lastSearchSaved' : false,
            'lastSearchUpto' : undefined,
            'currentMode': MAINPAGE_SEARCH_MODE
        })
        socket.emit('save-search-delete-acknowledge', {
            acknowledge: true,
            lastSearchSaved: false,
            lastSearchUpto : undefined,
            requestFrom : undefined,
            requestFromUpto : undefined,
        });
    } catch(e){
        socket.emit('save-search-delete-acknowledge', {
            acknowledge: false
        });
        console.log(e);
    }
}

module.exports = saveSearchDelete;