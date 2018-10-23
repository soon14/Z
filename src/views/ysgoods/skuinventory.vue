<template>
	<!--库存-->
	<div class='kc'>
		<div class="btns-box">
			<!--查询库存-->
			<div style='display:flex'>
				<Input v-model='skukeyword' style='width:300px;margin-top:10px;margin-left:10px' 
				:placeholder="$t('public.codeandname')" @on-enter="enterSearch"><span slot="append" @click='topSearchSku' class='searchsku'>{{$t('public.search')}}</span></Input>
			
			</div>
			<div style='margin-right:40px'>
			</div>
		</div>
		
		<!--表格数据@on-row-dblclick="dbl"-->
		<div class="table">
			<Table border highlight-row :columns="columns" :data="dataList"  @on-select="selected" @on-row-dblclick="dbl" @on-row-click='clickRow'></Table>
			<!--底部的分页-->
			<div class="page-box" v-if='total!=0'>
				 <Page :total="total" show-total show-sizer :page-size-opts="[10,20,30,40,50]" size='small' :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
			</div>
		</div>
		 <!--精准搜索-->
    <Modal v-model="psisshow" width="440px">
	    <p slot="header" style="height:30px;line-height:30px;text-align:center">
	      
	      <span>{{$t('public.PreciseSearch')}}</span>
	    </p>
	     <Form :label-width="100">
	    	
	        <FormItem :label="$t('manage.sku.SkuCode')" ><!--货号-->
	           <Input v-model='skuCodeL' ></Input>
	        </FormItem>
	        <FormItem :label="$t('manage.sku.SkuName')" ><!--商品名称-->
	           <Input v-model='skuNameL' ></Input>
	        </FormItem>
	        <FormItem :label="$t('sideBar.manage.supplier')" ><!--供应商名称-->
	           <Input v-model='supplierNameL' ></Input>
	        </FormItem>
	        <FormItem :label="$t('manage.warehouse.Code')" ><!--仓库编码-->
	           <Input v-model='warehouseCodeL' ></Input>
	        </FormItem>
	        <FormItem :label="$t('sideBar.manage.warehouse')" ><!--仓库名称-->
	           <Input v-model='warehouseL' ></Input>
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
	export default{
		data(){
			return{
				//高级查询
				psisshow:false,
				supplierNameL:"",//供应商
				warehouseL:"",//仓库
				skuNameL:"",//商品名称
				skuCodeL:"",//货号
				warehouseCodeL:"",//仓库编码
				skukeyword:'',//查询库存关键词
				isLoading:true,
				valId:'',
				pageSize:0,
				total:0,
				orderListname:[
					{
						label:this.$t('public.all'),//"全部",
						value:1
					},
				],
				columns:[
					
					{
	                	title:"",
	                	width:80,
	                	key:"skuPic",
	                	
	                	 render:(h, params) =>{
                        	return h('div',[
                    			h('img',{
                    				attrs:{
                    					src:params.row.skuPic
                    				},
                    				style:{
                    					width:'40px',
                    					height:'40px',
                    				}
                    			})
                    		])
                        }
	                },
	                {
						title:"条码",
						width:180,
						key:"barcode",
						
					},
					{
						title:"货号",
						width:180,
						key:"skuCode"
					},
					{
						title:"商品",
						width:280,
						ellipsis:true,
						key:"skuName"
					},
					{
						title:"仓库编码",
						width:180,
						key:"warehouseCode"
					},
					{
						title:"仓库",//"仓库",
						width:180,
						key:"warehouseName"
					},

					{
						title:"供应商",
						width:180,
						key:"partnerName"
					},
					{
						title:"库存量",
						align:'center',
						width:120,
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
						title:"冻结数",
						align:'center',
						width:120,
						key:"frozenqty"
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
						title:"单位",
						align:'center',
						width:120,
						key:"unit"
					},
					{
						title:"属性",
						align:'center',
						width:120,
						key:"skuSpec",
					},
					
				],
				dataList:[],
				uid: this.$store.state.common.token,
			}
		},
		methods:{
			gotoAdd(){
				this.$router.push({
					path:'/addskuInventory'
				})
			},
			//获取所有库存
			getAllList(){
				this.axios.get('inventory/query?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						let data = res.data;
						this.dataList = res.data.rows
						this.pageSize = data.pageSize;
						this.total = data.total;
					}
				})
			},
			clickRow(row){
				this.valId = row.skuId
			},
			//表格选中时的数据，数组
			selected(selection,row){
				this.valId = row.skuId
				console.log(row)
			},
			//双击表格一行
			dbl(row,index){
				this.isLoading = true
				this.$router.push({
					path:'/addskuInventory',
					query:{
						id:row.skuId,
						index:index
					}
				})
			},
			//高级查询
			searchLocation(){
				this.psisshow=true
			},
			//高级查询确认
			sureSearchLocation(){
				this.axios.get('/inventory/query?uid='+this.uid,{
					partnerName:this.supplierNameL,//供应商
					warehouseName:this.warehouseL,//仓库
					skuCode:this.skuCodeL,//货号
					skuName:this.skuNameL,//货号
					warehouseCode:this.warehouseCodeL//仓库编码
				}).then((res)=>{
					let data = res.data;
                    this.dataList = data.rows
                    this.pageSize = data.pageSize;
					this.total = data.total;
					this.psisshow=true
                })
			},//高级查询取消
			cancelSearchLocation(){
				this.supplierNameL=''//供应商
				this.warehouseL=''//仓库
				this.skuCodeL=''//货号
				this.skuNameL=''//货号
				this.psisshow=false
			},
			 //切换一条页
			
            getData(current){
                this.axios.get('/inventory/query?offset='+current+'&uid='+this.uid).then((res)=>{
              		if(res.data.status==200){
              			let data = res.data;
              			this.dataList = data.rows
                    	this.pageSize = data.pageSize;
						this.total = data.total;
              		}
                    
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
                this.axios.get('/inventory/query?length='+size+'&uid='+this.uid).then((res)=>{
              		if(res.data.status==200){
              			let data = res.data;
              			this.dataList = data.rows
                    	this.pageSize = data.pageSize;
						this.total = data.total;
              		}
                    
                })
            },
            //查询库存
            topSearchSku(){
            	this.axios.get('inventory/query?keyword='+this.skukeyword+'&uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			let data = res.data;
            			this.dataList = data.rows
						this.pageSize = data.pageSize;
						this.total = data.total;
            		}
            	})
            },
            enterSearch(){
            	this.topSearchSku()
            },
		},
		mounted(){
			this.getAllList()
		},
	}
</script>
<style scoped>
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
		width: 100%;
		padding:0 10px;
		margin-bottom: 60px;
		background: #fff
	}

	.page-box {
		text-align: center;
		margin-top:5px;
		margin-bottom:120px;
	}
	.searchsku{
		cursor:pointer;
	}
</style>


