export class ParamsService {
  private static instance: ParamsService;
  private insultsRunning: boolean;
  private quoicoubehRunning: boolean;

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
}