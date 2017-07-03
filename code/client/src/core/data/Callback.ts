module core {
    export class Callback {

        public callback: Function;

        public thisObj: any;

        public args: any[];

        constructor(callback: Function, thisObj: any, ...args) {
            this.callback = callback;
            this.thisObj = thisObj;
            this.args = args;
        }
    }
}