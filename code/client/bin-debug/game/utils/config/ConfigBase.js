var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BuffsConfig = (function () {
    function BuffsConfig() {
    }
    BuffsConfig.prototype.attrs = function () {
        return ['id', 'name', 'effect', 'ticktime', 'duration'];
    };
    return BuffsConfig;
}());
__reflect(BuffsConfig.prototype, "BuffsConfig");
var BombTypeConfig = (function () {
    function BombTypeConfig() {
    }
    BombTypeConfig.prototype.attrs = function () {
        return ['bombType', 'damage', 'range', 'name', 'fileName'];
    };
    return BombTypeConfig;
}());
__reflect(BombTypeConfig.prototype, "BombTypeConfig");
var RoleConfig = (function () {
    function RoleConfig() {
    }
    RoleConfig.prototype.attrs = function () {
        return ['id', 'bubble', 'bubbleMax', 'power', 'powerMax', 'move', 'moveMax', 'name', 'fileName'];
    };
    return RoleConfig;
}());
__reflect(RoleConfig.prototype, "RoleConfig");
var ErrorCodeConfig = (function () {
    function ErrorCodeConfig() {
    }
    ErrorCodeConfig.prototype.attrs = function () {
        return ['id', 'text', 'handlerType', 'handlerParams'];
    };
    return ErrorCodeConfig;
}());
__reflect(ErrorCodeConfig.prototype, "ErrorCodeConfig");
var MapCfgConfig = (function () {
    function MapCfgConfig() {
    }
    MapCfgConfig.prototype.attrs = function () {
        return ['id', 'cryMax', 'crySingleMax', 'cryTime', 'turnedMax', 'mapData', 'mapRes', 'bgRes', 'soundId'];
    };
    return MapCfgConfig;
}());
__reflect(MapCfgConfig.prototype, "MapCfgConfig");
var TipsConfig = (function () {
    function TipsConfig() {
    }
    TipsConfig.prototype.attrs = function () {
        return ['id', 'tipsContent'];
    };
    return TipsConfig;
}());
__reflect(TipsConfig.prototype, "TipsConfig");
var SystemParametersConfig = (function () {
    function SystemParametersConfig() {
    }
    SystemParametersConfig.prototype.attrs = function () {
        return ['parameterField', 'parameter'];
    };
    return SystemParametersConfig;
}());
__reflect(SystemParametersConfig.prototype, "SystemParametersConfig");
var BombMapItemConfig = (function () {
    function BombMapItemConfig() {
    }
    BombMapItemConfig.prototype.attrs = function () {
        return ['id', 'type', 'subtype', 'attrType', 'attrValue', 'buffId', 'name', 'fileName'];
    };
    return BombMapItemConfig;
}());
__reflect(BombMapItemConfig.prototype, "BombMapItemConfig");
var SoundConfig = (function () {
    function SoundConfig() {
    }
    SoundConfig.prototype.attrs = function () {
        return ['id', 'tips', 'soundName', 'coverKey', 'soundType'];
    };
    return SoundConfig;
}());
__reflect(SoundConfig.prototype, "SoundConfig");
var BoomSystemConfig = (function () {
    function BoomSystemConfig() {
    }
    BoomSystemConfig.prototype.attrs = function () {
        return ['parameterField', 'parameter', 'description'];
    };
    return BoomSystemConfig;
}());
__reflect(BoomSystemConfig.prototype, "BoomSystemConfig");
var RobotNameConfig = (function () {
    function RobotNameConfig() {
    }
    RobotNameConfig.prototype.attrs = function () {
        return ['id', 'name'];
    };
    return RobotNameConfig;
}());
__reflect(RobotNameConfig.prototype, "RobotNameConfig");
