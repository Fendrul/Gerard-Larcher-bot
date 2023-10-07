import {Client, EmbedBuilder, TextChannel} from "discord.js";
import {ParamsService} from "../services/paramsService";
import {fetchPartial} from "../utils/eventHelper";

export function messageUpdateEvent(client: Client<boolean>) {
  client.on("messageUpdate", async (oldMessage, newMessage) => {
    const paramsService = ParamsService.getInstace();
    const logChannel = await client.channels.fetch(paramsService.getLogChannel());

    console.log("Vérification des conditions");

    if (!newMessage.author || newMessage.author.bot || !logChannel || !(logChannel instanceof TextChannel)) return;

    console.log("Vérification des conditions 2");

    if (newMessage.author.bot) return;

    console.log("Fetching du message");

    if (!await fetchPartial(oldMessage) || !await fetchPartial(newMessage)) return;

    console.log("création de l'embed");

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