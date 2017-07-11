var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 战斗界面控制器
 */
var CombatController = (function (_super) {
    __extends(CombatController, _super);
    function CombatController(loadingUI) {
        return _super.call(this, ModuleEnum.COMBATUI, loadingUI) || this;
    }
    /**
         * 预加载资源组
         */
    CombatController.prototype.getLoadGroup = function (data) {
        return ['combatUI'];
    };
    /**
     * 显示
     */
    CombatController.prototype.show = function (data) {
        if (!this.m_pCombatUI) {
            var combatUI = new CombatControlView();
            this.m_pCombatUI = combatUI;
        }
        KeyBoardManager.getInstance.addKeyBoardMsg();
        core.LayerCenter.getInstance().getLayer(LayerEnum.UI).addChild(this.m_pCombatUI);
    };
    /**
     * 隐藏
     */
    CombatController.prototype.hide = function () {
        this.m_pCombatUI.hide();
    };
    CombatController.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    return CombatController;
}(core.Control));
__reflect(CombatController.prototype, "CombatController");
//# sourceMappingURL=CombatController.js.map