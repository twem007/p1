var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var MCFactory = (function () {
        function MCFactory() {
            this.m_factorys = {};
            this.m_mcFactorys = {};
        }
        /**
         * 获取影片剪辑
         * 注意事项：getMovieClip 获取的MovieClip在使用完成后需调用 revertMovieClip 归还，并需要在调用 revertMovieClip 以后将 MovieClip 变量赋值为null
         * @param mcFile    影片剪辑文件名前缀
         * @param mcName    影片剪辑名称
         * @param isCenter  是否锚点居中
         */
        MCFactory.prototype.getMovieClip = function (mcFile, mcName, isCenter) {
            if (isCenter === void 0) { isCenter = true; }
            var factory = this.m_mcFactorys[mcFile];
            if (!factory) {
                var jsonData = RES.getRes(mcFile + "_json");
                var pngData = RES.getRes(mcFile + "_png");
                if (!jsonData || !pngData) {
                    return null;
                }
                factory = new egret.MovieClipDataFactory(jsonData, pngData);
                factory.enableCache = true;
                this.m_mcFactorys[mcFile] = factory;
            }
            var mcList = this.m_factorys[mcFile + ">" + mcName];
            if (!mcList) {
                mcList = [];
                this.m_factorys[mcFile + ">" + mcName] = mcList;
            }
            if (mcList.length > 0) {
                var mc = mcList.pop();
                mc.gotoAndStop(1);
                return mc;
            }
            else {
                var mcData = factory.generateMovieClipData(mcName);
                if (mcData.mcData) {
                    var mc = new egret.MovieClip(mcData);
                    mc.gotoAndStop(1);
                    mc['mcFile'] = mcFile;
                    mc['mcName'] = mcName;
                    if (isCenter) {
                        mc.anchorOffsetX = (mc.width + mcData.mcData.frames[0].x * 2) * 0.5;
                        mc.anchorOffsetY = (mc.height + mcData.mcData.frames[0].y * 2) * 0.5;
                    }
                    return mc;
                }
            }
            return null;
        };
        /**
         * 归还影片剪辑
         * @param json  影片剪辑JSON名称
         * @param name  影片剪辑名称
         * @param mc    影片剪辑实例
         */
        MCFactory.prototype.revertMovieClip = function (mc) {
            if (mc) {
                mc.gotoAndStop(1);
                if (mc.parent) {
                    mc.parent.removeChild(mc);
                }
                var mcList = this.m_factorys[mc['mcFile'] + ">" + mc['mcName']];
                if (!mcList) {
                    mcList = [];
                    this.m_factorys[mc['mcFile'] + ">" + mc['mcName']] = mcList;
                }
                mcList.push(mc);
            }
        };
        Object.defineProperty(MCFactory, "instance", {
            get: function () {
                if (MCFactory.s_instance == null) {
                    MCFactory.s_instance = new MCFactory();
                }
                return MCFactory.s_instance;
            },
            enumerable: true,
            configurable: true
        });
        return MCFactory;
    }());
    core.MCFactory = MCFactory;
    __reflect(MCFactory.prototype, "core.MCFactory");
})(core || (core = {}));
