<template>
    <div id="app">
        <div class="wrap">
            <!-- 导航栏 -->
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
                            <li class="help"><a href="#">帮助中心</a></li>
                            <li class="collect"><a href="#">收藏夹</a></li>
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
                    <div class="step">
                        <ul>
                            <router-link to="/my/me" tag="li">首页</router-link>
                            <router-link to="/my/order" tag="li">我的订单</router-link>
                            <li>消息</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="left">
                    <dl>
                        <dt> 
                            <router-link to="/my/me">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-home"></use>
                                </svg>个人中心
                            </router-link>
                           
                        </dt>
                        <dt>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-rmb"></use>
                            </svg>
                            我的资产
                        </dt>
                        <dd>
                            <router-link to='/my/ticket'>卡券</router-link>
                        </dd>
                        <dd>
                            <router-link to='/my/integral'>积分</router-link>
                        </dd>
                        <dd>
                            <router-link to='/my/balance'>余额</router-link>
                        </dd>
                        <dt>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gerenzhongxin-xuanzhong"></use>
                            </svg>
                            我的资料
                        </dt>
                        <dd> <router-link to='/my/data'>个人资料</router-link></dd>
                        <dd> <router-link to='/my/address'>我的地址</router-link></dd>
                         <dt>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dingdan2"></use>
                            </svg>
                             我的订单
                         </dt>
                        <dd> <router-link to='/my/order'>交易成功</router-link></dd>
                        <dd> <router-link to='/my/order'>待付款</router-link></dd>
                        <dd> <router-link to='/my/order'>已失效</router-link> </dd>
                    </dl>
                </div>
                <router-view></router-view>
            </div>
        </div>          
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from '@/components/Footer'
import Me from '@/components/my/Me'
export default {
    components:{
        Footer,
        Me
    },
    name: 'App',
    data(){
        return{
            username_show:0,
            rl_show:1,
            username:'', 
        }
    },
    mounted(){
        this.show_username() 
        if(!(localStorage.getItem('User'))){
            this.$router.push({path:'/login'})
        }     
        },
    methods:{
        show_username(){
            if(localStorage.getItem('User')){
                var username= localStorage.getItem('User')
                username=JSON.parse(username)
                console.log('你那呢',username)
                this.username=username[0]
                this.username_show=1
                this.rl_show=0
            }
        },
        exit(){
                localStorage.removeItem('User')
                this.username_show=0
                this.rl_show=1 
                this.$router.push({path:'/login'})
        },  
        
    }
}
</script>
<style <style lang="scss" scoped>

    .router-link-exact-active{
        color: rgb(0, 255, 0);
        font-size: 20px;
        font-weight: 800;
    }

    .icon{
        font-size: 24px;
        // color:red;
    }
   
    .wrap{
          position: relative;
          background: rgb(245, 239, 239); 
            h2{
            top:216px;
            left:800px;
            width:600px;
            text-align: left;
            position: absolute;
            color: rgb(18, 233, 18);
            font-size: 22px;
            line-height: 2;
            margin-bottom: 30px;
            border-bottom: 1px solid   rgb(18, 233, 18);
        }
    }
    /* 导航栏 */
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
    // 标签、步骤条 
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
            .step{
                float: left;
                line-height:2;
                margin-top: 45px;
                padding: 10px 50px;
                ul{
                    overflow: hidden;
                    li{
                        float: left;
                        margin-right: 80px;
                        font-size: 24px;
                        color: rgb(124, 248, 8);
                        font-weight: 800;
                    }
                }
            }     
        }
    }

    // 我的
    .content{
        overflow: hidden;
        width: 1200px;
        margin: 0 auto;
        .left{
            float: left;
            width: 300px;
            margin: 20px 20px 0 0;
            dt{
                line-height:2;
                padding-left: 100px;
                text-align: left;
                font-size: 20px;
                margin-top: 30px;
            }
            dd{
                line-height: 3;
                padding-left: 120px;
                text-align: left;
                font-size: 16px;
            }
        }
       
    }

    

     

   

</style>

