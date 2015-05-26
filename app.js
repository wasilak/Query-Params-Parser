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

app.get('/api/get', function(req, res) {
    res.json({my_clever_response: 'Yo!'});
    // res.send('Yo!');
});

// catching all routes with single page AngularJS app.
// AngularJS will take care of the routing.
app.get('*', function(req, res) {
     // res.sendFile('./public/index.html');
     res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// server init on custom port
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening on http://%s:%s', host, port);
});
