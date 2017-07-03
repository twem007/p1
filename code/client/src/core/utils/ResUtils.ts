module core {
    class GroupLoader {

        private groupData: GroupData;

        constructor() {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        }

        private onResourceLoadError(event: RES.ResourceEvent): void {
            if (this.groupData.curGroup != event.groupName) {
                return;
            }
            this.groupData.curGroupLoaded = event.itemsLoaded;
            this.groupData.curGroupTotal = event.itemsTotal;
            this.groupData.curResItem = event.resItem;
            if (this.groupData.onLoadFaild) {
                this.groupData.onLoadFaild.call(this.groupData.thisObj, this.groupData);
            }
        }

        private onResourceProgress(event: RES.ResourceEvent): void {
            this.updateGroupData(event.groupName, event.itemsLoaded, event.itemsTotal, event.resItem);
        }

        private onResourceLoadComplete(event: RES.ResourceEvent): void {
            this.updateGroupData(event.groupName, event.itemsTotal, event.itemsTotal, event.resItem);
            this.loadNext();
        }

        private updateGroupData(group: string, loadedItems: number = 0, totalItems: number = 0, resItem?: RES.ResourceItem): void {
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
        }

        private loadNext(): void {
            let group: string = this.groupData.loadQueue.shift();
            if (group) {
                this.groupData.curGroup = group;
                if (RES.isGroupLoaded(group)) {
                    this.updateGroupData(group);
                } else {
                    RES.loadGroup(group);
                }
            } else {
                if (this.groupData.onLoadComplete) {
                    this.groupData.onLoadComplete.call(this.groupData.thisObj, this.groupData);
                }
                this.destory();
            }
        }

        public destory(): void {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.groupData = null;
        }

        public loadGroups(data: GroupData): void {
            this.groupData = data;
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