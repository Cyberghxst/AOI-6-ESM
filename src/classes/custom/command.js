// Imports
import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import * as color from 'chalk';

/**
 * @class Command
 * @classdesc Starts the command loader class.
 */
class Command {
    /**
     * 
     * @param {AoiClient} client The AOI.js client definition.
     */
    constructor(client) {
      this.bot = client
    }

    /**
     * 
     * @param {string} dir The commands path.
     * @param {Array<any>} collection The command collection.
     * @returns Promise<void>
     */
    async #cache (dir, collection = []) {
      const commands = readdirSync(join(cwd(), dir));
      for (let file of commands) {
        let stat = lstatSync(join(cwd(), dir, file));
        if (stat.isDirectory()) { this.cache(join(cwd(), dir, file), collection); continue; }
        else {
          const command = (await import(join(cwd(), dir, file))).command;
          if (!command) continue;
        }
      }
      return collection;
    }

    async load (dir) {
      
    }
}

export { Command }