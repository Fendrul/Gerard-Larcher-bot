import {CacheType, CacheTypeReducer, GuildTextBasedChannel, TextBasedChannel} from "discord.js";
import {CronJob} from "cron";

export class KaoMuteService {
  //create a map  of serverId -> KaoMuteService
  private static instances = new Map<string, KaoMuteService>();
  private cronJob: CronJob;
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
    this.cronJob = new CronJob("* * * * * *", () => {
      this.channel?.send(this.message);
    });
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
    this.cronJob = new CronJob("* * * * * *", () => {
      this.channel?.send(this.message);
    });

    this.cronJob.start();
  }

  public deleteInstance() {
    this.cronJob.stop();
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

  private testTask() {
    console.log("test");
  }

  private setChannel(channel: CacheTypeReducer<CacheType, GuildTextBasedChannel | null, GuildTextBasedChannel | null, GuildTextBasedChannel | null, TextBasedChannel | null>) {
    this.channel = channel;
  }
}