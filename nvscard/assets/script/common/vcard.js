
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
    //卡牌是否可以旋转
    this.rot = false;
    //卡牌的总格子树木
    this.gnum = this.w * this.h;
    //卡牌的数据
    this.data = new Array();
    for(let i=0;i<this.gnum;i++) {
        if(i == 0) {
            this.data.push(1);
        }else if(i == 1) {
            this.data.push(1);
        }else{
            this.data.push(0);
        }
    }
    this.refresh();
}

module.exports = vcard;

//
vcard.prototype.initCfg = function(cfg) {
    this.uid = cfg.uid;
    this.w = cfg.sizew;
    this.h = cfg.sizeh;
    this.rot = false;
    this.gnum = this.w*this.h;
    this.data = new Array();
    for(let i=0;i<this.gnum;i++) {
        this.data.push(cfg.data[i]);
    }
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