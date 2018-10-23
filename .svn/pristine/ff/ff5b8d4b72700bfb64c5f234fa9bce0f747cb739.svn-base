<template>
	<div>
		<div class='top'>
			<span style='font-size:18px;font-weight:600;margin-left:20px'>{{$t('orders.TKCode')}}：{{orderInfo.returnNo}}</span>
		</div>
		<div class='top-info'>
			<div style='margin-top:10px;margin-right:10%'>
				<li><span style='font-size:16px;color:#2B8F8F'>{{$t('orders.orderInfo')}}</span></li><!--订单信息-->
				<li><span>{{$t('orders.orderNo')}}：</span>{{orderInfo.orderNo}}</li>
				<li><span>{{$t('orders.TKCode')}}：</span>{{orderInfo.returnNo}}</li><!--退单编号-->
				<li><span>{{$t('orders.TKbes')}}：</span>{{orderInfo.reason=="" || orderInfo.reason==undefined?"无":orderInfo.reason}}</li><!--退单原因-->
				<li><span>{{$t('orders.TKtime')}}：</span>{{orderInfo.createTime}}</li><!--退单时间-->
			</div>
			
			<div style='margin-top:10px;margin-left:10px'>
				<li><span style='font-size:16px;color:#2B8F8F'>会员信息</span></li>
				<li><span>{{$t('orders.DG')}}：</span>{{orderInfo.employeeName}}</li><!--导购-->
						
				<li><span>{{$t('orders.crm')}}：</span>{{orderInfo.customerName}}</li><!--会员-->
				<li><span>{{$t('orders.crmcode')}}：</span>{{orderInfo.crmCode}}</li><!--会员编号-->
			</div>
			<div style='margin-top:10px;margin-left:10%'>
				<li><span style='font-size:16px;color:#2B8F8F'>{{$t('orders.sku')}}</span></li><!--商品-->
				<li><span>{{$t('orders.sku')}}：</span>{{orderInfo.skuName}}</li><!--商品-->
				<li><span>{{$t('manage.sku.barcode')}}：</span>{{orderInfo.barcode}}</li><!--商品条码-->
				<li><span>{{$t('manage.sku.SkuCode')}}：</span>{{orderInfo.skuCode}}</li><!--商品货号-->
				<li><span>{{$t('manage.sku.attr')}}：</span>{{orderInfo.skuTypeDesc}}</li><!--商品规格-->
			</div>
			<div style='margin-top:10px;margin-left:10%'>
				<li><span style='font-size:16px;color:#2B8F8F'>{{$t('orders.orderStatus')}}：</span ><span style='font-size:16px;color:blue'>{{orderInfo.statusDesc}}</span></li><!--退单状态-->
				<div >
					<li><span>{{$t('orders.TKmoney')}}：<span style='color:#FF7D16'>{{orderInfo.amount}}</span></span></li>
					<!-- <li><span>退款方式：</span></li>退款金额 -->
				</div>
			</div>
		</div>	
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			uid: this.$store.state.common.token,
			orderId:'',//订单id
			orderInfo:{},//订单详情
		}
	},
	methods:{
		//获取详情oreturn/get
		getInfo(id){
			this.axios.get('oreturn/get/'+id+'?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.orderInfo=res.data.rows
					this.orderInfo.createTime=new Date(this.orderInfo.createTime).toLocaleDateString().replace(/\//g,'-')
					// console.log(this.orderInfo)
					//4 拒绝退货
					if(this.orderInfo.status==4){
						this.orderInfo.statusDesc=this.$t('orders.TKjj')//'拒绝退货'
					}
				}
			})
		},
	},
	mounted(){
		if(this.$route.query.id){
			// this.orderId=this.$route.query.id
			// this.getInfo(this.orderId)
			this.getInfo(this.$route.query.id)
		}
	}
}
</script>
<style type="text/css" scoped>
.top{
	height:50px;
	line-height: 50px;
	border-bottom: 1px solid #E4e4e4
}
.top-info{
	display:flex;
	border-bottom:1px solid #e4e4e4;
	padding:10px 20px;
	
}
.top-info li{
	list-style: none;
	margin-top:10px;
}
</style>