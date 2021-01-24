// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//加载战斗需要的元素和对信息
var vapp = require('../vapp');
var vplayer = require('../common/vplayer');
var vcardgroup = require('../common/vcardgroup');
var vcard = require('../common/vcard');

cc.Class({

    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
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
        let war = this;
        //加载资源
        cc.resources.load("fk_beijing",cc.SpriteFrame, function (err, spf) {
            war.spf_bg = spf;
            var t_war_bg = war.node.getChildByName('war_bg');
            if(t_war_bg) {
                var t_desk = t_war_bg.getChildByName('ly_desk');
                if(t_desk) {
                    var t_script = t_desk.getComponent('vdesk');
                    if(t_script) {
                        t_script.initGridNull(spf);
                    }
                }
            }
        });
        //
        cc.resources.load("fk_lanse",cc.SpriteFrame, function (err, spf) {
            war.spf_lan = spf;
        });
        //
        cc.resources.load("fk_hongse",cc.SpriteFrame, function (err, spf) {
            war.spf_hong = spf;
        });
        //
        cc.resources.load("fk_zuihouweizhi",cc.SpriteFrame, function (err, spf) {
            war.spf_kuang = spf;
            var t_war_bg = war.node.getChildByName('war_bg');
            if(t_war_bg) {
                var t_desk = t_war_bg.getChildByName('ly_desk');
                if(t_desk) {
                    var t_script = t_desk.getComponent('vdesk');
                    if(t_script) {
                        t_script.initGridSelect(spf);
                    }
                }
            }
        });
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

    start () {
        //搞战场
        
    },

    // update (dt) {},

    onEnable: function () {
        //监听卡牌被选中的时间
        this.node.on('e-card-select',  function ( event ) {
            //_genTmpCard( event.getUserData() );
            event.stopPropagation();
        });
        //全局战斗
        window.war = this;
        //准备5张卡牌
        _readyCard( this, 5 );
    },
    
    onDisable: function () {
        this.node.off('e-card-select', function ( event ) {
            let j = 0;
        });
        //全局战斗
        window.war = nil;
    },

    drawCard : function() {

    }
});

//准备5张卡牌
var _readyCard = function( self , cnum ) {
    var cp = window.vapp.cardgroup();
    var tmpCardArray = cp.drawCard( cnum );
    tmpCardArray.forEach( card => {
        self.cards.push( card );
    });
    //
    var t_war_bg = self.node.getChildByName('war_bg');
    if(t_war_bg) {
        var t_btm = t_war_bg.getChildByName('ly_btm');
        if(t_btm) {
            var t_script = t_btm.getComponent('vcgroup');
            if(t_script) {
                t_script.genVirtualCard(tmpCardArray);
            }
        }
    }
}

//生成临时卡牌
var _genTmpCard = function( card ) {
    let i = 0;
    //生成一张卡牌，挂在
    var lay_center = this.node.getChildByName('ly_center');
    if(lay_center) {
        //var tmp_node = new cc.node();
    }
}
