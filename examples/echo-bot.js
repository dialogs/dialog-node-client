/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const path = require('path');
const { Bot } = require('../src/index');

const bot = new Bot({
  endpoints: ['wss://ws1.dlg.im'],
  phone: '75555555555',
  code: '5555'
});

bot.onMessage(async (peer, message) => {
  console.log(message);
  // await bot.sendTextMessage(update.peer, 'Hello =)');
});

// handle errors
bot.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
