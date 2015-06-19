/**
* node.js API server
**/

/* jslint node: true */
"use strict";

// including Express.js module
var express = require('express');
var morgan = require('morgan');
var path = require('path');

// load Mongoose - MongoDB access lib
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);

var urlModel = mongoose.model(
    'url',
    {
        "url": String,
        "created": Date,
        "updated": Date
    }
);

// YT like hash IDs
var hashids = require("hashids"),
hashids = new hashids("dsiajh@#@d7847$$%%6238kjdbicu", 12);

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(morgan('dev'));

// path to static assets (CSS etc.)
app.use(express.static('public'));

app.post('/api/save/:url/:hash', function(req, res) {
  var url = req.params.url;
  var hash = req.params.hash;


  if ('undefined' !== hash) {
    var decodedHashId = hashids.decodeHex(hash);

    urlModel.findOne({ _id: decodedHashId }, function(err, urlToUpdate) {
        if (err) {
            res.json({
                error: true,
                message: 'hash not found'
            });
        } else {
            urlToUpdate.url = url;
            urlToUpdate.updated = new Date();
            urlToUpdate.save(function(err) {
                if (err) {
                    res.json({
                        error: true,
                        message: 'update failed...'
                    });
                } else {
                    res.json({
                        error: false,
                        type: 'update',
                        message: 'update successfull',
                        hash: hash
                    });
                }
            });
        }
    });
  } else {

    var newUrl = new urlModel({
        url: url,
        created: new Date(),
        updated: new Date()
    });

    newUrl.save(function(err) {
        if (err) {
            res.json({
                error: true,
                message: 'insert failed...'
            });
        } else {
            res.json({
                error: false,
                type: 'insert',
                message: 'insert successfull',
                hash: hashids.encodeHex(newUrl._id)
            });
        }
    });

  }
});

app.get('/api/get/:hash', function(req, res) {

    var hash = req.params.hash;

    // here get data from DB, decoding HashID
    var decodedHashId = hashids.decodeHex(hash);

    urlModel.findOne({ _id: decodedHashId }, function(err, data) {
        if (err) {
            res.json({
                error: true,
                message: 'hash not found'
            });
        } else {
            res.json(data);
        }
    });
});

// catching all routes with single page AngularJS app.
// AngularJS will take care of the routing.
app.get('*', function(req, res) {
     res.sendFile(path.join(__dirname, 'public', 'layout.html'));
});

// server init on custom port
var server = app.listen(app.get('port'), function() {
    var host = server.address().address;
    var port = server.address().port;

});
