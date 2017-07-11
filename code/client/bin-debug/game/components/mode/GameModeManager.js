var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameModeManager = (function () {
    function GameModeManager() {
    }
    GameModeManager.prototype.enterGame = function (gameMode) {
        switch (gameMode) {
            case GameTypeEnum.EXERCISE:
                {
                    this.m_curMode = new ExerciseMode();
                    this.m_curMode.enter();
                }
                break;
            case GameTypeEnum.RANK:
                {
                }
                break;
        }
    };
    GameModeManager.prototype.getCurMode = function () {
        return this.m_curMode;
    };
    GameModeManager.getInstance = function () {
        if (!GameModeManager.s_instance) {
            GameModeManager.s_instance = new GameModeManager();
        }
        return GameModeManager.s_instance;
    };
    return GameModeManager;
}());
__reflect(GameModeManager.prototype, "GameModeManager");
//# sourceMappingURL=GameModeManager.js.map