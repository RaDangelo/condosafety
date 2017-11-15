var Watch = require('../models/watch-control.vo');
require('promise');

const WatchControlDao = {
    getWatches() {
        return Watch.find().exec();
    },
    getFiltered(watch) {
        var query = {};
        if (watch.user && watch.user.username) {
            query['user.username'] = watch.user.username;
        }
        if (watch.date) {
            query['date'] = watch.date;
        }
        if (watch.action) {
            query['action'] = watch.action;
        }
        console.log(query);
        return Watch.find(query).exec();
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
