import API from "../API/index";
import { CommonFolder } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";

export default class Folder {
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
    for (const info of this.raw.children) {
      const folder = new Folder(info);
      yield folder;
      yield* folder.children;
    }
  }

  async update() {
    this.raw = await API.FolderUpdate(this.raw.id);
    return this;
  }
}
