module core {
	/**
	 *
	 * @author yuxuefeng
	 *
	 */
    export class ByteBuffer extends egret.ByteArray {
        public constructor(buffer?: ArrayBuffer) {
            super(buffer);
        }

        public readUTFData(): string {
            var len: number = this.readShort();
            return super.readUTFBytes(len);
        }

        public writeUTFBytes(value: string): void {
            this.writeShort(this.getStringBytesLen(value));
            super.writeUTFBytes(value);
        }

        private getStringBytesLen(str: string): number {
            var bytes: egret.ByteArray = new egret.ByteArray();
            bytes.writeUTFBytes(str);
            return bytes.length;
        }

        public clone(): core.ByteBuffer {
            let buffer:core.ByteBuffer = new core.ByteBuffer();
            buffer.writeBytes(this);
            return buffer;
        }
    }
}
