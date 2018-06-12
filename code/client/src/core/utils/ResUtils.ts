module core {
    /**
     * 资源组加载器
     */
    class GroupLoader {

        private m_groupData: GroupData;

        constructor() {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
        }

        private onResourceLoadError(event: RES.ResourceEvent): void {
            if (this.m_groupData.curGroup != event.groupName) {
                return;
            }
            egret.log(`资源组：${event.groupName} 加载失败`);
            this.m_groupData.curGroupLoaded = event.itemsLoaded;
            this.m_groupData.curGroupTotal = event.itemsTotal;
            this.m_groupData.curResItem = event.resItem;
            if (this.m_groupData.onLoadFaild) {
                this.m_groupData.onLoadFaild.call(this.m_groupData.thisObj, this.m_groupData);
            }
        }

        private onResourceProgress(event: RES.ResourceEvent): void {
            return this.updateGroupData(event.groupName, event.itemsLoaded, event.itemsTotal, event.resItem);
        }

        private onResourceLoadComplete(event: RES.ResourceEvent): void {
            if (this.m_groupData.curGroup != event.groupName) {
                return;
            }
            egret.log(`资源组：${event.groupName} 加载完成`);
            this.m_groupData.loadedQueue.push(event.groupName);
            this.m_groupData.loaded = this.m_groupData.loadedQueue.length;
            this.updateGroupData(event.groupName, this.m_groupData.curGroupTotal, this.m_groupData.curGroupTotal);
            return this.loadNext();
        }

        private updateGroupData(group: string, loadedItems: number = 0, totalItems: number = 0, resItem?: RES.ResourceItem): void {
            if (this.m_groupData.curGroup != group) {
                return;
            }
            this.m_groupData.curGroupLoaded = loadedItems;
            this.m_groupData.curGroupTotal = totalItems;
            this.m_groupData.curResItem = resItem;
            if (this.m_groupData.onLoadProgress) {
                this.m_groupData.onLoadProgress.call(this.m_groupData.thisObj, this.m_groupData);
            }
        }

        private loadNext(): void {
            let group: string = this.m_groupData.loadQueue.shift();
            if (group) {
                this.m_groupData.curGroup = group;
                RES.loadGroup(group);
            } else {
                if (this.m_groupData.onLoadComplete) {
                    this.m_groupData.onLoadComplete.call(this.m_groupData.thisObj, this.m_groupData);
                }
                this.destory();
            }
        }
        /**
         * 释放加载器
         */
        public destory(): void {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
            this.m_groupData = null;
        }
        /**
         * 开始加载资源组
         */
        public loadGroups(data: GroupData): void {
            this.m_groupData = data;
            return this.loadNext();
        }
    }
    /**
     * 资源工具类
     * 本类功能：
     * 1、实现资源组加载管理
     * 2、实现资源组加载的进度统计
     */
    export class ResUtils {
        /**
         * 加载资源组
         * @param groups 当前加载资源组列表
         * @param onLoadProgress 资源组加载进度回调
         * @param onLoadFaild 资源组加载失败回调
         * @param onLoadComplete 资源组加载完成回调
         * @param thisObj
         * @param param? 参数列表
         */
        public static loadGroups(groups: string[], onLoadProgress: (data: GroupData) => void, onLoadFaild: (data: GroupData) => void, onLoadComplete: (data: GroupData) => void, thisObj: any, param?: any): void {
            if (groups) {
                let groupData: GroupData = new GroupData();
                groupData.loadQueue = groups.concat();
                groupData.loadedQueue = [];
                groupData.loaded = 0;
                groupData.total = groups.length;
                groupData.onLoadProgress = onLoadProgress;
                groupData.onLoadFaild = onLoadFaild;
                groupData.onLoadComplete = onLoadComplete;
                groupData.thisObj = thisObj;
                groupData.param = param;
                if (groups.length > 0) {
                    let loader: GroupLoader = new GroupLoader();
                    loader.loadGroups(groupData);
                } else {
                    if (onLoadComplete) {
                        onLoadComplete.call(thisObj, groupData);
                    }
                }
            }
        }
        /**
         * 释放资源组
         * @param name 资源组数组。
         * @param force 销毁一个资源组时其他资源组有同样资源情况资源是否会被删除，默认值 false。
         */
        public static destoryGroups(groups: string[], force: boolean = false): void {
            if (groups) {
                for (let i: number = 0, iLen: number = groups.length; i < iLen; i++) {
                    RES.destroyRes(groups[i], false);
                    egret.log(`释放资源或资源组${groups[i]}`)
                }
            }
        }
    }
    /**
     * 资源组数据
     */
    export class GroupData extends core.Progress {
        public loadQueue: string[];
        public loadedQueue: string[];
        public curGroup: string;
        public curGroupLoaded: number;
        public curGroupTotal: number;
        public curResItem: RES.ResourceItem;
        public onLoadProgress: (data: GroupData) => void;
        public onLoadFaild: (data: GroupData) => void;
        public onLoadComplete: (data: GroupData) => void;
        public thisObj: any;
        public param: any;
    }
}