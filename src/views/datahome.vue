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
					name:"采购",
					url:"/dataHome"
				},
				{
					name:"销售",
					url:"/salesreport"
				},
				{
					name:"财务",
					url:"/datacw"
				},
				{
					name:"零售",
					url:"/dataretail"
				},
				{
					name:"商品",
					url:"/datasku"
				},
				{
					name:"会员",
					url:"/crmreport"
				},
				{
					name:"店铺",
					url:"/storeReport"
				},
				{
					name:"员工",
					url:"/storeReport"
				},
				
				{
					name:"库存",
					url:"/dataInv"
				},
			],
			titleName:this.$t('sideBar.data.title'),//'数据'
		}
	}
}
</script>
<style type="text/css">
</style>