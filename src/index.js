const Discord = require('discord.js');
const fs = require('fs');
const leeks = require('leeks.js');
const log = require(`leekslazylogger`);
const config = require('../profile/config.json');
const { version } = require('../package.json');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const now = Date.now();

const commands = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
console.log(log.colour.magentaBright(`




    ****     **                   **                       ******                  **
   /**/**   /**                  /**                      /*////**                /**
   /**//**  /**    ******        /**   **   **    ******  /*   /**     ******    ******
   /** //** /**   **////**    ******  /**  /**   **////   /******     **////**  ///**/
   /**  //**/**  /**   /**   **///**  /**  /**  //*****   /*//// **  /**   /**    /**
   /**   //****  /**   /**  /**  /**  /**  /**   /////**  /*    /**  /**   /**    /**
   /**    //***  //******   //******  //******   ******   /*******   //******     //**
   //      ///    //////     //////    //////   //////    ///////     //////       //




  `));
console.log(log.colour.yellow(leeks.styles.bold(`Nodus v${version} -  By RLC#1999`)));
log.init('Nodus (bot created by RLC)')
log.info(`Starting up...`)

client.once('ready', () => {

  log.info(`Initialising bot...`)
  for (const file of commands) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    log.console(`> Loading '${config.prefix}${command.name}' command`);
  }
  log.success(`Connected to Discord API`)
  log.success(`Logged in as ${client.user.tag}`)
  client.user.setPresence({game: {name: config.playing, type: config.activityType},status: config.status})

    .catch(log.error);

  if (config.useEmbeds) {
    const embed = new Discord.RichEmbed()
      .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
      .setColor("#2ECC71")
      .setDescription(":white_check_mark: **Started succesfully**")
      .setFooter(`Nodus by RLC#1999`);
    client.channels.get(config.logChannel).send(embed)
  } else {
    client.channels.get(config.logChannel).send(":white_check_mark: **Started succesfully**")
  }
  if (client.guilds.get(config.guildID).member(client.user).hasPermission("ADMINISTRATOR", false)) {
    log.info(`Checking permissions...`);
    setTimeout(function() {
      log.success(`Required permissions have been granted\n\n`)
    }, 1250);

    if (config.useEmbeds) {
      const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
        .setColor("#2ECC71")
        .setDescription(":white_check_mark: **Required permissions have been granted**")
        .setFooter(`Nodus by RLC#1999`);
      client.channels.get(config.logChannel).send(embed)
    } else {
      client.channels.get(config.logChannel).send(":white_check_mark: **Started succesfully**")
    }
  } else {
    log.error(`Required permissions have not been granted`)
    log.error(`Please give the bot the 'ADMINISTRATOR' permission\n\n`)
    if (config.useEmbeds) {
      const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
        .setColor("#E74C3C")
        .setDescription(":x: **Required permissions have not been granted**\nPlease give the bot the `ADMINISTRATOR` permission")
        .setFooter(`Nodus by RLC#1999`);
      client.channels.get(config.logChannel).send({
        embed
      })
    } else {
      client.channels.get(config.logChannel).send(":white_check_mark: **Started succesfully**")
    }
  }

});

client.on('message', async msg => {

  if (msg.author.bot) return;
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;

    if (config.logDMs) {
      if (config.useEmbeds) {
        const embed = new Discord.RichEmbed()
          .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
          .setTitle("DM Logger")
          .addField("Username", msg.author.tag, true)
          .addField("Message", msg.content, true)
          .setFooter(`Nodus by RLC#1999`);
        client.channels.get(config.logChannel).send(embed)
      } else {
        client.channels.get(config.logChannel).send(`DM received from **${msg.author.tag} (${msg.author.id})** : \n\n\`\`\`${msg.content}\`\`\``);
      }
    } else {
      return
    };

  }
  if (msg.channel.bot) return;




  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${config.prefix})\\s*`);
  if (!prefixRegex.test(msg.content)) return;
  const [, matchedPrefix] = msg.content.match(prefixRegex);
  const args = msg.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();


  const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

  if (command.guildOnly && msg.channel.type !== 'text') {
	   return msg.channel.send(`Sorry, this command can only be used on the server.`)
  }

  if (command.args && !args.length) {

    if (config.useEmbeds) {
        const embed = new Discord.RichEmbed()
          .setColor("#E74C3C")
          .setDescription(`\n**Usage:** \`${config.prefix}${command.name} ${command.usage}\`\nType \`${config.prefix}help ${command.name}\` for more information`)
        return msg.channel.send({embed})

    } else {
      return msg.channel.send(`**Usage:** \`${config.prefix}${command.name} ${command.usage}\`\nType \`${config.prefix}help ${command.name}\` for more information`)
    }
  };


  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if (timestamps.has(msg.author.id)) {
    const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      if (config.useEmbeds) {
        const embed = new Discord.RichEmbed()
          .setColor("#E74C3C")
          .setDescription(`:x: **Please do not spam commands** (wait ${timeLeft.toFixed(1)}s)`)
        return msg.channel.send({embed})
      } else {
        return msg.reply(`please do not spam commands (wait ${timeLeft.toFixed(1)}s)`);
      }

    }
  }
  timestamps.set(msg.author.id, now);
  setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);


  try {
    command.execute(msg, args);
    if(config.useEmbeds) {
      const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} / Command Log`, client.user.avatarURL)
        .setTitle("Command Used")
        .addField("Username", msg.author, true)
        .addField("Command", command.name, true)
        .setFooter(`Nodus`)
        .setTimestamp();
      client.channels.get(config.logChannel).send({embed})
    } else {
      client.channels.get(config.logChannel).send(`**${msg.author.tag} (${msg.author.id})** used the \`${command.name}\` command`);
    }
    log.console(`${msg.author.tag} used the '${command.name}' command`)
  } catch (error) {
    log.error(error);
    msg.channel.send(`:x: **Oof!** An error occured whilst executing that command.\nThe issue has been reported.`);
    log.error(`Unknown error occured whilst executing the '${command.name}' command`);
  }

});
client.on('error', error => {
  log.warn(`Potential error detected\n(likely Discord API connection issue)\n`);
  log.error(`Client error:\n${error}`);
});
client.on('warn', (e) => log.warn(`${e}`));

if(config.debugLevel == 1){ client.on('debug', (e) => log.debug(`${e}`)) };

process.on('unhandledRejection', error => {
  log.warn(`An error was not caught`);
  log.error(`Uncaught error: \n${error.stack}`);
});
process.on('beforeExit', (code) => {
  log.basic(log.colour.yellowBright(`Disconected from Discord API`));
  log.basic(`Exiting (${code})`);
});

client.login(config.token);
