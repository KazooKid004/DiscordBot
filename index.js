var fs = require("fs");
const {
  Client,
  MessageEmbed
} = require("discord.js");
const Discord = require("discord.js")
const client = new Discord.Client()
const {
  token
} = require("./secrets/Token.json")
var prefix = "?";
var version = "v-1.1.0";

client.login(token)

//Login
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
//Created by
client.on("message", function (message) {
  if (message.content == `${prefix}creator` || message.content == `${prefix}c`) {
    if (message.author.bot) return;
    message.channel.send('Created by: KazooKid#7454');
  }
});
//help
client.on("message", message => {
  if (!message.guild) return;
  if (message.content.toLowerCase() === `${prefix}help`) {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Bot Commands");
    embed.setColor("RED");
    embed.setDescription(
      `1. ${prefix}clear - Clears Chat \n 2. ${prefix}kick <user> - Kicks them with a kicking boot\n 3. ${prefix}ban <user> - Smacks them with a ban hammer\n 4. ${prefix}covid - lists the symptoms and 5 steps on how to not spread it\n 5. ${prefix}roles - Role Reaction\n 6. ${prefix}creator or ${prefix}c - Tells you who made this bot\n 7. ${prefix}help - shows you this`
    );
    message.channel.send(embed);
  }
});
//Kicking
client.on("message", message => {
  if (!message.guild) return;
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.content.startsWith(`${prefix}kick`)) {
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
//Mute

//Banning
client.on("message", message => {
  if (!message.guild) return;
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.content.startsWith(`${prefix}ban`)) {
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
client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.cache.find(
    ch => ch.name === "member-log"
  );
  if (!channel) return;
  channel.send(
    `Woah Welcome ${member}! Didn't expect you to join?!`
  );
});
// Covid-19
client.on("message", function (message) {
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.content == `${prefix}covid` || message.content == `${prefix}Covid`) {
    if (message.author.bot) return;
    message.channel.send(
      "The Symptoms of Covid-19 are: ```\ncough \nfever \ntiredness \ndifficulty breathing (severe cases) \nBluish Lips or face \nConfusion \nAnd persisitant chest pain``` \n If you have these, do the 5: ```\n 1.HANDS: Wash them often \n 2.ELBOW: Cough into it \n 3.FACE: Don't touch it \n 4.SPACE: Keep safe distance \n 5.HOME: Stay if you can```"
    );
  }
});
// Purge
client.on("message", function (message) {
  console.log(message.content);
  console.log(message.content.username);
  if (message.content == `${prefix}clear`) {
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
//reaction role
client.on("message", message => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.author.bot) {
    if (message.embeds) {
      const embedMsg = message.embeds.find(msg => msg.title === "Server Roles");
      if (embedMsg) {
        message.react("693965541437735052")
          .then(reaction => message.react("693965493777989714"))
          .then(reaction => message.react("693965459032244295"))
          .then(reaction => message.react("693965406964154417"))
          .catch(err => console.log(error));
      }
    }

    return;
  }
  if (message.content.toLowerCase() === `${prefix}roles`) {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Server Roles");
    embed.setColor("RED");
    embed.setDescription(
      "<:Seniors:693965541437735052> - Seniors \n<:Juniors:693965493777989714> - Juniors \n<:Sophomores:693965459032244295> - Sophomores\n <:Freshmen:693965406964154417> - Freshmen"
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
});
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
client.on("ready", () => {
  client.user.setPresence({
    activity: {
      name: `Minecraft | ${prefix}help | Verison: ${version}`
    }
  });
});
