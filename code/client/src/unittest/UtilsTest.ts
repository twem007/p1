class UtilsTest {
    constructor() {
        let templete: string = `class {0} {\n{1}\n}\n{2}`;
        egret.log(core.TextUtils.formatString(templete, ['UtilsTest', `egret.log('')`, 'testend']));
    }
}