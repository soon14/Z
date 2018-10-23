<template>
  <div class="recharge">
    <!--中间-->
    <div class='center'>
        <div class='center-left'>
          <div class='left-title'>
          
            <span style='margin-left:20px'> 会员充值</span>
        </div>
          <div class='search'>
             <Input v-model="keyword" style='width:80%;' @on-enter='enterSear' placeholder='输入姓名/手机号/会员编码'>
                
                <Button slot="append" @click='searchCrm' >搜索</Button>
            </Input>
            <span class='suredw' style='margin-left:15px'><Icon type="ios-navigate" style='position:relative;top:3px;left:-8px' size='20'></Icon>精准定位</span>
          </div>
          <div  class='center-c'>
            <div style='display:inline-block;margin: 0 20px;border-radius:50%;overflow:hidden;vertical-align: middle;'>

              <img :src="AllsearchCrm.photo" width='80' height='80' style='vertical-align:middle'>
            </div>
            <div style='display:inline-block;vertical-align:middle;margin-left:20px'>
              <div  style='display:inline-block'>
                <div class="list-box list-box1">
                  <span>姓名 : </span><div>{{AllsearchCrm.name}}</div>
                  
                  
                </div>
                <div class="list-box list-box1">
                  <span>性别 : </span><div>{{AllsearchCrm.gender}}</div>
                  
                </div>
                
               
                <div class="list-box list-box1">
                  <span>账户余额 : </span>
                  <div style='color:#FF934D'>{{AllsearchCrm.chargeMoney}}</div><span>元</span>
                </div>
              
              </div>
              <div style='display:inline-block;margin-left:20px'>
                <div class="list-box list-box1">
                <span>会员id : </span><div>{{AllsearchCrm.id}}</div>
                
                </div>
                
                <div class="list-box list-box1">
                  <span>生日: </span><div>{{AllsearchCrm.birthday?new Date(AllsearchCrm.birthday).toLocaleDateString().replace(/\//g,'-'):''}}</div>
                  
                </div>
                <div class="list-box list-box1" >
                  <span>会员积分:</span> <div style='color:#FF934D'>{{AllsearchCrm.dqjf}}</div>
                  
                </div>
             
              </div>
              <div style='display:inline-block;margin-left:20px;vertical-align:top'>
                <div class="list-box list-box1" >
                  <span>会员类型 : </span><div>{{AllsearchCrm.level}}</div>
                  
                </div>
                <div class="list-box list-box1">
                  <span> 手机 : </span><div>{{AllsearchCrm.mobile}}</div>
                  
                </div>
             
              </div>
            </div>
          </div>  
          <!--支付//1聚合支付// 9现金支 ,//11;刷卡支付 ;//25其他支付 ;//5 BISHOP储值卡支付 //18线下付款 //15 DOCU-->  

          <div style='margin-right:10px;margin-top:20px;margin-left:20px'>
            <span style='font-weight:600'>请选择充值方式：</span>
              <RadioGroup v-model='one' @on-change='seleOne'>
                <Radio label="1" >支付宝支付 + 微信支付</Radio>
                <Radio label="11" >刷卡支付</Radio>
                <Radio label="9" >现金支付</Radio>
                <Radio label="18" >线下付款</Radio>
                <Radio label="5" >储值卡支付</Radio>
                <Radio label="15" >DOCU</Radio>
                <Radio label="25" >其他支付</Radio>
              </RadioGroup>
            
              <div style="margin-left:260px;font-weight:600;margin-top:40px"><span>请输入充值金额 :</span>
                <input v-model='amount' class='je'>
              </div>
              <div style="margin-left: 370px;;margin-top:20px"><span class='surecz'  @click="surecz">确认充值</span></div>
             
            
          </div> 
        </div>
        <div class='right' >
            <div class='right-top'>
              <span class='right-top-t'>充值活动</span>
              <span class='right-top-cancel' @click='clickcancel'>取消</span>
            </div>
            <!--HdData-->
            <div v-if='HdData.lenght==0'>暂无活动</div>
            <div style='position:absolute;width:100%;overflow:auto;height:100%;' v-else>
              <div class='right-list' v-for='(item,index) in HdData' :class="{bg:numIndex==index}" @click='clickLi(item,index)' :key='index'>
                    <div style='margin-bottom:5px'>活动名称：<span style='font-size:14px;font-weight:600;color:#4C6DDE'>{{item.title}}</span></div>
                    <div>
                      <span>充值金额：<span style='color:#d53c39'>{{item.charge}}</span></span>
                      <span>赠送金额：<span style='color:#d53c39'>{{item.giftCharge}}</span></span>
                    </div>
                    <span>开始时间：{{item.begin_time}}</span>
                    <span style='margin-bottom:5px'>结束时间：{{item.end_time}}</span>
                  <div class="page-box" v-if='hdtotal>10'>
                   <Page :total="hdtotal" show-total  :pageSize='hdpagesize'  @on-change="hdgetData" @on-page-size-change="hdchangePageSize">
                   </Page>
                  </div>
              </div>
            </div>
        </div>
    </div>

    <!--充值 :mask-closable='false' :closable='false'-->
  <Modal v-model="czisshow" width="360px" >
    <p slot="header" style="height:30px;line-height:30px;text-align:center">
      
      <span>温馨提示</span>
    </p>
      <div style='text-align:center'>
          <P style='padding:5px 0;font-size:14px'>订单已提交</P>
          <P style='padding:5px 0;font-size:14px'>请确认收款</P>
      </div>
    <!--充值-->
    <div slot="footer">
      
      <div style='display:flex;justify-content: space-around;width:100%;;height:40px;padding:10px 0;border-top:1px solid #EBEBEB'>
        <div class='footerBtn'>
         <span style='color:#419798;font-size:14px'>扫码收款</span>
         <span style='width:60px;display:inline-block;text-align:center;color:#EBEBEB;font-size:18px'>|</span>
         <span style='color:#5B8CE7;font-size:14px' @click='makegoods'>确认收款</span>
        </div>
      </div>
    </div>
  </Modal>
<!--充值确认:closable='false' :mask-closable='false' -->
  <Modal v-model="czisshow2" width="220px" >
    <p slot="header" style="height:30px;line-height:30px;text-align:center">
      
      <span>温馨提示</span>
    </p>
      <div style='text-align:center'>
        <Icon type="ios-checkmark-outline" size='45' style='color:#278A8B'></Icon>
          <P style='padding:5px 0;font-size:14px;color:#278A8B;font-weight:600'>订单支付成功</P>
          
      </div>
    <!--充值-->
    <div slot="footer">
      
      <div style='text-align:center;width:100%;;height:40px;padding:10px 0;border-top:1px solid #EBEBEB'>
        <div class='footerBtn'>
         <span style='color:#5B8CE7;font-size:14px;font-weight:600' @click='dzsure'>确认</span>
        </div>
      </div>
    </div>
  </Modal>
  </div>
</template>
<script type="text/javascript">

  export default{
    data(){
      return{
       //1聚合支付，3非聚合支付 // 9现金支 ,//11;刷卡支付 ;//99其他支付
        one:"1",
        amount:"",
        czisshow:false,
        czisshow2:false,
        uid: this.$store.state.common.token,
        keyword:'',
        crmisshow:false,
        AllsearchCrm:{},
        HdData:[],
        hdtotal:0,
        hdpagesize:0,
        numIndex:-1,
        item:{}
      }
    },
    methods:{
      //搜索会员
      searchCrm(){
        this.axios.get('crm/query?keyword='+this.keyword+'&uid='+this.uid).then(res=>{
          if(res.data.status==200){
            if(res.data.rows.length==0){
              this.$notify({
                  title:"",//
                  message:'查无此会员！',
                  type: 'error',
                  position: 'bottom-right'
                });
            }else{
              this.AllsearchCrm=res.data.rows[0]
              this.crmisshow=true
              if(this.AllsearchCrm.gender=='1'){
                this.AllsearchCrm.gender='男'
              }else{
                 this.AllsearchCrm.gender='女'
              }
            }
            
          }
        })
      },
      //回车搜索
      enterSear(){
         this.searchCrm()
      },
      //点击充值弹框
      surecz(){
      let arr = Object.keys(this.AllsearchCrm)
        if(this.amount==''){
            this.$notify({
                  title:"",//
                  message:'金额不能为空！',
                  type: 'error',
                  position: 'bottom-right'
                });
        }else if(arr.length==0){
           this.$notify({
                  title:"",//
                  message:'请选择会员！',
                  type: 'error',
                  position: 'bottom-right'
                });
        } else if(this.numIndex!=-1&&this.amount!=this.item.charge){
            this.$notify({
                  title:"",//
                  message:'充值金额与参与活动金额不符！',
                  type: 'error',
                  position: 'bottom-right'
                });
        }else{
          this.czisshow=true
        }
      },
      seleOne(d){
       this.one=d
      },
      //确认收款POST /recharge/add 新增充值
      makegoods(){
          this.axios.post('/recharge/add?uid='+this.uid,{
            amount:Number(this.amount),
            crmId:this.AllsearchCrm.id,
            crmCode:this.AllsearchCrm.code,
            payType:this.one,
            actId:this.item.id,
            actName:this.item.title,
          }).then(res=>{
            if(res.data.status==200){
                this.$notify({
                  title: '充值',
                  message:'充值成功',
                  type: 'success',
                  position: 'bottom-right'
                });
                this.searchCrm()
                this.amount=''
                this.czisshow=false
                this.czisshow2=true
                this.one="1"
                this.numIndex=-1
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
      //订单确认
      dzsure(){
         this.czisshow2=false
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
        this.item=item
        console.log(item)
      },
      //取消选中
      clickcancel(){
        this.numIndex=-1
        this.item={}
      },
    },
    mounted(){
      this.getHd()//活动
    },
  }
</script>

<style type="text/css" scoped>
.recharge{
  width:100%;
  overflow: hidden;
  height:100%;
  background: rgb(230,233,236);
}
.left-title{
  font-weight:900;
 
  height:50px;width:100%;
  line-height: 50px;
  border-bottom: 1px solid #e4e4e4;
}

  .center{
    height:100%;
    display:flex;
    

  }
  .left{
    width:70%;
    height:100%;
    border-right:1px solid #e4e4e4;
    
    padding:0 10px;
  }
  .center-left{
    width:70%;
   background-color: #fff;
   margin-right:7px;
  border-right:1px solid #e4e4e4;
  }
   .right{
    width:30%;
    height:100%;
   position:relative;
   background-color: #fff;
  }
  .bg{
    background:#dbe5f1
  }
  .right-top{
    display: flex;
    justify-content: space-between;
    height:50px;width:100%;
  line-height: 50px;
  border-bottom: 1px solid #e4e4e4;
  }
  .right-top-t{
    margin-left:20px;
  }
  .right-top-cancel{
    margin-right:20px;
    cursor: pointer;
    color:#4C6DDE;
  }
  .right-top-cancel:hover{
    color:#4C6DDE;
  }
  .center-left .center-c{
    
    border-bottom:1px solid #ccc;
  }
  .center-left .search{
    height:40px;
    line-height: 40px;
    display:flex;
    margin-left: 20px;
    margin-top: 20px;
  }
  .right-list{
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    border-bottom: 1px solid #e4e4e4;
  }
  .right-list span{
    margin-top:5px;
  }
  .right-list:last-child{
    margin-bottom:140px;
  }
  .suredw{
    display:block;
    width:110px;
    height:32px;
    line-height: 32px;
    text-align: center;
    border-radius:18px;
   color:#fff;
    background: #3B77E3
  }
  .page-box{
    text-align: center;
  }
  .list-box{
  display: flex;
  height:35px;
  line-height: 35px;
  margin:25px 10px;
}
.list-box1{
    margin:10px 10px;
}
.list-box span{
  height:40px;
  width:120px;
  text-align: center;
  padding:0 10px;
  font-weight:600;
}
.list-box input.ivu-input{
  height:40px!important;
}
.list-box1{
  margin-left:20px;
}
.list-box1 span{
  width:auto;
  text-align: left
}
.center-c{
  margin-top:20px;
}
.je{
  outline: none;
  border-top:none;
  border-left:none;
  border-right:none;
  border-bottom:1px solid #ccc;
  height:20px;
  margin-left:10px;
}
.surecz{
  display:inline-block;
  width:120px;
  height:32px;
  line-height: 32px;
  text-align: center;
  border-radius:18px;
  border:1px solid #4F83E5;
  color:#4F83E5;
}
.surecz:hover{
    cursor:pointer;
}
.footerBtn span:hover{
  cursor:pointer;
}

</style>
<style type="text/css">

</style>