const { users } = require('../database/database');
const {
    MAINPAGE_SAVED_MODE,
} = require('../database/currentModeTypes');

const saveSearch = async ({ 
    email,
    duration, 
    socket 
}) => {
    try{
        console.log('save-search : ',{ 
            email,
            duration 
        });
        await users.updateOne({'email':email},{
            'lastSearchSaved' : true,
            'lastSearchUpto' : new Date( Number(new Date()) + ( duration*60*1000 ) ),
            'currentMode': MAINPAGE_SAVED_MODE
        })
        socket.emit('save-search-acknowledge', {
            acknowledge: true
        });
    } catch(e){
        socket.emit('save-search-acknowledge', {
            acknowledge: false
        });
        console.log(e);
    }
}

module.exports = saveSearch;