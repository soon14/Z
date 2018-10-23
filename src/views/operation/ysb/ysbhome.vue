<template>
	<div class="units-box">
		<!--欠债弹框-->
		<div class='bod'>
		<div class='qzModel' v-if='iscz'>
			<span style='font-weight:bold'>因为账户余额不足导致当前有 <span style='color:#F67403'>{{hhrData.length}}</span>  位合伙人&股东的佣金未发放，总计  <span style='color:#F67403'>{{NOpayyj}}</span> 元</span>
			<span class='czBtn' @click='clickczBtn'>立即充值</span>
			 <span @click="clickcha" style='margin-right:20px;cursor:pointer;margin-left: 20px;'><Icon type="close"></Icon></span>
		</div>
		<!--友商宝-->
		<!-- <div class='goods-left'>
			<div class='left-top'>
				<span style='font-size:14px;font-weight:600;margin-left:10px'>友商宝</span>
			</div>
			<div style="height:100%;"  class='flclass'>
				<div style='margin-bottom:160px'>
					<li class='flclass' v-for='(item,index) in Allfl' :key='index' @click='addBg(index)' :class="{bg:numIndex==index}" style='display:flex;justify-content: space-between'>
						<div style='margin-left:20px'>{{item.label}}</div>
					</li>
				</div>
			</div>
		</div> -->
		<Tabs :animated="false"  style="background:#fff;width:100%;height:100%" @on-click="addBg">
	        <TabPane label="概览">
			    <div class='goods-right ' style='background:#F1F1F1;position:relative'>
					
					<!-- <div style='height:50px'></div> -->
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
								<!-- <div style='margin:5px 0'>
									<Button type="ghost" @click='clicktx'>提现</Button>
								</div> -->
								<div>
									<span style='color:#407AE4;font-size:12px;cursor:pointer' @click='yhk'>银行卡管理</span>
								</div>
							</div>
						</div>
						<div class='glbottom'>
							<li>
								<span>友商吸粉：</span>
								<div style='margin-left:40px;margin-top:10px'>
									<span style='font-size:18px'>
										{{ddxf}}
									</span>
									<span>人</span>
								</div>
							</li>
							<li>
								<span>友商消费：</span>
								<div style='margin-left:40px;margin-top:10px'>
									<span style='font-size:18px'>
										￥：{{payyj}}
									</span>
									<span>元</span>
								</div>
							</li>
							<li>
								<span>未支付友商的佣金：</span>
								<div style='margin-left:60px;margin-top:10px'>
									<span style='font-size:18px'>
										￥：{{NOpayyj}}
									</span>
									<span>元</span>
								</div>
							</li>
						</div>
					</div>
					<div class="table" style='background:#fff;margin:10px 0 0 0;height:70%'>
						<div style='display:flex;justify-content: space-between;padding:10px 30px;'>
							<span style='font-size:14px;font-weight: bold'>近期友商的佣金支付</span>
							<span style='font-size:14px;color:#407AE4;cursor:pointer' @click='clickAll()'>查看全部</span>
						</div>
						<div style='margin:0 10px'>
							<Table border highlight-row :columns="glcolumns" :data="glData" ></Table>
							<!--底部的分页-->
							<div class="page-box" v-if='gltotal>0'>
								<Page :total="gltotal" show-total size='small' :pageSize='glpageSize'  @on-change="glgetData" @on-page-size-change="glchangePageSize"></Page>
							</div>
						</div>

					</div>
				</div>
	        </TabPane>
	        <TabPane label="我的友商">
	        	<!--我的友商-->
				<div class='goods-right'>
					<div class="btns-box">
						<div style='display:flex'>
							<div class="wldw">
		                        <!-- <span style="width:90px;font-weight:900;text-align:center">{{title}}</span>
		                        <Select style="width:100px;margin-top:10px;margin-right:20px"  placeholder="全部" @on-change="orderselected">
						       	 <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
						    	</Select> -->
						    	<div style='margin-right:20px;display:flex'>
					                <Input style='margin-top:10px;width:300px' v-model='hhrKeyword' placeholder='请输入编码或名称' @on-enter='enterSearch'>
					                <span slot="append"  @click='search' style='cursor:pointer;'>搜索</span>
					                </Input>

					            </div>
		                    </div>
						</div>
						<div class="right">
							<Button type="primary" style='background:#3b77e3' shape="circle" @click="addMyys">
							 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>添加我的友商
							</Button>
							<Dropdown trigger="click" style="margin-left: 4px;border:none">
			                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
			                    <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
				                </Button>

				                <DropdownMenu slot="list">
				                    <span  @click=""><DropdownItem >删除</DropdownItem></span>
				                </DropdownMenu>
			             	</Dropdown>
			             	<span @click="cancelHome" style="cursor:pointer; margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
						</div>
					</div>
					<!-- <div style='height:50px'></div> -->

						<div class="table">
							<Table border highlight-row :columns="hhrcolumns" :data="hhrData" ></Table>
							<!--底部的分页-->
							<div class="page-box" v-if='hhrtotal>0'>
								<Page :total="hhrtotal" show-total size='small' :pageSize='hhrpageSize'  @on-change="hhrgetData" @on-page-size-change="hhrchangePageSize"></Page>
							</div>
						</div>
				</div>
	        </TabPane>
	        <TabPane label="友商套餐">
	        	<!--友商套餐-->
				<div class='goods-right'>
					<div class="btns-box">
						<div style='display:flex'>
							<div class="wldw">
		                        <span style="width:90px;font-weight:900;text-align:center">活动状态</span>
		                        <Select style="width:100px;margin-top:10px;margin-right:20px"  placeholder="全部" @on-change="gdorderselected">
						       	 <Option v-for="item in gdorderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
						    	</Select>
		                    </div>
						</div>
						<div class="right">
							<Button type="primary" style='background:#3b77e3;border:none;margin-right:5px' shape="circle" @click="addhhr()">
							 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>添加
							</Button>
							<Button type="primary" style='background:#40ca98;border:none' shape="circle" @click="ysstart" v-if='ygewmIndex!=-1'>
							 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>启用
							</Button>
							<Dropdown trigger="click" style="margin-left: 4px;border:none">
			                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
			                    <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
				                </Button>
				                <DropdownMenu slot="list">
				                    <span  @click="ysdel"><DropdownItem >删除</DropdownItem></span>
				                    <span  @click="yszf"><DropdownItem >作废</DropdownItem></span>
				                </DropdownMenu>
			             	</Dropdown>
			             	<span @click="cancelHome" style="cursor:pointer; margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
						</div>
					</div>
					<div class="table">
						<div class="ygewm">
							<div v-if='gdData.length==0'>暂无套餐</div>
							<div v-for='(item,index) in gdData' class='ygewm-list' @click='clickradio(index,item)' :class='{bor:ygewmIndex==index}' v-else>
		        				<div style='width:360px;height:175px' >
			        				<img :src="item.mainPhoto" class='ysimg' alt='无图片'>
			        			</div>
			        			<div class='skuname'>
			        				<span style='padding:0 5px'>{{item.title}}</span>
			        			</div>
			        			<div style='display:flex;justify-content: space-between;align-items: center;margin-top:10px;height:60px;margin:0 10px'>
			        				<div style='display:flex;'>
			        					<div v-if='item.status==0'><!--新增-->
					        				<span class='circle0'></span>
					        				<span>{{item.statusDesc}}</span>
				        				</div>
			        					<div v-if='item.status==1'><!--未提交-->
					        				<span class='circle1'></span>
					        				<span>{{item.statusDesc}}</span>
				        				</div>
				        				<div v-else-if="item.status==9"><!--已停止-->
					        				<span class='circle9'></span>
					        				<span>{{item.statusDesc}}</span>
				        				</div>
				        				<div v-else-if="item.status==2"><!--已启用-->
					        				<span class='circle8'></span>
					        				<span>{{item.statusDesc}}</span>
				        				</div>
			        				</div>
			        				<div>
			        					<del style='color:#B2B2B2;margin-right:10px'>￥：{{item.oldAmount}}元</del>
			        					<span style='color:#ff0000'>￥：<span style='color:#FF4D4D;font-size:16px'>
			        					{{item.amount}}元
			        				</span></span>
			        				</div>
			        			</div>
		        			</div>
		    			</div>
						<!--底部的分页-->
						<div class="page-box1" v-if='gdtotal>0'>
							<Page :total="gdtotal" show-total size='small' :pageSize='gdpageSize'  @on-change="gdgetData" @on-page-size-change="gdchangePageSize"></Page>
						</div>
					</div>
				</div>
	        </TabPane>
	        <TabPane label="友商设置">
	        	<!--友商设置-->
				<div class='goods-right'>
					<div class="btns-box">
						<div style='display:flex'>
						
						</div>
						<div class="right">
							<Button type="primary" style='background:#3b77e3' shape="circle" @click="saveYsSetting('formValidateyssetting')">
							 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>保存
							</Button>
			             	<span @click="cancelHome" style="cursor:pointer; margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
						</div>
					</div>
					<!-- <div style='height:50px'></div> -->
						<div >
							<Form ref="formValidateyssetting" :model="formValidateyssetting" :rules="ruleValidateyssetting" :label-width="20">
								<div style='margin-top:20px'>
									<FormItem   prop='crmFirstCommission'>
				                        <span>拓客首次消费提成</span><Input v-model='formValidateyssetting.crmFirstCommission' style='width:80px'></Input>%作为友商佣金

				                    </FormItem>
				                    <FormItem   prop='crmCommission'>
				                         拓客连续消费提成<Input v-model='formValidateyssetting.crmCommission' style='width:80px'></Input>%<span>作为友商佣金</span>
				                    </FormItem>
									<FormItem  prop='friendCommission'>
				                       <span>友商来店消费</span><Input v-model='formValidateyssetting.friendCommission' style='width:80px'></Input>折扣
				                    </FormItem>
								</div>
							</Form>
						</div>
				</div>
	        </TabPane>
	        <TabPane label="佣金支付明细">
	        	<!--佣金支付明细-->
				<div class='goods-right' >
					<div class="btns-box">
						<div style='display:flex'>
						
						</div>
						<div class="right">
							<Button type="primary" style='background:#3b77e3' shape="circle" @click="">
							 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>导出
							</Button>
							<Dropdown trigger="click" style="margin-left: 4px;border:none">
			                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
			                    <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
				                </Button>

				                <DropdownMenu slot="list">
				                    <span  @click=""><DropdownItem >删除</DropdownItem></span>
				                </DropdownMenu>
			             	</Dropdown>
			             	<span @click="cancelHome" style="cursor:pointer; margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
						</div>
					</div>
					<!-- <div style='height:50px'></div> -->
						<div class="table">
							<Table border highlight-row :columns="mxcolumns" :data="mxData" ></Table>
							<!--底部的分页-->
							<div class="page-box">
								<Page :total="mxtotal" show-total size='small' :pageSize='mxpageSize'  @on-change="mxgetData" @on-page-size-change="mxchangePageSize"></Page>
							</div>
						</div>
				</div>
	        </TabPane>
	        <Button type="ghost" @click="cancelHome" size="small" slot="extra" style='margin-top:3px;margin-right:20px'>返回</Button>
	    </Tabs>
		<!--友商套餐添加侧栏-->
		<div class='addHot'>
    		<div class='addHot-head'>
    			<span style='margin-left:20px'>添加套餐</span>
    			<div>
    				 <Button shape="circle" type="ghost" @click="savetc('formValidatetc')" style=';border:none;margin-right:15px;background:#3b77e3;color:#fff'>
	                   <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>保存
	                </Button>
	                <span @click="cancelhot" style='margin-right:20px;cursor:pointer'><Icon type="close"></Icon></span>
    			</div>
    		</div>
    		<div style='margin:20px;border:1px solid #e4e4e4;background:#FCFCFC;padding:10px'>
    			<div class='right-left'>
					<el-upload
					  class="avatar-uploader"
					  :action="logoUrl"
			  			name='file'
					  :show-file-list="false"
					  :on-success="addsucess"
					  >
					  <img v-if="mainPhoto" :src="mainPhoto" style='margin-left:10px;margin-top:10px' class="avatar" >
					  <span >点击上传</span>
					 <img src="">
					  <div slot="tip" class="el-upload__tip" style='text-align: center;padding-bottom:10px'>尺寸720*350的商品主图</div>
					</el-upload>
				</div>
    			<Form ref="formValidatetc" :model="formValidatetc" :rules="ruleValidatetc" :label-width="80">
	    			<FormItem label="套餐名称" prop="name">
                        <Input v-model="formValidatetc.name"  placeholder="请输入一个套餐名称"></Input>
                    </FormItem>
                    <FormItem label="添加商品" prop="skunameS">
                      	<div @click="searchSku" style='position:relative;'>
                    		<Input  placeholder="添加商品" v-model='formValidatetc.skunameS'></Input>
                    		<Icon type="ios-search" size="16" style='position:absolute;top:8px;right:8px'></Icon>
                    	</div>
                    </FormItem>
                    <FormItem >
                       <Table border highlight-row :columns="tccolumns" :data="tcData" ></Table>
                    </FormItem>
                   	<FormItem label="套餐价" prop="price">
                		<Input  placeholder="金额" style='width:100px' v-model='formValidatetc.price'></Input><span> 元 </span>
                		<span style='margin-left:5px'>友商分红</span>
                		<Input v-model='formValidatetc.friendAmount' placeholder="百分比" style='width:100px'></Input>
                   	</FormItem>
                   <FormItem label="原价" prop="oldAmount">
                		<Input  placeholder="原价" style='width:100px' v-model='formValidatetc.oldAmount'></Input><span> 元 </span>

                   	</FormItem>
                   	<FormItem label="上架数量">
                		<RadioGroup v-model='jian' @on-change='changeRadio'>
	    					<div style='display:flex;margin-left:20px;margin-bottom:10px;line-height:35px'>
	    						<Radio label='件'></Radio>
	    						<Input  style="width:90px" placeholder='数量' v-model='formValidatetc.maxCount'></Input>
	    						<Radio label='不限制' style='margin-left:20px'></Radio>
	    					</div>
	    				</RadioGroup>
                   	</FormItem>
                   	<div style='display:flex'>
	                   	<FormItem label="生效时间" prop="beginTime">
	                		 <DatePicker type="date" placeholder="生效时间" :value='beginTime'></DatePicker>
	                   	</FormItem>
	                   	<FormItem label="失效时间" prop="endTime">
	                		 <DatePicker type="date" placeholder="失效时间" placement='top' :value='endTime'></DatePicker>
	                   	</FormItem>
                   	</div>

	                <FormItem label="权益说明" prop="remark">
	                	<Input type='textarea' v-model='formValidatetc.remark'></Input>
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
    		<div v-if='!cxz' style='height:100%'>
    			<div class='ewmpage'>
    				<span style='margin-top:20px;display:inline-block'>支付宝或微信扫一扫进行付款<span style='color:#d53c39;margin-left:10px;font-size:16px'>{{formValidatecz.amount}}</span>（元）</span>

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
	    				<div class='yhk-bottom'>
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
    	<!-- <div class='addHottx'>
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

	                      				<Radio v-model="item.default" style='margin-left:10px'  @on-change='changeyhkisDefault(item)'></Radio>

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
    				<div style='margin: 60px 40px 40px 200px;'>
	    				<el-steps :space="200" :active="active" finish-status="success" :align-center='true'>
						  <el-step title="申请交易"></el-step>
						  <el-step title="银行处理"></el-step>
						  <el-step title="交易完成"></el-step>
						</el-steps>
					</div>
					<div style='display:flex;border:1px solid #e4e4e4;padding:20px 70px;margin-left: -6px;'>
						<img src="" width='150' height='200'>
						<div style='padding:0 45px'>
							<li> <span>操作类型：</span><span>提现</span></li>
							<li> <span>收款账户：</span><span>{{yhkname}}</span></li>
							<li> <span>账户信息：</span><span>{{yhkzh.account}}</span></li>
							<li> <span>操作日期：</span><span>{{czdate}}</span></li>
							<li> <span>操作人：</span><span>{{user.trueName}}</span></li>
						</div>
					</div>
    			</div>
    		</div>
    	</div> -->
		<!--合伙人设置-->
		<div class="mark1"></div>
		<!--充值蒙版-->
		<div class="mark1cz"></div>
		<!--银行卡管理蒙版-->
		<div class="mark1yh"></div>
		<!--提现蒙版-->
		<div class="mark1tx"></div>
		</Modal>

		<!--添加我的友商-->
		<Modal v-model="ysisshow" width="440px">
			<p slot="header" style="height:30px;line-height:30px;">
				<span>友商宝分享</span>
			</p>
			<div>
				<input disabled='true' class='httpid' v-model="http" />
				<input id='httpid' v-model='http' style='opacity: 0;position: absolute;' type="text" />
			</div>
			<div style='display:flex;justify-content: space-around'>
				<!-- <div class='model-left' style='margin-top:20px'>
					<img src="" height='130' width='130'>
				</div> -->
				<div class='model-right'>
					<div style='margin-left:10px;margin-top:20px'>
						<div style='color:#b2b2b2'>小程序端关联输入商户编号即可</div>
						<div style='color:#b2b2b2'>邀请加入我的友商</div>
					</div>
					<div style='margin-top:30px'>

						<!-- <Button type="warning" style='margin-right:20px;width:104px'>
						<a  style='color:#fff' download>下载二维码</a>
						</Button> -->
						 <Button type="primary" @click='copyhttp'>复制我的商户编号</Button>
					</div>
				</div>
				<!-- <div class='model-right'>
					<span style='color:#40CA98;font-size:18px'>支付成功</span>
					<Icon type="ios-checkmark-outline" size='120' style='color:#40CA98'></Icon>
				</div> -->
			</div>
			<div slot="footer">
				<div class=''>

				</div>
			</div>
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
			<!--选择商品-->
		<Modal v-model="goodsinshow" width="760px">
			<p slot="header" style="height:30px;line-height:30px">
				<span>商品搜索</span>
			</p>
			<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
				<Input   placeholder="单位编码、名称、助记码、单位电话、联系人、分管部门" style="padding:2px 0" v-model="goodskeyword" @on-enter='enterSearchsku'></Input>
				<span @click="searchInput">
				<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>
				</span>
			</div>
			<!--商品数据-->
			<div slot="footer" style='margin-top:-10px'>
				<div class="table">
					<Table  border  height='300' highlight-row :columns="goodskey" :data="goods" @on-row-click="clickgoodsrow">
					</Table>
					<div class="page-box">
					 <Page :total="total" show-total  :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
					</div>
	           	</div>
				<div class='title' style='margin:0px'>
					<div style='color:#D15151;font-size:14px'>
							<!-- <Icon type="plus" style='margin-right:5px'></Icon>
						<span >添加商品</span> -->
						</div>
					<div>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="makegoods"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
					</div>
				</div>
			</div>
		</Modal>
		</div>
	</div>
</template>
<script type="text/javascript">
import LoadUrl from '@/components/common/actionLoad'
	export default{
		data(){
			return{
				iscz:false,//是否欠款
				hhrAndGdAmount:0,
				topObject:{},
                /***********我的友商***************/
                ysisshow:false,
                http:'',//分享的链接
                orderListname:[

				],
                hhrKeyword:'',//关键词

                ddxf:0,//友商吸粉：
                payyj:0,//友商消费
                NOpayyj:0,//未支付友商的佣金
                hhrData:[],
                hhrtotal:0,
				hhrpageSize:0,
				hhrcolumns:[
					{
						title:"友商名称",
						key:"creator"
					},
					{
						title:"联系人",
						key:"contactor"
					},

					{
						title:"联系电话",
						key:"mobile"
					},
					{
						title:"拓展会员",
						key:"num"
					},
					{
						title:"待结算佣金",
						key:"cumAmount"
					},
					{
						title:"未结算佣金",
						key:"amount"
					},
					{
						title:"加入时间",
						key:"createTime"
					},
					{
						title:"状态",
						key:"statusDesc"
					},
				],
				/***********套餐***************/
				skunameS:"",
				goodsrow:{},//一行数据
				goodsid:"",//id
				goodskeyword:"",
				goodsinshow:false,
				pageSize:0,
				total:0,
				goodskey:[
		                {
		                	title:"商品图片",
		                	width:100,
		                	key:"mainPhoto",
		                	 render:(h, params) =>{
	                        	return h('div',[
	                        			h('img',{
	                        				attrs:{
	                        					src:params.row.mainPhoto
	                        				},
	                        				style:{
	                        					width:'40px',
	                        					height:'40px'
	                        				}
	                        			})
	                        		])
	                        }
		                },
		                {
		                	title: '商品货号',
		                	key:'skuCode',
		                	width:180,
		               		ellipsis:true,

		                },
		                {
		                	title: '条码',
		                	key:'barcode',
		                	width:180,
		               		ellipsis:true,

		                },
		                {
		                	title:"商品名称",
		             		ellipsis:true,
		                	width:180,
		                	key:"skuName"
		                },

		                {
		                	title: '商品品牌',
		                	key:'barnd',
		               		ellipsis:true,
		               		width:120,
		                	align: 'center'
		                },
		                {
		                	title: '商品分类',
		                	key:'className',
		               		ellipsis:true,
		                	align: 'center',
		                	width:120,
		                },
		              	{
		                	title: '吊牌价',
		                	key:'price',
		                	width:120,
							ellipsis:true,
		                	align: 'center'
		                },
		                {
		                	title: '成本价',
		                	key:'costPrice',
							ellipsis:true,
							width:120,
		                	align: 'center'
		                },
		                 {
		                	title: '批发价',
		                	key:'wholePrice',
							ellipsis:true,
							width:120,
		                	align: 'center'
		                },
		                {
		                	title: '单位',
		                	key:'unit',
							ellipsis:true,
							width:120,
		                	align: 'center'
		                },
		                {
		                	title: '库存',
		                	key:'inventory',
							ellipsis:true,
							width:120,
		                	align: 'center'
		                },

	                ],
				goods:[],
				jian:"件",
				logoUrl:LoadUrl.httpPrefix.Url+'file/action/upload/image/url?uid='+this.$store.state.common.token,
				ygewmIndex:-1,
				mainPhoto:'http://img.zsydian.com/icon/bg_sku_img.png',//宣传照
				vid:"",
				ren:'人',
				allCouunt:0,//标注价
				allnum:0,//数量
				tccolumns:[
					{
						title:"商品名称",
						key:"skuName",
						ellipsis:true,
						width:150,
					},
					{
						title:"数量",
						width:80,
						key:"qty",
						render:(h,params)=>{
							return h('Input',{
								props:{
									value:params.row.qty
								},
								style:{
									width:"77px",
									height:"40px",
									marginLeft:"-17px",
									lineHeight:'40px',
									border:'none'
								},
								on:{
									"on-change":(e)=>{
										params.row.qty=Number(e.target.value)

									},
									"on-blur":(e)=>{
										params.row.qty=Number(e.target.value)
										this.tcData[params.index].qty=Number(e.target.value)
									}
								}

							},'删除')
						}
					},
					{
						title:"标注价",
						width:80,
						key:"price",
						render:(h,params)=>{
							return h('Input',{
								props:{
									value:params.row.price
								},
								style:{
									width:"77px",
									height:"40px",
									marginLeft:"-17px",
									lineHeight:'40px',
									border:'none'
								},
								on:{
									"on-change":(e)=>{
										params.row.price=Number(e.target.value)
									},
									"on-blur":(e)=>{
										params.row.price=Number(e.target.value)
										this.tcData[params.index].price=Number(e.target.value)

									}
								}

							})
						}
					},
					{
						title:"属性",

						width:100,
						key:"skuTypeDesc"
					},
					{
						title:"操作",
						width:80,
						align:"center",
						key:"action",
						render:(h,params)=>{
							return h('span',{
								style:{
									cursor:"pointer",
									color:"#d53c39"
								},
								on:{
									"click":(e)=>{
										this.tcData.splice(params.index,1)
									}
								}
							},'删除')
						}
					},
				],
				beginTime:"",
				endTime:"",
				tcData:[],
				formValidatetc:{
					name:"",
					price:"",//加入金额
					oldAmount:"",//原价
					maxCount:"",
					skunameS:"",
					remark:"",
					friendAmount:""//友商分红//提成会员卡金额的百分比
				},
				ruleValidatetc:{
					name:[{ required: true, message: '请输入套餐名称！', trigger: 'blur' }, ],
					skunameS:[{ required: true, message: '请选择商品！', trigger: 'change' }, ],
					price:[
						{ required: true, message: '加入金额不能为空', trigger: 'blur' },
						{ pattern: /^\d{1,14}(\.\d{1,2})?$/, message: '加入金额应为数字或小数且小数点后两位', trigger: 'blur'  }
					],
					oldAmount:[
						{ required: true, message: '套餐原价不能为空', trigger: 'blur' },
						{ pattern: /^\d{1,14}(\.\d{1,2})?$/, message: '套餐原价应为数字或小数且小数点后两位', trigger: 'blur'  }
					],
					friendAmount:[

						{ pattern: /^\d{1,14}(\.\d{1,2})?$/, message: '友商分红应为数字或小数且小数点后两位', trigger: 'blur'  }
					],
					maxCount:[{ pattern: /^[1-9]\d*$|^0$/, message: '加入数量应为数字', trigger: 'blur'  }]
				},
				tcValue:0,//套餐默认0
                gdorderListname:[
					{
						label:"全部",
						value:0
					},
					{
						label:"未提交",
						value:1
					},
					{
						label:"已启用",
						value:2
					},
					{
						label:"已停止",
						value:9
					},
				],
                gdKeyword:'',//关键词
                //套餐
                gdData:[],
                gdtotal:0,
				gdpageSize:0,

				/***********友商设置***************/
				formValidateyssetting:{
					crmFirstCommission:"",
					crmCommission:"",
					friendCommission:"",
				},
				ruleValidateyssetting:{
					crmFirstCommission:[{required: true, message:'首次消费提成不能为空', trigger: 'blur' },{ pattern: /^[1-9]\d*$|^0$/, message:'首次消费提成应为数字' , trigger: 'blur'  }],
					crmCommission:[{required: true, message:'连续消费提成不能为空', trigger: 'blur' },{ pattern: /^[1-9]\d*$|^0$/, message: '连续消费提成应为数字', trigger: 'blur'  }],
					friendCommission:[{required: true, message:'友商消费折扣不能为空', trigger: 'blur' },
					{ pattern:  /^((0\.[1-9]{1})|(([1-9]{1})(\.\d{1})?))$/,message: '友商消费折扣应为小于10大于0的整数或小数且小数点后一位' , trigger: 'blur'  }],
				},
				/***********合伙人设置***************/
				// ren1:'人',
				// formValidate:{
				// 	type:"",//合伙人类型
				// 	price:"",//入伙金额
				// 	date:'',//入伙时效
				// },
				// ruleValidate:{

				// },
				// hhrDatasettting:[],
    //             hhrtotalsettting:0,
				// hhrpageSizesettting:0,
				// hhrcolumnssettting:[
				// 	{
				// 		title:"合伙人类型",
				// 		key:""
				// 	},
				// 	{
				// 		title:"会员卡卡提成",
				// 		key:""
				// 	},
				// 	{
				// 		title:"一级客户消费提成",
				// 		key:""
				// 	},
				// 	{
				// 		title:"二级客户消费提成",
				// 		key:""
				// 	},
				// 	{
				// 		title:"分红比例",
				// 		key:""
				// 	},
				// 	{
				// 		title:"入伙福利",
				// 		key:""
				// 	},
				// 	{
				// 		title:"入伙金额",
				// 		key:""
				// 	},
				// 	{
				// 		title:"有效期",
				// 		key:""
				// 	},
				// ],
				/***************佣金支付明细**********************/
				mxorderListname:[],
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
				//提现
				istx:true,
				vindex:false,
				active:2,
				czdate:new Date().toLocaleDateString().replace(/\//g,'-'),//操作日期
				yhkname:"",//提现银行名称
				yhkzh:"",//提现银行账户

				formValidatetx:{
					amount:'',//提现金额
				},
				ruleValidatetx:{
					amount:[{ required: true, message: '提现金额不能为空', trigger: 'blur' }]
				},
				//余额充值
				payObject:{},//确认支付后的数组
				cxz:true,
				time:null,
				formValidatecz:{
					amount:"",//充值金额
				},
				ruleValidatecz:{
					amount:[{ required: true, message: '充值金额不能为空', trigger: 'blur' }]
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
						title:"收款友商",
						key:"crmName"
					},
					{
						title:"订单状态",
						width:100,
						key:"statusDesc"
					},

				],
				//
				withDraw:0,//可提现余额
				freezeAmount:"",//冻结现余额
				//左侧列表
				Allfl:[
					{
						label:'友商概览',
						value:0
					},
					{
						label:'我的友商',
						value:1
					},
					{
						label:'友商套餐',
						value:2
					},
					{
						label:'友商设置',
						value:3
					},

					{
						label:'支付明细',
						value:4
					},
				],
				title:'合伙人概览',
				numIndex:0,
				user:this.$store.state.common.user,
				uid:this.$store.state.common.token,
				payNo:"",
				payNoTop:"",
				nowTime:null,//点击确认充值时的时间
				nextTime:null,//轮询的时间超脱5分钟自动关闭
			}
		},

		methods:{
				//点击提现
				// clicktx(){
				// 	this.getyhk()//获取银行卡

				// 	$('.addHottx').animate({right:"0px"});
				// 	$('.mark1tx').css('display','block')
				// },
				//提现下添加银行
				// addyh(){
				// 	this.yhkisshow=true
				// },
				//提现却还银行卡
				// changeyhkisDefault(item){
				// 	this.yhkData.forEach(x=>{
				// 		x.default=false
				// 	})
				// 	item.default=true
				// 	this.yhkname=item.name//银行
				// 	this.yhkzh=item.account//账号
				// 	this.username=item.userName
				// },
				//确认提现提交POST /withdraw/add 提现
				// suretx(name){
				// 	this.$refs[name].validate((valid) => {
				// 		if(valid){
				// 			// if(this.formValidatetx.amount==0||this.formValidatetx.amount>this.withDraw){
				// 			// 	this.$notify({
				// 			//         title:"",//
				// 			//         message: '超出可提现金额',
				// 			//         type: 'error',
				// 			//         position: 'bottom-right'
				// 		 //        });
				// 			// }else{//POST /drawal/add 提现http://dev.zsydian.com:9733/ysd/fwithdraw/add
				// 				this.axios.post('/fwithdraw/add?uid='+this.uid,{
				// 					amount:Number(this.formValidatetx.amount),
				// 					bankName:this.yhkname,
				// 					bankNo:this.yhkzh,
				// 					accountName:this.username
				// 				}).then(res=>{
				// 					if(res.data.status==200){
				// 						this.$notify({
				// 					        title:"",//
				// 					        message: '提现成功',
				// 					        type: 'success',
				// 					        position: 'bottom-right'
				// 				        });
				// 				        this.formValidatetx.amount=''

				// 						this.yhkname=''
				// 						this.yhkzh=''
				// 						this.username=''
				// 				        this.istx=false
				// 				        this.cancelhottx()
				// 					}else{
				// 						this.$notify({
				// 					        title:"",//
				// 					        message: res.data.errorMessage,
				// 					        type: 'error',
				// 					        position: 'bottom-right'
				// 				        });
				// 					}
				// 				})

				// 			// }

				// 		}
				// 	})
				// },
				//提现差号
				// cancelhottx(){
				// 	$('.addHottx').animate({right:"-665px"});
				// 	$('.mark1tx').css('display','none')
				// },
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
								this.yhkzh=this.yhkData[0].account
								this.yhkname=this.yhkData[0].name
								console.log(this.yhkzh)
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
					this.cxz=true
					$('.addHotcz').animate({right:"0px"});
					$('.mark1cz').css('display','block')
				},
				//充值付款后未跳转手动跳转
				handerGo(){
					$('.addHotcz').animate({right:"-570px"});
					$('.mark1cz').css('display','none')
				},
				//最右侧余额确认充值POST /opayrecharge/add 第一步 充值信息输入获取支付二维码
				surecz(name){

					this.$refs[name].validate((valid) => {
						if(valid){
							this.axios.post('/opayrecharge/add?uid='+this.uid,{
								amount:Number(this.formValidatecz.amount),
								title:"RECHARGE"
							}).then(res=>{
								if(res.data.status==200){
									this.payObject=res.data.rows
									this.payNo=res.data.rows.payNo
									this.cxz=false
									//支付单号payNo
									//轮询支付
									this.time=setInterval((res)=>{
										this.lunxun(this.payNo)
									},2000)
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
				//轮询支付GET /opayrecharge/search/{payNo} 支付结果轮询
				lunxun(payNo){
					this.axios.get('/opayrecharge/search/'+payNo+'?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.$notify({
						        title:"",//
						        message:'支付成功',
						        type: 'success',
						        position: 'bottom-right'
					        });
							$('.addHotcz').animate({right:"-570px"});
							$('.mark1cz').css('display','none')
							this.gettk()//概览可提现余额
							this.formValidatecz.amount=''
							clearInterval(this.time)
						}else{
							this.nextTime=+new Date()
							if(this.nextTime-this.nowTime>500000){
								clearInterval(this.time)
							}
						}
					})

				},
				//点击充值差号
				cancelhotcz(){
					$('.addHotcz').animate({right:"-570px"});
					$('.mark1cz').css('display','none')
				},

				//点击头部充值POST /opayrecharge/add 第一步 充值信息输入获取支付二维码
				clickczBtn(){
					this.topcz()
				},
				clickcha(){
					this.iscz=false
					$('.goods-left').css({
						marginTop:"0px"
					})
					$('.goods-right').css({
						marginTop:"0px"
					})
				},

				//点击概览查看全部
				clickAll(){
					this.numIndex=4
					this.title='佣金支付明细'
					this.getearnings()
				},
				//获取佣金明细
				getearnings(){
					// this.axios.get('earnings/query?uid='+this.uid).then(res=>{
					// 	if(res.data.status==200){
					// 		this.mxData=res.data.rows
					// 		this.mxtotal=res.data.total
					// 		this.mxpageSize=res.data.pageSize
					// 		res.data.rows.forEach((x)=>{
					// 			x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
					// 			x.payDate=new Date(x.payDate).toLocaleDateString().replace(/\//g,'-')
					// 			this.hhrAndGdAmount+=x.amount
					// 		})
					// 	}
					// })
				},
				//获取账户余额GET /opayrecharge/balance 财务概览
				gettk(){
					this.axios.get('/opayrecharge/balance?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.withDraw=res.data.rows.withDraw
							//账户余额小于未支付友商的佣金显示头部提示
							if(res.data.rows.withDraw<this.NOpayyj){
								this.iscz=true
							}else{
								this.iscz=false
							}
						}
					})
				},
				//单击左侧列表
				addBg(index){
					this.numIndex=index
					//友商概览
					if(this.numIndex==0){
						this.title='友商概览'
						this.gettk()
					}
					//我的友商GET /merchant/query 友商清单
					if(this.numIndex==1){
						this.getmyys()
					}
					//每次加载4条//友商套餐GET GET /orule/query 友商套餐清单 友商套餐清单
					if(this.numIndex==2){
						this.getystc()//套餐
					}
					if(this.numIndex==3){
						this.title='友商设置'
						this.getoconfig()
					}
					if(this.numIndex==4){
						this.title='佣金支付明细'
						this.getearnings()
					}
				},
				//表格选中时的数据，数组
				selected(selection,row){
					this.valId = row.id
				},
				//差号返回
				cancelHome(){
					this.$router.push('/operationhome')
				},
		/***********我的友商***************************************************************************************************************************************************************************************/
				//获取我的友商
				getmyys(){
					this.axios.get("/omerchant/query?uid="+this.uid).then(res=>{
						if(res.data.status==200){
							console.log(this.hhrData)
							this.hhrData=res.data.rows
							this.hhrtotal=res.data.total
							this.hhrpageSize=res.data.pageSize
							this.hhrData.forEach(x=>{
								// x.num=x.ruleVoList.length
								x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							})
						}
					})
				},
				//添加我的友商
				addMyys(){
					this.ysisshow=true
				},
				//复制链接
				copyhttp(){
					var e1=document.getElementById('httpid');//对象是copy-num1
                    e1.select(); //选择对象
                    document.execCommand("Copy"); //执行浏览器复制命令
                    this.$Message.success('分享链接已复制'+" " + this.http);
				},
				//我的友商翻页
				hhrgetData(current){

					this.axios.get("/omerchant/query?offset="+current+"&uid="+this.uid).then(res=>{
							if(res.data.status==200){
								console.log(this.hhrData)
								this.hhrData=res.data.rows
								this.hhrtotal=res.data.total
								this.hhrpageSize=res.data.pageSize
								this.hhrData.forEach(x=>{
									// x.num=x.ruleVoList.length
									x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
								})
							}
						})
				},
				//我的友商翻页
				hhrchangePageSize(size){
					this.hhrpageSize=size
				},
				//我的友商点击搜索
				search(){
					this.axios.get('/omerchant/query?keyword='+this.hhrKeyword+'&uid='+this.uid).then(res=>{
						if(res.data.status==200){
							console.log(this.hhrData)
							this.hhrData=res.data.rows
							this.hhrtotal=res.data.total
							this.hhrpageSize=res.data.pageSize
							this.hhrData.forEach(x=>{
								x.num=x.ruleVoList.length
								x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							})
						}
					})
				},
				//我的友商回车搜索
				enterSearch(){
					this.search()
				},
				//友商下拉
				orderselected(){

				},
		/***********套餐***************************************************************************************************************/
				getystc(){
					this.axios.get("/orule/query?length=4&uid="+this.uid).then(res=>{
						if(res.data.status==200){
							this.gdData=res.data.rows
							this.gdtotal=res.data.total
							this.gdpageSize=res.data.pageSize
						}
					})
				},
				//商品模糊搜索
	            searchInput(){
					this.axios.get('sku/query?keyword='+this.goodskeyword+'&uid='+this.uid).then((res)=>{
						if(res.data.status==200){
							this.goods = res.data.rows
							this.total=res.data.total
							this.pageSize1=res.data.pageSize
						}
					})

	            },
	            //回车搜索商品
	           enterSearchsku(){
	           	this.searchInput()
	           },
	            //切换一条页
	            getData(current){
	                this.axios.get('/sku/query?offset='+current+'&uid='+this.uid).then((res)=>{
	              		if(res.data.status==200){
	              			this.goods = res.data.rows
	              			this.total=res.data.total
							this.pageSize1=res.data.pageSize
	              		}
	                })
	            },
	            //翻页
	            changePageSize(size){
	                this.pageSize = size
	            },
	           //商品弹框点击一行获取数据
				clickgoodsrow(data){
					this.goodsrow = data//选中商品一行的数据
					this.goodsid=this.goodsrow.id//选中商品的id
					this.formValidatetc.skunameS=data.skuName
				},
				//查询商品
				searchSku(){
					this.goodsinshow=true
					this.axios.get('/sku/query?uid='+this.uid).then((res)=>{
	              		if(res.data.status==200){
	              			this.goods = res.data.rows
	              			console.log(this.goods)
	              		}
	                })
				},
				//确认tcData
				makegoods(){
					this.goodsinshow=false
					this.axios.get("sku/get/"+this.goodsid+"?uid="+this.uid).then(res=>{
						if(res.data.status==200){
							if(res.data.rows.attrDetailList==null||res.data.rows.attrDetailList.length==0){
								let arr={
									barcode:this.goodsrow.barcode,
									skuPic:this.goodsrow.mainPhoto,
									skucode:this.goodsrow.skuCode,
									skuName:this.goodsrow.skuName,
									skuId:this.goodsrow.id,
									price:this.allCouunt,
									qty:this.allnum,

								}
								this.tcData.push(arr)
							}else{

								res.data.rows.attrDetailList.forEach((x,index)=>{
									let arr={
										barcode:res.data.rows.attrDetailList[index].barcode,
										skuPic:res.data.rows.attrDetailList[index].mainPhoto,
										skucode:res.data.rows.attrDetailList[index].skuCode,
										skuName:this.goodsrow.skuName,
										skuId:res.data.rows.attrDetailList[index].id,
										price:this.allCouunt,
										qty:this.allnum,
										skuTypeDesc:res.data.rows.attrDetailList[index].skuTypeDesc,

									}
									this.tcData.push(arr)

								})

							}

						}
					})

				},
				//保存套餐POST /orule/add 新增
				savetc(name){
					this.$refs[name].validate((valid) => {
						if(valid){
							if(this.mainPhoto==''){
								this.$notify({
							        title:"",//
							        message: '请上传图片',
							        type: 'error',
							        position: 'bottom-right'
						        });
							}else if(this.tcData.length==0){
								this.$notify({
							        title:"",//
							        message: '请选择商品',
							        type: 'error',
							        position: 'bottom-right'
						        });
							}else{
								this.axios.post('orule/add?uid='+this.uid,{
									title:this.formValidatetc.name,
									amount:Number(this.formValidatetc.price),
									friendAmount:Number(this.formValidatetc.friendAmount),
									detailVos:this.tcData,//套餐中的商品
									mainPhoto:this.mainPhoto,
									oldAmount:this.formValidatetc.oldAmount,
									remark:this.formValidatetc.remark,
									maxCount:Number(this.formValidatetc.maxCount),//加入限制
									validTimeStart:this.beginTime,
									validTimeEnd:this.endTime,
								}).then(res=>{
									if(res.data.status==200){
											this.$notify({
										        title:"",//
										        message: this.$t('public.SaveSuccess'),//
										        type: 'success',
										        position: 'bottom-right'
									        });
									        this.formValidatetc.remark='';
									        this.formValidatetc.name='';
									        this.formValidatetc.price='';
									        this.formValidatetc.friendAmount='';
									        this.tcData=[];
									        this.mainPhoto='';
									        this.beginTime='';
									        this.endTime='';
									        this.formValidatetc.maxCount='';

											this.getDate();//获取当前时间
											this.getystc();
											this.cancelhot()
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
				//友商套餐点击一个
				clickradio(index,item){
					console.log(item)
					this.vid=item.id
					this.ygewmIndex=index
				},
				//套餐删除
				ysdel(){
					if(this.vid==''){
						this.$notify({
						        title:"",//
						        message: '请选择套餐',
						        type: 'error',
						        position: 'bottom-right'
					        });
					}else{
						this.axios.delete('/orule/delete/'+this.vid+'?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.$notify({
						        title:"",//
						        message: this.$t('public.deleteSuccess'),//
						        type: 'success',
						        position: 'bottom-right'
					        });
					        this.getystc()
					        this.vid=''
					        this.ygewmIndex=-1
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
				//POST /orule/disabled/{id} 作废
				yszf(){
					if(this.vid==''){
						this.$notify({
						        title:"",//
						        message: '请选择套餐',
						        type: 'error',
						        position: 'bottom-right'
					        });
					}else{
						this.axios.post('/orule/disabled/'+this.vid+'?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.$notify({
						        title:"",//
						        message: '作废成功',
						        type: 'success',
						        position: 'bottom-right'
					        });
					        this.getystc()
					        this.vid=''
					        this.ygewmIndex=-1
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
				//启用POST /rule/submit/{id} 生效
				ysstart(){
					if(this.vid==''){
						this.$notify({
						        title:"",//
						        message: '请选择套餐',
						        type: 'error',
						        position: 'bottom-right'
					        });
					}else{
						this.axios.post('/orule/submit/'+this.vid+'?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.$notify({
						        title:"",//
						        message:this.$t('public.normalS'),//
						        type: 'success',
						        position: 'bottom-right'
					        });
					        this.vid=''
					        this.ygewmIndex=-1
					        this.getystc()
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
				//取消
				modelCancel(){
					this.goodsinshow=false
				},
				//单选框
				changeRadio(v){
					if(v=='不限制'){
						this.formValidatetc.maxCount=0
					}
				},
				//上传图片成功
				addsucess(res,file){
					this.mainPhoto=res.rows.url
					////////console.log(res)
				},
				//套餐点击添加
				addhhr(){
					$('.addHot').animate({right:"0px"});
					$('.mark1').css('display','block')
				},
				cancelhot(){
					$('.addHot').animate({right:"-570px"});
					$('.mark1').css('display','none')
					this.formValidatetc.name=''
			        this.formValidatetc.price=''
			        this.tcData=[]
			        this.mainPhoto=''
			        this.beginTime=''
			        this.endTime=''
			        this.formValidatetc.maxCount=''
				},

				//套餐翻页http://dev.zsydian.com:9733/ysd
				gdgetData(current){//每次翻页加载4条
					if(this.tcValue==0){
						//无状态默认全部
						this.axios.get("/orule/query?length=4&uid="+this.uid+'&offset='+current).then(res=>{
							if(res.data.status==200){
								console.log(res.data.rows)
								this.gdData=res.data.rows
								this.gdtotal=res.data.total
								this.gdpageSize=res.data.pageSize
							}
						})
					}else{
						//友有状态
						this.axios.get("/orule/query?length=4&uid="+this.uid+'&offset='+current+'&status='+this.tcValue).then(res=>{
							if(res.data.status==200){
								console.log(res.data.rows)
								this.gdData=res.data.rows
								this.gdtotal=res.data.total
								this.gdpageSize=res.data.pageSize
							}
						})
					}

				},
				//套餐翻页
				gdchangePageSize(size){
					this.gdpageSize=size
				},
				//套餐下拉
				gdorderselected(v){
					this.tcValue=v
					switch(v){
						case 0:
							this.getystc()
						break;
						case 1:
							this.getTCS(1)
						break;
						case 2:
							this.getTCS(2)
						break;
						case 9:
							this.getTCS(9)
						break;
					}

				},
				getTCS(s){
					this.axios.get("/orule/query?length=4&uid="+this.uid+'&status='+s).then(res=>{
						if(res.data.status==200){
							this.gdData=res.data.rows
							this.gdtotal=res.data.total
							this.gdpageSize=res.data.pageSize
						}
					})
				},
		/*******友商设置*******************************************************************/
			//获取GET /oconfig/get 获取拓客权益
			getoconfig(){
				this.axios.get('/oconfig/get?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						let data=res.data.rows

						if(data==null){
							this.formValidateyssetting.crmFirstCommission=''
							this.formValidateyssetting.crmCommission=''
							this.formValidateyssetting.friendCommission=''
						}else{
							this.formValidateyssetting.crmFirstCommission=String(res.data.rows.crmFirstCommission)
							this.formValidateyssetting.crmCommission=String(res.data.rows.crmCommission)
							this.formValidateyssetting.friendCommission=String(res.data.rows.friendCommission)
						}
					}
				})
			},
			//保存设置
			saveYsSetting(name){//POST /oconfig/update 更新拓客权益
				this.$refs[name].validate((valid) => {
					if(valid){
						this.axios.post('/oconfig/update?uid='+this.uid,{
							crmFirstCommission:Number(this.formValidateyssetting.crmFirstCommission),
							crmCommission:Number(this.formValidateyssetting.crmCommission),
							friendCommission:Number(this.formValidateyssetting.friendCommission),
						}).then(res=>{
							if(res.data.status==200){
								this.$notify({
							        title:"",//
							        message: '设置成功',
							        type: 'success',
							        position: 'bottom-right'
						        });
						        this.getoconfig()
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
		/**********佣金支付明细************************************************************************************************/
				//下拉
				mxorderselected(){

				},
				//明细翻页
				mxgetData(){

				},
				//明细翻页
				mxchangePageSize(){

				},
				/***********概览****************/
				glgetData(){

				},
				glchangePageSize(){

				},

				//获取当前时间
 				getDate(){
 					let date=new Date()
					this.beginTime=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
 				},
	       },

		 created(){
            	this.$nextTick(()=>{
            	this.gettk()//财务状况
				// this.getyjlist()//概览佣金列表

			})
        },
		mounted(){
			console.log(this.user)
			this.http=this.user.shareCode
			//头部是否欠款显示
			if(this.withDraw<this.NOpayyj){
				this.iscz=true
			}
			this.jian='件'
			this.getDate();//获取当前时间
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
<style scoped>

	.units-box {
		position:relative;
		width: 100%;
		height: 100%;
		background: rgb(230,233,236);

	}
	.bod{
		width: 100%;
		height: 100%;
		display: flex;
		background: rgb(230,233,236);
		overflow: hidden;
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
		height:89%;
		width:570px;
		right:-770px;
		top:48px;
		background: #fff;
		z-index:10;
		overflow-y: scroll;
		box-shadow: 0 0 20px #ccc
		/*border:1px solid red;*/
	}
	.addHotcz{
		position:fixed;
		z-index:99;
		height:89%;
		width:570px;
		right:-770px;
		top:48px;
		background: #fff;
		z-index:10;

		box-shadow: 0 0 20px #ccc
	}
	.addHotyh{
		position:fixed;
		z-index:99;
		height:89%;
		width:70%;
		right:-110%;
		top:48px;
		background: #fff;
		z-index:10;
		overflow-y: scroll;
		box-shadow: 0 0 20px #ccc
	}
	.addHottx{
		position:fixed;
		z-index:99;
		height:89%;
		width:665px;
		right:-765px;
		top:48px;
		background: #fff;
		z-index:10;
		overflow-y: scroll;
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
	.ygewm-list.bor{
		border-color:#C4D6F7;
		border-width:1px;
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
		height: 80%;
	}
	.skuname{
		text-align: left;
		margin-top:5px;
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
	.ygewm{
		height:100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		/*margin-bottom:140px;*/
	}
	.ygewm-list{
	    width: 360px;
	    text-align: center;
	    border: 1px solid #e4e4e4;
	    /*padding: 8px;*/

	    margin: 10px 10px;
	    display: flex;

	    flex-direction: column;
	}
	.page-box1{
		margin-bottom:180px;
		text-align: center;
	}
	.circle8{
	    background: #40ca98;
	}
	.circle9{
	    background: #d53c39;
	}
	.circle1{
	    background: #2B8F8F;

	}
	.circle0{
		background: #4F71DF;
	}
	.circle0,.circle1,.circle8,.circle9{
		display: inline-block;
	    width: 15px;
	    height: 15px;
	    border-radius: 50%;
	    margin-top: 6px;
	    margin-right:5px;
	    position:relative;
	    top:3px;
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
	#httpid,.httpid{
		display: inline-block;
	    width: 100%;
	    height: 32px;
	    line-height: 1.5;
	    padding: 4px 7px;
	    font-size: 12px;
	    border: 1px solid #dddee1;
	    border-radius: 4px;
	    color: #495060;
	    background-color: #fff;
	    background-image: none;
	    position: relative;
	    cursor: text;
	    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
	}
	  .right-left{
		width: 100%;
	   text-align: center;
		border:2px dashed #e1e1e1;
		margin:10px auto;
	}
	.cha{
		margin-right:20px;
	}
	.yhkmain{
		width:100%;
		display: flex;
		flex-wrap: wrap;
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
		border-bottom: 1px solid #ccc;
	}
	.yykNumber{
		height: 40px;
	    line-height: 40px;
	    background: #F1F1F1;
	    text-align: center;
	    margin: 20px 0;
	}
	.ysimg{
		width:100%;max-height:100%;
		padding:5px;
	}
	.add-bor{
		border:1px dotted #ccc;
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
	.copy{
		position:fixed;
		z-index:999999;
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

	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
width: 150px;
    height: 130px;
    display: block;
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
   	 	overflow: auto
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
