<template>
        <div class="right">
                     <!--我的足迹 -->
                    <div class="track">
                        <div class='track-wrap'>
                            <h3>我的地址</h3>
                        </div>
                        <div class="hot-list">
                           <div class="ads">
                               <p class="name">格格<span class="modify">修改</span><span class="del">删除</span></p>
                               <p class="detail-ads"> 江西省赣州市会昌县文武坝镇富东路</p>
                               <p class="phone">177798342658</p>
                           </div>
                           <div class="add-ads">
                               +添加地址
                           </div>
                        </div>
                        <!-- <div class='track-wrap'>
                            <h3>优惠券</h3>
                        </div> -->
                        <!-- <div class="hot-list">
                          没有可用的优惠券
                        </div>  -->

                    </div>
        </div>
</template>
<script>
export default {
    data(){ 
        return{
             promotion:[],
        }
    },
        mounted(){
             this.$axios.get( '../../../static/books/promotion.json').then(
                (res) => {
                 console.log(res.data,'pppppppppppppppppppppp')
                    this.promotion=res.data
                }
            )      
        },
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
                  .ads{
                    //   background: rgb(245, 238, 238);
                      border:1px solid rgb(209, 202, 202);
                    //   box-shadow: 1 1 1px;
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
                }
            }
           
        }
</style>


