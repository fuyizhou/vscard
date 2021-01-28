// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({

    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:
    
    onLoad () {
        for(let i=0;i<5;i++) {
            var card = this.node.getChildByName("card"+i);
            if(card) {
                card.on('mousedown', function ( event ) {
                    //请求服务器对战消息，根据消息然后，加载场景
                    //console.log("select card:"+ event.currentTarget._name);
                    _selectCard( event.currentTarget);
                });
                // card.on('mouseup', function ( event ) {
                //     //请求服务器对战消息，根据消息然后，加载场景
                //     console.log("place card:"+event.currentTarget);
                //     _placeCard(0,0);
                // });
                // card.on('mousemove', function ( event ) {
                //     //请求服务器对战消息，根据消息然后，加载场景
                //     console.log("move card:"+event.currentTarget._name);
                //     _placeCard(0,0);
                // });
            }
        }
    },

    start () {
        //为每个节点设置逻辑卡牌

    },

    update (dt) {
        //刷新虚拟卡牌
        //_refreshVirCard( this );

    },

    onEnable: function () {
        //this.node.on('foobar', this._sayHello, this);
        //war中准备好了5张卡牌，这里需要将卡牌实力化成UI
        let i = 0;
        let j = 0;
    },
    
    onDisable: function () {
        //this.node.off('foobar', this._sayHello, this);
    },

    //生成虚拟卡片
    genVirtualCard : function( data ) {
        for(let i=0; i < data.length; i++ ) {
            _genOneCard( this, i,data[i] );
        }   
    }
});

var l_active_node = null;

//生成一张卡牌（卡牌索引id，卡牌数据）
function _genOneCard ( self, iid, vcard ) {
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

function _setVirCardSPF( cardnode , spf) {
    if(cardnode && spf) {
       var t_basenode = cardnode.getChildByName('vcard_base');
       t_basenode.children.forEach( node => {
           var sp = node.getComponent(cc.Sprite);
           if(sp) {
               sp.spriteFrame = spf;
           }
           node.width = 40;
           node.height = 40;
       });
    }
}

//选中卡牌
function _selectCard( targetNode ) {
    if(targetNode) {
        l_active_node = targetNode;
        targetNode.active = false;
        //节点身上应该带上逻辑card
        let testEvent = new cc.Event.EventCustom("e-card-select", true);//创建自定义事件
        testEvent.setUserData( targetNode.getUserData() );    //设置自定义事件中包含的数据
        targetNode.dispatchEvent(testEvent);    //用节点分发事件
        //targetNode.emit('say-hello', 'Hello, this is Cocos Creator');
    }
}

//选中卡牌
function _moveCard( px, py) {

}

//放置卡牌
function _placeCard( px, py) {
    if(l_active_node) {
        l_active_node._opacity = 255;
        //抽卡
        //l_active_node.setUserData( window.war.drawCard() );
    }
    // if(targetNode) {
    //     targetNode._opacity = 0;
    //     //节点身上应该带上逻辑card
    //     let testEvent = new cc.Event.EventCustom("e-card-select", true);//创建自定义事件
    //     testEvent.setUserData( targetNode.getUserData() );    //设置自定义事件中包含的数据
    //     targetNode.dispatchEvent(testEvent);    //用节点分发事件
    //     //targetNode.emit('say-hello', 'Hello, this is Cocos Creator');
    // }
}

//刷新卡牌
function _refreshVirCard( vcgroup ) {
    // //更新sprite-frame
    // for(let i=0;i<5;i++) {
    //     var card = vcgroup.node.getChildByName("card"+i);
    //     if(card && card.userdata.dirty == true) {
    //         if( this.vapp.war.spf_lan ) {
    //             card.userdata.dirty = false;
    //             _setVirCardSPF(card, this.vapp.war.spf_lan );
    //         }
    //     }
    // }
}

