<template>
    <div class="main">
    	<div class='head-bottom1'>
			<Col class='head-bottom1-li' span="7">
				<div class="car-body">
					<h3 class="f-50 font-weight-100">{{totalOrders}}</h3>
					<p class="titleN">总订单</p>
					<p class="scale"><span style="color:#0000FF;font-size:20px;font-weight:600;">{{OedersScale}}%</span></p>
					<div class="smallN">
						<ul>
							<li class="font-size16">{{todayOrders}}</li>
							<li>今日订单</li>
						</ul>
						<ul>
							<li class="font-size16">{{yesterdayOrders}}</li>
							<li>昨日订单</li>
						</ul>
					</div>
				</div>
				<div class="bottomN">
					<span>订单数</span>
					<div>
						<img src="http://img.zsydian.com/icon/u10.png" class="u10_img">
					</div>
					<span></span>
				</div>
			</Col>
			<Col class='head-bottom1-li' span="7">
				<div class="car-body">
					<h3 class="f-50 font-weight-100">{{totalSales}}</h3>
					<p class="titleN">总销售额</p>
					<p class="scale"><span style="color:#0000FF;font-size:20px;font-weight:600;">{{SalesScale}}%</span></span>
					</p>
					<div class="smallN">
						<ul>
							<li class="font-size16">{{todaySales}}</li>
							<li>今日销售额</li>
						</ul>
						<ul>
							<li class="font-size16">{{yesterdaySales}}</li>
							<li>昨日销售额</li>
						</ul>
					</div>
				</div>
				<div class="bottomN">
					<span>销售量</span>
					<div>
						<img src="http://img.zsydian.com/icon/u10.png" class="u10_img">
					</div>
					<span></span>
				</div>
			</Col>
			<Col class='head-bottom1-li' span="7">
				<div class="car-body">
					
					<h3 class="f-50 font-weight-100">{{totalCustomer}}</h3>
					<p class="titleN">总会员数 </p>
					<p class="scale"><span style="color:#0000FF;font-size:20px;font-weight:600;">{{CustomersScale}}%</span></p>
					<div class="smallN">
						<ul>
							<li class="font-size16">{{todayCustomers}}</li>
							<li>今日会员数</li>
						</ul>
						<ul>
							<li class="font-size16">{{yesterdayCustomers}}</li>
							<li>昨日会员数</li>
						</ul>
					</div>
				</div>
				<div class="bottomN">
					<span>会员数</span>
					<div>
						<img src="http://img.zsydian.com/icon/u10.png" class="u10_img">
					</div>
					<span></span>
				</div>
			</Col>
		</div>
		<div class="CustomerMap">
			<span style='font-size:30px'>会员地图</span>
			<div class="map-box" style="width:100%;float:none">
                <!--百度地图-->
                <baidu-map :center="center" :zoom="zoom" @ready="handler" style="width:100%;height:100%;">
                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                    <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://img.zsydian.com/icon/zspo.png', size: {width: 80, height: 100}}">
                    </bm-marker>
                </baidu-map>
            </div>
		</div>
		<div class='zj'>
			<div class='zj-style'>
				<span><span style='font-size:30px'>销售分析</span></span>
			</div>
			<div class='zj-style'>
				<span><span style='font-size:30px'>最新订单</span></span>
			</div>
		</div>
		<div class='echarts' style='position:relative'>
			<div id="myEchartSales" style="width:100%;margin:0 10px;background:#FBFBFB;border:1px solid #e4e4e4"></div>
				<ag-grid-vue style='width:100%;height:320px;border:1px solid #e4e4e4;margin:0 10px' class="ag-theme-balham is-full-widthag" 
		        :gridOptions="grid"
		        :rowData="AllOrderList"
		        :columnDefs="dataKey"
		        ></ag-grid-vue>
		    <div v-if='lenOrders==0'  style="position:absolute;left:25%;;top:25%">{{$t('public.NoData')}}</div>
		    <div class="page-box page-box-position" v-if='Ytotal.length>10'>
			    <Page :total="Ytotal" show-total size='small' :pageSize='YpageSize'  @on-change="YgetData" ></Page>
		 	</div>
		</div>
		
		<div class='zj'>
			<div class='zj-style'>
				<span><span style='font-size:30px'>会员TOP10</span></span>
			</div>
			<div class='zj-style'>
				<span><span style='font-size:30px'>商品TOP10</span></span>
			</div>
		</div>
		<div class="bottomTable">
			<div style='width:100%;margin:0 10px;'>
				<ag-grid-vue style='width:100%;height:320px;border:1px solid #e4e4e4' class="ag-theme-balham is-full-widthag" 
		        :gridOptions="grid2"
		        :rowData="TOPCustomersData"
		        :columnDefs="TOPCustomersKey"
		        
		        ></ag-grid-vue>
		        <div class="page-box" v-if='Ctotal>10'>
				    <Page :total="Ctotal" show-total size='small' :pageSize='CpageSize'  @on-change="CgetData" ></Page>
			 	</div>
	        </div>
	        <div style='width:100%;margin:0 10px'>
	        	<ag-grid-vue style='width:100%;height:320px;border:1px solid #e4e4e4;' class="ag-theme-balham is-full-widthag" 
		        :gridOptions="grid3"
		        :rowData="TOPProductsData"
		        :columnDefs="TOPProductsKey"
		        
		        ></ag-grid-vue>
		        <div class="page-box" v-if='Ttotal.length>10'>
				    <Page :total="Ttotal" show-total size='small' :pageSize='TpageSize'  @on-change="TgetData" ></Page>
			 	</div>
	        </div>
	        
		</div>
    </div>
</template>
<script>
import echarts from 'echarts'
import { AgGridVue } from "ag-grid-vue";
export default {
	components:{
        AgGridVue
    },
    data(){
    	return {

    		lenOrders:0,
    		searchKeyword:"",
    		uid: this.$store.state.common.token,
    		totalOrders:0,//总订单数
			totalSales:0,//总销售订单
			totalCustomer:0,//总会员数


			todayOrders:0,//今日订单
			yesterdayOrders:0,//昨日订单
			OedersScale:0,//订单百分比

			todaySales:0,//今日销售订单
			yesterdaySales:0,//昨日销售订单
			SalesScale:0,//销售订单百分比

			todayCustomers:0,//今日会员数
			yesterdayCustomers:0,//昨日会员数
			CustomersScale:0,//昨日会员百分比
			
			//Lastest Orders
			AllOrderList:[],
			Ytotal:0,
			YpageSize:0,
			dataKey:[
				{
            		headerName:"Order ID",
            		field: 'orderNo',
            	},
            	{
            		headerName:"Customer",
            		field: 'customerName',
            	},
            	{
            		headerName:"Total",
            		field: 'listQty',
            	},
            	{
            		headerName:"Date Added",
            		field: 'createTime',
            	},
            	{
            		headerName:"Status",
            		field: 'statusDesc',
            	},
			],
			grid:{
                floatingFilter: true,
                enableFilter:true,
                enableSorting:true,
                animateRows:true,
                rowHeight:40,
                enableColResize:true,
                enableRangeSelection:true,
            },
            //TOP Customers
            TOPCustomersData:[],
            Ctotal:0,
			CpageSize:0,
			TOPCustomersKey:[
				{
            		headerName:"Code",
            		field: 'code',
            	},
            	{
            		headerName:"Customer",
            		field: 'name',
            	},
            	
            	{
            		headerName:"Orders Qty",
            		field: 'count',
            	},
            	{
            		headerName:"Amount",
            		field: 'amount',
            	},
            	{
            		headerName:"Mobile",
            		field: 'mobile',
            	},
			],

			grid2:{
                floatingFilter: true,
                enableFilter:true,
                enableSorting:true,
                animateRows:true,
                rowHeight:40,
                enableColResize:true,
                enableRangeSelection:true,
            },
            //TOP Products
            TOPProductsData:[],
            Ttotal:0,
			TpageSize:0,
			TOPProductsKey:[
				{
            		headerName:"Barcode",
            		field: 'barcode',
            	},
            	{
            		headerName:"SkuName",
            		field: 'skuName',
            	},
            	{
            		headerName:"SkuCount",
            		field: 'skuCount',
            	},
            	{
            		headerName:"Price",
            		field: 'price',
            	},
            	{
            		headerName:"Total",
            		field: 'qty',
            	},
            	{
            		headerName:"unitDesc",
            		field: 'unitDesc',
            	},
			],
			grid3:{
                floatingFilter: true,
                enableFilter:true,
                enableSorting:true,
                animateRows:true,
                rowHeight:40,
                enableColResize:true,
                enableRangeSelection:true,
            },
            map:null,
            mapOption:null,
            istrue:true,
            marker:null,
            //百度地图
            center: {
                lng: 116.404,
                lat: 39.915
            },
            zoom: 16,
            currentDrag:1,//拖动的++
            Crmtotal:0,
			CrmpageSize:0,
           	CrmData:[]//地图会员数据
			
    	}
    },
    methods:{
    	//设置地图参数
        handler({
                    BMap,
                    map
                }) {
            this.center.lng = 116.404;
            this.center.lat = 39.915;
            this.zoom = 15;
        },
    	//Sales Analytics
    	drawSales(){
    		let myEchartSales = echarts.init(document.getElementById('myEchartSales'),'westeros')
    		myEchartSales.showLoading();
    		this.axios.get('/statement/salesAnalytics?uid='+this.uid).then(res=>{
    			console.log(res)
    			if(res.data.status==200){
    				this.lenOrders=res.data.rows.length
    				let monthNum=[]//月份
    				let crms=[]//会员数
    				let sales=[]//销售数量
    				let orders=[]//订单数量
    				res.data.rows.forEach((x,index)=>{
    					monthNum.push(index+1)
						crms.push(res.data.rows[index].cus)
					
						// sales.push(res.data.rows[index].sales+1)
						sales.push(index+2)
    					// orders.push(res.data.rows[index].orders)
						orders.push(index+3)
					})
				
	    			let option={
						//提示框
					    tooltip : {
					    	axisPointer: {
					            type: 'cross'
					        }
					    },
					    legend: {
					    	left:'right',
					    	tyle:"scroll",
					        data:['Orders','Sales','Customers']
					    },
					    toolbox: {
					       	show: true,
				            orient: 'vertical',
				            left: 'right',
				            top: 'center',
					        feature : {
					            mark : {show: true},
					            dataView : {show: true, readOnly: false},
					            magicType : {
					                show: true, 
					                type: ['pie', 'funnel'],
					                option: {
					                    funnel: {
					                        x: '25%',
					                        width: '50%',
					                        funnelAlign: 'left',
					                        max: 1548
					                    }
					                }
					            },
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					     xAxis: {
					     	type:'category',
			                data:monthNum//时间数组
			            },
			            yAxis: {

			            },
			            series: [
			            	{
				                name: 'Orders',
				                type: 'line',
				                data:orders,//订单数量数组
				            
				            },
				            {
				                name: 'Sales',
				                type: 'bar',
				                data:sales,//销售数量数组
				             
				            },
				            {
				                name: 'Customers',
				                type: 'bar',
				                data:crms,//会员数量数组
				            
				            },
				            
			            ]
						};
					myEchartSales.setOption(option);
					myEchartSales.hideLoading(); //隐藏加载动画
	    		}
    		})
			
    	},
		//头部数字
		getTopNum(){
			this.axios.get('/statement/todayStatement?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data.rows
					this.totalOrders=data.orders//总订单数
					this.totalSales=data.sales//总销售订单
					this.totalCustomer=data.cus//总会员数

					this.todayOrders=data.todayOrder//今日订单
					this.yesterdayOrders=data.yesOrder//昨日订单
					this.OedersScale=data.ordersRatio//订单百分比

					this.todaySales=data.todaySales//今日销售订单
					this.yesterdaySales=data.yesSales//昨日销售订单
					this.SalesScale=data.salesRatio//销售订单百分比

					this.todayCustomers=data.todayCus//今日会员数
					this.yesterdayCustomers=data.yesCus//昨日会员数
					this.CustomersScale=data.cusRatio//昨日会员百分比
				}
			})
		},
		//最新订单
		getAllOrderToday(){
				this.axios.get('order/query/0?uid='+this.uid+'&timeType=1').then(res=>{
					if(res.data.status==200){
						this.AllOrderList=res.data.rows
						this.Ytotal=res.data.total
						this.YpageSize=res.data.pageSize
						let disQty=0
						this.AllOrderList.forEach((item,index)=>{
							item.createTime=this.getLocalTimeH(item.createTime)
							item.length=item.details.length
							item.details.forEach(x=>{
								disQty+=x.qty
							})
							item.listQty=disQty
							disQty=0
							this.getSt(item)
						})
					}
				})
			},
		getSt(item){
			switch(item.status){
				case 1:
					item.statusDesc=this.$t('orders.newOrder')
				break;
				case 10:
					item.statusDesc=this.$t('orders.ySure')
				break;
				case 20:
					item.statusDesc=this.$t('orders.yPay')
				break;
				case 23:
					item.statusDesc=this.$t('orders.orderDfh')
				break;
				case 30:
					item.statusDesc=this.$t('orders.orderYFH')
				break;
				case 50:
					item.statusDesc=this.$t('orders.shSuccess')
				break;
				case 99:
					item.statusDesc=this.$t('orders.iscancel')
				break;
			}
		},
		YgetData(current){
			this.axios.get('order/query/0?offset='+current+'&uid='+this.uid+'&timeType=1').then(res=>{
				if(res.data.status==200){
					this.AllOrderList=res.data.rows
					this.Ytotal=res.data.total
					this.YpageSize=res.data.pageSize
					let disQty=0
					this.AllOrderList.forEach((item,index)=>{
						item.createTime=this.getLocalTimeH(item.createTime)
						item.length=item.details.length
						item.details.forEach(x=>{
							disQty+=x.qty
						})
						item.listQty=disQty
						disQty=0
						this.getSt(item)
					})
				}
			})
		},
		//TOP Customers
		getCustomers(){
			this.axios.get('/statement/topCustomers?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data
					this.TOPCustomersData=data.rows
		            this.Ctotal=data.total
					this.CpageSize=data.pageSize
				}
			})
		},
		CgetData(current){
			this.axios.get('/statement/topCustomers?offset='+current+'&uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data
					this.TOPCustomersData=data.rows
		            this.Ctotal=data.total
					this.CpageSize=data.pageSize
				}
			})
		},
		//TOP Products
		getProducts(){
			this.axios.get('/statement/topProducts?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					 let data=res.data
					this.TOPProductsData=data.rows
		            this.Ttotal=data.total
					this.TpageSize=data.pageSize
				}
			})
		},
		TgetData(current){
			this.axios.get('/statement/topProducts?offset='+current+'&uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data
					this.TOPProductsData=data.rows
		            this.Ttotal=data.total
					this.TpageSize=data.pageSize
				}
			})
		},
		
    },
    mounted(){
		// this.getTopNum()//头部
		// this.drawSales()//图表
		this.getAllOrderToday()//最新订单
		// this.getCustomers()//top 会员
		// this.getProducts()//top商品
    	
    }
}
</script>
<style scoped>
.main{
	width:100%;
	height:100%;
	overflow: auto;
}
.head-bottom1{
	display:flex;
	flex-wrap: wrap;
}
.head-bottom1-li{
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 4px;
   	box-shadow: 0 1px 3px #ccc;
    margin:10px 10px 0 10px;
    font-family:'Times New Roman', Times, serif
}
li{
	list-style: none
}
.car-body{
	padding:5px 10px;
	text-align: center;
	background: #00CCCC;
	/*background: #5A71F5;*/
}

.f-50{
	font-size:55px;
	color:#fff;
}
.font-weight-100{
	font-weight:600;
}
.scale{
	margin-top:10px;
}
.car-body .titleN{
	color:#fff;
	font-size:16px;
	margin-top:-15px;
}
.bottomN{
    display: flex;
    justify-content: space-between;
    align-items: center;
	padding:15px 0 15px 5px;

}
.bottomN div{
	margin-left: -65px;
}
.u10_img{
	width:100%;
	height:100%;
	vertical-align: middle;
}
.smallN{
	color:#fff;
	display: flex;
	justify-content: space-between;
}
.smallN .font-size16{
	font-size:18px;
}
.echarts{
	width:100%;
	display:flex;
	justify-content: space-around;
}
.zj{
	width:100%;
	display:flex;
	margin: 20px;
	justify-content: space-around;
}
.zj-style{
	width:100%;
	margin:0 5px;
}
.zj-style>span{
	display:block;
	border-bottom:none;
	width:100%;
	height:40px;
	line-height: 40px;
	text-align: left
}
.bottomTable{
	display: flex;
	margin-bottom:120px;
}
.CustomerMap{
	margin:30px 10px 10px 10px;
}
.page-box{
	margin:10px 20px 10px 10px;
	text-align: right
}
.page-box-position{
	position: absolute;
	top:320px;
	right:20px;
}
.map-box{
	height:600px;
}
</style>
