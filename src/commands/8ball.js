const config = require('../../profile/config.json');
const a = [
    "Yes",
    "No",
    "Maybe",
    "Ask again later",
    "Impossible",
    "Better not tell you now",
    "Concentrate and ask again"
];

module.exports = {
  name: '8ball',
  description: 'Ask 8ball a question',
  usage: '<question>',
  aliases: ['8b'],
  example: '8ball Is today a good day?',
  args: true,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    message.delete();

    var reply = a[Math.floor(Math.random() * a.length)];
    return message.channel.send(reply)

  },
};
