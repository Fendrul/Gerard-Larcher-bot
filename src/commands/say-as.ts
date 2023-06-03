import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";

export class SayAs implements Command {
  name = "say_as";

  data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("Say something as someone else")
    .addUserOption((option) => option.setName("user").setDescription("The user to usurpate").setRequired(true))
    .addStringOption((option) => option.setName("message").setDescription("The message to say").setRequired(true));

  execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const user = interaction.options.getUser("user", true);

    interaction.channel;

    return interaction.reply("");
  }

}