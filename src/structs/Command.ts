import type { CommandRunFunction } from 'typings';
import { SlashCommandBuilder } from 'discord.js';

export class CommandBuilder extends SlashCommandBuilder {
  public run?: CommandRunFunction;
  public setRun(fn: CommandRunFunction) {
    this.run = fn;
    return this;
  }

  public cooldown = 0;
  public setCooldown(s: number) {
    this.cooldown = s;
    return this;
  }
}
