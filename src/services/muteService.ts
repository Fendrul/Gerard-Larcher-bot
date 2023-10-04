import {CacheType, CacheTypeReducer, GuildTextBasedChannel, TextBasedChannel} from "discord.js";
import {AsyncFunctionController} from "../handlers/asyncFunctionController";

export class MuteService {
  //create a map  of serverId -> KaoMuteService
  private static instances = new Map<string, MuteService>();
  private spamFunction: AsyncFunctionController;
  private channel: CacheTypeReducer<
    CacheType,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    TextBasedChannel | null
  >;
  private message: string;
  private name: string;

  private constructor(
    channel: CacheTypeReducer<
      CacheType,
      GuildTextBasedChannel | null,
      GuildTextBasedChannel | null,
      GuildTextBasedChannel | null,
      TextBasedChannel | null
    >,
    name: string,
    spamFunction: AsyncFunctionController
  ) {
    this.channel = channel;
    this.name = name;
    this.message = "";
    this.spamFunction = spamFunction;
  }

  static createInstance(guildID: string,
                        channel: CacheTypeReducer<CacheType, GuildTextBasedChannel | null, GuildTextBasedChannel | null, GuildTextBasedChannel | null, TextBasedChannel | null>,
                        name: string
  ) {
    const instance = MuteService.instances.get(guildID);

    if (instance) {
      instance.setChannel(channel);
      instance.setName(name);
      return instance;
    } else {
      const newInstance = new MuteService(channel, name, new AsyncFunctionController());

      MuteService.instances.set(guildID, newInstance);

      return newInstance;
    }
  }

  public static getInstanceFromServerID(serverId: string): MuteService | undefined {
    return MuteService.instances.get(serverId);
  }

  activate() {
    for (let i = 0; i < 20; i++) {
      this.message += `${this.name} m'a mute alors  jme suis cassé `;
    }

    this.spamFunction.start(async () => {
      if (this.channel) {
        this.channel.send(this.message);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  }

  public deleteInstance(guildID: string) {
    this.spamFunction.stop();

    MuteService.instances.delete(guildID);
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

  private setName(name: string) {
    this.message = name;
  }
}