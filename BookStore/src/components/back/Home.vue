<template>
    <div class="wrap">
        <div class="nav">
            <h2>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shu"></use>
                </svg>
                ShuTian
            </h2>
        </div>
        <div class="container">
            <div class="left">
                <ul>
                    <li v-for="(item ,index) in menu" @click="nav(index)"  
                        :class="{'hightLight':hightLight == index}" :key=index>
                        <svg class="icon" aria-hidden="true" 
                         :class="{'hightLight':hightLight == index}" >
                            <use :xlink:href=item.class></use>
                        </svg>
                        {{item.name}}
                    </li>
                </ul>
            </div>
            <router-view></router-view>
            <!-- <div class="right">
                <div class="operate-nav">
                    <div class="search">
                        <input type="text" v-model="bookName" placeholder="请输入书名"/>
                        <button @click="search">搜索</button>
                    </div>
                    <div class="add" @click="add"><span>+</span>新增图书</div>
                </div>
                <div class="content">
                    <table  cellspacing=0 cellpadding="20px" style="border-collapse:collapse;">
                        <thead >
                            <tr>
                                <th v-for="(item, index) in thead"  
                                :key=index   >
                                    {{item}}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in list"  :key=index  
                                :class="{'blue':index%2,'green':!(index%2)}">
                                <td width='100px'><img :src=item.Src alt="" width="100px"></td>
                                <td>{{item.Title}}</td>
                                <td>￥{{item.PresentPrice}}</td>
                                <td>￥{{item.CostPrice}}</td>
                                <td>NULL</td>
                                <td>NULL</td>
                                <td>NULL</td>
                                <td><span class="del">删除</span>/<span class="modify">修改</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> -->
        </div>
    </div>
           
</template>

<script>

export default {
    components:{
      
    },
    data(){
        return{
            menu:[{name:'商品管理',class:'#icon-yuyanshu'},{name:'订单管理',class:'#icon-dingdan2'},
                    {name:'用户管理',class:'#icon-gerenzhongxin-xuanzhong'}],
            hightLight:0        
        }
    },
    mounted(){
         
    },
    methods:{
        nav(index){
           this.hightLight=index
           if(index==0){
                this.$router.push({path:'/admin/index'})
           }else if(index==1){
                this.$router.push({path:'/admin/order'})
           }else{
                this.$router.push({path:'/admin/user'})  
           }
        }
    }
}
</script>

<style lang="scss" scoped>

// 导航高亮样式

   
  

.wrap{
    background: rgb(226, 221, 221);
    .nav{
        background: #fff;
        padding: 6px 0;
        h2{
            width: 1200px;
            text-align: left;
            padding-left: 50px;
            color: rgb(130, 241, 25);
            font-size: 50px;
            font-style: italic;
            margin: 0 auto;
        }
    }
    .container{
        padding:20px;
        overflow: hidden;
        // background: rgb(226, 221, 221);
        .left{
            width: 240px;
            float: left;
            background: #000;
            li{
                padding: 20px 0;
                font-size: 20px;
                color: #fff;
                line-height: 2;
            }
            .hightLight{
                color: rgb(9, 240, 9);
                font-size: 22px;
            }
        }
        // .right{
        //     margin-left: 270px;
        //     // background: red;
        //     .operate-nav{
        //         // height: 60px;
        //         background: #fff;
        //         overflow: hidden;
        //         padding: 10px 0;
        //         .search{
        //             float: left;
        //             margin-left: 160px;
        //             input{
        //                height: 60px;
        //                width: 400px;
        //                margin: 0;
        //                border: 1px solid rgb(143, 137, 137);
        //             }
        //             button{
        //                vertical-align: middle;
        //                margin-left: -5px;
        //                height: 62px;
        //                margin-bottom: 1px;
        //                width: 100px;
        //                background: rgb(42, 211, 12);
        //                color:#fff;
        //                border:1px solid  rgb(143, 137, 137);
        //                font-size:26px;
        //                border-bottom: 0;
        //             }
        //         }
        //         .add{
        //             float: left;
        //             margin:6px 0 0 150px;
        //             font-size: 20px;
        //             height: 50px;
        //             padding: 0px 10px;
        //             background: rgb(7, 230, 63);
        //             color: #fff;
        //             line-height: 50px;
        //             font-weight: 800;
        //             border-radius:10px; 
        //             // span{
        //             //     font-size: 32px;
        //             // }
        //         }    
        //     }
            .content{
                margin-top: 20px;
            }
        // }    
    }

                // table{
                //     font-size: 20px;
                //     thead{
                //         background: rgb(245, 231, 102);
                //         height: 50px;
                //         th{
                //             // border: 1px solid #000;
                //         }
                //     }
                //     td{
                //         // border: 1px solid #000;
                //     }
                //     .green{
                //         background: rgb(172, 245, 170);
                //     }
                //     .blue{
                //     //    background: rgb(167, 236, 248); 
                //        background: rgb(237, 205, 243); 
                //     }
                //     .del{
                //         color: rgb(15, 134, 247);
                //         cursor: pointer;
                //     }
                //     .modify{
                //         color: rgb(15, 134, 247);
                //         cursor: pointer;
                //     }
                // }
}


              
</style>


