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
            <h2>
                <ul>
                    <li class="book-info">
                        <span class="all">全选</span>
                        <input type="checkbox" ref="all" v-model="checkedAll" 
                         @click="checkAll">商品信息
                    </li>
                    <li>单价</li>
                    <li>数量</li>
                    <li>金额(元）</li>
                    <li>操作</li>
                </ul>
            </h2>
            <ul>
                <li class="book-list" v-for="(item,index) in carList" :key="index">
                    <input type="checkbox"  ref="one"   :checked="item.isSelect"
                    @click="checkOne(carList[index].CostPrice*carList[index].Count,index)">
                    <img :src="item.Src" alt="">
                    <span class="title">{{item.Title}}</span>
                    <span class='now-price'>￥{{item.CostPrice}}</span>
                    <span class="add-count" @click="add_count(item.BookID,item.Count)">+</span>
                    <span class="count">{{item.Count}}</span>
                    <span class="minus-count" @click="minus_count(item.BookID,item.Count)">-</span>
                    <span class="total-price">￥{{(item.CostPrice*item.Count).toFixed(2)}}</span>
                    <span class="delete" @click="del(item.BookID)">删除</span>
                </li>
                <li class='no-data' v-if="no_show">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zanwushuju"></use>
                    </svg>
                    暂无数据
                </li>
                <li class="pay" v-if="!no_show">
                        合计：<span class="sum">￥{{total.toFixed(2)}}</span><span class="set" @click="set">结算</span>
                </li>
            </ul>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Header from  '@/components/Header'
import Footer from  '@/components/Footer'
export default {
    name:'app',
    components:{
        Header,
        Footer
    },
    data(){
        return{
            checkedAll:'',
            checkedOne:'',
            no_show:0,   //未找到数据显示
            username_show:0,  //用户名显示
            rl_show:1,   //登录、注册显示
            username:'',
            carList:[],
            total:0,  //总计金额
            setData:[]  //结算数据

        }
    },

    mounted(){
        this.getCar()
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
                this.$router.push({path:'/login'})
        },
        // 添加checked属性

        ck () {
            this.carList.map(
                (item) => {
                this.$set(item, 'isSelect', false); 
            })
    	},

        // 购物车全选功能
        checkAll(){
            this.total=0
            if(this.checkedAll==''){
                this.checkedAll=1;
            }else{
                this.checkedAll=0;
            }
            this.carList.map(
                (item) => {
                item.isSelect=this.checkedAll
                if(item.isSelect==true){
                    this.total+=item.CostPrice*item.Count
                }
            })
        },
        // 点击每一个
         checkOne(total,index){
            this.total=0
            this.carList[index].isSelect=!this.carList[index].isSelect
            var every=0
            this.carList.map( item => {
               if(item.isSelect==true){
                   every++
                this.total+=item.CostPrice*item.Count
               }
            } )
            if(every==this.carList.length){
                this.checkedAll=1   
            }else{
                this.checkedAll=0
            }
          
           
           console.log(this.carList[index].isSelect,'可可')
        },
       
        // 渲染购物车页面
        getCar(){
                if(localStorage.getItem('User')){
                    this.total=0
                    var username= localStorage.getItem('User')
                    username=JSON.parse(username)
                    this.username=username[0]
                    let data={
                        username:this.username
                    }
                    this.$axios.post('http://localhost:3000/carList',{data},{}).then(
                       (res) => {
                            var carList=res.data.carList
                            var code=res.data.code
                            this.carList=carList
                            if(code==1){
                                this.no_show=0
                                this.ck()
                            }else{
                                this.no_show=1
                                console.log('方法1',code)
                            }
                           
                       },
                       (err) => {

                    })                    
                }else{
                    this.$router.push({path:'/login'})
                }
        },
        // 加一 
        add_count(id,count){
            count+=1
            var data={
                id:id,
                operate:'add',
                count:count
            }
            this.$axios.post('http://localhost:3000/operateCar',{data},{}).then(
                res => {
                    var code=res.data.code
                    this.getCar()
                    this.checkedAll=0
                },
                err => {

                }
            )
        },
        // 减一
        minus_count(id,count){
            count-=1
            if(count<=1){
                count=1
            }
            var data={
                id:id,
                operate:'minus',
                count:count
            }
            this.$axios.post('http://localhost:3000/operateCar',{data},{}).then(
                res => {
                    var code=res.data.code
                    this.getCar()
                    this.checkedAll=0
                },
                err => {
                }
            )
        },
        // 删除
         del(id){
            var data={
                id:id,
                operate:'del',
            }
            this.$confirm('确定删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                    }).then(() => {
                    this.$axios.post('http://localhost:3000/operateCar',{data},{}).then(
                        res => {
                            var code=res.data.cod
                            this.getCar()
                            this.checkedAll=0
                            this.$message({
                                type: 'success',
                                center:true,
                                message: '删除成功!'
                            });
                        },
                        err => {
                            this.$message({
                                message:'网络异常，请稍后重试!',
                                center: true,
                                type:'error'
                            });
                        }
                    )
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            center:true,
                            message: '已取消删除'
                        });
                }); 
        },

        // 结算
        set(){
            this.setData=[]
            this.carList.map( (item) => {
                if(item.isSelect){
                    this.$set(item,'state',0)
                    this.setData.push(item)  
                }
            })
            var data=this.setData
            if(data.length>0){
                // this.$router.push({name:'Order',
                //     params:{
                //         data:data
                //     }
                // })
                
            this.$axios.post('http://localhost:3000/addOrder',{data},{}).then(
                res => {
                    var code=res.data.code
                    var msg=res.data.msg
                    if(code==1){
                        this.$message({
                            message:'结算中...',
                            center: true,
                            type:'success'
                        });
                        this.$router.push({name:'Confirm',params:{orderInfo:data,total:this.total}}) 
                    }else{
                        this.$message({
                            message:msg,
                            center: true,
                            type:'error'
                        });
                    } 
                },
                err => {
                    this.$message({
                        message:'网络错误，请稍后重试',
                        center: true,
                        type:'error'
                    });
                }
            )

            }else{
                this.$message({
                    message:'请选择商品',
                    center: true,
                    type:'error'
                });
            }

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
        margin: 0 auto;
        h2{
            ul{
                display: flex;
                overflow: hidden;
                margin: 30px 0 30px 0;
                li{
                    float: left;
                    line-height: 1;
                    flex:1;
                    padding: 30px 0;
                    font-size: 18px;
                     background: rgb(249, 250, 252);
                    input{
                        height:20px; 
                        width:20px;
                        position: absolute;
                        left:50px ;
                        top:30px;
                    }
                }
                .book-info{
                    flex:3;
                    text-align: left;
                    padding-left: 120px;
                    position: relative;
                    .all{
                        position: absolute;
                        left:0;
                        top:30px;
                    }
                }
            }
        }
        .book-list{
                position: relative;
                height: 200px;
                border: 1px solid  rgb(202, 204, 209);
                text-align: left;
                input{
                    position: absolute;
                    height:20px ;
                    width:20px;
                    top: 100px;
                    left:46px;
                }
                img{
                    width: 100px;
                    height:100px;
                    margin: 20px 0 0 100px;
                }
                .title{
                    width: 200px;
                    display: inline-block;
                    margin:0 0px 0 100px;
                    // display: flex;
                }
                .now-price{
                    margin: 0 60px 0 120px;
                    color: red;
                    font-size: 18px;
                }
                .add-count{
                    padding: 6px 16px;
                    // background: red;
                    border: 1px solid rgb(199, 194, 194);
                    cursor: pointer;
                }
                .count{
                   
                    padding: 6px 26px;
                    // background: red;
                    border: 1px solid rgb(199, 194, 194);
                }
                .minus-count{
                    padding: 6px 16px;
                    // background: red;
                    border: 1px solid rgb(199, 194, 194);
                    cursor: pointer;

                   
                }
                .total-price{
                    margin: 40px;
                }
                .delete{
                    margin:0 0 0 60px;
                    cursor: pointer;
                    color: rgb(0, 38, 255);

                }
        }
        .no-data{
            line-height: 10;
            color: rgb(51, 241, 34);
            font-size: 26px;
            // font-weight: 800;
            font-style: initial;
            text-align: left;
            padding-left: 100px;
            .icon{
                font-size: 100px;
                font-weight: 800;
            }
        }
        .pay{
            line-height: 6;
            text-align: right;
            padding-right: 50px;
            font-size: 20px;
            .set{
                color:#fff;
                font-size: 20px;
                background: red;
                padding: 6px 16px;
                border-radius: 6px;
                margin-left: 50px;
            }
            .sum{
                font-size: 26px;
                color: red;
                font-weight: bold;
            }
        }
    }
       
</style>


