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

    ctor: function () {
        // 声明实例变量并赋默认值
        //需要动态设置cellsize
        this.cur_cardNode = null;
        this.cur_virCardNode = null;
        this.canPlace = false;
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        //
        this.node.on(cc.Node.EventType.MOUSE_MOVE, function ( event ) {
            if(window.vapp.warlogic && window.vapp.warlogic.isSelect() ) {
                let pos = event.getLocation();
                let lpos = event.currentTarget.convertToNodeSpaceAR( pos );
                window.vapp.warlogic.moveCard(lpos);
                // let t_script = event.currentTarget.getComponent('vcardmv');
                // if( t_script && t_script.cur_virCardNode!=null ) {
                //     //有选中的节点，则设置目标节点位置
                //     t_script.cur_virCardNode.x = lpos.x;
                //     t_script.cur_virCardNode.y = lpos.y;
                //     //做desk的cross算法
                // }
            }
        });

        //
        this.node.on(cc.Node.EventType.MOUSE_UP, function ( event ) {
            if(window.vapp.warlogic) {
                window.vapp.warlogic.cancleCard();
            }
            // let t_sc = cc.director.getScene();
            // if(t_sc) {
            //     let scene_root = t_sc.getChildByName('cvs_war');
            //     let t_script = scene_root.getComponent('vwar');
            //     if(t_script) {
            //         window.vapp.warlogic.cancleCard();
            //     }
            // }
        });
    },

    //
    setSelectCard( cardNode ) {
        if( this.cardNode!=cardNode ) {
            //卡牌消失
            this.cardNode = cardNode;
            this.cardNode.active = false;
            //获取虚拟卡牌
            this.virCardNode = this.cardNode.getChildByName('vircard');
            if( this.virCardNode ) {
                //调整虚拟卡牌位置和父子关系
                this.virCardNode.parent = null;
                let t_oldpos = cc.v2(this.virCardNode.x,this.virCardNode.y);
                let t_newpos = this.virCardNode.convertToWorldSpaceAR( t_oldpos );
                t_newpos = this.node.convertToNodeSpaceAR( t_newpos );
                this.virCardNode.parent = this.node;
                this.virCardNode.x = t_newpos.x;
                this.virCardNode.y = t_newpos.y;
                this.virCardNode.scaleX = 1.0;
                this.virCardNode.scaleY = 1.0;
            }
        }
    },
    // for(let i=0;i<5;i++) {
    //     var card = this.node.getChildByName("card"+i);
    //     if(card) {
    //         card.on('mousedown', function ( event ) {
    //             //请求服务器对战消息，根据消息然后，加载场景
    //             //console.log("select card:"+ event.currentTarget._name);
    //             _selectCard( event.currentTarget);
    //         });
    //         // card.on('mouseup', function ( event ) {
    //         //     //请求服务器对战消息，根据消息然后，加载场景
    //         //     console.log("place card:"+event.currentTarget);
    //         //     _placeCard(0,0);
    //         // });
    //         // card.on('mousemove', function ( event ) {
    //         //     //请求服务器对战消息，根据消息然后，加载场景
    //         //     console.log("move card:"+event.currentTarget._name);
    //         //     _placeCard(0,0);
    //         // });
    //     }
    // }
    onEnable: function () {
        let i = 0;
    },

    onDisable: function () {

    },

    start () {

    },

    // update (dt) {},
});
