var mongoose = require('mongoose');

module.exports = mongoose.model('AFK_TIME', {
    time: Date
}, 'afk-time'
);
