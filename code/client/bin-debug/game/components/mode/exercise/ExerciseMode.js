var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ExerciseMode = (function () {
    function ExerciseMode() {
    }
    ExerciseMode.prototype.enter = function () {
        // core.InputManager.getInstance().enable(true);
        // ExerciseProxy.instance().getinfo();
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.GAME, ModuleEnum.NONE, 101));
    };
    ExerciseMode.prototype.onGetInfo = function (data) {
        // ExerciseProxy.instance().setData();
    };
    ExerciseMode.prototype.exit = function () {
        // core.InputManager.getInstance().enable(false);
    };
    return ExerciseMode;
}());
__reflect(ExerciseMode.prototype, "ExerciseMode", ["IGameMode"]);
//# sourceMappingURL=ExerciseMode.js.map