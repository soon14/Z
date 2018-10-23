<template>
	<div class='setting'>
		<!--销售设置-->
		<div  class='settingList'>
			<!--管理右侧内容-->
			<div class='main'>
				<Tabs :animated="false" style="background:#fff;width:100%" @on-click="clickLeftList">
			        <TabPane label="销售类型">
			        	<div class='main-right'>
			        		<div class="righttoptitle">
								<span></span>
								<div  class='rightbtn'>
									<Button type="primary" style='background:#3b77e3' shape="circle" @click="sotypetype">
										 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}
									</Button>
								</div>
							</div>
							<!--销售类型-->
							<div style='width:98%;margin:10px auto'>
								<Table border  :columns="sotypekey1" :data="sotypedata"></Table>
								<div style='margin-top:10px'>
								<Page :total="totalxs" show-total size="small" :pageSize='pageSizexs'  @on-change="getDataxs" @on-page-size-change="changePageSizexs"></Page>
								</div>
							</div>
						</div>
			        </TabPane>
			        <TabPane label="客户等级">
			        	<div class='main-right' >
			        		<div class="righttoptitle">
								<span></span>
								<div class='rightbtn'>
									<Button type="primary" style='background:#3b77e3' shape="circle" @click="addkhtype">
										 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}
									</Button>
								</div>
							</div>
							<div style='width:98%;margin:10px auto'>
								<Table border :columns="khtypekey1" :data="khtypedata"></Table>
								<div style='margin-top:10px'>
								<Page :total="totalkh" show-total size="small" :pageSize='pageSizekh'  @on-change="getDatakh" @on-page-size-change="changePageSizekh"></Page>
									</div>
							</div>

						</div>
			        </TabPane>
			        <TabPane label="客户类型">
			        	<div class='main-right'>
			        		<div class="righttoptitle">
								<span></span>
								<div class='rightbtn'>
									<Button type="primary" style='background:#3b77e3' shape="circle" @click="addkhtype1">
										 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}
									</Button>
								</div>
							</div>
							<div style='width:98%;margin:10px auto'>
								<Table border :columns="khtypekey11" :data="khtypedata1"></Table>
								<div style='margin-top:10px'>
								<Page :total="totalkhlx" show-total size="small" :pageSize='pageSizekhlx'  @on-change="getDatakhlx" @on-page-size-change="changePageSizekhlx"></Page>
									</div>
							</div>
						</div>
			        </TabPane>

			        <TabPane label="通知">
			        	<div class='main-right'>
			        		<div class="righttoptitle">
								<span></span>
								<div class='rightbtn' style="width: 100%;margin-left: -50px;margin-top: -5px;">
									<div>
										<Select style="width:100px;margin-top:8px;margin-left:25px"  placeholder="全部" @on-change="messageSelected" v-model="messageSendMe">
				                    		<Option v-for="item in messageSupplier" :value="item.value" :key="item.value">{{ item.label }}</Option>
				               		 	</Select>
									</div>
								</div>
							</div>
							<!--通知-->
							<div class='main-right' >
								<div style='width:98%;margin:10px auto'>
									<!--通知-->
									<div  v-if='messageSendMe==2'>
										<Table border :columns="messageSendMekey" :data="messageSendMeData"></Table>
										<div style='margin-top:10px'>
										<Page :total="messageSendMetotal" show-total size="small" :pageSize='messageSendMepageSize'  @on-change="messageSendMegetData" @on-page-size-change="messageSendMechangePageSize"></Page>
										</div>
									</div>
									<div v-if='messageSendMe==1'>
										<Table border :columns="messageSendMekey1" :data="messageSendMeData1"></Table>
										<div style='margin-top:10px'>
										<Page :total="messageSendMetotal1" show-total size="small" :pageSize='messageSendMepageSize1'  @on-change="messageSendMegetData1" @on-page-size-change="messageSendMechangePageSize1"></Page>
										</div>
									</div>
								</div>
							</div>
						</div>
			        </TabPane>
			    </Tabs>
			</div>
		</div>
	<!--客户等级-->
	<Modal v-model="khtypeisshow" width="460px">
		<p slot="header" style="height:30px;line-height:30px">

			<span>{{$t('public.addnew')}}</span>
		</p>

		<Form ref="formValidatekhtype" :model="formValidatekhtype" :rules="ruleValidatekhtype" :label-width="100" v-if='kh'>
			<FormItem :label="$t('manage.setting.ckname')" prop="khtypetitle">
              <Input v-model='formValidatekhtype.khtypetitle'></Input>
            </FormItem>
			<FormItem :label="$t('manage.setting.key')" prop="khtypekey">
              <Input v-model='formValidatekhtype.khtypekey'></Input>
            </FormItem>
		</Form>
		<Form ref="formValidatekhtypeE" :model="formValidatekhtype" :rules="ruleValidatekhtype" :label-width="100" v-if='!kh'>
			<FormItem :label="$t('manage.setting.ckname')" prop="khtypetitle">
              <Input v-model='formValidatekhtype.khtypetitle'></Input>
            </FormItem>
			<FormItem :label="$t('manage.setting.key')" prop="khtypekey">
              <Input v-model='formValidatekhtype.khtypekey'></Input>
            </FormItem>
		</Form>
		<div slot="footer">

			<div class='title'>
				<div style='color:#D15151;font-size:14px'>
					</div>
				<div style='margin-top:10px'>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='khtypecancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="khtypesure('formValidatekhtype')" v-if='kh'><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#40ca98;color:#fff" @click="editkhtype('formValidatekhtypeE')" v-if='!kh'><i class="el-icon-edit" style=";margin-right:5px;"></i>{{$t('public.EditBtn')}}</Button>
				</div>
			</div>
		</div>
	</Modal>
	<!--客户类型-->
	<Modal v-model="khtypeisshow1" width="460px">
		<p slot="header" style="height:30px;line-height:30px">

			<span>{{$t('public.addnew')}}</span>
		</p>

		<Form ref="formValidatekhtype1" :model="formValidatekhtype1" :rules="ruleValidatekhtype1" :label-width="100" v-if='kh1'>
			<FormItem :label="$t('manage.setting.ckname')" prop="khtypetitle1">
              <Input v-model='formValidatekhtype1.khtypetitle1'></Input>
            </FormItem>
			<FormItem :label="$t('manage.setting.key')" prop='khtypekeytype'>
              <Input v-model='formValidatekhtype1.khtypekeytype'></Input>
            </FormItem>
		</Form>
		<Form ref="formValidatekhtype1E" :model="formValidatekhtype1" :rules="ruleValidatekhtype1" :label-width="100" v-if='!kh1'>
			<FormItem :label="$t('manage.setting.ckname')" prop="khtypetitle1">
              <Input v-model='formValidatekhtype1.khtypetitle1'></Input>
            </FormItem>
			<FormItem :label="$t('manage.setting.key')" prop='khtypekeytype'>
              <Input v-model='formValidatekhtype1.khtypekeytype'></Input>
            </FormItem>
		</Form>
		<div slot="footer">

			<div class='title'>
				<div style='color:#D15151;font-size:14px'>
					</div>
				<div style='margin-top:10px'>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='khtypecancel1'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="khtypesure1('formValidatekhtype1')" v-if='kh1'><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#40ca98;color:#fff" @click="editkhtype1('formValidatekhtype1E')" v-if='!kh1'><i class="el-icon-edit" style=";margin-right:5px;"></i>{{$t('public.EditBtn')}}</Button>
				</div>
			</div>
		</div>
	</Modal>
		<!--新增销售类型-->
	<Modal v-model="sotypeisshow" width="460px">
		<p slot="header" style="height:30px;line-height:30px">

			<span>{{$t('public.addnew')}}</span>
		</p>

		<Form ref="formValidatesotype" :model="formValidatesotype" :rules="ruleValidatesotype" :label-width="100" v-if='xs'>
			<FormItem :label="$t('manage.setting.ckname')" prop="sotypetitle">
	           <Input v-model='formValidatesotype.sotypetitle'></Input>
	        </FormItem>
			<FormItem :label="$t('manage.setting.key')" prop='sotypekey'>
	           <Input v-model='formValidatesotype.sotypekey'></Input>
	        </FormItem>
		</Form>
		<Form ref="formValidatesotypeE" :model="formValidatesotype" :rules="ruleValidatesotype" :label-width="100" v-if='!xs'>
			<FormItem :label="$t('manage.setting.ckname')" prop="sotypetitle">
	           <Input v-model='formValidatesotype.sotypetitle'></Input>
	        </FormItem>
			<FormItem :label="$t('manage.setting.key')" prop="sotypekey">
	           <Input v-model='formValidatesotype.sotypekey'></Input>
	        </FormItem>
		</Form>
		<div slot="footer">

			<div class='title'>
				<div style='color:#D15151;font-size:14px'>
					</div>
				<div style='margin-top:10px'>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='sotypecancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="sotypesure('formValidatesotype')" v-if='xs'><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#40ca98;color:#fff" @click="editsotype('formValidatesotypeE')" v-if='!xs'><i class="el-icon-edit" style=";margin-right:5px;"></i>{{$t('public.EditBtn')}}</Button>
				</div>
			</div>
		</div>
	</Modal>
	</div>
</template>
<script type="text/javascript">
import LoadUrl from '@/components/common/actionLoad'
export default{
	name:'settingDetails',
	components:{

	},
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

			skuclassphotoSunclass:"",
			flObj:{},//分类对象
			totalfl:0,
			pageSizefl:0,
			c:true,//商品品牌
			ck:true,//仓库
			d:true,//职位管理的切换{{$t('public.addnew')}}，修改
			s:true,//商品分类的切换{{$t('public.addnew')}}，修改
			sz:true,//收支项目的切换{{$t('public.addnew')}}，修改
			zf:true,//支付方式的切换{{$t('public.addnew')}}，修改
			xs:true,//支付方式的切换{{$t('public.addnew')}}，修改
			sx:true,//支付方式的切换{{$t('public.addnew')}}，修改
			unit:true,//单位
			gys:true,//供应商
			dp:true,//店铺类型
			kh:true,//客户等级
			kh1:true,//客户类型
			atisshow:false,
			attrsname:'',
			editattrisshow:false,
			numIndex1:0,
			uid: this.$store.state.common.token,
			attrschildren:false,
			attrsisshow:false,
			isshow:false,
			switch1:true,
			numIndex:0,
			leftIndex:0,
			item:this.$t('manage.setting.xstype'),//"销售类型",
			// dataListGL:['销售类型','客户等级','客户类型'],
			dataListGL:[this.$t('manage.setting.xstype'),
			this.$t('manage.setting.khlevel'),
			this.$t('manage.setting.khtype'),
			"通知"
			],

			//客户等级
			formValidatekhtype:{
				khtypetitle:'',
				khtypekey:"",
			},
			ruleValidatekhtype:{
				khtypetitle:[{ required: true, message: '等级名称不能为空', trigger: 'blur' }],
				khtypekey:[{ required: true, message: 'key值不能为空', trigger: 'blur' }],
			},
			khtypedata:[],
			totalkh:0,
			pageSizekh:0,
			khtypetitle:'',//名称
			khtypekey:'',//key值
			khtypeid:'',//key值
			khtypeisshow:false,//key值
			khtypekey1:[

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
											this.kh=false
											this.khtypeid=parmas.row.id
											this.khtypeisshow=true
											this.formValidatekhtype.khtypetitle=parmas.row.title
											this.formValidatekhtype.khtypekey=parmas.row.key

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
											this.axios.delete('clientl/delete/'+parmas.row.id+'?uid='+this.uid).then(res=>{
												if(res.data.status==200){

													this.$notify({
								                        title:"",//
								                        message: this.$t('public.deleteSuccess'),//
								                        type: 'success',
								                        position: 'bottom-right'
								                    });
													this.getkhtype()
												}
											})
										}
									}
								},this.$t('public.del'))
							])
					}

				}
			],
			//客户类型
			formValidatekhtype1:{
				khtypetitle1:'',
				khtypekeytype:""
			},
			ruleValidatekhtype1:{
				khtypetitle1:[{ required: true, message: '类型名称不能为空', trigger: 'blur' }],
				khtypekeytype:[{ required: true, message: 'key值不能为空', trigger: 'blur' }],

			},
			khtypedata1:[],
			totalkhlx:0,
			pageSizekhlx:0,

			khtypekeytype:'',//key值
			khtypeid1:'',//key值
			khtypeisshow1:false,//key值
			khtypekey11:[

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
											this.kh1=false
											this.khtypeid1=parmas.row.id
											this.khtypeisshow1=true
											this.formValidatekhtype1.khtypetitle1=parmas.row.title
											this.formValidatekhtype1.khtypekeytype=parmas.row.key

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
											this.axios.delete('clientt/delete/'+parmas.row.id+'?uid='+this.uid).then(res=>{
												if(res.data.status==200){

													this.$notify({
								                        title:"",//
								                        message: this.$t('public.deleteSuccess'),//
								                        type: 'success',
								                        position: 'bottom-right'
								                    });
													this.getkhtype1()
												}
											})
										}
									}
								},this.$t('public.del'))
							])
					}

				}
			],
			//销售类型
			formValidatesotype:{
				sotypetitle:'',
				sotypekey:"",
			},
			ruleValidatesotype:{
				sotypetitle:[{ required: true, message: '类型名称不能为空', trigger: 'blur' }],
				sotypekey:[{ required: true, message: 'key值不能为空', trigger: 'blur' }],
			},
			sotypedata:[],
			totalxs:0,
			pageSizexs:0,
			sotypeid:'',//id
			sotypeisshow:false,//key值
			sotypekey1:[

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
											this.sotypeid=parmas.row.id
											this.sotypeisshow=true
											this.formValidatesotype.sotypetitle=parmas.row.title
											this.formValidatesotype.sotypekey=parmas.row.key

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
											this.axios.delete('sotype/delete/'+parmas.row.id+'?uid='+this.uid).then(res=>{
												if(res.data.status==200){

													this.$notify({
								                        title:"",//
								                        message: this.$t('public.deleteSuccess'),//
								                        type: 'success',
								                        position: 'bottom-right'
								                    });
													this.getsotype()
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
		
			if(index==3){
				this.getMessage(2)
			}

		},
		 //客户等级clientl/add
		getkhtype(){
			this.axios.get('/clientl/query?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.khtypedata=res.data.rows
					this.totalkh=res.data.total
					this.pageSizekh=res.data.pageSizekh
					this.khtypedata.forEach((x,index)=>{
						x.updateTime=new Date(x.updateTime).toLocaleDateString().replace(/\//g,'-')
					})
				}
			})
		},
		getDatakh(current){
            this.axios.get('/clientl/query?offset='+current+'&uid='+this.uid).then((res)=>{
               	this.khtypedata=res.data.rows
					this.totalkh=res.data.total
					this.pageSizekh=res.data.pageSizekh
					this.khtypedata.forEach((x,index)=>{
						x.updateTime=new Date(x.updateTime).toLocaleDateString().replace(/\//g,'-')
					})
            })
        },
        //翻页
        changePageSizekh(size){
            this.pageSizekh = size
        },
		//新增客户等级
		addkhtype(){
			this.kh=true
			this.khtypeisshow=true
			this.formValidatekhtype.khtypetitle=''
			this.formValidatekhtype.khtypekey=''
		},
		khtypecancel(){
			this.khtypeisshow=false
		},
		//客户等级:'',//key值
		khtypesure(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.axios.post('clientl/add?uid='+this.uid,{
						title:this.formValidatekhtype.khtypetitle,
						key:this.formValidatekhtype.khtypekey,
					}).then(res=>{
						if(res.data.status==200){
							this.$notify({
			                    title:"",//
			                    message: '添加成功',
			                    type: 'success',
			                    position: 'bottom-right'
			                });
							this.formValidatekhtype.khtypetitle=''
							this.formValidatekhtype.khtypekey=''
							this.khtypeisshow=false
							this.getkhtype()
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
		//修改客户等级
		editkhtype(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.axios.put('clientl/update?uid='+this.uid,{
						id:this.khtypeid,
						title:this.formValidatekhtype.khtypetitle,
						key:this.formValidatekhtype.khtypekey,
					}).then(res=>{
						if(res.data.status==200){

							this.$notify({
			                    title:"",//
			                    message: this.$t('public.editSuccess'),//
			                    type: 'success',
			                    position: 'bottom-right'
			                });
							this.formValidatekhtype.khtypetitle=''
							this.formValidatekhtype.khtypekey=''
							this.khtypeisshow=false
							this.getkhtype()
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
		//客户类型clientt
		getkhtype1(){
			this.axios.get('/clientt/query?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.khtypedata1=res.data.rows
					this.totalkhlx=res.data.total
					this.pageSizekhlx=res.data.pageSize
					this.khtypedata1.forEach((x,index)=>{
						x.updateTime=new Date(x.updateTime).toLocaleDateString().replace(/\//g,'-')
					})
				}
			})
		},
		getDatakhlx(current){
            this.axios.get('/clientt/query?offset='+current+'&uid='+this.uid).then((res)=>{
                this.khtypedata1=res.data.rows
				this.totalkhlx=res.data.total
				this.pageSizekhlx=res.data.pageSize
				this.khtypedata1.forEach((x,index)=>{
						x.updateTime=new Date(x.updateTime).toLocaleDateString().replace(/\//g,'-')
					})
            })
        },
        //翻页
        changePageSizekhlx(size){
            this.pageSizekhlx = size
        },
		//新增客户类型
		addkhtype1(){
			this.kh1=true
			this.khtypeisshow1=true
			this.formValidatekhtype1.khtypetitle1=''
			this.formValidatekhtype1.khtypekeytype=''
		},
		khtypecancel1(){
			this.khtypeisshow1=false
		},
		//客户类型:'',//key值
		khtypesure1(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.axios.post('clientt/add?uid='+this.uid,{
						title:this.formValidatekhtype1.khtypetitle1,
						key:this.formValidatekhtype1.khtypekeytype,
					}).then(res=>{
						if(res.data.status==200){
							this.$notify({
			                    title:"",//
			                    message: '添加成功',
			                    type: 'success',
			                    position: 'bottom-right'
			                });
							this.formValidatekhtype1.khtypetitle1=''
							this.formValidatekhtype1.khtypekeytype=''
							this.khtypeisshow1=false
							this.getkhtype1()
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
		//修改客户类型
		editkhtype1(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.axios.put('clientt/update?uid='+this.uid,{
						id:this.khtypeid1,
						title:this.formValidatekhtype1.khtypetitle1,
						key:this.formValidatekhtype1.khtypekeytype,
					}).then(res=>{
						if(res.data.status==200){

							this.$notify({
			                    title:"",//
			                    message: this.$t('public.editSuccess'),//
			                    type: 'success',
			                    position: 'bottom-right'
			                });
							this.formValidatekhtype1.khtypetitle1=''
							this.formValidatekhtype1.khtypekeytype=''
							this.khtypeisshow1=false
							this.getkhtype1()
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
		//销售类型

		getsotype(){
			this.axios.get('/sotype/query?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.sotypedata=res.data.rows
					this.totalxs=res.data.total
					this.pageSizexs=res.data.pageSize
					this.sotypedata.forEach((x,index)=>{
						x.updateTime=new Date(x.updateTime).toLocaleDateString().replace(/\//g,'-')
					})
				}
			})
		},
		getDataxs(current){
            this.axios.get('/sotype/query?offset='+current+'&uid='+this.uid).then((res)=>{
                this.sotypedata=res.data.rows
				this.totalxs=res.data.total
				this.pageSizexs=res.data.pageSize
				this.sotypedata.forEach((x,index)=>{
						x.updateTime=new Date(x.updateTime).toLocaleDateString().replace(/\//g,'-')
					})
            })
        },
        //翻页
        changePageSizexs(size){
            this.pageSizexs = size
        },
		//新增销售类型
		sotypetype(){
			this.xs=true
			this.sotypeisshow=true
		},
		sotypecancel(){
			this.sotypeisshow=false
			this.formValidatesotype.sotypetitle=''
			this.formValidatesotype.sotypekey=''
		},
		//waretypekey:'',//key值
		sotypesure(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.axios.post('sotype/add?uid='+this.uid,{
						title:this.formValidatesotype.sotypetitle,
						key:this.formValidatesotype.sotypekey,
					}).then(res=>{
						if(res.data.status==200){
							this.$notify({
			                    title:"",//
			                    message: '添加成功',
			                    type: 'success',
			                    position: 'bottom-right'
			                });
							this.formValidatesotype.sotypetitle=''
							this.formValidatesotype.sotypekey=''
							this.sotypeisshow=false
							this.getsotype()
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
		//修改销售类型
		editsotype(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.axios.put('sotype/update?uid='+this.uid,{
						id:this.sotypeid,
						title:this.formValidatesotype.sotypetitle,
						key:this.formValidatesotype.sotypekey,
					}).then(res=>{
						if(res.data.status==200){
							this.$notify({
			                    title:"",//
			                    message: this.$t('public.editSuccess'),//
			                    type: 'success',
			                    position: 'bottom-right'
			                });
							this.formValidatesotype.sotypetitle=''
							this.formValidatesotype.sotypekey=''
							this.sotypeisshow=false
							this.getsotype()
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
		//通知
			messageSelected(v){
				this.messageSendMe=v
				this.getMessage(this.messageSendMe)
			},
			//GET /client/notify 通知消息
			getMessage(s){
				this.axios.get('client/notify?cid='+s+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						if(this.messageSendMe==2){
							this.messageSendMeData=res.data.rows
							this.messageSendMetotal=res.data.total
							this.messageSendMepageSize=res.data.pageSize
							this.messageSendMeData.forEach(x=>{
								x.creationDate=new Date(x.creationDate).toLocaleString().replace(/\//g,'-')
							})
						}
						if(this.messageSendMe==1){
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
				this.axios.get('client/notify?cid=2&offset='+current+'&uid='+this.uid).then(res=>{
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
				this.axios.get('client/notify?cid=2&offset='+current+'&uid='+this.uid).then(res=>{
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
                        this.axios.get('/client/agreed/'+id+'?uid='+this.uid).then(res=>{
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
                        this.axios.get('/client/refuse/'+id+'?uid='+this.uid).then(res=>{
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
			this.getsotype()//销售
			this.getkhtype()//客户等级
			this.getkhtype1()//客户类型
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
	display:flex;
	height:100%;
	width:100%;

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
.right-info{
	display:flex;
	flex-direction: column;
	margin-left:20px;
	margin-top:20px;
}
.right-info span{
	margin-top:20px;
}
.right-info div{
	margin-top:10px;
}
.bg,.bgjxc,.bgcw{
	background: rgb(241,245,247);
    color: rgb(59,119,227);
}

/*属性*/
.attrtitle{
	display:flex;
	justify-content: space-around;
	height:40px;
	line-height: 40px;

	background: #f9f9f9
}
.attrname{
	display:flex;
	justify-content: space-around;
	margin-top:20px;

	border-bottom:1px dashed  #ccc;
}
.attrname li,.attrtitle li{
	width:100px;
	margin-bottom:20px;
	text-align: center;
}
.table1{
	width:100%;

	display:flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

}
.table2{
	width:100%;
	display:flex;
	flex-direction: column;


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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
.right-left{
width: 104px;
height:100px;
border:1px dashed #e1e1e1;
}
.table1 div{
	height:50px;
	line-height: 40px;
	margin-top:5px;
}
.table1 div span{
	text-align: left
}
.righttoptitle{
	display: flex;
	justify-content: space-between;
}
</style>
<style type="text/css" scoped>
	.el-upload--text{
	width:100px!important;
	height:100px!important;
	border:none!important;
}

</style>
