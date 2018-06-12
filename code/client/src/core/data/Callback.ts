module core {
    /**
     * 回调数据结构，提供this绑定功能
     */
    export class Callback extends egret.HashObject {

        readonly callback: Function;

        readonly thisObj: any;

        readonly bindCallback: Function;
        /**
         * @param  {Function} callback
         * @param  {any} thisObj
         */
        constructor(callback: Function, thisObj: any) {
            super();
            this.bindCallback = callback.bind(thisObj);
            this.callback = callback;
            this.thisObj = thisObj;
        }
    }
}