import {CacheType, CacheTypeReducer, GuildTextBasedChannel, TextBasedChannel} from "discord.js";

export class KaoMuteService {
  private static instance: KaoMuteService;
  private kaoMaMute: boolean;
  private channel: CacheTypeReducer<
    CacheType,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    TextBasedChannel | null
  > = null;
  private message = "kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé kao m'a mute a vie alors jme suis cassé";

  private constructor() {
    this.kaoMaMute = false;
  }

  public static getInstance(): KaoMuteService {
    if (!KaoMuteService.instance) {
      KaoMuteService.instance = new KaoMuteService();
    }

    return KaoMuteService.instance;
  }

  public getKaoMaMute(): boolean {
    return this.kaoMaMute;
  }

  public setKaoMaMute(kaoMaMute: boolean): void {
    this.kaoMaMute = kaoMaMute;
  }

  public getChannel(): CacheTypeReducer<
    CacheType,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    TextBasedChannel | null
  > {
    return this.channel;
  }

  public setChannel(channel: CacheTypeReducer<
    CacheType,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    TextBasedChannel | null
  >): void {
    this.channel = channel;
  }

  public getMessage(): string {
    return this.message;
  }
}