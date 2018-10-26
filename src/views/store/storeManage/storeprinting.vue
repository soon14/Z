<template>
	<div>
		<!--打印信息-->
		<div class="table">
			<Breadcrumb class='dytitle'>
	            <BreadcrumbItem style='margin-left:20px'>打印设置</BreadcrumbItem>
	        </Breadcrumb>
			<div style='margin:10px'>
				<div class="public">
					<h4>硬件链接</h4>
					<ul class="main">
						<li v-for="(item,index) in promotionalTools" :key='index' @click='clickDevice(index)'>
							<div class="img-icon img-icon-promotional">
								<img :src="item.icon" width='36' height='35'/>
							</div>
							<div class="li-right">
								<span class='title-name'>{{item.name}}</span>
								<span class='des'>{{item.des}}</span>
							</div>
							<Icon type="chevron-right" style='position: relative;right: -10px;'></Icon>
						</li>
					</ul>
				</div>
				<div class="public">
					<h4>模板设置</h4>
					<ul class="main">
						<li v-for="(item,index) in templeteTools" :key='index' @click='clickStoreLabel(index)'>
							<div class="img-icon img-icon-templete">
								<img :src="item.icon" width='36' height='35'/>
							</div>
							<div class="li-right">
								<span class='title-name'>{{item.name}}</span>
								<span class='des'>{{item.des}}</span>
							</div>
							<Icon type="chevron-right" style='position: relative;right: -10px;'></Icon>
						</li>
					</ul>
				</div>
				<div class="public" style="margin-bottom: 120px;">
					<h4>店铺图码</h4>
					<ul class="main">
						<li v-for="(item,index) in barcodeTools" :key='index' @click='clickStoreCode(index)'>
							<div class="img-icon img-icon-templete">
								<img :src="item.icon" width='36' height='35'/>
							</div>
							<div class="li-right">
								<span class='title-name'>{{item.name}}</span>
								<span class='des'>{{item.des}}</span>
							</div>
							<Icon type="chevron-right" style='position: relative;right: -10px;'></Icon>
						</li>
					</ul>
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
				promotionalTools:[
		        	{
						icon:'http://img.zsydian.com/icon/store_dyj.png',
						name:"打印机",
						des:"链接打印机设备，打印小票和商品标签"
					}
		        ],
		        templeteTools:[
		        	{
						icon:'http://img.zsydian.com/icon/store_ht.png',
						name:"收银/订单小票",
						des:"打印小票"
					},
					{
						icon:'http://img.zsydian.com/icon/store_b1.png',
						name:"商品标签",
						des:"商品标签二维码，无缝链接线上线下"
					},
		        ],
		        barcodeTools:[
		        	{
						icon:'http://img.zsydian.com/icon/store_ht.png',
						name:"店铺二维码",
						des:"顾客扫一扫，进入小店微商品线上购物"
					},
					{
						icon:'http://img.zsydian.com/icon/store_b1.png',
						name:"店铺小程序码",
						des:"顾客扫一扫，立刻体验小程序下单"
					},
					{
						icon:'http://img.zsydian.com/icon/store_b1.png',
						name:"员工二维码",
						des:"员工二维码"
					},
		        ]
			}
		},
		methods:{
			//打印机
			clickDevice(i){
				switch(i){
					case 0:
						this.device()
					break;
				}
			},
			device(){
				this.$router.push('/device')
			},
			//点击店铺二维码
			clickStoreCode(i){
				switch(i){
					//店铺
					case 0:
						this.storeCode()
					break;
					//小程序
					case 1:
						this.storeX()
					break;
					//员工二维码
					case 2:
						this.$router.push('/storeEmployee')
					break;
				}
			},
			//店铺二维码
			storeCode(){
				this.$router.push('/storeCode')
			},
			//小程序二维码
			storeX(){
				this.$router.push('/storeX')
			},
			dggetData(current){

			},
			dgchangePageSize(size){

			},
			//模板
			clickStoreLabel(i){
				switch(i){
					//收银/订单小票
					case 0:
						this.caseLabel()
					break;
					//商品标签
					case 1:
						this.goodsLabel()
					break;
				}
			},
			//收银/订单小票
			caseLabel(){
				this.$router.push('/caseLabel')
			},
			//商品标签
			goodsLabel(){
				this.$router.push('/goodsLabel')
			},

		},
		mounted() {
			
		}
	}
</script>
<style type="text/css" scoped>
.dytitle{
	display: block;
	height:50px;
	line-height: 50px;
	background: #F9F9F9;
	font-weight:900;
}
.img-icon{
    width: 50px;
    height: 50px;
    position: relative;
    border-radius: 6px;
    text-align: center;
    padding: 10px 0;
    line-height: 50px;
}
.li-right{
	padding-left:15px;
	width:280px;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.title-name{
	display:block;margin-bottom:4px;font-weight:600
}
.des{
	color:#999;
}
.img-icon-promotional{
	background: #108EE9
}
.img-icon-templete{
	 background: #F36A5A;
}
.main{
	width:100%;
	display:flex;
	flex-wrap: wrap;
	
}
.main li{
	cursor:pointer
}

.main li{
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: start;
    justify-content: flex-start;
    height: 70px;
    margin: 10px;
    padding: 0 35px 0 15px;
    border: 1px solid #f5f5f5;
    transition: all 0.5s;
}
.main li:hover{
	box-shadow: 0 2px 20px #ccc;

}
</style>