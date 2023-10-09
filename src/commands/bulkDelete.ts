import {Command} from "../models/interfaces/Command";
import {
  ChatInputCommandInteraction,
  Collection,
  InteractionResponse,
  Message,
  SlashCommandBuilder,
  TextChannel
} from "discord.js";
import {MessageService} from "../services/messageService";

export class BulkDelete implements Command {
  name = "bulkdelete";

  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("Choisis deux messages et supprime tous les messages entre eux")
    .addStringOption((option) => option.setName("first_message").setDescription("ID du premier message").setRequired(true))
    .addStringOption((option) => option.setName("second_message").setDescription("ID du second message").setRequired(true));

  async execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    let messagesToDelete: Collection<string, Message<true>>;
    const messageService = MessageService.getInstance();
    const channel = interaction.channel;
    let firstMessage = interaction.options.getString("first_message");
    let secondMessage = interaction.options.getString("second_message");

    if (!firstMessage || !secondMessage) {
      return interaction.reply({content: "Veuillez entrer deux messages", ephemeral: true});
    }

    if (!(channel instanceof TextChannel)) {
      return interaction.reply({content: "Veuillez entrer une commande dans un salon textuel", ephemeral: true});
    }

    if (!channel) {
      return interaction.reply({content: "Veuillez entrer une commande dans un salon", ephemeral: true});
    }

    if (firstMessage === secondMessage) {
      return interaction.reply({content: "Veuillez entrer deux messages différents", ephemeral: true});
    }

    if (firstMessage > secondMessage) {
      const temp = firstMessage;
      firstMessage = secondMessage;
      secondMessage = temp;
    }


    try {
      messagesToDelete = await messageService.getMessagesBetweenTwoIDs(interaction.channel as TextChannel, firstMessage.toString(), secondMessage.toString());
    } catch (error) {
      return interaction.reply({content: "Message ID not found", ephemeral: true});
    }

    messagesToDelete.forEach((message) => {
      message.delete();
    });

    return interaction.reply({content: `Suppression de ${messagesToDelete.size} messages`, ephemeral: true});
  }
}