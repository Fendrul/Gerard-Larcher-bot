import {TextChannel} from "discord.js";

export class ChannelService {
  private static instance: ChannelService;

  public static getInstace(): ChannelService {
    if (!ChannelService.instance) {
      ChannelService.instance = new ChannelService();
    }

    return ChannelService.instance;
  }

  public findThread(channel: TextChannel, threadName: string): TextChannel | undefined {
    const threads = channel.threads.cache;

    threads.forEach((thread) => {
      if (thread.name === threadName) {
        return thread;
      }
    });

    return undefined;
  }
}