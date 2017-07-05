module core {
    export class MCFactory {

        private static s_instance: MCFactory;

        private m_factorys: any;

        private m_mcFactorys: any;

        public constructor() {
            this.m_factorys = {};
            this.m_mcFactorys = {};
        }
        /**
         * 获取影片剪辑
         * @param json  影片剪辑JSON名称
         * @param png   影片剪辑PNG名称
         * @param name  影片剪辑名称
         * @param isCenter 是否锚点居中
         */
        public getMovieClip(json: string, png: string, name: string, isCenter: boolean = true): egret.MovieClip {
            let factory: egret.MovieClipDataFactory = this.m_mcFactorys[json];
            if (!factory) {
                let jsonData: any = RES.getRes(json);
                let pngData: egret.Texture = RES.getRes(png);
                factory = new egret.MovieClipDataFactory(jsonData, pngData);
                factory.enableCache = true;
                this.m_mcFactorys[json] = factory;
            }
            let mcList: egret.MovieClip[] = this.m_factorys[`${json}>${name}`];
            if (!mcList) {
                mcList = [];
                this.m_factorys[`${json}>${name}`] = mcList;
            }
            if (mcList.length > 0) {
                let mc: egret.MovieClip = mcList.pop();
                mc.gotoAndStop(1);
                return mc;
            } else {
                let mcData: egret.MovieClipData = factory.generateMovieClipData(name);
                if (mcData.mcData) {
                    let mc: egret.MovieClip = new egret.MovieClip(mcData);
                    mc.gotoAndStop(1);
                    if (isCenter) {
                        mc.anchorOffsetX = (mc.width + mcData.mcData.frames[0].x * 2) * 0.5;
                        mc.anchorOffsetY = (mc.height + mcData.mcData.frames[0].y * 2) * 0.5;
                    }
                    return mc;
                }
            }
            return null;
        }
        /**
         * 归还影片剪辑
         * @param json  影片剪辑JSON名称
         * @param name  影片剪辑名称
         * @param mc    影片剪辑实例
         */
        public revertMovieClip(json: string, name: string, mc: egret.MovieClip): void {
            if (mc) {
                mc.gotoAndStop(1);
                if (mc.parent) {
                    mc.parent.removeChild(mc);
                }
                let mcList: egret.MovieClip[] = this.m_factorys[`${json}>${name}`];
                if (!mcList) {
                    mcList = [];
                    this.m_factorys[`${json}>${name}`] = mcList;
                }
                mcList.push(mc);
            }
        }

        public static get instance(): MCFactory {
            if (MCFactory.s_instance == null) {
                MCFactory.s_instance = new MCFactory();
            }
            return MCFactory.s_instance;
        }
    }
}
