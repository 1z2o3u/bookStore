<template>
  <div id="app">
        <div class="wrap">
            <!-- 导航栏 -->
            <div class="nav">
                <div class="container">
                <ul class="nav-left">
                    <li class="welcome">欢迎来到书田！</li>
                    <li class="login"><router-link to="/login">登录</router-link></li>
                    <li class="line">|</li>
                    <li class="register"><router-link to="/register">注册</router-link></li>
                </ul>
                <ul class="nav-right">
                    <li class="help"><a href="#">帮助中心</a></li>
                    <li class="about"><a href="#">关于我们</a></li>
                    <li class="collect"><a href="#">收藏夹</a></li>
                    <router-link to="/my/me" tag="li" class="help">我的</router-link>
                    <li class="car"><a href="#">购物车</a></li>
                </ul>
                </div>
            </div>
             
           
        </div>          
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '@/components/Footer'
export default {
    components:{
        Footer,
       
    },
    name: 'App',
    data(){
        return{
           
        }
    },
    mounted(){
           

        },
    methods:{
        
        
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

   

    

     

   

</style>

