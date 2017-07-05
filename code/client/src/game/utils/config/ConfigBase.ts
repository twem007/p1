class FunctionControlConfig{
	public id:number;
	public ifExist:number;
	public openType:number;
	public openCondition:number;

	public attrs(){
		return ['id','ifExist','openType','openCondition'];
	}
}

class GameItemsConfig{
	public id:number;
	public name:string;
	public types:number;
	public subtype:number;
	public synthesis:number;
	public synsell:number;
	public sell:number;
	public resourcesId:number;
	public stage:number;
	public explanation:string;
	public accessRoute:string;
	public iconName:string;
	public fileName:string;

	public attrs(){
		return ['id','name','types','subtype','synthesis','synsell','sell','resourcesId','stage','explanation','accessRoute','iconName','fileName'];
	}
}

class TipsConfig{
	public id:number;
	public tipsContent:string;

	public attrs(){
		return ['id','tipsContent'];
	}
}

class SynthesisConfig{
	public endItemsId:number;
	public endItems:string;
	public itemsId:number;
	public name:string;
	public number:number;

	public attrs(){
		return ['endItemsId','endItems','itemsId','name','number'];
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

class UpgradeExperienceConfig{
	public level:number;
	public exp:number;
	public littleExp:number;
	public littlePoints:number;
	public bigExp:number;
	public bigPoints:number;
	public speed:number;
	public fastSpeed:number;
	public quicken:number;
	public speedTime:number;
	public throughWallTime:number;
	public zoomRatio:number;
	public crazyZoomRatio:number;
	public horizontal_lattice_number:number;

	public attrs(){
		return ['level','exp','littleExp','littlePoints','bigExp','bigPoints','speed','fastSpeed','quicken','speedTime','throughWallTime','zoomRatio','crazyZoomRatio','horizontal_lattice_number'];
	}
}

class ChestConfig{
	public id:number;
	public name:string;
	public types:number;
	public unlockTime:number;
	public maxGet:number;
	public correspondLevel:number;
	public modulus1:string;
	public modulus2:string;
	public modulus3:string;
	public minPeople:number;
	public GetItems:string;
	public icon:string;
	public show:string;

	public attrs(){
		return ['id','name','types','unlockTime','maxGet','correspondLevel','modulus1','modulus2','modulus3','minPeople','GetItems','icon','show'];
	}
}

class EmojiAnimationConfig{
	public id:number;
	public name:string;
	public fileName:string;

	public attrs(){
		return ['id','name','fileName'];
	}
}

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

class FamilyExperienceConfig{
	public level:number;
	public exp:number;
	public number:number;
	public maxNumber:number;
	public eachGet:number;

	public attrs(){
		return ['level','exp','number','maxNumber','eachGet'];
	}
}

class MallLevelConfig{
	public mallLevel:number;
	public mallExp:number;

	public attrs(){
		return ['mallLevel','mallExp'];
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

class BoomSystemConfig{
	public parameterField:string;
	public parameter:number;
	public description:string;

	public attrs(){
		return ['parameterField','parameter','description'];
	}
}

class MapSelectionConfig{
	public id:number;
	public mapId:string;
	public mapPro:string;
	public maxPeople:number;
	public aiCfgId:string;
	public aiCount:string;

	public attrs(){
		return ['id','mapId','mapPro','maxPeople','aiCfgId','aiCount'];
	}
}

class MallConfig{
	public id:number;
	public name:string;
	public explanation:number;
	public number:number;
	public currencyTypes:number;
	public price:number;
	public position:number;
	public sale:number;
	public types:number;
	public unlockCondition:number;
	public getDescription:string;
	public score:number;
	public discount:number;
	public logo:number;

	public attrs(){
		return ['id','name','explanation','number','currencyTypes','price','position','sale','types','unlockCondition','getDescription','score','discount','logo'];
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

class ActivityConfig{
	public id:number;
	public name:string;
	public type:number;
	public reward:string;
	public startTime:string;
	public endTime:string;

	public attrs(){
		return ['id','name','type','reward','startTime','endTime'];
	}
}

class InitialItemConfig{
	public id:number;
	public itemsId:number;
	public name:string;
	public number:number;
	public whetherEquipped:number;

	public attrs(){
		return ['id','itemsId','name','number','whetherEquipped'];
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

class ScreenSettingsConfig{
	public id:number;
	public low:number;
	public middle:number;
	public high:number;

	public attrs(){
		return ['id','low','middle','high'];
	}
}

class FamilyTasksConfig{
	public id:number;
	public name:string;
	public description:string;
	public condition:string;
	public types:number;
	public sorting:number;
	public jump:string;
	public imgName:string;

	public attrs(){
		return ['id','name','description','condition','types','sorting','jump','imgName'];
	}
}

class RoomMatchConfig{
	public id:number;
	public roomGroup:string;

	public attrs(){
		return ['id','roomGroup'];
	}
}

class GiftConfig{
	public ItemsId:number;
	public name:string;
	public GetItems:string;
	public IfProclamation:string;
	public proclamation:string;

	public attrs(){
		return ['ItemsId','name','GetItems','IfProclamation','proclamation'];
	}
}

class ItemsConfig{
	public id:number;
	public name:string;
	public types:number;
	public subtype:number;
	public skillId:number;
	public explanation:string;

	public attrs(){
		return ['id','name','types','subtype','skillId','explanation'];
	}
}

class BirthPointRuleConfig{
	public id:number;
	public birthPlace:string;
	public lateralOffset:number;
	public verticalOffset:number;
	public mapId:number;
	public camp:number;

	public attrs(){
		return ['id','birthPlace','lateralOffset','verticalOffset','mapId','camp'];
	}
}

class ZoningConfig{
	public id:number;
	public areaOrigin:string;
	public lateralOffset:number;
	public verticalOffset:number;
	public areaNum:number;
	public mapId:number;

	public attrs(){
		return ['id','areaOrigin','lateralOffset','verticalOffset','areaNum','mapId'];
	}
}

class AiBehaviorConfig{
	public id:number;
	public warningRange:number;
	public searchRange:number;
	public pursuitRange:number;
	public skill_1Range:number;
	public skill_2Range:number;
	public searchRate:number;
	public targetLevelRange:number;

	public attrs(){
		return ['id','warningRange','searchRange','pursuitRange','skill_1Range','skill_2Range','searchRate','targetLevelRange'];
	}
}

class HeadConfig{
	public id:number;
	public emojiID:number;
	public sequence:string;
	public name:string;
	public fileName:string;

	public attrs(){
		return ['id','emojiID','sequence','name','fileName'];
	}
}

class WanBaGiftConfig{
	public Id:number;
	public ItemsId:number;
	public name:string;

	public attrs(){
		return ['Id','ItemsId','name'];
	}
}

class GemSoundConfig{
	public id:number;
	public tips:string;
	public soundId:string;

	public attrs(){
		return ['id','tips','soundId'];
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

class SystemParametersConfig{
	public parameterField:string;
	public parameter:number;

	public attrs(){
		return ['parameterField','parameter'];
	}
}

class QuestionnaireConfig{
	public id:number;
	public topicContent:string;
	public option1:string;
	public option2:string;
	public option3:string;
	public option4:string;
	public type:number;

	public attrs(){
		return ['id','topicContent','option1','option2','option3','option4','type'];
	}
}

class TransformationPropsCoordinatesConfig{
	public id:number;
	public transfigurationProps:string;
	public lateralOffset:number;
	public verticalOffset:number;
	public initialTime:number;
	public refreshInterval:number;
	public proGet:string;
	public maxNum:number;
	public areaNum:number;
	public mapId:number;

	public attrs(){
		return ['id','transfigurationProps','lateralOffset','verticalOffset','initialTime','refreshInterval','proGet','maxNum','areaNum','mapId'];
	}
}

class RobotNameConfig{
	public id:number;
	public name:string;

	public attrs(){
		return ['id','name'];
	}
}

class SkillConfig{
	public id:number;
	public name:string;
	public startTime:number;
	public coolTime:number;
	public costExp:number;
	public reduceCd:number;
	public skillDuration:number;
	public skillEffect:string;
	public icon:string;
	public failTips:string;

	public attrs(){
		return ['id','name','startTime','coolTime','costExp','reduceCd','skillDuration','skillEffect','icon','failTips'];
	}
}

class QualifyingConfig{
	public Id:number;
	public name:string;
	public promotionAward:string;
	public relegationAward:string;
	public downgradeAward:string;
	public promotionNum:number;
	public relegationNum:number;
	public downgradeNum:number;
	public maxNum:number;
	public minScores:number;
	public maxScores:number;

	public attrs(){
		return ['Id','name','promotionAward','relegationAward','downgradeAward','promotionNum','relegationNum','downgradeNum','maxNum','minScores','maxScores'];
	}
}

class BroadcastConfig{
	public id:number;
	public useScene:string;
	public promptContent:string;
	public promptType:number;

	public attrs(){
		return ['id','useScene','promptContent','promptType'];
	}
}

