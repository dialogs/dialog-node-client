/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const fs = require('fs');
const path = require('path');
const { Bot } = require('../src');

const bot = new Bot(['wss://ee-ws1.dlg.im'], 'daredevil', '5555');
bot.onAsync('MESSAGE_ADD', async ({ peer, message }) => {
  await bot.sendTextMessage(peer, 'Hello =)');
});
