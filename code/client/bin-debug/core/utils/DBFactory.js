var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var DBFactory = (function () {
        function DBFactory() {
            this.m_factorys = {};
            this.m_dbFactory = new dragonBones.EgretFactory();
        }
        /**
         * 获取影片剪辑
         * @param db    龙骨数据名称
         * @param json  龙骨JSON名称
         * @param png   龙骨PNG名称
         * @param name  龙骨名称
         */
        DBFactory.prototype.getDB = function (db, json, png, name) {
            if (name === void 0) { name = "robot"; }
            var dragonbonesData = RES.getRes(db);
            var jsonData = RES.getRes(json);
            var pngData = RES.getRes(png);
            var dbFactory = this.m_dbFactory;
            dbFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dbFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(pngData, jsonData));
            var armature = dbFactory.buildArmature(name);
            return armature.display;
        };
        Object.defineProperty(DBFactory, "instance", {
            get: function () {
                if (DBFactory.s_instance == null) {
                    DBFactory.s_instance = new DBFactory();
                }
                return DBFactory.s_instance;
            },
            enumerable: true,
            configurable: true
        });
        return DBFactory;
    }());
    core.DBFactory = DBFactory;
    __reflect(DBFactory.prototype, "core.DBFactory");
})(core || (core = {}));
//# sourceMappingURL=DBFactory.js.map