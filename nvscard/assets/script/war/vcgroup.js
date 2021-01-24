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

    // update (dt) {},

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
var _genOneCard = function ( self, iid, data ) {
    //生成UI
    var card = self.node.getChildByName("card"+iid);
    if(card) {
        //根据数据生成卡牌
        var vcb_node = new cc.Node('vcard_base_'+i);
        // var sp = bg_node.addComponent(cc.Sprite);
        // sp.spriteFrame = ret;
        vcb_node.parent = card;
    }
}

//选中卡牌
var _selectCard = function( targetNode ) {
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
var _moveCard = function( px, py) {

}

//放置卡牌
var _placeCard = function( px, py) {
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

