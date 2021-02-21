
/*
    card-cfg
    uid:唯一id
    w:sizew
    h:sizeh
    data:数据
*/

var vcard = function() {
    this.uid = 0;
    //卡牌的宽度和长度
    this.w = 5;
    this.h = 5;
    this.gnum = this.w * this.h;
    //卡牌是否可以旋转
    this.lock = false;
}

module.exports = vcard;

//将数据装入卡牌中
vcard.prototype.initCfg = function(cfg) {
    this.uid = cfg.pid;
    this.name = cfg.name;
    this.level = cfg.level;
    this.nexlevel = cfg.nxtlevel;
    this.skin = cfg.skin;
    this.lock = cfg.lock;
    //固定数据
    this.w = 5;
    this.h = 5;
    this.gnum = this.w*this.h;
    this.data = new Array();
    for(let i=0;i<this.gnum;i++) {
        let flag = 'g' + i;
        this.data.push( parseInt(cfg[flag],10) );
    }
    //
    this.refresh();
}

//
vcard.prototype.getdata = function( x,y ) {
    let t_index = x + y*this.w;
    if(t_index<this.gnum) {
        return this.data[t_index];
    }
    return -1;
}

//刷新数据（计算一些额外的属性）
vcard.prototype.refresh = function() {
    //计算卡牌有数字的矩形
    this.startp = { x:10000,y:10000 };
    this.endp = { x:-10000 ,y:-10000 };
    for(let j=0;j<this.data.length;j++) {
        if(this.data[j]>0) {
            let t_x = j%this.w;
            let t_y = Math.floor(j/this.w);
            if(t_x<this.startp.x) {
                this.startp.x = t_x;
            }
            if(t_y<this.startp.y) {
                this.startp.y = t_y;
            }
            if(t_x>=this.endp.x) {
                this.endp.x = t_x+1;
            }
            if(t_y>=this.endp.y) {
                this.endp.y = t_y+1;
            }
        }
    }
    this.valid_colnum = this.endp.x - this.startp.x;
    this.valid_rownum = this.endp.y - this.startp.y;
}

//生成节点（）
vcard.prototype.genNode = function( cellsize, border, space ) {
    //
    let t_cell_w = cellsize;
    let t_cell_h = cellsize;
    let t_vcard_w = cellsize*this.w + (this.w-1)*space + 2*border;
    let t_vcard_h = cellsize*this.h + (this.h-1)*space + 2*border;
    //
    var vircard_node = new cc.Node('vircard');
    vircard_node.x = 0;
    vircard_node.y = 0;
    vircard_node.width = t_vcard_w;
    vircard_node.height = t_vcard_h;
    vircard_node.opacity = 128;
    //设置卡牌布局
    var t_layout = vircard_node.addComponent(cc.Layout);
    t_layout.cellSize.width = t_cell_w;
    t_layout.cellSize.height = t_cell_h;
    t_layout.type = cc.Layout.Type.GRID;
    t_layout.resizeMode = cc.Layout.ResizeMode.CHILDREN;
    t_layout.startAxis = cc.Layout.AxisDirection.HORIZONTAL;
    t_layout.spacingX = space;
    t_layout.spacingY = space;
    t_layout.paddingLeft = border;
    t_layout.paddingRight = border;
    t_layout.paddingTop = border;
    t_layout.paddingBottom = border;
    //设置子节点背景
    var t_sp = vircard_node.addComponent(cc.Sprite);
    if(t_sp) {
        t_sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        cc.resources.load("fk_beijing",cc.SpriteFrame, function (err, spf) {
            t_sp.spriteFrame = spf;
        });
    }
    //设置子节点
    for(let i=0; i<this.gnum; i++) {
        let t_value = this.data[i];
        if(t_value>0) {
            //创建有效节点
            let grid_node = new cc.Node('gridnode_'+i);
            grid_node.width = t_cell_w;
            grid_node.height = t_cell_h;
            grid_node.parent = vircard_node;
            this.fillBgNode(grid_node,'red');
            //创建数字节点
            let num_node = new cc.Node('number');
            var num_label = num_node.addComponent(cc.Label);
            if(num_label) {
                num_label.string = ''+t_value;
                num_label.fontSize = t_cell_h;
                num_label.lineHeight = t_cell_h;
            }              
            var num_widget = num_node.addComponent(cc.Widget);
            if(num_widget) {
                //布局
                num_widget.isAlignLeft = true;
                num_widget.isAlignRight = true;
                num_widget.isAlignBottom = true;
                num_widget.isAlignTop = true;
                num_widget.updateAlignment();
            }
            num_node.parent = grid_node;
        } else {
            //创建空节点
            var hull_node = new cc.Node('nullnode_'+i);
            hull_node.width = t_cell_w;
            hull_node.height = t_cell_h;
            hull_node.parent = vircard_node;
        }
    }
    t_layout.updateLayout();
    return vircard_node;
}

//主要是加载用的
vcard.prototype.fillBgNode = function( target, group ) {
    let resname = 'fk_beijing';
    if(group == 'red') {
        resname = 'fk_hongse'; //fk_lanse
    }else if(group == 'blue') {
        resname = 'fk_lanse';
    }else {
        resname = 'fk_beijing';
    }
    let sp = target.getComponent(cc.Sprite);
    if(sp == null) {
        sp = target.addComponent(cc.Sprite);
    }
    sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    cc.resources.load(resname,cc.SpriteFrame, function (err, spf) {
        sp.spriteFrame = spf;
    });
}

vcard.prototype.fillSelNode = function( target ) {
    let sp = target.getComponent(cc.Sprite);
    if(!sp) {
        sp = target.addComponent(cc.Sprite);
    }    
    sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    cc.resources.load("fk_zuihouweizhi",cc.SpriteFrame, function (err, spf) {
        sp.spriteFrame = spf;
    });
}