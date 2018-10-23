<template>
	<div>
		<Col span='6'>
			<div class="left-top">
				<p class="wldw">
					<span style="width:42px;font-weight:900">库存：</span>
					 <Select style="width:100px" size="small" placeholder="全部">
				        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
				    </Select>
				</p>
				<div>
					<span class="top-left-btn"  @click="add">
						<Icon type="plus" style="position:absolute;top:7px;left:8px"></Icon></span>
					<span class="top-left-btn top-left-btn1">
						<Icon type="navicon-round" style="position:absolute;top:7px;left:8px"></Icon></span>
				</div>
			</div>
		</Col>
		<Col span='18'>
			<div class="right-top">

				<div >
					<span style="margin-left:10px">{{orderText}}</span> 
					
				</div>
				<div style="margin-right:5%">
					<div v-if="addText">
						<Button shape="circle"  style="background:#3b77e3;margin-right:5px;color:#fff;border:none" @click="save" >
						<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>保存</Button>
						
						<Button shape="circle"  @click=""  style="background:#999999;color:#fff;margin-right:10px;" ><Icon type="close" style="margin-right:5px;"></Icon>取消</Button>
						
						<span @click="gopre" style="cursor:pointer"><Icon type="close" class="cha" ></Icon></span>
					</div>

					<div v-if="!addText" class="changebutton">

						<Button type="ghost"  shape="circle"  @click=""  style	="background:#40ca98;margin-right:5px;color:#fff;border:none">
							<i class="el-icon-edit" style=";margin-right:5px;"></i>
						修改
						</Button>

						<Poptip placement="bottom-end">
							<div type="ghost">
								<Button  shape="circle" type="ghost" style="color:#fff;border:none;background:#ff7d16">更多
                            <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
                        </Button>
							</div>
							<div slot="content" style="width:80px;overflow: hidden;">
								<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;" @click="">删除</p>
								</div>
						</Poptip>
						<span @click="gopre" style="cursor:pointer"><Icon type="close" class="cha" ></Icon></span>
					</div>	
				</div>
			</div>
		</Col>
		<div class="left-content">
			<p v-if="dataList.length==0">
				<Spin fix>
	                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
	                <div>暂无数据</div>
	            </Spin>
	        </p>
			<Scroll :on-reach-bottom="handleReachEdge" :height="height" v-else>
				<div class="con-list" v-for="(item,index) in dataList" @click="dclick(item.id,index)" :class="{bg:numIndex==index}">
					 <span style="margin-right: 10px;"><Checkbox v-model="isindex"></Checkbox></span>
					 <div>
					<p class="list-title">{{item.skuCode }}</p>
					<p class="txt" style="margin-top:10px;">{{item.partnerName}}</p>
					<p class="txt">{{item.price}}</p>
					<span class="date">{{item.qty }}</span>
					</div>
				</div>
				
			</Scroll>
		</div>
		<div class="right-content" v-if="addText">
			<Col span='12'>
				<div class="list-box">
					<span>sku名 : </span>
					<Input  placeholder="sku名" v-model="skuName"></Input>
				</div>
				<div class="list-box">
					<span>数量 : </span>
					<Input  placeholder="数量" v-model="qty"></Input>
				</div>
				<div class="list-box">
					<span>条码 : </span>
					<Input  placeholder="条码" v-model="barcode"></Input>
				</div>
				<div class="list-box">
					<span>零售价 : </span>
					<Input  placeholder="零售价" v-model="price"></Input>
				</div>
			</Col>
			<Col span='12'>
				<div class="list-box">
					<span>成本价 : </span>
					<Input  placeholder="成本价" v-model="costPrice"></Input>
				</div>
				<div class="list-box">
					<span>批发价 : </span>
					<Input  placeholder="批发价" v-model="wholePrice"></Input>
				</div>
				<!-- <div class="list-box">
					<span>供应商 : </span>
					
					<op :data='dataList' :styleObj="{'width':'300px'}" :name='gysname'  :Modal="Modal" @getValue="getv"></op>
				</div> -->
				<div class="list-box">
					<span>仓库 : </span>
					<Input  placeholder="仓库" v-model="warehouseName"></Input>
				</div>
			
			</Col>
		</div>
		<div class="right-content" v-if="!addText">
			<Col span='12'>
				<div class="list-box">
					<span>sku名: </span>
					<Input  placeholder="sku名" v-model="skuName"></Input>
				</div>
				<div class="list-box">
					<span>数量 : </span>
					<Input  placeholder="数量" v-model="qty"></Input>
				</div>
				<div class="list-box">
					<span>条码 : </span>
					<Input  placeholder="条码" v-model="barcode"></Input>
				</div>
				<div class="list-box">
					<span>零售价 : </span>
					<Input  placeholder="零售价" v-model="price"></Input>
				</div>
			</Col>
			<Col span='12'>
				<div class="list-box">
					<span>成本价 : </span>
					<Input  placeholder="成本价" v-model="costPrice"></Input>
				</div>
				<div class="list-box">
					<span>批发价 : </span>
					<Input  placeholder="批发价" v-model="wholePrice"></Input>
				</div>
				<!-- <div class="list-box">
					<span>供应商 : </span>
					<op :data='dataList' :styleObj="{'width':'300px'}" :name='gysname'  :Modal="Modal" @getValue="getv"></op>
				</div> -->
				<div class="list-box">
					<span>仓库 : </span>
					<Input  placeholder="仓库" v-model="warehouseName"></Input>
				</div>
			
			</Col>
		</div>
		<!--选择商品-->
			<Modal v-model="isshowGys" width="660px">
				<p slot="header" style="height:30px;line-height:30px">
					
					<span>商品列别参照</span>
				</p>
				<div style="text-align:center;width:100%;height:30px;line-height:35px;display:flex;justify-content: space-between">
					<Input  placeholder="单位编码、名称、助记码、单位电话、联系人、分管部门" style="padding:2px 0"></Input>
					
					
				</div>
				<!--商品数据-->
				<div slot="footer">
					<div style="display:flex;justify-content: space-between;margin-top:20px">
						<Button type="ghost" style="background:#00A7F5;color:#fff">添加商品</Button>
						<div>
							<Button type="ghost" style="display:inline-block;background:#00A7F5;color:#fff;cursor:default" @click="">选入</Button>
							<Button type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff">取消</Button>
							
						</div>
					</div>
				</div>
			</Modal>
			<div class='totBottom'>
		        <span>共<span style='color:#ff0000'> {{total}} </span>条</span>
		        <span>当前第<span style='color:#ff0000'> {{current}} </span>页</span>
		    </div>
	</div>
</template>
<script type="text/javascript">
import op from '../../.././components/common/Publicoptions'
export default{
	components:{
			op
	},
	data(){
		return{
			total:0,
			pageSize:0,
			numIndex:0,
			indexId:'',
			height:'',
			current:1,
			isindex:false,
			addText:true,
			isshowGys:false,
			gysname:'添加供应商',//添加供应商
			orderText:'',//新建库存
			uid: this.$store.state.common.token,
			orderListname:[
					{
						label:"全部",
						value:1
					},
					{
						label:"待审核",
						value:2
					},
					{
						label:"待签收",
						value:3
					},
					{
						label:"退审单",
						value:4
					}
				],
				Allpo:[],
			dataList:[],
			skuName:'',//名
			barcode:'',//条码
			qty:'',//数量
			price:'',//零售价
			costPrice:'',//成本价
			wholePrice:'',//批发价
			partnerName:'',//供应商
			partnerId:'',//供应商编号
			warehouseName:'',//仓库名
			warehouseId:''//仓库Id
		}
	},
	created(){
		this.$nextTick(()=>{
			this.axios.get('partner/query?uid='+this.uid).then((res)=>{
				this.dataList = res.data.rows
			})
		})
	},
	methods:{
		//新增
		add(){
			this.addText = true
		},
		Modal(){
			this.isshowGys=true
		},
		//获取value
		getv(value){

		},
		//获取所有供应商
		getAllgys(){
			this.axios.get('/partner/query?uid=' + this.uid).then(res=>{
				if(res.data.status==200){
					this.gysData= res.data.rows
				}
			})
		},
		gopre(){
			this.$router.push('/inventory')
		},
		//保存新建库存
		save(){
			this.axios.post('inventory/add?uid='+this.uid,{
				skuName:this.skuName,//名
				barcode:this.barcode,//条码
				qty:this.qty,//数量
				price:this.price,//零售价
				costPrice:this.costPrice,//成本价
				wholePrice:this.wholePrice//批发价
				// partnerName:this.//供应商
				// partnerIdthis.://供应商编号
				// warehouseName:this.//仓库名
				// warehouseId:this.//仓库Id
			}).then((res)=>{
				if(res.data.status==200){
					this.$Notice.success({
						title: '新建',
						desc: '新建成功'
					});
				}else{
					this.$Notice.error({
						title: '新建',
						desc: '新建失败'
					});
				}
			})
		},
		//获取所有库存
		getAllList(){
			this.axios.get('inventory/query?uid='+this.uid).then((res)=>{
				if(res.data.status==200){
					this.isLoading = false
					this.dataList = res.data.rows
					this.total=res.data.total
					this.pageSize=res.data.pageSize
				}else{
					this.$Notice.success({
	                title:"",//
	                desc: res.data.errorMessage
	              });
				}
			})
		},
		//单击左边数据
		dclick(id,index){
			this.numIndex = index
			this.indexId = id
			this.addText = false
		
		},
		 //下拉加载更多
        handleReachEdge(){
			this.current++//默认10条
	 		this.axios.get('inventory/query?offset='+this.current+'&uid='+this.uid).then((res)=>{
 				if(this.current>Math.ceil(this.total/this.pageSize)){
                    this.current=Math.ceil(this.total/this.pageSize)
                }
		 		res.data.rows.forEach((item)=>{
		 			item.createTime=new Date(item.createTime).toLocaleDateString().replace(/\//g,'-')
		 			this.dataList.push(item)
		 			
		 		})
		 	})
                  
        },
	},
	created(){
		this.getAllList()
	},
	mounted(){
		this.indexId = this.$route.query.id
		this.numIndex = this.$route.query.index

		
		this.height = document.documentElement.clientHeight
		
		window.onresize=function(){
			this.height = document.documentElement.clientHeight
		}
	}
}
</script>
<style type="text/css" scoped>
.wldw{
	margin-left:40px;
}
.tot{
    position:fixed;
    bottom:10px;
    left:15%;
    z-index:12;
}
.left-top{
	height: 60px;
	width:25%;
	line-height: 60px;
	position:fixed;
	z-index:9;
	display:flex;
	background: #fff;
	padding-right:10px;
	
	border-right:1px solid #eee;
	justify-content: space-between;
}
.right-top{
	height: 60px;

	
	line-height: 60px;
	position:fixed;
	z-index:10;
	display:flex;
	width:70%;
	margin-left:25%;
	background: #fff;
	justify-content: space-between;

}
.left-content {
	height:100%;
	width:25%;
	margin-top: 50px;
	margin-bottom:300px;
	border-right:1px solid #eee;
	position:fixed;
	background:#F9F9F9;
}

.con-list {
	display:flex;
	align-items: center;
	width: 100%;
	word-wrap:break-word;
	
	border-bottom: solid 1px #EFEFEF;
	padding: 15px 25px;
	
	cursor: pointer;
	position:relative;
}
.con-list:hover{
	cursor:pointer;
}
.con-list .date{
	position:absolute;
	right:10px;
	top:10px;
}
.con-list .list-title {
	color: #0d0d0d;
	font-size: 14px;
	margin-bottom: 10px;
}


.con-list .txt {
	color: #585858;
	font-size: 12px;
}
.cha{
	margin-right:10px;
}
.top-left-btn{
	background: #3B77E3;
    margin-right: 10px;
    color: #fff;
    border: none;
    width: 26px;
    height: 26px;
    border-radius: 26px;
    display: inline-block;
    position: relative;
    top: 12px;
}
.top-left-btn1{
	background: #FF7D16;
}
.top-left-btn:hover{
	cursor:pointer;
}
.list-box{
	display: flex;
	height:35px;
	line-height: 35px;
	margin:20px 10px;
}
.list-box span{
	height:40px;
	width:118px;
	text-align: center;
	padding:0 10px;
}
.right-content {
	width: 70%;
	padding-top: 60px;
	margin-left:30%;

}
.list-box input.ivu-input{
	height:40px!important;
}
 @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
</style>
<style type="text/css">
.ivu-scroll-content{
	margin-bottom:100px;
}
.ivu-scroll-container::-webkit-scrollbar{
	width: 0px;
	height: 4px;
	background-color: #f5f5f5;
}
.ivu-scroll-container::-webkit-scrollbar-track{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	border-radius: 10px;
	background-color: #f5f5f5;
}
.ivu-scroll-container::-webkit-scrollbar-thumb{
	
	height: 2px;
	border-radius: 18px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #ccc;
}
.layout-content-main{
	margin-top:0px!important;
}
.ivu-btn{
	padding:4px 15px!important;
}
</style>