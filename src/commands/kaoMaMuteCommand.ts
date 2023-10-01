import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import {KaoMuteService} from "../services/kaoMuteService";

export class KaoMaMuteCommand implements Command {
  public name = "kaomamute";

  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("ICI C'EST PARIS !");

  public execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const guildID = interaction.guildId;

    if (!guildID) {
      return interaction.reply({content: "ID de serveur non trouvé", ephemeral: true});
    }

    const kaoMuteService = KaoMuteService.createInstance(guildID, interaction.channel);

    kaoMuteService.activate();

    return interaction.reply("Opération Tango lancée");
  }
}