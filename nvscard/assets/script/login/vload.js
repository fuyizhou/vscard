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
        // this.node.on('mousedown', function ( event ) {
        //     //请求服务器对战消息，根据消息然后，加载场景
        //     console.log('login-press!');
        //     cc.director.loadScene("hall");
        // });
    },

    start () {
        //_genOneCard( this );
    },

    // update (dt) {},
});


// //生成一张卡牌（卡牌索引id，卡牌数据）
// function _genOneCard ( self ) {
//     //await ;
//     // async.series([
//     // ],(error)=>{
//     // });
//     let cellsize = 300;
//     let space = 2;
//     let border = 6;
//     let vcard_col_num = 3;
//     let vcard_row_num = 2;
//     let vcard_w = cellsize*vcard_col_num + space*(vcard_col_num - 1) + 2*border;
//     let vcard_h = cellsize*vcard_row_num + space*(vcard_row_num - 1) + 2*border;

//     //生成卡牌UI
//     var tnode = self.node;
//     if(tnode) {
//         //虚拟卡牌底
//         var vcard_base_node = new cc.Node('vcard_base');
//         //计算父节点的尺寸
//         vcard_base_node.width = vcard_w;
//         vcard_base_node.height = vcard_h;
//         vcard_base_node.x = 0;
//         vcard_base_node.y = 400;
//         //设置卡牌内容
//         vcard_base_node.parent = tnode;
//         // //设置widage
//         // var t_widget = vcard_base_node.addComponent(cc.Widget);
//         // t_widget.isAlignVerticalCenter = true;
//         // t_widget.isAlignHorizontalCenter = true;
//         var t_sprite = vcard_base_node.addComponent(cc.Sprite);
//         t_sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
//         cc.resources.load("fk_beijing",cc.SpriteFrame, function (err, spf) {
//             t_sprite.spriteFrame = spf;
//         });
//         //设置卡牌布局
//         var t_layout = vcard_base_node.addComponent(cc.Layout);
//         t_layout.cellSize.width = cellsize;
//         t_layout.cellSize.height = cellsize;
//         t_layout.type = cc.Layout.Type.GRID;
//         t_layout.resizeMode = cc.Layout.ResizeMode.CHILDREN;
//         t_layout.startAxis = cc.Layout.AxisDirection.HORIZONTAL;
//         t_layout.spacingX = space;
//         t_layout.spacingY = space;
//         t_layout.paddingLeft = border;
//         t_layout.paddingRight = border;
//         t_layout.paddingTop = border;
//         t_layout.paddingBottom = border;
//         //
//         for(let j=0; j<vcard_row_num; j++) {
//             for(let i=0; i<vcard_col_num; i++) {
//                 if(i>=1 && j==0) {
//                     var in_node = new cc.Node('in_node_null');
//                     in_node.width = cellsize;
//                     in_node.height = cellsize;
//                     in_node.parent = vcard_base_node;
//                 }else{
//                     //创建背景节点
//                     var in_node = new cc.Node('in_node');
//                     in_node.width = cellsize;
//                     in_node.height = cellsize;
//                     // var in_sprite = in_node.addComponent(cc.Sprite);
//                     // if(in_sprite) {
//                     //     in_sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
//                     // }
//                     var t_num = in_node.addComponent(cc.Label);
//                     t_num.string = 'a';
//                     t_num.fontSize = cellsize;
//                     t_num.lineHeight = cellsize;
//                     in_node.parent = vcard_base_node;
//                 }
//             }
//         }
//         //
//         t_layout.updateLayout();
//         //vcard.data
//         //t_layout.updateLayout();
//         //t_widget.updateAlignment();
//     }
// }