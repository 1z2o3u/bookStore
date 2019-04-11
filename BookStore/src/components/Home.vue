<template>
  <div class="hello">
  <Header></Header>
    <!-- 联系客服 -->
    <router-link to="/customer">
        <div class="customer">
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-lianxikefu"></use>
            </svg>
            <p>在线客服</p>
        </div>
    </router-link>
       
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Index from '@/components/Index'
export default {
  name: 'HelloWorld',
  components:{
      Header,
      Footer,
      Index
  },
  data () {
    return {
      banner:['../../static/img/banner1.jpg','../../static/img/banner2.png','../../static/img/banner3.jpg','../../static/img/banner4.jpg','../../static/img/banner5.jpg','../../static/img/banner6.jpg',],
      classify:['世界名著',' 少儿图书','教育','生活时尚','艺术与摄影','漫画绘本' ,'科技','经济管理','古籍学术','学习与考试'],
      promotion:[],
      newBook:[],
      count:100,
      restTime:{d:"0",h:"0",m:"0",s:"0"},
      hot_list:[{title:'趣味汉字',price:'￥16.6',src:'../../static/img/hot-list1.jpg'},
           {title:'成功父母的七个秘诀',price:'￥21.5',src:'../../static/img/hot-list2.jpg'},     
           {title:'打开心灵：走进男孩真实的内心世界',price:'￥19.6',src:'../../static/img/hot-list3.jpg'},
           {title:'天上人间：中国星座的故事',price:'￥24.8',src:'../../static/img/hot-list4.jpg'},
           {title:'那个骑轮箱来的蜜儿',price:'￥13.6',src:'../../static/img/hot-list5.jpg'},
           {title:'新手父母1日1教-3岁',price:'￥18.8',src:'../../static/img/hot-list6.jpg'},
           {title:'环游地球八十天',price:'￥15.9',src:'../../static/img/hot-list7.jpg'},
           {title:'我的野生动物朋友',price:'￥29.9',src:'../../static/img/hot-list8.jpg'}
      ],
      hot_show:false,
      hot_hidden:true,
      current:null,
      username:this.$route.params.username
    }
  },
    mounted(){
        this.$axios.post( 'http://localhost:3000/bookList',{},{}).then(
            (res) => {
              console.log(res.data.result,'pppppppppppppppppppppp')
              var result=[]
              result=res.data.result
              console.log(result,'\\\\\\\\\\')
              for(var i=0;i<result.length;i++){
                   if(result[i].SellID==1){
                        this.promotion.push(result[i])
                    }else if(result[i].SellID==2){
                        this.newBook.push(result[i])
                    }
              }
             
            //   this.promotion=res.data.result
            
            }),

        this.Count()
    // 监听滚动条
    //  window.addEventListener('scroll', this.watchScroll)
    //   this.enter()
    },
    methods:{
        Count(){
            let pretime = new Date('2019/03/01 00:00:00')
            this.timer=setInterval(() => {
                let nowtime = new Date()
                let t=pretime.getTime()-nowtime.getTime()
                t= t/1000
                let a=t%(3600*24)
                // console.log(a,'lllllllllllllllllll')
                let d=parseInt(t/(3600*24))
                let h=parseInt((t%(3600*24))/3600)
                let m=parseInt(((t%(3600*24))%3600)/60)
                let s=parseInt(((t%(3600*24))%3600)%60)
                if(t>0){
                this.restTime.d=d<10?"0"+d:d
                this.restTime.h=h<10?"0"+h:h
                this.restTime.m=m<10?"0"+m:m
                this.restTime.s=s<10?"0"+s:s
                }else{
                  clearInterval(this.timer)
                  this.count=null;
                }
            },1000) 
        },
        enter(index){
                // this.hot_show=true
                this.hot_hidden=false
                this.current=index
                console.log('iiiiiiiiiiiiiiiiiiii')
        },
        // 监听滚动条函数
        // watchScroll () {
        //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //     if (scrollTop > 200) {
        //         this.navBarFixed = true
        //     } else {
        //         this.navBarFixed = false
        //     }
        // },
    }
}
</script>
<style  lang='scss' scoped>
    // 联系客服
    .customer{
        position: fixed;
        top:300px;
        height:120px;
        width: 120px;
        text-align: center;
        right: 100px;
        font-size:18px; 
        color:rgb(6, 146, 240);
        border-radius: 60px;
        .icon{
            display: block;
            font-size: 45px;
            margin: 20px 0 10px 36px;
        }
        p{
            line-height:1;
        }
    }
    // 内容导航
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
    // 轮播图、图书分类
    .banner-container{
        margin: 0 auto;
        width:1200px;
        overflow: hidden;
        .classify{
            float: left;
            margin-top: 30px;
            text-align: left;
            padding:20px 20px 20px 30px;
            font-size: 18px;
            background: rgb(206, 194, 194);
            ul{
               li{
                   a{
                       width: 100%;
                       height: 100%;
                   }
                   height: 30px;
                   line-height: 30px;
                   position: relative;
                   margin-bottom: 6px;
                   padding-right: 30px;
                   .icon{
                        position: absolute;
                        right:0;
                        top:50%;
                        margin-top: -8%;
                   }
               }
               li:hover{
                  .icon{
                      color: #fff;
                   }
                   a{
                        color: #fff;
                   }
               }
            }
        }
        .banner{
            float: right;
            width: 700px;
            margin: 30px 200px 0 0;
            .el-carousel{
                // overflow-x:initial;
                margin-top: 20px;
            }
            .el-carousel__item h3 {
                color: #475669;
                font-size: 14px;
                opacity: 0.75;
                line-height: 150px;
                margin: 0;
            }
            .el-carousel__item:nth-child(2n) {
                background-color: #99a9bf;
            }
            .el-carousel__item:nth-child(2n+1) {
                background-color: #d3dce6;
            }
        }
    }    
    // 限时抢购
     .promotion{
        // background: #dde0e4;
        margin-top: 30px;
        .container{
            width: 1200px;
            margin: 0 auto;
            line-height: 2;
            background: #fff;
            .promotion-nav{
                position: relative;
                min-height: 30px;
                border-bottom: 2px solid rgb(129, 124, 124);
                h2{
                    position: absolute;
                    width: 160px;
                    left:0;
                    border-bottom: 2px solid rgb(236, 15, 15);
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
                            .present-price{
                                color: red;
                                font-size: 20px;
                            }
                            .cost-price{
                                text-decoration: line-through;
                            }
                        }
                    }
                }    
            }
         }
     }
    //  新品图书
    .new{
        margin-top: 30px;
        // background: #dde0e4;
        line-height: 2;
        .new-nav{
            width: 1200px;
            margin: 0 auto;
            background: #fff;
            position: relative;
            height: 30px;;
            border-bottom: 2px solid rgb(211, 198, 198);
            .left{
                line-height: 2;
                position: absolute;
                left: 0;
                width: 200px;
                border-bottom: 2px solid rgb(251, 43, 43);
            }
            .right{
                line-height: 2;
                position: absolute;
                right: 0;
                width: 300px;
                border-bottom: 2px solid rgb(251, 43, 43);
            }

        }
        .content{
            width: 1200px;
            background: #fff;
            margin: 0 auto ;
            overflow: hidden;
            .new-list{
                width: 860px;
                float: left;
                ul{
                    overflow: hidden;
                    li{
                            line-height: 1.5;
                            float: left;
                            width: 260px;
                            border-right: #e3e7ee solid 1px;
                            border-bottom: #e3e7ee solid 1px;
                            padding:  10px;
                            img{
                                // width: 100%;
                                height: 200px;

                            }
                            .price{
                                .present-price{
                                    color: red;
                                    font-size: 20px;
                                }
                                .cost-price{
                                    text-decoration: line-through;
                                }
                            }
                        }
                }
            }
            .rec{
                margin-top: 10px;
                // float: right;
                margin-left: 860px;
                // min-width: 300px;
                // background: red;
                // height:600px;
                img{
                    // width: 400px;
                }
            }
        }            
    }
    // 热门图书
    .hot{
        margin-top: 30px;
        // background: #dde0e4;
        line-height: 2;
        .hot-nav{
            width: 1200px;
            margin: 0 auto;
            background: #fff;
            position: relative;
            height: 30px;;
            border-bottom: 2px solid rgb(211, 198, 198);
            .left{
                line-height: 2;
                position: absolute;
                left: 0;
                width: 200px;
                border-bottom: 2px solid rgb(251, 43, 43);
            }
            .right{
                line-height: 2;
                position: absolute;
                right: 0;
                width: 300px;
                border-bottom: 2px solid rgb(251, 43, 43);
            }
        }
        .content{
            width:1200px;
            background:#fff;
            overflow: hidden;
            margin: 0 auto ;
            .hot-list{
                width: 860px;
                float: left;
                ul{
                    overflow: hidden;
                    li{
                            line-height: 1.5;
                            float: left;
                            width: 260px;
                            border-right: #e3e7ee solid 1px;
                            border-bottom: #e3e7ee solid 1px;
                            padding:  10px;
                            img{
                                width: 100%;
                            }
                            .price{
                                .present-price{
                                    color: red;
                                    font-size: 20px;
                                }
                                .cost-price{
                                    text-decoration: line-through;
                                }
                            }
                        }
                }
            }
            .rank{
                margin-top: 10px;
                float: right;
                width: 300px;
                padding-right: 5px;
                height:600px;
                    ul li{
                    text-align: left;
                    padding:0 20px 5px 0px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    margin-top: 20px;
                    border-bottom: 1px solid rgb(242, 246, 248);
                    .current{
                        background: rgb(246, 240, 240);
                        padding: 20px;
                        margin: 0;
                        width: 100%;
                        height: 100%;
                        // border:1px solid rgb(194, 183, 183);
                        margin-left: -20px;
                    }
                        span{
                        padding: 6px 10px;
                        background: rgb(177, 170, 170);
                        color: #fff;
                        border-radius: 3px;
                        }
                        img{
                            width:50px; 
                            margin-left: 50px;
                            margin-top: -30px;
                        }
                        .title{
                            display: inline-block;
                            margin-top: -30px;
                            .price{
                                color:rgb(247, 40, 40);
                                font-weight: 800;
                            }
                        }
                        .hover{
                            display: block;
                            margin-bottom:5px;
                            width: 20px;
                            height:16px;
                            padding:0 0 10px 10px;
                            background: #000;
                            color:#fff;
                            
                        }
                    }
            }
        }            
     }


    // 吸顶
    .navBarWrap {
        position:fixed;
        top:0;
        height: 190px;
        width: 100%;
        z-index:999;
        background: #fff;
  }
</style>
