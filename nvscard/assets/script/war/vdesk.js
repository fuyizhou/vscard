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

    initGridNull : function(spf) {
        for(let i=0;i<25;i++) {
            //构建背景节点
            var bg_node = this.node.getChildByName('fk_'+i);
            var sp = bg_node.getComponent(cc.Sprite);
            sp.spriteFrame = spf;
            bg_node.active = true;
        }
    },

    initGridSelect : function(spf) {
        for(let i=0;i<25;i++) {
            //构建背景节点
            var bg_node = this.node.getChildByName('fk_'+i);
            var sel_node = bg_node.getChildByName('fk_sel');
            var sp = sel_node.getComponent(cc.Sprite);
            sp.spriteFrame = spf;
            sel_node.active = true;
        }
    },

    //格子空(c)
    setGridNull : function( x ,y ) {
        let t_index = gird_index(x,y);
        let t_aim = this.node.getChildByName('fk_'+t_index);
        if(t_aim) {
            var sel_node = t_aim.getChildByName('fk_sel');
            if(sel_node) {
                sel_node.active = true;
            }
            var num_node = t_aim.getChildByName('fk_num');
            if(num_node) {
                num_node.active = true;
            }
        }
    },

    //格子命中(c)
    setGridHit : function( x ,y ) {
        let t_index = gird_index(x,y);
        let t_aim = this.node.getChildByName('fk_'+t_index);
        if(t_aim) {
            var sel_node = t_aim.getChildByName('fk_sel');
            if(sel_node) {
                sel_node.active = true;
            }
        }
    },

    //格子被占有(c)
    setGridFill : function( x ,y , spf ) {
        let t_index = gird_index(x,y);
        let t_aim = this.node.getChildByName('fk_'+t_index);
        if(t_aim) {
            var sp = bg_node.getComponent(cc.Sprite);
            sp.spriteFrame = spf;
        }
    },

    //格子消除
    setGridDisappear : function( x ,y ) {
        //播放消除动画
        let t_index = gird_index(x,y);
        let t_aim = this.node.getChildByName('fk_'+t_index);
        if(t_aim) {

        }
        setGridNull(x,y);
    },

    onLoad () {
        //构建desk
        let desk_node = this.node;
        for(let i=0;i<25;i++) {
            //构建背景节点
            var bg_node = new cc.Node('fk_'+i);
            bg_node.addComponent(cc.Sprite);
            bg_node.parent = desk_node;
            bg_node.active = true;
            //构建选择节点
            var sel_node = new cc.Node('fk_sel');
            sel_node.addComponent(cc.Sprite);
            sel_node.parent = bg_node;
            sel_node.active = true;
            //构建文字节点
            var num_node = new cc.Node('fk_num');
            var label = num_node.addComponent(cc.Label);
            label.string = "8";
            label.fontSize = 20;
            num_node.parent = bg_node;
            num_node.active = true;
        }
    },

    onEnable: function () {

    },

    onDisable: function () {

    },

    start () {

    },

    // update (dt) {},
});

var gird_index = function( x , y) {
    return x + y * 5;
}