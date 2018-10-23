<template>
	<!--商品报表-->
	<div class="units-box">
		<div style='display:flex;height:100%'>
			<Tabs :animated="false"  style="background:#fff;width:100%;height:100%" @on-click="getfhlistbg">
		        <TabPane label="库存日志">
					<div class="table">
						<div style='margin:0 10px'>
							<Table border   ref="selection"  :columns="columns" :data="dataList" ></Table>
							<!--底部的分页-->
							<div class="page-box">
								 <Page :total="total" show-total size="small" :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <!-- <TabPane label="标签二">

					<div class="table">
						<div >
							<Table border   ref="selection"  :columns="qkcolumns" :data="qkdataList" ></Table>
							<div class="page-box">
								 <Page :total="qktotal" show-total size="small" :pageSize='qkpageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane> -->
		    </Tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				qktotal:0,//客户欠款
				qkpageSize:0,
				qkdataList:[],
				qkcolumns:[],
				//客户欠款
				fhindex:0,
				row:{},
				isLoading:true,
				visible: false,
				dataList: [], //客户对账单列表
				
				total: 0,
				pageSize: 0,
				valId:"",
				type:'',//下拉选中
				uid: this.$store.state.common.token,
				columns: [
					
					
					{
						title: this.$t('data.sku.orderNo'),//'单号',
						ellipsis:true,
						key: 'recordNo'
					},
					
					{
						title: this.$t('data.sku.skuname'),//'商品名称',

						ellipsis:true,
						key: 'skuName'
					},
					
					{
						title:this.$t('data.sku.price'),//"零售价",
						
						ellipsis:true,
						key:"price"
					},
					{
						title: this.$t('data.sku.num'),//'数量',
						
							ellipsis:true,
						key: 'qty'
					},
					
					
					{
						title:this.$t('data.sku.type'),// '类型',
							ellipsis:true,
						key: 'typeDesc'
					},
					{
						title: this.$t('data.sku.time'),// '时间',
							ellipsis:true,
						key: 'createTime'
					},
					// {
					// 	title: '订单状态',
					// 		ellipsis:true,
						
					// 	key: 'ststusDesc',
					// 	render:(h,params)=>{
					// 		return h('div',{
					// 			style:{
					// 				color:params.row.ststusDesc=='未审核'?'#5789E6':params.row.ststusDesc=='已审核'?'#278fa3':params.row.ststusDesc=='签收完成'?'#278A8B':params.row.ststusDesc=='已完成'?'blue':params.row.ststusDesc=='已作废'?'red':''
					// 			}
					// 		},params.row.ststusDesc)
					// 	}

					// },
					
				]

			}
		},
		methods: {
			//切换
			getfhlistbg(index){
				this.fhindex=index
				if(this.flindex==0){
					this.getcgList()//客户对账单
				}
				if(this.fhindex==1){
					//打包
					// this.axios.get('so/package/'+this.id+'?uid='+this.uid).then(res=>{
					// 	if(res.data.status==200){

					// 	}
					// })
				}
			},
			
			
			//获取库存日志
			getcgList() {
				this.axios.get('/bpbb/log?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.dataList = res.data.rows
	                    this.total=res.data.total
	                    this.pageSize=res.data.pageSize
	                    this.dataList.forEach(x=>{
	                    	x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
	                    })
					}
				})
			},
			//表格选中时的数据，数组
			selected(selection,row){
				this.valId = row.id
				this.row = row
			},
			 //切换一条页
            getData(current){
                this.axios.get('/bpbb/log?offset='+current+'&uid='+this.uid).then((res)=>{
                    ////console.log(res)
                    this.dataList = res.data.rows
                    this.total=res.data.total
                    this.pageSize=res.data.pageSize
                    this.dataList.forEach(x=>{
	                    	x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
	                    })
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
            }
		},
		mounted() {
			this.getcgList();

		}
	}
</script>

<style lang="css" scoped>
p.edit:hover{
	color:blue;
}
	.units-box {
		width: 100%;
		height:100%;
		background: rgb(230,233,236)
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
    	margin-left:15px;
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
	}
	.bor{
		background: #EBF1FC
	}
	.page-box {
		text-align: center;
		margin-top:2px;
		 margin-bottom:120px;
	}
	
	
</style>
