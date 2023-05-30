import {Optional} from "typescript-optional";

export class CustomResponseService {
  private static instance: CustomResponseService;
  private responses: Map<string, string>;

  private constructor() {
    this.responses = new Map<string, string>();
  }

  //create a singleton factory
  public static getInstance(): CustomResponseService {
    if (!CustomResponseService.instance) {
      CustomResponseService.instance = new CustomResponseService();
    }

    return CustomResponseService.instance;
  }

  public addResponse(text: string, response: string): void {
    this.responses.set(text, response);
  }

  public getInsult(sentence: string): Optional<string> {
    //Search through the whole sentence to find a match
    for (const [key, value] of this.responses) {
      if (sentence.includes(key)) {
        return Optional.of(value);
      }
    }

    return Optional.empty();
  }

  public clearResponses(): void {
    this.responses.clear();
  }
}