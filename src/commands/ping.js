const Discord = require('discord.js');
const config = require('../../profile/config.json');

module.exports = {
  name: 'ping',
  description: 'Calculate latency',
  usage: '',
  aliases: ['none'],
  example: '',
  args: false,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    message.delete();

    const embed = new Discord.RichEmbed()
        .setTitle("Pong!")
        .setColor(config.colour)
        .setTimestamp()
        .addField("API Latency", `${Math.round(message.client.ping)}ms`, true)
    message.channel.send({embed})

  },
};
