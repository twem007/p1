module core {
    export class MCFactory {

        private static s_instance: MCFactory;

        private m_factorys: Dictionary<egret.MovieClip[]>;

        private m_mcFactorys: Dictionary<egret.MovieClipDataFactory>;

        public constructor() {
            this.m_factorys = new Dictionary<egret.MovieClip[]>();
            this.m_mcFactorys = new Dictionary<egret.MovieClipDataFactory>();
        }
        /**
         * 获取影片剪辑
         * @param mcFile    影片剪辑文件名前缀
         * @param mcName    影片剪辑名称
         * @param isCenter  是否锚点居中
         */
        public getMovieClip(mcFile: string, mcName: string, isCenter: boolean = true): egret.MovieClip {
            let key: string = `${mcFile}>${mcName}`;
            let mcList: egret.MovieClip[] = this.m_factorys.get(key);
            if (!mcList) {
                mcList = [];
                this.m_factorys.add(key, mcList);
            }
            if (mcList.length > 0) {
                let mc: egret.MovieClip = mcList.pop();
                return mc;
            } else {
                let factory: egret.MovieClipDataFactory = this.m_mcFactorys.get(mcFile);
                if (!factory) {
                    let jsonData: any = RES.getRes(`${mcFile}_json`);
                    let pngData: egret.Texture = RES.getRes(`${mcFile}_png`);
                    if (!jsonData || !pngData) {
                        return null;
                    }
                    factory = new egret.MovieClipDataFactory(jsonData, pngData);
                    factory.enableCache = true;
                    this.m_mcFactorys.add(mcFile, factory);
                }
                let mcData: egret.MovieClipData = factory.generateMovieClipData(mcName);
                if (mcData.mcData) {
                    let mc: egret.MovieClip = new egret.MovieClip(mcData);
                    mc.gotoAndStop(1);
                    mc['key'] = key;
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
         * 检查影片剪辑是否有效
         * @param mcFile    影片剪辑文件名前缀
         * @param mcName    影片剪辑名称
         * @param mc        影片剪辑
         */
        public checkValid(mcFile: string, mcName: string, mc: egret.MovieClip): boolean {
            return mc && this.getFormatKey(mcFile, mcName) === this.getCacheKey(mc);
        }
        /**
         * 得到影片剪辑的缓存KEY
         * @param mc        影片剪辑
         */
        public getCacheKey(mc: egret.MovieClip): string {
            return mc && mc['key'];
        }
        /**
         * 格式化缓存KEY
         * @param mcFile    影片剪辑文件名前缀
         * @param mcName    影片剪辑名称
         */
        public getFormatKey(mcFile: string, mcName: string): string {
            return `${mcFile}>${mcName}`;
        }
        /**
         * 归还影片剪辑
         * @param json      影片剪辑JSON名称
         */
        public revertMovieClip(mc: egret.MovieClip): void {
            if (mc) {
                mc.gotoAndStop(1);
                let key: string = mc['key'];
                if (mc.parent) {
                    mc.parent.removeChild(mc);
                }
                let mcList: egret.MovieClip[] = this.m_factorys.get(key);
                if (!mcList) {
                    mcList = [];
                    this.m_factorys.add(key, mcList);
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
