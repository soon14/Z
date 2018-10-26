<template>
    <div>
    	<main class="main" >
	        <div class="head-top">
	        	<div style="display: flex;">
		        	<a :href="backUrl" target="_blank"><img src="http://img.zsydian.com/icon/logoin.png" width='50' height='50' style="margin-top:6px"></a>
		        	<div style="margin-left:10px">
	                   <h1 style="margin:0;color:rgba(45,139,241,0.9)">智胜云</h1>
                        <p style=";color:rgba(45,139,241,0.7)">助力零售数智化转型</p>
	                </div>
                </div>
	        	<span>{{user.trueName}}</span>
	        </div>
	        <section class="lists">
				<h4 class="top-h4">产品</h4>
				<ul class="main-list">
					<li v-for="(item,index) in products" :key='index' >
						<div class="img-icon">
							<img :src="item.userSef01"/>
						</div>
						<div class="li-bottom">
							<span>{{item.fDescription}}</span>  
							<a :href="item.userSef02" target='_blank'>了解更多</a>
						</div>
						<div style="margin-top:20px;" @click="gotoProductPath(item)">
							<span  class="li-button">立即创建</span>
						</div>
					</li>
				</ul>
			</section>
			<section class="lists">
				<h4>行业方案</h4>
				<ul class="main-list">
					<li v-for="(item,index) in industrys" :key='index' >
						<div class="img-icon">
							<img :src="item.icon"/>
						</div>
						<div class="li-bottom">
							<span>{{item.desc}}</span>
						</div>
						<div style="margin-top:20px;" @click="gotoIndustrysPath(item,index)">
							<span class="li-button">立即创建</span>
						</div>
					</li>
				</ul>
			</section>
        </main>
       
    </div>
</template>
<script>
import LoadUrl from '@/components/common/actionLoad'

    export default {
        data(){
            return{
            	backUrl:LoadUrl.Website.OffProd,//官网
            	uid: this.$store.state.common.token,
				user:this.$store.state.common.user,
				//产品
				products:[],
				//行业方案
				industrys:[
					{
						name:"鞋服新零售",
						icon:"http://img.zsydian.com/icon/xiefu.png",
						value:1,
						desc:"面向线下零售门店的一体化全渠道零售解决方案"
					},
					// {
					// 	name:"美妆新零售",
					// 	icon:"",
					// 	value:2,
					// 	desc:"专注于美容美发美甲行业，门店展示效果酷炫，吸引附近客流到店，社交激励让技师和客户都变成专属业务员。"
					// },
					{
						name:"母婴新零售",
						icon:"http://img.zsydian.com/icon/moying.png",
						value:1,
						desc:"母婴"
					},
					// {
					// 	name:"食品新零售",
					// 	icon:"",
					// 	value:2,
					// 	desc:"针对餐饮行业的小程序+公众号完整解决方案，包含会员、营销、点餐、外卖、微商城等提升营收的必备神器。"
					// },
					{
						name:"烘焙新零售",
						icon:"http://img.zsydian.com/icon/hongbei.png",
						value:1,
						desc:"烘焙"
					},
					{
						name:"外卖新零售",
						icon:"http://img.zsydian.com/icon/waimai.png",
						value:1,
						desc:"商家自己的零佣金外卖小程序，轻松触达附近微信用户，线上快速下单，门店自动出单，对接多个物流配送平台"
					},
					// {
					// 	name:"智慧护理",
					// 	icon:"http://img.zsydian.com/icon/huli_industry.png",
					// 	value:271,
					// 	desc:"智慧护理"
					// },
				],
            }
        },
        methods:{
        	//产品跳转
        	gotoProductPath(item){
        		this.$router.push({
        			path:'/editIndustry',
        			query:{
        				value:item.fAppCode
        			}
        		})
        	},
        	//行业方案跳转
        	gotoIndustrysPath(item,index){
        		// this.$router.push({
        		// 	path:'/editIndustry',
        		// 	query:{
        		// 		value:item.value
        		// 	}
        		// })
        	},
        	 //产品
	    	getProducts(){
	    		this.axios.get('app/web?uid='+this.uid).then(res=>{
	    			if(res.data.status==200){
	    				let data=res.data
	    				this.products=data.rows
	    			}
	    		})
	    	}
        },

        mounted(){
        	//产品
        	this.getProducts()
        }
    }
</script>
<style scoped>
.main{
	height:100%;
	overflow-y:scroll;
}
.main-list{
	padding:0 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content:flex-start;
	height:100%;
	
}
.main-list li{
	width:260px;
	text-align: center;
	margin-left:50px;
	margin-top:15px;
	padding:10px;
	transition: all 0.5s;
	-moz-transition: all 0.5s; 
	-webkit-transition: all 0.5s; 
	-o-transition: all 0.5s; 
}
.main-list li:hover{
	background: rgba(0,0,0,.06);
	border-radius: 6px;

}
.head-top{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:0 25px;
	height:60px;
	
	box-shadow: 0 0 10px #ccc;
	position: fixed;
	background-color: #fff;
	width:100%;
	z-index: 3;
}
.head-top img{
	vertical-align: middle;
}
.img-icon{
	height:150px;
	background: #2589FF;
	border-radius:6px;
	color:#fff;
}
.img-icon img{
	width:100%;
	height:100%;
}
.img-icon:hover{
	cursor: pointer
}
.img-con-title{
	font-size:25px;
}
li{
	list-style: none
}
.lists{
	padding: 20px;
}
.li-button{
	display: block;
	background: rgba(255,255,255,0);
    border: 1px solid #2589FF;
    border-radius: 6px;
    height: 46px;
  	
    font-size: 16px;
    color: #2589FF;
    margin: 0;
    text-align: center;
    line-height: 46px;
    padding: 0;
}
.li-bottom{
	height: 66px;
	text-align: left;
	color: #42494B;
	line-height: 22px;
	margin-top:10px;
	margin-bottom:10px;
}
.li-button:hover{
	color: #fff;
    background: #2589FF;
    cursor: pointer
}
h4{
	font-size: 16px;
	padding:10px;
    color: #42494B;
    font-weight: 700;
    line-height: 26px;
    
}
.top-h4{
	margin-top: 80px
}

</style>
