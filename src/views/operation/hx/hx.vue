<template>
	<div>
		<div >
				<div class='hx'>
					<span style="margin-left:20px">优惠券核销</span>
					<span @click="cancelHome" style="cursor:pointer;margin-right:20px"><Icon type="close" class="cha" ></Icon></span>
				</div>
				<div class='hx-center'>
					<div style='width:100%;display: flex;justify-content: center;'>
						<Input style='margin-top:8px;width:40%' v-model='hxkeyword' placeholder='请输入优惠券编号' @on-enter="enterClick">
                    		<span slot="append"  @click='searchyhq' style='cursor:pointer'>搜索</span>
               		 	</Input>
					</div>
					<div style=';width:80%;display: flex;;border:1px solid #e4e4e4;margin-top:30px;background:#f4f4f4' >
						<div class='bg-img'>
							<div style='width:100%;display: flex;;padding:15px 0;border-bottom: 1px solid #e4e4e4;'>
								<div style='margin-left:60px;margin-top:10px'>
									<p style='color:#ff0000;margin-top: -20px;'>
										￥	<span style='font-size:38px'>{{price}}</span></p>
									<p style='color:#ff0000;margin-left:10px'>优惠券</p>
								</div>

								<div style='margin-left:50px;margin-top:15px'>
									<p>{{name}}</p>
									<p style='margin-top:5px'>有效期至：{{activateTime}} - {{expiredTime}}</p>
								</div>
							</div>
							<!-- <div style='position:relative;top:30px;left:75px'>满100元可用</div> -->
							<div style='display: flex;justify-content: center;align-items: center;flex-direction: column;padding: 30px 0px; padding: 15px 0px;'>
								<span style="font-size: 16px;font-weight: 700;">{{couponNo}}</span>
								<img :src="qrcodeUrl" width='240' height='240'>
								<div>优惠券二维码</div>
							</div>
						</div>
						<div style='width:50%;margin:25px;background:#fff;height:400px'>
							<div style='padding:20px;' v-if='step1'>
								 <Steps :current="0" direction="vertical">
							        <Step title="搜索卡券" content="扫描优惠卷二维码或者优惠码"></Step>
							        <Step title="核销卡卷" content="核对卡卷信息无误后进行核销"></Step>
							        <Step title="核销完成" content="核销完成后将通知客户并 后台保存核销记录"></Step>
							    </Steps>
						    </div>
						    <div v-if='step2' class='step2'>
						    	<li>
						    		<span>卡券名称：</span><span>{{obj.name}}</span>
						    	</li>
						    	<li>
						    		<span>有效日期：</span><span>{{activateTime}} - {{expiredTime}}</span>
						    	</li>
						    	<li>
						    		<span>客户姓名：</span><span>{{obj.creator}}</span>
						    	</li>
						    	<li>
						    		<span>备注描述：</span><span>{{obj.remark}}</span>
						    	</li>
						    	<li>
						    		<span>领取状态：</span><span>{{obj.obtainStatusDesc}}</span>
						    	</li>
						    	
						    	<li>
						    		<span>卡券是否有效：</span><span style='color:red'>{{obj.status==1?"有效":obj.status==99?"已失效":""}}</span>
						    	</li>
						    	<div class='btn'>
							    	 <Button type="primary" style='background:#3b77e3;border:none;width:200px;height:40px;font-size:16px' @click="writeOff" >
										 核销卡券
									</Button>
								</div>
						    </div>
						    <div class='success' v-if='step3'>
						    	<Icon type="ios-checkmark-outline" size='160' style='color:#13CE66;margin-top:20px'></Icon>
						    	<div class='btn'>
								    <Button type="primary" style='background:#3b77e3;border:none;width:200px;height:40px;font-size:16px;' @click="success">
									 核销完成
									</Button>
								</div>
							</div>
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
			price:0,
			couponNo:"",
			qrcodeUrl:"",//二维码
			activateTime:'优惠券截至时间',
			expiredTime:'',
			name:'优惠券名称',
			step1:true,//步数
			step2:false,//步数
			step3:false,//步数
			hxkeyword:'',//查询关键字
			obj:{},//查询到的信息
			uid: this.$store.state.common.token,
		}
	},
	methods:{
		//查询优惠券
		searchyhq(){
			this.step1=true
			this.axios.get('/ccrm/viewCoupon/'+this.hxkeyword+'?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data.rows
					this.obj=data.couponVo
					this.price=this.obj.amount
					this.expiredTime=data.expiredTime
					this.activateTime=data.activateTime
					this.name=this.obj.name
					this.couponNo=data.couponNo
					this.qrcodeUrl=data.qrcodeUrl
					this.step1=false
					this.step2=true
					this.step3=false
					this.expiredTime=this.getLocalTime(this.expiredTime)
					this.activateTime=this.getLocalTime(this.activateTime)
				}
			})
		},
		//回车搜索
		enterClick(){
			this.searchyhq()
		},
		//核销
		writeOff(){
			if(this.obj.status==99){
                this.$notify({
                    title:"",//
                    message:'该卡券已失效！',
                    type: 'error',
                    position: 'bottom-right'
                });
			}else{
				this.axios.get('/ccrm/writeOff/'+this.hxkeyword+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
	                    this.$notify({
	                        title:"",//
	                        message: '核销成功',
	                        type: 'success',
	                        position: 'bottom-right'
	                    });
	                    this.step3=true
	                    this.step1=false
	                    this.step2=false
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
		},
		//核销完成
		success(){
			this.step3=false
            this.step1=true
            this.step2=false
            this.hxkeyword=''
            this.hxkeyword=''
            this.obj={}
			this.price=''
			this.expiredTime=""
			this.activateTime="优惠券截至时间"
			this.name=''
			this.qrcodeUrl=''
			this.couponNo=''
		},
		//差号返回
        cancelHome(){
        	this.$router.push('/operationhome')
        },
	}
}
</script>
<style type="text/css" scoped>
.bg-img{
	width:50%;
	height:400px;
	margin:20px;
	background-color: #fff;
	background-size: 100%;
}
li{
	list-style: none;
	padding:10px;
}
.step2{
	margin:0 20px;
}
.hx{
	display:flex;
	justify-content: space-between;
	height:50px;
	
	line-height: 50px;
	border-bottom: 1px solid #e4e4e4;
}
.hx-center{
	margin-bottom:100px;
	width:100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center
}
.success{
	width:100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.btn{
	
	margin-top:20px;
	margin-left:10px;
}
</style>
