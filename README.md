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
 5. [君子约定](#君子约定)
 6. [Egret相关](#Egret相关)
 7. [待办事宜](#待办事宜)
 8. [代码示例](#代码示例)
 9. [Lisence](#Lisence)

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

## 功能列表：
1. EXCEL配置表导出工具：自动将EXCEL导出为zip文件，并生成ts数据结构代码ConfigDef.ts，使用需手动将zip重命名为config.zip，放入resource/assets/config/目录下，ConfigDef.ts放入src/core/config/目录下
2. Protobuf文件导出工具，并自动生成ts代码，自动导入到工程
3. 模块管理流程
4. 对象池
5. 影片剪辑工厂
6. 声音管理器，通过配置表实现声音的播放管理、覆盖关系
7. 资源组加载器
8. HTTP、websocket的易用性封装
9. 事件管理器
10. 帧循环管理器
11. 输入管理器
12. 层管理器
13. Loading管理器
14. timer管理器
15. 字典类
16. LocalStorage易用性封装
...

## Lisence
[MIT][1]

[1]: http://opensource.org/licenses/mit-license.html
[2]: ./docs/Protobuf.md
[3]: http://htmlpreview.github.io/?https://github.com/twem007/p1/blob/master/docs/wiki/globals.html