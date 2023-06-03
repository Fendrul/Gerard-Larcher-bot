import {Client, Events} from "discord.js";
import {config} from "../config";
import {InsultService} from "../services/insult-service";
import {GagService} from "../services/gag-service";
import {CustomResponseService} from "../services";
import {stringDetector} from "../utils/stringDetector";

export function messageCreateEvent(client: Client<boolean>) {
  const gagService = GagService.getInstance();
  const customResponseService = CustomResponseService.getInstance();

  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (gagService.isGagged(message.author.id)) {
      await message.delete();

      message.channel.send(`Ferme ta gueule ! *criait Gérard Larcher alors qu'il étouffait violemment ${message.author.username}*`);

      return;
    }

    //check if the end of the content is "quoi"
    const lastWord = message.content.replaceAll(/[!\"#\＄%&\'\(\)\*\+,-\./:;<=>\?@\[\\\]\^_`{\|}~]/g, "").replaceAll(" ", "");

    if (lastWord) {
      if (stringDetector(lastWord, "quoi", "coi", "kwa", "coua", "koua", "koi")) {
        message.reply("QUOICOUBEH ?!");
      }
    }

    //check if the message answer to the bot
    if (message.mentions.users.has(config.DISCORD_CLIENT_ID)) {
      const insultService = InsultService.getInstance();
      await message.reply(insultService.getInsult());
    }


    //trigger the custom response
    if (customResponseService.containsTrigger(message.content)) {
      await message.reply(customResponseService.getAnswer(message.content).get());
    }

    //random insult
    if (Math.floor(Math.random() * 100) == 1) {
      const insultService = InsultService.getInstance();
      const insult = insultService.getInsult();

      await message.reply(insult);

      return;
    }
  });
}