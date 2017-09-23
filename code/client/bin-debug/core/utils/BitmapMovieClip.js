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
    var BitmapMovieClip = (function (_super) {
        __extends(BitmapMovieClip, _super);
        function BitmapMovieClip(movieClipData) {
            var _this = _super.call(this) || this;
            _this.m_mcData = movieClipData;
            _this.m_bitmap = new egret.Bitmap();
            _this.addChild(_this.m_bitmap);
            return _this;
        }
        BitmapMovieClip.prototype.onRenderLoop = function (offset) {
            if (this.parent) {
            }
            else {
                this.stop();
            }
        };
        BitmapMovieClip.prototype.play = function (playTimes) {
        };
        BitmapMovieClip.prototype.release = function () {
        };
        return BitmapMovieClip;
    }(core.Animation));
    core.BitmapMovieClip = BitmapMovieClip;
    __reflect(BitmapMovieClip.prototype, "core.BitmapMovieClip");
})(core || (core = {}));
//# sourceMappingURL=BitmapMovieClip.js.map