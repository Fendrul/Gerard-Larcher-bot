import {Command} from "../models/interfaces/Command";
import {GagCommand} from "./gag";
import {UngagCommand} from "./ungagCommand";
import {ResponseCommand} from "./response";
import {PingCommand} from "./ping";
import {SayAs} from "./say-as";
import {OnMAMute} from "./onMAMute";
import {OnMADemute} from "./onMADemute";
import {PinMessage} from "./pinMessage";
import {CutImage} from "./cutImage";
import {ToggleQuoicoubeh} from "./toggleQuoicoubeh";
import {ToggleInsults} from "./toggleInsults";

export const commands: Command[] = [
  new GagCommand(),
  new UngagCommand(),
  new ResponseCommand(),
  new PingCommand(),
  new SayAs(),
  new OnMAMute(),
  new OnMADemute(),
  new PinMessage(),
  new CutImage(),
  new ToggleQuoicoubeh(),
  new ToggleInsults()
];
