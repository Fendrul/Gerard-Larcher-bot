import {Client, IntentsBitField, Partials} from "discord.js";
import {config} from "./config";
import {dataInit} from "./data-init";
import {messageCreateEvent} from "./events/message-create";
import {interactionCreateEvent} from "./events/interaction-create";
import {messageDeleteEvent} from "./events/message-delete";

export const client = new Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "DirectMessages",
    IntentsBitField.Flags.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction
  ],
});

dataInit();

async function main() {
  client.once("ready", () => {
    console.log("Discord bot is ready! 🤖");
  });

  messageCreateEvent(client);
  messageDeleteEvent(client);
  interactionCreateEvent(client);

  await client.login(config.DISCORD_TOKEN);
}

main();