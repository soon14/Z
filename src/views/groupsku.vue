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
          name:"商品组",
          url:"/groupsku",

        },
        {
          name:"商品",
          url:"/skulist",
        },
        {
          name:"商品调拨",
          url:"/skuinvestigate",

        },
        {
          name:"商品调整",
          url:"/skuadjust",

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