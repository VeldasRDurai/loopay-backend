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
        const lastSearchUpto = new Date( Number(new Date()) + ( duration*60*60*1000 ) )
        await users.updateOne({'email':email},{
            'lastSearchSaved' : true,
            'lastSearchUpto' : lastSearchUpto,
            'currentMode': MAINPAGE_SAVED_MODE
        })
        socket.emit('save-search-acknowledge', {
            acknowledge: true,
            lastSearchSaved:true,
            lastSearchUpto
        });
    } catch(e){
        socket.emit('save-search-acknowledge', {
            acknowledge: false,
            lastSearchSaved:false,
            lastSearchUpto:new Date()
        });
        console.log(e);
    }
}

module.exports = saveSearch;