<template>
	<div class="units-box">
		<div class='goods-right'>
			<Tabs :animated="false"  style="background:#fff;width:100%;height:100%" @on-click="addBg">
		        <TabPane label="授权小程序">
					<!--表格数据-->
					<div class="table">
						<div class='desc'>
							<div style='font-size:14px;margin-bottom:10px'>
							将您注册的微信小程序授权给智胜云店，系统会自动帮你生成小程序店铺，并提交到微信；期间你不需要人任何繁琐到操作， 即可获得微信小程序。
							</div>
							<div>
								(意您注册到小程序主题不可为个人，否则无法开通微信支付)
							</div>
						</div>
						<a :href="url" target='_blank' class='a-btn' @click='gotowx'>
							<span class='wxBtn'>
								<img src="http://img.zsydian.com/icon/xcxPng.png" width='40' height='40'>
								<span>微信小程序授权</span>
							</span>
						</a>
						<div class='a-btn1'>
							我还没有微信小程序，跳转至<a href='https://mp.weixin.qq.com/' target='_blank'>微信小程序页面</a>注册
						</div>
					</div>
		        </TabPane>
		        <Button type="ghost" @click="cancelHome" size="small" slot="extra" style='margin-top:3px;margin-right:20px'>返回</Button>
		    </Tabs>
			
		</div>
		<!--授权弹框-->
	<Modal v-model="wxModel" width="460px">
		<p slot="header" style="height:30px;line-height:30px;">
			<span>提示</span>
		</p>	
		<div class='attrNum'><span>请在新窗口中完成微信小程序授权  </span>
		</div>
		<div slot="footer">
			<div >
				<div class='attrNum'>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#60BB46;border:none;color:#fff" @click='wxSuccess'>已成功设置</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#e4e4e4;" ><a :href="url" target='_blank' style='color:#000'>授权失败，重试</a></Button>
				</div>
			</div>
		</div>
	</Modal>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				
				wxModel:false,
				appId:'',//第三方平台appId
				token:'',//预授权码
				serverIp:'',//回掉地址
				auth_type:2,//类型小程序
				url:'',//跳转地址
				uid: this.$store.state.common.token,
				numIndex:0,
				Allfl:[
					{
						label:'小程序设置',
						value:0
					}
				],
			}
		},
		methods:{
			addBg(index){
				this.numIndex=index
			},
			//微信授权跳转
			gotowx(){
				this.wxModel=true
			},
			//获取授权参数信息
			getInfo(){
				this.axios.get('wxa/$dev/preauth?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						let data=res.data.rows
						this.appId=data.appId//第三方平台appId
						this.token=data.token//预授权码
						this.serverIp=data.serverIp//回掉地址
						this.url='https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid='+this.appId+'&pre_auth_code='+this.token+'&redirect_uri='+this.serverIp+'&auth_type='+this.auth_type
					}
				})
			},
			//成功设置判断是否授权
			wxSuccess(){
				this.axios.get('wxa/app?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						//成功跳转设置页面
						this.$router.push('/wxxcxsh')
						this.wxModel=false
						console.log(res.data.status)
					}else{

						//没有绑定成功刷新当前页面
						this.$router.go({path:'/wxxcxhome'})
					}
				})
			},
			//差号返回
	        cancelHome(){
	        	this.$router.push('/operationhome')
	        },
		},
		created(){
            this.$nextTick(()=>{
				this.getInfo()	//获取授权参数信息
			})
        },
		mounted(){
			
		},
}
</script>
<style scoped>
	.units-box {
		width: 100%;
		height: 100%;
		background: rgb(230,233,236);
		display:flex;
	}
	
	.search-box {
		width: 300px;
		height: auto;
		position: fixed;
		top: 15px;
		left: 250px;
		z-index: 9999;
	}
	
	.search-box .add {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: #00a8ff;
		line-height: 28px;
		text-align: center;
		color: #fff;
		font-size: 22px;
		float: left;
		margin-right: 10px;
	}
	
	.btns-box {
		
		height: 50px;
		border-bottom:1px solid #e4e4e4;
		display:flex;
		justify-content: space-between;
		
		line-height: 50px;
		
		background: #fff;
	}
	 .wldw{
    	margin-left:10px;
    }
    .wldw span{
    	margin-left:20px;
    }
	.right{
		margin-right:20px;
		margin-bottom:10px;
	}
	
	.ivu-icon-chevron-down {
		font-size: 10px;
	}
	.flclass:last-child{
		margin-bottom:40px;
	}
	
	.btns img {
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}
	
	.table {
		width: 100%;
		height: 100%;
		background: #fff;
		overflow: auto;
	}
	
	.page-box {
		text-align: center;
		margin-top:5px;
	}
	/***气泡提示样式设置***/
	
	.qp-con {
		width: 100%;
		height: 30px;
		color: #0d0d0d;
		font-size: 14px;
		line-height: 30px;
		padding:0 10px;
		cursor: pointer;
	}
	
	.qp-con img {
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}
	.goods-left{
		width:120px;
		height:100%;
		flex:0 0 120px;
		margin-right:3px;
		background: #fff;
		border-right:1px solid #eee;
	}
	.goods-right{
		
   	 	width: 100%;
   	 	background: #fff;
	}
	.left-top{
		height:50px;
		line-height: 50px;
	
		
		border-bottom:1px solid #F5F5F5;
		justify-content: space-between;
	}
	.left-top span{
		margin-left:10px;
		display:inline-block;
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
		background: rgb(241,245,247);
    color: rgb(59,119,227);
	}
	.table div.desc{
		margin:40px 20px;
	}
	.a-btn{
		display:block;
		margin:40px 20px 10px 20px;
		width:200px;
	}
	.a-btn1{
		margin:10px 20px;
	}
.wxBtn{
	display:flex;
	width:305px;
	height:50px;
	/*justify-content: center;*/
	/*text-align: center;*/
	line-height: 50px;
	font-size:14px; 	
	background: #3B77E3;
	color:#fff;
	border-radius:3px;
}
.wxBtn:hover{
	cursor:pointer;
}
.wxBtn img{
	vertical-align: middle;
	margin-right:10px;
	margin-left:10px;
	margin-top:5px;
}
.submitBtn{
	border-color:blue;

}
</style>
<style type="text/css">
	.ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
</style>