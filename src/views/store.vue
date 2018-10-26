<template>
  <div class=''>
    <v-user :data='data' :titleName='titleName' 
    :isshow='isshow' :changeS='changeStore' 
    :storeName="storename" :storeisshow="storeisshow"></v-user><!--:changestore='changestore'-->
    <!--data:数据 titleName:头部名称 isshow:切换店铺按钮是否显示==>>只有门店有 changeS:点击切换按钮-->
    <!--店铺弹框-->
    <el-dialog :visible.sync="alertch" :append-to-body='false' :close-on-click-modal='false' :close-on-press-escape='false'>
      <div class='model-main'>
        <div class='right'>
          <div class="right-bottom">
              <div class='storeTitle'>店铺选择</div>
                <ul class='right-bottom-main' v-if='allShop.length!=0'>
                    <li v-for='(item,index) in allShop'  style="width:150px" :key='item.id' class="item" 
                    :class="{bg:indexId==item.id}" @click="selectedStoreBg(item,index)">
                      <img :src="item.logo" width='60' height='60' style='border-radius:50%'>
                      <span class="x-name" >{{item.name}}</span>
                    </li>
                </ul>
                <div class='storeTitle' v-else>您暂无权限使用  请联系公司管理员 </div>
                <!-- <a @click="clickBack"  style="position: absolute;top: 20px;left: 10px;cursor:pointer;font-size: 16px;" v-if='allShop.length==0'> 返回</a> -->
                <span v-if='isclose' @click='closeStoreModel' class='close'><Icon type="close-round"></Icon></span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import * as types from '../store/types'
import user from '../components/common/publicUser'
export default{
  components:{
    'v-user':user
  },
  data(){
    return{
      searchWord:'',
      img:'',
      indexId:-1,
      alertch:false,//店铺弹框
      allShop:[],
      uid: this.$store.state.common.token,
      user:this.$store.state.common.user,
      updatastore:this.$store.state.common.updataStore,

      data:[
        {
          title:this.$t('public.overview'),//"概览"
          url:"/storeHome",
          icon:"http://img.zsydian.com/icon/gl.png",
          icon1:"http://img.zsydian.com/icon/gl1.png",

        },
        {
          title:this.$t('sideBar.store.cashier'),//"收银",
          url:"/storecashier",
          icon:"http://img.zsydian.com/icon/sy.png",
          icon1:"http://img.zsydian.com/icon/sy1.png",
        },
        {
          title:this.$t('sideBar.store.member'),//"会员",
          url:"/storeCrm",
          icon:"http://img.zsydian.com/icon/crm.png",
          icon1:"http://img.zsydian.com/icon/crm1.png",
        },
        {
          title:this.$t('sideBar.store.order'),//"订单",
          url:"/storeorder",
          icon:"http://img.zsydian.com/icon/xx.png",
          icon1:"http://img.zsydian.com/icon/xx1.png",
        },
        
        
        {
          title:"商品",//"商品",
          url:"/storejxc",
          icon:"http://img.zsydian.com/icon/kc.png",
          icon1:"http://img.zsydian.com/icon/kc1.png",
        },
        {
          title:this.$t('sideBar.store.operate'),//"运营",
          url:"/storeoperation",
          icon:"http://img.zsydian.com/icon/kc.png",
          icon1:"http://img.zsydian.com/icon/kc1.png",
        },
        {
          title:"交易",//"交易",
          url:"/storefinancial",
          icon:"http://img.zsydian.com/icon/ys.png",
          icon1:"http://img.zsydian.com/icon/sy1.png",
        },
        {
          title:this.$t('sideBar.store.mye'),//"美业",
          url:"/storesever",
          icon:"http://img.zsydian.com/icon/kc.png",
          icon1:"http://img.zsydian.com/icon/kc1.png",
        },
        {
          title:this.$t('sideBar.store.data'),//"统计",
          url:"/storedata",
          icon:"http://img.zsydian.com/icon/kc.png",
          icon1:"http://img.zsydian.com/icon/kc1.png",
        },
        {
          title:this.$t('sideBar.store.manage'),//"管理",
          url:"/storemanage",
          icon:"http://img.zsydian.com/icon/kc.png",
          icon1:"http://img.zsydian.com/icon/kc1.png",
        },
        
        
      ],
      titleName:"门店",//'',
      storename:"",//店铺名称
      isshow:true,//门店显示切换店铺
      storeisshow:false,//是否有默认店铺
      isclose:false,//选择店铺弹框差号
    }
  },
  methods:{
     //获取当前店铺
    getAllstore(){
        if(this.user.userSelf01>0){
            this.axios.get('setting/nows?uid='+this.uid).then((res)=>{
              if(res.data.status==200){
                  this.indexId=res.data.rows.id
                  this.storename=res.data.rows.name//默认店铺名称
                  this.isclose=true//差号显示
                  //多家店铺 获取店铺列表setting/role
                  this.axios.get('setting/role?uid='+this.uid).then(res=>{
                    if(res.data.status==200){
                      let len = res.data.rows.length
                      if(len>1){
                        this.storeisshow=true//有多家店铺
                      }else{
                         this.storeisshow=false//只有一家
                      }
                    }
                })
            }
          })
        }else{
           this.ModelStore()//没有默认店铺的弹框
        }
    },
    //点击店铺弹框
      ModelStore(){
          this.alertch = true
          this.axios.get('setting/role?uid='+this.uid).then((res)=>{
            if(res.data.status==200){
              this.allShop = res.data.rows
            }
        })
      },
    //点击选择店铺加背景
    selectedStoreBg(item,index){

      this.indexId = item.id
      this.storename=item.name
      //选择改变当前店铺
      this.axios.get('setting/change/'+item.id+'?uid='+this.uid).then(res=>{
        if(res.data.status==200){
          //获取选中后的当前店铺
          this.axios.get('setting/nows?uid='+this.uid).then(res=>{
            if(res.data.status==200){
              let data=res.data.rows
              this.alertch = false
              this.storename = data.name
              this.isclose=true//差号显示
            }
            
          })
        }
      })
    },
    //关闭弹框
    closeStoreModel(){
      this.alertch = false
    },
     //点击切换店铺弹
    changeStore(){
      this.ModelStore()
    },
    clickBack(){
      console.log(this.$route)
      sessionStorage.setItem('isselect',this.$route.name)
      sessionStorage.setItem('numberIndex',sessionStorage.getItem('numberIndex'))
      this.$router.go(-1)
    },
  },
  created(){
      this.$nextTick(x=>{
        this.getAllstore()
      })
    },
  mounted(){
    console.log(this.user)
  }  

}
</script>

<style type="text/css" scoped>
.storeTitle{
    width: 100%;
    text-align: center;
    padding: 20px 0;
    font-size: 16px;
}

.model-main{
  display:flex;
  border-radius:8px;
}
.model-main .left{
  width:40%;
  height:408px;
  background: #495060;
  display:flex;
  flex-direction: column;
  justify-content: center;;
  align-items: center;
  color:#fff;
}
.model-main .right{
  flex: 2 0 60%;
  background: #e2e2e2;

}
.right-top-search{
  position:relative;
  width:100%;
  height:60px;
  background: #fff;
  line-height: 60px;
  
}
.right-top-search input{
  width:80%;
}

.right-bottom-main{
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  height:350px;
  overflow:auto;
}
.item{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  background: #fff;
  margin:10px;
  border-radius:6px;
}
.item img{
  margin-top:10px;
}

.item .x-name{
  width:100%;
  padding:5px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  /*color:#fff;*/
}
.alertcha:hover{
  cursor:pointer;
}
.alertcha{
   position: absolute;
    right: 10px;
    top: 0px;

}
.close{
      position: absolute;
    top: 0;
    right: 20px;
    top: 20px;
    cursor: pointer;
}
.bg{
  background: #3A404D;
 
  color:#fff;
}
.addstore{
  cursor:pointer;
  color: #2764BB;
}
</style>