//加载战斗需要的元素和对信息
var vapp = require('../vapp');
var vplayer = require('../common/vplayer');
var vcardgroup = require('../common/vcardgroup');
var vcard = require('../common/vcard');
var vwarlogic = require('./vwarlogic');

const { resolve } = require('path');

cc.Class({

    extends: cc.Component,

    properties: {
        // warlogic :  {
        //     default : null
        // }
    },

    ctor: function () {
        // 声明实例变量并赋默认值
        this.cards = new Array();
        this.spf_bg = null;
        this.spf_lan = null;
        this.spf_hong = null;
        this.spf_kuang = null;
    },

    // LIFE-CYCLE CALLBACKS: 

    onLoad () {
        this.warlogic = new vwarlogic();
        // 原生平台
        // cc.assetManager.loadBundle(jsb.fileUtils.getWritablePath() + '/pathToBundle/bundleName', (err, bundle) => {
        //     // ...
        // });
        // // 微信小游戏平台
        // cc.assetManager.loadBundle(wx.env.USER_DATA_PATH + '/pathToBundle/bundleName', (err, bundle) => {
        //     // ...
        // });
        // var t_war_bg = this.node.getChildByName('war_bg');
        // if(t_war_bg) {
        //     var t_desk = t_war_bg.getChildByName('ly_desk');
        //     if(t_desk) {
        //         var t_script = t_desk.getComponent('vdesk');
        //         if(t_script) {
        //             t_script.setGridNull(0,0);
        //         }
        //     }
        // }
    },

    onEnable: function () {
        //监听卡牌被选中的时间
        this.node.on('e-card-select',  function ( event ) {
            //_genTmpCard( event.getUserData() );
            event.stopPropagation();
        });
        //全局战斗
        window.war = this;
    },
    
    onDisable: function () {
        this.node.off('e-card-select', function ( event ) {
            let j = 0;
        });
        //全局战斗
        window.war = nil;
    },

    onDestroy : function() {
        this.warlogic = null;
    },

    //
    start () {
        _readyCard( this, 5 );
    },

    update (dt) {
        if( this.warlogic != null ) {
            this.warlogic.update(dt);
        }
    },

});

//准备5张卡牌
function _readyCard( self , cnum ) {
    //这个函数 可以通过服务器的回掉完成
    var cp = window.vapp.cardgroup();
    var tmpCardArray = cp.drawCard( cnum );
    let i = 0;
    tmpCardArray.forEach( card => {
        self.cards.push( card );
        //告诉cardgroup的card
        let tt_node = cc.find("cvs_war/war_bg/ly_btm");
        let tt_vcgroup = tt_node.getComponent('vcgroup');
        tt_vcgroup.genVirtualCard(card,i);
        i++;
    });
}