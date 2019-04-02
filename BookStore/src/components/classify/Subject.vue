<template>
    <div id="app">
        <Header></Header>
            <div class="promotion">
            <div class="container">
                <div class="promotion-nav">
                    <h2 id="promotion">分类 > {{id}}</h2>
                </div>
                <div class="content">
                    <ul>
                            <router-link tag="li" :to="'/detail/'+item.BookID" 
                                v-for="(item, index) in promotion" :key=index>
                                <!-- <a href="#"> -->
                                    <p class="pic"><img :src="item.Src" alt=""></p>
                                    <p class="title">{{item.Title}}</p>
                                    <p class="price">
                                        <span class="cost-price">￥{{item.CostPrice}}</span>
                                        <span class="present-price">￥{{item.PresentPrice}}</span>
                                    </p>
                                <!-- </a>     -->
                            </router-link>
                    </ul>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
    components:{
        Header,
        Footer
    },
    data(){ 
        return{
            promotion:[],
            id:this.$route.params.id   
        }
    },
        mounted(){
            this.$axios.post( 'http://localhost:3000/bookList',{},{}).then(
            (res) => {
                var id=this.$route.params.id
                var result=[]
                result=res.data.result
                    for(var i=0;i<result.length;i++){
                        if(result[i].Subject==id){
                            this.promotion.push(result[i])
                        }
                       
                    }        
            })  
        },

        methods:{
           

           
        }
}
</script>
<style lang="scss" scoped>
  
    // 内容区
   .promotion{
        margin-top: 30px;
        .container{
            width: 1200px;
            margin: 0 auto;
            line-height: 2;
            background: #fff;
            .promotion-nav{
                position: relative;
                min-height: 48px;
                border-bottom: 2px solid rgb(129, 124, 124);
                h2{
                    position: absolute;
                    width: 260px;
                    left:0;
                    font-size: 24px;
                    color: #0cec31;
                    border-bottom: 2px solid rgb(236, 15, 15);
                    // font-weight: normal;
                }
                .count{
                    width: 450px;
                    text-align: left;
                    position: absolute;
                    right:0;
                   
                    .remain{
                        color: red;
                        background: #fff;
                        font-weight: 800;
                    }
                    span{
                        width:20px;
                        height:20px;
                        background: rgb(17, 15, 15);
                        margin: 10px;
                        padding: 5px 8px;
                        color:rgb(247, 235, 235);
                    }
                    // border-bottom: 2px solid rgb(236, 15, 15);
                }
            }
            .content{
                margin-top: 20px;
                ul{
                    overflow: hidden;
                    li{
                        line-height: 1.5;
                        float: left;
                        width: 260px;
                        border-right: #e3e7ee solid 1px;
                        border-bottom: #e3e7ee solid 1px;
                        // margin: 10px 6px 6px 0;
                        padding:  10px;
                        img{
                            // width: 100%;
                            height: 200px;
                        }
                        .price{
                            .cost-price{
                                color: red;
                                font-size: 20px;
                            }
                            .present-price{
                                text-decoration: line-through;
                            }
                        }
                    }
                }    
            }
         }
     }
</style>


