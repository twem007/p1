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
    var TimerManager = (function () {
        function TimerManager() {
            if (TimerManager.s_instance) {
                throw new Error('单例类不可实例化');
            }
            egret.startTick(this.onTick, this);
            this.m_tickList = [];
        }
        TimerManager.prototype.onTick = function (timeStamp) {
            var dataList = this.m_tickList;
            for (var i = dataList.length; i > 0; i--) {
                var data = dataList[i - 1];
                if (!data.isValid) {
                    dataList.splice(i - 1, 1);
                }
            }
            for (var i = 0, iLen = dataList.length; i < iLen; i++) {
                var data = dataList[i];
                if ((timeStamp - data.timestamp) > data.delay) {
                    data.timestamp = timeStamp;
                    data.count++;
                    if (data.callback) {
                        var t = egret.getTimer();
                        data.callback.call(data.thisObj, data.clone());
                        var t1 = egret.getTimer();
                        if (t1 - t > 2) {
                            egret.log("tick\u56DE\u8C03\u8017\u65F6:" + (t1 - t));
                        }
                    }
                    if (data.count == data.maxCount) {
                        data.isValid = false;
                    }
                }
            }
            return false;
        };
        TimerManager.prototype.addTick = function (delay, replayCount, callback, thisObj) {
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            var dataList = this.m_tickList;
            if (dataList) {
                for (var i = 0, iLen = dataList.length; i < iLen; i++) {
                    var data = dataList[i];
                    if (data.callback == callback && data.thisObj == thisObj && data.delay == delay && data.maxCount == replayCount) {
                        if (!data.isValid) {
                            data.isValid = true;
                            data.delay = delay;
                            data.count = 0;
                            data.maxCount = replayCount <= 0 ? Number.MAX_VALUE : replayCount;
                            data.callback = callback;
                            data.thisObj = thisObj;
                            data.args = args;
                            data.timestamp = egret.getTimer();
                        }
                        return;
                    }
                }
            }
            else {
                dataList = [];
                this.m_tickList = dataList;
            }
            var tick = new TickData();
            tick.delay = delay;
            tick.count = 0;
            tick.maxCount = replayCount <= 0 ? Number.MAX_VALUE : replayCount;
            tick.callback = callback;
            tick.thisObj = thisObj;
            tick.args = args;
            tick.timestamp = egret.getTimer();
            tick.isValid = true;
            dataList.push(tick);
        };
        TimerManager.prototype.removeTick = function (callback, thisObj) {
            var dataList = this.m_tickList;
            if (dataList) {
                var tickData = void 0;
                for (var i = 0, iLen = dataList.length; i < iLen; i++) {
                    var data = dataList[i];
                    if (data.callback == callback && data.thisObj == thisObj) {
                        data.isValid = false;
                        return;
                    }
                }
            }
        };
        TimerManager.prototype.removeTicks = function (thisObj) {
            var dataList = this.m_tickList;
            if (dataList) {
                var tickData = void 0;
                for (var i = 0, iLen = dataList.length; i < iLen; i++) {
                    var data = dataList[i];
                    if (data.thisObj == thisObj) {
                        data.isValid = false;
                    }
                }
            }
        };
        TimerManager.prototype.removeAllTicks = function () {
            this.m_tickList.length = 0;
        };
        Object.defineProperty(TimerManager, "instance", {
            get: function () {
                if (TimerManager.s_instance == null) {
                    TimerManager.s_instance = new TimerManager();
                }
                return TimerManager.s_instance;
            },
            enumerable: true,
            configurable: true
        });
        return TimerManager;
    }());
    core.TimerManager = TimerManager;
    __reflect(TimerManager.prototype, "core.TimerManager");
    var TickData = (function (_super) {
        __extends(TickData, _super);
        function TickData() {
            return _super.call(this) || this;
        }
        TickData.prototype.clone = function () {
            var data = new TickData();
            data.delay = this.delay;
            data.count = this.count;
            data.maxCount = this.maxCount;
            data.callback = this.callback;
            data.thisObj = this.thisObj;
            data.args = this.args;
            data.isValid = this.isValid;
            return data;
        };
        return TickData;
    }(egret.HashObject));
    core.TickData = TickData;
    __reflect(TickData.prototype, "core.TickData");
})(core || (core = {}));
