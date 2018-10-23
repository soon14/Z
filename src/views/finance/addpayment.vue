<template>
	<!--新建付款单-->
	<div class="add-box">
		
			<!--固定导航-->
      <div class="heade"> 
       
            
                    <div class="left-top">
                      <p class="wldw">
                            <!-- <span style="width:42px;font-weight:900">{{$t('public.screen')}}：</span>
                             <Select style="width:100px"   @on-change="orderselected">
                                <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> -->
                        </p>
						<div>
						<!--新建-->
						<span class="top-left-btn"  @click="addUnit">
							<Icon type="plus" style="position:absolute;top:7px;left:8px"></Icon></span>
						
					</div>
                    </div> 
       
    				<span style="position:absolute;left:380px;top:20px;font-weight:600;font-size:16px">
                        {{renum}}</span>
                    <div class="right-top">
                        
                        <div style="display:flex;margin-right: 10px;">
                        	<div>
                            
                            <Button type="primary" shape="circle" style="margin-right:5px;border:none;background:#3b77e3;color:#fff"  @click="saveBaseInfo('formValidate')" v-show="addText"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}</Button>

                             <Button type="primary" shape="circle" style="background:#40ca98;margin-right:5px;color:#fff;border:none"  @click="changeUnitInfo1" v-show="xiugaibtn1"><i class="el-icon-edit" style=";margin-right:5px;"></i>{{$t('public.EditBtn')}}</Button>
                               <Button type="primary" shape="circle" style="background:#3b77e3;margin-right:5px;color:#fff;border:none"  @click="changeUnitInfo2('formValidate1')" v-show="xiugaibtn2"><Icon type="edit" style="position:relative;right:5px"></Icon>{{$t('public.SaveBtn')}}</Button>
                             <Button type="primary" shape="circle" style="background:#999999;color:#fff;"   @click="cancel" v-show="addText" ><Icon type="close" style="margin-right:5px;"></Icon>{{$t('public.cancel')}}</Button>
						</div>
						<!-- <div style="margin-right:130px;display:flex">
                            <div  class="cursor">
	                            <Poptip placement="bottom-end">
									<div type="ghost">
										<Button type="primary" shape="circle" style="background:#ff8b00;color:#fff;margin-left:10px;">更多
										   <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
										</Button>
									</div>
									<div slot="content" style="width:80px;overflow: hidden;">
										<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;padding:8px 0 0px 10px;" @click="delunit">删除</p>
										
									</div>
								</Poptip>
								<span @click="cancelHome" style="cursor:pointer;margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
							</div>
                           </div> -->
                           <Dropdown trigger="click" style="margin-left: 4px">
                                <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">{{$t('public.more')}}
                                <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
                            </Button>

                            <DropdownMenu slot="list">
                                <span  @click="delunit"><DropdownItem >{{$t('public.del')}}</DropdownItem></span>
                              
                            </DropdownMenu>
                         </Dropdown>
                          <span @click="cancelHome" style="cursor:pointer;margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
                        </div>
                    </div>
               
     </div> 
		<div class="cheng"></div>

			<!--左边往来单位列表-->
			
				<div class="left-content">
					<p v-if="Allunits.length==0">
						<Spin fix>
			               
			                 <div>{{$t('public.NoData')}}</div>
			            </Spin>
				    </p>
					<Scroll :on-reach-bottom="handleReachEdge" :height="height" v-else>
						<div class="con-list" v-for="(item,index) in Allunits" @click="updataUnit(item.id,index)" :class="{bg:numLeftList==index}">
							 <span style="margin-right: 10px;">
							 	 <Checkbox :value="numLeftList==index"></Checkbox>
							 	<!-- <input type="checkbox" :checked="numIndex==index"></input> -->
							 </span>
							 <div>
							<p class="list-title">{{item.recordNo}}</p>
							<p class="txt" style="margin-top:10px;">
								<span style='display:inline-block;margin-top:10px'>{{item.remark}}</span>
							</p>
							<span class="status" ><span style='color:red;display:inline-block;padding-bottom:10px;margin-top:10px' >￥：{{item.amount}}</span></span>
							<span class="date">{{item.recordDate}}</span>
							</div>
						</div>
						
					</Scroll>
				</div>
			<!--右边保存与修改-->
			
				<!--保存-->
				<div class="add-right">
					
						<div v-show="addText" style="width:100%;height:100%;padding:10px 0 10px 10px">
							 <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
							 	<Col span="11">
							 	 <FormItem :label="$t('finance.sk.supplier')" prop="khName">
							 	 	<span  @click='selekh' >
                                    	<Input v-model="formValidate.khName" ></Input>
                                    </span>
                                </FormItem>
                                	<FormItem :label="$t('finance.sk.shzxm')" prop="szName">
								 	 	<span  @click='selesz' >
	                                    	<Input v-model="formValidate.szName" ></Input>
	                                    </span>
                                	</FormItem>
                                <FormItem :label="$t('finance.sk.payMoney')" prop="amount">
							 	 
                                    	<Input v-model="formValidate.amount" ></Input>
                                    
                                </FormItem>
                                </Col>
                                <Col span="11">
                                	<FormItem :label="$t('finance.sk.ey')" prop="ygName">
								 	 	<span  @click='seleyg' >
	                                    	<Input v-model="formValidate.ygName" ></Input>
	                                    </span>
                                	</FormItem>
                                	<FormItem :label="$t('finance.orderTime')">
	                                   <DatePicker type="date" :value='recordDate'  style="width:100%" @on-change="shdate"></DatePicker>
                                	</FormItem>
                                 </Col>
							 </Form>
								<Col span="22">
								<Input v-model="remark" style="width:100%;padding-left:20px" type="textarea" :placeholder="$t('public.remark')" class="getaddress" :min-row="6"></Input>
								</Col>
							
							
						</div>
						
			
					<!--客户修改-->
				
				<div v-show="xiugai" style="width:100%;height:100%;padding:10px 0 10px 10px">
					<Form ref="formValidate1" :model="formValidate" :rules="ruleValidate" :label-width="80">
					 	<Col span="11">
					 	 <FormItem :label="$t('finance.sk.supplier')" prop="khName">
					 	 	<span  @click='selekh' >
                            	<Input v-model="formValidate.khName" ></Input>
                            </span>
                        </FormItem>
                        	<FormItem :label="$t('finance.sk.shzxm')" prop="szName">
						 	 	<span  @click='selesz' >
                                	<Input v-model="formValidate.szName" ></Input>
                                </span>
                        	</FormItem>
                        <FormItem :label="$t('finance.sk.payMoney')" prop="amount">
					 	 
                            	<Input v-model="formValidate.amount"></Input>
                            
                        </FormItem>
                        </Col>
                        <Col span="11">
                        	<FormItem :label="$t('finance.sk.ey')" prop="ygName">
						 	 	<span  @click='seleyg' >
                                	<Input v-model="formValidate.ygName" ></Input>
                                </span>
                        	</FormItem>
                        	<FormItem :label="$t('finance.orderTime')">
                               <DatePicker type="date" :value='recordDate'  style="width:100%" @on-change="shdate"></DatePicker>
                        	</FormItem>
                         </Col>
					 </Form>
						<Col span="22">
						<Input v-model="remark" style="width:100%;padding-left:20px" type="textarea" :placeholder="$t('public.remark')" class="getaddress" :min-row="6"></Input>
						</Col>
				</div>
							
			
				<!--详情明细订单页面-->
                <div class="right-content right-detail" ref="details"  >
                        <div >
                            
                            <div class="detail-top" >
                               <ul class='cgtable'>
									<li>
										{{$t('finance.sk.orderNo')}}<!--单据编号-->
									</li>
									<li>
										{{$t('finance.skmoney')}}<!--收款数额-->
									</li>
									<li>
										{{$t('finance.sk.orderTime')}}<!--收款日期-->
									</li>
									<li>
										{{$t('public.remark')}}<!--备注-->
									</li>
								</ul>
								<ul class='cgtable1'>
									<li>
										{{storeDetails.recordNo}}
									</li>
									<li>
										{{storeDetails.amount}}
									</li>
									<li>
										{{storeDetails.recordDate}}
									</li>
									<li>
										{{storeDetails.remark}}
									</li>
								</ul>
                                <ul class='cgtable'>
									<li>
										{{$t('finance.sk.KH')}}<!--客户-->
									</li>
									<li>
										{{$t('purchase.supplier.contractTel')}}<!--电话-->
									</li>
									<li>
										{{$t('purchase.supplier.contractPhone')}}<!--手机-->
									</li>
									<li>
										{{$t('purchase.supplier.Raddress')}}<!--地址-->
									</li>
								</ul>
								<ul class='cgtable1'>
									<li>
										{{partner.name}}
									</li>
									<li>
										{{partner.contractPhone}}
									</li>
									<li>
										{{partner.contractTel}}
									</li>
									<li>
										{{partner.address}}
									</li>
								</ul>
                            </div>
                          
                        </div>
                        
              	</div>  
			
			</div>
				
	
		
			
			<!--供应商弹框-->
			<Modal v-model="khisshow" width="660px">
				<p slot="header" style="height:30px;line-height:30px">
					
					<span>{{$t('public.search')}}</span>
				</p>
				<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
					<Input v-model="gyskeyword"  style="padding:2px 0" @on-enter='enterSearch'>
					</Input>
					<span @click="getgysKeyword">
					<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>

					</span>
				</div>
				<div slot="footer" style='margin-top:-10px'>
					<!--客户表格-->
					<Table  border highlight-row height="300" :columns="gyskey" :data="gysdata" @on-row-click="gysrow">
					</Table>
					<!--分页-->
		            <div class="page-box" style="text-align:left">
					 <Page :total="gystotal" :pageSize='gyspageSize' show-total @on-change="getgysData" @on-page-size-change="changegysPageSize"></Page>
					</div>
					<div class='title' style='margin:0'>
						<div style='color:#D15151;font-size:14px'>
							<!-- <Icon type="plus" style='margin-right:5px'></Icon>
							<span >添加客户</span> -->
						</div>
						<div>
							<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
							<Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="makegys"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
						</div>
					</div>
				</div>
			</Modal>
			<!--员工弹框-->
			<Modal v-model="ygisshow" width="660px">
				<p slot="header" style="height:30px;line-height:30px">
					
					<span>{{$t('public.search')}}</span>
				</p>
				<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
					<Input v-model="ygkeyword" style="padding:2px 0" @on-enter='enterSearchYg'>
					</Input>
					<span @click="getygKeyword">
					<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>

					</span>
				</div>
				<div slot="footer" style='margin-top:-10px'>
					
					<Table  border highlight-row height="300" :columns="ygkey" :data="ygdata" @on-row-click="ygrow">
					</Table>
				
		            <div class="page-box" style="text-align:left">
					 <Page :total="ygtotal" :pageSize='ygpageSize' show-total @on-change="getygData" @on-page-size-change="changeygPageSize"></Page>
					</div>
					<div class='title' style='margin:0'>
						<div style='color:#D15151;font-size:14px'>
							<!-- <Icon type="plus" style='margin-right:5px'></Icon>
							<span >添加客户</span> -->
						</div>
						<div>
							<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
							<Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="makegys"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
						</div>
					</div>
				</div>
			</Modal>
			<!--收支项目弹框-->
			<Modal v-model="szisshow" width="660px">
				<p slot="header" style="height:30px;line-height:30px">
					
					<span>{{$t('public.search')}}</span>
				</p>
				<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
					<Input v-model="szkeyword" style="padding:2px 0" @on-enter='enterSearchsz'>
					</Input>
					<span @click="getszKeyword">
					<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>

					</span>
				</div>
				<div slot="footer" style='margin-top:-10px'>
					
					<Table  border highlight-row height="300" :columns="szkey" :data="szdata" @on-row-click="szrow">
					</Table>
				
		            <div class="page-box" style="text-align:left">
					 <Page :total="sztotal" :pageSize='szpageSize' show-total @on-change="getszData" @on-page-size-change="changeszPageSize"></Page>
					</div>
					<div class='title' style='margin:0'>
						<div style='color:#D15151;font-size:14px'>
							<!-- <Icon type="plus" style='margin-right:5px'></Icon>
							<span >添加客户</span> -->
						</div>
						<div>
							<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
							<Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="makegys"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
						</div>
					</div>
				</div>
			</Modal>
			 <div class='totBottom'>
		        <span>共<span style='color:#ff0000'> {{total}} </span>条</span>
		        <span>当前第<span style='color:#ff0000'> {{current}} </span>页</span>
		    </div>
		</div>	

		
	</div>
</template>

<script>

	export default {
		data() {
			return {
				szisshow:false,
				szpageSize:0,
				sztotal:0,
				szkeyword:'',
				szdata:[],
				formValidate:{
					khName:'',
					amount:0,
					ygName:'',
					szName:'',
				},
				ruleValidate:{
					khName:[{ required: true, message:this.$t('public.gysNoE'), trigger: 'blur' }] ,
					amount:[{ required: true, message:this.$t('public.jeNoE'), trigger: 'blur' }] ,
					// ygName:[{ required: true, message: '员工不能为空', trigger: 'blur' }] ,
					// szName:[{ required: true, message: '收支项目不能为空', trigger: 'blur' }] ,
				},
				loading:"暂无数据",
				ygisshow:false,
				ygkeyword:"",
				ygdata:[],
				ygkey:[
					{
						title:this.$t('purchase.supplier.name'),//"名称",
						key:"name"
					},
					{
						title:this.$t('purchase.supplier.code'),//"编码",
						key:"code"
					},
					{
						 title:this.$t('purchase.supplier.contractPhone'),//"手机",
						key:"phone"
					},
					
				],
				khisshow:false,
				gyskeyword:'',
				gystotal:0,
				gyspageSize:0,
				//供应商key
				gysdata:[],
				gyskey:[
					{
	                	title:this.$t('purchase.supplier.code'),//"编码",
	                	ellipsis:true,
	                	key:"code"
                	},
					{
	                	title:this.$t('purchase.supplier.name'),//"名称",
	                	ellipsis:true,
	                	key:"name"
                	},
                	{
                		 title:this.$t('purchase.supplier.contractTel'),//"电话",
                		key:'tel'
                	},
                	{
                		title:this.$t('purchase.supplier.Raddress'),//"地址",
                		key:'Raddress'
                	},
                	{
	                	title:this.$t('public.status'),//"状态",
	                	ellipsis:true,
	                	key:"statusDesc"
                	},

                	
				],
				szkey:[
					{
						title:this.$t('purchase.supplier.name'),//"名称",
						key:'name'
					},
					{
						title:this.$t('purchase.supplier.code'),//"编码",
						key:'code'
					}
				],
					
				
				num5:0,
				goodskey1total:0,
				goodskey1pageSize:0,
				goodskey2pageSize:0,
				goodskey2total:0,
				selectedgoodsrow1:[],
				
				selectedgoodsrow2:[],
				goodskey2:[
					{
						title:this.$t('finance.orderNo'),//"单据编号",
						key:"recordNo"
					},
					{
						title:this.$t('finance.orderTime'),//"单据日期",
						key:"recordDate"
					},
					{
						title:this.$t('purchase.supplier.contractPhone'),//"手机",
						key:"contractPhone"
					},
					{
						title:this.$t('purchase.supplier.contractTel'),//"电话",
						key:"contractTel"
					},
					{
						title:this.$t('operation.yhqHome.beginTime'),//"开始时间",
						key:"startTime"
					},
					{
						title:this.$t('operation.yhqHome.endTime'),//"结束时间",
						key:"endTime"
					},
				],
				
				xiugai:false,
				xiugaibtn1:false,
				xiugaibtn2:false,
				num4:0,
				orderListname:[
                    // {
                    //     label:"全部",
                    //     value:0
                    // },
                    // {
                    //     label:"未审核",
                    //     value:1
                    // },
                    // {
                    //     label:"未签收",
                    //     value:3
                    // },
                    // {
                    //     label:"进货单",
                    //     value:5
                    // },
                    // {
                    //     label:"退货单",
                    //     value:7
                    // }
                ],
				// details:false,
				renum:'',//单号
				num3:0,
				titles1:['关联商品','报价单历史'],
				num2:0,
				titles:['基本信息','备注'],
				height:'',
				current:1,
				total:0,
				pageSize:0,
				
				num: 1, //判断基本信息 联系人信息的样式
				numLeftList:0,
				
				unitsText:this.$t('public.addnew'),//"新增付款单",//新增付款单
				addText:true,
				unitsDetail: false, //付款单详细信息
				flag: 1, //概览   采购  联系人 备注  哪个显示
				newBusiness:false,
				
				data:[],
				userList:[],//联系人列表
				Allunits: [], //往来单位列表
				id: '', //往来单位的id
				
				contractTel: '',//单位电话

				storeDetails:{},//收款单详情
			
				employeeId:'',//员工编号
				ygpageSize:0,
				ygtotal:0,
				remark: '',
				contractPhone:"",//往来联系人电话
				uid: this.$store.state.common.token,
				partner:{},//客户
				finItemId:'',
				amount:0,
				recordDate:'',
				khobject:{}
			}	
		},
		methods: {
		
			getstatus(status){
				this.statusDesc = status
				//console.log(status)
			},
			//获取收款单列表信息
			getUnitsList: function() {
				this.axios.get('/payment/query?uid=' + this.uid).then((res) => {
					let data = res.data;
					//console.log(data)
					if(res.data.status == '200') {
						
							this.Allunits = data.rows;
							this.pageSize = data.pageSize;
							this.total = data.total;
							//console.log(this.Allunits)
							this.Allunits.forEach(item=>{
								item.recordDate =new Date(item.recordDate ).toLocaleDateString().replace(/\//g,'-')
							})
						
						
						
					} else {
						this.$notify({
	                        title:"",//
	                        message:res.data.errorMessage,
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
					}
				})
			},
			
			//点击新建
			addUnit(){
				// this.details=false
				this.$refs.details.style.display='none'
				
				this.addText = true
				this.newBusiness = false
				this.xiugai=false
				this.xiugaibtn1=false
				this.xiugaibtn2=false
				this.unitsText = this.$t('public.addnew'),//"新增付款单"
				this.formValidate.amount=0
				this.formValidate.khName=''
				this.remark=''
				this.recordDate=''
				this.formValidate.ygName=''
				this.employeeId=''
			},

			//双击左侧列表
			updataUnit(id,index){
				this.numLeftList =index
				this.id = id
				
				this.addText = false;
				this.newBusiness = true
				// this.details=true
				this.$refs.details.style.display='block'
				
				this.xiugai=false
				this.xiugaibtn2=false
				this.xiugaibtn1=true

				this.unitsText = "查看付款单"
				this.getUnitDefault(id)
				
				
			},
			//获取收款单详情
			getUnitDefault(id){
					this.axios.get('/payment/get/' + id + '?uid=' + this.uid).then((res) => {
	                    if(res.data.status == '200') {
	                    	//console.log(res.data.rows)
	                    	let data = res.data.rows;
	                    	this.storeDetails=data
	                    	this.formValidate.amount=data.amount
	                    	this.remark=data.remark
	                    	this.recordDate=data.recordDate 
	                    	this.partnerId=data.partnerId  
	                    	this.employeeId=data.employeeId
	                    	this.payType=data.payType
	                    	this.formValidate.khName=data.partner.name
	                    	this.partner=data.partner
	                    	this.renum=data.recordNo
	                    	
	                } else {
	                  this.$notify({
                        title:"",//
                        message:res.data.errorMessage,
                        type: 'error',
                        position: 'bottom-right'
                    });
	                }
	            })
			},
			//点击保存新建基本信息
			saveBaseInfo(name) {
				this.$refs[name].validate((valid) => {
					if(valid){
						this.axios.post('/payment/add?uid=' + this.uid, {
							amount:this.formValidate.amount,
		                	employeeId:this.employeeId,
		                	// partner:this.partner,
		                	partnerId:this.partnerId,
		                	recordDate:this.recordDate,
		                	remark:this.remark,
		                	payType:1,
		                	finItemId:this.finItemId 
		                	
							}).then((res) => {
							
			                    if(res.data.status=='200'){
			                    	
									this.$notify({
				                        title:"",//
				                        message:this.$t('public.SaveSuccess'),//
				                        type: 'success',
				                        position: 'bottom-right'
				                    });
									this.getUnitsList()

			                    }else{
			                    	this.$notify({
				                        title:"",//
				                        message:res.data.errorMessage,
				                        type: 'error',
				                        position: 'bottom-right'
				                    });
			                    }
							})
					}
				})
				
				
			},
			addborder5(index){
				this.num5=index
				
			},
			addborder(index){
				this.num2=index
				if(num2==1){
					
				}
			},
			addborder1(index){
				this.num4=index
				if(this.num4==0){
					
				}
				if(this.num4==1){
				
				}
			},
			
			changeUnitInfo1(){
				// this.details=false
				this.$refs.details.style.display='none'
				
				this.xiugai=true
				this.addText=false
				this.xiugaibtn1=false
				this.xiugaibtn2=true
			},
			//修改付款单信息
			changeUnitInfo2(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						this.axios.put('/payment/update?uid='+this.uid,{
							id:this.id,
							amount:this.formValidate.amount,
		                	employeeId:this.employeeId,
		                	// partner:this.partner,
		                	partnerId:this.partnerId,
		                	recordDate:this.recordDate,
		                	remark:this.remark,
		                	finItemId:this.finItemId,
		                	payType:1,
						}).then((res)=>{
							if(res.data.status=200){
								
								this.$notify({
			                        title:"",//
			                        message:this.$t('public.editSuccess'),//
			                        type: 'success',
			                        position: 'bottom-right'
			                    });
								this.getUnitsList();
								this.addUnit()
								
								
							}else{
								this.$notify({
			                        title:"",//
			                        message:res.data.errorMessage,
			                        type: 'error',
			                        position: 'bottom-right'
			                    });
							}
						})
					}
				})
			},
			//取消
			cancel(){
				this.addUnit()
			},
			//获取联系人列表
			getUserList:function(){
				
			},
			 //删除收款单信息
            delunit: function() {
               //修改的时候 删除  删除供应商
              //console.log(this.id)
               this.axios.delete('/payment/delete/' + this.id + '?uid=' + this.uid).then(res=>{
               	if(res.data.status==200){
               		
               			this.$notify({
	                        title:"",//
	                        message:this.$t('public.deleteSuccess'),//
	                        type: 'success',
	                        position: 'bottom-right'
	                    });
                        this.getUnitsList()
                        // this.addText = true;
                       this.addUnit()
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
          
            //点击差号
            cancelHome(){
                this.$router.push('/payment')
            },
            //下拉加载更多
            handleReachEdge(){
				this.current++//默认10条
    	 		this.axios.get('/payment/query?offset='+this.current+'&uid='+this.uid).then((res)=>{
	 				if(res.data.status==200){
	 					if(this.current>Math.ceil(this.total/this.pageSize)){
                            this.current=Math.ceil(this.total/this.pageSize)
                        }
	 					res.data.rows.forEach((item)=>{
				 			item.recordDate =new Date(item.recordDate ).toLocaleDateString().replace(/\//g,'-')
				 			this.Allunits.push(item)
				 			this.Allunits.forEach((x,index)=>{

							
								x.recordDate =new Date(x.recordDate ).toLocaleDateString().replace(/\//g,'-')
							})
				 		})
	 				}
			 		

			 	})
	                  
            },
          // //设置日期
			shdate(date){
				this.recordDate = date
				console.log(date)
				
			},
          	//选择员工
			seleyg(){
				this.ygisshow=true
				this.axios.get('/employee/query?uid=' + this.uid).then((res) => {
					
					let data = res.data;
					
					if(res.data.status == '200') {

						this.ygdata = data.rows;
						this.ygtotal=data.total
						this.ygpageSize=data.ygpageSize
						
					} else {
						this.$notify({
	                        title:"",//
	                        message:res.data.errorMessage,
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
					}
				})
			},
			//员工模糊搜索
			getygKeyword(){
			
				this.axios.get('employee/list?keyword='+this.ygkeyword+'&uid='+this.uid).then((res)=>{
				
					if(res.data.status==200){
						console.log()
						this.ygdata = res.data.rows
						this.ygtotal=res.data.total
						this.ygpageSize=res.data.ygpageSize
					}
				})
			
			},
			//回车搜索员工
			enterSearchYg(){
				this.getygKeyword()
			},
			//员工弹框出现后点击表格行数据
			ygrow(data,index){
				//console.log(data)
				this.employeeId=data.id
				this.formValidate.ygName=data.name
				
  			},
  			 //切换一条页
            getygData(current){
                this.axios.get('employee/list?offset='+current+'&uid='+this.uid).then((res)=>{
                    ////console.log(res)
                    this.ygdata = res.data.rows
                   })
            },
            //翻页
            changeygPageSize(size){
                this.ygpageSize = size
            },
            //选择收支项目
			selesz(){
				this.szisshow=true
				this.axios.get('/finitem/query?uid=' + this.uid).then((res) => {
					
					let data = res.data;
					
					if(res.data.status == '200') {

						this.szdata = data.rows;
						this.sztotal=data.total
						this.szpageSize=data.pageSize
						
					} else {
						this.$notify({
	                        title:"",//
	                        message:res.data.errorMessage,
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
					}
				})
			},
			//收支项目模糊搜索
			getszKeyword(){
			
				this.axios.get('finitem/query?keyword='+this.szkeyword+'&uid='+this.uid).then((res)=>{
				
					if(res.data.status==200){
						console.log()
						this.szdata = res.data.rows
						this.sztotal=res.data.total
						this.szpageSize=res.data.pageSize
					}
				})
			
			},
			//回车搜索收支项目
			enterSearchsz(){
				this.getszKeyword()
			},
			//收支项目弹框出现后点击表格行数据
			szrow(data,index){
				//console.log(data)
				this.finItemId=data.id
				this.formValidate.szName=data.name
				
  			},
  			 //收支项目切换一条页
            getszData(current){
                this.axios.get('finitem/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    ////console.log(res)
                    this.szdata = res.data.rows
                   })
            },
            //收支项目翻页
            changeszPageSize(size){
                this.szpageSize = size
            },
			//选择供应商
			selekh(){
				this.khisshow=true
				this.axios.get('/partner/list?uid=' + this.uid).then((res) => {
					
					let data = res.data;
					
					if(res.data.status == '200') {

						this.gysdata = data.rows;
						this.gystotal=data.total
						this.gyspageSize=data.pageSize
						this.gysdata.forEach((x)=>{
							x.Raddress=x.province+x.city+x.district+x.address
						})
						
					} else {
						
						this.$notify({
	                        title:"",//
	                        message:res.data.errorMessage,
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
					}
				})
			},
			 //切换一条页
            getgysData(current){
                this.axios.get('partner/list?offset='+current+'&uid='+this.uid).then((res)=>{
                    ////console.log(res)
                    this.gysdata = res.data.rows
                    this.gystotal=data.total
					this.gyspageSize=data.pageSize
                   })
            },
            //翻页
            changegysPageSize(size){
                this.gyspageSize = size
            },
			//供应商模糊搜索
			getgysKeyword(){
			
				this.axios.get('partner/list?keyword='+this.gyskeyword+'&uid='+this.uid).then((res)=>{
				
					if(res.data.status==200){

						this.gysdata = res.data.rows
						this.gystotal=data.total
						this.gyspageSize=data.pageSize
					}
				})
			
			},
			//回车搜索
			enterSearch(){
				this.getgysKeyword()
			},
			//客户弹框出现后点击表格行数据
			gysrow(data,index){
				//console.log(data)
				this.partnerId=data.id
				this.formValidate.khName=data.name
				// this.khobject=data
				
  			},
  			//客户取消
  			modelCancel(){
  				this.khisshow=false
  				this.szisshow=false
  				this.ygisshow=false
  			},
  			makegys(){
  				
  				this.khisshow=false
  				this.szisshow=false
  				this.ygisshow=false
  			},
           s(event){
           	//console.log(event)
           },
           //获取当前时间
           getDate(){
            let date=new Date()
			this.recordDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
           },
            //下拉框选择
            orderselected(value){
                // this.value = value
                // this.axios.get('/po/query/'+value+'?uid=' + this.uid).then((res) => {
                //     if(res.data.status == '200') {
                    
                //         let data = res.data
                //         this.dataList = data.rows;
                //         this.isLoading = false
                //         this.dataList.forEach((x)=>{
                //             x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                //             switch(x.status){
                //                 case 77:
                //                     x.statusDesc='签收完成'
                //                 break;
                //                 case 1:
                //                     x.statusDesc='未审核'
                //                 break;
                //                 case 15:
                //                     x.statusDesc='已审核'
                //                 break;
                //                 case 88:
                //                     x.statusDesc='已完成'
                //                 break;
                //                 case 19:
                //                     x.statusDesc='已作废'
                //                 break;
                //             }
                            
                //         })
                        
                //     } else {
                //         this.$Notice.success({
                //            title:"",//
                //             desc: res.data.errorMessage
                //         });
                        
                //     }
                // })
            },
		},
		mounted() {
			this.$nextTick(()=>{
				this.getUnitsList()
				this.getDate()//当前时间
				if(this.$route.query. id){
					this.id = this.$route.query.id;
					this.numLeftList = this.$route.query.index
					this.updataUnit(this.id,this.numLeftList)
					this.getUnitDefault(this.id)
					this.$refs.details.style.display='block'
				}
				if(this.$route.query.id==''){
					this.$refs.details.style.display='none'
				}
				// this.checkAddOrEdit();
				this.getUserList();
				this.height = document.documentElement.clientHeight
				
				window.onresize=function(){
					this.height = document.documentElement.clientHeight
				}
				
			})
			
		}
	}
</script>

<style lang="css" scoped>
.tot{
    position:fixed;
    bottom:10px;
    left:15%;
    z-index:12;
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
.bg{
	background: #f5f5f5
}

.checkbox{
	margin-right:10px;
	border-color:#000;
}
	.add-box {
		width: 100%;
	
	}
	
	.cheng{
        width: 100%;
        height: 40px;
        /*margin-top: 10px;*/
    }
    .heade{
    	height:60px;
    	background: #fff;
    	display: flex;
    	height: 60px;
	    background: #fff;
	    display: -ms-flexbox;
	    position: fixed;
	    display: flex;
	    width: 100%;
	    z-index:9;
	    border-bottom: 1px solid #e4e4e4;
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
		justify-content: space-between;
	}
	.right-top{
		height: 60px;
		line-height: 60px;
		display:flex;
		background: #fff;
		border-bottom:1px solid #eee;
		justify-content: space-between;
		position:absolute;
		right:280px;
	}
     .right-left{
	width: 192px;
   
	border:1px dashed #e1e1e1;
}
	.left-content {
		height:100%;
		width:360px;
		flex: 0 0 360px;
		margin-top:20px;
		margin-bottom:300px;
		z-index:9;
		border-right:1px solid #E6E6E6;
		position:fixed;
		background:#F9F9F9;
	}
	.add-right {

		background: #fff;
		height:100%;
		margin-left:360px;
		padding-right:20px;
		padding-top:30px;
	}

	.add-box:after {
		content: '';
		display: block;
		clear: both;
	}
	
	.add-left {
		min-height: 600px;
		background: #fff;
		border-radius: 6px;
		padding-top: 15px;
		margin-right: 20px;
		float: left;
		padding-bottom: 20px;
	}
	
	.add-left .left-title {
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding-left: 20px;
		border-left: 3px solid #00a8ff;
	}
	
	.add-left .left-title .title-txt {
		font-size: 14px;
		color: #585858;
		width: 120px;
	}
	
	.left-btn {
		height: 40px;
		float: right;
		margin-top: -40px;
	}
	.title{
    	display:flex;justify-content: space-between;margin-top:20px
    }
    .title:hover{
    	cursor:pointer;
    }
	.left-btn button {
		width: 70px;
		height: 40px;
		color: #fff;
		font-size: 14px;
		color: #ececec;
		border: 0;
		border-radius: 6px;
	}
	
	.ivu-icon-navicon {
		font-size: 20px;
	}
	.con-list {
		display:flex;
		align-items: center;
		width: 100%;
		word-wrap:break-word;
		
		border-bottom: solid 1px #E6E6E6;
		padding: 20px 25px;
		
		cursor: pointer;
		position:relative;
	}
.detail-top{
    	margin-top:80px;
    }
    
    .detail-top ul.cgtable1{
    	margin-bottom: 20px
    }
    .detail-top ul li{
    	display:inline-block;
    	width:150px;
    	/*border:1px solid red;*/
    	margin:0px 10px;
    }
    .detail-top ul.cgtable li{
    	color:#2B8F8F;
    	margin:5px 10px;
    	font-weight:600;
    }
    .detail-bottom{
        margin-top:20px;
    }
	.con-list:hover{
		cursor:pointer;
	}
	.con-list .date{
		position:absolute;
		right:10px;
		top:10px;
	}
	.getaddress{

	}
	.con-list .status{
		
		
		text-align: center;
		position: absolute;
	    right: 10px;
	    top: 47px;
	}
	.con-list .list-title {
		color: #0d0d0d;
		font-size: 14px;
		margin-bottom: 10px;
	}
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
	
	
	.con-list .txt {
		color: #585858;
		font-size: 12px;
	}
	
	.page-box {
		margin-top:10px;
	}
	
	.cursor div,.cursor div p{
		cursor:default;
	}
	.right-content {
		width: 100%;
		height:  100%;
		padding: 10px 0;
		padding-left: 25px;
		padding-right: 60px;
	}
	.bor{
		border-bottom:2px solid #086CA2;
	}
	.detail-title-mark{
		display:flex;
		justify-content: flex-start;
		border-bottom:1px solid #eee;
		margin-bottom:10px;
		margin-top:-10px;
		margin-left: 10px;
	}
	.detail-title{
		padding:10px 40px;

	}
	.detail-title:hover{
		cursor:pointer;
	}
	.con-title {
		width: 100%;
		border-bottom:2px solid #086CA2;
	}
	
	.con-title button {
		width: 80px;
		height: 30px;
		font-size: 12px;
		border: 0;
		border-radius: 5px 5px 0px 0px;
		outline: none;
	}
	.con-title button:hover{
		cursor:pointer;
	}
	.con-title button:first-child {
		margin-right: 10px;
	}
	/**激活的button样式**/
	
	.btnact {
		background: #086ca2 !important;
		color: #fff !important;
	}
	/***正常的样式***/
	.right-detail{
		margin-bottom:200px;
		margin-top:-60px;
	}
	.normal {
		background: #d9dbdc !important;
		color: #585858 !important;
	}
	
	
	.input-box {
		display:flex;
		width:100%;
		height: 40px;
		color: #585858;
		margin-bottom: 15px;

	}
	
	.input-box p{
		width:120px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #585858;
		font-size: 12px;
		
	}
	
	.input-box input {
		height: 40px;
		border: 1px solid #ececec;
		border-radius: 6px;
		padding: 0 10px;
	}
	
	.act-txt {
		width: 50%;
		margin-top: -45px;
	}
	
	.act-txt span {
		font-size: 12px;
		color: #f37b1d;
	}
	
	.act-txt span:first-child {
		font-weight: bold;
	}
	/****新增联系人信息****/
	
	.user-box {
		width: 100%;
		height: auto;
		padding: 15px 0;
	}
	
	.user-box:after {
		content: '';
		display: block;
		clear: both;
	}
	
	.user-box .add-user {
		width: 310px;
		height: 250px;
		background-color: #ffffff;
		box-shadow: -1px 0px 7px 0px rgba(0, 0, 0, 0.35);
		border-radius: 6px;
		border: dotted 1px #ececec;
		text-align: center;
		font-size: 80px;
		padding-top: 40px;
		color: #999999;
		margin-bottom: 15px;
		margin-right: 20px;
		float: left;
	}
	
	.user-box .add-user p {
		font-size: 18px;
		color: #acacac;
		margin-top: 10px;
	}
	button{
		border:none;
	}
	
	.wldw{
		margin-left:20px;
	}
	
	
	
	.po-btn {
		position: absolute;
		top: 15px;
		right: 20px;
	}
	
	.po-btn button {
		border: 0;
		background: none;
		outline: none;
		font-size: 14px;
	}
	
	.po-btn button:first-child {
		color: #00a8ff;
		margin-right: 10px;
	}
	
	.po-btn button:last-child {
		color: #dd5a43;
	}
	.check-box {
		width: 100%;
	}
	
	.data-box {
		margin-top: 10px;
	}
	
	.text-box textarea {
		width: 86%;
		height: 180px;
		padding: 10px;
		border: 0;
		border-radius: 6px;
	}
</style>
<style>
	.ivu-checkbox-inner {
		border-radius: 50%;
	}
	.con-list:last-child{
		margin-bottom:150px;
	}
	.flclass:last-child{
		margin-bottom:150px;
	}

</style>
