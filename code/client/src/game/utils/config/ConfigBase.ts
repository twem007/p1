class BuffsConfig{
	public id:number;
	public name:string;
	public effect:string;
	public ticktime:number;
	public duration:number;

	public attrs(){
		return ['id','name','effect','ticktime','duration'];
	}
}

class BombTypeConfig{
	public bombType:number;
	public damage:number;
	public range:number;
	public name:string;
	public fileName:string;

	public attrs(){
		return ['bombType','damage','range','name','fileName'];
	}
}

class RoleConfig{
	public id:number;
	public bubble:number;
	public bubbleMax:number;
	public power:number;
	public powerMax:number;
	public move:number;
	public moveMax:number;
	public battleName:string;
	public battleFileName:string;
	public defBattleName:string;
	public defBattleFileName:string;

	public attrs(){
		return ['id','bubble','bubbleMax','power','powerMax','move','moveMax','battleName','battleFileName','defBattleName','defBattleFileName'];
	}
}

class ErrorCodeConfig{
	public id:number;
	public text:string;
	public handlerType:number;
	public handlerParams:string;

	public attrs(){
		return ['id','text','handlerType','handlerParams'];
	}
}

class MapCfgConfig{
	public id:number;
	public cryMax:number;
	public crySingleMax:number;
	public cryTime:number;
	public turnedMax:number;
	public mapData:string;
	public mapRes:string;
	public bgRes:string;
	public soundId:number;

	public attrs(){
		return ['id','cryMax','crySingleMax','cryTime','turnedMax','mapData','mapRes','bgRes','soundId'];
	}
}

class TipsConfig{
	public id:number;
	public tipsContent:string;

	public attrs(){
		return ['id','tipsContent'];
	}
}

class SystemParametersConfig{
	public parameterField:string;
	public parameter:number;

	public attrs(){
		return ['parameterField','parameter'];
	}
}

class BombMapItemConfig{
	public id:number;
	public type:number;
	public subtype:number;
	public attrType:number;
	public attrValue:number;
	public buffId:number;
	public name:string;
	public fileName:string;

	public attrs(){
		return ['id','type','subtype','attrType','attrValue','buffId','name','fileName'];
	}
}

class SoundConfig{
	public id:number;
	public tips:string;
	public soundName:string;
	public coverKey:number;
	public soundType:number;

	public attrs(){
		return ['id','tips','soundName','coverKey','soundType'];
	}
}

class BoomSystemConfig{
	public parameterField:string;
	public parameter:number;
	public description:string;

	public attrs(){
		return ['parameterField','parameter','description'];
	}
}

class RobotNameConfig{
	public id:number;
	public name:string;

	public attrs(){
		return ['id','name'];
	}
}

