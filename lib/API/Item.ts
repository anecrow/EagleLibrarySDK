import { fetchGET, fetchPOST } from "./Base";
import * as Type from "./typs";

/**
 * **从链接添加图片**
 *
 * `POST` 将图片链接添加至 Eagle 应用
 *
 * 如果需要一次添加多个项目，可以改用 /api/item/addFromURLs 获得更高处理性能。
 */
export function ItemAddFromURL(
  /** 图片链接，支持`http` `https` `base64` */ url: string,
  /** 图片名 */ name: string
): Promise<undefined>;
/**
 * **从链接添加图片**
 *
 * `POST` 将图片链接添加至 Eagle 应用
 *
 * 如果需要一次添加多个项目，可以改用 /api/item/addFromURLs 获得更高处理性能。
 */
export function ItemAddFromURL(
  /** 图片链接，支持`http` `https` `base64` */ url: string,
  /** 图片名 */ name: string,
  /** 可选项 */ option: {
    /** 来源网址 */ website?: string;
    /** 标签 */ tags?: string[];
    /** 注释 */ annotation?: string;
    /** 创建时间，可以用此参数控制添加后在 Eagle 的排列顺序 */ modificationTime?: number;
    /** 如果带有此参数，图片将会添加到指定文件夹 */ folderId?: string;
    /** 选填，自定义 HTTP headers 属性，可用来绕过特定网站保护机制 */ headers?: any;
  }
): Promise<undefined>;
export function ItemAddFromURL(url: string, name: string, option?: object) {
  return fetchPOST(
    "/api/item/addFromURL",
    Object.assign(option ?? {}, { url: url, name: name })
  );
}

/**
 * **从链接添加多个图片**
 *
 * `POST`  将多张图片链接添加至 Eagle 应用。
 */
export function ItemAddFromURLs(
  /** 由多个 item 组成的 array 物件 */ items: {
    /** 图片链接，支持`http` `https` `base64` */ url: string;
    /** 图片名 */ name: string;
    /** 来源网址 */ website?: string;
    /** 标签 */ tags?: string[];
    /** 注释 */ annotation?: string;
    /** 创建时间，可以用此参数控制添加后在 Eagle 的排列顺序 */ modificationTime?: number;
    /** 选填，自定义 HTTP headers 属性，可用来绕过特定网站保护机制 */ headers?: any;
  }[]
): Promise<undefined>;
/**
 * **从链接添加多个图片**
 *
 * `POST`  将多张图片链接添加至 Eagle 应用。
 */
export function ItemAddFromURLs(
  /** 由多个 item 组成的 array 物件 */ items: {
    /** 图片链接，支持`http` `https` `base64` */ url: string;
    /** 图片名 */ name: string;
    /** 来源网址 */ website?: string;
    /** 标签 */ tags?: string[];
    /** 注释 */ annotation?: string;
    /** 创建时间，可以用此参数控制添加后在 Eagle 的排列顺序 */ modificationTime?: number;
    /** 选填，自定义 HTTP headers 属性，可用来绕过特定网站保护机制 */ headers?: any;
  }[],
  /** 如果带有此参数，图片将会添加到指定文件夹 */ folderId: string
): Promise<undefined>;
export function ItemAddFromURLs(items: object[], folderId?: string) {
  return fetchPOST(
    "/api/item/addFromURLs",
    Object.assign({ items: items, folderId: folderId })
  );
}

/**
 * **添加本地文件**
 *
 * `POST` 添加本地文件到 Eagle 应用
 *
 * 如果需要一次添加多个项目，可以改用 /api/item/addFromPaths 已获得更高处理性能。
 */
export function ItemAddFromPath(
  /** 本地文件路径 */ path: string,
  /** 图片名 */ name: string
): Promise<undefined>;
/**
 * **添加本地文件**
 *
 * `POST` 添加本地文件到 Eagle 应用
 *
 * 如果需要一次添加多个项目，可以改用 /api/item/addFromPaths 已获得更高处理性能。
 */
export function ItemAddFromPath(
  /** 本地文件路径 */ path: string,
  /** 图片名 */ name: string,
  /** 可选项 */ option: {
    /** 来源网址 */ website?: string;
    /** 注释 */ annotation?: string;
    /** 标签 */ tags?: string[];
    /** 如果带有此参数，图片将会添加到指定文件夹 */ folderId?: string;
  }
): Promise<undefined>;
export function ItemAddFromPath(path: string, name: string, option?: object) {
  return fetchPOST(
    "/api/item/addFromPath",
    Object.assign(option ?? {}, { path: path, name: name })
  );
}

/**
 * **添加多个本地文件**
 *
 * `POST` 添加多个本地文件到 Eagle 应用。
 */
export function ItemAddFromPaths(
  /** 由多个 item 组成的 array 物件 */ items: {
    /** 图片链接，支持`http` `https` `base64` */ url: string;
    /** 图片名 */ name: string;
    /** 来源网址 */ website?: string;
    /** 标签 */ tags?: string[];
    /** 注释 */ annotation?: string;
  }[]
): Promise<undefined>;
/**
 * **添加多个本地文件**
 *
 * `POST` 添加多个本地文件到 Eagle 应用。
 */
export function ItemAddFromPaths(
  /** 由多个 item 组成的 array 物件 */ items: {
    /** 图片链接，支持`http` `https` `base64` */ url: string;
    /** 图片名 */ name: string;
    /** 来源网址 */ website?: string;
    /** 标签 */ tags?: string[];
    /** 注释 */ annotation?: string;
  }[],
  /** 如果带有此参数，图片将会添加到指定文件夹 */ folderId: string
): Promise<undefined>;
export function ItemAddFromPaths(items: object[], folderId?: string) {
  return fetchPOST(
    "/api/item/addFromPaths",
    Object.assign({ items: items, folderId: folderId })
  );
}

/**
 * **添加网页书签**
 *
 * `POST` 将链接以 URL 格式保存在 Eagle 应用。
 */
export function ItemAddBookmark(
  /** 图片链接，支持`http` `https` `base64` */ url: string,
  /** 图片名 */ name: string
): Promise<undefined>;
/**
 * **添加网页书签**
 *
 * `POST` 将链接以 URL 格式保存在 Eagle 应用。
 */
export function ItemAddBookmark(
  /** 图片链接，支持`http` `https` `base64` */ url: string,
  /** 图片名 */ name: string,
  /** 可选项 */ option: {
    /** 书签缩略图，必须是 `base64` 格式 */ base64?: string;
    /** 标签 */ tags?: string[];
    /** 创建时间，可以用此参数控制添加后在 Eagle 的排列顺序 */ modificationTime?: number;
    /** 如果带有此参数，图片将会添加到指定文件夹 */ folderId?: string;
  }
): Promise<undefined>;
export function ItemAddBookmark(url: string, name: string, option?: object) {
  return fetchPOST(
    "/api/item/addBookmark",
    Object.assign(option ?? {}, { url: url, name: name })
  );
}

/**
 * **取得项目信息**
 *
 * `GET` 取得特定文件基本信息，包含文件名、标签、分类、文件夹、分辨率等。
 */
export function ItemInfo(id: string) {
  return fetchGET("/api/item/info", { id: id }) as Promise<Type.Item>;
}

/**
 * **丢到垃圾桶**
 *
 * `POST` 将文件丢到垃圾桶。
 */
export function ItemMoveToTrash(itemIds: string[]) {
  return fetchPOST("/api/item/moveToTrash", {
    itemIds: itemIds,
  }) as Promise<undefined>;
}

/**
 * **取得项目缩略图**
 *
 * `GET` 取得特定文件缩略图位置，如果需要批量使用，建议直接使用 资源库路径 + 项目ID 的方式组合。
 */
export function ItemThumbnail(id: string) {
  return fetchGET("/api/item/thumbnail", { id: id }) as Promise<string>;
}

/**
 * **列出所有项目**
 *
 * `GET` 取得符合条件的项目。
 */
export function ItemList(options?: {
  /** 取得数量，默认为 200 */ limit?: number;
  /** 获取页次，从 0开始 */ offset?: number;
  /** 排序方式 */ orderBy?: Type.ItemListOrder;
  /** 筛选关键字 */ keyword?: string;
  /** 筛选文件类型，例如 `jpg` `png` */ ext?: string;
  /** 筛选标签 */ tags?: string[];
  /** 筛选文件夹 */ folders?: string[];
}) {
  return fetchGET("/api/item/list", options) as Promise<Type.Item[]>;
}

/**
 * **重新分析颜色**
 *
 * `POST` 重新对文件进行颜色分，尝试修改原文件后，可以呼叫此功能重新更新颜色分析。
 */
export function ItemRefreshPalette(id: string) {
  return fetchPOST("/api/item/refreshPalette", {
    id: id,
  }) as Promise<undefined>;
}

/**
 * **重新刷新缩略图**
 *
 * `POST` 重新制作文件在列表显示的缩略图，修改原文件后，可以呼叫此功能重新制作新的缩略图，同时也会重新分析颜色。
 */
export function ItemRefreshThumbnail(id: string) {
  return fetchPOST("/api/item/refreshThumbnail", {
    id: id,
  }) as Promise<undefined>;
}

/**
 * **获取項目信息**
 */
export function ItemUpdate(id: string): Promise<Type.Item>;
/**
 * **修改項目信息**
 *
 * POST 修改项目指定栏位信息。
 * @example
 * 可以用这个功能达成什么任务？
 * - 使用外部 `OCR` 工具分析图像可能出现的文字，将文字以注释、标签的方式补充在图片上，方便搜索
 * - 使用外部 `Object Detection` 工具分析图像可能出现的物品，如动物、家俱等，以标签的方式补充在图片上，方便搜索
 */
export function ItemUpdate(
  /** 项目 ID */ id: string,
  /** 可选项 */ option: {
    /** 标签 */ tags?: string[];
    /** 注释 */ annotation?: string;
    /** 来源网址 */ url?: string;
    /** 评分 */ star?: number;
  }
): Promise<Type.Item>;
export function ItemUpdate(id: string, option?: object) {
  return fetchPOST("/api/item/update", Object.assign(option ?? {}, { id: id }));
}
