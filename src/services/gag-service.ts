import {Snowflake} from "discord.js";

export class GagService {
  private static instance: GagService;
  private users: Snowflake[];

  private constructor() {
    this.users = [];
  }

  public static getInstance(): GagService {
    if (!GagService.instance) {
      GagService.instance = new GagService();
    }

    return GagService.instance;
  }

  public addUser(userId: Snowflake): void {
    this.users.push(userId);
  }

  public removeUser(userId: Snowflake): void {
    this.users = this.users.filter((id) => id !== userId);
  }

  isGagged(userId: Snowflake): boolean {
    return this.users.includes(userId);
  }
}