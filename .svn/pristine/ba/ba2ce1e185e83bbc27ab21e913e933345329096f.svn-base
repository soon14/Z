<template>
	<div>
		<div class='main'>
			<div class='main-left'>
				<div>
					<div style='height:60px;display:block;font-size:16px;font-weight:600;border-bottom:1px solid #e4e4e4;line-height:60px'>
					<span style='margin-left:20px;'>{{$t('member.marketingHome.crmyx')}}</span><!--会员营销-->
					</div>
					<div class='lilist'>
						<li v-for='(item,index) in leftList' :key='index' @click='clickli(index)' :class='{bg:numIndex==index}'>
							<span>{{item.title}}</span>
						</li>
					</div>	
				</div>
			</div>
			<div class='main-right'>
				<!--注册-->
				<div v-if='numIndex==0'>
					<div class='head' >
						<span style='font-size:16px;font-weight:600;margin-left:20px;'>{{$t('member.marketingHome.registerJL')}}</span><!--注册奖励-->
						<div>
						<Button shape="circle"  style="background:#3b77e3;margin-right:15px;color:#fff;border:none" @click="saveRegist" >
							<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}</Button>
							</div>
					</div>
					<div class='yscontent'>
						<div class='list'>
							<span style='width:80px;text-align:right'>{{$t('member.marketingHome.sendM')}}：&nbsp;&nbsp;</span><!--赠送现金券：-->
							<Input style='width:120px' v-model='chargeMoney' number></Input>
							&nbsp;&nbsp;{{$t('member.marketingHome.yuan')}}<!--元-->
						</div>
						<div class='list'>
							<span style='width:80px;text-align:right'>{{$t('member.marketingHome.xfDis')}}： &nbsp;&nbsp;</span><!--消费折扣-->
							<Input style='width:120px' v-model='discount' number></Input>
							&nbsp;&nbsp;{{$t('member.marketingHome.Dis')}}<!--折-->
						</div>
						<div class='list'>
							<span style='width:80px;text-align:right'>{{$t('member.marketingHome.xfjf')}}：&nbsp;&nbsp;</span><!--消费积分-->
							<Input style='width:120px' v-model='mtintegral' number></Input>
							&nbsp;&nbsp;{{$t('member.marketingHome.jf')}}<!--积分-->
						</div>
						
					</div>
				</div>
				<!--生日-->
				<div v-if='numIndex==1'>
					<div class='head' >
						<span style='font-size:16px;font-weight:600;margin-left:20px;'>{{$t('member.marketingHome.Btq')}}</span><!--生日特权-->
						<div>
						<Button shape="circle"  style="background:#3b77e3;margin-right:15px;color:#fff;border:none" @click="saveRegist1" >
							<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}</Button>
							</div>
					</div>
					<div class='yscontent'>
						<div class='list'>
							<span style='text-align:right'>{{$t('member.marketingHome.xfDis')}}： &nbsp;&nbsp;</span>
							<Input style='width:120px;margin-left:-2px' v-model='discount1' number></Input>
							&nbsp;&nbsp;{{$t('member.marketingHome.Dis')}}<!--折-->
						</div>
						<div class='list'>
							<span style='text-align:right'>{{$t('member.marketingHome.xfjf')}}：&nbsp;&nbsp;</span>
							<Input style='width:120px' v-model='mtintegral1' number></Input>
							&nbsp;&nbsp;{{$t('member.marketingHome.jf')}}<!--积分-->
						</div>
						
					</div>
				</div>
				<div v-if='numIndex==2' style='height:100%;padding-top:10px;padding-left:10px;background: #fff'>
					
			            <Tabs type="card">
			                <TabPane :label="$t('member.marketingHome.myewm')"><!--我的会员吗-->
			                	<div class='mtewm'>
			                		<span style='font-size:16px'>{{myEwm.name}}</span>
			                		<img :src="myEwm.qrcodeUrl" width='260' height='260'>
			                		<span style='text-align:left;margin:6px 0;display:inline-block'>{{$t('member.marketingHome.ewmxf')}}<span style='margin-left:10px;color:#E6865A;'>{{myEwm.syscode}}</span>&nbsp;{{$t('member.marketingHome.P')}}</span>
			                		<!--该码已吸粉-->
			                		<div>
			                			 <Button type="ghost" style='width:80px;height:36px;border:1px solid #3B77E3' @click='reload'>
			                			 {{$t('member.marketingHome.reload')}}</Button><!--刷新-->
			                			  <Button type="primary" style='width: 165px;margin-left: 10px;border:none;height:36px;' >
											
			                			  <a :href="myEwm.qrcodeUrl" target='_blank' download style='color:#fff'>{{$t('member.marketingHome.downEwm')}}</a>
										  <!--下载二维码-->
			                			</Button>

			                		</div>
			                	</div>

			                </TabPane>
			                <TabPane :label="$t('member.marketingHome.crmEwm')"><!--员工二维码-->
			                	<div class='ygewm' >
			                		<div v-for='(i,index) in ygEwm' :key='index' class='ygewm-list' @click='clickradio(i,index)'>
			                			<span style='font-size:16px;font-weight:600'>
			                				<Radio :value="ygewmIndex==index" @on-change='change'>{{i.name}}</Radio>
			                			</span>
			                			<img :src="i.qrcodeUrl" width='130' height='130'>
			                			<span style='text-align:center;display:inline-block'>{{$t('member.marketingHome.ewmxf')}}<span style='margin-left:10px;color:#E6865A;'>{{i.syscode}}</span>&nbsp;{{$t('member.marketingHome.P')}}</span>
			                		</div>
			                		<!--底部的分页-->
									<div class="page-box" v-if='total!=0'>
										 <Page :total="total" show-total  :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
									</div>
									<div class='bottom-btn' v-if='total!=0'>
										<div>
				                			 <Button type="ghost" style='width:80px;height:36px;border:1px solid #3B77E3' @click='ygReload'>{{$t('member.marketingHome.reload')}}</Button>
				                			  <Button type="primary" style='width: 165px;margin-left: 10px;border:none;height:36px;'>
				                				<a :href="url" style='color:#fff' target='_blank'>{{$t('member.marketingHome.downEwm')}}</a> 
				                			</Button>
				                		</div>
									</div>
			                	</div>
			                	
			                </TabPane>
			                <TabPane :label="$t('member.marketingHome.storeEwm')">
			                	<div class='mtewm'>
			                		<span style='font-size:16px'>{{storeEwm.name}}</span>
			                		<img :src="storeEwm.qrcodeUrl" width='260' height='260'>
			                		<span style='text-align:left;margin:6px 0;display:inline-block'>{{$t('member.marketingHome.ewmxf')}}<span style='margin-left:10px;color:#E6865A;'>{{storeEwm.syscode}}</span>&nbsp;{{$t('member.marketingHome.P')}}</span>
			                		<div>
			                			 <Button type="ghost" style='width:80px;height:36px;border:1px solid #3B77E3' @click='storeReload'>{{$t('member.marketingHome.reload')}}</Button>
			                			  <Button type="primary" style='width: 165px;margin-left: 10px;border:none;height:36px;'>
			                			  <a :href="storeEwm.qrcodeUrl" style='color:#fff' target='_blank'>{{$t('member.marketingHome.downEwm')}}</a>
			                			</Button>
			                		</div>
			                	</div>
			                </TabPane>
			                <TabPane :label="$t('member.marketingHome.AllstoreEwm')">
			                	<div class='ygewm' >
			                		<div v-for='(i,index) in storesEwm' :key='index' class='ygewm-list' @click='clickradio1(i,index)'>
			                			<span style='font-size:16px;font-weight:600'>
			                				<Radio :value="ygewmIndex1==index" @on-change='change'>{{i.name}}</Radio>
			                			</span>
			                			<img :src="i.qrcodeUrl" width='130' height='130'>
			                			<span style='text-align:center;display:inline-block'>{{$t('member.marketingHome.ewmxf')}}<span style='margin-left:10px;color:#E6865A;'>{{i.storeEwm}}</span>&nbsp;{{$t('member.marketingHome.P')}}</span>
			                		</div>
			                		<!--底部的分页-->
									<div class="page-box" v-if='total1!==0'>
										 <Page :total="total1" show-total  :pageSize='pageSize1'  @on-change="getData1" @on-page-size-change="changePageSize1"></Page>
									</div>
									<div class='bottom-btn' v-if='total1!=0'>
										<div>
				                			 <Button type="ghost" style='width:80px;height:36px;border:1px solid #3B77E3' @click='storesReload'>{{$t('member.marketingHome.reload')}}</Button>
				                			  <Button type="primary" style='width: 165px;margin-left: 10px;border:none;height:36px;'>
				                			  <a :href="url1" style='color:#fff' target='_blank'>{{$t('member.marketingHome.downEwm')}}</a> 
				                			</Button>
				                		</div>
									</div>
			                	</div>
			                </TabPane>
			            </Tabs>
			       
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">

export default{
	
	data(){
		return{
			//注册奖励
			chargeMoney:'',//赠送现金券 
			discount:'',//消费折扣 
			mtintegral:'',//消费积分 
			//生日特权
			mtintegral1:'',//消费积分 
			discount1:'',//消费折扣 

			url1:"",
			url:"",
			ygEwm:[],//员工二维码
			myEwm:{},//我的二维码
			storesEwm:[],//d店铺二维码
			storeEwm:{},//当前店铺二维码
			total:0,
			pageSize:0,
			total1:0,
			pageSize1:0,
			dataList:[],
			ygewmIndex:-1,
			ygewmIndex1:-1,
			ewmissure:false,
			numIndex:0,
			uid: this.$store.state.common.token,
			user:this.$store.state.common.user,
			leftList:[
				{
					title:this.$t('member.marketingHome.registerJL'),//"注册奖励",
					id:0
				},
				{
					title:this.$t('member.marketingHome.Btq'),//"生日特权",
					id:1
				},
				{
					title:this.$t('member.marketingHome.xfmDown'),//"吸粉码下载",
					id:2
				},
			],
			//下拉框
			type:1,
			orderListname:[
				{
					label:'优惠券',
					value:1
				},
			],
			single:false,
			keyword:'',//输入框搜索值
		}
	},
	methods:{
		//注册奖励
		saveRegist(){
			this.axios.put('crmop/unew?uid='+this.uid,{
				chargeMoney:this.chargeMoney,//赠送现金券 
				discount:this.discount,//消费折扣 
				mtintegral:this.mtintegral,//消费积分 
			}).then(res=>{
				if(res.data.status==200){
					
					this.$notify({
                        title:"",//
                       message: this.$t('public.SaveSuccess'),//
                        type: 'success',
                        position: 'bottom-right'
                    });
					this.chargeMoney=''//赠送现金券 
					this.discount=''//消费折扣 
					this.mtintegral=''//消费积分
					this.getRegist() 
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
					
					this.discount1=''//消费折扣 
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
		//下拉搜索
		orderselected(value){

		},
		//注册奖励
		getRegist(){
			this.axios.get('/crmop/vnew?uid='+this.uid).then(res=>{
				
				if(res.data.status==200){
					let data=res.data.rows
					// var arr = Object.keys(data)
					if(data==null){
						this.chargeMoney=''//赠送现金券 
						this.discount=''//消费折扣 
						this.mtintegral=''//消费积分 
						
					}else{
						this.chargeMoney=res.data.rows.chargeMoney//赠送现金券 
						this.discount=res.data.rows.discount//消费折扣 
						this.mtintegral=res.data.rows.mtintegral//消费积分
						
					}
						
				}
			})
		},
		//点击li
		clickli(index){
			this.numIndex=index
			if(index==0){
			
				//GET /crmop/vnew 注册优惠详情
				this.getRegist()
			}
			if(index==1){
				//GET /crmop/vbirth 生日优惠详情
				this.getB()
			}
		},
		//生日奖励
		getB(){
			this.axios.get('/crmop/vbirth?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data.rows
					console.log(data)
					if( data==null){
						this.discount1=''//消费折扣 
						this.mtintegral1=''//消费积分 
					}else{
						this.discount1=res.data.rows.discount//消费折扣 
						this.mtintegral1=res.data.rows.mtintegral//消费积分
					}
						
				}
			})
		},
		orderselected(value){
			this.type=value
		},
		//员工
		clickradio(i,index){
			this.url=i.qrcodeUrl
			this.ygewmIndex=index
		},
		//店铺
		clickradio1(i,index){
			this.url1=i.qrcodeUrl
			this.ygewmIndex1=index
		},
		change(v){
			console.log(v)
		},
		//获取我的二维码
		getMyEwm(){
			this.axios.get('crmqr/now?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					
					this.myEwm=res.data.rows
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
		//刷新我的二维码
		reload(){
			this.getMyEwm()
		},
		//获取员工维码
		getygEwm(){
			this.axios.get('crmqr/empq?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					console.log(res.data.rows)
					this.ygEwm=res.data.rows
					this.total=res.data.total
					this.pageSize=res.data.pageSize
				}
			})
		},
		//刷新员工二维码
		ygReload(){
			this.getMyEwm()
		},
		//当前店铺二维码
		getstore(){
			this.axios.get('crmqr/store?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.storeEwm=res.data.rows
				}
			})
		},
		//当前店铺会员二维码
		getstores(){
			this.axios.get('crmqr/stoq?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.storesEwm=res.data.rows
					this.total1=res.data.total
					this.pageSize1=res.data.pageSize
				}
			})
		},
		//刷新店铺会员二维码
		storesReload(){
			this.getstores()
		},
		//刷新当前店铺二维码
		storeReload(){
			this.getstore()
		},
		//员工二维码切换一条页
		getData(current){
			this.axios.get('crmqr/empq?offset='+current+'&uid='+this.uid).then((res)=>{
				this.ygEwm=res.data.rows
				this.total=res.data.total
				this.pageSize=res.data.pageSize
				
			})
		},
		//翻页
		changePageSize(size){
			this.pageSize = size
		},
		//店铺会员二维码切换一条页
		getData1(current){
			this.axios.get('crmqr/stoq?offset='+current+'&uid='+this.uid).then((res)=>{
				this.storesEwm=res.data.rows
				this.total1=res.data.total
				this.pageSize1=res.data.pageSize
				
			})
		},
		//翻页
		changePageSize1(size){
			this.pageSize1 = size
		},
		
	},
	mounted(){
		this.getRegist()
		this.getMyEwm()//我的二维码
		this.getygEwm()//员工二维码
		this.getstore()//当前店铺二维码
		this.getstores()//当前店铺会员二维码
	},
}
</script>
<style type="text/css" scoped>
.head{
	height:60px;
	line-height: 60px;
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