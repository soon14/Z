<template>
	<!--渠道库存-->
	<div class='kc'>
		<div class="btns-box">
			<!--渠道库存查询-->
			<div style='display:flex'>
				<span  style='height:50px;font-size:14px;font-weight:900;line-height:50px'>
					<div style='margin:0 10px;'>渠道库存</div>	
				</span>
				<Input v-model='skukeyword' style='width:300px;margin-top:10px;' 
				:placeholder="$t('public.codeandname')" @on-enter="enterSearch"><span slot="append" @click='topSearchSku' class='searchsku'>{{$t('public.search')}}</span></Input>
			</div>
			<!-- <div style='margin-right:40px'>
				<Button shape="circle" type="ghost" style="background:#3b77e3;color:#fff;border:none">
                <span><Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>导出</span>
            	</Button>
			</div> -->
		</div>
		<div class="table">
			<Table border highlight-row :columns="columns" :data="dataList"  @on-select="selected" @on-row-dblclick="dbl" @on-row-click='clickRow'></Table>
			<!--底部的分页-->
			<div class="page-box" v-if='total!=0'>
				<Page :total="total" show-total size='small' show-sizer :page-size-opts="[10,20,30,40,50]" :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
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
					// {
					// 	type:"selection",
					// 	width:60,
					// 	flex:"left"
					// },
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
						key:"barcode"
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
			
			//获取所有库存
			getAllList(){
				this.axios.get('inventory/channel?uid='+this.uid).then((res)=>{
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
					path:'/addskuInventoryChannel',
					query:{
						id:row.skuId,
						index:index
					}
				})
			},
			 //切换一条页
            getData(current){
                this.axios.get('/inventory/channel?offset='+current+'&uid='+this.uid).then((res)=>{
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
                this.axios.get('/inventory/channel?length='+size+'&uid='+this.uid).then((res)=>{
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
            	this.axios.get('inventory/channel?keyword='+this.skukeyword+'&uid='+this.uid).then(res=>{
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



