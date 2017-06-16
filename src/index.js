/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const Bot = require('./Bot');
const createClient = require('./client');

module.exports = createClient;
module.exports.Bot = Bot;
