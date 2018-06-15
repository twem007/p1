# 框架说明

[![Build Status](https://travis-ci.org/twem007/p1.svg?branch=master)](https://travis-ci.org/twem007/p1)


交流QQ群：65384669

 - [API文档][3]
 - [protobuf使用教程][2]

## 目录

 1. [框架定位](#框架定位)
 2. [框架初始化流程](#框架初始化流程)
 3. [模块进入流程](#模块进入流程)
 4. [模块退出流程](#模块退出流程)
 5. [文件结构](#文件结构)
 6. [君子约定](#君子约定)
 7. [Egret相关](#Egret相关)
 8. [待办事宜](#待办事宜)
 9. [代码示例](#代码示例)
 10. [Lisence](#Lisence)

## 框架定位：
> 「让做游戏变简单！」

本框架定位于简化游戏流程，提高团队开发效率，目前提供了管理模块间关系，处理底层事务，及松散的工具集合，使开发者专注于游戏本身的逻辑。

## 框架初始化流程：
<p align="center">
    <img src="./docs/imgs/frame.png">
</p>


## 模块进入流程：
<p align="center">
    <img src="./docs/imgs/module_enter.png">
</p>

## 模块退出流程：
<p align="center">
    <img src="./docs/imgs/module_exit.png">
</p>

## 文件结构：
+ src
    + core                              框架源代码目录
        + com
            + Animation.ts 				动画类
            + Component.ts				显示对象基类
            + EUIComponent.ts			EUI显示对象基类
            + EUILayer.ts				EUI显示层基类
            + Layer.ts					显示层基类
        + data
            + Callback.ts				回调函数对象
            + Dictionary.ts				字典对象
            + Node.ts					链表节点对象
            + NodeList.ts				链表对象
        + enum 
            + Keyboard.ts               键盘按键枚举
        + event
            + EventData.ts				事件数据基类
            + EventID.ts				事件ID类
            + KeyboardEventData.ts		键盘事件数据
            + ModuleEventData.ts		模块事件数据
        + interface
            + IComponent.ts		
            + IFactory.ts 		
            + ILoadingUI.ts
            + IMessage.ts
        + net
            + ByteBuffer.ts				二进制处理类
            + HttpAPI.ts				HTTP协议接口类
            + MessageData.ts			消息体封装
            + ProtoFactory.ts           ProtoBuff的二次封装
            + SocketAPI.ts				Websocket协议接口类
			+ SocketEventData.ts 		Websocket事件数据
        + utils
            + Base64.ts					Base64实现
            + CachePool.ts				对象池
            + DateUtils.ts				日期工具
            + DBFactory.ts				龙骨工具
            + DebugUtils.ts				调试工具
            + Long.ts					Long结构实现
            + MathUtils.ts				数学计算
            + MCFactory.ts				egret.MovieClip工具
            + MD5.ts					MD5实现
            + PlatUtils.ts				平台判断
            + ResUtils.ts				RES封装
            + SoundUtils.ts				egret.Sound封装
            + TextUtils.ts				文本处理工具
            + WebUtils.ts				web相关处理工具
            + XMLUtils.ts				XML相关处理
        + Control.ts					模块基类
        + Core.ts						框架入口
        + EventCenter.ts				事件管理类
        + FrameEventCenter.ts			帧循环管理类
        + InputManager.ts			    输入控制类
        + LayerCenter.ts				层管理类
        + LoadingManager.ts             Loading管理类
        + TimerManager.ts				Timer管理类
	+ unittest                          单元测试及使用示例目录
		+ UnitTest.ts 					单元测试入口
		+ WSTest.ts 					Websocket和Protobuf测试及使用示例
    + game                              游戏源代码目录
	+ AssetAdapter.ts
	+ ThemeAdapter.ts
	+ Main.ts
+ resource                              游戏资源目录
    + assets
    + skins
+ thirdparty                            第三方库目录
    + jszip
    + protobuf

## 君子约定：
1.  类文件及类名统一首字母大写，文件名不宜过长，尽量在单个文件内写一个类，只有当前类引用的类和枚举可以写在同一文件内
2.  资源文件统一小写
3.  给接口名称加上大写字母I做为前缀，表示该类型为接口类型
4.	成员变量以m_开头
5.	私有静态变量以s_开头
6.	临时变量以t_开头
7.  常量及枚举项所有单词大写

## Egret相关：
1.	通过FrameEventCenter替代帧循环监听
2.	通过TimerManager替代new Timer
3.	尽量用序列帧代替透明度渐变及遮罩实现的动画
4.	少用get、set语法糖，如需使用子类在调用父类的get、set需采用egret自身封装的方法
5.	图片资源尽量合并为大图
6.	文本文件采用zip压缩
7.	常用UI面板关闭时尽量缓存
8.	减少频繁的实例化，请使用对象池
9.	在适当的时候销毁实例化对象及Resource加载的资源
10.	根据变量的使用频率决定它是否为临时变量
11.	注意UI与逻辑分离，逻辑与数据分离，
12.	谨慎的选择需要使用的容器类型，显示类尽量从Component和EUIComponent继承

## 待办事宜：
- [X] 为进行中
- [ ] 为未开始
***********************************
- [X] 修复框架中的BUG
- [ ] 常用UI组件的开发

## 代码示例：

# Main.ts
```javascript
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
     * @param  {core.GroupData} data
     */
    private onResourceProgress(data: core.GroupData): void {
        egret.log(`当前加载进度:${data.curGroup} ${data.curGroupLoaded}/${data.curGroupTotal}`);
        core.LoadingManager.getLoading(LoadingUI).setProgress(data);
    }
    
    /**
     * 资源组加载出错
     * @param  {core.GroupData} data
     */
    private onResourceLoadError(data: core.GroupData): void {
        //TODO
        egret.log("Group:" + data.curGroup + " has failed to load");
    }
    /**
     * preload资源组加载完成
     * @param  {core.GroupData} data
     */
    private onResourceLoadComplete(data: core.GroupData): void {
        if (data.curGroup == 'preload') {
            egret.log("Group:" + data.curGroup + " load complete");
            core.LoadingManager.getLoading(LoadingUI).hide();
            core.Config.init(RES.getRes('config_zip'));
            this.initModule();
            UIManager.instance.openModule(ModuleEnum.LOGIN);
        }
    }

    private initModule(): void {
        new GameModule();
        new LoginModule();
        new MainModule();
    }
}
```

# LoginModule.ts
```javascript
class LoginModule extends core.Module {
	public constructor() {
		super(ModuleEnum.LOGIN);
	}
	private m_pLoginUI: LoginUI;

	/**
	* 获取loading
	*/
	protected getLoading(): core.ILoadingUI {
		return core.LoadingManager.getLoading(MainLoadingUI);
	}
	/**
	 * 预加载资源组
	 */
	protected getLoadGroup(data?: core.ModuleEventData): string[] {
		return ['soundUI', 'animUI'];
	}
	/**
	 * 显示
	 */
	protected show(data?: any): void {
		if (!this.m_pLoginUI) {
			let loginUI: LoginUI = new LoginUI();
			this.m_pLoginUI = loginUI;
		}
		core.LayerCenter.getInstance().getLayer(LayerEnum.UI).addChild(this.m_pLoginUI);
	}
	/**
	 * 隐藏
	 */
	protected hide(): void {
		if (this.m_pLoginUI && this.m_pLoginUI.parent) {
			this.m_pLoginUI.parent.removeChild(this.m_pLoginUI);
		}
		this.m_pLoginUI = null;
	}

	protected release(): void {
		super.release();
	}
}
```
## Lisence
[MIT][1]

[1]: http://opensource.org/licenses/mit-license.html
[2]: ./docs/Protobuf.md
[3]: http://htmlpreview.github.io/?https://github.com/twem007/p1/blob/master/docs/wiki/index.html