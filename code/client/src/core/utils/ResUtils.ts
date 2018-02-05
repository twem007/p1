module core {
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
            this.updateGroupData(event.groupName, event.itemsLoaded, event.itemsTotal, event.resItem);
        }

        private onResourceLoadComplete(event: RES.ResourceEvent): void {
            egret.log(`资源组：${event.groupName} 加载完成`);
            this.m_groupData.loadedQueue.push(event.groupName);
            this.m_groupData.loaded = this.m_groupData.loadedQueue.length;
            this.loadNext();
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
                if (RES.isGroupLoaded(group) || this.m_groupData.loadedQueue.indexOf(group) >= 0) {
                    this.updateGroupData(group, this.m_groupData.total, this.m_groupData.total, this.m_groupData.curResItem);
                } else {
                    RES.loadGroup(group);
                }
            } else {
                if (this.m_groupData.onLoadComplete) {
                    this.m_groupData.onLoadComplete.call(this.m_groupData.thisObj, this.m_groupData);
                }
                this.destory();
            }
        }

        public destory(): void {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
            this.m_groupData = null;
        }

        public loadGroups(data: GroupData): void {
            this.m_groupData = data;
            this.loadNext();
        }
    }

    export class ResUtils {
        /**
         * 加载资源组
         * @param groups 当前加载资源组列表
         * @param onLoadProgress 资源组加载进度回调
         * @param onLoadFaild 资源组加载失败回调
         * @param onLoadComplete 资源组加载完成回调
         * @param thisObj
         * @param param 参数列表
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
         * @param groups 资源组数组
         */
        public destoryGroups(groups: string[]): void {
            if (groups) {
                for (let i: number = 0, iLen: number = groups.length; i < iLen; i++) {
                    let items: RES.ResourceItem[] = RES.getGroupByName(groups[i]);
                    if (items) {
                        for (let j: number = 0, jLen: number = items.length; j < jLen; j++) {
                            RES.destroyRes(items[j].name, false);
                        }
                    }
                }
            }
        }
        /**
         * 从缓存池获取资源，如没有将新创建，用完后及时调用 revertCacheRes
         */
        public getCacheRes(key: string): any {
            let res: any = CachePool.getObj(key);
            if (!res) {
                res = RES.getRes(key);
                res['key'] = key;
            }
            return res;
        }
        /**
         * 将资源归还缓存池
         */
        public revertCacheRes(res: any): void {
            if (res && res['key']) {
                CachePool.addObj(res['key'], res);
            }
        }
    }

    export class GroupData extends Progress {
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