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
var vwarlogic = require('vwarlogic');

const { resolve } = require('path');

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
        //
        window.vapp.warlogic = new vwarlogic();
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
        _preLoadRes(this);
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
        //准备5张卡牌
        _readyCard( this, 5 );
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
    },
    
    onDisable: function () {
        this.node.off('e-card-select', function ( event ) {
            let j = 0;
        });
        //全局战斗
        window.war = nil;
    },

    onDestroy : function() {
        window.vapp.warlogic = null;
    },

    drawCard : function() {

    }

});

    // async.series([
    //     cb => cc.resources.load("fk_beijing",cc.SpriteFrame, function (err, spf) {
    //             war.spf_bg = spf;
    //             var t_war_bg = war.node.getChildByName('war_bg');
    //             if(t_war_bg) {
    //                 var t_desk = t_war_bg.getChildByName('ly_desk');
    //                 if(t_desk) {
    //                     var t_script = t_desk.getComponent('vdesk');
    //                     if(t_script) {
    //                         t_script.initGridNull(spf);
    //                     }
    //                 }
    //             }
    //         })
    // ],(err)=>{
    //     console.log("test async error!");
    // });

    // await cc.resources.load("fk_beijing",cc.SpriteFrame, function (err, spf) {
    //     war.spf_bg = spf;
    //     var t_war_bg = war.node.getChildByName('war_bg');
    //     if(t_war_bg) {
    //         var t_desk = t_war_bg.getChildByName('ly_desk');
    //         if(t_desk) {
    //             var t_script = t_desk.getComponent('vdesk');
    //             if(t_script) {
    //                 t_script.initGridNull(spf);
    //             }
    //         }
    //     }
    // });
    // //
    // await cc.resources.load("fk_lanse",cc.SpriteFrame, function (err, spf) {
    //     war.spf_lan = spf;
    // });
    // //
    // await cc.resources.load("fk_hongse",cc.SpriteFrame, function (err, spf) {
    //     war.spf_hong = spf;
    // });
    // //
    // await cc.resources.load("fk_zuihouweizhi",cc.SpriteFrame, function (err, spf) {
    //     war.spf_kuang = spf;
    //     var t_war_bg = war.node.getChildByName('war_bg');
    //     if(t_war_bg) {
    //         var t_desk = t_war_bg.getChildByName('ly_desk');
    //         if(t_desk) {
    //             var t_script = t_desk.getComponent('vdesk');
    //             if(t_script) {
    //                 t_script.initGridSelect(spf);
    //             }
    //         }
    //     }
    // });

function _preLoadRes( war ) {
    //加载资源
    // let i = await new Promise( (resolve,reject) => {
    //     cc.resources.load("fk_beijing",cc.SpriteFrame, function (err, spf) {
    //         war.spf_bg = spf;
    //         reject(spf);
    //     });
    // });
    // console.log("spf" + i);
    // let j = await new Promise( (resolve,reject) => {
    //     cc.resources.load("fk_beijing",cc.SpriteFrame, function (err, spf) {
    //         war.spf_bg = spf;
    //         reject(spf);
    //     });
    // });
    // console.log("spf" + j);
    return null;
}


//准备5张卡牌
function _readyCard( self , cnum ) {
    var cp = window.vapp.cardgroup();
    var tmpCardArray = cp.drawCard( cnum );
    tmpCardArray.forEach( card => {
        self.cards.push( card );
    });
    //生成虚拟卡牌
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
function _genTmpCard( card ) {
    let i = 0;
    //生成一张卡牌，挂在
    var lay_center = this.node.getChildByName('ly_center');
    if(lay_center) {
        //var tmp_node = new cc.node();
    }
}
