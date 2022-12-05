export type Data =
  | undefined
  | string
  | string[]
  | ApplicationInfo
  | LibraryInfo
  | CommonFolder
  | CommonFolder[]
  | Item
  | Item[];

/* ---------------------
 * Application & Library
 -------------------- */
export interface ApplicationInfo {
  version: string;
  prereleaseVersion: string | null; //XXX: 不确定
  buildVersion: string;
  execPath: string;
  platform: string;
}
export interface LibraryInfo {
  applicationVersion: string;
  library: {
    name: string;
    path: string;
  };
  modificationTime: number;
  folders: CommonFolder[];
  smartFolders: SmartFolder[];
  tagsGroups: {
    id: string;
    name: string;
    tags: string[];
  }[];
  quickAccess: {
    id: string;
    type: "folder" | "smartFolder";
  }[];
}

/* ----
 * Base
 --- */
interface Base {
  id: string;
  name: string;
  size: number;
  folders: string[];
  modificationTime: number;
  tags: string[];
}
/* ------
 * Folder
 ----- */
interface FolderBase extends Base {
  description?: string;
  icon?: string; // TODO: icon types
  iconColor?: IconColor;
  children: [] | SmartFolder[] | CommonFolder[];
  /* expand props */
  imageCount: number;
  pinyin: string;
  vstype: "folder" | "smartFolder";
  isExpand: boolean;
  isVisible: boolean;
  index: number;
  styles: {
    depth: number;
    first: boolean;
    last: boolean;
  };
  size: 28;
  $$hashKey: string;
}

export interface CommonFolder extends FolderBase {
  vstype: "folder";
  children: CommonFolder[];
  covers: string[];
  newFolderName: string;
  extendTags: string[];
  descendantImageCount: number;
  password?: string;
  passwordTips?: string;
  isUnLock?: boolean;
  editable?: boolean;
  images: [];
  imagesMappings: {};
}
export interface SmartFolder extends FolderBase {
  vstype: "smartFolder";
  children: SmartFolder[];
  parent?: string;
  conditions: {
    $$hashKey: string;
    boolean: "TRUE" | "FALSE";
    match: "OR" | "AND";
    rules: {
      $$hashKey: string;
      method: RuleMethod;
      property: RuleProperty;
      height?: number;
      width?: number;
      data?: string;
      unit?: "kb" | "mb" | "s" | "m" | "h";
      value: any; //XXX: 不确定
    }[];
  }[];
}
export type IconColor =
  | "red"
  | "orange"
  | "green"
  | "yellow"
  | "aqua"
  | "blue"
  | "purple"
  | "pink";
export type RuleProperty =
  | "Annotation" /** 注释 */
  | "Color" /** 颜色 */
  | "Comments" /** 标注 */
  | "CreateTime" /** 添加日期 */
  | "Folders" /** 文件夹 */
  | "Height" /** 高度 */
  | "MTime" /** 修改日期 */
  | "Name" /** 名称 */
  | "Rating" /** 评分 */
  | "Shape" /** 形状 */
  | "Size" /** 文件大小 */
  | "Tags" /** 标签 */
  | "Type" /** 格式 */
  | "Url" /** 链接 */
  | "Width"; /** 宽度 */
export type RuleMethod =
  | "<" /** 小于 */
  | "<=" /** 小于等于 */
  | "=" /** 等于 */
  | ">" /** 大于 */
  | ">=" /** 大于等于 */
  | "Between" /** 范围 */
  | "accuracy" /** 几乎一样 */
  | "activate" /** 已安装 */
  | "after" /** 晚于 */
  | "before" /** 早于 */
  | "contain" /** 包含 */
  | "dateBetween" /** 在日期范围内 */
  | "deactivate" /** 未安装 */
  | "empty" /** 没有内容 */
  | "endWith" /** 结尾为 */
  | "equal" /** 相等 */
  | "grayscale" /** 黑白 */
  | "identity" /** 不包含 */
  | "intersection" /** 全部包含 */
  | "is" /** 是 */
  | "not" /** 不是 */
  | "notEmpty" /** 有内容 */
  | "on" /** 等于 */
  | "regex" /** 正则表达式 */
  | "similar" /** 相似 */
  | "startWith" /** 开头为 */
  | "unconatin" /** 不包含 */
  | "union" /** 任一项包含 */
  | "within"; /** 在过去 */

/* ----
 * Item
 --- */
export interface Item extends Base {
  btime: number;
  mtime: number;
  ext: string;
  isDeleted: boolean;
  url: string;
  annotation: string;
  height: number;
  width: number;
  lastModified: number;
  palettes: {
    color: number[];
    ratio: number;
    $$hashKey: string;
  }[];
}
export type ItemListOrder =
  | "CREATEDATE" /** 创建时间 */
  | "FILESIZE" /** 文件大小 */
  | "NAME" /** 名称 */
  | "RESOLUTION" /** 分辨率 */
  /* 反序 */
  | "-CREATEDATE"
  | "-FILESIZE"
  | "-NAME"
  | "-RESOLUTION";
