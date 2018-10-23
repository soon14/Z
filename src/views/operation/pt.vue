<template>
	<div class="units-box">
		<!--拼团活动-->
		<div class='goods-left'>
			
			<div class='left-top'>
				<span style='font-size:18px;font-weight:600'>拼团活动</span>
			</div>
			
			<div style=" position: fixed;width: 16%;margin-top: 50px;height:100%;"  class='flclass'>
				<Scroll :on-reach-bottom="handleReachEdge" :height="height">
					<div style='margin-bottom:160px'>
					<li class='flclass' v-for='(item,index) in Allfl' @click='addBg(index)' :class="{bg:numIndex==index}" style='display:flex;justify-content: space-between'>
						<div style='margin-left:10px'>{{item.label}}</div>
						
					</li>
				</div>
				</Scroll>
			</div>
			
		</div>
		<div class='goods-right'>
			<div v-if='numIndex==0'>
				<div class="btns-box">
					<div>
						<p class="wldw">
	                            <span style="width:42px;font-weight:900">活动状态</span>
	                             <Select style="width:100px"  placeholder="全部" @on-change="orderselected">
	                                <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
	                            </Select>
	                        </p>
					</div>
					<div class="right">
					<Button type="primary" style='background:#3b77e3;border:none' shape="circle" @click="goaddgoods">
							 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>添加
					</Button>
					<!-- <Button type="primary" style='background:#40ca98;color:#fff;border:none' shape="circle" @click="edityhq">
							 <i class="el-icon-edit" style=";margin-right:5px;"></i>修改
					</Button> -->
					<!--更多-->
					<Dropdown trigger="click" style="margin-left: 4px">
	                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
	                    <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
	                </Button>

	                <DropdownMenu slot="list">
	                    <span  @click="start"><DropdownItem >启用</DropdownItem></span>
	                    <span  @click="stop"><DropdownItem >停用</DropdownItem></span>
	                    <span  @click="del"><DropdownItem >删除</DropdownItem></span>
	                  
	                </DropdownMenu>
	             </Dropdown>
				</div>
				</div>
				<div style='height:50px'></div>
				<!--表格数据-->
				<div class="table" v-if='numIndex==0'>
					<Table border ref="selection" highlight-row :columns="coupon" :data="couponList"  @on-select="selected" @on-row-click='clickRow'></Table>
					<!--底部的分页-->
					<div class="page-box" v-if='total!=0'>
						 <Page :total="total" show-total  :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
					</div>
				</div>

				<!--新建优惠券-->
				<div class='addyhqmodel'>
					<div class='addyhqhead'>
						<span style='font-size:14px;font-weight:600;margin-left:10px'>新建拼团</span>
						<div>
							<Button shape="circle"  style="background:#3b77e3;margin-right:5px;color:#fff;border:none" @click="saveyhq" >
							<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>完成</Button>
							<Button shape="circle"  @click="canceladd"  style="background:#999999;color:#fff;margin-right:10px;" ><Icon type="close" style="margin-right:5px;"></Icon>取消</Button>
						</div>
					</div>
					<div class='yhq-content'>
						<div class='yhq-content-right'>
							<div style='width:530px;margin:10px 20px;padding:20px;border:1px solid #EEEEF1;background:#FCFCFC'>
								<div class='yhq-content-right-list'>
									<span style="width:80px">活动名称：</span>
									<Input v-model='name' type="text" placeholder='卡券名称' style="width:90%"></Input>
								</div>
								<!--优惠方式：-->
								<div style='margin:10px 0;padding-bottom:20px;border-bottom:1px solid #e4e4e4'>
									<RadioGroup v-model="dk" @on-change='dkchange'>
									<div style='display:flex;line-height:35px'>
										<span style="width:80px">商品类型：</span>
										<div style='margin-right:40px'>
											<Radio label='实物商品'></Radio>
											<Radio label='其他商品'></Radio>
										</div>
									</div>
								</RadioGroup>
								</div>
								<!--使用限制：-->
								<!-- <RadioGroup v-model="xf" @on-change='xfchange'>
								<div style='display:flex;line-height:35px'>
									<span style="width:80px">使用限制：</span>
									<Radio  label='消费满'></Radio>
									<Input v-model='orderAmount' number placeholder='消费满' style="width:90px"></Input>  <span>元</span>
									<div style="margin-left:35px;">
										<Radio label='无限制'></Radio>
									</div>
								</div>
								</RadioGroup> -->
								<!--有效时间：-->
								<RadioGroup v-model="yxsj" @on-change='yxsjchange'>
								<div style="display:flex;height:36px;line-height:36px;margin:10px 0">
									<span style="width:80px">活动日期：</span>
									<div style="display:flex">
										<Radio label='生效日期'></Radio>
										<DatePicker type="datetime" v-model='beginTime' @on-change="getStartDate" ></DatePicker>
									</div>
								</div>
								<div  style="margin-left:120px;">
									<span style='width:80px;margin-left:-14px;'>截至日期</span>
									<DatePicker type="datetime" v-model='endTime' @on-change="getStopDate1" ></DatePicker>
								</div>
								
								</RadioGroup>
								
								<!--拼团时间：-->
								<RadioGroup v-model="fsl" @on-change='fslchange'>
								<div  style="display:flex;height:36px;line-height:36px;margin:10px 0">
									<span style="width:80px">拼团时间：</span>
									
									<Input v-model='allCount' number placeholder='小时' style="width:90px"></Input>  <span>小时</span>
									<Input v-model='allCount' number placeholder='分钟' style="width:90px"></Input>  <span>分钟</span>
								</div>
								</RadioGroup>
								<!--拼团限制：-->
								<RadioGroup v-model="fsl" @on-change='fslchange'>
								<div  style="display:flex;height:36px;line-height:36px;margin:10px 0">
									<span style="width:80px">拼团限制：</span>
									 <Radio label="限制拼"></Radio>
									<Input v-model='allCount' number placeholder='小时' style="width:90px"></Input>
									<Input v-model='allCount' number placeholder='分钟' style="width:90px"></Input>
								</div>
								</RadioGroup>
								<!--活动商品：-->
								<div style="display:flex;height:36px;line-height:36px;margin:10px 0;border-top:1px solid #e4e4e4;margin:30px 0">
									<span style="width:80px">活动商品：</span>
									<RadioGroup v-model="shops" @on-change="getshopsname">
								        <Radio label="全部商品"></Radio>
								        <Radio label="指定商品"></Radio><span>(已选{{selectedGoods.length}}个)</span>
								        
								    </RadioGroup>
								</div>
								<div class="table1" v-if='goodsinshow'>
									<Tabs value="name1" :animated='false'>
								        <TabPane label="选择商品" name='name1'>
								        	<Table size="small" border  height="300"  :columns="goodskey" :data="goods" >
											</Table>
											<div class="page-box">
												 <Page :total="goodstotal" show-total  :pageSize='goodspageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
											</div>
								        </TabPane>
								        <TabPane label="已选商品" >
								        	<Table size="small" border  height="300"  :columns="goodskey1" :data="selectedGoods" >
											</Table>
								        </TabPane>
								    </Tabs>
								</div>
								<!--活动店铺：-->
								<!-- <div style="display:flex;height:36px;line-height:36px;margin:10px 0">
									<span style="width:80px">活动店铺：</span>
									<RadioGroup v-model="stores" @on-change="getstoresname">
								        <Radio label="全部店铺"></Radio>
								        <Radio label="指定店铺"></Radio><span>(已选{{selectedstores.length}}个)</span>
								    </RadioGroup>
								</div>
								<div class="table1" v-if='storesinshow'>
									<Tabs value="name1" :animated='false'>
								        <TabPane label="选择店铺" name='name1'>
								        	<Table size="small" border  height="300"  :columns="storeskey1" :data="Allstores" >
											</Table>
											<div class="page-box">
												 <Page :total="storetotal" show-total  :pageSize='storepageSize'  @on-change="storegetData" @on-page-size-change="storechangePageSize"></Page>
											</div>
								        </TabPane>
								        <TabPane label="已选店铺" >
								        	<Table size="small" border  height="300"  :columns="storeskey2" :data="selectedstores" >
											</Table>
								        </TabPane>
								        
								    </Tabs>
								    
								</div>
								<div  style='margin-bottom: 200px;width:98%'>
									<Input type='textarea' v-model='description' placeholder='使用说名'></Input>
								</div> -->
							</div>
							
						</div>
					</div>
				</div>
			</div>
			<div v-if='numIndex==1'>
				<div class='hx'>
					<span style="margin-left:20px">优惠券核销</span>
					<span @click="" style="cursor:pointer;margin-right:20px"><Icon type="close" class="cha" ></Icon></span>
				</div>
				<div class='hx-center'>
					<div style='width:100%;display: flex;justify-content: center;'>
						<Input style='margin-top:8px;width:60%' v-model='hxkeyword' placeholder='请输入关键词'>
                    		<span slot="append"  @click='searchyhq' style='cursor:pointer'>搜索</span>
               		 	</Input>
					</div>
					<div style='width:60%;display: flex;justify-content: space-between;;border:1px solid #e4e4e4;margin-top:30px'>
						<div style='width:50%;border:1px solid #e4e4e4;margin:30px 10px'>
							<div style='width:100%;display: flex;justify-content:space-around;padding:10px'>
								<div>
									<p style='color:#ff0000'>￥{{hxyhqrow.amount}}</p>
									<p style='color:#ff0000'>优惠券</p>
								</div>
								<div>
									<p>名称{{hxyhqrow.name}}</p>
									<p>有效期至：{{hxyhqrow.endTime}}</p>
								</div>
							</div>
							<div style='margin-top:10px;margin-left:45px'>满{{hxyhqrow.orderAmount}}元可用</div>
							<div style='display: flex;justify-content: center;align-items: center;flex-direction: column;padding: 30px 0px; padding: 15px 0px;margin-top: 20px;border-top:1px solid #e4e4e4'>
								<span>3fse52334324wedr</span>
								<img src="" width='140' height='140'>
								<div>请在结算时初始二维码</div>
							</div>
						</div>
						<div style='width:50%;margin:30px'>
							<div>
								 <Steps :current="0" direction="vertical">
							        <Step title="搜索卡券" content="扫描优惠卷二维码或者优惠码"></Step>
							        <Step title="核销卡卷" content="核对卡卷信息无误后进行核销"></Step>
							        <Step title="核销完成" content="核销完成后将通知客户并 后台保存核销记录"></Step>
							       
							    </Steps>
						    </div>
						</div>
					</div>
				</div>
			</div>
		</div>

	<!--选择商品-->
	<Modal v-model="skuisshow" width="760px">
		<p slot="header" style="height:30px;line-height:30px">
			
			<span>商品搜索</span>
		</p>
		<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
			<Input   placeholder="单位编码、名称、助记码、单位电话、联系人、分管部门" style="padding:2px 0" v-model="goodskeyword" @on-enter='enterSearch'></Input>
			<span @click="searchInput">
			<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>
			</span>
		</div>
		<!--商品数据-->
		<div slot="footer" style='margin-top:-10px'>
			<div class="table">
				<Table  border  height='300' highlight-row :columns="goodskeyModel" :data="goodsModel" @on-row-click="clickgoodsrow">
				</Table>
				<div class="page-box">
				 <Page :total="goodsModeltotal" show-total  :pageSize='goodsModelpageSize'  @on-change="goodsModelgetData" @on-page-size-change="goodsModelchangePageSize"></Page>
				</div>
           	</div>
			
			<div class='title' style='margin:0px'>
				<div style='color:#D15151;font-size:14px'>
						<!-- <Icon type="plus" style='margin-right:5px'></Icon>
					<span >添加商品</span> -->
					</div>
				<div>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click=''><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="suresku"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
				</div>
			</div>
		</div>
	</Modal>

	</div>
</template>
<script type="text/javascript">
export default{
	name:"coupon",
	data(){
		return{
			hxyhqrow:{},//搜索优惠券
			hxkeyword:'',//核销的搜索关键字
			height:'',
			current:0,
			
			skuisshow:false,
			goodskeyword:'',
			goodsModeltotal:0,
			goodsModelpageSize:0,
			goodsModel:[],
			goodskeyModel:[
		                {
		                	title:"商品图片",
		                	width:100,
		                	key:"mainPhoto",
		                	 render:(h, params) =>{
	                        	return h('div',[
	                        			h('img',{
	                        				attrs:{
	                        					src:params.row.mainPhoto
	                        				},
	                        				style:{
	                        					width:'40px',
	                        					height:'40px'
	                        				}
	                        			})
	                        		])
	                        }
		                },
		                {
		                	title:"商品名称",
		             		ellipsis:true,
		                	ellipsis:'true',
		                	key:"skuName"
		                },
		                {
		                	title: '商品编码',
		                	key:'skuCode',
		               		ellipsis:true,
		                	align: 'center'
		                },
		              	{
		                	title: '单价',
		                	key:'price',
							ellipsis:true,
		                	align: 'center'
		                },
		                {
		                	title: '参考售价',
		                	key:'costPrice',
							ellipsis:true,
		                	align: 'center'
		                },
		                {
		                	title: '零售价',
		                	key:'wholePrice',
		                	ellipsis:true,
		                	
		                	align: 'center'
		                },
		                 {
                        title: '状态',
                        key:'statusDesc',
                        width:80,
                      	ellipsis:true,
                      	render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:params.row.status==1?'#40ca98':'#d53c39'
                                }
                            },params.row.statusDesc)
                        }
                        
                    }
	                ],
			skuisshow:false,//购物送商品
			dk:'实物商品',//抵扣
			yxsj:'生效日期',//有效时间
			xf:'消费满',//消费满
			hydj:'会员等级',
			fsl:'发放优惠券',
			
			hydata:[],//会员数组
			selectedGoods:[],//商品数组
			allStore:0,//全店通用
			allSku:0,//全部商品
			goodsinshow:false,//商品弹框默认影藏
			description:'',//使用说明
			levelIds:'',//会员卡id
			storeList:[],//店铺
			skuVoList:[],//商品
			skuIds:'',//商品id组合
			storeIds:'',//店铺id组合
			shops:'全部商品',
			goodstotal:0,
			goodspageSize:0,
			storetotal:0,
			storepageSize:0,
			goods:[],
			goodskey:[
           			
           			{
           				type:"selection",
           				width:60
           			},
	                {
	                	title:"商品名称",
	                	
	                	ellipsis:'true',
	                	key:"skuName"
	                },
	                {
	                	title: '参考售价',
	                	key:'costPrice',

	                	
	                	align: 'center'
	                },
	                {
	                	title: '零售价',
	                	key:'wholePrice',

	                	
	                	align: 'center'
	                },
	                {
	                	title:'操作',
	                	key:"actiion",
	                	render:(h,params)=>{
	                		return h('Button',{
	                			props:{
	                				type:"primary"
	                			},
	                			on:{
	                				'click':()=>{
	                					this.selectedGoods.push(params.row)
	                				}
	                			}
	                		},'选取')
	                	}
	                }
                ],
                //已选商品
             selectedGoods:[],
                goodskey1:[
           			
           			{
           				type:"selection",
           				width:60
           			},
	                {
	                	title:"商品名称",
	                	
	                	ellipsis:'true',
	                	key:"skuName"
	                },
	                {
	                	title: '参考售价',
	                	key:'costPrice',

	                	
	                	align: 'center'
	                },
	                {
	                	title: '零售价',
	                	key:'wholePrice',

	                	
	                	align: 'center'
	                },
	                {
	                	title:'操作',
	                	key:"actiion",
	                	render:(h,params)=>{
	                		return h('Button',{
	                			props:{
	                				type:"primary"
	                			},
	                			on:{
	                				'click':()=>{
	                					this.selectedGoods.splice(params.row.index,1)
	                				}
	                			}
	                		},'取消')
	                	}
	                }
                ],
            stores:'全部店铺',
			storesNum:0,
			storesinshow:false,//店铺弹框默认影藏
			//弹出框店铺data
           		 storeskey1:[
	                	{
	            			type:"selection",
	            			width:60
	                	},
	                	{
	                		title:"店铺名",
	                		key:"name"
	                	},
	                	{
	                		title:"店铺编号",
	                		key:"code"
	                	},
	                	{
	                		title:"联系人",
	                		key:"person"
	                	},
	                	{
	                	title:'操作',
	                	key:"actiion",
	                	render:(h,params)=>{
	                		return h('Button',{
	                			props:{
	                				type:"primary"
	                			},
	                			on:{
	                				'click':()=>{
	                					this.selectedstores.push(params.row)
	                				}
	                			}
	                		},'选取')
	                	}
	                }
	                	
                ],
                Allstores:[],//弹框店铺列表
                selectedstores:[],//弹框店铺列表
                 storeskey2:[
	                	{
	            			type:"selection",
	            			width:60
	                	},
	                	{
	                		title:"店铺名",
	                		key:"name"
	                	},
	                	{
	                		title:"店铺编号",
	                		key:"code"
	                	},
	                	{
	                		title:"联系人",
	                		key:"person"
	                	},
	                	{
	                	title:'操作',
	                	key:"actiion",
	                	render:(h,params)=>{
	                		return h('Button',{
	                			props:{
	                				type:"primary"
	                			},
	                			on:{
	                				'click':()=>{
	                					this.selectedstores.splice(params.row.index,1)
	                				}
	                			}
	                		},'取消')
	                	}
	                }
	                	
                ],

			Allfl:[
					{
						label:'拼团列表',
						value:0
					},
					// {
					// 	label:'优惠券核销',
					// 	value:1
					// },
					// {
					// 	label:'已领取优惠券',
					// 	value:1
					// },
				],
				height:'',
			pageSize:0,
			total:0,
			uid: this.$store.state.common.token,
			coupon:[
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				
				{
					title:"满折",
					ellipsis:true,
					key:"name"
				},
				{
					title:'抵扣金额',
					ellipsis:true,
					key:"discount"
				},
				{
					title:"使用限制",
					ellipsis:true,
					key:"identityLimitValue"
				},
				{
					title:"开始时间",
					ellipsis:true,
					key:"beginTime",
					width:100
				},
				{
					title:"结束时间",
					ellipsis:true,
					key:"endTime",
					width:100
				},
				{
					title:"已领数量",
					ellipsis:true,
					key:"useCount"
				},
				
				{
					title:"已发数量",
					ellipsis:true,
					key:"sendCount"
				},
				{
					title:"领取率",
					ellipsis:true,
					key:""
				},
				
				{
					title:"使用率",
					ellipsis:true,
					key:"",
					
				},
				{
					title:"活动状态",
					ellipsis:true,
					key:"statusDesc",
					
				},
				
			],
			numIndex:0,
			//优惠券数据
			couponList:[],
			valId:'',
			isLoading:true,
			msgisshow:true,
			orderListname:[
				{
					label:"全部",
					value:1
				},
				
			],
			dkou:0,//抵扣
			beginTime:'',
			endTime:'',
			name:'',//卡券名称
			allCount:0,//卡券总数量
			amount:0,//抵扣金额
			zhekouamount:0,//折扣金额
			limitAmount:'',//订单金额限制
			orderAmount:0,//消费满
			perCount:0,//限领几张
			skuname:'',//购物送商品
			skuid:'',//购物送商品id
			useDateLimit:'',//领取后有效天数 0：无限制 非0有限制
			type:'',//类型 1.满x元减x元 2 满x件减免x件金额 3.满x元x折 4.满x元赠x ,
			perCount:1,// 限领几张 0：不限制 默认为1 
			allCount1:0,//限制领取1
			allCount2:0,////限制领取2
			allCrm:0,
			selecV:'',
			type:''//类型 1.满x元减x元 2 满x件减免x件金额 3.满x元x折 4.满x元赠x ,
		}
	},
	methods:{
		
		//添加背景
        addBg(index){
        	this.numIndex=index
        },
		//新增优惠券
		goaddgoods(){
			// if(this.msgisshow){
				$('.addyhqmodel').animate({right:"0px"});
				 
				 this.msgisshow=false
			// }else{
				 // $('.addyhqmodel').animate({right:"-70%"});
				 // this.msgisshow=true
			// }
			
		},
		//取消
		canceladd(){
			$('.addyhqmodel').animate({right:"-40%"});
				this.msgisshow=true
		},
		
		//表格选中时的数据，数组
		selected(selection,row){
			this.valId = row.id
			this.row = row
			console.log(this.valId)
		},
		//删除
		del(){
			if(!this.valId){
				this.$Message.error('请点击左侧选择要删除的优惠券！');
				return
			}
			this.axios.get('yhj/delete/'+this.valId+'?uid='+this.uid).then((res)=>{
				if(res.data.status==200){
					this.$Notice.success({
                       title:"",//
                        desc: '删除成功'
                    });
                    this.getAllcoupon()
				}else{
					this.$Notice.error({
                       title:"",//
                        desc: res.data.errorMessage
                    });
					
				}
			})
		},
		//获取生效时间
		getStartDate(date){
			console.log(date)
			this.beginTime = date
		},
		//获取到期时间
		getStopDate1(date){
			this.endTime = date
		},
		//获取单选框
			getshopsname(s){
				
				if(s=='指定商品'){
					this.allStore=1,//全店通用
					this.allSku=1,//全部商品
					// this.allCrm=1,//全会员通用
						this.axios.get('/sku/query?uid='+this.uid).then((res)=>{
						console.log(res.data)
						this.goods= res.data.rows
						this.goodstotal=res.data.total
						this.goodspageSize=res.data.pageSize
					})
						this.goodsinshow = true 
				}else if(s='全部商品'){
					this.allStore=0,//全店通用
					this.allSku=0,//全部商品
					// this.allCrm=0,//全会员通用
					this.goodsinshow = false
					this.axios.get('/sku/query?uid='+this.uid).then((res)=>{
							console.log(res.data)
						this.goods= res.data.rows
						
					})
				}
			},
			//商品编号逗号分隔 
			selectMore(){
				this.shopsNum = this.selectedGoods.length
				this.skuVoList=this.selectedGoods
				let str=[]
				for(let i =0;i<this.selectedGoods.length;i++){
					str.push(this.selectedGoods[i].id)
				}
				let s = str.join(',')
				this.skuIds = s
				console.log(this.skuIds)
			},
			 //切换一条页
            getData(current){
                this.axios.get('/sku/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    //console.log(res)
                    this.goods = res.data.rows
                    this.goodstotal=res.data.total
					this.goodspageSize=res.data.pageSize
                })
            },
            //翻页
            changePageSize(size){
                this.goodspageSize = size
            },
		//获取店铺单选框
			getstoresname(s){
				if(s=='全部店铺'){
					this.allStore=0,//全店通用
					this.allSku=0,//全部商品
					this.allCrm=0,//全会员通用
					this.storesinshow = false
					this.axios.get('/store/query?uid='+this.uid).then((res)=>{
						this.storesNum=res.data.total
					})
				}else if(s='指定店铺'){
					this.allStore=1,//全店通用
					this.allSku=1,//全部商品
					// this.allCrm=1,//全会员通用
						this.storesinshow = true 
						this.axios.get('/store/query?uid='+this.uid).then((res)=>{
						this.Allstores= res.data.rows
						this.storepageSize=res.data.pageSize
						this.storetotal=res.data.total
					})
				}
			},
			//店铺编号逗号分隔
			selectStoreMore(){
				this.storesNum = this.selectedstores.length
				this.storeList=this.selectedstores
				let str=[]
				for(let i =0;i<this.selectedstores.length;i++){
					str.push(this.selectedstores[i].id)
				}
				let s = str.join(',')
				this.storeIds = s

				console.log(this.storeIds)
				
			},
		  //切换一条页
            storegetData(current){
                this.axios.get('/store/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    //console.log(res)
                    this.Allstores = res.data.rows
                    
                })
            },
            //翻页
            storechangePageSize(size){
                this.storepageSize = size
            },
		//获取会员卡
		getAllHYK(){
			this.axios.get('crmlevel/query?uid='+this.uid).then((res)=>{
				
				res.data.rows.forEach((x,index)=>{
					let arr={
						label:res.data.rows[index].name,
						value:res.data.rows[index].id,

					}
					this.hydata.push(arr)
				})
			})
		},
		//选中会员等级
		hyselected(value){
			console.log(value)
			this.levelIds=value
		},
		//获取所有优惠券
		getAllcoupon(){
				this.axios.get('/yhj/query?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						console.log(res.data.rows)
						this.isLoading=false
						this.couponList = res.data.rows
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.couponList.forEach((item,index)=>{
							item.useDateFromLimit = new Date(item.useDateFromLimit).toLocaleString().replace(/\//g,'-')
							item.useDateToLimit = new Date(item.useDateToLimit).toLocaleString().replace(/\//g,'-')
						})
					}else{
						this.$Message.error(res.data.errorMessage);
					}
				})
			},
			 //切换一条页
            getData(current){
                this.axios.get('/yhj/query?offset='+current+'&uid='+this.uid).then((res)=>{
                  
                    this.couponList = res.data.rows
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
            },
            //购物送商品
            getsku(){
            	this.skuisshow=true
            	this.axios.get('/sku/list?uid='+this.uid).then((res)=>{
					this.goodsModel = res.data.rows
					this.goodsModeltotal=res.data.total
					this.goodsModelpageSize=res.data.pageSize
				})
            },
              //商品模糊搜索
            searchInput(){
				this.axios.get('sku/query?keyword='+this.goodskeyword+'&uid='+this.uid).then((res)=>{
					////////console.log(res)
					if(res.data.status==200){
						this.goodsModel = res.data.rows
						this.goodsModeltotal=res.data.total
						this.goodsModelpageSize=res.data.pageSize
					}
				})
			
            },
            //回车搜索商品
           enterSearch(){
           	this.searchInput()
           },
           //商品弹框点击一行获取数据
			clickgoodsrow(data){
				this.skuname=data.skuName
				this.skuid=data.skuId
			},
			//确认的购物送商品
			suresku(){
				this.skuisshow=false
			},
            //切换一条页
            goodsModelgetData(current){
                this.axios.get('/sku/query?offset='+current+'&uid='+this.uid).then((res)=>{
              		if(res.data.status==200){
              			this.goodsModel = res.data.rows
              			this.goodsModeltotal=res.data.total
						this.goodsModelpageSize1=res.data.pageSize
              		}
                    
                })
            },
            //翻页
           goodsModelchangePageSize(size){
                this.goodsModelpageSize = size
            },
              //下拉加载更多
            handleReachEdge(){
            	alert()
                this.current++//默认10条
                
                this.axios.get('/yhj/query?offset='+this.current+'&uid='+this.uid).then((res)=>{
                    
                    res.data.rows.forEach((item)=>{
                        item.createTime=new Date(item.createTime).toLocaleDateString().replace(/\//g,'-')
                        this.couponList.push(item)
                        this.couponList.forEach((x,index)=>{

                            x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        })
                    })

                })
                      
            },
            //保存
        saveyhq(){
        	
        	if(this.dk=='实物商品'){
        		
        		this.type=4
        	}
        	
        	if(this.fsl=='发放数量不限制'){
        		this.allCount=0
        		this.perCount=this.allCount2
        	}
        	if(this.fsl=='发放优惠券'){
        		this.perCount=this.allCount1
        	}
        	
        	
        	this.selectMore()
        	this.selectStoreMore()
			this.axios.post('yhj/add?uid='+this.uid,{
			name:this.name,
			type:4,
			beginTime:this.beginTime,
			endTime:this.endTime,
			skuVoList:this.skuVoList,//商品
			skuIds:this.skuIds,//商品id
			storeList:this.storeList,//商品店铺
			storeIds:this.storeIds,//商品id
			perCount:this.perCount,//限制领的数量
			levelIds:this.levelIds,//会员卡id
			allStore:this.allStore,//全店通用
			allSku:this.allSku,//全部商品
			skuId:this.skuid,//购物送商品id
			orderAmount:this.orderAmount,//购物送商品id
			skuName:this.skuname,//购物送商品名称
			amount:this.amount,//抵扣金额或者折扣
			useDateLimit:this.useDateLimit,//领取后多少天有效
			allCount:this.allCount,//卡券数量
			description:this.description,//使用说明
			allCrm:this.allCrm
		}).then(res=>{
			console.log(res)
			if(res.data.status==200){
				this.$Notice.success({
					title:"",//
					desc: '新建成功'
				});
				this.getAllcoupon()
				this.name=''
				this.beginTime=''
				this.endTime=''
				this.skuVoList=[]//商品
				this.skuIds=''//商品id
				this.storeList=[]//商品店铺
				this.storeIds=''//商品id
				this.crmLevelVos=[]//会员卡
				this.levelIds=''//会员卡id
				this.allStore=1//全店通用
				this.allSku=1//全部商品
				this.allCrm=1//全会员通用
				// this.detailVos=[]//
				this.selectedstores=[]
				this.Allstores=[]
				this.dkou=0//抵扣
				this.allCount=0//卡券总数量
				this.amount=0//抵扣金额
				this.zhekouamount=''//折扣金额
				this.limitAmount=''//订单金额限制
				this.orderAmount=''//消费满
				
				this.skuname=''//购物送商品
				this.skuid=''//购物送商品id
				this.useDateLimit=''//领取后有效天数 0：无限制 非0有限制
				
				this.perCount=1// 限领几张 0：不限制 默认为1 
				this.allCount1=0//限制领取1
				this.allCount2=0////限制领取2
				this.allCount=0//发放数量
				this.description=''
			}else{
				this.$Notice.error({
					title:"",//
					desc: res.data.errorMessage
				});
			}
		})
		},
            //抵扣
            dkchange(v){
            	this.dk=v
            },
            //消费满
            xfchange(v){
            	if(v=='无限制'){
            		this.orderAmount=''
            	}
            	if(v=='消费满'){

            	}
            },
            //有效日期
            yxsjchange(v){
            	if(v=='生效日期'){
            		this.useDateLimit=''
            	}
            	if(v=='领取后'){
            		this.beginTime=''
            		this.endTime=''
            	}
            	if(v=='无限制'){
            		this.beginTime=''
            		this.endTime=''
            		this.useDateLimit=0
            	}
            },
            //会员等级
            hydjchange(v){
            	if(v=='无限制'){
            		this.levelIds=''
            		this.allCrm=0//0无限制
            	}
            	if(v=='会员等级'){
            		this.allCrm=1
            	}
            },
            //发放数量
            fslchange(v){
            	if(v=='发放数量不限制'){
            		this.perCount=0
            		this.allCount=0
            	}
            	if(v=='发放优惠券'){
            		
            		this.perCount=this.allCount1
            	}
            },
            //选中表格一行
            clickRow(data,value){
            	console.log(data)
    //         	this.vid=data.id
    //         	this.name=data.name
				// this.beginTime=data.beginTime
				// this.endTime=data.endTime
				// this.skuVoList=data.skuVoList//商品
				// this.selectedGoods=data.skuVoList//商品
				// this.skuIds=data.skuIds//商品id
				// this.storeList=data.storeList//商品店铺
				// this.storeIds=data.storeIds//商品id
				// this.perCount=data.perCount//限制领的数量
				// this.levelIds=data.levelIds//会员卡id
				// this.allStore=data.allStore//全店通用
				// this.allSku=data.allSku//全部商品
				// this.skuid=data.skuId//购物送商品id
				// this.orderAmount=data.orderAmount//购物送商品id
				// this.skuname=data.skuName//购物送商品名称
				// this.amount=data.amount//抵扣金额或者折扣
				// this.useDateLimit=data.useDateLimit//领取后多少天有效
				// this.allCount=data.allCount//卡券数量
				// this.description=data.description//使用说明
				// this.allCrm=data.allCrm
            },
            //修改优惠券
            edityhq(){
            	this.axios.put('yhj/update?uid='+this.uid,{
            		name:this.name,
					beginTime:this.beginTime,
					endTime:this.endTime,
					skuVoList:this.skuVoList,//商品
					skuIds:this.skuIds,//商品id
					storeList:this.storeList,//商品店铺
					storeIds:this.storeIds,//商品id
					perCount:this.perCount,//限制领的数量
					levelIds:this.levelIds,//会员卡id
					allStore:this.allStore,//全店通用
					allSku:this.allSku,//全部商品
					skuId:this.skuid,//购物送商品id
					orderAmount:this.orderAmount,//购物送商品id
					skuName:this.skuname,//购物送商品名称
					amount:this.amount,//抵扣金额或者折扣
					useDateLimit:this.useDateLimit,//领取后多少天有效
					allCount:this.allCount,//卡券数量
					description:this.description,//使用说明
					allCrm:this.allCrm
            	}),then(res=>{
            		if(res.data.status==200){
            			this.getAllcoupon()//获取所有优惠券
            		}else{
            			this.$Notice.error({
							title:"",//
							desc: res.data.errorMessage
						});
            		}
            		
            	})
            },
            start(){
            	this.axios.get('yhj/enabled/'+this.vid+'?uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			this.getAllcoupon()//获取所有优惠券
            		}
            	})
            },
            stop(){
            	this.axios.get('yhj/disabled/'+this.vid+'?uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			this.getAllcoupon()//获取所有优惠券
            		}
            	})
            },
            //核销搜索优惠券
            searchyhq(){
            	this.axios.get('/yhj/query?keyword='+this.hxkeyword+'&uid='+this.uid).then((res)=>{
            		if(res.data.status==200){
            			this.hxyhqrow=res.data.rows
            		}
            	})
            },
            orderselected(){},
            
	},
	mounted(){
		this.getAllcoupon()//获取所有优惠券
		this.getAllHYK()//会员卡
		this.dk=='实物商品'
	}
}
</script>
<style scoped>
	.units-box {
		width: 100%;
		height: 100%;
		background: #f4f4f4;
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

		display:flex;
		justify-content: space-between;
		position:fixed;
		line-height: 50px;
		z-index:9;
		background: #fff;
	}
	 .wldw{
    	margin-left:10px;
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
	.yhq_bg{
		background: url('http://img.zsydian.com/yhq_bg.png') no-repeat;
		background-size:100% 100%;
		box-shadow: 0 0 20px #e4e4e4
	}
	.btns img {
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}
	
	.table {
		justify-content: space-between;
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
		width:16%;
		height:100%;
		margin-left:10px;
		background: #fff;
		position:fixed;
		border-right:1px solid #eee;
	}
	.bg{
		background: #EBF1FC
	}
	.goods-right{
		margin-left: 20%;
   	 	width: 80%;
   	 	background: #fff;
	}
	.left-top{
		height:50px;
		line-height: 50px;
		margin-left:10px;
		/*display:flex;*/
		position:fixed;
		width:16%;
		z-index:9;
		border-bottom:1px solid #F5F5F5;
		/*justify-content: space-around;*/
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
		background: #EBF1FC
	}

	.addyhqmodel{
		position:fixed;
		height:94%;
		width:40%;
	
		right:-40%;
		top:48px;
		background: #fff;
		z-index:9;
		box-shadow: 0 0 20px #ccc;
	}
	.addyhqhead{
		height:50px;
		line-height: 50px;
		border-bottom:1px solid #e4e4e4;
		display: flex;
		justify-content: space-between;
	}
	.yhq-content{
		display: flex;
	}
	.yhq-content-left-center{
		background: #F1F1F1;
		margin-top:-5px;
		width:320px;
		height:500px;
		/*border:1px solid red;*/
		overflow-y: auto;
	}
	.yhq-footer img{
		height:40px;
		border:0;
		width:100%;
		margin-bottom:-5px;
	}
	.yhq-content-right{
		width:100%;
		height:800px;
		overflow-y: scroll;
	}
	.yhq-content-right-list{
		width:100%;
		display: flex;
		line-height: 35px
	}
.table1{
	width:100%;
	margin-bottom:200px;
}
.hx{
	display:flex;
	justify-content: space-between;
	height:50px;
	
	line-height: 50px;
	border-bottom: 1px solid #e4e4e4;
}
.hx-center{
	width:100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center
}
</style>
<style type="text/css">
.ivu-scroll-content{
	margin-bottom:100px;
}
.ivu-scroll-container::-webkit-scrollbar{
	width: 0px;
	height: 4px;
	background-color: #f5f5f5;
}
.ivu-scroll-container::-webkit-scrollbar-track{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	border-radius: 10px;
	background-color: #f5f5f5;
}
.ivu-scroll-container::-webkit-scrollbar-thumb{
	
	height: 2px;
	border-radius: 18px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #ccc;
}
	.ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
}
</style>