module core {
	/**
     * 字节数组的扩展
     * 本类对读写字符串进行了覆盖，在读写方法中添加了字符串长度解决了二进制数据中字符串发送问题。
     */
    export class ByteBuffer extends egret.ByteArray {
        public constructor(buffer?: ArrayBuffer) {
            super(buffer);
        }
        
        /**
         * 读取字符串
         * 本方法将会从buffer中先读取short类型的字符串长度，然后通过长度读取字符串。
         * @return string
         */
        public readUTFData(): string {
            let len: number = this.readShort();
            return super.readUTFBytes(len);
        }
        /**
         * 写入字符串
         * 本方法将会向buffer中先写入short类型的字符串长度，然后再写入字符串。
         * @param  {string} value 
         */
        public writeUTFBytes(value: string): void {
            this.writeShort(this.getStringBytesLen(value));
            super.writeUTFBytes(value);
        }

        private getStringBytesLen(str: string): number {
            let bytes: egret.ByteArray = new egret.ByteArray();
            bytes.writeUTFBytes(str);
            return bytes.length;
        }
        /**
         * 深拷贝字节数据
         */
        public clone(): core.ByteBuffer {
            let buffer:core.ByteBuffer = new core.ByteBuffer();
            buffer.writeBytes(this);
            return buffer;
        }
    }
}
