var vplayer = require('./common/vplayer');
var vcardgroup = require('./common/vcardgroup');
/*
    全局对象
    cfg.player
    cfg.cardgroup
*/

var vapp = function( cfg ) {
    window.vapp = this;
    //
    this.language = 'chn';
    //构建脚本的各种对象
    //构建角色
    this.vplayer = new vplayer(cfg.player);
    //构建卡组
    this.vcardgroup = new vcardgroup();
}

module.exports = vapp;


vapp.prototype.vplayer = function() {
    return this.vplayer;
}

vapp.prototype.cardgroup = function() {
    return this.vcardgroup;
}

vapp.prototype.getdata = function() {
    //

}