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
  switch() {
    API.LibrarySwitch(this.raw);
  }
  /** 等待切换完成并返回新library对象 */
  async switchUntil(ms: number = 500) {
    console.time("switch");
    let current = await API.LibraryInfo();
    if (this.raw == current.library.path)
      throw ConsoleError("目标库与当前库一致");

    this.switch();

    let num = 0;
    while (this.raw != current.library.path) {
      num++;
      ConsoleLog(`Waiting Switch Library to [${this.name}]`, {
        flag: `TRIES:${num}`,
      });
      current = await API.LibraryInfo();
      await new Promise((resolve) => setTimeout(resolve, ms));
    }
    console.timeEnd("switch");
    return new Library(current);
  }
}

export default class Library {
  /** // BUG: 软件重启前获取的信息不会更新 */
  static async GetActiveLibrary() {
    return new Library(await API.LibraryInfo());
  }
  static async GetLibrarySwitch() {
    const pathes = await API.LibraryHistory();
    return pathes.map((path) => new LibrarySwitch(path));
  }

  raw: LibraryInfo;
  name: string;
  get folders() {
    return this.raw.folders.map((info) => new Folder(info));
  }
  *folder_entries() {
    yield* Folder.Generator(this.folders);
  }

  constructor(info: LibraryInfo) {
    this.raw = info;
    this.name = this.raw.library.name;
  }

  async update() {
    this.raw = await API.LibraryInfo();
    this.name = this.raw.library.name;
    return this;
  }
}
