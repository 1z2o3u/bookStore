

<template>
    
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
            <!-- 标签、搜索框 -->
        <div class="logo">
            <div class="container">
                <h1>ShuTian</h1>
                <div class="search">
                    <input type="text" v-model="bookName"/>
                    <button @click="search">搜索</button>
                </div>
                <div class="on">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-broadcast" ></use>
                    </svg>
                    <!-- <transition >
                        <li v-for='(item,index) in broadcast' :key='index'>
                            {{item}}
                        </li>
                    </transition> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import store from  '@/store/store.js'
import bus from '@/components/home/bus.js'
export default {


    data(){
        return{
            broadcast:['aaaaaaaa','bbbbbbbbb','ccccccccc'],
            bookName:this.bookName,
            searchList:[],
            username_show:0,
            rl_show:1,
            username:'',
        }
    },
    mounted(){
        this.show_username()   
    },
    methods:{
         // 搜索图书
        search(){
            if(this.bookName){
                this.$axios.post( 'http://localhost:3000/bookList',{bookName:this.bookName},{}).then(
                (res) => {
                    // concole.log(res.data)
                    this.searchList=res.data.searchList    
                    console.log(this.searchList,'222233')              
                    // var reg = new RegExp(this.bookName);
                    setTimeout(() => {
                    bus.$emit('search',{searchList:this.searchList,bookName:this.bookName})
                    },100)
                    this.$router.push({path:'/search'})
                    //  this.$store.state.searchList.push({name:this.searchList,isFinish:false})
                })
            }    
        
        },
        show_username(){
            if(localStorage.getItem('User')){
                var username= localStorage.getItem('User')
                username=JSON.parse(username)
                this.username=username[0]
                this.username_show=1
                this.rl_show=0
            }
        },
        exit(){
                localStorage.removeItem('User')
                this.username_show=0
                this.rl_show=1 
        }
    }    
}
</script>

<style lang='scss' scoped>
    .router-link-exact-active{
        color: rgb(0, 255, 0);
        font-size: 20px;
        font-weight: 800;
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
                // left:0;
                // top:0;
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
    // 标签、搜索
    .logo{
        .container{
            overflow: hidden;
            width: 1200px;
            margin: 0  auto;
            height:200px;
            h1{
                float: left;
                height: 100%;
                line-height: 200px;
                color: rgb(130, 241, 25);
                font-size: 50px;
                font-style: italic;
            }
            .search{
                    float: left;
                    height: 100%;
                    line-height: 200px;
                    margin-left: 160px;
                   input{
                       height: 60px;
                       width: 400px;
                       margin: 0;
                       border: 1px solid rgb(143, 137, 137);
                   }
                   button{
                       vertical-align: middle;
                       margin-left: -5px;
                       height: 62px;
                       margin-bottom: 1px;
                       width: 100px;
                       background: rgb(42, 211, 12);
                       color:#fff;
                       border:1px solid  rgb(143, 137, 137);
                       font-size:26px;
                       border-bottom: 0;
                   }
            }
            .on{
                   float: left;
                //    background:yellow;
                //    height:30px;
                   line-height:2;
                   position: relative;
                   margin: 70px 0 0 80px;
                   color: red;
                   .icon{
                       height: 60px;
                       width:60px;
                   }
                   ul{
                       display: inline-block;
                        position: absolute;
                        bottom:20px;
                        margin-left: 60px;
                        height: 25px;
                        // overflow: hidden;
                       li{
                           line-height: 1.5;
                       }
                   }              
            }
        }
    }
</style>

