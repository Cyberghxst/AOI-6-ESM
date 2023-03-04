# AOI v6: ESM
This is a AOI.js v6 bot using ESM modules.

## Setup
```javascript
import { AoiClient as Bot } from 'aoi.js';
import { Loader } from './classes/loader.js';
import * as aoidb from 'aoi.db';

const client = new Bot({
    token: 'Discord bot token',
    prefix: 'Discord bot prefix',
    intents: ['MessageContent', 'GuildMessages', 'Guilds'],
    events: ['onMessage'],
    database: {
        type: 'aoi.db',
        db: aoidb,
        tables: ['main'],
        path: './src/db',
        extraOptions: {
            dbType: 'KeyValue',
        }
    }

});

const loader = new Loader(client);
loader.commands.load('src/commands');
```

## Commands
### Single command
```javascript
const command = {
    name: 'ping',
    code: '$ping ms'
}

export { command }
// Or export const command = {...}
```

### Array command
```javascript
const command = [{
    name: 'ping',
    code: '$ping ms'
},{
    name: 'hello',
    code: 'Hello <@$authorID>'
}]

export { command }
// Or export const command = {...}
```