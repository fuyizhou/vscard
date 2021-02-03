// var vplayer = require('./common/vplayer');
// var vcardgroup = require('./common/vcardgroup');

var vDataTbl = function() {
    //this.loadAll();
}

module.exports = vDataTbl;

//加载所有数据表
vDataTbl.prototype.loadAll = function() {
    this.tbl_card = {};
    let kk = this;
    cc.assetManager.loadBundle('tbl', null, (err, bundle) => {
        //加载卡牌表
        bundle.load('vscard_local',cc.JsonAsset,(err, object) =>{
            for(let i=0; i<object.json.length; i++) {
                let t_data = object.json[i];
                if(i == 0) {
                    //dsp
                } else {
                    kk.tbl_card[t_data.pid] = t_data;
                }
            }
        });
        //

    });
}