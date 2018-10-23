<template>
	<div>
		<div class='main'>
			<div class='main-right'>
				<Tabs :animated="false" style="background:#fff;width:100%;height:100%" @on-click="clickli">
			        <TabPane label="全部消息"><allmsg></allmsg></TabPane>
			        <TabPane label="订单消息"><ordermsg></ordermsg></TabPane>
			        <TabPane label="库存消息"><kcmsg></kcmsg></TabPane>
			        <TabPane label="服务消息"><servermsg></servermsg></TabPane>
			    </Tabs>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import allmsg from './allmsg'
import ordermsg from './ordermsg'
import kcmsg from './kcmsg'
import servermsg from './servermsg'
export default{
	components:{
		allmsg,
		ordermsg,
		kcmsg,
		servermsg
	},
	data(){
		return{
			numIndex:0,
			uid: this.$store.state.common.token,
			user:this.$store.state.common.user,
			//下拉数据
			orderListname:[
					{
						label:"今日",
						value:0
					},
					{
						label:"三天内",
						value:1
					},
					{
						label:"七天内",
						value:3
					},
					
				],
			keyword:'',//输入框搜索值
		}
	},
	methods:{
		//下拉搜索
		orderselected(value){

		},
		//点击li
		clickli(index){
			this.numIndex=index
		},
	}
}
</script>
<style type="text/css" scoped>
.head{
	height:50px;
	line-height: 50px;
	width:100%;
	display:flex;
	justify-content: space-between;
	border-bottom:1px solid #e4e4e4;
}
.main{
	width:100%;
	height:100%;
	display:flex;
	background: rgb(230,233,236)
}
.main-left{
	width: 120px;
	margin-right: 3px;
	flex: 0 0 120px;
	font-size: 14px;
	background: #fff;
}
.main-right{
	
	width:100%;
	height:100%;
	
	background: #fff;
	
}
li{
	list-style: none
}
.lilist li{
	height:50px;
	line-height: 50px
}
.lilist li span{
	margin-left:20px;
}
.bg{
	background: #EBF1FC
}
</style>