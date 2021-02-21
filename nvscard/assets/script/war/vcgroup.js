cc.Class({

    extends: cc.Component,

    properties: {
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
    },
    
    onDisable: function () {
        //this.node.off('foobar', this._sayHello, this);
    },

    //生成虚拟卡片
    genVirtualCard : function( vcard, pos ) {
        let tt_scard = this.node.getChildByName("card"+pos);
        let tt_vir_card = vcard.genNode(198.8,5,4);     //获取desk的参数才对
        _resetVirCardNode(tt_scard ,tt_vir_card );
    },

    //
    resetVirCardNode : function (cardNode,vcardNode) {
        _resetVirCardNode(cardNode,vcardNode);
    }
});

var l_active_node = null;

//重制虚拟卡牌大小
function _resetVirCardNode (cardNode,vcardNode) {
    if(cardNode && vcardNode) {
        vcardNode.x = 0;
        vcardNode.y = 50.0;
        vcardNode.scaleX = 0.15;
        vcardNode.scaleY = 0.15;
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
    if( window.war.warlogic) {
        window.war.warlogic.selectCard(cardNode);
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

