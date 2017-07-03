module core {
    export class PlatUtils {
        public constructor() {
        }

        public static get isPC(): boolean {
            return egret.Capabilities.os == 'Windows PC';
        }

        public static get isiOS(): boolean {
            return egret.Capabilities.os == 'iOS';
        }

        public static get isAndroid(): boolean {
            return egret.Capabilities.os == 'Android';
        }

        public static get isWindowPhone(): boolean {
            return egret.Capabilities.os == 'Windows Phone';
        }

        public static get isMacOS(): boolean {
            return egret.Capabilities.os == 'Mac OS';
        }

        public static get isUnknown(): boolean {
            return egret.Capabilities.os == 'Unknown';
        }
    }
}
