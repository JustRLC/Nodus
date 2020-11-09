# Nodus
Nodus is a Discord bot created with the use of Discord.js's framework - It has a ticket system as well as a few fun commands. It is functional but it will need a lot of work. Open for anyone to use.

## Note
This is currently using Discord.js v11. It does not operate at v12 for the moment.

## Requirements

- Node.js v12.x or higher
- NPM
- Reliable hosting ([Heroku](https://heroku.com)) - if you are running this from your own system for fun, **ignore** this.

## Feature

- Simple / Fun commands
- Ticket system
- Customisable

## Commands

### Fun
- `?8ball` - ask 8ball a question
- `?covid` - current data on the covid virus
- `?fact` - random facts (in English only)
- `?gif` - Random GIF
- `?weather` - small summary of the weather conditions
- `?slots` - slot machine
- `?ping` - latency calculation
- `?who` - Discord information of the user
- `?rs` - Play some russian roulette, see if you are the lucky one.


### Ticket
- `?help` - show help menu
- `?new` -  create a new ticket
- `?close` - close a ticket
- `?add` - add a user to a ticket
- `?remove` - remove a user from a ticket

## Getting Started

To install, open up your terminal and type in the following.
```
git clone https://github.com/justrlc/nodus.git ; cd nodus; npm i
```

### Configuration
Edit the `config.json` located in the **profile** directory. These following fields located below are required to be filled.

```
{
  "token": "",
  "guildID": "",
  "supportRole": "",
  "Category": "",
  "logChannel": ""
}
```

#### Token

|   | |
| ------------- | ------------- |
| Default  | ``{bot's token}``  |
| Desc  | Authenticate bot through Discord API  |

#### GuildID

|   | |
| ------------- | ------------- |
| Default  | *null* |
| Desc  | ID of your Discord Server (Guild)  |

#### SupportRole

|   | |
| ------------- | ------------- |
| Default  | *null* |
| Desc  | ID of your support role  |

#### Category

|   | |
| ------------- | ------------- |
| Default  | *null* |
| Desc  | ID of your ticket category  |

#### logChannel

|   | |
| ------------- | ------------- |
| Default  | *null* |
| Desc  | ID of your log channel  |

*If you have trouble obtaining the ID from the following above, enable developer mode in the Discord client*

##### Go to [wiki](https://github.com/justrlc/nodus/wiki) to know more

## Complete
Once the installation process in done, you can use `npm start` to start it.
