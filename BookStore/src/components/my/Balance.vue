<template>
        <div class="right">
                     <!--我的足迹 -->
                    <div class="track">
                        <div class='track-wrap'>
                            <h3>我的余额</h3>
                        </div>
                        <div class="hot-list">
                            <div class="operation">
                                <div class="balance-now">当前账户余额<span>0</span>元</div>
                                <div class="recharge">提现</div>
                                <div class="cash">充值</div>
                            </div>
                        </div>
                        <div class='track-wrap'>
                            <h3>最近交易记录</h3>
                        </div>
                        <div class="hot-list">
                            <div class="table">
                                <ul>
                                    <li>创建时间</li>
                                    <li>交易类型</li>
                                    <li>金额变更</li>
                                    <li>余额</li>
                                </ul>
                            </div>
                        </div> 

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
                    .operation{
                        background: rgb(237, 239, 245);
                        overflow: hidden;
                        line-height: 3;
                        margin: 20px 10px ;
                        .balance-now{
                            float: left;
                            margin:0 30px ;
                            font-size:20px;
                            span{
                                font-size: 28px;
                                color: rgb(0, 132, 255);
                                padding: 0 10px;
                            }
                        }
                        .recharge{
                             float: left;
                             font-size: 20px;
                             background: rgb(173, 173, 169);
                             color: #fff;
                             line-height: 1;
                             margin: 23px 0 0 30px;
                             padding: 10px 20px;
                             border-radius: 6px;
                        }
                        .cash{
                             float: left;
                             font-size: 20px;
                             background: rgb(173, 173, 169);
                             line-height: 1;
                             color: #fff;
                             margin: 23px 0 0 30px;
                             padding: 10px 20px;
                             border-radius: 6px;
                        }

                    }
                    .table{
                        margin: 30px 10px;
                        line-height: 2;
                        background: rgb(247, 242, 237);
                        ul{
                            overflow: hidden;
                            li{
                                float:left;
                                padding: 20px 80px;
                            }
                        }
                    }
                }
            }
           
        }
</style>


