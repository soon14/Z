<template>
	<div class="units-box">
		<!--微信小程序-->
		<div class='goods-left'>
			
			<div class='left-top'>
				<span style='font-size:18px;font-weight:600'>微信小程序</span>
			</div>
			
			<div style="height:100%;"  class='flclass'>
				<!-- <Scroll :on-reach-bottom="handleReachEdge" :height="height"> -->
					<div style='margin-bottom:160px'>
					<li class='flclass' v-for='(item,index) in Allfl' @click='addBg(index)' :class="{bg:numIndex==index}" style='display:flex;justify-content: space-between'>
						<div style='margin-left:10px'>{{item.label}}</div>
					</li>
				</div>
				<!-- </Scroll> -->
			</div>
			
		</div>
		<div class='goods-right'>
			<div style='height:50px'></div>
			<!--表格数据-->
			<div class="cneter">
				<div class='img'>
					<img :src="url" >
				</div>
				<div  class='cneter-right'>
					<div class='title'>
						<span style='font-size:16px;'>配置小程序</span>
						<span><a @click='setting("formValidate")' style='font-size:16px;'>确认设置</a></span>
					</div>
					<div>
						 <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" style='margin-left:20px'>
						 	<FormItem label="小程序名称" prop="templeteName">
						 		<Input v-model='formValidate.templeteName' placeholder='小程序名称'></Input>
						 	</FormItem>
						 	<FormItem label="选择模板" prop="mb">
						 		<Select @on-change='MenuSelected' :label-in-value='true' v-model='formValidate.mb'>
                                <Option v-for="item in MenuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
						 	</FormItem>
						 </Form>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				url:'http://img.zsydian.com/icon/img/wxxcxmb.png',//模板图片
				formValidate:{
					templeteName:'',//小程序名称
					mb:''//模板
				},
				ruleValidate:{
					templeteName:[
                         { required: true, message: '小程序名称不能为空！', trigger: 'blur' }
                    ],
                    mb:[
                         { required: true, message: '请选择模板！', trigger: 'blur' }
                    ],
				},
				templeteId:'',//模板id
				MenuList:[],//模板数组
				numIndex:0,
				uid: this.$store.state.common.token,
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
			//模板选择
			MenuSelected(v){
				this.templeteId=v.value
				// this.url=v.url
				console.log(this.templeteId)
			},
			//确认设置POST 
			setting(name){
				this.$refs[name].validate((valid) => {
					if(valid){ 
						this.axios.post('/acommit/wxa?uid='+this.uid,{
							templeteId:this.templeteId,
							templeteName:this.templeteName
						}).then(res=>{
							if(res.data.status==200){
								this.$router.push('/wxxcxshzhb')//成功后天跳转到商户页面
							}else{
								this.$notify({
							        title:"",//
							        message: res.data.errorMessage,
							        type: 'error',
							        position: 'bottom-right'
						        });
							}
						})
					}
				})
				
			},
			//获取模板GET 
			getMenuList(){
				this.axios.get('/atemplate/enter?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						
						res.data.rows.forEach((x,index)=>{
							let arr={
								label:res.data.rows[index].templeteName,
								value:res.data.rows[index].templeteId,
								id:res.data.rows[index].id,
							}
							this.MenuList.push(arr)
							// console.log(this.MenuList)
							
						})
					}
				})
			},
			//获取授权状态信息
			getWxcxcInfo(){
				this.axios.get('wxa/app?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						//成功跳转设置页面
						this.$router.push('/wxxcxsettingzhb')
						this.wxModel=false
						console.log(res.data.status)
					}else{
						//没有绑定成功刷新当前页面
						this.$router.push('/wxxcxhomezhb')
					}
				})
			}
		},
		created(){
            this.$nextTick(()=>{
				this.getMenuList()//获取模板
				this.getWxcxcInfo()//获取授权状态
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
		width: 87.5%;
		height: 50px;
		border-bottom:1px solid #e4e4e4;
		display:flex;
		justify-content: space-between;
		position:fixed;
		line-height: 50px;
		z-index:8;
		background: #fff;
	}
	 .wldw{
    	margin-left:10px;
    }
    .wldw span{
    	margin-left:20px;
    }
	.right{
		margin-right:22.5%;
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
		margin:0 10px;
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
		/*margin-left: 20%;*/
   	 	width: 100%;
   	 	height:100%;
   	 	background: #fff;
	}
	.left-top{
		height:50px;
		line-height: 50px;
	
		/*display:flex;*/
	/*	position:fixed;
		width:16%;
		z-index:9;*/
		border-bottom:1px solid #F5F5F5;
		/*justify-content: space-around;*/
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
		background:rgb(241,245,247);
        color:rgb(59,119,227);
	}
	.table div.desc{
		margin:40px 20px;
	}
	.a-btn{
		display:block;
		margin:40px 20px 10px 20px;
	}
	.a-btn1{
		margin:10px 20px;
	}
.wxBtn{
	display:flex;
	width:20%;
	height:40px;
	justify-content: center;
	text-align: center;
	line-height: 40px;
	font-size:14px; 	
	background: #3B77E3;
	color:#fff;
	border-radius:3px;
}
.wxBtn:hover{
	cursor:pointer;
}
.cneter{
	display: flex;
	margin:20px;
	height:60%;
	
}
.cneter .img{
	width:350px;
	height:100%;
	border:1px solid #e4e4e4;
	margin-right:20px;
	/*overflow: hidden;*/
	/*background:url(../../../../static/img/wxxcxmb.png) no-repeat;
	background-size: 100% 100%*/

}
.cneter .img img{
 max-height: 100%;min-width:100%; 
}
.cneter-right{
	width:60%;
	height:100%;
	border:1px solid #e4e4e4;
	padding:10px;
	background: #F4F5FA
}
.cneter-right .title{
	display: flex;
	justify-content: space-between;
	border-bottom:1px solid #e4e4e4;
	margin:20px 0;
	padding-bottom:10px;
}
</style>
<style type="text/css">
	.ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
</style>