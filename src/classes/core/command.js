import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';

const head = '|  Command        |  Type          |  State        |';
const line = '|--------------------------------------------------|';

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
     * @typedef Command
     * @property {string} name The AOI.js command name.
     * @property {string} type The AOI.js command type.
     * @property {string} code The AOI.js command code.
     * 
     * @param {string} dir The commands path.
     * @param {Array<Command>} array The array command collection.
     * @returns Promise<Command[]>
     */
    async #cache (dir, array = []) {
        const root = process.cwd();
        const files = readdirSync(join(root, dir));
        for (const file of files) {
            const stat = lstatSync(join(root, dir, file));
            if (!stat.isDirectory()) {
                const command = (await (import(join(root, dir, file)))).command
                if (!command) continue;
                Array.isArray(command) ? command.forEach(cmd => array.push(cmd)) : array.push(command);
            }
            else { this.#cache(join(dir, file), array); continue; }
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
        this.#cache(dir, commands).then(() => {
            console.log(head);
            for (const command of commands) {
                if (!('type' in command)) command.type = 'default';
                const ok = types.some(type => command.type === type);
                if (!ok) { messages.push(`|  ${command.name} | ${command.type} |   Failed to load`); continue; }
                try {
                    this.bot.cmd.createCommand(command);
                    messages.push(`|  ${command.name} | ${command.type} |   Loaded`);
                } catch(e) {
                    messages.push(`|  ${command.name} | ${command.type} |   Failed to load`);
                }
            }
            for (let msg of messages) { console.log(msg + '\n' + line) }
        });
        return;
    }
}

export { CommandManager }