var Watch = require('../models/watch-control.vo');
require('promise');

const WatchControlDao = {
    getWatches() {
        return Watch.find().exec();
    },
    getFiltered(watch, users) {
        var query = {};
        if (users && users.length) {
            query['user'] = { $in: users };
        }
        if (watch.date) {
            query['date'] = watch.date;
        }
        if (watch.action) {
            query['action'] = watch.action;
        }
        console.log(query);
        return Watch.find(query).populate('user', 'username').exec();
    },
    saveWatch(watch) {
        return new Promise((resolve, reject) => {
            watch.save(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = WatchControlDao;
