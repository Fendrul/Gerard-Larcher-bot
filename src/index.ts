import {Client, IntentsBitField} from "discord.js";
import {config} from "./config";
import {dataInit} from "./data-init";
import {messageCreateEvent} from "./events/message-create";
import {interactionCreateEvent} from "./events/interaction-create";
import {KaoMuteService} from "./services/kaoMuteService";

export const client = new Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "DirectMessages",
    IntentsBitField.Flags.MessageContent
  ],
});

dataInit();

console.log("Nouvelle version du bot !");

async function main() {
  client.once("ready", () => {
    console.log("Discord bot is ready! 🤖");
  });

  messageCreateEvent(client);
  interactionCreateEvent(client);

  const kaoMuteService = KaoMuteService.getInstance();

  setInterval(async () => {
    if (kaoMuteService.getKaoMaMute()) {
      const channel = kaoMuteService.getChannel();

      if (channel) {
        await channel.send(kaoMuteService.getMessage());
      }
    }
  }, 1000);

  await client.login(config.DISCORD_TOKEN);
}

main();