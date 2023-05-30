import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import {GagService} from "../services/gag-service";

export class UngagCommand implements Command {
  public name = "ungag";

  public data: SlashCommandBuilder | Omit<SlashCommandBuilder, any> = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("Ungag a user")
    .addUserOption((option) => option.setName("user").setDescription("The user to ungag").setRequired(true));

  execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const user = interaction.options.getUser("user", true);
    const gagService = GagService.getInstance();

    if (!gagService.isGagged(interaction.user.id)) {
      gagService.removeUser(user.id);
      return interaction.reply(`Successfuly ungagged ${user.username} !`);
    } else {
      if (interaction.user.id === user.id) {
        return interaction.reply("Tu oses vouloir te débarasser de tes chaînes de la servitude ?! *grommela Gérard, plein de colère*");
      } else {
        return interaction.reply("La fraternité dans l'adversité est bien belle, mais impuissante face à mon ventre plein ! \n*Gérard Larcher, 2021*");
      }
    }
  }

}