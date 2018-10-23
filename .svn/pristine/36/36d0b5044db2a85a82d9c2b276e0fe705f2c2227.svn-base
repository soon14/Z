<template>
  <div class='jxc'>
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
      data:[
        {
          title:this.$t('public.overview'),//"概览",
          url:"/orderHome",
          icon:"http://img.zsydian.com/icon/gl.png",
          icon1:'http://img.zsydian.com/icon/gl1.png',
        },
        {
          title:this.$t('sideBar.order.onlineOrder'),//"线上订单",
          url:"/order",
          icon:"http://img.zsydian.com/icon/wl.png",
            icon1:"http://img.zsydian.com/icon/wl1.png",
            
        },
        {
          title:this.$t('sideBar.order.underlineOrder'),//"线下订单",
          url:"/networdOrder",
          icon:"http://img.zsydian.com/icon/xx.png",
            icon1:"http://img.zsydian.com/icon/xx1.png",  
        },
        
        {
          title:"跨店订单",
          url:"/kdOrder",
            icon:"http://img.zsydian.com/icon/kd.png",
            icon1:"http://img.zsydian.com/icon/kd1.png",
        },
        {
          title:this.$t('sideBar.order.returnOrder'),//"退货订单",
          url:"returnorder",
          icon:"http://img.zsydian.com/icon/fx.png",
          icon1:"http://img.zsydian.com/icon/fx1.png",
        },
        {
          title:'订单配置',//"订单配置",
          url:"/logtSetting",
          icon:"http://img.zsydian.com/icon/kd.png",
          icon1:"http://img.zsydian.com/icon/kd1.png",
        },
      ],
      titleName:this.$t('sideBar.order.title'),//'订单'
    }
  }
}
</script>
<style type="text/css">
</style>