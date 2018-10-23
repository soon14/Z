<template>
	<!--期初库存-->
	<div class="units-box">
		<!--顶部的按钮-->
		<div class="btns-box">
			<p class="wldw">
				<span style="width:42px;font-weight:900">库存明细：</span>
				 <Select style="width:100px"  placeholder="全部" @on-change="orderselected">
			        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
			    </Select>
			</p>
			<div class="right" style='margin-right:20px'>
				<Button type="primary" shape="circle" @click="gotoAdd">
					 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>新建
				</Button>
				<!--更多-->
				<Dropdown trigger="click" style="margin-left: 4px">
                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
                    <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
                </Button>

                <DropdownMenu slot="list">
                    <span  @click="delcg"><DropdownItem >删除</DropdownItem></span>
                </DropdownMenu>
             </Dropdown>

			</div>
		</div>
		<!--表格数据-->
		<div class="table">
			<Table   border  ref="selection"  :columns="columns" :data="dataList" @on-row-dblclick="dbl" @on-select="selected"></Table>
			<!--底部的分页-->
			<div class="page-box">
				 <Page :total="total" show-total  :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				row:{},
				isLoading:true,
				visible: false,
				dataList: [],
				orderListname:[
					{
						label:"全部",
						value:0
					},
					
				],
				total: 0,
				pageSize: 0,
				valId:"",
				type:'',//下拉选中
				uid: this.$store.state.common.token,
				columns: [
					{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
                        title: '图片',
                        key:'skuPic',
                         width: 120,
                        align: 'center',
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
						title: '商品编码',
						ellipsis:true,
						key: 'skuCode'
					},
					{
						title: '商品名称',
						ellipsis:true,
						key: 'skuName'
					},
					{
						title: '数量',
						ellipsis:true,
						
						key: 'qty',

					},
					{
						title:"零售价",
						
						key:"price"
					},
					
					{
						title:"销售价",
						
						key:"costPrice"
					},
					{
						title:"批发价",
						
						key:"wholePrice"
					},
					
					{
						title: '创建时间',
							ellipsis:true,
						key: 'createTime'
					},
					
					// {
					// 	title: '订单状态',
					// 		ellipsis:true,
					// 	key: 'statusDesc',
					// 	render:(h,params)=>{
					// 		return h('div',{
					// 			style:{
					// 				color:params.row.statusDesc=='未审核'?'#5789E6':params.row.statusDesc=='已审核'?'#278fa3':params.row.statusDesc=='签收完成'?'#278A8B':params.row.statusDesc=='已完成'?'blue':params.row.statusDesc=='已作废'?'red':''
					// 			}
					// 		},params.row.statusDesc)
					// 	}

					// },
					
				]

			}
		},
		methods: {
			
			//点击增加  跳转到 增加供货商页面
			gotoAdd: function() {
				this.$router.push({
					path: '/addadjust'
				});
			},
			//双击表格一行
			dbl(row,index){
				this.$router.push({
					path:'/addadjust',
					query:{
						id:row.id,
						index:index
					}
				})
			},
			
			//下拉框选择
			orderselected(value){
				this.value = value
				// this.axios.get('/po/query/'+value+'?uid=' + this.uid).then((res) => {
				// 	if(res.data.status == '200') {
					
				// 		let data = res.data
				// 		this.dataList = data.rows;
				// 		this.isLoading = false
				// 		this.dataList.forEach((x)=>{
				// 			x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							
							
				// 		})
						
				// 	} else {
				// 		this.$Notice.success({
				// 			title: '删除',
				// 			desc: res.data.errorMessage
				// 		});
						
				// 	}
				// })
			},
			//获取库存列表GET /adjust/query 库存
			getcgList: function() {
				this.axios.get('/adjust/query?uid=' + this.uid).then((res) => {
					let data = res.data;
					console.log(data.rows)
					if(res.data.status == '200') {
						this.dataList = data.rows;
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.dataList.forEach((x)=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
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
			//点击删除DELETE /adjust/delete/{id} 删除
			delcg: function() {
			
				this.axios.delete('adjust/delete/' + this.valId + '?uid=' + this.uid).then((res) => {

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
                this.axios.get('adjust/query?offset='+current+'&uid='+this.uid).then((res)=>{
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
		margin:0 10px;
	}

	.page-box {
		text-align: center;
		margin-top:2px;
	}
	
</style>
