<template>
	<div class="wxBaseInfo">
		<div >
			<div class='head-bottom1'>
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >未读消息</span>
						<h3 class="f-50 font-weight-100">0</h3>
					</div>
				</li>
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >昨日新增粉丝</span>
						<h3 class="f-50 font-weight-100">0</h3>
					</div>
				</li>
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >昨日跑路粉丝</span>
						<h3 class="f-50 font-weight-100">0</h3>
					</div>
				</li>
				
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >昨日总粉丝</span>
						<h3 class="f-50 font-weight-100">0</h3>
					</div>
				</li>
				
	    	</div>
			<div  class="top-center">
				<div>
					<span class="qs">&nbsp;&nbsp;微信粉丝增减趋势</span>
					<!-- <Icon type="help-circled" size="16" style="color:#CACACA"></Icon> -->
	
				</div>
				<!-- <div><a>学习如何高校吸粉！</a></div> -->
			</div>
			<!--图表-->
			<div style='position:relative'>
				<div id="myEcharts1" style="width: 98%;margin:10px auto;border:1px solid #ccc;height: 300px;"></div>
				<div v-if='len2==0'  style="position:absolute;left:50%;top:25%">{{$t('public.NoData')}}</div>
			</div>
			<div  class="top-center bottom">
				<div>
					<span class="qs">&nbsp;&nbsp;微信互动趋势</span>
					<!-- <Icon type="help-circled" size="16" style="color:#CACACA"></Icon> -->
				</div>
				
			</div>
			<!--图表-->
			<div style='margin-bottom:120px;position:relative'>
				<div id="myEcharts2" style="width: 98%;margin:10px auto;border:1px solid #ccc;height: 300px;"></div>
				<div v-if='len2==0'  style="position:absolute;left:50%;top:25%">{{$t('public.NoData')}}</div>
			</div>
		</div>
		
	</div>
</template>
<script type="text/javascript">
import echarts from 'echarts'
	export default{
		data(){
			return{
				len1:0,
				len2:0,
			}
		},
		methods:{
			//图表
			draw1(){
				let myChart = echarts.init(document.getElementById('myEcharts1'),'shine')
				this.len1=0
				let option={
						title:{
							text:"微信粉丝增减趋势",
							 x: 'center',
						},
						//提示框
					    tooltip : {
					    	axisPointer: {
					            type: 'cross'
					        }
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
			                data: []
			            },
			            yAxis: {},
			            series: [
				            {
				                name: '',
				                type: 'line',
				                data:[],//数量数组
				                
				                itemStyle: {
				                normal: {
				                  
				                    label: {
				                        show: true,
				                        position: 'top',
				                        formatter: '{c}'
				                    }
				                }
				            },
				            },
			            ]
					};
				 myChart.setOption(option);
			},
			//图表
			draw2(){
				let myChart = echarts.init(document.getElementById('myEcharts2'),'shine')
				this.len2=0
				let option={
						title:{
							text:"微信互动趋势",
							 x: 'center',
						},
						
						//提示框
					    tooltip : {
					    	axisPointer: {
					            type: 'cross'
					        }
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
			                data: []
			            },
			            yAxis: {},
			            series: [
				            {
				                name: '',
				                type: 'line',
				                data:[],//数量数组
				                
				                itemStyle: {
				                normal: {
				                  
				                    label: {
				                        show: true,
				                        position: 'top',
				                        formatter: '{c}'
				                    }
				                }
				            },
				            },
			            ]
					};
				 myChart.setOption(option);
			}
		},
		mounted(){
			//绘制图表
			this.draw1()
			this.draw2()
		}
	}
</script>
<style type="text/css" scoped>
.wxBaseInfo{
	/*height:auto;*/
	padding-top:10px;
}
.top{
	display:flex;
	width:98%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	background:#F8F8F8;
	padding:24px;
	/*margin-top:10px;*/
}
.top-center{
	width:98%;
	margin: 0 auto;
	margin-top:20px;
	background:#F8F8F8;
	padding:10px;
	display:flex;
	justify-content: space-between;
}
.bottom{
	margin-top:0px;

}
.qs{
	border-left:4px solid #FF6600;
	padding:2px;
	margin-right:5px;
}
.head-bottom1{
	display:flex;
	flex-wrap: wrap;
	margin: 10px;
}
.head-bottom1-li{
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
   	width:200px;
    margin:10px 10px 0 10px;

}
li{
	list-style: none
}
.car-body{
	padding: 1.25rem;

}
.car-body span{
	color:#666f73;

}
.f-50{
	font-size:35px;
}
.font-weight-100{
	font-weight:100;
}
</style>