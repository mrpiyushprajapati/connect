class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('Connection established using sockets...');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'connect'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            });

        });

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'connect'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message recieved', data.message);

            let newMessage = $('<li>');
            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }
            newMessage.append($('<sub>',{
                'html': data.user_email
            }));
            newMessage.append($('<span>',{
                'html': data.message
            }));
            
            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
            var elem = document.getElementById('chat-messages-list');
            elem.scrollTop = elem.scrollHeight;
        });

    }

    // send_message(e){
    //     e.preventDefault();
    //     let msg = $('#chat-message-input').val();
    //     $('#chat-message-input').val('');
    //     if(msg != ''){
    //         this.socket.emit('send_message',{
    //             message: msg,
    //             user_email: this.userEmail,
    //             chatroom: 'connect'
    //         });
    //     }
    //     return false;
    // }
}