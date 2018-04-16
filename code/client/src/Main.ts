//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        core.Core.run(this.stage);
        core.LayerCenter.getInstance().addLayer(LayerEnum.BG, new core.Layer());
        core.LayerCenter.getInstance().addLayer(LayerEnum.UI, new core.EUILayer());
        core.LayerCenter.getInstance().addLayer(LayerEnum.POPUP, new core.Layer());
        core.LayerCenter.getInstance().addLayer(LayerEnum.LOADING, new core.EUILayer());
        core.LayerCenter.getInstance().addLayer(LayerEnum.TOP, new core.Layer());
        this.runGame().catch(e => {
            console.log(e);
        });
    }

    private async runGame() {
        core.LoadingManager.setCurLoading(LoadingUI).show();
        await this.loadResource()
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
        core.ResUtils.loadGroups(["preload"], this.onResourceProgress, this.onResourceLoadError, this.onResourceLoadComplete, this);
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    /**
     * 资源组加载进度
     */
    private onResourceProgress(data: core.GroupData): void {
        egret.log(`当前加载进度:${data.curGroup} ${data.curGroupLoaded}/${data.curGroupTotal}`);
        core.LoadingManager.getLoading(LoadingUI).setProgress(data);
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(data: core.GroupData): void {
        //TODO
        egret.log("Group:" + data.curGroup + " has failed to load");
    }
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(data: core.GroupData): void {
        if (data.curGroup == 'preload') {
            egret.log("Group:" + data.curGroup + " load complete");
            core.LoadingManager.getLoading(LoadingUI).hide();
            core.LoadingManager.setCurLoading(MainLoadingUI);
            core.Config.init(RES.getRes('config_zip'));
            this.initModule();
            UIManager.instance.closeModule(ModuleEnum.LOGIN);
        }
    }

    private initModule(): void {
        new GameModule();
        new LoginModule();
        new MainModule();
    }
}