<template>
	<div class='wxsetting'>
		<div class='heade'>
			<span>微信公众号</span>
		</div>
		<div class='main'>
			<div class='main-wrap'>
				<div class='main-wrap-left'>
					<p style='color:#60BB46;font-size:16px'>绑定微信公众号，把店铺和微信打通</p>
					<p>绑定后即可在这里管理你的公众号，智胜云提供比微信官方后台更强大的功能！</p>
					<a :href="url" target='_blank' @click='gotowx'>
						<p class='wxBtn-main' >
							<span class='wxBtn'>
								<img src="http://img.zsydian.com/wxsetting_wx.png" width='50' height='40'>
								<span >我有微信公众号，立即设置</span>
							</span>
						</p>
					</a>
				</div>
				<div class='main-wrap-right'>
					<ul>
						<p>温馨提示：</p>
						<li>一个微信公众号只能和一个店铺绑定</li>
						<li>认证服务号绑定之后，如果要解绑可以联系智胜云客服</li>
						<li style='color:#ff0000;'>为保证所有功能正常，授权时请保持默认选择，把权限统一授权给智胜云</li>
					</ul>
				</div>
			</div>
			<div class='main-wrap-table'>
				<span style='margin-bottom:10px'>微信给不同类型公众号提供不同的接口，智胜云能提供的功能也不相同：</span>
				<table class="table table-bordered wxsettled-feature-list">
				    <thead>
				        <tr>
				            <th></th>
				            <th>未认证订阅号</th>
				            <th>认证订阅号</th>
				            <th>未认证服务号</th>
				            <th>认证服务号</th>
				        </tr>
				    </thead>
				    <tbody>
				        <tr>
				            <td>消息自动回复</td>
				            <td class="tick"></td>
				            <td class="tick"></td>
				            <td class="tick"></td>
				            <td class="tick"></td>
				        </tr>
				        <tr>
				            <td>微信自定义菜单</td>
				            <td></td>
				            <td class="tick"></td>
				            <td class="tick"></td>
				            <td class="tick"></td>
				        </tr>
				        <tr>
				            <td>群发/定时群发</td>
				            <td></td>
				            <td class="tick"></td>
				            <td></td>
				            <td class="tick"></td>
				        </tr>
				        <tr>
				            <td>高级客户管理</td>
				            <td></td>
				            <td>部分功能</td>
				            <td></td>
				            <td class="tick"></td>
				        </tr>
				        <tr>
				            <td>可申请微信支付</td>
				            <td></td>
				            <td></td>
				            <td></td>
				            <td class="tick"></td>
				        </tr>
				    </tbody>
				</table>
			</div>
		</div>
		<!--授权弹框-->
	<Modal v-model="wxModel" width="460px">
		<p slot="header" style="height:30px;line-height:30px">
          <span>提示</span>
        </p>
		<div class='attrNum'><span>请在新窗口中完成微信公众号授权  <a >查看授权教程</a></span></div><!--href=""-->
		<div slot="footer">
			<div >
				<div class='attrNum'>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#60BB46;border:none;color:#fff" @click='wxsuccess'>已成功设置</Button>
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
			auth_type:1,//类型公众号
			url:'',//跳转地址
			uid: this.$store.state.common.token,
		}
	},
	methods:{
		//微信授权跳转
		gotowx(){
			this.wxModel=true
			
		},
		//获取授权参数信息
		getInfo(){
			this.axios.get('wxcom/$dev/preauth?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data.rows
					// console.log(data)
					this.appId=data.appId//第三方平台appId
					this.token=data.token//预授权码
					this.serverIp=data.serverIp//回掉地址
					this.url='https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid='+this.appId+'&pre_auth_code='+this.token+'&redirect_uri='+this.serverIp+'&auth_type='+this.auth_type
				}else{
					//失败
					// this.$Notice.error({
					// 	title:"",//
					// 	desc: res.data.errorMessage
					// });
				}
			})
		},
		//成功设置
		wxsuccess(){
			this.axios.get('wxapp/app?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					console.log(res.data)
					//成功跳转详情页面
					this.wxModel=false
					this.$router.push('/wxHome')
					
				}else{
					//没有绑定成功刷新当前页面
					this.$router.go({path:'/wxsetting'})
				}
			})
			
		},
		//获取微信公众是否授权
		getWxInfo(){
			this.axios.get('wxapp/app?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					//成功跳转详情页面
					this.$router.push('/wxHome')
					this.wxModel=false
				}else{
					//没有绑定成功刷新当前页面
					this.$router.push({path:'/wxsetting'})
				}
			})
		},
	},
	mounted(){
		//获取授权参数信息
		this.getInfo()//获取微信公众信息
		this.getWxInfo()//获取微信公众是否授权
	},
}
</script>
<style type="text/css" scoped>
.wxsetting{
	width:100%;
	height:100%;
	background: rgb(230,233,236);
}
.heade{
	height:50px;
	line-height: 50px;
	width:100%;
	background: #fff;
	margin-bottom:7px;
}
.heade span{
	margin-left:20px;
}
.main{
	height:100%;
	margin:0 7px;
	background: #fff;
}
.main-wrap{
	
	padding:20px;
	display:flex;
	justify-content: space-between;

	margin:0 auto;
	border-bottom:1px solid #e4e4e4;
}
.main-wrap-table{

	padding:20px;
	display:flex;
	flex-direction: column;
	margin:0 auto 90px auto;
	
}
.main-wrap-left p{
	margin-bottom:20px;
}
.wxBtn{
	display:flex;
	width:80%;
	height:50px;
	text-align: center;
	line-height: 50px;
	font-size:14px; 	
	background: #60BB46;
	color:#fff;
	border-radius:3px;
}
.wxBtn:hover{
	cursor:pointer;
}
.wxBtn img{
	vertical-align: middle;
	margin-left:30px;
	margin-top:5px;
}
.main-wrap-right li{
	list-style: circle
}
.main-wrap-right li,.main-wrap-right p{
	margin-bottom:10px;
	
}
.main-wrap-right p{
	margin-left:-20px;
}
table.wxsettled-feature-list {
    border-radius: 0;
    margin-bottom: 25px;
    font-size: 14px;
}
.table {
    width: 100%;
    font-size: 12px;
    text-align: left;
    margin-bottom: 0;
}
.table-bordered {
    
    border-collapse: separate;
 	
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}
table{
	max-width: 100%;
    background-color: transparent;
}
table.wxsettled-feature-list td,table.wxsettled-feature-list th {
    text-align: center;
    vertical-align: middle;
    font-weight: normal;
    width: 50px;
    height: 60px;
    border-radius: 0 !important;
}
.table-bordered td, .table-bordered th {
    border-left: 1px solid #ddd;
}
.table td, .table th {
    padding: 8px;
    line-height: 20px;
    text-align: left;
    vertical-align: top;
    border-top: 1px solid #ddd;
}
.table td {
    padding: 0;
}
.table tbody>tr {
    border-bottom: 1px solid #ccc;
}
tr{
	display: table-row;
}
.table-bordered {
   border-bottom:1px solid #ddd;
   border-right:1px solid #ddd;
    border-collapse: separate;
}

.tick{
	background: url("http://img.zsydian.com/duihao.png") no-repeat center center;
	background-size: 20px 20px

}
.attrNum{
	text-align: center;
	width:100%;

}
</style>