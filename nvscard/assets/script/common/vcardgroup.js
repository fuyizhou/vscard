
var vcard = require('./vcard')

//更具消息生成卡组
var vcardgroup = function() {
    this.uid = 0;
    this.data = new Array();
    for(let i=0;i<10;i++) {
        this.data.push(new vcard() );
    }
}

module.exports = vcardgroup;

//更具配置生成卡组
vcardgroup.prototype.inifCfg = function( cfg ) {
    this.uid = 10000;
    // if(this.data) {
    //     this.data.clear();
    // }
    // for(let i=0;i<cfg.cardnum;i++) {
    // }
}

//更具配置生成卡组
vcardgroup.prototype.addCard = function( cfg ) {
}

//删除卡牌
vcardgroup.prototype.defCard = function( uid ) {
}

//获取卡牌
vcardgroup.prototype.getCard = function( uid ) {
}

//验证卡牌
vcardgroup.prototype.chekCard = function( uid ) {
}

//抽取卡牌
vcardgroup.prototype.drawCard = function( num ) {
    let t_array = new Array();
    for(let i=0;i<num;i++) {
        let t_card_num = this.data.length;
        let t_draw_iid = Math.floor( Math.random()*t_card_num);
        t_array.push( this.data[t_draw_iid] );
    }
    return t_array;
}