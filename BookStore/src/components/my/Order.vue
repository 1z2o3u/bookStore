<template>
        <div class="right">
                     <!--我的足迹 -->
            <div class="track">
                        <div class='track-wrap'>
                            <h3>我的订单</h3>
                        </div>
                        <div class="hot-list" v-if='no_data'>
                           暂无相关记录，现在就去<router-link to='/'>下单</router-link>
                        </div>
                        <div class="order-list">
                            <ul>
                                <li v-for="(item,index) in orderList" :key=index>
                                    <p class="pic"><img :src="item.Src" alt=""></p>
                                    <p class="title">{{item.Title}}</p>
                                    <p class='cost-price'>￥{{item.CostPrice}}</p>
                                    <p class="count">x{{item.Count}}</p>
                                    <p class="state">待付款</p>
                                    <div class="total">合计：
                                        <span class="total-num">￥{{(item.CostPrice*item.Count).toFixed(2)}}</span>
                                        <span class="pay" @click="pay((item.CostPrice*item.Count).toFixed(2))">付款</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
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
export default {
        data(){ 
            return{
                orderList:[],
                no_data:0 ,
                confirm_show:0,
                total:0
            }
        },
        mounted(){
            this.getOrder()
           
        },
        methods:{
            getOrder(){
                if(localStorage.getItem('User')){
                        var username= localStorage.getItem('User')
                        username=JSON.parse(username)
                        this.username=username[0]
                        let data={
                            username:this.username
                        }
                        this.$axios.post('http://localhost:3000/orderList',{data},{}).then(
                        (res) => {
                                var orderList=res.data.orderList
                                var code=res.data.code
                                this.orderList=orderList
                                if(code==1){
                                    this.no_data=0
                                }else{
                                    this.no_data=1
                                }
                            
                        },
                        (err) => {

                        })                    
                    }else{
                        this.$router.push({path:'/login'})
                    }
            





                    if(this.$route.params.data){
                        this.orderList=this.$route.params.data
                        this.no_data=0
                    }else{
                        this.no_data=1  
                    }
                
            },
            pay(toatl){
               this.confirm_show=1 
               this.total=toatl
            },
            off(){
               this.confirm_show=0
            }
        }

       

}
</script>
<style lang="scss" scoped>
     .right{
            float: left;
            width: 880px;
            line-height: 150px;
            // height:700px;
            background: #fff;
            margin-bottom: 20px;
            // 我的足迹
            .track{
                margin: 30px 0;
                background: #fff;
                .track-wrap{
                    border-bottom:1px solid rgb(224, 215, 215); 
                    overflow: hidden;
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
                    font-size: 20px;
                  a{
                      color: rgb(0, 81, 255);
                  }
                }
                .order-list{
                    li{
                        display: flex;
                        position: relative;
                        background: rgb(243, 244, 247);
                        border-bottom: 1px solid rgb(143, 135, 135);
                        // box-shadow: 2px 0px 3px #000;
                        justify-content: space-around;
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
                            // font-weight:bold;
                         }  
                      

                        .total{
                            position: absolute;
                            bottom: -30px;
                            right: 50px;
                            font-size: 18px;
                            .pay{
                                padding: 6px 10px;
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
            // 确认支付
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
        }
</style>


