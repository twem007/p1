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
    /**
     *
     * @author yuxuefeng
     *
     */
    var EventCenter = (function () {
        function EventCenter() {
            this.m_callbackMaps = new Dictionary();
            this.m_sendBuffer = [];
        }
        EventCenter.getInstance = function () {
            if (EventCenter.s_instance == null) {
                EventCenter.s_instance = new EventCenter();
            }
            return EventCenter.s_instance;
        };
        /**
         * 注册事件监听
         */
        EventCenter.prototype.addEventListener = function (messageID, callback, thisObj, index) {
            if (callback && thisObj) {
                var data = new EventCallBack(callback, thisObj);
                data.messageID = messageID;
                data.index = index ? index : 0;
                var callbacks = this.m_callbackMaps.get(messageID);
                if (callbacks) {
                    callbacks.push(data);
                    callbacks.sort(this.sortIndex);
                }
                else {
                    this.m_callbackMaps.add(messageID, [data]);
                }
            }
        };
        EventCenter.prototype.sortIndex = function (a, b) {
            return a.index - b.index;
        };
        /**
         * 移除事件监听
         */
        EventCenter.prototype.removeEventListener = function (messageID, callback, thisObj) {
            var callbacks = this.m_callbackMaps.get(messageID);
            if (callbacks) {
                for (var i = 0, iLen = callbacks.length; i < iLen; i++) {
                    var data = callbacks[i];
                    if (data.callback === callback && data.thisObj === thisObj) {
                        data.isValid = false;
                    }
                }
            }
        };
        /**
         * 发送消息
         */
        EventCenter.prototype.sendEvent = function (message) {
            this.m_sendBuffer.push(message);
            egret.callLater(this.sendAll, this);
        };
        /**
         * 发送所有消息
         */
        EventCenter.prototype.sendAll = function () {
            while (this.m_sendBuffer.length > 0) {
                var event_1 = this.m_sendBuffer.shift();
                var dataList = this.m_callbackMaps.get(event_1.messageID);
                if (dataList) {
                    for (var i = dataList.length; i > 0; i--) {
                        var data = dataList[i - 1];
                        if (!data.isValid) {
                            dataList.splice(i - 1, 1);
                        }
                    }
                    for (var i = 0, iLen = dataList.length; i < iLen; i++) {
                        var data = dataList[i];
                        data.callback.call(data.thisObj, event_1);
                    }
                }
                else {
                    egret.log("事件ID:" + event_1.messageID + "无监听回调");
                }
            }
        };
        return EventCenter;
    }());
    core.EventCenter = EventCenter;
    __reflect(EventCenter.prototype, "core.EventCenter");
    var EventCallBack = (function (_super) {
        __extends(EventCallBack, _super);
        function EventCallBack(callback, thisObj) {
            var _this = _super.call(this, callback, thisObj) || this;
            _this.isValid = true;
            return _this;
        }
        EventCallBack.prototype.clone = function () {
            var data = new EventCallBack(this.callback, this.thisObj);
            data.index = this.index;
            data.messageID = this.messageID;
            data.isValid = this.isValid;
            return data;
        };
        return EventCallBack;
    }(core.Callback));
    __reflect(EventCallBack.prototype, "EventCallBack", ["core.IMessage"]);
})(core || (core = {}));
//# sourceMappingURL=EventCenter.js.map