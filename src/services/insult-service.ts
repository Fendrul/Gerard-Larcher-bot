import {Service} from "../models/interfaces/service";

export class InsultService implements Service {
  private static instance: InsultService;
  private insults: string[];

  private constructor() {
    this.insults = [];
  }

  public static getInstance(): InsultService {
    if (!InsultService.instance) {
      InsultService.instance = new InsultService();
    }

    return InsultService.instance;
  }

  //add insults with a variadic parameters of insults
  public addInsults(...insults: string[]): void {
    this.insults.push(...insults);
  }

  public getInsult(): string {
    return this.insults[Math.floor(Math.random() * this.insults.length)];
  }

  public clearInsults(): void {
    this.insults = [];
  }
}