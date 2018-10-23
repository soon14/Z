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
					url:"/enterprise",
					icon:"http://img.zsydian.com/icon/gl.png",
          			icon1:"http://img.zsydian.com/icon/gl1.png",
				},
				{
					title:this.$t('sideBar.manage.power'),//"安全",
					url:"/power",
					icon:"http://img.zsydian.com/icon/aq.png",
					icon1:"http://img.zsydian.com/icon/aq1.png",
				},
				
		        {
		          	title:this.$t('sideBar.manage.warehouse'),//"仓库",
		          	url:"/storehouse",
		         	icon:"http://img.zsydian.com/icon/store1.png",
					icon1:"http://img.zsydian.com/icon/ck1.png",
		        },
		        {
		          title:this.$t('sideBar.manage.store'),//"门店",
		          url:"/ShopAddPage",
		          icon:"http://img.zsydian.com/icon/shop.png",
		          icon1:"http://img.zsydian.com/icon/shop1.png",
		        },
		        // {
		        //   title:"供应商",
		        //   icon:"http://img.zsydian.com/icon/gys.png",
		        //   icon1:"http://img.zsydian.com/icon/gys1.png",
		        //   url:"/units"
		        // },
		   
		        {
		          title:this.$t('sideBar.manage.goods'),//"商品",
		          icon:"http://img.zsydian.com/icon/good.png",
		          icon1:"http://img.zsydian.com/icon/good1.png",
		          url:"/goods"
		        },
		        {
		          title:this.$t('sideBar.manage.employee'),//"员工",
		          icon:"http://img.zsydian.com/icon/good.png",
		          icon1:"http://img.zsydian.com/icon/good1.png",
		          url:"/ey"
		        },
				{
		          title:this.$t('sideBar.manage.setting'),//"设置",
		          icon:"http://img.zsydian.com/icon/setting.png",
		          icon1:"http://img.zsydian.com/icon/setting1.png",
		          url:"/settingDetails",
		        },
		        {
		          title:"素材库",
		          icon:"http://img.zsydian.com/icon/setting.png",
		          icon1:"http://img.zsydian.com/icon/setting1.png",
		          url:"/materialHome",
		        },
		],
		titleName:this.$t('sideBar.manage.title'),//'管理'
		}
	}
}
</script>
<style type="text/css">
</style>
