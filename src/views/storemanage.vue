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
				
		],
		titleName:this.$t('sideBar.manage.title'),//'管理'
		}
	}
}
</script>
<style type="text/css">
</style>