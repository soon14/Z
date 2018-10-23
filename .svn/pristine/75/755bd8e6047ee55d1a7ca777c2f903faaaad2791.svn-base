<template>
	<!--员工-->
	<div class="employee-box">
		<div class='employee-right'>
			<!--顶部的按钮-->
			<div class="btns-box">
				<div class="wldw">
					<!-- <Input  name="" style='padding: 0 40px 0 0;'></Input>
					<span><a >搜索</a></span> -->
					 <div style='margin-right:10px;margin-left:10px'>
	                    <span style="width:42px;font-weight:900">{{$t('public.screen')}}：</span><!--筛选-->
	                     <Select style="width:100px" v-model='valueT' :placeholder="$t('public.all')" @on-change="orderselectedTop">
	                        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
	                    </Select>
                  	 </div>
					 <Input style='margin-top:8px;width:300px' v-model='keyword' @on-enter="enterTopSearch" :placeholder="$t('public.nameandphone')">
                    	<span slot="append"  @click='searchStore' style='cursor:pointer'>{{$t('public.search')}}</span><!--搜索-->
                	</Input>
				</div>
				<div>
					<Button type="ghost" shape="circle" style="margin-right:5px;border:none;background:#3b77e3;color:#fff"  @click="gotoAdd"><Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}</Button><!--新建-->
					<Button type="ghost" shape="circle"
        				style="border:none;background:#3b77e3;color:#fff;"
        				@click="storeImport"><Icon type="document" style="margin-right:5px;color:#fff" ></Icon>
        				{{$t('public.import')}}<!--导入-->
                    </Button>
					<!-- 更多-->
			            <Dropdown trigger="click" style="margin-left: 4px;margin-right: 15px">
			                  <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">
			                  	{{$t('public.more')}}
			                  	<!--更多-->
			                  <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
			              </Button>

			              <DropdownMenu slot="list">
			                  <span  @click="start"><DropdownItem >{{$t('public.start')}}</DropdownItem></span>
			                  <span  @click="stop"><DropdownItem >{{$t('public.stop')}}</DropdownItem></span>
			                  <span  @click="del"><DropdownItem >{{$t('public.del')}}</DropdownItem></span>
			              </DropdownMenu>
			           </Dropdown>
				</div>
			</div>
			<!--表格数据-->
			<div class="table">
				<Table border highlight-row size="small" :columns="columns" :data="dataList" @on-row-dblclick="dbl" @on-row-click='clickrow'></Table>
				<!--底部的分页--> 
			<div class="page-box">
				 <Page :total="total" size='small' show-total show-sizer placement='top' :page-size-opts="[10,20,30,40,50]" :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
			</div>
			</div>
		</div>
		<!--导入-->
    <Modal v-model="importisshow" width="700" :mask-closable='false' :closable='false' :title="$t('manage.warehouse.fileImport')"><!--文件导入-->
        <el-steps  :active="active"  :align-center='true' style='margin-left:120px'>
              <el-step :title="$t('manage.warehouse.fileImport')" ></el-step>
              <el-step :title="$t('manage.warehouse.fileY')" ></el-step>
              <el-step :title="$t('manage.warehouse.fileS')" ></el-step>
            </el-steps>

       <!--第一步-->
        <div style='width:100%;margin:20px auto;text-align:center;' v-if='oneStep'>
           <div style='width:100%;margin:20px auto;text-align:center;font-size:14px;font-weight:600;border-top:1px solid #e4e4e4'>
				<span style='display:block;margin: 20px auto 30px 0;'>{{$t('manage.warehouse.fileImport')}}</span><!--文件导入-->
			</div>
            <div style='width:100%;margin:20px auto;text-align:center;position:relative'>
                <div style='margin-left:-108px'>
                	<span>{{$t('manage.warehouse.filechoose')}}：</span><!--选择文件-->
                  	<Input  disabled style='width:202px' v-model='url'></Input>
					<div style='position:absolute;top: 0px;right:175px;height: 35px;width: 80px;overflow: hidden;'>
						<el-upload
						ref="upload"
						:show-file-list='false'
						class="upload-demo"
						:action="actionUrl"
                        :on-progress='onprogress'
						:on-success='success'
						:before-upload='beforeAvatarUpload'
						accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" >
						<Button size="small" type="primary" style='background:#169BD5'>
						{{$t('manage.warehouse.upload')}}</Button><!--点击上传-->

						</el-upload>
					</div>
                    <div v-if='loadingisshow' >
                        <Spin fix>
                            <mu-icon value="rotate_right" color="blue"  class="demo-spin-icon-load"></mu-icon>
                            
                            <div>Loading...</div>
                        </Spin>
                    </div>
                    <div v-if='errorisshow' class='importErrTxt'>{{error}}</div>
                </div>
            </div>
            <div style='margin-top:40px;display: flex;justify-content:space-between;;margin-bottom:-40px;font-size:14px;cursor:pointer'>
                <Button  type="ghost" style='margin-left:5px;border:none;background:#169BD5;color:#fff'>

                     <a :href="ygUrl" style='color:#fff' @click.stop='stopsku($event)'>
                     {{$t('manage.warehouse.fileD')}}</a>
                </Button>
                <span style="" @click="cancel">{{$t('public.cancel')}}</span><!--取消-->
            </div>
        </div>
        <!--第二步-->
         <div style='width:100%;margin:20px auto;text-align:center;' v-if='twoStep'>
            <div style='width:100%;margin:20px auto;text-align:center;position:relative'>
                <Table border  stripe ellipsis ref="selection"  :columns="importstore" :data="importstoredataList"></Table>
            </div>
            <div style='margin-top:40px;display: flex;justify-content:space-between;;margin-bottom:-40px;font-size:14px'>
                <div>共导入：<span style='color:blue'>{{importstoredataList.length}}</span> 条数据</div>
                <div>
                    <span style="color:#448AFF;font-size:14px" @click="gothree"><a>{{$t('public.sureBtn')}}</a></span><!--确认-->
                </div>
            </div>
         </div>
         
        <div slot="footer">

        </div>
    </Modal>
	</div>
</template>

<script>
import LoadUrl from '@/components/common/actionLoad'
	export default {
		data() {
			return {
                ygUrl:"",//导入地址
				loadingisshow:false,
                isshowtable:true,
				errorisshow:false,
                error:'',//导入失败的提示
				        type:1,
                oneStep:true,//第一步显示
                twoStep:false,//第2步显示
                threeStep:false,//第3步显示
                active:1,//步数
                importisshow:false,//导入显示
                url:'',//选择文件后或名称
                importType:1,
                importStoreType:[
                    {
                        value:1,
                        label:'Excel'
                    }
				],
				//POST /sku/import 导入http://dev.zsydian.com:9003/pss/employee/import
				actionUrl:LoadUrl.httpPrefix.Url+'employee/import?uid='+this.$store.state.common.token,//导入地址
                //导入的商品文件数据key
                importstore:[
                    {
						title:this.$t('manage.ey.headImg'),//"头像",
						key:"headPic",
						width: 120,
                        align: 'center',
                        render:(h, params) =>{
                        	return h('div',[
                    			h('img',{
                    				attrs:{
                    					src:params.row.headPic
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
						title: this.$t('manage.ey.name'),//'姓名',
						
                        width: 120,
						key: 'name'
					},
					{
						title: this.$t('manage.ey.code'),//'工号',
						
                        width: 120,
						key: 'code'
					},
					{
						title: this.$t('public.gender'),//'性别',
						width:80,
						key: 'gender',
						render:(h,params)=>{
			              return h('div',{
			                  style:{
			                    color:params.row.gender==this.$t('public.man')?'#72B7EA':params.row.gender==this.$t('public.woman')?'#FF934D':''
			                  }
			                },params.row.gender)
			              }
					},
					{
						title: this.$t('manage.ey.position'),//'职位',
						
                        width: 120,
						key: 'positionName'
					},
					{
						title: this.$t('manage.ey.mobile'),//'手机号',
						
                        width: 120,
						key: 'phone'
					},
					{
						title:  this.$t('manage.ey.email'),//'邮箱',
						width: 120,
						key: 'email'
					},
					{
						title: this.$t('manage.ey.person'),//'联系人',
						width: 120,
						key: 'emergencyContact'
					},
					
					{
						title: this.$t('manage.ey.time'),//'入职时间 ',
						 width: 120,
						key: 'createTime'
					},
                ],
				importstoredataList:[],//导入的仓库文件数据
				keyword:'',//搜索的关键词
				dataList: [], //员工列表
				total: 0,
				pageSize: 0,
				valId:"",
				uid: this.$store.state.common.token,
				valueT:1,
                orderListname:[
                    {
                        label:'全部',
                        value:0
                    },
                    {
                        label:this.$t('public.normal'),//正常
                        value:1
                    },
                    {
                        label:this.$t('public.normalT'),//"已停用"
                        value:99
                    },
                ],
				columns: [
					
					{
						title:this.$t('manage.ey.headImg'),//"头像",
						key:"headPic",
						width: 120,
                        align: 'center',
                        render:(h, params) =>{
                        	return h('div',[
                        			h('img',{
                        				attrs:{
                        					src:params.row.headPic
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
						title: this.$t('manage.ey.name'),//'姓名',
						
						key: 'name'
					},
					{
						title: this.$t('manage.ey.code'),//'工号',
						
						key: 'code'
					},
					{
						title: this.$t('public.gender'),//'性别',
						width:80,
						key: 'gender',
						render:(h,params)=>{
			              return h('div',{
			                  style:{
			                    color:params.row.gender==this.$t('public.man')?'#72B7EA':params.row.gender==this.$t('public.woman')?'#FF934D':''
			                  }
			                },params.row.gender)
			              }
					},
					{
						title: this.$t('manage.ey.position'),//'职位',
						
						key: 'positionName'
					},
					{
						title: this.$t('manage.ey.mobile'),//'手机号',
						
						key: 'phone'
					},
					{
						title:"登陆账号",//'邮箱',
						
						key: 'accountName'
					},
					{
						title: this.$t('manage.ey.person'),//'联系人',
						
						key: 'emergencyContact'
					},
					
					{
						title: this.$t('manage.ey.time'),//'入职时间 ',
						 
						key: 'createTime'
					},
					{
                        title:this.$t('public.status'),//"状态",
                        width:120,
                        align:'center',
                        key:"statusDesc",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    fontWeight:'900',
                                    color:params.row.status==1 || params.row.status==0?'#40ca98':'#d53c39'
                                }
                            },params.row.statusDesc)
                        }
                    }
					
				]
				
			}
		},
		methods: {
			//导入
            //下载阻止冒泡
			stopsku(event){
               event.stopPropagation()
            },
            //点击
            storeImport(){
                this.importisshow=true
                this.active=1
                // this.oneStep=true//第一步显示
                this.twoStep=false//第2步隐藏
                this.threeStep=false//第3步隐藏
                this.url=''
                this.errorisshow=false
                this.error=''
                this.importstoredataList=[]
            },
            //取消
            cancel(){
                this.active=1
                this.importisshow=false//弹框消失
                this.oneStep=true//第一步显示
                this.twoStep=false//第2步隐藏
                this.threeStep=false//第3步隐藏
                this.url=''
                this.errorisshow=false
                this.error=''
                this.importstoredataList=[]
            },
            //第一步
            importOne(){
                if(this.url==''){
                	this.errorisshow=true
                    this.error=this.$t('manage.warehouse.upmb')
                    return
                }else{
                    this.active=2
                    this.oneStep=false
					this.twoStep=true
                }
            },
            //返回第一步
            goOneStep(){
                this.active=1
                this.oneStep=true
                this.twoStep=false
            },
            //进入第三
            gothree(){
                this.active=1
                this.importisshow=false//弹框消失
                this.oneStep=true//第一步显示
                this.twoStep=false//第2步隐藏
                this.threeStep=false//第3步隐藏
                this.url=''
                this.errorisshow=false
                this.error=''
                this.importstoredataList=[]
            },
             //上传时
            onprogress(event, file, fileList){
            	
            	this.loadingisshow=true
            },
             //上传之前类型之前
            beforeAvatarUpload(file){
               var fileName=new Array()
                fileName =file.name.split('.');
                const extension = fileName[fileName.length-1] === 'xls'
                const extension2 =  fileName[fileName.length-1]=== 'xlsx'
                const isLt10M = file.size / 1024 / 1024 < 10
                if (!extension && !extension2) {
                    this.$notify({
				        title: "",
				        message:this.$t('finance.upTemplate'),//'上传模板只能是xls、xlsx格式!',
				        type: 'error',
				        position: 'bottom-right'
			        });
                }
                if (!isLt10M) {
                    this.$notify({
				        title: "",
				        message: this.$t('finance.upTemplateB'),//'上传模板大小不能超过 10MB!',
				        type: 'error',
				        position: 'bottom-right'
			        });
                }

             return extension || extension2 && isLt10M

            },
            //成功后的会掉
            success(response, file, fileList){
                 if(response.status==200){
                   	this.error=this.$t('finance.upTemplateS')
                   	this.errorisshow=true
                    this.url=file.name
                    console.log(response)
                    this.loadingisshow=false
                    this.importstoredataList=response.rows
                    this.active=2
                    this.oneStep=false
                    this.twoStep=true
                    this.importstoredataList.forEach((x)=>{
                        x.createTime = new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                       })
                    this.getEmployeeList(thi.valueT)
                }else{
                    this.errorisshow=true
                    this.loadingisshow=false
                    this.error=response.errorMessage
                   //console.log(response)
                }
            },
            //回车搜索
            enterTopSearch(){
                this.searchStore()
            },
			//关键词搜索员工
			searchStore(){
				this.axios.get('employee/query?keyword='+this.keyword+'&uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						let data = res.data;
                        console.log(data)
						this.dataList = res.data.rows
						this.pageSize = data.pageSize;
						this.total = data.total;
						this.dataList.forEach((x)=>{
								if(x.gender==1){
				                    x.gender=this.$t('public.man')//'男'
				                  }else{
				                     x.gender=this.$t('public.woman')//'女'
				                  }
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
						this.keyword=''
					}
				})
			},
			
			//点击增加  跳转到 新增加员工页面
			gotoAdd: function() {
				this.$router.push({
					path: '/addEy',
					query: {
						id: ''
					}
				});
			},
			//单击一行
			clickrow(data,index){
				this.valId=data.id
				console.log(data)
			},
			//双击表格一行
			dbl(row,index){
				this.$router.push({
					path:'/addEy',
					query:{
						id:row.id,
						index:index,
                        s:row.status
					}
				})
			},
		//获取员工列表信息GET /employee/query 员工管理
		getEmployeeList(s){
				this.axios.get('employee/query?uid='+this.uid+'&status='+s).then((res)=>{
					if(res.data.status==200){
						let data = res.data;
						
						this.dataList = data.rows
						this.pageSize = data.pageSize;
						this.total = data.total;
						this.dataList.forEach((x)=>{
							if(x.gender==1){
								x.gender=this.$t('public.man')//'男'
								}
                            if(x.gender==0){
                                x.gender=this.$t('public.woman')//'女'
                            }
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							
						})
					}
				})
			},
			//点击删除
			del() {
				if(this.valId==''){
					this.$notify({
                        title:"",//
                        message:'请选一条数据',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
				this.axios.delete('/employee/delete/' + this.valId + '?uid=' + this.uid).then((res) => {
					if(res.data.status == '200') {
						this.$notify({
		                        title:"",//
		                        message:this.$t('public.deleteSuccess'),//
		                        type: 'success',
		                        position: 'bottom-right'
		                    });
                        this.getEmployeeList(this.valueT);
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
			},
			//点击停用
			stop(){
				if(this.valId==''){
					this.$notify({
						title:"",
						//title:this.$t('public.error'),//
                        message:'请选一条数据',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
				this.axios.post('/employee/disabled/'+this.valId+'?uid='+this.uid).then((res)=>{
					 if(res.data.status=='200'){
						this.$notify({
								title:"",
		                        message:this.$t('public.normalT'),
		                        type: 'success',
		                        position: 'bottom-right'
		                    });
						this.getEmployeeList(this.valueT);
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
			},
			//点击启用
			start(){
				if(this.valId==''){
					this.$notify({
                        title:"",
                        message:'请选一条数据',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.axios.post('/employee/enabled/'+this.valId+'?uid='+this.uid).then((res)=>{
						 if(res.data.status=='200'){
							this.$notify({
			                        title:"",
			                        message:this.$t('public.normalS'),
			                        type: 'success',
			                        position: 'bottom-right'
								});
								this.getEmployeeList(this.valueT);
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
				
			},
			 //切换一条页
            getData(current){
                this.axios.get('/employee/query?offset='+current+'&uid='+this.uid+'&status='+this.valueT).then((res)=>{
                    let data=res.data
                    this.dataList = data.rows
                    this.pageSize = data.pageSize;
					this.total = data.total;
                    this.dataList.forEach((x)=>{
                        if(x.gender==1){
                            x.gender=this.$t('public.man')//'男'
                            }
                        if(x.gender==0){
                            x.gender=this.$t('public.woman')//'女'
                        }
                        x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        
                    })
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
                this.axios.get('/employee/query?length='+size+'&uid='+this.uid+'&status='+this.valueT).then((res)=>{
                    console.log(res)
                    let data=res.data
                    this.dataList = res.data.rows
                    this.pageSize = data.pageSize;
                    this.total = data.total;
                    this.dataList.forEach((x)=>{
                        if(x.gender==1){
                            x.gender=this.$t('public.man')//'男'
                            }
                        if(x.gender==0){
                            x.gender=this.$t('public.woman')//'女'
                        }
                        x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        
                    })
                })
            },
            //下拉框选择
			orderselectedTop(value){
				this.valueT = value
				this.getEmployeeList(this.valueT);
			},
		},
		mounted() {
            
            this.ygUrl=LoadUrl.actionLoad.YG//员工导入模板
            // this.upPrefix=LoadUrl.httpPrefix.Url//员工上传地址前缀
			this.getEmployeeList(this.valueT);
		}
	}
</script>

<style lang="css" scoped>
	.employee-box {
		width: 100%;
		height: 100%;
		background: #fff;
		display:flex;
	}
	.btns-box {
		width: 100%;
		height: 100%;
		height: 50px;
		display:flex;
		justify-content: space-between;
		
		line-height: 50px;
	}
	.wldw {
		display: flex;
	}
	.left-top{
		height:50px;
		line-height: 50px;
		display:flex;
		background: #fff;
		border-bottom:1px solid #DDDEE1;
		justify-content: space-around;
	}
	li{
		list-style: none;
	}
	li span{
		margin-left:20px;
	}
	.bg{
		background: #f5f5f5
	}
	.wldw input{
		padding:0 30px;
		
	}
	.employee-left{
		width:20%;
		margin:0 10px;
		height:auto;
		background: #f5f5f5;
		border-left:1px solid #DDDEE1;
		border-right:1px solid #DDDEE1;
	}
	.employee-right{
		width:100%;
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
	.table {
		
		height: 100%;
		margin:0 10px;
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
		cursor: pointer;
	}

	.qp-con img {
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}
</style>
