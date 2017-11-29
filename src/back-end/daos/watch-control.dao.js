var Watch = require('../models/watch-control.vo');
require('promise');

const WatchControlDao = {
    getWatches() {
        return Watch.find().exec();
    },
    getFiltered(watch, users, date) {
        var query = {};
        if (users && users.length) {
            query['user'] = { $in: users };
        }
        if (watch.date) {
            var start = new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10), 00, 00, 00, 00);
            var end = new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10), 00, 00, 00, 00);
            end.setDate(end.getDate() + 1);

            query['date'] = { $gte: start, $lt: end };
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
