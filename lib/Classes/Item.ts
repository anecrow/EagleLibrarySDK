import API from "../API/index";
import { Item as ItemInfo } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";
import Folder from "./Folder"; // XXX:  循环引用

export default class Item {
  raw: ItemInfo;
  name: string;

  get parentFolders() {
    return (async () => {
      const folders = [];
      for (const id of this.raw.folders) {
        folders.push(new Folder(await API.FolderUpdate(id)));
      }
      return folders;
    })();
  }
  get filePath() {
    return (async () =>
      (await API.LibraryInfo()).library.path +
      "\\images\\" +
      this.raw.id +
      ".info")();
  }
  get fileName() {
    return this.raw.name + "." + this.raw.ext;
  }
  get tags() {
    return this.raw.tags;
  }
  set tags(tags: string[]) {
    this.update({ tags: tags });
  }
  get annotation() {
    return this.raw.annotation;
  }
  set annotation(annotation: string) {
    this.update({ annotation: annotation });
  }
  get url() {
    return this.raw.url;
  }
  set url(url: string) {
    this.update({ url: url });
  }
  get star() {
    return this.raw.star;
  }
  set star(star: number | undefined) {
    // BUG: 无法取消星级或置零
    this.update({ star: star });
  }

  constructor(info: ItemInfo) {
    this.raw = info;
    this.name = this.raw.name;
  }

  async update(): Promise<void>;
  async update(option: {
    /** 标签 */ tags?: string[];
    /** 注释 */ annotation?: string;
    /** 来源网址 */ url?: string;
    /** 评分 */ star?: number;
  }): Promise<void>;
  async update(option?: any) {
    this.raw = await API.ItemUpdate(this.raw.id, option);
    this.name = this.raw.name;
  }

  refreshPalette() {
    API.ItemRefreshPalette(this.raw.id);
  }
  refreshThumbnail() {
    API.ItemRefreshThumbnail(this.raw.id);
  }
  delete() {
    API.ItemMoveToTrash([this.raw.id]);
  }
}
