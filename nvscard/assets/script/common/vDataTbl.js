// var vplayer = require('./common/vplayer');
// var vcardgroup = require('./common/vcardgroup');
// var vapp = require('../vapp');
// var vcardgroup = require('./vcardgroup');

var vDataTbl = function() {
    this.name = 'vDataTbl';
}

module.exports = vDataTbl;

//加载所有数据表
vDataTbl.prototype.loadAll = function() {
    this.tbl_card = new Map();
    let kk = this;
    cc.assetManager.loadBundle('tbl', null, (err, bundle) => {
        //加载卡牌表
        bundle.load('vscard_local',cc.JsonAsset,(err, object) =>{
            for(let i=0; i<object.json.length; i++) {
                let t_data = object.json[i];
                if(i == 0) {
                    //dsp
                } else {
                    //推送卡牌数据
                    kk.tbl_card.set(t_data.pid,t_data);
                }
            }
            //初始化卡组？
            window.vapp.vcardgroup.inifCfg(kk.tbl_card, 1 );
        });
    });
}