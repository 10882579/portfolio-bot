const Telegraf  = require('telegraf');
const Markup    = require('telegraf/markup');
const dotenv    = require('dotenv');
const fs        = require('fs');

dotenv.config();

const bot       = new Telegraf(process.env.TOKEN);
const private   = process.env.PRIVATE_GROUP;

const inlineKeyboard = Markup.inlineKeyboard([
  Markup.callbackButton('CV Resume', 'download_resume'),
  Markup.urlButton("GitHub", "www.github.com/10882579")
]).extra()

bot.start( (chat) => {
  if(chat.message.chat.id != private){
    chat.reply("Hi,\nMy name is Botir. Please leave your message here and I will respond within 2 days.\nThanks!", inlineKeyboard);
  }
})

bot.on('text', ({ message, telegram }) => {
  const { first_name, username } = message.from;
  telegram.sendMessage(private, `${first_name} | @${username}:\n\n${message.text}`);
})

bot.action('download_resume', (chat) => {
  chat.replyWithDocument({
    filename: 'resume.pdf', 
    source: fs.readFileSync('./assets/resume.pdf')
  })
})

module.exports = bot;