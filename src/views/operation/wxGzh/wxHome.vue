<template>
	<div class="wxHome">
			<!--微信概况-->	
			<div class='right-center'>
				<Tabs :animated="false" value="0" style="background:#fff;width:100%;height:100%" @on-click="changeMenuItem">
			        <TabPane label="微信概况"><wxbasebnfo ></wxbasebnfo></TabPane>
			        <TabPane label="实时消息"><timemessage ></timemessage></TabPane>
			        <TabPane label="自动回复"><autoreply ></autoreply></TabPane>
			        <TabPane label="自定义菜单"><custommenu></custommenu></TabPane>
			        <TabPane label="微信用户"><wxperson ></wxperson></TabPane>
			        <TabPane label="公众号设置" name="0"><setting ></setting></TabPane>
			        <Button type="ghost" @click="cancelHome" size="small" slot="extra" style='margin-top:3px;margin-right:20px'>返回</Button>
			    </Tabs>
			</div>
		<div style="height:110px"></div>
	</div>
</template>
<script type="text/javascript">
import wxbasebnfo from './wxBaseInfo'//图文
import timemessage from './timeMessage'//实时消息
// import qf from './qf'
import autoreply from './autoReply'//自动回复
import vimage from './image'//图文
import custommenu from './customMenu'//自定义菜单
import setting from './setting'//设置
import wxperson from './wxPerson'//微信用户
	export default{
		components:{
			wxbasebnfo,
			timemessage,
			// qf,
			autoreply,
			vimage,
			custommenu,
			setting,
			wxperson
		},
		data(){
			return{
				theme3:'light',
				num:6,
				wxMenu:[
					// {
					// 	name:"首页",
					// 	show:false,
					// },
					{
						name:"微信概况",
						show:false,
					},
					{
						name:"实时消息",
						show:false,
					},
					// {
					// 	name:"群发消息",
					// 	show:false,
					// },
					{
						name:"自动回复",
						show:false,
					},
					// {
					// 	name:"图文素材",
					// 	show:false,
					// },
					// {
					// 	name:"参数二维码",
					// 	show:false,
					// },
					// {
					// 	name:"插件中心",
					// 	show:false,
					// },
					{
						name:"自定义菜单",
						show:false,
					},
					{
						name:"微信用户",
						show:false,
					},
					{
						name:"公众号设置",
						show:false,
					},
				]
			}
		},
		methods:{
			changeMenuItem(index){
				this.num = index
				
			},
			//差号返回
	        cancelHome(){
	        	this.$router.push('/operationhome')
	        },
		},
		mounted(){
			this.changeMenuItem(5)
		}
	}
</script>
<style type="text/css" scoped>
.wxHome{
	
	height:100%;
	display: flex;
	background: rgb(230,233,236);
	overflow: hidden;
}
.flclass:hover{
	cursor:pointer;
}
.right{
	display:flex;
	justify-content: flex-start;
	align-items: center;
	/*padding:20px;*/
	width:100%;
	
}
.right-center{
	width: 100%;
    height: 100%;
   background: #fff;
   overflow: auto;
   
}
.right-r{

}
.publicDiv{
	margin-top:20px;
}
.publicDiv span{
	margin-right:8px;
	text-align: right
}
.bg{
	background:#eee;
	/*border-right:2px solid #0077DD;*/
}
.goods-left{
	width:120px;
	flex:0 0 120px;
	height:100%;
	margin-right:3px;
	background: #fff;
		
}
.left-top{
		height:50px;
		line-height: 50px;
		/*margin-left:10px;*/
		/*display:flex;*/
		
		border-bottom:1px solid #F5F5F5;
		/*justify-content: space-around;*/
	}
.goods-left li{
		list-style: none;
		height:40px;
		line-height: 40px;
		width:100%;
	

	}
	.goods-left li span{
		
		margin-right:10px;
	}
	.bg{
		background:rgb(241,245,247);
        color:rgb(59,119,227);
	}
</style>
