const Telegraf  = require('telegraf');

const bot       = new Telegraf(process.env.TOKEN);
const private   = process.env.PRIVATE_GROUP;

bot.start( (chat) => {
  if(chat.message.chat.id != private){
    chat.reply("Hi,\nMy name is Botir. Please leave your message here and I will respond within 2 days.\nThanks!");
  }
})

bot.on('text', ({ message, telegram }) => {
  const { first_name, username } = message.from;
  telegram.sendMessage(private, `${first_name} | @${username}:\n\n${message.text}`);
})

module.exports = bot;