class RobotNameConfig {
	/**
	 * 编号
	 **/
	public id:number;
	/**
	 * 名称
	 **/
	public name:string;
}
class SoundConfig {
	/**
	 * 物品ID
	 **/
	public id:number;
	/**
	 * 音乐说明
	 **/
	public tips:string;
	/**
	 * 音乐文件Key
	 **/
	public soundName:string;
	/**
	 * 覆盖规则，相同key可以覆盖
	 **/
	public coverKey:number;
	/**
	 * 类型（0是音效，1背景音乐)
	 **/
	public soundType:number;
}
