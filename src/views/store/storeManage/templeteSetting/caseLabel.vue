<template>
    <div>
        <div class='dytitle'>
	        <Breadcrumb class='dytitlespan'>
	            <BreadcrumbItem :to="{name:'storeprinting',params:{index:2}}">打印设置</BreadcrumbItem>
	            <BreadcrumbItem to="/caseLabel">收银/订单小票</BreadcrumbItem>
	        </Breadcrumb>
	    </div>
        <div class="center">
            <Tabs :animated="false" <Tabs :animated="false" style="background:#fff;width:100%" @on-click="clickLeftList">
                <TabPane label="线上订单">
                    <div class="case-main">
                        <li>
                            <div class="print-title">预览效果</div>
                            <div class="attrs-main" id="onlineReceipt">
                                <p class="tit">{{online.printTttle}}</p>
                                <p>订单单号：985392390293</p>
                                <p>下单时间：2018-11-01 09:25:49</p>
                                <p>打印时间：2018-11-01 09:25:49</p>

                                <p class="pt-18">羊毛衫 大号 白色</p>
                                <p class="pt-c">
                                    <span class="box l box-l">200.00</span>
                                    <span class="box m box-l">x3</span>
                                    <span class="box r f-tr">600.00</span>
                                </p>
                                <p class="pt-18">运动鞋 40码 黑色</p>
                                <p class="pt-c">
                                    <span class="box l box-l">150.00</span>
                                    <span class="box m box-l">x1</span>
                                    <span class="box r f-tr">150.00</span>
                                </p>
                                <p class="pt-c">
                                    <span class="box l box-l">150.00</span>
                                    <span class="box m box-l">x1</span>
                                    <span class="box r f-tr">150.00</span>
                                </p>
                                <p class="text-b"></p>
                                <p >
                                    <p>商品核量：5</p>
                                    <p>合<i class="p-i pp-i">计</i>：900.00</p>
                                    <p>实<i class="p-i pp-i">收</i>：900.00</p>
                                    <p>找<i class="p-i pp-i">零</i>：0.00</p>
                                    <!-- <p>优惠方式：满900打5折</p>
                                    优<i class="p-i pp-i">惠</i>：-450.00 -->
                                </p>
                                <!-- <p class="text-b">微信付款：450.00</p> -->
                                <!-- <p class="text-b"></p> -->

                                <!-- <p>手<i class="p-i-7 pp-i">机</i><i class="p-i-7 pp-i">号</i>：158****4986</p> -->
                                <p >
                                    积<i class="p-i pp-i">分</i>：获得1200积分，累计35990积分
                                </p>
                                <p>操<i class="p-i-7 pp-i">作</i><i class="p-i-7 pp-i">员</i>：小叶</p>
                                
                                <!-- <p >
                                    卡<i class="p-i pp-i">号</i>：5589 1251 0020 325 56
                                </p> -->
                                <p style="display: flex;">
                                    <span>地<i class="p-i pp-i">址</i></span>：<span>江苏省苏州是姑苏区苏州纳米城20区300号房间</span>

                                </p>
                                
                                <p class="p-b-i">{{online.printTttleBottom}}</p>
                            </div>
                        </li>
                        <li >
                          
                            <div class="attrs-main-r">
                                    <h5 class="print-set-title">小票规格</h5>
                                    <div style="padding:10px 0">
                                    <RadioGroup v-model="online.mm" @on-change="changeonline">
                                        <Radio label="58mm">
                                            <span class='print-size'>58mm</span>
                                        </Radio>
                                        <Radio label="80mm">
                                            <span class='print-size'>80mm</span>
                                        </Radio>
                                    </RadioGroup>
                                </div>
                                <div class="edit-main">
                                    <div class="edit-main-title">编辑头部标题</div>
                                    <Input type="textarea" :maxlength="30" :clearable="true" :rows="4" v-model="online.printTttle"></Input>
                                </div>
                                <div class="edit-main">
                                    <div class="edit-main-title">编辑底部备注</div>
                                    <Input type="textarea" :maxlength="30" :clearable="true" :rows="4" v-model="online.printTttleBottom"></Input>
                                </div>
                                <div class="edit-main-botton">
                                    <Button type="ghost" class="edit-botton-style" @click="printTest(1)">打印测试</Button>
                                    <Button type="primary" class="edit-botton-style edit-botton-style-right">应用</Button>
                                </div>
                            </div>
                        </li>

                    </div>

                </TabPane>
                <TabPane label="收银小票">
                    <div class="case-main">
                        <li>
                            <div class="print-title">预览效果</div>
                            <div class="attrs-main" id="caseReceipt">
                                <p class="tit">{{printTttlecaseline}}</p>
                                <p>订单单号：985392390293</p>
                                <p>交易时间：2018-11-01 09:25:49</p>
                                <p>收<i class="p-i-7 pp-i">银</i><i class="p-i-7 pp-i">员</i>：小叶</p>

                                <p class="pt-18">羊毛衫 大号 白色</p>
                                <p class="pt-c">
                                    <span class="box l box-l">200.00</span>
                                    <span class="box m box-l">x3</span>
                                    <span class="box r f-tr">600.00</span>
                                </p>
                                <p class="pt-18">运动鞋 40码 黑色</p>
                                <p class="pt-c">
                                    <span class="box l box-l">150.00</span>
                                    <span class="box m box-l">x1</span>
                                    <span class="box r f-tr">150.00</span>
                                </p>
                                <p class="pt-c">
                                    <span class="box l box-l">150.00</span>
                                    <span class="box m box-l">x1</span>
                                    <span class="box r f-tr">150.00</span>
                                </p>
                                <p >
                                    合<i class="p-i pp-i">计</i>：900.00
                                    <p>优惠方式：满900打5折</p>
                                    优<i class="p-i pp-i">惠</i>：-450.00
                                </p>
                                <p class="text-b">微信付款：450.00</p>

                                <p>手<i class="p-i-7 pp-i">机</i><i class="p-i-7 pp-i">号</i>：158****4986</p>

                                 <p >
                                    卡<i class="p-i pp-i">号</i>：5589 1251 0020 325 56
                                </p>
                                <p >
                                    积<i class="p-i pp-i">分</i>：获得1200积分，累计35990积分
                                </p>
                                <p class="p-b-i">{{printTttleBottomcaseline}}</p>

                            </div>
                        </li>
                        <li >
                            <div class="print-title"></div>
                            <div class="attrs-main-r">
                                    <h5 class="print-set-title">小票规格</h5>
                                    <div style="padding:10px 0">
                                    <RadioGroup v-model="casel" @on-change="changeCase">
                                        <Radio label="58mm">
                                            <span class='print-size'>58mm</span>
                                        </Radio>
                                        <Radio label="80mm">
                                            <span class='print-size'>80mm</span>
                                        </Radio>
                                    </RadioGroup>
                                </div>
                                <div class="edit-main">
                                    <div class="edit-main-title">编辑头部标题</div>
                                    <Input type="textarea" :maxlength="30" :clearable="true" :rows="4" v-model="printTttlecaseline"></Input>
                                </div>
                                <div class="edit-main">
                                    <div class="edit-main-title">编辑底部备注</div>
                                    <Input type="textarea" :maxlength="30" :clearable="true" :rows="4" v-model="printTttleBottomcaseline"></Input>
                                </div>
                                <div class="edit-main-botton">
                                    <Button type="ghost" class="edit-botton-style" @click="printTest(2)">打印测试</Button>
                                    <Button type="primary" class="edit-botton-style edit-botton-style-right">应用</Button>
                                </div>
                            </div>
                        </li>
                    </div>
                    
                </TabPane>
                <TabPane label="线上退货">
                    <div class="case-main">
                        <li>
                            <div class="print-title">预览效果</div>
                            <div class="attrs-main" id="onlinereturnReceipt">
                                <p class="tit">{{printTttleonlinereturn}}</p>
                                <p>退款单号：985392390293</p>
                                <p>交易时间：2018-11-01 09:25:49</p>
                                <p>收<i class="p-i-7 pp-i">银</i><i class="p-i-7 pp-i">员</i>：小叶</p>

                                <p class="pt-18">羊毛衫 大号 白色</p>
                                <p class="pt-c">
                                    <span class="box l box-l">200.00</span>
                                    <span class="box m box-l">x3</span>
                                    <span class="box r f-tr">600.00</span>
                                </p>
                                <p class="pt-18">运动鞋 40码 黑色</p>
                                <p class="pt-c">
                                    <span class="box l box-l">150.00</span>
                                    <span class="box m box-l">x1</span>
                                    <span class="box r f-tr">150.00</span>
                                </p>
                                <p class="pt-c">
                                    <span class="box l box-l">150.00</span>
                                    <span class="box m box-l">x1</span>
                                    <span class="box r f-tr">150.00</span>
                                </p>
                                <p >
                                    合<i class="p-i pp-i">计</i>：900.00
                                    <p>优惠方式：满900打5折</p>
                                    优<i class="p-i pp-i">惠</i>：-450.00
                                </p>
                                <p class="text-b">现金退款：450.00</p>

                                <p>手<i class="p-i-7 pp-i">机</i><i class="p-i-7 pp-i">号</i>：158****4986</p>

                                 <p >
                                    卡<i class="p-i pp-i">号</i>：5589 1251 0020 325 56
                                </p>
                                <p >
                                    积<i class="p-i pp-i">分</i>：获得1200积分，累计35990积分
                                </p>
                                <p class="p-b-i">{{printTttleBottomonlinereturn}}</p>

                            </div>
                        </li>
                        <li >
                            <div class="print-title"></div>
                            <div class="attrs-main-r">
                                    <h5 class="print-set-title">小票规格</h5>
                                    <div style="padding:10px 0">
                                    <RadioGroup v-model="onlinereturn" @on-change="changereturnOnline">
                                        <Radio label="58mm">
                                            <span class='print-size'>58mm</span>
                                        </Radio>
                                        <Radio label="80mm">
                                            <span class='print-size'>80mm</span>
                                        </Radio>
                                    </RadioGroup>
                                </div>
                                <div class="edit-main">
                                    <div class="edit-main-title">编辑头部标题</div>
                                    <Input type="textarea" :maxlength="30" :clearable="true" :rows="4" v-model="printTttleonlinereturn"></Input>
                                </div>
                                <div class="edit-main">
                                    <div class="edit-main-title">编辑底部备注</div>
                                    <Input type="textarea" :maxlength="30" :clearable="true" :rows="4" v-model="printTttleBottomonlinereturn"></Input>
                                </div>
                                <div class="edit-main-botton">
                                    <Button type="ghost" class="edit-botton-style" @click="printTest(3)">打印测试</Button>
                                    <Button type="primary" class="edit-botton-style edit-botton-style-right">应用</Button>
                                </div>
                            </div>
                        </li>
                    </div>
                </TabPane>
                <TabPane label="线下退货">
                    <div class="case-main">
                        <li>
                            <div class="print-title">预览效果</div>
                            <div class="attrs-main" id="offlineReceipt">
                                <p class="tit">{{printTttleoffline}}</p>
                                <p>退款单号：985392390293</p>
                                <p>交易时间：2018-11-01 09:25:49</p>
                                <p>收<i class="p-i-7 pp-i">银</i><i class="p-i-7 pp-i">员</i>：小叶</p>

                                <p class="pt-18">羊毛衫 大号 白色</p>
                                <p class="pt-c">
                                    <span class="box l box-l">200.00</span>
                                    <span class="box m box-l">x3</span>
                                    <span class="box r f-tr">600.00</span>
                                </p>
                                <p class="pt-18">运动鞋 40码 黑色</p>
                                <p class="pt-c">
                                    <span class="box l box-l">150.00</span>
                                    <span class="box m box-l">x1</span>
                                    <span class="box r f-tr">150.00</span>
                                </p>
                                <p class="pt-c">
                                    <span class="box l box-l">150.00</span>
                                    <span class="box m box-l">x1</span>
                                    <span class="box r f-tr">150.00</span>
                                </p>
                                <p >
                                    合<i class="p-i pp-i">计</i>：900.00
                                    <p>优惠方式：满900打5折</p>
                                    优<i class="p-i pp-i">惠</i>：-450.00
                                </p>
                                <p class="text-b">现金退款：450.00</p>

                                <p>手<i class="p-i-7 pp-i">机</i><i class="p-i-7 pp-i">号</i>：158****4986</p>

                                 <p >
                                    卡<i class="p-i pp-i">号</i>：5589 1251 0020 325 56
                                </p>
                                <p >
                                    积<i class="p-i pp-i">分</i>：获得1200积分，累计35990积分
                                </p>
                                <p class="p-b-i">{{printTttleBottomoffline}}</p>

                            </div>
                        </li>
                        <li >
                            <div class="print-title"></div>
                            <div class="attrs-main-r">
                                    <h5 class="print-set-title">小票规格</h5>
                                    <div style="padding:10px 0">
                                    <RadioGroup v-model="offline" @on-change="changeOffline">
                                        <Radio label="58mm">
                                            <span class='print-size'>58mm</span>
                                        </Radio>
                                        <Radio label="80mm">
                                            <span class='print-size'>80mm</span>
                                        </Radio>
                                    </RadioGroup>
                                </div>
                                <div class="edit-main">
                                    <div class="edit-main-title">编辑头部标题</div>
                                    <Input type="textarea" :maxlength="30" :clearable="true" :rows="4" v-model="printTttleoffline"></Input>
                                </div>
                                <div class="edit-main">
                                    <div class="edit-main-title">编辑底部备注</div>
                                    <Input type="textarea" :maxlength="30" :clearable="true" :rows="4" v-model="printTttleBottomoffline"></Input>
                                </div>
                                <div class="edit-main-botton">
                                    <Button type="ghost" class="edit-botton-style" @click="printTest(4)">打印测试</Button>
                                    <Button type="primary" class="edit-botton-style edit-botton-style-right">应用</Button>
                                </div>
                            </div>
                        </li>
                    </div>
                </TabPane>
                <TabPane label="会员充值">
                    <div class="case-main">
                        <li>
                            <div class="print-title">预览效果</div>
                            <div class="attrs-main" id="caseReceipt">
                                <p class="tit">{{printTttlecaseline}}</p>
                                <p>会<i class="p-i-7 pp-i">员</i><i class="p-i-7 pp-i">号</i>：{{online.merberNo}}</p>
                                <p>订单单号：985392390293</p>
                                <p>交易时间：2018-11-01 09:25:49</p>
                                <p>收<i class="p-i-7 pp-i">银</i><i class="p-i-7 pp-i">员</i>：小叶</p>

                                <p class="pt-18">羊毛衫 大号 白色</p>
                                <p class="pt-c">
                                    <span class="box l box-l">200.00</span>
                                    <span class="box m box-l">x3</span>
                                    <span class="box r f-tr">600.00</span>
                                </p>
                                <p class="pt-18">运动鞋 40码 黑色</p>
                                <p class="pt-c">
                                    <span class="box l box-l">150.00</span>
                                    <span class="box m box-l">x1</span>
                                    <span class="box r f-tr">150.00</span>
                                </p>
                                <p class="pt-c">
                                    <span class="box l box-l">150.00</span>
                                    <span class="box m box-l">x1</span>
                                    <span class="box r f-tr">150.00</span>
                                </p>
                                <p >
                                    合<i class="p-i pp-i">计</i>：900.00
                                    <p>优惠方式：满900打5折</p>
                                    优<i class="p-i pp-i">惠</i>：-450.00
                                </p>
                                <p class="text-b">微信付款：450.00</p>

                                <p>手<i class="p-i-7 pp-i">机</i><i class="p-i-7 pp-i">号</i>：158****4986</p>

                                 <p >
                                    卡<i class="p-i pp-i">号</i>：5589 1251 0020 325 56
                                </p>
                                <p >
                                    积<i class="p-i pp-i">分</i>：获得1200积分，累计35990积分
                                </p>
                                <p class="p-b-i">{{printTttleBottomcaseline}}</p>

                            </div>
                        </li>
                        <li >
                            <div class="print-title"></div>
                            <div class="attrs-main-r">
                                    <h5 class="print-set-title">小票规格</h5>
                                    <div style="padding:10px 0">
                                    <RadioGroup v-model="casel" @on-change="changeCase">
                                        <Radio label="58mm">
                                            <span class='print-size'>58mm</span>
                                        </Radio>
                                        <Radio label="80mm">
                                            <span class='print-size'>80mm</span>
                                        </Radio>
                                    </RadioGroup>
                                </div>
                                <div class="edit-main">
                                    <div class="edit-main-title">编辑头部标题</div>
                                    <Input type="textarea" :maxlength="30" :clearable="true" :rows="4" v-model="printTttlecaseline"></Input>
                                </div>
                                <div class="edit-main">
                                    <div class="edit-main-title">编辑底部备注</div>
                                    <Input type="textarea" :maxlength="30" :clearable="true" :rows="4" v-model="printTttleBottomcaseline"></Input>
                                </div>
                                <div class="edit-main-botton">
                                    <Button type="ghost" class="edit-botton-style" @click="printTest(5)">打印测试</Button>
                                    <Button type="primary" class="edit-botton-style edit-botton-style-right">应用</Button>
                                </div>
                            </div>
                        </li>
                    </div>
                    
                </TabPane>
            </Tabs>
            <!-- <div>
                <Button shape="circle" type="primary" style="border:none;margin: 20px 0"
                 @click="add" >
				新增页面</Button>
                <Button shape="circle"  style=";margin: 20px 0"
                 @click="addCount" >
				打印份数</Button>
            </div>
            <div>
                <Table  border highlight-row  :columns="casekey" :data="caseData"
                 @on-row-click="clickCaseRow">
			    </Table>
                <div class="page-box">
                <Page :total="total" :pageSize='pageSize' show-total @on-change="getData" 
                @on-page-size-change="changePageSize"></Page>
                </div>
            </div> -->
        </div>
       <!--  <Modal v-model="tempisshow" width="800px">
            <p slot="header" style="height:30px;line-height:30px">
                <span>选择模板</span>
            </p>
        
            <div slot="footer">
                <div style='margin:-10px'>
                    <div class='temp'>
                        <div v-if='temps.length!=0'>
                            <li  v-for='(item,index) in temps' :key='index' @click='addbg(index)' :class="{bg:index==numIndex}">{{item}}</li>
                        </div>
                        <div v-else>{{$t('public.NoData')}}</div>
                    </div>
                </div>
            </div>
	    </Modal> -->
        <!-- <Modal v-model="cgDZisshow" width="460px">
            <p slot="header" style="height:30px;line-height:30px">
                <span>设置打印份数</span>
            </p>
          
            <div slot="footer">
                <div style='margin:0px'>
                    <div style='text-align:left'>
                        <span>打印份数：</span><Input v-model='count' style='width:80px'></Input>
                        <span style='color:#f53c39'>只对线下收银小票、线下退货小票生效</span>
                    </div>
                    <div style='margin:10px 0'>
                        <Button shape="circle" type="ghost"
                         style="display:inline-block;background:#ACACAC;border:none;color:#fff" 
                         @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
                        <Button shape="circle" type="ghost" 
                        style="display:inline-block;background:#3b77e3;color:#fff" 
                        @click="makegoods"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
                    </div>
                </div>
            </div>
	    </Modal -->
    </div>
</template>
<script>
import store from '@/store/index'
export default {
    data(){
        return {
            //1:线上 订单   2：收银订单  3：线上退货  4：线下退货   5：会员充值
            type:1,
            user:this.$store.state.common.user,
           uid: this.$store.state.common.token,
            online:{
                //线上
                mm:"58mm",
                printTttle:this.$store.state.common.user.trueName,//标题
                merberNo:259648554852,
                printTttleBottom:"钱票请当面点清，离开柜台恕不负责!",//底部标题
            },
            

            //线上退货
            onlinereturn:"58mm",
            printTttleonlinereturn:this.$store.state.common.user.trueName,//标题
            printTttleBottomonlinereturn:"钱票请当面点清，离开柜台恕不负责!",//底部标题

             //线下
            offline:"58mm",
            printTttleoffline:this.$store.state.common.user.trueName,//标题
            printTttleBottomoffline:"钱票请当面点清，离开柜台恕不负责!",//底部标题

            //收银
            casel:"58mm",
            printTttlecaseline:this.$store.state.common.user.trueName,//标题
            printTttleBottomcaseline:"钱票请当面点清，离开柜台恕不负责!",//底部标题





            cgDZisshow:false,
            total:0,
            pageSize:0,
            casekey:[
                {
                    title:"页面名称",
                    key:"name",
                },
                {
                    title:"模板类型",
                    key:"type",
                },
                {
                    title:"修改时间",
                    key:"creatTime",
                },
                {
                    title:"状态",
                    key:"statusDesc",
                },
                {
                    title:"操作",
                    key:"action",
                },
            ],
            caseData:[],
            //选择模板
            count:1,//打印份数
            tempisshow:false,//
            numIndex:-1,
            temps:[],
        }
    },
    methods:{
        //切换//1:线上 订单   2：收银订单  3：线上退货  4：线下退货   5：会员充值
        clickLeftList(num){
            switch(num){
                case 0:
                    this.type=1
                break;
                case 1:
                    this.type=2
                break;
                case 2:
                    this.type=3
                break;
                case 3:
                    this.type=4
                break;
                case 4:
                    this.type=5
                break;
            }
        },
          //打印测试dev.zsydian.com/pss/store/print/test/1
        pritP(type){
            this.axios.get('/store/print/test/'+type+'?uid='+this.uid).then(res=>{
                    if(res.data.status==200){

                    }
                })
        },
        //打印测试dev.zsydian.com/pss/store/print/test/1
        printTest(type){
            this.pritP(type)
        },
        //选择购物小票大小
        changeonline(s){
            this.online.mm=s
            if(this.online.mm=="58mm"){
                $('#onlineReceipt').width(340)
            }
            if(this.online.mm=="80mm"){
                $('#onlineReceipt').width(380)
            }
        },

        
         //选择收银小票大小
        changeCase(s){
            this.casel=s
            if(this.casel=="58mm"){
                $('#caseReceipt').width(340)
            }
            if(this.casel=="80mm"){
                $('#caseReceipt').width(380)
            }
        },
        //选择线上小票大小
        changereturnOnline(s){
            this.onlinereturn=s
            if(this.onlinereturn=="58mm"){
                $('#onlinereturnReceipt').width(340)
            }
            if(this.onlinereturn=="80mm"){
                $('#onlinereturnReceipt').width(380)
            }
        },
        //选择线下小票大小
        changeOffline(s){
            this.offline=s
            if(this.offline=="58mm"){
                $('#offlineReceipt').width(340)
            }
            if(this.offline=="80mm"){
                $('#offlineReceipt').width(380)
            }
        },
       
        



        /**********************未实现定制*****************************/
        add(){
            this.tempisshow=true
        },
        
        //点击模板一行
        clickCaseRow(data){

        },
        //点击打印份数
        addCount(){
            this.cgDZisshow=true
        },
        //打印份数取消
        modelCancel(){
            this.cgDZisshow=false
            this.count=1
        },
        //打印份数确认
        makegoods(){
            this.cgDZisshow=false
            this.count=1
        },
        //新增页面
        addbg(index){
            // this.numIndex=index
        },
        //翻页
        getData(current){

        },
        changePageSize(size){
            this.pageSize=size
        },
    },
    mounted(){

    }
}
</script>
<style scoped>
li{
    list-style-type: none;
}
.dytitle{
	display: block;
	height:50px;
	line-height: 50px;
	background: #F9F9F9;
}
.dytitlespan{
    margin-left:20px
}
.center{
	margin:0 20px 120px 20px;

}
.title{
	margin: 20px 0;
}
.title p{
	width: 100%;
    height: 34px;
    padding-left: 15px;
    background-color: #F2F8FF;
    margin-bottom: 10px;
    align-items: center;
    display: flex;
    border: 1px solid #e9e9e9;
}
.page-box{
    margin:10px 0;
    text-align: center;
}
.temp{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-bottom:30px
}
.temp li{
    width:200px;
    height:300px;
    border:1px solid #A0C3F2;
    margin:10px 0
}
.temp li:hover{
    border:1px dotted #A0C3F2
}
.bg{
    border:1px solid #A0C3F2
}









.case-main{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:350px;
}
.case-main  li{
    display: flex;
    flex-direction: column;
}
.print-title{
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #999;
}
.case-main .attrs-main{
    width:340px;
    margin: 0 20px;
    min-height: 620px;
    padding: 20px;
    font-size: 14px;

    border: 1px solid #e6e6e6;
    box-shadow: 0 0 10px rgba(0, 0, 0, .15);
}
.attrs-main p{
    line-height: 22px
}
.print-set-title{
    margin-top: 40px;
    font-size: 16px;
    line-height: 30px;
    color: #666;
}
.print-size{
    font-size:18px;color: #999;
}
.edit-main{
    margin-top:10px;
}
.edit-main-botton{
    text-align: center;
    margin-top: 20px;
}
.edit-botton-style{
    width:75px;
}
.edit-botton-style-right{
    margin-left:10px;
}
.attrs-main-r{
    
    position: absolute;
    top: 85px;
    width: 340px;
     margin: 0 20px; 
    min-height: 580px;
    padding: 20px;
    font-size: 14px;
    border: 1px solid #e6e6e6;
    box-shadow: 0 0 10px rgba(0, 0, 0, .15);
}
.tit{
    padding: 10px 0 16px;
    font-size: 28px;
    line-height: 32px;
    text-align: center;
    word-wrap: break-word;
    word-break: normal;
}
.pt-18{
    padding-top: 18px;
}
.pt-c{
    display: flex;
    justify-content: space-between;
    padding:6px 0;
}
.pp-i{
    font-style: normal;text-align: left;font-size: inherit;
}
.p-i{
    padding-left: 28px;
}
.p-i-7{
    padding-left: 7px;
}

.text-b{
    padding:10px 0;
    font-size:18px;
    font-weight: 600
}
.p-b-i{
    text-align: center;
    padding:10px 0;
}

</style>

