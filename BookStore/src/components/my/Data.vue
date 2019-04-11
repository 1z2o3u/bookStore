<template>
        <div class="right">
                     <!--我的足迹 -->
                    <div class="track">
                        <div class='track-wrap'>
                            <h3>个人资料</h3>
                            <div class="edit" @click="modify">
                                <svg class="icon" aria-hidden="true" >
                                    <use xlink:href="#icon-75bianji"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="hot-list">
                            <div class="operation">
                                <div class="balance-now"><img src="../../../static/img/tou.jpg" alt=""></div>
                                <div class="recharge">用户名：<span>{{userinfo.nickName}}</span></div>
                            </div>
                        </div>
                        <div class="modify" v-if="modify_show">
                            <h2> 编辑个人信息</h2>
                            <div class="content">
                                <div class="title">
                                    <label for="phone">电话：</label>
                                    <input type="text" id="phone" v-model=user disabled> 
                                </div>
                                <div class="title">
                                    <label for="title">昵称：</label>
                                    <input type="text" id="title" v-model=userinfo.nickName> 
                                </div>
                                <div class="present-price">
                                    <label for="present-price">原密码：</label>
                                    <input type='password' id="present-price" v-model='pwd'
                                        @blur="blur('原密码')"
                                    >
                                </div>
                                <div class="cost-price">
                                    <label for="cost-price">新密码：</label>
                                    <input type="password" id="cost-price" v-model="rePwd"
                                     @blur="blur('新密码')">
                                </div>
                                <div class="confirm">
                                    <button class='conf-btn' @click="confirm">确认修改</button><button class="cancel" @click="back">返回</button>
                                </div> 
                            </div>
                        </div>
                    </div>
        </div>
</template>
<script>
export default {
    data(){ 
        return{
             promotion:[],
             user:'',
             modify_show:0,
             userinfo:'',
             pwd:'',
             rePwd:'',

             pwd_vali:1,
             rePwd_vali:1


        }
    },
        mounted(){
            this.user=JSON.parse(localStorage.getItem('User'))[0];
            this.getNick()
               
           
        },

        methods:{
            getNick(){
                this.$axios.post('http://localhost:3000/getNick',{user:this.user},{}).then(
                res => {
                    this.userinfo=res.data.userinfo[0]
                },
                err => {

                }
            )
            },
            modify(){
                this.modify_show=1
            },
            back(){
                this.modify_show=0
                this.pwd=''
                this.rePwd=''
            },
            blur(param){
                if(param=='原密码'){
                    if(this.pwd==this.userinfo.pwd){
                        this.pwd_vali=1
                     
                    }else if(this.pwd==''){
                        this.pwd_vali=1
    
                    }else{
                        this.pwd_vali=0
                        this.$message({
                            message: '密码不正确!',
                            center: true,
                            type:'error'
                            });         
                    }   
                }else if(param=="新密码"){
                    if(this.pwd_vali&&(this.pwd!='')){
                        if(this.rePwd==''){
                            this.rePwd_vali=0
                            this.$message({
                                message: '密码不能为空!',
                                center: true,
                                type:'error'
                            });  
                        }else if(!(/^[1-9a-zA-Z_]{6,}$/.test(this.rePwd))){
                            this.rePwd_vali=0
                            this.$message({
                                message: '密码必须由6以上位数字、字母或下划线组成!',
                                center: true,
                                type:'error'
                            });  
                        }else{
                            this.rePwd_vali=1 
                        }
                    }else{
                            this.rePwd_vali=0
                            this.$message({
                                message: '请输入正确的原密码!',
                                center: true,
                                type:'error'
                            });   
                    }
                   
                }
            },
           
            confirm(){
                if(this.pwd_vali && this.rePwd_vali){
                        var data={
                            nickName:this.userinfo.nickName,
                            rePwd:this.rePwd,
                            phone:this.user
                        }      
                    this.$axios.post('http://localhost:3000/updateUser',{data},{}).then(
                        res => {
                            let msg=res.data.msg
                            this.$message({
                                message: msg,
                                center: true,
                                type:'success'
                            });
                            this.getNick()  
                        },
                        err => {
                             this.$message({
                                message: '网络错误请稍后重试！',
                                center: true,
                                type:'error'
                            });  
                        }
                    ) 
                    
                    
                }else{
                        this.$message({
                            message: '格式错误，修改失败！',
                            center: true,
                            type:'error'
                        });    
                }
               
            }
        }
}
</script>
<style lang="scss" scoped>
     .right{
            float: left;
            width: 880px;
            line-height: 150px;
            height:700px;
            background: #fff;
            margin-bottom: 20px;
            // 我的足迹
            .track{
                margin: 30px 0;
                background: #fff;
                position: relative;
                .track-wrap{
                    border-bottom:1px solid rgb(224, 215, 215); 
                    overflow: hidden;
                    position: relative;
                    .edit{
                        position:absolute;
                        right: 50px;
                        top: 15px;
                        line-height: 1;
                        font-size: 24px;
                        color: rgb(50, 202, 23);
                        border: 1px solid rgb(50, 202, 23);
                        padding: 6px;
                    }
                    h3{
                        line-height: 3;
                        border-bottom:2px solid rgb(18, 233, 18);
                        text-align: left; 
                        color: rgb(18, 233, 18);
                        width:150px;
                        font-size:20px; 
                        padding-left: 20px;
                    }
                    .recommend{
                        float: left;
                    }
                    .more{
                        float: right;
                    }
                }
                .hot-list{
                    .operation{
                        background: rgb(237, 239, 245);
                        overflow: hidden;
                        // line-height: 5;
                        position: relative;
                        margin: 20px 10px ;
                        .balance-now{
                            float: left;
                            height:130px;
                            width:130px;
                            border-radius: 500%;
                            overflow: hidden;
                            margin: 10px 0 10px 30px;
                            img{
                                width: 100%;
                            }
                        }
                        .recharge{
                             float: left;
                             font-size: 20px;
                            //  background: rgb(173, 173, 169);
                             font-weight: 800;
                             line-height: 1;
                             margin: 50px 0 0 30px;
                             padding: 10px 20px;
                             border-radius: 6px;
                             span{
                                 color: rgb(41, 118, 243);
                                //  font-weight: normal;
                             }
                        }
                        .cash{
                             float: left;
                             font-size: 20px;
                             background: rgb(173, 173, 169);
                             line-height: 1;
                             color: #fff;
                             margin: 23px 0 0 30px;
                             padding: 10px 20px;
                             border-radius: 6px;
                        }

                    }
                    .table{
                        margin: 30px 10px;
                        line-height: 2;
                        background: rgb(247, 242, 237);
                        ul{
                            overflow: hidden;
                            li{
                                float:left;
                                padding: 20px 80px;
                            }
                        }
                    }
                }
                .modify{
                    position:absolute;
                    left:100px;
                    top:50px;
                    background: rgb(204, 195, 195);
                    line-height: 1;
                    padding:50px 20px;
                    background: rgb(168, 160, 160);
                            .content{
                                background: rgb(168, 160, 160);
                                padding: 20px 20px 30px 20px;
                            }
                                h2{
                                    line-height: 3;
                                    background: #fff;
                                    font-size: 20px;
                                    color: rgb(94, 236, 12);
                                }

                                .title{
                                    margin-top: 30px;
                                }
                                .present-price{
                                    margin: 20px 0 20px 0;
                                }
                                .author{
                                    margin: 20px 0 20px 0; 
                                }
                                .pic{
                                    margin-top: 20px;
                                }
                                .confirm{
                                    margin: 60px 0 20px 0;
                                }
                                input{
                                    height: 60px;
                                    width: 500px;
                                }
                                label{
                                    font-size: 22px;
                                    color: rgb(118, 236, 49);
                                    font-weight: 800;
                                }
                                .conf-btn{
                                    margin-right: 20px;
                                    background: rgb(118, 236, 49);
                                    padding: 10px 20px;
                                    border: 0;
                                    font-size: 20px;
                                    color: #fff;
                                    border-radius: 8px;
                                    font-weight: bold;
                                }
                                .cancel{
                                    margin-left: 20px;
                                    background: rgb(118, 236, 49);
                                    padding: 10px 20px;
                                    border: 0;
                                    font-size: 20px;
                                    color: #fff;
                                    border-radius: 8px;
                                    font-weight: bold;
                                    letter-spacing: 16px;
                                }
                                #pic-btn{
                                    background: #fff;
                                    padding:  10px 0 0 20px;
                                    border: 0;
                                    font-size: 20px;
                                    color: rgb(118, 236, 49);
                                }    
                        }                      
            }
           
        }
</style>


