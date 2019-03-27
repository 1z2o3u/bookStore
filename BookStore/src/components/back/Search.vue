<template>
    <div class="content">
         <table  cellspacing=0 cellpadding="20px" style="border-collapse:collapse;">
                        <thead v-if="tb_show">
                            <tr>
                                <th v-for="(item, index) in thead"  
                                :key=index   >
                                    {{item}}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in List"  :key=index  
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

                    <li v-if="this.not_find" class="not-find">
                        <p class="not-find-pic">
                            <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-notfind01"></use>
                            </svg>
                        </p>
                        <p class="not-find-text">未找到相关记录</p>
                    </li>
        <div class="page">
            <!-- 共9页 -->
            <span @click="goBack">返回</span>
        </div>
    </div>
</template>
<script>
import bus from '@/components/home/bus.js'
export default {
    data(){
        return{
            List:[],
            bookName:'',
            not_find:0,
            tb_show:0,
            thead:['图片','书名','原价','现价','出版社','作者','库存','操作']  ,
        }
    },
    created(){
        this.list()
    },
    methods:{
        list(){
            bus.$on('search',(msg) => {
                this.List=msg.searchList
                this.bookName=msg.bookName
                console.log(this.List.length,this.not_find, 'lllllllllllll99999999')
                this.not_find=0
                this.tb_show=1
                if(this.List.length==0){
                this.not_find=1
                this.tb_show=0
            }
            })
        },
        goBack(){
            this.$router.push({path:'/admin/index'})
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
       
      
          table{
                    font-size: 20px;
                    thead{
                        background: rgb(245, 231, 102);
                        height: 50px;
                        th{
                            // border: 1px solid #000;
                        }
                    }
                    td{
                        // border: 1px solid #000;
                    }
                    .green{
                        background: rgb(172, 245, 170);
                    }
                    .blue{
                    //    background: rgb(167, 236, 248); 
                       background: rgb(237, 205, 243); 
                    }
                    .del{
                        color: rgb(15, 134, 247);
                        cursor: pointer;
                    }
                    .modify{
                        color: rgb(15, 134, 247);
                        cursor: pointer;
                    }
                }



        .not-find{
            // line-height: 10;
            color: rgb(99, 238, 6);
            height: 500px;
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


