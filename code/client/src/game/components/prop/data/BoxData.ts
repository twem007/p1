/**
    * 道具数据
    */
class BoxData extends ItemData {
    public innerProp: PropType;
    public isCanPush: boolean;
    constructor(id: number, itemType: PropType, col: number, row: number, innerProp?: PropType, areaId: number = -1, fornoticeEndTime: number = 0) {
        //super(col, row, itemType, id, areaId);
        super(id, itemType, col, row, areaId, fornoticeEndTime);
        this.innerProp = innerProp;
        this.isCanPush = itemType === PropType.MOVE_BOX;
    }
} 