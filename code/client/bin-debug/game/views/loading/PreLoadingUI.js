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
var PreLoadingUI = (function (_super) {
    __extends(PreLoadingUI, _super);
    function PreLoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    PreLoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    PreLoadingUI.prototype.setProgress = function (data) {
        this.textField.text = "Loading..." + data.loaded + "/" + data.total;
    };
    PreLoadingUI.prototype.show = function () {
        core.LayerCenter.getInstance().getLayer(LayerEnum.LOADING).addChild(this);
    };
    PreLoadingUI.prototype.hide = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    PreLoadingUI.prototype.release = function () {
    };
    return PreLoadingUI;
}(core.Component));
__reflect(PreLoadingUI.prototype, "PreLoadingUI", ["core.ILoadingUI"]);
