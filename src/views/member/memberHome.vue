
<template>
	<div class='crm'>
		<div class='head'>
			<div class='crm-top'>
				<ul class="top-ul">
					<mu-paper class="demo-paper list" :z-depth="1">
						<span class="myCrmTtitle">我的会员（人）</span>
						<div class="myCrmNum"></div>
						
						<ul class="myCrmBottom" style="border-top:1px solid #EFF3F6">
							<li style="border-right:1px solid #EFF3F6">
								<span  class="crmNum crmNum1"></span>
								<span>活跃会员（人）</span>
							</li>
							<li>
								<span class="crmNum crmNum2"></span>
								<span>沉默会员（人）</span>
							</li>
						</ul>
						<ul class="myCrmBottom" style="border-top:1px solid #EFF3F6">
							<li style="border-right:1px solid #EFF3F6">
								<span  class="crmNum crmNum3"></span>
								<span>睡眠会员（人）</span>
							</li>
							<li>
								<span  class="crmNum crmNum4"></span>
								<span>流失会员（人）</span>
							</li>
						</ul>
					</mu-paper>
					<mu-paper class="demo-paper list" :z-depth="1">
						<div class="myCrmTtitle">
							<span>会员消费占比（30天）</span>
							<Select v-model="model" size="small" style="width:100px" @on-change="changeDay">
						        <Option v-for="item in dateList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
						    </Select>
						</div>
						<div class="center-money">
							<ul class="moneykh">
								<i-circle :percent="consumptionRat" :size="160" dashboard :trail-width="13" :stroke-width="13" stroke-color="#FF5354">
							        <span class="demo-circle-inner fontSizeNum" style="color:#FF5354"><span id="n1"></span>%</span>
							        <p style="margin-top:5px">会员消费占比</p>
							    </i-circle>
						    </ul>
						    <ul class="moneykh">
						    	<li>
						    		<span>消费顾客（人）</span>
						    		<span  class="crmNumCenter crmNumCenter1"></span>
						    	</li>
						    	<li style="padding: 10px 0;">
						    		<span>消费会员（人）</span>
						    		<span  class="crmNumCenter crmNumCenter2"></span>
						    	</li>
						    </ul>
					    </div>
					</mu-paper>
					<mu-paper class="demo-paper list" :z-depth="1">
						<div class="myCrmTtitle">
							<span>会员转化率（30天）</span>
							<Select v-model="model2" size="small" style="width:100px" @on-change="changeDay2">
						        <Option v-for="item in dateList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
						    </Select>
						</div>
						<div class="center-money">
							<ul class="moneykh">
								<i-circle :percent="conversionRate" :size="160" dashboard :trail-width="13" :stroke-width="13" stroke-color="#3679FA">
							        <span class="demo-circle-inner fontSizeNum" style="color:#3679FA"><span id="n2"></span>%</span>
							        <p style="margin-top:5px">会员转化率</p>
							    </i-circle>
						    </ul>
						    <ul class="moneykh">
						    	<li>
						    		<span>新增顾客（人）</span>
						    		<span  class="crmNumCenter3 crmNumCenter31"></span>
						    	</li>
						    	<li style="padding: 10px 0;">
						    		<span>新增会员（人）</span>
						    		<span  class="crmNumCenter3 crmNumCenter32"></span>
						    	</li>
						    </ul>
					    </div>
					</mu-paper>
					  
				</ul>
			</div>
		</div>
		<!--下方第一排图表-->
		<div class='echarts' style='position:relative'>
			<!--店铺会员Top10-->
			<div id="myEchartshop" style="width: 100%;margin:0 5px;border:1px solid #ccc;">
			</div>
			<!--导购-->
			<div id="myEchartcrm" style="width: 100%;margin:0 5px;border:1px solid #ccc;;"></div>
			<div v-if='lenStore==0'  style="position:absolute;left:25%;;top:25%">{{$t('public.NoData')}}</div>
			<div v-if='len==0'  style="position:absolute;left:75%;;top:25%">{{$t('public.NoData')}}</div>
		</div>
	
		<div class='zj'>
			<div class='zj-style'>
				<span><span style='margin-left:10px'>性别</span></span>
			</div>
			<div class='zj-style'>
				<span><span style='margin-left:10px'>会员等级</span><span style='margin-left:10px'>
				</span></span>
			</div>
		</div>
		<div class='echarts echarts2' style='position:relative'>
			<!--性别-->
			<div id="myEchartkh" style="width: 100%;margin:0 5px;border:1px solid #ccc;"></div>
			<!--会员等级-->
			<div id="myEchartvip" style="width: 100%;margin:0 5px;border:1px solid #ccc;;"></div>
			<div v-if='lenGender==0'  style="position:absolute;left:25%;;top:25%">{{$t('public.NoData')}}</div>
			<div v-if='lenLevel==0'  style="position:absolute;left:75%;;top:25%">{{$t('public.NoData')}}</div>
		</div>
		<div class='zj'>
			<div class='zj-style'>
				<span><span style='margin-left:10px'>年龄分布</span></span>
			</div>
			<div class='zj-style'>
				<span><span style='margin-left:10px'>地址分布</span><span style='margin-left:10px'>
				</span></span>
			</div>
		</div>
		<div class='echarts echarts2' style='position:relative'>
			<!--年龄-->
			<div id="myEcharage" style="width: 100%;margin:0 5px;border:1px solid #ccc;"></div>
			<!--地址分布-->
			<div id="myEchartAddress" style="width: 100%;margin:0 5px;border:1px solid #ccc;;"></div>
			<div v-if='lenAddress==0'  style="position:absolute;left:75%;;top:25%">{{$t('public.NoData')}}</div>
			<div v-if='lenage==0'  style="position:absolute;left:25%;;top:25%">{{$t('public.NoData')}}</div>
		</div>
		<div class='zj'>
			<div class='zj-style'>
				<span><span style='margin-left:10px'>来源分析</span></span>
			</div>
			<div class='zj-style'>
				<span><span style='margin-left:10px'>增长趋势</span><span style='margin-left:10px'>
				</span></span>
			</div>
		</div>
		<div class='echarts echarts3' style='position:relative'>
			<!--来源分析-->
			<div id="myEcharForm" style="width: 100%;margin:0 5px;border:1px solid #ccc;"></div>
			<!--增长趋势-->
			<div id="myEchartAdd" style="width: 100%;margin:0 5px;border:1px solid #ccc;;"></div>
			<div v-if='lenForm==0'  style="position:absolute;left:25%;;top:25%">{{$t('public.NoData')}}</div>
			<div v-if='lenadd==0'  style="position:absolute;left:75%;;top:25%">{{$t('public.NoData')}}</div>
		
		</div>
	</div>
</template>
<script type="text/javascript">
import echarts from 'echarts'
import bounty from "bounty";
export default{
	
	data(){
		return{
			len:0,
			lenStore:0,
			lenGender:0,
			lenLevel:0,
		
			lenAddress:0,
			lenForm:0,
			lenadd:0,
			lenage:0,

			AllCrmNum:0,//总会员
			ActiveCrmNum:0,//活跃会员
			CilentCrmNum:0,//沉默会员
			SleepCrmNum:0,//睡眠会员
			LossCrmNum:0,//流失会员
			consumptionRat:0,//会员消费占比
			conversionRate:0,//会员转化率
			monthCount:0,//本月新增人员
			todayCount:0,//今日新增会员
			yesCrmCount:0,//昨日会员

			newCustomer:0,// 新增顾客 
			newCrm:0,//新增会员

			consumptionCustomer:0, //消费顾客 
			consumptionCrm:0,//消费会员 

			model:2,
			model2:2,
			dateList2:[
				{
					label:"当日",
					value:0
				},
				{
					label:"7日",
					value:1
				},
				{
					label:"30日",
					value:2
				},
			],
			dateList3:[
				{
					label:"当日",
					value:0
				},
				{
					label:"7日",
					value:1
				},
				{
					label:"30日",
					value:2
				},
			],
			totayCrm:0,
			monthCrm:0,
			uid: this.$store.state.common.token,
			AllCrm:{},//所有会员
			numIndex:-1,
			Crmtitle:"",//会员描述
			
		}
	},
	methods:{
		//店铺
		drawshop(){
			let myEchartshop = echarts.init(document.getElementById('myEchartshop'),'shine')
			myEchartshop.showLoading();
			this.axios.get('statement/crmStatement?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.lenStore=res.data.rows.length
					let storeName=[]//门店名称
					let storeCrm=[]//门店会员
					this.storeData=res.data.rows
					res.data.rows.forEach((x,index)=>{
						storeName.push(res.data.rows[index].storeName)
						storeCrm.push(res.data.rows[index].crmCount)
					})
					let option={
						title:{
							text:"店铺会员Top10",
							
							 x: 'center',
						},
					    tooltip : {
					    	trigger: 'axis',
					        // formatter: "{a} <br/>{c}"
					    },
					    toolbox: {
					        show : true,
					        feature : {
					            mark : {show: true},
					            dataView : {show: true, readOnly: false},
					            // magicType: {show: true, type: ['line', 'bar']},
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    legend: {

					    },
					      xAxis: [
					      
					      	{
				      			 type : 'category',
				      			data:storeName,//店铺列表
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
			              	name:'会员数量',
			                type: 'bar',
			                // data: [4444,4213,4005,3555,3622,3511,2588,2153,1562,1200],
			                data: storeCrm,//店铺会员人数
			                itemStyle: {
					                normal: {
					                    color: function(params) {
					                        // build a color map as your need.
					                        var colorList = [
					                        '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
					                          '#C1232B','#B5C334','#27727B', '#FE8463','#9BCA63','#FCCE10','#E87C25','#FAD860','#F3A43B','#60C0DD',
					                           
					                        ];
									        return colorList[params.dataIndex]
					                    },
					                    //是否显示文字在图表
					                    label: {
					                        show: true,
					                        position: 'top',
					                        // formatter: '{b}'
					                    }
					                }
					            },
			            },
		            
		            ]
				}
				myEchartshop.setOption(option);
				myEchartshop.hideLoading(); //隐藏加载动画
				}
			})
		},
		//导购GET /statement/guide 导购会员报表
		drawcrm(){
			let myEchartcrm = echarts.init(document.getElementById('myEchartcrm'),'shine')
			myEchartcrm.showLoading();
			this.axios.get('statement/ranks?type=0&uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.len=res.data.rows.length
					let employeeName=[]//导购名称
					let crmCount=[]//会员
					res.data.rows.forEach((x,index)=>{
						employeeName.push(res.data.rows[index].crmName)
						crmCount.push(res.data.rows[index].crmTotal)
					})
					let option={
					title:{
						text:"员工Top10",
						
						 x: 'center',
					},
				    tooltip : {
				    	trigger: 'axis',
				        // formatter: "{a} <br/>{b} : {c}"
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
			      			data:employeeName
			      		}
				      ],
		            yAxis: {
		            	
		            },
		            series: [{
		              	name:'吸粉数量',
		                type: 'bar',
		                data: crmCount,
		                itemStyle: {
			                normal: {
			                    color: function(params) {
			                        // build a color map as your need.
			                       var colorList = [
			                          '#FE8463','#9BCA63','#C1232B','#F0805A','#26C0C0','#B5C334','#FCCE10','#E87C25','#27727B','#FAD860','#F3A43B','#60C0DD','#D7504B','#C6E579','#F4E001',
                   					 ];
			                        return colorList[params.dataIndex]
			                    },
			                    label: {
			                        show: true,
			                        position: 'top',
			                        // formatter: '{b}'
			                    }
			                }
				        },
		            },
		            ]
				}
					myEchartcrm.setOption(option);
					myEchartcrm.hideLoading()
				}
			})
		},
		//性别
		drawgender(){
			let myEchartkh = echarts.init(document.getElementById('myEchartkh'),'shine')
			myEchartkh.showLoading()
			this.axios.get('statement/genderStatement?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.lenGender=res.data.rows.length
					let gender=[]
					let crmCount=[]
					res.data.rows.forEach((x,index)=>{
						
						if(x.gender=='1'){
							x.gender='男'
						}
						if(x.gender=='0'){
							x.gender='女'
						}
						if(x.gender=='3'){
							x.gender='未知'
						}
						gender.push(res.data.rows[index].gender)//性别
							let arr={
								value:res.data.rows[index].crmCount,
								name:res.data.rows[index].gender
							}
							crmCount.push(arr)//比列
							// console.log(crmCount)
						})
					
						let	option = {
						    title : {
						        text: '店铺用户性别占比',
						       
						        x:'center'
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
						                type: ['pie'],
						                // option: {
						                //     funnel: {
						                //         x: '25%',
						                //         width: '50%',
						                //         funnelAlign: 'left',
						                //         max: 1548
						                //     }
						                // }
						            },
						            restore : {show: true},
						            saveAsImage : {show: true}
						        }
						    },
						    legend: {
						        orient: 'vertical',
						        left: 'left',
						        data: gender//性别列表
						    },
						    series : [
						        {
						            name: '性别占比',
						            type: 'pie',
						            radius : '55%',
						            center: ['50%', '60%'],
						            data:crmCount,//性别占比
						            itemStyle: {
						          
						                emphasis: {
						                    shadowBlur: 10,
						                    shadowOffsetX: 0,
						                    shadowColor: 'rgba(0, 0, 0, 0.5)'
						                }
						            }
						        }
						    ]
						};
						 myEchartkh.setOption(option);
						 myEchartkh.hideLoading()
				}
			})
		},
		//会员等级
		drawvip(){
			let myEchartvip = echarts.init(document.getElementById('myEchartvip'),'shine')
			myEchartvip.showLoading()
			this.axios.get('statement/levelStatement?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.lenLevel=res.data.rows.length
					let levelName=[]//等级名称
					let crmCount=[]//等级占比
					res.data.rows.forEach((x,index)=>{
						levelName.push(res.data.rows[index].levelName)
						let arr={
							value:res.data.rows[index].crmCount,
							name:res.data.rows[index].levelName
						}
						crmCount.push(arr)//会员等级占比
						
					})
					let option = {
					    title : {
					        text: '会员等级',
					        x:'center'
					    },
					    tooltip : {
					        trigger: 'item',
					        axisPointer: {
						            type: 'cross'
						        },
					        formatter: "{a} <br/>{b} : {c} ({d}%)"
					    },
					    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {
				                show: true, 
				                type: ['pie'],
				                // option: {
				                //     funnel: {
				                //         x: '25%',
				                //         width: '50%',
				                //         funnelAlign: 'left',
				                //         max: 1548
				                //     }
				                // }
				            },
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
					    legend: {
					        orient: 'vertical',
					        left: 'left',
					        data:levelName//等级名称
					    },
					    series : [
					        {
					            name: '等级占比',
					            type: 'pie',
					            radius : '55%',
					            center: ['50%', '60%'],
					           
					            data:crmCount,//会员等级占,
					            itemStyle: {
					            	 normal: {
					                    color: function(params) {
					                        // build a color map as your need.
					                       var colorList = [
					                          '#9BCA63','#C1232B','#F4E001','#B5C334','#FCCE10','#E87C25','#27727B',
					                           '#FE8463','#FAD860','#F3A43B','#60C0DD',
					                           '#D7504B','#C6E579','#F0805A','#26C0C0'
	                       					 ];
					                        return colorList[params.dataIndex]
					                    },
					                    label: {
					                        show: true,
					                        position: 'top',
					                        // formatter: '{b}'
					                    }
					                },
					                emphasis: {
					                    shadowBlur: 10,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            }
					        }
					    ]
					};
					 myEchartvip.setOption(option);
					 myEchartvip.hideLoading()
				}
			})
		},
		//年龄
		drawloaction(){
			let myEcharage = echarts.init(document.getElementById('myEcharage'),'shine')
			this.lenage=0
			let option={
					title:{
						text:"年龄分布",
						 x: 'center',
					},
				    tooltip : {
				    	trigger: 'axis',
				  		axisPointer: {
				            type: 'cross'
				        },
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {
				                show: true, 
				                type: ['pie'],
				                // option: {
				                //     funnel: {
				                //         x: '25%',
				                //         width: '50%',
				                //         funnelAlign: 'left',
				                //         max: 1548
				                //     }
				                // }
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
			      			data:[],
			      			//文字过多倾斜显示
			      			axisLabel: {  
							   // interval:0,  
							   // rotate:40  
							    
							}  
			      		}
				      ],
		            yAxis: {
		            	
		            },
		            series: [{
		              	name:'年龄指数',
		                type: 'bar',
		                data: [],
		                
		                itemStyle: {
				                normal: {
				                    color: function(params) {
				                        // build a color map as your need.
				                        var colorList = [
				                        '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
				                          '#C1232B','#B5C334','#27727B', '#FE8463','#9BCA63','#FCCE10','#E87C25','#FAD860','#F3A43B','#60C0DD',
				                           
				                        ];
								        return colorList[params.dataIndex]
				                    },
				                    //是否显示文字在图表
				                    label: {
				                        show: true,
				                        position: 'top',
				                        // formatter: '{b}'
				                    }
				                }
				            },
		            },
	            
	            ]
			}
			myEcharage.setOption(option);
		},
		//地址分布
		drawAddress(){
			let myEchartAddress = echarts.init(document.getElementById('myEchartAddress'),'shine')
			myEchartAddress.showLoading();
			this.axios.get('statement/city?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.lenAddress=res.data.rows.rows.length
					let cityName=[]
					res.data.rows.rows.forEach((x,index)=>{
						
						let arr={
							value:res.data.rows.rows[index].crmCount,
							name:res.data.rows.rows[index].city
						}
						cityName.push(arr)
							
					})
					let option = {
				        title: {
				            text: '会员地址分布',
				           	left: 'center',
				            sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
				        },
				        tooltip: {
				            trigger: 'item',
				           	axisPointer: {
					            type: 'cross'
					        },
				        },
				        toolbox: {
				            show: true,
				            orient: 'vertical',
				            left: 'right',
				            top: 'center',
				            feature: {
				                dataView: {readOnly: false},
				                restore: {},
				                saveAsImage: {}
				            }
				        },
				        visualMap: {
				            min: 0,
				            max: 50000,
				            text: ['高','低'],  
				            realtime: false,
				            calculable: true,
				            inRange: {
				                color: ['lightskyblue','yellow', 'orangered']
				            }
				        },
				        series: [
				            {
				                name: '来源',
				                type: 'map',
				                mapType: 'china',
				                itemStyle:{
				                    normal:{label:{show:true}},
				                    emphasis:{label:{show:true}}
				                },
				                label: {
							      normal: {
							       show: true
							      },
							      emphasis: {
							       show: true
							      }
							     },
				                data:cityName,
				               
				            }
				        ]
				    }
					myEchartAddress.setOption(option)
					myEchartAddress.hideLoading()

				}
			})
		},
		//来源
		drewForm(){
			let myEcharForm = echarts.init(document.getElementById('myEcharForm'),'shine')
			myEcharForm.showLoading();
			this.axios.get('statement/souce?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.lenForm=res.data.rows.rows.length
				let source=[]
				let crmCount=[]
				res.data.rows.rows.forEach((x,index)=>{
					source.push(res.data.rows.rows[index].source)
					let arr={
						value:res.data.rows.rows[index].crmCount,
						name:res.data.rows.rows[index].source
					}
					crmCount.push(arr)//来源
					
				})
				let option = {
				    title : {
				        text: '会员来源',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient : 'vertical',
				        x : 'left',
				        data:source
				    },
				    toolbox: {
				       show: true,
			            // orient: 'vertical',
			            left: 'right',
			            // top: 'center',
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
				            name:'数量',
				            type:'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:crmCount
				        }
				    ]
				};
				myEcharForm.setOption(option)
				myEcharForm.hideLoading()
				}
				
			})
		},
		//增长
		drewAdd(){
			let myEchartAdd = echarts.init(document.getElementById('myEchartAdd'),'shine')
			this.lenadd=0
			let option={
					title:{
						text:"会员增长趋势",
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
			      			data:[],
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
		                data: [],
		                itemStyle: {
				                normal: {
				                    color: function(params) {
				                        // build a color map as your need.
				                        var colorList = [
				                          
				                         '#B5C334','#27727B', '#FE8463','#9BCA63','#FCCE10','#E87C25','#FAD860','#F3A43B','#60C0DD', '#B5C334','#27727B', '#FE8463','#9BCA63','#FCCE10','#E87C25','#FAD860','#F3A43B','#60C0DD'
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
			myEchartAdd.setOption(option);
		},
		//获取所有会员
		getAllcrm(){
			this.axios.get('statement/crmTotal?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.AllCrm=res.data.rows
				}
			})
		},
		//会员消费
		changeDay(day){
			this.model=day
		},
		//会员转化率
		changeDay2(day){
			this.model2=day
		},
		//mcrmdata/today
		getToday(){
			this.axios.get('statement/today?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data
					this.newCrm=data.total//新增会员
					bounty({ el: '.crmNumCenter32', value: this.newCrm,letterAnimationDelay: 600 ,});//新增会员 
				}
			})
		},
		//GET /mcrmdata/turnoverRate 会员转化率
		getturnoverRate(){
			this.axios.get('/statement/turnoverRate?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data.rows
					this.conversionRate=data.turnoverRate//会员转化率
					 bounty({ el: '#n2', value: this.conversionRate,letterAnimationDelay: 200 ,});//会员转化率
				}
			})
		},
		//GET /mcrmdata/consumptionRatio 会员消费占比
		getconversionRate(){
			this.axios.get('/statement/consumptionRatio?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data.rows
					this.consumptionRat=data.consumptionRatio//会员消费占比
					 bounty({ el: '#n1', value: this.consumptionRat,letterAnimationDelay: 800 });//会员消费占比

			       
				}
			})
		},
		//statement/crmTotal
		getcrmTotal(){
			this.axios.get('statement/crmTotal?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data.rows
					this.AllCrmNum=data.crmTotal//总会员
					bounty({ el: '.myCrmNum', value: this.AllCrmNum,letterAnimationDelay: 500});//z总会员数
				}
			})
		},
		//头部数字GET /mcrm/index 会员报表
		getNumTop(){
			this.axios.get('/crm/index?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data.rows
					
					this.ActiveCrmNum=data.activeCrm//活跃会员
					this.CilentCrmNum=data.silenceCount//沉默会员
					this.SleepCrmNum=data.sleepCount//睡眠会员
					this.LossCrmNum=data.lossCount//流失会员

					

					this.monthCount=data.monthCount//本月新增人员
					this.todayCount=data.todayCount//今日新增会员
					this.yesCrmCount=data.yesCrmCount//昨日会员

					this.newCustomer=data.newCustomer// 新增顾客 
					this.newCrm=data.newCrm//新增会员
					
					this.consumptionCustomer=data.consumptionCustomer //消费顾客 
					this.consumptionCrm=data.consumptionCrm//消费会员 

			        bounty({ el: '.crmNum1', value: this.ActiveCrmNum,letterAnimationDelay: 200 ,});//活跃会员
			        bounty({ el: '.crmNum2', value: this.CilentCrmNum,letterAnimationDelay: 400 ,});//沉默会员
			        bounty({ el: '.crmNum3', value: this.SleepCrmNum,letterAnimationDelay: 500 ,});//睡眠会员
			        bounty({ el: '.crmNum4', value: this.LossCrmNum,letterAnimationDelay: 600 ,});//流失会员

			        bounty({ el: '.crmNumCenter1', value: this.consumptionCustomer,letterAnimationDelay: 600 ,});//消费顾客
			        bounty({ el: '.crmNumCenter2', value: this.consumptionCrm,letterAnimationDelay: 600 ,});//消费会员

			        bounty({ el: '.crmNumCenter31', value: this.newCustomer,letterAnimationDelay: 600 ,});//新增顾客
			        bounty({ el: '.crmNumCenter32', value: this.newCrm,letterAnimationDelay: 600 ,});//新增会员
				}
			})
		},
	},
	created(){
		this.$nextTick(()=>{
			this.getcrmTotal()//会员总数
			this.getturnoverRate()//会员转化率
       		this.getconversionRate()//会员消费占比
			this.drawshop()//获取门店
			this.drawcrm()//导购
			this.drawgender()//性别
			this.drawvip()//等级
			this.getAllcrm()//获取所有会员
			this.getNumTop()
			this.drawloaction()//年龄
			this.drawAddress()//地址 
			this.drewForm()//来源
			this.drewAdd()//增长趋势
		})
	},
	mounted(){
	},
}
</script>
<style type="text/css" scoped>
.crmNum1,.crmNum2,.crmNum3,.crmNum4{
	fill:#3E608B;
	font-weight: 600
}
.crmNumCenter1,.crmNumCenter2{
	fill:#FF5F61;
}
.crmNumCenter31,.crmNumCenter32{
	fill:#3679FA;
}



.crm{
	width:100%;
	height:100%;
	overflow: auto;

}
.head{
	display:flex;
	padding:8px 0 8px 0;
	/*border:1px solid red;*/
	background: #EFF3F6;
}
.crmLivetitle{
	font-size:16px;
	font-weight:900;
}
.crm-top{
	width:100%;
}
.crm-top .top-ul{
	width:100%;
	display: flex;
	justify-content: space-between;
}
.crm-top .top-ul .list{
	margin:0 5px;
}
.myCrmTtitle{
	display: inline-block;
	padding:15px;
	width:100%;
	display: flex;
	justify-content: space-between;
}
#n1{
	fill:#ff0000;
	/*text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);*/
}
#n2{
	fill:#3679FA;
	/*text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);*/
}
.myCrmNum{
font-weight:900;
font-size:50px;
color:#ff0000;
fill:red;
/*text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);*/
text-align: center;
font-family:Impact, Charcoal, sans-serif;

}
.fontSizeNum{

font-size:25px;
text-align: center;
font-family:Impact, Charcoal, sans-serif;
}
.myCrmBottom{
	display: flex;
    justify-content: center;
    align-items: center;
    height:55px;
}
.crmNum{
	color:#3E608B;
	font-weight: 600
}

.myCrmBottom li{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width:50%;
	height: 100%;
	
}
.center-money{
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.center-money .moneykh li{
	display: flex;
	flex-direction: column;
	/*align-items: center;*/
}
.crmNumCenter{
	color:#FF5F61;
}
.crmNumCenter3{
	color:#3679FA;
}
li{
	list-style: none
}

.echarts{
	width:100%;
	display:flex;
	justify-content: space-around;
	
}
.echarts2{
	margin-bottom:10px;
}
.echarts3{
	margin-bottom:140px;
}
.zj{
	width:100%;
	display:flex;
	margin-top: 10px;
	justify-content: space-around;
}
.zj-style{
	width:100%;
	margin:0 5px;
}
.zj-style>span{
	display:block;
	border:1px solid #ccc;
	border-bottom:none;
	width:100%;
	height:40px;
	background: #F8F8F8;
	line-height: 40px;
	text-align: left
}
.shop{
	
	display:flex;
	margin-top:20px;
	height:40px;
	line-height: 40px;
	background: #F8F8F8;
	justify-content: space-between;
}

</style>
<style type="text/css">
.ivu-poptip-inner{
	    white-space: initial!important;
}
</style>