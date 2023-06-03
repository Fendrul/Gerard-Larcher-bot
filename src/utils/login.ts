import {config} from "../config";
import * as CryptoJS from "crypto-js";
import {userPrompt} from "./prompt";


export async function login() {
  const password = await userPrompt("Enter password: ");

  config.DISCORD_TOKEN = decryptString(password, config.DISCORD_TOKEN);
  config.DISCORD_CLIENT_ID = decryptString(password, config.DISCORD_CLIENT_ID);
  config.GUILD_ID = decryptString(password, config.GUILD_ID);
}

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function encryptString(password: string, toEncrypt: string) {
  return CryptoJS.AES.encrypt(toEncrypt, password).toString();
}

function decryptString(password: string, toDecrypt: string) {
  return CryptoJS.AES.decrypt(toDecrypt, password).toString(CryptoJS.enc.Utf8);
}