/**
* node.js API server
**/

// including Express.js module
var express = require('express');
var morgan = require('morgan');
var path = require('path');

// load locallydb
var locallydb = require('locallydb');

// load the database (folder) in './mydb', will be created if doesn't exist 
var db = new locallydb('./db');
var collection = db.collection('urls');

// YT like hash IDs
var hashids = require("hashids"),
hashids = new hashids("dsiajh@#@d7847$$%%6238kjdbicu", 6);

var app = express();
app.set('port', (process.env.PORT || 3000));

// logging to console
app.use(morgan('dev'));

// path to static assets (CSS etc.)
app.use(express.static('public'));

// AngularJS views
// app.use(express.static('public/app/views'));

app.post('/api/save/:url/:hash', function(req, res) {
  var url = req.params.url;
  var hash = req.params.hash;

  console.log(url, hash);

  if ('undefined' !== hash) {
    console.log("update");
    var decodedHashId = hashids.decode(hash);
    decodedHashId = decodedHashId[0];

    var data = collection.get(decodedHashId);

    if (data) {
      collection.update(decodedHashId, {url: url});

      res.json({
          error: false,
          type: 'update',
          message: 'update successfull',
          hash: hashids.encode(data.cid)
      });
    } else {
      res.json({
          error: true,
          type: 'update',
          message: 'update failed. HashID does not exists...'
      });
    }
  } else {
    console.log("insert");
    var newID = collection.insert({
        url: url
    });

    res.json({
        error: false,
        type: 'insert',
        message: 'insert successfull',
        hash: hashids.encode(newID)
    });
  }
});

app.get('/api/get/:hash', function(req, res) {

    var hash = req.params.hash;

    // here get data from DB etc.
    // decoding HashID returns array, so we need first element
    var decodedHashId = hashids.decode(hash);
    var data = collection.get(decodedHashId[0]);

    if (data) {
        res.json(data);
    } else {
        res.json({
            error: true,
            message: 'hash not found'
        });
    }
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

    console.log('Listening on http://%s:%s', host, port);
});
