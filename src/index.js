import { AoiClient as Aoi } from 'aoi.js';
import Loader from './classes/loader.js';
import { Util } from 'aoi.js';
import { setup } from 'aoi.parser';

setup(Util);

const client = new Aoi({
  token: process.env['token'],
  intents: [
    'Guilds',
    'GuildMessages',
    'MessageContent'
  ],
  prefix: '!',
  events: [
    'onMessage',
    'onInteractionCreate'
  ]
});

const loader = new Loader(client);
loader.commands.load('./src/commands');