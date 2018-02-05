module core {
	////////////////////////////////////////////////////////////////////
	
	// MIT License
	//
	// Copyright (c) 2017-2027 yuxuefeng
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in all
	// copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	// SOFTWARE.

	///////////////////////////////////////////////////////////////////////
	export class Core {
		public constructor() {
		}

		public static run(stage: egret.Stage): void {
			egret.log(`框架交流QQ群：65384669 Github:https://github.com/twem007/p1 欢迎一起完善框架fork后pull request修改后的代码，我将根据情况进行合并。如果觉得不错，点击star支持下我们。`);
			egret.ImageLoader.crossOrigin = 'anonymous';
			core.FrameEventCenter.getInstance().init(stage);
			core.LayerCenter.getInstance().init(stage);
			RES.setMaxLoadingThread(8);
			if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
				core.WebUtils.addKeyboardListener();
				egret.Logger.logLevel = egret.Logger.ALL;
			}
		}
	}
}
