<template>
	<!--采购订单-->
	<div class="units-box">
		
		<!--顶部的按钮-->
		<div class="btns-box">
			<div class="wldw">
				<div>
					<span style="width:10px;font-weight:900;width:60px;">{{$t('public.screen')}}：</span>
					 <Select style="width:100px;margin-right:10px" v-model='valueT' :placeholder="$t('public.all')" @on-change="orderselected">
				        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
				    </Select>
			    </div>
			    <div style='margin-right:20px;display:flex'>
	                <Input style='margin-top:8px;width:300px' v-model='searchKeyword' :placeholder="$t('public.orderornameandphone')" @on-enter='enterSearch'>
	                <span slot="append"  @click='search' style='cursor:pointer;'>{{$t('public.search')}}</span>
	                </Input>
            	</div>
			</div>
			
			<div class="right" style='margin-right:10px'>
				<Button type="primary" style='background:#3b77e3' shape="circle" @click="gotoAdd">
					 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}<!--新建-->
				</Button>
				<Button type="primary" style='background:#3b77e3' shape="circle" @click="exportOrder">
					 <Icon type="document" style="margin-right:5px;color:#fff"></Icon>导出
				</Button>
				<Button type="primary" style='background:#3b77e3' shape="circle" @click="printOrder">
					 <Icon type="ios-folder-outline" style="margin-right:5px;color:#fff"></Icon>
					
					 打印
				</Button>
				<!--更多-->
				<Dropdown trigger="click">
                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">{{$t('public.more')}}
                    <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
                </Button>

                <DropdownMenu slot="list">
                    <span  @click="delcg"><DropdownItem >{{$t('public.del')}}</DropdownItem></span>
                </DropdownMenu>
             </Dropdown>

			</div>

		</div>
		
		<!--表格数据-->
		<div class="table">
			<Table border highlight-row  :columns="columns" :data="dataList" @on-row-dblclick="dbl" @on-select="selected" @on-row-click='clickRow' @on-selection-change="changeSelect"></Table>
			<!--底部的分页-->
			<div class="page-box">
				 <Page :total="total" size='small' show-total show-sizer :page-size-opts="[10,20,30,40,50]" placement='top' :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
			</div>
		</div>
		<!--精准搜索-->
    <Modal v-model="psisshow" width="420px">
    <p slot="header" style="height:30px;line-height:30px;text-align:center">
      
      <span>{{$t('public.PreciseSearch')}}</span>
    </p>
     <Form :label-width="100">
    
        <FormItem :label="$t('purchase.purchaseOrder.orderNo')" >
           <Input v-model='reNo' ></Input>
        </FormItem>
        <FormItem :label="$t('purchase.purchaseOrder.supplier')" >
           <Input v-model='supplierName' ></Input>
        </FormItem>
        <FormItem :label="$t('purchase.purchaseOrder.person')" >
           <Input v-model='deliverName' ></Input>
        </FormItem>
        <FormItem :label="$t('purchase.purchaseOrder.date')">
			<DatePicker type="date" :value='poDate' :placeholder="$t('purchase.purchaseOrder.date')" style="width:100%" @on-change="shdatepoDate"></DatePicker>
        </FormItem>
       <FormItem :label="$t('purchase.purchaseOrder.date2')">
		<DatePicker type="date" :value='deliveryDate' :placeholder="$t('purchase.purchaseOrder.date')" style="width:100%" @on-change="shdate"></DatePicker>
    	</FormItem>
    </Form>
    <div slot="footer">
      <div class='footer-mark'>
        <span><a style='color:#999;font-size:14px' @click='cancelSearchLocation'>{{$t('public.cancel')}}</a></span>
        <span style='font-size:20px;width:1px;height:40px;background:#e4e4e4'></span>
        <span ><a style='color:#3B77E3;font-size:14px' @click='sureSearchLocation'>{{$t('public.sure')}}</a></span>
      </div>
    </div>
  </Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				orderStrArr:[],
				orderStr:'',
				//精准搜索
				reNo:'',//单号x
              	poDate:'',//单据日期
              	supplierName:'',//供应商
             	deliveryDate:'',//收货日期
				deliverName:'',//收货人名称
				psisshow:false,//精准搜索
				searchKeyword:'',//搜搜关键词
				row:{},
				isLoading:true,
				visible: false,
				dataList: [], //往来单位列表
				valueT:0,
				orderListname:[
					{
						label:"全部",//"全部",
						value:0
					},
					{
						label:"待审核",//"未审核",
						value:1
					},
					{
						label:"待收货",
						value:15
					},
					{
						label:"收货中",
						value:77
					},
					{
						label:"已完成",
						value:88
					},
					{
						label:"已作废",
						value:19
					},
					
				],
				total: 0,
				pageSize:0,
				valId:"",
				type:'',//下拉选中
				uid: this.$store.state.common.token,
				columns: [
					{
						type:"selection",
						width:60
					},
					{
						title:"方式",
				
						
						align:"center",
						key:"recodeType"
					},
					{
						title:"来源",
					
						key:"referNo"
					},
					{
						title:this.$t('purchase.purchaseOrder.orderNo'),// '编号',
						
				
						key: 'recordNo',
					},
					{
						title:'日期',
					
						align:'center',
						key: 'poDate',
						
					},
					{
						title: this.$t('purchase.purchaseOrder.supplier'),//'供应商',
					
						key: 'supplierName'
					},
					{
						title: this.$t('purchase.purchaseOrder.ck'),//'仓库',
						
					
						key: 'deliverWarehouseName'
					},
					
					{
						title: this.$t('purchase.purchaseOrder.ysnum'),//'应收数量',
						align:'center',
			
						key: 'totalQty'
					},
					{
						title:this.$t('purchase.purchaseOrder.ysnum1'),//"已收数量",
	
						align:'center',
						key:"receiptQty",
						
					},

					
					{
						title: this.$t('purchase.purchaseOrder.person'),//'收货人',
			
						align:'center',
						key: 'deliverName',
					},
					
					{
						title: this.$t('public.status'),//'状态',
						width:80,
						align:"center",
						key: 'statusDesc',
						render:(h,params)=>{
							return h('div',{
								style:{
									
									color:params.row.status==1?'#5789E6':params.row.status==15?'#2B8F8F':params.row.status==88?'#40ca98':params.row.status==19?'#d53c39':params.row.status==77?'#067845':""
								}
							},params.row.statusDesc)
						}

					},
					
				]

			}
		},
		methods: {
			//选中项发生变化:
			changeSelect(s){
				let id=[]
				this.orderStrArr=s
				// this.orderStr
				for(let i =0;i<this.orderStrArr.length;i++){
					
					id.push(this.orderStrArr[i].id)
				}
				this.orderStr=id.join(',')
				console.log(this.orderStr)
			},
			//点击增加  跳转到 增加供货商页面
			gotoAdd: function() {
				this.$router.push({
					path: '/addcg',
					query:{
						new:1
					}
				});
			},
			//双击表格一行
			dbl(row,index){
				this.isLoading = true
				this.$router.push({
					path:'/addcg',
					query:{
						id:row.id,
						index:index,
						s:row.status
					}
				})
			},
			
			//下拉框选择
			orderselected(value){
				this.valueT = value
				this.getcgList(this.valueT);
			},
			//获取采购订单列表
			getcgList(s) {
				this.axios.get('/po/query?uid=' + this.uid+'&status='+s).then((res) => {
					let data = res.data;
					console.log(data.rows)
					if(res.data.status == '200') {
						this.dataList = data.rows;
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.dataList.forEach((x)=>{
							x.createTime=this.getLocalTime(x.createTime)
							if(x.poDate==undefined){
								x.poDate=''
							}else{
								x.poDate=this.getLocalTime(x.poDate)
							}
							
							if(x.type==0){
								// x.type='退货'
							}
							if(x.type==1){
								x.type='进货'
							}
							if(x.type==2){
								x.type='退货'
							}
						})
						
						this.pageSize = data.pageSize;
						this.total = data.total;
					}
				})
			},
			//表格选中时的数据，数组
			selected(selection,row){
				this.valId = row.id
				this.row = row
			},
			//单击某一行
			clickRow(data){
				this.valId = data.id
				this.orderStr= data.id
				console.log(data)
			},
			//点击删除
			delcg: function() {
				if(this.orderStr==''){
                    
                    this.$notify({
				        title:"",//
				        message: '请选择采购订单',
				        type: 'error',
				        position: 'bottom-right'
			        });
                }else{
                	this.$Modal.confirm({
	                    title: '删除',
	                    content: '<p>确定要删除吗?</p>',
	                    onOk: () => {
	                        this.axios.delete('/po/delete/'+this.orderStr+'?uid='+this.uid).then((res)=>{
								if(res.data.status==200){
									this.$notify({
										title:"",//
										message: this.$t('public.deleteSuccess'),//
										type: 'success',
										position: 'bottom-right'
									});
									this.getcgList(this.valueT);
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
	                    }
                	})
                	
                }
				
			},
			 //点击搜索
            search(){
                this.axios.get('/po/query?keyword='+this.searchKeyword+'&uid=' + this.uid).then((res) => {
                    if(res.data.status==200){
                        let data = res.data;
                        this.dataList = data.rows;
                        this.pageSize = data.pageSize;
                        this.total = data.total;
                        this.dataList.forEach((x,index)=>{
                            x.Raddress=x.province+x.city
                            x.ContentAddress=x.province+x.city
                          	x.createTime=this.getLocalTime(x.createTime)
							if(x.poDate==undefined){
								x.poDate=''
							}else{
								x.poDate=this.getLocalTime(x.poDate)
							}
                        })
                    }
                })
            },
            
            //回车搜索
            enterSearch(){
                this.search()
            },
             //精准搜索
            searchLocation(){
              this.psisshow=true
            },
            //单据日期
            shdatepoDate(date){
            	this.poDate=date
            },
            // //设置收货日期
			shdate(date){
				this.deliveryDate = date
			},
            //精准搜索确认
            sureSearchLocation(){
               this.axios.get('/po/query/0'+'?uid=' + this.uid,{
                recordNo:this.reNo,//单号
                poDate:this.poDate,//单据日期
                supplierName:this.supplierName,//供应商
                deliveryDate:this.deliveryDate//到货日期
               }).then((res) => {
                if(res.data.status==200){
                  let data = res.data
                      this.dataList = data.rows;
                      this.pageSize = data.pageSize;
                      this.total = data.total;
                      this.reNo=''
                      this.poDate=''
                      this.supplierName=''
                      this.deliveryDate=''
                      this.psisshow=false
                  }
               })
            },
             //精准搜索取消
            cancelSearchLocation(){
              this.reNo=''
              this.poDate=''
              this.supplierName=''
              this.deliveryDate=''
              this.psisshow=false
            },
			 //切换一条页
            getData(current){
                this.axios.get('/po/query?offset='+current+'&uid='+this.uid+'&status='+this.valueT).then((res)=>{
                    //console.log(res)
                    this.dataList = res.data.rows
                    this.dataList.forEach((x,index)=>{
								
						if(x.poDate==undefined){
								x.poDate=''
							}else{
								x.poDate=this.getLocalTime(x.poDate)
							}
						x.createTime=this.getLocalTime(x.createTime)
					})
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
                this.axios.get('/po/query?length='+size+'&uid=' + this.uid+'&status='+this.valueT).then((res) => {
					
					if(res.data.status == '200') {
						let data = res.data;
						this.dataList = data.rows;
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.dataList.forEach((x)=>{
							x.createTime=this.getLocalTime(x.createTime)
							if(x.poDate==undefined){
								x.poDate=''
							}else{
								x.poDate=this.getLocalTime(x.poDate)
							}
						
						if(x.type==0){
								// x.type='退货'
							}
							if(x.type==1){
								x.type='进货'
							}
							if(x.type==2){
								x.type='退货'
							}
						})
						
					}
				})
            },
            //导出采购单
		 	exportOrder(){
				this.axios.get('po/export?ids='+this.orderStr+'&uid='+this.uid).then(res=>{
            		if(res.data!=null){
						this.$notify({
							title:"",//
							message: res.data.errorMessage,
							type: 'error',
							position: 'bottom-right'
						});
					}else{
						window.location.href=res.request.responseURL
						this.orderStrArr=[]
		
						this.orderStr=''
						this.getcgList(this.valueT);
					}
            	})
		 	},
		 	printOrder(){
		 		this.axios.get('po/print?ids='+this.orderStr+'&uid='+this.uid).then(res=>{
            		if(res.data!=null){
						this.$notify({
							title:"",//
							message: res.data.errorMessage,
							type: 'error',
							position: 'bottom-right'
						});
					}else{
						window.location.href=res.request.responseURL
						this.orderStrArr=[]
					
						this.orderStr=''
						this.getcgList(this.valueT);
					}
            	})
		 	},
		},
		mounted() {
			this.getcgList(0);

		}
	}
</script>

<style lang="css" scoped>
.footer-mark{
  width:100%;
  height:40px;
  border-top:1px solid #E4E4E4;
  display: flex;
  justify-content: space-around;
  margin-bottom:-10px;
}
.footer-mark span{
  height:40px;
  line-height: 40px
}
p.edit:hover{
	color:blue;
}
	.units-box {
		width: 100%;
		height: auto;
		background: #fff;
	}
	.btns-box {
		width: 100%;
		height: 50px;
		display:flex;
		justify-content: space-between;
		
		line-height: 50px;
	}
	 .wldw{
    	margin-left:10px;
    	
    	height:50px;
    	display: flex;
    	line-height: 50px
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
		margin:0 10px;
	}

	.page-box {
		text-align: center;
		margin-top:5px;
		margin-bottom:120px;
	}
	
</style>

