// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    //格子空
    setGridNull : function( x ,y ) {
        let t_index = gird_index(x,y);
        let t_aim = this.node.getChildByName('fk_'+t_index);
        if(t_aim) {
            t_aim.children.foreach( (elem)=> {
                elem.active = false;
            });
        }
    },

    //格子命中
    setGridHit : function( x ,y ) {
        let t_index = gird_index(x,y);
        let t_aim = this.node.getChildByName('fk_'+t_index);
        if(t_aim) {
            
        }
    },

    //格子被占有
    setGridFill : function( x ,y ) {
        let t_index = gird_index(x,y);
        let t_aim = this.node.getChildByName('fk_'+t_index);
        if(t_aim) {
            
        }
    },

    //格子消除
    setGridDisappear : function( x ,y ) {
        let t_index = gird_index(x,y);
        let t_aim = this.node.getChildByName('fk_'+t_index);
        if(t_aim) {
            
        }
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
                        sel_node.active = true;
                    }
                }
                return create_sp_wenzi(desk_node);
            }
        ).then(
            (ret) => {
                for(let i=0;i<25;i++) {
                    let t_spnode = desk_node.getChildByName('fk_'+i);
                    if(t_spnode) {
                        var label_node = new cc.Node('fk_label_'+i);
                        var label = label_node.addComponent(cc.Label);
                        label.string = "8";
                        label.fontSize = 20;
                        label_node.parent = t_spnode;
                        label_node.active = true;
                    }
                }
            }
        );
        //
        //this.setGridNull(1,1);
    },

    start () {

    },

    // update (dt) {},
});

var gird_index = function( x , y) {
    return x + y * 5;
}


//初始化创建
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
        resolve(null);
        // cc.resources.load("fk_gaojikakuang",cc.SpriteFrame, function (err, bg_sp) {
        //     if(err) {
        //         reject(err);
        //     }else{
        //         resolve(bg_sp);
        //     }
        // });
    } );
}