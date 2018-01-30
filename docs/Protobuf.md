# Protobuf使用说明
该解决方案由Egret首席架构师王泽提供的，开源库地址：https://github.com/WanderWang/protobuf-egret, 本着便利，统一管理的原则对使用方式进行了少量修改。  

## .proto文件的格式要求
proto 文件中的每一个协议一定要从属于一个 package，否则.d.ts生成会出现错误导致 ts 文件无法正确的找到这些类  

## 目录约定
protobuf在使用上还是采用第三方库的方式引入，所以放置目录位于code/thirdparty/下，protobuf下有3个子目录，分别为bundles、library、protofile  
library目录是protobuf的库目录，用于存放protobuf源代码及.d.ts文件  
protofile用于存放.proto文件，此文件夹内的文件为中间文件，不会在项目中直接使用  
bundles为生成的目标文件，是项目中实际使用的文件，该文件内的文件都为自动生成，无需修改  

## 使用方式
1. 安装环境依赖：
> 「
    npm install protobufjs@6.8.4 -g  
    npm install @egret/protobuf -g  」
2. 生成.proto文件，并将文件放入protofile目录下  
3. 打开命令行，进入code/thirdparty/目录，执行pb-egret generate，待执行完成后bundles目录下会生成目标文件  
4. 在Egret Wing下清理、编译项目，目标文件将会自动在code/client/modules/protobuf-bundles下生成。  
5. 参考code/client/modules/protobuf-bundles/的.d.ts文件中的接口及数据结构使用protobuf