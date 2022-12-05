import { fetchGET, fetchPOST } from "./Base";
import * as Type from "./typs";

/**
 * **创建文件夹**
 *
 * `POST` 创建一个文件夹，这个文件夹出现在当前资源库文件夹列表的尾部。
 */
export function FolderCreate(
  /** 文件夹名 */ folderName: string
): Promise<Type.CommonFolder>;
/**
 * **创建子文件夹**
 *
 * `POST` 在文件夹中创建一个子文件夹。
 */
export function FolderCreate(
  /** 文件夹名 */ folderName: string,
  /** 父文件夹 ID */ parent: string
): Promise<Type.CommonFolder>;
export function FolderCreate(folderName: string, parent?: string) {
  return fetchPOST("/api/folder/create", {
    folderName: folderName,
    parent: parent,
  });
}

/**
 * **重命名文件夹**
 *
 * `POST` 重新命名指定文件夹
 */
export function FolderRename(folderId: string, newName: string) {
  return fetchPOST("/api/folder/rename", {
    /** 文件夹 ID */ folderId: folderId,
    /** 新的文件夹名 */ newName: newName,
  }) as Promise<Type.CommonFolder>;
}

/**
 * **文件夹信息**
 *
 * `POST` 获取指定文件夹信息
 */
export function FolderUpdate(
  /** 文件夹 ID */ folderId: string
): Promise<Type.CommonFolder>;
/**
 * **更新文件夹**
 *
 * `POST` 重新命名指定文件夹
 */
export function FolderUpdate(
  /** 文件夹 ID */ folderId: string,
  /** 可选项 */ option: {
    /** 新的文件夹名 */ newName?: string;
    /** 新的文件夹描述 */ newDescription?: string;
    /** 新的文件夹颜色 */ newColor?: string;
  }
): Promise<Type.CommonFolder>;
export function FolderUpdate(folderId: string, option?: object) {
  return fetchPOST(
    "/api/folder/update",
    Object.assign(option ?? {}, { folderId: folderId })
  );
}

/**
 * **所有文件夹**
 *
 * `GET` 取得当前资源库文件夹列表
 */
export function FolderList() {
  return fetchGET("/api/folder/list") as Promise<Type.CommonFolder[]>;
}

/**
 * **最近使用文件夹**
 *
 * `GET` 取得最近用户使用过的文件夹列表
 */
export function FolderListRecent() {
  return fetchGET("/api/folder/listRecent") as Promise<Type.CommonFolder[]>;
}
