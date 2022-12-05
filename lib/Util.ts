const icon = (flag: string, color: string = "#fff") => [
  `%c ${flag} %c Eagle Application %c`,
  `background:#35495e ; padding: 0 8px; border-radius: 8px 0 0 2px;  color: ${color}`,
  "background:#0b77f0 ; padding: 0 8px; border-radius: 0 2px 8px 0;  color: #fff",
  "background:transparent",
];
export function ConsoleLog(msg: string, flag: string = "INFO") {
  console.log(` ${msg}\n%s`, ...icon(flag));
}
export function ConsoleWarn(msg: string, flag: string = "WARN") {
  console.warn(`${msg}\n%s`, ...icon(flag, "#ff0"));
}
export function ConsoleError(msg: string, flag: string = "ERROR") {
  console.error(`${msg}\n%s`, ...icon(flag, "#f66"));
}
