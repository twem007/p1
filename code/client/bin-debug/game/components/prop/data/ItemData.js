var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ItemData = (function (_super) {
    __extends(ItemData, _super);
    function ItemData(id, itemType, col, row, areaId, fornoticeEndTime) {
        if (areaId === void 0) { areaId = -1; }
        if (fornoticeEndTime === void 0) { fornoticeEndTime = 0; }
        var _this = _super.call(this) || this;
        _this._id = 0;
        _this._areaId = 0;
        _this.col = 0;
        _this.row = 0;
        _this._areaId = areaId;
        _this.col = col;
        _this.row = row;
        _this._forenoticeEndTime = fornoticeEndTime;
        //到时是服务端给ID，现在先用哈希码代替，不理参数传入的id
        //this._id = id;
        _this._id = _this.hashCode;
        _this._propType = itemType;
        //this._bigType = (<ItemsConfig>CC.ItemsConfig.getValBykey(itemType)).types;
        _this._bigType = _this.getBigTypeBySmallType(itemType);
        return _this;
    }
    Object.defineProperty(ItemData.prototype, "areaId", {
        get: function () {
            return this._areaId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemData.prototype, "propType", {
        get: function () {
            return this._propType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemData.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            this._id = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemData.prototype, "bigType", {
        get: function () {
            return this._bigType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemData.prototype, "forenoticeEndTime", {
        get: function () {
            return this._forenoticeEndTime;
        },
        enumerable: true,
        configurable: true
    });
    ItemData.prototype.getBigTypeBySmallType = function (type) {
        var bigType = null;
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
    };
    return ItemData;
}(egret.HashObject));
__reflect(ItemData.prototype, "ItemData");
//# sourceMappingURL=ItemData.js.map