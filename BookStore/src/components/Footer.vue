<template>
    <div id="app">
        <div class="footer">
            <div class="list">
                <dl class="novice">
                    <dt><a href="#" >新手入门</a></dt>
                    <dd><a href="#">账户注册</a></dd>
                    <dd><a href="#">用户登入</a></dd>
                    <dd><a href="#">常见问题</a></dd>
                </dl>
                <dl class="guide">
                    <dt><a href="#">购书指南</a></dt>
                    <dd><a href="#">购书步骤</a></dd>
                    <dd><a href="#">搜索商品</a></dd>
                    <dd><a href="#">商品缺货</a></dd>
                    <dd><a href="#">订单状态</a></dd>
                    <dd><a href="#">取消订单</a></dd>
                    <dd><a href="#">修改订单</a></dd>
                    <dd><a href="#">优惠券使用说明</a></dd>
                </dl>
                <dl class="pay">
                    <dt><a href="#">支付方式</a></dt>
                    <dd><a href="#">货到付款</a></dd>
                    <dd><a href="#">在线支付</a></dd>
                    <dd><a href="#">其他支付方式</a></dd>
                    <dd><a href="#">交易安全防诈骗</a></dd>
                </dl>
                <dl class="service">
                    <dt><a href="#">售后服务</a></dt>
                    <dd><a href="#">退换货政策</a></dd>
                    <dd><a href="#">退换货流程</a></dd>
                    <dd><a href="#">七天无理由退款</a></dd>
                    <dd><a href="#">退换货时间及方式</a></dd>
                    <dd><a href="#">退换货地址</a></dd>
                </dl>
                <dl class="about">
                    <dt><a href="#">关于书田</a></dt>
                    <dd><a href="#">了解书田</a></dd>
                    <dd><a href="#">联系我们</a></dd>
                    <dd><a href="#">书田网用户注册协议</a></dd>
                
                </dl>
            </div>
            <div class="serve">
                <ul>
                    <li><a href="#">探索发现</a></li>
                    <li><a href="#">读者论坛</a></li>
                    <li><a href="#">友情链接</a></li>
                    <li><a href="#">合作伙伴</a></li>
                </ul>
            </div>
            <div class="permit">
                Copyright (C)2019-2026 书田网, All Rights Reserved 
                <span><img src="../../static/img/badge.png" alt=""></span>
                杭州公安局西湖分局备案编号：1011060757 浙ICP证100616号 出版物经营许可证：浙批100533号
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'App',
  data(){
      return{}
  },
  methods:{
    
  }
}
</script>
<style <style lang="scss" scoped>
        //  尾部
    .footer{
        margin: 30px auto;
        border-top: #99a9bf solid 3px;
        background: rgb(239, 245, 247);
        a:hover{
            color: blue;
        }
        .list{
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;
            padding-bottom: 20px;
            background: #fff;
            dl{
                text-align: left;
                float: left;
                padding: 20px 60px;
                dt{
                    line-height: 2;
                    font-size: 20px;
                    font-weight: 900;
                    width: 100%;
                    border-bottom: 1px solid rgb(204, 196, 196);
                }
                dd{
                    line-height: 2;
                }
            }
        }
        .serve{
            width: 1200px;
            background: #fff;
            margin: 0  auto  ;
            text-align: center;
            padding-bottom: 20px;
            ul{
                overflow: hidden;
                margin: 0 auto;
                line-height: 1;
                
                width: 360px;
                text-align: center;
                li{
                float:left;
                padding:0 10px;
                border-right: 1px solid rgb(167, 161, 161);
            }
            }  
        }
        .permit{
            width: 1200px;
            margin: 0 auto;
            background: #fff;
        }
    }
</style>


