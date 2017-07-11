var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapManager = (function () {
    function MapManager() {
        this.m_map = new Map();
    }
    Object.defineProperty(MapManager.prototype, "map", {
        get: function () {
            return this.m_map;
        },
        enumerable: true,
        configurable: true
    });
    MapManager.instance = function () {
        if (!MapManager.s_instance) {
            MapManager.s_instance = new MapManager();
        }
        return MapManager.s_instance;
    };
    return MapManager;
}());
__reflect(MapManager.prototype, "MapManager");
//# sourceMappingURL=MapManager.js.map