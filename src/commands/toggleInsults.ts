import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import {ParamsService} from "../services/paramsService";

export class ToggleInsults implements Command {
  public name = "toggleinsults";

  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("Active ou désactive les insultes");

  execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const paramsService = ParamsService.getInstace();
    const isRunning = paramsService.getInsultsRunning();

    paramsService.setInsultsRunning(!isRunning);

    return interaction.reply(`${isRunning ?
      "Vous ne valez même pas mon attention" :
      "Alors, on aime souffrir, mes délicieux bacon bien graisseux ?"
    }`);
  }
}