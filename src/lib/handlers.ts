import type { Client } from 'structs/Client';
import type { ClientEvents } from 'discord.js';
import type { CommandBuilder } from 'structs/Command';
import type { Event } from 'structs/Event';
import { readdirSync } from 'fs';

export function commandHandler(client: Client) {
  const categories = readdirSync('./src/commands/');
  for (const category of categories) {
    const commands = readdirSync(`./src/commands/${category}`);
    for (const command of commands) {
      const commandFile = (
        require(`../commands/${category}/${command}`) as {
          default: CommandBuilder;
        }
      ).default;
      client.commands.set(commandFile.name, commandFile);
    }
  }

  client.on('ready', () => {
    const cmdsToUpload = client.commands.map(c => c.toJSON());
    void client.application.commands.set(cmdsToUpload);
  });
}

export function eventHandler(client: Client) {
  const categories = readdirSync('./src/events/');
  for (const category of categories) {
    const events = readdirSync(`./src/events/${category}`);
    for (const event of events) {
      const eventFile = (
        require(`../events/${category}/${event}`) as {
          default: Event<keyof ClientEvents>;
        }
      ).default;

      if (!eventFile.run) {
        console.error(`❌ ${eventFile.name} has no run function.`);
      }

      client[eventFile.once ? 'once' : 'on'](
        eventFile.name,
        (...args) => void eventFile.run!(client, ...args)
      );
    }
  }
}
