import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import {ParamsService} from "../services/paramsService";

export class ToggleQuoicoubeh implements Command {
  public name = "togglequoicoubeh";

  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("Active ou désactive le quoicoubeh et appanyan");

  execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const paramsService = ParamsService.getInstace();
    const isRunning = paramsService.getQuoicoubehRunning();

    paramsService.setQuoicoubehRunning(!isRunning);

    return interaction.reply(`Code ${isRunning ? "25" : "72"} lancé : Quoicoubeh ${isRunning ? "désactivé" : "activé"}`);
  }
}