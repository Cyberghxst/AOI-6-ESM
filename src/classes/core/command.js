import { lstatSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import * as color from 'chalk';
import util from 'util';
import path from 'node:path'; 
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

/**
 * Starts the CommandManager class.
 */
class CommandManager {
    /**
     * 
     * @param {AoiClient} client The AOI.js client definition.
     */
    constructor (client) {
        this.bot = client
    }

    /**
     * 
     * @param {string} dir The commands path.
     * @param {Array<any>} array The array command collection.
     * @returns Promise<any[]>
     */
    async #cache (dir, array = []) {
        const root = process.cwd();
        const files = readdirSync(resolve(root, dir));
        for (const file of files) {
            let stat = lstatSync(resolve(root, dir));
            if (stat.isDirectory()) { this.#cache(resolve(dir, file), array); continue; }
            else {
                const command = (await (import(resolve(root, dir, file)))).command
                if (!command) continue;
                Array.isArray(command) ? command.forEach(cmd => array.push(cmd)) : array.push(cmd);
            }
        }
        return array;
    }

    /**
     * 
     * @param {string} dir The commands path.
     * @returns Promise<void>
     */
    async load (dir) {
        const types = Object.getOwnPropertyNames(this.bot.cmd), commands = [], messages = [];
        this.#cache(dir, commands, messages).then(() => {
            for (const command of commands) {
                if (!('type' in command)) command.type = 'default';
                const ok = types.some(type => command.type === type);
                if (!ok) { messages.push(`${color.red('Invalid type')} | ${command.type} | ${color.greenBright(command.name)}`); continue; }
                try {
                    this.bot.cmd.createCommand(command);
                    messages.push(`${color.green('Loaded')} | ${command.type} | ${color.greenBright(command.name)}`);
                } catch(e) {
                    messages.push(`${color.red('Failed to load')} | ${command.type} | ${color.greenBright(command.name)}`);
                }
            }
            for (let i of messages) { console.log(i) }
        });
        return;
    }
}

export { CommandManager }