import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, Message, SlashCommandBuilder, TextChannel} from "discord.js";
import {ChannelType} from "discord-api-types/v10";

export class PinMessage implements Command {
  public name = "pinmessage";

  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("Pin a message into the current channel's thread")
    .addStringOption((option) => option.setName("message_id").setDescription("The ID of the message").setRequired(true));

  public async execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const threadToPinName = "messages épinglés";
    const messageID = interaction.options.getString("message_id", true);
    let MessageToPinContent = "";
    let attachmentURLs = "";
    let channel: TextChannel | undefined;


    let messageToPin: Message<true> | Message<false> | undefined;

    try {
      messageToPin = await interaction.channel?.messages.fetch(messageID);
    } catch (error) {
      return interaction.reply("Message not found");
    }

    if (messageToPin?.channel.type === ChannelType.GuildPublicThread || messageToPin?.channel.type === ChannelType.GuildPrivateThread) {
      const parentChannel = messageToPin.channel.parent;
      if (parentChannel instanceof TextChannel) {
        channel = parentChannel;
      }
    } else {
      channel = interaction.channel as TextChannel;
    }

    if (!channel) {
      return interaction.reply("Channel not found");
    }


    let thread = channel.threads.cache.find((thread) => thread.name === threadToPinName);


    if (!thread) {
      thread = await channel.threads.create({
        name: threadToPinName,
      });
      console.log("thread created");
    }

    console.log("contenu du message à pin : " + messageToPin?.content);

    if (messageToPin?.content && messageToPin?.content !== "") {
      MessageToPinContent = messageToPin.content;
    } else {
      MessageToPinContent = "Link";
    }

    console.log("contenu du message à pin récupéré : " + MessageToPinContent);

    if (messageToPin?.attachments.size && messageToPin.attachments.size > 0) {
      messageToPin.attachments.forEach((attachment) => {
        attachmentURLs += attachment.url + "\n";
      });
    }

    thread?.send(
      `- [${MessageToPinContent}](<${messageToPin?.url}>) \n ${attachmentURLs}`,
    );


    return interaction.reply("Message pinned");
  }
}