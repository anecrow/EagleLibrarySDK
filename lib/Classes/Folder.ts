import API from "../API/index";
import { CommonFolder } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";

export default class Folder {
  static *Generator(folders: Folder[]): IterableIterator<Folder> {
    for (const folder of folders) {
      yield folder;
      yield* folder;
    }
  }
  /** 属性更详细的版本 */
  static async *FolderALL() {
    const infoes = await API.FolderList();
    const folders = infoes.map((info) => new Folder(info));
    yield* Folder.Generator(folders);
  }
  raw: CommonFolder;
  get name() {
    return this.raw.name;
  }
  get children() {
    return this.raw.children.map((info) => new Folder(info));
  }

  constructor(info: CommonFolder) {
    this.raw = info;
  }
  *[Symbol.iterator]() {
    yield* Folder.Generator(this.children);
  }

  async update() {
    this.raw = await API.FolderUpdate(this.raw.id);
    return this;
  }
}
