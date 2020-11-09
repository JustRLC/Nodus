const Discord = require('discord.js');
const config = require('../../profile/config.json');

module.exports = {
  name: 'whois',
  description: 'Discord information of the user',
  usage: '<@user>',
  aliases: ['who'],
  example: 'who @RLC',
  args: true,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    message.delete();

    const memberToFind = message.mentions.members.first()

    if (!memberToFind) {
      return message.channel.send('You must mention a member!')
    }

    const embed = new Discord.RichEmbed()
      .setAuthor(memberToFind.user.tag, memberToFind.user.avatarURL)
      .addField('Account Created', memberToFind.user.createdAt, true)
      .addField('Joined this Server', message.guild.members.find('id', memberToFind.id).joinedAt, true)
      .addField('User ID', memberToFind.id, true)
      .setColor(config.colour)
      .setFooter('Searched User')
      .setTimestamp()

    message.channel.send(embed)


  },
};
