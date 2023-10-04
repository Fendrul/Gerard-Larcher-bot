import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import {MuteService} from "../services/muteService";

export class OnMADemute implements Command {
  public name = "onmademute";

  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("Décapitation terminée");

  public execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const guildID = interaction.guildId;

    if (!guildID) {
      return interaction.reply({content: "ID de serveur non trouvé", ephemeral: true});
    }

    const kaoMuteService = MuteService.getInstanceFromServerID(guildID);

    if (!kaoMuteService) {
      return interaction.reply({content: "Aucun spam trouvé pour ce serveur", ephemeral: true});
    }

    kaoMuteService.deleteInstance(guildID);

    return interaction.reply("L'endroit a été mis à feu et à sang");
  }
}