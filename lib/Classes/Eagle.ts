import API from "../API/index";
import Library from "./Library";
import { LibrarySwitch } from "./Library";
import { ApplicationInfo } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";
import { homepage, version } from "../../package.json";

export default class Eagle {
  static async CheckServer() {
    try {
      ConsoleLog(homepage, { flag: version, title: "Eagle SDK" });
      const info = await API.AppInfo();
      ConsoleLog("Eagle is online.", { flag: info.version });
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
  librarySwitch?: LibrarySwitch[];
  library?: Library;

  constructor(info: ApplicationInfo) {
    this.raw = info;
  }

  async updata() {
    this.raw = await API.AppInfo();

    this.librarySwitch = await Library.GetLibrarySwitch();

    if (!this.library) this.library = new Library(await API.LibraryInfo());
    else this.library.update();

    return this;
  }
}
