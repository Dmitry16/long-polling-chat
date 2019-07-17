let http = require('http');
let fs = require('fs');
let chat = require('./chat');

http.createServer(function(req, res) {

  switch (req.url) {

    case '/':
      console.log('server.js::subscribe!')
      sendFile('index.html', res);
    break;

    case '/subscribe':
      chat.subscribe(req, res);
    break;
      
    case '/publish':
      let body = ''; let chank = '';

      req
        .on('readable', function() {
          chank = req.read();
          if (chank)
            body += chank;
        })
        .on('end', function() {
          body = JSON.parse(body);
          chat.publish(body.message);
          res.end('OK');
        });
    break;

    default:
      res.statusCode = 404;
      res.end('Not found');
  }

}).listen(3333);
console.log('server is listening on the 3333!');

function sendFile(fileName, res) {

  let fileStream = fs.createReadStream(fileName);
  fileStream
    .on('error', function() {
      res.statusCode = 500;
      res.end('Server error');
    })
    .pipe(res);
};
