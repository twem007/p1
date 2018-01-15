module core {
    /**
     * 声音控制
     */
    export class SoundUtils {
        /**
         * 声音字典
         */
        private m_sounds: Dictionary<egret.Sound>;
        /**
         * 音频字典
         */
        private m_channels: Dictionary<egret.SoundChannel>;
        /**
         * 当前播放音效字典
         */
        private m_curEffect: Dictionary<egret.Sound>;
        /**
         * 当前播放背景音乐字典
         */
        private m_curBGM: Dictionary<egret.Sound>;
        /**
         * 回调字典
         */
        private m_callbacks: Dictionary<() => void>;
        /**
         * 播放通道 同一通道音乐覆盖
         */
        private m_playChannel: Dictionary<egret.Sound>;

        private m_BGMVolume: number = 1;

        private m_effectVolume: number = 1;
        /**
         * 是否停止播放音乐
         */
        private m_isStop: boolean = false;

        private static s_instance: SoundUtils;

        public constructor() {
            this.m_sounds = new Dictionary<egret.Sound>();
            this.m_channels = new Dictionary<egret.SoundChannel>();
            this.m_curBGM = new Dictionary<egret.Sound>();
            this.m_curEffect = new Dictionary<egret.Sound>();
            this.m_callbacks = new Dictionary<() => void>();
            this.m_playChannel = new Dictionary<egret.Sound>();
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
            let config: SoundConfig = Config.getConfig(SoundConfig).get(id);
            if (config) {
                this.stopSound(config.coverKey);
            } else {
                egret.log(`ID为${id}的音效在SoundConfig中不存在`);
                return;
            }
            let sound: egret.Sound = this.m_sounds.get(id);
            if (!sound) {
                sound = RES.getRes(config.soundName);
                if (sound) {
                    sound.type = config.soundType == 0 ? egret.Sound.EFFECT : egret.Sound.MUSIC;
                    this.m_sounds.add(id, sound);
                }
            }
            if (sound) {
                if (sound.type == egret.Sound.EFFECT) {
                    this.m_curEffect.add(id, sound);
                } else {
                    this.m_curBGM.add(id, sound);
                }
                if (this.m_isStop) {
                    return;
                }
                this.m_playChannel.add(config.coverKey, sound);
                sound['cover'] = config.coverKey;
                let channel: egret.SoundChannel;
                try {
                    channel = sound.play(0, loop);
                } catch (e) {
                    egret.log(`ID为${id}的音乐播放失败`);
                    this.m_playChannel.remove(config.coverKey);
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
                    this.m_callbacks.add(channel.hashCode, onPlayComplete);
                }
                channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
                this.m_channels.add(sound.hashCode, channel);
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
            let callback: () => void = this.m_callbacks.get(channel.hashCode);
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
        public stopSoundByID(id: number): void {
            let sound: egret.Sound = this.m_sounds.get(id);
            if (sound) {
                this.stop(sound);
            }
        }
        /**
         * 停止播放所有音乐及音效
         */
        public stopAllSound(): void {
            //停止所有音效
            let sounds: egret.Sound[] = this.m_curEffect.values;
            for (let i: number = 0, iLen: number = sounds.length; i < iLen; i++) {
                let sound: egret.Sound = sounds[i];
                if (sound) {
                    this.stop(sound);
                }
            }
            //停止所有背景音乐
            sounds = this.m_curBGM.values;
            for (let i: number = 0, iLen: number = sounds.length; i < iLen; i++) {
                let sound: egret.Sound = sounds[i];
                if (sound) {
                    this.stop(sound);
                }
            }
        }
        /**
         * 停止音乐通道播放
         * @param coverChannel 音乐通道
         */
        private stopSound(coverChannel: number): void {
            let sound: egret.Sound = this.m_playChannel.get(coverChannel);
            if (sound) {
                this.stop(sound);
            }
        }
        /**
         * 停止播放音乐
         */
        private stop(sound: egret.Sound): void {
            let channel: egret.SoundChannel = this.m_channels.get(sound.hashCode);
            if (channel) {
                try {
                    channel.stop();
                } catch (e) {
                    egret.log(`停止播放音乐失败`);
                }
                if (channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                    channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
                }
                this.m_callbacks.remove(channel.hashCode);
                this.m_channels.remove(sound.hashCode);
            }
            this.m_playChannel.remove(sound['cover']);
            if (sound.type == egret.Sound.EFFECT) {
                this.m_curEffect.remove(this.m_sounds.getKeyByValue(sound));
            } else {
                this.m_curBGM.remove(this.m_sounds.getKeyByValue(sound));
            }
        }
        /**
         * 设置背景音乐音量
         */
        public setBGMValume(volume: number): void {
            egret.localStorage.setItem('soundBGM', volume.toString());
            this.m_BGMVolume = volume;
            let sounds: egret.Sound[] = this.m_curBGM.values;
            for (let i: number = 0, iLen: number = sounds.length; i < iLen; i++) {
                let sound: egret.Sound = sounds[i];
                if (sound) {
                    let channel: egret.SoundChannel = this.m_channels.get(sound.hashCode);
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
            let sounds: egret.Sound[] = this.m_curEffect.values;
            for (let i: number = 0, iLen: number = sounds.length; i < iLen; i++) {
                let sound: egret.Sound = sounds[i];
                if (sound) {
                    let channel: egret.SoundChannel = this.m_channels.get(sound.hashCode);
                    if (channel) {
                        try {
                            channel.volume = volume;
                        } catch (e) {
                            egret.log(`音效音量设置失败`)
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