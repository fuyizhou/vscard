
/*
    card-cfg
    uid:唯一id
    w:sizew
    h:sizeh
    data:数据
*/

var vcard = function() {
    this.uid = 0;
    this.w = 5;
    this.h = 5;
    this.rot = false;
    this.gnum =25;
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
}

//
vcard.prototype.getdata = function() {
    
}