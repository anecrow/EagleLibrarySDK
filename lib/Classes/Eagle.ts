import API from "../API/index";
import { ApplicationInfo } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";

export default class Eagle implements ApplicationInfo {
  static async CheckServer() {
    try {
      const info = await API.AppInfo();
      ConsoleLog("Eagle is online.", info.version);
      console.log(info);
    } catch (error) {
      ConsoleError("Check server failed.");
    }
  }

  version: string;
  prereleaseVersion: string | null;
  buildVersion: string;
  execPath: string;
  platform: string;
  constructor(info: ApplicationInfo) {
    this.version = info.version;
    this.prereleaseVersion = info.prereleaseVersion;
    this.buildVersion = info.buildVersion;
    this.execPath = info.execPath;
    this.platform = info.platform;
  }

  async updata() {
    Object.assign(this, await API.AppInfo());
  }
}
