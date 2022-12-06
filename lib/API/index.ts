import * as Base from "./Base";
import * as Library from "./Library";
import * as Folder from "./Folder";
import * as Item from "./Item";

namespace API {
  export type URLInfo = Base.APIPath;
  export const Default = Base.Default;
  export const fetchAwaitData = Base.fetchAwaitData;
  export const fetchGET = Base.fetchGET;
  export const fetchPOST = Base.fetchPOST;
}
namespace API {
  export const AppInfo = Library.AppInfo;
  export const LibraryInfo = Library.LibraryInfo;
  export const LibraryHistory = Library.LibraryHistory;
  export const LibrarySwitch = Library.LibrarySwitch;
}
namespace API {
  export const FolderCreate = Folder.FolderCreate;
  export const FolderRename = Folder.FolderRename;
  export const FolderUpdate = Folder.FolderUpdate;
  export const FolderList = Folder.FolderList;
  export const FolderListRecent = Folder.FolderListRecent;
}
namespace API{
  export const ItemAddFromURL = Item.ItemAddFromURL;
  export const ItemAddFromURLs = Item.ItemAddFromURLs;
  export const ItemAddFromPath = Item.ItemAddFromPath;
  export const ItemAddFromPaths = Item.ItemAddFromPaths;
  export const ItemAddBookmark = Item.ItemAddBookmark;
  export const ItemInfo = Item.ItemInfo;
  export const ItemMoveToTrash = Item.ItemMoveToTrash;
  export const ItemThumbnail = Item.ItemThumbnail;
  export const ItemList = Item.ItemList;
  export const ItemRefreshPalette = Item.ItemRefreshPalette;
  export const ItemRefreshThumbnail = Item.ItemRefreshThumbnail;
  export const ItemUpdate = Item.ItemUpdate;
}
export default API;
