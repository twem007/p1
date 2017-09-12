var core;
(function (core) {
    var WebUtils = /** @class */ (function () {
        function WebUtils() {
        }
        WebUtils.addKeyboardListener = function () {
            document.onkeydown = function (event) {
                if (event && WebUtils.isKeyboard) {
                    core.EventCenter.getInstance().sendEvent(new core.KeyboardEventData(core.EventID.KEYBOARD_DOWN, event));
                }
            };
            document.onkeyup = function (event) {
                if (event && WebUtils.isKeyboard) {
                    core.EventCenter.getInstance().sendEvent(new core.KeyboardEventData(core.EventID.KEYBOARD_UP, event));
                }
            };
        };
        WebUtils.isKeyboard = true;
        return WebUtils;
    }());
    core.WebUtils = WebUtils;
})(core || (core = {}));
//# sourceMappingURL=WebUtils.js.map