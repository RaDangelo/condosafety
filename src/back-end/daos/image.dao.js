require('promise');
const mongoose = require('mongoose');
const fs = require('fs');

let Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;
var gfs;
let conn = mongoose.connection;

conn.once('open', () => {
    gfs = Grid(conn.db);
});

const ImageDao = {
    getImages(items) {
        return new Promise(function getImg(resolve, reject) {
            var itemsProcessed = 0;
            if (items && items.length) {
                items.forEach((i, index, array) => {
                    gfs.files.find({
                        filename: i._id.toString()
                    }).toArray((err, files) => {
                        setImage(files).then((data) => {
                            i.picture = data;
                            if (!i.picture) {
                                console.log('Imagem não encontrada para: ' + i.brand);
                            }
                            itemsProcessed++;
                            if (itemsProcessed === array.length) {
                                console.log("Itens processados com sucesso!");
                                resolve(items);
                            }
                        }).catch((err) => {
                            console.log('Erro ao processar imagens!');
                            reject(err);
                        });
                    });
                });
            } else {
                resolve(items);
            }
        });
    }
}

function setImage(files) {
    return new Promise(function setImg(resolve, reject) {
        let data = [];
        var img = null;
        if (files.length === 0) {
            resolve(img);
        }
        let readstream = gfs.createReadStream({
            filename: files[0].filename
        });

        readstream.on('data', (chunk) => {
            data.push(chunk);
        });

        readstream.on('error', (err) => {
            console.log('An error occurred getting vehicle\'s image!', err);
            reject(err);
        });

        readstream.on('end', () => {
            data = Buffer.concat(data);
            img = 'data:image/png;base64,' + Buffer(data).toString('base64');
            resolve(img);
        });
    });
}

module.exports = ImageDao;
