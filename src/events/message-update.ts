import {Client, EmbedBuilder, TextChannel} from "discord.js";
import {ParamsService} from "../services/paramsService";
import {fetchPartial} from "../utils/eventHelper";

export function messageUpdateEvent(client: Client<boolean>) {
  client.on("messageUpdate", async (oldMessage, newMessage) => {
    const paramsService = ParamsService.getInstace();
    const logChannel = await client.channels.fetch(paramsService.getLogChannel());

    if (!newMessage.author || newMessage.author.bot || !logChannel || !(logChannel instanceof TextChannel)) return;

    if (newMessage.author.bot) return;

    if (!await fetchPartial(oldMessage) || !await fetchPartial(newMessage)) return;

    const embedMessage = new EmbedBuilder()
      .setColor("#0099ff")
      .setAuthor({
        name: newMessage.author.username,
        iconURL: newMessage.author.avatarURL() || undefined,
      })
      .setTitle("Message édité")
      .setDescription(`${newMessage.url}\nAncien message : ${oldMessage.content} \nNouveau message : ${newMessage.content}`);

    await logChannel.send({embeds: [embedMessage]});
  });
}