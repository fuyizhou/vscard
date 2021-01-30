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
        this.cellw = 0;
        this.cellh = 0;
        this.border = 6;
        this.space = 4;
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
        build_grid(this,this.node, this.colnum, this.rownum);
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

function gird_index( x , y) {
    return x + y * 5;
}

//构建棋盘
function build_grid(self,desk_node, colnum, rownum) {
    //计算cellsize
    let t_tw = desk_node.width;
    let t_th = desk_node.height;
    //设置布局
    let t_lay = desk_node.getComponent(cc.Layout);
    if(!t_lay) {
        t_lay = desk_node.addComponent(cc.Layout);
    }
    t_lay.type = cc.Layout.Type.GRID;
    t_lay.resizeMode = cc.Layout.ResizeMode.CHILDREN;
    t_lay.startAxis = cc.Layout.AxisDirection.HORIZONTAL;
    t_lay.spacingX = self.space;
    t_lay.spacingY = self.space;
    t_lay.paddingLeft = self.border;
    t_lay.paddingRight = self.border;
    t_lay.paddingTop = self.border;
    t_lay.paddingBottom = self.border;
    self.cellw  = (t_tw - 2*self.border - (colnum-1)*self.space )/colnum;
    self.cellh = (t_th - 2*self.border - (rownum-1)*self.space )/rownum;
    t_lay.cellSize.width = self.cellw;
    t_lay.cellSize.height = self.cellh;
    //
    for(let i=0;i<self.gnum;i++) {
        //构建背景节点
        var bg_node = new cc.Node('fk_'+i);
        bg_node.width = self.cellw;
        bg_node.height = self.cellh;
        fillBgNode(bg_node);
        //选择框节点
        var sel_node = new cc.Node('fk_sel');
        sel_node.width = self.cellw;
        sel_node.height = self.cellh;
        fillSelNode(sel_node);
        let bg_widget = sel_node.addComponent(cc.Widget);
        if(bg_widget) {
            //bg_widget
            bg_widget.isAlignLeft = true;
            bg_widget.isAlignRight = true;
            bg_widget.isAlignBottom = true;
            bg_widget.isAlignTop = true;
            bg_widget.updateAlignment();
        }
        sel_node.parent = bg_node;
        sel_node.active = false;
        //文字节点
        var num_node = new cc.Node('fk_num');
        let num_widget = num_node.addComponent(cc.Widget);
        if(num_widget) {
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
    //
    t_lay.updateLayout();
}

function fillBgNode( target ) {
    let sp = target.addComponent(cc.Sprite);
    if(sp) {
        sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        cc.resources.load("fk_beijing",cc.SpriteFrame, function (err, spf) {
            sp.spriteFrame = spf;
        });
    }
}

function fillSelNode( target ) {
    let sp = target.addComponent(cc.Sprite);
    if(sp) {
        sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        cc.resources.load("fk_zuihouweizhi",cc.SpriteFrame, function (err, spf) {
            sp.spriteFrame = spf;
        });
    }
}