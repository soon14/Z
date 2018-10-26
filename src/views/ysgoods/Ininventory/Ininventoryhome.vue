<template>
  <div id="investigate">
    <div class="investigate_head">
     <div>
        <!-- <span style="width:42px;font-weight:900">入库明细</span> -->
         <div style='display:flex;border-bottom:1px solid #e4e4e4'>
			<span  style='height:50px;font-size:14px;font-weight:900;line-height:50px'>
				<div style='margin:0 10px;'>入库明细</div>	
			</span>
			<Input style='margin-top:10px;width:300px' v-model='rkDkeyword' placeholder='请输入入库编号/商品条码' @on-enter='entersSearrhckD' >
            	<span slot="append"  @click='searchrkD' style='cursor:pointer'>搜索</span>
    		</Input>
		</div>
      </div>
      <div class="btn" style='margin-right:20px'>
      </div>
    </div>
    <!--表格数据-->
    <div class="table">
        	<Table  border  highlight-row :columns="columnsIn" :data="AlldataIn" ></Table>
         <!--底部的分页-->
	      <div class="page-box">
	         <Page :total="totalIn" show-sizer :page-size-opts="[10,20,30,40,50]" size='small' placement='top' show-total  :pageSize='pageSizeIn'  @on-change="getDataIn" @on-page-size-change="changePageSizeIn"></Page>
	      </div>
    </div>
  </div>
</template>
<script>
export default{
      	data(){
	        return {
	        	rkDkeyword:"",
		        pageSizeIn:0,
		        totalIn:0,
		        orderListname:[],
	          	columnsIn: [
	          		{
		              	title: '入库时间',
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
		              	title: '入库价格',
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
	         	AlldataIn: [],
	          	uid: this.$store.state.common.token,
	        }
      	},
      	methods: {
	      	//获取出库明细GET /inbound/query 入库明细

	      	getAllIn(){
	      		this.axios.get('/inbound/query?uid='+this.uid).then(res=>{
	      			if(res.data.status==200){
	      				let data=res.data
	      				this.AlldataIn=data.rows
	      				this.totalIn=data.total
	      				this.pageSizeIn=data.pageSize
	      				this.AlldataIn.forEach(x=>{
	      					x.createTime=this.getLocalTimeH(x.createTime)
	      				})
	      			}
	      		})
		   	},
		   	searchrkD(){
		   		this.axios.get('/inbound/query?keyword='+this.rkDkeyword+'&uid='+this.uid).then(res=>{
	      			if(res.data.status==200){
	      				let data=res.data
	      				this.AlldataIn=data.rows
	      				this.totalIn=data.total
	      				this.pageSizeIn=data.pageSize
	      				this.AlldataIn.forEach(x=>{
	      					x.createTime=this.getLocalTimeH(x.createTime)
	      				})
	      			}
	      		})
		   	},
		   	entersSearrhckD(){
		   		this.searchrkD()
		   	},
		   	//翻页
		   	getDataIn(current){
		   		this.axios.get('/inbound/query?offset='+current+'&uid='+this.uid).then(res=>{
	      			if(res.data.status==200){
	      				let data=res.data
	      				this.AlldataIn=data.rows
	      				this.totalIn=data.total
	      				this.pageSizeIn=data.pageSize
	      				this.AlldataIn.forEach(x=>{
	      					x.createTime=this.getLocalTimeH(x.createTime)
	      				})
	      			}
	      		})
		   	},
		   	changePageSizeIn(size){
		  
		   		this.axios.get('/inbound/query?length='+size+'&uid='+this.uid).then(res=>{
	      			if(res.data.status==200){
	      				let data=res.data
	      				this.AlldataIn=data.rows
	      				this.totalIn=data.total
	      				this.pageSizeIn=data.pageSize
	      				this.AlldataIn.forEach(x=>{
	      					x.createTime=this.getLocalTimeH(x.createTime)
	      				})
	      			}
	      		})
		   	},
	    },
	    created(){
	    	this.$nextTick(()=>{
	    		this.getAllIn()
	    	})
	    },
	    mounted(){
	      	
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
