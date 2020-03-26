var fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
var prefix = "!";
//ping-pong
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

//Kicking
client.on("ready", () => {
  console.log("Kicking Boot Ready!");
});

client.on("message", message => {
  if (!message.guild) return;
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.content.startsWith("!kick")) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick({
            reason: "They were bad!"
          })
          .then(() => {
            message.reply("Successfully kicked ${user.tag}");
          })
          .catch(err => {
            message.reply("I was unable to kick the member");
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this server!");
      }
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
});

//Banning
client.on("ready", () => {
  console.log("Ban Hammer Ready!");
});
client.on("message", message => {
  if (!message.guild) return;
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.content.startsWith("!ban")) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({
            reason: "They were bad!"
          })
          .then(() => {
            message.reply(
              "Successfully smacked,  ${user.username} , with the ban hammer!"
            );
          })
          .catch(err => {
            message.reply("I was unable to Ban the member");
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this server!");
      }
    } else {
      message.reply("You didn't mention the user to Ban!");
    }
  }
});

//greetings
client.on("ready", () => {
  console.log("Greeter Hired!");
});

client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.cache.find(
    ch => ch.name === "member-log"
  );
  if (!channel) return;
  channel.send(
    `Me: The next person to join this server is ga- ${member} joined the server! Me: OK THE NEXT PERSON`
  );
});

client.on("message", message => {
  let msg = message.content.toUpperCase();
  let sender = message.author;
  let cont = message.content.slice(prefix.length).split(" ");
  let args = cont.slice(1);

  // Commands

  // Ping
  if (msg === prefix + "9/11") {
    message.channel.send(
      "On September 11, 2001, terrorists attacked the Unites States. They hijacked four airplanes in mid-flight. The terrorists flew two of the planes into two skyscrapers at the World Trade Center in New York City. The impact caused the buildings to catch fire and collapse. Another plane destroyed part of the Pentagon (the U.S. military headquarters) in Arlington, Virginia. The fourth plane crashed in Shanksville, Pennsylvania. Officials believe that the terrorists on that plane intended to destroy either the White House or the U.S. Capitol. Passengers on the plane fought the terrorists and prevented them from reaching their goal. In all, nearly 3,000 people were killed in the 9/11 attacks. \n Never Forgotten \n:cry: \n :pray:"
    );
  }

  // Purge
  client.on('message', function(message) {
    console.log(message.content)
    console.log(message.content.username)
    if (message.content == "!clear") {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
          message.channel.messages.fetch()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})
        }
    }

});
});

try {
  var token = fs.readFileSync("token.txt", "utf8").toString();
  client.login(token);
} catch (e) {
  console.log("Error:", e.stack);
}
