var mongoose = require('mongoose');

module.exports = mongoose.model('AFK_TIME', {
    time: Number
}, 'afk-time'
);
