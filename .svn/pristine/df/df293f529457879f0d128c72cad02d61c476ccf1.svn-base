<template>
	<div class='setting'>
		<div class='main'>
			<div class='main-top'>
				<h2>{{$t('manage.setting.Msetting')}}</h2><!--管理设置-->
				<div class='search'>
					<Input placeholder='查找设置' style='width:50%;'></Input>
				</div>
			</div>
			<div class="main-bottom">
				<li v-for="(item,index) in dataList" @click='clickList(index)'>
					<span style='font-weight:600;font-size:14px'>{{item}}</span>
				</li>
				
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
	name:'setting',
	data(){
		return{
			// dataList:['管理','进销存','财务']
			dataList:[this.$t('manage.setting.manage'),this.$t('manage.setting.jxc'),this.$t('manage.setting.Finance')]
		}
	},
	methods:{
		clickList(index){
			this.$router.push({
				path:"/settingDetails",
				query:{
					index:index
				}
			})
		},
	}
}
</script>
<style type="text/css" scoped>
.main
{
	width:100%;
	display:flex;
	flex-direction: column;

}
.main-top{
	width:100%;
	display: flex;
	margin-top:50px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.search{
	width:100%;
	position:relative;
	text-align: center;
	margin-top:20px;
}
.main-bottom{
	width:100%;
	margin-top:80px;
	display:flex;
	justify-content: center;
	align-items: center
}
.main-bottom li{
	border:1px solid #ccc;
	border-radius:4px;
	height:100px;
	width:100px;
	line-height: 100px;
	text-align: center;
	margin:0 10px;
	list-style: none
}
.main-bottom li:hover{
	border-color:#0078D7;
	cursor:pointer;
}
</style>