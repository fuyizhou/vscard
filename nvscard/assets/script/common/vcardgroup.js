
var vcard = require('./vcard')

//更具消息生成卡组
var vcardgroup = function() {
    this.uid = 0;
    this.data = new Array();
}

module.exports = vcardgroup;

//更具配置生成卡组
vcardgroup.prototype.inifCfg = function( cards, local ) {
    if( this.data.length == 0 ) {
        if( local == 1 ) {
            //加载本地卡组
            var cp = this;
            cards.forEach(function(value,key){
                cp.addCard(value);
            });
        }else{
            //加载数据卡组
    
        }
    }else{
        //清空卡组，加载
        
    }
}

//更具配置生成卡组
vcardgroup.prototype.addCard = function( carddata ) {
    let t_card = new vcard();
    t_card.initCfg(carddata);
    this.data.push( t_card );
}

//删除卡牌
vcardgroup.prototype.defCard = function( carddata ) {

}

//获取卡牌
vcardgroup.prototype.getCard = function( uid ) {
}

//验证卡牌
vcardgroup.prototype.chekCard = function( uid ) {
}

//抽取卡牌(数量)
vcardgroup.prototype.drawCard = function( num ) {
    //net网络抽卡，或者本地抽卡
    let t_array = new Array();
    for(let i=0;i<num;i++) {
        let t_card_num = this.data.length;
        let t_draw_iid = Math.floor( Math.random()*t_card_num);
        t_array.push( this.data[t_draw_iid] );
    }
    return t_array;
}