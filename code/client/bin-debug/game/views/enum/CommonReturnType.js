var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonReturnType = (function () {
    function CommonReturnType() {
    }
    return CommonReturnType;
}());
/**确定关闭对话框 */
CommonReturnType.BUTTON_OK = "CommonReturnType.BUTTON_OK";
/**确定关闭对话框返回主界面 */
CommonReturnType.BUTTON_RETURN_MAIN = "CommonReturnType.BUTTON_RETURN_MAIN";
/**确定关闭返回登录界面 */
CommonReturnType.BUTTON_RETURN_LOGIN = "CommonReturnType.BUTTON_RETURN_LOGIN";
/**确定刷新游戏 */
CommonReturnType.BUTTON_RESGAME = "CommonReturnType.BUTTON_RESGAME";
__reflect(CommonReturnType.prototype, "CommonReturnType");
//# sourceMappingURL=CommonReturnType.js.map