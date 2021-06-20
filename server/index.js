var express = require('express');
var app= express();
var server = require('http').Server(app);
var io = require('socket.io')(server,{
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    }
});

app.use(express.static('client'));//public

app.get('/hola-mundo', function (req, res){
	res.status(200).send('Hola muod desde una ruta');

});
var messages =[{
id:1,
text:'Bienvenido al chat privado de jordi martinez..',
nickname:'Bot - jordisweb.com'
}];

io.on('connection', function(socket){
	//Para todos los que tengan problemas con Socket.ioen las nuevas versiones "SocketIO.handshake.address" ya no funciona. Hay que cambiarlo por "socket.handshake.address"
	console.log(" El cliente con IP: "+ socket.handshake.address +" Se ha conectado..." )
	socket.emit('messages',messages);
	socket.on('add-message', function(data){
		messages.push(data);

		io.sockets.emit('messages',messages);
	});

});

server.listen(6677, function(){
	console.log('Sevidor esta funcionando en http://localhost:6677')
});
