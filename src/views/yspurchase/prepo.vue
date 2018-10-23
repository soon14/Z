<template>
	<!--采购预测-->
	<div class="units-box">
		
		<!--顶部的按钮-->
		<div class="btns-box">
			<div class="wldw">
			
				<span style="width:10px;font-weight:900;width:60px;">采购订单：</span>
				 <Select style="width:100px;margin-top:15px;margin-right:20px"  placeholder="全部" @on-change="orderselected">
			        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
			    </Select>

			    <div style='margin-right:20px;display:flex'>
	                <Input style='margin-top:15px;width:300px' v-model='searchKeyword' placeholder='请输入编码或名称' @on-enter='enterSearch'>
	                <span slot="append"  @click='search' style='cursor:pointer;'>搜索</span>
	                </Input>
	                 <a style='font-size:14px;font-weight:600;margin-left:20px;border-bottom:1px solid #3b77e3;height:40px' @click='searchLocation'>精准搜索</a>
            	</div>
			</div>
			
			<div class="right" >
				<!-- <Button type="primary" style='background:#3b77e3' shape="circle" @click="gotoAdd">
					 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>新建
				</Button> -->
				
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
			<Table border highlight-row ref="selection"  :columns="columns" :data="dataList" @on-row-dblclick="dbl" @on-select="selected" @on-row-click='clickRow'></Table>
			<!--底部的分页-->
			<div class="page-box">
				 <Page :total="total" show-total  :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
			</div>
		</div>
		<!--精准搜索-->
    <Modal v-model="psisshow" width="420px">
    <p slot="header" style="height:30px;line-height:30px;text-align:center">
      
      <span>精准搜索</span>
    </p>
     <Form :label-width="100">
    
        <FormItem label="采购单号：" >
           <Input v-model='reNo' ></Input>
        </FormItem>
        <FormItem label="供应商名称：" >
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
				orderListname:[
					{
						label:"全部",
						value:0
					},
					{
						label:"未审核",
						value:1
					},
					{
						label:"未签收",
						value:3
					},
					{
						label:"进货单",
						value:5
					},
					{
						label:"退货单",
						value:7
					},
					{
						label:"已签收",
						value:9
					}
				],
				total: 0,
				pageSize:0,
				valId:"",
				type:'',//下拉选中
				uid: this.$store.state.common.token,
				columns: [
					{
						type: 'selection',
						width: 60,
						align: 'center',
						
					},
					
					{
						title: '编码',
						ellipsis:true,
						width:140,
						
						align: 'center',
						key: 'recordNo',
						render: function (h, params) {
                        return h('div', [
                          h('span', {
                            style: {
                              marginRight: '8px'
                            },
                          }, params.row.recordNo),
                          //有无附件提示框
                          h('Tooltip',{
                            props:{
                                content:"有附件",
                                placement:"right-start"
                            }
                          },[//附件图标
                            h('img', {
                                domProps: {
                                    src: params.row.attachs?'http://img.zsydian.com/icon/gys_file.png':'',
                                    style: "cursor:pointer;vertical-align:middle;width:10px;height:10px"
                                }
                              }),
                          ])
                        ]);
                      }
					},
					{
						title: '商品',
						ellipsis:true,
						
						key: 'skuName'
					},
					{
						title: '供应商',
						ellipsis:true,
						
						key: 'partnerName'
					},
					
					{
						title:"数量",
						ellipsis:true,
						align:'center',
						key:"qty",
						width:120
					},
					{
						title: '金额',
						ellipsis:true,
						align:'center',
						key: 'totalAmount',
						width:120
					},
					
					{
						title: '类型',
						ellipsis:true,
						align:'center',
						key: 'type',
						width:80
					},
					
					{
						title: '采购时间',
						ellipsis:true,
						align:'center',
						key: 'poDate',
						
					},
					{
						title: '收货人',
						ellipsis:true,
						align:'center',
						key: 'deliverName',
						width:80
					},
					{
						title: '收货人手机',
						ellipsis:true,
						align:'center',
						key: 'deliverMobile',
						width:120
					},
					
					{
						title: '收货人地址',
						ellipsis:true,
						align:'center',
						key: 'deliverAddress',
						width:170
					},
					{
						title: '状态',
						ellipsis:true,
						align:'center',
						width:80,
						key: 'statusDesc',
						render:(h,params)=>{
							return h('div',{
								style:{
									fontWeight:'900',
									color:params.row.statusDesc=='待审核'?'#5789E6':params.row.statusDesc=='已审核'?'#278fa3':params.row.statusDesc=='已完成'?'#40ca98':params.row.statusDesc=='已签收'?'#40ca98':params.row.statusDesc=='已作废'?'#ff0000':params.row.statusDesc=='签收中'?'#3b77e3':''
								}
							},params.row.statusDesc)
						}

					},
					
				]

			}
		},
		methods: {
			
			//点击增加  跳转到 增加供货商页面
			gotoAdd: function() {
				this.$router.push({
					path:"/addprepo"
				});
			},
			//双击表格一行
			dbl(row,index){

				this.isLoading = true
				this.$router.push({
					path:'/addprepo',
					query:{
						id:row.id,
						index:index
					}
				})
			},
			
			//下拉框选择
			orderselected(value){
				this.value = value
				this.axios.get('/prepo/query/'+value+'?uid=' + this.uid).then((res) => {
					if(res.data.status == '200') {
					
						let data = res.data
						this.dataList = data.rows;
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.isLoading = false
						this.dataList.forEach((x)=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							switch(x.status){
								
							}
							
						})
						
					} else {
						this.$notify({
					        title:"",//
					        message:res.data.errorMessage,
					        type: 'error',
					        position: 'bottom-right'
				        });
						
					}
				})
			},
			//获取采购预测列表
			getcgList: function() {
				this.axios.get('/prepo/query?uid=' + this.uid).then((res) => {
					let data = res.data;
					console.log(data.rows)
					if(res.data.status == '200') {
						this.dataList = data.rows;
						this.total=res.data.total
						this.pageSize=res.data.pageSize
						this.dataList.forEach((x)=>{
							switch(x.status){
								
							}
						x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						// x.poDate=new Date(x.poDate).toLocaleDateString().replace(/\//g,'-')
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
			//表格选中时的数据，数组
			selected(selection,row){
				this.valId = row.id
				this.row = row
			},
			//单击某一行
			clickRow(data){
				this.valId = data.id
				console.log(data)
			},
			//点击删除
			delcg: function() {
				if(this.valId==''){
                    this.$notify({
				        title:"",//
				        message: '请选择采购订单',
				        type: 'error',
				        position: 'bottom-right'
			        });
                }else{
                	this.axios.delete('prepo/delete/' + this.valId + '?uid=' + this.uid).then((res) => {

						if(res.data.status == '200') {

							this.$notify({
						        title:"",//
						        message: this.$t('public.deleteSuccess'),//
						        type: 'error',
						        position: 'bottom-right'
					        });
	                      this.getcgList();
						}else{
							this.$Message.error(res.data.errorMessage);
						}
					})
                }
				
			},
			 //点击搜索
            search(){
                this.axios.get('/prepo/query?keyword='+this.searchKeyword+'&uid=' + this.uid).then((res) => {
                    if(res.data.status==200){
                        let data = res.data;
                        this.dataList = data.rows;
                        this.pageSize = data.pageSize;
                        this.total = data.total;
                        this.dataList.forEach((item,index)=>{
                            item.Raddress=item.province+item.city
                            item.ContentAddress=item.province+item.city
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
               this.axios.get('/prepo/query/0'+'?uid=' + this.uid,{
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
                this.axios.get('/prepo/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    //console.log(res)
                    this.dataList = res.data.rows
                    this.dataList.forEach((x,index)=>{

							switch(x.status){
								case 77:
									x.statusDesc='签收完成'
								break;
								case 1:
									x.statusDesc='未审核'
								break;
								case 15:
									x.statusDesc='已审核'
								break;
								case 88:
									x.statusDesc='已完成'
								break;
								case 19:
									x.statusDesc='已作废'
								break;
							}
						
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
		height: 60px;
		display:flex;
		justify-content: space-between;
		
		line-height: 60px;
	}
	 .wldw{
    	margin-left:10px;
    	display: flex;
    	height:60px;
    	line-height: 60px
    }
	.right{
		margin-right:10px;
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
		margin:0 10px 100px 10px;
	}

	.page-box {
		text-align: center;
		margin-top:2px;
		margin-bottom:120px;
	}
	
</style>
