class EventTest {
    constructor() {
        let dispatcher: EventCenter = new EventCenter();
        dispatcher.addEventListener("a", (event: egret.Event) => {
            console.log('a');
        }, this);
        core.EventCenter.getInstance().addEventListener('b', (data: core.EventData) => {
            console.log('b');
        }, this)
        core.DebugUtils.begin('dispatcher');
        for (let i: number = 0, iLen: number = 100; i < iLen; i++) {
            dispatcher.dispatchEvent(new egret.Event('a'))
        }
        console.log("耗时：" + core.DebugUtils.finish('dispatcher'));
        core.DebugUtils.begin('center');
        for (let i: number = 0, iLen: number = 100; i < iLen; i++) {
            core.EventCenter.getInstance().sendEvent(new core.EventData("b"))
        }
        console.log("耗时：" + core.DebugUtils.finish('center'));
    }
}

class EventCenter extends egret.EventDispatcher {
    constructor() {
        super();
    }
}