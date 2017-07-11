var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalDataType = (function () {
    function LocalDataType() {
    }
    return LocalDataType;
}());
LocalDataType.LOCALTYPETRUE = "LOCALTYPETRUE";
LocalDataType.LOCALTYPEFALSE = "LOCALTYPEFALSE";
__reflect(LocalDataType.prototype, "LocalDataType");
//# sourceMappingURL=LocalDataType.js.map