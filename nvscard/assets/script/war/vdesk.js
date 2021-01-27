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

    ctor: function () {
        // 声明实例变量并赋默认值
        //需要动态设置cellsize
        this.rownum = 5;
        this.colnum = 5;
        this.gnum = this.rownum*this.colnum;
    },

    initGridNull : function(spf) {
        for(let i=0;i<this.gnum;i++) {
            //构建背景节点
            var bg_node = this.node.getChildByName('fk_'+i);
            var sp = bg_node.getComponent(cc.Sprite);
            sp.spriteFrame = spf;
            bg_node.active = true;
        }
    },

    initGridSelect : function(spf) {
        for(let i=0;i<this.gnum;i++) {
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
        //计算cellsize
        let t_lay = desk_node.getComponent(cc.Layout);
        if(t_lay) {
            if(t_lay.startAxis == 0) {
                let t_cellw = (desk_node.width - t_lay.paddingLeft -  t_lay.paddingRight - (this.colnum - 1) * t_lay.spacingX)/this.colnum;
                let t_cellh = t_cellw;
                t_lay.cellSize.width = t_cellw;
                t_lay.cellSize.height = t_cellh;
            }else {
                let t_cellh = (desk_node.height - t_lay.paddingTop -  t_lay.paddingBottom - (this.rownum - 1) * t_lay.spacingY)/this.rownum;
                let t_cellw = t_cellh;
                t_lay.cellSize.width = t_cellw;
                t_lay.cellSize.height = t_cellh;
            }
        }
        let t_lay_widget = desk_node.getComponent(cc.Widget);
        //
        for(let i=0;i<this.gnum;i++) {
            //构建背景节点
            var bg_node = new cc.Node('fk_'+i);
            bg_node.addComponent(cc.Sprite);
            //构建选择节点
            var sel_node = new cc.Node('fk_sel');
            sel_node.addComponent(cc.Sprite);
            //
            let bg_widget = sel_node.addComponent(cc.Widget);
            if(bg_widget) {
                //bg_widget
                bg_widget.isAlignLeft = true;
                bg_widget.isAlignRight = true;
                bg_widget.isAlignBottom = true;
                bg_widget.isAlignTop = true;
                bg_widget.updateAlignment();
            }
            //
            sel_node.parent = bg_node;
            sel_node.active = true;
            //构建文字节点
            var num_node = new cc.Node('fk_num');
            let num_widget = num_node.addComponent(cc.Widget);
            if(num_widget) {
                //num_widget
                num_widget.isAlignLeft = true;
                num_widget.isAlignRight = true;
                num_widget.isAlignBottom = true;
                num_widget.isAlignTop = true;
                num_widget.updateAlignment();
            }
            var label = num_node.addComponent(cc.Label);
            label.string = "8";
            label.fontSize = 80;
            label.lineHeight = 80;
            num_node.parent = bg_node;
            num_node.active = true;
            //
            bg_node.parent = desk_node;
            bg_node.active = true;
        }
    },

    onEnable: function () {
        let i = 0;
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