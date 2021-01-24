
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
        }else{
            this.data.push(0);
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