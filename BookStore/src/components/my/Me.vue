<template>
        <div class="right">
                       <!-- 我的 -->
                    <div class="me">
                        <ul>
                            <li class="user">
                                <div class="pic" @mouseenter="enter" @mouseleave="out">
                                   <img :src="src" alt=''>
                                   <div class="click" v-if="ck">点击更换</div>
                                   <input type="file" class="edit" v-show="ed" @change="getFile" >
                                </div> 
                                <div class="name">
                                     <p>你好,<span class="username">{{username}}</span></p>
                                </div>
                            </li>
                            <li>
                                <p class='title'>我的余额</p>
                                <p class="count balance"><span>0.00</span>元</p>
                            </li>
                            <li>
                                <p class="title">我的积分</p>
                                <p class="count integral"><span>0</span>分</p>
                            </li>
                            <li class='card'>
                                <p class="title">我的卡券</p>
                                <p class="count ticket"><span>0</span>张</p>
                            </li>
                        </ul>
                    </div>
                     <!--我的足迹 -->
                    <div class="track">
                        <div class='track-wrap'>
                            <h3>我的足迹</h3>
                        </div>
                         <div class="hot-list">
                            <ul>
                                    <router-link tag="li" :to="'/rank/'+item.Title"
                                     v-for="(item, index) in hot_list" :key=index>
                                        <a href="#">
                                            <p class="pic"><img :src="item.Src" alt=""></p>
                                            <p class="title">{{item.Title}}</p>
                                            <p class="del">...</p>
                                            <p class="price">
                                                <span class="present-price">{{item.PresentPrice}}</span>
                                                <span class="cost-price">{{item.CostPrice}}</span>
                                            </p>
                                        </a>    
                                    </router-link>
                            </ul>
                        </div>
                           
                    </div>

                    <!-- <div class="track">
                        <div class='track-wrap'>
                            <h3 class='recommend'>为我推荐</h3>
                            <h3 class="more">更多推荐 >></h3>
                        </div>
                       
                    </div> -->
        </div>
</template>
<script>
export default {

    data(){ 
        return{
             promotion:[],
             ed:0,
             ck:0,

             src:'',
             username:'',

             hot_list:[{Title:'趣味汉字',PresentPrice:18.99,CostPrice:'16.6',Src:'../../static/img/hot-list1.jpg'},
                {Title:'成功父母的七个秘诀',PresentPrice:23.87,CostPrice:'21.5',Src:'../../static/img/hot-list2.jpg'},     
                {Title:'打开心灵：走进男孩真实的内心世界',PresentPrice:22.23,CostPrice:'19.6',Src:'../../static/img/hot-list3.jpg'},
                {Title:'天上人间：中国星座的故事',PresentPrice:25.89,CostPrice:'24.8',Src:'../../static/img/hot-list4.jpg'},
                {Title:'那个骑轮箱来的蜜儿',PresentPrice:15.65,CostPrice:'13.6',Src:'../../static/img/hot-list5.jpg'},
                {Title:'新手父母1日1教-3岁',PresentPrice:19.99,CostPrice:'18.8',Src:'../../static/img/hot-list6.jpg'},
                {Title:'环游地球八十天',PresentPrice:16.91,CostPrice:'15.9',Src:'../../static/img/hot-list7.jpg'},
                {Title:'我的野生动物朋友',PresentPrice:31.98,CostPrice:'29.9',Src:'../../static/img/hot-list8.jpg'}
            ],
        }
    },
        mounted(){
            var username= localStorage.getItem('User')
            username=JSON.parse(username)
            this.username=username[0]
            this.$axios.get( '../../../static/books/promotion.json').then(
                (res) => {
                    this.promotion=res.data
                }
            )      
        },

        methods:{
            enter(){
                this.ed=1
                this.ck=1
            },
            out(){
                this.ed=0
                this.ck=0  
            },
            getFile(event){
                let x = event.target.files[0]
                let params = new FormData() ;//创建一个form对象
                params.append('file',x,x.name)  //append 向form表单添加数据
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };  //添加请求头
                this.src='../../../static/uploads/'    
                this.$axios.post('http://localhost:3000/image',params,config).then(
                    (res) => {
                        this.src+=res.data.avatar
                }) 
            },
        }
}
</script>
<style lang="scss" scoped>
     .right{
            float: left;
            width: 880px;
            // height:100px ;
            line-height: 150px;
            .me{
                background: #fff;
                ul{
                    overflow: hidden;
                    display: flex;
                    .user{
                        flex: 2.5;
                        .pic{
                            float: left;
                            height:130px;
                            width:130px;
                            border-radius: 50%;
                            overflow: hidden;
                            margin: 10px 0 0 60px;
                            background:url('../../../static/img/tou.jpg') -30px 0;
                            position: relative;
                            img{
                                width: 100%;
                            }
                            .edit{
                                position: absolute;
                                background: #000;
                                opacity: 0.2;
                                color: transparent;
                                height:200px ;
                                top:-26px;
                                left:-20px;
                            }
                            .click{
                                position: absolute;
                                top:0;
                                left:24px;
                                // color: #fff;
                                // z-index: 10;
                                font-weight: bold;
                                font-size: 20px;
                            }
                        }
                        .name{
                            float: left;
                            margin-left: 20px;
                            .username{
                                font-size: 22px;
                                color: green;
                            }
                        }
                    }
                    li{
                        border-right: 1px solid rgb(243, 234, 234);
                        margin: 30px 0;
                        float: left;
                        flex: 1;
                        align-items: center;
                        .balance{
                            color: rgb(0, 132, 255);

                        }
                        .integral{
                            color: rgb(255, 136, 0);
                        }
                        .ticket{
                            color: rgb(0, 255, 42);
                        }
                        .count{
                            line-height: 0;
                            margin-top: -10px;
                            font-size: 18px;
                            span{
                                font-size: 36px;
                                font-weight:bold;
                                margin-left: 10px;
                            }
                        }
                        .title{
                            margin-top: -30px;
                            font-size: 20px;
                        }
                    }
                    .card{
                        border-right: 0;
                    }
                   
                }
            }
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
                        width:100px;
                    }
                    .recommend{
                        float: left;
                    }
                    .more{
                        float: right;
                    }
                }
                .hot-list{
                    width: 880px;
                    margin-top: 20px;
                    ul{
                        overflow: hidden;
                        li{
                                position: relative;
                                line-height: 1.5;
                                float: left;
                                height: 260px;
                                width: 160px;
                                border: #e3e7ee solid 1px;
                                margin: 10px;
                                padding: 30px 10px 0px;
                                img{
                                    width: 80%;
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
                                .del{
                                    position: absolute;
                                    bottom: 0px;
                                    right:10px;
                                    color: rgb(139, 134, 134);
                                    font-size: 28px;
                                }
                                .title{
                                    white-space: nowrap;
                                    overflow:inherit;
                                    line-height: 2.5;
                                }
                            }
                    }
                }
            }
           
        }
</style>


