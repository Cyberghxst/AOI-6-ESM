import Command from './custom/command.js';

export default class Loader {
    constructor(client) {
      this.client = client;
      this.commands = new Command(client);
    }
}