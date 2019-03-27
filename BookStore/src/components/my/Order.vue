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
                                        <span class="pay">付款</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
        </div>
</template>
<script>
export default {
        data(){ 
            return{
                orderList:[],
                no_data:0 
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
           
        }
</style>


