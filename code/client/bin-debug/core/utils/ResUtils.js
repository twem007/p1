var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core;
(function (core) {
    var GroupLoader = (function () {
        function GroupLoader() {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        }
        GroupLoader.prototype.onResourceLoadError = function (event) {
            if (this.groupData.curGroup != event.groupName) {
                return;
            }
            this.groupData.curGroupLoaded = event.itemsLoaded;
            this.groupData.curGroupTotal = event.itemsTotal;
            this.groupData.curResItem = event.resItem;
            if (this.groupData.onLoadFaild) {
                this.groupData.onLoadFaild.call(this.groupData.thisObj, this.groupData);
            }
        };
        GroupLoader.prototype.onResourceProgress = function (event) {
            this.updateGroupData(event.groupName, event.itemsLoaded, event.itemsTotal, event.resItem);
        };
        GroupLoader.prototype.onResourceLoadComplete = function (event) {
            this.updateGroupData(event.groupName, event.itemsTotal, event.itemsTotal, event.resItem);
            this.loadNext();
        };
        GroupLoader.prototype.updateGroupData = function (group, loadedItems, totalItems, resItem) {
            if (loadedItems === void 0) { loadedItems = 0; }
            if (totalItems === void 0) { totalItems = 0; }
            if (this.groupData.curGroup != group) {
                return;
            }
            this.groupData.curGroupLoaded = loadedItems;
            this.groupData.curGroupTotal = totalItems;
            this.groupData.curResItem = resItem;
            if (this.groupData.onLoadProgress) {
                this.groupData.onLoadProgress.call(this.groupData.thisObj, this.groupData);
            }
            if (loadedItems == totalItems) {
                if (this.groupData.loadedQueue.indexOf(group) < 0) {
                    this.groupData.loadedQueue.push(group);
                    this.groupData.loaded = this.groupData.loadedQueue.length;
                }
                this.loadNext();
            }
        };
        GroupLoader.prototype.loadNext = function () {
            var group = this.groupData.loadQueue.shift();
            if (group) {
                this.groupData.curGroup = group;
                if (RES.isGroupLoaded(group)) {
                    this.updateGroupData(group);
                }
                else {
                    RES.loadGroup(group);
                }
            }
            else {
                if (this.groupData.onLoadComplete) {
                    this.groupData.onLoadComplete.call(this.groupData.thisObj, this.groupData);
                }
                this.destory();
            }
        };
        GroupLoader.prototype.destory = function () {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.groupData = null;
        };
        GroupLoader.prototype.loadGroups = function (data) {
            this.groupData = data;
            this.loadNext();
        };
        return GroupLoader;
    }());
    __reflect(GroupLoader.prototype, "GroupLoader");
    var ResUtils = (function () {
        function ResUtils() {
        }
        /**
         * 加载资源组
         */
        ResUtils.loadGroups = function (groups, onLoadProgress, onLoadFaild, onLoadComplete, thisObj) {
            if (groups) {
                var groupData = new GroupData();
                groupData.loadQueue = groups;
                groupData.loadedQueue = [];
                groupData.loaded = 0;
                groupData.total = groups.length;
                groupData.onLoadProgress = onLoadProgress;
                groupData.onLoadFaild = onLoadFaild;
                groupData.onLoadComplete = onLoadComplete;
                groupData.thisObj = thisObj;
                if (groups.length > 0) {
                    var loader = new GroupLoader();
                    loader.loadGroups(groupData);
                }
                else {
                    if (onLoadComplete) {
                        onLoadComplete.call(thisObj, groupData);
                    }
                }
            }
        };
        return ResUtils;
    }());
    core.ResUtils = ResUtils;
    __reflect(ResUtils.prototype, "core.ResUtils");
    var GroupData = (function (_super) {
        __extends(GroupData, _super);
        function GroupData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GroupData;
    }(core.Progress));
    core.GroupData = GroupData;
    __reflect(GroupData.prototype, "core.GroupData");
})(core || (core = {}));
//# sourceMappingURL=ResUtils.js.map