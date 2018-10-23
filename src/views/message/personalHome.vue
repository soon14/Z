<template>
	<div class='personal'>
		<div class='main'>
			<!-- <div class='main-left'>
				<div class='user-top'>
					<p><img :src="user.logo" width='40' height='40' style='border-radius:50%'></p>
					<p><span class='username'>{{user.trueName}}</span></p>
				
				</div>
				<div class='lilist'>
					<li class="flclass" v-for='(item,index) in leftList' :key='index' @click='clickli(index)' :class='{bg:numIndex==index}'>
						<span>{{item.title}}</span>
					</li>
				</div>
			</div> -->
			<div class='main-right'>
				<Tabs :animated="false" style="background:#fff;width:100%;height:100%" @on-click="clickli">
			        <TabPane label="修改资料"><editinfo></editinfo></TabPane>
			        <TabPane label="安全设置"><safesetting></safesetting></TabPane>
			
			    </Tabs>
				<!-- <div v-if='numIndex==0'>
					<editinfo></editinfo>
				</div>
				<div v-if='numIndex==1'>
					<safesetting></safesetting>
				</div> -->
				<!-- <div v-if='numIndex==2'>
					.
				</div> -->
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import editinfo from './editInfo'
import safesetting from './safesetting'
export default{
	components:{
		editinfo,
		safesetting
	},
	data(){
		return{
			numIndex:0,
			uid: this.$store.state.common.token,
			user:this.$store.state.common.user,
			leftList:[
				{
					title:"修改资料",
					id:0
				},
				{
					title:"安全设置",
					id:1
				},
				// {
				// 	title:"登陆历史",
				// 	id:2
				// },
			]
		}
	},
	methods:{
		//点击li
		clickli(index){
			this.numIndex=index
		},
	},
	mounted(){
		console.log(this.user)
		if(this.$route.query.ps==0){
			this.numIndex=0
		}
		if(this.$route.query.ps==1){
			this.numIndex=1
		}
	}
}
</script>
<style type="text/css" scoped>
.personal{
	width:100%;
	height:100%;
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
	/*overflow-y: scroll;*/
	/*margin-left:19%;*/
	background: #fff;
	
}
.user-top{
	
	width:100%;
	padding:10px 0;
	border-bottom:1px solid #e4e4e4;
	text-align: center;
	
}
.user-top img{
	display:inline-block;
	vertical-align: middle;
	
	
}
.username{
	display:inline-block;
	vertical-align: middle;
	font-size:16px;
	
	color:#ff0000;
	
	
}
.user-top>div{
	margin-left:20px;
	margin-top:20px;
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