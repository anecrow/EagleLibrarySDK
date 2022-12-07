import { fetchGET, fetchPOST } from "./Base";
import * as Type from "./typs";

/**
 * **应用版本信息**
 *
 * `GET` 取得当前运行 Eagle App 的详细信息，通常我们可以透过这个方式判断用户设备是否能够运行某些功能。
 */
export function AppInfo() {
  return fetchGET("/api/application/info") as Promise<Type.ApplicationInfo>;
}

/**
 * **取得资源库信息**
 *
 * `GET` 取得当前运行资源库的详细信息，你可以透过这个功能快速取得 所有文件夹 、所有智能文件夹 、 所有标签群组、 快速访问 等信息。
 * // BUG: 运行中不会更新此数据, 需要重启应用
 */
export function LibraryInfo() {
  return fetchGET("/api/library/info") as Promise<Type.LibraryInfo>;
}

/**
 * **资源库列表**
 *
 * `GET` 取得软件中最近使用过的资源库列表
 */
export function LibraryHistory() {
  return fetchGET("/api/library/history") as Promise<string[]>;
}

/**
 * **切换资源库**
 *
 * `POST` 切换 Eagle 打开的资源库。
 */
export function LibrarySwitch(/** 资源库路径 */ libraryPath: string) {
  return fetchPOST("/api/library/switch", {
    libraryPath: libraryPath,
  }) as Promise<undefined>;
}
