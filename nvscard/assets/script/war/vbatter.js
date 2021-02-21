var vwarlogic = require('./vwarlogic');
//玩家
/*
    msg.uid : 角色uid
    msg.coin : 金币
    msg.name : 姓名
*/

var vbatter = function() {
    //最后的分数
    this.score = 0;
    //ai-param
    this.is_ai = false;
    //行为参数
    this.ai_aim = 1;    //1代表目标赢，0代表目标输
    this.modify = 100;  //修正值
    this.ai_nor_rate_error = 5000;       //普通错误几率
    this.ai_nor_times_error = 0;        //通错误次数
    this.ai_nor_times_max_error = 2;    //通最大错误次数
    //
    this.ai_end_rate_error = 5000;       //赛点错误几率
    this.ai_end_times_error = 0;        //赛点错误次数
    this.ai_end_times_max_error = 2;    //赛点最大错误次数
    //
    this.ai_first = true;
    //时间参数
    this.ai_acctime = 0.0;
    this.ai_waittime = 1.0;
    //首回合
    this.wait_times_min_first0 = 1;
    this.wait_times_max_first0 = 5;
    this.wait_times_min_first1 = 1;
    this.wait_times_max_first1 = 5;
    this.wait_times_min_first2 = 1;
    this.wait_times_max_first2 = 5;
    //非首回合
    this.wait_times_min_nofirst0 = 1;
    this.wait_times_max_nofirst0 = 5;
    this.wait_times_min_nofirst1 = 1;
    this.wait_times_max_nofirst1 = 5;
    this.wait_times_min_nofirst2 = 1;
    this.wait_times_max_nofirst2 = 5;
}

module.exports = vbatter;

//初始化自己
vbatter.prototype.initSelf = function(  ) {
    // if(num == 0 ) {
    //     //默认AI
    // }
}

//初始化对手
vbatter.prototype.initPlayer = function(  ) {
    // if(num == 0 ) {
    //     //默认AI
    // }
}

//初始化AI
vbatter.prototype.initAi = function( num ) {
    this.is_ai = true;
    if(num == 0 ) {
        //默认AI
    }
}

//AI执行操作
vbatter.prototype.execAI = function( ) {
    let t_num = window.vwar.warlogic.deskGridNum();
    let t_wait_time = 0;
    //计算时间参数
    if( isfirst() ) {
        //首回合
        if(t_num<5) {
            //第一段时间
            //this.ai_waittime = 

        } else if (t_num>=5 && t_num<=10 ) {
            //第二段时间

        } else {
            //第三段时间

        }
    }else {
        //非首回合
        if(t_num<5) {
            //第一段时间

        } else if (t_num>=5 && t_num<=10 ) {
            //第二段时间

        } else {
            //第三段时间
            
        }
    }
}

vbatter.prototype.isfirst = function( ) {
    return true;
}

//激活
vbatter.prototype.active = function( ) {
    if( this.ai_aim ) {
        //AI-激活
        execAI();
        this.ai_acctime = 0;
    } else {
        //非Ai-激活

    }
}

//非激活
vbatter.prototype.unActive = function( ) {
    if( this.ai_aim ) {
        //AI-非激活

    } else {
        //非Ai-非激活

    }
}

//初始化自己
vbatter.prototype.update = function( dt ) {
    this.ai_acctime += dt;
    if( this.ai_acctime>= this.ai_waittime ) {
        this.ai_play();
    }
}

//ai-出卡牌
vbatter.prototype.ai_play = function( ) {
    //获取有效卡牌
    let tt_vaild_card_num =  this.getValidCardNum();
    if(tt_vaild_card_num == 5) {
        //任意一张都可以消除
        let vcard =  this.aiRandomCard();
        //
        let t_isEnd =  this.aiIsEndWar(vcard); 
        if(t_isEnd) {
            //如果是赛点，走赛点失误处理
            if( this.ai_end_times_error>= this.ai_end_times_max_error) {
                //正常出牌
                this.aiPlayNormal();
            }else {
                let t_random = Math.floor( Math.random()*10000);
                if(t_random<this.ai_end_rate_error) {
                    //走赛点失误逻辑
                    this.ai_end_times_error++;
                    this.aiPlayHedge();
                }else {
                    //不失误
                    this.aiPlayNormal();
                }
            }
            // this.ai_end_times_error = 0;        //赛点错误次数
            // this.ai_end_times_max_error = 2;    //赛点最大错误次数
        }else {
            //走普通失误处理
            if( this.ai_nor_times_error>= this.ai_nor_times_max_error) {
                //正常出牌
                this.aiPlayNormal();
            }else {
                let t_random = Math.floor( Math.random()*10000);
                if(t_random<this.ai_nor_rate_error) {
                    //走普通误逻辑
                    this.ai_nor_times_error++;
                    this.aiPlayHedge();
                }else {
                    //不失误
                    this.aiPlayNormal();
                }
            }
        }
    }else if(tt_vaild_card_num == 0) {
        //无卡牌可以消除
        this.aiPlayHedge();
    }else {
        let t_random = Math.floor( Math.random()*10000);
        //部分卡牌可以消除
        if(this.ai_aim) {
            //计划赢
            let t_passrate =  this.aiPassRate();
            if(t_random<t_passrate) {
                //让牌
                this.aiPlayHedge();
            }else {
                //不让牌
                this.aiPlayNormal();
            }
        } else {
            //计划输
            let t_passrate = 10000 -  this.aiPassRate();
            if(t_random<t_passrate) {
                //让牌
                this.aiPlayHedge();
            }else {
                //不让牌
                //先随牌，随位置，判断是否是赛点
                if( 1 ) {
                    //是赛点
                    if(this.ai_end_times_error < this.ai_end_times_max_error) {
                        this.ai_end_times_error++;
                        this.aiPlayHedge();
                    }else{
                        this.aiPlayNormal();
                    }
                }else {
                    //非赛点
                    if(this.ai_nor_times_error < this.ai_nor_times_max_error) {
                        this.ai_nor_times_error++;
                        this.aiPlayHedge();
                    }else {
                        this.aiPlayNormal();
                    }
                }        
            }
        }
    }
    return true;
}

//获取有效卡牌
vbatter.prototype.getValidCardNum = function() {

}

//放置栅栏（按权重进行消除）
vbatter.prototype.aiPlayHedge = function( ) {
    //根据卡牌结果计算 权重，选取，目标位置
    let t_card = aiRandomCard();

}

//普通出牌
vbatter.prototype.aiPlayNormal = function( vcard ) {
    //罗列所有消除方式，随机一个消除

}

//随机一张卡牌
vbatter.prototype.aiRandomCard = function() {
    let t_index = Math.floor( Math.random()*5);
    let vcard = null;
    return vcard;
}

//判断是否是赛点
vbatter.prototype.aiIsEndWar = function( vcard ) {

}

//ai-让拍几率，返回 （0-10000）
vbatter.prototype.aiPassRate = function() {
    // 公式G1  几率=（AI当前分数-玩家当前分数）/（当前场次胜利分数/s）
    // modify 需要支持对应每套AI单独配置
    let tt_value = (this.score - window.war.vwarlogic.blueBatter.score) / (window.war.vwarlogic.maxScore/this.modify);
    return tt_value;
}


