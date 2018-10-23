<template>
	<div class='addCrm'>
	<!--订单详情-->
		<div class="head">
				<div class="left-top">
					<div class="wldw">
						<span style='margin-left:25px'>
							<Checkbox v-model='single' @on-change='checkAll'></Checkbox>
						</span>
						<div style='margin-left:5px'>
							<span style="width:42px;font-weight:900">{{$t('public.screen')}}：</span>
							<Select style="width:110px" @on-change="orderselected" v-model='value'>
								<Option v-for="item in orderTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</div>
					</div>
					<div>
					</div>
				</div>
				<div class="right-top">
				<div style='position: absolute;left: 360px;'>
					<span style="margin-left:20px;font-size:19px;font-weight:900">{{orderno}}</span> 
				</div>
				<div style='margin-right:10px;position: absolute;right: 240px;'>
					
					<Button type="ghost"  shape="circle"  @click="orderSure" class='but' v-if='issure'>
							<Icon type="checkmark-round"></Icon>
						确认
					</Button>
					<Button type="ghost"  shape="circle"  @click="orderfh"  class='but' v-if='isyfh'>
							<Icon type="checkmark-round"></Icon>
						发货
					</Button>
					
					<Button type="ghost"  shape="circle"  @click="exportOrder"  class='but' v-if='isexport'>
						 <Icon type="document" style="margin-right:5px;color:#fff"></Icon>
						导出
					</Button>
					<Button type="ghost"  shape="circle"  @click="Prin"  class='but' v-if='print'>
						<Icon type="ios-folder-outline" style="margin-right:5px;color:#fff"></Icon>
						打印
					</Button>
					<Button type="ghost"  shape="circle"  @click="orderCancel"  class='but' v-if='isycancel'>
						<Icon type="close" style="margin-right:5px;" ></Icon>
						取消订单
					</Button>
					<span @click="cancelHome" style="cursor:pointer;margin-right: 20px;"><Icon type="close" class="cha" ></Icon></span>
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
				<div class="con-list" v-for="(item,index) in AllOrderList" :id='setId(item.id)' :key='index' @click="getcginfo(item.id,index,item)" :class="{bg:numIndex==index}">
					<span style="margin-right: 10px;">
                         <Checkbox :value="item.check" @on-change='changeOnRowOrder(item,index,$event)'></Checkbox>
                     </span>
					 <div>
						<p class="list-title">{{item.orderNo}}</p>
						<p class="txt" style="margin-top:10px;">
							<!-- {{item.customerName}} -->
							{{item.receiveName}}
						</p>
						<div class="lanrenLeft" :class="{bgd31:item.status==1,bgd3:item.status==20,bgd4:item.status==40,bgd5:item.status==30,bgd6:item.status==50,bgd9:item.status==10,bgd8:item.status==23}">
		                    <span >{{item.statusDesc}}</span> 
		                </div>​
		                <span class="date1"><span style='color:#d53c39'>￥：{{item.amount}} </span> 元</span>
					</div>
				</div>
				
			</Scroll>
		</div>
		<!--右侧-->
		<div class="add-right" >
			<!--详情-->
			<div class='right-right' v-if='addTxt' style='position:relative'>
				<el-steps :active="active" finish-status="success" :align-center='true' style='margin-left:30px;margin-top:20px' v-if='activeIsShow'>
				
					<el-step title="待支付" :description="createTime"></el-step>
					<el-step title="已支付" ></el-step>
					<el-step title="已确认" ></el-step>
					<el-step title="待发货" ></el-step>
					<el-step title="待签收" ></el-step>
					<el-step title="已完成" ></el-step>
				</el-steps>
				<div class='top-info' >
					<div style='margin-right:20px;'>
						<li><span style='font-size:16px;color:#2B8F8F'>{{$t('orders.orderInfo')}}</span></li><!--订单信息-->
						<div style='display:flex'>
						<div>
							<li><span>{{$t('orders.orderNo')}}：</span>{{detailsOrder.orderNo}}</li><!--订单编号-->
							<li><span>{{$t('orders.orderAmount')}}：</span><span style="color:#ff0000">{{detailsOrder.amount}}</span> 元</li><!--订单总额-->
							<li><span>{{$t('orders.payType')}}：</span>{{detailsOrder.payTypeDesc}}</li><!--支付方式-->
							<li><span>{{$t('orders.yhq')}}：</span>{{detailsOrder.couponName}}</li><!--优惠券-->
							
							<li><span>{{$t('orders.orderTime')}}：</span>
							{{getLocalTimeH(detailsOrder.createTime)}}</li><!--订单时间-->
							<li style='width: 260px;'><span>{{$t('orders.address')}}：</span>{{detailsOrder.receiveProvince}}{{detailsOrder.receiveCity}}{{detailsOrder.receiveCounty}}{{detailsOrder.receiveAddress}}</li><!--收货地址-->
						</div>
						<div style='margin-left:20px'>
							<li><span>{{$t('orders.Freight')}}：</span><span style="color:#ff0000">{{detailsOrder.shipPrice}}</span> 元</li><!--运费-->
							<li><span>{{$t('orders.pstype')}}：</span>{{detailsOrder.deliveryTypeDesc}}</li><!--配送方式-->
							<li><span>{{$t('orders.kd')}}：</span>{{detailsOrder.expressName}}</li><!--快递公司-->
							<li><span>快递单号：</span>{{detailsOrder.shipCode}}</li>
							<li><span>{{$t('orders.person')}}：</span>{{detailsOrder.receiveName}}</li><!--收货人-->
							<li><span>{{$t('orders.mobile')}}：</span>{{detailsOrder.mobile}}</li><!--手机号-->
							
						</div>
						</div>
					</div>
					<div style=''>
						<li><span style='font-size:16px;color:#2B8F8F'>{{$t('orders.otherInfo')}}</span></li><!--会员信息-->
						
						<li><span>{{$t('orders.DG')}}：</span>{{detailsOrder.employeeName}}</li><!--导购-->
						
						<li><span>{{$t('orders.crm')}}：</span>{{detailsOrder.customerName}}</li><!--会员-->
						<li><span>{{$t('orders.crmcode')}}：</span>{{detailsOrder.crmCode}}</li><!--会员编号-->
						
					</div>
					<div style='margin-left:20px'>
						<li><span style='font-size:16px;color:#2B8F8F'>订单状态：</span >
						<span style='font-size:16px;color:blue'>{{detailsOrder.statusDesc}}</span></li>

						
						<li>{{$t('orders.sevenTH')}}</li><!--//如在 7天 内有质量问题，买家可到店进行退货退款物流状态-->
					</div>
					<!-- <div class='lanrenLeft1' :class="{bg41:detailsOrder.payStatus==9,bg51:detailsOrder.payStatus==0,bg61:detailsOrder.payStatus==2}">
						<span>{{payStatusDesc}}</span>
					</div> -->
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
							<span style='margin-left:10px'>{{$t('orders.orderNo')}}： <a>{{orderNum}}</a></span>
						</div>
						<Table border :columns="columns" :data="orderDetail"></Table>
						<div style='text-align:right;height:35px;border:1px solid #e4e4e4;line-height:35px;border-top:none'>
							<span style='margin-right:20px'>{{$t('orders.orderA')}} 
								<a>{{NumAll(orderDetail)}}</a><!--商品数量-->
							 	{{$t('orders.orderAjian')}}；
							 	运费：<a>{{detailsOrder.shipPrice}}</a>；<!--运费-->
							 	总价 ：<!--商品总价-->
							 	<span style='color:red'>￥：{{amount.toFixed(2)}}</span>
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
					            <span class="operator">{{item.operator }}</span>
					            <span class="operator">{{item.creator}}</span>
								<span class="operator">{{item.remark}}</span>
								
					        </TimelineItem>
					    </Timeline>
						<span v-else>{{$t('public.NoData')}}</span><!--暂无数据-->
					</div>
					<!--物流历史-->
					<div v-if='num2==3'>
						<Timeline v-if='orderwlHData.length!=0'>
					        <TimelineItem v-for='(item,index) in orderwlHData' :key='index'>
					            <span class="TimelineItemtime">{{item.createTime}}</span>
					            <span class="operator">{{item.creato}}</span>
					            <span class="operator">{{item.rmodifier}}</span>
					        </TimelineItem>
					    </Timeline>
						<span v-else>{{$t('public.NoData')}}</span><!--暂无数据-->
						<!-- <Table border :columns="orderwlH" :data="orderwlHData"></Table>
						
						<div class="page-box" v-if='wlHtotal!=0'>
							 <Page :total="wlHtotal" show-total  :pageSize='wlHpageSize'  @on-change="wlHgetData" @on-page-size-change="wlHchangePageSize"></Page>
						</div> -->
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
				<Option v-for="(item,index) in logisticstype1" :value="item.label" :key="index" >{{item.label}}</Option>
			</Select>
   		</FormItem>
        <FormItem :label="$t('orders.wlNum')" prop="logisticsNo1"><!--物流单号：-->
           <Input v-model='logisticsformValidate.logisticsNo1' :placeholder="$t('orders.wlNum')"></Input>
        </FormItem>
        <FormItem label="物流费用" prop="amount"><!--物流费用-->
           
           <InputNumber  :min="0"  v-model="logisticsformValidate.amount" placeholder="物流费用" @on-change="changeAmount"></InputNumber>
        </FormItem>
    	</Form>
	    <div slot="footer">
	    	<Button type="primary" style='background:#999;border:none' shape="circle" @click='cancelSearchpk' >
              <Icon type="close" style="margin-right:5px;" ></Icon>
                取消
            </Button>
	    	<Button type="primary" style='background:#3b77e3;border:none' shape="circle" @click="sureSearchpk('logisticssave')" >
               <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>
                确认
            </Button>
	    </div>
  </Modal>

  <!--取消订单理由-->
  <Modal v-model="iscancelorder" width="600px">
	    <p slot="header" style="height:30px;line-height:30px">
	      <span>取消订单理由</span>
	    </p>
     	<div>
			 <Input type='textarea' :rows="5" v-model='iscancelRemark' placeholder="请输入取消理由"></Input>
		 </div>
	    <div slot="footer">
	    	<Button type="primary" style='background:#999;border:none' shape="circle" @click='iscancelorderC' >
                <Icon type="close" style="margin-right:5px;" ></Icon>
                取消
            </Button>
	    	<Button type="primary" style='background:#3b77e3;border:none' shape="circle" @click="sureaddressC" >
               <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>
                确认
            </Button>
	    </div>
  </Modal>
	<div class='totBottom1'>
		<Page :page-size-opts="[10,50,100,150,200]" size="small" :total="total" show-total  show-sizer placement='top'  @on-change="storegetData" @on-page-size-change="storechangePageSize"></Page>
    </div>
	</div>
</template>
<script type="text/javascript">
import { regionData,CodeToText,TextToCode} from 'element-china-area-data'
	export default {
		data (){
			return{
				searchKeyword:"",
	
				clicklistId:"",
				iscancelRemark:"",
				iscancelorder:false,
				addressisshow:false,
				itemCheck:false,
				orderNum:"",
				item:{},
				addressDateKey:[
					{
						title:this.$t('sales.client.contact'),//"联系人",
						key:"name",
						width:"120"
					},
					{
						title:this.$t('sales.client.contactMobile'),//"手机",
						key:"mobile",
						width:"120"
					},
					{
						title:this.$t('public.address'),//"",
						key:"Raddress"
					},
					
				],
				addressdataList:[],
				addresstotal:0,
				addresspageSize:0,
				addressCrmD:{},

				CodeToText:CodeToText,//code转为Text
				TextToCode:TextToCode,//Text转为code
				cityInfo:regionData,//地址数据
				selectedOptions2:[],//绑定的数据
				single:false,//订单全选
				orderStr:"",
				orderStrArr:[],
				//详情
				payStatusDesc:"",//支付状态
				deliveryStatusDesc:'',//物流状态
				// titles:["订单商品","财务详情","订单日志","物流历史"],,this.$t('orders.Lhistory')
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
						width:170,
						align:"center"
					},
					
					{
						title:this.$t('finance.withdraw.orderNo'),//"订单号",
						width:180,
						key:"orderNo"

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
					amount:0,
				},
				logisticsruleValidate:{
					logisticsNo1:[{ required: true, message: '请输入物流单号！', trigger: 'blur' },],
					model2:[{ required: true, message: '请选择物流！', trigger: 'change' }]
				},
				active:1,
				activeIsShow:true,//步骤条是否显示
				issure:false,//确认 线上付款：status==1 && (payTyp==18 || payType==18 && payStatus==9)   
											//status==1 && (payTyp==18 || payType!=18 && payStatus==9)

				ispay:false,//支付
				isfh:false,//发货中			status=10 && (payTyp=18 || payType!=18 && payStatus==9)
				isyfh:false,//已发货        status=10 && deliveryStatus=0
				isyfk:false,//已付款        payTyp=18 && payStatus==0
				isyqs:false,//已签收        deliveryStatus=2
				isywl:false,//物流
				isycancel:false,//取消订单
				print:false,//打印
				issuccess:false,//完成
				isexport:false,//导出
		
				rowIndex:-1,//属性弹框数量输入框下标
	
				details:[],
				totalAmount:0,
				totalCount:0,
				
				attrModel:false,
				allCouunt:1,//规格数量
				goods:[],
				
				
				addTxt:true,//新增
				editTxt:false,//修改
				infoTxt:false,//详情
				tk1:true,
				surebtn1:true,
				tkText:'确认退款',
				
				tk:false,
				cancel:false,
			
				orderno:'',
				
				current:1,
				height:'',
				numIndex:-1,
				indexId:'',
				num2:0,
				
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
						label:"全部",
						value:0,
					},
					{
						label:"待支付",
						value:10,
					},
					{
						label:"已支付",
						value:20,
					},
					{
						label:"待发货",
						value:23,
					},
					{
						label:"待签收",
						value:30,
					},
					{
						label:"待自提",
						value:35,
					},
					{
						label:"已完成",
						value:50,
					},
					{
						label:"待评价",
						value:40,
					},
					{
						label:"退款",
						value:66,
					},
					{
						label:"退款中",
						value:199,
					},
					{
						label:"已关闭",
						value:79,
					},
					{
						label:"已取消",
						value:99,
					},
					{
						label:"已删除",
						value:999,
					},
					
				],
				
		
				AllOrderList:[],
				orderDetail:[],
				statusDesc:'',
				type:'',
				createTime:'',
				total:0,
				pageSize:0,
				amount:0,
				receiveAddress:'',//收货地址
				receiveCity:'',//收货地址
				deliveryTypeDesc:'',//配送方式
				mobile :'',//手机号
	
				payTypeDesc :'',//支付方式
				tkModel:false,
				detailsOrder:{},//订单详情
	
			}
		},
		methods:{
			//商品数量
			NumAll(arr){
				let num=0;
				arr.forEach(x=>{
					num+=x.qty
				})
				return num
			},
			//全选
			checkAll(v){
				 //订单全选
				this.orderStrArr=[]
				this.orderStr=''
            	this.single=v
            	this.AllOrderList.forEach((x)=>{
            		if(this.single){
            			x.check=true
            			if(this.orderStrArr.indexOf(x.id)>=0){
            				this.orderStrArr.splice(this.orderStrArr.indexOf(x.id),1)
            			}else{
            				this.orderStrArr.push(x.id)
            				this.orderStr=this.orderStrArr.join(',')
            			}
            		}else{
            			x.check=false
            			this.orderStrArr=[]
            			this.orderStr=''
            		}
        		})
			},
			//单选
            changeOnRowOrder(item,index,event){
            	if(event==false){
            		this.single=false
            		this.orderStrArr.splice(this.orderStrArr.indexOf(item.id),1)
					this.orderStr=this.orderStrArr.join(',')
            		////console.log(this.orderStr)
            	}else{
            		this.orderStrArr.push(item.id)
            		this.orderStr=this.orderStrArr.join(',')
            		////console.log(this.orderStr)
            	}
            },
			//单击左侧列表
			getcginfo(id,index,item){
				this.numIndex = index
				this.indexId = id
				this.orderStr=id//单击选中左侧列表的id
				this.item=item//链接路由query穿过来的订单对象
				this.getCrmDetail(this.indexId)
				
				this.AllOrderList.forEach((x)=>{
					x.check=false
					item.check=true
				})
			},
			//自定义左侧订单列表id
			setId(id){
				return "list"+id
			},
			//每次按钮操作向左滑动，后重置位置为0
			slide(){
				// //console.log($("#list"+this.indexId))
				$("#list"+this.indexId).animate({
					"marginLeft":"-100%"
				},'fast').animate({
					"marginLeft":"0"
				},0)
			},
			//点击按钮状态改变后的列表
			getAllOrderS(){
				if(this.value==0){
					this.axios.get('orderon/query/0?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.AllOrderList=res.data.rows
							this.total=res.data.total
							this.pageSize=res.data.pageSize
							this.AllOrderList.forEach((item,index)=>{
								item.check=false
								item.createTime=new Date(item.createTime).toLocaleDateString().replace(/\//g,'-')
							})
						}
					})
				}else{
					this.axios.get('orderon/query/0?uid='+this.uid+'&status='+this.value).then(res=>{
						if(res.data.status==200){
							this.AllOrderList=res.data.rows
							this.total=res.data.total
							this.pageSize=res.data.pageSize
							this.AllOrderList.forEach((item,index)=>{
								item.check=false
								item.createTime=new Date(item.createTime).toLocaleDateString().replace(/\//g,'-')
							})
						}
					})
				}
				
			},
			//确认POST /orderon/confrim 确认
			orderSure(){
				if(this.orderStr==''){
					this.$notify({
				        title:"",
				        message:this.$t('orders.selecOrder'),
				        type: 'error',
				        position: 'bottom-right'
			        });
				}else{
					this.axios.post('/orderon/confrim?uid='+this.uid,this.orderStr).then(res=>{
						if(res.data.status==200){
							this.$notify({
								title:"",
								message:'已确认',
								type: 'success',
								position: 'bottom-right'
							});
							this.slide()
							this.getAllOrderS()//获取所有线上订单
							this.getCrmDetail(this.indexId)
							this.single=false
							this.numIndex=-1
							this.orderStrArr=[]
		            		this.orderStr=''
						}else{
							this.$notify({
								title:"",
								message: res.data.errorMessage,
								type: 'error',
								position: 'bottom-right'
							});
						}
					})
				}
				
			},
			
			//GET /orderon/delivered/{id} 发货 出现物流弹框
			orderfh(){
				if(this.orderStr==''){
					this.$notify({
				        title:"",//
				        message:this.$t('orders.selecOrder'),
				        type: 'error',
				        position: 'bottom-right'
			        });
				}else{
					this.wlisshow=true
				}
			},
			//物流确认
			sureSearchpk(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						this.axios.get('orderon/delivered/'+this.orderStr+'?uid='+this.uid,{
							params:{
								
								logisticsNo:this.logisticsformValidate.logisticsNo1,
								logistics:this.logisticsformValidate.model2,
								amount:this.logisticsformValidate.amount
							}
						}).then(res=>{
							if(res.data.status==200){
								this.$notify({
									title:"",//
									message: "已发货",
									type: 'success',
									position: 'bottom-right'
								});
								this.slide()
								this.getAllOrderS()//获取所有线上订单
								this.getCrmDetail(this.indexId)
								this.single=false
								this.wlisshow=false
								this.numIndex=-1
								this.orderStrArr=[]
			            		this.orderStr=''
			            		this.logisticsformValidate.logisticsNo1=""
			            		this.logisticsformValidate.model2=""
			            		this.logisticsformValidate.amount=0
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
			//物流取消
			cancelSearchpk(){
				this.wlisshow=false
				this.logisticsformValidate.logisticsNo1=""
        		this.logisticsformValidate.model2=""
        		this.logisticsformValidate.amount=0
			},
			//选择物流
			getlogistics1(value){
				console.log(value)
				this.logisticsformValidate.model2 = value
			},
			//物流登记
			orderWl(){
				this.wlisshow=true
			},
			//费用
			changeAmount(s){
				this.logisticsformValidate.amount=s
			},
			
			//取消订单GET /order/cancel/{id} 取消订单
			orderCancel(){
				if(this.orderStr==''){
					this.$notify({
					        title:"",//
					        message:this.$t('orders.selecOrder'),
					        type: 'error',
					        position: 'bottom-right'
				        });
					}else{
						this.iscancelorder=true
				}
			},
			//取消订单确认
			sureaddressC(){
				this.axios.get('/orderon/cancel/'+this.orderStr+'?remark='+this.iscancelRemark+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.$notify({
							title:"",//
							message: this.$t('orders.iscancel'),
							type: 'success',
							position: 'bottom-right'
						});
						this.iscancelorder=false
						this.slide()
						this.getAllOrderS()//获取所有线上订单
						this.getCrmDetail(this.indexId)
						this.numIndex=-1
						this.single=false
						this.orderStrArr=[]
		            	this.orderStr=''
					}else{
						this.$notify({
							title:"",//
							message: res.data.errorMessage,
							type: 'error',
							position: 'bottom-right'
						});
					}
				})
			},
			//取消取消订单
			iscancelorderC(){
				this.iscancelorder=false
				this.iscancelRemark=''
			},
			//导出
			exportOrder(){
				if(this.orderStr==''){
					this.$notify({
					        title:"",//
					        message:this.$t('orders.selecOrder'),//'请选择订单！',
					        type: 'error',
					        position: 'bottom-right'
				        });
				}else{
					this.axios.get('/orderExport/excel?orderIds='+this.orderStr+'&uid='+this.uid).then(res=>{
						window.location.href=res.request.responseURL
						this.issure=false
						this.print=true
						this.slide()
						this.getAllOrderS()//获取所有线上订单
						this.getCrmDetail(this.indexId)
						this.single=false
						this.numIndex=-1
						this.AllOrderList.forEach((x)=>{
							x.check=false
						})
						this.orderStrArr=[]
		            	this.orderStr=''
	            	})
				}
			},
			//打印
			Prin(){
				if(this.orderStr==''){
					this.$notify({
						title: "",//'错误',
						message:this.$t('orders.selecOrder'),//'请选择订单',
						type: 'error',
						position: 'bottom-right'
					});
				}else{
					this.axios.get('/orderExport/pdf?orderIds='+this.orderStr+'&uid='+this.uid).then(res=>{
						if(res.data!=null){
							this.$notify({
								title:"",//
								message: res.data.errorMessage,
								type: 'error',
								position: 'bottom-right'
							});
						}else{
							window.location.href=res.request.responseURL
							this.issure=false
							this.slide()
							this.getAllOrderS()//获取所有线上订单
							this.getCrmDetail(this.indexId)
							this.numIndex=-1
							this.single=false
							this.AllOrderList.forEach((x)=>{
								x.check=false
							})
							this.orderStrArr=[]
		            		this.orderStr=''
						}
						
		        	})
				}
				
			},
			//获取订单详情
			getCrmDetail(id){
				this.axios.get('orderon/get/'+id+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.orderDetail=res.data.rows.details
						this.detailsOrder=res.data.rows
						let rows=res.data.rows
						this.orderno=res.data.rows.orderNo
						this.orderNum=res.data.rows.orderNo
						this.deliveryTypeDesc=res.data.rows.deliveryTypeDesc//配送方式
						this.mobile=res.data.rows.mobile//手机号
			
						this.receiveAddress=res.data.rows.receiveAddress//地址
						this.receiveCity =res.data.rows.receiveCity //地址
						this.payTypeDesc =res.data.rows.payTypeDesc //支付方式
						this.statusDesc=res.data.rows.statusDesc
						
						this.amount=res.data.rows.amount
						this.createTime=this.getLocalTimeH(res.data.rows.createTime)
						//10;//待支付  20:待确认  23：待发货    30：发货中  40：待收货  50 ：已完成 79：已关闭 99：已取消
						//待支付 
						if(rows.status==10){
							this.issure=false//确认
							this.isyfh=false//已发货
							this.print=true//打印
							this.isexport=true//导出
							this.isycancel=true
							this.activeIsShow=true//步骤条
							this.active=1
							this.isyqs=false//签收
						}
						//已支付 确认
						if(rows.status==20){
							this.issure=true//确认
							this.isyfh=false//已发货
							this.print=true//打印
							this.isexport=true//导出
							this.isyqs=false//签收
							this.isycancel=true
							this.activeIsShow=true//步骤条
							this.active=2
						}
						//23：待发货
						if(rows.status==23){
							this.issure=false//确认
							this.isyfh=true//已发货
							this.print=true//打印
							this.isexport=true//导出
							this.isyqs=false//签收
							this.isycancel=true
							this.activeIsShow=true//步骤条
							this.active=3
						}
						//30：待签收
						if(rows.status==30){
							this.issure=false//确认
							this.isfh=false//发货中
							this.isyfh=false//已发货
							this.print=true//打印
							this.isexport=true//导出
							this.isyqs=true//签收
							this.isycancel=false
							this.activeIsShow=true//步骤条
							this.active=5
						}
						//50 ：已完成
						if(rows.status==50){
							this.issure=false//确认
							this.isfh=false//发货中
							this.isyfh=false//已发货
							this.print=true//打印
							this.isexport=true//导出
							this.isycancel=false
							this.activeIsShow=true//步骤条
							this.active=6
						}
						//取消
						if(rows.status==99 || rows.status==79 || rows.status==999){
							this.issure=false//确认
							this.isfh=false//发货中
							this.isyfh=false//已发货
							this.print=true//打印
							this.isyqs=false//签收
							this.isexport=true//导出
							this.isycancel=false
							this.activeIsShow=false//步骤条
							
						}
					}
				})
			},
			//获取所有线上订单
			getAllOrderA(s){
				this.axios.get('orderon/query/0?uid='+this.uid+'&status='+s).then(res=>{
					if(res.data.status==200){
						this.AllOrderList=res.data.rows
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.AllOrderList.forEach((item,index)=>{
							item.check=false
							item.createTime=this.getLocalTimeH(item.createTime)
						})
					}
				})
			},
			//获取所有线上订单
			getAllOrder(){
				this.axios.get('orderon/query/'+this.value+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.AllOrderList=res.data.rows
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.AllOrderList.forEach((item,index)=>{
							item.check=false
							item.createTime=this.getLocalTimeH(item.createTime)
						})
					}
				})
			},
			 //下拉框选择
			orderselected(value){
				this.orderStrArr=[]
            	this.orderStr=''
				this.value = value
				this.current=1
				if(this.value==0){
					this.getAllOrder()
				}else{
					this.getAllOrderA(this.value)//全部线上订单
				}
				
			},
			//翻页
			storegetData(current){
				if(this.value==0){
					this.axios.get('orderon/query/0?offset='+current+'&uid='+this.uid).then((res)=>{
						let data = res.data
						this.AllOrderList = data.rows;
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.AllOrderList.forEach(item=>{
							item.createTime=this.getLocalTimeH(item.createTime)
						})
				 	})
				}else{
					this.axios.get('orderon/query/0?offset='+current+'&uid='+this.uid+'&status='+this.value).then((res)=>{
						let data = res.data
						this.AllOrderList = data.rows;
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.AllOrderList.forEach(item=>{
							item.createTime=this.getLocalTimeH(item.createTime)
						})
				 	})
				}
				
			},
			storechangePageSize(size){
				if(this.value==0){
					this.axios.get('orderon/query/0?length='+size+'&uid='+this.uid).then((res)=>{
						let data = res.data
						this.AllOrderList = data.rows;
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.AllOrderList.forEach((item)=>{
							item.createTime=this.getLocalTimeH(item.createTime)
						})
				 	})
				}else{
					this.axios.get('orderon/query/0?length='+size+'&uid='+this.uid+'&status='+this.value).then((res)=>{
						let data = res.data
						this.AllOrderList = data.rows;
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.AllOrderList.forEach((item)=>{
							item.createTime=this.getLocalTimeH(item.createTime)
						})
						
				 	})
				}
				
			},
			//下拉加载更多
            handleReachEdge(){
				this.current++//默认10条
				//全部订单
				this.axios.get('orderon/query/'+this.value+'?offset='+this.current+'&uid='+this.uid+'&status='+this.value).then((res)=>{
	 				if(this.current>Math.ceil(this.total/this.pageSize)){
	 						this.current=Math.ceil(this.total/this.pageSize)
	 					}
	 				let data=res.data.rows
			 		data.forEach((item)=>{
			 			this.AllOrderList.push(item)
			 			this.AllOrderList.forEach((x,index)=>{
							x.createTime=this.getLocalTimeH(x.createTime)
						})
			 		})

			 	}) 
            },
            //叉号返回
        	cancelHome(){
				this.$router.push('/order')
				// this.$router.push('/orderHome')
        	},
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
						// this.getwlHistory()
					break;
				}

			},
			//获取订单日志
			getlogDate(){
				this.axios.get('/orderon/orderlog/'+this.orderno+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.logDate=res.data.rows.rows
						this.logDate.forEach(item=>{
							item.createTime=this.getLocalTimeH(item.createTime)
						})
					}
				})
			},
			//获取财务详情GET /order/orderpay/{orderNo} this.orderno
			getFinance(){
				this.axios.get('/orderon/orderpay/'+this.orderno+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.orderFinanceData=res.data.rows
						this.FinancepageSize=res.data.total
						this.Financetotal=res.data.pageSize
						this.orderFinanceData.forEach((x)=>{
							x.createTime=this.getLocalTimeH(x.createTime)
						})
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
						this.orderFinanceData.forEach((x)=>{
							x.createTime=this.getLocalTimeH(x.createTime)
						})
					}
				})
			},
			FinancechangePageSize(size){
				this.FinancepageSize=size
			},
			//获取物流历史this.indexId
			getwlHistory(){
				// this.axios.get('').then(res=>{
				// 	if(res.data.status==200){
				// 		this.orderwlHData=res.data.rows
				// 		this.wlHpageSize=res.data.total
				// 		this.wlHtotal=res.data.pageSize
				// 	}
				// })
			},
			//翻页
			wlHgetData(current){
				// this.axios.get('').then(res=>{
				// 	if(res.data.status==200){
				// 		this.orderwlHData=res.data.rows
				// 		this.wlHpageSize=res.data.total
				// 		this.wlHtotal=res.data.pageSize
				// 	}
				// })
			},
			wlHchangePageSize(size){
				this.wlHpageSize=size
			},
			//搜索订单
			search(){
				this.axios.get('orderon/query/0'+'?uid='+this.uid+'&keyword='+this.searchKeyword).then(res=>{
					if(res.data.status==200){
						this.AllOrderList=res.data.rows
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.AllOrderList.forEach((item,index)=>{
							item.check=false
				
							item.createTime=this.getLocalTimeH(item.createTime)
						})
						
					}
				})
			},
			enterSearch(){
				this.search()
			},
		},
		mounted(){
			if(this.$route.query.id){
				this.indexId = this.$route.query.id
				this.numIndex = this.$route.query.index
				this.value=this.$route.query.s
				this.getcginfo(this.indexId,this.numIndex,this.$route.query.item)
				this.numIndex=-1
				this.getCrmDetail(this.indexId)
			}else{
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
.lanrenLeft1{
    position: absolute;
    text-align: center;
    top: 0px;
    right: 1px;
    width: 0;
    height: 0;
	z-index:0;
    border-top:80px solid #d53c39;
    border-left:80px solid transparent;
}
.lanrenLeft1 span{
    width: 70px;
    height: 23px;
    color: #fff;
    display: block;
    position: relative;
    z-index: 9999999999999;
    top: -63px;
    right: 62px;
    font-size: 15px;
    font-weight: 100;
    transform: rotate(46deg);
}
.bg41{
    border-top:80px solid #40ca98;
}
/*状态的颜色*/
.bg51{
    border-top:80px solid #d53c39;
}
.bg61{
    border-top:80px solid #3b77e3;
}
.head{
width:100%;
  height:60px;
  display: flex;
  position: fixed;
  z-index:10;
  background: #fff;
  border-bottom:1px solid #e4e4e4;
	
}

.totBottom1{
    position:fixed;
    bottom:5px;
    left:130px;
    z-index:11;
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
    border-top:50px solid #d53c39;
    border-left:50px solid transparent;
}
.lanrenLeft span{
width: 55px;
    height: 23px;
    color: #fff;
    display: block;
    position: relative;
    z-index: 9999999999999;
    top: -42px;
    right: 45px;
    font-size: 12px;
    font-weight: 100;
    transform: rotate(46deg);
}
.bgd31{
    border-top:50px solid #3b77e3;
}
.bgd3{
    border-top:50px solid #40ca98;
}
.bgd4{
    border-top:50px solid #278fa3;
}
/*状态的颜色 新增*/
.bgd5{
    border-top:50px solid #284a8a;
}
/*状态的颜色 */
.bgd6{
    border-top:50px solid #40ca98;
}
.bgd7{
    border-top:50px solid #629b86;
}
.bgd8{
    border-top:50px solid #298E8E;
}
.bgd9{
    border-top:50px solid #3b77e3;
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
	display: flex;

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
.detail-title:hover{
cursor:pointer
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
.operator{
margin: 0 30px;
    width: 126px;
    text-align: center;
    display: inline-block;
}
</style>
<style type="text/css">
 .content{
    padding-left: 5px;
    top:0!important;
}
.el-upload--text,.ivu-scroll-wrapper{
	width:100%!important;
}
</style>