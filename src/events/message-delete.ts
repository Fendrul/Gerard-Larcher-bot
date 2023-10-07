import {Client, EmbedBuilder, TextChannel} from "discord.js";
import {ParamsService} from "../services/paramsService";

export function messageDeleteEvent(client: Client<boolean>) {
  client.on("messageDelete", async (message) => {
    const paramsService = ParamsService.getInstace();
    // const logChannelId = paramsService.getLogChannel();
    const logChannel = await client.channels.fetch(paramsService.getLogChannel());

    if (!message.author || message.author.bot || !logChannel || !(logChannel instanceof TextChannel)) return;

    if (message.partial) {
      try {
        await message.fetch();
      } catch (error) {
        console.error(`Something went wrong when fetching the message: ${error}`);
        return;
      }

    }

    const embedMessage = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Message supprimé de " + message.author.username)
      .setDescription(`${message.channel} : ${message.content}`);

    await logChannel.send({embeds: [embedMessage]});
  });
}