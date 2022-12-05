export type Data = undefined | string[] | ApplicationInfo | LibraryInfo;

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
  folders: [];
  smartFolders: [];
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
