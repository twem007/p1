var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏结束界面控制器
 */
var GameOverController = (function (_super) {
    __extends(GameOverController, _super);
    function GameOverController(loadingUI) {
        return _super.call(this, ModuleEnum.GAMEOVER, loadingUI) || this;
    }
    /**
         * 预加载资源组
         */
    GameOverController.prototype.getLoadGroup = function (data) {
        return [];
    };
    /**
     * 显示
     */
    GameOverController.prototype.show = function (data) {
        if (!this.m_pGameOverUI) {
            var gameOverUI = new GameOverHintView();
            this.m_pGameOverUI = gameOverUI;
        }
        core.LayerCenter.getInstance().getLayer(LayerEnum.POPUP).addChild(this.m_pGameOverUI);
    };
    /**
     * 隐藏
     */
    GameOverController.prototype.hide = function () {
        this.m_pGameOverUI.hide();
    };
    GameOverController.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    return GameOverController;
}(core.Control));
__reflect(GameOverController.prototype, "GameOverController");
//# sourceMappingURL=GameOverController.js.map