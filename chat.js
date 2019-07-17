let clients = [];

exports.subscribe = function(req, res) {
  clients.push(res);
  res.on('close', function() {
    clients.splice(clients.indexOf(res), 1);
  });
  
  console.log('chat.js::subscribe()::clients.length::', clients.length);
};

exports.publish = function(message) {
  console.log('publish "%s"', message);
  clients.forEach(function(res) {
    res.end(message);
  });

  clients = [];
};