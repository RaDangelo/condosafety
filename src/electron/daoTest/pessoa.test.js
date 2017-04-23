var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL 
var url = 'mongodb://localhost:27017/condosafety';
// Use connect method to connect to the Server 
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    // insertDocuments(db, function () {
    //     updateDocument(db, function () {
    //         deleteDocument(db, function () {
    findPessoas(db, function () {
        db.close();
        //         });
        //     });
        // });
    });
});

var findPessoas = function (db, callback) {
    // Get the documents collection 
    var collection = db.collection('Pessoa');
    // Find some documents 
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following docs");
        console.dir(docs);
        callback(docs);
    });

}