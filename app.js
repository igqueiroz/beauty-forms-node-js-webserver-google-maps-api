/* jshint esnext: true */

var http = require("http");
var fs = require("fs");
var path = require("path");
var AppHTML = require("./index");

http.createServer(function(req, res) {

  console.log(`${req.method} request for ${req.url}`);

  if (req.url === "/") {
    fs.readFile("./public/index.html", "UTF-8", function(err, html) {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(AppHTML);
    });

  } else if (req.url.match(/.css$/)) {

    var cssPath = path.join(__dirname, './', req.url);
    var fileStream = fs.createReadStream(cssPath, "UTF-8");

    res.writeHead(200, {"Content-Type": "text/css"});

    fileStream.pipe(res);

  } else if (req.url.match(/.jpg$/)) {

    var imgPath = path.join(__dirname, './', req.url);
    var imgStream = fs.createReadStream(imgPath);

    res.writeHead(200, {"Content-Type": "image/jpeg"});

    imgStream.pipe(res);

  } else if (req.url.match(/.png$/)) {

    var imgPath = path.join(__dirname, './', req.url);
    var imgStream = fs.createReadStream(imgPath);

    res.writeHead(200, {"Content-Type": "image/png"});

    imgStream.pipe(res);

  } else if (req.url.match(/.js$/)) {

    var imgPath = path.join(__dirname, './', req.url);
    var imgStream = fs.createReadStream(imgPath);

    res.writeHead(200, {"Content-Type": "text/javascript"});

    imgStream.pipe(res);

  } else if (req.url.match(/.json$/)) {

    var imgPath = path.join(__dirname, './', req.url);
    var imgStream = fs.createReadStream(imgPath);

    res.writeHead(200, {"Content-Type": "text/json"});

    imgStream.pipe(res);

  }else if (req.url.match(/.ttf$/)) {

    var imgPath = path.join(__dirname, './', req.url);
    var imgStream = fs.createReadStream(imgPath);

    res.writeHead(200, {"Content-Type": "font/ttf"});

    imgStream.pipe(res);

  } else {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("Oooooops: 404 Easynvest App v1.0.0 - File Not Found");
  }

}).listen(3000);