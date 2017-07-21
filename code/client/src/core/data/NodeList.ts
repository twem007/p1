module core {
	/**
	 *
	 * @author 
	 *
	 */
    export class NodeList {

        private m_list: Node[];

        public constructor(dataList: any[], isLoop: boolean = false) {
            this.m_list = [];
            if (dataList) {
                for (var i: number = 0, iLen: number = dataList.length; i < iLen; i++) {
                    var node: Node = new Node(dataList[i]);
                    this.m_list.push(node);
                }
            }
            var list: Node[] = this.m_list;
            for (var i: number = 0, iLen: number = list.length; i < iLen; i++) {
                var node: Node = list[i];
                if (i + 1 == iLen) {
                    node.nextNode = isLoop ? list[0] : null;
                } else {
                    node.nextNode = list[i + 1];
                }
                if (i == 0) {
                    node.preNode = isLoop ? list[iLen - 1] : null;
                } else {
                    node.preNode = list[i - 1];
                }
            }
        }

        public getLen(): number {
            return this.m_list.length;
        }

        public getFirst(): Node {
            return this.m_list[0];;
        }

        public getEnd(): Node {
            return this.m_list[this.m_list.length - 1];
        }

        public getNode(index: number): Node {
            return this.m_list[index];
        }

        public clear(): void {
            this.m_list.length = 0;
        }
    }
}
