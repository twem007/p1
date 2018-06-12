module core {
    /**
     * 事件消息定义类
     */
    export class EventID {
        /**
         * 模块显示消息
         */
        public static MODULE_SHOW: string = 'core.EventID.MODULE_SHOW';
        /**
         * 模块加载消息
         */
        public static MODULE_LOADED:string = 'core.EventID.MODULE_LOADED';
        /**
         * 模块隐藏消息
         */
        public static MODULE_HIDE: string = 'core.EventID.MODULE_HIDE';
        /**
         * webSocket链接消息
         */
        public static SOCKET_CONNECT: string = 'core.EventID.SOCKET_CONNECT';
        /**
         * webSocket接收数据消息
         */
        public static SOCKET_DATA: string = 'core.EventID.SOCKET_DATA';
        /**
         * webSocket链接异常消息
         */
        public static SOCKET_IOERROR: string = 'core.EventID.SOCKET_IOERROR';
        /**
         * webSocket关闭消息
         */
        public static SOCKET_CLOSE: string = 'core.EventID.SOCKET_CLOSE';
        /**
         * 键盘按下消息
         */
        public static KEYBOARD_DOWN: string = 'core.EventID.KEYBOARD_DOWN';
        /**
         * 键盘抬起消息
         */
        public static KEYBOARD_UP: string = 'core.EventID.KEYBOARD_UP';
    }
}