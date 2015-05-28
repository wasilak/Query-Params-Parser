/**
* node.js API server
**/

// including Express.js module
var express = require('express');
var morgan = require('morgan');
var path = require('path');

// load locallydb
var locallydb = require('locallydb');

var port = 3000;

// load the database (folder) in './mydb', will be created if doesn't exist 
var db = new locallydb('./db');

var app = express();

// logging to console
app.use(morgan('dev'));

// path to static assets (CSS etc.)
app.use(express.static('public'));

// AngularJS views
// app.use(express.static('public/app/views'));

app.get('/api/get/:hash', function(req, res) {

    var hash = req.params.hash;

    var collection = db.collection('urls');
// collection.insert({
//             hash: 'test123',
//             url: 'http://wasil.org/?aaaa=bbbb&ccc=dddd#eeee'
//         });
    // var data = {
    //     'dsad32423fw': {
    //         hash: 'dsad32423fw',
    //         url: 'http://local.stepstone.de/m/?event=OfferView&wt=&we=&id=2676705&pos=0&zc=&loc=#afdasas'
    //     }
    // };
    
    // here get data from DB etc.
    var data = collection.where({hash: hash});
console.log(data);
    if (data.length() >= 1) {
        res.json(data.items[0]);
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
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening on http://%s:%s', host, port);
});
