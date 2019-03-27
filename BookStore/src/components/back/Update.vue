

<template>
    
  <div class="wrap">
        <h2>修改图书信息</h2>
        <div class="content">
            <div class="title">
                <label for="title">书名：</label>
                <input type="text" id="title" v-model=title> 
            </div>
            <div class="present-price">
                <label for="present-price">原价：</label>
                <input type="text" id="present-price" v-model="present_price">
            </div>
            <div class="cost-price">
                <label for="cost-price">现价：</label>
                <input type="text" id="cost-price" v-model="cost_price">
            </div>
            <!-- <div class="author">
                <label for="author">作者：</label>
                <input type="text" id="author" v-model="author">
            </div> -->
            <div class="pic">
                <!-- <button class="pic-btn">添加图片</button> -->
                <label for="pic-btn">添加图片： </label>
                <input type="file" id='pic-btn'  @change="getFile" >
            </div>
           <div class="confirm">
               <button class='conf-btn' @click="confirm">确认修改</button><button class="cancel" @click="back">返回</button>
           </div> 
      </div>
  </div>
</template>
<script>
 import bus from '@/components/home/bus.js'

export default {
    inject:['reload'],
    data(){
        return{
            title:'',
            present_price:'',
            cost_price:'',
            author:'',
            src:'',
            BookID:0,
            update_show:0
        }
    },
    updated(){
        
      
    },
    mounted(){
        this.update()
    },
    methods:{
        back(){
            this.$emit('cancel-update',this.update_show)
        },
        
        getFile(event){
            let x = event.target.files[0]
            console.log(x,'图一')
            let params = new FormData() ;//创建一个form对象
            params.append('file',x,x.name)  //append 向form表单添加数据
            console.log(params.get('file'),'徒儿')
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };  //添加请求头
            this.src='../../../static/uploads/'    
            this.$axios.post('http://localhost:3000/image',params,config).then(
                (res) => {
                    this.src+=res.data.avatar
            }) 
        },

        confirm(){
            let data={
                title:this.title,
                present_price:this.present_price,
                cost_price:this.cost_price,
                author:this.author,
                src:this.src,
                BookID:this.BookID

            }
            var flag=this.title&&this.present_price&&this.cost_price&&this.src
            if(flag){
                this.$axios.post('http://localhost:3000/update',{data},{}).then(
                (res) => {
                    let code=res.data.code
                    if(code==1){
                        this.$message({
                            message: '修改成功！',
                            center: true,
                            type:'success'
                        });
                        this.reload()
                    }else{
                       
                        this.$message({
                            message: '修改失败，请稍后重试！',
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
            }
            
        },

        update(){
            bus.$on('update',(msg) => {
                this.title=msg[0].Title,
                this.present_price=msg[0].PresentPrice,
                this.cost_price=msg[0].CostPrice,
                this.author=msg[0].Author
                this.src=msg[0].Src,
                this.BookID=msg[0].BookID
            })
        }

    }
}
</script>

<style lang='scss' scoped>
.wrap{
    margin-left: 160px;
    // padding-right: 20px;
    .content{
        background: rgb(168, 160, 160);
        padding: 20px 20px 30px 20px;
    }
    h2{
        line-height: 3;
        background: #fff;
        font-size: 20px;
        color: rgb(94, 236, 12);
    }

    .title{
        margin-top: 30px;
    }
    .present-price{
        margin: 20px 0 20px 0;
    }
    .cost-price{

    }
    .author{
        margin: 20px 0 20px 0; 
    }
    .pic{
        margin-top: 20px;
    }
    .confirm{
        margin: 60px 0 20px 0;
    }
        input{
            height: 60px;
            width: 500px;
        }
        label{
            font-size: 22px;
            color: rgb(118, 236, 49);
            font-weight: 800;
        }
        .conf-btn{
            margin-right: 20px;
            background: rgb(118, 236, 49);
            padding: 10px 20px;
            border: 0;
            font-size: 20px;
            color: #fff;
            border-radius: 8px;
            font-weight: bold;
        }
        .cancel{
            margin-left: 20px;
            background: rgb(118, 236, 49);
            padding: 10px 20px;
            border: 0;
            font-size: 20px;
            color: #fff;
            border-radius: 8px;
            font-weight: bold;
            letter-spacing: 16px;
        }
        #pic-btn{
            background: #fff;
            padding:  10px 0 0 20px;
            border: 0;
            font-size: 20px;
            color: rgb(118, 236, 49);
        }
        
} 
</style>

