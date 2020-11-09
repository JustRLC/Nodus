const config = require('../../profile/config.json');

module.exports = {
  name: 'weather',
  description: 'This will give you small summary of the weather conditions',
  usage: '<location>',
  aliases: ['sky'],
  example: 'sky England',
  args: true,
  cooldown: config.cooldown,
  guildOnly: false,
  async execute(message, args) {
    const client = message.client;
    message.delete();

    try {
        const request = require('request');
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=${config.weather}`;

        request(url, (err, response, body) => {

          const weather = JSON.parse(body);

          if(weather.main == undefined) {
              message.reply('I am unable to fetch the weather');
          }
          else {
            const weatherText =
            { embed:
              {
                color: 3447003,
                title: `Weather for ${weather.name}`,
                fields: [

                    {
                    name: ':white_sun_rain_cloud:  Conditions',
                    value: ` ${weather.weather.main}`,
                    },

                    {
                    name: ':thermometer: Temperature',
                    value: `${weather.main.temp} °C `,
                    },

                    {
                    name: ':droplet: Humidity',
                    value: `${weather.main.humidity} % `,
                    },

                    {
                    name: ':cloud: Clouds',
                    value: `${weather.clouds.all} %`,
                    },

                    {
                    name: ':dash: Wind Speed',
                    value: ` ${weather.wind.speed} mph`,
                    },
                ],
                timestamp: new Date(),
                footer: {
                  text: 'Current Forecast',
                },
              },
            };
              message.channel.send(weatherText);
          }
        });
      }

      catch (error) {
        console.log(error);
        message.reply('I am unable to fetch the weather');
      }
  },
};
