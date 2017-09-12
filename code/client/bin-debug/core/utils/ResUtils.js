var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var core;
(function (core) {
    var GroupLoader = /** @class */ (function () {
        function GroupLoader() {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
        }
        GroupLoader.prototype.onResourceLoadError = function (event) {
            if (this.m_groupData.curGroup != event.groupName) {
                return;
            }
            this.m_groupData.curGroupLoaded = event.itemsLoaded;
            this.m_groupData.curGroupTotal = event.itemsTotal;
            this.m_groupData.curResItem = event.resItem;
            if (this.m_groupData.onLoadFaild) {
                this.m_groupData.onLoadFaild.call(this.m_groupData.thisObj, this.m_groupData);
            }
        };
        GroupLoader.prototype.onResourceProgress = function (event) {
            this.updateGroupData(event.groupName, event.itemsLoaded, event.itemsTotal, event.resItem);
        };
        GroupLoader.prototype.onResourceLoadComplete = function (event) {
            this.updateGroupData(event.groupName, event.itemsTotal, event.itemsTotal, event.resItem);
        };
        GroupLoader.prototype.updateGroupData = function (group, loadedItems, totalItems, resItem) {
            if (loadedItems === void 0) { loadedItems = 0; }
            if (totalItems === void 0) { totalItems = 0; }
            if (this.m_groupData.curGroup != group) {
                return;
            }
            this.m_groupData.curGroupLoaded = loadedItems;
            this.m_groupData.curGroupTotal = totalItems;
            this.m_groupData.curResItem = resItem;
            if (this.m_groupData.onLoadProgress) {
                this.m_groupData.onLoadProgress.call(this.m_groupData.thisObj, this.m_groupData);
            }
            if (loadedItems == totalItems) {
                this.m_groupData.loadedQueue.push(group);
                this.m_groupData.loaded = this.m_groupData.loadedQueue.length;
                this.loadNext();
            }
        };
        GroupLoader.prototype.loadNext = function () {
            var group = this.m_groupData.loadQueue.shift();
            if (group) {
                this.m_groupData.curGroup = group;
                if (RES.isGroupLoaded(group) || this.m_groupData.loadedQueue.indexOf(group) >= 0) {
                    this.updateGroupData(group, this.m_groupData.total, this.m_groupData.total, this.m_groupData.curResItem);
                }
                else {
                    RES.loadGroup(group);
                }
            }
            else {
                if (this.m_groupData.onLoadComplete) {
                    this.m_groupData.onLoadComplete.call(this.m_groupData.thisObj, this.m_groupData);
                }
                this.destory();
            }
        };
        GroupLoader.prototype.destory = function () {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
            this.m_groupData = null;
        };
        GroupLoader.prototype.loadGroups = function (data) {
            this.m_groupData = data;
            this.loadNext();
        };
        return GroupLoader;
    }());
    var ResUtils = /** @class */ (function () {
        function ResUtils() {
        }
        /**
         * 加载资源组
         * @param groups 当前加载资源组列表
         * @param onLoadProgress 资源组加载进度回调
         * @param onLoadFaild 资源组加载失败回调
         * @param onLoadComplete 资源组加载完成回调
         * @param thisObj
         * @param param 参数列表
         */
        ResUtils.loadGroups = function (groups, onLoadProgress, onLoadFaild, onLoadComplete, thisObj, param) {
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
                groupData.param = param;
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
    var GroupData = /** @class */ (function (_super) {
        __extends(GroupData, _super);
        function GroupData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GroupData;
    }(core.Progress));
    core.GroupData = GroupData;
})(core || (core = {}));
//# sourceMappingURL=ResUtils.js.map