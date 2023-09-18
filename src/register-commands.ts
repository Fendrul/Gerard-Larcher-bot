import {REST, Routes} from "discord.js";
import {config} from "./config";
import {commands} from "./commands";

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