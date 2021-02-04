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
                    _selectCard( event.currentTarget );
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
    },

    //
    resetVirCardNode : function (cardNode,vcardNode) {
        _resetVirCardNode(cardNode,vcardNode);
    }

    
});

var l_active_node = null;

//生成一张卡牌（卡牌索引id，卡牌数据）
function _genOneCard ( self, iid, vcard ) {
    //生成卡牌UI
    var scard = self.node.getChildByName("card"+iid);
    if(scard) {
        //虚拟卡牌底
        let t_sc = cc.director.getScene();
        if(t_sc) {
            let scene_root = t_sc.getChildByName('cvs_war');
            let war_bg = scene_root.getChildByName('war_bg');
            let ly_desk = war_bg.getChildByName('ly_desk');
            let t_script = ly_desk.getComponent('vdesk');
            if(t_script) {
                let t_vir_cardnode = t_script.genVirCardNode( vcard );
                _resetVirCardNode(scard ,t_vir_cardnode );
            }
        }
    }
}

//重制虚拟卡牌大小
function _resetVirCardNode (cardNode,vcardNode) {
    if(cardNode && vcardNode) {
        vcardNode.x = 0;
        vcardNode.y = 50.0;
        vcardNode.scaleX = 0.2;
        vcardNode.scaleY = 0.2;
        vcardNode.parent = cardNode;
    }
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
function _selectCard( cardNode ) {
    if(cardNode) {
        l_active_node = cardNode;
        //将该节点送到mv上
        let t_sc = cc.director.getScene();
        if(t_sc) {
            let scene_root = t_sc.getChildByName('cvs_war');
            let center_node = scene_root.getChildByName('ly_center');
            let t_script = center_node.getComponent('vcardmv');
            if(t_script) {
                t_script.setSelectCard( cardNode);
            }
        }
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

