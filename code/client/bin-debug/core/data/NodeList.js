var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     *
     * @author
     *
     */
    var NodeList = (function () {
        function NodeList(dataList) {
            this.list = [];
            if (dataList) {
                for (var i = 0, iLen = dataList.length; i < iLen; i++) {
                    var node = new core.Node(dataList[i]);
                    this.list.push(node);
                }
            }
            var list = this.list;
            for (var i = 0, iLen = list.length; i < iLen; i++) {
                var node = list[i];
                if (i + 1 == iLen) {
                    node.nextNode = list[0];
                }
                else {
                    node.nextNode = list[i + 1];
                }
                if (i == 0) {
                    node.preNode = list[iLen - 1];
                }
                else {
                    node.preNode = list[i - 1];
                }
            }
        }
        NodeList.prototype.getLen = function () {
            return this.list.length;
        };
        NodeList.prototype.getFirst = function () {
            return this.list[0];
            ;
        };
        NodeList.prototype.getEnd = function () {
            return this.list[this.list.length - 1];
        };
        NodeList.prototype.getNode = function (index) {
            return this.list[index];
        };
        NodeList.prototype.clear = function () {
            this.list.length = 0;
        };
        return NodeList;
    }());
    core.NodeList = NodeList;
    __reflect(NodeList.prototype, "core.NodeList");
})(core || (core = {}));
//# sourceMappingURL=NodeList.js.map