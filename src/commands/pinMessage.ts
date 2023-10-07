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

    let messageToPin: Message<boolean> | undefined;

    try {
      messageToPin = await interaction.channel?.messages.fetch(messageID);
    } catch (error) {
      return interaction.reply({content: "Message not found", ephemeral: true});
    }

    if (messageToPin?.channel.type === ChannelType.PublicThread || messageToPin?.channel.type === ChannelType.PrivateThread) {
      const parentChannel = messageToPin.channel.parent;
      if (parentChannel instanceof TextChannel) {
        channel = parentChannel;
      }
    } else {
      channel = interaction.channel as TextChannel;
    }

    if (!channel) {
      return interaction.reply({content: "Channel not found", ephemeral: true});
    }

    let thread = channel.threads.cache.find((thread) => thread.name === threadToPinName);

    if (!thread) {
      thread = await channel.threads.create({
        name: threadToPinName,
      });
    } else {
      if (thread.archived) {
        await thread.setArchived(false);
      }
    }

    MessageToPinContent = messageToPin?.content ? messageToPin.content : "";

    if (messageToPin?.attachments.size && messageToPin.attachments.size > 0) {
      messageToPin.attachments.forEach((attachment) => {
        attachmentURLs += `[${attachment.name}](${attachment.url}) `;
      });
    }

    thread.send(
      `- [${messageToPin?.author.username}](<${messageToPin?.url}>) : ${MessageToPinContent} \n\n ${attachmentURLs}`,
    );


    //create an ephemeral message to confirm the pin
    return interaction.reply({content: "Message épinglé !", ephemeral: true});
  }
}