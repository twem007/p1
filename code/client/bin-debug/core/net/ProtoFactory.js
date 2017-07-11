var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var ProtoFactory = (function () {
        function ProtoFactory() {
        }
        /**
         * 初始化
         */
        ProtoFactory.init = function (proto) {
            ProtoFactory.s_protoBuff = dcodeIO.ProtoBuf.loadProto(proto);
        };
        /**
         * 创建协议数据
         */
        ProtoFactory.createMessage = function (messageID) {
            if (ProtoFactory.s_protoBuff) {
                var dataClass = ProtoFactory.s_protoBuff.build(messageID);
                if (dataClass) {
                    var data = new dataClass();
                    data.protocol = messageID;
                    return data;
                }
                else {
                    Log("ProtoBuf\u534F\u8BAE\uFF1A" + messageID + " \u5728Proto\u6587\u4EF6\u4E2D\u4E0D\u5B58\u5728");
                }
            }
            else {
                Log("ProtoBuf\u534F\u8BAE\u5C1A\u672A\u521D\u59CB\u5316");
            }
            return null;
        };
        /**
         * 创建枚举数据
         */
        ProtoFactory.createEnums = function (name) {
            if (ProtoFactory.s_protoBuff) {
                return ProtoFactory.s_protoBuff.build(name);
            }
            else {
                Log("ProtoBuf\u534F\u8BAE\u5C1A\u672A\u521D\u59CB\u5316");
            }
            return null;
        };
        /**
         * 创建结构数据
         */
        ProtoFactory.createData = function (name) {
            if (ProtoFactory.s_protoBuff) {
                var dataClass = ProtoFactory.s_protoBuff.build(name);
                if (dataClass) {
                    var data = new dataClass();
                    return data;
                }
                else {
                    Log("ProtoBuf\u6570\u636E\u7ED3\u6784\uFF1A" + name + " \u5728Proto\u6587\u4EF6\u4E2D\u4E0D\u5B58\u5728");
                }
            }
            else {
                Log("ProtoBuf\u534F\u8BAE\u5C1A\u672A\u521D\u59CB\u5316");
            }
            return null;
        };
        /**
         * 解析数据
         */
        ProtoFactory.decodeMessage = function (messageID, buffer) {
            if (ProtoFactory.s_protoBuff) {
                var dataClass = ProtoFactory.s_protoBuff.build(messageID);
                if (dataClass) {
                    return dataClass.decode(buffer);
                }
                else {
                    Log("ProtoBuf\u534F\u8BAE\uFF1A" + messageID + " \u5728Proto\u6587\u4EF6\u4E2D\u4E0D\u5B58\u5728");
                }
            }
            else {
                Log("ProtoBuf\u534F\u8BAE\u5C1A\u672A\u521D\u59CB\u5316");
            }
            return null;
        };
        return ProtoFactory;
    }());
    core.ProtoFactory = ProtoFactory;
    __reflect(ProtoFactory.prototype, "core.ProtoFactory");
})(core || (core = {}));
//# sourceMappingURL=ProtoFactory.js.map