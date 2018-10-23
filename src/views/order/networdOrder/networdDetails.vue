<template>
	<div class='addCrm'>
	<!--订单详情-->
		<div class="head">
			<!-- <Col span='6'> -->
				<div class="left-top">
					<p class="wldw">
						<span style="width:42px;font-weight:900">{{$t('public.screen')}}：</span>
						 <Select style="width:100px" @on-change="orderselected" v-model='value'>
					        <Option v-for="item in orderTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					    </Select>
					</p>
					<div></div>
				</div>
			<!-- </Col> -->
			<!-- <Col span='18'> -->
				<div class="right-top">
				<div style='position: absolute;left: 360px;'>
					<span style="margin-left:20px;font-size:19px;font-weight:900">{{orderno}}</span> 
				</div>
				<div style='margin-right:10px;position: absolute;right: 260px;'><!--导出|关闭|收款|发货|--><!--确定|提交仓库|发货中|已发货|已签收|已付款-->
					<Button type="ghost"  shape="circle"  @click="orderSure" class='but' v-if='issure'>
							<Icon type="checkmark-round"></Icon>
						{{$t('orders.issure')}}<!--确定v-if='issure'-->
					</Button>
					<Button type="ghost"  shape="circle"  @click="orderComit"  class='but' v-if='iscomit'>
							<Icon type="checkmark-round"></Icon>
						{{$t('orders.iscomit')}}<!--提交仓库 v-if='iscomit'-->
					</Button>
					<Button type="ghost"  shape="circle"  @click="orderfh"  class='but' v-if='isfh'>
							<Icon type="checkmark-round"></Icon>
						{{$t('orders.isfh')}}<!--发货中v-if='isfh'-->
					</Button>
					<Button type="ghost"  shape="circle"  @click="orderYfh"  class='but' v-if='isyfh'>
							<Icon type="checkmark-round"></Icon>
						{{$t('orders.isyfh')}}<!--已发货v-if='isyfh'-->
					</Button>
					<Button type="ghost"  shape="circle"  @click="orderYfk"  class='but' v-if='isyfk'>
							<Icon type="checkmark-round"></Icon>
						{{$t('orders.isyfk')}}<!--已付款v-if='isyfk'-->
					</Button>
					<Button type="ghost"  shape="circle"  @click="orderYqs"  class='but' v-if='isyqs'>
							<Icon type="checkmark-round"></Icon>
						{{$t('orders.isyqs')}}<!--已签收v-if='isyqs'-->
					</Button>
					<Button type="ghost"  shape="circle"  @click="orderCancel"  class='but' v-if='isycancel'>
							<Icon type="checkmark-round"></Icon>
						{{$t('orders.orderCancel')}}<!--取消订单-if='isyqs'-->
					</Button>
					

					<Button type="ghost"  shape="circle"  @click="exportOrder"  class='but' v-if='isexport'>
						 <Icon type="document" style="margin-right:5px;color:#fff"></Icon>
						导出
					</Button>
					<Button type="ghost"  shape="circle"  @click="Prin"  class='but' v-if='print'>
						<Icon type="ios-folder-outline" style="margin-right:5px;color:#fff"></Icon>
						打印
					</Button>
					<!-- <Button type="ghost"  shape="circle"  @click="orderWl"  class='but' v-if='isywl'>
							<Icon type="checkmark-round"></Icon>
						{{$t('orders.wl')}}
					</Button> -->
					
					<span @click="cancelHome" style="cursor:pointer"><Icon type="close" class="cha" ></Icon></span>
				</div>
					
				</div>
			<!-- </Col> -->
		</div>
		<div style='height:60px'></div>	
		<!--左侧列表-->
		<div class="left-content">
			<div class='locationSearch'>
				<Input style='padding:10px 20px' v-model='searchKeyword' :placeholder="$t('public.codeandname')" @on-enter='enterSearch'>
                <span slot="append"  @click='search' style='cursor:pointer;'>{{$t('public.search')}}</span>
                </Input>
			</div>
			<p v-if="AllOrderList.length==0" class='scrollFix'>
				<Spin>
	                 <div>{{$t('public.NoData')}}</div>
	            </Spin>
		    </p>
			<Scroll :on-reach-bottom="handleReachEdge" :height="height" v-else>
				<div class="con-list" v-for="(item,index) in AllOrderList" :key='index' @click="getcginfo(item.id,index)" :class="{bg:numIndex==index}">
					<span style="margin-right: 10px;">
                         <Checkbox :value="numIndex==index"></Checkbox>
						 
                     </span>
					 <div>
						<p class="list-title">{{item.orderNo}}</p>
						<p class="txt" style="margin-top:10px;">
							{{item.customerName}} 
							
						</p>
						<div class="lanrenLeft" :class="{bgd4:item.status==35,bgd5:item.status==30,bgd6:item.status==50,bgd7:item.status==10,bgd8:item.status==23,bgd9:item.status==1}">
		                    <span >{{item.statusDesc}}</span> 
		                </div>​
		                <span class="date1"><span style='color:#d53c39'>￥：{{item.amount}}</span></span>
					</div>
				</div>
				
			</Scroll>
		</div>
		<!--右侧-->
		<div class="add-right" >
			
			<!--详情-->
			<div class='right-right'>
				<el-steps :active="active" finish-status="success" :align-center='true' style='margin-left:30px' v-if='activeIsShow'>
					<el-step :title="$t('public.add')" :description="createTime"></el-step>
					<el-step :title="$t('orders.issure')"></el-step>
					<el-step :title="$t('orders.iscomit')"></el-step>
					<el-step :title="$t('orders.isfh')"></el-step>
					<el-step :title="$t('orders.isyfh')"></el-step>
					<el-step :title="$t('orders.isyfk')"></el-step>
					<el-step :title="$t('orders.isyqs')"></el-step>
					<el-step title="已完成"></el-step>
				</el-steps>
				<div class='top-info'>
					<div style='margin-right:20px;'>
						<li><span style='font-size:16px;color:#2B8F8F'>{{$t('orders.orderInfo')}}</span></li><!--订单信息-->
						<div style='display:flex'>
						<div>
							<li><span>{{$t('orders.orderNo')}}：</span>{{detailsOrder.orderNo}}</li><!--订单编号-->
							<li><span>{{$t('orders.orderAmount')}}：</span><span style="color:#ff0000">{{detailsOrder.amount}}</span> 元</li><!--订单总额-->
							<li><span>{{$t('orders.payType')}}：</span>{{detailsOrder.payTypeDesc}}</li><!--支付方式-->
							<li><span>{{$t('orders.yhq')}}：</span>{{detailsOrder.couponName}}</li><!--优惠券-->
							<li><span>{{$t('orders.orderTime')}}：</span>
								{{getLocalTimeH(detailsOrder.createTime)}}
							</li><!--订单时间-->
							
						</div>
						<div style='margin-left:20px'>
							<li><span>{{$t('orders.pstype')}}：</span>{{detailsOrder.deliveryTypeDesc}}</li><!--配送方式-->
							<li><span>{{$t('orders.kd')}}：</span>{{detailsOrder.expressName}}</li><!--快递公司-->
							<li><span>{{$t('orders.person')}}：</span>{{detailsOrder.receiveName}}</li><!--收货人-->
							<li><span>{{$t('orders.mobile')}}：</span>{{detailsOrder.mobile}}</li><!--手机号-->
							<li><span>{{$t('orders.address')}}：</span>{{detailsOrder.receiveProvince}}{{detailsOrder.receiveCity}}{{detailsOrder.receiveCounty}}{{detailsOrder.receiveAddress}}</li><!--收货地址-->
						</div>
						</div>
					</div>
					<div style=''>
						<li><span style='font-size:16px;color:#2B8F8F'>{{$t('orders.otherInfo')}}</span></li><!--其他信息-->
						
						<li><span>{{$t('orders.DG')}}：</span>{{detailsOrder.employeeName}}</li><!--导购-->
						
						<li><span>{{$t('orders.crm')}}：</span>{{detailsOrder.customerName}}</li><!--会员-->
						<li><span>{{$t('orders.crmcode')}}：</span>{{detailsOrder.crmCode}}</li><!--会员编号-->
						
					</div>
					<div style='margin-left:20px'>
						<li><span style='font-size:16px;color:#2B8F8F'>订单状态：</span >
						<span style='font-size:16px;color:blue'>{{detailsOrder.statusDesc}}</span></li>

					
						<li>{{$t('orders.sevenTH')}}</li><!--//如在 7天 内有质量问题，买家可到店进行退货退款物流状态-->
					</div>
				</div>	
				<!--详情tab-->
				<div class="detail-title-mark">
					<div v-for="(item,index) in titles" :key='index' class="detail-title" @click="addborder(index)" :class="{bor:index==num2}">
						{{item}}
					</div>
				</div>
				<div style='margin:20px 0 180px 10px'>
					<!--表格数据-->
					<div class="table" v-if='num2==0'>
						<div style='height:35px;border:1px solid #e4e4e4;line-height:35px;border-bottom:none'>
							<span style='margin-left:10px'>{{$t('orders.orderNo')}}： <a>{{orderno}}</a></span>
						</div>
						<Table border :columns="columns" :data="orderDetail"></Table>
						<div style='text-align:right;height:35px;border:1px solid #e4e4e4;line-height:35px;border-top:none'>
							<span style='margin-right:20px'>{{$t('orders.orderA')}} 
								<a>{{NumAll(orderDetail)}}</a> 
								{{$t('orders.orderAjian')}}；{{$t('orders.orderAjianS')}}：
								<span style='color:red'>￥：{{amount.toFixed(2)}}
								</span>
							</span>
						</div>
						
					</div>
					<!--财务详情-->
					<div v-if='num2==1'>
						<Table border :columns="orderFinancekey" :data="orderFinanceData"></Table>
						<!--底部的分页-->
						<!-- <div class="page-box" v-if='Financetotal!=0'>
							 <Page :total="Financetotal" show-total  :pageSize='FinancepageSize'  @on-change="FinancegetData" @on-page-size-change="FinancechangePageSize"></Page>
						</div> -->
					</div>
					<!--订单日志-->
					<div v-if='num2==2'>
						<Timeline v-if='logDate.length!=0'>
					        <TimelineItem v-for='(item,index) in logDate' :key='index'>
					            <span class="TimelineItemtime">{{item.createTime}}</span>
					            <span class="content">{{item.creato}}</span>
					            <span class="content1">{{item.rmodifier}}</span>
					        </TimelineItem>
					    </Timeline>
						<span v-else>{{$t('public.NoData')}}</span><!--暂无数据-->
					</div>
					
				</div>
			</div>
		</div>
	<!--物流信息弹框-->
    <Modal v-model="wlisshow" width="420px">
	    <p slot="header" style="height:30px;line-height:30px;text-align:center">
	      <span>{{$t('orders.wl')}}</span><!--物流信息-->
	    </p>
     	<Form ref="logisticssave" :model="logisticsformValidate" :rules="logisticsruleValidate" :label-width="100" >
    	<FormItem :label="$t('orders.pstype')" prop="model2"><!--发运方式：-->
        	<Select v-model="logisticsformValidate.model2" @on-change="getlogistics1" :placeholder="$t('orders.pstype')">
				<Option v-for="(item,index) in logisticstype1" :value="item.value" :key="index" >{{item.label}}</Option>
			</Select>
   		</FormItem>
        <FormItem :label="$t('orders.wlNum')" prop="logisticsNo1"><!--物流单号：-->
           <Input v-model='logisticsformValidate.logisticsNo1' :placeholder="$t('orders.wlNum')"></Input>
        </FormItem>
    	</Form>
	    <div slot="footer">
	    	<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancelSearchpk'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
			<Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="sureSearchpk('logisticssave')"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}
			</Button>
	    </div>
  </Modal>
 
	<div class='totBottom'>
        <span>共<span style='color:#ff0000'> {{total}} </span>条</span>
        <span>当前第<span style='color:#ff0000'> {{current}} </span>页</span>
    </div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				searchKeyword:"",
				//详情
				payStatusDesc:"",
				deliveryStatusDesc:'',
				// titles:["订单商品","财务详情","订单日志","物流历史"],
				titles:[this.$t('orders.infoSku'),this.$t('orders.FInfo'),this.$t('orders.orderLog')],
				num2:0,
				//订单日志
				logDate:[],
				//财务详情
				FinancepageSize:0,
				Financetotal:0,
				orderFinancekey:[
					{
						title:this.$t('finance.withdraw.rzhTime'),//"入账日期",
						key:"createTime",
						width:140,
						align:"center"
					},
					{
						title:this.$t('finance.withdraw.lsNum'),//"流水号",
						width:180,
						key:"payNo"

					},
					{
						title:this.$t('finance.withdraw.orderNo'),//"订单号",
						width:180,
						key:"orderNo"

					},
					{
						title:this.$t('finance.withdraw.title'),//"标题",
						width:120,
						align:"center",
						key:"title"

					},
					{
						title:this.$t('finance.withdraw.store'),//"店铺",
						key:"storeName",
						width:140,
					},
					{
						title:this.$t('finance.withdraw.ey'),//"员工",
						key:"employeeName",
						width:120,
						align:"center",
					},
					
					{
						title:this.$t('finance.withdraw.amount'),//"金额",
						key:"total_fee",
						width:120,
						align:"center",
					},
					{
						title:this.$t('finance.withdraw.payType'),//"支付方式",
						key:"typeDesc",
						width:140,
						align:"center",
					},
					{
						title:this.$t('finance.withdraw.khInfo'),//"客户信息",
						key:"crmName",
						width:170,
					},
					{
						title:this.$t('public.remark'),//"备注",
						key:"remark",
						width:120,
					},

				],
				orderFinanceData:[],
				//物流历史
				wlHtotal:0,
				wlHpageSize:0,
				orderwlH:[],
				orderwlHData:[],
				//物流登记
				//打包弹框运送方式
				logisticstype1:[
					{
						value: '1',
						label: '顺丰'
					},
					{
						value: '2',
						label: '韵达'
					},
					{
						value: '3',
						label: '圆通'
					}
				],
				wlisshow:false,
				logisticsformValidate:{
					logisticsNo1:'',
					model2:'',
				},
				logisticsruleValidate:{
					logisticsNo1:[{ required: true, message: '请输入物流单号！', trigger: 'blur' },],
					model2:[{ required: true, message: '请选择物流！', trigger: 'change' }]
				},
				active:1,
				activeIsShow:true,//步骤条是否显示
				issure:false,//确认 线上付款：status==1 && (payTyp==18 || payType==18 && payStatus==9)   
											//status==1 && (payTyp==18 || payType!=18 && payStatus==9)

				iscomit:false,//提交仓库  	status=10 && (payTyp=18 || payType!=18 && payStatus==9)
				isfh:false,//发货中			status=10 && (payTyp=18 || payType!=18 && payStatus==9)
				isyfh:false,//已发货        status=10 && deliveryStatus=0
				isyfk:false,//已付款        payTyp=18 && payStatus==0
				isyqs:false,//已签收        deliveryStatus=2
				isywl:false,//物流
				isycancel:false,//取消订单
				print:false,//打印
				isexport:false,//导出
		
				rowIndex:-1,//属性弹框数量输入框下标
				//弹框属性
				
				//新增数据
				//支付类型列表 1：聚合支付 5：余额支付 9：现金支付 11：刷卡支付 15：DOCU支付 18：线下付款 25 其他支付
				dztype:[
					{
						title:this.$t('orders.jheP'),//"聚合支付",
						key:"1"
					},
					{
						title:this.$t('orders.yeP'),//"余额支付",
						key:"5"
					},
					{
						title:this.$t('orders.xjP'),//"现金支付",
						key:"9"
					},
					{
						title:this.$t('orders.xkP'),//"刷卡支付",
						key:"11"
					},
					
					{
						title:this.$t('orders.xxP'),//"线下付款",
						key:"18"
					},
					{
						title:this.$t('orders.qtP'),//"其他支付",
						key:"25"
					},

				],
				cancel:false,
				active:0,
				orderno:'',
				current:1,
				height:'',
				numIndex:0,
				indexId:'',
				num2:0,
				orderdataList:[],
				
				columns:[

					{
                        title: '',
                        key:'mainPhoto',
                        width:80,
                        align: 'center',
                        render:(h, params) =>{
                        	return h('div',[
                        			h('img',{
                        				attrs:{
                        					src:params.row.mainPhoto
                        				},
                        				style:{
                        					width:'40px',
                        					height:'40px',
                        					marginTop:'4px'
                        				}
                        			})
                        		])
                        }
                    },
                    {
						title:this.$t('manage.sku.barcode'),//"条码",
						key:'barcode'
					},
					{
						title:"货号",
						key:'skuCode'
					},
					{
						title:"名称",
						ellipsis:true,
						key:'skuName'
					},
					{
						title:"数量",
						align:"center",
						 width: 100,
						key:'qty'
					},
					{
						title:"价格",
						align:"center",
						 width: 100,
						key:'price'
					},
					{
						title:"总金额",
						align:"center",
						 width: 100,
						key:'amount'
					},
					{
						title:this.$t('orders.attrs'),//"属性",
						key:"skuTypeDesc"
					},
				],
				uid: this.$store.state.common.token,
				value:0,
				orderTypeList:[
					{
						label:'全部',
						value:0
					},
					{
						label:"已确认",
						value:10
					},
					{
						label:"发货中",
						value:23
					},
					{
						label:"已发货",
						value:40
					},
					{
						label:"已完成",
						value:50
					},
					{
						label:'已取消',
						value:99
					},
					{
						label:'已关闭',
						value:79
					}
				],
				total:0,
				pageSize:0,
				AllOrderList:[],
				orderDetail:[],
				statusDesc:'',
				type:'',
				createTime:'',
				amount:0,
				receiveAddress:'',//收货地址
				receiveCity:'',//收货地址
				deliveryTypeDesc:'',//配送方式
				mobile :'',//手机号
				payTypeDesc :'',//支付方式
			
				detailsOrder:{},//订单详情
				
			}
		},
		methods:{
			//单击左侧列表
			getcginfo(id,index){
				this.numIndex = index
				this.indexId = id
				this.getCrmDetail(id)
			},
			//确定GET /order/confrim/{id} 确认
			orderSure(){
				if(this.indexId==''){
					this.$notify({
					        title:"",//
					        message:this.$t('orders.selecOrder'),//'请选择订单！',
					        type: 'success',
					        position: 'bottom-right'
				        });
				}else{
					this.axios.get('/order/confrim/'+this.indexId+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.$notify({
					        title:"",//
					        message: this.$t('orders.sureS'),//'确认成功',
					        type: 'success',
					        position: 'bottom-right'
				        });
						this.getAllOrder(this.value)//获取所有线上订单
						this.getcginfo(this.indexId,this.numIndex)
						this.getCrmDetail(this.indexId)
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
			//GET /order/placed/{id} 提交仓库
			orderComit(){
				if(this.indexId==''){
					this.$notify({
					        title:"",//
					        message:this.$t('orders.selecOrder'),
					        type: 'success',
					        position: 'bottom-right'
				        });
				}else{
					this.axios.post('/order/placed?uid='+this.uid,this.indexId).then(res=>{
					if(res.data.status==200){
						this.$notify({
					        title:"",//
					        message:  this.$t('orders.comitS'),//'提交成功',
					        type: 'success',
					        position: 'bottom-right'
				        });
				        this.getAllOrder(this.value)//获取所有线上订单
						this.getcginfo(this.indexId,this.numIndex)
						this.getCrmDetail(this.indexId)
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
			//GET /order/confrimvendor/{id} 发货中
			orderfh(){
				if(this.indexId==''){
					this.$notify({
					        title:"",//
					        message:this.$t('orders.selecOrder'),
					        type: 'success',
					        position: 'bottom-right'
				        });
				}else{
					this.axios.post('order/confrimvendor?uid='+this.uid,this.indexId).then(res=>{
					if(res.data.status==200){
						this.$notify({
					        title:"",//
					        message: this.$t('orders.fhzS'),//'发货中',
					        type: 'success',
					        position: 'bottom-right'
						});
						
						this.getAllOrder(this.value)//获取所有线上订单
						this.getcginfo(this.indexId,this.numIndex)
						this.getCrmDetail(this.indexId)
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
			//GET /order/dispatch/{id} 已发货
			orderYfh(){
				if(this.indexId==''){
					this.$notify({
					        title:"",//
					        message:this.$t('orders.selecOrder'),
					        type: 'success',
					        position: 'bottom-right'
				        });
				}else{
					this.axios.post('/order/dispatch?uid='+this.uid,this.indexId).then(res=>{
					if(res.data.status==200){
						this.$notify({
					        title:"",//
					        message:this.$t('orders.yfhS'),// '已发货',
					        type: 'success',
					        position: 'bottom-right'
						});
						
						this.getAllOrder(this.value)//获取所有线上订单
						this.getcginfo(this.indexId,this.numIndex)
						this.getCrmDetail(this.indexId)
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
			//GET /order/delivered/{id} 已签收
			orderYqs(){
				if(this.indexId==''){
					this.$notify({
					        title:"",//
					        message:this.$t('orders.selecOrder'),
					        type: 'success',
					        position: 'bottom-right'
				        });
				}else{
					this.axios.get('/order/delivered/'+this.indexId+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.$notify({
					        title:"",//
					        message:this.$t('orders.yxsS'),// '已签收',
					        type: 'success',
					        position: 'bottom-right'
				        });
						this.getAllOrder(this.value)//获取所有线上订单
						this.getcginfo(this.indexId,this.numIndex)
						this.getCrmDetail(this.indexId)
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
			//GET /order/paid/{id} 付款
			orderYfk(){
				if(this.indexId==''){
					this.$notify({
					        title:"",//
					        message:this.$t('orders.selecOrder'),
					        type: 'success',
					        position: 'bottom-right'
				        });
				}else{
					this.axios.get('/order/paid/'+this.indexId+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.$notify({
					        title:"",//
					        message: this.$t('orders.yfkS'),//'已付款',
					        type: 'success',
					        position: 'bottom-right'
				        });
						this.getAllOrder(this.value)//获取所有线上订单
						this.getcginfo(this.indexId,this.numIndex)
						this.getCrmDetail(this.indexId)
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
			//取消订单GET /order/cancel/{id} 取消订单
			orderCancel(){
		
				if(this.indexId==''){
					this.$notify({
					        title:"",//
					        message:this.$t('orders.selecOrder'),
					        type: 'success',
					        position: 'bottom-right'
				        });
					}else{
						this.axios.get('/order/cancel/'+this.indexId+'?uid='+this.uid).then(res=>{
							if(res.data.status==200){
								this.$notify({
									title:"",//
									message: this.$t('public.cancel'),
									type: 'success',
									position: 'bottom-right'
								});
								this.getAllOrder(this.value)//获取所有线上订单
								this.getcginfo(this.indexId,this.numIndex)
								this.getCrmDetail(this.indexId)
							
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
			//物流登记
			orderWl(){
				this.wlisshow=true
			},
			//物流取消
			cancelSearchpk(){
				this.wlisshow=false
			},
			//物流确认
			sureSearchpk(name){
				this.$refs[name].validate((valid) => {

				})
			},
			//选择物流
			getlogistics1(value){
				this.logisticsformValidate.model2 = value
			},
			//导出GET /orderExport/excel 导出excel发货清单
	        exportOrder(){
	        	if(this.indexId==''){
	        		this.$notify({
	                    title: "",//'错误',
	                    message:this.$t('orders.selecOrder'),//'请选择订单',
	                    type: 'error',
	                    position: 'bottom-right'
	                });
	        	}else{
	        	
	        		this.axios.get('/orderExport/excel?orderIds='+this.indexId+'&uid='+this.uid).then(res=>{
	        			if(res.data!=null){
							this.$notify({
								title:"",//
								message: res.data.errorMessage,
								type: 'error',
								position: 'bottom-right'
							});
						}else{
							window.location.href=res.request.responseURL
							this.indexId=''
	        				// this.single=false
	        				// this.AllOrderList.forEach((x)=>{
	            // 				x.check=false
	        				// })
			          //   	this.orderStrArr=[]
			          //   	this.orderStr=''
			          //   	this.loadingisshow=false
						}
	    				
	            	})
	        	}
	        },
			//打印
			Prin(){
				this.axios.get('/orderExport/pdf?orderIds='+this.indexId+'&uid='+this.uid).then(res=>{
					console.log(res)
					if(this.indexId==''){
						this.$notify({
							title: "",//'错误',
							message:this.$t('orders.selecOrder'),//'请选择订单',
							type: 'error',
							position: 'bottom-right'
						});
					}else{
            			window.location.href=res.request.responseURL
	    				
		            	this.indexId=''
            		}
    				
	        	})
			},
			//获取订单详情
			getCrmDetail(id){
				this.axios.get('order/get/'+id+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						console.log(res.data.rows)
						this.orderDetail=res.data.rows.details
						this.detailsOrder=res.data.rows
						let rows=res.data.rows
						this.orderno=res.data.rows.orderNo
						this.deliveryTypeDesc=res.data.rows.deliveryTypeDesc//配送方式
						this.mobile=res.data.rows.mobile//手机号
						this.trueName=res.data.rows.trueName//买家名
						this.receiveAddress=res.data.rows.receiveAddress//地址
						this.receiveCity =res.data.rows.receiveCity //地址
						this.payTypeDesc =res.data.rows.payTypeDesc //支付方式
						this.statusDesc=res.data.rows.statusDesc
						this.total=res.data.rows.details.length
						this.mobile=res.data.rows.mobile
						this.logDate=rows.logVos//日志
						this.createTime=res.data.rows.createTime
						
						this.amount=res.data.rows.amount
						
						this.createTime=new Date(this.createTime).toLocaleString().replace(/\//g,'-')
						// issure:false,//确认
						// iscomit:false,//提交仓库
						// isfh:false,//发货中
						// isyfh:false,//已发货
						// isyfk:false,//已付款
						// isyqs:false,//已签收
						//线下付款
						//确认
						//取消
						
						if(rows.status==1 || (rows.payTyp==18 || rows.payType==18 && rows.payStatus==9)){
							this.issure=true//确认
							this.iscomit=false//提交仓库
							this.isfh=false//发货中
							this.isyfh=false//已发货
							this.isyfk=false//已付款
							this.isyqs=false//已签收
							this.isycancel=true
							this.activeIsShow=true//步骤条
							this.print=true
							this.isexport=true
							this.active=2
							
						}
						//确认
						if(rows.status==1 || (rows.payTyp==18 || rows.payType!=18 && rows.payStatus==9)){
							this.issure=true//确认
							this.iscomit=false//提交仓库
							this.isfh=false//发货中
							this.isyfh=false//已发货
							this.isyfk=false//已付款
							this.isyqs=false//已签收
							this.isycancel=true
							this.activeIsShow=true//步骤条
							this.print=true
							this.isexport=true
							this.active=2
						}
						////提交仓库
						if(rows.status==10 || (rows.payTyp==18 || rows.payType!=18 && rows.payStatus==9)){
							this.issure=false//确认
							this.iscomit=true//提交仓库
							this.isfh=false//发货中
							this.isyfh=false//已发货
							this.isyfk=false//已付款
							this.isyqs=false//已签收
							this.isycancel=true
							this.activeIsShow=true//步骤条
							this.print=true
							this.isexport=true
							this.active=3
						}
						//发货中status=10 && (payTyp=18 || payType!=18 && payStatus==9)
						if(rows.status==23 || (rows.payTyp==18 || rows.payType!=18 && rows.payStatus==9)){
							this.issure=false//确认
							this.iscomit=false//提交仓库
							this.isfh=true//发货中
							this.isyfh=false//已发货
							this.isyfk=false//已付款
							this.isyqs=false//已签收
							this.isycancel=true
							this.activeIsShow=true//步骤条
							this.print=true
							this.isexport=true
							this.active=4
						}
						//已发货status=10 && deliveryStatus=0
						if(rows.status==30 && rows.deliveryStatus==0){
							this.issure=false//确认
							this.iscomit=false//提交仓库
							this.isfh=false//发货中
							this.isyfh=true//已发货
							this.isyfk=false//已付款
							this.isyqs=false//已签收
							this.isycancel=false
							this.activeIsShow=true//步骤条
							this.print=true
							this.isexport=true
							this.active=5
						}
						//已付款payTyp=18 && payStatus==0
						if(rows.payTyp==18 && rows.payStatus==0){
							this.issure=false//确认
							this.iscomit=false//提交仓库
							this.isfh=false//发货中
							this.isyfh=false//已发货
							this.isyfk=true//已付款
							this.isyqs=false//已签收
							this.isycancel=false
							this.activeIsShow=true//步骤条
							this.print=true
							this.isexport=true
							this.active=6
						}
						// 已签收deliveryStatus=2
						if(rows.deliveryStatus==2){
							this.issure=false//确认
							this.iscomit=false//提交仓库
							this.isfh=false//发货中
							this.isyfh=false//已发货
							this.isyfk=false//已付款
							this.isyqs=true//已签收
							this.isycancel=false
							this.activeIsShow=true//步骤条
							this.print=true
							this.isexport=true
							this.active=7
						}
						
						//完成
						if(rows.status==50){
							this.issure=false//确认
							this.iscomit=false//提交仓库
							this.isfh=false//发货中
							this.isyfh=false//已发货
							this.isyfk=false//已付款
							this.isyqs=false//已签收
							this.isycancel=false
							this.activeIsShow=true//步骤条
							this.print=true
							this.isexport=true
							this.active=8
						}
						//取消
						if(rows.status==99){
							this.issure=false//确认
							this.iscomit=false//提交仓库
							this.isfh=false//发货中
							this.isyfh=false//已发货
							this.isyfk=false//已付款
							this.isyqs=false//已签收
							this.isycancel=false
							this.activeIsShow=false
							this.print=true
							this.isexport=true
							this.acitve=0
						}
						
					}
				})
			},
			//获取所有线下订单
			getAllOrder(s){
				this.axios.get('order/query/0?uid='+this.uid+'&status='+s).then(res=>{
					console.log(res)
					if(res.data.status==200){
						this.AllOrderList=res.data.rows
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.AllOrderList.forEach((item,index)=>{
							item.createTime=new Date(item.createTime).toLocaleDateString().replace(/\//g,'-')
						})
					}
				})
			},

			 //下拉框选择
			orderselected(value){
				this.value = value
				this.current=1
				//3"全部",//10"待支付",//33"待发货",//40"已发货",//50"已完成",//99"已关闭",//77"退款中",
				this.axios.get('/order/query/0?uid='+this.uid+'&status='+this.value).then(res=>{
					if(res.data.status == '200') {
						let data = res.data
						this.AllOrderList = data.rows;
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.AllOrderList.forEach((x)=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
					}
				})
			
				
			},
			//下拉加载更多
            handleReachEdge(){
				this.current++//默认10条
				//其他订单
				this.axios.get('/order/query/0'+'?offset='+this.current+'&uid='+this.uid+'&status='+this.value).then((res)=>{
	 				if(this.current>Math.ceil(this.total/this.pageSize)){
	 						this.current=Math.ceil(this.total/this.pageSize)
	 					}
			 		res.data.rows.forEach((item)=>{
			 			this.AllOrderList.push(item)
			 			this.AllOrderList.forEach((x,index)=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
			 		})

			 	})  
            },
            //叉号返回
        	cancelHome(){
        		this.$router.push('/networdOrder')
        	},
        	//选择支付类型
            getdztype(value){
            	this.formValidate.modeldztype = value
            	
            },
			
          	//详情
          	//添加下边框 tab页getFinance()
			addborder(index){
				this.num2 = index
				switch(this.num2){
					case 0://订单商品
					break;
					case 1://财务
						this.getFinance()
					break;
					case 2://订单日志
						this.getlogDate()
					break;
					case 3://物流历史
						this.getwlHistory()
					break;
				}

			},
			//GET /order/orderlog/{orderNo} 订单日志
			//获取订单日志
			getlogDate(){
				this.axios.get('/order/orderlog/'+this.orderno+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.logDate=res.data.rows.rows
						this.logDate.forEach(item=>{
							item.createTime=this.getLocalTimeH(item.createTime)
						})
					}
				})
			},
			//获取财务详情GET /order/orderpay/{orderNo} 订单支付结果this.orderno
			getFinance(){
				this.axios.get('/order/orderpay/'+this.orderno+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.orderFinanceData=res.data.rows
						this.FinancepageSize=res.data.total
						this.Financetotal=res.data.pageSize
					}
				})
			},
			//财务详情翻页
			FinancegetData(current){
				this.axios.get('/order/orderpay/'+this.orderno+'?uid='+this.uid+'&offset='+current).then(res=>{
					if(res.data.status==200){
						this.orderFinanceData=res.data.rows
						this.FinancepageSize=res.data.total
						this.Financetotal=res.data.pageSize
					}
				})
			},
			FinancechangePageSize(size){
				this.FinancepageSize=size
			},
			
			getSt(item){
				switch(item.status){
					case 1:
						item.statusDesc=this.$t('orders.newOrder')
					break;
					case 10:
						item.statusDesc=this.$t('orders.ySure')
					break;
					case 20:
						item.statusDesc=this.$t('orders.yPay')
					break;
					case 23:
						item.statusDesc=this.$t('orders.orderDfh')
					break;
					case 30:
						item.statusDesc=this.$t('orders.orderYFH')
					break;
					case 50:
						item.statusDesc=this.$t('orders.shSuccess')
					break;
					case 99:
						item.statusDesc=this.$t('orders.iscancel')
					break;
				}
			},
			//搜索订单
			search(){
				this.axios.get('/order/query/0'+'?uid='+this.uid+'&keyword='+this.searchKeyword).then(res=>{
					if(res.data.status==200){
						this.AllOrderList=res.data.rows
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.AllOrderList.forEach((item,index)=>{
							item.check=false
							this.getSt(item)
							item.createTime=new Date(item.createTime).toLocaleDateString().replace(/\//g,'-')
						})
						
					}
				})
			},
			enterSearch(){
				this.search()
			},
			//商品总金额
			getAllqty(arr){
				let number=0;
				arr.forEach(x=>{
					number+=x.qty
				})
				return number
			},
			//商品数量
			NumAll(arr){
				let num=0;
				arr.forEach(x=>{
					num+=x.qty
				})
				return num
			},
			//获取加商品后的总金额
			amountAll(arr){
				let amount=0;
				arr.forEach(x=>{
					amount+=x.qty*x.price
				})
				return amount
			},
		},
		mounted(){
			
			if(this.$route.query.id){
				this.indexId = this.$route.query.id
				this.numIndex = this.$route.query.index
	
				this.value=this.$route.query.s
				this.getcginfo(this.indexId,this.numIndex)
				this.getCrmDetail(this.indexId)
				this.getAllOrder(this.value)//获取所有线上订单
			}
			this.height = document.documentElement.clientHeight
			window.onresize=function(){
				this.height = document.documentElement.clientHeight
			}
		}
	}
</script>
<style type="text/css" scoped>
.head{
	width:100%;
  height:60px;
  display: flex;
  position: fixed;
  z-index:10;
  background: #fff;
  border-bottom:1px solid #e4e4e4;
	
}
.tot{
    position:fixed;
    bottom:10px;
    left:15%;
    z-index:12;
}
.left-top{
	height: 60px;
	width:360px;
	flex:0 0 360px;
	line-height: 60px;
	
	display:flex;
	background: #fff;
	border-right:1px solid #eee;
	border-bottom:1px solid #eee;
	justify-content: space-between
}
.right-top{
	height: 60px;
	line-height: 60px;
	display:flex;
	margin-left:360px;
	justify-content: space-between;

}
.lanrenLeft{
	position: absolute;
    text-align: center;
    top: 0px;
    right: 0px;
    width: 0;
    height: 0;
    border-top:40px solid #d53c39;
    border-left:40px solid transparent;
}
.lanrenLeft span{
width: 40px;
    height: 23px;
    color: #fff;
    display: block;
    position: relative;
    z-index: 9999999999999;
    top: -36px;
    right: 36px;
    font-size: 12px;
     font-weight: 100; 
    transform: rotate(46deg);
}
.bgd4{
    border-top:40px solid #278fa3;
}
/*状态的颜色 新增*/
.bgd5{
    border-top:40px solid #3b77e3;
}
/*状态的颜色 */
.bgd6{
    border-top:40px solid #40ca98;
}
.bgd7{
    border-top:40px solid #40ca98;
}
.bgd8{
    border-top:40px solid #298E8E;
}
.bgd9{
    border-top:40px solid #4283EE;
}
.tkmodel{
	width:100%;
	
	display: flex;
	
	text-align: center;
	direction: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}
.page-box{
	text-align: left;
	margin-top:10px;
}
.table{
	margin-top:20px;

}
li{
	list-style: none
}
.info-left li{
	padding:5px 0;
}
.colorGender1{
	color:#72B7EA;
}
.colorGender0{
	color:#FF934D;
}
.wldw{
	margin-left:10px;
}
.top-info{
	display:flex;
	border-bottom:1px solid #e4e4e4;
	padding:10px 20px;
	
}
.top-info li{
	list-style: none;
	margin-top:10px;
}
.top-left-btn{
background: #3B77E3;
margin-right: 10px;
color: #fff;
border: none;
width: 26px;
height: 26px;
border-radius: 26px;
display: inline-block;
position: relative;
top: 12px;
}
.top-left-btn1{
background: #FF7D16;
}
.top-left-btn:hover{
cursor:pointer;
}
.left-content {
	height:100%;
		width:360px;
    flex: 0 0 360px;
		margin-bottom:300px;
		z-index:9;
		border-right:1px solid #E6E6E6;
		position:fixed;
		background:#F9F9F9;
}
.con-list {
	display:flex;
	align-items: center;
	width: 100%;
	word-wrap:break-word;
	
	border-bottom: solid 1px #E6E6E6;
	padding: 15px 25px;
	
	cursor: pointer;
	position:relative;
}
.con-list:hover{
	cursor:pointer;
}
.con-list .date{
	position:absolute;
	right:10px;
	top:10px;
}
.con-list .status{
	width:100px;
	
	text-align: center;
	position: absolute;
    right: 0px;
    top: 47px;
}
.con-list .list-title {
	color: #0d0d0d;
	font-size: 14px;
	margin-bottom: 10px;
}
.con-list .date1{
position: absolute;
    right: 10px;
    top: 50px;
    }
.con-list .txt {
    color: #585858;
    font-size: 12px;
    width: 180px;
    position: absolute;
    top: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.but{
	background:#3b77e3;margin-right:5px;color:#fff;border:none
}
.bg{
	background:#dbe5f1;
color:#000;
}
.add-right {
	padding-right:20px;
	padding-top:10px;
	display:flex;
	background: #fff;
	height:100%;
	margin-left:360px;
	padding-top:20px;
}
div.con-list:last-child{
	margin-bottom:180px;
}
.list-box{
	display: flex;
	height:35px;
	line-height: 35px;
	margin:25px 10px;
}
.list-box1{
		margin:4px 10px;
}
.list-box span{
	height:40px;
	width:120px;
	text-align: center;
	padding:0 10px;
	font-weight:600;
}
.list-box input.ivu-input{
	height:40px!important;
}
.list-box1{
	margin-left:20px;
}
.list-box1 span{
	width:auto;
	text-align: left
}
.right-left{
	width: 230px;
    margin-top: 26px;
	
}
.right-right{
	width:100%;
}
.step{
	width:100%;
	padding:10px 0;
	text-align: center;
	border-bottom:1px solid #e4e4e4;
}
.detail-title-mark{
	display:flex;
	justify-content: flex-start;
	border-bottom:1px solid #eee;
	margin-top:10px;
	margin-left: 10px;
}
.detail-title{
	padding:10px 40px;

}
.bor{
	border-bottom:2px solid #086CA2;
}
.content1{
	position:absolute;
	left:400px;
}

.TimelineItemtime{
    font-size: 14px;
    font-weight: bold;
}
</style>
<style type="text/css">
 .content{
        padding-left: 5px;
        top:0!important;
    }
 .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
 @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.el-upload--text{
	width:100%!important;
}
</style>