<template>
	<!--应付账款：-->
	<div class="units-box">

		<!--顶部的按钮-->
		<div class="btns-box">
			<p class="wldw">
          <Input v-model="keyword" @on-enter="enterSearch" style="width:300px;margin-top:10px" placeholder="输入单据编号">
           
                    <span slot="append" @click="clickSearch" style='cursor:pointer'>搜索</span>
                </Input>
      </p>
			<div style="margin-right:10px">
				<Button shape="circle" type="ghost" style="margin-right:5px;border:none;background:#3b77e3;color:#fff"  @click="gotoAdd"><Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}</Button>
				<Button type="ghost" shape="circle" style="margin-right:5px;border:none;background:#3b77e3;color:#fff"  @click="storeImport"><Icon type="document" style="margin-right:5px;color:#fff"></Icon>{{$t('public.import')}}</Button>
        
			</div>
		</div>
		<!--表格数据-->
		<div class="table">
			<Table border highlight-row  :columns="columns" :data="dataList" @on-row-dblclick="dbl" @on-row-click='clickRow'></Table>
		<!--底部的分页-->
		<div class="page-box">
			 <Page :total="total" show-total size="small" :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize">
			 </Page>
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

                     <a :href="skuLoad" style='color:#fff' @click.stop='stopsku($event)'>
                     {{$t('manage.warehouse.fileD')}}</a>
                </Button>
                <span style="" @click="cancel">{{$t('public.cancel')}}</span><!--取消-->
            </div>
        </div>
        <!--第二步-->
         <div style='width:100%;margin:20px auto;text-align:center;' v-if='twoStep'>
            <div style='width:100%;margin:20px auto;text-align:center;position:relative'>
                <Table border height='300' ref="selection"  :columns="importstore" :data="importstoredataList"></Table>
            </div>
            <div style='margin-top:40px;display: flex;justify-content:space-between;;margin-bottom:-40px;font-size:14px'>
                <div>共导入：<span style='color:blue'>{{importstoredataList.length}}</span> 条数据</div>
                <div>
                    <span style="" @click="cancel">{{$t('public.cancel')}}</span><!--取消-->
                    <span style="display:inline-block;margin:0 10px;font-size:14px" @click="">|</span>
                
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
                keyword:"",
                loading:true,
                skuLoad:LoadUrl.actionLoad.YS,//应付导入模板
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
                importstoredataList:[],//导入的仓库文件数据
                actionUrl:LoadUrl.httpPrefix.Url+'initinventory/sku?uid='+this.$store.state.common.token,//导入地址
                //导入的仓库文件数据key
                importstore:[
                    {
                        title:this.$t('finance.orderNo'),//"单据编号",
                        key:"recordNo",

                    },
                    {
                        title:this.$t('finance.sk.KH'),//"客户",
                        key:"partnerName",
                        ellipsis:true,
                    },

                    {
                        title:this.$t('finance.sk.payMoney'),// '支付金额',
                        ellipsis:true,
                        key: 'payAmount'
                    },
                    {
                        title: this.$t('finance.sk.ysMoney'),//'应收金额',
                        ellipsis:true,
                        key: 'amount'
                    },
                    {
                        title: this.$t('finance.sk.ssMoney'),//'实收金额',
                        ellipsis:true,
                        key: 'receivedAmount'
                    },
                    {
                        title: this.$t('finance.sk.orderTime'),//'单据日期',
                        ellipsis:true,
                        key: 'recordDate'
                    },

                    {
                        title:this.$t('public.remark'),//"备注",

                        key: 'remark'
                    },
                ],
               
				isLoading:true,
				current:1,
				visible: false,
				dataList: [], //往来单位列表
				total: 1,
				pageSize: 1,
				valId:"",
				uid: this.$store.state.common.token,
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
				columns: [
                //单据日期|单据编号|类型|客户|结算金额|已收金额|折扣|待付|备注|创建人|创建时间
                    {
                        title:'单据日期',
                        key:"recordDate",
                    },
                    {
                        title:'单据编号',
                        key: 'recordNo'
                    },
                    {
                        title:'类型',
                        key: 'payType'
                    },
                    {
                        title:'客户',
                        key:"partnerName",
                    },
                    {
                        title:'结算金额',
                        
                        key: 'amount'
                    },
                    {
                        title:'已收金额',
                       
                        key: 'payAmount'
                    },
                    {
                        title:'折扣',

                        key: 'discountAmount'
                    },
                    {
                        title:'待付金额',
                      
                        key: 'receivedAmount'
                    },
					
					
                    {
                        title:'备注',

                        key: 'remark'
                    },
                    {
                        title:'创建人',

                        key: 'creator'
                    },
                    {
                        title:'创建时间',

                        key: 'createTime'
                    },
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
                    this.getcgList()
                }else{
                    this.errorisshow=true
                    this.loadingisshow=false
                    this.error=response.errorMessage
                   //console.log(response)
                }
            },
            orderselectedku(value){
            	this.type=value
            },
			//点击增加  跳转到 增加供货商页面
			gotoAdd: function() {
				this.$router.push({
					path: '/addreceivable',
					query: {
						id: ''
					}
				});
			},

            clickRow(data){
                 this.valId = data.id
            },
			//双击表格一行
			dbl(row,index){
				this.$router.push({
					path:'/addreceivable',
					query:{
						id:row.id,
						index:index
					}
				})
			},
			//获取应付款单列表信息
			getUnitsList: function() {
				this.axios.get('/payable/query?uid=' + this.uid).then((res) => {
					if(res.data.status == '200') {
                        let data = res.data;
						this.isLoading=false
						this.dataList = data.rows;
						this.pageSize = data.pageSize;
						this.total = data.total;
						this.dataList.forEach((item,index)=>{
							item.createTime = this.getLocalTime(item.createTime)
							item.modifyTime = this.getLocalTime(item.modifyTime)
                            item.recordDate = this.getLocalTime(item.recordDate)
						})

					}
				})
			},
             //点击搜索
            clickSearch(){
                this.axios.get('/payable/query?keyword='+this.keyword+'&uid=' + this.uid).then((res) => {
      
                  if(res.data.status == '200') {
                        let data = res.data;
                        this.isLoading=false
                        this.dataList = data.rows;
                        this.pageSize = data.pageSize;
                        this.total = data.total;
                        this.dataList.forEach((item,index)=>{
                            item.createTime = new Date(item.createTime).toLocaleDateString().replace(/\//g,'-')
                            item.modifyTime = new Date(item.modifyTime).toLocaleDateString().replace(/\//g,'-')
                            item.recordDate = new Date(item.recordDate).toLocaleDateString().replace(/\//g,'-')
                        })

                    }
                })
            },
            //回车搜索
            enterSearch(){
                this.clickSearch()
            },
			//点击删除
			delUnits: function() {
				if(this.valId==''){
                    this.$notify({
                            title:"",//
                            message:this.$t('public.valid.chooseOneData'),
                            type: 'error',
                            position: 'bottom-right'
                        });
				}else{
					this.axios.delete('/payable/delete/' + this.valId + '?uid=' + this.uid).then((res) => {

						if(res.data.status == '200') {
                            this.$notify({
                                title:"",//
                                message:this.$t('public.deleteSuccess'),//
                                type: 'success',
                                position: 'bottom-right'
                            });
                            this.getUnitsList();
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
			//点击停用
			// stopUnits:function(id){
			// 	this.axios.post('/client/disabled/'+this.valId+'?uid='+this.uid).then((res)=>{
			// 		 if(res.data.status=='200'){
			// 		 	this.$Notice.success({
			// 				title:"",//
			// 				desc: '停用成功'
			// 			});
			// 			this.getUnitsList();
			// 		 }
			// 	})
			// },
			//点击启用
			// startUnits:function(){
			// 	this.axios.post('/client/enabled/'+this.valId+'?uid='+this.uid).then((res)=>{
			// 		 if(res.data.status=='200'){
			// 		 	this.$Notice.success({
			// 				title:"",//
			// 				desc: '启用成功'
			// 			});
			// 		 }
			// 	})
			// },
			 //切换一条页
            getData(current){
                this.axios.get('/payable/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    //console.log(res)

                    this.dataList = res.data.rows
                    this.pageSize =res.data.pageSize;
                    this.total = res.data.total;
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
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
			this.getUnitsList();
		}
	}
</script>

<style lang="css" scoped>
	.units-box {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.btns-box {
		width: 100%;
		height: 50px;
		display:flex;
		justify-content: space-between;

		line-height: 50px;
	}
	.wldw {
		font-size: 14px;
		color: #585858;
		margin-left:10px;
	}
	.right{
		margin-right:10px;
		margin-bottom:10px;
	}
	.right-btn{
		background: #FF7D16;
	    margin-right: 10px;
	    color: #fff;
	    border: none;
	    width: 26px;
	    height: 26px;
	    border-radius: 26px;
	    display: inline-block;
	    position: relative;
	    top: 10px;
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
<style type="text/css" >
	.ivu-table-border th{
		background:transparent!important;

	}
.el-step__title.is-process,.el-step__title.is-finish{
        margin-left:-30px;
    }
    .el-upload--text{
          border:none!important;
          width:80px!important;
          height:35px!important;
    }

</style>
