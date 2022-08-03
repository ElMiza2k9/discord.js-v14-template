import { Event } from 'structs/Event';
import { time } from 'discord.js';

const cooldowns = new Map<string, number>();

export default new Event('interactionCreate').setRun((client, interaction) => {
  if (!interaction.isChatInputCommand()) return void 0;
  if (!interaction.inCachedGuild()) {
    return void interaction.reply({
      content: 'El servidor no está en cache.',
      ephemeral: true
    });
  }

  const cmd = client.commands.get(interaction.commandName);
  if (!cmd || !cmd.run) {
    return void interaction.reply({
      content: 'El comando no existe.',
      ephemeral: true
    });
  }

  const userCooldown = cooldowns.get(interaction.user.id) || 0;
  if (cmd.cooldown && userCooldown > Date.now()) {
    const timeString = time(new Date(userCooldown), 'R');

    return void interaction.reply({
      content: `Estás en enfriamiento. Vuelve a usar el comando ${timeString}`,
      ephemeral: true
    });
  }

  cooldowns.set(interaction.user.id, Date.now() + cmd.cooldown * 1000);

  return void cmd.run({ client, command: interaction });
});
