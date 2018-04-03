module core {
    export class Callback {

        public callback: Function;

        public thisObj: any;

        public bindCallback: Function;

        constructor(callback: Function, thisObj: any) {
            this.bindCallback = callback.bind(thisObj);
            this.callback = callback;
            this.thisObj = thisObj;
        }
    }
}