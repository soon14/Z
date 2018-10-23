<template>
	<div>
		<div class='main'>
            <div class='hothead'>
			<div class='hothead-left'>
				
				<span style="display:inline-block;width:80px;margin-left:20px;font-weight:900">投诉与建议</span>
                 <Select style="width:100px;margin-top:10px" v-model='value' @on-change="orderselected">
                    <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.title }}</Option>
                </Select>
               
			</div>
			<div class='hothead-right'>
                 
			</div>
		</div>
		<div style='height:50px'></div>
		<!--投诉-->
			<div class='ygewm' v-if='v==0'>
        		<Table  border   highlight-row :columns="dataListKey" :data="dataList" @on-row-dblclick="clickgoodsrow">
				</Table>
        		<!--底部的分页-->
				<div class="page-box" v-if='total!=0'>
					 <Page :total="total" show-total  :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
				</div>
        	</div>
        	<!--建议-->
        	<div class='ygewm' v-if='v==1'>
        		<Table  border   highlight-row :columns="dataListKey1" :data="dataList1" @on-row-dblclick="clickgoodsrow1">
				</Table>
        		<!--底部的分页-->
				<div class="page-box" v-if='total1!=0'>
					 <Page :total="total1" show-total  :pageSize='pageSize'  @on-change="getData1" @on-page-size-change="changePageSize1"></Page>
				</div>
        	</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			v:0,//下拉选中保存在v
			value:0,//默认显示投诉
			orderListname:[

				{
					title:'投诉',
					value:0
				},
				{
					title:'建议',
					value:1
				}
			],
			uid: this.$store.state.common.token,
			total:0,
			pageSize:0,
			dataList:[],
			dataListKey:[
				{
					title:'图片',
					key:'pics',
					width:80,
					render:(h, params) =>{
	                  return h('div',[
	                      h('img',{
	                        attrs:{
	                          src:params.row.pics
	                        },
	                        style:{
	                          width:'40px',
	                          height:'40px'
	                        }
	                      })
	                    ])
	                }
				},
				{
					title:"投诉名称",
					ellipsis:true,
					key:'name'
				},
				{
					title:"投诉内容",
					ellipsis:true,
					key:'remark'
				},
				{
					title:"提交人编号",
					ellipsis:true,
					key:'submitterCode'
				},
				{
					title:"提交人",
					ellipsis:true,
					key:'submitter'
				},
				{
					title:"手机或电话",
					ellipsis:true,
					key:'submitterTel'
				},
				{
					title:"提交时间",
					ellipsis:true,
					key:'createTime'
				},
			],
			//建议
			total1:0,
			pageSize1:0,
			dataList1:[],
			dataListKey1:[
				{
					title:'图片',
					key:'pics',
					width:80,
					render:(h, params) =>{
	                  return h('div',[
	                      h('img',{
	                        attrs:{
	                          src:params.row.pics
	                        },
	                        style:{
	                          width:'40px',
	                          height:'40px'
	                        }
	                      })
	                    ])
	                }
				},
				{
					title:"建议名称",
					ellipsis:true,
					key:'name'
				},
				{
					title:"建议内容",
					ellipsis:true,
					key:'remark'
				},
				{
					title:"提交人编号",
					ellipsis:true,
					key:'submitterCode'
				},
				{
					title:"提交人",
					ellipsis:true,
					key:'submitter'
				},
				{
					title:"手机或电话",
					ellipsis:true,
					key:'submitterTel'
				},
				{
					title:"提交时间",
					ellipsis:true,
					key:'createTime'
				},
			],
			vaLid:'',//id
			vaLid1:'',//id建议

		}
	},
	methods:{
		//投诉列表
		getdataList(){
			this.axios.get('complain/query?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.dataList=res.data.rows
					this.total=res.data.total
					this.pageSize=res.data.pageSize
					this.dataList.forEach((x,index)=>{
			 				
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
				}else{
					// this.$Notice.error({
					// 	title:"",//
					// 	desc: res.data.errorMessage
					// });
				}
			})
		},
		//投诉列表
		jy(){
			this.axios.get('opad/query?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.dataList1=res.data.rows
					this.total1=res.data.total
					this.pageSize1=res.data.pageSize
					this.dataList1.forEach((x,index)=>{
			 				
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
				}
			})
		},
		//下拉选中
		orderselected(v){
			this.v=v
			if(v==0){
				this.getdataList()
			}
			if(v==1){
				this.jy()
			}
		},
		//双击莫一行
		clickgoodsrow(data,index){
			this.vaLid=data.id
			this.$router.push({
				path:'/conplainInfo',
				query:{
					index:index,
					id:data.id
				}
			})
		},
		getData(current){
    	 this.axios.get('complain/query?offset='+current+'&uid='+this.uid).then((res)=>{
    	 		this.dataList = res.data.rows
				this.total=res.data.total
				this.pageSize=res.data.pageSize
    	 })
        },
        changePageSize(size){
        	this.pageSize=size
        },
        //建议
        //双击莫一行
		clickgoodsrow1(data,index){
			this.vaLid1=data.id
			this.$router.push({
				path:'/conplainInfo1',
				query:{
					index:index,
					id:data.id
				}
			})
		},
        getData1(current){
    	 this.axios.get('opad/query?offset='+current+'&uid='+this.uid).then((res)=>{
    	 		this.dataList1 = res.data.rows
				this.total1=res.data.total
				this.pageSize1=res.data.pageSize
    	 })
        },
        changePageSize1(size){
        	this.pageSize1=size
        },
	},
	mounted(){
		this.getdataList()
	}
}

</script>
<style type="text/css" scoped>
.main{
	width:100%;
	height:100%;
}
.hothead{
	position:fixed;
	background: #fff;
	z-index:9;
	width:100%;
	height:50px;
	display:flex;
	justify-content: space-between;;
	line-height: 50px;
	border-bottom:1px solid #e4e4e4;
}
.hothead-left{
	display:flex;
}
.hothead-right{
	margin-right: 15%;
}
.ygewm{
	margin:10px 10px 120px 10px;
}
.page-box{
	text-align: center;
	margin-top:10px;
	margin-bottom:120px;
}
</style>