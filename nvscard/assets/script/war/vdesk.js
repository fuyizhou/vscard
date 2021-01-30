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
        //
        this.selectGrid = new Array();
    },

    onLoad () {
        //构建desk
        _buildGrid(this,this.node, this.colnum, this.rownum);
        //
        let t_girdlist = new Array();
        t_girdlist.push( {x:-100,y:-100} );
        t_girdlist.push( {x:10,y:10} );
        //t_girdlist.push( {x:50,y:50} );
        //t_girdlist.push();
        _crossGrid(this,t_girdlist);
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
        num_node.active = false;
        //
        bg_node.parent = desk_node;
        bg_node.active = true;
    }
    //
    t_lay.updateLayout();
}

//交叉计算网格
function _crossGrid(self,gridlist ) {
    //清空选中的格子
    for(let s=0;s<self.selectGrid.length;s++) {
        _setGridUnHit( self.selectGrid[s] );
    }
    self.selectGrid.length=0;
    //选择对应的格子
    for( let i=0;i<gridlist.length;i++ ) {
        //网格中心点
        let t_aim_pt = gridlist[i];
        //遍历棋盘网格
        for(let j=0; j<self.node.childrenCount; j++) {
            let tmp = self.node.children[j];
            if(t_aim_pt.x>tmp.x && t_aim_pt.x<(tmp.x+tmp.width) && t_aim_pt.y>tmp.y && t_aim_pt.y<(tmp.y+tmp.height)) {
                   //在此格子中间
                   if( _validGrid(self,tmp) ) {
                       self.selectGrid.push( tmp );
                   }
               }
        }
    }
    //判断有效性
    if(self.selectGrid.length == gridlist.length ) {
        //目标格子表现为选中状态
        for(let k=0;k<self.selectGrid.length;k++) {
            _setGridHit( self.selectGrid[k] );
        }
    }
}

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


// //格子被占有(c)
// setGridFill : function(node, spf ) {
//     let t_index = gird_index(x,y);
//     let t_aim = this.node.getChildByName('fk_'+t_index);
//     if(t_aim) {
//         var sp = bg_node.getComponent(cc.Sprite);
//         sp.spriteFrame = spf;
//     }
// },

//格子消除
function _setGridDisappear ( target ) {
    // //播放消除动画
    // let t_index = gird_index(x,y);
    // let t_aim = target.getChildByName('fk_'+t_index);
    // if(t_aim) {

    // }
    // _setGridNull(target);
}

//生成虚拟卡牌节点
function _genVirCardNode(self,vcard) {
    let cellsize = 80;
    let space = 2;
    let border = 6;
    let vcard_col_num = vcard.endp.x - vcard.startp.x;
    let vcard_row_num = vcard.endp.y - vcard.startp.y;
    let vcard_w = cellsize*vcard_col_num + space*(vcard_col_num - 1) + 2*border;
    let vcard_h = cellsize*vcard_row_num + space*(vcard_row_num - 1) + 2*border;
    //生成卡牌UI
    var scard = self.node.getChildByName("card"+iid);
    if(scard) {
        // let userdata = { dirty: true };
        // scard.userdata = userdata;
        //虚拟卡牌底
        var vircard_node = new cc.Node('vircard'+iid);
        vircard_node.width = vcard_w;
        vircard_node.height = vcard_h;
        // vircard_node.x = 0;
        // vircard_node.y = 400;
        //设置卡牌布局
        // var t_layout = vircard_node.addComponent(cc.Layout);
        // t_layout.cellSize.width = cellsize;
        // t_layout.cellSize.height = cellsize;
        // t_layout.type = cc.Layout.Type.GRID;
        // t_layout.resizeMode = cc.Layout.ResizeMode.CHILDREN;`
        // t_layout.startAxis = cc.Layout.AxisDirection.HORIZONTAL;
        // t_layout.spacingX = space;
        // t_layout.spacingY = space;
        // t_layout.paddingLeft = border;
        // t_layout.paddingRight = border;
        // t_layout.paddingTop = border;
        // t_layout.paddingBottom = border;
        // t_layout.updateLayout();
        //设置widage
        var t_widget = vircard_node.addComponent(cc.Widget);
        t_widget.isAlignVerticalCenter = true;
        t_widget.isAlignHorizontalCenter = true;
        t_widget.horizontalCenter = 0;
        t_widget.verticalCenter = 50;
        //
        var t_sprite = vircard_node.addComponent(cc.Sprite);
        if(t_sprite) {
            t_sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            cc.resources.load("fk_beijing",cc.SpriteFrame, function (err, spf) {
                t_sprite.spriteFrame = spf;
            });
        }
        // //
        // var t_label = vircard_node.addComponent(cc.Label);
        // if(t_label) {
        //     t_label.string = 'a';
        //     t_label.fontSize = cellsize;
        //     t_label.lineHeight = cellsize;
        // }   
        vircard_node.parent = scard;
    //     //设置卡牌内容
    //     for(let j=0; j<vcard_row_num; j++) {
    //         for(let i=0; i<vcard_col_num; i++) {
    //             //计算数据索引
    //             let t_index = (i + vcard.startp.x) + (j + vcard.startp.y)*vcard.w;
    //             let t_value = vcard.data[t_index];
    //             if(t_value>0) {
    //                 //创建背景节点
    //                 var num_node = new cc.Node('num_node'+t_index);
    //                 num_node.width = cellsize;
    //                 num_node.height = cellsize;
    //                 var num_sp = num_node.addComponent(cc.Sprite);
    //                 if(num_sp) {
    //                     num_sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    //                 }
    //                 var num_label = num_node.addComponent(cc.Label);
    //                 if(num_label) {
    //                     num_label.string = ''+t_value;
    //                     num_label.fontSize = cellsize;
    //                     num_label.lineHeight = cellsize;
    //                 }                
    //                 // var num_widget = num_node.addComponent(cc.Widget);
    //                 // if(num_widget) {
                        
    //                 // }
    //                 num_node.parent = vircard_node;
    //             }else{
    //                 //应该推入空节点
    //                 var hull_node = new cc.Node('null_node');
    //                 hull_node.width = cellsize;
    //                 hull_node.height = cellsize;
    //                 hull_node.parent = vircard_node;
    //             }
    //         }
    //     }
    }
    //let jj = 0;
}

//主要是加载用的
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