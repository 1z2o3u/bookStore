<template>
    <div id="app">
        <div class="nav">
            <div class="container">
            <ul class="nav-left">
                <li class="welcome" v-if="rl_show">欢迎来到书田！</li>
                <router-link to="/login" v-if="rl_show"  class="login" tag="li">登录</router-link>
                <li class="line" v-if="rl_show">|</li>
                <router-link to="/register" v-if="rl_show" class="register" tag="li">注册</router-link>
                <li class="username" v-if="username_show">
                    欢迎来到书田！<span class="user">{{username}}</span>
                    <span class="exit" @click="exit">退出</span>
                </li>
            </ul>
            <ul class="nav-right">
                    <!-- <li class="help"><a href="#">帮助中心</a></li>
                    <li class="collect"><a href="#">收藏夹</a></li> -->
                    <router-link to="/my/me" tag="li" class="help">我的</router-link>
                    <router-link to="/car" tag="li" class="car">购物车</router-link>
                    <router-link to="/index" tag="li" class="index">首页</router-link>
            </ul>
            </div>
        </div>
             <!-- 标签、步骤条 -->
        <div class="logo">
                <div class="container">
                    <h1>ShuTian</h1>
                </div>
        </div>
        <div class="container">
            <div class="cf-or">
                <h2>
                    确认订单
                </h2>
            </div>
            <div class="main">
                <div class="info-title"><h2 class="address-nav">收货信息</h2></div>
                <div class="ads-nav">
                    <p class="detail-ads">地址</p>
                    <p class="name">名字
                    </p>
                    <p class="phone">电话</p>
                </div>
                <div class="ads" >
                    <p class="detail-ads">{{userinfo.address}} </p>
                    <p class="name">{{userinfo.nickName}}
                    </p>
                    <p class="phone">{{userinfo.phone}}</p>
                </div>

                <div class="order-list">
                    <div class="info-title"><h2 class="address-nav">订单信息</h2></div>
                    <ul>
                        <li v-for="(item,index) in orderList" :key=index>
                            <p class="pic"><img :src="item.Src" alt=""></p>
                            <p class="title">{{item.Title}}</p>
                            <p class='cost-price'>￥{{item.CostPrice}}</p>
                            <p class="count">x{{item.Count}}</p>
                            <p class="state">待付款</p>
                        </li>
                    </ul>
                    <div class="total">合计：
                        <span class="total-num">￥{{total}}</span>
                        <span class="pay" @click="confirm">确认订单</span>
                    </div>
                </div>
            </div>
        </div>

        <Footer></Footer>

            <div class="confirm-pay" v-if="confirm_show">
                <div class="cnf-pay">
                    <p class="cnf-title">确认支付</p>
                    <p class="icon-off">
                        <svg class="icon  off" aria-hidden="true" @click="off">
                            <use xlink:href="#icon-shanchuguanbicha"></use>
                        </svg>
                    </p>
                </div>
                <div class="sum">
                    ￥{{this.total}}
                </div>
                <div class="pay-type">
                    <p>付款方式:</p>
                    <p>农业银行卡
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-iconfontjiantou2"></use>
                    </svg>
                    </p>
                </div>
                <div class="pay-num"><p>卡号:</p><p>**** **** **** 1679</p></div>
                <div class="password"><a href="#">输入密码</a></div>
            </div>

    </div>
</template>

<script>
import Footer from  '@/components/Footer'
export default {
    name:'app',
    components:{
        Footer
    },
    data(){
        return{
            username_show:0,  //用户名显示
            rl_show:1,   //登录、注册显示
            username:'',
            userinfo:'', //用户信息
            orderList:[], //订单列表
            total:0,
            confirm_show:0,

        }
    },

    mounted(){
        this.show_username() 
        this.getAddress()
        this.getOrder()  
    },
    methods:{
        //  显示用户名
        show_username(){
            if(localStorage.getItem('User')){
                var username= localStorage.getItem('User')
                username=JSON.parse(username)
                this.username=username[0]
                this.username_show=1
                this.rl_show=0
            }
        },
        // 退出登录
        exit(){
                localStorage.removeItem('User')
                this.username_show=0
                this.rl_show=1 
                this.$router.push({path:'/login'})
        },
        getAddress(){
                var phone=localStorage.getItem('User')
                phone=JSON.parse(phone)[0]
                this.$axios.post('http://localhost:3000/getNick',{user:phone},{}).then(
                    res => {
                        this.userinfo=res.data.userinfo[0]
                    },
                    err => {
                    }
                )
        },
        getOrder(){
            this.orderList=this.$route.params.orderInfo
            var total=this.$route.params.total
            this.total=total.toFixed(2)
            window.scrollTo({top:0})  
        },
        confirm(){
            this.confirm_show=1
        },
        off(){
            this.confirm_show=0 
        }
      

   
    }
}
</script>
<style scoped lang='scss'>

    .router-link-exact-active{
        color: rgb(0, 255, 0);
        font-size: 20px;
        font-weight: 800;
    }
        #app{
            overflow: hidden;
        }

         .nav{
            background: rgb(41, 39, 39);
            height:50px;
        .container{
            position: relative;
            height: 100%;
            width:1200px;
            margin: 0 auto;
            color: #fff;
           .nav-left{
                position:absolute;
                height: 100%;
                overflow: hidden;
                line-height: 50px;
               li{
                  float:left;
                  a{
                      color: #fff;
                  }
               }
               .login{
                   margin: 0 5px 0 30px;
                  
               }
                .line{
                    margin: 0 5px 0 0;
                }
                 .username{
                  color: #fff;
                  font-size: 16px;
                  .user{
                      color: red;
                      font-size: 20px;
                  }
                  .exit{
                      margin-left: 20px;
                  } 
                } 
           }
           .nav-right{
                position:absolute;
                height:100%;
                overflow: hidden;
                right:30px;
                line-height: 50px;
                li{
                    float: right;
                    margin-left: 30px;
                    a{
                        color: #fff;
                    }
                }
           }
        }
    }
    // 标签
    .logo{
        background: rgb(245, 239, 239);
        .container{
            overflow:hidden;
            width: 1200px;
            margin: 0  auto;
            h1{
                line-height: 150px;
                color: rgb(130, 241, 25);
                font-size: 50px;
                font-style: italic;
                text-align: left;
                width:300px;
                float:left;
            }   
        }
    }

    .container{
        margin-top: 30px;
        width: 1200px;
        margin: 30px auto;
        .cf-or{
            h2{
                font-size: 24px;
                color: rgb(52, 221, 10);
                line-height: 3;
                // width: 100px;
                text-align: left;
                font-style: italic;
                padding: 0 30px;
                border-bottom: 2px solid rgb(52, 221, 10);
            }
        }
        .main{
            margin-bottom: 100px;
            .info-title{
                background: rgb(238, 233, 233);  
            }
            .ads{
                    border:1px solid rgb(209, 202, 202);
                    line-height: 2;
                    display: flex;
                    font-size: 16px;
                    background: rgb(238, 233, 233);
                    p{
                          flex: 1;
                    }
            }
            .ads-nav{
                    border:1px solid rgb(209, 202, 202);
                    border-bottom: 0;
                    line-height: 2;
                    display: flex;
                    font-size: 16px;
                    background: rgb(238, 233, 233);
                    p{
                          flex: 1;
                    }
            }
            .address-nav{
                font-size: 20px;
                color: rgb(52, 221, 10);
                line-height: 3;
                width: 100px;
                padding: 0 30px;
                border-bottom: 1px solid rgb(52, 221, 10);
                background: rgb(238, 233, 233);
                margin-top: 30px;
            }
            .order-list{
                        margin-top: 30px;
                        position: relative;
                        li{
                            display: flex;
                            position: relative;
                            background: rgb(243, 244, 247);
                            border-bottom: 1px solid rgb(143, 135, 135);
                            justify-content: space-around;
                            align-items: center;
                            padding-bottom: 10px;
                            .pic{
                                font-size: 20px;
                                img{
                                    width: 100px;
                                    height: 100px;
                                    margin-top: 20px;
                                }
                            }
                            .title{
                                font-size: 24px;
                            }
                            .cost-price{
                                font-size: 18px;
                                color: rgb(66, 60, 60);
                            }
                            .count{
                                font-size: 18px;
                                color: rgb(155, 145, 145);
                            }
                            .state{
                                font-size: 20px;
                                color: rgb(148, 138, 138);
                            }  
                            
                        }
                        .total{
                                position: absolute;
                                bottom: -30px;
                                right: 70px;
                                font-size: 18px;
                                .pay{
                                    padding: 10px 15px;
                                    background: red;
                                    color: #fff;
                                    font-size: 18px;
                                    border-radius: 8px;
                                }
                                .total-num{
                                    margin-right: 20px;
                                    color: red;
                                    font-size: 24px;
                                }
                            }
                    }   
            }
    }


            .confirm-pay{
                background: rgb(238, 229, 229);
                width: 800px;
                height: 500px;
                position:fixed;
                padding-top: 50px;
                top:100px;
                left: 450px;
                .off{
                    font-size: 40px;
                    color: rgb(60, 231, 8);
                }
                div{
                    display: flex;
                    line-height: 3;
                    align-items: center;
                    font-size: 20px;
                    justify-content: space-around;
                }
                .cnf-title{
                    text-align:right;
                    font-size: 28px;
                    flex: 2;
                    padding-right: 100px;
                }
                .icon-off{
                    text-align: center;
                    flex: 1;
                }
                .sum{
                    font-size: 50px;
                    font-weight: 800;
                }
                .password a{
                    color: rgb(20, 98, 223);
                }
            }
       
</style>


