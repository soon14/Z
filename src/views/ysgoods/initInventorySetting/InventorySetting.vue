<template>
	<!--库存设置-->
	<div class="units-box">
		<div style='display:flex;height:100%;width:100%;'>
			
             <Tabs :animated="false" style="background:#fff;width:100%;height:100%" @on-click="getfhlistbg">
                <TabPane label="期初库存">
                    <!--期初库存-->
                    <div class="right-main">
                        <div class="right" style='margin-right:20px'>
                            <Button type="ghost" shape="circle"
                            style="border:none;background:#3b77e3;color:#fff;"
                            @click="storeImport"><Icon type="document" style="margin-right:5px;color:#fff" ></Icon>
                            {{$t('public.import')}}</Button>
                            <!--更多-->
                            <Dropdown trigger="click">
                                <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">{{$t('public.more')}}
                                    <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
                                </Button>

                                <DropdownMenu slot="list">
                                    <span  @click="delcg" style="text-align:left"><DropdownItem >{{$t('public.del')}}</DropdownItem></span>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                         <!--表格数据-->
                        <div class="table">
                            <div style="margin:0 10px">
                                <Table border :columns="columns" :data="dataList"  
                                @on-row-click='clickRow' @on-row-dblclick='dblClickRow'></Table>
                            </div>
                            <!--底部的分页-->
                            <div class="page-box">
                                 <Page :total="total" show-total show-sizer :page-size-opts="[10,20,30,40,50]" size='small' :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
                            </div>
                        </div>
                    </div> 
                </TabPane>
                <TabPane label="库存日志">
                    <!--库存日志-->
                    <div class="right-main" >
                        <div class="right2">
                            <div style='display:flex;border-bottom:1px solid #e4e4e4'>
                                <span  style='height:50px;font-size:14px;font-weight:900;line-height:50px'>
                                    <div style='margin:0 10px;'>库存日志</div>  
                                </span>
                                <Input style='margin-top:10px;width:400px' v-model='kckeywordInv' placeholder='请输入库存编号/商品条码' @on-enter='entersSearchkcInv' >
                                    <span slot="append"  @click='searchkcInv' style='cursor:pointer'>搜索</span>
                                </Input>
                            </div>
                        </div>
                        <div class="table">
                         <div style="margin:0 10px">
                                <Table border :columns="columnslog" :data="dataListlog"></Table>
                            </div>
                            <!--底部的分页-->
                            <div class="page-box">
                                 <Page :total="totallog" show-total show-sizer placement='top' :page-size-opts="[10,20,30,40,50]" size='small' :pageSize='pageSizelog'  @on-change="getDatalog" @on-page-size-change="changePageSizelog"></Page>
                            </div>
                        </div>
                    </div> 
                </TabPane>
            </Tabs>
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
                        :on-error="upError"
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

                     <a :href="skuLoad" style='color:#fff' @click.stop='stopsku($event)'>
                     {{$t('manage.warehouse.fileD')}}</a>
                </Button>
                <span style="" @click="cancel">{{$t('public.cancel')}}</span><!--取消-->
            </div>
        </div>
        <!--第二步-->
         <div style='width:100%;margin:20px auto;text-align:center;' v-if='twoStep'>
            <div style='width:100%;margin:20px auto;text-align:center;position:relative'>
                <Table border height='300' :columns="importstore" :data="importstoredataList"></Table>
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
				skuLoad:"",//商品导入模板
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
                //POST /initinventory/sku 初始化商品导入
				actionUrl:LoadUrl.httpPrefix.Url+'initinventory/sku?uid='+this.$store.state.common.token,//导入地址
                //导入的商品文件数据key
                importstore:[
                    {
                        title: '商品条码',
                        key:'skuCode',

                        width:140
                    },
                    {
                        title: '商品名称',
                         width:180,
                        key:'skuName',
                    },

                    {
                        title: '最高库存',
                        key:'inventoryUp',

                        width:100,
                       align:'center'
                    },

                    {
                        title: '最低库存',
                        key:'inventory',

                        width:100,
                        align:'center'
                    },
                    {
                        title: '零售价',
                        key:'price',

                        width:80,
                       align:'center'
                    },
                    {
                        title: '批发价',
                        key:'wholePrice',

                       width:80,
                        align:'center'
                    },
                     {
                        title: '成本价',
                        key:'costPrice',

                        width:80,
                       align:'center'
                    },
                    {
                        title: '分类',
                        key:'className',

                        width:80,
                        align:'center'
                    },
                ],
				importstoredataList:[],//导入的仓库文件数据
				row:{},
				isLoading:true,
				visible: false,
				
				orderListname:[
					{
						label:"全部",
						value:0
					},
					
				],
				dataList: [],
				total: 0,
				pageSize: 0,
				valId:"",
				row:{},
				uid: this.$store.state.common.token,
				columns: [
					
                    {
                        title:'货号',//'货号',
                        key:'barcode',
                    },
                     {
                        title:'商品',//'名称',
                        key:'skuName',
                    },
                    {
                        title:"库存",
                        key:'qty',
                        align:"center",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:"#006600"
                                }
                            },params.row.qty)
                        }
                    },
                    {
                        title:"吊牌价",
                        align:'center',
                        width:120,
                        key:"price",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:"#ff0000"
                                }
                            },params.row.price)
                        }
                    },
                    {
                        title:"成本价",
                        align:'center',
                        width:120,
                        key:"costPrice",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:"#ff0000"
                                }
                            },params.row.costPrice)
                        }
                    },
                    {
                        title:"批发价",
                        align:'center',
                        width:120,
                        key:"wholePrice",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:"#ff0000"
                                }
                            },params.row.wholePrice)
                        }
                    },
                    {
                        title:'分类',//"分类",
                        key:"className",
                        align:"center",
                    },
                    {
                        title:'单位',//'单位',
                        key:'unit',
                        align: 'center',
                    },
                     {
                        title: this.$t('manage.sku.issale'),//'可销售',
                        key:'onlingSals',
                        align:"center",
                    
                       render:(h,params)=>{
                            return h('span',{
                                
                            },params.row.onlingSals==true?this.$t('manage.sku.issale'):this.$t('manage.sku.issale1'))
                        }
                    },
                     {
                        title: this.$t('public.status'),//'状态',
                        key:'statusDesc',
                      	render:(h,params)=>{
                            return h('span',{
                               
                            },params.row.statusDesc)
                        }

                    }
					
				],
				fhindex:0,
				fhlist:[
					{
						label:"期初库存",
						value:0
					},
					{
						label:"库存日志",
						value:1
					},
				],
				uid:this.$store.state.common.token,
				//日志
				dataListlog: [],
                kckeywordInv:"",
				columnslog:[
                    {
                        title:"类型",
                        key:"typeDesc"
                    },
                    {
                        title:"单号",
                        key:"recordNo"
                    },
                    {
                        title:"货号",
                        key:"skuCode"
                    },
                    {
                        title:"商品",
                        key:"skuName"
                    },
                    {
                        title:"库存",
                        key:"qty",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:"#006600"
                                }
                            },params.row.qty)
                        }
                    },
                    {
                        title:"吊牌价",
                        key:"price",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:"#ff0000"
                                }
                            },params.row.price)
                        }
                    },
                    {
                        title:"批发价",
                        key:"wholePrice",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:"#ff0000"
                                }
                            },params.row.wholePrice)
                        }
                    },
                    {
                        title:"成本价",
                        key:"costPrice",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:"#ff0000"
                                }
                            },params.row.costPrice)
                        }
                    },
                    
                    {
                        title:"变动数量",
                        key:"changeQty",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:"#006600"
                                }
                            },params.row.changeQty)
                        }
                    },
                    {
                        title:"属性",
                        key:"skuSpec"
                    },
                ],
				totallog: 0,
				pageSizelog: 0,
			}
		},
		methods: {
			//切换
			getfhlistbg(index){

				this.fhindex=index
				if(this.fhindex==0){
					this.getcgList()
				}
				if(this.fhindex==1){
					this.getLog()//库存日志
				}
			},
			//导入
            //下载阻止冒泡
			stopsku(event){
               event.stopPropagation()
            },
            //点击
            storeImport(){
                this.importisshow=true
                this.active=1
                this.oneStep=true//第一步显示
                this.twoStep=false//第2步隐藏
                this.threeStep=false//第3步隐藏
                this.url=''
                this.errorisshow=false
                this.error=''
                this.importstoredataList=[]

            },
            //取消
            cancel(){
                this.loadingisshow=false
                this.importisshow=false//弹框消失
                this.oneStep=true//第一步显示
                this.twoStep=false//第2步隐藏
                this.threeStep=false//第3步隐藏
                this.url=''
                this.errorisshow=false
                this.error=''
                this.importstoredataList=[]
                this.$refs.upload.abort()
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
                this.importisshow=false//弹框消失
                this.oneStep=true//第一步显示
                this.twoStep=false//第2步隐藏
                this.threeStep=false//第3步隐藏
                this.url=''
                this.errorisshow=false
                this.error=''
            },
            //继续编辑完成
            sureimport(){
                
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
                const isLt2M = file.size / 1024 / 1024 < 10
                if (!extension && !extension2) {

                    this.$notify({
				        title: "",
				        message:this.$t('finance.upTemplate'),//'上传模板只能是xls、xlsx格式!',
				        type: 'error',
				        position: 'bottom-right'
			        });
                }
                if (!isLt2M) {
                    this.$notify({
				        title: "",
				        message: this.$t('finance.upTemplateB'),//'上传模板大小不能超过 10MB!',
				        type: 'error',
				        position: 'bottom-right'
			        });
                }

             return extension || extension2 && isLt2M

            },
            upError(err, file, fileList){
                this.errorisshow=true
                this.loadingisshow=false
                this.error=response.errorMessage
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
                    this.getcgList();
                }else{
                    this.errorisshow=true
                    this.loadingisshow=false
                    this.error=response.errorMessage
                   //console.log(response)
                }
            },
            //获取期初化库存列表GET /initinventory/query 期初库存
			getcgList() {
				this.axios.get('/initinventory/query?uid=' + this.uid).then((res) => {
				
					if(res.data.status == '200') {
                        let data = res.data;
						this.dataList = data.rows;
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.dataList.forEach((x)=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						
						})
					}
				})
			},
			clickRow(data){
				this.valId = data.id
				this.row = data
			},
			//双击一行
			dblClickRow(data,index){//
				this.$router.push({
					path:'/addinitinventory',
					query:{
						id:data.id,
						index:index
					}
				})
			},
			//点击删除DELETE /initinventory/delete/{id} 删除
			delcg() {
				this.axios.delete('initinventory/delete/' + this.valId + '?uid=' + this.uid).then((res) => {

					if(res.data.status == '200') {
						
						this.$notify({
					        title:"",//
					        message: this.$t('public.deleteSuccess'),//
					        type: 'success',
					        position: 'bottom-right'
				        });
                      this.getcgList();
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
			 //切换一条页
            getData(current){
                this.axios.get('initinventory/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    //console.log(res)
                    this.dataList = res.data.rows
                    this.total=res.data.total
					this.pageSize=res.data.pageSize
                    this.dataList.forEach((x,index)=>{
						x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
					})
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
                this.axios.get('initinventory/query?length='+size+'&uid='+this.uid).then((res)=>{
                    //console.log(res)
                    this.dataList = res.data.rows
                    this.total=res.data.total
                    this.pageSize=res.data.pageSize
                    this.dataList.forEach((x,index)=>{
                        x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                    })
                })
                
            },
            //库存日志invlog/query
            getLog(){
            	this.axios.get('invlog/query?uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			this.dataListlog=res.data.rows
            			this.totallog=res.data.total
            			this.pageSizelog=res.data.pageSize
            		}
            		
            	})
            },
            //搜索
            searchkcInv(){
                this.axios.get('invlog/query?keyword='+this.kckeywordInv+'&uid='+this.uid).then(res=>{
                    if(res.data.status==200){
                      
                        this.dataListlog=res.data.rows
                        this.totallog=res.data.total
                        this.pageSizelog=res.data.pageSize
                    }
                    
                })
            },
            //回车搜索
            entersSearchkcInv(){
                this.searchkcInv()
            },
            //翻页
            getDatalog(current){
            	this.axios.get('invlog/query?offset='+current+'&uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			let data=res.data
            			this.dataListlog=res.data.rows
            			this.totallog=res.data.total
            			this.pageSizelog=res.data.pageSize
            		}
            		
            	})
            },
            //页码改变
            changePageSizelog(size){
            	// this.pageSizelog=size
            	this.axios.get('invlog/query?length='+size+'&uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			let data=res.data
            			this.dataListlog=data.rows
            			this.totallog=data.total
            			this.pageSizelog=data.pageSize
            		}
            		
            	})
            },
		},
		created() {
			this.$nextTick(x=>{
				this.getcgList();
                
			})
		},
		mounted() {
			// this.getcgList();
			this.skuLoad=LoadUrl.actionLoad.SKU//商品导入模板
		}
	}
</script>

<style lang="css" scoped>

	.units-box {
		width: 100%;
		background: rgb(230,233,236);
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
		height:50px;
		line-height: 50px;
		text-align: right
	}
	.right2{
		margin-right:10px;
		height:50px;
		line-height: 50px;
		margin-left:20px;
		font-size: 18px; font-weight: 900
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
.right-main{
	width:100%;
	height:100%;
	background-color: #fff;
	overflow: hidden;
}
.borIndex{
	background:rgb(241,245,247);
    color:rgb(59,119,227);
}
.page-box{
	margin-bottom: 160px;
	text-align: center;
	margin-top:5px;
}
</style>
