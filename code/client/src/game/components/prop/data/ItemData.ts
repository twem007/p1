class ItemData extends egret.HashObject {

    protected _id: number = 0;

    protected _areaId: number = 0;

    public col: number = 0;

    public row: number = 0;

    protected _propType: PropType;

    protected _bigType: PropBigType;

    protected _forenoticeEndTime: number;

    public constructor(id: number, itemType: PropType, col: number, row: number, areaId: number = -1, fornoticeEndTime: number = 0) {
        super();
        this._areaId = areaId;
        this.col = col;
        this.row = row;
        this._forenoticeEndTime = fornoticeEndTime;

        //到时是服务端给ID，现在先用哈希码代替，不理参数传入的id
        //this._id = id;
        this._id = this.hashCode;

        this._propType = itemType;
        //this._bigType = (<ItemsConfig>CC.ItemsConfig.getValBykey(itemType)).types;
        this._bigType = this.getBigTypeBySmallType(itemType);
    }

    public get areaId(): number {
        return this._areaId;
    }

    public get propType(): PropType {
        return this._propType;
    }

    public get id(): number {
        return this._id;
    }

    public set id(val: number) {
        this._id = val;
    }

    public get bigType(): PropBigType {
        return this._bigType;
    }

    public get forenoticeEndTime(): number {
        return this._forenoticeEndTime;
    }

    private getBigTypeBySmallType(type: PropType): PropBigType {
        let bigType: PropBigType = null;
        switch (type) {
            case PropType.BOMB_POWER:
                bigType = PropBigType.BOMB_POWER;
                break;
            case PropType.BOMB_COUNT:
                bigType = PropBigType.BOMB_COUNT;
                break;
            case PropType.SPEED:
                bigType = PropBigType.SPEED;
                break;
            case PropType.MOVE_BOX:
                bigType = PropBigType.BOX;
                break;
            case PropType.STATIC_BOX:
                bigType = PropBigType.BOX;
                break;
            case PropType.SAVE_NEEDLE:
                bigType = PropBigType.SAVE_NEEDLE;
                break;
            case PropType.SHIELD:
                bigType = PropBigType.SHIELD;
                break;
            case PropType.GLUE:
                bigType = PropBigType.GLUE;
                break;
            case PropType.GLUE_TRAP:
                bigType = PropBigType.GLUE_TRAP;
                break;
        }
        return bigType;
    }
}