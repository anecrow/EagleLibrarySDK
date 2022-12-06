import API from "../API/index";
import { Item as ItemInfo } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";

export default class Item {
  raw: ItemInfo;
  name: string;
  constructor(info: ItemInfo) {
    this.raw = info;
    this.name = this.raw.name;
  }
  async update() {
    this.raw = await API.ItemUpdate(this.raw.id);
    this.name = this.raw.name;
  }
}
