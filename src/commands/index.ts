import {Command} from "../models/interfaces/Command";
import {GagCommand} from "./gag";
import {UngagCommand} from "./ungagCommand";
import {ResponseCommand} from "./response";
import {PingCommand} from "./ping";
import {SayAs} from "./say-as";

export const commands: Command[] = [
  new GagCommand(),
  new UngagCommand(),
  new ResponseCommand(),
  new PingCommand(),
  new SayAs(),
];
