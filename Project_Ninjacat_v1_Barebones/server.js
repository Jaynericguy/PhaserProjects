var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const tmi = require('tmi.js');

var jevry_92 = {
  id:null,
  socket:null
  };

// Define configuration options
const opts = {
  identity: {
    username: 'jevry_92',
    password: 'oauth:odg9vr5sjzgzyfy82aukm29uqi7h8h'
  },
  channels: [
    'jevry_92'
  ]
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  //if (self) { return; } // Ignore messages from the bot
  // Remove whitespace from chat message
  const commandName = msg.trim();
  //Valid commands
  let pet_commands = ['!ninja-die', '!ninja-pull', '!ninja-slash', '!ninja-run']
  let bot_commands = ['!dice']
  // If the command is known, let's execute it
  
  console.log(`* Recieved ${commandName} command`);
  if (pet_commands.find(checkCmd)) {
    io.to(jevry_92.id).emit('playerCmded', commandName);
    if(commandName=='!ninja-die'){
      client.say(target, `Urgh... im dying`);
    }
    if(commandName=='!ninja-pull'){
      client.say(target, `Pulling`);
    }    
    if(commandName=='!ninja-slash'){
      client.say(target, `Slice n dice`);
    }   
    if(commandName=='!ninja-run'){
      client.say(target, `Ninja run!`);
    }       
  }if (bot_commands.find(checkCmd)) {
    if(commandName=='!dice'){
      let num = rollDice()
      client.say(target, `You rolled a: ${num}`);
    }    
  }else {
    client.say(target, `* Unknown command ${commandName}`);
  }
}
// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
//Find command in array
function checkCmd(cmd){
  return cmd
}

io.on('connection', function (socket) {
  console.log('jevry_92 overwritting following socket: ', jevry_92.id);
  jevry_92.socket=null;
  jevry_92.id=null;
  jevry_92.socket = socket;
  jevry_92.id = socket.id;
  console.log('jevry_92 connected to socket io with the new id: ', jevry_92.id);
  jevry_92.socket.on('playerCmded', function(data){
    console.log("im being fired", data)
  })
});

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

server.listen(8080, function () {
    console.log(`Listening on ${server.address().port}`);
});

