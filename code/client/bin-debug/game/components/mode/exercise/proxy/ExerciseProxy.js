var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ExerciseProxy = (function () {
    function ExerciseProxy() {
        this.m_data = new ExerciseModeData();
    }
    ExerciseProxy.prototype.getData = function () {
        return this.m_data;
    };
    ExerciseProxy.prototype.createMapData = function (id) {
        var map = new MapData();
        map.update(id);
        this.m_data.map = map;
        return map;
    };
    ExerciseProxy.instance = function () {
        if (!ExerciseProxy.s_instance) {
            ExerciseProxy.s_instance = new ExerciseProxy();
        }
        return ExerciseProxy.s_instance;
    };
    return ExerciseProxy;
}());
__reflect(ExerciseProxy.prototype, "ExerciseProxy");
//# sourceMappingURL=ExerciseProxy.js.map