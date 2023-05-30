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

  public removeUser(userId: Snowflake): boolean {
    const index = this.users.indexOf(userId);

    if (index > -1) {
      this.users.splice(index, 1);
      return true;
    }

    return false;
  }

  isGagged(userId: Snowflake): boolean {
    return this.users.includes(userId);
  }

  getUsers() {
    const returnUsers: Snowflake[] = [];
    this.users.forEach((user) => {
      returnUsers.push(user);
    });

    return returnUsers;
  }
}