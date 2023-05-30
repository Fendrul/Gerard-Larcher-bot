import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";

export interface Command {
  name: string;
  data: SlashCommandBuilder | Omit<SlashCommandBuilder, any>;
  // eslint-disable-next-line no-unused-vars
  execute: (interaction: ChatInputCommandInteraction) => Promise<InteractionResponse<boolean>>;
}