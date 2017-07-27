class GameController extends core.Control {

    constructor() {
        super(ModuleEnum.GAME);
    }

    public getLoadGroup(data?: any): string[] {
        let mapIDArr: Array<any> = [101, 102, 103];
        let keyArr: Array<string> = [];
        for (let i = 0, iLen: number = mapIDArr.length; i < iLen; i++) {
            let imgKey: string = ``;
            let bgImgKey1: string = ``;
            let bgImgKey2: string = ``;
            if (keyArr.indexOf(imgKey) === -1) {
                keyArr.push(imgKey);
            }
            if (keyArr.indexOf(bgImgKey1) === -1) {
                keyArr.push(bgImgKey1);
            }
            if (keyArr.indexOf(bgImgKey2) === -1) {
                keyArr.push(bgImgKey2);
            }
        }
        if (keyArr.length > 0) {
            RES.createGroup('map', keyArr);
        }
        return ['map', 'soundMap'];
    }

    protected preShow(data: number): void {
    }

    protected show(data?: any): void {
    }

    protected hide(): void {
    }
}