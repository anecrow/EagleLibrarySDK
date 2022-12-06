import API from "../API/index";
import { CommonFolder } from "../API/typs";
import { ConsoleLog, ConsoleWarn, ConsoleError } from "../Util";

export default class Folder {
  raw: CommonFolder;
  constructor(info: CommonFolder) {
    this.raw = info;
  }
}
