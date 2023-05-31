import {AuditLogEvent, Client, Events, IntentsBitField, REST, Routes} from "discord.js";
import {config} from "./config";
import {commands} from "./commands";
import {CustomResponseService} from "./services";
import {GagService} from "./services/gag-service";
import {InsultService} from "./services/insult-service";
import {dataInit} from "./data-init";

export const client = new Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "DirectMessages",
    IntentsBitField.Flags.MessageContent
  ],
});
const rest = new REST().setToken(config.DISCORD_TOKEN);
const customResponseService = CustomResponseService.getInstance();
const gagService = GagService.getInstance();

dataInit();

console.log(process.argv);

if (process.argv[2] == "commands") {
  console.log("Registering commands...");

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = rest.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, config.GUILD_ID),
      {body: commands.map((command) => command.data)},
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

if (process.argv[2] == "start") {
  client.once("ready", () => {
    console.log("Discord bot is ready! 🤖");
  });

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

  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (gagService.isGagged(message.author.id)) {
      await message.delete();

      message.channel.send(`Ferme ta gueule ! *criait Gérard Larcher alors qu'il étouffait violemment ${message.author.username}*`);

      return;
    }

    //check if the message answer to the bot
    if (message.mentions.users.has(config.DISCORD_CLIENT_ID)) {
      const insultService = InsultService.getInstance();
      await message.reply(insultService.getInsult());
    }


    if (customResponseService.containsTrigger(message.content)) {
      await message.reply(customResponseService.getAnswer(message.content).get());
    }

    if (Math.floor(Math.random() * 100) == 1) {
      const insultService = InsultService.getInstance();
      const insult = insultService.getInsult();

      await message.reply(insult);

      return;
    }
  });


  client.login(config.DISCORD_TOKEN);
}
