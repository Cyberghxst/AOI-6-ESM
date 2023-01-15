// Imports
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import chalk from 'chalk';

// Class
export default class Command {
  constructor(client) {
    this.bot = client;
  }
  // Methods
  async load(path) {
    const validTypes = Object.getOwnPropertyNames(this.bot.cmd);
    const cmds = [];
    readdirSync(path).forEach(f => (statSync(`${path}/${f}`).isDirectory() ? (cmds = this.load(`${path}/${f}`, cmds)) : cmds.push(join(process.cwd(), path, "/", f))));
    let startTime = Date.now();
    console.log(chalk.cyan(`Loading ${cmds.length} commands...`));
    console.log(`-----------------------------------------------`)
    for (let cmd of cmds) {
      let c;
      let msg = [];
      try {
        c = (await import(join(cmd))).body;
        console.log(`  Walking In ${chalk.grey(cmd)}  `)
      } catch(e) {
        console.log(`  Failed To Walk In ${chalk.grey(cmd)}`);
        console.log(`-----------------------------------------------`)
        continue;
      }
      if (!c) return msg.push("");
      c = Array.isArray(c) ? c : [c];
      for (let command of c) {
        if (!("type" in command)) command.type = "default";
        const valid = validTypes.some((c) => c === command.type);
        if (!valid) return msg.push(`  ${chalk.red("Invaild Type")} |  ${command.type}  |  ${chalk.blueBright(command.name)}  `);
        try {
          this.bot.cmd.createCommand(command)
          msg.push(`  ${chalk.green("Loaded")}  |  ${command.type}  |  ${chalk.blueBright(command.name)}  `)
        } catch (e) {
          msg.push(`  ${chalk.red("Failed To Load")}  |  ${command.type}  |  ${chalk.blueBright(command.name)}  `)

                }
      }
      console.log(msg.join("\n"))
      console.log(`-----------------------------------------------`)
    }
    console.log(`It took ${Date.now() - startTime}ms to load all commands.\n`);
    console.log('ES6 Handler based on the Lezi.am_#8457 handler.\n');
  }
}