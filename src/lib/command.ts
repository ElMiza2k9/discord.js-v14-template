import type { CommandRunArgs } from 'typings';
import path from 'path';

export function handleSubCommand(
  { client, command }: CommandRunArgs<'slash'>,
  dirname: string
) {
  const group = command.options.getSubcommandGroup(false);
  const cmd = command.options.getSubcommand(false);

  if (!cmd) return;

  const relativePath = group ? `${group}/${cmd}` : cmd;
  const fn = require(path.join(dirname, relativePath)).default;

  return void fn({ client, command });
}
