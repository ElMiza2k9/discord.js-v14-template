import { commandHandler, eventHandler } from 'lib/handlers';
import { BotOptions } from 'config';
import type { CommandBuilder } from './Command';
import Discord from 'discord.js';
import mongoose from 'mongoose';

export class Client extends Discord.Client<true> {
  public constructor(options = BotOptions) {
    super(options);
  }

  public commands = new Discord.Collection<string, CommandBuilder>();

  public override async login() {
    commandHandler(this);
    eventHandler(this);

    await super.login();
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log('Conectado a MongoDB'));
    return this.token;
  }
}
