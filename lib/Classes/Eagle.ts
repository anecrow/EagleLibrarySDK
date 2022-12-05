import API from "../API/index";
import { ApplicationInfo } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";

export default class Eagle {
  static async CheckServer() {
    try {
      const info = await API.AppInfo();
      ConsoleLog("Eagle is online.", info.version);
      return true;
    } catch (error) {
      ConsoleError("Check server failed.");
      return false;
    }
  }

  raw: ApplicationInfo;

  constructor(info: ApplicationInfo) {
    this.raw = info;
  }

  async updata() {
    this.raw = await API.AppInfo();
    return this;
  }
}
