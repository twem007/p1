module core {
    export class WebUtils {

        public static PAGE_HIDE: string = "WebUtils.PAGE_HIDE";
        public static PAGE_SHOW: string = "WebUtils.PAGE_SHOW";

        public static isKeyboard: boolean = true;

        public static addKeyboardListener(): void {
            document.onkeydown = function (event: KeyboardEvent): any {
                if (event && WebUtils.isKeyboard) {
                    core.EventCenter.getInstance().sendEvent(new KeyboardEventData(core.EventID.KEYBOARD_DOWN, event));
                }
            }
            document.onkeyup = function (event: KeyboardEvent): any {
                if (event && WebUtils.isKeyboard) {
                    core.EventCenter.getInstance().sendEvent(new KeyboardEventData(core.EventID.KEYBOARD_UP, event));
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
                        core.EventCenter.getInstance().sendEvent(new EventData(WebUtils.PAGE_HIDE));
                    } else {
                        core.EventCenter.getInstance().sendEvent(new EventData(WebUtils.PAGE_SHOW));
                    }
                }, false);
            }
        }
    }
}