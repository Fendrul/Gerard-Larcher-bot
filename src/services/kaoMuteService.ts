import {CacheType, CacheTypeReducer, GuildTextBasedChannel, TextBasedChannel} from "discord.js";
import {ThreadHandler} from "../handlers/threadHandler";

export class KaoMuteService {
  //create a map  of serverId -> KaoMuteService
  private static instances = new Map<string, KaoMuteService>();
  private spamThread = new ThreadHandler();
  private channel: CacheTypeReducer<
    CacheType,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    TextBasedChannel | null
  >;
  private message = "kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé";

  private constructor(
    channel: CacheTypeReducer<
      CacheType,
      GuildTextBasedChannel | null,
      GuildTextBasedChannel | null,
      GuildTextBasedChannel | null,
      TextBasedChannel | null
    >) {
    this.channel = channel;
  }

  static createInstance(guildID: string, channel: CacheTypeReducer<CacheType, GuildTextBasedChannel | null, GuildTextBasedChannel | null, GuildTextBasedChannel | null, TextBasedChannel | null>) {
    const instance = KaoMuteService.instances.get(guildID);

    if (instance) {
      instance.setChannel(channel);
      return instance;
    } else {
      const newInstance = new KaoMuteService(channel);

      KaoMuteService.instances.set(guildID, newInstance);

      return newInstance;
    }
  }

  public static getInstanceFromServerID(serverId: string): KaoMuteService | undefined {
    return KaoMuteService.instances.get(serverId);
  }

  activate() {
    this.spamThread.start(async () => {
      if (this.channel) {
        this.channel.send(this.message);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  }

  public deleteInstance() {
    this.spamThread.stop();

    KaoMuteService.instances.forEach((instance, key) => {
      if (instance === this) {
        KaoMuteService.instances.delete(key);
      }
    });
  }

  public setMesssage(message: string) {
    this.message = message;
  }

  public getMessage(): string {
    return this.message;
  }

  private setChannel(channel: CacheTypeReducer<CacheType, GuildTextBasedChannel | null, GuildTextBasedChannel | null, GuildTextBasedChannel | null, TextBasedChannel | null>) {
    this.channel = channel;
  }
}