import API from "../API/index";
import { CommonFolder, IconColor } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";
import Library from "./Library"; // XXX:  循环引用
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
  static async GetFolderWithNames(names: string[]) {
    const library = await Library.GetActiveLibrary();
    return [...this.Generator(library.folders)].filter((folder) =>
      names.includes(folder.name)
    );
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
  set newName(newName: string) {
    this.update({ newName: newName });
  }
  set newDescription(newDescription: string) {
    this.update({ newDescription: newDescription });
  }
  set newColor(newColor: IconColor) {
    this.update({ newColor: newColor });
  }

  constructor(info: CommonFolder) {
    this.raw = info;
    this.name = this.raw.name;
  }
  *[Symbol.iterator]() {
    yield* Folder.Generator(this.children);
  }

  async update(): Promise<Folder>;
  async update(option: {
    /** 新的文件夹名 */ newName?: string;
    /** 新的文件夹描述 */ newDescription?: string;
    /** 图标颜色 */ newColor?: IconColor;
  }): Promise<Folder>;
  async update(option?: any) {
    this.raw = await API.FolderUpdate(this.raw.id, option);
    this.name = this.raw.name;
    return this;
  }

  async deleteItems() {
    const items = await this.items;
    API.ItemMoveToTrash(items.map((info) => info.raw.id));
  }
  async addSubFolder(name: string) {
    return API.FolderCreate(name, this.raw.id);
  }
  ItemAddFromURLs(
    /** 由多个 item 组成的 array 物件 */ items: {
      /** 图片链接，支持`http` `https` `base64` */ url: string;
      /** 图片名 */ name: string;
      /** 来源网址 */ website?: string;
      /** 标签 */ tags?: string[];
      /** 注释 */ annotation?: string;
      /** 创建时间，可以用此参数控制添加后在 Eagle 的排列顺序 */ modificationTime?: number;
      /** 选填，自定义 HTTP headers 属性，可用来绕过特定网站保护机制 */ headers?: any;
    }[]
  ) {
    API.ItemAddFromURLs(items, this.raw.id);
  }
  ItemAddFromPaths(
    items: {
      /** 图片链接，支持`http` `https` `base64` */ url: string;
      /** 图片名 */ name: string;
      /** 来源网址 */ website?: string;
      /** 标签 */ tags?: string[];
      /** 注释 */ annotation?: string;
    }[]
  ) {
    API.ItemAddFromPaths(items, this.raw.id);
  }
}
