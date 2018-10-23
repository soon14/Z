<template>
	<div class=''>
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
			data:[
				{
					title:this.$t('public.overview'),//"概览",
					url:"/sales",
					 icon:"http://img.zsydian.com/icon/gl.png",
					 icon1:"http://img.zsydian.com/icon/gl1.png",
				},
				{
					title:this.$t('sideBar.sales.customer'),//"客户",
					url:"/customer",
					 icon:"http://img.zsydian.com/icon/kh.png",
					 icon1:"http://img.zsydian.com/icon/kh1.png",
					 
				},
				{
					title:this.$t('sideBar.sales.quotation'),//"报价单",
					url:"/quotation",
					 icon:"http://img.zsydian.com/icon/bjd.png",
					 icon1:"http://img.zsydian.com/icon/bjd1.png",
				},
				{
					title:"订单",//"销售订单",
					url:"/salespage",
					 icon:"http://img.zsydian.com/icon/xx.png",
					 icon1:"http://img.zsydian.com/icon/xx1.png",
				},
				{
					title:this.$t('sideBar.sales.deliver'),//"发货",
					url:"/send",
					icon:"http://img.zsydian.com/icon/xx.png",
					icon1:"http://img.zsydian.com/icon/xx1.png",
				},
				{
		          title:this.$t('sideBar.manage.setting'),//"设置",
		          icon:"http://img.zsydian.com/icon/setting.png",
		          icon1:"http://img.zsydian.com/icon/setting1.png",
		          url:"/salesSetting",
		        },

			],
			titleName:this.$t('sideBar.sales.title'),//'销售'
		}
	},
	mounted(){
		
	}
}
</script>
<style type="text/css">

</style>