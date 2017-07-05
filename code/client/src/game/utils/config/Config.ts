class Config {

    private static s_configs: Object;

    constructor() {
    }
    /**
     * 初始化
     */
    public static init(bin: any): void {
        Config.s_configs = {};
        if (bin) {
            let zip: JSZip = new JSZip(bin);
            let files: any = zip.files;
            for (var key in files) {
                let file: any = files[key];
                if (file) {
                    let data: any = JSON.parse(file.asText());
                    let name: string = data.name;
                    let classRef = egret.getDefinitionByName(name);
                    if (!classRef) {
                        Log(`${name}在ConfigBase文件中未定义`);
                        break;
                    }
                    let values: any[] = data.data;
                    let size: number = data.dataSize;
                    let config = new classRef();
                    let attrs: string[] = config.attrs();
                    let dic: Dictionary<any> = new Dictionary<any>();
                    Config.s_configs[name] = dic;
                    for (let i: number = 0; i < size; i++) {
                        let value: any[] = values[i];
                        for (let j: number = 0, jLen: number = attrs.length; j < jLen; j++) {
                            config[attrs[j]] = value[j];
                        }
                        dic.add(value[0], config);
                    }
                }
            }
        }
    }

    /**
     * 获取配置文件
     * 示例：let configs:Dictionary<HeadConfig> = Config.getConfig(HeadConfig);
     * let configs:Dictionary<HeadConfig> = Config.getConfig(HeadConfig);
     * configs.get('1').emojiID;
     */
    public static getConfig(ref: any): Dictionary<any> {
        let name: string = egret.getQualifiedClassName(ref);
        return Config.s_configs[name];
    }
}