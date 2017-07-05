var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com_main;
(function (com_main) {
    /**
     * 声音控制
     */
    var SoundUtils = (function () {
        function SoundUtils() {
            this.m_BGMVolume = 1;
            this.m_effectVolume = 1;
            this.m_sounds = {};
            this.m_channels = {};
            this.m_callbacks = {};
            this.m_playChannel = {};
            this.m_soundGroups = {};
            this.m_soundGroups[egret.Sound.EFFECT] = [];
            this.m_soundGroups[egret.Sound.MUSIC] = [];
            var value = egret.localStorage.getItem('soundEffect');
            if (value) {
                this.m_effectVolume = parseInt(value);
            }
            value = egret.localStorage.getItem('soundBGM');
            if (value) {
                this.m_BGMVolume = parseInt(value);
            }
        }
        Object.defineProperty(SoundUtils.prototype, "playerId", {
            set: function (id) {
                this.m_playerId = id;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 玩家id值相同的才播放音效
         * @param soundID   声音ID
         * @param playerID  玩家的id
         */
        SoundUtils.prototype.playSoundById = function (soundID, playerID) {
            if (playerID == this.m_playerId) {
                this.playSound(soundID);
            }
        };
        /**
         * @language zh_CN
         * @param id 声音ID
         * @param loops 播放次数，默认值是 1，循环播放。 大于 0 为播放次数，如 1 为播放 1 次；小于等于 0，为循环播放。
         * @param onPlayComplete: () => void 播放完毕回调函数
         * @version Egret 2.4
         */
        SoundUtils.prototype.playSound = function (id, loop, onPlayComplete) {
            if (loop === void 0) { loop = 1; }
            // let config: SoundConfig = CC.SoundConfig.getValBykey(parseInt(id));
            var config;
            if (config) {
                this.stopSound(config.coverKey.toString());
            }
            else {
                Log("ID\u4E3A" + id + "\u7684\u97F3\u6548\u5728SoundConfig\u4E2D\u4E0D\u5B58\u5728");
                return;
            }
            var sound = this.m_sounds[id];
            if (!sound) {
                sound = RES.getRes(config.soundName);
                sound.type = config.soundType == 0 ? egret.Sound.EFFECT : egret.Sound.MUSIC;
                this.m_sounds[id] = sound;
                this.m_soundGroups[sound.type].push(sound);
            }
            if (sound) {
                this.m_playChannel[config.coverKey.toString()] = sound;
                sound['cover'] = config.coverKey.toString();
                var channel = void 0;
                try {
                    channel = sound.play(0, loop);
                }
                catch (e) {
                    Log("ID\u4E3A" + id + "\u7684\u97F3\u4E50\u64AD\u653E\u5931\u8D25");
                    delete this.m_playChannel[config.coverKey.toString()];
                    return;
                }
                channel['owner'] = sound;
                channel['maxCount'] = loop > 0 ? loop : Number.MAX_VALUE;
                channel['count'] = 0;
                if (sound.type == egret.Sound.EFFECT) {
                    channel.volume = this.m_effectVolume;
                }
                else {
                    channel.volume = this.m_BGMVolume;
                }
                if (onPlayComplete) {
                    this.m_callbacks[channel.hashCode.toString()] = onPlayComplete;
                }
                channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
                this.m_channels[sound.hashCode.toString()] = channel;
            }
            else {
                Log("\u540D\u79F0\u4E3A" + config.soundName + "\u7684\u97F3\u6548\u8D44\u6E90\u4E0D\u5B58\u5728");
                return;
            }
        };
        /**
         * 音乐播放完成
         */
        SoundUtils.prototype.onPlayComplete = function (event) {
            var channel = event.currentTarget;
            var callback = this.m_callbacks[channel.hashCode.toString()];
            if (callback) {
                callback();
            }
            channel['count']++;
            if (channel['count'] >= channel['maxCount']) {
                this.stop(channel['owner']);
            }
        };
        /**
         * 停止播放音乐
         * @param id 声音ID
         */
        SoundUtils.prototype.stopSoundByID = function (id) {
            var sound = this.m_sounds[id];
            if (sound) {
                this.stop(sound);
            }
        };
        /**
         * 停止播放音乐
         * @param type 声音类型
         */
        SoundUtils.prototype.stopSound = function (type) {
            var sound = this.m_playChannel[type];
            if (sound) {
                this.stop(sound);
            }
        };
        /**
         * 停止播放音乐
         */
        SoundUtils.prototype.stop = function (sound) {
            var channel = this.m_channels[sound.hashCode.toString()];
            if (channel) {
                try {
                    channel.stop();
                }
                catch (e) {
                    Log("\u505C\u6B62\u64AD\u653E\u97F3\u4E50\u5931\u8D25");
                }
                if (channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                    channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
                }
                delete this.m_callbacks[channel.hashCode.toString()];
                delete this.m_channels[sound.hashCode.toString()];
            }
            delete this.m_playChannel[sound['cover']];
        };
        /**
         * 设置背景音乐音量
         */
        SoundUtils.prototype.setBGMValume = function (volume) {
            egret.localStorage.setItem('soundBGM', volume.toString());
            this.m_BGMVolume = volume;
            var sounds = this.m_soundGroups[egret.Sound.MUSIC];
            for (var i = 0, iLen = sounds.length; i < iLen; i++) {
                var sound = sounds[i];
                if (sound) {
                    var channel = this.m_channels[sound.hashCode.toString()];
                    if (channel) {
                        try {
                            channel.volume = volume;
                        }
                        catch (e) {
                            Log("\u80CC\u666F\u97F3\u4E50\u97F3\u91CF\u8BBE\u7F6E\u5931\u8D25");
                        }
                    }
                }
            }
        };
        /**
         * 得到背景音乐音量
         */
        SoundUtils.prototype.getBGMValue = function () {
            return this.m_BGMVolume;
        };
        /**
         * 设置音效音量
         */
        SoundUtils.prototype.setEffectValume = function (volume) {
            egret.localStorage.setItem('soundEffect', volume.toString());
            this.m_effectVolume = volume;
            var sounds = this.m_soundGroups[egret.Sound.EFFECT];
            for (var i = 0, iLen = sounds.length; i < iLen; i++) {
                var sound = sounds[i];
                if (sound) {
                    var channel = this.m_channels[sound.hashCode.toString()];
                    if (channel) {
                        try {
                            channel.volume = volume;
                        }
                        catch (e) {
                            Log("\u97F3\u6548\u97F3\u91CF\u8BBE\u7F6E\u5931\u8D25");
                        }
                    }
                }
            }
        };
        /**
         * 得到音效音量
         */
        SoundUtils.prototype.getEffectValue = function () {
            return this.m_effectVolume;
        };
        SoundUtils.getInstance = function () {
            if (SoundUtils.s_instance == null) {
                SoundUtils.s_instance = new SoundUtils();
            }
            return SoundUtils.s_instance;
        };
        return SoundUtils;
    }());
    com_main.SoundUtils = SoundUtils;
    __reflect(SoundUtils.prototype, "com_main.SoundUtils");
})(com_main || (com_main = {}));
