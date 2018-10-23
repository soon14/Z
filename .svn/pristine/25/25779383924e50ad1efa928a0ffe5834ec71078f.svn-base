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
			user:this.$store.state.common.user,
			data:[
				{
					title:this.$t('public.overview'),//"概览",
					url:"/financeHome",
					 icon:"http://img.zsydian.com/icon/gl.png",
					 icon1:'http://img.zsydian.com/icon/gl1.png',
				},
				{
					title:this.$t('sideBar.finance.receivables'),//"收款",
					url:"/receipts",
					icon:"http://img.zsydian.com/icon/ys.png",
					 icon1:"http://img.zsydian.com/icon/sy1.png",
				},
				{
					title:this.$t('sideBar.finance.receivable'),//"应收",
					url:"/receivablea",
					icon:"http://img.zsydian.com/icon/ys.png",
					 icon1:"http://img.zsydian.com/icon/sy1.png",
				},
				{
					title:this.$t('sideBar.finance.payment'),//"付款",
					url:"/payment",
					icon:"http://img.zsydian.com/icon/fk.png",
					 icon1:"http://img.zsydian.com/icon/fk1.png",
				},

				{
					title:this.$t('sideBar.finance.payable'),//"应付",
					url:"/receivable",
					icon:"http://img.zsydian.com/icon/ys.png",
					 icon1:"http://img.zsydian.com/icon/ysk1.png",
				},
				
				{
					title:this.$t('sideBar.finance.trading'),//"交易流水",
					url:"/withdraw",
					 icon:"http://img.zsydian.com/icon/dzd.png",
					 icon1:"http://img.zsydian.com/icon/dzd.png",
				},
				{
		          title:this.$t('sideBar.manage.setting'),//"设置",
		          icon:"http://img.zsydian.com/icon/setting.png",
		          icon1:"http://img.zsydian.com/icon/setting1.png",
		          url:"/financeSetting",
		        },
			],
			titleName:this.$t('sideBar.finance.title'),//'财务'
		}
	}
}
</script>
<style type="text/css">
</style>