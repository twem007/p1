module core {
    export class DBFactory {

        private static s_instance: DBFactory;

        private m_factorys: any;

        private m_dbFactory: dragonBones.EgretFactory;

        public constructor() {
            this.m_factorys = {};
            this.m_dbFactory = new dragonBones.EgretFactory();
        }
        /**
         * 获取影片剪辑
         * @param db    龙骨数据名称
         * @param json  龙骨JSON名称
         * @param png   龙骨PNG名称
         * @param name  龙骨名称
         */
        public getDB(db: string, json: string, png: string, name: string = "robot"): any {
            let dragonbonesData: any = RES.getRes(db);
            let jsonData: any = RES.getRes(json);
            let pngData: egret.Texture = RES.getRes(png);
            let dbFactory: dragonBones.EgretFactory = this.m_dbFactory;
            dbFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dbFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(pngData, jsonData));
            var armature: dragonBones.Armature = dbFactory.buildArmature(name);
            return armature.display;
        }

        public static get instance(): DBFactory {
            if (DBFactory.s_instance == null) {
                DBFactory.s_instance = new DBFactory();
            }
            return DBFactory.s_instance;
        }
    }
}
