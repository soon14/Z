<template>
	<div>
		<div class='main'>
			<div class='main-right'>
				<Tabs :animated="false"  style="background:#fff;width:100%;height:100%" @on-click="clickli">
			        <TabPane label="生日特权">
					    <div >
							<div class='head' >
								<span></span>
								<div>
								<Button shape="circle"  style="background:#3b77e3;margin-right:15px;color:#fff;border:none" @click="saveRegist1" >
									<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}</Button>
									<span @click="cancelHome" style="cursor:pointer; margin-right: 10px;"><Icon type="close" class="cha" ></Icon></span>
								</div>
							</div>
							<div class='yscontent'>
								<div class='list'>
									<span style='text-align:right'>{{$t('member.marketingHome.xfDis')}}： &nbsp;&nbsp;</span>
									
									<InputNumber :max="1" :min="0.1" :step="0.1" v-model="discount1" style='width:120px;margin-left:-2px' @on-change="changediscount1"></InputNumber>
									&nbsp;&nbsp;{{$t('member.marketingHome.Dis')}}<!--折-->
								</div>
								<div class='list'>
									<span style='text-align:right'>{{$t('member.marketingHome.xfjf')}}：&nbsp;&nbsp;</span>
									
									<InputNumber :min="0" v-model="mtintegral1" style='width:120px' @on-change="changemtintegral1"></InputNumber>
									&nbsp;&nbsp;{{$t('member.marketingHome.jf')}}<!--积分-->
								</div>
								
							</div>
						</div>
			        </TabPane>
			        <Button type="ghost" @click="cancelHome" size="small" slot="extra" style='margin-top:3px;margin-right:20px'>返回</Button>
			    </Tabs>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
	
	data(){
		return{
			//注册奖励
			chargeMoney:0,//赠送现金券 
			discount:1,//消费折扣 
			mtintegral:0,//消费积分 
			//生日特权
			mtintegral1:0,//消费积分 
			discount1:1,//消费折扣
			numIndex:0,
			uid: this.$store.state.common.token,
			user:this.$store.state.common.user,
			leftList:[
				{
					title:this.$t('member.marketingHome.Btq'),//"生日特权",
					id:0
				},
				
			],
		}
	},
	methods:{
		changediscount1(s){
			this.discount1=s
		},
		changemtintegral1(s){
			this.mtintegral1=s
		},
		//生日奖励
		saveRegist1(){
			this.axios.put('crmop/ubirth?uid='+this.uid,{
				discount:this.discount1,//消费折扣 
				mtintegral:this.mtintegral1,//消费积分 
			}).then(res=>{
				if(res.data.status==200){
					
					this.$notify({
                        title:"",//
                        message: this.$t('public.SaveSuccess'),//
                        type: 'success',
                        position: 'bottom-right'
                    });
					this.discount1=1//消费折扣 
					this.mtintegral1=''//消费积分 
					this.getB()
				}else{
					this.$notify({
                        title:"",//
                        message:res.data.errorMessage,
                        type: 'error',
                        position: 'bottom-right'
                    });
				}
			})
		},
		
		//点击li
		clickli(index){
			this.numIndex=index
			if(index==0){
				//GET /crmop/vbirth 生日优惠详情
				this.getB()
			}
		},
		cancelHome(){
			this.$router.push('/operationhome')
		},
		//生日奖励
		getB(){
			this.axios.get('/crmop/vbirth?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data.rows
					console.log(data)
					if( data==undefined){
						this.discount1=1//消费折扣 
						this.mtintegral1=0//消费积分 
					}else{
						this.discount1=res.data.rows.discount//消费折扣 
						this.mtintegral1=res.data.rows.mtintegral//消费积分
					}
						
				}
			})
		},
	},
	mounted(){
		this.getB()
	},
}
</script>
<style type="text/css" scoped>
.head{
	height:40px;
	line-height: 40px;
	width:100%;
	display:flex;
	justify-content: space-between;
	border-bottom:1px solid #e4e4e4;
}
.main{
	width:100%;
	height:100%;
	display:flex;
	background: rgb(230,233,236);
	overflow: hidden;
}
.main-left{
	width: 120px;
	margin-right: 3px;
	flex: 0 0 120px;
	font-size: 14px;
	background: #fff;
	
}
.main-right{
	/*position:fixed;*/
	width:100%;
	height:100%;
	overflow: auto;
	/*margin-left:19%;*/
	
	background: #fff
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
	background:rgb(241,245,247);
	color:rgb(59,119,227);
}
.yscontent{
	margin:20px;
}
.list{
	display:flex;
	height:35px;
	line-height: 35px;
	margin:5px 0;
}
  .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
        border-radius: 0;
        background: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
        border-top: 1px solid #3399ff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }
.mtewm{
	width:100%;
	
	display:flex;
	padding: 0px 200px 0 200px;

	justify-content: center;
	align-items: center;
	flex-direction: column;
    	
}
.mtewm span{
	width:260px;
	height:30px;
	line-height: 30px;
	font-weight:600;
	text-align: center
}
.mtewm div{
	width:260px;
	height:60px;
	line-height: 35px;
	
}

.ygewm{
	 padding:10px;
	width:100%;
	height:100%;
	/*border:1px solid red;*/
	display: flex;
	flex-wrap: wrap;
	 justify-content: center;
    align-items: center;
	background: #fff
}
.ygewm-list{
    margin: 10px;
    height: 195px;
    width: 18%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
}
.page-box{
	width:100%;
	margin-right:56px;
	margin-top:15px;
	text-align: right
}
.bottom-btn{
	width:100%;
	height:80px;
	/*border:1px solid red;*/
	margin-top:10px;
	background: #f8f8f8;
	line-height: 80px;
	margin-right:56px;
	margin-bottom:90px;
	text-align:right;

}
</style>
<style type="text/css">
.ivu-tabs .ivu-tabs-content-animated{
    	height:100%!important;
    }

</style>