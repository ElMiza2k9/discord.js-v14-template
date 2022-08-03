import type { ClientEvents } from 'discord.js';
import type { EventRunFunction } from 'typings';

export class Event<T extends keyof ClientEvents> {
  public constructor(public name: T, public once = false) {}
  public run?: EventRunFunction<T>;

  public setRun(fn: EventRunFunction<T>) {
    this.run = fn;
    return this;
  }
}
