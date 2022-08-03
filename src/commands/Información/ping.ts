import { CommandBuilder } from 'structs/Command';

export default new CommandBuilder()
  .setName('ping')
  .setDescription('Muestra el tiempo de respuesta del bot')
  .setCooldown(5)
  .setDMPermission(false)
  .setRun(async ({ client, command }) => {
    const initialDate = Date.now();
    await command.deferReply();

    void command.followUp({
      content: `Tiempo de respuesta: ${
        Date.now() - initialDate
      }ms\nWebSocket: ${client.ws.ping}ms`
    });
  });
