<template>
	<!--会员报表-->
	<div class="units-box">
		<div style='display:flex;height:100%'>
			<Tabs :animated="false"  style="background:#fff;width:100%;height:100%" @on-click="getfhlistbg">
		        <TabPane label="会员消费">
		        	<!--会员消费-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;'>
							
							<div>
							<!-- 	<Button type="primary" shape="circle" @click="cliskImport(0)" style='margin-top:10px;margin-right:10px' >
								 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>导出
								</Button> -->
							</div>
						</div>
						<div style='margin:0 10px'>
							<Table border highlight-row :columns="columns" :data="dataList" @on-row-click='clickxf'></Table>
							<!--@on-row-dblclick="dbl" @on-select="selected"-->
							<!--底部的分页-->
							<div class="page-box">
								 <Page :total="total" show-total size="small" :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="会员充值">
					<div class="table">
						<div style='display:flex;justify-content: space-between;'>
							
							<div>
								<!-- <Button type="primary" shape="circle" @click="cliskImport(1)" style='margin-top:10px;margin-right:10px' >
								 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>导出
								</Button> -->
							</div>
						</div>
						<div style='margin:0 10px'>
							<Table border  highlight-row  :columns="crmCZcolumns" :data="crmCZdataList" @on-row-click='clickcz'></Table>
							<!--@on-row-dblclick="dbl" @on-select="selected"-->
							<!--底部的分页-->
							<div class="page-box">
								 <Page :total="cztotal" show-total size="small" :pageSize='czpageSize'  @on-change="czgetData" @on-page-size-change="czchangePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="会员日报">
		        	<!--会员日报-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;'>
							<div  style='display:flex;height:50px;line-height:50px'>
					
								<!-- <Input style='margin-top:10px;width:300px;' v-model='dayReportSearch' :placeholder="$t('public.codeandname')">
			                    <span slot="append" style='cursor:pointer' @click='dayReportsearch'>{{$t('public.search')}}</span>
				                </Input> -->
				                <span style='text-align: right;width: 100px;'>{{$t('sales.quotation.startTime')}}：</span> <!--下单时间：-->
								<DatePicker type="date"  :value='searchDate' style="width: 160px;margin-top:10px" placeholder="Start time" @on-change='searchDate1'></DatePicker>
								<span style='margin-left: 6px;'>{{$t('sales.quotation.endTime')}}：</span>
								<DatePicker type="date"  :value='searchDate2' style="width: 160px;margin-top:10px" placeholder="End time" @on-change='searchDate21'></DatePicker>
								<div style="margin-left:5px;color:#fff">
									<Button type="primary" shape="circle" @click="dayReportsearch">
										 <Icon type="ios-search" style="margin-right:5px;color:#fff"></Icon>{{$t('public.search')}}
									</Button>
								</div>
				                <!-- <a style='font-size:14px;font-weight:600;margin-left:10px;margin-right:20px;border-bottom:1px solid #3b77e3;height:40px' @click='searchNo1(3)'>{{$t('public.PreciseSearch')}}</a> -->
							</div>
							<div>
								<Button type="primary" shape="circle" @click="cliskImport(2)" style='margin-top:10px;margin-right:10px' >
								 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>导出
								</Button>
							</div>
						</div>
					<div style='margin:0 10px'>
							<Table border  highlight-row  :columns="crmDAYcolumns" :data="crmDAYdataList" ></Table>
							<!--@on-row-dblclick="dbl" @on-select="selected"-->
							<!--底部的分页-->
							<div class="page-box">
								 <Page :total="DAYtotal" show-total size="small" :pageSize='DAYpageSize'  @on-change="DAYgetData" @on-page-size-change="DAYchangePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="会员统计">
		        	<!--会员统计-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;'>
							<span  style='display:flex;height:50px;line-height:50px'>
								
								<div style='display:flex;line-height:50px'>
									<span style='text-align: right;width: 100px;'>{{$t('sales.quotation.startTime')}}：</span> <!--下单时间：-->
									<DatePicker type="date"  :value='searchDateCRM' style="width: 160px;margin-top:10px" placeholder="Start time" @on-change='searchDate1CRM'></DatePicker>
									<span style='margin-left: 6px;'>{{$t('sales.quotation.endTime')}}：</span>
									<DatePicker type="date"  :value='searchDate2CRM' style="width: 160px;margin-top:10px" placeholder="End time" @on-change='searchDate21CRM'></DatePicker>
									<div style="margin-left:5px;color:#fff">
										<Button type="primary" shape="circle" @click="dayReportsearchCRM">
											 <Icon type="ios-search" style="margin-right:5px;color:#fff"></Icon>{{$t('public.search')}}
										</Button>
									</div>
								</div>
							</span>
							
							<div>
								<Button type="primary" shape="circle" @click="cliskImportCRM" style='margin-top:10px;margin-right:10px' >
								 <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>
								 {{$t('public.export')}}
								</Button>
							</div>
						</div>
						<div style='margin:0 10px'>
							<Table border  highlight-row  :columns="crmDAYcolumnsCRM" :data="crmDAYdataListCRM"></Table>
							<!--@on-row-dblclick="dbl" @on-select="selected"-->
							<!--底部的分页-->
							<div class="page-box">
								 <Page :total="DAYtotalCRM" show-total size="small" :pageSize='DAYpageSizeCRM'  @on-change="DAYgetDataCRM" @on-page-size-change="DAYchangePageSizeCRM"></Page>
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
				cztotal:0,
				czpageSize:0,
				crmCZdataList:[],//会员消充值组
				czData:{},
				//会员充值key
				crmCZcolumns: [
					
					{
						title: this.$t('data.crm.bdtype'),//'变动类型',
						
						ellipsis:true,
						key: 'title'
					},
					
					{
						title: this.$t('data.crm.code'),//title: '会员编号',
						ellipsis:true,
						
						key: 'crmId'
					},
					{
						title: this.$t('data.crm.Ccode'),//title: '会员卡号',
						ellipsis:true,
					
						key: 'crmCode'
					},
					{
						title: this.$t('data.crm.crmName'),//title: '会员名称',
						ellipsis:true,
						
						key: 'crmName'
					},
					{
						title: this.$t('data.crm.cztype'),//title: '充值方式',
						ellipsis:true,
						
						key: 'userDef01'
					},
					{
						title: this.$t('data.crm.czqje'),//title:"充值前金额",
					
						ellipsis:true,
						key:"xfq"
					},
					{
						title: this.$t('data.crm.czMoney'),//title:"充值金额",
						
						ellipsis:true,
						key:"xfje"
					},
					{
						title: this.$t('data.crm.czhje'),//title: '充值后余额',
						ellipsis:true,
					
						key: 'xfh'
					},
					// {
					// 	title:"操作",
					// 	key:'action',
					// 	render:(h,p)=>{
					// 		return h('Button',{

					// 		},'打印')
					// 	}
					// }
				],
				//会员日报
				DAYtotal:0,
				DAYpageSize:0,
				crmDAYdataList:[],
				crmDAYcolumns:[
					{
						title:"日期",
						key:"crmCreateTime"
					},
					{
						title:"新增会员数",
						key:"crmCount"
					},
					{
						title:"会员总数",
						key:"crmTotal"
					},
				],
				fhlist:[
					
					{
						label:this.$t('data.crm.crmxf'),//"会员消费",
						value:0
					},
					{
						label:this.$t('data.crm.crmcz'),//"会员充值",
						value:1
					},
					{
						label:"会员日报",//"会员日报",
						value:2
					},
					{
						label:"会员统计",//"会员日报",
						value:3
					},
					
				],
				total: 0,
				pageSize: 0,
				valId:"",
				type:'',//下拉选中
				uid: this.$store.state.common.token,
				fhindex:0,//点击左侧的下标
				row:{},
				isLoading:true,
				visible: false,
				xfData:{},
				dataList: [], //会员消费数组
				columns: [
					
					{
						title: this.$t('data.crm.bdtype'),//'变动类型',
						key: 'title'
					},
					
					{
						title: this.$t('data.crm.code'),//title: '会员编号',
						
						key: 'crmId'
					},
					{
						title: this.$t('data.crm.Ccode'),//title: '会员卡号',
						key: 'crmCode'
					},
					{
						title: this.$t('data.crm.crmName'),//title: '会员名称',
						key: 'crmName'
					},
					{
						title:this.$t('data.crm.xftype'),// '消费方式',
						key: 'userDef01'
					},
					{
						title:this.$t('data.crm.xfqje'),//"消费前金额",
						key:"xfq"
					},
					{
						title:this.$t('data.crm.czMoney'),//"消费金额",
						
						key:"xfje"
					},
					{
						title: this.$t('data.crm.xfhje'),//'消费后余额',
						key: 'xfh'
					},
				],
				searchDateCRM:"",
				searchDate2CRM:"",
				//会员统计
				DAYtotalCRM:0,
				DAYpageSizeCRM:0,
				crmDAYdataListCRM:[],
				crmDAYcolumnsCRM:[
					{
						title:this.$t('manage.store.Ctime'),//
						key:"crmCreateTime"
					},
					{
						title:this.$t('member.code'),
						key:"crmCode"
					},
					{
						title:this.$t('member.name'),
						key:"crmName"
					},
					{
						title:this.$t('member.level'),
						key:"crmLevel"
					},
					{
						title:"最后下单时间",
						key:"orderLastDate"
					},
					{
						title:this.$t('member.jf'),
						key:"crmPoint"
					},
					{
						title:this.$t('member.orderCount'),
						key:"orderCount"
					},
					{
						title:this.$t('member.orderAmount'),
						key:"orderAmount"
					},
				],

			}
		},
		methods: {
			//日期
			searchDate1(v){
				this.searchDate=v
			},
			searchDate21(v){
				this.searchDate2=v
			},
			//搜索
			dayReportsearch(){
				this.getDAY()
			},
			//获取会员日报
			getDAY(){
				this.axios.get('statement/crmDayStatement?uid='+this.uid,{
					params:{
						beginTime:this.searchDate,
						endTime:this.searchDate2,
					}
				}).then(res=>{
					if(res.data.status==200){
						this.crmDAYdataList=res.data.rows
						this.DAYtotal=res.data.total,
						this.DAYpageSize=res.data.pageSize
					}
				})
			},
			//会员日报翻页
			DAYgetData(current){
				this.axios.get('statement/crmDayStatement?offset='+current+'&uid='+this.uid,{
					params:{
						beginTime:this.searchDate,
						endTime:this.searchDate2,
					}
				}).then(res=>{
					if(res.data.status==200){
						this.crmDAYdataList=res.data.rows
						this.DAYtotal=res.data.total,
						this.DAYpageSize=res.data.pageSize
					}
				})
			},
			DAYchangePageSize(size){
				this.DAYpageSize=size
			},
			//切换
			getfhlistbg(index){
				this.fhindex=index
				//会员消费
				if(this.fhindex==0){
					this.getcgList()
				}
				//会员充值
				if(this.fhindex==1){
					this.getcz()
				}
				if(this.fhindex==2){
					this.getDAY()
				}
				//会员统计
				if(this.fhindex==3){
					this.getDAYCRM()
				}
			},
			//获取会员消费列表
			getcgList: function() {
				this.axios.get('hybb/consum?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						
						this.dataList=res.data.rows
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						
						this.dataList.forEach((x)=>{
							
							x.xfq=Math.floor(x.xfqje * 100) / 100
							x.xfh=Math.floor(x.xfhje * 100) / 100
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
					}
				})
			},
			clickcz(data){
				this.czData=data
			},
			//单击一行消费
			clickxf(data){
				this.xfData=data
			},
			//GET /hybb/econsum 导出会员消费
			cliskImport(n){
				if(n==0){
					this.axios.get('/hybb/econsum?uid='+this.uid,{
						params:{
							// id:this.xfData.id,
	        				title:this.xfData.title,
	        				crmId:this.xfData.crmId,
	        				crmCode:this.xfData.crmCode,
	        				crmName:this.xfData.crmName,
	        				userDef01:this.xfData.userDef01,
	        				xfq:this.xfData.xfq,
	        				xfje:this.xfData.xfje,
	        				xfh:this.xfData.xfh,
	        			}
					}).then(res=>{
						console.log(res)
						// window.location.href=res.request.responseURL
					})
				}
				//GET /hybb/erecharge 导出会员充值
				if(n==1){
					this.axios.get('/hybb/erecharge?uid='+this.uid,{
						params:{
							// id:this.xfData.id,
	        				title:this.czData.title,
	        				crmId:this.czData.crmId,
	        				crmCode:this.czData.crmCode,
	        				crmName:this.czData.crmName,
	        				userDef01:this.czData.userDef01,
	        				xfq:this.czData.xfq,
	        				xfje:this.czData.xfje,
	        				xfh:this.czData.xfh,
	        			}
					}).then(res=>{
						console.log(res)
						// window.location.href=res.request.responseURL
					})
				}
				//会员导出
				if(n==2){
					this.axios.get('crmExport/crmExcel?uid='+this.uid,{
	            		params:{
							beginTime:this.searchDate,
							endTime:this.searchDate2,
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
						}
	            	})
				}
				
			},
			//会员充值
			getcz(){
				this.axios.get('hybb/recharge?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						
						this.crmdataList=res.data.rows
						this.cztotal=res.data.total
						this.czpageSize=res.data.pageSize
						this.crmdataList.forEach((x)=>{
						
							x.xfq=Math.floor(x.xfqje * 100) / 100
							x.xfh=Math.floor(x.xfhje * 100) / 100
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
					}
				})
			},
			//表格选中时的数据，数组
			selected(selection,row){
				this.valId = row.id
				this.row = row
			},
			 //会员消费切换一条页
            getData(current){
                this.axios.get('/hybb/consum?offset='+current+'&uid='+this.uid).then((res)=>{
                    this.dataList = res.data.rows
                    this.dataList.forEach((x)=>{
							x.xfq=Math.floor(x.xfqje * 100) / 100
							x.xfh=Math.floor(x.xfhje * 100) / 100
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
            },
             //会员充值切换一条页
            czgetData(current){
                this.axios.get('/hybb/recharge?offset='+current+'&uid='+this.uid).then((res)=>{
                    this.czpageSize = res.data.rows
                    this.czpageSize.forEach((x)=>{
							x.xfq=Math.floor(x.xfqje * 100) / 100
							x.xfh=Math.floor(x.xfhje * 100) / 100
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
                })
            },
            //翻页
            czchangePageSize(size){
                this.czpageSize = size
            },



            /////会员统计
			//日期
			searchDate1CRM(v){
				this.searchDateCRM=v
			},
			searchDate21CRM(v){
				this.searchDate2CRM=v
			},
			//搜索
			dayReportsearchCRM(){
				this.getDAYCRM()
			},
			//获取GET /statement/ynCrmStatement 印尼会员报表
			getDAYCRM(){
				this.axios.get('/statement/ynCrmStatement?uid='+this.uid,{
					params:{
						beginTime:this.searchDateCRM,
						endTime:this.searchDate2CRM,
					}
				}).then(res=>{
					if(res.data.status==200){
						this.crmDAYdataListCRM=res.data.rows
						this.DAYtotalCRM=res.data.total,
						this.DAYpageSizeCRM=res.data.pageSize
					}
				})
			},
			//会员日报翻页
			DAYgetDataCRM(current){
				this.axios.get('/statement/ynCrmStatement?offset='+current+'&uid='+this.uid,{
					params:{
						beginTime:this.searchDateCRM,
						endTime:this.searchDate2CRM,
					}
				}).then(res=>{
					if(res.data.status==200){
						this.crmDAYdataListCRM=res.data.rows
						this.DAYtotalCRM=res.data.total,
						this.DAYpageSizeCRM=res.data.pageSize
					}
				})
			},
			DAYchangePageSizeCRM(size){
				this.DAYpageSizeCRM=size
			},
			//GET /crmExport/crm 导出印尼会员报表
			cliskImportCRM(){
				//会员导出
					this.axios.get('/crmExport/crm?uid='+this.uid,{
	            		params:{
							beginTime:this.searchDateCRM,
							endTime:this.searchDate2CRM,
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
						}
	            	})
			
			},

            //获取当前前几天
            getBdate(){
		        var now = new Date();
    			var Days = now - 30*24*60*60*1000;
    			return new Date(Days)
		    },
            getDATE(){
            	let date=new Date()
				this.searchDate2=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
				this.searchDate2CRM=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
            },
		},
		mounted() {
			this.getcgList();//获取会员消费列表
			this.getDATE()
			this.searchDate=this.getBdate()
			this.searchDateCRM=this.getBdate()
		}
	}
</script>

<style lang="css" scoped>
p.edit:hover{
	color:blue;
}
	.units-box {
		width: 100%;
		height:100%;
		background: rgb(230,233,236)
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
    	margin-left:15px;
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
		background: #fff;
		overflow: auto;
	}
	.bor{
		background: #EBF1FC
	}
	.page-box {
		text-align: center;
		margin-top:2px;
		 margin-bottom:120px;
	}
	
</style>
