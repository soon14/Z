<template>
  <div>
    <v-user :data='data' :titleName='titleName'></v-user>
  </div>
</template>
<script type="text/javascript">
import user from '../components/common/publicUser'

export default{
  components:{
    'v-user':user
  },
  data(){
    return{
      user:this.$store.state.common.user,
      //模拟服务端数据
      data:[
          {
            title:this.$t('public.overview'),//"概览",
            url:"/sku",
            icon:"http://img.zsydian.com/icon/gl.png",
            icon1:"http://img.zsydian.com/icon/gl1.png",
          },
          {
            title:this.$t('sideBar.inventory.title'),//"库存",
            url:"/skuinventory",
            // url:"/sku",
            icon:"http://img.zsydian.com/icon/kc.png",
            icon1:"http://img.zsydian.com/icon/kc1.png",
          },
          // {
          //   title:this.$t('sideBar.inventory.openingInventory'),//"期初库存",
          //   url:"/initinventory",
          //   icon:"http://img.zsydian.com/icon/initkc.png",
          //   icon1:"http://img.zsydian.com/icon/initkc1.png",
          // },
          
      
          // {
          //   title:this.$t('sideBar.inventory.skuModify'),//"商品调价",
          //   icon:"http://img.zsydian.com/icon/tj.png",
          //   icon1:"http://img.zsydian.com/icon/tj1.png",
          //   url:""
          // },
          {
            title:this.$t('sideBar.inventory.skuAllocation'),//"商品调拨",
            icon:"http://img.zsydian.com/icon/tj.png",
            icon1:"http://img.zsydian.com/icon/tj1.png",
            url:"/investigate"
          },
          // {
          //   title:this.$t('sideBar.inventory.inventoryAdjustment'),//"库存调整",
          //   icon:"http://img.zsydian.com/icon/kctz.png",
          //   icon1:"http://img.zsydian.com/icon/kctz1.png",
          //   url:"/adjust"
          // },
          // {
          //   title:this.$t('sideBar.inventory.inventoryFrozen'),//"库存冻结",
          //   icon:"http://img.zsydian.com/icon/kctz.png",
          //   icon1:"http://img.zsydian.com/icon/kctz1.png",
          //   url:""
          // },
          {
            title:this.$t('sideBar.inventory.inventoryS'),//"库存盘点",
            icon:"http://img.zsydian.com/icon/pd.png",
            icon1:"http://img.zsydian.com/icon/pd1.png",
            url:"/pdhome"
          },
          {
            title:"渠道库存",//"渠道库存",
            icon:"http://img.zsydian.com/icon/pd.png",
            icon1:"http://img.zsydian.com/icon/pd1.png",
            url:"/channelInventory"
          },
          {
            title:"入库明细",
            icon:"http://img.zsydian.com/icon/pd.png",
            icon1:"http://img.zsydian.com/icon/pd1.png",
            url:"/Ininventoryhome"
          },
          {
            title:"出库明细",
            icon:"http://img.zsydian.com/icon/pd.png",
            icon1:"http://img.zsydian.com/icon/pd1.png",
            url:"/OutInventoryhome"
          },
          {
            title:"设置",
            icon:"http://img.zsydian.com/icon/pd.png",
            icon1:"http://img.zsydian.com/icon/pd1.png",
            url:"/InventorySetting"
          },

      ],
      titleName:this.$t('sideBar.inventory.title'),//'库存'
    }
  },
  created(){
    this.$nextTick(()=>{
       
    })
  },
  mounted(){

  }
}
</script>
<style type="text/css">

</style>