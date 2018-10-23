<template>
	<div class='jxc'>
		<div class='head'>
			<Input style='width:70%;' placeholder='扫码查询/商品编码/条码/名称'></Input><span>查询商品</span>
		</div>
		<!--头部三个-->
		<div class='head-bottom1'>
			<li class='head-bottom1-li'>
				<div>
					<span style='font-size:16px'>{{kcTotal}}</span>
					<div  style='margin-top:5px'>库存总量</div>
				</div>
				<div style='margin-top:20px'>
					<span style='font-size:16px'>{{kcPric}}</span>
					<div style='margin-top:5px'>库存成本</div>
				</div>
				<span style='cursor:pointer' class='loop'><Icon type="loop" style='color:#924032' size=16></Icon></span>
			</li>
			<li class='head-bottom1-li' style='background:#5BC0DE'>
				<div>
					<span style='font-size:16px'>685645</span>
					<div  style='margin-top:5px'>本年采购额</div>
				</div>
				<div style='margin-top:20px'>
					<span style='font-size:16px'>234343</span>
					<div style='margin-top:5px'>本月采购额</div>
				</div>
				<span style='cursor:pointer' class='loop'><Icon type="loop" style='color:#924032' size=16></Icon></span>
			</li>
			<li class='head-bottom1-li' style='background:#FFB752'>
				<div>
					<span style='font-size:16px'>45555555532</span>
					<div  style='margin-top:5px'>库存总量</div>
				</div>
				<div style='margin-top:20px'>
					<span style='font-size:16px'>545424324</span>
					<div style='margin-top:5px'>库存成本</div>
				</div>
				<span style='cursor:pointer' class='loop'><Icon type="loop" style='color:#924032' size=16></Icon></span>
			</li>
		</div>
		<!--下方第一排图表-->
		<div class='echarts'>
			<!--仓库销售-->
			<div id="myEchart" style="width: 100%;margin:10px;border:1px solid #ccc;">
				
			</div>

			<!--机构销售-->
			<div id="myEchartjg" style="width: 100%;margin:10px;border:1px solid #ccc;;"></div>
			
		</div>
		<!--下方第二排图表-->
		<div class='echarts echarts1'>
			<!--采购成本销售-->
			<div id="myEchartcg" style="width: 100%;margin:10px;border:1px solid #ccc;;"></div>
			<!--采购成本销售-->
			<div id="myEchartcgfx" style="width: 100%;margin:10px;border:1px solid #ccc;"></div>
		</div>
		<!--下方第二排图表-->
		<div class='echarts echarts2'>
			<!--采购成本销售-->
			<div id="myEchartkc" style="width: 100%;margin:10px;border:1px solid #ccc;;"></div>
			<!--采购成本销售-->
			
		</div>
	</div>
</template>
<script type="text/javascript">
import echarts from 'echarts'
export default {
	name:'jxc',
	data(){
		return{
			uid: this.$store.state.common.token,
			kcTotal:0,//库存总量
			kcPric:0,//库存成本
		}
	},
	methods:{
		getInfo(){

		},
		//仓库销售
		draw(){
			let myEchart = echarts.init(document.getElementById('myEchart'),'shine')
			let option={
					title:{
						text:"本季度-仓库销售比较分析",
						 x: 'center',
					},
				    tooltip : {
				    	trigger: 'axis',
				        formatter: "{b} : {c}"
				    },
				    toolbox: {
				        show : true,
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
				    legend: {
				       

				    },
				       xAxis: [
				      
				      	{
			      			 type : 'category',
			      			data:['广州仓库','上海仓库','北京仓库','烟台仓库','南京仓库','苏州仓库','内蒙仓库','总仓','东北仓库'],
			      			//文字过多倾斜显示
			      			axisLabel: {  
							   interval:0,  
							   rotate:40  
							}  
			      		}
				      ],
		            yAxis: {
		            	
		            },
		            series: [{
		              	name:'销售额度',
		                type: 'bar',
		                data: [2126,3224,434,4544,4322,1224,5558,3625,1277],
		                itemStyle: {
				                normal: {
				                    color: function(params) {
				                        // build a color map as your need.
				                        var colorList = [
				                          '#27727B',
				                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
				                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
				                        ];
				                        return colorList[params.dataIndex]
				                    },
				                    label: {
				                        show: true,
				                        position: 'top',
				                        // formatter: '{b}\n{c}'
				                    }
				                }
				            },
		            },
		            
		            ]
				}
				 myEchart.setOption(option);
		},
		//机构销售
		drawjg(){
			let myEchartjg = echarts.init(document.getElementById('myEchartjg'),'shine')
			let option={
					title:{
						text:"本季度-机构销售比较分析",
						 x: 'center',
					},
				    tooltip : {
				    	trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    toolbox: {
				        show : true,
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
				    legend: {
				       

				    },
				      xAxis: [
				      
				      	{
			      			 type : 'category',
			      			data:['广州仓库','上海仓库','北京仓库','烟台仓库','南京仓库','苏州仓库','内蒙仓库','总仓','东北仓库'],
			      			//文字过多倾斜显示
			      			axisLabel: {  
                               interval: 0,  
                               formatter:function(value)  
                               {  
                                   return value.split("").join("\n");  
                               }  
                           }  
			      		}
				      ],
		            yAxis: {
		            	
		            },
		            series: [{
		              	
		                type: 'line',
		                data: [2126,3224,4444,4585,2566,11225,8888,6624,1144],
		                itemStyle: {
				                normal: {
				                    color: function(params) {
				                        // build a color map as your need.
				                        var colorList = [
				                          
				                         '#B5C334','#27727B', '#FE8463','#9BCA63','#FCCE10','#E87C25','#FAD860','#F3A43B','#60C0DD'
				                        ];
				                        return colorList[params.dataIndex]
				                    },
				                    label: {
				                        show: true,
				                        position: 'top',
				                        formatter: '{b}'
				                    }
				                }
				            },
		            },
		            
		            ]
				}
				 myEchartjg.setOption(option);
		},
		//采购成本构成销售
		drawcg(){
			let myEchartcg = echarts.init(document.getElementById('myEchartcg'),'shine')
			let option = {
				    title : {
				        text: '本季度-采购成本构成分析',
				        
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient : 'vertical',
				        x : 'left',
				        data:['家具','鞋子','帽子','衣服','水果']
				    },
				    toolbox: {
				        show : true,
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
				    calculable : true,
				    series : [
				        {
				            name:'采购量',
				            type:'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:[
				                {value:335, name:'家具'},
				                {value:310, name:'鞋子'},
				                {value:234, name:'帽子'},
				                {value:135, name:'衣服'},
				                {value:1548, name:'水果'}
				            ]
				        }
				    ]
				};

			
				 myEchartcg.setOption(option);
		},
		//采购比较分析
		drawcgfx(){
			let myEchartcgfx = echarts.init(document.getElementById('myEchartcgfx'),'shine')
			let option={
					title:{
						text:"采购比较分析",
						 x: 'center',
					},
				    tooltip : {
				    	trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} "
				    },
				    toolbox: {
				        show : true,
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
				    legend: {
				       

				    },
				      xAxis: [
				      
				      	{
			      			 type : 'category',
			      			data:['广州仓库','上海仓库','北京仓库']
			      		}
				      ],
		            yAxis: {
		            	
		            },
		            series: [{
		              	name:'采购比较分析',
		                type: 'bar',

		                data: [2126,3224,4444],
		                   itemStyle: {
				                normal: {
				                    color: function(params) {
				                        // build a color map as your need.
				                        var colorList = [
				                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
				                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
				                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
				                        ];
				                        return colorList[params.dataIndex]
				                    },
				                    label: {
				                        show: true,
				                        position: 'top',
				                        // formatter: '{b}\n{c}'
				                    }
				                }
				            },
		            },
		            
		            ]
				}
                    
				 myEchartcgfx.setOption(option);
		},
		//库存成本分析
		drawkc(){
			let myEchartkc = echarts.init(document.getElementById('myEchartkc'),'shine')
			let option={
					title:{
						text:"库存构成成本分析",
						 x: 'center',
					},
				    tooltip : {
				    	trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} "
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				           
				            restore : {show: true},
				          
				        }
				    },
				    legend: {
				       

				    },
				      xAxis: [
				      
				      	{
			      			 type : 'category',
			      			data:['广州仓库','上海仓库','北京仓库']
			      		}
				      ],
		            yAxis: {
		            	
		            },
		            series: [{
		              	name:'库存构成成本分析',
		                type: 'bar',

		                data: [2126,3224,4444],
		                   itemStyle: {
				                normal: {
				                    color: function(params) {
				                        // build a color map as your need.
				                        var colorList = [
				                         
				                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
				                         
				                        ];
				                        return colorList[params.dataIndex]
				                    },
				                    label: {
				                        show: true,
				                        position: 'top',
				                        // formatter: '{b}\n{c}'
				                    }
				                }
				            },
		            },
		            
		            ]
				}
                    
				 myEchartkc.setOption(option);
		},
		//获取库存
		getkc(){
			this.axios.get('inventory/query?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.kcTotal=res.data.total
				}
			})
		},
	},
	created(){
		this.$nextTick(()=>{
			this.draw()//第1个表
			this.drawjg()//第2个表
			this.drawcg()//第3个表
			this.drawcgfx()//第4个表
			this.drawkc()//第5个表
			this.getkc()//获取库存
		})
	},
	mounted(){
		
	}
}
</script>
<style type="text/css" scoped>
.jxc{
	width:100%;
	height:100%;
	overflow: auto;
	/*border:1px solid red;*/
}
.head{
	display:flex;
	justify-content: center;
	align-items: center;
	height:35px;
	line-height: 35px;
	margin-top:10px;
}

.head span{
	width:100px;
	text-align: center;
	height:33px;
	line-height: 33px;
	background: #169BD5;
	border-radius:6px;
	color:#fff;
	margin-left:10px;
}
.head-bottom1{
	display:flex;
	flex-wrap: wrap;
	border-bottom:1px solid #e4e4e4;
}
.head-bottom1-li{
	position:relative;
	width:240px;
	padding:10px 30px;
	margin:10px;
	
	color:#fff;
	background: #D15B47
}
.loop{
	position:absolute;
	top:10px;
	right:10px;
}
.echarts{
	width:100%;
	
	display:flex;
	justify-content: space-around;
	
	
}
.echarts2{
	margin-top:10px;
	margin-bottom:340px;
}
</style>
<style type="text/css">
li{
	list-style: none
}
</style>