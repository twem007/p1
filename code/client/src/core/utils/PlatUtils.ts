module core {
    export class PlatUtils {
        public constructor() {
        }

        public static get isPC(): boolean {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                var userAgentInfo: string = navigator.userAgent.toString();
                var Agents: string[] = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
                var flag: boolean = true;
                for (var v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            } else {
                return egret.Capabilities.os.indexOf('Mac OS') != -1 || egret.Capabilities.os.indexOf('Windows PC') != -1;
            }
        }

        public static get isiPhone(): boolean {
            return egret.Capabilities.os.indexOf('iOS') != -1;
        }

        public static get isiPad(): boolean {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                var userAgentInfo: string = navigator.userAgent.toString();
                if (userAgentInfo.indexOf("iPad") > 0) {
                    return true;
                }
                return false;
            } else {
                return PlatUtils.isiPhone;
            }
        }

        public static get isiPod(): boolean {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                var userAgentInfo: string = navigator.userAgent.toString();
                if (userAgentInfo.indexOf("iPod") > 0) {
                    return true;
                }
                return false;
            } else {
                return PlatUtils.isiPhone;
            }
        }

        public static get isAndroid(): boolean {
            return egret.Capabilities.os.indexOf('Android') != -1;
        }

        public static get isWeChat(): boolean {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                let ua = navigator.userAgent.toLowerCase();
                let matchArr: RegExpMatchArray = ua.match(/MicroMessenger/i);
                if (matchArr && matchArr[0] == "micromessenger") {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        }
    }
}
