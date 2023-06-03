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

    //Block the user from talking if gagged
    if (gagService.isGagged(message.author.id)) {
      await message.delete();

      message.channel.send(`Ferme ta gueule ! *criait Gérard Larcher alors qu'il étouffait violemment ${message.author.username}*`);

      return;
    }

    //check if the end of the content is "quoi"
    const lastWord = message.content.replaceAll(/[!\"#\＄%&\'\(\)\*\+,-\./:;<=>\?@\[\\\]\^_`{\|}~]/g, "").replaceAll(" ", "").toLowerCase();

    if (lastWord) {
      if (stringDetector(lastWord, "quoi", "coi", "kwa", "coua", "koua", "koi")) {
        await message.reply("QUOICOUBEH ?!");
        return;
      } else if (lastWord.endsWith("hein")) {
        await message.reply("APAGNANHAAAAAAAN");
        return;
      }
    }

    //check if the message answer to the bot
    if (message.mentions.users.has(config.DISCORD_CLIENT_ID)) {
      const insultService = InsultService.getInstance();
      await message.reply(insultService.getInsult());
      return;
    }


    //trigger the custom response
    if (customResponseService.containsTrigger(message.content)) {
      await message.reply(customResponseService.getAnswer(message.content).get());
      return;
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