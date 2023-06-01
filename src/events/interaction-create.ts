import {Client, Events} from "discord.js";
import {commands} from "../commands";

export function interactionCreateEvent(client: Client<boolean>) {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.find((command) => command.name === interaction.commandName);

    if (!command) {
      interaction.reply({
        content: "Command not found",
        ephemeral: true,
      });
      console.error(`Command not found: ${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  });
}