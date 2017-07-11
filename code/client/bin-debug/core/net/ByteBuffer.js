var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core;
(function (core) {
    /**
     *
     * @author yuxuefeng
     *
     */
    var ByteBuffer = (function (_super) {
        __extends(ByteBuffer, _super);
        function ByteBuffer(buffer) {
            return _super.call(this, buffer) || this;
        }
        ByteBuffer.prototype.readUTFData = function () {
            var len = this.readShort();
            return _super.prototype.readUTFBytes.call(this, len);
        };
        ByteBuffer.prototype.writeUTFBytes = function (value) {
            this.writeShort(this.getStringBytesLen(value));
            _super.prototype.writeUTFBytes.call(this, value);
        };
        ByteBuffer.prototype.getStringBytesLen = function (str) {
            var bytes = new egret.ByteArray();
            bytes.writeUTFBytes(str);
            return bytes.length;
        };
        ByteBuffer.prototype.clone = function () {
            var buffer = new core.ByteBuffer();
            buffer.writeBytes(this);
            return buffer;
        };
        return ByteBuffer;
    }(egret.ByteArray));
    core.ByteBuffer = ByteBuffer;
    __reflect(ByteBuffer.prototype, "core.ByteBuffer");
})(core || (core = {}));
//# sourceMappingURL=ByteBuffer.js.map