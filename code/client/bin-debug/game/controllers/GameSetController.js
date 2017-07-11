var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏设置界面控制器
 */
var GameSetController = (function (_super) {
    __extends(GameSetController, _super);
    function GameSetController(loadingUI) {
        return _super.call(this, ModuleEnum.GAMESETUI, loadingUI) || this;
    }
    /**
         * 预加载资源组
         */
    GameSetController.prototype.getLoadGroup = function (data) {
        return [];
    };
    /**
     * 显示
     */
    GameSetController.prototype.show = function (data) {
        if (!this.m_pGameSetUI) {
            var gameSetUI = new GameSetView();
            this.m_pGameSetUI = gameSetUI;
        }
        core.LayerCenter.getInstance().getLayer(LayerEnum.POPUP).addChild(this.m_pGameSetUI);
    };
    /**
     * 隐藏
     */
    GameSetController.prototype.hide = function () {
        this.m_pGameSetUI.hide();
    };
    GameSetController.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    return GameSetController;
}(core.Control));
__reflect(GameSetController.prototype, "GameSetController");
//# sourceMappingURL=GameSetController.js.map