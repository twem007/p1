var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     *    此为模块入口 除release()外都为底层自动调用
     * @author yuxuefeng
     *
     */
    var Control = (function () {
        function Control(moduleName, loadingUI) {
            this.p_moduleName = moduleName;
            this.m_loadingUI = loadingUI;
            this.init();
        }
        /**
         * 初始化
         */
        Control.prototype.init = function () {
            core.EventCenter.getInstance().addEventListener(core.EventID.MODULE_SHOW, this.onModuleShow, this);
            core.EventCenter.getInstance().addEventListener(core.EventID.MODULE_HIDE, this.onModuleHide, this);
        };
        /**
         * 预加载
         */
        Control.prototype.preload = function () {
            var groups = this.getLoadGroup(this.m_data);
            if (groups && groups.length > 0) {
                if (this.m_loadingUI) {
                    this.m_loadingUI.show();
                }
                core.ResUtils.loadGroups(groups, this.onLoadProgress, this.onLoadFaild, this.onLoadComplete, this);
            }
            else {
                this.show(this.m_data);
            }
        };
        /**
         *  加载前
         */
        Control.prototype.onModuleShow = function (data) {
            if (this.p_moduleName === data.moduleEnum) {
                this.m_data = data.messageData;
                this.preload();
            }
        };
        /**
         * 关闭前
         */
        Control.prototype.onModuleHide = function (data) {
            if (this.p_moduleName === data.moduleEnum) {
                this.hide();
            }
        };
        /**
         * 加载进度
         */
        Control.prototype.onLoadProgress = function (data) {
            if (this.m_loadingUI) {
                this.m_loadingUI.setProgress(data);
            }
        };
        /**
         * 加载失败
         */
        Control.prototype.onLoadFaild = function (data) {
            Log("\u8D44\u6E90\u7EC4" + data.curGroup + "\u52A0\u8F7D\u5931\u8D25, \u5931\u8D25URL\uFF1A" + data.curResItem.url);
        };
        /**
         * 加载完成
         */
        Control.prototype.onLoadComplete = function (data) {
            if (this.m_loadingUI) {
                this.m_loadingUI.hide();
            }
            this.show(this.m_data);
        };
        /**
         * 释放资源
         */
        Control.prototype.release = function () {
            core.EventCenter.getInstance().removeEventListener(core.EventID.MODULE_SHOW, this.onModuleShow, this);
            core.EventCenter.getInstance().removeEventListener(core.EventID.MODULE_HIDE, this.onModuleHide, this);
        };
        return Control;
    }());
    core.Control = Control;
    __reflect(Control.prototype, "core.Control");
})(core || (core = {}));
