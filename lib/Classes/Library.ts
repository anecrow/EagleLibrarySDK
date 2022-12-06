import API from "../API/index";
import { LibraryInfo } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";
import Folder from "./Folder";

export class LibrarySwitch {
  raw: string;
  name: string;

  constructor(path: string) {
    const reg = /^.+[\/\\](.+).library$/;
    const list = reg.exec(path) ?? [];
    if (list.length == 2) [this.raw, this.name] = [...list];
    else {
      ConsoleError(`${reg}无法正确解析的路径: ${path}`);
      throw new Error(path);
    }
  }

  /** 切换后需要手动更新相关对象 */
  async switch() {
    await API.LibrarySwitch(this.raw);
  }
}

export default class Library {
  static async GetLibrarySwitch() {
    const pathes = await API.LibraryHistory();
    return pathes.map((path) => new LibrarySwitch(path));
  }

  raw: LibraryInfo;
  get name() {
    return this.raw.library.name;
  }
  get folders() {
    return this.raw.folders.map((info) => new Folder(info));
  }
  *folder_entries() {
    for (const folder of this.folders) {
      yield folder;
      yield* folder;
    }
  }

  constructor(info: LibraryInfo) {
    this.raw = info;
  }

  async update() {
    this.raw = await API.LibraryInfo();
    return this;
  }
}
