module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{
        cors: {
            origin: 'http://localhost:8000'
        }
    });

    io.sockets.on('connection', function(socket){
        console.log('New connection recieved', socket.id)
 
        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        socket.on('join_room', function(data){
            console.log('joining request recieved', data);
        
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        })

        socket.on('send_message', function(data){
            console.log(data);
            // io.emit('receive_message',data);
            io.in(data.chatroom).emit('receive_message',data);
        })

    });
}