var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
    * 道具数据
    */
var BoxData = (function (_super) {
    __extends(BoxData, _super);
    function BoxData(id, itemType, col, row, innerProp, areaId, fornoticeEndTime) {
        if (areaId === void 0) { areaId = -1; }
        if (fornoticeEndTime === void 0) { fornoticeEndTime = 0; }
        var _this = 
        //super(col, row, itemType, id, areaId);
        _super.call(this, id, itemType, col, row, areaId, fornoticeEndTime) || this;
        _this.innerProp = innerProp;
        _this.isCanPush = itemType === PropType.MOVE_BOX;
        return _this;
    }
    return BoxData;
}(ItemData));
__reflect(BoxData.prototype, "BoxData");
//# sourceMappingURL=BoxData.js.map