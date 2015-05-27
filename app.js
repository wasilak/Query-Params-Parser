/**
* node.js API server
**/

// including Express.js module
var express = require('express');
var morgan = require('morgan');
var path = require('path');

var port = 3000;

var app = express();

// logging to console
app.use(morgan('dev'));

// path to static assets (CSS etc.)
app.use(express.static('public'));  

app.get('/api/get/:hash', function(req, res) {

    var hash = req.params.hash;

    // here get data from DB etc.
    var data = {
        'dsad32423fw': {
            hash: 'dsad32423fw',
            url: 'http://local.stepstone.de/m/?event=OfferView&wt=&we=&id=2676705&pos=0&zc=&loc=#afdasas'
        }
    };

    if (data[hash]) {
        res.json(data[hash]);
    } else {
        res.json({
            error: true,
            message: 'hash not found'
        })
    }
});

// catching all routes with single page AngularJS app.
// AngularJS will take care of the routing.
app.get('*', function(req, res) {
     res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// server init on custom port
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening on http://%s:%s', host, port);
});
