const config = require('../../profile/config.json');
const request = require('superagent');

module.exports = {
  name: 'gif',
  description: 'Random GIF',
  usage: '',
  aliases: ['none'],
  example: '',
  args: false,
  cooldown: config.cooldown,
  guildOnly: true,
  async execute(message, args) {
    const client = message.client;
    message.delete();

    request
            .get('http://api.giphy.com/v1/gifs/random')
            .set('api_key', 'dc6zaTOxFJmzC')
            .query({ rating: message.channel.nsfw === true ? 'r' : 'pg13', fmt: 'json' })
            .query(`tag=${args.join('+')}`)
            .then(res => {
                if (res.statusCode !== 200 || res.body.meta.status !== 200) return console.log('API_ERROR')
                if (res.body.data.id !== undefined) {
                    return message.channel.send(`http://media.giphy.com/media/${res.body.data.id}/giphy.gif`)
                } else {
                    return console.log(`BOORU_NO_RESULTS, ${args}`);
                }
            });

  },
};
