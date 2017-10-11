'use strict';

const router = require('express').Router();
const config = require('../config/database');
const mongoose = require('mongoose');
require('promise');
const fs = require('fs');

let Grid = require("gridfs-stream");
let conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
var gfs;

var Vehicle = require('../models/vehicle.vo');

conn.once('open', () => {
    gfs = Grid(conn.db);
    router.get('/', (req, res) => {
        function vehicles$() {
            return Vehicle.find().exec();
        }
        var promise = vehicles$();

        promise.then(function (v) {
            v.forEach(function (vehic) {
                var img;
                gfs.files.find({
                    filename: vehic._id.toString()
                }).toArray((err, files) => {
                    img = setImg(files);
                    if (!img) {
                        console.log('Image not found for: ' + vehic.brand);
                    }
                    console.log('1', img);
                    vehic.picture = img;
                });
            });
            res.json(v);
        }).catch(function (error) {
            console.log(error);
        });


        function setImg(files) {
                let data = [];
                var img = null;
                if (files.length === 0) {
                    res.end(img);
                }
                let readstream = gfs.createReadStream({
                    filename: files[0].filename
                });

                readstream.on('data', (chunk) => {
                    data.push(chunk);
                });

                readstream.on('error', (err) => {
                    res.status(500).send(err);
                    console.log('An error occurred getting vehicle\'s image!', err);
                });

                readstream.on('end', () => {
                    data = Buffer.concat(data);
                    img = 'data:image/png;base64,' + Buffer(data).toString('base64');
                    res.end(img);
                });
            };
    });

    router.put('/', (req, res) => {
    });

    router.post('/', (req, res, next) => {

        Vehicle.findById(req.param('_id'), function (err, v) {
            if (err) {
                console.log('Erro ao cadastrar veículo: ' + err);
                return next(err);
            }

            if (!v) {
                Vehicle.findOne({ 'plate': req.param('plate') }, function (err, v) {

                    if (err) {
                        console.log('Erro ao cadastrar veículo: ' + err);
                        return next(err);
                    }

                    if (v) {
                        console.log('Veículo já cadastrado!');
                        var err = new Error('Veículo já cadastrado!');
                        err.status = 500;
                        return next(err);
                    }

                    var vehicle = new Vehicle(req.body);

                    vehicle.save(function (err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json({ status: 200 });
                        }
                    });
                });
            } else {
                // atualiza veiculo
                v.plate = req.param('plate');
                v.brand = req.param('brand');
                v.color = req.param('color');
                v.status = req.param('status');
                v.picture = req.param('picture');

                v.save(function (err) {
                    if (err) {
                        console.log('Erro ao alterar veículo: ' + err);
                        throw err;
                    }
                    console.log('Veículo alterado com sucesso!');
                    res.json({ status: 200 });
                });
            }
        });
    });

    // delete pessoa
    router.post('/delete', (req, res) => {
        Vehicle.remove({
            _id: req.body._id
        }, function (err, v) {
            if (err)
                res.send(err);

            Vehicle.find(function (err, v) {
                if (err)
                    res.send(err)
                res.json(v);
            });
        });
    });

    router.post('/image/:id', (req, res) => {
        let id = req.params.id;
        let part = req.files.file;
        let writeStream = gfs.createWriteStream({
            filename: id,
            mode: 'w',
            content_type: part.mimetype
        });

        writeStream.on('close', (file) => {
            // checking for file
            if (!file) {
                res.status(400).send('No file received');
            }
            return res.status(200).send({
                message: 'Success',
                file: file
            });
        });
        // using callbacks is important !
        // writeStream should end the operation once all data is written to the DB 
        writeStream.write(part.data, () => {
            writeStream.end();
        });
    });
});

function getImage(id) {
    console.log('AAAAAAAAAAAAA', gfs.files);
    let imgname = id;
    gfs.files.find({
        filename: imgname
    }).toArray((err, files) => {

        if (files.length === 0) {
            return null;
        }
        let data = [];
        let readstream = gfs.createReadStream({
            filename: files[0].filename
        });

        readstream.on('data', (chunk) => {
            data.push(chunk);
        });

        readstream.on('end', () => {
            data = Buffer.concat(data);
            let img = 'data:image/png;base64,' + Buffer(data).toString('base64');
            return img;
        });

        readstream.on('error', (err) => {
            res.status(500).send(err);
            console.log('An error occurred getting vehicle\'s image!', err);
        });
    });
}


module.exports = router;