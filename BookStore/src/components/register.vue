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
                    <el-steps :active="active" :align-center="1" class='co'>
                        <el-step title="填写注册信息" icon="el-icon-edit"></el-step>
                        <el-step title="注册成功" icon="el-icon-success"></el-step>
                    </el-steps>
                </div>
            </div>
        </div>
        <!-- 注册框 -->
        <div class="container">
            <div class="phone">
                <label for="phone">手机号：</label>
                <input ref="li" type="text"  id="phone"  v-model="phone" @blur="blur('phone')" @focus="focus('phone')">
                <el-alert  v-show='succ.phone' title="" type="success" show-icon> </el-alert>
                <el-alert  v-show='err.phone' title="" type="error" description="" show-icon>
                    {{msg.phone}}
                </el-alert>
            </div>
            <div class="idf">
                <!-- <label for="idf">验证码：</label> -->
                <!-- <input type="text" id="idf" v-model="idf"> -->
                <!-- <button>获取验证码</button> -->
            </div>
              <div class="nickName">
                <label for="nickName">昵称：</label>
                <input type="text"  id="nickName" v-model="nickName" @blur="blur('nick')" @focus="focus('nick')">
                <el-alert  v-show='succ.nick' title="" type="success" show-icon> </el-alert>
                <el-alert  v-show='err.nick' title="" type="error" description="" show-icon>
                     {{msg.nick}}
                </el-alert>
            </div>
            <div class="pwd">
                <label for="pwd">密码：</label>
                <input type="password" id="pwd" v-model="pwd" @blur="blur('pwd')" @focus="focus('pwd')">
                <el-alert  v-show='succ.pwd' title="" type="success" show-icon> </el-alert>
                <el-alert  v-show='err.pwd' title="" type="error" description="" show-icon>
                     {{msg.pwd}}
                </el-alert>
            </div>
            <div class="rePwd">
                <label for="rePwd">确认密码：</label>
                <input type="password" id="rePwd" v-model="rePwd" @blur="blur('re')" @focus="focus('re')">
                <el-alert  v-show='succ.re' title="" type="success" show-icon> </el-alert>
                <el-alert  v-show='err.re' title="" type="error" description="" show-icon>
                     {{msg.re}}
                </el-alert>
            </div>
            <div class="res">
                <el-button  class="register" :plain="0" @click="register">注册</el-button>
            </div>
            <div class="login">
                已有账号? <router-link to="/login">去登录</router-link>
            </div>
        </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '@/components/Footer'
import  qs from 'qs'
export default {
    components:{
        Footer
    },
    name: 'App',
    data(){
        return{
            phone:'',
            idf:'',
            nickName:'',
            pwd:'',
            rePwd:'',
            err:{phone:0,nick:0,pwd:0,re:0},
            succ:{phone:0,nick:0,pwd:0,re:0},
            msg:{phone:'',nick:'',pwd:'',re:''},
            active:0
        }
    },    
    mounted(){
       
    },
    methods:{
        blur(param){
            if(param=='phone'){
                // alert(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))
                if(this.phone==''){
                    this.err.phone=1;
                    this.succ.phone=0;
                    this.msg.phone='号码不能为空'
                }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))) {
                    this.err.phone=1;
                    this.msg.phone='手机号码不正确，请重新输入!'
                }else{
                    this.$axios.post( 'http://localhost:3000/isUser',{
                    phone:this.phone,
             },{    }
             ).then(
                res => {
                    if(res.data.code==1){
                        this.err.phone=0;
                        this.succ.phone=1;
                        this.msg.phone='可用' 
                    }else if(res.data.code==2) {
                        this.err.phone=1;
                        this.succ.phone=0;
                        this.msg.phone='用户名已存在' 
                    }else{
                        this.err.phone=1;
                        this.succ.phone=0;
                        this.msg.phone='用户名已存在,请稍后重试！'    
                    }
                },
                 err => {
                        this.active=1;
                        this.$message({
                            message: '网络异常，请稍后重试！',
                            center: true,
                            type:'success'
                        });
                })    
                }
            }else if(param=='nick'){
                if(this.nickName==''){
                    this.err.nick=1;
                    this.succ.nick=0;
                    this.msg.nick='昵称不能为空'

                }else{
                    this.succ.nick=1
                }  
            }else if(param=='pwd'){
                if(this.pwd==''){
                    this.err.pwd=1;
                    this.succ.pwd=0;
                    this.msg.pwd='密码不能为空'
                }else if(!(/^[1-9a-zA-Z_]{6,}$/.test(this.pwd))){
                    this.err.pwd=1;
                    this.msg.pwd='密码必须由6以上位数字、字母或下划线组成!'
                }else{
                    if(this.rePwd==''){
                        this.succ.pwd=1;
                    }else if(this.pwd==this.rePwd){
                        this.succ.pwd=1;
                        this.succ.re=1;
                        this.err.re=0;
                    }else{
                        this.err.pwd=1;
                        this.msg.pwd='两次密码不一致!'
                    }

                }
            }else if(param=='re'){
                if(this.rePwd==''){
                    this.err.re=1;
                    this.succ.re=0;
                    this.msg.re='请再次输入密码'
                }else if(!(this.pwd==this.rePwd)){
                    this.err.re=1;
                    this.msg.re='两次密码不一致!'
                }else{
                    this.succ.re=1;
                    this.succ.pwd=1;
                    this.err.pwd=0;
                }  
            } 
        },
        focus(param){
            this.active=1;
            if(param=='phone'){
                // alert(q)
                this.err.phone=0;
                this.succ.phone=0
            }else if(param=='nick'){
                this.err.nick=0;
                this.succ.nick=0
            }else if(param=='pwd'){
                    this.err.pwd=0;
                    this.succ.pwd=0
            }else if(param=='re'){
                this.err.re=0;
                this.succ.re=0
            }     
        }, 
        register(){
            if(this.succ.phone&&this.succ.pwd&&this.succ.re&&this.succ.nick){
                this.$axios.post( 'http://localhost:3000/register',{
                    phone:this.phone,
                    idf:this.idf,
                    nickName:this.nickName,
                    pwd:this.pwd,
                    rePwd:this.rePwd,
             },{    }
             ).then(
                res => {
                    if(res.data.code==1){
                        this.active=2;
                        this.$message({
                            message: '恭喜你，注册成功！',
                            center: true,
                            type:'success'
                        });
                        console.log(res.data.code,'mmmmmmmmmmmmmmm ')
                    }else{
                        this.active=1;
                        this.$message({
                            message: '网络异常，请稍后重试！',
                            center: true,
                            type:'success'
                        });
                    }
                },
                err => {
                        this.active=1;
                        this.$message({
                            message: '网络异常，请稍后重试！',
                            center: true,
                            type:'success'
                        });
                        console.log('网络错误：',err)
                })      
            }else{
                // this.phone=''
                // this.nickName=''
                // this.pwd=''
                // this.rePwd=''
                this.$message({
                message: '格式不正确!',
                center: true,
                type:'error'
                });
            }
            
        } ,
    }          
}
</script>
<style>
      /*  step element样式修改 */
        .el-step__title.is-finish {
            color:rgb(68, 235, 26);
        }   
        
        .el-step__head.is-finish {
             color:rgb(68, 235, 26);
        } 
        
        .el-step__line{
           border-color:rgb(68, 235, 26);
        }
       /* 表单 element样式修改 */
        .el-alert{
            background: #fff;
            display: inline;
        }
        .el-icon-close{
            display: none;
        }
       .el-alert__icon.is-big{
            font-size: 18px;
        }
        .el-alert__content{
            font-size: 18px;
        }

</style>

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
                .register{
                    margin-left: 0;
                    font-size: 12px;
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
            overflow: hidden;
            width: 1200px;
            margin: 0  auto;
            h1{
                // float: left;
                height: 100%;
                line-height: 150px;
                color: rgb(130, 241, 25);
                font-size: 50px;
                font-style: italic;
                text-align: left;
                // border-bottom: 1px solid rgb(81, 255, 0);
            }
            .step{
                padding-top:10px;
            }     
        }
    }
    //   注册框 
    .container{
        text-align: left;
        width: 835px;
        margin: 50px 600px;
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
            // font-weight: 800;
        }
        .login{
            margin-top: 50px;
            text-align: center;
            a{
                color: rgb(0, 89, 255);
            }
        }
    }

</style>

