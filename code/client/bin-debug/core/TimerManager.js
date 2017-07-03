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
    var TimerManager = (function () {
        function TimerManager() {
            if (TimerManager.s_instance) {
                throw new Error('单例类不可实例化');
            }
            egret.startTick(this.onTick, this);
            this.tickList = [];
        }
        TimerManager.prototype.onTick = function (timeStamp) {
            var dataList = this.tickList;
            for (var i = 0, iLen = dataList.length; i < iLen; i++) {
                var data = dataList[i];
                if (!data) {
                    continue;
                }
                if ((Date.now() - data.timestamp) > data.delay) {
                    data.timestamp = Date.now();
                    data.replayCount--;
                    if (data.callback) {
                        var t = Date.now();
                        data.callback.call(data.thisObj, data.clone());
                        var t1 = Date.now();
                        if (t1 - t > 2) {
                            Log("tick\u56DE\u8C03\u8017\u65F6:" + (t1 - t));
                        }
                    }
                    if (data.replayCount <= 0) {
                        data.isValid = false;
                    }
                }
            }
            var index = dataList.length;
            while (index > 0) {
                var data = dataList[index - 1];
                if (!data.isValid) {
                    dataList.splice(index - 1, 1);
                }
                index--;
            }
            return false;
        };
        TimerManager.prototype.addTick = function (delay, replayCount, callback, thisObj) {
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            var dataList = this.tickList;
            if (dataList) {
                for (var i = 0, iLen = dataList.length; i < iLen; i++) {
                    var data = dataList[i];
                    if (data.callback == callback && data.thisObj == thisObj) {
                        return;
                    }
                }
            }
            else {
                dataList = [];
                this.tickList = dataList;
            }
            var tick = new TickData();
            tick.delay = delay;
            tick.replayCount = replayCount <= 0 ? Number.MAX_VALUE : replayCount;
            tick.callback = callback;
            tick.thisObj = thisObj;
            tick.args = args;
            tick.timestamp = Date.now();
            tick.isValid = true;
            dataList.push(tick);
        };
        TimerManager.prototype.removeTick = function (callback, thisObj) {
            var dataList = this.tickList;
            if (dataList) {
                var tickData = void 0;
                for (var i = 0, iLen = dataList.length; i < iLen; i++) {
                    var data = dataList[i];
                    if (data.callback == callback && data.thisObj == thisObj) {
                        dataList.splice(i, 1);
                        return;
                    }
                }
            }
        };
        TimerManager.prototype.removeTicks = function (thisObj) {
            var dataList = this.tickList;
            if (dataList) {
                var tickData = void 0;
                for (var i = 0, iLen = dataList.length; i < iLen; i++) {
                    var data = dataList[i];
                    if (data.thisObj == thisObj) {
                        data.isValid = false;
                    }
                }
                var index = dataList.length;
                while (index > 0) {
                    var data = dataList[index - 1];
                    if (!data.isValid) {
                        dataList.splice(index - 1, 1);
                    }
                    index--;
                }
            }
        };
        TimerManager.prototype.removeAllTicks = function () {
            this.tickList.length = 0;
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
            data.replayCount = this.replayCount;
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
//# sourceMappingURL=TimerManager.js.map