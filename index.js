var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({
	host: '192.168.1.64',
	port: 8080
});

var id = 0;
var sockets = {};
 
wss.on('connection', function connection(ws) {

	ws.on('message', function incoming(message) {
		console.log('received: %s', message);

		for(var s in sockets) {
			if(ws.readyState === 1) {
				sockets[s].send(message, function() {});
			}
		}
	});

	ws.on('error', function(e) {
		console.log('ERR ->' , ws.id);
	});

	ws.on('close', function(e) {
		delete sockets[ws.id];
		console.log(Object.keys(sockets));
	});

	ws.id = id;
	sockets[ id++ ] = ws;
	console.log(Object.keys(sockets));

});

