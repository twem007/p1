var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapTilesetData = (function () {
    function MapTilesetData(data) {
        this.columns = data.columns;
        this.firstgid = data.firstgid;
        this.image = data.image;
        this.imageHeight = data.imageheight;
        this.imageWidth = data.imagewidth;
        this.margin = data.margin;
        this.name = data.name;
        this.properties = data.properties;
        this.propertytypes = data.propertytypes;
        this.spacing = data.spacing;
        this.tileCount = data.tilecount;
        this.tileHeight = data.tileheight;
        this.tileproperties = data.tileproperties;
        this.tilepropertytypes = data.tilepropertytypes;
        this.tileWidth = data.tilewidth;
    }
    MapTilesetData.prototype.getProp = function (id) {
        return this.properties[id - this.firstgid];
    };
    MapTilesetData.prototype.getTileProp = function (id) {
        return this.tileproperties[id - this.firstgid];
    };
    return MapTilesetData;
}());
__reflect(MapTilesetData.prototype, "MapTilesetData");
//# sourceMappingURL=MapTilesetData.js.map