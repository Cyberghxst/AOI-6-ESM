import { AoiClient as Aoi } from 'aoi.js';
import Loader from './classes/loader.js';

const client = new Aoi({
  token: process.env['token'],
  intents: [
    "Guilds",
    "GuildMessages",
    "MessageContent"
  ],
  prefix: '!'
});
client.onMessage();

const loader = new Loader(client);
loader.commands.load('./src/commands');