class SoundUtilsTest {
    constructor() {
        core.SoundUtils.getInstance().playSound(1, 0);
        egret.setTimeout(()=>{
            core.SoundUtils.getInstance().stopSoundByID(1);
        }, this, 1000);
        egret.setTimeout(()=>{
            core.SoundUtils.getInstance().playSound(1, 0);
        }, this, 2000);
    }
}