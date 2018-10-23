<template>
	<!--发货-->
	<div class="units-box">
		<div style='width:100%;height: 100%;'>
		<!--顶部的按钮-->
			<div class="btns-box">
				<div class="wldw1">
					<!-- <span style="font-weight:900;">筛选：</span>
					 <Select style="width:100px;margin-top:10px;margin-right:20px"  placeholder="全部" @on-change="orderselected" v-model="v">
				        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
				    </Select> -->
				    <div style='margin-right:20px;display:flex'>
	                    <Input style='margin-top:10px;width:300px' v-model='searchKeyword' :placeholder="$t('public.orderornameandphone')">
	                    <span slot="append"  @click='search' style='cursor:pointer;'>搜索</span>
	                    </Input>
	                     <!-- <a style='font-size:14px;font-weight:600;margin-left:20px;border-bottom:1px solid #3b77e3;height:40px' @click='searchLocation'>精准搜索</a> -->
	           		 </div>
				</div>
				
				<div style='margin-right:10px;display:flex'>
					<div>
						<Button type="primary" style='background:#3b77e3;' shape="circle" @click="gotoAdd">
							 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>新建
						</Button>
						<Button type="primary"  shape="circle" @click="exportOrder"
						 style='background:#3b77e3;'>
							 <Icon type="document" style="margin-right:5px;color:#fff"></Icon>
							导出
						</Button>
						<Button type="primary" style='background:#3b77e3' shape="circle" @click="printOrder">
							 <Icon type="ios-folder-outline" style="margin-right:5px;color:#fff"></Icon>打印
						</Button>
					</div>
					<!-- <div>
						<Button type="primary"  shape="circle" @click="clickexeUrl" style='background:#3b77e3;margin-right:5px;'>
							 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>
							 <a :href="exeUrl" style='color:#fff;'>导出</a>
						</Button>
					</div> -->
					
					<div>
					<Dropdown trigger="click" style="margin-left: 6px">
				        <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
		        				<span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
		        			</Button>

				        <DropdownMenu slot="list">
				            <!-- <span @click="edit"><DropdownItem >修改</DropdownItem></span> -->
				            <span @click="delcg"><DropdownItem >删除</DropdownItem></span>
				        </DropdownMenu>
				    </Dropdown>
				    </div>
					
				</div>

			</div>
			<div style='height:3px;background: rgb(230,233,236)'></div>
			<div style='display:flex;height:100%;background: #fff;'>
				<div class='main-left'>
					<li class='flclass' v-for='(item,index) in fhlist' @click='getfhlistbg(index,item)' :class="{bor:index==fhindex}">
						<span>{{item.label}}</span>
					</li>
				</div>
				<div style='width:3px;background: rgb(230,233,236)'></div>
				<!--表格数据-->
				<div class="table">
					<div >
						<Table border  highlight-row :columns="columns" :data="dataList" @on-row-dblclick="dbl" @on-row-click='selected' @on-selection-change="changeSelect" ></Table>
						<!--底部的分页-->
						<div class="page-box">
							 <Page :total="total" size='small' show-total show-sizer placement='top' :page-size-opts="[10,20,30,40,50]" :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
						</div>
					</div>
				</div>
			</div>
		</div>
			<!--精准搜索-->
    <Modal v-model="psisshow" width="420px">
    <p slot="header" style="height:30px;line-height:30px;text-align:center">
      
      <span>精准搜索</span>
    </p>
     <Form :label-width="100">
    
        <FormItem label="销售单号：" >
           <Input v-model='reNo' ></Input>
        </FormItem>
        <FormItem label="客户名称：" >
           <Input v-model='supplierName' ></Input>
        </FormItem>
        <FormItem label="收货人" >
           <Input v-model='deliverName' ></Input>
        </FormItem>
        <FormItem label="单据日期">
			<DatePicker type="date" :value='poDate' placeholder="请选择时间" style="width:100%" @on-change="shdatepoDate"></DatePicker>
        </FormItem>
       <FormItem label="收货日期">
		<DatePicker type="date" :value='deliveryDate' placeholder="请选择时间" style="width:100%" @on-change="shdate"></DatePicker>
    	</FormItem>
    </Form>
    <div slot="footer">
      <div class='footer-mark'>
        <span><a style='color:#999;font-size:14px' @click='cancelSearchLocation'>取消</a></span>
        <span style='font-size:20px;width:1px;height:40px;background:#e4e4e4'></span>
        <span ><a style='color:#3B77E3;font-size:14px' @click='sureSearchLocation'>确认</a></span>
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
              	supplierName:'',//客户
             	deliveryDate:'',//收货日期
				deliverName:'',//收货人名称
				psisshow:false,//精准搜索
				exeUrl:"javascript:;",//导出地址
				searchKeyword:'',
				fhindex:0,
				row:{},
				isLoading:true,
				visible: false,
				// v:0,//下拉的项
				// orderListname:[
				// 	{
				// 		label:"全部",
				// 		value:0
				// 	},
				// 	{
				// 		label:"已提交",
				// 		value:1
				// 	},
				// 	{
				// 		label:"已审核",
				// 		value:2
				// 	},
					
				// ],
				dataList: [], //往来单位列表
				fhlistValue:0,//左侧列表值
				fhlist:[
					{
						label:"全部",
						value:0
					},
					{
						label:"待提交",
						value:1
					},
					{
						label:"已提交",
						value:3
					},
					{
						label:"打包中",
						value:5
					},
					{
						label:"已发货",
						value:8
					},
					{
						label:"已完成",
						value:88
					},
					
				],
				total: 0,
				pageSize: 0,
				valId:"",
				type:'',//下拉选中
				uid: this.$store.state.common.token,
				columns: [
					{
						type:"selection",
						width:60
					},
					{
						title: '单号',
						key: 'recordNo',
				
						// render: function (h, params) {
	     //                    return h('div', [
	     //                      h('span', {
	     //                        style: {
	     //                          marginRight: '1px'
	     //                        },
	     //                      }, params.row.recordNo),
	     //                      //有无附件提示框
	     //                      h('Tooltip',{
	     //                        props:{
	     //                            content:"有附件",
	     //                            placement:"right-start"
	     //                        }
	     //                      },[//附件图标
	     //                        h('img', {
	     //                            domProps: {
	     //                                src: params.row.attachs?'http://img.zsydian.com/icon/gys_file.png':'',
	     //                                style: "cursor:pointer;vertical-align:middle;width:10px;height:10px"
	     //                            }
	     //                          }),
	     //                      ])
	     //                    ]);
      //                 	}
					},
					{
						title: '单据日期',
					
						key: 'recordDate',
						align: 'center'
					},
					
					{
						title: '客户',
						align: 'center',
						
						key: 'partnerName'
					},
					{
						title: '收货人',
						
					
						key: 'deliverNameM',
						align: 'center'
					},
					
					{
						title: '到货日期',
				
						key: 'deliveryDate',
						align: 'center'
					},
					{
						title:"总数量",
						align: 'center',
			
						key:"totalQty"
					},
					{
						title:"物流公司",
					
						key:"logistics"
					},
					{
						title:"物流编号",
					
						key:"logisticsNo"
					},
					{
						title: '交货状态',
						
						align: 'center',
						width:100,
						key: 'deliveryStstusDesc',
						render:(h,params)=>{
							return h('div',{
								style:{
									
									color:params.row.deliveryStstus==1?'#3b77e3':params.row.deliveryStstus==3?'#d53c39':params.row.deliveryStstus==9?'#40ca98':params.row.deliveryStstus==2?'#3b77e3':params.row.deliveryStstus==0?"":""
								}
							},params.row.deliveryStstusDesc)
						}

					},
					{
						title: '状态',
						
						align: 'center',
						width:80,
						key: 'ststusDesc',
						render:(h,params)=>{
							return h('div',{
								style:{
									
									color:params.row.status==8?'#3b77e3':params.row.status==3?'#278fa3':params.row.status==99?'#d53c39':params.row.status==88?'#40ca98':params.row.status==1?'#3b77e3':params.row.status==5?'#278fa3':''
								}
							},params.row.ststusDesc)
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
			//点击增加  跳转到 
			gotoAdd() {
				this.$router.push({
					path: '/addsend'
				});
			},
			//双击表格一行
			dbl(row,index){
				this.$router.push({
					path:'/addsend',
					query:{
						id:row.id,
						index:index,
						s:row.status
					}
				})
			},
			getOrderStatus(n){
				this.axios.get('ship/query?uid=' + this.uid+'&status='+n).then((res) => {
						let data = res.data;
						//console.log(data.rows)
						if(res.data.status == '200') {
							this.dataList = data.rows;
							this.dataList.forEach((x)=>{
								let mobile=x.deliverMobile==undefined?"无":x.deliverMobile
								x.deliverNameM=x.deliverName+'('+x.deliverMobile+')'
								
								
								if(x.recordDate==undefined){
									x.recordDate='未指定'
								}else{
									x.recordDate=this.getLocalTime(x.recordDate)
								}
								if(x.deliveryDate==undefined){
									x.deliveryDate='未指定'
								}else{
									x.deliveryDate=this.getLocalTime(x.deliveryDate)
									
								}
							})
							this.pageSize = data.pageSize;
							this.total = data.total;
						} else {
							
							 this.$notify({
						        title:"",//
						        message: res.data.errorMessage,
						        type: 'error',
						        position: 'bottom-right'
					        });
						}
					})
			},
			//点击左侧列表
			getfhlistbg(index,item){
				console.log(item)
				this.fhlistValue=item.value
				this.fhindex=index
				if(this.fhindex==7){
					this.getSuccess(this.fhlistValue)
				}else{
					this.getOrderStatus(this.fhlistValue)
				}
			},
			//成功的订单
			getSuccess(v){
				this.axios.get('/ship/query?uid=' + this.uid+'&status=88').then((res) => {
					let data = res.data;
					if(res.data.status == '200') {
						this.dataList = data.rows;
						this.pageSize = data.pageSize;
						this.total = data.total;
						this.dataList.forEach((x)=>{
							let mobile=x.deliverMobile==undefined?"无":x.deliverMobile
								x.deliverNameM=x.deliverName+'('+x.deliverMobile+')'
							if(x.recordDate==undefined){
									x.recordDate='未指定'
								}else{
									x.recordDate=this.getLocalTime(x.recordDate)
								}
								if(x.deliveryDate==undefined){
									x.deliveryDate='未指定'
								}else{
									x.deliveryDate=this.getLocalTime(x.deliveryDate)
									
								}
						})
						
					}
				})
			},
			//模糊搜索
			search(){
				this.axios.get('/ship/query?keyword='+this.searchKeyword+'&uid=' + this.uid).then((res) => {
					if(res.data.status==200){
						this.dataList=res.data.rows
						this.pageSize = res.data.pageSize;
						this.total = res.data.total;
					}
				})	
			},
			//下拉框选择
			// orderselected(value){
			// 	this.v=value
			// 	this.axios.get('/ship/query?cl='+this.v+'&uid=' + this.uid).then((res) => {
			// 		if(res.data.status == '200') {
			// 			let data = res.data
			// 			this.dataList = data.rows;
			// 			this.pageSize = res.data.pageSize;
			// 			this.total = res.data.total;

			// 			this.dataList.forEach((x)=>{
			// 				let mobile=x.deliverMobile==undefined?"无":x.deliverMobile
			// 					x.deliverNameM=x.deliverName+'('+x.deliverMobile+')'
			// 				x.recordDate=new Date(x.recordDate).toLocaleDateString().replace(/\//g,'-')
			// 				x.deliveryDate=new Date(x.deliveryDate).toLocaleDateString().replace(/\//g,'-')
			// 				if(x.recordDate=='Invalid Date'){
			// 					x.recordDate='未指定'
			// 				}
			// 				if(x.deliveryDate=='Invalid Date'){
			// 					x.deliveryDate='未指定'
			// 				}
			// 			})
						
			// 		}
			// 	})
			// },
			//获取销售订单列表
			getcgList(v) {
				this.axios.get('/ship/query?uid=' + this.uid+'&status='+v).then((res) => {
					let data = res.data;
					if(res.data.status == '200') {
						this.dataList = data.rows;
						this.pageSize = data.pageSize;
						this.total = data.total;
						this.dataList.forEach((x)=>{
							let mobile=x.deliverMobile==undefined?"无":x.deliverMobile
								x.deliverNameM=x.deliverName+'('+x.deliverMobile+')'
							if(x.recordDate==undefined){
									x.recordDate='未指定'
								}else{
									x.recordDate=this.getLocalTime(x.recordDate)
								}
								if(x.deliveryDate==undefined){
									x.deliveryDate='未指定'
								}else{
									x.deliveryDate=this.getLocalTime(x.deliveryDate)
									
								}
						})
						
					}
				})
			},
			//表格选中时的数据，数组
			selected(row){
				console.log(row)
				this.valId = row.id
				this.orderStr = row.id
				this.row = row
				
			},
			//点击删除
			delcg() {
				this.axios.delete('ship/delete/' + this.orderStr + '?uid=' + this.uid).then((res) => {

					if(res.data.status == '200') {
						
						 this.$notify({
					       title:"",//
					        message: this.$t('public.deleteSuccess'),//
					        type: 'success',
					        position: 'bottom-right'
				        });
                      this.getcgList(this.v);
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
               this.axios.get('/ship/query/?uid=' + this.uid,{
                recordNo:this.reNo,//单号
                recordDate:this.poDate,//单据日期
                partnerName:this.supplierName,//客户
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
                this.axios.get('/ship/query?offset='+current+'&uid='+this.uid+'&status='+this.fhlistValue).then((res)=>{
                    ////console.log(res)
                    this.dataList = res.data.rows
                    this.dataList.forEach((x,index)=>{
                    	let mobile=x.deliverMobile==undefined?"无":x.deliverMobile
								x.deliverNameM=x.deliverName+'('+x.deliverMobile+')'
                		if(x.recordDate==undefined){
									x.recordDate='未指定'
								}else{
									x.recordDate=this.getLocalTime(x.recordDate)
								}
								if(x.deliveryDate==undefined){
									x.deliveryDate='未指定'
								}else{
									x.deliveryDate=this.getLocalTime(x.deliveryDate)
									
								}
					})
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
    //             this.axios.get('/ship/query?cl='+this.v+'&length='+this.pageSize+'&uid=' + this.uid).then((res) => {
				// 	let data = res.data;
				// 	if(res.data.status == '200') {
				// 		this.dataList = data.rows;
				// 		this.pageSize = data.pageSize;
				// 		this.total = data.total;
				// 		this.dataList.forEach((x)=>{
				// 			x.deliverNameM=x.deliverName+'('+x.deliverMobile+')'
				// 			x.recordDate=new Date(x.recordDate).toLocaleDateString().replace(/\//g,'-')
				// 			x.deliveryDate=new Date(x.deliveryDate).toLocaleDateString().replace(/\//g,'-')
				// 			if(x.recordDate=='Invalid Date'){
				// 				x.recordDate='未指定'
				// 			}
				// 			if(x.deliveryDate=='Invalid Date'){
				// 				x.deliveryDate='未指定'
				// 			}
				// 		})
						
				// 	} else {
				// 		 this.$notify({
				// 	        title:"",//
				// 	        message: res.data.errorMessage,
				// 	        type: 'error',
				// 	        position: 'bottom-right'
				//         });
				// 	}
				// })
            },
            	//导出GET /ship/export 导出
		 	exportOrder(){
				this.axios.get('ship/export?ids='+this.orderStr+'&uid='+this.uid).then(res=>{
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
						this.getcgList(this.fhlistValue);
					}
            	})
		 },
		 printOrder(){
		 	this.axios.get('ship/print?ids='+this.orderStr+'&uid='+this.uid).then(res=>{
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
						this.getcgList(this.fhlistValue);
					}
            	})
		 },
		},
		mounted() {
			console.log(sessionStorage.getItem('isselect'))
			if(this.$route.query.value){
				//待发货
				if(this.$route.query.value==5){
					this.fhlistValue=this.$route.query.value
					this.fhindex=3
					this.getOrderStatus(this.fhlistValue)
				}
				
			}else{
				this.getcgList(this.fhlistValue);
			}
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
		
		background: #F4F4F4;
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
    	margin-left:20px;
    }
    .wldw1{
   
      margin-left:10px;
      display: flex;
      height:50px;
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
	.main-left{
		width: 120px;
		margin-right: 3px;
		margin-top: 3px;
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
		margin:0 0px 15px 0px;
		background: #fff;
		height:100%;
		overflow-x: scroll;
	}
	.bor{
		background: #EBF1FC
	}
	.page-box {
		text-align: center;
		margin-top:10px;
		margin-bottom:120px;
	}
	
</style>

