import { ActivityType, type ClientOptions } from 'discord.js';

export const BotOptions: ClientOptions = {
  intents: [
    'Guilds',
    'GuildMembers',
    'MessageContent',
    'GuildBans',
    'GuildEmojisAndStickers',
    'GuildVoiceStates',
    'GuildWebhooks'
  ],
  allowedMentions: { repliedUser: false },
  presence: { activities: [{ name: '/help', type: ActivityType.Playing }] }
};
