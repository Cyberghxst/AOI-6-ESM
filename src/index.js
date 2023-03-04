import { AoiClient as Bot } from 'aoi.js';
import { Loader } from './classes/loader.js';
import { token } from '../config.js';
import * as aoidb from 'aoi.db';

const client = new Bot({
    token: token,
    prefix: '!',
    intents: ['MessageContent', 'GuildMessages', 'Guilds'],
    events: ['onMessage'],
    disableFunctions: [],
    respondToBots: false,
    guildOnly: true,
    autoUpdate: false,
    mobilePlatform: false,
    database: {
        type: 'aoi.db',
        db: aoidb,
        tables: ['main'],
        path: './src/db',
        extraOptions: {
            dbType: 'KeyValue',
        }
    },
    suppressAllErrors: false,
    errorMessage: 'Something unexpected happened.',
    aoiWarning: true,
    aoiLogs: true,
    respondOnEdit: {
        commands: false,
        alwaysExecute: false,
        nonPrefixed: false,
        time: 10000
    }

});

const loader = new Loader(client);
loader.commands.load('src/commands');