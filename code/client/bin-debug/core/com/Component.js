var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core;
(function (core) {
    /**
     *
     * @author
     *
     */
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component() {
            return _super.call(this) || this;
        }
        /**
         * addChild 的高效实现，慎用
         * @param container
         * @param child
         */
        Component.prototype.addElement = function (container, child) {
            if (child.$parent != container) {
                if (child.$parent) {
                    this.removeElementFromParent(child);
                }
                container.$children.push(child);
                child.$parent = container;
            }
        };
        /**
         * addChildAt 的高效实现，慎用
         * @param container
         * @param child
         * @param index
         */
        Component.prototype.addElementAt = function (container, child, index) {
            if (child.$parent != container) {
                if (child.$parent) {
                    this.removeElementFromParent(child);
                }
                container.$children.splice(index, 0, child);
                child.$parent = container;
            }
        };
        /**
         * removeFromParent 的高效实现，慎用
         * @param child
         */
        Component.prototype.removeElementFromParent = function (child) {
            if (child && child.$parent) {
                var index = child.$parent.$children.indexOf(child);
                child.$parent.$children.splice(index, 1);
                child.$parent = null;
            }
        };
        /**
         * removeChildAt 的高效实现，慎用
         * @param container
         * @param index
         */
        Component.prototype.removeElementAt = function (container, index) {
            var child = container.$children[index];
            if (child) {
                container.$children.splice(index, 1);
                child.$parent = null;
            }
        };
        /**
         * removeAllChild 的高效实现，慎用
         * @param container
         */
        Component.prototype.removeAllElement = function (container) {
            while (container.$children.length) {
                this.removeElementAt(container, 0);
            }
        };
        return Component;
    }(egret.DisplayObjectContainer));
    core.Component = Component;
    __reflect(Component.prototype, "core.Component");
})(core || (core = {}));
