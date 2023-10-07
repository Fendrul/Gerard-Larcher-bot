export class ParamsService {
  private static instance: ParamsService;
  private insultsRunning: boolean;
  private quoicoubehRunning: boolean;
  private logChannel = "1160222219788636190";

  private constructor() {
    this.insultsRunning = false;
    this.quoicoubehRunning = false;
  }

  public static getInstace(): ParamsService {
    if (!ParamsService.instance) {
      ParamsService.instance = new ParamsService();
    }

    return ParamsService.instance;
  }

  public getInsultsRunning(): boolean {
    return this.insultsRunning;
  }

  public setInsultsRunning(value: boolean): void {
    this.insultsRunning = value;
  }

  public getQuoicoubehRunning(): boolean {
    return this.quoicoubehRunning;
  }

  public setQuoicoubehRunning(value: boolean): void {
    this.quoicoubehRunning = value;
  }

  public getLogChannel(): string {
    return this.logChannel;
  }

  public setLogChannel(value: string): void {
    this.logChannel = value;
  }
}