module.exports = {
    dev: {
        port: process.env.port || 8082,
        db: process.env.DB_LINK || 'mongodb://localhost:27017/condosafety'
    },
    prod: {
        //TODO !
    }
}