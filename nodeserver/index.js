// This is node server which will handle socket io connection
const io = require('socket.io')(8000) // initialize io and want to execute on port 8000
const users = {};    //socket.io attach http instance to itself.
io.on('connection', socket => { // io.on - it is the instance it listens who messages to whom
    
    // If any users joins, lets others users connected to the server know
    
    socket.on('new-user-joined', name => {
        // console.log("New User:", name);
        users[socket.id] = name; // if any user joined then it added into the list of users

        socket.broadcast.emit('user-joined', name); //"rahul has joined chat" this messasge is sent to other joined persons expect him.
    });


    //If someone sends a message, broadcast it to others.

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });

    //if someone leave the message

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', { message: message, name: users[socket.id] })
        delete users[socket.id];

    });




});