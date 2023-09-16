import {AuditLogEvent, Client, IntentsBitField, REST, Routes} from "discord.js";
import {config} from "./config";
import {commands} from "./commands";
import {dataInit} from "./data-init";
import {messageCreateEvent} from "./events/message-create";
import {interactionCreateEvent} from "./events/interaction-create";

export const client = new Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "DirectMessages",
    IntentsBitField.Flags.MessageContent
  ],
});

dataInit();

async function main() {

  // await login();

  if (process.argv[2] == "commands") {
    const rest = new REST().setToken(config.DISCORD_TOKEN);

    console.log("Registering commands...");

    try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`);

      rest.put(
        Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, config.GUILD_ID),
        {body: commands.map((command) => command.data)},
      );

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  }

  if (process.argv[2] == "start") {
    console.log(config.DISCORD_TOKEN);
    client.once("ready", () => {
      console.log("Discord bot is ready! 🤖");
    });

    messageCreateEvent(client);
    interactionCreateEvent(client);

    await client.login(config.DISCORD_TOKEN);
  }
}

main();