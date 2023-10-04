export class AsyncFunctionController {
  private shouldStop = false;

  async start(func: () => void) {
    this.shouldStop = false;

    while (!this.shouldStop) {
      await func();
    }
  }

  stop() {
    this.shouldStop = true;
  }

  isRunning() {
    return !this.shouldStop;
  }
}