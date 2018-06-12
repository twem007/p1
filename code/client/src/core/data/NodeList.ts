module core {
	/**
     * 链表实现
     * 本类为常用数据结构链表的简单实现。
     * 使用方式：
     * 1、本链表设计初衷是只读链表，如需编辑请自行扩展或者另外实现。
     * 2、将需要转化为链表的数据传入构造该函数，如需循环链表则isLoop为true
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
        /**
         * 得到链表长度
         * @return number
         */
        public getLen(): number {
            return this.m_list.length;
        }
        /**
         * 得到链表头
         * @return Node
         */
        public getFirst(): Node {
            return this.m_list[0];;
        }
        /**
         * 得到链表尾
         * @return Node
         */
        public getEnd(): Node {
            return this.m_list[this.m_list.length - 1];
        }
        /**
         * 通过索引得到链表节点
         * @param  {number} index   数据索引
         * @return Node
         */
        public getNode(index: number): Node {
            return this.m_list[index];
        }
        /**
         * 清空链表
         */
        public clear(): void {
            this.m_list.length = 0;
        }
    }
}
