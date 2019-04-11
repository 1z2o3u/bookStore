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
                    <!-- <li class="help"><a href="#">帮助中心</a></li>
                    <li class="collect"><a href="#">收藏夹</a></li> -->
                    <router-link to="/my/me" tag="li" class="help">我的</router-link>
                    <li class="car"><a href="#">购物车</a></li>
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
           <!-- <textarea name="" id="" cols="100" rows="20">

           </textarea> -->
           <textarea name="textarea"  cols="100" rows="20" @focus="msg=0" @blur="msg=1">
               
           </textarea>
            <div class="msg" v-if="msg">请留言</div>

        </div>
        <div class="send"><button>发送</button></div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '@/components/Footer'

export default {
    components:{
        Footer
    },
    name: 'App',
    data(){
        return{
            username_show:0,  //用户名显示
            rl_show:1,   //登录、注册显示
            username:'',
            msg:1,
        }
    },    
    mounted(){
        this.show_username()
    },
    methods:{
       //  显示用户名
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
        // 退出登录
        exit(){
                localStorage.removeItem('User')
                this.username_show=0
                this.rl_show=1 
                // this.$router.push({path:'/login'})
        },
    }          
}
</script>


<style <style lang="scss" scoped>
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
        margin: 30px 0;
        .container{
            overflow: hidden;
            width: 1200px;
            margin: 0  auto;
            h1{
                height: 100%;
                line-height: 150px;
                color: rgb(130, 241, 25);
                font-size: 50px;
                font-style: italic;
                text-align: left;
                border-bottom: 1px solid rgb(130, 241, 25);
            }    
        }
    }

    .container{
        position: relative;
    }
    .msg{
        font-size: 24px;
        color: rgb(190, 178, 178);
        position: absolute;
        top:30px;
        left:500px;
    }
    .send{
            margin-bottom: 100px;
            width: 1200px;
            margin: 10px auto;
           button{
               padding: 10px 20px;
               background: rgb(99, 228, 13);
               color: #fff;
               font-size: 22px;
               border: 0;
               border-radius: 15px;
           }
       }

</style>

