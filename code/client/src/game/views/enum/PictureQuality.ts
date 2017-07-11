/**
 * Created by YW0977 on 2017/4/5.
 */


enum PictureQualityLevel{
    //画质等级低中高
    low=1,
    middle=2,
    high=3
}

enum PictureQualityEffect{
    //画质效果
    JewelBlinkEffect=101,//宝石闪
    JewelLightEffect=102,//宝石背光
    JewelCreateScaleEffect=103, //宝石创建缩放
    JewelFractureEffect=104,//宝石被吃爆炸
    PowerFractureEffect=105,//变身道具被吃爆炸
    DeathEffect=106,//死亡效果
    TailEffect=107,//暴走拖尾
    SpeedEffect=108,//加速
    WallDiscolor=109//变身时墙变色
}