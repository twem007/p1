var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapLayerData = (function () {
    function MapLayerData(data) {
        this.data = data.data;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.name = data.name;
        this.opacity = data.opacity;
        this.properties = data.properties;
        this.propertytypes = data.propertytypes;
        this.type = data.type;
        this.visible = data.visible;
    }
    MapLayerData.prototype.getProp = function (key) {
        return this.properties[key];
    };
    return MapLayerData;
}());
__reflect(MapLayerData.prototype, "MapLayerData");
//# sourceMappingURL=MapLayerData.js.map