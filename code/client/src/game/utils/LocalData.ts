class LocalData {
	private static OPEN_ID: string = "h5sdk.openid";
	private static SERVER_ID: string = "h5sdk.serverid";
	/**玩家名字 */
	private static PLAYER_NAME: string = "name_";
	/**玩家头像id */
	private static FACE_ID: string = "faceId_";
	/**新手教学 */
	private static ISPCKEYBOARD: string = "pcKeyboard_";
	/**新手引导 */
	private static ISGUIDANCE: string = "IsGuidance_";

	/**第一技能按钮位置 */
	private static BTNPOINTFIRST: string = "BTNPOINTFIRST_";
	/**第二技能按钮位置 */
	private static BTNPOINTSECOND: string = "BTNPOINTSECOND_";
	/**第一技能按钮大小 */
	private static BTNSCALEFIRST: string = "BTNSCALEFIRST_";
	/**第二技能按钮大小 */
	private static BTNSCALESECOND: string = "BTNSCALESECOND_";
	/**技能按钮透明度 */
	private static BTNALPHA: string = "BTNALPHA_";
	/**音乐大小 */
	private static MUSICSIZE: string = "MUSICSIZE_";
	/**音乐开关 */
	private static ISMUSIC: string = "ISMUSIC_";
	/**音效大小 */
	private static SOUNDSIZE: string = "SOUNDSIZE_";
	/**音效开关 */
	private static ISSOUND: string = "ISSOUND_";
	/**画质 */
	private static QUALITY: string = "QUALITY_";
	/**游戏公告 */
	private static NOTICE: string = "NOTICE_";


	public static setData(key: string, data: any): void {
		egret.localStorage.setItem(key, data);
	}

	public static getData(key: string): any {
		var data: any;
		data = egret.localStorage.getItem(key);
		return data ? data : '';
	}

	public static removeData(key: string) {
		egret.localStorage.removeItem(key);
	}
	/**账号id */
	public static setOpenId(openId: any): void {
		this.setData(this.OPEN_ID, openId);
	}

	public static getOpenId(): any {
		var opend_id = this.getData(this.OPEN_ID);
		this.setData(this.OPEN_ID, opend_id);
		return opend_id;
	}
	/**服务器id */
	public static getServerId(): any {
		var server_id = this.getData(this.SERVER_ID) || 1;
		this.setData(this.SERVER_ID, server_id);
		return server_id;
	}
	/**设置玩家名字 */
	public static setPlayerName(playerName: string): void {
		this.setData(this.PLAYER_NAME + LocalData.getOpenId(), playerName);
	}
	/**获取玩家名字 */
	public static getPlayerName(): any {
		let playerName = this.getData(this.PLAYER_NAME + LocalData.getOpenId());
		if (!playerName) {
			let lists: Dictionary<RobotNameConfig> = Config.getConfig(RobotNameConfig);
			let obj: RobotNameConfig = lists.get('id');
			let playerName: any = obj.name;
		}
		this.setData(this.PLAYER_NAME + LocalData.getOpenId(), playerName);
		return playerName;
	}
	/**设置头像id */
	public static setFaceId(faceId: string): void {
		this.setData(this.FACE_ID + LocalData.getOpenId(), faceId);
	}
	/**获取头像id */
	public static getFaceId(): any {

		let faceId = this.getData(this.FACE_ID + LocalData.getOpenId());
		if (!faceId) {
			// faceId = (<HeadConfig>CC.HeadConfig.getARandomData()).id;
			// let lists: Dictionary<HeadConfig> = Config.getConfig(HeadConfig);
			// let obj: HeadConfig = lists.get('id');
			// let faceId: any = obj.id;
		}
		this.setData(this.FACE_ID + LocalData.getOpenId(), faceId);
		return faceId;
	}
	/**设置初始教学 */
	public static setPCKeyboard(isKey: string) {
		this.setData(this.ISPCKEYBOARD + LocalData.getOpenId(), isKey);
	}
	/**获取初始教学 */
	public static getPCKeyboard(): any {
		let isKey = this.getData(this.ISPCKEYBOARD + LocalData.getOpenId()) || LocalDataType.LOCALTYPETRUE;
		this.setData(this.ISPCKEYBOARD + LocalData.getOpenId(), isKey);
		return isKey;
	}
	/**设置初始指引 */
	public static setGuidance(isKey: string) {
		this.setData(this.ISGUIDANCE + LocalData.getOpenId(), isKey);
	}
	/**获取初始指引 */
	public static getGuidance(): any {
		let isKey = this.getData(this.ISGUIDANCE + LocalData.getOpenId()) || LocalDataType.LOCALTYPETRUE;
		this.setData(this.ISGUIDANCE + LocalData.getOpenId(), isKey);
		return isKey;
	}
	/**获取第一技能按钮位置 */
	public static getBtnPointFirst(): string {
		let point = this.getData(this.BTNPOINTFIRST + LocalData.getOpenId()) || "134,130";
		this.setData(this.BTNPOINTFIRST + LocalData.getOpenId(), point);
		return point;
	}
	/**设置第一技能按钮位置 */
	public static setBtnPointFirst(point: string) {
		this.setData(this.BTNPOINTFIRST + LocalData.getOpenId(), point);
	}
	/**获取第二技能按钮位置 */
	public static getBtnPointSecond(): string {
		let point = this.getData(this.BTNPOINTSECOND + LocalData.getOpenId()) || "304,130";
		this.setData(this.BTNPOINTSECOND + LocalData.getOpenId(), point);
		return point;
	}
	/**设置第二技能按钮位置 */
	public static setBtnPointSecond(point: string) {
		this.setData(this.BTNPOINTSECOND + LocalData.getOpenId(), point);
	}
	/**获取第一按钮大小 */
	public static getBtnScaleFirst(): string {
		let scale = this.getData(this.BTNSCALEFIRST + LocalData.getOpenId()) || "0.85";
		this.setData(this.BTNSCALEFIRST + LocalData.getOpenId(), scale);
		return scale;

	}
	/**设置第一按钮大小 */
	public static setBtnScaleFirst(scale: string) {
		this.setData(this.BTNSCALEFIRST + LocalData.getOpenId(), scale);
	}
	/**获取第二按钮大小 */
	public static getBtnScaleSecond(): string {
		let scale = this.getData(this.BTNSCALESECOND + LocalData.getOpenId()) || "0.85";
		this.setData(this.BTNSCALESECOND + LocalData.getOpenId(), scale);
		return scale;
	}
	/**设置第二按钮大小 */
	public static setBtnScaleSecond(scale: string) {
		this.setData(this.BTNSCALESECOND + LocalData.getOpenId(), scale);
	}

	/**获取按钮透明度 */
	public static getBtnAlpha(): string {
		let alpha = this.getData(this.BTNALPHA + LocalData.getOpenId()) || "1";
		this.setData(this.BTNALPHA + LocalData.getOpenId(), alpha);
		return alpha;
	}
	/**设置按钮透明度 */
	public static setBtnAlpha(alpha: string) {
		this.setData(this.BTNALPHA + LocalData.getOpenId(), alpha);
	}

	/**获取音乐大小 */
	public static getMusicSize(): string {
		let musicSize = this.getData(this.MUSICSIZE + LocalData.getOpenId()) || "5";
		this.setData(this.MUSICSIZE + LocalData.getOpenId(), musicSize);
		return musicSize;
	}
	/**设置音乐大小 */
	public static setMusicSize(musicSize: string) {
		this.setData(this.MUSICSIZE + LocalData.getOpenId(), musicSize);
	}
	/**获取音乐开关 */
	public static getIsMusic(): string {
		let isMusic = this.getData(this.ISMUSIC + LocalData.getOpenId()) || "1";
		this.setData(this.ISMUSIC + LocalData.getOpenId(), isMusic);
		return isMusic;
	}
	/**设置音乐开关 */
	public static setIsMusic(isMusic: string) {
		this.setData(this.ISMUSIC + LocalData.getOpenId(), isMusic);
	}
	/**获取音效大小 */
	public static getSoundSize(): string {
		let soundSize = this.getData(this.SOUNDSIZE + LocalData.getOpenId()) || "5";
		this.setData(this.SOUNDSIZE + LocalData.getOpenId(), soundSize);
		return soundSize;
	}
	/**设置音效大小 */
	public static setSoundSize(soundSize: string) {
		this.setData(this.SOUNDSIZE + LocalData.getOpenId(), soundSize);
	}
	/**获取音效开关 */
	public static getIsSound(): string {
		let isSound = this.getData(this.ISSOUND + LocalData.getOpenId()) || "1";
		this.setData(this.ISSOUND + LocalData.getOpenId(), isSound);
		return isSound;
	}
	/**设置音效开关 */
	public static setIsSound(isSound: string) {
		this.setData(this.ISSOUND + LocalData.getOpenId(), isSound);
	}
	/**获取画质 */
	public static getQuality(): string {
		let quality = this.getData(this.QUALITY + LocalData.getOpenId()) || "3";
		this.setData(this.QUALITY + LocalData.getOpenId(), quality);
		return quality;
	}
	/**设置画质 */
	public static setQuality(quality: string) {
		this.setData(this.QUALITY + LocalData.getOpenId(), quality);
	}
	/**获取公告开关 */
	public static getNotice(): string {
		let notice = this.getData(this.NOTICE) || "";
		this.setData(this.NOTICE, notice);
		return notice;
	}
	/**设置公告开关 */
	public static setNotice(notice: string) {
		this.setData(this.NOTICE, notice);
	}
}