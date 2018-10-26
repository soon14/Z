<template>
  <div class='jy'>
    <v-user :data="data" :titleName="titleName"></v-user>
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
          name:"概览",
          url:"/operationHome",
          icon:"http://img.zsydian.com/icon/gys.png",
          icon1:"http://img.zsydian.com/icon/gys1.png",
        },
        {
          name:"投诉与建议",
          url:"/complain",
          icon:"http://img.zsydian.com/icon/gys.png",
          icon1:"http://img.zsydian.com/icon/gys1.png",
        },
      ],
      titleName:this.$t('sideBar.operation.title'),//'运营'
    }
  }
}
</script>
<style type="text/css">
</style>