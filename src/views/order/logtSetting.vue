<template>

	<div class="units-box">
		<div style='display:flex;height:100%;overflow:hidden'>
			<!-- <div class='main-left'>
				<div style='height: 50px; border-bottom: 1px solid rgb(228, 228, 228); font-size: 18px; font-weight: 900; line-height: 50px;'>
					<div style='margin-left:10px'>订单配置</div>
				</div>
				<li class='flclass' v-for='(item,index) in fhlist' :key='index' @click='getfhlistbg(index)' :class="{bor:index==fhindex}">
					<span>{{item.label}}</span>
				</li>
			</div> -->
			<Tabs :animated="false" style="background:#fff;width:100%;height:100%">
		        <TabPane label="交易设置">
				    <div class="table">
						<div style='margin:10px' class="top-rom">
							<Form ref="formValidateSW" :model="formValidateSW" :rules="ruleValidateSW" :label-width="180"  style='margin-top:20px'>
								<Row class="rowClass">
				                    <h4 class="font-700">订单流程设置</h4>
				                	<FormItem label="未支付订单" prop="day">
		                                <InputNumber :value="formValidateSW.day" :max="89" :min='1' style="width:50px" @on-change="changeDay"></InputNumber> <span>天</span> 
		                                <InputNumber :value="formValidateSW.hours" :max="23" :min='0' style="width:50px" @on-change="changeHours"></InputNumber> <span>小时</span> 
		                                <InputNumber :value="formValidateSW.minute" :max="59" :min='0' style="width:50px" @on-change="changeMinute"></InputNumber> <span>分钟后自动关闭，  </span> 
		                                <span class="spanColor">最长可设置90天，货到付款订单不适用，不填则不自动关闭</span>
		                            </FormItem>
				                	<FormItem label="已发货订单" prop="ShipNum">
				                		<InputNumber v-model="formValidateSW.ShipNum" :max="90" :min='0' style="width:200px" @on-change="changeShipNum"></InputNumber > <span>天后自动确认收货，</span> 
				                		<span class="spanColor">请考虑物流运输时间，最长可设置90天，自提订单在配送方式中设置</span>
				                	</FormItem>
				                	<FormItem label="已收货订单" prop="ReceiptNum">
				                		<InputNumber v-model="formValidateSW.ReceiptNum" :max="365" :min='0' style="width:200px" @on-change="changeReceiptNum"></InputNumber > <span>天后关闭退款/退货功能，</span>
				                		<span class="spanColor">填写则买家可在确认收货后进行退款/退货申请，最长可设置365天，0代表确认收货后无法维权</span>
				                	</FormItem>
				                	<FormItem label="默认支付方式">
			                        	<RadioGroup v-model="single" @on-change='changeSB'>
				                            <Radio label="优先选中线上支付"></Radio>
				                            <Radio label="优先选中线下支付"></Radio>  
				                        </RadioGroup> 
				                        <span class="spanColor">仅在对应配送方式支持多支付方式时生效</span>
					                </FormItem>
					                <FormItem label="商品规格库存不足处理方式">
			                        	<RadioGroup v-model="singlesku" @on-change='changeSku'>
				                            <Radio label="允许扣成负库存"></Radio>
				                            <Radio label="整个订单自动维权"></Radio>  
				                        </RadioGroup> 
				                        <span class="spanColor">仅针对支付减库存的商品</span>
					                </FormItem>
								</Row>
		                        <Row class="rowClass">
		                        	 <h4 class="font-700">维权原因设置</h4>
		                        	 <FormItem label="维权原因">
			                        	<i-Switch :value="weiquanV" @on-change='switchChange'>
									        
									    </i-Switch>
									    <span style="margin-left:20px">{{weiquanV?"已开启":"已关闭"}}</span>
				                        <span class="spanColor" style="margin-left:20px">说明：设置后买家在申请维权时可以进行选择，最多支持添加10个</span>
				                        <div>
				                        	<Tag v-if='weiquanV' type="border" closable color="#199DFF" :fade='false' v-for='(item,index) in weiquanLists' :key='index' @on-close="handleClose(index)">{{item}}</Tag>
				                        	<div>
				                        		<Button v-if='weiquanV' type="primary" @click="addTag">新增</Button>
				                        	</div>
				                        </div>
					                </FormItem>
		                        </Row>
		                         <Row class="rowClass">
		                        	 <h4 class="font-700">线上订单配置</h4>
		                        	 <FormItem label="线上订单配置">
			                        	<RadioGroup v-model="singleLine" @on-change='changeLine'>
			                        		<div>
				                            	<Radio label="库存+距离优先"></Radio>
				                            	<span class="spanColor">线上下单的时候，订单按照最近门店且有库存的店铺派发</span>
				                            </div>
				                            <div>
				                            	<Radio label="会员来源优先"></Radio> 
				                            	<span class="spanColor">基于会员加入的门店派发订单</span>
				                            </div>
				                            <div>
				                            <Radio label="手动分配"></Radio>
				                            <span class="spanColor">由人工手动派发订单</span>
				                            </div>  
				                        </RadioGroup> 
				                       
				                        
					                </FormItem>
		                        </Row>
		                        <Row class="rowClass">
		                        	 <h4 class="font-700">改价设置</h4>
		                        	 <FormItem label="改价设置">
			                        	<i-Switch :value="changePrice" @on-change='switchChangePrice'>
									        
									    </i-Switch>
									    <span style="margin-left:20px">{{changePrice?"已开启":"已关闭"}}</span>
				                        <span class="spanColor" style="margin-left:20px">说明：50% 结算价的50% </span>
				                        <div>
				                        	
				                        	<div v-if='changePrice'>
				                        		<InputNumber v-model='formValidateSW.changePrice' :max="100" :min='1' style="width:200px" @on-change="changechangePrice"></InputNumber> %
				                        	
				                        	</div>
				                        </div>
					                </FormItem>
		                        </Row>
		                        <Row class="rowClass">
		                        	<h4 class="font-700">维权流程设置</h4>
		                        	<FormItem label="买家发起退款申请" prop="Refund">
				                		<InputNumber v-model='formValidateSW.Refund' :max="90" :min='1' style="width:200px" @on-change="changeRefund"></InputNumber> 
				                		<span class="spanColor">天后商家未处理，系统将自动同意/拒绝退款。</span>
				                	</FormItem>
				                	<FormItem label="买家发起退货退款申请" prop="return">
				                		<InputNumber v-model='formValidateSW.return' :max="90" :min='1' style="width:200px" @on-change="changereturn"></InputNumber> 
				                		<span class="spanColor">天后商家未处理，系统将自动同意维权。</span>
				                	</FormItem>
				                	<FormItem label="商家同意退货" prop="returnAgree">
				                		<InputNumber v-model='formValidateSW.returnAgree' :max="90" :min='1' style="width:200px" @on-change="changereturnAgree"></InputNumber> 
				                		<span class="spanColor">天后买家未处理，系统将自动拒绝维权。</span>
				                	</FormItem>
				                	<FormItem label="买家已退货" prop="returned">
				                		<InputNumber v-model='formValidateSW.returned' :max="90" :min='1' style="width:200px" @on-change="changereturned"></InputNumber> 
				                		<span class="spanColor">天后商家未处理，系统将自动同意/拒绝退款。</span>
				                	</FormItem>
				                	<FormItem label="说明：" style="color:#ff0000">
				                		<li>系统默认的时间为7天，手动设置时间最长不超过90天。</li>
				                		<li>线上支付的订单系统做自动同意处理，线下支付的订单系统做自动拒绝处理。</li>
				                		
				                	</FormItem>
		                        </Row>
		                        <Row class="rowClass">
		                        	<h4 class="font-700">运费设置</h4>
		                        	<FormItem label="运费组合策略">
				                		<RadioGroup v-model="singlesYunf" @on-change='changeYunf' vertical>
				                            <div style="display:flex"><Radio label="叠加"></Radio><span class="spanColor">订单中的商品有多个运费模板时，将每个商品的运费之和计为订单总运费</span></div>
				                       
				                            <div style="display:flex"><Radio label="以最低运费结算"></Radio>  <span class="spanColor">订单中的商品有多个运费模板时，取订单中运费最少的商品的运费计为订单总运费</span></div>
				                            <div style="display:flex"><Radio label="以最高运费结算"></Radio>  <span class="spanColor">订单中的商品有多个运费模板时，取订单中运费最多的商品的运费计为订单总运费</span></div>
				                        </RadioGroup> 
				                	</FormItem>
				                	

		                       	</Row>
		                       	<Row class="rowClass">
		                       		<h4 class="font-700">商品评论</h4>
		                       		<FormItem label="商品评论" >
			                        	<i-Switch :value="skupl" @on-change='switchskupl'></i-Switch>
									    <span style="margin-left:20px">{{skupl?"已开启":"已关闭"}}</span>
				                        
					                </FormItem>
					                <FormItem label="买家交易成功" v-if="skupl" prop="success">
			                        	<InputNumber v-model='formValidateSW.success' :max="90" :min='1' style="width:200px" @on-change="changesuccess"></InputNumber > <span>天后买家未评论，系统将自动评论。</span>
				                		<span class="spanColor">系统默认的时间为7天，手动设置时间最长不超过90天。评论内容为 “ 用户超时未评，系统自动好评。</span>
					                </FormItem>
					                <FormItem label="评论默认显示" v-if="skupl">
			                        	<i-Switch :value="skuplDefault" @on-change='switchskuplDefault'></i-Switch>
									    <span style="margin-left:20px">{{skuplDefault?"已开启":"已关闭"}}</span>
				                        
					                </FormItem>
					                <div style="background:#fff;padding:20px;">
					                	<Button type="ghost"  shape="circle"  @click="saveSW('formValidateSW')"  style="background:#3b77e3;margin-left:80px;color:#fff;border:none">
												<Icon type="checkmark-round" style="position:relative;right:5px"></Icon>
											保存
										</Button>
									</div>
		                       	</Row>
		                       	
								
                			</Form>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="配送设置">
					<div class="table">
						<Tabs :animated="false">
					        <TabPane label="商品配送">
					        	<Row class="rowClass">
					        		<div style="display:flex">
						        		<h4 class="font-700">商家配送</h4>
						        		<div style="margin-left:20px">
							        		<i-Switch :value="isProduct" @on-change='switchChangeisProduct'>
											        
											</i-Switch>
											<span style="margin-left:20px">{{isProduct?"已开启":"已关闭"}}</span>
										</div>
									</div>
					        	</Row>
					        	<Row class="rowClass">
					        		<Tabs v-model="tabName" :animated="false" @on-click="changeTabs">
								        <TabPane label="运费模板" name="0">
								        	<div  style='padding:20px;background: #fff;'>
								        		<Button @click="addtemplete" style="background:#3b77e3;color:#fff">新建运费模板</Button><span class="spanColor" style="margin-left:20px">开启商家配送的商户需设置，最多可创建100个</span>
								        	</div>
								        	<div style="margin-top:5px">
												<Table border  highlight-row :columns="columnstemplete" :data="dataListtemplete"></Table>
												<div class="page-boxT">
													 <Page :total="totaltemplete" size='small' show-total :pageSize='pageSizetemplete'  @on-change="getDatatemplete" @on-page-size-change="changePageSizetemplete"></Page>
												</div>
											</div>
								        </TabPane>
								        <TabPane label="配送设置" name="1">
								        	<Form ref="formDistribution" :model="formDistribution" :rules="ruleDistribution" :label-width="180"  style='padding:20px;background: #fff;'>
								        		<FormItem label="自定义名称">
							                		<Input v-model="formDistribution.name" :maxlength="10"  style="width:200px"></Input >
							                		<span class="spanColor" style="margin-left:20px">在前台显示的自定义名称，最多10个字</span>
							                	</FormItem>
							                	<FormItem label="设置为默认配送方式">
							                		<i-Switch :value="formDistribution.isType" @on-change='switchChangeisType'>
									        
									    			</i-Switch>
									    			<span style="margin-left:20px">{{formDistribution.isType?"已开启":"已关闭"}}</span>
							                		<span class="spanColor" style="margin-left:20px">买家下单时，默认[商家配送]作为默认配送方式</span>
							                	</FormItem>
							                	<FormItem label="自定义配送时间">
							                		<i-Switch :value="formDistribution.istime" @on-change='switchChangeistime'>
									        
									    			</i-Switch>
									    			<span style="margin-left:20px">{{formDistribution.istime?"已开启":"已关闭"}}</span>
							                		<span class="spanColor" style="margin-left:20px">开启自定义配送时间后，买家在下单时，可选择配送日期</span>
							                		<div v-if="formDistribution.istime" >
								                		<RadioGroup v-model="formDistribution.singlesTime" @on-change='changeTime'  style='width:100%'>
								                            <Radio label="使用固定配送时间选项"></Radio>
								                            <Radio label="自定义配送时间选项"></Radio> 
								                            <div>工作日、双休日或节假日可送货/只工作日送货/只双休日、节假日送货</div>
								                            <div v-if="formDistribution.singlesTime=='自定义配送时间选项'">
									                            <FormItem label="最早可配送时间,下单后">
									                            	<InputNumber v-model="formDistribution.day1" :max="60" :min='1' style="width:200px;margin-bottom:10px" @on-change="changeDay1"></InputNumber> <span>天,可送货上门</span> 
									                            </FormItem>
									                            <FormItem label="最晚可配送时间,下单后" >
									                            	<InputNumber v-model="formDistribution.day2" :max="60" :min='1' style="width:200px" @on-change="changeDay2"></InputNumber> <span>天,可送货上门</span> 
									                            </FormItem>
								                            </div>
								                        </RadioGroup>
							                        </div>
							                	</FormItem>
							                	<FormItem label="线下支付">
							                		<i-Switch :value="formDistribution.undeline" @on-change='switchChangeundeline'>
									        
									    			</i-Switch>
									    			<span style="margin-left:20px">{{formDistribution.undeline?"已开启":"已关闭"}}</span>
							                	</FormItem>
							                	<FormItem label="默认运费模板">
							                		<div>暂未设置默认运费模板</div>
							                		<div>
							                			1、新商品的默认运费模板，可在运费模板设置中 <a @click="setTemplete">去设置</a>
							                		</div>
							                		<div>
							                			2、商家配送的可配送区域取决于运费模板
							                		</div>
							                	</FormItem>
							                	<div style="background:#f2f2f6;padding:20px">
								                	<Button type="ghost"  shape="circle"  @click="saveShop"  style="background:#3b77e3;margin-left:80px;color:#fff;border:none">
														<Icon type="checkmark-round" style="position:relative;right:5px"></Icon>
													保存
													</Button>
												</div>
								        	</Form>
								        </TabPane>
									</Tabs>
					        	</Row>
					        </TabPane>
					        <TabPane label="到店自提">
					        	<Row class="rowClass">
					        		<div style="display:flex">
						        		<h4 class="font-700">到店自提</h4>
						        		<div style="margin-left:20px">
							        		<i-Switch :value="!isProduct" @on-change='switchChangeziti'>
											        
											</i-Switch>
											<span style="margin-left:20px">{{!isProduct?"已开启":"已关闭"}}</span>
										</div>
									</div>
					        	</Row>
					        	<Row class="rowClass">
					        		<Tabs v-model="tabNameziti" :animated="false" @on-click="changeTabsziti">
					        			<TabPane label="自提点管理" name="0">
								        	<div  style='padding:20px;background: #fff;'>
								        		<Button @click="addztPlace" style="background:#3b77e3;color:#fff">新增自提点</Button>
								        	</div>
								        	<div style="margin-top:5px">
												<Table border  highlight-row :columns="columnszt" :data="dataListzt"></Table>
												<div class="page-boxT">
													 <Page :total="totalzt" size='small' show-total :pageSize='pageSizezt'  @on-change="getDatazt" @on-page-size-change="changePageSizezt"></Page>
												</div>
											</div>
								        </TabPane>
								        <TabPane label="设置" name="1">
								        	<Form ref="formziti" :model="formziti" :rules="ruleziti" :label-width="180"  style='padding:20px;background: #fff;'>
								        		<FormItem label="自定义名称">
							                		<Input v-model="formziti.name" :maxlength="10"  style="width:200px"></Input >
							                		<span class="spanColor" style="margin-left:20px">在前台显示的自定义名称，最多10个字</span>
							                	</FormItem>
							                	<FormItem label="设置为默认配送方式">
							                		<i-Switch :value="formziti.isType" @on-change='switchChangezitiType'>
											        
													</i-Switch>
													<span style="margin-left:20px">{{formziti.isType?"已开启":"已关闭"}}</span>
							                		<span class="spanColor" style="margin-left:20px">买家下单时，默认[到店自提]作为默认配送方式</span>
							                	</FormItem>
							                	<FormItem label="系统自动完成备货">
							                		<div>
							                			<i-Switch :value="formziti.isbeihuo" @on-change='switchChangezitiisbeihuo'>
											        
														</i-Switch>
														<span style="margin-left:20px">{{formziti.isbeihuo?"已开启":"已关闭"}}</span>
							                		</div>
							                		<FormItem style="background: #f2f2f6;padding:10px 20px" v-if="formziti.isbeihuo">
								                		<RadioGroup v-model="zitiThuo" @on-change="changezitiThuo">
								                			<div>
									                            <Radio label="最早当天可提货，下单"></Radio>
								                                <InputNumber v-model="formziti.hours" :max="23" :min='0' style="width:80px" :disabled="zitiThuo!='最早当天可提货，下单'"></InputNumber> <span>小时</span> 
								                                <InputNumber v-model="formziti.minute" :max="59" :min='0' style="width:80px" :disabled="zitiThuo!='最早当天可提货，下单'"></InputNumber> <span>分钟后，可提货  </span>
							                                </div>
							                                <div style="margin:10px 0">
							                                	<Radio label="按指定天数备货，下单"></Radio>
								                                <InputNumber v-model="formziti.day" :max="60" :min='0' style="width:80px" :disabled="zitiThuo!='按指定天数备货，下单'"></InputNumber> <span>天后，可提货  </span>
							                                </div>
							                                <div>
							                                	<Radio label="按下单时间，确认备货天数"></Radio>
							                                	
							                                		<div style="margin:10px 0">
								                                		<span>当下单时间早于</span>
								                                		<InputNumber v-model="formziti.hoursZ" :max="60" :min='0' style="width:80px" :disabled="zitiThuo!='按下单时间，确认备货天数'"></InputNumber><span>时</span>
								                                		<InputNumber v-model="formziti.minuteZ" :max="59" :min='0' style="width:80px" :disabled="zitiThuo!='按下单时间，确认备货天数'"></InputNumber><span>分</span>
								                                		<span>,则</span>
								                                		<InputNumber v-model="formziti.dayZ" :max="60" :min='0' style="width:80px" :disabled="zitiThuo!='按下单时间，确认备货天数'"></InputNumber><span>天后，可提货  </span>
							                                		</div>
							                                		<div>
							                                			<span>当下单时间晚于该时间点，则</span>
							                                			<InputNumber v-model="formziti.dayZ1" :max="60" :min='0' style="width:80px" :disabled="zitiThuo!='按下单时间，确认备货天数'"></InputNumber><span>天后，可提货  </span>
							                                		</div>
							                                	
								                                 
							                                </div>
								                        </RadioGroup>
								                	</FormItem>
							                	</FormItem>

							                	<FormItem label="买家可选自提时间" v-if="formziti.isbeihuo">
							                		<div >
							                			<i-Switch :value="formziti.zitiisTime" @on-change='switchChangezitiisTime'>
											        
														</i-Switch>
														<span style="margin-left:20px">{{formziti.zitiisTime?"已开启":"已关闭"}}</span>
														<span class="spanColor" style="margin-left:10px">1、开启自动备货后，才能开启可选自提时间；2、开启后，买家在下单页必须选择可提货时间，不开启则屏蔽可提货时间</span>
														<FormItem label="可配送时间段" v-if="formziti.zitiisTime" style="background:#f2f2f6;padding:20px">
															<div style="display:flex">
																<FormItem prop="timeH">
																	<Input v-model="formziti.timeH" :maxlength="2" style="width:80px"  placeholder="小时"></Input>：
																</FormItem>
								                				<FormItem prop="timeM">
																	<Input v-model="formziti.timeM" :maxlength="2" style="width:80px" placeholder="分钟"></Input>&nbsp; - &nbsp;
																</FormItem>
											                    <FormItem prop="timeh">
																	<Input v-model="formziti.timeh" :maxlength="2" style="width:80px" placeholder="小时"></Input> ：
																</FormItem>
											                    <FormItem prop="timem">
																	<Input v-model="formziti.timem" :maxlength="2" style="width:80px" placeholder="分钟"></Input> 
																</FormItem>
																 <span style="margin-left:10px">输入时间格式参考：09:00-16:00</span> 
										                    </div>
							                			</FormItem>
							                		</div>
							                	</FormItem>
							                	<FormItem label="提货有效期">
							                		<div>
							                			<i-Switch :value="formziti.zitiisTimeyxq" @on-change='switchChangezitiisTimeyxq'>
														</i-Switch>
														<span style="margin-left:20px">{{formziti.zitiisTimeyxq?"已开启":"已关闭"}}</span>
							                		</div>
							                		<FormItem label="备货完成" v-if="formziti.zitiisTimeyxq" style="background:#f2f2f6;padding:10px">
							                			<InputNumber  :max="60" :min='0' style="width:80px"></InputNumber>
							                			<span>天后，停止提货 <span class="spanColor">填写0天，即仅限当天可提货</span></span>
							                			<FormItem label="过期订单处理">
							                				<RadioGroup v-model="formziti.guoqichuli" @on-change="changeguoqichuli">
							                					<Radio label="过期后，订单将自动完成，不退款"></Radio>
							                					<Radio label="过期后，订单将自动维权，自动向买家退款"></Radio>
								                                
							                				</RadioGroup>
							                				<div class="spanColor">周期购订单不支持自动退款，过期包裹将自动完成</div>	
							                			</FormItem>
							                		</FormItem>
							                	</FormItem>

							                	<FormItem label="是否开启跨自提点核销">
							                		<div>
							                			<i-Switch :value="formziti.zitihx" @on-change='switchChangezitihx'>
														</i-Switch>
														<span style="margin-left:20px">{{formziti.zitihx?"已开启":"已关闭"}}</span>
														<span class="spanColor" style="margin-left:10px">开启后，买家可在任意自提点完成核销和提货。未开启状态下，买家只能在下单时选择的自提点进行提货并核销。</span>
							                		</div>
							                	</FormItem>
							                	<FormItem label="自定义线下支付">
							                		<div>
							                			<i-Switch :value="formziti.zitixianxia" @on-change='switchChangezitixianxia'>
														</i-Switch>
														<span style="margin-left:20px">{{formziti.zitixianxia?"已开启":"已关闭"}}</span>
														<FormItem label="线下支付名称" v-if="formziti.zitixianxia" style="background:#f2f2f6;padding:10px">
															<Input v-model="formziti.xianxiaName" :maxlength="10"  style="width:200px"></Input >
							                				<span class="spanColor" style="margin-left:20px">下单时显示的线下支付名称，最多10个字</span>
														</FormItem>
							                		</div>
							                	</FormItem>
							                	<div style="background:#f2f2f6;padding:20px">
								                	<Button type="ghost"  shape="circle"  @click="savezt('formziti')"  style="background:#3b77e3;margin-left:80px;color:#fff;border:none">
														<Icon type="checkmark-round" style="position:relative;right:5px"></Icon>
													保存
													</Button>
												</div>
								        	</Form>

								        </TabPane>
					        		</Tabs>
					        	</Row>
					        </TabPane>
					    </Tabs>
					</div>
		        </TabPane>
		    </Tabs>
		</div>
	<Modal v-model="weiquanisshow" width="460px">
		<p slot="header" style="height:30px;line-height:30px">
			<span>新增维权原因</span>
		</p>
		<div class="shareCodeClass">
            <Form ref="weiquan" :model="formweiquan" :rules="ruleweiquan"  style='margin-top:20px'>
            	<FormItem label="维权原因" prop="weiquanY">
            		<Input v-model="formweiquan.weiquanY" placeholder="最多15个字" :maxlength="15" style="width:350px"></Input>
            	</FormItem>
            </Form>
		</div>
		<div slot="footer">
			<Button shape="circle" type="ghost" style="display:inline-block;background:#ccc;color:#fff" @click="cancelweiquan"><Icon type="close" style="margin-right:5px;" ></Icon>关闭</Button>
			<Button shape="circle" type="primary" 
			 @click="sureweiquan('weiquan')"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
			
		</div>
	</Modal>
	<!--模板弹框-->
	<Modal v-model="istempleteshow" width="560px">
		<p slot="header" style="height:30px;line-height:30px">
			<span v-if="isshowT">新建模板</span>
			<span v-if="!isshowT">修改模板</span>
		</p>
		<div class="shareCodeClass">
            <Form ref="formtemplete" :model="formtemplete" :rules="ruletemplete" :label-width="120"  style='margin-top:20px' v-if="isshowT">
            	<FormItem label="模板名称" prop="name">
            		<Input v-model="formtemplete.name" placeholder="最多10个字" :maxlength="10" style="width:350px"></Input>
            	</FormItem>
            	<FormItem label="运费" prop="name">
            		<InputNumber v-model="formtemplete.amount" :max="999999999" :min="0" style="width:350px"></InputNumber>
            	</FormItem>
            	<FormItem label="模板类型">
	            	<RadioGroup v-model="formtemplete.singleTemplete" @on-change='changeTemplete'>
	                    <Radio label="买家承担运费"></Radio>
	                    <Radio label="卖家包邮"></Radio>  
	                </RadioGroup> 
	            </FormItem>
	            <FormItem label="是否默认">
	            	<Checkbox v-model='formtemplete.isdefault' @on-change="changeisdefault"></Checkbox>
	            </FormItem>
            </Form>

            <Form ref="formtempleteE" :model="formtemplete" :rules="ruletemplete" :label-width="120"  style='margin-top:20px' v-if="!isshowT">
            	<FormItem label="模板名称" prop="name">
            		<Input v-model="formtemplete.name" placeholder="最多10个字" :maxlength="10" style="width:350px"></Input>
            	</FormItem>
            	<FormItem label="运费" prop="name">
            		<InputNumber v-model="formtemplete.amount" :max="999999999" :min="0" style="width:350px"></InputNumber>
            	</FormItem>
            	<FormItem label="模板类型">
	            	<RadioGroup v-model="formtemplete.singleTemplete" @on-change='changeTemplete'>
	                    <Radio label="买家承担运费"></Radio>
	                    <Radio label="卖家包邮"></Radio>  
	                </RadioGroup> 
	            </FormItem>
	             <FormItem label="是否默认">
	            	<Checkbox v-model='formtemplete.isdefault' @on-change="changeisdefault"></Checkbox>
	            </FormItem>
            </Form>
		</div>
		<div slot="footer">
			<div class='title' style='margin:0px'>
				<div style='color:#D15151;font-size:14px'>
				</div>
				<div style='margin-top:10px'>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ccc;color:#fff" @click="canceltemplete"><Icon type="close" style="margin-right:5px;" ></Icon>关闭</Button>
					<Button shape="circle" type="primary" 
					 @click="suretemplete('formtemplete')" v-if='isshowT'><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
					<Button type="primary" style='background:#40ca98;border:none' shape="circle" @click="makegoodsedit('formtempleteE')" v-if='!isshowT'>
		                <i class="el-icon-edit" style=";margin-right:5px;"></i>
		                修改
		            </Button>
				</div>
			</div>
		</div>
	</Modal>


	<!--自提点管理-->
	<Modal v-model="isztshow" width="980px">
		<p slot="header" style="height:30px;line-height:30px">
			<span v-if="isshowzT">新建自提点</span>
			<span v-if="!isshowzT">修改自提点</span>
		</p>
		<div class="shareCodeClass">
            <Form ref="formtempletezt" :model="formtempletezt" :rules="ruletempletezt" :label-width="120"  style='margin-top:20px' v-if="isshowT">
            	<Col span="11">
	            	<FormItem label="自提点名称" prop="name">
	            		<Input v-model="formtempletezt.name" placeholder="请输入自提点名称 最多10个字" :maxlength="10" ></Input>
	            	</FormItem>
	            	<FormItem label="自提点管理员账号" prop="accountPhone">
	            		<Input v-model="formtempletezt.accountPhone" placeholder="请输入管理员手机号"></Input>
	            	</FormItem>
	            	<FormItem label="管理员姓名" prop="adminName">
		            	<Input v-model="formtempletezt.adminName" ></Input>
		            </FormItem>
		            <FormItem label="联系电话" prop="phone">
		            	<Input v-model="formtempletezt.phone"></Input>
		            </FormItem>
		            <FormItem label="营业时间">
		            	<div style="display:flex">
							<FormItem prop="timeH">
								<Input v-model="formtempletezt.timeH" :maxlength="2" style="width:60px" placeholder="小时"></Input>：
							</FormItem>
            				<FormItem prop="timeM">
								<Input v-model="formtempletezt.timeM" :maxlength="2" style="width:60px" placeholder="分钟"></Input>&nbsp; - &nbsp;
							</FormItem>
		                    <FormItem prop="timeh">
								<Input v-model="formtempletezt.timeh" :maxlength="2" style="width:60px" placeholder="小时"></Input> ：
							</FormItem>
		                    <FormItem prop="timem">
								<Input v-model="formtempletezt.timem" :maxlength="2" style="width:60px" placeholder="分钟"></Input> 
							</FormItem>
							 
	                    </div>
	                    <div style="margin-top:10px">输入时间格式参考：09:00-16:00</div> 
		            </FormItem>
		        </Col>
		        <Col  span="13">
		        	<FormItem label="自提点地址" prop="city">
		            	<el-cascader
				          filterable
				              expand-trigger="click"
				              :options="cityInfo"
				              v-model="selectedOptions3"
				              @change="handleChange1"
							 :placeholder="$t('public.pleseSelect')"
							  style="width:100%">
				        </el-cascader>
		            </FormItem>
		             <FormItem label="详细地址" prop="address">
		            	<Input v-model="address"  placeholder="请输入详细地址" v-on:input="getLngLat"></Input>
		            </FormItem>
		             	<div style="width:100%;height:300px;margin:10px">
			            	<baidu-map :center="center" :zoom="zoom" @ready="handler" style="width:100%;height:100%;">
		                        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
		                        <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://img.zsydian.com/icon/zspo.png', size: {width: 80, height: 100}}">
		                        </bm-marker>
		                    </baidu-map>
	                    </div>
		        </Col>
            </Form>
            <!--修改-->
            <Form ref="formtempleteEzt" :model="formtempletezt" :rules="ruletempletezt" :label-width="120"  style='margin-top:20px' v-if="!isshowT">
            	<Col span="10">
	            	<FormItem label="自提点名称" prop="name">
	            		<Input v-model="formtempletezt.name" placeholder="请输入自提点名称 最多10个字" :maxlength="10" ></Input>
	            	</FormItem>
	            	<FormItem label="自提点管理员账号" prop="accountPhone">
	            		<Input v-model="formtempletezt.accountPhone" placeholder="请输入管理员手机号"></Input>
	            	</FormItem>
	            	<FormItem label="管理员姓名" prop="adminName">
		            	<Input v-model="formtempletezt.adminName" ></Input>
		            </FormItem>
		            <FormItem label="联系电话" prop="phone">
		            	<Input v-model="formtempletezt.phone"></Input>
		            </FormItem>
		            <FormItem label="营业时间">
	    				<div style="display:flex">
							<FormItem prop="timeH">
								<Input v-model="formtempletezt.timeH" :maxlength="2" style="width:60px" placeholder="小时"></Input>：
							</FormItem>
            				<FormItem prop="timeM">
								<Input v-model="formtempletezt.timeM" :maxlength="2" style="width:60px" placeholder="分钟"></Input>&nbsp; - &nbsp;
							</FormItem>
		                    <FormItem prop="timeh">
								<Input v-model="formtempletezt.timeh" :maxlength="2" style="width:60px" placeholder="小时"></Input> ：
							</FormItem>
		                    <FormItem prop="timem">
								<Input v-model="formtempletezt.timem" :maxlength="2" style="width:60px" placeholder="分钟"></Input> 
							</FormItem>
	                    </div>
	                    <div style="margin-top:10px">输入时间格式参考：09:00-16:00</div> 
		            </FormItem>
		        </Col>
		        <Col  span="14">
		        	<FormItem label="自提点地址" prop="city">
		            	<el-cascader
				          filterable
				              expand-trigger="click"
				              :options="cityInfo"
				              v-model="selectedOptions3"
				              @change="handleChange1"
							 :placeholder="$t('public.pleseSelect')"
							  style="width:100%">
				        </el-cascader>
		            </FormItem>
		             <FormItem label="详细地址" prop="address">
		            	<Input v-model="address"  placeholder="请输入详细地址" v-on:input="getLngLat"></Input>
		            </FormItem>
		            <div style="width:100%;height:300px;margin:10px">
		            	<baidu-map :center="center" :zoom="zoom" @ready="handler" style="width:100%;height:100%;">
	                        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
	                        <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://img.zsydian.com/icon/zspo.png', size: {width: 80, height: 100}}">
	                        </bm-marker>
	                    </baidu-map>
                    </div>
		        </Col>
            </Form>
		</div>
		<div slot="footer">
			<div class='title' style='margin:0px'>
				<div style='color:#D15151;font-size:14px'>
				</div>
				<div style='margin-top:10px'>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ccc;color:#fff" @click="cancelzt"><Icon type="close" style="margin-right:5px;" ></Icon>关闭</Button>
					<Button shape="circle" type="primary" 
					 @click="suretempletezt('formtempletezt')" v-if='isshowzT'><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
					<Button type="primary" style='background:#40ca98;border:none' shape="circle" @click="makegoodseditzt('formtempleteEzt')" v-if='!isshowzT'>
		                <i class="el-icon-edit" style=";margin-right:5px;"></i>
		                修改
		            </Button>
				</div>
			</div>
		</div>
	</Modal>
	</div>
</template>

<script>
import { regionData,CodeToText,TextToCode} from 'element-china-area-data'
	export default {
		data() {
			
			return {
				//到店自提
				zitiThuo:"最早当天可提货，下单",
				tabNameziti:"0",
				formziti:{
					name:"到店自提",
					isType:false,//自提方式
					isbeihuo:true,//自动备货
					hours:null,//小时
					minute:null,//分钟
					day:null,//天
					//备货
					hoursZ:null,///小时
					minuteZ:null,//分钟
					dayZ:null,//天数
					dayZ1:null,//天数
					zitiisTime:false,//买家可选自提时间
					zitiisTimeyxq:false,//提货有效期
					guoqichuli:"过期后，订单将自动完成，不退款",
					zitihx:false,//核销
					zitixianxia:false,//线下
					xianxiaName:"到店自提",//线下支付名称
					timeH:null,
					timeM:null,
					timeh:null,
					timem:null,
				},
				ruleziti:{
					timeH:[{ validator(rule, value, callback){
						if(value>=24){
							 callback(new Error('最大23'));
						}else{
							callback()
						}
					}, trigger: 'blur'}],
					timeM:[{ validator(rule, value, callback){
						if(value>=24){
							 callback(new Error('最大59'));
						}else{
							callback()
						}
					}, trigger: 'blur'}],
					timeh:[{ validator(rule, value, callback){
						if(value>=24){
							 callback(new Error('最大23'));
						}else{
							callback()
						}
					}, trigger: 'blur'}],
					timem:[{ validator(rule, value, callback){
						if(value>=24){
							 callback(new Error('最大59'));
						}else{
							callback()
						}
					}, trigger: 'blur'}],
				},
				//自提点
				isshowzT:false,
				isztshow:false,
				formtempletezt:{
					name:"",
					accountPhone:"",
					adminName:"",
					phone:"",
					city:"",
					timeH:null,
					timeM:null,
					timeh:null,
					timem:null,
				},
				ruletempletezt:{
					name:[{ required: true, message: '自提点名称必须填写', trigger: 'blur' }],
					accountPhone:[{ required: true, message: '管理员手机号必须填写', trigger: 'blur' }],
					adminName:[{ required: true, message: '管理员名称必须填写', trigger: 'blur' }],
					phone:[{ required: true, message: '联系电话必须填写', trigger: 'blur' }],
					timeH:[{ required: true, message: '营业时间必须填写', trigger: 'blur' }],
					city:[{ required: true, message: '地址必须填写', trigger: 'change' }],

					timeH:[{ validator(rule, value, callback){
						if(value>=24){
							 callback(new Error('最大23'));
						}else{
							callback()
						}
					}, trigger: 'blur'}],
					timeM:[{ validator(rule, value, callback){
						if(value>=24){
							 callback(new Error('最大59'));
						}else{
							callback()
						}
					}, trigger: 'blur'}],
					timeh:[{ validator(rule, value, callback){
						if(value>=24){
							 callback(new Error('最大23'));
						}else{
							callback()
						}
					}, trigger: 'blur'}],
					timem:[{ validator(rule, value, callback){
						if(value>=24){
							 callback(new Error('最大59'));
						}else{
							callback()
						}
					}, trigger: 'blur'}],
				},
				//百度地图
                center: {
                    lng: 116.404,
                    lat: 39.915
                },
                zoom: 15,
				province:"",
				country:"",
				address:"",
				ztId:"",//id
				CodeToText:CodeToText,//code转为Text
				TextToCode:TextToCode,//Text转为code
				cityInfo:regionData,//地址数据
				selectedOptions3:[],//绑定的数据
				columnszt:[
					{
						title:"自提点名称",
						key:"name"
					},
					{
						title:"管理员",
						key:"adminName"
					},
					{
						title:"联系电话",
						key:"phone"
					},
					{
						title:"营业时间",
						key:"time"
					},
					{
						title:"地址",
						key:"Raddress",
						render:(h,params)=>{
							return h('span',{

							},params.row.province+params.row.city+params.row.country+params.row.address)
						}
					},
					{
    				title:"操作",
    				width:100,
    				align:"center",
    				key:"action",
    				render:(h,params)=>{
    					return h('div',[
    						h('span',{
    							style:{
    								marginRight:"10px",
    								cursor:"pointer",
    								color:"#4283EB"
    							},
    							on:{
    								"click":()=>{
    									
    									this.isztshow=true
    									this.isshowzT=false 
    									this.ztId=params.row.id
    									this.formtempletezt.name=params.row.name
    									this.formtempletezt.accountPhone=params.row.accountPhone
    									this.formtempletezt.adminName=params.row.adminName
    									this.formtempletezt.phone=params.row.phone
    									
    									//接收地址
    									this.address=params.row.address
				                        this.province=params.row.province
				                        this.formtempletezt.city=params.row.city
				                        this.country=params.row.country
    									this.selectedOptions3=[this.TextToCode[this.province].code,this.TextToCode[this.province][this.formtempletezt.city].code,this.TextToCode[this.province][this.formtempletezt.city][this.country].code]
    									this.getLngLat()
    								}
    							}
    						},'修改'),


    						h('span',{
    							style:{
    								color:'#d53c39',
									cursor:'pointer'
    							},
    							on:{
    								"click":()=>{
    									this.remove(params.row.id,params.row.title)
    								}
    							}
    						},'删除'),

    					])
    				}
    			},
				],//自提点数据
				dataListzt:[{name:"测试",accountPhone:"15862554986",adminName:"xiaoye",phone:"15862554986",time:"09:30-18:00",province:"江苏省",city:"苏州市",country:"吴江区",address:"苏州纳米城"}],
				totalzt:0,
				pageSizezt:0,
				
				//模板
				isshowT:true,
				pageSizetemplete:0,
				totaltemplete:0,
				columnstemplete:[
					{
						title:"名称",
						key:"name"
					},
					{
						title:"费用",
						key:"amount"
					},
					{
						title:"类型",
						key:"scot",
						render:(h,params)=>{
							return h('span',{

							},params.row.scot==0?"买家承担运费":"卖家包邮")
						}
					},
					{
						title:"是否默认",
						key:"default",
						render:(h,params)=>{
							return h('span',{

							},params.row.default?"是":"否")
						}
					},
					{
						title:"操作",
						width:140,
						align:"center",
						key:"action",
						render:(h,params)=>{
							return h('div',[

								h('span',{
									style:{
										marginRight:"10px",
	    								cursor:"pointer",
	    								color:"#4283EB"
									},
									on:{
										"click":()=>{

											this.formtemplete.name=params.row.name
											this.formtemplete.amount=params.row.amount
											this.formtemplete.isdefault=params.row.default
											this.singleTemplete1=params.row.scot
											console.log(this.singleTemplete1)
											if(this.singleTemplete1==0){
												this.formtemplete.singleTemplete="买家承担运费"
											}
											if(this.singleTemplete1==1){
												this.formtemplete.singleTemplete="卖家包邮"
											}
											this.istempleteshow=true
											this.isshowT=false
										}
									}
								},'编辑'),
								h('span',{
									style:{
										marginRight:"10px",
	    								cursor:"pointer",
	    								color:"#4283EB"
									},
									on:{
										"click":()=>{
											this.dataListtemplete.push(params.row)
											// this.addRowTemplete(params.row)
										}
									}
								},'复制'),
								h('span',{
									style:{
										color:'#d53c39',
										cursor:'pointer'
									},
									on:{
										"click":()=>{
											this.dataListtemplete.splice(params.index,1)
											// this.remove(params.row.id,params.row.name)
										}
									}
								},'删除'),
							])
						}
					},
				],
				dataListtemplete:[{name:"商家配送",amount:15,scot:1,default:true}],
				istempleteshow:false,//模板弹框
				formtemplete:{
					name:"",//模板名称
					amount:0,//运费
					isdefault:false,
					singleTemplete:"买家承担运费",
				},
				singleTemplete1:0,
				ruletemplete:{

				},
				tabName:"0",//配送tabs的标志名
				//商家配送
				formDistribution:{
					name:"商家配送",//自定义配送名称
					isType:true,//配送方式
					istime:false,//自定义配送时间
					singlesTime:"使用固定配送时间选项",
					day1:null,//天,可送货上门
					day2:null,//天,可送货上门
					undeline:false,//线下支付
				},
				singlesTime1:0,
				istime:0,
				isType1:0,
				undeline:0,
				ruleDistribution:{

				},
				isProduct:true,
				isProduct1:1,//默认开启 0未开启
                //交易设置
                formValidateSW:{
                	day:1,//天
                	hours:0,//小时
                	minute:0,//分钟
                	ShipNum:7,//已发货
                	ReceiptNum:0,//收货
                    Refund:7,//退款申请
                    return:7,//退款退货
                    returnAgree:7,//商家同意退货
                    returned:7,//买家已退货
                    success:7,//买家交易成功
                    changePrice:null,//改价设置
                    
                },
				ruleValidateSW:{
                    day:[{type:"number", required: true, message: '必须填写', trigger: 'blur' }],
                    ShipNum:[{ type:"number",required: true, message: '必须填写', trigger: 'blur' }],
                    ReceiptNum:[{type:"number", required: true, message: '必须填写', trigger: 'blur' }],
                    Refund:[{type:"number", required: true, message: '必须填写', trigger: 'blur' }],
                    return:[{ type:"number",required: true, message: '必须填写', trigger: 'blur' }],
                    returnAgree:[{type:"number", required: true, message: '必须填写', trigger: 'blur' }],
                    returned:[{type:"number", required: true, message: '必须填写', trigger: 'blur' }],
                    success:[{type:"number", required: true, message: '必须填写', trigger: 'blur' }],
                },
				fhindex:0,
				fhlist:[
					
					{
						label:'交易设置',
						value:1
					},
					{
						label:'物流配置',
						value:0
					},
					
				],
				uid: this.$store.state.common.token,
				//交易设置
				singleLine:"库存+距离优先",
				singleLine1:0,
				single:"优先选中线上支付",
				single1:0,//线上 1线下
				singlesku:"允许扣成负库存",
				singlesku1:0,
				singlesYunf:"叠加",//运费
				singlesYunf1:0,//运费
				skupl:true,//商品评论
				skupl1:0,//商品评论默认开启
				skuplDefault:true,//评论默认显示
				skuplDefault1:0,//评论默认显示
				weiquanV:false,
				weiquanV1:0,
				changePrice:false,//改价设置
				changePrice1:0,//默认欸启用
				weiquanisshow:false,
				weiquanLists:[],//维权理由
				formweiquan:{
					weiquanY:"",
				},
				ruleweiquan:{
					weiquanY:[ { required: true, message: '必须填写', trigger: 'blur' },],
				}
			}
		},
		methods: {
			//自提
			changeTabsziti(s){
				// this.tabNameziti=s
			},
			//自提切换还是商家配送
			switchChangeziti(s){
				this.isProduct=!s
				if(this.isProduct==false){
					this.isProduct1=0
				}
				if(this.isProduct){
					this.isProduct1=1
				}
			},
			//点击新建自提点
			addztPlace(){
				this.isztshow=true
				this.isshowzT=true
				this.formtempletezt.name=""
				this.formtempletezt.accountPhone=""
				this.formtempletezt.adminName=""
				this.formtempletezt.phone=""
				this.formtempletezt.time=""
				this.formtempletezt.city=""
				this.province=""
				this.country=""
				this.address=""
				this.selectedOptions3=[]
				this.center.lng = 116.404;
                this.center.lat = 39.915;
                this.zoom = 15;
			},
			//地址省市区
			handleChange1(arr){
				this.formtempletezt.city = this.CodeToText[arr[0]]
				this.province =this.CodeToText[arr[1]]
				this.country = this.CodeToText[arr[2]]
				this.getLngLat()
			},
			 //设置地图参数
            handler({
                        BMap,
                        map
                    }) {
                this.center.lng = 116.404;
                this.center.lat = 39.915;
                this.zoom = 15;
            },
            getLngLat(){
                var _this = this;
                $.ajax({
                    dataType: 'jsonp',
                    url: 'https://api.map.baidu.com/geocoder/v2/?address='+_this.province+_this.formtempletezt.city+_this.country+ _this.address + '&output=json&ak=BBe8b008fb274f9544aa96828ac8c10e&callback=showLocation',
                    type: 'get',
                    crossDomain: true,
                    success:function(data){
                     _this.center.lng =data.result.location.lng;
                    _this.center.lat = data.result.location.lat;
                    }
                })
            },
			//自提方式
			switchChangezitiType(s){
				this.formziti.isType=s
			},
			
			
			//仙剑自提点确认
			suretempletezt(name){
				this.$refs[name].validate((valid) => {
				 	if(valid){

				 	}
				 })
			},
			//修改自提点
			makegoodseditzt(name){
				this.$refs[name].validate((valid) => {
				 	if(valid){

				 	}
				 })
			},
			//自提点翻页
			getDatazt(current){

			},
			//
			changePageSizezt(size){

			},
			//取消
			cancelzt(){
				this.isztshow=false
				this.formtempletezt.name=""
				this.formtempletezt.accountPhone=""
				this.formtempletezt.adminName=""
				this.formtempletezt.phone=""
				this.formtempletezt.time=""
				this.formtempletezt.city=""
				this.formtempletezt.timeH=""
				this.formtempletezt.timeM=""
				this.formtempletezt.timeh=""
				this.formtempletezt.timem=""
				this.province=""
				this.country=""
				this.address=""
				this.selectedOptions3=[]
			},
			//自动备货
			switchChangezitiisbeihuo(s){
				this.formziti.isbeihuo=s
			},
			//是否开启备货
			changezitiThuo(s){
				this.zitiThuo=s
				if(this.zitiThuo=="最早当天可提货，下单"){
					this.formziti.day=null
					this.formziti.hoursZ=null
					this.formziti.minuteZ=null
					this.formziti.dayZ=null
					this.formziti.dayZ1=null
				}
				if(this.zitiThuo=="按指定天数备货，下单"){
					this.formziti.hours=null
					this.formziti.minute=null
					
					this.formziti.hoursZ=null
					this.formziti.minuteZ=null
					this.formziti.dayZ=null
					this.formziti.dayZ1=null
				}
				if(this.zitiThuo=="按下单时间，确认备货天数"){
					this.formziti.hours=null
					this.formziti.minute=null
					this.formziti.day=null
				}
			},
			//买家可选自提时间
			switchChangezitiisTime(s){
				this.formziti.zitiisTime=s
			},
			
			
			//提货有效期开始
			switchChangezitiisTimeyxq(s){
				this.formziti.zitiisTimeyxq=s
			},
			//过期处理
			changeguoqichuli(s){
				this.formziti.guoqichuli=s
			},
			//是否开启跨自提点核销
			switchChangezitihx(s){
				this.formziti.zitihx=s
			},
			//是否开启自提线下
			switchChangezitixianxia(s){
				this.formziti.zitixianxia=s
			},
			 //保存自提设置
	        savezt(name){
	           	 this.$refs[name].validate((valid) => {
	           	 	if(valid){

	           	 	}
	           	 })
	         },
			//新建配送模板
			addtemplete(){
				this.istempleteshow=true
				this.isshowT=true
			},
			//取消新建模板
			canceltemplete(){
				this.istempleteshow=false
				this.formtemplete.amount=0
				this.formtemplete.name=''
			},
			//获取模板
			getTemplete(){
				this.axios.get('?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						let data=res.data
						this.totaltemplete=data.total
						this.pageSizetemplete=data.pageSize
						this.dataListtemplete=data.rows
					}
				})
			},
			//模板翻页
			getDatatemplete(current){
				this.axios.get('?offset='+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						let data=res.data
						this.totaltemplete=data.total
						this.pageSizetemplete=data.pageSize
						this.dataListtemplete=data.rows
					}
				})
			},
			changePageSizetemplete(size){
				this.pageSizetemplete=size
				
			},
			//删除模板
			remove(id,name){
				this.$Modal.confirm({
                    title: '删除模板'+' '+ name,
                    content: '<p>确定要删除吗?</p>',
                    onOk: () => {
                        this.axios.delete(''+id+'?uid='+this.uid).then(res=>{
							if(res.data.status==200){
								this.$notify({
							        title: '',
							        message: '删除成功',
							        type: 'success',
							        position: 'bottom-right'
						        });
						        this.getTemplete()
							}else{
								this.$notify({
							        title: '',
							        message: '删除失败',
							        type: 'error',
							        position: 'bottom-right'
						        });
							}
						})
                    }
                });
				
			},
			//是否默认模板
			changeisdefault(s){
				this.formtemplete.isdefault=s
			},
			//复制，模板
			addRowTemplete(row){
				this.axios.post('?uid='+this.uid,{
                    	name:row.name,
                    	shipFee:row.shipFee,
                    	default:row.default,
                    	scot:row.scot,//是否卖家承担
                    }).then(res=>{
                    	if(res.data.status==200){
					        this.getTemplete()
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
			//保存模板
			suretemplete(name){
				this.$refs[name].validate((valid) => {
                    if(valid){
                        this.axios.post('?uid='+this.uid,{
                        	name:this.formtemplete.name,
                        	shipFee:this.formtemplete.amount,
                        	default:this.formtemplete.isdefault,
                        	scot:this.singleTemplete1,//是否卖家承担
                        }).then(res=>{
                        	if(res.data.status==200){
                        		this.$notify({
							        title: '',
							        message: '保存成功',
							        type: 'success',
							        position: 'bottom-right'
						        });
						        this.getTemplete()
                        	}else{
                        		this.$notify({
							        title:"",//
							        message: res.data.errorMessage,
							        type: 'error',
							        position: 'bottom-right'
						        });
                        	}
                        })
                    }
                })
			},
			//修改模板确认
			makegoodsedit(name){
				this.$refs[name].validate((valid) => {
                    if(valid){
                        this.axios.update('?uid='+this.uid,{
                        	name:this.formtemplete.name,
                        	shipFee:this.formtemplete.amount,
                        	scot:this.singleTemplete1,//是否卖家承担
                        	default:this.formtemplete.isdefault,
                        }).then(res=>{
                        	if(res.data.status==200){
                        		this.$notify({
							        title: '',
							        message: '修改成功',
							        type: 'success',
							        position: 'bottom-right'
						        });
						        this.getTemplete()
                        	}else{
                        		this.$notify({
							        title:"",//
							        message: res.data.errorMessage,
							        type: 'error',
							        position: 'bottom-right'
						        });
                        	}
                        })
                    }
                })
			},
			//模板类型选择s
			changeTemplete(s){
				this.formtemplete.singleTemplete=s
				if(this.formtemplete.singleTemplete=="买家承担运费"){
					this.singleTemplete1=0
				}
				if(this.formtemplete.singleTemplete=="卖家包邮"){
					this.singleTemplete1=1
				}
			},
			//配送tabs
			changeTabs(name){
				console.log(name)
			},
			//切换
			getfhlistbg(index){
				this.fhindex=index
				if(this.fhindex==0){
					this.getSWSetting()//获取交易设置
				}
				if(this.fhindex==1){
                    
				}
			},

			//商家配送
			switchChangeisProduct(s){
				this.isProduct=s
			},
			//配送方式
			switchChangeisType(s){
				this.formDistribution.isType=s
				if(this.formDistribution.isType==false){
					this.isType1=0
				}
				if(this.formDistribution.isType){
					this.isType1=1
				}
			},
			//自定义配送时间
			switchChangeistime(s){
				this.formDistribution.istime=s
				if(!s){
					this.formDistribution.singlesTime="使用固定配送时间选项"
				}
				if(this.formDistribution.istime==false){
					this.istime1=0
				}
				if(this.formDistribution.istime){
					this.istime1=1
				}
			},

			//时间radio选择
			changeTime(s){
				this.formDistribution.singlesTime=s
				if(this.formDistribution.singlesTime=="使用固定配送时间选项"){
					this.singlesTime1=0
				}
				if(this.formDistribution.singlesTime=="自定义配送时间选项"){
					this.singlesTime1=1
				}
			},
			//天,可送货上门
			changeDay1(s){
				this.formDistribution.day1=s
			},
			//天,可送货上门
			changeDay2(s){
				this.formDistribution.day2=s
			},
			//线下支付
			switchChangeundeline(s){
				this.formDistribution.undeline=s
			},
			//点击去设置 运费模板
			setTemplete(){
				this.tabName="0"
			},
			//保存商家配送
			saveShop(){

			},
          
            //交易设置*PUT /order/config/update 更新订单配置********************************************************************************
            saveSW(name){
                this.$refs[name].validate((valid) => {
                    if(valid){
                        this.axios.put('/order/config/update?uid='+this.uid,{
                        		autoReceipt:this.formValidateSW.ShipNum,
			               		autoCloseReturn:this.formValidateSW.ReceiptNum,
			               		closeOrderDay:this.formValidateSW.day,
			               		closeOrderTime:this.formValidateSW.hours,
			               		closeOrderMin:this.formValidateSW.minute,
			               		closeOrderMin:this.formValidateSW.ReceiptNum,
			               		legalRightsContent:this.weiquanLists.join(','),
			               		legalRightsMoney:this.formValidateSW.Refund,//买家发起退款申请,
			               		legalRightsReturnSku:this.formValidateSW.return,//买家发起退货退款申请
			               		legalRightsAgreeReturnSku:this.formValidateSW.returnAgree,//商家同意退货
			               		legalRightsReturnedSku:this.formValidateSW.returned, //买家已退货
			               		skuCommentDay:this.formValidateSW.success, //评论天数
			               		editOrderPriceRate:this.formValidateSW.changePrice,//改价
			               		editOrderPrice:this.changePrice1,
			               		payType:this.single1,//支付方式
			               		legalRights:this.weiquanV1,
								skuInventoryInsufficient:this.singlesku1,//是否负库存
								shipFeeSet:this.singlesYunf1,//运费组合策略
								skuComment:this.skupl1,//评论
			               		skuCommentShow:this.skuplDefault1,//默认显示评论
			    				orderStore:this.singleLine1//订单
			               		
                        }).then(res=>{
                        	if(res.data.status==200){
                        		this.$notify({
							        title: '',
							        message: '修改成功',
							        type: 'success',
							        position: 'bottom-right'
						        });
						        this.getSWSetting()
                        	}else{
                        		this.$notify({
							        title:"",//
							        message: res.data.errorMessage,
							        type: 'error',
							        position: 'bottom-right'
						        });
                        	}
                        })
                    }
                })
            },
            //获取交易设置GET /order/config/get 更新订单配置
            getSWSetting(){
               this.axios.get('/order/config/get?uid='+this.uid).then(res=>{
               	if(res.data.status==200){
               		let data=res.data.rows
               		this.formValidateSW.ShipNum=data.autoReceipt
               		this.formValidateSW.ReceiptNum=data.autoCloseReturn
               		this.formValidateSW.day=data.closeOrderDay 
               		
               		this.formValidateSW.hours=data.closeOrderTime 
               		this.formValidateSW.minute=data.closeOrderMin 
               		this.formValidateSW.ReceiptNum=data.closeOrderMin
               		this.weiquanLists=data.legalRightsContent==undefined?[]:data.legalRightsContent.split(',')
               		this.formValidateSW.Refund=data.legalRightsMoney//买家发起退款申请,
               		this.formValidateSW.return=data.legalRightsReturnSku //买家发起退货退款申请
               		this.formValidateSW.returnAgree=data.legalRightsAgreeReturnSku //商家同意退货
               		this.formValidateSW.returned=data.legalRightsReturnedSku //买家已退货
               		this.formValidateSW.success=data.skuCommentDay //评论天数
               		this.formValidateSW.changePrice=data.editOrderPriceRate//改价
               		this.weiquanV1=data.legalRights
               		if(this.weiquanV1==0){
						this.weiquanV=false
					}
					if(this.weiquanV1==1){
						this.weiquanV=true
					}
               		this.changePrice1=data.editOrderPrice
               		if(this.changePrice1==0){
               			this.changePrice=false
               		}
               		if(this.changePrice1==1){
               			this.changePrice=true
               		}
               		//支付方式
               		this.single1=data.payType
               		if(this.single1==0){
						this.single="优先选中线上支付"
					}
					if(this.single1==1){
						this.single="优先选中线下支付"
					}
					//是否负库存
					this.singlesku1=data.skuInventoryInsufficient
					if(this.singlesku1==0){
						this.singlesku="允许扣成负库存"
					}
					if(this.singlesku1==1){
						this.singlesku="整个订单自动维权"
					}
					//运费组合策略
					this.singlesYunf1=data.shipFeeSet
					if(this.singlesYunf1==0){
						this.singlesYunf="叠加"
					}
					if(this.singlesYunf1==1){
						this.singlesYunf="以最低运费结算"
					}
					if(this.singlesYunf1==2){
						this.singlesYunf="以最高运费结算"
					}
					//评论
					this.skupl1= data.skuComment 
					if(this.skupl1==0){
               			this.skupl=true
               		}
               		if(this.skupl1==1){
               			this.skupl=false
               		}

               		//默认显示评论
               		this.skuplDefault1=data.skuCommentShow //默认显示评论
               		if(this.skuplDefault1==0){
						this.skuplDefault=true
					}
					if(this.skuplDefault1==1){
						this.skuplDefault=false
					}
					//线下订单配置
					this.singleLine1=data.orderStore
					if(this.singleLine1==0){
						this.singleLine="库存+距离优先"
					}
					if(this.singleLine1==1){
						this.singleLine="会员来源优先"
					}
					if(this.singleLine1==2){
						this.singleLine="手动分配"
					}
					
               	}
               })
            },
            //天数
            changeDay(s){
            	console.log(s)
            	this.formValidateSW.day=s
            },
            //小时
            changeHours(s){
            	this.formValidateSW.hours=s
            },
            //分钟
            changeMinute(s){
            	this.formValidateSW.minute=s
            },
            //已发货订单
            changeShipNum(s){
            	this.formValidateSW.ShipNum=s
            },
            //已收货订单
            changeReceiptNum(s){
            	this.formValidateSW.ReceiptNum=s
            },
			//默认支付方式
			changeSB(s){
				this.single=s
				if(this.single=="优先选中线上支付"){
					this.single1=0
				}
				if(this.single=="优先选中线下支付"){
					this.single1=1
				}
				console.log(this.single1)
			},
			//买家发起退款申请
			changeRefund(s){
				this.formValidateSW.Refund=s
			},
			//买家发起退货退款申请
			changereturn(s){
				this.formValidateSW.return=s
			},
			//商家同意退货
			changereturnAgree(s){
				this.formValidateSW.returnAgree=s
			},
			//买家已退货
			changereturned(s){
				this.formValidateSW.returned=s
			},
			//改价选择
			changechangePrice(s){
				this.formValidateSW.changePrice=s
			},
			//买家交易成功评论
			changesuccess(s){
				this.formValidateSW.success=s
			},
			//商品规格库存不足处理方式
			changeSku(s){
				this.singlesku=s
				if(this.singlesku=="允许扣成负库存"){
					this.singlesku1=0
				}
				if(this.singlesku=="整个订单自动维权"){
					this.singlesku1=1
				}
			},
			//维权原因
			switchChange(s){
				this.weiquanV=s
				if(this.weiquanV==false){
					this.weiquanV1=0
				}
				if(this.weiquanV){
					this.weiquanV1=1
				}
				console.log(this.weiquanV1)
			},
			//线上订单配置
			changeLine(s){
				this.singleLine=s
				if(this.singleLine=="库存+距离优先"){
					this.singleLine1=0
				}
				if(this.singleLine=="会员来源优先"){
					this.singleLine1=1
				}
				if(this.singleLine=="手动分配"){
					this.singleLine1=2
				}
			},
			//改价设置
			switchChangePrice(s){
				this.changePrice=s
				if(this.changePrice==false){
					this.changePrice1=0
				}
				if(this.changePrice){
					this.changePrice1=1
				}
				console.log(this.changePrice1)
			},
			//关闭一条维权原因
			handleClose(index){
				this.weiquanLists.splice(index,1)
				
			},
			//新增维权
			addTag(){
				if(this.weiquanLists.length>=10){
					this.$notify({
                        title:"",//
                        message:'最多10条！',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.weiquanisshow=true
				}
			},
			//新增确认
			sureweiquan(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						this.weiquanLists.push(this.formweiquan.weiquanY)
						this.formweiquan.weiquanY=''
						// this.weiquanLists.join(',')//逗号分割数组
						this.weiquanisshow=false
					}
				})
				
			},
			//新增取消
			cancelweiquan(){
				this.weiquanisshow=false
			},
			//运费
			changeYunf(s){
				this.singlesYunf=s
				if(this.singlesYunf=="叠加"){
					this.singlesYunf1=0
				}
				if(this.singlesYunf=="以最低运费结算"){
					this.singlesYunf1=1
				}
				if(this.singlesYunf=="以最高运费结算"){
					this.singlesYunf1=2
				}
			},
			//物流费用
			changeshipFee(s){
				this.formValidateSW.shipFee=s
			},
			
			//开启商品评论与关闭
			switchskupl(s){
				this.skupl=s
				if(this.skupl){
					this.skupl1=0
				}
				if(this.skupl==false){
					this.skupl1=1
				}
			},
			//评论默认显示
			switchskuplDefault(s){
				this.skuplDefault=s
				if(this.skuplDefault){
					this.skuplDefault1=0
				}
				if(this.skuplDefault==false){
					this.skuplDefault1=1
				}
			},
		},
		mounted() {
			this.getSWSetting()//获取交易设置
		}
	}
</script>

<style lang="css" scoped>
.rowClass{
	padding: 15px 15px 5px;
	background: #f2f2f6;
	margin:10px;
	border-radius: 6px
}
/*.top-rom */
.rowClass:last-child{
	margin-bottom:120px;
}
.font-700{
	font-weight: 700;
	font-size:18px;
}

.spanColor{
	color: #9797a1;
}










	.units-box {
		width: 100%;
		background: rgb(230,233,236);
	}
	.btns-box {
		width: 100%;
		height: 50px;
		display:flex;
		justify-content: space-between;
		background: #fff;
		line-height: 50px;
	}
	 .wldw{
    	margin-left: 15px;
    	font-size:18px;font-weight:bold;
    }
	.right{
		margin-right:10px;
		margin-bottom:10px;
	}
	.ivu-icon-chevron-down {
		font-size: 10px;
	}
	.btns img {
		width: 14px;
		height: 14px;
		vertical-align: middle;
	}
	.main-left{
		width:120px;
		flex:0 0 120px;
		margin-right:3px;
		
		background: #fff;
	}
	.main-left li{
		list-style: none;
		padding:10px 0;
		width:100%;
		
	}
	.main-left li span{
		margin-left:10px;
	}
	.table {
		    width: 100%;
		height: 100%;
		overflow: auto;
		
		background: #fff;
	}
	.bor{
		background:rgb(241,245,247);
        color:rgb(59,119,227);
	}
.mtewm{
width:88%;

display:flex;
padding: 0px 200px 0 200px;

justify-content: center;
align-items: center;
flex-direction: column;
    	
}
.mtewm span{
	width:260px;
	height:30px;
	line-height: 30px;
	font-weight:600;
	text-align: center
}
.mtewm div{
	width:260px;
	height:60px;
	line-height: 35px;
	
}
.page-boxT{
	padding:10px;
}
.ygewm{
	 padding:10px;
	width:100%;
	height:100%;
	display: flex;
	flex-wrap: wrap;
    text-align: center;
	background: #fff
}
.ygewm-list{
	margin:10px;
    height: 195px;
    width:17%;
    padding:10px;
    justify-content: center;
    text-align: center;
    border: 1px solid #ccc;
}
.page-box{
	width:100%;
	margin-right:56px;
	margin-top:15px;
	text-align: center;
	margin-bottom:120px;
}
.bottom-btn{
	width:100%;
	height:80px;
	/*border:1px solid red;*/
	margin-top:10px;
	background: #f8f8f8;
	line-height: 80px;
	margin-right:56px;
	text-align:right;

}
.managementChannel .main .img-icon img:nth-child(1){
	margin-left:2px;
	margin-top:2px;
}
.managementChannel .img-icon{
	background: #0ECC6E;
}
.main{
	width:100%;
	padding-left:20px;
	display:flex;
	flex-wrap: wrap;
	
}
.main li{
	cursor:pointer
}

.main li{
	display:flex;
	align-items: center;
	justify-content: flex-start;
	margin:10px 8px;
	/*background: #F8F7F6;*/
	border: 1px solid #f5f5f5;
	width:285px;
}
.li-right{
	padding-left:15px;
	width:200px;
	overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.img-icon{
    width: 60px;
    height: 60px;
    position: relative;
    background: #F38C40;
    text-align: center;
    padding: 10px 0;
    line-height: 60px;
}
.public{
	margin-bottom:20px;
}
</style>



