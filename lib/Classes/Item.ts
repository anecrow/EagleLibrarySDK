import API from "../API/index";
import { Item as ItemInfo } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";

export default class Item {
  raw: ItemInfo;
  name: string;
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
}
