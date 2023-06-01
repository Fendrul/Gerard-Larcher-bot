import {config} from "../config";
import * as CryptoJS from "crypto-js";
import {userPrompt} from "./prompt";


export async function login() {
  const password = await userPrompt("Enter password: ");

  config.DISCORD_TOKEN = decryptPassword(password, config.DISCORD_TOKEN);
  config.DISCORD_CLIENT_ID = decryptPassword(password, config.DISCORD_CLIENT_ID);
  config.GUILD_ID = decryptPassword(password, config.GUILD_ID);
}

function decryptPassword(password: string, toDecrypt: string) {
  return CryptoJS.AES.decrypt(toDecrypt, password).toString(CryptoJS.enc.Utf8);
}