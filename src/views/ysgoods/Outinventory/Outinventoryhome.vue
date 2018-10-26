<template>
  <div id="investigate">
    <div class="investigate_head">
     <div>
       <div style='display:flex;border-bottom:1px solid #e4e4e4'>
			<span  style='height:50px;font-size:14px;font-weight:900;line-height:50px'>
				<div style='margin:0 10px;'>出库明细</div>	
			</span>
			<Input style='margin-top:10px;width:400px' v-model='ckDkeyword' placeholder='请输入入库编号/商品条码' @on-enter='entersSearrhckD' >
            	<span slot="append"  @click='searchckD' style='cursor:pointer'>搜索</span>
    		</Input>
		</div>
      </div>
      <div class="btn" style='margin-right:20px'>
      </div>
    </div>
    <!--表格数据-->
    <div class="table">
        <Table  border  highlight-row :columns="columnsOut" :data="AlldataOut" ></Table>
         <!--底部的分页-->
      <div class="page-box">
         <Page :total="totalOut" show-sizer :page-size-opts="[10,20,30,40,50]" size='small' placement='top' show-total  :pageSize='pageSizeOut'  @on-change="getDataOut" @on-page-size-change="changePageSizeOut"></Page>
      </div>
    </div>
  </div>
</template>
<script>
export default{
      	data(){
	        return {
	        	ckDkeyword:"",
		        pageSizeOut:0,
		        totalOut:0,
		        orderListname:[],
	          	columnsOut: [
	          		{
		              	title: '出库时间',
		              	key: 'createTime',
		            },
		            {
	          			title:"单号",
	          			key:"recordNo"
	          		},
		            {
		              	title: '条码',
		              	key: 'barcode'
		            },
		            {
			            title: '货号',
			            key: 'skuCode',
			            align: 'center'
		            },
		            {
		              	title: '商品',
		              	key: 'skuName',
		            },
		            
		            {
		              	title: '数量',
		              	key: 'qty',
		              	render:(h,params)=>{
							return h('span',{
								style:{
									color:"#006600"
								}
							},params.row.qty)
						}
		            },
		            {
		              	title: '出库价格',
		              	key: 'price',
		              	render:(h,params)=>{
							return h('span',{
								style:{
									color:"#ff0000"
								}
							},params.row.price)
						}

		            },
		            {
		              	title: '单位',
		              	key: 'unit',
		            },
		            {
		              	title: '属性',
		              	key: 'skuSpec',
		            },
		            {
		              	title: '仓库',
		              	key: 'warehouseName',
		            },
		            
	          	],
	         	AlldataOut: [],
	          	uid: this.$store.state.common.token,
	        }
      	},
      	methods: {
	      	//GET /outbound/query 出库明细
	      	getAllOut(){
	      		this.axios.get('/outbound/query?uid='+this.uid).then(res=>{
	      			if(res.data.status==200){
	      				let data=res.data
	      				this.AlldataOut=data.rows
	      				this.totalOut=data.total
	      				this.pageSizeOut=data.pageSize
	      				this.AlldataOut.forEach(x=>{
	      					x.createTime=this.getLocalTimeH(x.createTime)
	      				})
	      			}
	      		})
		   	},
		   	searchckD(){
		   		this.axios.get('/outbound/query?keyword='+this.ckDkeyword+'&uid='+this.uid).then(res=>{
	      			if(res.data.status==200){
	      				let data=res.data
	      				this.AlldataOut=data.rows
	      				this.totalOut=data.total
	      				this.pageSizeOut=data.pageSize
	      				this.AlldataOut.forEach(x=>{
	      					x.createTime=this.getLocalTimeH(x.createTime)
	      				})
	      			}
	      		})
		   	},
		   	entersSearrhckD(){
		   		this.searchckD()
		   	},
		   	//翻页
		   	getDataOut(current){
		   		this.axios.get('/outbound/query?offset='+current+'&uid='+this.uid).then(res=>{
	      			if(res.data.status==200){
	      				let data=res.data
	      				this.AlldataOut=data.rows
	      				this.totalOut=data.total
	      				this.pageSizeOut=data.pageSize
	      				this.AlldataOut.forEach(x=>{
	      					x.createTime=this.getLocalTimeH(x.createTime)
	      				})
	      			}
	      		})
		   	},
		   	changePageSizeOut(size){
		   		this.axios.get('/outbound/query?length='+size+'&uid='+this.uid).then(res=>{
	      			if(res.data.status==200){
	      				let data=res.data
	      				this.AlldataOut=data.rows
	      				this.totalOut=data.total
	      				this.pageSizeOut=data.pageSize
	      				this.AlldataOut.forEach(x=>{
	      					x.createTime=this.getLocalTimeH(x.createTime)
	      				})
	      			}
	      		})
		   	},
	    },
	    mounted(){
	      	this.getAllOut()
	    }

}
</script>
<style scoped>
.investigate_head{
	height:50px;
	line-height: 50px
}
.investigate_head>div{
	margin-left:10px;
}
.table{
	margin:0 10px;
}
.page-box{
	text-align: center;
	margin:5px 0 120px 0;
}
</style>
