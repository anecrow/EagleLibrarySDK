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
  static async GetActiveEagle() {
    const check = await Eagle.CheckServer();
    if (!check) return;
    const appinfo = await API.AppInfo();
    const eagle = new Eagle(appinfo);
    return eagle.updata();
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
