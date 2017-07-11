var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**龙骨角色管理 */
var DBCharacterMgr = (function () {
    function DBCharacterMgr() {
        this.m_dbFactory = new dragonBones.EgretFactory;
        this.m_dbFactory = new dragonBones.EgretFactory();
    }
    DBCharacterMgr.getIns = function () {
        if (!this._instance) {
            this._instance = new DBCharacterMgr();
        }
        return this._instance;
    };
    DBCharacterMgr.prototype.addDragonBoneRes = function (ske, tex_json, tex_png) {
        var skeData = this.m_dbFactory.parseDragonBonesData(RES.getRes(ske));
        var texData = this.m_dbFactory.parseTextureAtlasData(RES.getRes(tex_json), RES.getRes(tex_png));
        this.m_dbFactory.addDragonBonesData(skeData);
        this.m_dbFactory.addTextureAtlas(texData);
    };
    DBCharacterMgr.prototype.createCharacter = function (armatureName) {
        var character = DBCharacter.create(armatureName);
        return character;
    };
    DBCharacterMgr.prototype.buildArmature = function (armatureName) {
        return this.m_dbFactory.buildArmature(armatureName);
    };
    DBCharacterMgr.prototype.buildArmatureDisplay = function (armatureName) {
        return this.m_dbFactory.buildArmatureDisplay(armatureName);
    };
    return DBCharacterMgr;
}());
__reflect(DBCharacterMgr.prototype, "DBCharacterMgr");
//# sourceMappingURL=DBCharacterMgr.js.map