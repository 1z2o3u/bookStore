<template>
    <div class="content">
        <h2>有关 <span class="search-name">''{{this.bookName}}''</span> 共找到 <span class="search-count">{{List.length}}</span> 本</h2>
        <ul>
            <li v-for="(item ,index) in List" :key='index'>
                <div class="pic">
                    <img :src='item.Src' alt="">
                </div>
                <div class="detail">
                    <p class="title">{{item.Title}}</p>
                    <p class="price">
                        <span class="cost-price">￥{{item.CostPrice}}</span>
                        <span class="present-price">￥{{item.PresentPrice}}</span>
                    </p>
                    <p class="about">
                        <span class="author">作者：刘宇琳</span> <span class="press">出版社：北京出版社</span> <span class="time">出版时间：2016-08-06</span>
                    </p>
                    <p class="brief">介绍科学方法论方面的基础知识。原汁原味又易于阅读，把经典介绍给小朋友。</p>
                        <div class="operation"><span class="buy-now">立即购买</span>
                            <span class="add-car">
                                <svg class="icon car-icon" aria-hidden="true" >
                                    <use xlink:href="#icon-gouwuche"></use>
                                </svg>
                                加入购物车
                            </span>
                        </div>
                </div>
            </li>
            <li v-if="this.not_find" class="not-find">
                <!-- <p class="not-find-pic"><img src="../../../static/img/not-find.jpg" alt=""></p>
                 -->
                 <p class="not-find-pic">
                        <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-notfind01"></use>
                        </svg>
                 </p>
                <p class="not-find-text">未找到相关记录</p>
            </li>

            <!-- <li>
                <div class="pic">
                    <img src="../../../static/img/new/s1.jpg" alt="">
                </div>
                <div class="detail">
                    <p class="title">我们最好的十年</p>
                    <p class="price">
                        <span class="cost-price">￥19.90</span>
                        <span class="present-price">￥22.31</span>
                    </p>
                    <p class="about">
                        <span class="author">作者：刘宇琳</span> <span class="press">出版社：北京出版社</span> <span class="time">出版时间：2016-08-06</span>
                    </p>
                    <p class="brief">介绍科学方法论方面的基础知识。原汁原味又易于阅读，把经典介绍给小朋友。</p>
                        <div class="operation"><span class="buy-now">立即购买</span>
                            <span class="add-car">
                                <svg class="icon car-icon" aria-hidden="true" >
                                    <use xlink:href="#icon-gouwuche"></use>
                                </svg>
                                加入购物车
                            </span>
                        </div>
                </div>
            </li>

            <li>
                <div class="pic">
                    <img src="../../../static/img/new/s1.jpg" alt="">
                </div>
                <div class="detail">
                    <p class="title">我们最好的十年</p>
                    <p class="price">
                        <span class="cost-price">￥19.90</span>
                        <span class="present-price">￥22.31</span>
                    </p>
                    <p class="about">
                        <span class="author">作者：刘宇琳</span> <span class="press">出版社：北京出版社</span> <span class="time">出版时间：2016-08-06</span>
                    </p>
                    <p class="brief">介绍科学方法论方面的基础知识。原汁原味又易于阅读，把经典介绍给小朋友。</p>
                        <div class="operation"><span class="buy-now">立即购买</span>
                            <span class="add-car">
                                <svg class="icon car-icon" aria-hidden="true" >
                                    <use xlink:href="#icon-gouwuche"></use>
                                </svg>
                                加入购物车
                            </span>
                        </div>
                </div>
            </li> -->
        </ul>
         <div class="page">
            <!-- 共9页 -->
            <span @click="goBack">返回</span>
        </div>
    </div>
</template>

<script>
// import store from '@/store/store.js'
import bus from '@/components/home/bus.js'
export default {
    data(){
        return{
            List:[],
            bookName:'',
            not_find:0
        }
    },
    // store:store,
  
    created(){
        this.list()
    },
    methods:{
        list(){
            // console.log('gggggggggg------------')
            // List=this.$store.state.searchList
            console.log(this.List,'2014')
            bus.$on('search',(msg) => {
                this.List=msg.searchList
                this.bookName=msg.bookName
                console.log(this.List.length,this.not_find, 'lllllllllllll99999999')
                this.not_find=0
                if(this.List.length==0){
                this.not_find=1
            }
            })
           
        },

        goBack(){
            this.$router.push({path:'/index'})
        }
    }
}
</script>

<style lang="scss" scoped>
    .content{
        background: rgb(250, 245, 245);
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        h2{
            line-height: 3;
            font-size: 20px;
            text-align: left;
            padding-left: 20px;
            background: rgb(219, 211, 211);
            // border: 1px solid rgb(173, 166, 166);
            .search-name{
                color: red;
            }
            .search-count{
                color: red;
            }
        }
        li{
            border-top: 1px solid rgb(168, 161, 161);
            overflow: hidden;
            padding-bottom: 20px;
            .pic{
                float: left;
                margin-top: 30px;
                width: 200px;
                img{
                    width: 80%;
                }
            }
            .detail{
                float: left;
                margin: 30px 0 0px 160px;
                text-align: left;
                p{
                    line-height: 2.5;
                    .cost-price{
                        font-size: 24px;
                        color: red;
                        font-weight: bold;
                    }
                    .present-price{
                        font-size: 18px;
                        color: rgb(187, 181, 181);
                        font-weight: normal;
                        margin-left: 40px;
                        text-decoration: line-through;
                    }
                    .press{
                        margin: 0 60px ;
                    }
                }
                .title{
                    font-size: 22px;
                }
                .brief{
                    color: rgb(216, 205, 205);
                }
                .operation{
                    padding: 20px 0 0 0;
                    .add-car{
                        background: rgb(160, 233, 160);
                        color: #fff; 
                        padding:10px 20px;
                        .car-icon{
                            color: red;
                            font-size:22px; 
                        }
                    }
                    .buy-now{
                        background: rgba(51, 255, 0, 0.767);
                        margin:0px 30px 0 0;
                        color: #fff; 
                        padding:10px 20px;
                    }
                }
            }
        }
        .not-find{
            // line-height: 10;
            color: rgb(99, 238, 6);
            height: 300px;
            font-size: 28px;
            .not-find-pic{
                float: left;
                padding: 30px;
                line-height:2;
                .icon{
                    font-size: 100px;
                }
            }
            .not-find-text{
                float: left;
                line-height: 6;
            }
        }
        .page{
            text-align: right;
            line-height: 3;
            padding-right: 50px;
            background: #fff;
            margin-top: 10px;
            font-size: 20px;
            font-weight: 800;
            // border: 1px solid rgb(173, 166, 166);
            span{
                padding:10px 20px;
                background: #000;
                color: #fff;
                font-weight: 800;
                border-radius: 10px;
            }
        }
    }


              
</style>


