
/**龙骨角色管理 */
class DBCharacterMgr {

	private static _instance: DBCharacterMgr;
	public static getIns() {
		if (!this._instance) {
			this._instance = new DBCharacterMgr();
		}
		return this._instance;
	}


	private m_dbFactory = new dragonBones.EgretFactory;

	public constructor() {
		this.m_dbFactory = new dragonBones.EgretFactory();
	}


	public addDragonBoneRes(ske: string, tex_json: string, tex_png: string) {
		let skeData = this.m_dbFactory.parseDragonBonesData(RES.getRes(ske));
		let texData = this.m_dbFactory.parseTextureAtlasData(RES.getRes(tex_json), RES.getRes(tex_png));
		this.m_dbFactory.addDragonBonesData(skeData);
		this.m_dbFactory.addTextureAtlas(texData);
	}

	public createCharacter(armatureName: string) {
		let character: DBCharacter = DBCharacter.create(armatureName);
		return character;
	}

	public buildArmature(armatureName: string) {
		return this.m_dbFactory.buildArmature(armatureName);
	}

	public buildArmatureDisplay(armatureName: string) {
		return this.m_dbFactory.buildArmatureDisplay(armatureName);
	}

}