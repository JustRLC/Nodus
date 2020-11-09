const config = require('../../profile/config.json');
const rf = require('random-facts');

module.exports = {
  name: 'fact',
  description: 'Random facts (in English only)',
  usage: '[Random-fact]',
  aliases: [''],
  example: 'fact',
  args: false,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    message.delete();
    
    message.channel.send(rf.randomFact());

  },
};
