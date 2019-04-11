<template>
        <div class="right">
                     <!--我的足迹 -->
                    <div class="track">
                        <div class='track-wrap'>
                            <h3>我的地址</h3>
                        </div>
                        <div class="hot-list">
                           <div class="ads" v-if="info_show">
                                <p class="name">{{userinfo.nickName}}
                                   <span class="modify" @click="add">修改</span>
                                   <el-button type="text" class="del" @click="del">删除</el-button>
                                   <!-- <span class="del" @click="del">删除</span> -->
                                </p>
                               <p class="detail-ads">{{userinfo.address}} </p>
                               <p class="phone">{{userinfo.phone}}</p>
                           </div>
                           <div class="add-ads" v-if="add_show" @click="add">
                               +添加地址
                           </div>
                           <div class="chose-address" v-if="chose_show">
                                <p class="chose">
                                    <label for="chose">地址信息:</label>
                                    <input type="text" placeholder="请选择" id="chose" readonly :value="first_ads">
                                </p>    
                                <p class='write-ad'>
                                    <label for="write">详细地址:</label>
                                    <input type="text" placeholder="请输入" id="write" v-model="detail">
                                </p>
                                <p class="oprate">
                                    <button class="save" @click="save">保存</button>
                                    <button class="cancel" @click="cancel">取消</button>
                                </p>

                                <div class="list" v-if="list_show">
                                    <select v-model="prov">
                                        <option value=""  selected>请选择省</option>
                                        <option v-for="(option,index) in allArr" :value="option.name" :key=index>
                                            {{ option.name }}
                                        </option>
                                    </select>
                                
                                    <select v-model="city">
                                        <option value=""  selected>请选择市</option>
                                        <option v-for="(option,index) in cityArr" :key=index :value="option.name">
                                            {{ option.name }}
                                        </option>
                                    </select>
                                    <select v-model="district" >
                                        <option value=""  selected>区/ 镇 /乡</option>
                                        <option v-for="(option,index) in districtArr" :value="option.name" :key=index>
                                            {{ option.name }}
                                        </option>
                                    </select> 
                                </div>
                                <div class="arrow" @click="up">
                                    <svg class="icon  up" aria-hidden="true" v-if="up_show" >
                                        <use xlink:href="#icon-jiantou-copy-copy-copy"></use>
                                    </svg>
                                    <svg class="icon down" aria-hidden="true" v-if="down_show" >
                                        <use xlink:href="#icon-jiantou-copy-copy"></use>
                                    </svg>
                                </div>
                           </div>
                        </div>
                    </div>
        </div>
</template>
<script>
export default {
    data(){ 
        return{
            add_show:1, //新增地址按钮显示
            info_show:0, //地址信息显示
            up_show:0, //上拉显示
            down_show:1,  //下拉显示
            list_show:0,  //省市区显示
            chose_show:0,  //编辑框显示
            allArr:[
                    {name:'江西省',sub:[
                           {name:'南昌市',sub:[{name:'青山湖区'},
                            {name:'进贤县'},{name:'南昌县'}]},
                           {name:'赣州市',sub:[{name:'章贡区'},{name:'会昌县'},
                            {name:'南康区'},{name:'瑞金市'}]},
                           {name:'吉安市',sub:[{name:'永新县'},
                            {name:'万安县'},{name:'太和县'}]}
                        ]
                    },

                     {name:'广东省',sub:[
                            {name:'深圳市',sub:[{name:'龙岗区'},{name:'宝安区'},
                            {name:'南山区'},{name:'福田区'}]},
                            {name:'广州市',sub:[{name:'越秀区'},{name:'白云区'},
                            {name:'天河区'},{name:'番禺区'}]},
                           {name:'东莞市',sub:[{name:'莞城区'},
                            {name:'万江区'},{name:'常平镇'}]}
                        ]
                    },
                    
                     {name:'福建省',sub:[
                            {name:'福州市',sub:[{name:'请选择'},{name:'晋安区'},
                            {name:'闽侯县'},{name:'闽清县'}]},
                            {name:'厦门市',sub:[{name:'请选择'},{name:'思明区'},
                            {name:'湖里区'},{name:'集美区'}]},
                            {name:'泉州市',sub:[{name:'请选择'},{name:'蓟城区'},
                            {name:'丰泽区'},{name:'石狮市'}]}
                        ]
                    }
                ],
            
            
            prov:'',
            city:'',
            detail:'',  //详细地址
            district:'',
            first_ads:'', //主要地址

            cityArr:'',
            districtArr:'',

            userinfo:'',

        }
    },
        mounted(){
            this.getAddress()
        },
        methods:{
           add:function () {
           },
            updateCity: function () {
                this.city=''
                this.cityArr=''
                for (var i in this.allArr) {
                    var obj = this.allArr[i];
                    if (obj.name == this.prov) {
                        this.cityArr = obj.sub;
                        break;
                    }
                }
            },
            updateDistrict: function () {
                this.district=''
                this.districtArr=''
                for (var i in this.cityArr) {
                    var obj = this.cityArr[i];
                    if (obj.name == this.city) {
                        this.districtArr = obj.sub;
                        break;
                    }
                }
            },
            up(){
                if(this.up_show==1){
                    this.up_show=0
                    this.down_show=1
                    this.list_show=0
                }else{
                    this.up_show=1
                    this.down_show=0
                    this.list_show=1
                }
               
            },
            cancel(){
                this.getAddress()
            },
            add(){
                this.chose_show=1
                this.info_show=0
                this.add_show=0
            },
            save(){
                var phone=localStorage.getItem('User')
                phone=JSON.parse(phone)[0]
                if(this.district&&this.districtArr.length>0&&this.districtArr[0].name&&this.detail){
                    var address=this.prov+this.city+this.district+this.detail
                    var data={
                        address:address,
                        phone:phone
                    }       
                    this.$axios.post('http://localhost:3000/addAddress',{data},{}).then(
                        res => {
                            this.$message({
                                message:'保存成功',
                                center: true,
                                type:'success'
                            });
                            this.cancel()
                        },
                      
                        err => {

                        }
                    )
                    
                }else{
                      this.$message({
                            message:'请输入完整地址！',
                            center: true,
                            type:'error'
                        });
                }
            },
            getAddress(){
                var phone=localStorage.getItem('User')
                phone=JSON.parse(phone)[0]
                this.$axios.post('http://localhost:3000/getNick',{user:phone},{}).then(
                    res => {
                        this.userinfo=res.data.userinfo[0]
                        this.chose_show=0
                        if(this.userinfo.address!=''){
                            this.add_show=0
                            this.info_show=1
                        }else{
                            this.info_show=0
                            this.add_show=1
                        }
                    },
                    err => {

                    }
                )
            },
            del(){
                var phone=localStorage.getItem('User')
                phone=JSON.parse(phone)[0]
                this.$confirm('确定删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                    }).then(() => {
                    this.info_show=0
                    this.add_show=1

                    this.$axios.post('http://localhost:3000/delAddress',{phone},{}).then(
                        res => {
                           this.$message({
                                type: 'success',
                                center:true,
                                message: '删除成功!'
                            });
                            this.cancel()
                        },
                        err => {
                            this.$message({
                                message:'网络异常，请稍后重试!',
                                center: true,
                                type:'error'
                            });
                        }
                    )
                    


                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            center:true,
                            message: '已取消删除'
                        });
                });
            }
        },
        watch:{
            prov: function () {
                this.updateCity();
                this.updateDistrict();
                this.first_ads=this.prov
            },
            city: function () {
                this.updateDistrict();
                this.first_ads=this.prov+`${this.city}`
            },
            district:function(){
                this.first_ads=this.prov+`${this.city}`+`${this.district}` 
            }
        }
}
</script>
<style lang="scss" scoped>
     .right{
            float: left;
            width: 880px;
            line-height: 150px;
            height:700px;
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
                    overflow: hidden;
                    height: 400px;
                    position: relative;
                  .ads{
                      border:1px solid rgb(209, 202, 202);
                      float: left;
                      width: 240px;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      line-height: 2;
                      margin: 30px 60px 0 30px;
                      text-align: left;
                      padding: 20px;
                      font-size: 16px;
                      .modify{
                          color: rgb(163, 160, 168);
                          margin-left: 100px;
                          font-size: 12px;
                      }
                      .del{
                          color: rgb(163, 160, 168);
                          margin-left: 10px;
                          font-size: 12px;
                      }
                  }
                  .add-ads{
                      float: left;
                      border:1px solid rgb(209, 202, 202);
                      width: 240px;
                      line-height: 6;
                      margin: 30px 60px 0 30px;
                      text-align: center;
                      padding: 20px;
                      font-size: 16px;
                  }
                  .chose-address{
                      width: 800px;
                      padding: 20px;
                      height:500px;
                      position:absolute;
                      top:50px;
                      left:50px;
                      background: rgb(209, 202, 202);
                        .chose{
                            input{
                                width: 300px;
                                height: 60px;
                            }
                        }
                        .write-ad{
                          line-height: 1;
                          input{
                              width: 300px;
                              height: 60px;
                          }
                      }
                      p{
                          line-height: 1;
                          font-size: 20px;
                          margin-top: 35px;
                      }
                      .oprate{
                        text-align: center;
                        padding-left: 0px;
                        padding-left: 0;
                        button{
                            padding: 10px 20px;
                            background: #fff;
                            color: rgb(59, 241, 26);
                            border:solid 1px rgb(196, 185, 185);
                            border-radius: 16px;
                            font-size: 20px
                        }
                        .save{
                            margin-right: 50px;
                        }
                        
                      }
                      .list{
                          position: absolute;
                          line-height: 1;
                          background: rgb(231, 223, 223);
                          top:110px;
                          left:315px;
                           select{
                                padding:3px  ;  
                            }
                      }
                      .arrow{
                          line-height:100%;
                          padding: 20px;
                          position: absolute;
                          top:55px;
                          font-size: 20px;
                          right:220px;
                      }
                  }
                }
            }
           
        }
</style>


