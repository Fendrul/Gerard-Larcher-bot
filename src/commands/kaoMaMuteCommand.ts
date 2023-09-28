import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import {KaoMuteService} from "../services/kaoMuteService";

export class KaoMaMuteCommand implements Command {
  public name = "kaomamute";

  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("ICI C'EST PARIS !");

  public execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const kaoMuteService = KaoMuteService.getInstance();

    kaoMuteService.setKaoMaMute(true);
    kaoMuteService.setChannel(interaction.channel);

    return interaction.reply("ICI C'EST PARIS !");
  }
}