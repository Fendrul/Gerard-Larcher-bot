import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import {KaoMuteService} from "../services/kaoMuteService";

export class KaoMaDemuteCommand implements Command {
  public name = "kaomademute";

  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("ICI C'EST PARIS !");

  public execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const guildID = interaction.guildId;

    if (!guildID) {
      return interaction.reply({content: "ID de serveur non trouvé", ephemeral: true});
    }

    const kaoMuteService = KaoMuteService.getInstanceFromServerID(guildID);

    if (!kaoMuteService) {
      return interaction.reply({content: "Aucun spam trouvé pour ce serveur", ephemeral: true});
    }

    kaoMuteService.deleteInstance();

    return interaction.reply("Opération demute réussie");
  }
}