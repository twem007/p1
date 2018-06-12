module core {
    /**
     * web工具类
     */
    export class WebUtils {

        public static PAGE_HIDE: string = "WebUtils.PAGE_HIDE";
        public static PAGE_SHOW: string = "WebUtils.PAGE_SHOW";
        /**
         * URL参数
         */
        public static urlParams: any;
        /**
         * 解析URL参数
         */
        public static parseURLParams(): void {
            let params: any = {};
            egret.log(`解析URL参数${location.search}`);
            let matchArr: string[] = location.search.match(/(\w+)=.+?(?=(\&|$))/ig);
            if (matchArr) {
                for (let i: number = 0, iLen: number = matchArr.length; i < iLen; i++) {
                    let param: string[] = matchArr[i].split('=');
                    if (param && param.length == 2) {
                        params[param[0]] = param[1];
                    }
                }
            }
            WebUtils.urlParams = params;
        }

        public static addKeyboardListener(validChecker?: (event: KeyboardEvent) => boolean): void {
            document.onkeydown = function (event: KeyboardEvent): any {
                if (event) {
                    if (!validChecker || validChecker(event)) {
                        core.EventManager.getInstance().sendEvent(new KeyboardEventData(core.EventID.KEYBOARD_DOWN, event));
                    }
                }
            }
            document.onkeyup = function (event: KeyboardEvent): any {
                if (event) {
                    if (!validChecker || validChecker(event)) {
                        core.EventManager.getInstance().sendEvent(new KeyboardEventData(core.EventID.KEYBOARD_UP, event));
                    }
                }
            }
        }

        private static getHiddenProp(): string {
            let prefixes = ['webkit', 'moz', 'ms', 'o'];
            // if 'hidden' is natively supported just return it
            if ('hidden' in document) return 'hidden';
            // otherwise loop over all the known prefixes until we find one
            for (let i = 0; i < prefixes.length; i++) {
                if ((prefixes[i] + 'Hidden') in document)
                    return prefixes[i] + 'Hidden';
            }
            // otherwise it's not supported
            return null;
        }

        public static isHidden(): boolean {
            var prop = WebUtils.getHiddenProp();
            if (!prop) return false;
            return document[prop];
        }
        /**
         * 添加网页监听
         */
        public static addPageVisableListenter(): void {
            // use the property name to generate the prefixed event name
            var visProp = WebUtils.getHiddenProp();
            if (visProp) {
                var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
                document.addEventListener(evtname, function () {
                    egret.log(`通用API：页面是否隐藏:${!WebUtils.isHidden()}`);
                    if (WebUtils.isHidden()) {
                        core.EventManager.getInstance().sendEvent(new EventData(WebUtils.PAGE_HIDE));
                    } else {
                        core.EventManager.getInstance().sendEvent(new EventData(WebUtils.PAGE_SHOW));
                    }
                }, false);
            }
        }
    }
}