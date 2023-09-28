import {Command} from "../models/interfaces/Command";
import {GagCommand} from "./gag";
import {UngagCommand} from "./ungagCommand";
import {ResponseCommand} from "./response";
import {PingCommand} from "./ping";
import {SayAs} from "./say-as";
import {KaoMaMuteCommand} from "./kaoMaMuteCommand";
import {KaoMaDemuteCommand} from "./kaoMaDemuteCommand";

export const commands: Command[] = [
  new GagCommand(),
  new UngagCommand(),
  new ResponseCommand(),
  new PingCommand(),
  new SayAs(),
  new KaoMaMuteCommand(),
  new KaoMaDemuteCommand()
];
