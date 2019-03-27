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
                    <li class="collect"><a href="#">收藏夹</a></li>
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
                    <div class="step">
                
                    </div>
                </div>
            </div>
          
            <!-- 登录框 -->
            <div class="res-container">
                <div class="userName">
                    <label for="userName">手机号：</label>
                    <input type="text"  id="userName"  v-model="phone">
                </div>
                <!-- <div class="idf">
                    <label for="idf">验证码：</label>
                    <input type="text" id="idf">
                    <button>获取验证码</button>
                </div> -->
                <div class="pwd">
                    <label for="pwd">密码：</label>
                    <input type="password" id="pwd" v-model="pwd">
                </div>
                <div class="res">
                    <el-button  class="register"  @click="login">登录</el-button>
                    <!-- <button class="register" @click='login'> 登录</button> -->
                </div>
                <div class="login">
                    还没有账号?<router-link to="/register">去注册</router-link>
                </div>
            </div>
            <div class="pic">
                <img src="../../static/img/register-bc2.jpg" alt="">
            </div>

             <h2>书田用户登录</h2>
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
            phone:'',
            pwd:''
        }
    },
    mounted(){

    },

    methods:{
        login(){
            if(this.pwd==''||this.phone==''){
                this.$message({
                    message:'手机号或密码不能为空!',
                    center: true,
                    type:'error'
                });
            }else{
                this.$axios.post('http://localhost:3000/login',{
                phone: this.phone,
                pwd:this.pwd,
                },{}).then(res => {
                    if(res.data.code==1){
                        this.$message({
                            message:res.data.msg,
                            center: true,
                            type:'success'
                        });

                    // 用户名存本地
                        var  username=this.phone
                        if(localStorage.getItem('User')){
                            var users=localStorage.getItem('User')
                            users=JSON.parse(users);
                            users.push( username)
                            users=JSON.stringify(users)
                            localStorage.setItem('User',users)
                        }else{
                            var users=[]
                            users.push(username)
                            users=JSON.stringify(users)
                            localStorage.setItem('User',users)
                        }
                        this.$router.push({name:'Index',params:{username:username}})
                        // userInfo=JSON.parse(userInfo);
                        // var username=userInfo.username;
                        // if(!localStorage.getItem('carInfo')){
                        //     localStorage.setItem('carInfo',goodsStr)
                        // }else{
                        //     var goodsStr=localStorage.getItem(username+'allInfo')
                        //     var goodsObj=JSON.parse(goodsStr);



                    }else{
                        this.$message({
                            message:res.data.msg,
                            center: true,
                            type:'error'
                        });
                    }
                },
                err => {
                    this.$message({
                            message:'网络异常，请稍后重试！',
                            center: true,
                            type:'error'
                    });
                })
            }    
        },
        
       
          
        
        
    }
}
</script>
<style <style lang="scss" scoped>

    .wrap{
          position: relative;
            h2{
            // background: green;
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
    // 标签、步骤条 
    .logo{
        .container{
            overflow:hidden;
            width: 1200px;
            margin: 0  auto;
            h1{
                height: 100%;
                line-height: 150px;
                color: rgb(130, 241, 25);
                font-size: 50px;
                font-style: italic;
                text-align: left;
                border-bottom: 1px solid rgb(81, 255, 0);
            }
            .step{
                padding-top: 10px;
            }     
        }
    }
    //   登录框 
    .res-container{
        background: url('../../static/img/register-bc3.jpg') no-repeat ;
        background-size: 100% 100%;
        text-align: left;
        width: 600px;
        padding: 100px 0 100px 80px;
        margin: 50px 800px ;
        label{
            font-size:20px;
        }
        input{
            margin-bottom: 20px;
            width:300px;
            height:40px;
            border: 1px solid rgb(223, 215, 215);
        }
        button{
            width:100px;
            height:42px;
            background: rgb(68, 235, 26);
            border:none;
            color:#fff;
        }
        .register{
            width: 360px;
            height: 50px;
            margin-left: 30px;
            font-size: 20px;
        }
        .login{
            margin-top: 50px;
            text-align: center;
            a{
                color: rgb(0, 89, 255);
            }
        }
    }

    .pic{
        position: absolute;
        top:260px;
        left:230px;
        img{
            width:500px;
        }
    }

</style>

