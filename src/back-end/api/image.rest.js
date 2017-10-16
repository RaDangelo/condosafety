'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const fs = require('fs');

let Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;
var gfs;

let conn = mongoose.connection;


conn.once('open', () => {
    gfs = Grid(conn.db);

    router.post('/:id', (req, res) => {
        let id = req.params.id;
        let part = req.files.file;
        let writeStream = gfs.createWriteStream({
            filename: id,
            mode: 'w',
            content_type: part.mimetype
        });

        writeStream.on('close', (file) => {
            if (!file) {
                res.status(400).send('Falha na inserção do arquivo!');
            }
            return res.status(200).send({
                message: 'Success',
                file: file
            });
        });
        writeStream.write(part.data, () => {
            writeStream.end();
        });
    });
});

module.exports = router;