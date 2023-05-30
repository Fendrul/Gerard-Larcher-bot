import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {Command} from "../models/interfaces/Command";


export class PingCommand implements Command {
  public name = "ping";
  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("Replies with Pong!");

  public async execute(interaction: ChatInputCommandInteraction) {
    return interaction.reply("Ta mère la race !");
  }
}