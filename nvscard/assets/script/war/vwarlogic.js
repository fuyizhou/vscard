//战斗主逻辑
var vbatter = require('./vbatter');

//该对象与服务器做对接
var vwarlogic = function() {
    //当前选中的卡牌和当前虚拟卡牌
    this.curCardNode = null;
    this.curVirCardNode = null;
    //棋盘相关
    this.rownum = 5;
    this.colnum = 5;
    this.gnum = this.rownum*this.colnum;
    this.girdValue = new Array();
    for(let i=0;i<25;i++) {
        this.girdValue.push(0);
    }
    //战场控制
    //红色代表自己
    this.redBatter = new vbatter();
    this.redBatter.initSelf();
    //蓝色代表对手
    this.blueBatter = new vbatter();
    this.blueBatter.initAi(0);
    //战斗规则
    //每回合时间
    this.turnTime = 30.0;
    //胜利的总分
    this.maxScore = 200;
    //回合数目
    this.turnNum = 0;
    //激活数目 0 代表自己，1代表对方
    this.activeNum = 0;
    //累计时间
    this.accTime = 0;
}

module.exports = vwarlogic;

vwarlogic.prototype.update = function( dt ) {
    //时间控制
    this.accTime += dt;
    if(this.accTime>this.turnTime) {
        this.turnBatter();
    }
}

//交换对沙鸥
vwarlogic.prototype.turnBatter = function() {
    this.accTime = 0;
    if(this.activeNum == 0) {
        this.activeNum = 1;
    }else {
        this.activeNum = 0;
    }
}

//


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
        //计算cross-node
        let desk_node = cc.find("cvs_war/war_bg/ly_desk");
        if(desk_node && desk_node.getComponent('vdesk') ) {
            return desk_node.getComponent('vdesk').crossVirCardNode(this.curVirCardNode);
        }
    }
    return false;
}

//取消卡牌
vwarlogic.prototype.cancleCard = function() {
    if(this.curVirCardNode && this.curCardNode) {
        let tt_btm = cc.find("cvs_war/war_bg/ly_btm");
        let tt_vcgroup = tt_btm.getComponent('vcgroup');
        tt_vcgroup.resetVirCardNode(this.curCardNode,this.curVirCardNode);
        this.curCardNode.active = true;
    }
    this.curVirCardNode = null;
    this.curCardNode = null;
}

//放置卡牌（逻辑上的运算）(按卡牌的角点进行计算)
vwarlogic.prototype.placeCard = function(vcard, x, y) {
    //计算分数
    // for( let i=0;i<vcard.data.length;i++ ) {

    // }
    return false;
}