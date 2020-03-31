var fs     = require('fs');
var http   = require('http');
var https  = require('https');
var path   = require("path");
var express = require('express');
var app = express();

var privateKey  = fs.readFileSync('./certificates/key.pem', 'utf8');
var certificate = fs.readFileSync('./certificates/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

console.log(credentials)

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

var LANAccess = "0.0.0.0";


httpServer.listen(8080, LANAccess);
httpsServer.listen(3000,LANAccess)

// Serve the index.html file as content of the / route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index2.html'));
});
app.use('/js', express.static('./js'));