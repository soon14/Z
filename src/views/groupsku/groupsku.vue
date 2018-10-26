<template>
	<div class="main">
		<div >
			<ul v-if="toggle" class="sku-top">
				<li>
					<Select style="width:100px;;margin-right:10px" v-model='valueT' placeholder="全部" @on-change="changeSkuStatus">
				        <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				    </Select>
			    </li>
			    <li>
			    	<Button type="primary"  shape="circle" style=';margin-right:5px;' @click="addSku">
						<Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>新建
					</Button>
					<ButtonGroup  shape="circle" style=';margin-right:5px;'>
				        <Button :type="btnlist"  size="small" @click="list">列表</Button>
				        <Button :type="btnsimple" size="small" @click="simple">精简</Button>
				    </ButtonGroup>
				    
			    </li>
		    </ul>
		    <ul v-if="!toggle" class="sku-top">
		    	<li>
		    		<Button  type="ghost" size="large" shape="circle" v-if="isselecAll" @click="sellectedAll">全选</Button>
		    	
			    	<Dropdown trigger="click">
	                    <Button size="large" shape="circle" type="ghost">{{$t('public.more')}}
	                        <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
	                    </Button>
	                    <DropdownMenu slot="list">
	    					<span @click="start"><DropdownItem >激活</DropdownItem></span>
	                      	<span @click="stop"><DropdownItem >停用</DropdownItem></span>
	    					<span  @click="del"><DropdownItem >删除</DropdownItem></span>
	                    </DropdownMenu>
	                </Dropdown>
                </li>
                <li>
                	<span>{{jshiArr.length}}个被选品目</span>
                	<span @click="close" style="cursor:pointer;margin-left:10px" ><Icon type="close" class="cha" ></Icon></span>
                </li>
		    </ul>
	    </div>
	    <!--列表-->
	    <div v-if='islist' class="islist">
	    	<Table  border ref="currentRowTable" highlight-row :columns="listkey" :data="listData" 
	    	@on-row-click="rowClick" 
	    	@on-select="checkedList"
	    	@on-select-cancel='cancelSelect'
	    	@on-select-all='checkedAll'
	    	@on-selection-change='allSelectAndCancel'
	    	></Table>
	    </div>
	    <!--精简-->
	    <div v-if='!islist' class="simple">
	    	<ul class="classMain classMain-goods">
				<li  v-for="(item,index) in listData" :key="index" class="li-goods" @mouseover="mouseoversku" @mouseleave='mouseleave'>
					<div class="img-s">
						<img src="http://img.zsydian.com/icon/logoin.png" class="sku-img">
					</div>
					<p>{{item.skuName}}</p>
					<p>SKU：{{item.skuCode}}</p>
					<p class="s-c-p">
						<mu-checkbox v-model="item._checked" @change="changecheckbox(item,$event)"></mu-checkbox>
					</p>
					<div class="sku-p">
						<p>销售价格：{{item.price}}</p>
						<p>成本价：{{item.costPrice}}</p>
					</div>
				</li>
				<div style="margin:5px 0" v-if="listData.length==0">
	                暂无商品
	            </div>
			</ul>
	    </div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				islist:true,//列表切换
				toggle:true,//头部切换
				isselecAll:false,
				cancelisselecAll:false,
				btnlist:"primary",
				btnsimple:"ghost",
				uid: this.$store.state.common.token,
				valueT:0,
				selectList:[
					{
						label:"所有商品组",
						value:0
					},
					{
						label:"激活",
						value:1
					},
					{
						label:"未激活",
						value:99
					},
				],
				//列表数据
				jshiArr:[],
				jshiArrStr:"",//id拼接
				listSkuId:"",//sku id
				total:0,
				pageSize:0,
				listData:[
					{
						skuName:"鞋子",
						id:1,
						_checked:false,
						skuCode:158485234234,
						price:558,
						costPrice:345
					},
					{
						skuName:"鞋子",
						id:1,
						_checked:false,
						skuCode:158485234234,
						price:558,
						costPrice:345
					},
					{
						skuName:"鞋子",
						id:1,
						_checked:false,
						skuCode:158485234234,
						price:558,
						costPrice:345
					},
					{
						skuName:"鞋子",
						id:1,
						_checked:false,
						skuCode:158485234234,
						price:558,
						costPrice:345
					},
					{
						skuName:"鞋子",
						id:1,
						_checked:false,
						skuCode:158485234234,
						price:558,
						costPrice:345
					},
					{
						skuName:"鞋子",
						id:1,
						_checked:false,
						skuCode:158485234234,
						price:558,
						costPrice:345
					},
					{
						skuName:"鞋子",
						id:1,
						_checked:false,
						skuCode:158485234234,
						price:558,
						costPrice:345
					},
				],//商品数据
				listkey: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: this.$t('manage.sku.SkuName'),//'名称',
                        key:'skuName',
                    },
                    {
                        title: this.$t('manage.sku.SkuCode'),//'货号',
                        key:'skuCode',
                    },
                    
                    
                    // {
                    //     title: this.$t('manage.sku.costprice'),//'成本价',
                    //     key:'costPrice',
                    //     align:"center",
                    //     render:(h,params)=>{
                    //     	return h('span',{
                    //     		style:{
                    //     			color:"#d53c39"
                    //     		}
                    //     	},params.row.costPrice)
                    //     }
                    // },
                    //  {
                    //     title:this.$t('manage.sku.wholeprice'),// '批发价',
                    //     key:'wholePrice',
                    //     align:"center",
                    //   	render:(h,params)=>{
                    //     	return h('span',{
                    //     		style:{
                    //     			color:"#d53c39"
                    //     		}
                    //     	},params.row.wholePrice)
                    //     }

                    // },
                    // {
                    //     title: this.$t('manage.sku.price'),// '吊牌价',
                    //     key:'price',
                    //     align:"center",
                    //   	render:(h,params)=>{
                    //     	return h('span',{
                    //     		style:{
                    //     			color:"#d53c39"
                    //     		}
                    //     	},params.row.price)
                    //     }

                    // },
                   
                    // {
                    //     title: this.$t('manage.sku.SkuUnit'),//'单位',
                    //     key:'unit',
                    //     align: 'center',

                    // },
                    
                    // {
                    //     title:this.$t('manage.sku.FL'),//"分类",
                    //     key:"className",
                    //     align:"center",
                    // },
                    //  {
                    //     title: this.$t('manage.sku.issale'),//'可销售',
                    //     key:'onlingSals',
                    //     align:"center",
                      	
                    //    render:(h,params)=>{
                    //         return h('span',{
                    //             style:{
                    //                 color:params.row.onlingSals==true?'#40ca98':'#ff0000'
                    //             }
                    //         },params.row.onlingSals==true?this.$t('manage.sku.issale'):this.$t('manage.sku.issale1'))
                    //     }
                    // },
                    //  {
                    //     title: this.$t('public.status'),//'状态',
                    //     key:'statusDesc',
                    //   	width:80,
                    //     align:"center",
                    //   	render:(h,params)=>{
                    //         return h('span',{
                    //             style:{
                    //                 color:params.row.status==1?'#40ca98':params.row.status==0?'#d53c39':params.row.status==99?'#d53c39':''
                    //             }
                    //         },params.row.statusDesc)
                    //     }

                    // }

                ],
			}
		},
		methods:{
			//新建
			addSku(){
				this.$router.push('/addskulist')
			},
			//下拉选择
			changeSkuStatus(s){
				this.valueT=s
			},
			//列表模式
			list(){
				this.btnsimple="ghost"
				this.btnlist="primary"
				this.islist=true
			},
			//精简模式
			simple(){
				this.btnsimple="primary"
				this.btnlist="ghost"
				this.islist=false
			},
			//单机列表
			rowClick(row){

			},
			//激活
			start(){

			},
			//停用
			stop(){

			},
			//删除
			del(){

			},
			//获取商品数据
			getAllGoods(s){
				this.axios.get('/sku/query?uid='+this.uid+'&status='+s).then((res)=>{
					if(res.data.status==200){
						this.total = res.data.total
						this.pageSize = res.data.pageSize
						this.listData = res.data.rows
						this.listData.forEach(x=>{
							this.$set(x,'_checked',false)
						})
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
			//单选
			checkedList(row){
				this.listSkuId = row.id
				row._checked=true
				this.isselecAll=false
				if(row._checked){
					this.jshiArr.push(row.id)
					this.jshiArrStr=this.jshiArr.join(',')
					this.toggle=false

				}
			},
			//单选取消
			cancelSelect(selection,row){//selection：已选项数据 row：取消选择的项数据
				// this.toggle=true
				if(!row._checked){
					this.jshiArr.splice(this.jshiArr.indexOf(row.id),1)
					this.jshiArrStr=this.jshiArr.join(',')
					console.log(this.jshiArrStr)
				}
			},
			//全选
			checkedAll(selection){//已选项数据
				this.toggle=false
				this.isselecAll=false
				selection.forEach((x,index)=>{
					this.jshiArr.push(x.id)
					this.jshiArrStr=this.jshiArr.join(',')

				})
			},
			//全选发生变化
			allSelectAndCancel(selection){
				this.jshiArrStr=''
				this.jshiArr=[]
				selection.forEach((x,index)=>{
					this.jshiArr.push(x.id)
					this.jshiArrStr=this.jshiArr.join(',')
					console.log(this.jshiArrStr)
				})
				if(selection.length==0){
					this.toggle=true
				}
			},
			//点击叉号
			close(){
				this.toggle=true
				this.jshiArrStr=''
				this.jshiArr=[]
				this.listData.forEach(x=>{
					x._checked=false
					
				})
				if(this.islist){
					this.$refs.currentRowTable.selectAll(false);
				}
				
			},
			//移动到一个上
			mouseoversku(){

			},
			//离开
			mouseleave(){

			},
			//精简单选
			changecheckbox(item,e){
				this.toggle=false
				item._checked=e
				if(item._checked){
					this.isselecAll=true
					this.jshiArr.push(item.id)
					this.jshiArrStr=this.jshiArr.join(',')
					console.log(this.jshiArrStr)
				}
				if(!item._checked){
					this.jshiArr.splice(this.jshiArr.indexOf(item.id),1)
				}
			},
			//精简全选
			sellectedAll(){
				this.jshiArrStr=''
				this.jshiArr=[]
				this.listData.forEach(x=>{
					x._checked=true
					this.jshiArr.push(x.id)
					this.jshiArrStr=this.jshiArr.join(',')
					console.log(this.jshiArrStr)
				})
			},

		},
		mounted(){
			// this.getAllGoods(this.valueT)
			console.log(this.$parent.data)
		}
	}
</script>
<style type="text/css" scoped>
.main{
	width:100%;
	height:100%;
	overflow-y: auto;
}
.sku-top{
	height:60px;
	line-height: 60px;
	display: flex;
	margin:0 15px;
	justify-content: space-between;
	font-size:16px;

}
.classMain{
	display: flex;
    padding: 10px;
    border-top:1px solid #e4e4e4;
}
.classMain-goods{
	display: flex;
	flex-wrap: wrap;
}
.classMain-goods p{
	overflow: hidden;
	text-align: center;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.classgoods{
	display: flex;
	/*justify-content: center;*/
}
.classList{
	margin:0 10px;
}
.li-goods{
	margin:20px;
	padding:10px;
	width:21%;
	min-height:360px;
	text-align: center;
	border: 1px solid transparent;
    transform: translateY(-1px);
    transition: all 250ms cubic-bezier(.02,.01,.47,1);
    box-shadow: 0 8px 30px rgba(219,219,219,.7);
}
.li-goods:hover{
	transform: translateY(-1px);
    box-shadow: rgba(219, 219, 219, 0.7) 0px 8px 30px;
   	border: 1px solid #8BBFF9;
}
.attrsGoods-right{
	position: absolute;
    left: 101%;
    z-index: 9;
    top: 0;
    border: 1px solid #e4e4e4;
    width: 300px;
    height: 100%;
}
.goods-price{
	display: flex;
	justify-content: space-between;
}
.money{
	font-size:16px;
	font-weight: 600;
	color:#ff0000;
}
.addGoods-to-order{
	height:40px;
	line-height: 40px;
	color:#fff;
	font-size:16px;
	text-align: center;
	margin-top:10px;
	background:#FF063A;
}
.addGoods-to-order:hover{
	cursor:pointer;
	background:#aF063A;
}
.sku-p{
	margin-top:20px;
}
.img-s{
	margin:20px 0;
	text-align: center;
}
.sku-img{
	max-height: 120px;
    max-width: 120px;
    margin: auto;
}
.s-c-p{
	position:absolute;
	top:10px;
	left:10px;
}
.islist,.simple{
	margin-bottom:80PX;
}
</style>