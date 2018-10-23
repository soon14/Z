<template>
	<div class="units-box">
		<!--欠债弹框-->
		<div class='bod'>
			<div class='qzModel' v-if='iscz'>
				<span style='font-weight:bold'>因为账户余额不足导致当前有 <span style='color:#F67403'>{{hhrData.length}}</span>  位合伙人&股东的佣金未发放，总计  <span style='color:#F67403'>{{hhrAndGdAmount}}</span> 元</span>
				<span class='czBtn' @click='clickczBtn'>立即充值</span>
				 <span @click="clickcha" style='margin-right:20px;cursor:pointer;margin-left: 20px;'><Icon type="close"></Icon></span>
			</div>
		<!-- <div class='goods-left'>
			<div class='left-top'>
				<span style='font-size:14px;font-weight:600;margin-left:10px'>合伙人&股东</span>
			</div>
			<div style="height:100%;"  class='flclass'>
				<div style='margin-bottom:160px'>
					<li class='flclass' v-for='(item,index) in Allfl' :key='index' @click='addBg(index)' :class="{bg:numIndex==index}" style='display:flex;justify-content: space-between'>
						<div style='margin-left:10px'>{{item.label}}</div>
					</li>
				</div>
			</div>
		</div> -->
		<Tabs :animated="false"  style="background:#fff;width:100%;height:100%" @on-click="addBg">
	        <TabPane label="概览">
	        	<!--概览-->
				<div class='goods-right ' style='background:#F1F1F1;position:relative'>
					<!--表格数据-->
					<div class="table" style='background:#fff;margin:0;'>
						<div class='gltop'>
							<div>
								<span>账户余额</span>
								<div style='margin-left:100px'>
									<span style='font-size:40px;color:#F67403'>
										{{withDraw}}
									</span>
									<span>元</span>
								</div>
							</div>
							<div>
								<div style='margin:5px 0'>
									<Button type="ghost" @click='topcz'>充值</Button>
								</div>
								<div style='margin:5px 0'>
									<Button type="ghost" @click='clicktx'>提现</Button>
								</div>
								<div>
									<span style='color:#407AE4;font-size:12px;cursor:pointer' @click='yhk'>银行卡管理</span>
								</div>
							</div>
						</div>
						<div class='glbottom'>
							<li>
								<span>本周合伙人拓客：</span>
								<div style='margin-left:60px;margin-top:10px'>
									<span style='font-size:18px'>
										{{tkObjectCount}}
									</span>
									<span>人</span>
								</div>
							</li>
							<li>
								<span>本周合伙人带动的消费：</span>
								<div style='margin-left:60px;margin-top:10px'>
									<span style='font-size:18px'>
										￥：{{tkObjectConsumption}}
									</span>
									<span>元</span>
								</div>
							</li>
							<li>
								<span>未支付合伙人的佣金：</span>
								<div style='margin-left:60px;margin-top:10px'>
									<span style='font-size:18px'>
										￥：{{tkObjectCommission}}
									</span>
									<span>元</span>
								</div>
							</li>
						</div>
					</div>
					<div class="table" style='background:#fff;margin:10px 0 0 0;height:70%'>
						<div style='display:flex;justify-content: space-between;padding:10px 30px;'>
							<span style='font-size:14px;font-weight: bold'>近期合伙人&股东的佣金支付</span>
							<span style='font-size:14px;color:#407AE4;cursor:pointer' @click='clickAll()'>查看全部</span>
						</div>
						<div style='margin:0 10px'>
							<Table border highlight-row :columns="glcolumns" :data="glData" ></Table>
							<!--底部的分页-->
							<div class="page-box">
								<Page :total="gltotal" show-total size='small' :pageSize='glpageSize'  @on-change="glgetData" @on-page-size-change="glchangePageSize"></Page>
							</div>
						</div>

					</div>
				</div>
	        </TabPane>
	        <TabPane label="我的合伙人">
				<div class='goods-right'>
					<div class="btns-box">
						<div style='display:flex'>
							<div class="wldw">
		                        <!-- <Select style="width:100px;margin-top:10px;margin-right:20px"  placeholder="全部" @on-change="orderselected">
						       	 <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
						    	</Select> -->
						    	<div style='margin-right:20px;display:flex'>
					                <Input style='margin-top:10px;width:300px' v-model='hhrKeyword' placeholder='请输入编码或名称' @on-enter='enterSearch'>
					                <span slot="append"  @click='searchhhr' style='cursor:pointer;'>搜索</span>
					                </Input>
					                 <!-- <a style='font-size:14px;font-weight:600;margin-left:20px;border-bottom:1px solid #3b77e3;height:40px' @click='searchLocation'>精准搜索</a> -->
					            </div>
		                    </div>
						</div>
						<!-- <div class="right">
							<Dropdown trigger="click" style="margin-left: 4px;border:none">
			                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
			                    <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
				                </Button>

				                <DropdownMenu slot="list">
				                    <span  @click=""><DropdownItem >删除</DropdownItem></span>
				                </DropdownMenu>
			             	</Dropdown>
			             	<span @click="cancelHome" style="cursor:pointer; margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
						</div> -->
					</div>
					<!-- <div style='height:50px'></div> -->
						<!--我的合伙人数据@on-select="selected"  @on-row-click='selectRow'-->
						<div class="table">
							<Table border highlight-row :columns="hhrcolumns" :data="hhrData" ></Table>
							<!--底部的分页-->
							<div class="page-box">
								<Page :total="hhrtotal" show-total size='small' :pageSize='hhrpageSize'  @on-change="hhrgetData" @on-page-size-change="hhrchangePageSize"></Page>
							</div>
						</div>
				</div>
	        </TabPane>
	        <TabPane label="我的股东">
				<div class='goods-right'>
					<div class="btns-box">
						<div style='display:flex'>
							<div class="wldw">
		                       
		                        <!-- <Select style="width:100px;margin-top:10px;margin-right:20px"  placeholder="全部" @on-change="gdorderselected">
						       	 <Option v-for="item in gdorderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
						    	</Select> -->
						    	<div style='margin-right:20px;display:flex'>
					                <Input style='margin-top:10px;width:300px' v-model='gdKeyword' placeholder='请输入编码或名称' @on-enter='gdenterSearch'>
					                <span slot="append"  @click='gdsearch' style='cursor:pointer;'>搜索</span>
					                </Input>
					                 <!-- <a style='font-size:14px;font-weight:600;margin-left:20px;border-bottom:1px solid #3b77e3;height:40px' @click='gdsearchLocation'>精准搜索</a> -->
					            </div>
		                    </div>
						</div>
						<!-- <div class="right">
							<Dropdown trigger="click" style="margin-left: 4px;border:none">
			                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
			                    <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
				                </Button>

				                <DropdownMenu slot="list">
				                    <span  @click=""><DropdownItem >删除</DropdownItem></span>
				                </DropdownMenu>
			             	</Dropdown>
			             	<span @click="cancelHome" style="cursor:pointer; margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
						</div> -->
					</div>
					<!-- <div style='height:50px'></div> -->
						<!--我的股东数据@on-select="selected"  @on-row-click='selectRow'-->
						<div class="table">
							<Table border highlight-row :columns="gdcolumns" :data="gdData" ></Table>
							<!--底部的分页-->
							<div class="page-box">
								<Page :total="gdtotal" show-total size='small' :pageSize='gdpageSize'  @on-change="gdgetData" @on-page-size-change="gdchangePageSize"></Page>
							</div>
						</div>
				</div>
	        </TabPane>
	        <TabPane label="合伙人设置">
	        	<!--合伙人设置列表-->
				<div class='goods-right'>
					<div class="btns-box">
						<div style='display:flex'>
							<div class="wldw">
		                    </div>
						</div>
						<div class="right">
							<Button type="primary" style='background:#3b77e3' shape="circle" @click="addhhr()">
							 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>添加
							</Button>
							<!-- <Dropdown trigger="click" style="margin-left: 4px;border:none">
			                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
			                    <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
				                </Button>

				                <DropdownMenu slot="list">
				                    <span  @click="hhrsedel"><DropdownItem >删除</DropdownItem></span>
				                </DropdownMenu>
			             	</Dropdown> -->
			             	<span @click="cancelHome" style="cursor:pointer; margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
						</div>
					</div>
					<!-- <div style='height:50px'></div> -->
						<!--我的合伙人@on-select="selected"  @on-row-click='selectRow'-->
						<div class="table">
							<Table border highlight-row :columns="hhrcolumnssettting" :data="hhrDatasettting" @on-row-click='clickrow'></Table>
							<!--底部的分页-->
							<div class="page-box">
								<Page :total="hhrtotalsettting" show-total size='small' :pageSize='hhrpageSizesettting'  @on-change="hhrgetDatasettting" @on-page-size-change="hhrchangePageSizesettting"></Page>
							</div>
						</div>
				</div>
	        </TabPane>
	        <TabPane label="股东设置">
	        	<!--股东设置-->
				<div class='goods-right'>
					<div class="btns-box">
						<div style='display:flex'>
							
						</div>
						<div class="right">
							<Button type="primary" style='background:#3b77e3' shape="circle" @click="savegd('formValidategd')">
							 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>保存
							</Button>
							
			             	<span @click="cancelHome" style="cursor:pointer; margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
						</div>
					</div>
					<!--  <div style='height:50px'></div> --> 
						<div class="table" style='margin-bottom:120px'>
							<Form ref="formValidategd" :model="formValidategd" :rules="ruleValidategd" :label-width="80">
								<FormItem label="加入金额" prop="amount">
									<div style='display:flex'>
										<div>
			                       	 		<Input v-model="formValidategd.amount"  placeholder="现金" style='width:80px'></Input>
			                       	 		<span>元</span>
			                       	 	</div>
			                       	 	<div style='margin-left:40px'>
			                       	 		<span>加入时效</span>
			                       	 		<Input v-model="formValidategd.validDays"  placeholder="日期" style='width:80px'></Input>
			                       	 		<span>天</span>
			                       	 	</div>
		                       	 	</div>
		                    	</FormItem>
		                    	<FormItem prop="crmCardPer">
		                    		<span style='margin-left:-60px'>合伙人拓客提成：会员卡金额的</span>
		                    		<Input v-model='formValidategd.crmCardPer' placeholder="比例" style='width:60px'></Input> %
		                       	</FormItem>
		                       	<FormItem prop="firstCrmSalesPer">
		                    		<span style='margin-left:-60px'>客户连带消费提成：</span>
		                    		<span style='margin-left:5px'>一级客户首次消费分红：</span>
		                    		<Input v-model='formValidategd.firstCrmSalesPer' placeholder="比例" style='width:60px'></Input> %  , 
		                    		<span> 之后每次 </span><Input v-model='formValidategd.crmSalesPer' placeholder="比例" style='width:60px'></Input> %
		                    		<div  style='margin-left:56px;margin-top:10px'>
		                    			<span>二级客户首次消费分红：</span>
		                    			<Input v-model='formValidategd.secCrmSalesPer' placeholder="比例" style='width:60px'></Input> %  , 
		                    			<span> 之后每次 </span><Input v-model='formValidategd.secSalesPer' placeholder="比例" style='width:60px'></Input> %
		                    		</div>
		                       	</FormItem>
		                       	<FormItem prop="storeSalesPer">
		                    		<span style='margin-left:-60px'>合伙人店铺分红：</span>
		                    		<span >营收比例的：</span>
		                    		<Input v-model='formValidategd.storeSalesPer' placeholder="比例" style='width:60px'></Input> %  
		                    		<span> 作为合伙人的红利 </span>
		                       	</FormItem>
		                       	<FormItem prop="maxCount">
		                    		<span style='margin-left:-60px'>合伙人人数限制：</span>
		                    		<RadioGroup v-model='ren' @on-change='gdchange'>
				    					<div style='display:flex;margin-left:20px;margin-top:10px;margin-bottom:10px;line-height:35px'>
				    						<Radio label='人'></Radio>  
				    						<Input v-model='formValidategd.maxCount' style="width:90px" placeholder='人数'></Input>
				    						<Radio label='不限制' style='margin-left:20px'></Radio>
				    					</div>
				    				</RadioGroup>
		                       	</FormItem>
		                       	<FormItem prop="storeSalesDiscount">
		                    		<span style='margin-left:-60px'>合伙人福利：</span>
		                    		<span >合伙人到店消费享受：</span>
		                    		<Input v-model='formValidategd.storeSalesDiscount' placeholder="比例" style='width:60px'></Input>
		                    		<span> 折福利 </span>
		                       	</FormItem>
							</Form>
						</div>
				</div>
	        </TabPane>
	        <TabPane label="佣金支付明细">
	        	<!--佣金支付明细-->
				<div class='goods-right'>
						<div class="table">
							<Table border highlight-row :columns="mxcolumns" :data="mxData" ></Table>
							<!--底部的分页-->
							<div class="page-box">
								<Page :total="mxtotal" show-total size='small' :pageSize='mxpageSize'  @on-change="mxgetData" @on-page-size-change="mxchangePageSize"></Page>
							</div>
						</div>
				</div>
	        </TabPane>
	    
	         <Button @click="cancelHome" size="small" slot="extra" style='margin-top:3px;margin-right:20px'>返回</Button>
	    </Tabs>
		
		<!--合伙人设置添加的侧滑页面-->
		<!--合伙人设置添加侧栏-->
		<div class='addHot'>
    		<div class='addHot-head'>
    			<span style='margin-left:20px'>新建合伙人规则</span>
    			<div>
    				 <Button shape="circle" type="ghost" @click="savehhr('formValidate')" style=';border:none;margin-right:15px;background:#3b77e3;color:#fff'>
	                   <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>保存
	                </Button>
	                <span @click="cancelhot" style='margin-right:20px;cursor:pointer'><Icon type="close"></Icon></span>
    			</div>
    		</div>
    		<div style='margin:20px;border:1px solid #e4e4e4;background:#FCFCFC;padding:10px'>
    			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="85">
	    			<FormItem label="合伙人类型" prop="recordName">
                        <Input v-model="formValidate.recordName"  placeholder="请输入一个类型名称"></Input>
                    </FormItem>
                    <FormItem label="入伙金额" prop="amount">
                        <div style='display:flex'>
								<div>
	                       	 		<Input v-model="formValidate.amount"  placeholder="现金" style='width:80px'></Input>
	                       	 		<span>元</span>
	                       	 	</div>
	                       	 	<div style='margin-left:40px'>
	                       	 		<span>入伙时效</span>
	                       	 		<Input v-model="formValidate.validDays"  placeholder="日期" style='width:80px'></Input>
	                       	 		<span>天</span>
	                       	 	</div>
                       	 	</div>
                    </FormItem>
                    <FormItem prop="crmCardPer">
                    		<span style='margin-left:-60px'>合伙人拓客提成：会员卡金额的</span>
                    		<Input v-model='formValidate.crmCardPer' placeholder="比例" style='width:60px'></Input> %
                       	</FormItem>
                       	<FormItem prop="firstCrmSalesPer">
                    		<span style='margin-left:-60px'>客户连带消费提成：</span>
                    		<span style='margin-left:5px'>一级客户首次消费分红：</span>
                    		<Input v-model='formValidate.firstCrmSalesPer' placeholder="比例" style='width:60px'></Input> %  , 
                    		<span> 之后每次 </span><Input v-model='formValidate.crmSalesPer' placeholder="比例" style='width:60px'></Input> %
                    		<div  style='margin-left:56px;margin-top:10px'>
                    			<span>二级客户首次消费分红：</span>
                    			<Input v-model='formValidate.secCrmSalesPer' placeholder="比例" style='width:60px'></Input> %  , 
                    			<span> 之后每次 </span><Input v-model='formValidate.secSalesPer' placeholder="比例" style='width:60px'></Input> %
                    		</div>
                       	</FormItem>
                       	<FormItem >
                    		<span style='margin-left:-60px'>合伙人店铺分红：</span>
                    		<span >营收比例的：</span>
                    		<Input v-model='formValidate.storeSalesPer' placeholder="比例" style='width:60px'></Input> %  
                    		<span> 作为合伙人的红利 </span>
                       	</FormItem>
                       	<FormItem >
                    		<span style='margin-left:-60px'>合伙人人数限制：</span>
                    		<RadioGroup v-model='ren1' @on-change='changeRadio'>
		    					<div style='display:flex;margin-left:20px;margin-top:10px;margin-bottom:10px;line-height:35px'>
		    						<Radio label='人'></Radio>  
		    						<Input v-model='formValidate.maxCount' style="width:90px" placeholder='人数'></Input>
		    						<Radio label='不限制' style='margin-left:20px'></Radio>
		    					</div>
		    				</RadioGroup>
                       	</FormItem>
                       	<FormItem >
                    		<span style='margin-left:-60px'>合伙人福利：</span>
                    		<span >合伙人到店消费享受：</span>
                    		<Input v-model='formValidate.storeSalesDiscount' placeholder="比例" style='width:60px'></Input>
                    		<span> 折福利 </span>
                       	</FormItem>
    			</Form>
    		</div>
    	</div>
    	<!--充值侧栏-->
    	<div class='addHotcz'>
    		<div v-if='cxz'>
	    		<div class='addHot-head'>
	    			<span style='margin-left:20px'>余额充值</span>
	    			<div>
		                <span @click="cancelhotcz" style='margin-right:20px;cursor:pointer'><Icon type="close"></Icon></span>
	    			</div>
	    		</div>
	    		<div style='margin:20px;background:#FCFCFC;padding:10px'>
	    			<Form ref="formValidatecz" :model="formValidatecz" :rules="ruleValidatecz" :label-width="80">
		    			<FormItem label="充值账户">
	                        <span>{{user.mobile}}</span>
	                    </FormItem>
	                    <FormItem label="充值金额" prop="amount">
	                       <Input v-model='formValidatecz.amount' placeholder="输入需要充值的金额" style='width:200px'></Input>
	                    </FormItem>
	                    <Button  type="primary" style=";border:none;height:32px;margin-left:80px;width:100px" @click='surecz("formValidatecz")'>确认充值
			             </Button>
	    			</Form>
	    		</div>
    		</div>
    		<div v-if='!cxz'>
    			<div class='ewmpage'>
    				<span style='margin-top:20px;display:inline-block'>支付宝或微信扫一扫进行付款（元）</span>
    				<span>{{formValidatecz.amount}}</span>
    				<div>
    					<img :src="payObject.payUrl">
    				</div>
    				<span>完成后自动跳转</span>
    				<span>若未跳转请点击<a @click='handerGo'>手动跳转</a></span>
    			</div>
    		</div>
    	</div>
    	<!--银行卡管理侧栏-->
    	<div class='addHotyh'>
    		<div class='addHot-head'>
    			<span style='margin-left:20px'>银行卡管理</span>
    			<div>
	                <span @click="cancelhotyh" style='margin-right:20px;cursor:pointer'><Icon type="close"></Icon></span>
    			</div>
    		</div>
    		<div style='margin:20px;background:#FCFCFC;padding:10px'>
    			<div class='yhkmain'>
	    			<div v-for='(item,index) in yhkData' :key='index' class='yhkdiv'>
	    				<div class='yhk-top'>
	    					<div style='display:flex'>
	    						<div style='height:40px;width:40px;border-radius:50%;overflow: hidden;line-height:40px;text-align:center'>
		    						<img src="" width='40' height='40'>
		    					</div>
		    					<div style='margin-left:10px;'>
			    					<p style='font-size:14px;fong-weight:bold'>{{item.name}}</p>
		    					</div>
	    					</div>
	    					<div>
	    						
	    						<span style='color:#CF4949;cursor:pointer' @click='delyhk(item.id)'>删除</span>
	    					</div>
	    				</div>
	    				<div class='yhk-bottom'><!--{{item.account.substring(item.account.length-3)}}-->
	    					<div class='yykNumber'>****  ****  ****  ****  <span>{{item.account?item.account.substring(item.account.length-3):""}}</span></div>
	    				</div>
	    			</div>
	    			<div class='yhkdiv'>
	    				<div class='add-bor'>
	    					<div class='add-bor-center' @click='addyhk'>
	    						<Icon type="plus-round" size='40' style='color:#b2b2b2'></Icon>
	    						<span style='color:#b2b2b2;font-size:16px'>添加银行卡</span>
	    					</div>
	    				</div>
	    			</div>
    			</div>
    		</div>
    	</div>
    	<!--提现侧栏-->
    	<div class='addHottx'>
    		<div v-if='istx'>
	    		<div class='addHot-head'>
	    			<span style='margin-left:20px'>资金提现</span>
	    			<div>
		                <span @click="cancelhottx" style='margin-right:20px;cursor:pointer'><Icon type="close"></Icon></span>
	    			</div>
	    		</div>
	    		<div style='margin:20px;background:#FCFCFC;padding:10px'>
	    			<Form ref="formValidatetx" :model="formValidatetx" :rules="ruleValidatetx" :label-width="80">
	    				<FormItem label="选择银行卡">
	                      <div>
	                      	<li v-for='(item,index) in yhkData' :key='index' class='yhklist'>
	                      		<div class='yhklist1' >
	                      			<!-- <RadioGroup > -->
	                      				<Radio v-model="item.default" style='margin-left:10px'  @on-change='changeyhkisDefault(item)'></Radio>
	                      			<!-- </RadioGroup> -->
	                      				<!-- <Checkbox :value="item.default" @on-change='changeyhkisDefault(item)'></Checkbox> -->
	                      		<div style='height:25px;width:25px;border-radius:50%;overflow: hidden;line-height:25px;text-align:center;margin-top: 2px;'>
	                      			<img src="" style='width:100%;height:100%;vertical-align: middle;'>
	                      		</div>
	                      			<span style='margin-left:20px'>{{item.name}}</span>
	                      			<span style='margin-left:20px'>尾号{{item.account?item.account.substring(item.account.length-3):""}}</span>
	                      		</div>
	                      		<span style='margin-right:40px'>单笔最高50000.00 单日最高500000.00</span>
	                      	</li>
	                      	<li class='yhklist2' style='color:#407BE4;cursor:pointer' @click='addyh'><span style='display:inline-block;margin:0 10px'>+ </span>添加新银行</li>
	                      </div>
	                    </FormItem>
	                    <FormItem label="提现金额" prop="amount">
	                       <Input v-model='formValidatetx.amount' placeholder="输入需要提现的金额" style='width:200px'></Input><span style='color:#b2b2b2'>(每笔提现收取0.01%手续费，最低收取0.1元）</span>
	                    </FormItem>
	                    <Button  type="primary" style=";border:none;height:32px;margin-left:80px;width:100px" @click='suretx("formValidatetx")'>确认提交
			             </Button>
	    			</Form>
	    		</div>
    		</div>
    		<div v-if='!istx'>
    			<div class='ewmpage1'>
    				<div style='width: 100%;text-align: right;height: 30px;line-height: 30px;'>
		                <span @click="cancelhottx" style='margin-right:20px;cursor:pointer'><Icon type="close"></Icon></span>
	    			</div>
    				<div style='margin: 60px 40px 40px 0px;width: 45%;'>
	    				<el-steps :space="150" :active="active" finish-status="success" :align-center='true'>
						  <el-step title="申请交易"></el-step>
						  <el-step title="银行处理"></el-step>
						  <el-step title="交易完成"></el-step>
						</el-steps>
					</div>
					<div style='display:flex;border:1px solid #e4e4e4;padding:20px 70px;margin-left: -6px;'>
						<img src="" width='150' height='150'>
						<div style='padding:0 45px'>
							<li> <span>操作类型：</span><span>提现</span></li>
							<li> <span>收款账户：</span><span>{{yhkname}}</span></li>
							<li> <span>账户信息：</span><span>尾号{{yhkzh!=""?yhkzh.substring(yhkzh.length-3):""}}</span></li>
							<li> <span>操作日期：</span><span>{{czdate}}</span></li>
							<li> <span>操作人：</span><span>{{user.trueName}}</span></li>
						</div>
					</div>
    			</div>
    		</div>
    	</div>
		<!--合伙人设置蒙版-->
		<div class="mark1"></div>
		<!--充值蒙版-->
		<div class="mark1cz"></div>
		<!--银行卡管理蒙版-->
		<div class="mark1yh"></div>
		<!--提现蒙版-->
		<div class="mark1tx"></div>
		</Modal>
	
		<!--添加银行卡-->
		<Modal v-model="yhkisshow" width="460px">
				<p slot="header" style="height:30px;line-height:30px;align-item:center">
					<span>添加银行卡</span>
				</p>
				<Form ref="formValidateyhk" :model="formValidateyhk" :rules="ruleValidateyhk" :label-width="90">
					<FormItem label='银行卡卡号' prop="account">
                		<Input v-model='formValidateyhk.account' style=''></Input>
                		<div style='color:#b2b2b2'>输入卡后会自动识别银行和卡种</div>
                   	</FormItem>
                   	<FormItem label='银行卡名称' prop="name">
                		<Input v-model='formValidateyhk.name' placeholder='输入银行卡名称' style=''></Input>
                   	</FormItem>
                   	<FormItem label='真实姓名' prop="userName">
                		<Input v-model='formValidateyhk.userName' style=''></Input>
                   	</FormItem>
                   	<FormItem label='手机号' prop="mobile">
                		<Input v-model='formValidateyhk.mobile' style=''></Input>
                		<div style='color:#b2b2b2'>请填写该卡注册真实姓名及手机号，以验证银行卡是否属于本人</div>
                   	</FormItem>
				</Form>
				<div slot="footer">
					<div class='footer-mark'>
						<span><a style='color:#999;font-size:14px' @click='cancelyhk'>取消添加</a></span>
						<span style='font-size:20px;width:1px;height:40px;background:#e4e4e4'></span>
						<span ><a style='color:#3B77E3;font-size:14px' @click='sureyhk("formValidateyhk")'>同意并确认</a></span>
					</div>
				</div>
		</Modal>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				iscz:false,//是否欠款
				
				hhrAndGdAmount:0,//支付佣金总额
				
				topObject:{},
              	
                /***********我的合伙人***************/
                orderListname:[
					{
						label:"全部",
						value:"1"
					}
				],
                hhrKeyword:'',//关键词
                hhrData:[],
                hhrtotal:0,
				hhrpageSize:0,
				hhrcolumns:[
					{
						title:"合伙人等级",
						align:"center",
						key:"",
						render:(h, params) =>{
                        	return h('div', [
		                          h('span', {
		                            style: {
		                              marginRight: '8px',
		                              position:"relative",
		                              top:'15px',
		                              left:"10px",
		                              color:"#fff",
		                              zIndex:"8"
		                            },
		                          }, params.row.ruleName),
		                         
		                          h('div',{
		                            props:{
		                               
		                            }
		                          },[
		                            h('img', {
		                                domProps: {
		                                    src:'http://img.zsydian.com/icon/hhrlevle.png',
		                                    style: "cursor:pointer;vertical-align:middle;position:relative;top:-5px"
		                                }
		                              }),
		                          ])
		                        ]);
                        }
					},
					{
						title:"合伙人姓名",
						align:"center",
						key:"crmName"
					},
					{
						title:"绑定邀请人账户",
						align:"center",
						key:"invitedCrm"
					},
					{
						title:"联系电话",
						align:"center",
						key:"mobile"
					},
					{
						title:"拓展会员",
						align:"center",
						key:"crmCount"
					},
					{
						title:"加入时间",
						align:"center",
						key:"createTime"
					},
					{
						title:"有效期至",
						align:"center",
						key:"pastdueDate"
					},
					{
						title:"未结算佣金",
						align:"center",
						key:"freezeAmount"
					},
				],
				/***********股东***************/
				gdid:'',//股东id
				gdInfo:[],//股东的详情
				ren:'人',
				formValidategd:{
					
					amount:0,//入伙金额
					validDays:'',//入伙时效
					crmCardPer:'',//合伙人拓客提成
					firstCrmSalesPer:'',//一级客户首次
					crmSalesPer:'',//之后每次
					secCrmSalesPer:'',//二级客户首次
					secSalesPer:'',//之后每次
					storeSalesPer:'',//合伙人店铺分红
					maxCount:'',//人数限制 0为不限制
					storeSalesDiscount:'',//折扣
				},
				ruleValidategd:{
					amount:[{ required: true, message: '入伙金额不能为空', trigger: 'blur' },{ pattern: /^\d{1,14}(\.\d{1,2})?$/, message: '入伙金额应为数字或小数且小数点后两位', trigger: 'blur'  },],
					// validDays:[{ required: true, message: '入伙时效不能为空', trigger: 'blur' }],
					// crmCardPer:[{ required: true, message: '合伙人拓客提成不能为空', trigger: 'blur' }],
					// firstCrmSalesPer:[{ required: true, message: '一级客户首次消费分红不能为空', trigger: 'blur' }],
					// crmSalesPer:[{ required: true, message: '一级客户首次消费分红不能为空', trigger: 'blur' }],
					// secCrmSalesPer:[{ required: true, message: '二级客户首次消费分红不能为空', trigger: 'blur' }],
					// secSalesPer:[{ required: true, message: '二级客户首次消费分红不能为空', trigger: 'blur' }],
					// storeSalesPer:[{ required: true, message: '合伙人店铺分红不能为空', trigger: 'blur' }],
					// storeSalesDiscount:[{ required: true, message: '折扣不能为空', trigger: 'blur' }],
				},
                gdorderListname:[
					{
						label:"",
						value:"1"
					}
				],
                gdKeyword:'',//关键词
                gdData:[],
                gdtotal:0,
				gdpageSize:0,
				gdcolumns:[
					{
						title:"股东",
						align:"center",
						key:"",
						render:(h, params) =>{
                        	return h('div', [
		                          h('span', {
		                            style: {
		                              marginRight: '8px',
		                              position:"relative",
		                              top:'15px',
		                              left:"10px",
		                              color:"#fff",
		                              zIndex:"8"
		                            },
		                          }, '店铺股东'),
		                         
		                          h('div',{
		                            props:{
		                               
		                            }
		                          },[
		                            h('img', {
		                                domProps: {
		                                    src:'http://img.zsydian.com/icon/hhrlevle.png',
		                                    style: "cursor:pointer;vertical-align:middle;position:relative;top:-5px"
		                                }
		                              }),
		                          ])
		                        ]);
                        }
					},
					{
						title:"股东姓名",
						align:"center",
						key:"crmName"
					},
					{
						title:"绑定邀请人账户",
						align:"center",
						key:"invitedCrm"
					},
					{
						title:"联系电话",
						align:"center",
						key:"mobile"
					},
					{
						title:"拓展会员",
						align:"center",
						key:"crmCount"
					},
					{
						title:"加入时间",
						align:"center",
						key:"createTime"
					},
					{
						title:"有效期",
						align:"center",
						key:"pastdueDate"
					},
					{
						title:"未结算佣金",
						align:"center",
						key:"freezeAmount"
					},
				],
				/***********合伙人设置***************/
				hhreseid:"",//id
				ren1:'人',
				formValidate:{
					recordName:"",//合伙人类型
					amount:0,//入伙金额
					validDays:'',//入伙时效
					crmCardPer:'',//合伙人拓客提成
					firstCrmSalesPer:'',//一级客户首次
					crmSalesPer:'',//之后每次
					secCrmSalesPer:'',//二级客户首次
					secSalesPer:'',//之后每次
					storeSalesPer:'',//合伙人店铺分红
					maxCount:'',//人数限制 0为不限制
					storeSalesDiscount:'',//折扣
				},
				ruleValidate:{
					recordName:[{ required: true, message: '合伙人类型不能为空', trigger: 'blur' }],
					 amount:[{ required: true, message: '入伙金额不能为空', trigger: 'blur' },{ pattern: /^\d{1,14}(\.\d{1,2})?$/, message: '入伙金额应为数字或小数且小数点后两位', trigger: 'blur'  }],
					// validDays:[{ required: true, message: '入伙时效不能为空', trigger: 'blur' }],
					// crmCardPer:[{ required: true, message: '合伙人拓客提成不能为空', trigger: 'blur' }],
					// firstCrmSalesPer:[{ required: true, message: '一级客户首次消费分红不能为空', trigger: 'blur' }],
					// crmSalesPer:[{ required: true, message: '一级客户首次消费分红不能为空', trigger: 'blur' }],
					// secCrmSalesPer:[{ required: true, message: '二级客户首次消费分红不能为空', trigger: 'blur' }],
					// secSalesPer:[{ required: true, message: '二级客户首次消费分红不能为空', trigger: 'blur' }],
					// storeSalesPer:[{ required: true, message: '合伙人店铺分红不能为空', trigger: 'blur' }],
					// storeSalesDiscount:[{ required: true, message: '折扣不能为空', trigger: 'blur' }],
				},
				hhrDatasettting:[],
                hhrtotalsettting:0,
				hhrpageSizesettting:0,
				hhrcolumnssettting:[
					{
						title:"合伙人类型",
						key:"recordName"
					},
					{
						title:"会员卡卡提成",
						key:"crmCardPer"
					},
					{
						title:"一级客户消费提成",
						key:"first"
					},
					{
						title:"二级客户消费提成",
						key:"sec"
					},
					{
						title:"分红比例",
						key:""
					},
					{
						title:"入伙福利",
						key:"storeSalesDiscount"
					},
					{
						title:"入伙金额",
						key:"amount"
					},
					{
						title:"有效期",
						key:"pastdueDate"
					},
				],
				/***************佣金支付明细**********************/
				mxorderListname:[
					{
						label:"",
						value:"1"
					}
				],
				mxData:[],
                mxtotal:0,
				mxpageSize:0,
				mxcolumns:[
					{
						title:"流水单号",
						key:"orderNo"
					},
					{
						title:"订单类型",
						key:"bonusTypeDesc"
					},
					{
						title:"生成日期",
						key:"createTime"
					},
					{
						title:"支付日期",
						key:"payDate"
					},
					{
						title:"金额",
						width:100,
						key:"amount"
					},
					{
						title:"收款友商",
						key:"crmName"
					},
					{
						title:"订单状态",
						width:100,
						key:"statusDesc"
					},
					
				],
				/*******概览********/
				yhkData:[],//银行卡数据
				yhkisshow:false,//添加银行卡弹框
				formValidateyhk:{
					name:"",//一行卡名称
					account:"",//卡号
					userName:"",//姓名
					mobile:"",//手机号
				},
				ruleValidateyhk:{
					name:[{ required: true, message: '银行卡名称不能为空', trigger: 'blur' }],
					account:[{ required: true, message: '卡号不能为空', trigger: 'blur' }],
					userName:[{ required: true, message: '姓名不能为空', trigger: 'blur' }],
					mobile:[{ required: true, message:this.$t('orders.phoneNoEmpty'), trigger: 'blur' },{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号码' }],
				},
				//余额充值
				payObject:{},//确认支付后的数组
				cxz:true,
				time:null,
				formValidatecz:{
					amount:"",//充值金额
				},
				ruleValidatecz:{
					amount:[
						{ pattern: /^\d{1,14}(\.\d{1,2})?$/, message: '充值金额应为数字或小数且小数点后两位', trigger: 'blur'  },
						{ required: true, message: '充值金额不能为空', trigger: 'blur' }
						]
				},
				//提现
				istx:true,
				vindex:false,
				active:2,
				czdate:new Date().toLocaleDateString().replace(/\//g,'-'),//操作日期
				yhkname:"",//提现银行名称
				yhkzh:"",//提现银行账户
				username:"",
				formValidatetx:{
					amount:'',//提现金额
				},
				ruleValidatetx:{
					amount:[ 
					 	{ required: true, message: '提现金额不能为空', trigger: 'blur'},
						{ pattern: /^\d{1,14}(\.\d{1,2})?$/, message: '提现金额应为数字或小数且小数点后两位', trigger: 'blur'  },]
				},
				glData:[],
                gltotal:0,
				glpageSize:0,
				glcolumns:[
					{
						title:"流水单号",
						key:"orderNo"
					},
					{
						title:"订单类型",
						key:"bonusTypeDesc"
					},
					{
						title:"生成日期",
						key:"createTime"
					},
					{
						title:"支付日期",
						key:"payDate"
					},
					{
						title:"金额",
						width:100,
						key:"amount"
					},
					{
						title:"合伙人&股东",
						key:"crmName"
					},
					{
						title:"订单状态",
						width:100,
						key:"statusDesc"
					},
					
				],
				//左侧列表
				Allfl:[
					{
						label:'合伙人概览',
						value:0
					},
					{
						label:'我的合伙人',
						value:1
					},
					{
						label:'我的股东',
						value:2
					},
					{
						label:'合伙人设置',
						value:3
					},
					{
						label:'股东设置',
						value:4
					},
					{
						label:'佣金支付明细',
						value:5
					},
				],
				tkObject:{},//拓客数量
				tkObjectCount:0,////拓客数量
				tkObjectConsumption:0,////拓客数量
				tkObjectCommission:0,////拓客数量
				withDraw:"",//可提现余额
				freezeAmount:"",//冻结现余额
				title:'合伙人概览',		
				numIndex:0,	
				user:this.$store.state.common.user,
				uid:this.$store.state.common.token,
				nowTime:null,//点击确认充值时的时间
				nextTime:null,//轮询的时间超脱5分钟自动关闭
			}
		},
		
		methods:{
			//点击提现
			clicktx(){
				this.getyhk();//获取银行卡
				$('.addHottx').animate({right:"0px"})
				$('.mark1tx').css('display','block')
			},
			//提现下添加银行
			addyh(){
				this.yhkisshow=true
			},
			//提现却还银行卡
			changeyhkisDefault(item){
				this.yhkData.forEach(x=>{
					x.default=false
				})
				item.default=true
				console.log(item)
				this.yhkname=item.name//银行
				this.yhkzh=item.account//账号
				this.username=item.userName
			},
			//确认提现提交
			suretx(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						
						if(this.formValidatetx.amount==0||this.formValidatetx.amount>this.withDraw){
							this.$notify({
						        title:"",//
						        message: '超出可提现金额',
						        type: 'error',
						        position: 'bottom-right'
					        });
						}else{
							this.axios.post('/drawal/add?uid='+this.uid,{////POST /drawal/add 提现
								amount:Number(this.formValidatetx.amount),
								bankName:this.yhkname,
								bankNo:this.yhkzh,
								accountName:this.username
							}).then(res=>{
								if(res.data.status==200){
									this.$notify({
								        title:"",//
								        message: '提现成功',
								        type: 'success',
								        position: 'bottom-right'
							        });
							        this.formValidatetx.amount=''
							        this.istx=false
							        this.getye()//概览可提现余额
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
						
					}
				})
			},
			//提现差号
			cancelhottx(){
				$('.addHottx').animate({right:"-665px"});
				$('.mark1tx').css('display','none')
				this.istx=true
				this.formValidatetx.amount=''
			},
			//概览拓客数量holder/statement
			gettk(){
				this.axios.get('holder/statement?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.tkObject=res.data.rows
						this.tkObjectConsumption=res.data.rows.consumption
						this.tkObjectCommission=res.data.rows.commission
						this.tkObjectCount=res.data.rows.count
					}
				})
			},
			//概览下佣金列表GET /earnings/query 收益历史列表
			getyjlist(){
				this.axios.get('/earnings/query?recent=1'+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						console.log(res.data)
						this.glData=res.data.rows
						this.gltotal=res.data.total
						this.glpageSize=res.data.pageSize
					}
				})
			},
			//点击添加银行卡
			addyhk(){
				this.yhkisshow=true
			},
			//确认添加银行卡POST /cbank/add 增加用户银行账号
			sureyhk(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						this.axios.post('/cbank/add?uid='+this.uid,{
							name:this.formValidateyhk.name,//银行卡名称
							account:Number(this.formValidateyhk.account),//卡号
							userName:this.formValidateyhk.userName,//姓名
							mobile:Number(this.formValidateyhk.mobile),//手机号
							default:true
						}).then(res=>{
							if(res.data.status==200){
								this.formValidateyhk.name=''
								this.formValidateyhk.account=''//卡号
								this.formValidateyhk.userName=''//姓名
								this.formValidateyhk.mobile=''//手机号
								this.yhkisshow=false
								this.getyhk()//获取银行卡

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
			//添加银行卡取消
			cancelyhk(){
				this.yhkisshow=false
				this.formValidateyhk.account=''//卡号
				this.formValidateyhk.userName=''//姓名
				this.formValidateyhk.mobile=''//手机号
			},
			//获取银行卡
			getyhk(){
				this.axios.get('/cbank/query?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.yhkData=res.data.rows
						this.yhkData.forEach((x)=>{
							if(x.default){
								console.log(x)
								this.yhkzh=x.account
								this.yhkname=x.name
								this.username=x.userName
							}
						})
					}
				})
			},
			//删除银行卡DELETE /cbank/delete/{id} 删除银行账号
			delyhk(id){
				this.axios.delete('/cbank/delete/'+id+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.$notify({
					        title:"",//
					        message: this.$t('public.deleteSuccess'),//
					        type: 'success',
					        position: 'bottom-right'
				        });
				        this.getyhk()
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
			//点击银行卡管理侧栏弹出/查列表GET /cbank/query 查询用户银行账号
			yhk(){
				this.getyhk()
				$('.addHotyh').animate({right:"0px"});
				$('.mark1yh').css('display','block')
			},
			cancelhotyh(){
				$('.addHotyh').animate({right:"-70%"});
				$('.mark1yh').css('display','none')
			},
			//充值
			topcz(){
				$('.addHotcz').animate({right:"0px"});
				$('.mark1cz').css('display','block')
			},
			//充值付款后未跳转手动跳转
			handerGo(){
				$('.addHotcz').animate({right:"-570px"});
				$('.mark1cz').css('display','none')
			},
			//确认充值/payrecharge/add
			surecz(name){
				this.nowTime=+new Date()//充值时间戳
				this.$refs[name].validate((valid) => {
					if(valid){
						this.axios.post('/payrecharge/add?uid='+this.uid,{
							amount:Number(this.formValidatecz.amount),
							title:"RECHARGE"
						}).then(res=>{
							if(res.data.status==200){
								this.payObject=res.data.rows
								console.log(this.payObject)
								this.cxz=false
								//支付单号payNo
								//轮询支付
								this.time=setInterval((res)=>{
									this.lunxun(this.payObject.payNo)
								},1000)
								
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
			//轮询支付GET /payrecharge/search/{payNo} 支付结果轮询
			lunxun(payNo){
				this.axios.get('/payrecharge/search/'+payNo+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.$notify({
					        title:"",//
					        message:'支付成功',
					        type: 'success',
					        position: 'bottom-right'
				        });
						$('.addHotcz').animate({right:"-570px"});
						$('.mark1cz').css('display','none')
						this.formValidatecz.amount=""
						this.getye()//概览可提现余额
						clearInterval(this.time)
					}else{
						this.nextTime=+new Date()
						if(this.nextTime-this.nowTime>500000){//1000*60*5
							clearInterval(this.time)
						}
					}
				})
			},
			//概览点击充值差号
			cancelhotcz(){
				
				$('.addHotcz').animate({right:"-570px"});
				$('.mark1cz').css('display','none')
			},
			
			//头部点击充值
			clickczBtn(){
				this.topcz()
			},
			
			//点击概览查看全部
			clickAll(){
				this.numIndex=5
				this.title='佣金支付明细'
				this.getearnings()
			},
			//单击左侧列表 1合伙人 2股东 0无效
				addBg(index){
					this.numIndex=index
					if(this.numIndex==0){
						this.title='合伙人概览'
						this.gettk()
					}
					if(this.numIndex==1){
						this.title='我的合伙人'
						this.axios.get('holder/query?holderType=1'+'&uid='+this.uid).then(res=>{
							if(res.data.status==200){
								res.data.rows.forEach((x)=>{
									x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
									x.pastdueDate=new Date(x.pastdueDate).toLocaleDateString().replace(/\//g,'-')
									if(x.pastdueDate=='Invalid Date'){
										x.pastdueDate='未指定'
									}
								})
								console.log(res.data.rows)
								this.hhrData=res.data.rows
								this.hhrtotal=res.data.total
								this.hhrpageSize=res.data.pageSize
							}
						})
					}
					if(this.numIndex==2){
						this.title='我的股东'
						this.axios.get('holder/query?holderType=2'+'&uid='+this.uid).then(res=>{
							if(res.data.status==200){
								console.log(res.data.rows)
								res.data.rows.forEach((x)=>{
									x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
									x.pastdueDate=new Date(x.pastdueDate).toLocaleDateString().replace(/\//g,'-')
									if(x.pastdueDate=='Invalid Date'){
										x.pastdueDate='未指定'
									}
								})
								this.gdData=res.data.rows
								this.gdtotal=res.data.total
								this.gdpageSize=res.data.pageSize
							}
						})
					}
					if(this.numIndex==3){
						this.title='合伙人设置'
						this.gethhrset(0)
					}
					if(this.numIndex==4){
						this.title='股东设置'
						this.gethhrset(1)
					}
					if(this.numIndex==5){
						this.title='佣金支付明细'
						this.getearnings()
					}
				},
				//获取佣金明细
				getearnings(){
					this.axios.get('earnings/query?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.mxData=res.data.rows
							this.mxtotal=res.data.total
							this.mxpageSize=res.data.pageSize
							res.data.rows.forEach((x)=>{
								x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
								x.payDate=new Date(x.payDate).toLocaleDateString().replace(/\//g,'-')
								this.hhrAndGdAmount+=x.amount
							})
						}
					})
				},

				//获取合伙人设置
				gethhrset(number){
					this.axios.get('rule/query?isShareholder='+number+'&uid='+this.uid).then(res=>{
						if(res.data.status==200){
							//股东
							if(number==1){
								this.gdInfo=res.data.rows
								console.log(res.data.rows)
								
								if(res.data.rows.length==0){
									this.formValidategd.amount=''//入伙金额
									this.formValidategd.validDays=''//入伙时效
									this.formValidategd.crmCardPer=''//合伙人拓客提成
									this.formValidategd.firstCrmSalesPer=''//一级客户首次
									this.formValidategd.crmSalesPer=''//之后每次
									this.formValidategd.secCrmSalesPer=''//二级客户首次
									this.formValidategd.secSalesPer=''//之后每次
									this.formValidategd.storeSalesPer=''//合伙人店铺分红
									this.formValidategd.maxCount=0//人数限制 0为不限制
									this.formValidategd.storeSalesDiscount=''//折扣
								}else{
									if(this.gdInfo[0].maxCount==0){
										this.ren='不限制'
									}else{
										this.ren='人'
									}
									this.gdid=this.gdInfo[0].id//股东id
									this.formValidategd.amount=String(this.gdInfo[0].amount)//入伙金额
									this.formValidategd.validDays=String(this.gdInfo[0].validDays)//入伙时效
									this.formValidategd.crmCardPer=this.gdInfo[0].crmCardPer//合伙人拓客提成
									this.formValidategd.firstCrmSalesPer=this.gdInfo[0].firstCrmSalesPer//一级客户首次
									this.formValidategd.crmSalesPer=this.gdInfo[0].crmSalesPer//之后每次
									this.formValidategd.secCrmSalesPer=this.gdInfo[0].secCrmSalesPer//二级客户首次
									this.formValidategd.secSalesPer=this.gdInfo[0].secSalesPer//之后每次
									this.formValidategd.storeSalesPer=this.gdInfo[0].storeSalesPer//合伙人店铺分红
									this.formValidategd.maxCount=this.gdInfo[0].maxCount//人数限制 0为不限制
									this.formValidategd.storeSalesDiscount=this.gdInfo[0].storeSalesDiscount//折扣
								}
							}else{
								//合伙人
								res.data.rows.forEach((x)=>{
									x.storeSalesDiscount='门店消费折扣'+x.storeSalesDiscount+'折'
									x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
									x.pastdueDate=new Date(x.pastdueDate).toLocaleDateString().replace(/\//g,'-')
									x.crmCardPer=x.crmCardPer*100+'%'
									x.first='首次'+(x.firstCrmSalesPer*100)+'%'+"   "+'之后'+(x.crmSalesPer*100)+'%'
									x.sec='首次'+(x.secCrmSalesPer*100)+'%'+"   "+'之后'+(x.secSalesPer*100)+'%'
									if(x.pastdueDate=='Invalid Date'){
										x.pastdueDate='未指定'
									}
								})
								this.hhrDatasettting=res.data.rows
								this.hhrtotalsettting=res.data.total
								this.hhrpageSizesettting=res.data.pageSize
							}
							
						}
					})
				},
				//表格选中时的数据，数组
				selected(selection,row){
					this.valId = row.id
				},
				//差号返回
				cancelHome(){
					this.$router.push('/operationhome')
				},
				/***********我的合伙人***************/

				//合伙人点击添加
				addhhr(){
					$('.addHot').animate({right:"0px"});
					$('.mark1').css('display','block')
				},
				cancelhot(){
					$('.addHot').animate({right:"-570px"});
					$('.mark1').css('display','none')
				},
				//我的合伙人翻页
				hhrgetData(current){
					this.axios.get('holder/query?holderType=1'+'&offset='+current+'&uid='+this.uid).then((res)=>{
	                    res.data.rows.forEach((x)=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							x.pastdueDate=new Date(x.pastdueDate).toLocaleDateString().replace(/\//g,'-')
							if(x.pastdueDate=='Invalid Date'){
								x.pastdueDate='未指定'
							}
						})
						console.log(res.data.rows)
						this.hhrData=res.data.rows
						this.hhrtotal=res.data.total
						this.hhrpageSize=res.data.pageSize
	                })
				},
				//我的合伙人翻页
				hhrchangePageSize(size){
					this.hhrpageSize=size
				},
				//我的合伙人点击搜索
				searchhhr(){
					this.axios.get('holder/query?holderType=1'+'&keyword='+this.hhrKeyword+'&uid='+this.uid).then(res=>{
						if(res.data.status==200){
							res.data.rows.forEach((x)=>{
								x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
								x.pastdueDate=new Date(x.pastdueDate).toLocaleDateString().replace(/\//g,'-')
								if(x.pastdueDate=='Invalid Date'){
									x.pastdueDate='未指定'
								}
							})
							console.log(res.data.rows)
							this.hhrData=res.data.rows
							this.hhrtotal=res.data.total
							this.hhrpageSize=res.data.pageSize
						}
					})
				},
				//我的合伙人回车搜索
				enterSearch(){
					this.searchhhr()
				},
				//我的合伙人精准搜索
				searchLocation(){

				},
				//合伙人下拉
				orderselected(){

				},
				/***********股东***************/
				//保存股东设置
				savegd(name){
					this.$refs[name].validate((valid) => {
						if(valid){
							if(this.gdid==''){//为空保存
								this.axios.post('/rule/add?uid='+this.uid,{
									recordName:'店铺股东',
									isShareholder:1,
									amount:this.formValidategd.amount,//入伙金额
									validDays:this.formValidategd.validDays,//入伙时效
									crmCardPer:this.formValidategd.crmCardPer,//合伙人拓客提成
									firstCrmSalesPer:this.formValidategd.firstCrmSalesPer,//一级客户首次
									crmSalesPer:this.formValidategd.crmSalesPer,//之后每次
									secCrmSalesPer:this.formValidategd.secCrmSalesPer,//二级客户首次
									secSalesPer:this.formValidategd.secSalesPer,//之后每次
									storeSalesPer:this.formValidategd.storeSalesPer,//合伙人店铺分红
									maxCount:this.formValidategd.maxCount,//人数限制 0为不限制
									storeSalesDiscount:this.formValidategd.storeSalesDiscount,//折扣
								}).then(res=>{
									if(res.data.status==200){
										this.$notify({
									        title: '保存',
									        message: this.$t('public.SaveSuccess'),//
									        type: 'success',
									        position: 'bottom-right'
								        });
								        this.gethhrset(1)
								        this.gdid=''
										this.formValidategd.amount=0//入伙金额
										this.formValidategd.validDays=''//入伙时效
										this.formValidategd.crmCardPer=''//合伙人拓客提成
										this.formValidategd.firstCrmSalesPer=''//一级客户首次
										this.formValidategd.crmSalesPer=''//之后每次
										this.formValidategd.secCrmSalesPer=''//二级客户首次
										this.formValidategd.secSalesPer=''//之后每次
										this.formValidategd.storeSalesPer=''//合伙人店铺分红
										this.formValidategd.maxCount=''//人数限制 0为不限制
										this.formValidategd.storeSalesDiscount=''//折扣
									}else{
										this.$notify({
									        title:"",//
									        message: res.data.errorMessage,
									        type: 'error',
									        position: 'bottom-right'
								        });
									}
								})
							}else{//不为空修改
								this.axios.post('/rule/add?uid='+this.uid,{
									id:this.gdid,//股东id
									isShareholder:1,//股东类型
									amount:this.formValidategd.amount,//入伙金额
									validDays:this.formValidategd.validDays,//入伙时效
									crmCardPer:this.formValidategd.crmCardPer,//合伙人拓客提成
									firstCrmSalesPer:this.formValidategd.firstCrmSalesPer,//一级客户首次
									crmSalesPer:this.formValidategd.crmSalesPer,//之后每次
									secCrmSalesPer:this.formValidategd.secCrmSalesPer,//二级客户首次
									secSalesPer:this.formValidategd.secSalesPer,//之后每次
									storeSalesPer:this.formValidategd.storeSalesPer,//合伙人店铺分红
									maxCount:this.formValidategd.maxCount,//人数限制 0为不限制
									storeSalesDiscount:this.formValidategd.storeSalesDiscount,//折扣
								}).then(res=>{
									if(res.data.status==200){
										this.$notify({
									        title: '保存',
									        message: this.$t('public.SaveSuccess'),//
									        type: 'success',
									        position: 'bottom-right'
								        });
								        this.gethhrset(1)
								        this.gdid=''//股东id
										this.formValidategd.amount=0//入伙金额
										this.formValidategd.validDays=''//入伙时效
										this.formValidategd.crmCardPer=''//合伙人拓客提成
										this.formValidategd.firstCrmSalesPer=''//一级客户首次
										this.formValidategd.crmSalesPer=''//之后每次
										this.formValidategd.secCrmSalesPer=''//二级客户首次
										this.formValidategd.secSalesPer=''//之后每次
										this.formValidategd.storeSalesPer=''//合伙人店铺分红
										this.formValidategd.maxCount=''//人数限制 0为不限制
										this.formValidategd.storeSalesDiscount=''//折扣
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
							
						}
					})
				},
				gdchange(v){
					if(v=='不限制'){
						this.formValidategd.maxCount=0
					}
				},
				//差号返回
				gdcancelHome(){
					
				},
				//我的股东翻页
				gdgetData(current){
					this.axios.get('holder/query?holderType=2'+'&offset='+current+'&uid='+this.uid).then((res)=>{
	                    res.data.rows.forEach((x)=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							x.pastdueDate=new Date(x.pastdueDate).toLocaleDateString().replace(/\//g,'-')
							if(x.pastdueDate=='Invalid Date'){
								x.pastdueDate='未指定'
							}
						})
						this.gdData=res.data.rows
						this.gdtotal=res.data.total
						this.gdpageSize=res.data.pageSize
	                })
				},
				//股东翻页
				gdchangePageSize(size){
					this.gdpageSize = size
				},
				//股东点击搜索
				gdsearch(){
					this.axios.get('holder/query?holderType=2'+'&keyword='+this.gdKeyword+'&uid='+this.uid).then(res=>{
						if(res.data.status==200){
							console.log(res.data.rows)
							res.data.rows.forEach((x)=>{
								x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
								x.pastdueDate=new Date(x.pastdueDate).toLocaleDateString().replace(/\//g,'-')
								if(x.pastdueDate=='Invalid Date'){
									x.pastdueDate='未指定'
								}
							})
							this.gdData=res.data.rows
							this.gdtotal=res.data.total
							this.gdpageSize=res.data.pageSize
						}
					})
				},
				//我股东回车搜索
				gdenterSearch(){
					this.gdsearch()
				},
				//我股东精准搜索
				gdsearchLocation(){

				},
				//股东下拉
				gdorderselected(){

				},
				/********合伙人设置**************/
				//保存合伙人设置POST /rule/add 新建规则formValidate
				savehhr(name){
					this.$refs[name].validate((valid) => {
						if(valid){
							this.axios.post('/rule/add?uid='+this.uid,{
								isShareholder:0,//合伙人
								recordName:this.formValidate.recordName,//合伙人类型
								amount:this.formValidate.amount,//入伙金额
								validDays:this.formValidate.validDays,//入伙时效
								crmCardPer:this.formValidate.crmCardPer,//合伙人拓客提成
								firstCrmSalesPer:this.formValidate.firstCrmSalesPer,//一级客户首次
								crmSalesPer:this.formValidate.crmSalesPer,//之后每次
								secCrmSalesPer:this.formValidate.secCrmSalesPer,//二级客户首次
								secSalesPer:this.formValidate.secSalesPer,//之后每次
								storeSalesPer:this.formValidate.storeSalesPer,//合伙人店铺分红
								maxCount:this.formValidate.maxCount,//人数限制 0为不限制
								storeSalesDiscount:this.formValidate.storeSalesDiscount,//折扣
							}).then(res=>{
								if(res.data.status==200){
									this.$notify({
								        title: '保存',
								        message: this.$t('public.SaveSuccess'),//
								        type: 'success',
								        position: 'bottom-right'
							        });
							        $('.addHot').animate({right:"-570px"});
									$('.mark1').css('display','none')
							        this.gethhrset(0)
							        this.formValidate.recordName=''//合伙人类型
									this.formValidate.amount=''//入伙金额
									this.formValidate.validDays=''//入伙时效
									this.formValidate.crmCardPer=''//合伙人拓客提成
									this.formValidate.firstCrmSalesPer=''//一级客户首次
									this.formValidate.crmSalesPer=''//之后每次
									this.formValidate.secCrmSalesPer=''//二级客户首次
									this.formValidate.secSalesPer=''//之后每次
									this.formValidate.storeSalesPer=''//合伙人店铺分红
									this.formValidate.maxCount=''//人数限制 0为不限制
									this.formValidate.storeSalesDiscount=''//折扣
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
				//单选框
				changeRadio(v){
					if(v=='不限制'){
						this.formValidate.maxCount=0
						console.log(this.formValidate.maxCount)
					}
				},
				//单击合伙人设置一行
				clickrow(s,d){
					console.log(s.id)
					this.hhreseid=s.id
				},
				//删除DELETE /rule/delete/{id} 删除
				hhrsedel(){
					if(this.hhreseid=''){
						this.$notify({
	                        title:"",//
	                        message:'请选择一条合伙人规则！',
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
					}else{
						this.axios.delete('/rule/delete/'+this.hhreseid+'?isShareholder=2'+'&uid='+this.uid).then(res=>{
							if(res.data.status==200){
								this.$notify({
			                        title:"",//
			                        message: this.$t('public.deleteSuccess'),//
			                        type: 'sucess',
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
					}
				},
				//合伙人设置翻页GET /rule/query 规则列表
				hhrgetDatasettting(current){
					this.axios.get('rule/query?isShareholder=1'+'&offset='+current+'&uid='+this.uid).then((res)=>{
	                    res.data.rows.forEach((x)=>{
							x.storeSalesDiscount='门店消费折扣'+x.storeSalesDiscount+'折'
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							x.pastdueDate=new Date(x.pastdueDate).toLocaleDateString().replace(/\//g,'-')
							if(x.pastdueDate=='Invalid Date'){
								x.pastdueDate='未指定'
							}
						})
						this.hhrDatasettting=res.data.rows
						this.hhrtotalsettting=res.data.total
						this.hhrpageSizesettting=res.data.pageSize
	                })
				},
				//我的合伙人设置翻页
				hhrchangePageSizesettting(size){
					this.hhrpageSizesettting = size
				},
				/**********佣金支付明细************/
				//下拉
				mxorderselected(){

				},
				//明细翻页
				//切换一条页
	            mxgetData(current){
	                this.axios.get('/earnings/query?offset='+current+'&uid='+this.uid).then((res)=>{
	                    this.mxtotal = res.data.rows
	                    this.mxtotal=res.data.total
						this.mxpageSize=res.data.pageSize
	                })
	            },
	            //翻页
	            mxchangePageSize(size){
	                this.mxpageSize = size
	            },
				/***********概览********'/earnings/query?recent=1&uid='+this.uid********/
				//佣金翻页
				glgetData(current){
					this.axios.get('/earnings/query?recent=1&offset='+current+'&uid='+this.uid).then((res)=>{
	                    this.glData=res.data.rows
						this.gltotal=res.data.total
						this.glpageSize=res.data.pageSize
	                })
				},
				glchangePageSize(size){
					this.glpageSize=res.data.pageSize
				},
				//橄榄余额
				getye(){
					this.axios.get('payrecharge/balance?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.withDraw=res.data.rows.withDraw//可提现余额
							this.freezeAmount=res.data.rows.freezeAmount//可提现余额
							if(this.withDraw<this.tkObjectCommission){
								this.iscz=true
							}else{
								this.iscz=false
							}
						}
					})
				},
	       },
		
		 created(){
            	this.$nextTick(()=>{
				this.gettk()//概览拓客数
				this.getyjlist()//概览佣金列表
				this.getye()//概览可提现余额
			})
        },
		mounted(){
			if(this.withDraw<this.tkObjectCommission){
				this.iscz=true
			}
			if(this.iscz){
				$('.goods-left').css({
					marginTop:"50px"
				})
				$('.goods-right').css({
					marginTop:"50px"
				})
			}
		},
}
</script>
<style scoped>

	.units-box {
		position:relative;
		width: 100%;
		height: 100%;
		background: rgb(230,233,236);
		overflow: hidden;
	}
	.bod{
		width: 100%;
		height: 100%;
		display: flex;
		background: rgb(230,233,236);
	}
	.gltop{
		display:flex;justify-content: space-between;border-bottom:1px solid #e4e4e4;
		padding:10px 30px;
	}
	.glbottom{
		display:flex;justify-content: space-between;
		padding:10px 30px;
	}
	.glbottom li{
		list-style: none
	}
	.addHot{
		position:fixed;
		z-index:99;
		height:100%;
		width:570px;
		right:-570px;
		top:48px;
		background: #fff;
		z-index:10;
		overflow-y: scroll;
		box-shadow: 0 0 10px #ccc
		/*border:1px solid red;*/
	}
	.addHotcz{
		position:fixed;
		z-index:99;
		height:100%;
		width:570px;
		right:-570px;
		top:48px;
		background: #fff;
		z-index:10;
		
		box-shadow: 0 0 20px #ccc
	}
	.addHotyh{
		position:fixed;
		z-index:99;
		height:100%;
		width:70%;
		right:-70%;
		top:48px;
		background: #fff;
		z-index:10;
		overflow-y: scroll;
		box-shadow: 0 0 20px #ccc
	}
	.addHottx{
		position:fixed;
		z-index:99;
		height:100%;
		width:665px;
		right:-665px;
		top:48px;
		background: #fff;
		z-index:10;
		overflow:hidden;
		box-shadow: 0 0 20px #ccc
	}
	.addHot-head{
		width:100%;
		height:50px;
		line-height: 50px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #e4e4e4;
	}
	.addHot-head span{
		font-size:14px;
		font-weight:600;
		
	}
	.yhklist{
		display: flex;
		justify-content: space-between;
		list-style: none;
		border:1px solid #e4e4e4;
		height:30px;
		line-height: 30px;
		margin-bottom:10px;
	}
	.yhklist1{
		display: flex;
		list-style: none;
		height:30px;
		line-height: 30px;
		margin-bottom:10px;
	}
	.yhklist2{
		display: flex;
		list-style: none;
		height:30px;
		line-height: 30px;
		margin-bottom:10px;
		border:1px solid #e4e4e4;
	}
	.ewmpage{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top:60px;
		height: 80%;
	}
	.ewmpage1{
		
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.ewmpage1 li{
		margin-bottom:20px;
		list-style: none
	}
	.qzModel{
		position:absolute;
		top:0;
		left:0;
		z-index:3;
		background:#F7E7B6;
		height:50px;
		width:100%;

		line-height: 50px;
		text-align: center;
	}
	.czBtn{
		display: inline-block;
		margin-left:50px;
		width: 80px;
	    height: 20px;
	    line-height: 20px;
	    color:#fff;
		background:#D53C39;
		border-radius:50px;
		cursor:pointer;
	}
	.mark1,.mark1cz,.mark1yh,.mark1tx{
		position:fixed;
		display:none;
		width:100%;
		height:100%;
		background: #B2B2B2;
		opacity:0.4;
		z-index:9;
		top: 48px;
    	right: 0px;
	}
	.yhkmain{
		width:100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		background: #fff
	}
	.yhkdiv{
		width: 31%;
   	 	border: 1px solid #e4e4e4;
    	margin: 10px;
    	border-radius:6px;
    	box-shadow: 0 4px 20px #ccc;
	}
	.yhk-top{
		display: flex;
		justify-content: space-between;
		padding:20px 20px 10px 20px;
		border-bottom: 2px solid #B7B9BC;
	}
	.yykNumber{
		height: 40px;
	    line-height: 40px;
	    background: #F1F1F1;
	    text-align: center;
	    margin: 20px 0;
	}
	.add-bor{
		border:3px dotted #ccc;
		margin:20px;
	}
	.add-bor-center{
		display: flex;
	    justify-content: center;
	    align-items: center;
	    flex-direction: column;
	    padding:20px;
	    cursor:pointer;
	}
	.model-left div{
		margin-top:10px;
	}
	.model-right{

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.search-box {
		width: 300px;
		height: auto;
		position: fixed;
		top: 15px;
		left: 250px;
		z-index: 9999;
		
	}
	.footer-btn{
		width:100%;
		border-top:1px solid #e4e4e4;
		height:50px;
		line-height: 50px;
		display: flex;
		justify-content: space-between;
		margin-bottom: -12px;
		margin-top:40px;
	}
	.footer-btn span{
		width:50%;
		text-align: center;
		cursor:pointer;
	}
	.search-box .add {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: #00a8ff;
		line-height: 28px;
		text-align: center;
		color: #fff;
		font-size: 22px;
		float: left;
		margin-right: 10px;
	}
	.btns-box {
		width: 100%;
		height: 40px;

		display:flex;
		justify-content: space-between;
		/*position:fixed;*/
		line-height: 40px;
		z-index:8;
		background: #fff;
		border-bottom:1px solid #e4e4e4;
	}
	 .wldw{
    	margin-left:10px;
    	display: flex;
    }
	.right{
		
		margin-right:10px;
	}
	
	.ivu-icon-chevron-down {
		font-size: 10px;
	}
	.flclass:last-child{
		margin-bottom:40px;
	}
	
	.btns img {
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}
	
	.table {
		margin:10px;
	}
	
	.page-box {
		text-align: center;
		margin-top:5px;
		margin-bottom:120px;
	}
	/***气泡提示样式设置***/
	
	.qp-con {
		width: 100%;
		height: 30px;
		color: #0d0d0d;
		font-size: 14px;
		line-height: 30px;
		padding:0 10px;
		cursor: pointer;
	}
	
	.qp-con img {
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}
	.goods-left{
		width: 120px;
		margin-right: 3px;
		flex: 0 0 120px;
		font-size: 14px;
		background: #fff;
	}
	.goods-right{
		
   	 	width: 100%;
   	 	height:100%;
   	 	background: #fff;
   	 	overflow: auto;
	}
	.left-top{
		height:50px;
		line-height: 50px;
		
		border-bottom:1px solid #F5F5F5;
		/*justify-content: space-around;*/
	}
	.goods-left li{
		list-style: none;
		height:40px;
		line-height: 40px;
		width:100%;
	

	}
	.cha{
		margin-right:20px;
	}
	.goods-left li span{
		
		margin-right:10px;
	}
	.bg{
		background: rgb(241,245,247);
    color: rgb(59,119,227);
	}


.searchInput{
	width:100%;
	line-height: 35px;
	margin:20px;
	text-align: center;
	display: flex
}

.table1{
	margin:10px;
}
.mark{
	position:fixed;
	display:none;
	width:100%;
	height:100%;
	background: #B2B2B2;
	opacity:0.4;
	z-index:9;
	top: 49px;
	left:0;
}
.footer-mark{
	width:100%;
	height:40px;
	line-height: 40px;
	border-top:1px solid #E4E4E4;
	display: flex;
	justify-content: space-around;
	margin-bottom:-10px;
}
.table-left{
	width:321px;
	height:530px;
	border:1px solid #e4e4e4;
}
.lunboImg{
	max-width:100%;
	max-height:300px;
}
.lunboImg img{
	width:100%;
	height:180px;
}
.table-right{
	width:60%;
	height:530px;
	margin-left:20px;
	border:1px solid #e4e4e4;
}
.table-right-table{
	margin:10px;
}
</style>
<style type="text/css">
.el-step__title.is-process, .el-step__title.is-finish, .el-step__title.is-wait{
	margin-left: 0!important
}
	.ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-steps-content{
    	margin-left:-45px!important;
    }

</style>