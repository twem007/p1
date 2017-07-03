var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     *
     * @author yuxuefeng
     *
     */
    var EventCenter = (function () {
        function EventCenter() {
            this.callbackMaps = {};
            this.sendBuffer = [];
        }
        EventCenter.getInstance = function () {
            if (EventCenter.s_instance == null) {
                EventCenter.s_instance = new EventCenter();
            }
            return EventCenter.s_instance;
        };
        EventCenter.prototype.addEventListener = function (messageID, callback, thisObj, index) {
            if (callback) {
                var callbacks = this.callbackMaps[messageID];
                if (callbacks != null) {
                    if (index) {
                        callbacks.splice(index < 0 ? 0 : index, 0, { callback: callback, thisObj: thisObj });
                    }
                    else {
                        callbacks.push({ callback: callback, thisObj: thisObj });
                    }
                }
                else {
                    this.callbackMaps[messageID] = [{ callback: callback, thisObj: thisObj }];
                }
            }
        };
        EventCenter.prototype.removeEventListener = function (messageID, callback, thisObj) {
            var callbacks = this.callbackMaps[messageID];
            if (callbacks != null) {
                for (var i = callbacks.length; i > 0; i--) {
                    if (callbacks[i - 1].thisObj === thisObj) {
                        callbacks.splice(i - 1, 1);
                    }
                }
            }
        };
        EventCenter.prototype.sendEvent = function (message) {
            this.sendBuffer.push(message);
            egret.startTick(this.onTickerLoop, this);
        };
        EventCenter.prototype.onTickerLoop = function (timeStamp) {
            var buffer = this.sendBuffer;
            if (buffer != null) {
                if (buffer.length > 0) {
                    var messageData = buffer.shift();
                    var datas = this.callbackMaps[messageData.messageID];
                    if (datas != null) {
                        for (var i = 0, iLen = datas.length; i < iLen; i++) {
                            var data = datas[i];
                            if (data.callback) {
                                data.callback.call(data.thisObj, messageData);
                            }
                        }
                    }
                    else {
                        console.log("事件ID:" + messageData.messageID + "无监听回调");
                    }
                }
                else {
                    egret.stopTick(this.onTickerLoop, this);
                }
            }
            return false;
        };
        return EventCenter;
    }());
    core.EventCenter = EventCenter;
    __reflect(EventCenter.prototype, "core.EventCenter");
})(core || (core = {}));
//# sourceMappingURL=EventCenter.js.map