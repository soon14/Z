<template>
	<div class="units-box">
		<div class='goods-right'>
			<Tabs :animated="false"  style="background:#fff;width:100%;height:100%" @on-click="addBg">
		        <TabPane label="积分商品">
				    <div class="btns-box">
						<div>
		                    <Input style='margin-top:10px;margin-left:10px;width:300px' v-model='keyword' placeholder='请输入关键词' @on-enter='entersSearchNewSku'>
					                    <span slot="append"  @click='searchNewSku' style='cursor:pointer'>搜索</span>
					        </Input>
						</div>
						<div class="right">
							<Button type="primary" style='background:#3b77e3' shape="circle" @click="goaddgoods">
									 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>添加
							</Button>
							<!--更多-->
							<Dropdown trigger="click" style="margin-left: 4px">
			                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
			                    	<span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
				                </Button>
				                <DropdownMenu slot="list">
				                    <span  @click="del"><DropdownItem >删除</DropdownItem></span>
				                  
				                </DropdownMenu>
				             </Dropdown>
			             	<span @click="cancelHome" style="cursor:pointer; margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
						</div>
					</div>
					<!--表格数据-->
					<div class="table">
						<Table border  ref="selection" highlight-row :columns="columns" :data="goodspre" @on-select="selected"  @on-row-click='gebg'></Table>
					</div>
					<!--底部的分页-->
					<div class="page-box" v-if='total>0'>
						<Page :total="total" show-total size='small' :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
					</div>
		        </TabPane>
		        <Button type="ghost" @click="cancelHome" size="small" slot="extra" style='margin-top:3px;margin-right:20px'>返回</Button>
		    </Tabs>
			
		</div>
		<!--秒杀侧栏-->
		<div class='addHot'>
    		<div class='addHot-head'>
    			<span>添加活动</span>
    			<div>
    				 <Button shape="circle" type="ghost" @click="save" style='margin-right:5px;border:none;background:#3b77e3;color:#fff'>
	                   <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>保存
	                </Button>
	                <Button shape="circle"  @click="cancelhot"  style="background:#999999;color:#fff;margin-right:10px;" ><Icon type="close" style="margin-right:5px;"></Icon>取消</Button>
    			</div>
    		</div>
    		<div style='margin:10px;border:1px solid #e4e4e4;background:#FCFCFC'>
    			<div class='searchInput'>
    				<span style='display:inline-block;width:60px'>选择商品</span>
    				<span @click='searchsku' >
    				<Input v-model='skuName' type="text" style="width:360px"></Input>
    				</span>
    			</div>
    			<div>
    				<RadioGroup v-model="msh" @on-change='mshchange'>
    					<div style='display:flex;margin-left:20px;margin-top:10px;margin-bottom:10px;line-height:35px'>
    						<span>兑换积分：</span>
    						<Radio label='自动换算每元'></Radio>
    						<Input v-model='integral' number style="width:90px" placeholder='积分'></Input><span>分</span>
    						<span style='margin-left:20px'><Radio label='自定义'></Radio> </span>
    						
    					</div>
    				</RadioGroup>
    			</div>
    			<div class='table1' v-if='msh=="自定义"'>
        			<Table  border  height='200' highlight-row :columns="attrDetailListkey" :data="attrDetailList">
					</Table>
				</div>
				<div>
    				<RadioGroup v-model="mspty" @on-change='msptychange'>
    					<div style='display:flex;margin-left:20px;margin-top:10px;margin-bottom:10px;line-height:35px'>
    						<span>上架数量：</span>
    						<Radio label='每规格'></Radio>
    						
    						<Input v-model='qty' number style="width:90px" placeholder='数量'></Input><span>件</span>
    						<span style='margin-left:20px'>
    							<Radio label='按规格定义'></Radio> 
    						</span>
    					</div>
    				</RadioGroup>
    			</div>
    			<div class='table1' v-if='mspty=="按规格定义"'>
        			<Table  border  height='200' highlight-row :columns="attrDetailListkey1" :data="attrDetailList">
					</Table>
				</div>
				<div>
    				<RadioGroup v-model="xg" @on-change='xgchange'>
    					<div style='display:flex;margin-left:20px;margin-top:10px;margin-bottom:10px;line-height:35px'>
    						<span>限购数量：</span>
    						<Radio label='每人限购'></Radio>
    						
    						<Input v-model='num' number style="width:90px" placeholder='限购数量'></Input>
    						<span style='margin-left:20px'><Radio label='不限购'></Radio> </span>
    					</div>
    				</RadioGroup>
    			</div>
    			<div>
    				<RadioGroup v-model="msdate">
    					<div style='display:flex;margin-left:20px;margin-top:10px;margin-bottom:10px;line-height:35px'>
    						<span>活动日期：</span>
    						<Radio label='开始日期'></Radio>
    						<DatePicker type="date" :options="optionsB" placement='top-start' :value='beginTime' @on-change="getStartDate" ></DatePicker>    						
    					</div>
    				</RadioGroup>
    			</div>
    			<div style='margin-left:105px;padding-bottom:25px;margin-bottom: 100px;'>
    				<span>截至日期</span>
    				<DatePicker type="date" :options="optionsB" placement='top-start'  :value='endTime' @on-change="getStopDate1" ></DatePicker>
    			</div>
    		</div>
    	</div>
    	    <!--选择商品-->
	<Modal v-model="goodsinshow" width="800px">
		<p slot="header" style="height:30px;line-height:30px">
			
			<span>商品搜索</span>
		</p>
		<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
			<Input   placeholder="单位编码、名称、助记码、单位电话、联系人、分管部门" style="padding:2px 0" v-model="goodskeyword" @on-enter='enterSearch'></Input>
			<span @click="searchInput">
			<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>
			</span>
		</div>
		<!--商品数据-->
		<div slot="footer" style='margin-top:-20px'>
			<div class="table">
				<Table  border  height='300' highlight-row :columns="goodskey" :data="goods" @on-row-click="clickgoodsrow">
				</Table>
				<div class="page-box1">
				 <Page :total="total1" show-total  :pageSize='pageSize1'  @on-change="getData1" @on-page-size-change="changePageSize1"></Page>
				</div>
           	</div>
			
			<div class='title' style='margin:0px'>
				<div style='color:#D15151;font-size:14px'>
						<!-- <Icon type="plus" style='margin-right:5px'></Icon>
					<span >添加商品</span> -->
					</div>
				<div>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="makegoods"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
				</div>
			</div>
		</div>
	</Modal>
	<div class='mark'></div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				optionsB:this.optionsB,
				keyword:'',//头部搜索关键字
				endTime:'',
				beginTime:'',
				
				msOpty:0,//秒杀件数
				msprice:0,//变得秒杀价
				goodspre:[],//首页显示表格数据
				msh:'自动换算每元',
				mspty:'每规格',
				xg:'每人限购',
				msdate:'开始日期',
				
				total1:0,
				pageSize1:0,
				goodskeyword:'',
	            goodsinshow:false,
	            goods:[],
	            selecObj:{},//选中商品一行的数据
	            goodskey:[
	                {
	                	title:"商品图片",
	                	width:100,
	                	key:"mainPhoto",
	                	 render:(h, params) =>{
	                    	return h('div',[
	                    			h('img',{
	                    				attrs:{
	                    					src:params.row.mainPhoto
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
	                	title:"商品名称",
	             		ellipsis:true,
	                	
	                    width:200,
	                	key:"skuName"
	                },
	                {
	                	title: '商品编码',
	                	key:'skuCode',
	               		width:160,
	                	
	                },
	              	{
	                	title: '吊牌价',
	                	key:'price',
						width:100,
	                	align: 'center'
	                },
	                {
	                	title: '成本价',
	                	key:'costPrice',
						width:100,
						align: 'center'
	                },
	                {
	                	title: '批发价',
	                	key:'wholePrice',
	                	width:100,
	                	align: 'center'
	                },
	                {
	                	title: '库存',
	                	key:'inventoryUp',
	                	width:100,
	                	
	                	align: 'center'
	                },
	                {
	                	title: '单位',
	                	key:'unit',
	                	width:100,
	                	
	                	align: 'center'
	                },
	                 {
	                title: '状态',
	                key:'statusDesc',
	                width:80,
	              
	              	render:(h,params)=>{
	                    return h('span',{
	                        style:{
	                            color:params.row.status==1?'#40ca98':'#d53c39'
	                        }
	                    },params.row.statusDesc)
	                }
	                
	            }
	            ],
	           
	            //秒杀数量
	            seleckey1:[
	            	{
	            		title:'商品名称',
	            		key:'skuName',
	            		ellipsis:true,
	            	},{
	            		title:"商品库存",
	            		key:'price'
	            	},{
	            		title:"上架件数",
	            		key:'msOpty',
	            		render:(h,params)=>{
	            			return h('Input',{
	            				props:{
	            					value:params.row.msOpty,
	            					number:true
	            				},
	            				on:{
	            					'on-blur':(e)=>{
	            						this.selecGoods[params.index].msOpty=Number(e.target.value)
	            						
	            					}
	            				}
	            			})
	            		}
	            	},
	            
	            ],
					current:1,
					height:'',
					flname2:'',
					flid:'',
					cgtypeisshow2:false,
					isLoading:true,
					numIndex:0,
					cgtypeisshow:false,
					isshow:false,
					isshow1:false,
					total:0,
					pageSize:0,
					visible1: false,
					visible2: false,
					orderListname:[
						{
							label:"全部",
							value:0
						},
					],
					columns: [
	                     {
	                        title: '商品编码',
	                        key:'barcode',
	                   		width:160,
	                    },
	                    {
	                        title: '商品名称',
	                        ellipsis:true,
	                        key:'skuName',
	                    },
	                    {
	                        title: '上架数量',
	                        key:'qty',
	                    },
	                    {
	                        title: '兑换积分',
	                        key:'integral',
	                    },
	                    {
	                        title: '限购数量',
	                        key:'num',
	                    },
	                   	 {
	                        title: '开始日期',
	                        key:'beginTime',
	                       
	                    },
	                    {
	                        title: '截止日期',
	                        key:'endTime',
	                    },
	                     {
	                        title: '状态',
	                        key:'statusDesc',
	                    }
	                
	                ],                				
					goods:[],
					dbinfo:{},
					uid:this.$store.state.common.token,
					valId:'',
					flname:"",
					Allfl:[
						{
							label:'积分商品',
							value:0
						}
					],
					integral:'',//兑换积分
	        		
					qty:0,//库存数量
					num:0,//限购数量 0：不限购 1:限购
					skuName:'',
					skuId:"",
					detailVos:[],
					attrDetailList:[],
					attrDetailListkey:[
						{
							title:"商品规格",
							key:"skuTypeDesc"
						},
						{
							title:"零售价",
							key:"price"
						},
						{
							title:"换算价",
							key:"integral",
							render:(h,params)=>{
	            			return h('Input',{
	            				props:{
	            					value:params.row.integral,
	            					number:true
	            				},
	            				on:{
	            					'on-blur':(e)=>{
	            						this.attrDetailList[params.index].integral=Number(e.target.value)
	            						
	            					}
	            				}
	            			})
	            		}
						}
					],
					//
					sjQty:0,//上架数量
					attrDetailList1:[],
					attrDetailListkey1:[
						{
							title:"商品规格",
							key:"skuTypeDesc"
						},
						{
							title:"库存",
							key:"qty"
						},
						{
							title:"上架数量",
							key:"qty",
							render:(h,params)=>{
	            			return h('Input',{
	            				props:{
	            					value:params.row.qty,
	            					number:true
	            				},
	            				on:{
	            					'on-blur':(e)=>{
	            						this.attrDetailList1[params.index].qty=Number(e.target.value)
	            						
	            					}
	            				}
	            			})
	            		}
						}
					],
				}
		},
		
		methods:{
			close: function() {
				this.visible1 = false;
				this.visible2 = false;
			},
			//增加商品
			goaddgoods(){
				$('.addHot').animate({right:"0px"});
				$('.mark').css('display','block')
			},
			//点击取消
			cancelhot(){
				$('.addHot').animate({right:"-500px"});
				$('.mark').css('display','none')
				this.skuId=''
				this.skuName=''
				this.attrDetailList=[]
				this.selecObj={}
			},
			//表格选中时的数据，数组
			selected(selection,row){
				this.valId = row.id
			},
			//单击某一行
			gebg(data){
				this.valId = data.id//获取id
			},
			//删除商品
			del(){
				if(this.valId==''){
						
						this.$notify({
	                        title:"",//
	                        message:this.$t('public.vaild.chooseOneData'),
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
					}else{
						this.$Modal.confirm({
							title: '删除商品',
							content: '<p>Are you sure ?</p>',
							onOk: () => {
								this.axios.delete('/jfsc/delete/'+this.valId+'?uid=' + this.uid).then((res) => {
									if(res.data.status == 200) {
										this.$notify({
						                        title:"",//
						                        message: this.$t('public.deleteSuccess'),//
						                        type: 'success',
						                        position: 'bottom-right'
						                    });
										this.getAllGoods()
									}
								})
							},
							onCancel: () => {
								
								this.$notify({
			                        title:"",//
			                        message: '取消删除成功',
			                        type: 'success',
			                        position: 'bottom-right'
			                    });
							
							}
						});
					}
				
			},
			//刷新
		      reload(){
		      	this.getAllGoods()
		      },
		      //停用
		      stop(){
		      	if(this.valId==''){
		      		
					this.$notify({
	                        title:"",//
	                        message:this.$t('public.vaild.chooseOneData'),
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
				}else{
					// this.axios.post('/sku/disabled/'+this.valId+'?uid='+this.uid).then((res)=>{
					// 	if(res.data.status==200){
					// 		this.getAllGoods()
					// 	}else{
					// 		this.$Notice.error({
					// 				title: 'error',
					// 				desc: res.data.errorMessage
					// 			});
					// 	}
		   //    		})
				}
		      	
		      },
		      //启用
		      start(){
		      	if(this.valId==''){
		      		this.$notify({
	                        title:"",//
	                        message:this.$t('public.vaild.chooseOneData'),
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
					
				}else{
					// this.axios.post('sku/enabled/'+this.valId+'?uid='+this.uid).then((res)=>{
					// 	if(res.data.status==200){
					// 		this.getAllGoods()
					// 	}else{
					// 		this.$Notice.error({
					// 			title: 'error',
					// 			desc: res.data.errorMessage
					// 		});
					// 	}
		   //    		})
				}
		      },
			
			//获取积分数据
			getAllGoods(){
				this.axios.get('/jfsc/query?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						this.goodspre=res.data.rows
						this.total = res.data.total
						this.pageSize = res.data.pageSize
						this.goodspre.forEach((x)=>{
							if(x.num==0){
								x.num='不限购'
							}
							if(x.qty==0){
								x.qty='不限制'
							}
						})
					}
					
				})
			},
			//切换一条页
            getData(current){
                this.axios.get('/jfsc/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    if(res.data.status==200){
						this.goodspre=res.data.rows
						this.total = res.data.total
						this.pageSize = res.data.pageSize
						this.goodspre.forEach((x)=>{
							if(x.num==0){
								x.num='不限购'
							}
							if(x.qty==0){
								x.qty='不限制'
							}
						})
					}
                })
                
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
            },
            //添加背景
            addBg(index){
            	this.numIndex=index
            },
          
            getData1(current){
	    	 this.axios.get('sku/query?offset='+current+'&uid='+this.uid).then((res)=>{
	    	 		this.goods = res.data.rows
					this.total1=res.data.total
					this.pageSize1=res.data.pageSize
	    	 })
	        },
	        changePageSize1(size){
	        	this.pageSize1=size
	        },
	        //搜索商品
			searchsku(){
				this.axios.get('/sku/query?uid='+this.uid).then((res)=>{
					this.goods= res.data.rows
					this.pageSize1 = res.data.pageSize
					this.total1 = res.data.total
				})
				this.goodsinshow = true;
			},
			//商品弹框点击一行获取数据
			clickgoodsrow(data){

				this.selecObj=data
				console.log(data)
			},

			getData1(current){
	    	 this.axios.get('sku/query?offset='+current+'&uid='+this.uid).then((res)=>{
	    	 		this.goods = res.data.rows
					this.total1=res.data.total
					this.pageSize1=res.data.pageSize
	    	 })
	        },
	        changePageSize1(size){
	        	this.pageSize1=size
	        },
	          //商品模糊搜索
	        searchInput(){
				this.axios.get('sku/query?keyword='+this.goodskeyword+'&uid='+this.uid).then((res)=>{
					////////console.log(res)
					if(res.data.status==200){
						this.goods = res.data.rows
						this.total1=res.data.total
						this.pageSize1=res.data.pageSize
					}
				})
			
	        },
	        //回车搜索商品
	       enterSearch(){
	       	this.searchInput()
	       },
	       //商品弹框取消
	       modelCancel(){
	       	this.goodsinshow = false;
	       },
		       //商品弹框确认
	       makegoods(){
	       	this.skuName=this.selecObj.skuName
	       	this.skuId=this.selecObj.id
	       	// this.selecGoods.push(arr)//push进选中的数组attrDetailList
	       	this.goodsinshow=false
	       	this.axios.get('sku/get/'+this.skuId+'?uid='+this.uid).then(res=>{
	       		if(res.data.status==200){
	       			console.log(res.data.rows)
	       			this.attrDetailList=res.data.rows.attrDetailList
	       			this.attrDetailList1=res.data.rows.attrDetailList
	       			this.attrDetailList1.forEach((x)=>{
	       				x.qty=this.sjQty
	       			})
	       			this.attrDetailList.forEach((x)=>{
	       				x.integral=this.msprice
	       			})
	       		}
	       	})
	       },
	       //保存
	       save(){
	       		if(this.skuId==''){
	       			this.$notify({
                        title:"",//
                        message:'请选择商品',
                        type: 'error',
                        position: 'bottom-right'
                    });
	       		}else{
	       			this.attrDetailList1.forEach((x)=>{
						this.qty+=x.qty
						
					})
		       		this.axios.post('jfsc/add?uid='+this.uid,{
		       			integral:this.integral,//兑换积分
		       			qty:this.qty,//上架数量
						num:this.num,//限购数量
						costPrice:this.selecObj.price,//原始价格
						barcode:this.selecObj.barcode,//条码
						mainPhoto:this.selecObj.mainPhoto,//商品图片
						produce:this.selecObj.produce,//产地
						skuCode:this.selecObj.skuCode,//货号
						skuId:this.selecObj.id,//ID
						skuName:this.selecObj.skuName,//商品名称
		        		detailVos:this.attrDetailList,//规格
		        		endTime:this.endTime,
						beginTime:this.beginTime,
		       		}).then(res=>{
		       			if(res.data.status==200){
			       			this.getAllGoods()
			       			$('.addHot').animate({right:"-500px"});
							$('.mark').css('display','none')
			       			this.integral=0,//秒杀价
			       			this.qty=0,//库存数量
			       			this.num=0,//限购数量
			       			this.endTime=''
							this.beginTime=''
							
							this.skuName='',
							this.skuId='',
							this.attrDetailList=[]
							this.attrDetailList1=[]
							this.selecObj={}
			       		}else{
			       			this.$notify({
		                        title:"",//
		                        message:res.data.errorMessage,
		                        type: 'error',
		                        position: 'bottom-right'
		                    });
		   				}
		       		})
	       		}
		      
	       },
	       //换算
	       mshchange(v){//this.selecObj.id
		       if(v=='自定义'){
		       		this.price=0
		       		// this.selecGoods.forEach((x,index)=>{
		       		// 	x.msprice=0
		       		// })
		       		
		       	}
	       },
	       //上架数量
	       msptychange(v){
       			if(v=='按规格定义'){
	       		}
	       },
	       //限购数量
	       xgchange(v){
	       		if(v=='不限购'){
		       		this.num=0//不限购
		       	}
	       },
	       //获取生效时间
			getStartDate(date){
				console.log(date)
				this.beginTime = date
			},
			//获取到期时间
			getStopDate1(date){
				this.endTime = date
			},
			//头部搜索
            searchNewSku(){
            	this.axios.get('/jfsc/query?keyword='+this.keyword+'&uid='+this.uid).then((res)=>{
            		if(res.data.status==200){
            			this.goodspre = res.data.rows
						this.total=res.data.total
						this.pageSize=res.data.pageSize
            		}
            	})
            },
            //头部回车搜索
            entersSearchNewSku(){
            	this.searchNewSku()
            },
          	//差号参会
				cancelHome(){
					this.$router.push('/operationhome')
				}, 
            //下拉框选择
            orderselected(value){
                // this.value = value
                // this.axios.get('/po/query/'+value+'?uid=' + this.uid).then((res) => {
                //     if(res.data.status == '200') {
                    
                //         let data = res.data
                //         this.dataList = data.rows;
                //         this.isLoading = false
                //        
                        
                //     } else {
                //         this.$Notice.success({
                //            title:"",//
                //             desc: res.data.errorMessage
                //         });
                        
                //     }
                // })
            },


		},
		 created(){
            	this.$nextTick(()=>{
					this.getAllGoods()
			})
        },
		mounted(){
			this.msh='自动换算每元'
			this.mspty='每规格'
	},
}
</script>
<style scoped>
	.units-box {
		width: 100%;
		height: 100%;
		background: rgb(230,233,236);
		display:flex;
		overflow: hidden;
	}
	
	.search-box {
		width: 300px;
		height: auto;
		position: fixed;
		top: 15px;
		left: 250px;
		z-index: 9999;
	}
	
	.search-box .add {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: #00a8ff;
		line-height: 28px;
		text-align: center;
		color: #fff;
		font-size: 22px;
		float: left;
		margin-right: 10px;
	}
	
	.btns-box {
		
		height: 50px;

		display:flex;
		justify-content: space-between;
		
		line-height: 50px;
		
		background: #fff;
	}
	 .wldw{
    	margin-left:10px;
    	width:300px;
    }
	.right{
		margin-right:20px;
		margin-bottom:10px;
	}
	
	.ivu-icon-chevron-down {
		font-size: 10px;
	}
	.flclass:last-child{
		margin-bottom:40px;
	}
	
	.btns img {
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}
	
	.table {
		margin:0 10px;
	}
	
	.page-box {
		text-align: center;
		margin-top:5px;
		margin-bottom:120px;
	}
	.page-box1 {
		text-align: left;
		margin-top:10px;
		
	}
	/***气泡提示样式设置***/
	
	.qp-con {
		width: 100%;
		height: 30px;
		color: #0d0d0d;
		font-size: 14px;
		line-height: 30px;
		padding:0 10px;
		cursor: pointer;
	}
	
	.qp-con img {
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}
	.goods-left{
		width: 120px;
		margin-right: 3px;
		flex: 0 0 120px;
		font-size: 14px;
		background: #fff;
	}
	.goods-right{
	
   	 	width: 100%;
   	 	background: #fff;
   	 	overflow: auto;
	}
	.left-top{
		height:50px;
		line-height: 50px;
		border-bottom:1px solid #F5F5F5;
		display: flex;
		justify-content: space-around;
	}
	.goods-left li{
		list-style: none;
		height:40px;
		line-height: 40px;
		width:100%;
	

	}
	.goods-left li span{
		
		margin-right:10px;
	}
	.bg{
		background: #EBF1FC
	}
	.addHot{
	position:fixed;
	z-index:99;
	height:100%;
	width:500px;
	right:-500px;
	top:48px;
	background: #fff;
	z-index:100;
	overflow-y: scroll;
	box-shadow: 0 0 20px #ccc
	/*border:1px solid red;*/
}
.addHot-head{
	width:100%;
	height:50px;
	line-height: 50px;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #e4e4e4;
	
	
}
.searchInput{
	width:100%;
	line-height: 35px;
	margin:20px;
	text-align: center;
	display: flex
}
.addHot-head span{
	font-size:14px;
	font-weight:600;
	margin-left:20px;
}
.table1{
	margin:10px;
}
.mark{
	position:fixed;
	display:none;
	width:100%;
	height:100%;
	background: #B2B2B2;
	opacity:0.4;
	z-index:10;
}
</style>
<style type="text/css">
	.ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }

</style>