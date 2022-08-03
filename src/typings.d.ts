import type {
  ChatInputCommandInteraction,
  ClientEvents,
  ContextMenuCommandInteraction
} from 'discord.js';
import type { Client } from 'structs/Client';

export type CommandRunFunction<type extends 'slash' | 'context' = 'slash'> = (
  args: CommandRunArgs<type>
) => unknown;

export interface CommandRunArgs<type extends 'slash' | 'context' = 'slash'> {
  client: Client;
  command: type extends 'slash'
    ? ChatInputCommandInteraction<'cached'>
    : ContextMenuCommandInteraction<'cached'>;
}

export type EventRunFunction<Event> = (
  client: Client,
  ...args: ClientEvents[Event]
) => unknown;
