# AOI.js V6 using JavaScript ES6
Made by a Mexican ofc, bcz me >>>>>>> Mr. Furret
## Setup
```js
import { AoiClient as Aoi } from 'aoi.js';
import Loader from './classes/loader.js';

const client = new Aoi({
  token: 'Discord bot token',
  intents: [...intents],
  prefix: 'Discord bot prefix',
  events: [...events]
});
// Custom ES6 command loader
const loader = new Loader(client);
loader.commands.load('./src/commands');
```
## Creating commands
### Single command
```js
// Important to be named "body".
export const body = {
  name: 'ping',
  code: `$sendMessage[Mi ping es: \`$ping ms\`;no]`
}
```
### Multiple commands
```js
// Important to be named "body".
export const body = [{
  name: 'cmd1',
  code: `uno`
},{
  name: 'cmd2',
  code: `dos`
}]
```