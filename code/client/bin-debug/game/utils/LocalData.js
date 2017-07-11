var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalData = (function () {
    function LocalData() {
    }
    LocalData.setData = function (key, data) {
        egret.localStorage.setItem(key, data);
    };
    LocalData.getData = function (key) {
        var data;
        data = egret.localStorage.getItem(key);
        return data ? data : '';
    };
    LocalData.removeData = function (key) {
        egret.localStorage.removeItem(key);
    };
    /**账号id */
    LocalData.setOpenId = function (openId) {
        this.setData(this.OPEN_ID, openId);
    };
    LocalData.getOpenId = function () {
        var opend_id = this.getData(this.OPEN_ID);
        this.setData(this.OPEN_ID, opend_id);
        return opend_id;
    };
    /**服务器id */
    LocalData.getServerId = function () {
        var server_id = this.getData(this.SERVER_ID) || 1;
        this.setData(this.SERVER_ID, server_id);
        return server_id;
    };
    /**设置玩家名字 */
    LocalData.setPlayerName = function (playerName) {
        this.setData(this.PLAYER_NAME + LocalData.getOpenId(), playerName);
    };
    /**获取玩家名字 */
    LocalData.getPlayerName = function () {
        var playerName = this.getData(this.PLAYER_NAME + LocalData.getOpenId());
        if (!playerName) {
            var lists = Config.getConfig(RobotNameConfig);
            var obj = lists.get('id');
            var playerName_1 = obj.name;
        }
        this.setData(this.PLAYER_NAME + LocalData.getOpenId(), playerName);
        return playerName;
    };
    /**设置头像id */
    LocalData.setFaceId = function (faceId) {
        this.setData(this.FACE_ID + LocalData.getOpenId(), faceId);
    };
    /**获取头像id */
    LocalData.getFaceId = function () {
        var faceId = this.getData(this.FACE_ID + LocalData.getOpenId());
        if (!faceId) {
        }
        this.setData(this.FACE_ID + LocalData.getOpenId(), faceId);
        return faceId;
    };
    /**设置初始教学 */
    LocalData.setPCKeyboard = function (isKey) {
        this.setData(this.ISPCKEYBOARD + LocalData.getOpenId(), isKey);
    };
    /**获取初始教学 */
    LocalData.getPCKeyboard = function () {
        var isKey = this.getData(this.ISPCKEYBOARD + LocalData.getOpenId()) || LocalDataType.LOCALTYPETRUE;
        this.setData(this.ISPCKEYBOARD + LocalData.getOpenId(), isKey);
        return isKey;
    };
    /**设置初始指引 */
    LocalData.setGuidance = function (isKey) {
        this.setData(this.ISGUIDANCE + LocalData.getOpenId(), isKey);
    };
    /**获取初始指引 */
    LocalData.getGuidance = function () {
        var isKey = this.getData(this.ISGUIDANCE + LocalData.getOpenId()) || LocalDataType.LOCALTYPETRUE;
        this.setData(this.ISGUIDANCE + LocalData.getOpenId(), isKey);
        return isKey;
    };
    /**获取第一技能按钮位置 */
    LocalData.getBtnPointFirst = function () {
        var point = this.getData(this.BTNPOINTFIRST + LocalData.getOpenId()) || "134,130";
        this.setData(this.BTNPOINTFIRST + LocalData.getOpenId(), point);
        return point;
    };
    /**设置第一技能按钮位置 */
    LocalData.setBtnPointFirst = function (point) {
        this.setData(this.BTNPOINTFIRST + LocalData.getOpenId(), point);
    };
    /**获取第二技能按钮位置 */
    LocalData.getBtnPointSecond = function () {
        var point = this.getData(this.BTNPOINTSECOND + LocalData.getOpenId()) || "304,130";
        this.setData(this.BTNPOINTSECOND + LocalData.getOpenId(), point);
        return point;
    };
    /**设置第二技能按钮位置 */
    LocalData.setBtnPointSecond = function (point) {
        this.setData(this.BTNPOINTSECOND + LocalData.getOpenId(), point);
    };
    /**获取第一按钮大小 */
    LocalData.getBtnScaleFirst = function () {
        var scale = this.getData(this.BTNSCALEFIRST + LocalData.getOpenId()) || "0.85";
        this.setData(this.BTNSCALEFIRST + LocalData.getOpenId(), scale);
        return scale;
    };
    /**设置第一按钮大小 */
    LocalData.setBtnScaleFirst = function (scale) {
        this.setData(this.BTNSCALEFIRST + LocalData.getOpenId(), scale);
    };
    /**获取第二按钮大小 */
    LocalData.getBtnScaleSecond = function () {
        var scale = this.getData(this.BTNSCALESECOND + LocalData.getOpenId()) || "0.85";
        this.setData(this.BTNSCALESECOND + LocalData.getOpenId(), scale);
        return scale;
    };
    /**设置第二按钮大小 */
    LocalData.setBtnScaleSecond = function (scale) {
        this.setData(this.BTNSCALESECOND + LocalData.getOpenId(), scale);
    };
    /**获取按钮透明度 */
    LocalData.getBtnAlpha = function () {
        var alpha = this.getData(this.BTNALPHA + LocalData.getOpenId()) || "1";
        this.setData(this.BTNALPHA + LocalData.getOpenId(), alpha);
        return alpha;
    };
    /**设置按钮透明度 */
    LocalData.setBtnAlpha = function (alpha) {
        this.setData(this.BTNALPHA + LocalData.getOpenId(), alpha);
    };
    /**获取音乐大小 */
    LocalData.getMusicSize = function () {
        var musicSize = this.getData(this.MUSICSIZE + LocalData.getOpenId()) || "5";
        this.setData(this.MUSICSIZE + LocalData.getOpenId(), musicSize);
        return musicSize;
    };
    /**设置音乐大小 */
    LocalData.setMusicSize = function (musicSize) {
        this.setData(this.MUSICSIZE + LocalData.getOpenId(), musicSize);
    };
    /**获取音乐开关 */
    LocalData.getIsMusic = function () {
        var isMusic = this.getData(this.ISMUSIC + LocalData.getOpenId()) || "1";
        this.setData(this.ISMUSIC + LocalData.getOpenId(), isMusic);
        return isMusic;
    };
    /**设置音乐开关 */
    LocalData.setIsMusic = function (isMusic) {
        this.setData(this.ISMUSIC + LocalData.getOpenId(), isMusic);
    };
    /**获取音效大小 */
    LocalData.getSoundSize = function () {
        var soundSize = this.getData(this.SOUNDSIZE + LocalData.getOpenId()) || "5";
        this.setData(this.SOUNDSIZE + LocalData.getOpenId(), soundSize);
        return soundSize;
    };
    /**设置音效大小 */
    LocalData.setSoundSize = function (soundSize) {
        this.setData(this.SOUNDSIZE + LocalData.getOpenId(), soundSize);
    };
    /**获取音效开关 */
    LocalData.getIsSound = function () {
        var isSound = this.getData(this.ISSOUND + LocalData.getOpenId()) || "1";
        this.setData(this.ISSOUND + LocalData.getOpenId(), isSound);
        return isSound;
    };
    /**设置音效开关 */
    LocalData.setIsSound = function (isSound) {
        this.setData(this.ISSOUND + LocalData.getOpenId(), isSound);
    };
    /**获取画质 */
    LocalData.getQuality = function () {
        var quality = this.getData(this.QUALITY + LocalData.getOpenId()) || "3";
        this.setData(this.QUALITY + LocalData.getOpenId(), quality);
        return quality;
    };
    /**设置画质 */
    LocalData.setQuality = function (quality) {
        this.setData(this.QUALITY + LocalData.getOpenId(), quality);
    };
    /**获取公告开关 */
    LocalData.getNotice = function () {
        var notice = this.getData(this.NOTICE) || "";
        this.setData(this.NOTICE, notice);
        return notice;
    };
    /**设置公告开关 */
    LocalData.setNotice = function (notice) {
        this.setData(this.NOTICE, notice);
    };
    return LocalData;
}());
LocalData.OPEN_ID = "h5sdk.openid";
LocalData.SERVER_ID = "h5sdk.serverid";
/**玩家名字 */
LocalData.PLAYER_NAME = "name_";
/**玩家头像id */
LocalData.FACE_ID = "faceId_";
/**新手教学 */
LocalData.ISPCKEYBOARD = "pcKeyboard_";
/**新手引导 */
LocalData.ISGUIDANCE = "IsGuidance_";
/**第一技能按钮位置 */
LocalData.BTNPOINTFIRST = "BTNPOINTFIRST_";
/**第二技能按钮位置 */
LocalData.BTNPOINTSECOND = "BTNPOINTSECOND_";
/**第一技能按钮大小 */
LocalData.BTNSCALEFIRST = "BTNSCALEFIRST_";
/**第二技能按钮大小 */
LocalData.BTNSCALESECOND = "BTNSCALESECOND_";
/**技能按钮透明度 */
LocalData.BTNALPHA = "BTNALPHA_";
/**音乐大小 */
LocalData.MUSICSIZE = "MUSICSIZE_";
/**音乐开关 */
LocalData.ISMUSIC = "ISMUSIC_";
/**音效大小 */
LocalData.SOUNDSIZE = "SOUNDSIZE_";
/**音效开关 */
LocalData.ISSOUND = "ISSOUND_";
/**画质 */
LocalData.QUALITY = "QUALITY_";
/**游戏公告 */
LocalData.NOTICE = "NOTICE_";
__reflect(LocalData.prototype, "LocalData");
//# sourceMappingURL=LocalData.js.map