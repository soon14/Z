<template>
	<div class="main">
		<div class="header">
			<div class="left-top">
				<p class="wldw">
					<span style="width:42px;font-weight:900">库存：</span>
					 <Select style="width:100px"  placeholder="全部">
				        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
				    </Select>
				</p>
				<div>
					<span class="top-left-btn"  @click="add">
						<Icon type="plus" style="position:absolute;top:7px;left:8px"></Icon></span>
					
				</div>
			</div>
		
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
		</div>
		<div class="left-content">
			<p v-if="dataList.length==0">
				<Spin fix>
	               
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
			<!-- <Form ref="formValidateEdit" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<div>
					<div style='width:45%'>
						<FormItem label="仓库" prop="partnerName">
			             	<span @click='getck'>
			             		<Input placeholder="仓库"></Input>
			             	</span>
			             </FormItem>
		             </div>
	            </div>
            </Form> -->
		</div>
		<div class="right-content" v-if="!addText">
			
			
			
		</div>
		<!--选择商品-->
		<Modal v-model="isshowck" width="660px">
			<p slot="header" style="height:30px;line-height:30px">
				<span>仓库列表</span>
			</p>
			<!-- <div style="text-align:center;width:100%;height:30px;line-height:35px;display:flex;justify-content: space-between">
				<Input  placeholder="单位编码、名称" style="padding:2px 0"></Input>
			</div> -->
				<Table  border height="300" highlight-row  :columns="ckkey" :data="ckdata" @on-row-click="ckrow">
				</Table>
				<!--分页-->
	            <div class="page-box" style="text-align:left">
					<Page :total="cktotal" :pageSize='ckpageSize' show-total @on-change="ckgetData" @on-page-size-change="ckchangePageSize"></Page>
				</div>
			<!--商品数据-->
			<div slot="footer">
				<div style="display:flex;justify-content: space-between;margin-top:20px">
					
					<div>
						<Button type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff">取消</Button>
						<Button type="ghost" style="display:inline-block;background:#00A7F5;color:#fff;cursor:default" @click="">确认</Button>
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

export default{
	
	data(){
		return{
			formValidate:{

			},
			ruleValidate:{

			},
			ckkey:[
				{
					title:"编号",
					width:200,
					key:"skuCode"
				},
				{
					title:"名称",
					width:200,
					key:"skuName"
				},
				{
					title:"成本价",
					width:100,
					key:"costPrice"
				},
				{
					title:"批发价",
					width:100,
					key:"wholePrice"
				},
				{
					title:"吊牌价",
					width:100,
					key:"price"
				},
				{
					title:"库存",
					width:100,
					key:"qty"
				},
				{
					title:"规格",
					width:100,
					key:"skuSpec"
				},
			],
			ckdata:[],
			cktotal:0,
			ckpageSize:0,
			total:0,
			pageSize:0,
			numIndex:0,
			indexId:'',
			height:'',
			current:1,
			isindex:false,
			addText:true,
			isshowck:false,
			gysname:'',//
			orderText:'',//新建库存
			uid: this.$store.state.common.token,
			orderListname:[
					{
						label:"全部",
						value:1
					},
					
				],
				Allpo:[],
			dataList:[],//所有库存
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
	methods:{
		//新增
		add(){
			this.addText = true
		},
		//仓库弹框
		getck(){
			this.isshowck=true
			this.axios.get('inventory/listDetail?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.ckdata=res.data.rows
					this.cktotal=res.data.total
					this.ckpageSize=res.data.pageSize
				}
			})
		},
		//仓库翻页
		ckgetData(current){

		},
		ckchangePageSize(size){
			this.ckpageSize=size
		},
		//单击仓库列表一行
		ckrow(row,index){

		},
		//获取value
		getv(value){

		},
		//获取
		getAllgys(){
			
		},
		gopre(){
			this.$router.push('/skuadjust')
		},
		//保存新建库存
		save(){
			this.axios.post('adjust/add?uid='+this.uid,{
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
					this.$notify({
				        title:"",//
				        message: '新建成功',
				        type: 'error',
				        position: 'bottom-right'
			        });
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
		//获取所有库存
		getAllList(){
			this.axios.get('adjust/query?uid='+this.uid).then((res)=>{
				if(res.data.status==200){
					this.dataList = res.data.rows
					this.total=res.data.total
					this.pageSize=res.data.pageSize
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
		//单击左边数据
		dclick(id,index){
			this.numIndex = index
			this.indexId = id
			this.addText = false
		},
		 //下拉加载更多
        handleReachEdge(){
			this.current++//默认10条
	 		this.axios.get('adjust/query?offset='+this.current+'&uid='+this.uid).then((res)=>{
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
.main{
	width:100%;
}
.header{
	width:100%;
	height:60px;
	line-height: 60px;
	display: flex;
	justify-content: space-between;
	position:fixed;
	z-index:11;
	border-bottom:1px solid #eee;
}
.wldw{
	margin-left:10px;
}
.tot{
    position:fixed;
    bottom:10px;
    left:15%;
    z-index:12;
}
.left-top{
	height: 60px;
	width:360px;
	flex:0 0 360px;
	line-height: 60px;
	
	display:flex;
	background: #fff;
	border-right:1px solid #eee;
	border-bottom:1px solid #eee;
	justify-content: space-between;
}
.right-top{
	height: 60px;
	line-height: 60px;
	position:absolute;
	display:flex;
	width:400px;
	right:250px;
	border-bottom:1px solid #eee;
	background: #fff;
	justify-content: space-between;

}
.left-content {
	height:100%;
	width:360px;
	flex:1 0 360px;
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
	width: 72%;
	padding-top: 60px;
	margin-left:28%;
	height: 100%;

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