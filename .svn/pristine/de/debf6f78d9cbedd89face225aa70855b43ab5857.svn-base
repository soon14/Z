<template>
  <div id="addRecharge">

    <!--左边内容-->
    <Col span='6'>
      <div class="left-top">

        <span>全部采购订单</span>
        <div>
          <Button style="background:#00A8FF;margin-right:10px;color:#fff;border:none" @click="">新建</Button>
          <Button style="background:#FF8B00;color:#fff;border:none">
            <Icon type="navicon-round"></Icon></Button>
        </div>

      </div>
      <div class="left-content">
        <Scroll :on-reach-bottom="handleReachEdge" :height='480'>
          <div class="con-list" v-for="(item,index) in rechargeList" @click="getcginfo(item.id,index)" :class="{bg:numIndex==index}">
            <p class="list-title">金额：{{item.amount}}</p>
            <p class="txt" style="margin-top:10px;">赠送金额：{{item.giftAmount}}</p>
            <p class="txt">流水号：{{item.payNo}}</p>
            <span class="date">时间：{{item.createTime}}</span>
          </div>
        </Scroll>
      </div>
    </Col>
    <Col span='18'>
        <div class="right-top">

          <div>
            <span style="margin-left:10px">ddd</span>

          </div>
          <div style="margin-right:10px">
            <div v-if="">
              <Button style="background:#00A8FF;margin-right:5px;color:#fff;border:none" @click="" v-if="addText">保存</Button>
              <button @click=""  style="background:#D8D5DE;margin-right:20px;" v-if="!addText">修改</button>
              <Button @click=""  style="background:#D8D5DE;margin-right:20px;" >取消</Button>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <div>
          <span>会员id</span>
          <Input v-model="value" placeholder="id" style="width: 200px"></Input>
          </div>
          <div>
            <span>充值金额</span>
            <Input v-model="value" placeholder="充值金额" style="width: 200px"></Input>
          </div>
          <div>
            <span>赠送金额</span>
            <Input v-model="value" placeholder="赠送金额" style="width: 200px"></Input>
          </div>
          <div>
            <span>导购编号</span>
            <Input v-model="value" placeholder="导购编号" style="width: 200px"></Input>
          </div>
          <div>
            <span>导购名称 </span>
            <Input v-model="value" placeholder="导购名称" style="width: 200px"></Input>
          </div>
          <div>
            <span>备注</span>
            <Input v-model="value" placeholder="备注" style="width: 200px"></Input>
          </div>
    </div>
  </Col>




  

</div>
</template>
<script>
export default{
  data(){
    return {
      value:'',
      addText:true,
      numIndex:0,
      uid: this.$store.state.common.token,
      rechargeList:[]
    }
  },
  methods:{
      //单击查看
      getcginfo(){

      },
      handleReachEdge(){
 
      },
      //获取所有充值订单
      getAllList(){
        this.axios.get('recharge/query?uid='+this.uid).then((res)=>{
          
          if(res.data.status==200){
            console.log(res.data.rows)
            this.rechargeList = res.data.rows
          }else{
           
          }
        })
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.getAllList()
      })
    }
  }
  </script>
  <style scoped>
  .bg{
    background:#ececec;
  }
  .right-top{
    display:flex;
    justify-content: space-between;
    border-bottom:1px solid #eee;
  }
  .left-top{
    display:flex;
    justify-content: space-between;
    border-bottom:1px solid #eee
  }
  .con-list {
    width: 100%;
    word-wrap:break-word;
    
    border-bottom: solid 1px #ececec;
    padding: 15px 20px;
    
    cursor: pointer;
    position:relative;
  }
  .con-list:hover{
    cursor:pointer;
  }
  .con-list .date{
    position:absolute;
    right:10px;
    top:10px;
  }
  .con-list .list-title {
    color: #0d0d0d;
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .con-list button {
    width: auto;
    height: 25px;
    padding-left: 14px;
    padding-right: 14px;
    margin-right: 10px;
    color: #607d8b;
    font-size: 12px;
    border: 0;
    background: #ececec;
  }
  
  .con-list .txt {
    color: #585858;
    font-size: 12px;
  }
  
  .page-box {

  }
  .left-content {
    height:100%;
    width:100%;

    padding-top:10px;
    
    margin-bottom:100px;
    
    border-right:1px solid #eee;
    
  }
  </style>
