var EagleSDK = (function (exports) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    /** 默认值 */
    const Default = {
        /** Eagle服务地址 */
        get Server() {
            return "http://localhost:41595";
        },
        /** 更换Eagle服务地址 */
        change: (url) => {
            if (typeof url == "string")
                url = new URL(url);
            const href = url.href;
            Object.defineProperty(Default, "Server", { get: () => href });
        },
    };
    const mergePath = (url) => new URL(url, Default.Server);
    /** 请求并解析返回的JSON数据 */
    function fetchAwaitData(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(request);
            if (!response.ok)
                throw response;
            const json = yield response.json();
            return json.data; // BUG: 短时间内POST修改有可能会返回相同数据, 有可能是Eagle服务端优化合并队列的原因
        });
    }
    /**
     * 通用 `GET` 函数
     * @param url 目标api
     * @param data 参数
     */
    function fetchGET(url, data) {
        if (typeof url == "string")
            url = mergePath(url);
        url = new URL("?" + new URLSearchParams(data).toString(), url);
        return fetchAwaitData(new Request(url));
    }
    /**
     * 通用 `POST` 函数
     * @param url 目标api
     * @param data 参数
     */
    function fetchPOST(url, data) {
        if (typeof url == "string")
            url = mergePath(url);
        return fetchAwaitData(new Request(url, {
            method: "POST",
            body: JSON.stringify(data),
        }));
    }

    /**
     * **应用版本信息**
     *
     * `GET` 取得当前运行 Eagle App 的详细信息，通常我们可以透过这个方式判断用户设备是否能够运行某些功能。
     */
    function AppInfo() {
        return fetchGET("/api/application/info");
    }
    /**
     * **取得资源库信息**
     *
     * `GET` 取得当前运行资源库的详细信息，你可以透过这个功能快速取得 所有文件夹 、所有智能文件夹 、 所有标签群组、 快速访问 等信息。
     */
    function LibraryInfo() {
        return fetchGET("/api/library/info");
    }
    /**
     * **资源库列表**
     *
     * `GET` 取得软件中最近使用过的资源库列表
     */
    function LibraryHistory() {
        return fetchGET("/api/library/history");
    }
    /**
     * **切换资源库**
     *
     * `POST` 切换 Eagle 打开的资源库。
     */
    function LibrarySwitch$1(/** 资源库路径 */ libraryPath) {
        return fetchPOST("/api/library/switch", {
            libraryPath: libraryPath,
        });
    }

    function FolderCreate(folderName, parent) {
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
    function FolderRename(folderId, newName) {
        return fetchPOST("/api/folder/rename", {
            /** 文件夹 ID */ folderId: folderId,
            /** 新的文件夹名 */ newName: newName,
        });
    }
    function FolderUpdate(folderId, option) {
        return fetchPOST("/api/folder/update", Object.assign(option !== null && option !== void 0 ? option : {}, { folderId: folderId }));
    }
    /**
     * **所有文件夹**
     *
     * `GET` 取得当前资源库文件夹列表
     */
    function FolderList() {
        return fetchGET("/api/folder/list");
    }
    /**
     * **最近使用文件夹**
     *
     * `GET` 取得最近用户使用过的文件夹列表
     */
    function FolderListRecent() {
        return fetchGET("/api/folder/listRecent");
    }

    function ItemAddFromURL(url, name, option) {
        return fetchPOST("/api/item/addFromURL", Object.assign(option !== null && option !== void 0 ? option : {}, { url: url, name: name }));
    }
    function ItemAddFromURLs(items, folderId) {
        return fetchPOST("/api/item/addFromURL", Object.assign({ items: items, folderId: folderId }));
    }
    function ItemAddFromPath(path, name, option) {
        return fetchPOST("/api/item/addFromPath", Object.assign(option !== null && option !== void 0 ? option : {}, { path: path, name: name }));
    }
    function ItemAddFromPaths(items, folderId) {
        return fetchPOST("/api/item/addFromPaths", Object.assign({ items: items, folderId: folderId }));
    }
    function ItemAddBookmark(url, name, option) {
        return fetchPOST("/api/item/addBookmark", Object.assign(option !== null && option !== void 0 ? option : {}, { url: url, name: name }));
    }
    /**
     * **取得项目信息**
     *
     * `GET` 取得特定文件基本信息，包含文件名、标签、分类、文件夹、分辨率等。
     */
    function ItemInfo(id) {
        return fetchGET("/api/item/info", { id: id });
    }
    /**
     * **丢到垃圾桶**
     *
     * `POST` 将文件丢到垃圾桶。
     */
    function ItemMoveToTrash(itemIds) {
        return fetchPOST("/api/item/moveToTrash", {
            itemIds: itemIds,
        });
    }
    /**
     * **取得项目缩略图**
     *
     * `GET` 取得特定文件缩略图位置，如果需要批量使用，建议直接使用 资源库路径 + 项目ID 的方式组合。
     */
    function ItemThumbnail(id) {
        return fetchGET("/api/item/thumbnail", { id: id });
    }
    /**
     * **列出所有项目**
     *
     * `GET` 取得符合条件的项目。
     */
    function ItemList(options) {
        return fetchGET("/api/item/list", options);
    }
    /**
     * **重新分析颜色**
     *
     * `POST` 重新对文件进行颜色分，尝试修改原文件后，可以呼叫此功能重新更新颜色分析。
     */
    function ItemRefreshPalette(id) {
        return fetchPOST("/api/item/refreshPalette", {
            id: id,
        });
    }
    /**
     * **重新刷新缩略图**
     *
     * `POST` 重新制作文件在列表显示的缩略图，修改原文件后，可以呼叫此功能重新制作新的缩略图，同时也会重新分析颜色。
     */
    function ItemRefreshThumbnail(id) {
        return fetchPOST("/api/item/refreshThumbnail", {
            id: id,
        });
    }
    function ItemUpdate(id, option) {
        return fetchPOST("/api/item/update", Object.assign(option !== null && option !== void 0 ? option : {}, { id: id }));
    }

    var API;
    (function (API) {
        API.Default = Default;
        API.fetchAwaitData = fetchAwaitData;
        API.fetchGET = fetchGET;
        API.fetchPOST = fetchPOST;
    })(API || (API = {}));
    (function (API) {
        API.AppInfo = AppInfo;
        API.LibraryInfo = LibraryInfo;
        API.LibraryHistory = LibraryHistory;
        API.LibrarySwitch = LibrarySwitch$1;
    })(API || (API = {}));
    (function (API) {
        API.FolderCreate = FolderCreate;
        API.FolderRename = FolderRename;
        API.FolderUpdate = FolderUpdate;
        API.FolderList = FolderList;
        API.FolderListRecent = FolderListRecent;
    })(API || (API = {}));
    (function (API) {
        API.ItemAddFromURL = ItemAddFromURL;
        API.ItemAddFromURLs = ItemAddFromURLs;
        API.ItemAddFromPath = ItemAddFromPath;
        API.ItemAddFromPaths = ItemAddFromPaths;
        API.ItemAddBookmark = ItemAddBookmark;
        API.ItemInfo = ItemInfo;
        API.ItemMoveToTrash = ItemMoveToTrash;
        API.ItemThumbnail = ItemThumbnail;
        API.ItemList = ItemList;
        API.ItemRefreshPalette = ItemRefreshPalette;
        API.ItemRefreshThumbnail = ItemRefreshThumbnail;
        API.ItemUpdate = ItemUpdate;
    })(API || (API = {}));
    var API$1 = API;

    const icon = (flag, color = "#fff") => [
        `%c ${flag} %c Eagle Application %c`,
        `background:#35495e ; padding: 0 8px; border-radius: 8px 0 0 2px;  color: ${color}`,
        "background:#0b77f0 ; padding: 0 8px; border-radius: 0 2px 8px 0;  color: #fff",
        "background:transparent",
    ];
    function ConsoleLog(msg, flag = "INFO") {
        console.log(` ${msg}\n%s`, ...icon(flag));
    }
    function ConsoleError(msg, flag = "ERROR") {
        console.error(`${msg}\n%s`, ...icon(flag, "#f66"));
    }

    class Item {
        static GetItemWithFolderNames(names) {
            return __awaiter(this, void 0, void 0, function* () {
                const folders = yield Folder.GetFolderWithNames(names);
                console.log(folders);
                let items = [];
                for (const folder of folders) {
                    const news = yield folder.items;
                    console.log(news);
                }
                return items;
            });
        }
        get parentFolders() {
            return (() => __awaiter(this, void 0, void 0, function* () {
                const folders = [];
                for (const id of this.raw.folders) {
                    folders.push(new Folder(yield API$1.FolderUpdate(id)));
                }
                return folders;
            }))();
        }
        get filePath() {
            return (() => __awaiter(this, void 0, void 0, function* () {
                return (yield API$1.LibraryInfo()).library.path +
                    "\\images\\" +
                    this.raw.id +
                    ".info";
            }))();
        }
        get fileName() {
            return this.raw.name + "." + this.raw.ext;
        }
        get tags() {
            return this.raw.tags;
        }
        set tags(tags) {
            this.update({ tags: tags });
        }
        get annotation() {
            return this.raw.annotation;
        }
        set annotation(annotation) {
            this.update({ annotation: annotation });
        }
        get url() {
            return this.raw.url;
        }
        set url(url) {
            this.update({ url: url });
        }
        get star() {
            return this.raw.star;
        }
        set star(star) {
            // BUG: 无法取消星级或置零
            this.update({ star: star });
        }
        constructor(info) {
            this.raw = info;
            this.name = this.raw.name;
        }
        update(option) {
            return __awaiter(this, void 0, void 0, function* () {
                this.raw = yield API$1.ItemUpdate(this.raw.id, option);
                this.name = this.raw.name;
                return this;
            });
        }
        refreshPalette() {
            API$1.ItemRefreshPalette(this.raw.id);
        }
        refreshThumbnail() {
            API$1.ItemRefreshThumbnail(this.raw.id);
        }
        delete() {
            API$1.ItemMoveToTrash([this.raw.id]);
        }
    }

    class Folder {
        static *Generator(folders) {
            for (const folder of folders) {
                yield folder;
                yield* folder;
            }
        }
        /** 属性更详细的版本 */
        static FolderALL() {
            return __asyncGenerator(this, arguments, function* FolderALL_1() {
                const folders = (yield __await(API$1.LibraryInfo())).folders.map((i) => new Folder(i));
                for (const folder of Folder.Generator(folders)) {
                    yield yield __await(yield __await(folder.update())); // XXX: 每次额外的fetch开销
                }
            });
        }
        static GetFolderWithNames(names) {
            return __awaiter(this, void 0, void 0, function* () {
                const library = yield Library.GetActiveLibrary();
                return [...this.Generator(library.folders)].filter((folder) => names.includes(folder.name));
            });
        }
        get children() {
            return this.raw.children.map((info) => new Folder(info));
        }
        get items() {
            return (() => __awaiter(this, void 0, void 0, function* () {
                const infoes = yield API$1.ItemList({ folders: [this.raw.id] });
                return infoes.map((info) => new Item(info));
            }))();
        }
        set newName(newName) {
            this.update({ newName: newName });
        }
        set newDescription(newDescription) {
            this.update({ newDescription: newDescription });
        }
        set newColor(newColor) {
            this.update({ newColor: newColor });
        }
        constructor(info) {
            this.raw = info;
            this.name = this.raw.name;
        }
        *[Symbol.iterator]() {
            yield* Folder.Generator(this.children);
        }
        update(option) {
            return __awaiter(this, void 0, void 0, function* () {
                this.raw = yield API$1.FolderUpdate(this.raw.id, option);
                this.name = this.raw.name;
                return this;
            });
        }
        deleteItems() {
            return __awaiter(this, void 0, void 0, function* () {
                const items = yield this.items;
                API$1.ItemMoveToTrash(items.map((info) => info.raw.id));
            });
        }
        addSubFolder(name) {
            return __awaiter(this, void 0, void 0, function* () {
                return API$1.FolderCreate(name, this.raw.id);
            });
        }
        ItemAddFromURLs(
        /** 由多个 item 组成的 array 物件 */ items) {
            API$1.ItemAddFromURLs(items, this.raw.id);
        }
        ItemAddFromPaths(items) {
            API$1.ItemAddFromPaths(items, this.raw.id);
        }
    }

    class LibrarySwitch {
        constructor(path) {
            var _a;
            const reg = /^.+[\/\\](.+).library$/;
            const list = (_a = reg.exec(path)) !== null && _a !== void 0 ? _a : [];
            if (list.length == 2)
                [this.raw, this.name] = [...list];
            else {
                ConsoleError(`${reg}无法正确解析的路径: ${path}`);
                throw new Error(path);
            }
        }
        /** 切换后需要手动更新相关对象 */
        switch() {
            API$1.LibrarySwitch(this.raw);
        }
        /** 等待切换完成并返回新library对象 */
        switchUntil(ms = 500) {
            return __awaiter(this, void 0, void 0, function* () {
                console.time("switch");
                let current = yield API$1.LibraryInfo();
                if (this.raw == current.library.path)
                    throw ConsoleError("目标库与当前库一致");
                this.switch();
                let num = 0;
                while (this.raw != current.library.path) {
                    num++;
                    ConsoleLog(`Waiting Switch Library to [${this.name}]`, `TRIES:${num}`);
                    current = yield API$1.LibraryInfo();
                    yield new Promise((resolve) => setTimeout(resolve, ms));
                }
                console.timeEnd("switch");
                return new Library(current);
            });
        }
    }
    class Library {
        static GetActiveLibrary() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Library(yield API$1.LibraryInfo());
            });
        }
        static GetLibrarySwitch() {
            return __awaiter(this, void 0, void 0, function* () {
                const pathes = yield API$1.LibraryHistory();
                return pathes.map((path) => new LibrarySwitch(path));
            });
        }
        get folders() {
            return this.raw.folders.map((info) => new Folder(info));
        }
        *folder_entries() {
            yield* Folder.Generator(this.folders);
        }
        constructor(info) {
            this.raw = info;
            this.name = this.raw.library.name;
        }
        update() {
            return __awaiter(this, void 0, void 0, function* () {
                this.raw = yield API$1.LibraryInfo();
                this.name = this.raw.library.name;
                return this;
            });
        }
    }

    class Eagle {
        static CheckServer() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const info = yield API$1.AppInfo();
                    ConsoleLog("Eagle is online.", info.version);
                    return true;
                }
                catch (error) {
                    ConsoleError("Check server failed.");
                    return false;
                }
            });
        }
        static GetActiveEagle() {
            return __awaiter(this, void 0, void 0, function* () {
                const check = yield Eagle.CheckServer();
                if (!check)
                    return;
                const appinfo = yield API$1.AppInfo();
                const eagle = new Eagle(appinfo);
                return eagle.updata();
            });
        }
        constructor(info) {
            this.raw = info;
        }
        updata() {
            return __awaiter(this, void 0, void 0, function* () {
                this.raw = yield API$1.AppInfo();
                this.librarySwitch = yield Library.GetLibrarySwitch();
                if (!this.library)
                    this.library = new Library(yield API$1.LibraryInfo());
                else
                    this.library.update();
                return this;
            });
        }
    }

    exports.API = API$1;
    exports.Eagle = Eagle;
    exports.Folder = Folder;
    exports.Item = Item;
    exports.Library = Library;

    return exports;

})({});
//# sourceMappingURL=index.iife.js.map
