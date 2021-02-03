var vplayer = require('./common/vplayer');
var vcardgroup = require('./common/vcardgroup');
var vDataTbl = require('./common/vDataTbl');
/*
    全局对象
    cfg.player
    cfg.cardgroup
*/

var vapp = function() {
    window.vapp = this;
    this.language = 'chn';
}

module.exports = vapp;

//
vapp.prototype.checkUpdate = function() {

}

vapp.prototype.init = function( cfg ) {
    //构建基础数据
    this.vDataTbl = new vDataTbl();
    this.vDataTbl.loadAll();
    //构建角色
    this.vplayer = new vplayer(cfg.player);
    //构建卡组
    this.vcardgroup = new vcardgroup();
}

vapp.prototype.vplayer = function() {
    return this.vplayer;
}

vapp.prototype.cardgroup = function() {
    return this.vcardgroup;
}

vapp.prototype.getdata = function() {
    //
}