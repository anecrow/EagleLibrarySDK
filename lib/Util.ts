export interface ConsoleOption {
  flag?: string;
  color?: string;
  title?: string;
}
const title = "Eagle App";
const icon = (opt: ConsoleOption) => [
  `%c ${opt.flag} %c ${opt.title} %c`,
  `background:#35495e ; padding: 0 8px; border-radius: 8px 0 0 2px;  color: ${opt.color}`,
  "background:#0b77f0 ; padding: 0 8px; border-radius: 0 2px 8px 0;  color: #fff",
  "background:transparent",
];
export function ConsoleLog(msg: string, opt?: ConsoleOption) {
  opt ??= { flag: "INFO" };
  opt.color ??= "#fff";
  opt.title ??= title;
  console.log(`${msg}\n%s`, ...icon(opt));
}
export function ConsoleWarn(msg: string, opt?: ConsoleOption) {
  opt ??= { flag: "WARN" };
  opt.color ??= "#ff0";
  opt.title ??= title;
  console.warn(`${msg}\n%s`, ...icon(opt));
}
export function ConsoleError(msg: string, opt?: ConsoleOption) {
  opt ??= { flag: "ERROR" };
  opt.color ??= "#f66";
  opt.title ??= title;
  console.error(`${msg}\n%s`, ...icon(opt));
}
