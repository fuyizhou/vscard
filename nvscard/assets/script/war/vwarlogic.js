//战斗主逻辑

var vwarlogic = function() {
    this.curCardNode = null;
    this.curVirCardNode = null;
}

module.exports = vwarlogic;

vwarlogic.prototype.isSelect = function() {
    if(this.curVirCardNode) {
        return true;
    }
    return false;
}

//选中卡牌
vwarlogic.prototype.selectCard = function(cardNode) {
    let tt_node = cc.find("cvs_war/ly_center");
    if(tt_node && this.curCardNode!=cardNode) {
        this.curCardNode = cardNode;
        this.curCardNode.active = false;
        //获取虚拟卡牌
        this.curVirCardNode = this.curCardNode.getChildByName('vircard');
        if( this.curVirCardNode ) {
            //调整虚拟卡牌位置和父子关系
            //this.curVirCardNode.parent = null;
            let t_oldpos = cc.v2(this.curVirCardNode.x,this.curVirCardNode.y);
            let t_newpos = this.curVirCardNode.convertToWorldSpaceAR( t_oldpos );
            t_newpos = tt_node.convertToNodeSpaceAR( t_newpos );
            this.curVirCardNode.parent = tt_node;
            this.curVirCardNode.x = t_newpos.x;
            this.curVirCardNode.y = t_newpos.y;
            this.curVirCardNode.scaleX = 1.0;
            this.curVirCardNode.scaleY = 1.0;
        }
    }
}


vwarlogic.prototype.moveCard = function( lp ) {
    if(this.curVirCardNode) {
        this.curVirCardNode.x = lp.x;
        this.curVirCardNode.y = lp.y;
    }
}

// if( this.cardNode!=cardNode ) {
//     //卡牌消失
//     this.cardNode = cardNode;
//     this.cardNode.active = false;
//     //获取虚拟卡牌
//     this.virCardNode = this.cardNode.getChildByName('vircard');
//     if( this.virCardNode ) {
//         //调整虚拟卡牌位置和父子关系
//         this.virCardNode.parent = null;
//         let t_oldpos = cc.v2(this.virCardNode.x,this.virCardNode.y);
//         let t_newpos = this.virCardNode.convertToWorldSpaceAR( t_oldpos );
//         t_newpos = this.node.convertToNodeSpaceAR( t_newpos );
//         this.virCardNode.parent = this.node;
//         this.virCardNode.x = t_newpos.x;
//         this.virCardNode.y = t_newpos.y;
//         this.virCardNode.scaleX = 1.0;
//         this.virCardNode.scaleY = 1.0;
//     }
// }

//取消卡牌
vwarlogic.prototype.cancleCard = function() {
    if(this.curVirCardNode && this.curCardNode) {
        this.curVirCardNode.x = 0;
        this.curVirCardNode.y = 50.0;
        this.curVirCardNode.scaleX = 0.2;
        this.curVirCardNode.scaleY = 0.2;
        this.curVirCardNode.parent = this.curCardNode;
        //
        this.curCardNode.active = true;
    }
    this.curVirCardNode = null;
    this.curCardNode = null;
}

//放置卡牌
vwarlogic.prototype.placeCard = function() {

}