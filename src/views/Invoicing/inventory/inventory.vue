<template>
	<!--库存-->
	<div class='kc'>
		<div class="btns-box">
			<p class="wldw">
				<span style="width:42px;font-weight:900">库存：</span>
				 <Select style="width:100px"  placeholder="全部">
			        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
			    </Select>
			</p>
			<div class="right" style='margin-right:20px'>
				<Button type="primary" style='background:#3b77e3' shape="circle" @click="gotoAdd">
					 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>新建
				</Button>

            <!-- 更多-->
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
			<Table border highlight-row ref="selection"  :columns="columns" :data="dataList" @on-row-dblclick="dbl" @on-select="selected"></Table>
			<!--底部的分页-->
			<div class="page-box">
				 <Page :total="total" show-total  :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
			</div>
		</div>
	</div>
</template>
<script>

	export default{

		data(){
			return{
				isLoading:true,
				valId:'',
				pageSize:1,
				total:1,
				orderListname:[
					{
						label:"全部",
						value:1
					},
					// {
					// 	label:"待审核",
					// 	value:2
					// },
					// {
					// 	label:"待签收",
					// 	value:3
					// },
					// {
					// 	label:"退审单",
					// 	value:4
					// }
				],
				columns:[
					{
						type:"selection",
						width:60,
						flex:"left"
					},
					{
	                	title:"商品图片",
	                	width:120,
	                	key:"skuPic",
	                	 render:(h, params) =>{
                        	return h('div',[
                        			h('img',{
                        				attrs:{
                        					src:params.row.skuPic
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
						title:"货号",
						width:140,
						ellipsis:true,
						key:"receiptKey"
					},
					// {
					// 	title:"条码",
					// 	ellipsis:true,
					// 	key:"barcode"
					// },
					{
						title:"商品名称",
						ellipsis:true,
						key:"skuName"
					},
					{
						title:"库存量",
						ellipsis:true,
						key:"qty"
					},
					{
						title:"编码",
						ellipsis:true,
						key:"skuCode"
					},
					
					
					{
						title:"货值",
						ellipsis:true,
						key:"costPrice"
					},
					
					{
						title:"属性1",
						ellipsis:true,
						key:"skuSpecId01"
					},
					{
						title:"属性2",
						ellipsis:true,
						key:"skuSpecId02"
					},
				],
				dataList:[],
				uid: this.$store.state.common.token,
			}
		},
		methods:{
			gotoAdd(){
				this.$router.push({
					path:'/addInventory'
				})
			},
			//获取所有库存
			getAllList(){
				this.axios.get('inventory/query?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						let data = res.data;
						console.log(res.data.rows)
						this.isLoading = false
						this.dataList = res.data.rows
						this.pageSize = data.pageSize;
						this.total = data.total;
					}else{
						this.$Notice.success({
			                title:"",//
			                desc: res.data.errorMessage
			              });
					}
				})
			},
			//表格选中时的数据，数组
			selected(selection,row){
				this.valId = row.id
			},
			//双击表格一行
			dbl(row,index){
				this.isLoading = true
				this.$router.push({
					path:'/addInventory',
					query:{
						id:row.id,
						index:index
					}
				})
			},
			//点击删除
			delcg: function() {
			
				this.axios.delete('inventory/delete/' + this.valId + '?uid=' + this.uid).then((res) => {

					if(res.data.status == '200') {

						this.$Notice.success({
							title: '删除',
							desc: '删除成功'
						});
                      this.getAllList();
					}else{
						 //this.$Message.error(res.data.errorMessage);
					}
				})
			},
			 //切换一条页
            getData(current){
                this.axios.get('/inventory/query?offset='+current+'&uid='+this.uid).then((res)=>{
              
                    this.dataList = res.data.rows
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
            }
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
		margin:0 10px;
		
	}

	.page-box {
		text-align: center;
		margin-top:5px;
	}
	
</style>


</style>
