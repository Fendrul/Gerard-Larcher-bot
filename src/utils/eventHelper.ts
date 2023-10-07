import {Message, PartialMessage} from "discord.js";

export async function fetchPartial(message: Message | PartialMessage): Promise<boolean> {
  try {
    if (message.partial) {
      await message.fetch();
    }
    return true;
  } catch (error) {
    return false;
  }
}