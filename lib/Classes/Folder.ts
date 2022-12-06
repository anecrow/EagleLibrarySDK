import API from "../API/index";
import { CommonFolder } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";
import Item from "./Item";

export default class Folder {
  static *Generator(folders: Folder[]): Generator<Folder, void, undefined> {
    for (const folder of folders) {
      yield folder;
      yield* folder;
    }
  }
  /** 属性更详细的版本 */
  static async *FolderALL() {
    const folders = (await API.LibraryInfo()).folders.map((i) => new Folder(i));
    for (const folder of Folder.Generator(folders)) {
      yield await folder.update(); // XXX: 每次额外的fetch开销
    }
  }
  raw: CommonFolder;
  name: string;
  get children() {
    return this.raw.children.map((info) => new Folder(info));
  }
  get items() {
    return (async () => {
      const infoes = await API.ItemList({ folders: [this.raw.id] });
      return infoes.map((info) => new Item(info));
    })();
  }

  constructor(info: CommonFolder) {
    this.raw = info;
    this.name = this.raw.name;
  }
  *[Symbol.iterator]() {
    yield* Folder.Generator(this.children);
  }

  async update() {
    this.raw = await API.FolderUpdate(this.raw.id);
    this.name = this.raw.name;
    return this;
  }
}
