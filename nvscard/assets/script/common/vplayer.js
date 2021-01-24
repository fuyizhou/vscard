
//玩家

/*
    msg.uid : 角色uid
    msg.coin : 金币
    msg.name : 姓名
*/

var vplayer = function( msg ) {
    this.uid = msg.uid;
    this.name =  msg.name
    this.coin = msg.coin;
    this.level = msg.level;
    this.exp = msg.exp;
    this.head = ''; //头像
}

module.exports = vplayer;

//初始化卡组
vplayer.prototype.initCardgroup = function( cfg ) {

}

//赚取金币
vplayer.prototype.earnGold = function( gold ) {

}

//消费金币
vplayer.prototype.costGold = function( gold ) {
    
}

//修改name
vplayer.prototype.modifyname = function( name ) {
    this.name = name;
}
