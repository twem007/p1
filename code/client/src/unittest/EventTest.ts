class EventTest {
    constructor() {



        core.EventCenter.getInstance().addEventListener('test1', this.test1Callback, this, 1);
        core.EventCenter.getInstance().addEventListener('test2', this.test2Callback, this);
        core.TimerManager.instance.addTick(5000, -1, this.sendTest1, this);
        core.TimerManager.instance.addTick(10000, 1, this.sendTest2, this);
    }

    private sendTest1(): void {
        core.EventCenter.getInstance().sendEvent(new core.EventData('test1', 'test1'))
    }

    private sendTest2(): void {
        core.EventCenter.getInstance().sendEvent(new core.EventData('test1', 'test2'));
        core.EventCenter.getInstance().addEventListener('test1', this.test1Callback2, this, 2);
    }

    private test1Callback(data: core.EventData): void {
        console.log('test1');
    }

    private test2Callback(data: core.EventData): void {
        console.log('test2');
    }

    private test1Callback2(data: core.EventData): void {
        console.log('test1_2');
    }
}