var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var core;
(function (core) {
    var InputManager = (function () {
        function InputManager() {
            this.m_keyMap = new Dictionary();
        }
        InputManager.prototype.addKeyListener = function (key, callback, thisObj) {
            var data = this.m_keyMap.get(key);
            if (!data) {
                data = new KeyData(key);
            }
            data.callbacks.push(new KeyCallBack(callback, thisObj));
            this.m_keyMap.add(key, data);
        };
        InputManager.prototype.removeKeyListener = function (key, callback, thisObj) {
            var data = this.m_keyMap.get(key);
            if (data) {
                var list = data.callbacks;
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    var item = list[i];
                    if (item && item.callback === callback && item.thisObj === thisObj) {
                        item.isValid = false;
                    }
                }
            }
        };
        InputManager.prototype.enableKey = function (key, enable) {
            this.m_keyMap.get(key).keyEnable = enable;
        };
        InputManager.prototype.enable = function (enable) {
            var map = this.m_keyMap;
            var values = map.values;
            for (var i = 0, iLen = values.length; i < iLen; i++) {
                values[i].keyEnable = enable;
            }
        };
        InputManager.prototype.sendKey = function (key) {
            var data = this.m_keyMap.get(key);
            if (data) {
                var list = data.callbacks;
                for (var i = list.length; i > 0; i--) {
                    var data_1 = list[i - 1];
                    if (!data_1.isValid) {
                        list.splice(i - 1, 1);
                    }
                }
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    var data_2 = list[i];
                    data_2.callback.call(data_2.thisObj);
                }
            }
        };
        InputManager.getInstance = function () {
            if (!InputManager.s_instance) {
                InputManager.s_instance = new InputManager();
            }
            return InputManager.s_instance;
        };
        return InputManager;
    }());
    core.InputManager = InputManager;
    __reflect(InputManager.prototype, "core.InputManager");
    var KeyData = (function () {
        function KeyData(key) {
            this.key = key;
            this.keyEnable = true;
            this.callbacks = [];
        }
        return KeyData;
    }());
    __reflect(KeyData.prototype, "KeyData");
    var KeyCallBack = (function (_super) {
        __extends(KeyCallBack, _super);
        function KeyCallBack(callback, thisObj) {
            var _this = _super.call(this, callback, thisObj) || this;
            _this.isValid = true;
            return _this;
        }
        return KeyCallBack;
    }(core.Callback));
    __reflect(KeyCallBack.prototype, "KeyCallBack");
})(core || (core = {}));
