/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const path = require('path');
const { Bot } = require('../src');

const bot = new Bot({
  endpoints: ['wss://ws1.dlg.im'],
  phone: '75555555555',
  code: '5555'
});

bot.onMessage(async (update) => {
  // get self uid
  const uid = await bot.getUid();

  // check if message contents photo
  if (update.content.type === 'photo') {
    // load photo url
    const url = await bot.loadFileUrl(update.content.file);
    // and send it back to the client
    await bot.sendTextMessage(update.peer, `Thanks for photo: ${url}`);

    // send file as image
    await bot.sendPhotoMessage(update.peer, path.resolve(__dirname, 'dinotocat.png'));
  } else {
    // send text message
    await bot.sendTextMessage(update.peer, 'Hello =)');
  }
});

// handle errors
bot.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
