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
    //各种场景的budle
    this.warBundle = null;
    this.hallBundle = null;
    //构建脚本的各种对象
    this.vplayer = new vplayer(cfg.player);
    this.vcardgroup = new vcardgroup(cfg.cardgroup);
}

module.exports = vapp;

vapp.prototype.getdata = function() {
    //

}