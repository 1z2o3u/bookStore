

<template>    
            <div class="right">
                <div class="operate-nav">
                    <div class="search">
                        <input type="text" v-model="bookName" placeholder="请输入订单号"/>
                        <button @click="search">搜索</button>
                    </div>
                    <!-- <div class="add" @click="add"><span>+</span>新增图书</div> -->
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
                            <tr  v-for="(item, index) in list"  :key=index  
                                :class="{'blue':index%2,'green':!(index%2)}">
                                <td width='100px'><img :src=item.Src alt="" width="100px"></td>
                                <td >{{item.Title}}</td>
                                <td >{{item.OrderID}}</td>
                                <td>￥{{item.CostPrice}}</td>
                                <td>{{item.Count}}</td>
                                <td>{{item.UserName}}</td>
                                <td>未支付({{item.State}})</td>
                                <td><span class="del" @click="del(item.BookID)">删除</span>/<span class="modify" @click="modify(item.BookID)">修改</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="update" v-if="update_show">
                        <Update v-on:cancel-update="update"></Update>
                    </div>
                </div>
            </div>
</template>
<script>
import bus from '@/components/home/bus.js'
import Update from '@/components/back/Update'
export default {
    inject:['reload'],
    components:{
        Update
    },
    data(){
        return{
           thead:['图片','书名','订单ID','现价','数量','用户','状态','操作']  ,
            list:[],
            bookName:'',
            searchList:[] ,
            update_show:0
        }
    },
   
    mounted(){
            this.$axios.post( 'http://localhost:3000/getOrder',{},{}).then(
            (res) => {
              var result=[]
              result=res.data.orderList
              this.list=result
            })
    },
    methods:{
         search(){
            if(this.bookName){
                this.$axios.post( 'http://localhost:3000/bookList',{bookName:this.bookName},{}).then(
                (res) => {
                    this.searchList=res.data.searchList    
                    setTimeout(() => {
                    bus.$emit('search',{searchList:this.searchList,bookName:this.bookName})
                    },100)
                    this.$router.push({path:'/admin/search'})
                })
            }    
        },
        add(){
            this.$router.push({path:'/admin/add'})
        },
        del(BookID){
           
            this.$axios.post('http://localhost:3000/del',{BookID},{}).then(
                (res) => {
                    let code=res.data.code
                    if(code==1){
                        this.$message({
                            message: '删除成功！',
                            center: true,
                            type:'success'
                        });
                        this.reload()
                    }else{
                        this.$message({
                            message: '删除失败，请稍后重试！',
                            center: true,
                            type:'error'
                        });
                    }    
                },
                (err) =>  {
                        this.$message({
                            message: '网络异常，请稍后重试！',
                            center: true,
                            type:'error'
                        });
                }
            )    
                
        },
        modify(BookID){
            this.update_show=1
            this.$axios.post('http://localhost:3000/select',{BookID},{}).then(
                (res) => {
                    let code=res.data.code
                    if(code==1){
                        // this.$message({
                        //     message: '查询成功！',
                        //     center: true,
                        //     type:'success'
                        // });
                        let values=[]
                        values=res.data.result
                         setTimeout(() => {
                            bus.$emit('update',values)},100)
                    }else{
                        this.$message({
                            message: '查询失败，请稍后重试！',
                            center: true,
                            type:'error'
                        });
                    }    
                },
                (err) =>  {
                        this.$message({
                            message: '网络异常，请稍后重试！',
                            center: true,
                            type:'error'
                        });
                }
            )    
                
        },

        update(msg){
            this.update_show=0
    },
    }
}
</script>

<style lang='scss' scoped>
        .right{
            margin-left: 270px;
            .operate-nav{
                background: #fff;
                overflow: hidden;
                padding: 10px 0;
                .search{
                    float: left;
                    margin-left: 160px;
                    input{
                       height: 60px;
                       width: 400px;
                       margin: 0;
                       border: 1px solid rgb(143, 137, 137);
                    }
                    button{
                       vertical-align: middle;
                       margin-left: -5px;
                       height: 62px;
                       margin-bottom: 1px;
                       width: 100px;
                       background: rgb(42, 211, 12);
                       color:#fff;
                       border:1px solid  rgb(143, 137, 137);
                       font-size:26px;
                       border-bottom: 0;
                    }
                }
                .add{
                    float: left;
                    margin:6px 0 0 150px;
                    font-size: 20px;
                    height: 50px;
                    padding: 0px 10px;
                    background: rgb(7, 230, 63);
                    color: #fff;
                    line-height: 50px;
                    font-weight: 800;
                    border-radius:10px; 
                    // span{
                    //     font-size: 32px;
                    // }
                }    
            }
            .content{
                margin-top: 20px;
            }

                table{
                    font-size: 20px;
                    thead{
                        background: rgb(215, 248, 104);
                        height: 50px;
                        th{
                            // border: 1px solid #000;
                        }
                    }
                    td{
                        // border: 1px solid #000;
                    }
                    .green{
                        background: rgb(236, 176, 153);
                    }
                    .blue{
                       background: rgb(234, 200, 240); 
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
                .update{
                    // height: 600px;
                    background: rgb(197, 193, 193);
                    // width: 800px;
                    position: fixed;
                    top: 80px;
                    left:300px;
                    padding: 50px 100px 0px 0px;
                }

        }    
</style>

