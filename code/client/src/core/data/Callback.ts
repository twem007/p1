module core {
    export class Callback {

        public callback: Function;

        public thisObj: any;

        constructor(callback: Function, thisObj: any) {
            this.callback = callback;
            this.thisObj = thisObj;
        }
    }
}