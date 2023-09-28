import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import {GagService} from "../services/gag-service";

export class GagCommand implements Command {
  public name = "gag";

  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("Gag a user")
    .addUserOption((option) => option.setName("user").setDescription("The user to gag").setRequired(true));

  public execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const user = interaction.options.getUser("user", true);

    const gagService = GagService.getInstance();

    if (!gagService.isGagged(interaction.user.id)) {
      if (gagService.getUsers().includes(user.id)) {
        return interaction.reply("Cet utilisateur est déjà gag, petit merlan frit.");
      }

      if (Math.floor(Math.random() * 12) == 1) {
        return interaction.reply(`Hmmmm, je crois que j'ai une cible bien plus apétissante, ${interaction.user.username}.`);
      }
      gagService.addUser(user.id);
      return interaction.reply(`Bien reçu, j'étoufferai ${user.username} de mes doigts boudinés.`);
    } else {
      return interaction.reply("Tu essaies de gag quelqu'un alors que tu l'es toi-même, pas sous le règne de la terreur de Gérard Larcher !");
    }
  }
}