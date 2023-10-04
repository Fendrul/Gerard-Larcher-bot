import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import {MuteService} from "../services/muteService";

export class OnMAMute implements Command {
  public name = "onmamute";

  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("ICI C'EST PARIS !")
    .addUserOption((option) => option.setName("persecutor_name").setDescription("Le nom du persécuteur").setRequired(true));

  public execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const name = interaction.options.getUser("persecutor_name", true).username;
    const guildID = interaction.guildId;

    if (!guildID) {
      return interaction.reply({content: "ID de serveur non trouvé", ephemeral: true});
    }

    if (name.length > 32) {
      return interaction.reply({content: "Eh dis, abuse pas sur la taille quand même, mon gros con", ephemeral: true});
    }

    const muteService = MuteService.createInstance(guildID, interaction.channel, name);

    muteService.activate();

    return interaction.reply("Opération Tango lancée");
  }
}