<template>
	<!--全部流水-->
	<div class="units-box">
		<div style='display:flex;height:100%;'>
			<Tabs :animated="false" style="background:#fff;width:100%;height:100%" @on-click="getfhlistbg">
		        <TabPane label="全部流水">
		        	<!--全部流水-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;border-bottom:1px solid #e4e4e4;line-height:50px'>
							<div style='display: flex;'>
								<Input style='margin-top:10px;width:300px' v-model='lskeyword' :placeholder="$t('finance.withdraw.orderNo')" @on-enter='entersSearchls' >
			                    	<span slot="append"  @click='searchls' style='cursor:pointer'>{{$t('public.search')}}</span>
			            		</Input>
		            		</div>
		            		<div>
								<span style='text-align: right;width: 100px;'>{{$t('orders.orderTime')}}：</span> <!--下单时间：-->
								<DatePicker type="date"  :value='searchDate' style="width: 140px" placeholder="请选择时间" @on-change='searchDate1'></DatePicker>
								<span style='margin-left: 6px;'>{{$t('operation.yhqHome.endTime')}}：</span>
								<DatePicker type="date"  :value='searchDate2' style="width: 140px;" placeholder="请选择时间" @on-change='searchDate21'></DatePicker>
							
								<Button type="primary"  shape="circle"  @click="orderSure" style='margin:0 10px'>
									<Icon type="document"></Icon>
								{{$t('public.export')}}<!--导出-if='issure'-->
								</Button>
							</div>
						</div>
						<div style='margin:10px 0'>
							<Table border highlight-row :columns="lsKey" :data="lsData" @on-row-click='clickRow'></Table>
							<div class="page-box">
							 <Page v-if='lstotal!=0' size="small" :total="lstotal" show-total  :pageSize='lspageSize'  @on-change="lsgetData" @on-page-size-change="lschangePageSize"></Page>
						</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="可提现清单">
		        	<!--可提现清单-->
					<div class="table">
						<div style='display:flex;border-bottom:1px solid #e4e4e4'>
							
							<Input style='margin-top:10px;width:300px' v-model='balancekeyword' :placeholder="$t('finance.withdraw.orderNo')" @on-enter='entersSearchbalance' >
		                    	<span slot="append"  @click='searchbalance' style='cursor:pointer'>{{$t('public.search')}}</span>
		            		</Input>
						</div>
						<div style='margin:10px 0'>
							<Table border :columns="balanceKey" :data="balanceData" ></Table>
							<div class="page-box">
								 <Page v-if='balancetotal!=0' size="small" :total="balancetotal" show-total  :pageSize='balancepageSize'  @on-change="balancegetData" @on-page-size-change="balancechangePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="提现记录">
		        	<!--提现记录-->
					<div class="table" >
						<div style='display:flex;border-bottom:1px solid #e4e4e4'>
							
							<Input style='margin-top:10px;width:300px' v-model='kxkeyword' :placeholder="$t('finance.withdraw.orderNo')" @on-enter='entersSearchkx' >
		                    	<span slot="append"  @click='searchkx' style='cursor:pointer'>{{$t('public.search')}}</span>
		            		</Input>
						</div>
						<div style='margin:10px 0'>
							<Table border :columns="kxKey" :data="kxData" ></Table>
							<div class="page-box">
								 <Page v-if='kxtotal!=0' size="small" :total="kxtotal" show-total  :pageSize='kxpageSize'  @on-change="kxgetData" @on-page-size-change="kxchangePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		    </Tabs>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				searchDate:"",
				searchDate2:"",
				title:this.$t('finance.withdraw.allls'),//"全部流水",
				lskeyword:'',
				lstotal: 0,
				lspageSize: 0,
				lsData:[],
				lsKey:[
					{
						title:this.$t('finance.withdraw.rzhTime'),//"入账日期",
						key:"createTime",
						
						align:"center"
					},
					
					{
						title:this.$t('finance.withdraw.orderNo'),//"订单号",
						
						key:"orderNo"

					},
					
					{
						title:this.$t('finance.withdraw.store'),//"店铺",
						key:"storeName",
						
					},
					{
						title:this.$t('finance.withdraw.ey'),//"员工",
						key:"employeeName",
						
						align:"center",
					},
					
					{
						title:this.$t('finance.withdraw.amount'),//"金额",
						key:"total_fee",
						
						align:"center",
					},
					{
						title:this.$t('finance.withdraw.payType'),//"支付方式",
						key:"typeDesc",
						
						align:"center",
					},
					{
						title:this.$t('finance.withdraw.khInfo'),//"客户信息",
						key:"crmName",
						
					},
					
					{
						title:this.$t('public.action'),//"操作",
						key:"action",
						align:"center",
						width:120,
						render:(h,params)=>{
							return h('div',[
									h('span',{
										style:{
											display:params.row.status==0 && params.row.type==18?"block":"none",
											color:"rgb(59,119,227)",
											cursor:"pointer"
										},
										on:{
										'click':()=>{
												this.paid(params.row.orderNo)
											}
										},
									},this.$t('public.sk')),//'收款'
									h('span',{
										style:{
											display:params.row.status==88?"block":"none",
											color:"#666",
										},
									},this.$t('public.ysk')),//'已收款'
								])
						}
					}
					
				],
			
				//可提现清单
				balancekeyword:'',
				balancetotal: 0,
				balancepageSize: 0,
				balanceData:[],
				balanceKey:[
					
					{
						title:this.$t('finance.withdraw.orderNo'),//"订单号",
						key:"orderNo",
						width:180,
					},
					{
						title:this.$t('finance.withdraw.payNo'),//"支付编号",
						key:"payNo",
						width:180,
						align:"center"
					},
					{
						title:this.$t('finance.withdraw.amount'),//"金额",
						key:"amount",
						
						align:"center"
					},
					
					{
						title:this.$t('finance.withdraw.payType'),//"支付方式",
						key:"payTypeDesc",
						
						align:"center"
					},
					{
						title:this.$t('finance.withdraw.store'),//"店铺",
						key:"storeName",
						
						align:"center"
					},
					{
						title:this.$t('finance.withdraw.ey'),//"员工",
						key:"employeeName",
						
						align:"center"
					},
					{
						title:this.$t('finance.withdraw.title'),//"标题",
						key:"title",
						
						align:"center"
					},
					{
						title:this.$t('public.remark'),//"备注",
						key:"remark",
						
						
					}
				],
				
				fhindex:0,
				row:{},
				visible: false,
				fhlist:[
					{
						label:this.$t('finance.withdraw.allls'),//"全部流水",
						value:0
					},
					{
						label:this.$t('finance.withdraw.ktxls'),//"可提现流水",
						value:1
					},
					{
						label:this.$t('finance.withdraw.txjl'),//"提现记录",
						value:2
					},
				],
				valId:"",
				type:'',//下拉选中
				kxkeyword:'',
				kxtotal: 0,
				kxpageSize: 0,
				uid: this.$store.state.common.token,
				kxData: [], //提现记录
				kxKey:[
					{
						title:this.$t('finance.withdraw.lsNum'),//"流水号",
						key:"serialNumber",
						width:180,
						align:"center"
					},
					{
						title:this.$t('finance.withdraw.zhName'),//"账户名称",
						key:"accountName",
						width:180,
						align:"center"
					},
					{
						title:this.$t('finance.withdraw.amount'),//"金额",
						key:"amount",
						width:120,
						align:"center"
					},
					
					{
						title:this.$t('finance.withdraw.beforeMoney'),//"提现前金额",
						key:"beforeAmount",
						width:160,
						align:"center"
					},
					{
						title:this.$t('finance.withdraw.afterMoney'),//"提现后金额",
						key:"afterAmount",
						width:160,
						align:"center"
					},
					{
						title:"卡号",//"银行",
						key:"bankNo",
						width:120,
						align:"center"
					},
					{
						title:this.$t('finance.withdraw.bank'),//"银行",
						key:"bankName",
						width:120,
						align:"center"
					},
					{
						title:"创建时间",
						key:"createTime",
						width:180,
						align:"center"
					},
					{
						title:this.$t('finance.withdraw.successTime'),//"完成时间",
						key:"finishTime",
						width:180,
						align:"center"
					},
					{
						title:this.$t('public.status'),//"状态",
						key:"statusDesc",
						width:120,
						align:"center"
					},
					
				]

			}
		},
		methods: {
			searchDate1(v){
				this.searchDate=v
			},
			searchDate21(v){
				this.searchDate2=v
			},
			//导出GET /porder/excel 导出exce
			orderSure(){
				if(this.searchDate=='' || this.searchDate2==''){
					this.$notify({
						title:"",//
						message: this.$t('finance.selectTime'),
						type: 'error',
						position: 'bottom-right'
					});
				}else{
					this.axios.get('/porder/excel?uid='+this.uid,{
						params:{
							start:this.searchDate,
							end:this.searchDate2,
						}
					}).then(res=>{
						if(res.data!=null){
							this.$notify({
								title:"",//
								message: res.data.errorMessage,
								type: 'error',
								position: 'bottom-right'
							});
						}else{
							window.location.href=res.request.responseURL
							this.searchDate=''
							this.searchDate2=''
						}
						
					})
				}
				
			},
			//切换
			getfhlistbg(index){
				this.fhindex=index
				if(this.fhindex==0){
					this.title=this.$t('finance.withdraw.allls')//'全部流水'
					this.getls()
				}
				if(this.fhindex==1){
					this.title=this.$t('finance.withdraw.ktxls')//'可提现流水'
					this.getBalance()
				}
				if(this.fhindex==2){
					this.title=this.$t('finance.withdraw.txjl')//'提现记录'
					this.getkx()
				}
			},
			//流水账查询GET /porder/query 交易流水
			searchls(){
				this.axios.get('/porder/query?keyword='+this.lskeyword+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.lsData=res.data.rows
						this.lstotal=res.data.total
						this.lspageSize=res.data.pageSize
						this.lsData.forEach(x=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						
							
						})
					}
				})
			},
			//收款//GET /porder/paid/{orderNo} 
			paid(orderNo){
				this.axios.get('/porder/paid/'+orderNo+'?uid='+this.uid).then(res=>{
					
					if(res.data.status==200){
						this.$notify({
					        title:"",//
					        message: this.$t('public.ysk'),//'已收款',
					        type: 'success',
					        position: 'bottom-right'
				        });
				        this.getls()
					}else{
						this.$notify({
					        title:"",//
					        message: res.data.errorMessage,
					        type: 'success',
					        position: 'bottom-right'
				        });
					}
				})
			},
			clickRow(data){
				console.log(data)
			},
			//回车搜索
			entersSearchls(){
				this.searchls()
			},
			//交易流水
			getls(){
				this.axios.get('/porder/query?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.lsData=res.data.rows
						this.lstotal=res.data.total
						this.lspageSize=res.data.pageSize
						this.lsData.forEach(x=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							
						})
					}
				})
			},
			//交易流水翻页
			lsgetData(current){
				this.axios.get('/porder/query?offset='+current+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.lsData=res.data.rows
						this.lstotal=res.data.total
						this.lspageSize=res.data.pageSize
						this.lsData.forEach(x=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							
						})
					}
				})
			},
			lschangePageSize(size){
				this.lspageSize=size
			},
			//可提现清单搜索GET /porder/draw 可提现流水
			searchbalance(){
				this.axios.get('/porder/draw?keyword='+this.balancekeyword+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.balanceData=res.data.rows
						this.balancetotal=res.data.total
						this.balancepageSize=res.data.pageSize
						this.balanceData.forEach(x=>{
							
						})
					}
				})
			},
			//回车搜索
			entersSearchbalance(){
				this.searchbalance()
			},
			//可提现清单列表
			getBalance(){
				this.axios.get('/porder/draw?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.balanceData=res.data.rows
						this.balancetotal=res.data.total
						this.balancepageSize=res.data.pageSize
						this.balanceData.forEach(x=>{
							
							
						})
					}
				})
			},
			
			//可提现清单翻页
			balancegetData(current){
				this.axios.get('/porder/draw?offset='+current+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.balanceData=res.data.rows
						this.balancetotal=res.data.total
						this.balancepageSize=res.data.pageSize
						this.balanceData.forEach(x=>{
							
							
						})
					}
				})
			},
			balancechangePageSize(size){
				this.balancepageSize=size
			},
			//提现记录GET /porder/drawhis 提现流水历史
			getkx(){
				this.axios.get('/porder/drawhis?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.kxData=res.data.rows
						this.kxtotal=res.data.total
						this.kxpageSize=res.data.pageSize
						this.kxData.forEach(x=>{
							x.finishTime=new Date(x.finishTime).toLocaleString().replace(/\//g,'-')
							x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
						})
					}
					
				})
			},
			//提现记录搜索
			searchkx(){
				this.axios.get('/porder/drawhis?keyword='+this.kxkeyword+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.kxData=res.data.rows
						this.kxtotal=res.data.total
						this.kxpageSize=res.data.pageSize
						this.kxData.forEach(x=>{
							
							x.finishTime=new Date(x.finishTime).toLocaleString().replace(/\//g,'-')
							x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
						})
					}
				})
			},
			//回车搜索
			entersSearchkx(){
				this.searchkx()
			},
			//提现记录翻页
			kxgetData(current){
				this.axios.get('/porder/drawhis?offset='+current+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.kxData=res.data.rows
						this.kxtotal=res.data.total
						this.kxpageSize=res.data.pageSize
						this.kxData.forEach(x=>{
							x.finishTime=new Date(x.finishTime).toLocaleString().replace(/\//g,'-')
							x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
						})
					}
				})
			},
			kxchangePageSize(size){
				this.kxpageSize=size
			},
		},
		mounted() {
			this.getls()//交易流水
		}
	}
</script>

<style lang="css" scoped>
p.edit:hover{
	color:blue;
}
	.units-box {
		width: 100%;
		background: rgb(230,233,236);
		overflow: hidden;
	}
	.btns-box {
		width: 100%;
		height: 50px;
		display:flex;
		justify-content: space-between;
		background: #fff;
		line-height: 50px;
	}
	 .wldw{
    	margin-left: 15px;
    	font-size:18px;font-weight:bold;
    }
	.right{
		margin-right:10px;
		margin-bottom:10px;
	}
	.ivu-icon-chevron-down {
		font-size: 10px;
	}
	.btns img {
		width: 14px;
		height: 14px;
		vertical-align: middle;
	}
	.main-left{
		width: 120px;
	margin-right: 3px;
	flex: 0 0 120px;
	font-size: 14px;
	background: #fff;
	}
	.main-left li{
		list-style: none;
		padding:10px 0;
		width:100%;
		
	}
	.main-left li span{
		margin-left:20px;
	}
.table {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #fff;
    padding: 0 10px;
}
	.bor{
		background:rgb(241,245,247);
        color:rgb(59,119,227);
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
	 /*justify-content: center;*/
    text-align: center;
	/*justify-content: center;*/
	/*flex-direction: column*/
	background: #fff
}
.ygewm-list{
	margin:10px;
    height: 195px;
    width:17%;
    padding:10px;
    justify-content: center;
    text-align: center;
    border: 1px solid #ccc;
}
.page-box{
	width:100%;
	margin-right:56px;
	margin-top:15px;
	text-align: center;
	margin-bottom:120px;
}
.bottom-btn{
	width:100%;
	height:80px;
	/*border:1px solid red;*/
	margin-top:10px;
	background: #f8f8f8;
	line-height: 80px;
	margin-right:56px;
	text-align:right;

}
</style>
