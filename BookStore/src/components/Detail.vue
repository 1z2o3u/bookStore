<template>
    <div id="app">
        <Header></Header>
            <!-- 内容导航 -->
        <div class="container-nav">
            <div class="container">
                <ul>
                    <li class="cetago">图书分类</li>
                    <router-link tag="li" to="/">首页</router-link>
                    <li>新品</li>
                    <li>排行</li>
                    <li>限时购</li>
                    <li>热门图书</li>
                    <li>新书上架</li>
                </ul>
            </div>
        </div>
        <!-- 内容区 -->
        <div class="content">
            <div class="aside">
                <h3  class="rec-sim" >相似推荐</h3>
                <ul>
                    <li>
                        <img src="../../static/img/hot-list6.jpg" alt="">                        <p class="title">新手父母</p>
                        <p class="price">￥29.8 <span class="cost">￥36.5</span></p>
                    </li>
                </ul>
            </div>
            <div class="main" ref="main">
                <div class="pic" ref="pic"  @mouseleave="leave" @mousemove="move">
                    <img :src="promotion.Src" alt=""  ref="img" >
                    <div class="sale-count">销量<span class="buy">0件</span> 购买<span>0</span></div>
                    <div class="mask" v-show='mask_show' ref="mask"> </div>
                </div>
                <div class="detail">
                    <div class="title">{{promotion.Title}}</div>
                    <div>作者：<span class="author">林莉</span>出版社：<span class="press">北京出版社</span></div>
                    <div class="price">
                        <p>定价<span class="pre">￥{{promotion.PresentPrice}}</span></p>
                        <p>售价<span class="cost">￥{{promotion.CostPrice}}</span></p>
                    </div>
                   
                    <div class="add-count"><span class="minus">--</span>1<span class="add">+
                        </span>库存：<span class="stock">200</span></div>
                    <div class="operation"><span class="buy-now">立即购买</span>
                        <span class="add-car" @click="addCar(promotion.BookID)">
                            <svg class="icon car-icon" aria-hidden="true" >
                                <use xlink:href="#icon-gouwuche"></use>
                            </svg>
                            加入购物车
                        </span>
                    </div>
                    <div class="serve">服务
                        <span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-complete"></use>
                            </svg>
                            正品保证</span>
                        <span>
                             <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-complete"></use>
                            </svg>
                            七天无理由退货</span>
                        <span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-complete"></use>
                            </svg>
                            赠送50积分</span>
                    </div>
                </div>
                <div class="book-detail">
                    <h4>商品详情</h4>
                    <ul>
                        <li>
                            <p>包装：精装</p>
                            <p>作者：李娟</p>
                            <p>印刷日期：2018-06-18</p>
                            <p>印次：1</p>
                        </li>
                        <li>
                            <p>出版社：北京出版社</p>
                            <p>页数：332</p>
                            <p>开本：32开</p>
                            <p>字数：200千字</p>
                        </li>
                        <li>
                            <p>ISBN:8067976905954</p>
                            <p>出版日期：2018-06-18</p>
                            <p>版次：2</p>
                        </li>
                    </ul>
                </div>
                <div class="book-detail">
                    <h4>内容简介</h4>
                    <div class="bref">李娟长篇纪实散文力作《冬牧场》精装珍藏版
                    历时四个月、零距离，为壮阔的游牧景观，做见证式的留影
                    全书精细修订，撰写新版自序，新增26幅冬牧场实景高清插图
                    鸟儿远走高飞，虫蛹深眠大地；其他留在大地上的，无不备下厚实的皮毛和脂肪；
                    寒冷痛苦不堪，寒冷却理所应当，寒冷可以忍受。
                    《冬牧场》至今仍是我写作上的自信。非要选一本书作为“代表作”的话，目前我觉得非它莫属。——李娟
                    </div>
                </div>
                <!-- 大图 -->
                <div class="big-pic" v-show='big_show' >
                    <img src="../../static/img/promotion/b1.jpg" alt="" ref="big">
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
             big_show:0,
             mask_show:0,
             username:''
        }
    },
        mounted(){
            this.$axios.post( 'http://localhost:3000/bookList',{},{}).then(
            (res) => {
                var id=this.$route.params.id
                var result=[]
                result=res.data.result
                for(var i=0;i<result.length;i++){
                    if(result[i].BookID==id){
                        this.promotion=result[i]
                        console.log(result[i])
                    }
                } 
            })
            window.scrollTo({top:0})
        },

        methods:{
            move(el){
                console.log(el,"}}}}}}}}}}}}}}}}}}}")
                // 大图和遮罩出现
                this.big_show=1;
                this.mask_show=1;
                // 计算遮罩位移量
                var l=el.pageX-this.$refs.main.offsetLeft-(this.$refs.mask.offsetWidth/2)
                var t=el.pageY-this.$refs.main.offsetTop-(this.$refs.mask.offsetHeight/2)
                // 边界处理
                var maxL=this.$refs.img.offsetWidth-(this.$refs.mask.offsetWidth)
                var maxT=this.$refs.img.offsetHeight-(this.$refs.mask.offsetHeight)
                l=l<0?0:(l>maxL?maxL:l)
                t=t<0?0:(t>maxT?maxT:t)
                // 改变遮罩位移量
                this.mask=this.$refs.mask
                this.img=this.$refs.img
                this.big=this.$refs.big
                this.mask.style.left=l+'px'
                this.mask.style.top=t+'px'
                // 大图位移量
                this.big.style.left=-(this.big.offsetWidth/this.img.offsetWidth)*l+'px'
                this.big.style.top=-(this.big.offsetHeight/this.img.offsetHeight)*t+'px'
                // 鼠标指针形状
                el.currentTarget.className='act pic'
               
            },

             leave(el){
                this.big_show=0;
                this.mask_show=0;
            },

            // 加入购物车
            addCar(id){
                var bookId=id
                if(localStorage.getItem('User')){
                    this.$axios.post('http://localhost:3000/isCar',{bookId},{}).then(
                        (res) => {
                                var code=res.data.code
                                if(code==0){
                                    this.$message({
                                        message:res.data.msg,
                                        center: true,
                                        type:'error'
                                    });
                                }else if(code==1){
                                    var username= localStorage.getItem('User')
                                    username=JSON.parse(username)
                                    this.username=username[0]
                                    let data={
                                        bookId:this.promotion.BookID,
                                        src:this.promotion.Src,
                                        title:this.promotion.Title,
                                        costPrice:this.promotion.CostPrice,
                                        count:1,
                                        username:this.username
                                    }
                                    this.$axios.post('http://localhost:3000/addCar',{data},{}).then(
                                    (res) => {
                                        this.$message({
                                            message:res.data.msg,
                                            center: true,
                                            type:'success'
                                        });
                                    },
                                    (err) => {
                                        this.$message({
                                            message:res.data.msg,
                                            center: true,
                                            type:'success'
                                        });
                                    }) 
                                               
                                }else{
                                    var count=res.data.result[0].Count
                                    var username= localStorage.getItem('User')
                                    username=JSON.parse(username)
                                    this.username=username[0]
                                    let data={
                                        count:count+1,
                                        bookId:this.promotion.BookID,
                                        username:this.username
                                    }
                                    this.$axios.post('http://localhost:3000/addMore',{data},{}).then(
                                    (res) => {
                                        this.$message({
                                            message:res.data.msg,
                                            center: true,
                                            type:'success'
                                        });
                                    },
                                    (err) => {
                                        this.$message({
                                            message:res.data.msg,
                                            center: true,
                                            type:'success'
                                        });
                                    }) 
                                }
                        },        
                        err => {
                            this.$message({
                                message:'网络错误，请稍后重试！',
                                center: true,
                                type:'error'
                            });
                        })
                }else{
                    this.$router.push({path:'/login'})
                }
            }
        }
}
</script>
<style lang="scss" scoped>
    .container-nav{
        background: #fff;
        .container{
            width: 1200px;
            margin: 0 auto;
                li{
                    float: left;
                    margin-left:30px; 
                    font-size: 20px;
                }
                .cetago{
                    margin-right: 160px;
                }  
        }
    }
    // 内容区
    .content{
        width: 1200px;
        // height: 200px;
        margin: 50px auto;
        // background: yellow;
        overflow: hidden;
        .aside{
                float: left;
                width: 260px;
                border:1px solid rgb(211, 206, 206);
                // height:500px;
                // padding: 20px 0 0 0;
                .rec-sim{
                    line-height: 3;
                    background: rgb(245, 238, 238);
                    border: 1px solid rgb(187, 180, 180);
                }
                img{
                    width: 80%;
                    margin-top: 20px;
                }
                p{
                    line-height:3;
                    font-size: 20px;
                    .cost{
                        text-decoration: line-through;
                        color: rgb(160, 151, 151);
                    }
                }
                .price{
                    color: red;
                    font-size: 18px;
                    line-height: 1;
                }
                
            }
        .main{
            float: left;
            overflow: hidden;
            margin-left: 50px;
            width: 880px;
            position: relative;
            .pic{
                float: left;
                width: 200px;
                // background: green;
                position: relative;
                margin-right: 80px;
                img{
                    width: 100%;
                }
                .sale-count{
                    line-height: 5;
                    color: rgb(197, 187, 187);
                    padding-left: 50px;
                    .buy{
                        margin-right: 30px;
                    }
                }
                .mask{
                    width: 160px;
                    height: 160px;
                    background: #fff;
                    position: absolute;
                    top:0;
                    left:0;
                    opacity: 0.5;
                }
            }
            .act{
                cursor:move;
            }
            .detail{
                float: left;
                div{
                    line-height: 1;
                    text-align: left;
                    margin-top: 20px;
                }
                .title{
                    font-size: 22px;
                    font-weight: 800;
                }
                .press{
                    color: rgb(49, 231, 17);
                }
                .author{
                    color: rgb(49, 231, 17);
                    margin-right: 50px;
                }
                .price{
                   line-height: 1;
                    // padding:0px  20px 0 0; 
                    .pre{
                    text-decoration: line-through;
                    // line-height: 2;
                    padding-left:20px; 
                    // font-size: 
                    }
                    .cost{
                        line-height: 2;
                         color: red;
                         font-size: 22px;
                         padding-left:20px; 
                    }
                }
                .add{
                    border:1px solid rgb(197, 187, 187);
                    padding:5px 5px 5px 10px;
                    margin: 0 30px 0 20px;
                }
                .minus{
                    border:1px solid rgb(197, 187, 187);
                    padding:5px  10px;
                    margin-right: 20px;
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
                .serve{
                    line-height: 5;
                    color: rgb(192, 182, 182);
                    .icon{
                        font-size: 20px;
                        color: red;
                        margin-left: 20px;
                    }
                } 

            }

            .book-detail{
                    float: left;
                    width: 800px;
                    height:300px;
                    line-height: 2;
                    font-size: 18px;
                    background: rgba(250, 251, 250, 0.972);
                    h4{
                        text-align:left;
                        line-height: 3;
                        padding-left: 50px;
                        border-bottom: 2px solid rgb(210, 223, 214);
                    }
                    ul{
                        overflow: hidden;
                        padding-top: 50px;
                        li{
                            float: left;
                            line-height: 2;
                            text-align: left;
                            margin-left: 70px;
                            font-size: 16px;
                        }
                    }
                    .bref{
                        padding: 30px;
                    }
            }

            .big-pic{
                position: absolute;
                top:0px;
                right:80px;
                // background: rgb(17, 0, 3);
                height:450px ;
                width: 500px;
                overflow: hidden;
                img{
                    // width: 100%;
                    position: absolute;
                    left:0;
                    top:0;
                }
            }
        }
    }
</style>


