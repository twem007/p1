
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"libs/modules/dragonBones/dragonBones.js",
	"thirdparty/protobuf/bin/protobuf/protobuf.js",
	"thirdparty/jszip/bin/jszip/jszip.js",
	"polyfill/promise.js",
	"bin-debug/game/components/BaseData.js",
	"bin-debug/core/data/Callback.js",
	"bin-debug/core/com/EUILayer.js",
	"bin-debug/core/com/Layer.js",
	"bin-debug/core/Control.js",
	"bin-debug/core/com/Component.js",
	"bin-debug/core/com/EUIComponent.js",
	"bin-debug/core/event/EventData.js",
	"bin-debug/core/interfaces/ILoadingUI.js",
	"bin-debug/game/components/role/RoleData.js",
	"bin-debug/game/components/mode/GameModeData.js",
	"bin-debug/core/data/Dictionary.js",
	"bin-debug/game/components/map/data/MapTilesetData.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/core/event/EventID.js",
	"bin-debug/core/event/KeyboardEventData.js",
	"bin-debug/core/event/ModuleEventData.js",
	"bin-debug/core/EventCenter.js",
	"bin-debug/core/FrameEventCenter.js",
	"bin-debug/core/InputManager.js",
	"bin-debug/core/interfaces/IComponent.js",
	"bin-debug/core/interfaces/IFactory.js",
	"bin-debug/core/Core.js",
	"bin-debug/core/interfaces/IMessage.js",
	"bin-debug/core/LayerCenter.js",
	"bin-debug/core/LoadingManager.js",
	"bin-debug/core/net/ByteBuffer.js",
	"bin-debug/core/net/HttpAPI.js",
	"bin-debug/core/net/MessageData.js",
	"bin-debug/core/net/ProtoFactory.js",
	"bin-debug/core/net/SocketAPI.js",
	"bin-debug/core/TimerManager.js",
	"bin-debug/core/utils/Base64.js",
	"bin-debug/core/utils/CachePool.js",
	"bin-debug/core/utils/DateUtils.js",
	"bin-debug/core/utils/DBFactory.js",
	"bin-debug/core/utils/DebugUtils.js",
	"bin-debug/core/utils/Long.js",
	"bin-debug/core/utils/MathUtils.js",
	"bin-debug/core/utils/MCFactory.js",
	"bin-debug/core/utils/MD5.js",
	"bin-debug/core/utils/PlatUtils.js",
	"bin-debug/core/utils/ResUtils.js",
	"bin-debug/core/utils/TextUtils.js",
	"bin-debug/core/utils/WebUtils.js",
	"bin-debug/core/utils/XMLUtils.js",
	"bin-debug/core/data/Node.js",
	"bin-debug/game/components/map/data/MapData.js",
	"bin-debug/game/components/map/data/MapLayerData.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/game/components/map/enum/MapDecorationEnum.js",
	"bin-debug/game/components/map/enum/MapLayerEnum.js",
	"bin-debug/game/components/map/enum/MapObstacleType.js",
	"bin-debug/game/components/map/enum/MapTileEnum.js",
	"bin-debug/game/components/map/Map.js",
	"bin-debug/game/components/map/MapManager.js",
	"bin-debug/game/components/map/MapSetting.js",
	"bin-debug/game/components/map/tile/TileCover.js",
	"bin-debug/game/components/map/tile/TileLayer.js",
	"bin-debug/game/components/map/tile/TileObject.js",
	"bin-debug/game/components/mode/exercise/ExerciseMode.js",
	"bin-debug/game/components/mode/exercise/ExerciseModeData.js",
	"bin-debug/game/components/mode/exercise/proxy/ExerciseProxy.js",
	"bin-debug/core/data/NodeList.js",
	"bin-debug/game/components/mode/GameModeManager.js",
	"bin-debug/game/components/mode/GameTypeEnum.js",
	"bin-debug/game/components/mode/IGameMode.js",
	"bin-debug/game/components/role/PlayerData.js",
	"bin-debug/game/components/role/Role.js",
	"bin-debug/core/enum/Keyboard.js",
	"bin-debug/game/components/role/RoleManager.js",
	"bin-debug/game/controllers/GameController.js",
	"bin-debug/game/controllers/LoginController.js",
	"bin-debug/game/controllers/MainController.js",
	"bin-debug/game/enums/LayerEnum.js",
	"bin-debug/game/enums/ModuleEnum.js",
	"bin-debug/game/keyBoard/KeyBoardManager.js",
	"bin-debug/game/uimanager/UIManager.js",
	"bin-debug/game/utils/ButtonManager.js",
	"bin-debug/game/utils/config/Config.js",
	"bin-debug/game/utils/config/ConfigBase.js",
	"bin-debug/game/utils/LocalData.js",
	"bin-debug/game/utils/SoundUtils.js",
	"bin-debug/game/utils/Utils.js",
	"bin-debug/game/views/component/Currency.js",
	"bin-debug/game/views/component/EntranceBtn.js",
	"bin-debug/game/views/component/LinkDelay.js",
	"bin-debug/game/views/component/ModleBtn.js",
	"bin-debug/game/views/component/SkillBtn.js",
	"bin-debug/game/views/enum/InputType.js",
	"bin-debug/game/views/hint/LinkHintView.js",
	"bin-debug/game/views/loading/MainLoadingUI.js",
	"bin-debug/game/views/loading/PreLoadingUI.js",
	"bin-debug/game/views/login/LoginUI.js",
	"bin-debug/game/views/main/MainPlayerFace.js",
	"bin-debug/game/views/main/MainUI.js",
	"bin-debug/Main.js",
	"bin-debug/core/com/Animation.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "fixedWide",
		contentWidth: 1334,
		contentHeight: 750,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};