const config = require('../../profile/config.json');
const { stripIndents } = require('common-tags');
const slots = ['🍇', '🍊', '🍐', '🍒', '🍋'];

module.exports = {
  name: 'slots',
  description: 'Try and get the winner winner chicken dinner',
  usage: '',
  aliases: ['sl'],
  example: '',
  args: false,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    message.delete();

    var slot1 = slots[Math.floor(Math.random() * slots.length)];
  	var slot2 = slots[Math.floor(Math.random() * slots.length)];
  	var slot3 = slots[Math.floor(Math.random() * slots.length)];

  	if (slot1 === slot2 && slot1 === slot3) {
  		message.channel.send(stripIndents`
  		${slot1} : ${slot2} : ${slot3}
  		Nice one!
  		`);
  	} else {
  		message.channel.send(stripIndents`
  		${slot1} : ${slot2} : ${slot3}
  		Try again!
  		`);
  	}

  },
};
