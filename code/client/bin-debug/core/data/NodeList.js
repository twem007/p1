var core;
(function (core) {
    /**
     *
     * @author
     *
     */
    var NodeList = /** @class */ (function () {
        function NodeList(dataList, isLoop) {
            if (isLoop === void 0) { isLoop = false; }
            this.m_list = [];
            if (dataList) {
                for (var i = 0, iLen = dataList.length; i < iLen; i++) {
                    var node = new core.Node(dataList[i]);
                    this.m_list.push(node);
                }
            }
            var list = this.m_list;
            for (var i = 0, iLen = list.length; i < iLen; i++) {
                var node = list[i];
                if (i + 1 == iLen) {
                    node.nextNode = isLoop ? list[0] : null;
                }
                else {
                    node.nextNode = list[i + 1];
                }
                if (i == 0) {
                    node.preNode = isLoop ? list[iLen - 1] : null;
                }
                else {
                    node.preNode = list[i - 1];
                }
            }
        }
        NodeList.prototype.getLen = function () {
            return this.m_list.length;
        };
        NodeList.prototype.getFirst = function () {
            return this.m_list[0];
            ;
        };
        NodeList.prototype.getEnd = function () {
            return this.m_list[this.m_list.length - 1];
        };
        NodeList.prototype.getNode = function (index) {
            return this.m_list[index];
        };
        NodeList.prototype.clear = function () {
            this.m_list.length = 0;
        };
        return NodeList;
    }());
    core.NodeList = NodeList;
})(core || (core = {}));
//# sourceMappingURL=NodeList.js.map