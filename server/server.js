var http = require('http');
var sockjs = require('sockjs');
var _ = require('underscore');

var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });

var clients = {};

echo.on('connection', function(conn) {
  conn.on('data', function(message) {
    console.log("incoming data", message);
    message = JSON.parse(message);
    //conn.write(message);
    
    /** handle connection from standard page */
    if(message.action === "clientStart" && _.isUndefined(message.token) === false){
      /**
       * Init new client. Add current connection to clients list (with token)
       */
      console.log("new client", message.token);
      clients[message.token] = conn;
    }

    /** handle connection from remote page */
    if(message.action === "remoteCommand" && _.isUndefined(message.token) === false && _.isUndefined(message.command) === false){
      /** send command from remote to related client */
      var clientConn = clients[message.token];
      console.log("remote command", message.command);
      if(_.isUndefined(clientConn) === false){
        clientConn.write(message.command);
      }
    }
    
  });
  conn.on('close', function() {});
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/echo'});
server.listen(9999, '0.0.0.0');