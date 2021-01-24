// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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

        //格子空
    setGridNull : function( x ,y ) {
        var t_aim = this.node.getChildByName('fk00');
        if(t_aim) {
            var t_sp = t_aim.getComponent(cc.Sprite);
            cc.resources.load("fk_lanse",cc.SpriteFrame, function (err, spriteFrame) {
                let i = 0;
                t_sp.spriteFrame=spriteFrame;
            });
            // var tmpBundle = cc.assetManager.getBundle('dywar');
            // if(t_sp && tmpBundle ) {
            //     //cc.Texture2D
            //     tmpBundle.load('fk_lanse', cc.SpriteFrame ,function(err1,p2,spriteFrame){
            //         let j = 0;
            //         // //创建一个新的节点，因为cc.Sprite是组件不能直接挂载到节点上，只能添加到为节点的一个组件
            //         // var node=new cc.Node('myNode')
            //         // //调用新建的node的addComponent函数，会返回一个sprite的对象
            //         // const sprite=node.addComponent(cc.Sprite)
            //         //给sprite的spriteFrame属性 赋值
            //         t_sp.spriteFrame=spriteFrame
            //         // //把新的节点追加到self.node节点去。self.node，就是脚本挂载的节点
            //         // self.node.addChild(node);
            //    },function(err,ii) {
            //        let i = 0;
            //    });
            //     // cc.loader.loadRes("assets/texture/war", cc.SpriteAtlas, function (err, atlas) {
            //     //     var frame = atlas.getSpriteFrame('sheep_down_0');
            //     //     t_sp.spriteFrame = frame;
            //     // });
            // }
        }
    },

    //格子命中
    setGridHit : function( x ,y ) {

    },

    //格子被占有
    setGridFill : function( x ,y ) {

    },

    //格子消除
    setGridDisappear : function( x ,y ) {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //构建desk
        let desk_node = this.node;
        create_sp_bg( desk_node ).then( 
            (ret) => {
                for(let i=0;i<25;i++) {
                    var bg_node = new cc.Node('fk_'+i);
                    var sp = bg_node.addComponent(cc.Sprite);
                    sp.spriteFrame = ret;
                    bg_node.parent = desk_node;
                }
                return create_sp_select(desk_node);
            }
        ).then(
            (ret) => {
                for(let i=0;i<25;i++) {
                    let t_spnode = desk_node.getChildByName('fk_'+i);
                    if(t_spnode) {
                        var sel_node = new cc.Node('fk_sel_'+i);
                        var sp = sel_node.addComponent(cc.Sprite);
                        sp.spriteFrame = ret;
                        sel_node.parent = t_spnode;
                        sel_node.active = false;
                    }
                }
                desk_node.getChildByName
                return create_sp_wenzi(desk_node);
            }
        ).then(
            (ret) => {
                for(let i=0;i<25;i++) {
                    let t_spnode = desk_node.getChildByName('fk_'+i);
                    if(t_spnode) {
                        var label_node = new cc.Node('fk_label_'+i);
                        var label = label_node.addComponent(cc.Lable);
                        //sp.spriteFrame = ret;
                        label_node.parent = label_node;
                    }
                }
                desk_node.getChildByName
                return create_sp_wenzi(desk_node);
            }
        );
        // var p_load_bg = new Promise( (resolve,reject) => {
        //     cc.resources.load("fk_beijing",cc.SpriteFrame, function (err, bg_sp) {
        //         if(err) {
        //             reject(err);
        //         }else{
        //             resolve(bg_sp);
        //         }
        //     });
        // });
        // //创建sp
        // p_load_bg.then( (bg_sp)=> {
        //     for(let i=0;i<25;i++) {
        //         var bg_node = new cc.Node('fk_'+i);
        //         var sp = bg_node.addComponent(cc.Sprite);
        //         sp.spriteFrame = bg_sp;
        //         bg_node.parent = desk_node;
        //     }
        // });

        // for(let i=0;i<25;i++) {
        //     var bg_node = new cc.Node('fk_'+i);
        //     var sp = bg_node.addComponent(cc.Sprite);
        //     sp.spriteFrame = bg_sp;
        //     bg_node.parent = desk_node;
        //     // //构建背景节点上面的selectnode和文字node
        //     // cc.resources.load("fk_zuihouweizhi",cc.SpriteFrame, function (err, select_sp) {
        //     //     var select_node = new cc.Node('select_'+i);
        //     //     var sp = select_node.addComponent(cc.Sprite);
        //     //     sp.spriteFrame = select_sp;
        //     //     select_node.parent = bg_node;
        //     // });
        // }

        // var test = new Promise( (resolve,reject) => {
        //     let i = 0;
        //     cc.resources.load("fk_zuihouweizhi",cc.SpriteFrame, function (err, select_sp) {
        //         if(err) {
        //             reject(err);
        //         }else{
        //             resolve(select_sp);
        //         }
        //         // var select_node = new cc.Node('select_'+i);
        //         // var sp = select_node.addComponent(cc.Sprite);
        //         // sp.spriteFrame = select_sp;
        //         // select_node.parent = bg_node;
        //     });
        // });
        // test.then( (ss)=> {
        //     let i = bg_node;
        //     let j = 0;
        // });

        //加载grid
    },

    start () {

    },

    // update (dt) {},
});


var create_sp_bg = function( desk_node ) {
    return new Promise(  (resolve,reject) => {
        cc.resources.load("fk_beijing",cc.SpriteFrame, function (err, bg_sp) {
            if(err) {
                reject(err);
            }else{
                resolve(bg_sp);
            }
        });
    } );
}

var create_sp_select = function( desk_node ) {
    return new Promise(  (resolve,reject) => {
        cc.resources.load("fk_zuihouweizhi",cc.SpriteFrame, function (err, bg_sp) {
            if(err) {
                reject(err);
            }else{
                resolve(bg_sp);
            }
        });
    } );
}

var create_sp_wenzi = function( desk_node ) {
    return new Promise(  (resolve,reject) => {
        cc.resources.load("fk_gaojikakuang",cc.SpriteFrame, function (err, bg_sp) {
            if(err) {
                reject(err);
            }else{
                resolve(bg_sp);
            }
        });
    } );
}