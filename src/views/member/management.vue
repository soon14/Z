<template>
  <div id="management">
    <div class="management_head">

      <div class="wldw1">
          <div>
            <span style="width:42px;font-weight:900;width:60px">{{$t('public.screen')}}：</span>
             <Select style="width:100px" v-model='valueT' @on-change="searCrmOption">
                <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div style=';width:400px;margin-left:10px;display:flex;margin-top: -5px;'>
            <Input style='margin-top:15px;width:300px' v-model='searchKeyword' :placeholder="$t('public.codeornameorphone')" @on-enter='enterSearch'>
            <span slot="append"  @click='search' style='cursor:pointer;'>{{$t('public.search')}}</span>
            </Input>
        </div>
      </div>
       <div class="btns-box" style='margin-right:20px'>
        <Button type="ghost" shape="circle" @click='add' style="background:#3b77e3;margin-right:5px;color:#fff;border:none"><Icon type="plus-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}</Button>
        <Button type="primary" shape="circle" @click="addcz" style="background:#3b77e3;color:#fff;border:none">
        <Icon type="social-usd" style="margin-right:5px;color:#fff"></Icon>{{$t('member.cz')}}<!--充值-->
        </Button>
        <!-- 更多-->
            <Dropdown trigger="click" style="margin-left: 4px">
                  <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">{{$t('public.more')}}
                  <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
              </Button>
              <DropdownMenu slot="list">
                  <span  @click="start" v-if="startisshow"><DropdownItem >恢复</DropdownItem></span>
                  <span  @click="stop" v-if="startisstop"><DropdownItem >拉黑</DropdownItem></span>
                  <span  @click="del"><DropdownItem >{{$t('public.del')}}</DropdownItem></span>
              </DropdownMenu>
           </Dropdown>
        </div> 
    </div>
    <!--表格数据-->
    <div class="table">
      <Table highlight-row border  :columns="mentList" :data="cardData" @on-row-dblclick="dbl" @on-select="selected" @on-row-click='clickRow'></Table>
    <!--底部的分页-->
    <div class="page-box">
       <Page :total="total"  show-total placement='top' :pageSize='pageSize' size='small' show-sizer :page-size-opts="[10,20,30,40,50]" @on-change="getData" @on-page-size-change="changePageSize">
       </Page>
    </div>
    </div>
      <!--收款三步-->
  <el-dialog :visible.sync="alertch" ><!--:close-on-click-modal='false'-->
    <div class='paydialog'>
    <el-steps  :active="active1"  align-center finish-status="success" class='step'>
      <el-step :title="$t('member.payType')"></el-step><!--支付方式-->
      <el-step :title="$t('member.czInfo')"></el-step><!--充值信息-->
      <el-step :title="$t('member.success')"></el-step><!--交易完成-->
    </el-steps> 
    </div>  
    <!--下-->
    <div v-if='one'>
      <div class='dialog-bottom'>
        <div class="dialog-left">
          <div class='left-info'>
          <!-- <li style='font-weight:600'>会员充值</li> -->
          <li ><span class='span'>{{$t('member.crmcode')}}：</span><span>{{item.code}}</span></li><!--会员编号-->
          <li ><span class='span'>{{$t('member.name')}}：</span><span>{{item.name}}</span></li><!--会员-->
          
          <li ><span class='span'>{{$t('member.ye')}}：</span><span style='color:#d53c39'>{{item.chargeMoney}}</span><span>{{$t('member.yuan')}}</span></li><!--元-->
          </div><!--余额-->
          
            <div v-if='HdData.lenght==0'>{{$t('public.NoData')}}</div><!--暂无活动-->
                  <div class='czmian' v-else>
                    <div class='cztitle'>{{$t('member.czhd')}}</div><!--充值活动-->
                    <div class='right-list' v-for='(item,index) in HdData' :class="{bg:numIndex==index}" @click='clickLi(item,index)' :key='index'>
                          <div style='margin-bottom:5px'>{{$t('member.name')}}：<span style='font-size:14px;font-weight:600;color:#4C6DDE'>{{item.title}}</span></div><!--活动名称-->
                          <div>
                            <div>{{$t('member.czje')}}：<span style='color:#d53c39'>{{item.charge}}</span> 元</div><!--充值金额-->
                            <div>{{$t('member.zsje')}}：<span style='color:#d53c39'>{{item.giftCharge}}</span> 元</div><!--赠送金额-->
                             <div>赠送积分：<span style='color:#d53c39'>{{item.giftIntegral}}</span> 积分</div>
                          </div>
                    </div>
                    <div class="page-box44" >
                         <Page :total="hdtotal" size='small' show-total  :pageSize='hdpagesize'  @on-change="hdgetData" @on-page-size-change="hdchangePageSize">
                         </Page>
                        </div>
                  </div>
          
        </div>
        <div class="dialog-right">
          <li style='width:100%'>
            <div class='payWay-dialog'>
              <img src="http://img.zsydian.com/icon/payWayzfb.png" style='margin:0 5px'><span>{{$t('public.zfb')}}</span><!--支付宝-->
              <span><Icon type="plus-circled" style=''></Icon></span>
              <img src="http://img.zsydian.com/icon/payWaywx.png" style='margin:0 5px'><span>{{$t('public.wx')}}</span><!--微信-->
              <!-- <span>等第三方</span> -->
            </div>
            <span style='margin-top:15px'>
              <Input v-model.lazy='zfbmoney'  @on-change='moneychangezfb' @on-focus='zfbfocus' ></Input>
            </span>
          </li>
          
          <li >
            <div class='payWay-dialog'>
              <img src="http://img.zsydian.com/icon/payWaysk.png" >
              <span>{{$t('public.skpay')}}</span><!--刷卡支付-->
            </div>
            <span style='margin-top:15px' >
              <Input v-model.lazy='skmoney'  @on-change='moneychangesk' @on-focus='skfocus' ></Input>
            </span>
          </li>
          <li style='border-right:1px solid #e4e4e4'>
            <div class='payWay-dialog'>
              <img src="http://img.zsydian.com/icon/payWayxj.png" ><span>{{$t('public.sjpay')}}</span><!--现金支付-->
            </div>
            <span style='margin-top:15px' >
              <Input v-model.lazy='xjmoney'  @on-change='moneychangexj' @on-focus='xjfocus'></Input>
            </span>
          </li>
          <li style='border-right:1px solid #e4e4e4'>
            <div class='payWay-dialog'>
              <img src="http://img.zsydian.com/icon/payWayxj.png" ><span>{{$t('public.xxpay')}}</span><!--线下支付-->
            </div>
            <span style='margin-top:15px' >
              <Input v-model.lazy='xxmoney'  @on-change='moneychangexx' @on-focus='xxfocus'></Input>
            </span>
          </li>
          <!-- <li style='border-right:1px solid #e4e4e4'>
            <div class='payWay-dialog'>
              <img src="http://img.zsydian.com/icon/payWayxj.png" ><span>储值卡支付</span>
            </div>
            <span style='margin-top:15px' >
              <Input v-model.lazy='czkmoney'  @on-change='moneychangeczk' @on-focus='czkfocus'></Input>
            </span>
          </li> -->
          <!-- <li style='border-right:1px solid #e4e4e4'>
            <div class='payWay-dialog'>
              <img src="http://img.zsydian.com/icon/payWayxj.png" ><span>DOKU</span>
            </div>
            <span style='margin-top:15px' >
              <Input v-model.lazy='DOCUmoney'  @on-change='moneychangeDOCU' @on-focus='DOCUfocus'></Input>
            </span>
          </li> -->
          <li style='border-right:1px solid #e4e4e4'>
            <div class='payWay-dialog'>
              <img src="http://img.zsydian.com/icon/payWaymore.png" ><span>{{$t('public.qtpay')}}</span><!--其他支付-->
            </div>
            <span style='margin-top:15px' >
              <Input v-model.lazy='othermoney'  @on-change='othermoney1' @on-focus='otherfocus'></Input>
            </span>
          </li>
          <div class='dialog-btn1'>
            <span style='margin-top:20px;margin-left:5px'><span>{{$t('public.czje')}}：</span ><span style='color:#FB9961;font-size:25px;'>{{Allp}}</span></span><!--充值金额-->
            <div>
            <span class='payBtn' @click='skCancel' style='background:#999;'>{{$t('public.cancel')}}</span><!--取消-->
            <span class='payBtn' @click="oneStepCZ">{{$t('public.sk')}}</span><!--收款-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if='two'>
      <div class='dialog-bottom'>
        <div class="dialog-left" style='margin-top:10px'>
          
          <div class='left-info'>
           <li ><span class='span'>{{$t('member.crmcode')}}：</span><span>{{item.code}}</span></li><!--会员编号-->
          <li ><span class='span'>{{$t('member.name')}}：</span><span>{{item.name}}</span></li><!--会员-->
          <!--余额-->
          <li ><span class='span'>{{$t('member.ye')}}：</span><span style='color:#d53c39'>{{item.chargeMoney}}</span><span>
          {{$t('member.yuan')}}</span></li>
           <li v-if='itemhd.title'><span class='span'>{{$t('member.czhd')}}：</span><span style='color:#d53c39'>{{itemhd.title}}</span><span></span></li><!--参与活动-->
          </div>
          <div style='font-weight:600;font-size:16px;padding: 10px;'>
              <li style='display:flex;height: 35px;line-height: 35px;'>
                <span class='span'>{{$t('member.czje')}} &nbsp;</span><!--充值金额-->
                <span style='color:#FB9961;font-size:25px'>{{payPrice}}</span>
                <span>&nbsp;{{$t('member.yuan')}}</span><!--元-->
              </li>
            </div>
        </div>
        <div class="dialog-right">
          <div style='width:100%;text-align:center;margin-top:10px' v-if='zfbmoney!=0'>
            <Input style='width:70%' :placeholder="$t('member.fkm')" v-model='fkmcode' ref='fkm'></Input><!--输入付款码-->
          </div>
          <div style='width:100%;text-align:center;margin-top:10px'>
             
            <div>

             <Col class="demo-spin-col" span="24">
                    <Spin fix>
                      
                        <div>支付中....</div><!--支付中-->
                    </Spin>
                </Col>
                
                </div>
          </div>
          
          <div class='dialog-btn'>
            <span class='payBtn' style='background:#ccc;' @click="twocancel">{{$t('public.pre')}}</span><!--返回-->
            <span class='payBtn payBtn1' style='background:#3B77E3;;margin-left:20px' @click="twoStepCZ">{{$t('public.sure')}}</span>
            <!--收款确认-->
          </div>
        </div>
      </div>
    </div>
    <div v-if='three'>
      <div class='dialog-bottom'>
        <div class="dialog-left1">
          <div class='left-info' style='margin-top: 20px;'>
          <li style='font-weight:600'>充值明细</li>
          <li v-if='zfbmoney!=0' style='margin-top:10px'><span style='color:#999'>支付宝支付：</span><span style='margin-left:5px;color:#278A8B'><strong>{{zfbmoney}}</strong>元</span></li>
          
          <!-- <li v-if='crmmoney!=0'><span style='color:#999'>会员卡支付：</span><span style='margin-left:5px;color:#278A8B'><strong>{{crmmoney}}</strong>元</span></li> -->
          <li v-if='xjmoney!=0' style='margin-top:10px'><span style='color:#999'>现金支付：</span><span style='margin-left:5px;color:#d53c39'><strong>{{xjmoney}}</strong>元</span></li>
          <li v-if='skmoney!=0' style='margin-top:10px'><span style='color:#999'>刷卡支付：</span><span style='margin-left:5px;color:#d53c39'><strong>{{skmoney}}</strong>元</span></li>
          <li v-if='othermoney!=0' style='margin-top:10px'><span style='color:#999'>其他支付：</span><span style='margin-left:5px;color:#d53c39'><strong>{{othermoney}}</strong>元</span></li>
          <li v-if='xxmoney!=0' style='margin-top:10px'><span style='color:#999'>线下支付：</span><span style='margin-left:5px;color:#d53c39'><strong>{{xxmoney}}</strong>元</span></li>
          <li v-if='czkmoney!=0' style='margin-top:10px'><span style='color:#999'>储值卡支付：</span><span style='margin-left:5px;color:#d53c39'><strong>{{czkmoney}}</strong>元</span></li>
          <li v-if='DOCUmoney!=0' style='margin-top:10px'><span style='color:#999'>DOCU：</span><span style='margin-left:5px;color:#d53c39'><strong>{{DOCUmoney}}</strong>元</span></li>
          </div>
          
        </div>
        <div class="dialog-right">
          <div style='width:100%;text-align:center;margin-top:10px'>
            <Icon type="ios-checkmark-outline" size='160' style='color:#13CE66'></Icon>
          </div>
          <div class='dialog-btn'>
            
            <span class='payBtn payBtn1' style='background:#13CE66;padding:0 4px' @click="goOn">充值完成</span>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
  </div>
</template>
<script>

  export default{
    data(){
        return {
        startisstop:false,
        startisshow:false,
        Allp:0,//总金额第一步显示
          //活动列表
        HdData:[],
        hdtotal:0,
        hdpagesize:0,
        numIndex:-1,
        itemhd:{},
        ///
        payType:'',
        discountPrice:10,
        alertch:false,
        totalCount:0,
        totalAmount:0,
        zfbmoney:0,//支付宝//微信
        crmmoney:0,//会员余额
        skmoney:0,////刷卡
        xjmoney:0,//现金
        othermoney:0,//其他
        DOCUmoney:0,//DOCU
        czkmoney:0,//储值卡
        xxmoney:0,//线下
        payPrice:0,
        active1:1,
        one:true,
        two:false,
        three:false,
        fkmcode:'',//收款码
        details:[],//订单明细
        payVos:[],//支付订单订单明细
        orderNumber:'',//订单号 
        type:1,//1聚合支付// 9现金支 ,//11;刷卡支付 ;//25其他支付 ;//5 BISHOP储值卡支付 //18线下付款 //15 DOCU
        time:null,
        detalistPay:[],//支付明细商品明细
        ///
        cz:false,
        crmid:"",
        crmn:"",
        czisshow:false,//会员列表充值
        item:{},//会员列表一行数据
        searchKeyword:"",
        valueT:1,
        orderListname:[
          {
                label:this.$t('public.all'),//
                value:0
            },
            {
                label:this.$t('public.normal'),//正常
                value:1
            },
            {
                label:"拉黑",//"已停用",
                value:9
            },
        ],
        total: 0,
        pageSize: 0,
        valId:'',
        uid: this.$store.state.common.token,
        cardData:[],
        mentList:[  
            //会员管理列表
            {
              title:this.$t('member.avt'),//"头像",
              key:'photo',
               width:80,
              render:(h, params) =>{
                  return h('div',[
                      h('img',{
                        attrs:{
                          src:params.row.photo
                        },
                        style:{
                          width:'40px',
                          height:'40px'
                        }
                      })
                    ])
                }
            },
             {
               title:this.$t('member.code'),//'编号',
             
               key:'code'
            },
            {
              title:this.$t('member.name'),//"姓名",
              
             align:"center",
              key:"name",
            },
           
            {
              title:this.$t('public.gender'),//"性别",
               align:"center",
              key:"gender",
              render:(h,params)=>{
                return h('div',{
                   
                  },params.row.gender=='1'?"男":params.row.gender=='0'?"女":"")
                }
            },
            {
              title:this.$t('member.mobile'),//'手机',
               
                align:"center",
              key:'mobile'
            },
             {
              title:this.$t('member.birsday'),//'生日',
             
               align:"center",
             
              key:'birthday',
              render:(h,params)=>{
                  return h("span",{
                  },params.row.birthday==null||params.row.birthday==''?'':this.getLocalTime(params.row.birthday))
              }
            },
            {
              title:this.$t('member.ye'),//'余额',
             
               align:"center",
            
              key:'chargeMoney'
            },
            {
              title:this.$t('member.jf'),//'积分',
              
               align:"center",
              key:'dqjf'
            },
            {
              title:"等级",//'积分',
              
               align:"center",
              key:'level'
            },
            {
               title:this.$t('member.time'),//'注册时间',
              
               key:'createTime',
                align:"center",
            },
            // {
            //   title:this.$t('member.address'),//'地址',
            //   key:'address'
            // },
            {
               title:this.$t('public.status'),//'状态',
               align:"center",
                width:120,
               key:'statusDesc',
               render:(h,params)=>{
                  return h('span',{
                      style:{
                          color:params.row.status==1?'#40ca98':'#d53c39'
                      }
                  },params.row.statusDesc)
              }
            }
          ],
        }
    },
    methods:{
      //充值
      addcz(){
        if(this.crmid==''){
          this.$notify({
              title:"",//
              message:'请选择会员！',
              type: 'error',
              position: 'bottom-right'
          });
        }else{
          this.active1=1
          this.alertch=true
          this.one=true
          this.two=false
          this.three=false
          this.numIndex=-1
        }
      },
      //收款的取消
      skCancel(){
        this.alertch=false
        this.payPrice=0
        this.zfbmoney=0
        this.crmmoney=0
        this.skmoney=0
        this.xjmoney=0
        this.xxmoney=0
        this.Allp=0
        this.othermoney=0
        this.numIndex=-1
      },
      //返回
      twocancel(){
        this.two=false
        this.one=true
        this.active1=1
        this.three=false
      },
      //点击收款第一步
      oneStepCZ(){
        var test=/^\d{1,14}(\.\d{1,2})?$///验证输入只能时数字且小数点后两位
        this.payPrice=Number(this.zfbmoney)+Number(this.xjmoney)+Number(this.skmoney)+Number(this.othermoney)+Number(this.xxmoney)

        if(this.zfbmoney==0  && this.xjmoney==0 && this.skmoney==0 && this.othermoney==0 && this.xxmoney==0 ){
          this.$notify({
                      title:"",//
                      message: '请输入金额！',
                      type: 'error',
                      position: 'bottom-right'
                  });
        }else if(!test.test(this.zfbmoney) || !test.test(this.xjmoney) || !test.test(this.skmoney) || !test.test(this.othermoney)  || !test.test(this.xxmoney)){
          this.$notify({
                      title:"",//
                      message: '金额出错！',
                      type: 'error',
                      position: 'bottom-right'
                  });
          
        }else if(this.numIndex!=-1&&this.payPrice!=this.itemhd.charge){
          this.$notify({
              title:"",//
              message:'充值金额与参与活动金额不符！',
              type: 'error',
              position: 'bottom-right'
            });
        }else{
          //总金额
          this.active1=2
          this.one=false
          this.two=true
          
        }
      },
      //第二步收款完成POST POST /recharge/add 新增充值
      twoStepCZ(){//1聚合支付// 9现金支 ,//11;刷卡支付 ;//25其他支付 ;//5 BISHOP储值卡支付 //18线下付款 //15 DOCU
        
          if(this.zfbmoney!=0){
            this.payType=1//1聚合支付
          }else if(this.xjmoney!=0){
            this.payType=9// 9现金支
          }else if(this.skmoney!=0){
            this.payType=11//11;刷卡支付
          }else if(this.othermoney!=0){
            this.payType=25//其他支付
          }else if(this.xxmoney!=0){
            this.payType=18//线下付款
          }
          if(this.payType==1&&this.fkmcode==''){
              this.$notify({
                    title:"",//
                    message: '请输入付款码！',
                    type: 'error',
                    position: 'bottom-right'
                  });
          }else{
              this.axios.post('/recharge/add?uid='+this.uid,{
                  crmId:this.item.id,
                  crmCode:this.item.code,
                  amount:this.payPrice,
                  actId:this.itemhd.id,
                  actName:this.itemhd.title,
                  authCode:this.fkmcode,
                  payType:this.payType
                }).then(res=>{
                  if(res.data.status==200){
                        if(this.payType!=1){
                          this.active1=3
                          this.two=false
                          this.three=true
                          this.fkmcode=''//付款码
                          this.payType=''
                          this.payPrice=0
                          this.Allp=0
                          this.itemhd={}
                          this.item={}
                          this.getMentList(this.valueT)//全部会员
                        }else{
                            this.orderNumber=res.data.rows.payNo
                          //订单轮询页面
                            this.time=setInterval((res)=>{
                              this.lunxun(this.orderNumber)
                            },2000)//2秒调一次轮询
                        }
                  }else{
                    this.$notify({
                        title:"",//
                        message:res.data.errorMessage,
                        type: 'error',
                        position: 'bottom-right'
                    });
                  }
            })
          }
      },
      //轮询结果GET /recharge/searchby/{ordreNo} 订单支付结果轮询
      lunxun(num){
        this.axios.get('/recharge/searchby/'+num+'?uid='+this.uid).then(res=>{
          if(res.data.status==200){
            this.$notify({
                title:"",//
                message: '充值成功',
                type: 'success',
                position: 'bottom-right'
            });
            clearInterval(this.time)
            this.getMentList(this.valueT)//全部会员
            this.active1=3
            this.two=false
            this.three=true
            this.fkmcode=''//付款码
            this.payType=''
            this.payPrice=0
            this.Allp=0
            this.itemhd={}
            this.item={}
            
          }
        })
      },
      //继续收银
      goOn(){
        this.active1=1
        this.three=false
        this.alertch=false
        this.payPrice=0
        this.zfbmoney=0
        this.crmmoney=0
        this.skmoney=0
        this.xjmoney=0
        this.xxmoney=0
        this.Allp=0
        this.othermoney=0
        this.crmid=''
        this.numIndex=-1
      },
      //支付宝或微信支付输入
      moneychangezfb(e){
        this.zfbmoney=Number(e.target.value)
        this.Allp=this.zfbmoney
      },
     
      //刷卡支付输入
      moneychangesk(e){
        this.skmoney=Number(e.target.value)
        this.Allp=this.skmoney
      },
      //现金支付输入
      moneychangexj(e){
        this.xjmoney=Number(e.target.value)
        this.Allp=this.xjmoney
      },
      //线下支付输入
      moneychangexx(e){
        this.xxmoney=Number(e.target.value)
        this.Allp=this.xxmoney
      },
      //其他支付输入
      othermoney1(e){
        this.othermoney=Number(e.target.value)
        this.Allp=this.othermoney
      },
      //支付宝获取焦点
        zfbfocus(){
          if(this.numIndex!=-1){
            this.Allp=this.zfbmoney=this.itemhd.charge
          }else{
            
            this.Allp=0
          }
          this.skmoney=0////刷卡
          this.xjmoney=0//现金
          this.othermoney=0//其他
          this.xxmoney=0//其他
        },

      // //刷卡
      skfocus(){
        this.zfbmoney=0//支付宝//微信
        this.xjmoney=0//现金
        this.othermoney=0//其他
        this.xxmoney=0//其他
        this.Allp=0
      },
      xjfocus(){
        this.zfbmoney=0//支付宝//微信
        
        this.skmoney=0////刷卡
        // this.xjmoney=0//现金
        this.othermoney=0//其他
        this.xxmoney=0//其他
        
        this.Allp=0
      },
      //线下
      xxfocus(){
        this.zfbmoney=0//支付宝//微信
        
        this.skmoney=0////刷卡
        this.xjmoney=0//现金
        this.othermoney=0//其他
       
        this.Allp=0
      },

      otherfocus(){
        this.zfbmoney=0//支付宝//微信
        
        this.skmoney=0////刷卡
        this.xjmoney=0//现金
        // this.othermoney=0//其他
        this.xxmoney=0//其他
        
        this.Allp=0
      },
      //搜索会员
      search(){
        this.axios.get('crm/query?keyword='+this.searchKeyword+'&uid='+this.uid).then((res)=>{
                if(res.data.status==200){
                  this.isLoading = false
                  this.cardData = res.data.rows
                  this.total=res.data.total
                  this.pageSize=res.data.pageSize
                  this.cardData.forEach((x)=>{
                    x.createTime=this.getLocalTime(x.createTime)
                    if(x.birthday==null || x.birthday==''){
                          x.birthday=''
                        }else{
                          x.birthday=this.getLocalTime(x.birthday)

                        }
                    
                  })
                }
            })
      },
      enterSearch(){
        this.search()
      },
      //点击新增
      add(){
        this.$router.push('addCrm')
      },
      //表格选中时的数据，数组
      selected(selection,row){
        console.log(row)
        this.valId = row.id
      },
      //双击表格一行
      dbl(row,index){
        this.isLoading = true
        this.$router.push({
          path:'/addCrm',
          query:{
            id:row.id,
            index:index,
            s:row.status
          }
        })
      },
      //点击某一行
      clickRow(row){
          this.valId = row.id
          this.crmid=row.id
          this.item=row
          if(row.status==1){
            this.startisshow=false
            this.startisstop=true
          }
          if(row.status==9){
            this.startisshow=true
            this.startisstop=false
          }
          console.log(row)
      },
       del(){
          if(this.valId==''){
                this.$notify({
                    title:"",//
                    message: this.$t('public.errorOneData'),
                    type: 'error',
                    position: 'bottom-right'
                  });
              }else{
                  this.$Modal.confirm({
                      title: '删除会员',
                      content: '<p>确定要删除吗?</p>',
                      onOk: () => {
                          this.axios.delete('crm/delete/'+this.valId+'?uid='+this.uid).then((res)=>{
                            if(res.data.status==200){
                              this.$notify({
                                title:"",//
                                message: this.$t('public.deleteSuccess'),//
                                type: 'success',
                                position: 'bottom-right'
                              });
                              this.getMentList(this.valueT)
                              this.valId=''
                            }else{
                              
                              this.$notify({
                                title:"",//
                                message: res.data.errorMessage,
                                type: 'error',
                                position: 'bottom-right'
                              });
                            }
                          })
                      },
                  });
              }
            },
             stop(){
              if(this.valId!=''){
                this.axios.post('crm/disabled/'+this.valId+'?uid='+this.uid).then((res)=>{
                if(res.data.status==200){
                  this.$notify({
                    title:"",//
                    message:this.$t('public.normalT'),//
                    type: 'success',
                    position: 'bottom-right'
                  });
                  this.getMentList(this.valueT)
                  this.valId=''
                }else{
                  
                  this.$notify({
                    title:"",//
                    message: res.data.errorMessage,
                    type: 'error',
                    position: 'bottom-right'
                  });
                }
              })
              }else{
                 this.$notify({
                    title:"",//
                    message: this.$t('public.errorOneData'),
                    type: 'error',
                    position: 'bottom-right'
                  });
              }
            },
             start(){
              if(this.valId!=''){
                this.axios.post('crm/enabled/'+this.valId+'?uid='+this.uid).then((res)=>{
                if(res.data.status==200){
                  this.$notify({
                    title:"",//
                    message:this.$t('public.normalS'),//
                    type: 'success',
                    position: 'bottom-right'
                  });
                  this.getMentList(this.valueT)
                  this.valId=''
                }else{
                  this.$notify({
                    title:"",//
                    message: res.data.errorMessage,
                    type: 'error',
                    position: 'bottom-right'
                  });
                }
              })
              }else{
                 this.$notify({
                    title:"",//
                    message: this.$t('public.errorOneData'),
                    type: 'error',
                    position: 'bottom-right'
                  });
              }
              
            },
     
      //获取所有会员
        getMentList(s){
            this.axios.get('crm/query?uid='+this.uid+'&status='+s).then((res)=>{
                if(res.data.status==200){
            
                  this.cardData = res.data.rows
                  this.total=res.data.total
                  this.pageSize=res.data.pageSize
                  this.cardData.forEach((x)=>{
                    x.createTime=this.getLocalTime(x.createTime)
                    if(x.birthday==null || x.birthday==''){
                      x.birthday=''
                    }else{
                      x.birthday=this.getLocalTime(x.birthday)

                    }
                    
                  })
                }
            })
        },
        //切换一条页
          getData(current){
              this.axios.get('crm/query?offset='+current+'&uid='+this.uid+'&status='+this.valueT).then((res)=>{
                  //console.log(res)
                  this.cardData = res.data.rows
                  this.total=res.data.total
                  this.pageSize=res.data.pageSize
                   this.cardData.forEach((x)=>{
                    x.createTime=this.getLocalTime(x.createTime)
                    if(x.birthday==null || x.birthday==''){
                      x.birthday=''
                    }else{
                      x.birthday=this.getLocalTime(x.birthday)

                    }
                    
                  })
              })
          },
          //翻页
          changePageSize(size){
              this.pageSize = size
              this.axios.get('crm/query?length='+size+'&uid='+this.uid+'&status='+this.valueT).then((res)=>{
                  //console.log(res)
                  this.cardData = res.data.rows
                  this.total=res.data.total
                  this.pageSize=res.data.pageSize
                  this.cardData.forEach((x)=>{
                    x.createTime=this.getLocalTime(x.createTime)
                    if(x.birthday==null || x.birthday==''){
                      x.birthday=''
                    }else{
                      x.birthday=this.getLocalTime(x.birthday)

                    }
                    
                  })
              })
          },
          //下拉
          searCrmOption(v){
            this.valueT=v
            this.getMentList(this.valueT)
          
          },
             //获取充值活动
        getHd(){
          this.axios.get('rechargea/query?uid='+this.uid).then(res=>{
            if(res.data.status==200){
              this.HdData=res.data.rows
              this.hdtotal=res.data.total
              this.hdpagesize=res.data.pageSize
            }
          })
        },
        //单击活动
        clickLi(item,index){
          this.numIndex=index
          this.itemhd=item
          this.Allp=this.zfbmoney=item.charge//选择活动默认支付宝微信
           this.skmoney=0////刷卡
          this.xjmoney=0//现金
          this.othermoney=0//其他
          this.xxmoney=0//其他
        },
        //取消选中
        clickcancel(){
          this.numIndex=-1
          this.itemhd={}
        },
        hdgetData(current){
          this.axios.get('rechargea/query?offset='+current+'&uid='+this.uid).then(res=>{
            if(res.data.status==200){
              this.HdData=res.data.rows
              this.hdtotal=res.data.total
              this.hdpagesize=res.data.pageSize
            }
          })
        },
        hdchangePageSize(size){
          this.hdpagesize=size
        },
    },
    created(){
        this.$nextTick(()=>{
         
          this.getHd()
        })
    },
    mounted(){
      // console.log(this.prefixSales)
       this.getMentList(this.valueT)//全部会员
    },
  }
</script>
<style type="text/css" scoped>
.page-box44{
  width: 100%;
    margin: 10px 0;
    text-align: center;
}
.wldw1{
      margin-left:10px;
      display: flex;
  }
  .paydialog{
  width:100%;
  border-bottom:1px solid #E4E4E4;
  padding:30px 0;
  text-align: center;
  margin: 20px auto 0 auto;
}
.step{
  margin-left:25%;
}
.dialog-bottom{
  display:flex;
  justify-content:space-between;
  
}
.left-info li{
   display: flex;
   margin:10px 0;
  }
.left-info div{
  width:200px;
  margin:5px 0;
  /*text-align: right*/
}
.dialog-left{
  width:40%;
  display:flex;
  justify-content: flex-start;
 
  flex-direction: column;
  /*text-align: right;*/
  /*padding-bottom:30px;*/
}
/*.dialog-left li{
  margin:10px;
  font-size:16px;
  display: flex;
}*/
.left-info li .span{
  width:90px;
  text-align: right
}
.dialog-right{
  width:60%;
  display:flex;
  flex-wrap: wrap;
  border-left:1px solid #E4E4E4;
  /*padding-bottom:30px;*/
}
.dialog-right li{
  /*height:80px;*/
  width:50%;
  padding:5px 0;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-bottom:1px solid #E4E4E4;
  border-right:1px solid #E4E4E4;
  text-align: center
}
.dialog-left1{
  width:40%;
 font-size: 16px;
}
.dialog-left1 li{
  display: flex;
  justify-content: center;
}
.dialog-right li:nth-child(2n){
  border-right:none;
}
.dialog-btn{
  display:flex;
  width:100%;
  padding:20px 0;
  justify-content: center;
  align-items: center
}
.dialog-btn1{
  width:100%;
  line-height: 60px;
    height: 60px;
}
.dialog-btn1 span{
  display: inline-block;
}
.dialog-btn1 div{
display: inline-block;
 
   width: 200px;
   float: right;
   margin-right:-30px;
}
.payWay-dialog img{
  vertical-align: middle;
  margin-right:20px;
}
.payBtn{
  display:inline-block;
  width:80px;
  height:36px;
  line-height: 36px;
  margin-top:35px;
  text-align: center;
  font-size:18px;
  background-color: #13CE66;
  color:#fff;
  border-radius:4px;
}
.payBtn:hover{
  cursor:pointer;
}
.payBtn1{
  width:140px;
}
li{
  list-style: none;
}
.right-list{
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    border: 1px solid #e4e4e4;
    border-radius: 6px;
    margin:10px;
    background-color: #fff
  }
  .right-list span{
    margin-top:5px;
  }
   .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        /*border: 1px solid #eee;*/
    }
  .cztitle{
    width:100%;
    text-align: center;
    height:40px;
    line-height: 40px;
    font-size:16px;
    
    border-bottom:1px solid #e4e4e4;
    background-color: #fff
  }
  .bg{
    background:#dbe5f1
  }
  .czmian{
    height:355px;overflow:auto;width:100%;background:#f5f5f5;
    border-top:1px solid #e4e4e4;
  }
  .czmian::-webkit-scrollbar{
  width: 2px;
  height: 4px;
  background-color: #f5f5f5;
}
.czmian::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
.czmian::-webkit-scrollbar-thumb{
  
  height: 2px;
  border-radius: 18px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #ccc;
}
</style>
<style lang="scss" scoped>
  #management{
    .management_head{
      width:100%;
      height: 50px;
      line-height:50px;
     display:flex;
    justify-content: space-between;
      .wldw {
        width: 170px;
       margin-left:10px;
        font-size: 14px;
        color: #585858;
       
      }
      
    }
  }
  .btns-box {
    margin-right:10px
  }
.table {
    margin:0 10px
 
  }

  .page-box {
    text-align: center;
    margin-top:5px;
     margin-bottom:120px;
  }
</style>
