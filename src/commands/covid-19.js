const config = require('../../profile/config.json');
const axios = require('axios');

module.exports = {
  name: 'covid',
  description: 'Current data on COVID',
  usage: '<country>',
  aliases: ['virus'],
  example: 'covid UK',
  args: true,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
      message.delete();

      var l1 = "https://restcountries.eu/rest/v2/name/" + args[0];
      var l2 = "https://corona.lmao.ninja/v2/countries/" + args[0];

      const request1 = axios.get(l1);
      const request2 = axios.get(l2);

      axios.all([request1, request2]).then(axios.spread((...responses) => {
          const data_country = responses[0].data;
          const data_covid = responses[1].data;

          if(typeof(data_covid) == "object") {
              const countryCases = {
                  color: 0xFF0000,
                  title: 'Cases in ' + data_covid['country'],
                  thumbnail: {
                      url: 'https://www.psycharchives.org/retrieve/096175aa-f7f2-4970-989d-d934c30b5551'
                  },
                  author: {
                      name: 'COVID-19 Cases',
                  },
                  description: 'Here are some data of COVID-19 cases in ' + data_covid['country']
                  ,
                  fields: [
                      {
                          name: 'Total Cases',
                          value: data_covid['cases'].toLocaleString(),
                          inline: true
                      },

                      {
                          name: 'Total Deaths',
                          value: data_covid['deaths'].toLocaleString(),
                          inline: true
                      },

                      {
                          name: 'Total Recoveries',
                          value: data_covid['recovered'].toLocaleString(),
                          inline: true
                      },
                      {
                          name: 'New Cases Today',
                          value: data_covid['todayCases'].toLocaleString(),
                          inline: true
                      },
                      {
                          name: 'Deaths Today',
                          value: data_covid['todayDeaths'].toLocaleString(),
                          inline: true
                      },

                      {
                          name: 'Active Cases',
                          value: data_covid['active'].toLocaleString(),
                          inline: true
                      },
                      {
                          name: 'Country Population',
                          value: data_country[0]['population'].toLocaleString(),
                          inline: true
                      },
                      {
                          name: 'Cases per one million inhabitants',
                          value: data_covid['casesPerOneMillion'],
                          inline: true
                      },

                  ],
                  timestamp: new Date(),
              };
              message.channel.send({ embed: countryCases })
          }
          else {
              message.channel.send("**You have entered an invalid country!**")
          }
      })).catch((e) => {
          if (e.response.status == 404) {
              message.channel.send("**You have entered an invalid country!**")
          }
      })

  },
};
