var mongoose = require('mongoose');

module.exports = mongoose.model('Watch_Control', {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    // action: Action, ENUM
    obs: String,
    duration: Date
}, 'watch-control'
);
