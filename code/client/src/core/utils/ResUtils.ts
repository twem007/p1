module core {
    class GroupLoader {

        private m_groupData: GroupData;

        constructor() {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        }

        private onResourceLoadError(event: RES.ResourceEvent): void {
            if (this.m_groupData.curGroup != event.groupName) {
                return;
            }
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
            this.updateGroupData(event.groupName, event.itemsTotal, event.itemsTotal, event.resItem);
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
            if (loadedItems == totalItems) {
                this.m_groupData.loadedQueue.push(group);
                this.m_groupData.loaded = this.m_groupData.loadedQueue.length;
                this.loadNext();
            }
        }

        private loadNext(): void {
            let group: string = this.m_groupData.loadQueue.shift();
            if (group) {
                this.m_groupData.curGroup = group;
                if (RES.isGroupLoaded(group)) {
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
         */
        public static loadGroups(groups: string[], onLoadProgress: (data: GroupData) => void, onLoadFaild: (data: GroupData) => void, onLoadComplete: (data: GroupData) => void, thisObj: any): void {
            if (groups) {
                let groupData: GroupData = new GroupData();
                groupData.loadQueue = groups;
                groupData.loadedQueue = [];
                groupData.loaded = 0;
                groupData.total = groups.length;
                groupData.onLoadProgress = onLoadProgress;
                groupData.onLoadFaild = onLoadFaild;
                groupData.onLoadComplete = onLoadComplete;
                groupData.thisObj = thisObj;
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
    }
}