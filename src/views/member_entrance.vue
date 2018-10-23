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
          url:"/memberHome",
          icon:"http://img.zsydian.com/icon/gl.png",
          icon1:"http://img.zsydian.com/icon/gl1.png",
        },
        {
          title:this.$t('sideBar.member.member'),//"会员",
          url:"/management",
          icon:"http://img.zsydian.com/icon/crm.png",
          icon1:"http://img.zsydian.com/icon/crm1.png",
        },
        {
          title:"黑名单",
          url:"/blacklisthome",
          icon:"http://img.zsydian.com/icon/crm.png",
          icon1:"http://img.zsydian.com/icon/crm1.png",
        },
        {
          title:"生命周期",
          url:"/lifecyclehome",
          icon:"http://img.zsydian.com/icon/crm.png",
          icon1:"http://img.zsydian.com/icon/crm1.png",
        },
        {
          title:"近期生日",
          url:"/birthdayhome",
          icon:"http://img.zsydian.com/icon/crm.png",
          icon1:"http://img.zsydian.com/icon/crm1.png",
        },
        // {
        //   title:"会员分析",
        //   url:"/analysishome",
        //   icon:"http://img.zsydian.com/icon/crm.png",
        //   icon1:"http://img.zsydian.com/icon/crm1.png",
        // },
      ],
      titleName:"会员",
    }
  }
}
</script>
<style type="text/css">
.jxc{
  height:100%;
}
</style>