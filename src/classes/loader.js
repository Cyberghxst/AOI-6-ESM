import { CommandManager } from './core/command.js';


/**
 * @class Loader
 * @classdesc Starts the loader class
 */
class Loader {
    /**
     * 
     * @param {AoiClient} client The AOI.js client definition.
     */
    constructor(client) {
        this.commands = new CommandManager(client);
    }
}

export { Loader }