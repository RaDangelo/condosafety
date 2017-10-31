var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Watch_Control', {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    // action: Action, ENUM
    obs: String,
    duration: Number
}, 'watch-control'
);
