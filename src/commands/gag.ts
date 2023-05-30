import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import {GagService} from "../services/gag-service";

export class GagCommand implements Command {
  public name = "gag";

  public data: SlashCommandBuilder | Omit<SlashCommandBuilder, any> = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("Gag a user")
    .addUserOption((option) => option.setName("user").setDescription("The user to gag").setRequired(true));

  public execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const user = interaction.options.getUser("user", true);

    const gagService = GagService.getInstance();

    if (!gagService.isGagged(interaction.user.id)) {
      gagService.addUser(user.id);
      return interaction.reply(`Successfuly gagged ${user.username} !`);
    } else {
      return interaction.reply("Tu essaies de gag quelqu'un alors que tu l'es toi-même, pas sous le règne de la terreur de Gérard Larcher !");
    }
  }

}