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
				// {
				// 	title:"全部消息",
				// 	url:"/allmsg",
				// 	 icon:"../../static/icon/gl/gl.png",
				// },
				// {
				// 	title:"订单消息",
				// 	url:"/ordermsg",
				// 	 icon:"../../static/icon/gl/gl.png",
				// },
				// {
				// 	title:"库存提醒",
				// 	url:"/kcmsg",
				// 	 icon:"../../static/icon/gl/gl.png",
				// },
				// {
				// 	title:"服务通知",
				// 	url:"/servermsg",
				// 	 icon:"../../static/icon/gl/gl.png",
				// },
				{
					title:this.$t('info.ic'),//"消息中心",
					url:"/msgHome",
					icon:"http://img.zsydian.com/icon/gl.png",
					icon1:"http://img.zsydian.com/icon/gl1.png",
				},
				{
					title:this.$t('info.PC'),//"个人中心",
					url:"/personalHome",
					icon:"http://img.zsydian.com/icon/gl.png",
					icon1:"http://img.zsydian.com/icon/gl1.png",
				},
				// {
				// 	title:"个人设置",
				// 	url:"",
				// 	icon:"../../static/icon/gl/setting.png",
    //       			icon1:"../../static/icon/gl/setting1.png",
				// },
			],
			titleName:this.$t('info.my'),//'我的'
		}
	}
}
</script>
<style type="text/css">

</style>