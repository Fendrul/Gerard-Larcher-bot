import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import {KaoMuteService} from "../services/kaoMuteService";

export class KaoMaDemuteCommand implements Command {
  public name = "kaomademute";

  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("ICI C'EST PARIS !");

  public execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const configService = KaoMuteService.getInstance();

    configService.setKaoMaMute(false);

    return interaction.reply("Hihi, oki.");
  }
}