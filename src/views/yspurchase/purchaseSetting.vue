<template>
	<div class='setting'>
		<!--采购设置-->
		<div  class='settingList'>
			<!--采购右侧内容-->
			<div class='main'>
				<Tabs :animated="false" @on-click="clickLeftList">
			        <TabPane label="采购类型" style="background:#fff;width:100%">
			        	<div class='main-right'>
			        		<div class="righttoptitle">
								<span></span>
								<div v-if='leftIndex==0' class='rightbtn'>
									<Button type="primary" style='background:#3b77e3' shape="circle" @click="cgtypetype1">
										 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}
									</Button>
								</div>
							</div>
						<!--采购类型-->
						<div style='width:98%;margin:10px auto'>
							<Table border :columns="cgtypekey1" :data="cgtypedata"></Table>
							<div style='margin-top:10px'>
							<Page :total="totalcglx" show-total size="small" :pageSize='pageSizecglx'  @on-change="getDatacglx" @on-page-size-change="changePageSizecglx"></Page>
							</div>
						</div>
					</div>
			        </TabPane>
			        <TabPane label="供应商类型">
			        	<div class='main-right' >
			        		<div class="righttoptitle">
								<span></span>
								<div class='rightbtn'>
									<Button type="primary" style='background:#3b77e3' shape="circle" @click="addgystype">
										 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}
									</Button>
								</div>
							</div>
							<!--供应商等级-->
							<div style='width:98%;margin:10px auto'>
								<Table border :columns="gystypekey1" :data="gystypedata"></Table>
								<div style='margin-top:10px'>
								<Page :total="totalgys" show-total size="small" :pageSize='pageSizegys'  @on-change="getDatagys" @on-page-size-change="changePageSizegys"></Page>
								</div>
							</div>
						</div>
			        </TabPane>
			        <TabPane label="通知">
			        	<div class='main-right' >
			        		<div class="righttoptitle">
								<span></span>
								<div  class='rightbtn' style='width:100%;margin-left: -50px;margin-top: -5px;'>
									<div>
										<Select style="width:100px;margin-top:8px;margin-left: 25px;"  placeholder="全部" @on-change="messageSelected" v-model="messageSendMe">
				                    		<Option v-for="item in messageSupplier" :value="item.value" :key="item.value">{{ item.label }}</Option>
				               		 	</Select>
									</div>
								</div>
							</div>
							<!--通知-->
							<div style='width:98%;margin:10px auto' v-if='messageSendMe==2'>
								<Table border :columns="messageSendMekey" :data="messageSendMeData"></Table>
								<div style='margin-top:10px'>
								<Page :total="messageSendMetotal" show-total size="small" :pageSize='messageSendMepageSize'  @on-change="messageSendMegetData" @on-page-size-change="messageSendMechangePageSize"></Page>
								</div>
							</div>
							<div style='width:98%;margin:10px auto' v-if='messageSendMe==1'>
								<Table border :columns="messageSendMekey1" :data="messageSendMeData1"></Table>
								<div style='margin-top:10px'>
								<Page :total="messageSendMetotal1" show-total size="small" :pageSize='messageSendMepageSize1'  @on-change="messageSendMegetData1" @on-page-size-change="messageSendMechangePageSize1"></Page>
								</div>
							</div>
						</div>
			        </TabPane>
			    </Tabs>
				<!-- <div class="main-left">
					<li v-for='(item,index) in dataListGL' :key='index' @click='clickLeftList(index,item)' :class="{bg:leftIndex==index}">
					<span style='margin-left:20px'>{{item}}</span>
					</li>
				</div> -->
				
				
				
			</div>
		</div>
	<!--新增采购类型-->
	<Modal v-model="cgtypeisshow" width="460px">
		<p slot="header" style="height:30px;line-height:30px">

			<span>{{$t('public.addnew')}}</span>
		</p>
		<Form ref="formValidatecgtype" :model="formValidatecgtype" :rules="ruleValidatecgtype" :label-width="100" v-if='xs'>
			<FormItem :label="$t('manage.setting.ckname')" prop="cgtypetitle">
               <Input v-model='formValidatecgtype.cgtypetitle'></Input>
            </FormItem>
            <FormItem :label="$t('manage.setting.key')" prop='cgtypekey'>
               <Input v-model='formValidatecgtype.cgtypekey'></Input>
            </FormItem>
		</Form>
		<Form ref="formValidatecgtypeE" :model="formValidatecgtype" :rules="ruleValidatecgtype" :label-width="100" v-if='!xs'>
			<FormItem :label="$t('manage.setting.ckname')" prop="cgtypetitle">
               <Input v-model='formValidatecgtype.cgtypetitle'></Input>
            </FormItem>
            <FormItem :label="$t('manage.setting.key')" prop='cgtypekey'>
               <Input v-model='formValidatecgtype.cgtypekey'></Input>
            </FormItem>
		</Form>
		<div slot="footer">

			<div class='title'>
				<div style='color:#D15151;font-size:14px'>
					</div>
				<div style='margin-top:10px'>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cgtypecancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="cgtypesure('formValidatecgtype')" v-if='xs'><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#40ca98;color:#fff" @click="editcgtype('formValidatecgtypeE')" v-if='!xs'><i class="el-icon-edit" style=";margin-right:5px;"></i>{{$t('public.EditBtn')}}</Button>
				</div>
			</div>
		</div>
	</Modal>
	<!--供应商等级-->
	<Modal v-model="gystypeisshow" width="460px">
		<p slot="header" style="height:30px;line-height:30px">

			<span>{{$t('public.addnew')}}</span>
		</p>
		<Form ref="formValidategystype" :model="formValidategystype" :rules="ruleValidategystype" :label-width="100" v-if='gys'>
			<FormItem :label="$t('manage.setting.ckname')" prop="gystypetitle">
              <Input v-model='formValidategystype.gystypetitle'></Input>
            </FormItem>
			<FormItem :label="$t('manage.setting.key')" prop="gystypekey">
              <Input v-model='formValidategystype.gystypekey'></Input>
            </FormItem>
		</Form>
		<Form ref="formValidategystypeE" :model="formValidategystype" :rules="ruleValidategystype" :label-width="100" v-if='!gys'>
			<FormItem :label="$t('manage.setting.ckname')" prop="gystypetitle">
              <Input v-model='formValidategystype.gystypetitle'></Input>
            </FormItem>
			<FormItem :label="$t('manage.setting.key')" prop="gystypekey">
              <Input v-model='formValidategystype.gystypekey'></Input>
            </FormItem>
		</Form>
		<div slot="footer">

			<div class='title'>
				<div style='color:#D15151;font-size:14px'>
					</div>
				<div style='margin-top:10px'>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='gystypecancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="gystypesure('formValidategystype')" v-if='gys'><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#40ca98;color:#fff" @click="editgystype('formValidategystypeE')" v-if='!gys'><i class="el-icon-edit" style=";margin-right:5px;"></i>{{$t('public.EditBtn')}}</Button>
				</div>
			</div>
		</div>
	</Modal>
	</div>
</template>
<script type="text/javascript">
import LoadUrl from '@/components/common/actionLoad'
export default{
	data(){
		return{
			messageSendMe:2,//默认发给我的
			messageSendMekey:[
				{
					title:"类型",
					key:"category",
				},
				{
					title:"发送方",
					key:"senderType",
				},
				{
					title:"标题",
					key:"subject",
					width:380,
				},
				{
					title:"内容",
					key:"content",
				},
				{
					title:"时间",
					key:"creationDate",
				},
				{
					title:"操作",
					key:"action",
					width:180,
					align:"center",
					render:(h,params)=>{
						return ('div',[
							h('Button',{
								props:{
									type:"primary",
									disabled:params.row.status==1?true:false
								},
								on:{
									"click":()=>{
										this.agree(params.row.id)
									}
								}
							},"同意"),
							h('Button',{
								props:{
									type:"error",
									disabled:params.row.status==1?true:false
								},
								style:{
									marginLeft:"10px",
								},
								on:{
									"click":()=>{
										this.refuse(params.row.id)
									}
								}
							},"拒绝"),
						])
					}
				}
			],
			messageSendMeData:[],
			messageSendMetotal:0,
			messageSendMepageSize:0,
			messageSupplier:[
				{
					label:"发给我的",
					value:2
				},
				{
					label:"我发出的",
					value:1
				}
			],
			//我发出的
			messageSendMekey1:[
				{
					title:"类型",
					key:"category",
				},
				{
					title:"发送方",
					key:"senderType",
				},
				{
					title:"标题",
					key:"subject",
					width:380,
				},
				{
					title:"内容",
					key:"content",
				},
				{
					title:"时间",
					key:"creationDate",
				},

			],
			messageSendMeData1:[],
			messageSendMetotal1:0,
			messageSendMepageSize1:0,

			logoUrl:LoadUrl.httpPrefix.Url+'file/action/upload/image/url?uid='+this.$store.state.common.token,
			xs:true,//采购类型
			gys:true,//供应商

			numIndex1:0,
			uid: this.$store.state.common.token,

			numIndex:0,
			leftIndex:0,
			item:this.$t('manage.setting.cgtype'),//"采购类型",
			// dataListGL:['采购类型','供应商等级'],
			dataListGL:[this.$t('manage.setting.cgtype'),this.$t('manage.setting.Slevel'),"通知"],
			//采购类型
			formValidatecgtype:{
				cgtypetitle:'',
				cgtypekey:"",
			},
			ruleValidatecgtype:{
				cgtypetitle:[{ required: true, message: '类型名称不能为空', trigger: 'blur' }],
				cgtypekey:[{ required: true, message: 'key值不能为空', trigger: 'blur' }],
			},
			cgtypedata:[],
			pageSizecglx:0,
			totalcglx:0,
			cgtypekey:'',//key值
			cgtypeid:'',//id
			cgtypeisshow:false,//key值
			cgtypekey1:[

				{
					title:this.$t('manage.setting.title'),//标题
					key:"title"
				},
				{
					title:this.$t('manage.setting.key'),//key值
					key:"key"
				},
				{
					title:this.$t('public.time'),//更新时间
					key:"updateTime"
				},
				{
					title:this.$t('manage.sku.action'),//操作
					key:"action",
					width:'140',
					align:'center',
					render:(h,parmas)=>{
						return h('div',[
								h('a',{
									on:{
										'click':()=>{
											//console.log(parmas.row)
											this.xs=false
											this.cgtypeid=parmas.row.id
											this.cgtypeisshow=true
											this.formValidatecgtype.cgtypetitle=parmas.row.title
											this.formValidatecgtype.cgtypekey=parmas.row.key

										}
									}
								},this.$t('public.EditBtn')),
								h('a',{
									style:{
										marginLeft:'20px'
									},
									on:{
										'click':()=>{
											//console.log(parmas.row.id)
											this.axios.delete('potype/delete/'+parmas.row.id+'?uid='+this.uid).then(res=>{
												if(res.data.status==200){
													this.$notify({
								                        title:"",//
								                        message:this.$t('public.deleteSuccess'),//
								                        type: 'success',
								                        position: 'bottom-right'
								                    });
													this.getcgtype()
												}
											})
										}
									}
								},this.$t('public.del'))
							])
					}

				}
			],
			//供应商等级
			formValidategystype:{
				gystypetitle:'',
				gystypekey:"",
			},
			ruleValidategystype:{
				gystypetitle:[{ required: true, message: '等级名称不能为空', trigger: 'blur' }],
				gystypekey:[{ required: true, message: 'key值不能为空', trigger: 'blur' }],
			},
			gystypedata:[],
			totalgys:0,
			pageSizegys:0,
			gystypekey:'',//key值
			gystypeid:'',//key值
			gystypeisshow:false,//key值
			gystypekey1:[

				{
					title:this.$t('manage.setting.title'),//标题
					key:"title",

				},
				{
					title:this.$t('manage.setting.key'),//key值
					key:"key"
				},
				{
					title:this.$t('public.time'),//更新时间
					key:"updateTime"
				},

				{
					title:this.$t('manage.sku.action'),//操作
					key:"action",
					width:'140',
					align:'center',
					render:(h,parmas)=>{
						return h('div',[
								h('a',{
									on:{
										'click':()=>{
											console.log(parmas.row)
											this.gys=false
											this.gystypeid=parmas.row.id
											this.gystypeisshow=true
											this.formValidategystype.gystypetitle=parmas.row.title
											this.formValidategystype.gystypekey=parmas.row.key

										}
									}
								},this.$t('public.EditBtn')),
								h('a',{
									style:{
										marginLeft:'20px'
									},
									on:{
										'click':()=>{
											//console.log(parmas.row.id)
											this.axios.delete('partnerl/delete/'+parmas.row.id+'?uid='+this.uid).then(res=>{
												if(res.data.status==200){

													this.$notify({
								                        title:"",//
								                        message: this.$t('public.deleteSuccess'),//
								                        type: 'success',
								                        position: 'bottom-right'
								                    });
													this.getgystype()
												}
											})
										}
									}
								},this.$t('public.del'))
							])
					}

				}
			],
		}
	},
	methods:{
		//管理
		clickLeftList(index){
			this.leftIndex=index
			// this.item=item
			if(index==2){
				this.messageSendMe=2
				this.getMessage(2)
			}
		},
		//采购类型
		getcgtype(){
			this.axios.get('/potype/query?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.cgtypedata=res.data.rows
					this.totalcglx=res.data.total
					this.pageSizecglx=res.data.pageSize
					this.cgtypedata.forEach((x,index)=>{
						x.updateTime=new Date(x.updateTime).toLocaleDateString().replace(/\//g,'-')
					})
				}
			})
		},
		getDatacglx(current){
            this.axios.get('/potype/query?offset='+current+'&uid='+this.uid).then((res)=>{
                this.cgtypedata=res.data.rows
				this.totalcglx=res.data.total
				this.pageSizecglx=res.data.pageSize
				this.cgtypedata.forEach((x,index)=>{
						x.updateTime=new Date(x.updateTime).toLocaleDateString().replace(/\//g,'-')
					})
            })
        },
        //翻页
        changePageSizecglx(size){
            this.pageSizecglx = size
        },
		//新增采购类型
		cgtypetype1(){
			this.xs=true
			this.formValidatecgtype.cgtypetitle=''
			this.formValidatecgtype.cgtypekey=''
			this.cgtypeisshow=true
		},
		cgtypecancel(){
			this.cgtypeisshow=false
		},
		//waretypekey:'',//key值
		cgtypesure(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.axios.post('potype/add?uid='+this.uid,{
						title:this.formValidatecgtype.cgtypetitle,
						key:this.formValidatecgtype.cgtypekey,
					}).then(res=>{
						if(res.data.status==200){
							this.$notify({
		                        title:"",//
		                        message:this.$t('public.SaveSuccess'),
		                        type: 'success',
		                        position: 'bottom-right'
		                    });
							this.formValidatecgtype.cgtypetitle=''
							this.formValidatecgtype.cgtypekey=''
							this.cgtypeisshow=false
							this.getcgtype()
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
		//修改采购类型
		editcgtype(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.axios.put('potype/update?uid='+this.uid,{
						id:this.cgtypeid,
						title:this.formValidatecgtype.cgtypetitle,
						key:this.formValidatecgtype.cgtypekey,
					}).then(res=>{
						if(res.data.status==200){

							this.$notify({
		                        title:"",//
		                        message:this.$t('public.editSuccess'),//
		                        type: 'success',
		                        position: 'bottom-right'
		                    });
							this.formValidatecgtype.cgtypetitle=''
							this.formValidatecgtype.cgtypekey=''
							this.cgtypeisshow=false
							this.getcgtype()
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

       //供应商等级partnerl/add
		getgystype(){
			this.axios.get('/partnerl/query?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.gystypedata=res.data.rows
					this.totalgys=res.data.total
					this.pageSizegys=res.data.pageSize
					console.log(res.data.rows)
					this.gystypedata.forEach((x,index)=>{
						x.updateTime=new Date(x.updateTime).toLocaleDateString().replace(/\//g,'-')
					})
				}
			})
		},
		getDatagys(current){
            this.axios.get('/partnerl/query?offset='+current+'&uid='+this.uid).then((res)=>{
                this.gystypedata=res.data.rows
				this.totalgys=res.data.total
				this.pageSizegys=res.data.pageSize
				this.gystypedata.forEach((x,index)=>{
						x.updateTime=new Date(x.updateTime).toLocaleDateString().replace(/\//g,'-')
					})
            })
        },
         //翻页
        changePageSizegys(size){
            this.pageSizegys = size
        },
		//新增供应商等级
		addgystype(){
			this.gys=true
			this.gystypeisshow=true
			this.formValidategystype.gystypetitle=''
			this.formValidategystype.gystypekey=''
		},
		gystypecancel(){
			this.gystypeisshow=false
		},
		//供应商等级:'',//key值
		gystypesure(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.axios.post('partnerl/add?uid='+this.uid,{
						title:this.formValidategystype.gystypetitle,
						key:this.formValidategystype.gystypekey,
					}).then(res=>{
						if(res.data.status==200){
							this.$notify({
			                    title:"",//
			                    message: '添加成功',
			                    type: 'success',
			                    position: 'bottom-right'
			                });
							this.formValidategystype.gystypetitle=''
							this.formValidategystype.gystypekey=''
							this.gystypeisshow=false
							this.getgystype()
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
		//修改供应商等级
		editgystype(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						this.axios.put('partnerl/update?uid='+this.uid,{
							id:this.gystypeid,
							title:this.formValidategystype.gystypetitle,
							key:this.formValidategystype.gystypekey,
						}).then(res=>{
							if(res.data.status==200){
								this.$notify({
				                    title:"",//
				                    message: this.$t('public.editSuccess'),//
				                    type: 'success',
				                    position: 'bottom-right'
				                });
								this.formValidategystype.gystypetitle=''
								this.formValidategystype.gystypekey=''
								this.gystypeisshow=false
								this.getgystype()
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
			//通知
			messageSelected(v){
				this.messageSendMe=v
				this.getMessage(this.messageSendMe)
			},
			//获取通知
			getMessage(s){
				this.axios.get('partner/notify?cid='+s+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						if(s==2){
							this.messageSendMeData=res.data.rows
							this.messageSendMetotal=res.data.total
							this.messageSendMepageSize=res.data.pageSize
							this.messageSendMeData.forEach(x=>{
								x.creationDate=new Date(x.creationDate).toLocaleString().replace(/\//g,'-')
							})
						}
						if(s==1){
							this.messageSendMeData1=res.data.rows
							this.messageSendMetotal1=res.data.total
							this.messageSendMepageSize1=res.data.pageSize
							this.messageSendMeData1.forEach(x=>{
								x.creationDate=new Date(x.creationDate).toLocaleString().replace(/\//g,'-')
							})
						}
						
					}
				})
			},
			//发给我的翻页
			messageSendMegetData(current){
				this.axios.get('partner/notify?cid=2&offset='+current+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.messageSendMeData=res.data.rows
						this.messageSendMetotal=res.data.total
						this.messageSendMepageSize=res.data.pageSize
					}
				})
			},
			messageSendMechangePageSize(size){
				this.messageSendMepageSize=size
			},

			messageSendMegetData1(current){
				this.axios.get('partner/notify?cid=1&offset='+current+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.messageSendMeData1=res.data.rows
						this.messageSendMetotal1=res.data.total
						this.messageSendMepageSize1=res.data.pageSize
					}
				})
			},
			messageSendMechangePageSize1(size){
				this.messageSendMepageSize1=size
			},
			//同意GET /partner/agreed/{id} 同意加
			agree(id){
				this.$Modal.confirm({
                    title: '同意加入',
                    content: '<p>确定要加入吗?</p>',
                    onOk: () => {
                        this.axios.get('/partner/agreed/'+id+'?uid='+this.uid).then(res=>{
							if(res.data.status==200){
								this.$notify({
				                    title:"",
				                    message:"已同意加入",
				                    type: 'success',
				                    position: 'bottom-right'
				                });
				                this.getMessage(2)
							}else{
								this.$notify({
				                    title:"",
				                    message:res.data.errorMessage,
				                    type: 'error',
				                    position: 'bottom-right'
				                });
							}
						})
                    }
                });
			},
			//GET /partner/refuse/{id} 拒绝加
			refuse(id){
				this.$Modal.confirm({
                    title: '拒绝加入',
                    content: '<p>确定拒绝加入吗?</p>',
                    onOk: () => {
                        this.axios.get('/partner/refuse/'+id+'?uid='+this.uid).then(res=>{
							if(res.data.status==200){
								this.$notify({
				                    title:"",
				                    message:"已拒绝加入",
				                    type: 'success',
				                    position: 'bottom-right'
				                });
				                this.getMessage(2)
							}else{
								this.$notify({
				                    title:"",
				                    message:res.data.errorMessage,
				                    type: 'error',
				                    position: 'bottom-right'
				                });
							}
						})
                    }
                });
			},
	},
	created(){
		this.$nextTick(()=>{
			this.getcgtype()//采购
			this.getgystype()//供应商等级
		})
	},
	mounted(){
	}
}
</script>
<style type="text/css" scoped>
.setting
{
	width:100%;
	height:100%;
	display:flex;
	flex-direction: column;
	background: rgb(230,233,236)
}
.settingList{
	height:100%;
	width:100%;
}
.main{
	
	height:100%;
	width:100%;
	background:#fff
}
.head{
	width:100%;
	line-height:50px;
	display:flex;
	height:50px;
}
.left{
	width: 120px;
	margin-right: 3px;
	flex: 0 0 120px;
	font-size: 14px;
	background: #fff;
	border-bottom:1px solid #EDEDED;
}
.righttoptitle{
	display: flex;
	justify-content: space-between;
}
.right{
width:100%;
	background: #fff;
	border-bottom:1px solid #EDEDED;
	display: flex;
	justify-content: space-between;
}
.btn-right{
	margin-right:20px;
}
.main-left{
	width: 120px;
	margin-right: 3px;
	flex: 0 0 120px;
	font-size: 14px;
	background: #fff;
}
.main-right{
	width:100%;
	background: #fff;

}
.rightbtn{
	margin-right:10px;
}
li{
	list-style: none
}
.main-left li{
	height:40px;
	line-height: 40px;
	width:100%;
	cursor:pointer;
}

.bg{
	background: rgb(241,245,247);
    color: rgb(59,119,227);
}
</style>

