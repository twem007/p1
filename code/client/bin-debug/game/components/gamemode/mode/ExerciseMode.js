var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ExerciseMode = (function () {
    function ExerciseMode() {
    }
    ExerciseMode.prototype.enter = function (data) {
        this.m_data = data;
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.GAME, ModuleEnum.NONE, data.mapID));
    };
    ExerciseMode.prototype.exit = function () {
    };
    ExerciseMode.prototype.getData = function () {
        return this.m_data;
    };
    return ExerciseMode;
}());
__reflect(ExerciseMode.prototype, "ExerciseMode", ["IGameMode"]);
