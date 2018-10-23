<template>
	<div class="units-box">
		<!--充值活动-->
		<div class='goods-right'>
			<Tabs :animated="false"  style="background:#fff;width:100%;height:100%" @on-click="addBg">
		        <TabPane label="充值活动">
		        	<!--表格数据-->
					<div class="table">
						<div class="btns-box">
							<div style='display:flex'>
								<p class="wldw">
			                            <!-- <span style="width:42px;font-weight:900">{{$t('operation.yhqHome.hdstatus')}}</span>
			                             <Select style="width:100px" :placeholder="$t('public.all')" @on-change="orderselected">
			                                <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
			                            </Select> -->
			                   	</p>
			                     <!-- <Input style='margin-top:10px;margin-left:20px' v-model='keyword' placeholder='请输入关键词' @on-enter='entersSearchNewSku'>
						                    <span slot="append"  @click='searchNewSku' style='cursor:pointer'>搜索</span>
						           	</Input> -->
							</div>
							<div class="right">
							<Button type="primary" style='background:#3b77e3' shape="circle" @click.stop="goaddgoods">
									 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}<!--添加-->
							</Button>
							<Button type="primary" style='background:#40ca98;border:none' shape="circle" @click.stop="edithd" v-if='valId!=""'>
								<i class="el-icon-edit" style=";margin-right:5px;"></i>
								修改
							</Button>
							<!--更多-->
							<Dropdown trigger="click" style="margin-left: 4px">
			                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">{{$t('public.more')}}
			                    <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
			                </Button>

			                <DropdownMenu slot="list">
			                    <span  @click="start"><DropdownItem >{{$t('public.start')}}</DropdownItem></span>
				                <span  @click="stop"><DropdownItem >{{$t('public.stop')}}</DropdownItem></span>
				                <span  @click="del"><DropdownItem >{{$t('public.del')}}</DropdownItem></span>
			                  
			                </DropdownMenu>
			             </Dropdown>
			             <span @click="cancelHome" style="cursor:pointer; margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
						</div>
						</div>
						<Table border  ref="selection" highlight-row :columns="columns" :data="goodspre"  @on-row-click='gebg'></Table>
						<!--底部的分页-->
						<div class="page-box" v-if='total>10'>
							<Page :total="total" show-total size='small' :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="充值历史">
		        	<!--充值历史-->
					<div class="table">
						<div style='display:flex;'>
						
							<!-- <Input style='margin-top:10px;width:400px' v-model='lskeyword' placeholder='请输入单号' @on-enter='entersSearchls' >
		                    	<span slot="append"  @click='searchls' style='cursor:pointer'>搜索</span>
		            		</Input> -->
						</div>
						<Table border  highlight-row :columns="czls" :data="czlsData"></Table>
						<!--底部的分页-->
						<div class="page-box" >
							<Page :total="totalczls" show-total size="small" :pageSize='pageSizeczls'  @on-change="getDataczls" @on-page-size-change="changePageSizeczls"></Page>
						</div>
					</div>
		        </TabPane>
		        <Button type="ghost" @click="cancelHome" size="small" slot="extra" style='margin-top:3px;margin-right:20px'>返回</Button>
		    </Tabs>
		</div>
		<!--活动侧栏-->
		<div class='addHot' v-if='addhd'>
    		<div class='addHot-head'>
    			<span>新建活动</span>
    			<div>
    				 <Button shape="circle" type="ghost" @click="save('formValidate')" style='margin-right:5px;border:none;background:#3b77e3;color:#fff'>
	                   <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}<!--保存-->
	                </Button>
	                <Button shape="circle"  @click="cancelhot"  style="background:#999999;color:#fff;margin-right:10px;" ><Icon type="close" style="margin-right:5px;"></Icon>{{$t('public.cancel')}}</Button>
    			</div>
    		</div>
    		<div style='margin:20px;border:1px solid #e4e4e4;background:#FCFCFC;padding:10px'>
    			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" style='margin-top:20px'>
	    			
	    				<FormItem label="活动名称" prop="title">
		                    <Input v-model="formValidate.title" style="width:90%" :placeholder="$t('operation.czhds.hdname')"></Input>
		                </FormItem>

	    				<FormItem label="充值金额" prop="charge">
		                        <InputNumber :min="0" v-model="formValidate.charge" placeholder="金额" style="width:60px;margin:0 5px" @on-change="changeCharge"></InputNumber>
		                        <span>{{$t('operation.yhqHome.yuan')}}</span>
		                </FormItem>
	    		
		                <div style="display:flex">
			                <FormItem label="赠送金额" prop="giftCharge">
			                        <InputNumber :min="0" v-model="formValidate.giftCharge" style="width:60px;margin:0 5px" @on-change="changegiftCharge"></InputNumber>
			                        <span>元</span>
			                </FormItem>
			                <FormItem label="赠送积分" prop="giftIntegral">
			                        <InputNumber :min="0" v-model="formValidate.giftIntegral" style="width:60px;margin:0 5px" @on-change="changegiftIntegral"></InputNumber>
			                        <span>积分</span>
			                </FormItem>
	    				</div>
		    			<FormItem label="开始时间" prop="begin_time">
		                    <DatePicker type="date" placement='bottom-start' :options="optionsB" :value='formValidate.begin_time' @on-change="getStartDate" ></DatePicker>
		                </FormItem>
		                <FormItem label="结束时间" prop="end_time">
		                    <DatePicker type="date" placement='bottom-start' :options="optionsB" :value='formValidate.end_time' @on-change="getStopDate1" ></DatePicker>
		                </FormItem>
		                <FormItem label="备注" prop="giftIntegral">
		                    <Input type='textarea' v-model="remark"></Input>
		                </FormItem>
	    			
    			</Form>
    		</div>
    	</div>
    	<!--修改-->
    	<div class='addHot1' v-if='edit'>
    		<div class='addHot-head'>
    			<span>{{$t('public.EditBtn')}}</span>
    			<div>
    				 <Button shape="circle" type="ghost" @click="EDIT('formValidateE')" style='margin-right:5px;border:none;background:#3b77e3;color:#fff'>
	                   <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}
	                </Button>

	                <Button shape="circle"  @click="cancelhot1"  style="background:#999999;color:#fff;margin-right:10px;" ><Icon type="close" style="margin-right:5px;"></Icon>{{$t('public.cancel')}}</Button>
    			</div>
    		</div>
    		<div style='margin:20px;border:1px solid #e4e4e4;background:#FCFCFC;padding:10px'>
    			<Form ref="formValidateE" :model="formValidate" :rules="ruleValidate" :label-width="100" style='margin-top:20px'>
	    			<FormItem :label="$t('operation.czhds.hdname')" prop="title"><!--活动名称-->
		                    <Input v-model="formValidate.title" style="width:90%" :placeholder="$t('operation.czhds.hdname')"></Input>
		                </FormItem>

	    				<FormItem label="充值金额" prop="charge">
		                        <InputNumber :min="0" v-model="formValidate.charge" placeholder="金额" style="width:60px;margin:0 5px" @on-change="changeCharge"></InputNumber>
		                        <span>{{$t('operation.yhqHome.yuan')}}</span>
		                </FormItem>
	    		
		                <div style="display:flex">
			                <FormItem label="赠送金额" prop="giftCharge">
			                        <InputNumber :min="0" v-model="formValidate.giftCharge" style="width:60px;margin:0 5px" @on-change="changegiftCharge"></InputNumber>
			                        <span>元</span>
			                </FormItem>
			                <FormItem label="赠送积分" prop="giftIntegral">
			                        <InputNumber :min="0" v-model="formValidate.giftIntegral" style="width:60px;margin:0 5px" @on-change="changegiftIntegral"></InputNumber>
			                        <span>积分</span>
			                </FormItem>
	    				</div>
		    			<FormItem label="开始时间" prop='begin_time'>
		                    <DatePicker type="date" placement='bottom-start' :options="optionsB" :value='formValidate.begin_time' @on-change="getStartDate" ></DatePicker>
		                </FormItem>
		                <FormItem label="结束时间" prop='end_time' >
		                    <DatePicker type="date" placement='bottom-start' :options="optionsB" :value='formValidate.end_time' @on-change="getStopDate1" ></DatePicker>
		                </FormItem>
		                <FormItem label="备注" prop="giftIntegral">
		                    <Input type='textarea' v-model="remark"></Input>
		                </FormItem>
    			</Form>
    		</div>
    	</div>
	<div class="mark"></div>
</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				optionsB:this.optionsB,
				item:{},//一行数据
				addhd:true,
				edit:true,
				remark:"",
				keyword:'',//头部搜索关键字
				formValidate:{
					title:"",//名称
					charge:null,//充值金额
					giftCharge:0,//优惠金额
					giftIntegral:0,
					end_time:'',
					begin_time:'',
				},
				ruleValidate:{
					title:[{ required: true, message:this.$t('finance.nameEmpty'), trigger: 'blur' }],
					begin_time:[{ required: true, message:'开始时间不能为空', trigger: 'change' }],
					end_time:[{ required: true, message:'结束时间不能为空', trigger: 'change' }],
					charge:[
						{type:"number", required: true, message: '充值金额不能为空', trigger: 'change' },
					
					],
					
				},
				
				goodspre:[],//首页显示表格数据
				msdate:this.$t('operation.yhqHome.beginTime'),//'开始日期',
				current:1,
				height:'',
				numIndex:0,
				total:0,
				pageSize:0,
				orderListname:[
					{
						label:"全部",
						value:0
					},
					{
						label:"已启用",
						value:1
					},
					{
						label:"已停用",
						value:2
					},
				],
				columns: [
                    {
                        title:'活动名称',
                        key:'title',
                        align:"center"
                    },
                    {
                        title:'充值金额',
                        key:'charge',
                        align:"center"
                    },
                    {
                        title:'赠送金额',
                        key:'giftCharge',
                        align:"center"
                    },
                    {
                        title:'赠送积分',
                        key:'giftIntegral',
                        align:"center"
                    },
                    {
                    	title:'开始时间',
                    	align:"center",
                    	key:'begin_time',
                    },
                  
                    {
                        title:'结束时间',
                        align:"center",
                        key:'end_time',
                    },
                    {
                        title: this.$t('public.status'),//'状态',
                        key:'statusDesc',
                      	 align:"center",
                      	width:80,
                      	render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:params.row.status==1?'#40ca98':params.row.status==99?'#ff0000':params.row.status==0?"#278fa3":""
                                }
                            },params.row.statusDesc)
                        }
                        
                    }
                
                ],
                //充值历史
                pageSizeczls:0,
                totalczls:0,
                czlsData:[],
                czls:[
                	{
                		title:"流水号",
                		key:"payNo"
                	},
                	{
                		title:"时间",
                		key:"createTime"
                	},
                	{
                		title:"金额",
                		key:"amount",
  
                	},
                	{
                		title:"赠送金额",
                		key:"giftAmount"
                	},
                	{
                		title:"支付方式",
                		key:"payTypeDesc"
                	},
                	{
                		title:"会员",
                		key:"employeeName"
                	},
                	{
                		title:"标题",
                		key:"title"
                	},
                	
                	{
                		title:"备注",
                		key:"remark"
                	},
                	{
                		title:"状态",
                		align:"center",
                		width:120,
                		key:"statusDesc"
                	},
                ],
				uid:this.$store.state.common.token,
				valId:'',//id
				flname:"",
				Allfl:[
					{
						label:this.$t('operation.czhds.czhdslist'),// '活动列表',
						value:0
					},
					{
						label:this.$t('operation.czhds.czhdshistory'),//'充值历史',
						value:1
					},
				],
			}
		},
		
		methods:{
			changeCharge(s){
				this.formValidate.charge=s
			},
			changegiftCharge(s){
				this.formValidate.giftCharge=s
			},
			changegiftIntegral(s){
				this.formValidate.giftIntegral=s
			},
			//保存POST /mrechargea/add 新增充值活动
			save(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						this.axios.post('/rechargea/add?uid='+this.uid,{
							title:this.formValidate.title,//名称
							end_time:this.formValidate.end_time,
							begin_time:this.formValidate.begin_time,
							charge:this.formValidate.charge,//充值金额
							giftCharge:this.formValidate.giftCharge,//优惠金额
							giftIntegral:this.formValidate.giftIntegral,//优惠金额
							remark:this.remark
							}).then(res=>{
								if(res.data.status==200){
									this.$notify({
                                        title:"",//
                                        message: '新增充值活动成功',
                                        type: 'success',
                                        position: 'bottom-right'
                                    });
                                    this.getAllGoods()//刷新
                                    this.cancelhot()//滑动
                                    this.getDate()//初始化日期
									this.formValidate.title=''//名称
									this.formValidate.begin_time=''
									this.formValidate.end_time=''
									this.getDate()
									this.remark=''
									this.formValidate.charge=null//充值金额
									this.formValidate.giftCharge=0//优惠金额
									this.formValidate.giftIntegral=0//优惠金额
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
			//增加活动
			goaddgoods(){
				this.formValidate.title=''//名称
				this.formValidate.end_time=''
				this.formValidate.begin_time=''
				this.getDate()
				this.remark=''
				this.formValidate.charge=null//充值金额
				this.formValidate.giftCharge=0//优惠金额
				$('.addHot').animate({right:"0px"});
				$('.mark').css('display','block')
			},
			//点击取消cancelhot
			cancelhot(){
				$('.addHot').animate({right:"-500px"});
				$('.mark').css('display','none')
			},
			
			
			//单击表格一行
			gebg(data,index){
				this.valId=data.id
				this.item=data
				this.formValidate.title=data.title//名称
				this.formValidate.end_time=data.end_time
				this.formValidate.begin_time=data.begin_time
				this.remark=data.remark
				this.formValidate.charge=data.charge//充值金额
				this.formValidate.giftCharge=data.giftCharge//优惠金额
				this.formValidate.giftIntegral=data.giftIntegral//优惠金额
			},
			//点击修改
			edithd(){
				if(this.valId==''){
					this.$notify({
                        title:"",//
                        message: '请选择要修改的活动！',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					
					$('.addHot1').animate({right:"0px"});
					// $('.mark').css('display','block')
				}
				
			},
			cancelhot1(){
				$('.addHot1').animate({right:"-500px"});
				
				// this.valId=''
				$('.mark').css('display','none')
			},
			//执行修改
			EDIT(name){
				this.$refs[name].validate((valid) => {
					if(valid){

						this.axios.put('/rechargea/update?uid='+this.uid,{//PUT /mrechargea/update 修改充值活动
							id:this.valId,
							title:this.formValidate.title,//名称
							end_time:this.formValidate.end_time,
							begin_time:this.formValidate.begin_time,
							remark:this.remark,
							charge:this.formValidate.charge,//充值金额
							giftCharge:this.formValidate.giftCharge,//优惠金额
							giftIntegral:this.formValidate.giftIntegral,//优惠金额
							}).then(res=>{
								if(res.data.status==200){
									this.$notify({
                                        title:"",//
                                        message: this.$t('public.editSuccess'),//
                                        type: 'success',
                                        position: 'bottom-right'
                                    });
                                    this.getAllGoods()//刷新
                                    this.cancelhot1()//滑动
                                    this.getDate()//初始化日期
									this.formValidate.title=''//名称
									this.formValidate.end_time=''
									this.formValidate.begin_time=''
									this.remark=''
									this.formValidate.charge=null//充值金额
									this.formValidate.giftCharge=0//优惠金额
									this.formValidate.giftIntegral=0//优惠金额
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
			//删除DELETE /mrechargea/delete/{id} 删除充值活动
			del(){	
				if(this.valId==''){
					this.$notify({
                        title:"",//
                        message: '请选择一条活动！',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.axios.delete('/rechargea/delete/'+this.valId+'?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.$notify({
	                        title:"",//
	                        message: this.$t('public.deleteSuccess'),//
	                        type: 'success',
	                        position: 'bottom-right'
	                    });
							this.getAllGoods()
							this.valId=''
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
			//POST /mrechargea/enabled/{id} 启用
			start(){	
				if(this.valId==''){
					this.$notify({
                        title:"",//
                        message: '请选择一条活动！',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.axios.post('/rechargea/enabled/'+this.valId+'?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.$notify({
	                        title:"",//
	                        message:this.$t('public.normalS'),//
	                        type: 'success',
	                        position: 'bottom-right'
	                    });
							this.getAllGoods()
							this.valId=''
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
			//POST /mrechargea/disabled/{id} 停用
			stop(){	
				if(this.valId==''){
					this.$notify({
                        title:"",//
                        message: '请选择一条活动！',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.axios.post('/rechargea/disabled/'+this.valId+'?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.$notify({
	                        title:"",//
	                        message:this.$t('public.normalT'),//
	                        type: 'success',
	                        position: 'bottom-right'
	                    });
							this.getAllGoods()
							this.valId=''
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
			//获取活动数据GET /mrechargea/query 充值活动清单
			getAllGoods(){
				this.axios.get('/rechargea/query?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						this.goodspre=res.data.rows
						this.total = res.data.total
						this.pageSize = res.data.pageSize
						this.goodspre.forEach(x=>{
							if(x.status==1){
								x.statusDesc='已启用'
							}
							if(x.status==0){
								x.statusDesc='新增'
							}
							if(x.status==99){
								x.statusDesc='已停用'
							}
						})
					}
					
				})
			},
			//切换一条页
            getData(current){
                this.axios.get('/rechargea/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    console.log(res)
                    this.goodspre = res.data.rows
                    this.total = res.data.total
					this.pageSize = res.data.pageSize
					this.goodspre.forEach(x=>{
						if(x.status==1){
							x.statusDesc='已启用'
						}
						if(x.status==0){
							x.statusDesc='新增'
						}
						if(x.status==99){
							x.statusDesc='已停用'
						}
					})	
                })
                
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
            },
            //添加背景
            addBg(index){
            	this.numIndex=index
            	if(this.numIndex==0){
            		this.getAllGoods()
            	}
            	//充值历史
            	if(this.numIndex==1){
            		this.getczls()
            	}
            },
          //获取生效时间
			getStartDate(date){
				this.formValidate.begin_time = date
			},
			//获取到期时间
			getStopDate1(date){
				this.formValidate.end_time = date
			},
	      
       //差号返回
            cancelHome(){
            	this.$router.push('/operationhome')
            },
            //下拉框选择
            orderselected(value){
               
            },
            //获取充值历史/recharge/query
            getczls(){
            	this.axios.get('/recharge/query?uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			let data=res.data
            			this.czlsData=data.rows
            			this.pageSizeczls=data.total
                		this.totalczls=data.pageSize
                		this.czlsData.forEach(x=>{
                			x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
                		})
                		//createTime
            		}
            	})
            },
            //充值历史
            getDataczls(current){
            	this.axios.get('/recharge/query?offset='+current+'&uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			let data=res.data
            			this.czlsData=data.rows
            			this.pageSizeczls=data.total
                		this.totalczls=data.pageSize
            		}
            	})
            },
            changePageSizeczls(size){
            	this.totalczls=size
            },
            //获取当前日期
            getDate(){
            	let date=new Date()
				this.formValidate.begin_time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
            },

		},
		 created(){
           	this.$nextTick(()=>{
				this.getAllGoods()
			})
        },
		mounted(){
			this.getDate()
	},
}
</script>
<style scoped>
	.units-box {
		width: 100%;
		height: 100%;
		background: rgb(230,233,236);
		display:flex;
		overflow: hidden;
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
		
		height: 50px;

		display:flex;
		justify-content: space-between;
		
		line-height: 50px;
		
		background: #fff;
	}
	 .wldw{
    	margin-left:10px;
    	width:300px;
    }
	.right{
		margin-right:20px;
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
		width: 100%;
		height: 100%;
		overflow: auto;
		background: #fff;
		padding: 0 10px;
	}
	.page-box {
		text-align: center;
		margin-top:5px;
		margin-bottom:120px;
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
		width: 120px;
		margin-right: 3px;
		flex: 0 0 120px;
		font-size: 14px;
		background: #fff;
	
	}
	.goods-right{
		/*margin-left: 20%;*/
   	 	width: 100%;
   	 	background: #fff;
   	 	overflow: auto;
	}
	.left-top{
		height:50px;
		line-height: 50px;
		border-bottom:1px solid #F5F5F5;
		display: flex;
		justify-content: space-around;
	}
	.goods-left li{
		list-style: none;
		height:40px;
		line-height: 40px;
		width:100%;
	}
	.page-box1{
		text-align: left;
		margin:10px 0;
	}
	.goods-left li span{
		
		margin-right:10px;
	}
	.bg{
		background:rgb(241,245,247);
	color:rgb(59,119,227);
	}
	.addHot{
	position:fixed;
	z-index:99;
	height:89%;
	width:500px;
	right:-500px;
	top:48px;
	background: #fff;
	z-index:10;
	overflow-y: scroll;
	box-shadow: 0 0 20px #ccc
	/*border:1px solid red;*/
}
.addHot1{
	position:fixed;
	z-index:11;
	height:89%;
	width:500px;
	right:-500px;
	top:48px;
	background: #fff;
	
	overflow-y: scroll;
	box-shadow: 0 0 20px #ccc
}
.addHot-head{
	width:100%;
	height:50px;
	line-height: 50px;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #e4e4e4;
	
	
}
.searchInput{
	width:100%;
	line-height: 35px;
	margin:20px;
	text-align: center;
	display: flex
}
.addHot-head span{
	font-size:14px;
	font-weight:600;
	margin-left:20px;
}
.table1{
	margin:10px;
}
.mark{
	position:fixed;
	display:none;
	width:100%;
	height:100%;
	background: #B2B2B2;
	opacity:0.4;
	z-index:9;
}
</style>
<style type="text/css">
	.ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }

</style>