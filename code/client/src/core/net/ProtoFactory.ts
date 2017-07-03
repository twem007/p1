module core {
    export class ProtoFactory {

        private static protoBuff: any;

        constructor() {

        }
        /**
         * 初始化
         */
        public static init(proto: any): void {
            ProtoFactory.protoBuff = dcodeIO.ProtoBuf.loadProto(proto);
        }
        /**
         * 创建协议数据
         */
        public static createMessage(messageID: string): any {
            if (ProtoFactory.protoBuff) {
                let dataClass = ProtoFactory.protoBuff.build(messageID);
                if (dataClass) {
                    let data: any = new dataClass();
                    data.protocol = messageID;
                    return data;
                } else {
                    Log(`ProtoBuf协议：${messageID} 在Proto文件中不存在`);
                }
            } else {
                Log(`ProtoBuf协议尚未初始化`);
            }
            return null;
        }
        /**
         * 创建枚举数据
         */
        public static createEnums(name: string): any {
            if (ProtoFactory.protoBuff) {
                return ProtoFactory.protoBuff.build(name);
            } else {
                Log(`ProtoBuf协议尚未初始化`);
            }
            return null;
        }
        /**
         * 创建结构数据
         */
        public static createData(name: string): any {
            if (ProtoFactory.protoBuff) {
                let dataClass = ProtoFactory.protoBuff.build(name);
                if (dataClass) {
                    let data: any = new dataClass();
                    return data;
                } else {
                    Log(`ProtoBuf数据结构：${name} 在Proto文件中不存在`);
                }
            } else {
                Log(`ProtoBuf协议尚未初始化`);
            }
            return null;
        }
        /**
         * 解析数据
         */
        public static decodeMessage(messageID: string, buffer: core.ByteBuffer): any {
            if (ProtoFactory.protoBuff) {
                let dataClass = ProtoFactory.protoBuff.build(messageID);
                if (dataClass) {
                    return dataClass.decode(buffer);
                } else {
                    Log(`ProtoBuf协议：${messageID} 在Proto文件中不存在`);
                }
            } else {
                Log(`ProtoBuf协议尚未初始化`);
            }
            return null;
        }
    }
}