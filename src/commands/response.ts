import {Command} from "../models/interfaces/Command";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import {CustomResponseService} from "../services";

export class ResponseCommand implements Command {
  public name = "custom_response";
  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("Add a custom response to a specified text")
    .addStringOption((option) => option.setName("trigger").setDescription("The text to respond to").setRequired(true))
    .addStringOption((option) => option.setName("response").setDescription("The response to the text").setRequired(true));

  execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const trigger = interaction.options.getString("trigger", true);
    const response = interaction.options.getString("response", true);

    const customResponseService = CustomResponseService.getInstance();

    customResponseService.addResponse(trigger, response);

    return interaction.reply(`Successfuly added the response "${response}" to "${trigger}" !`);
  }

}