var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var InputComponent = (function () {
        function InputComponent() {
            this.m_keyMap = new Dictionary();
        }
        InputComponent.prototype.init = function () {
            this.addListener();
        };
        InputComponent.prototype.release = function () {
            this.removeListener();
        };
        InputComponent.prototype.mapKey = function (code, key) {
            var data = new KeyData();
            data.keyCode = code;
            data.key = key;
            data.keyEnable = true;
            this.m_keyMap.add(code, data);
        };
        InputComponent.prototype.enableKey = function (key, enable) {
            this.m_keyMap.get(key).keyEnable = enable;
        };
        return InputComponent;
    }());
    core.InputComponent = InputComponent;
    __reflect(InputComponent.prototype, "core.InputComponent", ["core.IComponent"]);
    var KeyData = (function () {
        function KeyData() {
        }
        return KeyData;
    }());
    __reflect(KeyData.prototype, "KeyData");
})(core || (core = {}));
//# sourceMappingURL=InputComponent.js.map