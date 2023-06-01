import readline from "readline";

export function userPrompt(query: string): Promise<string> {


  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(query, (ans) => {
      resolve(ans);
    });
  });
}