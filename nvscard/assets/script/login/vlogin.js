// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var pomelo = require("../third/pomelo/pomelo-client.js");
var vapp = require("../vapp.js");

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
        this.node.on('mousedown', function ( event ) {
            //请求服务器对战消息，根据消息然后，加载场景
            _login();
        });
    },

    start () {

    },

    update (dt) {
        //
        let j=0;
    },
});

var _login = function() {
    let host="127.0.0.1";
    let port = 3014;
    pomelo.init({
        host: host,
        port: port,
        user: {},
        handshakeCallback : function(){
            let i = 0;
        }
    }, function() {
        console.log('success-gate');
        //调用路由函数
        var route = 'gate.gateHandler.queryEntry';
        var msg = {
            uid : 1111
        };
        pomelo.request(route ,msg , function( ret ) {
            console.log('request gate addr!',ret);
            //
            window.pomelo.disconnect();
            //
            _loginConDefault( ret );
        });
    } ,function( err ) {
        //连接错误
        console.log('gate connect error : ' + err );
        //link error
        _localLoginSucc();
    });
}

//
var _loginConDefault = function ( msg ) {
    pomelo.init({
        host: msg.host,
        port: msg.port,
        user: {},
        handshakeCallback : function(){
        }
    }, function() {
        console.log('success-connect');
        //调用路由函数
        var route = 'connector.entryHandler.entry';
        var info = {
            token: "11111111",
            method : 9
        };
        pomelo.request(route ,info , function( ret ) {
            console.log('request connector addr!',ret);
            if(1) {
                //服务器验证通过
                _netLoginSucc(ret);
            }else{
                //服务器验证失败
                _localLoginSucc();
            }
        });
    } ,function( err ) {
        //连接错误
        console.log('con connect error : ' + err );
        //link error
        _localLoginSucc();
    });
}

var _loginConNor = function ( msg ) {
    pomelo.init({
        host: msg.host,
        port: msg.port,
        user: {},
        handshakeCallback : function(){
        }
    }, function() {
        console.log('success-connect');
        //调用路由函数
        var route = 'connector.entryHandler.entry';
        var info = {
            token: "22222222",
            method : 1,
            usrname : "test",
            pwd : "88888888"
        };
        pomelo.request(route ,info , function( ret ) {
            console.log('request connector addr!',ret);
        });
    });
}

var _netLoginSucc = function( msg ) {
     //
     window.vapp.init(msg);
     //test
     cc.director.loadScene("hall");
}

var _localLoginSucc = function() {
    //
    var localmsg = {};
    var cfg_player = {};
    cfg_player.uid = '11111111';
    cfg_player.name = '烫烫烫烫烫烫烫烫';
    cfg_player.level = 999;
    cfg_player.exp = 99999999;
    cfg_player.coin = 99999999;
    localmsg.player = cfg_player;
    var cfg_cp = {};
    cfg_cp.cardnum = 10;
    cfg_cp.data = new Array();
    localmsg.cardgroup = cfg_cp;
    //
    window.vapp.init(localmsg);
    //test
    cc.director.loadScene("hall");
}

