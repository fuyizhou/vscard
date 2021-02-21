// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var vcard = require('../common/vcard');

/*
    牌桌
*/

cc.Class({
    extends: cc.Component,

    properties: {
    },

    ctor: function () {
        this.rownum = 5;
        this.colnum = 5;
        this.gnum = this.rownum*this.colnum;
        this.cellw = 0;
        this.cellh = 0;
        this.border = 6;
        this.space = 4;
        //被选择的格子
        this.selectGrid = new Array();
    },

    onLoad () {
        //构建desk
        _buildGrid(this, this.node, this.colnum, this.rownum);
    },

    onEnable: function () {
        let i = 0;
    },

    onDisable: function () {

    },
    
    start () {
        
    },
    
    update (dt) {

    },

    //格子空(c)
    setGridNull : function( x ,y ) {
        let t_target = _getGrid( self, x, y);
        if(t_target) {
            _setGridNull(t_target);
        }
    },

    //格子命中(c)
    setGridHit : function( x ,y ) {
        let t_target = _getGrid( self, x, y);
        if(t_target) {
            _setGridHit(t_target);
        }
    },

    //格子未命中(c)
    setGridUnHit : function( x ,y ) {
        let t_target = _getGrid( self, x, y);
        if(t_target) {
            _setGridUnHit(t_target);
        }
    },


    //格子被占有(c)
    setGridFill : function( x ,y , spf ) {

    },

    //格子消除
    setGridDisappear : function( x ,y ) {

    },

    //卡牌相关的接口

    //旋转虚拟卡牌
    rotVirCardNode : function ( cardnode ) {
    },

    //填充虚拟卡牌
    fillVirCardNode : function ( vcard ) {
    },

    //判断交叉网格
    crossVirCardNode : function( vircardnode ) {
        //提取网格数据
        if( vircardnode == null ) {
            return false;
        }
        return _crossGrid(this,vircardnode);
    }

});

function _girdIndex(self, x , y) {
    return x + y * self.colnum;
}

function _getGrid( self, x, y) {
    let t_index = _girdIndex(self, x, y);
    let t_aim = self.node.getChildByName('fk_'+t_index);
    return t_aim;
}

//构建棋盘
function _buildGrid(self,desk_node, colnum, rownum) {
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
        _fillBgNode(bg_node,'');
        //选择框节点
        var sel_node = new cc.Node('fk_sel');
        sel_node.width = self.cellw;
        sel_node.height = self.cellh;
        _fillSelNode(sel_node);
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
        num_node.active = false;
        //
        bg_node.parent = desk_node;
        bg_node.active = true;
    }
    //
    t_lay.updateLayout();
}

//交叉计算网格
function _crossGrid(self,vnode ) {
    //
    for(let k=0; k<self.node.childrenCount; k++) {
        let tmp = self.node.children[k];
        _setGridUnHit( tmp );
    }
    //判断卡牌在desk内部
    for(let i = 0;i<vnode.childrenCount;i++) {
        let v_card_grid = vnode.children[i];
        if( v_card_grid.getComponent(cc.Label) ) {
            //转换成屏幕坐标坐标
            let tt_pos = vnode.convertToWorldSpaceAR( v_card_grid.getPosition() );
            //转换到desk节点上
            tt_pos = self.node.convertToNodeSpaceAR( tt_pos );
            //遍历棋盘节点
            for(let j=0; j<self.node.childrenCount; j++) {
                let tmp = self.node.children[j];
                let rr = new cc.Rect(tmp.x, tmp.y, tmp.width, tmp.height);
                let flag = rr.contains(cc.Vec2(tt_pos.x,tt_pos.y));
                if(flag) {
                    //判断格子是否有效
                    _setGridHit( tmp );
                }
            }
        }else{

        }
    }
    // //清空选中的格子
    // for(let s=0;s<self.selectGrid.length;s++) {
    //     _setGridUnHit( self.selectGrid[s] );
    // }
    // self.selectGrid.length=0;

    // //判断有效性
    // if(self.selectGrid.length == gridlist.length ) {
    //     //目标格子表现为选中状态
    //     for(let k=0;k<self.selectGrid.length;k++) {
    //         _setGridHit( self.selectGrid[k] );
    //     }
    // }
    return true;
}

//目标节点是否为有效节点
function _validGrid(self,target) {
    if(!target){
        return ;
    }
    //目标格子的数字节点是否为真(也就是数字节点是否是显示状态)
    let num_node  = target.getChildByName('fk_num');
    if( num_node.active ){
        return false;
    }
    return true;
}

//格子空(c)
function _setGridNull( target ) {
    if(!target){
        return ;
    }
    var sel_node = target.getChildByName('fk_sel');
    if(sel_node) {
        sel_node.active = true;
    }
    var num_node = target.getChildByName('fk_num');
    if(num_node) {
        num_node.active = true;
    }
}
``
//格子命中(c)
function _setGridHit ( target ) {
    if(!target){
        return ;
    }
    var sel_node = target.getChildByName('fk_sel');
    if(sel_node) {
        sel_node.active = true;
    }
}

//格子未命中(c)
function _setGridUnHit ( target ) {
    if(!target){
        return ;
    }
    var sel_node = target.getChildByName('fk_sel');
    if(sel_node) {
        sel_node.active = false;
    }
}

//格子消除
function _setGridDisappear ( target ) {
    // //播放消除动画
    // let t_index = gird_index(x,y);
    // let t_aim = target.getChildByName('fk_'+t_index);
    // if(t_aim) {
    // }
    // _setGridNull(target);
}

//旋转虚拟卡牌
function _rotVirCardNode( self, vircardNode, angle ) {
    //调整布局参数
    //调整子节点顺序

}

//重制填充卡牌数据
function _refillVirCardNode( self, vircardNode, angle ) {

}

//主要是加载用的
function _fillBgNode( target, group ) {
    let resname = 'fk_beijing';
    if(group == 'red') {
        resname = 'fk_hongse';
    }else if(group == 'blue') {
        resname = 'fk_lanse';
    }else {
        resname = 'fk_beijing';
    }
    let sp = target.getComponent(cc.Sprite);
    if(!sp) {
        sp = target.addComponent(cc.Sprite);
    }
    sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    cc.resources.load(resname,cc.SpriteFrame, function (err, spf) {
        sp.spriteFrame = spf;
    });
}

function _fillSelNode( target ) {
    let sp = target.getComponent(cc.Sprite);
    if(!sp) {
        sp = target.addComponent(cc.Sprite);
    }    
    sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    cc.resources.load("fk_zuihouweizhi",cc.SpriteFrame, function (err, spf) {
        sp.spriteFrame = spf;
    });
}