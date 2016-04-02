/* jshint strict:true */

'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.get('/', function(req, res){
    res.sendFile(__dirname + '/assets/index.html');
});
app.set('port', port);
app.use('/', express.static(__dirname + '/assets'));
app.listen(app.get('port'), function () {
    console.log('Server started at port ' + port);
});