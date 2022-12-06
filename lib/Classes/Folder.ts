import API from "../API/index";
import { CommonFolder } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";

export default class Folder {
  
  raw: CommonFolder;
  get name() {
    return this.raw.name;
  }

  constructor(info: CommonFolder) {
    this.raw = info;
  }

  async update() {
    this.raw = await API.FolderUpdate(this.raw.id);
    return this;
  }
}
