var fs = require("fs");
const { Client, MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const client = new Discord.Client()
const { token } = require("./config.json")
var prefix = "!";

client.login(token)

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
            message.reply("Successfully kicked");
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
            message.reply("Successfully smacked them with the ban hammer!");
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
    `Woah Welcome ${member}! Didn't expect you to join?!`
  );
});

client.on("message", message => {
  let msg = message.content.toUpperCase();
  let sender = message.author;
  let cont = message.content.slice(prefix.length).split(" ");
  let args = cont.slice(1);

  // Commands

  // Joe
  if (message.content == "!joe") {
    message.channel.send(
      "JOE MAMA!"
    );
  }
  // Covid-19

  if (message.content == "!covid" || message.content == "!Covid") {
    if (message.author.bot) return;
    message.channel.send(
      "The Symptoms of Covid-19 are: ```\ncough \nfever \ntiredness \ndifficulty breathing (severe cases) \nBluish Lips or face \nConfusion \nAnd persisitant chest pain``` \n If you have these, do the 5: ```\n 1.HANDS: Wash them often \n 2.ELBOW: Cough into it \n 3.FACE: Don't touch it \n 4.SPACE: Keep safe distance \n 5.HOME: Stay if you can```"
    );
  }

  // Purge
  client.on("message", function (message) {
    console.log(message.content);
    console.log(message.content.username);
    if (message.content == "!clear") {
      if (message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.messages.fetch().then(
          function (list) {
            message.channel.bulkDelete(list);
          },
          function (err) {
            message.channel.send("ERROR: ERROR CLEARING CHANNEL.");
          }
        );
      }
    }
  });
});
//reaction role
client.on("message", message => {
  if (message.author.bot) {
    if (message.embeds) {
      const embedMsg = message.embeds.find(msg => msg.title === "Server Roles");
      if (embedMsg) {
        message.react("692835395163127868")
          .then(reaction => message.react("692835384035508254"))
          .then(reaction => message.react("692835371297275985"))
          .then(reaction => message.react("692835204540399646"))
          .catch(err => console.log(error));
      }
    }

    return;
  }
  if (message.content.toLowerCase() === "!roles") {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Server Roles");
    embed.setColor("RED");
    embed.setDescription(
      "<:Senior:692835395163127868> - Seniors \n<:Junior:692835384035508254> - Juniors \n<:Sophomore:692835371297275985> - Sophomores\n <:Freshman:692835204540399646> - Freshmen"
    );
    message.channel.send(embed);
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  if (user.bot)
    return;

  var roleName = reaction.emoji.name;
  var role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
  var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
  member.roles.add(role).then(member => {
    console.log("added " + member.user.username + "to a role!");
  }).catch(err => console.error)

  client.on('messageReactionRemove', (reaction, user) => {
    if (user.bot)
      return;
  
    var roleName = reaction.emoji.name;
    var role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
    var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
    member.roles.remove(role).then(member => {
      console.log("removed " + member.user.username + "'s role!");
    }).catch(err => console.error)
  
  });
});
