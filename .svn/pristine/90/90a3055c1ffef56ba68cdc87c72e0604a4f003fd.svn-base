<template>
	<div class="main">
		<!--header-->
		<Row style="border-bottom:1px solid #ccc;padding:10px 0">
			<Col span="8" style="text-align:right">
				<span style="margin-right:200px">全部订单</span>
				<div style="display:inline-block;">
					<!-- <div class="btns" style="background:#086CA2;color:#fff" @click="add">新建</div> -->
					<Button type="ghost" @click=""><Icon type="android-cancel" style="margin-right:5px;color:#00a8ff"></Icon>全部挂单</Button>
				</div>
			</Col>
			<Col span="16" style="text-align:right;">
				<div class="btngroup">
					
					<Button type="ghost" @click="cancelOrder"><Icon type="android-cancel" style="margin-right:5px;color:#00a8ff"></Icon>取消订单</Button>
					<Button type="ghost" @click="returnOrder"><Icon type="alert" style="margin-right:5px;color:#00a8ff"></Icon>退单</Button>
					
				</div>
			</Col>
		</Row>
		<!--左边列表内容-->
		<Row>
			<Col span="8">
				<div class="left">
					<div class="left-brand-list" v-for="(item,index) in orderList" @click="dblclick(item.id,index)" :class="{bg:numIndex==index}">
						<div>
							<p>单号：{{item.orderNo}}</p>
							<p style="margin-top:20px">会员：{{item.customerName}}</p>
						</div>
						<div>
							<p>日期：{{item.createTime}}</p>
							<p style="margin-top:20px">总价：<span style="color:red">￥{{item.amount}}</span></p>

						</div>

						
					</div>
				</div>
			</Col>
			<!--右边详情-->
			<Col span="16" >
				<div class="right">
					<Row>
						<Col span="12">
							<a>订单明细</a>
							<div  v-for="item in details">
								<div class="input-row">
									<span>订单号：{{item.orderNo}}</span>
								</div> 
								<div class="input-row">
									<span>创建时间：{{item.createTime}}</span>
								</div>
								
								<div class="input-row">
									<span>数量：{{item.num}}</span>
								</div>
								<div class="input-row">
									<span>价格：{{item.amount}}</span>
								</div>
							</div>
						</Col>
						<Col span="12">
						<a>支付明细</a>
							<div v-for="item in payWay">
								<div class="input-row">
									<span>订单号：{{item.orderNo}}</span>
								</div>
								<div class="input-row">
									<span>创建时间：{{item.createTime}}</span>
								</div>
								<div class="input-row">
									<span>支付编号：{{item.payNo }}</span>
								</div>
								<div class="input-row">
									<span>支付方式：{{item.typeDesc}}</span>
								</div>
							</div>
							
						</Col>
					</Row>
				</div>
			</Col>
		</Row>
	<!--取消订单弹框-->
	<Modal v-model="cancelOrderIshow" width="660" height="600">
		<div style="padding:20px">
			<span>取消订单</span>
		</div>
		<div >
			<div class="brandmrgin">
				<Input v-model="cancelOrderremark" type="textarea" placeholder="请输入取消订单原因"></Input>
			</div>
		</div>
		<div slot="footer">
			<div>
				<div class="btns" style="background: #EE7019;color:#fff" @click="selectedCancelOrder">确认</div>
				<div class="btns" @click="cancelOrderBtn1">取消</div>
			</div>
		</div>
	</Modal>
	
	<!--选择退单弹框-->
	<Modal v-model="returnOrderisshow" width="660" height="600">
		<div style="padding:20px">
			<span>请输入退单理由</span>
		</div>
		<div>
			<Input type="textarea" v-model="returnOrderRemark"></Input>
		</div>
		<div slot="footer">
			<div>
				<div class="btns" @click="selectedReturn" style="background: #EE7019;color:#fff">确认</div>
				<div class="btns" @click="cancelOrderBtn2">取消</div>
			</div>
		</div>
	</Modal>
</div>	
</template>
<script type="text/javascript">
export default{
	data(){
		return {
	
			cancelOrderIshow:false,//取消订单弹框
			returnOrderisshow:false,//退单弹框
			returnOrderRemark:"",//退单备注
			cancelOrderremark:'',//取消订单备注
			numIndex:0,
			total:0,
			pageSize:0,
			orderList:[],//订单列表
			uid: this.$store.state.common.token,
			orderRowInfo:{},//订单一条信息列表
			payWay:[],
			details:[]
		}
	},
	methods:{
		
		//主页进入携带id获取订单详情
		getOrderInfo(id){
			this.orderId = id;
			this.axios.get('/orderform/get/'+id+'?uid='+this.uid).then((res)=>{
				console.log(res)
				this.orderRowInfo = res.data.rows//订单号
				// this.details = res.data.rows.details//明细
				// this.payWay = res.data.rows.payVos//支付方式
			})
		},
		//双击查看详情
		dblclick(id,index){
			//console.log(id)
			this.orderId= id
			this.numIndex = index
			this.axios.get('/orderform/get/'+id+'?uid='+this.uid).then((res)=>{
				if(res.data.status==200){
					this.orderRowInfo = red.data.rows
					// this.details = res.data.rows.details//明细
					// this.payWay = res.data.rows.payVos//支付方式
				}else{
					this.$Message.error(res.data.errorMessage);
				}
				
			})
		},
		//获取所有订单
		getAllorder(){
			this.axios.get('orderform/query?uid='+this.uid).then((res)=>{
				if(res.data.status==200){
					//console.log(res.data)
					this.orderList = res.data.rows
					this.total = res.data.total
					this.pageSize = res.data.pageSize
					//格式化时间
					this.orderList.forEach((item)=>{
						item.createTime = new Date(item.createTime).toLocaleString().replace(/\//g,'-')
					})
				}else{
					
				}
			})
		},
		 //切换一条页
		 getData(current){
		 	this.axios.get('/orderform/query?offset='+current+'&uid='+this.uid).then((res)=>{
                ////console.log(res)
                this.orderList = res.data.rows
            })
		 },
        //翻页
        changePageSize(size){
        	this.pageSize = size
        },
        //点击取消订单按钮的弹框
		cancelOrder(){
			if(!this.orderId){
				this.$Message.error("请选择要取消的订单");
				return
			}
			this.cancelOrderIshow = true
			
		},
		//点击取消订单弹框确认按钮
		selectedCancelOrder(){
			if(this.orderId && this.cancelOrderremark!=''){
				this.axios.post('orderform/cancel?id='+this.orderId+'&remark='+this.cancelOrderremark+'&uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						this.cancelOrderIshow = false
					}
				})
			}else{
				this.$Message.error('请选择要取消的订单 并输入取消理由');
			}
		},
		//点击取消订单弹框取消按钮
        cancelOrderBtn1(){
        	this.cancelOrderIshow = false
        },  
        //退单弹框显示
        returnOrder(){
        	this.returnOrderisshow = true
        },
        //退单确认
        selectedReturn(){
        	if(this.orderId && this.returnOrderRemark!=''){
        		this.axios.get('orderform/return?id='+this.orderId+'&remark='+this.returnOrderRemark+'&uid='+this.uid).then((res)=>{
	        		if(res.data.status==200){
	        			this.$Notice.success({
							title: '退单',
							desc: '退单成功'
						});
						this.returnOrderisshow = false
	        		}
	        	})
        	}else{
        		this.$Message.error('请选择要退的订单 并输入退单理由');
        	}
        },
        //点击退单弹框取消按钮
        cancelOrderBtn2(){
        	this.returnOrderisshow = false
        }
    },
    mounted(){
    	if(this.$route.query.id){
    		let id = this.$route.query.id
    		this.getOrderInfo(id)
    	}
    	this.getAllorder()
    }
}
</script>
<style type="text/css" scoped>

.left,.right{
	margin-top:20px;
	
} 
.left{
	height:400px;
	overflow-y: scroll
}
.right{
	margin-left:20px;
}
.left-brand-list{
	display:flex;
	justify-content: space-between;
	border:1px solid #ccc;
	border-radius:6px;
	width:90%;
	margin:0 auto;
	padding:10px 20px;
	margin-top:10px;
}
.left-brand-list:hover{
	cursor: pointer
}
.bg{
	background:#f5f5f5;
	/*border-color:#086CA2;*/
}

.btngroup{
	margin-right:30px;
}
.btns {
	display:inline-block;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 14px;
	color: #0d0d0d;
	padding: 0 25px;
	border: 1px solid #ececec;
	border-radius: 6px;
	margin-right:10px;
}
.page-box {
	text-align: right;
	margin:20px;
}

.input-row{
	display:flex;
	justify-content: space-around;
	height:36px;
	line-height: 36px;
	margin-right:15px;
	margin-top:15px;

}
.input-row span{
	flex:0 0 auto;
	width:120px;
	text-align: center;
}
</style>
