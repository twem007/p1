module core {
    /**
     * 声音控制
     */
    export class SoundUtils {
        /**
         * 玩家id
         */
        private m_playerId: number;
        /**
         * 声音字典
         */
        private m_sounds: {};
        /**
         * 声音类型组 0:音效组 1:背景音乐组 
         */
        private m_soundGroups: {};
        /**
         * 音频字典
         */
        private m_channels: {};
        /**
         * 回调字典
         */
        private m_callbacks: {};
        /**
         * 播放通道 同一通道音乐覆盖
         */
        private m_playChannel: {};

        private m_BGMVolume: number = 1;

        private m_effectVolume: number = 1;

        private static s_instance: SoundUtils;

        public constructor() {
            this.m_sounds = {};
            this.m_channels = {};
            this.m_callbacks = {};
            this.m_playChannel = {};
            this.m_soundGroups = {};
            this.m_soundGroups[egret.Sound.EFFECT] = [];
            this.m_soundGroups[egret.Sound.MUSIC] = [];
            let value: string = egret.localStorage.getItem('soundEffect');
            if (value) {
                this.m_effectVolume = parseInt(value);
            }
            value = egret.localStorage.getItem('soundBGM');
            if (value) {
                this.m_BGMVolume = parseInt(value);
            }
        }

        /**
         * @language zh_CN
         * @param id 声音ID
         * @param loops 播放次数，默认值是 1，循环播放。 大于 0 为播放次数，如 1 为播放 1 次；小于等于 0，为循环播放。
         * @param onPlayComplete: () => void 播放完毕回调函数
         * @version Egret 2.4
         */
        public playSound(id: number, loop: number = 1, onPlayComplete?: () => void): void {
            let config: SoundConfig = core.Config.getConfig(SoundConfig).get(id);
            if (config) {
                this.stopSound(config.coverKey.toString());
            } else {
                egret.log(`ID为${id}的音效在SoundConfig中不存在`);
                return;
            }
            let sound: egret.Sound = this.m_sounds[id];
            if (!sound) {
                sound = RES.getRes(config.soundName);
                if (sound) {
                    sound.type = config.soundType == 0 ? egret.Sound.EFFECT : egret.Sound.MUSIC;
                    this.m_sounds[id] = sound;
                    this.m_soundGroups[sound.type].push(sound);
                }
            }
            if (sound) {
                this.m_playChannel[config.coverKey.toString()] = sound;
                sound['cover'] = config.coverKey.toString();
                let channel: egret.SoundChannel;
                try {
                    channel = sound.play(0, loop);
                } catch (e) {
                    egret.log(`ID为${id}的音乐播放失败`);
                    delete this.m_playChannel[config.coverKey.toString()];
                    return;
                }
                channel['owner'] = sound;
                channel['maxCount'] = loop > 0 ? loop : Number.MAX_VALUE;
                channel['count'] = 0;
                if (sound.type == egret.Sound.EFFECT) {
                    channel.volume = this.m_effectVolume;
                } else {
                    channel.volume = this.m_BGMVolume;
                }
                if (onPlayComplete) {
                    this.m_callbacks[channel.hashCode.toString()] = onPlayComplete;
                }
                channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
                this.m_channels[sound.hashCode.toString()] = channel;
            } else {
                egret.log(`名称为${config.soundName}的音效资源不存在`);
                return;
            }
        }
        /**
         * 音乐播放完成
         */
        private onPlayComplete(event: egret.Event): void {
            let channel: egret.SoundChannel = event.currentTarget;
            let callback: () => void = this.m_callbacks[channel.hashCode.toString()];
            if (callback) {
                callback();
            }
            channel['count']++;
            if (channel['count'] >= channel['maxCount']) {
                this.stop(channel['owner']);
            }
        }
        /**
         * 停止播放音乐
         * @param id 声音ID
         */
        public stopSoundByID(id: string): void {
            let sound: egret.Sound = this.m_sounds[id];
            if (sound) {
                this.stop(sound);
            }
        }
        /**
         * 停止播放音乐
         * @param type 声音类型
         */
        private stopSound(type: string): void {
            let sound: egret.Sound = this.m_playChannel[type];
            if (sound) {
                this.stop(sound);
            }
        }
        /**
         * 停止播放音乐
         */
        private stop(sound: egret.Sound): void {
            let channel: egret.SoundChannel = this.m_channels[sound.hashCode.toString()];
            if (channel) {
                try {
                    channel.stop();
                } catch (e) {
                    egret.log(`停止播放音乐失败`);
                }
                if (channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                    channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
                }
                delete this.m_callbacks[channel.hashCode.toString()];
                delete this.m_channels[sound.hashCode.toString()];
            }
            delete this.m_playChannel[sound['cover']];
        }
        /**
         * 设置背景音乐音量
         */
        public setBGMValume(volume: number): void {
            egret.localStorage.setItem('soundBGM', volume.toString());
            this.m_BGMVolume = volume;
            let sounds: egret.Sound[] = this.m_soundGroups[egret.Sound.MUSIC];
            for (let i: number = 0, iLen: number = sounds.length; i < iLen; i++) {
                let sound: egret.Sound = sounds[i];
                if (sound) {
                    let channel: egret.SoundChannel = this.m_channels[sound.hashCode.toString()];
                    if (channel) {
                        try {
                            channel.volume = volume;
                        } catch (e) {
                            egret.log(`背景音乐音量设置失败`)
                        }
                    }
                }
            }
        }
        /**
         * 得到背景音乐音量
         */
        public getBGMValue(): number {
            return this.m_BGMVolume;
        }
        /**
         * 设置音效音量
         */
        public setEffectValume(volume: number): void {
            egret.localStorage.setItem('soundEffect', volume.toString());
            this.m_effectVolume = volume;
            let sounds: egret.Sound[] = this.m_soundGroups[egret.Sound.EFFECT];
            for (let i: number = 0, iLen: number = sounds.length; i < iLen; i++) {
                let sound: egret.Sound = sounds[i];
                if (sound) {
                    let channel: egret.SoundChannel = this.m_channels[sound.hashCode.toString()];
                    if (channel) {
                        try {
                            channel.volume = volume;
                        } catch (e) {
                            egret.log(`音效音量设置失败`);
                        }
                    }
                }
            }
        }
        /**
         * 得到音效音量
         */
        public getEffectValue(): number {
            return this.m_effectVolume;
        }

        public static getInstance(): SoundUtils {
            if (SoundUtils.s_instance == null) {
                SoundUtils.s_instance = new SoundUtils();
            }
            return SoundUtils.s_instance;
        }
    }
}