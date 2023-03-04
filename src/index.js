import { AoiClient as Bot } from 'aoi.js';
import Loader from './classes/loader.js';
import { Util } from 'aoi.js';
import { setup } from 'aoi.parser';

setup(Util);

const client = new Bot({
  token: require('../config'),
  intents: ['Guilds', 'GuildMessages', 'MessageContent'],
  prefix: '!',
  events: ['onMessage', 'onInteractionCreate']
});

const loader = new Loader(client);
loader.commands.load('./src/commands');