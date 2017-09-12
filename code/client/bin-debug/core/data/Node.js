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
    var Node = (function () {
        function Node(data) {
            this.data = data;
        }
        return Node;
    }());
    core.Node = Node;
    __reflect(Node.prototype, "core.Node");
})(core || (core = {}));
//# sourceMappingURL=Node.js.map