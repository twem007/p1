var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
    }
    /**
     * 初始化
     */
    Config.init = function (bin) {
        Config.s_configs = {};
        if (bin) {
            var zip = new JSZip(bin);
            var files = zip.files;
            for (var fileName in files) {
                var file = files[fileName];
                if (file) {
                    var data = JSON.parse(file.asText());
                    var name_1 = data.name;
                    var classRef = egret.getDefinitionByName(name_1);
                    if (!classRef) {
                        egret.log(name_1 + "\u5728ConfigBase\u6587\u4EF6\u4E2D\u672A\u5B9A\u4E49");
                        break;
                    }
                    var values = data.data;
                    var size = data.dataSize;
                    var config = new classRef();
                    var dic = new Dictionary();
                    Config.s_configs[name_1] = dic;
                    for (var i = 0; i < size; i++) {
                        var value = values[i];
                        dic.add(value[data.key], value);
                    }
                }
            }
        }
    };
    /**
     * 获取配置文件
     * 示例：let configs:Dictionary<HeadConfig> = Config.getConfig(HeadConfig);
     * let configs:Dictionary<HeadConfig> = Config.getConfig(HeadConfig);
     * configs.get('1').emojiID;
     */
    Config.getConfig = function (ref) {
        var name = egret.getQualifiedClassName(ref);
        return Config.s_configs[name];
    };
    return Config;
}());
__reflect(Config.prototype, "Config");
//# sourceMappingURL=Config.js.map