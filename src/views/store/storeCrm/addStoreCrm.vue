<template>
	<div class='addCrm'>
	<!--固定导航-->
		<div class="head">
			<!-- <Col span='6'> -->
				<div class="left-top">
					<p class="wldw">
						<!-- <span style="width:42px;font-weight:900">全部会员</span>
						 <Select style="width:100px" v-model='valueT' placeholder="全部"  @on-change="orderselected">
					        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
					    </Select> -->
					</p>
					<div>
						<!--新建-->
						<span class="top-left-btn"  @click="add">
							<Icon type="plus" style="position:absolute;top:7px;left:8px"></Icon></span>

					</div>
				</div>
			<!-- </Col> -->
			<!-- <Col span='18'> -->
				<div class="right-top">
				<div style='position: absolute;left: 360px;'>
					<span style="margin-left:20px;font-size:14px;font-weight:900">{{crmDetail.name}}</span>
				</div>
				<div style='position: absolute;right:280px;'>
					<div v-if="addText">
						<Button shape="circle"  style="background:#3b77e3;margin-right:5px;color:#fff;border:none" @click="saveCgInfo('formValidate')" >
						<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>保存</Button>

						<Button shape="circle"  @click="addCancel"  style="background:#999999;color:#fff;margin-right:10px;" ><Icon type="close" style="margin-right:5px;"></Icon>取消</Button>

						<span @click="cancelHome" style="cursor:pointer"><Icon type="close" class="cha" ></Icon></span>
					</div>

					<div v-if="!addText" class="changebutton">

						<Button type="ghost"  shape="circle"  @click="edit" v-if="editshow" style="background:#40ca98;margin-right:5px;color:#fff;border:none">
							 <i class="el-icon-edit" style=";margin-right:5px;"></i>
						修改
						</Button>
						
							<Button type="primary" shape="circle" @click="addcz" v-if="editshow"  style="background:#3b77e3;margin-right:5px;color:#fff;border:none">
							 <Icon type="social-usd" style="margin-right:5px;color:#fff"></Icon>充值
							</Button>
						
						<Button type="ghost"  shape="circle" @click="saveEdit('formValidate1')" v-if="!editshow" style="background:#3b77e3;margin-right:5px;color:#fff;border:none">
							<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>保存
						</Button>
						
						<Button shape="circle" v-if="!editshow"  @click="editCancel"  style="background:#999999;color:#fff;margin-right:10px;" ><Icon type="close" style="margin-right:5px;"></Icon>取消</Button>

						<Dropdown trigger="click" v-if='editshow'>
			                  <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
			                  <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
			              </Button>
			              <DropdownMenu slot="list">
			                	<span  @click="start"><DropdownItem >启用</DropdownItem></span>
			                  	<span  @click="stop"><DropdownItem >停用</DropdownItem></span>
			                  	<span  @click="del"><DropdownItem >删除</DropdownItem></span>
			              </DropdownMenu>
			           </Dropdown>
						<span @click="cancelHome" style="cursor:pointer;margin-left:5px" ><Icon type="close" class="cha" ></Icon>
						</span>
					</div>
				</div>
				</div>
			<!-- </Col> -->
		</div>
		<div style='height:60px'></div>
		<!--左侧列表-->
		<div class="left-content">
			<div class='locationSearch'>
			<Input style='padding:10px 20px;' v-model='searchKeyword' :placeholder="$t('public.nameandphone')" @on-enter='enterSearchdd'>
            <span slot="append"  @click='searchdd' style='cursor:pointer;'>搜索</span>
            </Input>
             <!-- <a style='font-size:14px;font-weight:600;margin-left:20px;border-bottom:1px solid #3b77e3;height:35px;line-hegiht:35px;line-height: 35px;margin-top: -2px;' @click='searchLocation'>精准搜索</a> -->
		</div>
			<p v-if="Allcrm.length==0" class='scrollFix'>
				<Spin>
	                <div>暂无数据</div>
	            </Spin>
		    </p>
			<Scroll :on-reach-bottom="handleReachEdge" :height="height" v-else>
				<div class="con-list" v-for="(item,index) in Allcrm" :key='index' @click="getcginfo(item.id,index,item)" :class="{bg:numIndex==index}">
					  <span class='left-img'>
					 	 <img :src="item.photo" width='60' height='60'>
					 </span>

					 <div>
					<p class="list-title">{{item.code}}</p>
					<p class="txt" style="margin-top:20px;">
						{{item.name}}
						<span style='margin-left:4px' :class="{colorGender1:item.gender=='1',colorGender0:item.gender=='0'}">
							{{item.gender=='1'?"男":item.gender=='0'?"女":''}}
						</span>
					</p>

					<span class="date">{{item.createTime}}</span>
					<div class="lanrenLeft" :class="{bg3:item.status==1,bg4:item.status==0}">
	                 <span >{{item.statusDesc}}</span>
	                </div>​
					</div>
				</div>

			</Scroll>
		</div>
		<!--右侧-->
		<div class="add-right" >
			<div class='right-left' v-if='leftphoto'>
					
                   <el-upload
					  class="avatar-uploader"
					  :action="logoUrl"
					  name='file'
					  :show-file-list="false"
					  :before-upload="beforeAvatarUpload"
					  :on-success="addsucess"
					  accept="image/*"
					  >
					  <img v-if="photo" :src="photo" class="avatar" width='30' height='30'>
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>

			</div>
			<!--新增-->
			<div class='right-right' v-if='addText'>
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
					<div style='display:flex;width:100%'>
						<div style='width:50%'>
							<FormItem label="姓名" prop="name">
		                        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
		                    </FormItem>
							<FormItem label="手机" prop="mobile">
		                        <Input v-model="formValidate.mobile" placeholder="请输入手机"></Input>
		                    </FormItem>
							<FormItem label="会员卡" prop="crmCardName">
								<span @click='crmCard'>
		                        <Input v-model="formValidate.crmCardName" placeholder="会员卡"></Input>
		                        </span>
		                    </FormItem>
		                    <!-- <FormItem label="归属店铺" prop="store">
								<span @click='clickstore'>
		                        <Input v-model="formValidate.store" placeholder="归属店铺"></Input>
		                        </span>
		                    </FormItem> -->
							<FormItem label="初始积分" >
		                      
		                        <InputNumber  :min="0" v-model="dqjf" @on-change="chargedqjf" placeholder="初始积分" style="width:100%"></InputNumber>
		                    </FormItem>

		                    <!-- <FormItem label="地址">
		                        <Input v-model="address " placeholder="地址"></Input>
		                    </FormItem> -->
						</div>
						<div style='width:50%'>
							<!-- <FormItem label="密码" prop='loginPs'>
		                        <Input v-model="formValidate.loginPs" type='password' placeholder="登陆密码"></Input>
		                    </FormItem> -->
							<FormItem label="性别" >
			                    <RadioGroup v-model="gender" @on-change="selsectedSex">
							        <Radio label="1">
							            <span>男</span>
							        </Radio>
							        <Radio label="0">
							            <span>女</span>
							        </Radio>
							    </RadioGroup>
			                </FormItem>
							<FormItem label="生日">
			                    <DatePicker type="date" :options="optionsB" style='width:100%' placeholder="生日" :value='birthday' @on-change="changeBirthday"></DatePicker>
			                </FormItem>
							<FormItem label="默认导购">
								<span @click="selecteStore">
		                        <Input v-model="employeeName" placeholder="默认导购"></Input>
		                        </span>
		                    </FormItem>
		                   <!--  <FormItem label="失效时间" prop="endDate">
			                    <DatePicker   type="date" placeholder="失效时间" style='width:100%' :value='formValidate.endDate' @on-change="changeEndDate"></DatePicker>
			                </FormItem> -->
			                 <FormItem label="初始余额">
		                         <InputNumber  :min="0" v-model="chargeMoney"  placeholder="初始余额" style="width:100%" @on-change="chargeMoneys"></InputNumber>
		                    </FormItem>
						</div>
					</div>
					<FormItem label="备注">
	                    <Input type='textarea' style='width:100%;' v-model='remark' placeholder='备注'></Input>
	                </FormItem>
				</Form>

			</div>
			<!--修改-->
			<div class='right-right' v-if='xiugai'>
				<Form ref="formValidate1" :model="formValidate" :rules="ruleValidate" :label-width="80">
					<div style='display:flex;width:100%'>
						<div style='width:50%'>
							<FormItem label="姓名" prop="name">
		                        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
		                    </FormItem>
							<FormItem label="手机" prop="mobile">
		                        <Input v-model="formValidate.mobile" placeholder="请输入手机"></Input>
		                    </FormItem>
							<FormItem label="会员卡" prop="crmCardName">
								<span @click='crmCard'>
		                        <Input v-model="formValidate.crmCardName" placeholder="会员卡"></Input>
		                        </span>
		                    </FormItem>
		                    <!--  <FormItem label="归属店铺" prop="store">
								<span @click='clickstore'>
		                        <Input v-model="formValidate.store" placeholder="归属店铺"></Input>
		                        </span>
		                    </FormItem> -->
							<FormItem label="初始积分" >
		                         <InputNumber  :min="0" v-model="dqjf" @on-change="chargedqjf"  placeholder="初始积分" style="width:100%"></InputNumber>
		                    </FormItem>

		                    <!-- <FormItem label="地址">
		                        <Input v-model="address " placeholder="地址"></Input>
		                    </FormItem> -->
						</div>
						<div style='width:50%'>
							<FormItem label="性别" >
			                    <RadioGroup v-model="gender" @on-change="selsectedSex">
							        <Radio label="1">
							            <span>男</span>
							        </Radio>
							        <Radio label="0">
							            <span>女</span>
							        </Radio>
							    </RadioGroup>
			                </FormItem>
							<FormItem label="生日">
			                    <DatePicker  style='width:100%' :options="optionsB" type="date" placeholder="生日" :value='birthday' @on-change="changeBirthday"></DatePicker>
			                </FormItem>
							<FormItem label="默认导购">
								<span @click="selecteStore">
		                        <Input v-model="employeeName" placeholder="默认导购"></Input>
		                        </span>
		                    </FormItem>
		                    <!-- <FormItem label="失效时间" prop="endDate">
			                    <DatePicker   type="date" placeholder="失效时间" style='width:100%' :value='formValidate.endDate' @on-change="changeEndDate"></DatePicker>
			                </FormItem> -->
			                <FormItem label="初始余额">
		                        <InputNumber  :min="0" v-model="chargeMoney" @on-change="chargeMoneys" placeholder="初始余额" style="width:100%"></InputNumber>
		                    </FormItem>

						</div>
					</div>
					<FormItem label="备注">
	                        <Input type='textarea' style='width:100%;' v-model='remark' placeholder='备注'></Input>
	                </FormItem>
				</Form>

			</div>
			<!--详情-->
			<!--详情明细订单页面-->
				<div class="right-content right-detail" ref="detail" style="display:none;position:relative">
					<div >

					<div style='display:inline-block;margin: 0 20px;border-radius:50%;overflow:hidden;vertical-align: middle;'>

						<img :src="crmDetail.photo" width='120' height='120' style='vertical-align:middle'>
					</div>
					<div style='display:inline-block;vertical-align:middle;margin-left:20px'>
					<div  style='display:inline-block'>
						<div class="list-box list-box1">
							<span>姓名 : </span><div>{{crmDetail.name}}</div>
						</div>
						<div class="list-box list-box1">
						<span>{{$t('public.gender')}} : </span><div>{{crmDetail.gender=='1'?this.$t('public.man'):crmDetail.gender=='0'?this.$t('public.woman'):''}}</div>
						</div>
						<div class="list-box list-box1">
							<span> 手机 : </span><div>{{crmDetail.mobile}}</div>
						</div>
					</div>
					<div style='display:inline-block;margin-left:20px'>
						<div class="list-box list-box1">
								<span>账户余额 : </span>
								<div style='color:#FF934D'>{{crmDetail.chargeMoney}}</div><span>元</span>
						</div>
						<div class="list-box list-box1" >
							<span>会员积分:</span> <div style='color:#FF934D'>{{crmDetail.dqjf}}</div>

						</div>
						<div class="list-box list-box1">
							<span>{{$t('member.DG')}} : </span><div>{{crmDetail.employeeName}}</div><!--导购-->
						</div>
						

					</div>
					<div style='display:inline-block;margin-left:20px;vertical-align:top'>
						<div class="list-box list-box1" >
							<span>会员卡等级 : </span><div>{{crmDetail.level}}</div>

						</div>
						<div class="list-box list-box1">
							<span>备注 : </span><div>{{crmDetail.remark}}</div>
						</div>

					</div>
				</div>
				<!--**********下方数据***********-->
							<div class="detail-bottom">
								<!--状态-->
			                        <div class="lanren" :class="{bgd1:crmDetail.status==1,bgd3:crmDetail.status==0}">
			                           <span>{{crmDetail.statusDesc}}</span>
			                        </div>​
								<div class="detail-title-mark">
									<div v-for="(item,index) in titles" class="detail-title" @click="addborder(index)" :class="{bor:index==num2}">
										{{item}}
									</div>
								</div>

								<!--订单-->
								<div v-if="num2==0" class="detail-public">
									<!--订单表格数据-->
									<div class="table">
										<Table border :columns="orderDateKey" :data="orderdataList" ></Table>
										<!--底部的分页-->
										<div class="page-box" v-if='total>10'>
											 <Page :total="total" size='small' show-total  :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
										</div>
									</div>
								</div>
								<!--积分-->
								<div v-if="num2==1" class="detail-public">

									<div class="table">
										<Table border :columns="jfDateKey" :data="jfdataList" ></Table>
										<!--底部的分页-->
										<div class="page-box" v-if='jftotal>10'>
											 <Page :total="jftotal" size='small' show-total  :pageSize='jfpageSize'  @on-change="jfgetData" @on-page-size-change="jfchangePageSize"></Page>
										</div>
									</div>
								</div>
								<!--充值历史-->
								<div v-if='num2==2' class="detail-public">
									<div class="table">
										<Table border  :columns="czDateKey" :data="czdataList" ></Table>
										<!--底部的分页-->
										<div class="page-box" v-if='cztotal>0'>
											 <Page :total="cztotal" size='small' show-total  :pageSize='czpageSize'  @on-change="czgetData" @on-page-size-change="czchangePageSize"></Page>
										</div>
									</div>
								</div>
								<!--消费历史-->
								<div v-if='num2==3' class="detail-public">
									<div class='addRess' style='width:98%;margin-top:20px'>
											<!--头部-->
											<div class='addRess-top'>
												<div  class='address-left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
												<div class='addressTitle'>{{$t('public.address')}}</div>
												<div style='color:#4E7DDD;cursor:pointer' class='addressbtn0' @click='addr'>{{$t('public.addnew')}}</div>
											</div>
											<div class='addRess-top1'>
												<div class='address-left'>{{$t('public.deaddress')}}</div>
												<div class='title-ht' style='display: flex;width:100%;font-weight:600;justify-content: space-around;'>
												<span>{{$t('public.xxaddress1')}}</span>
												<span >{{$t('public.xxaddress')}}</span>
												<span>{{$t('sales.client.contact')}}</span>
												<span>{{$t('sales.client.contactMobile')}}</span>
												<span>{{$t('sales.client.contactPhone')}}</span>
												</div>
												<div style='color:#4E7DDD;' class='addressbtn'>{{$t('public.action')}}</div>
											</div>
											<!--地址列表-->
											<div class='addRess-top1' v-for='(i,index) in AllAddress' :key='index'>
												<div class='address-left'>
												<Checkbox :value="i.default" @on-change='defaultAddress(i.id)'></Checkbox>
												</div>
												<div class='addressTitle title-ht' style='display:flex;;align-items: center;width: 100%;justify-content: space-around;'>

												<span>{{i.province}}  {{i.city}} {{i.county}}</span>

												<span style='word-wrap: break-word;'>{{i.address}}</span>
												<span>{{i.name}}</span>

												<span>{{i.mobile}}</span>
												<span >{{i.phone}}</span>
												</div>
												<div style='color:#72C89E;cursor:pointer' class='addressbtn' >

												<span @click='editAddressBtn(i.id)'>{{$t('public.EditBtn')}}</span>
												<span @click='deleteAddressBtn(i.id)' style='color:#d53c39'>删除</span>

												</div>
											</div>
										</div>
								</div>
							</div>
						</div>

				</div>
		</div>

		<!--选择员工弹出框-->
		<Modal v-model="ygisshow" width="660px">
			<p slot="header" style="height:30px;line-height:30px">

				<span>选择导购</span>
			</p>
			<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
				<Input v-model='ygkeyword'  placeholder="编码、名称" style="padding:2px 0" @on-enter='entersearchYG'></Input>
				<span @click="searchYG">
					<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>
				</span>
			</div>
			<div slot="footer" style='margin-top:-10px'>
				<!--员工表格-->
				<Table  border height='300' highlight-row :columns="storeKey" :data="allStore" @on-row-click="ckrow"  @on-row-dblclick="dblclickrow">
				</Table>
				<!--分页-->
	            <div class="page-box" style="text-align:left">
				 <Page :total="ygtotal" :pageSize='ygpageSize' show-total size="small" @on-change="getygData" @on-page-size-change="changeygPageSize"></Page>
				</div>
				<div class='title'>
					<div style='color:#D15151;font-size:14px'>
						<!-- <Icon type="plus" style='margin-right:5px'></Icon>
						<span >添加员工</span> -->
					</div>
					<div>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancelyg'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="surelyg"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
					</div>
				</div>
			</div>
		</Modal>
		<!--选择会员卡-->
		<Modal v-model="crmCardisshow" width="660px">
			<p slot="header" style="height:30px;line-height:30px">

				<span>会员卡搜索</span>
			</p>
			<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
				<Input  placeholder="卡号" style="padding:2px 0" v-model='cardKeyword' @on-enter='cardEnter'></Input>
				<span @click='clicksearch'>
					<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9;cursor:pointer" ></Icon>
				</span>
			</div>
			<div slot="footer" style='margin-top:-10px'>
				<!--会员表格-->
				<Table  border height='300' highlight-row :columns="crmCardkey" :data="crmCardData" 
				@on-row-click="crmrow" @on-row-dblclick="dblcrmrow">
				</Table>
				<div class="page-box">
					<Page v-if='cardtotal!=0' :total="cardtotal" show-total size="small" :pageSize='cardpageSize'  @on-change="cardgetData" @on-page-size-change="cardchangePageSize"></Page>
				</div>
				<div class='title'>
					<div style='color:#D15151;font-size:14px'>
					<!-- 	<Icon type="plus" style='margin-right:5px'></Icon>
						<span >添加会员卡</span> -->
					</div>
					<div>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancelCrmCard'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="sureCrmCard"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
					</div>
				</div>
			</div>
		</Modal>
		<!--店铺-->
		<Modal v-model="storeisshow" width="660px">
			<p slot="header" style="height:30px;line-height:30px">

				<span>店铺搜索</span>
			</p>
			<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
				<Input  placeholder="卡号" style="padding:2px 0" v-model='storeKeyword' @on-enter='cardEnterstore'></Input>
				<span @click='clicksearchstore'>
					<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9;cursor:pointer" ></Icon>
				</span>
			</div>
			<div slot="footer" style='margin-top:-10px'>
				<!--会员表格-->
				<Table  border height='300' highlight-row :columns="storekey" :data="storeData" @on-row-click="crmrowstore">
				</Table>
				<div class="page-box">
					<Page v-if='storetotal!=0' :total="storetotal" show-total size="small" :pageSize='storepageSize'  @on-change="storegetData" @on-page-size-change="storechangePageSize"></Page>
				</div>
				<div class='title'>
					<div style='color:#D15151;font-size:14px'>
					<!-- 	<Icon type="plus" style='margin-right:5px'></Icon>
						<span >添加会员卡</span> -->
					</div>
					<div>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancelStore1'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="sureStore"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
					</div>
				</div>
			</div>
		</Modal>

		<!--收款三步-->
	<el-dialog :visible.sync="alertch" ><!--:close-on-click-modal='false'-->
		<div class='paydialog'>
		<el-steps  :active="active"  align-center finish-status="success" class='step'>
		  <el-step title="支付方式"></el-step>
		  <el-step title="充值信息"></el-step>
		  <el-step title="交易完成"></el-step>
		</el-steps>	
		</div>	
		<!--下-->
		<div v-if='one'>
			<div class='dialog-bottom'>
				<div class="dialog-left">
					<div class='left-info'>
						<li ><span class='span'>会员编号：</span><span>{{item.code}}</span></li>
			        	<li ><span class='span'>会员：</span><span>{{item.name}}</span></li>
			          
			        	<li ><span class='span'>余额：</span><span style='color:#d53c39'>{{item.chargeMoney}}</span><span>元</span></li>
					</div>
					
					<div v-if='HdData.lenght==0'>暂无活动</div>
		            <div class='czmian' v-else>
		            	<div class='cztitle'>充值活动</div>
		              <div class='right-list' v-for='(item,index) in HdData' :class="{bgss:numIndex==index}" @click='clickLi(item,index)' :key='index'>
		                    <div style='margin-bottom:5px'>活动名称：<span style='font-size:14px;font-weight:600;color:#4C6DDE'>{{item.title}}</span></div>
		                    <div>
		                      <div>充值金额：<span style='color:#d53c39'>{{item.charge}}</span></div>
		                      <div>赠送金额：<span style='color:#d53c39'>{{item.giftCharge}}</span></div>
		                    </div>
		              </div>
		              <div class="page-box44">
	                   <Page :total="hdtotal" show-total  :pageSize='hdpagesize'  @on-change="hdgetData" @on-page-size-change="hdchangePageSize">
	                   </Page>
	                  </div>
		            </div>
					
				</div>
				<div class="dialog-right">
					<li style='width:100%'>
						<div class='payWay-dialog'>
							<img src="http://img.zsydian.com/icon/payWayzfb.png" style='margin:0 5px'><span>支付宝</span>
							<span><Icon type="plus-circled" style=''></Icon></span>
							<img src="http://img.zsydian.com/icon/payWaywx.png" style='margin:0 5px'><span>微信</span>
							<span>等第三方</span>
						</div>
						<span style='margin-top:15px'>
							<Input v-model.lazy='zfbmoney'  @on-change='moneychangezfb' @on-focus='zfbfocus'></Input>
						</span>
					</li>
					
					<li >
						<div class='payWay-dialog'>
							<img src="http://img.zsydian.com/icon/payWaysk.png" >
							<span>刷卡支付</span>
						</div>
						<span style='margin-top:15px' >
							<Input v-model.lazy='skmoney'  @on-change='moneychangesk' @on-focus='skfocus' ></Input>
						</span>
					</li>
					<li style='border-right:1px solid #e4e4e4'>
						<div class='payWay-dialog'>
							<img src="http://img.zsydian.com/icon/payWayxj.png" ><span>现金支付</span>
						</div>
						<span style='margin-top:15px' >
							<Input v-model.lazy='xjmoney'  @on-change='moneychangexj' @on-focus='xjfocus'></Input>
						</span>
					</li>
					<li style='border-right:1px solid #e4e4e4'>
						<div class='payWay-dialog'>
							<img src="http://img.zsydian.com/icon/payWayxj.png" ><span>线下支付</span>
						</div>
						<span style='margin-top:15px' >
							<Input v-model.lazy='xxmoney'  @on-change='moneychangexx' @on-focus='xxfocus'></Input>
						</span>
					</li>
					<!-- <li style='border-right:1px solid #e4e4e4'>
						<div class='payWay-dialog'>
							<img src="http://img.zsydian.com/icon/payWayxj.png" ><span>储值卡支付</span>
						</div>
						<span style='margin-top:15px' >
							<Input v-model.lazy='czkmoney'  @on-change='moneychangeczk' @on-focus='czkfocus'></Input>
						</span>
					</li> -->
					<!-- <li style='border-right:1px solid #e4e4e4'>
						<div class='payWay-dialog'>
							<img src="http://img.zsydian.com/icon/payWayxj.png" ><span>DOCU</span>
						</div>
						<span style='margin-top:15px' >
							<Input v-model.lazy='DOCUmoney'  @on-change='moneychangeDOCU' @on-focus='DOCUfocus'></Input>
						</span>
					</li> -->
					<li style='border-right:1px solid #e4e4e4'>
						<div class='payWay-dialog'>
							<img src="http://img.zsydian.com/icon/payWaymore.png" ><span>其他支付</span>
						</div>
						<span style='margin-top:15px' >
							<Input v-model.lazy='othermoney'  @on-change='othermoney1' @on-focus='otherfocus'></Input>
						</span>
					</li>
					<div class='dialog-btn1'>
			            <span style='margin-top:15px;margin-left:5px'><span>充值金额：</span ><span style='color:#FB9961;font-size:25px;'>{{Allp}}</span></span>
			            <div>
			            <span class='payBtn' @click='skCancel' style='background:#999;'>取消</span>
			            <span class='payBtn' @click="oneStep">收款</span>
			            </div>
			          </div>
				</div>
			</div>
		</div>
		<div v-if='two'>
			<div class='dialog-bottom'>
				<div class="dialog-left" style='margin-top:10px;padding: 0px 0 30px 10px;'>
					
					<div class='left-info'>
						<li ><span class='span'>会员编号：</span><span>{{item.code}}</span></li>
			        	<li ><span class='span'>会员：</span><span>{{item.name}}</span></li>
			          
			        	<li ><span class='span'>余额：</span><span style='color:#d53c39'>{{item.chargeMoney}}</span><span>元</span></li>
			        	<li v-if='itemhd.title'><span class='span'>参与活动：</span><span style='color:#d53c39'>{{itemhd.title}}</span><span></span></li>
					</div>
					<div style='font-weight:600;font-size:16px;padding: 10px;'>
			            <li style='display:flex;height: 35px;line-height: 35px;'>
			              <span class='span'>充值金额 &nbsp;</span>
			              <span style='color:#FB9961;font-size:25px'>{{payPrice}}</span>
			              <span>&nbsp;元</span>
			            </li>
			          </div>


				</div>
				<div class="dialog-right">
					<div style='width:100%;text-align:center;margin-top:10px' v-if='zfbmoney!=0'>
						<Input style='width:70%' placeholder='输入付款码' v-model='fkmcode' ref='fkm'></Input>
					</div>
					<div style='width:100%;text-align:center;margin-top:10px'>
						 
						<div>

						 <Col class="demo-spin-col" span="24">
				            <Spin fix>
								
								<div>支付中...</div>
							</Spin>
				        </Col>
				        <!--  <Col class="demo-spin-col" span="24">
				           
				           <strong style='color:#3B77E3;font-size:16px'>支付成功!</strong>
				        </Col> -->
				        </div>
					</div>
					
					<div class='dialog-btn'>
						<span class='payBtn' style='background:#ccc;' @click="twocancel">返回</span>
						<span class='payBtn payBtn1' style='background:#3B77E3;;margin-left:20px' @click="twoStep">收款确认</span>
					</div>
				</div>
			</div>
		</div>
		<div v-if='three'>
			<div class='dialog-bottom'>
				<div class="dialog-left1">
					<div class='left-info'>
					<li style='font-weight:600'>充值明细:</li>
					<li v-if='zfbmoney!=0' style='margin-top:10px'><span style='color:#999'>支付宝支付：</span><span style='margin-left:5px;color:#278A8B'><strong>{{zfbmoney}}</strong>元</span></li>
					
					<!-- <li v-if='crmmoney!=0'><span style='color:#999'>会员卡支付：</span><span style='margin-left:5px;color:#278A8B'><strong>{{crmmoney}}</strong>元</span></li> -->
					<li v-if='xjmoney!=0' style='margin-top:10px'><span style='color:#999'>现金支付：</span><span style='margin-left:5px;color:#d53c39'><strong>{{xjmoney}}</strong>元</span></li>
					<li v-if='skmoney!=0' style='margin-top:10px'><span style='color:#999'>刷卡支付：</span><span style='margin-left:5px;color:#d53c39'><strong>{{skmoney}}</strong>元</span></li>
					<li v-if='othermoney!=0' style='margin-top:10px'><span style='color:#999'>其他支付：</span><span style='margin-left:5px;color:#d53c39'><strong>{{othermoney}}</strong>元</span></li>
					<li v-if='xxmoney!=0' style='margin-top:10px'><span style='color:#999'>线下支付：</span><span style='margin-left:5px;color:#d53c39'><strong>{{xxmoney}}</strong>元</span></li>
					<li v-if='czkmoney!=0' style='margin-top:10px'><span style='color:#999'>储值卡支付：</span><span style='margin-left:5px;color:#d53c39'><strong>{{czkmoney}}</strong>元</span></li>
					<li v-if='DOCUmoney!=0' style='margin-top:10px'><span style='color:#999'>DOCU：</span><span style='margin-left:5px;color:#d53c39'><strong>{{DOCUmoney}}</strong>元</span></li>
					</div>
					
				</div>
				<div class="dialog-right">
					<div style='width:100%;text-align:center;margin-top:10px'>
						<Icon type="ios-checkmark-outline" size='160' style='color:#13CE66'></Icon>
					</div>
					<div class='dialog-btn'>
						
						<span class='payBtn payBtn1' style='background:#13CE66;padding:0 4px' @click="goOn">充值完成</span>
					</div>
				</div>
			</div>
		</div>
	</el-dialog>
	 <!--保存地址-->
   	<Modal v-model="saveaddressisshow" width="560px" >
        <p slot="header" style="height:30px;line-height:30px">
          <span>{{$t('public.addnew')}}</span>
        </p>
         <Form ref="xiaoshousave" :model="xiaoshouformValidate" :rules="xiaoshouruleValidate" :label-width="80" >
         	<FormItem label="地址" prop="addressProvince">
         		<el-cascader
		          filterable
		              expand-trigger="click"
		              :options="cityInfo"
		              v-model="selectedOptions3"
		              @change="handleChange1"
					 :placeholder="$t('public.pleseSelect')"
					  style="width:400px">
		        </el-cascader>
         	</FormItem>
         	<FormItem label="详细地址" prop="addressAddress">
         		 <Input type="text" v-model="xiaoshouformValidate.addressAddress" placeholder="详细地址" style="width:400px"></Input>
         	</FormItem>
         	<FormItem label="联系人" prop="addressName">
         		 <Input type="text" v-model="xiaoshouformValidate.addressName" placeholder="联系人" style="width:400px"></Input>
         	</FormItem>
         	<FormItem label="手机号" prop="addressMobile">
         		 <Input type="text" v-model="xiaoshouformValidate.addressMobile" placeholder="手机号" style="width:400px"></Input>
         	</FormItem>
         	<FormItem label="电话">
         		 <Input type="text" v-model="xiaoshouformValidate.addressPhone" placeholder="电话" style="width:400px"></Input>
         	</FormItem>
         	<FormItem label="默认">
         		<Checkbox v-model='isdefault' @on-change="changeisdefault"></Checkbox>
         	</FormItem>
         </Form>
        <div slot="footer">
          <div class='title'>
            <div style='color:#D15151;font-size:14px'>
              </div>
            <div style='margin-top:10px'>
              <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancelAddress'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
              <Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="saveAddRess('xiaoshousave')" ><Icon type="checkmark-round" style="margin-right:5px"></Icon>{{$t('public.SaveBtn')}}</Button>
            </div>
          </div>
        </div>
    </Modal>
      <!--修改地址-->
    <Modal v-model="addressisshow" width="560px" >
        <p slot="header" style="height:30px;line-height:30px">
          <span>{{$t('public.EditBtn')}}</span>
        </p>
        <Form ref="xiaoshousaveE" :model="xiaoshouformValidate" :rules="xiaoshouruleValidate" :label-width="80" >
         	<FormItem label="地址" prop="addressProvince">
         		<el-cascader
		          	filterable
		              expand-trigger="click"
		              :options="cityInfo"
		              v-model="selectedOptions3"
		              @change="handleChange1">
		            </el-cascader>
         	</FormItem>
         	<FormItem label="详细地址" prop="addressAddress">
         		 <Input type="text" v-model="xiaoshouformValidate.addressAddress" placeholder="详细地址" style="width:400px"></Input>
         	</FormItem>
         	<FormItem label="联系人" prop="addressName">
         		 <Input type="text" v-model="xiaoshouformValidate.addressName" placeholder="联系人" style="width:400px"></Input>
         	</FormItem>
         	<FormItem label="手机号" prop="addressMobile">
         		 <Input type="text" v-model="xiaoshouformValidate.addressMobile" placeholder="手机号" style="width:400px"></Input>
         	</FormItem>
         	<FormItem label="电话">
         		 <Input type="text" v-model="xiaoshouformValidate.addressPhone" placeholder="电话" style="width:400px"></Input>
         	</FormItem>
         	<FormItem label="默认">
         		<Checkbox v-model='isdefault' @on-change="changeisdefault"></Checkbox>
         	</FormItem>
         </Form>
        <div slot="footer">

          <div class='title'>
            <div style='color:#D15151;font-size:14px'>
              </div>
            <div style='margin-top:10px'>
              <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancelAddress'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
              <Button shape="circle" type="ghost" style="display:inline-block;background:#40ca98;color:#fff" @click="editAddress('xiaoshousaveE')" ><i class="el-icon-edit" style=";margin-right:5px;"></i>{{$t('public.EditBtn')}}</Button>
            </div>
          </div>
        </div>
   	</Modal>
		<div class='totBottom'>
            <span>共<span style='color:#ff0000'> {{totalcl}} </span>条</span>
            <span>当前第<span style='color:#ff0000'> {{current}} </span>页</span>
     </div>
	</div>
</template>
<script type="text/javascript">
import LoadUrl from '@/components/common/actionLoad'
import { regionData,CodeToText,TextToCode} from 'element-china-area-data'
	export default{
		data(){
			return{
				optionsB: {
					//当前年份 前18年 后无法选择
                    disabledDate (date) {
                        return date.getTime() > (new Date(new Date().getFullYear()-18,0,0)).getTime();
                    }
                },
				saveaddressisshow:false,//保存的弹框
				addressisshow:false,//地址修改的弹框
				selectedOptions3:[],
				
				AllAddress:[],//地址列表
        		addressId:'',//地址ID
				xiaoshouformValidate:{
					addressAddress:"",
					addressName:"",
					addressMobile:"",
					addressPhone:"",
					addressProvince:"",
				},
				xiaoshouruleValidate:{
					addressProvince:[ { required: true, message: '地址不能为空', trigger: 'change' }],
					addressAddress:[ { required: true, message: '详细地址不能为空', trigger: 'blur' }],
					addressName:[ { required: true, message: '联系人不能为空', trigger: 'blur' }],
					addressMobile:[{ required: true, message: '手机号不能为空', trigger: 'blur' },{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号码' }]

				},
				
				isdefault:false,//保存是是否设置为默认地址
				Allp:0,
				//活动列表
				HdData:[],
		        hdtotal:0,
		        hdpagesize:0,
		        numIndexC:-1,
		        itemhd:{},
		        ///
				discountPrice:10,
				alertch:false,
				totalCount:0,
				totalAmount:0,
				zfbmoney:0,//支付宝//微信
				crmmoney:0,//会员余额
				skmoney:0,////刷卡
				xjmoney:0,//现金
				othermoney:0,//其他
				DOCUmoney:0,//DOCU
				czkmoney:0,//储值卡
				xxmoney:0,//线下
				payPrice:0,
				active:1,
				one:true,
				two:false,
				three:false,
				fkmcode:'',//收款码
				details:[],//订单明细
				payVos:[],//支付订单订单明细
				orderNumber:'',//订单号 
				type:1,//1聚合支付// 9现金支 ,//11;刷卡支付 ;//25其他支付 ;//5 BISHOP储值卡支付 //18线下付款 //15 DOCU
				time:null,
				
				///
				cz:false,
				crmid:"",
				crmn:"",
				czisshow:false,//会员列表充值
				item:{},//会员列表一行数据

				searchKeyword:"",
				//店铺弹框
				storeID:'',
				storeisshow:false,
				ygisshow:false,
				storeKeyword:"",
				storeData:[],
				storetotal:0,
				storepageSize:0,
				storekey:[
					{
						title:"编号",
						width:180,
						key:"code"
					},
					{
						title:"店铺",
						width:180,
						key:"name"
					},

					{
						title:"联系人",
						width:120,
						key:"person"
					},
					{
						title:"电话",
						width:120,
						key:"phone"
					},
					{
						title:"状态",
						width:120,
						key:"statusDesc"
					},
				],
				cardKeyword:"",//会员卡关键字搜索
				formValidate:{
					name:"",//会员名称
					loginPs:'',//会员登陆密码
					mobile:'',//会员手机
					crmCardName:'',//会员卡名称
					endDate:"",//失效时间
					discount:'10',//折扣
					store:'',//店铺
				},
				ruleValidate:{
					name:[{ required: true, message: '会员名称不能为空', trigger: 'blur' },{ pattern:/^[A-Za-z\d_\-\u4e00-\u9fa5]{1,20}$/, message: '存在非法字符或超过指定长度20个字符' }],
					// store:[{ required: true, message: '店铺不能为空', trigger: 'blur' }],
					loginPs:[{ required: true, message:this.$t('public.pssEmpty'), trigger: 'blur' },{ pattern:/^[A-Za-z\d_\-\u4e00-\u9fa5]{1,20}$/, message: '存在非法字符或超过指定长度20个字符' }],
					// crmCardName:[{ required: true, message: '会员类型不能为空', trigger: 'blur' }],
					mobile:[{ required: true, message: '手机号码不能为空', trigger: 'blur' },
					{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号码' }],

					discount:[
					// { pattern: /^(?!0(\.0{1,2})?$)(\d(\.\d{1,2})?|10)$/, message: '折扣应为数字', trigger: 'blur'  }
					{ pattern: /^\d{1,14}(\.\d{1,2})?$/, message: '折扣应为数字或小数且小数点后两位', trigger: 'blur'  }
					]

				},
				totalcl:0,
				pageSizecl:0,
				logoUrl:LoadUrl.httpPrefix.Url+'file/action/upload/image/url?uid='+this.$store.state.common.token,//图片上传地址
				CodeToText:CodeToText,//code转为Text
				TextToCode:TextToCode,//Text转为code
				cityInfo:regionData,//地址数据
				selectedOptions2:[],//绑定的数据
				ygtotal:0,
				ygpageSize:0,
				ygkeyword:'',//搜索关键词
				addoredit:"新增会员",
				leftphoto:true,
				xiugai:false,
				current:1,
				height:'',
				numIndex:0,
				indexId:'',
				addText:true,
				editshow:false,
				storeisshow:false,
				crmCardisshow:false,
				storekeyword:'',
				cartype:'',
				num2:0,
				
				pageSize:0,
				total:0,
				titles:["订单","积分","充值历史",'会员地址'],//,"消费历史"
				 //消费历史
				 // xfdataList:[],
				 // xfpageSize:0,
				 // xftotal:0,
				 // xfDateKey:[
					//  	{
					//  		title:"订单编号",
					//  		key:"payNo"
					//  	},
					//  	{
					//  		title:"会员编码",
					//  		key:"crmCode"
					//  	},
					//  	{
					//  		title:"充值金额",
					//  		key:"amount"
					//  	},
					//  	{
					//  		title:"状态",
					//  		key:"status"
					//  	},
					//  	{
					//  		title:"充值时间",
					//  		key:"createTime"
					//  	},
				 // ],
				 //充值历史
				 cztotal:0,
				 czpageSize:0,
				czDateKey:[
				 	{
				 		title:"会员编码",

				 		key:"crmCode"
				 	},
				 	{
				 		title:"充值金额",
				 		key:"amount"
				 	},
				 	{
				 		title:"充值积分",
				 		key:"giftIntegral"
				 	},
				 	{
				 		title:"赠送金额",
				 		key:"giftAmount"
				 	},
				 	{
				 		title:"状态",
				 		key:"statusDesc"
				 	},
				 	{
				 		title:"充值时间",
				 		key:"createTime"
				 	},
				 ],
				czdataList:[],
				 //订单历史
				orderdataList:[],
				orderDateKey:[

					{
						title:"单号",

						key:"orderNo"
					},
					{
						title:"消费金额",

						key:"amount"
					},
					{
						title:"消费时间",

						key:"createTime"
					},
					{
						title:"状态",

						key:"statusDesc"
					},
				],
				jfpageSize:0,
				jftotal:0,
				jfdataList:[],
				//积分历史
				jfDateKey:[
					{
						title:"会员编码",

						key:"crmCode"
					},
					{
						title:"店铺",

						key:"storeName"
					},
					{
						title:"会员名",

						key:"crmName"
					},
					{
						title:"jf",

						key:"jf"
					},
					{
						title:"qcsl",

						key:"qcsl"
					},
					{
						title:"qcje",

						key:"qcje"
					},
					{
						title:"zjfx",

						key:"zjfx"
					},
					{
						title:"zj",

						key:"zj"
					},
					{
						title:"sl",

						key:"sl"
					},
				],
				//会员等级-会员卡
				crmObj:{},
				crmDetail:{},
				crmCardData:[],
				cardpageSize:0,
				cardtotal:0,
				crmCardkey:[
		            {
		               title:this.$t('member.name'),//会员
		                key:'name'
		            },
		            {
		                title:'消费金额',
		                key:'consumptionAmount'
		            },
		            {
		                title:this.$t('member.yj'),//押金
		                key:'deposit'
		            },
		            {
		                title:'是否默认',
		                key:'defaultValueDesc'
		            },
		            {
		                title:this.$t('member.disc'),//'折扣',
		                key:'discount'
		            },
		            {
		                title:'期限',
		                key:'timeMonth'
		            },
		            {
		                title:this.$t('member.crmintegral.usefw'),//'使用范围',
		                key:'useTypeDesc'
		            }
			    ],
			    //导购员工
			    ygObj:{},
				allStore:[],
				storeKey:[
					{
						title:"员工编号",
						width:180,
						key:"code"
					},
					{
						title:"员工姓名",

						key:"name"
					},

					{
						title:"性别",

						key:"gender",
						render:(h,params)=>{
		              return h('div',{
		                  
		                },params.row.genderDes)
		              }
					},

					{
						title:"电话",

						key:"phone"
					}

				],
				Allcrm:[],
				uid: this.$store.state.common.token,
				user:this.$store.state.common.user,
				valueT:1,
				orderListname:[
					
                    {
                        label:this.$t('public.normal'),//正常
                        value:1
                    },
                    {
                        label:this.$t('public.normalT'),//"已停用",
                        value:7
                    },

				],
				crmCardName:'',//会员卡名
				crmCardId:'',//会员卡id
				photo:'',//会员头像
				code:'',//会员号
				name:'',//会员名
				mobile:'',//手机号
				address:'',//地址
				storeName:'',//店铺名
				storeId:'',//店铺编号
				remark:'',
				province:'',//省
				city:'',//市
				district:'',//区
				addressDetail:'',//详细地址
				gender:'1',//
				birthday:'',
				dqjf:0,//初始积分
				chargeMoney:0,//初始余额
				employeeId:'',
				employeeName:'',
			}
		},
		methods:{
			chargeMoneys(s){
				this.chargeMoney=s
			},
			chargedqjf(s){
				this.dqjf=s
			},
			//点击新增地址弹框
			addr(){
				this.saveaddressisshow=true
				this.xiaoshouformValidate.addressName=''//联系人
				this.xiaoshouformValidate.addressPhone=''//联系电话
				this.xiaoshouformValidate.addressMobile=''//联系电话
				this.xiaoshouformValidate.addressProvince=''//省
				this.addressCity=''//市
				this.addressCountry=''//区
				this.xiaoshouformValidate.addressAddress=''//详细地址
				this.selectedOptions3=[]
				this.isdefault=false//详细地址
			},
			//常用地址省市区
			handleChange1(arr){
				this.xiaoshouformValidate.addressProvince = this.CodeToText[arr[0]]
				this.addressCity =this.CodeToText[arr[1]]
				this.addressCountry = this.CodeToText[arr[2]]
			},
			//保存是点击默认地址选中
			changeisdefault(v){
				this.isdefault=v
			},
			//保存地址
			saveAddRess(name){
				if(this.id==''){
				this.$notify({
						title:"",//
						message: this.$t('public.scrm'),
						type: 'error',
						position: 'bottom-right'
					});
				}else{
					this.$refs[name].validate((valid) => {
						if(valid){
							this.axios.post('mcrmaddress/add?uid='+this.uid,{
								crmId:this.indexId,
								name:this.xiaoshouformValidate.addressName,//联系人
								phone:this.xiaoshouformValidate.addressPhone,//联系电话
								mobile:this.xiaoshouformValidate.addressMobile,//联系手机
								province:this.xiaoshouformValidate.addressProvince,//省
								city:this.addressCity,//市
								county:this.addressCountry ,//区
								address:this.xiaoshouformValidate.addressAddress,//详细地址
								default:this.isdefault//是否设置为默认地址
							}).then(res=>{
								if(res.data.status==200){
									this.$notify({
									title:"",//
									message: this.$t('public.SaveSuccess'),//'修改地址成功',
									type: 'success',
									position: 'bottom-right'
								});
									this.getAllAddress(this.indexId)
									this.xiaoshouformValidate.addressName=''//联系人
									this.xiaoshouformValidate.addressPhone=''//联系电话
									this.xiaoshouformValidate.addressMobile=''//联系电话
									this.xiaoshouformValidate.addressProvince=''//省
									this.addressCity=''//市
									this.addressCountry=''//区
									this.xiaoshouformValidate.addressAddress=''//详细地址
									this.selectedOptions3=[]
									this.isdefault=false//详细地址
									this.saveaddressisshow=false
								}else{

								this.$notify({
									title:"",//
									message:res.data.errorMessage,
									type: 'error',
									position: 'bottom-right'
								});
								}
							})
						}
					})
				
				}

			},
			//点击修改获取id详情
			editAddressBtn(id){
				this.axios.get('mcrmaddress/get/'+id+'?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					console.log(res.data.rows)
					let data=res.data.rows
					this.addressId=id
					this.xiaoshouformValidate.addressName=data.name
					this.xiaoshouformValidate.addressPhone=data.phone
					this.xiaoshouformValidate.addressMobile=data.mobile
					this.xiaoshouformValidate.addressProvince=data.province
					this.addressCity=data.city
					this.addressCountry=data.county
					this.xiaoshouformValidate.addressAddress=data.address
					this.isdefault=data.default
					// //接收地址
					if(res.data.rows.province==null || res.data.rows.city==null || res.data.rows.county==null){
						this.selectedOptions2=[]
					}else if(data.province==''|| data.city=='' || data.county==''){
						this.selectedOptions3=[]
					}else{
						//转为code
						console.log(this.selectedOptions3)
						this.xiaoshouformValidate.addressProvince=res.data.rows.province
						this.addressCity=res.data.rows.city
						this.addressCountry=res.data.rows.county
						this.selectedOptions3=[this.TextToCode[this.xiaoshouformValidate.addressProvince].code,this.TextToCode[this.xiaoshouformValidate.addressProvince][this.addressCity].code,this.TextToCode[this.xiaoshouformValidate.addressProvince][this.addressCity][this.addressCountry].code]

					}

				}
				})

				this.addressisshow=true

			},
			//删除地址paddress/delete/23
			deleteAddressBtn(id){
				this.axios.delete('mcrmaddress/delete/'+id+'?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.getAllAddress(this.indexId )
					this.$notify({
					title:"",//
						message:this.$t('public.deleteSuccess') ,//'删除地址成功',
						type: 'success',
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
			},
			//执行修改POST /crmaddress/add 新增
			editAddress(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						this.axios.put('mcrmaddress/update?uid='+this.uid,{
								id:this.addressId,
								name:this.xiaoshouformValidate.addressName,//联系人
								phone:this.xiaoshouformValidate.addressPhone,//联系电话
								mobile:this.xiaoshouformValidate.addressMobile,//联系电话
								province:this.xiaoshouformValidate.addressProvince,//省
								default:this.isdefault,
								county:this.addressCountry,
								city:this.addressCity,//市

								address:this.xiaoshouformValidate.addressAddress,//详细地址
							}).then(res=>{
							if(res.data.status==200){
								this.$notify({
									title:"",//
									message: this.$t('public.editSuccess'),//'修改地址成功',
									type: 'success',
									position: 'bottom-right'
								});
								this.getAllAddress(this.indexId)
								this.addressisshow=false
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
			//取消修改地址
			cancelAddress(){
				this.addressisshow=false
				this.saveaddressisshow=false
			},
			//默认地址选中
			defaultAddress(id){
				this.addressId=id
				this.axios.get('mcrmaddress/default/'+id+'?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.getAllAddress(this.indexId)//设置默认地址后刷新地址列表
				}
				})

			},
			//获取地址列表
			getAllAddress(id){
				this.axios.get('mcrmaddress/query/'+id+'?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					//console.log(res.data.rows)
					this.AllAddress=res.data.rows
				}
				})
			},
			//充值
			addcz(){
				if(this.indexId==''){
					this.$notify({
                        title:"",//
                        message:'请选择会员！',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.active=1
					this.alertch=true
					this.one=true
					this.two=false
					this.three=false
					this.numIndexC=-1
				}
			},
			//收款的取消
			skCancel(){
				this.alertch=false
				this.payPrice=0
				this.zfbmoney=0
				this.crmmoney=0
				this.skmoney=0
				this.xjmoney=0
				this.xxmoney=0
				 this.Allp=0
				this.othermoney=0
				this.numIndexC=-1
			},
			//返回
			twocancel(){
				this.two=false
				this.one=true
				this.active=1
				this.three=false
			},
			//点击收款第一步
			oneStep(){
				
				var test=/^\d{1,14}(\.\d{1,2})?$///验证输入只能时数字且小数点后两位
				this.payPrice=Number(this.zfbmoney)+Number(this.xjmoney)+Number(this.skmoney)+Number(this.othermoney)+Number(this.xxmoney)

				if(this.zfbmoney==0  && this.xjmoney==0 && this.skmoney==0 && this.othermoney==0  && this.xxmoney==0 ){
					this.$notify({
	                    title:"",//
	                    message: '请输入金额！',
	                    type: 'error',
	                    position: 'bottom-right'
	                });
				}else if(!test.test(this.zfbmoney) || !test.test(this.xjmoney) || !test.test(this.skmoney) || !test.test(this.othermoney) ||!test.test(this.xxmoney)){
					this.$notify({
	                    title:"",//
	                    message: '金额出错！',
	                    type: 'error',
	                    position: 'bottom-right'
	                });
					
				}else if(this.numIndex!=-1&&this.payPrice<this.itemhd.charge){
					this.$notify({
		                  title:"",//
		                  message:'充值金额与参与活动金额不符！',
		                  type: 'error',
		                  position: 'bottom-right'
		                });
				}else{
					//总金额
					this.active=2
					this.one=false
					this.two=true
					this.nowTime=+new Date()//充值时间戳
				}
			},
			 //第二步收款完成POST POST /recharge/add 新增充值
      twoStep(){//1聚合支付// 9现金支 ,//11;刷卡支付 ;//25其他支付 ;//5 BISHOP储值卡支付 //18线下付款 //15 DOCU
        
          if(this.zfbmoney!=0){
            this.payType=1//1聚合支付
          }else if(this.xjmoney!=0){
            this.payType=9// 9现金支
          }else if(this.skmoney!=0){
            this.payType=11//11;刷卡支付
          }else if(this.othermoney!=0){
            this.payType=25//其他支付
          }else if(this.xxmoney!=0){
            this.payType=18//线下付款
          }
          if(this.payType==1&&this.fkmcode==''){
              this.$notify({
                    title:"",//
                    message: '请输入付款码！',
                    type: 'error',
                    position: 'bottom-right'
                  });
          }else{//POST /mrecharge/add 新增充值
              this.axios.post('/mrecharge/add?uid='+this.uid,{
                  crmId:this.item.id,
                  crmCode:this.item.code,
                  amount:this.payPrice,
                  actId:this.itemhd.id,
                  actName:this.itemhd.name,
                  authCode:this.fkmcode,
                  payType:this.payType
                }).then(res=>{
                 if(res.data.status==200){
                        if(this.payType!=1){
                          this.active=3
                          this.two=false
                          this.three=true
                          this.fkmcode=''//付款码
                          this.payType=''
                          this.payPrice=0
                          this.itemhd={}
                          this.item={}
                          this.getMentList()//所有会员
                          this.getcginfo(this.indexId,this.numIndex,this.item)
                        }else{
                            this.orderNumber=res.data.rows.payNo
                          //订单轮询页面
                            this.time=setInterval((res)=>{
                              this.lunxun(this.orderNumber)
                            },2000)//2秒调一次轮询
                        }
                  }else{
                  	this.$notify({
                        title:"",//
                        message:res.data.errorMessage,
                        type: 'error',
                        position: 'bottom-right'
                    });
                  }
            })
          }
      },
      //轮询结果GET /recharge/searchby/{ordreNo} 订单支付结果轮询
      lunxun(num){
        this.axios.get('/mrecharge/searchby/'+num+'?uid='+this.uid).then(res=>{
          if(res.data.status==200){
            this.$notify({
                title:"",//
                message: '收款成功',
                type: 'success',
                position: 'bottom-right'
            });
            this.active=3
            this.two=false
            this.three=true
            this.fkmcode=''//付款码
            this.payType=''
            this.payPrice=0
            this.Allp=0
            this.itemhd={}
            this.item={}
            clearInterval(this.time)
            this.getMentList()//所有会员
          }else{
          	//轮询超过5分钟自动关闭
            	this.nextTime=+new Date()
              if(this.nextTime-this.nowTime>500000){//1000*60*5
                clearInterval(this.time)
                this.active=1
                this.alertch=false
                this.one=true
                this.two=false
                this.three=false
                this.numIndexC=-1
            }
          }
        })
      },
			//继续收银
			goOn(){
				this.active=1
				this.three=false
				this.alertch=false
				this.payPrice=0
				this.zfbmoney=0
				this.crmmoney=0
				this.skmoney=0
				this.xjmoney=0
				this.xxmoney=0
				 this.Allp=0
				this.othermoney=0
				this.numIndexC=-1
			},
			//支付宝或微信支付输入
		      moneychangezfb(e){
		        this.zfbmoney=Number(e.target.value)
		        this.Allp=this.zfbmoney
		      },
		     
		      //刷卡支付输入
		      moneychangesk(e){
		        this.skmoney=Number(e.target.value)
		        this.Allp=this.skmoney
		      },
		      //现金支付输入
		      moneychangexj(e){
		        this.xjmoney=Number(e.target.value)
		        this.Allp=this.xjmoney
		      },
		      //线下支付输入
		      moneychangexx(e){
		        this.xxmoney=Number(e.target.value)
		        this.Allp=this.xxmoney
		      },
		      //其他支付输入
		      othermoney1(e){
		        this.othermoney=Number(e.target.value)
		        this.Allp=this.othermoney
		      },
			//支付宝获取焦点
		      zfbfocus(){
		      	if(this.numIndexC!=-1){
		      		this.Allp=this.zfbmoney=this.itemhd.charge
		      	}else{
		      		
			        this.Allp=0
		      	}
		        this.skmoney=0////刷卡
		        this.xjmoney=0//现金
		        this.othermoney=0//其他
		        this.xxmoney=0//其他
		      },
		      // //刷卡
		      skfocus(){
		        this.zfbmoney=0//支付宝//微信
		        this.xjmoney=0//现金
		        this.othermoney=0//其他
		        this.xxmoney=0//其他
		        this.Allp=0
		      },
		      xjfocus(){
		        this.zfbmoney=0//支付宝//微信
		        
		        this.skmoney=0////刷卡
		        // this.xjmoney=0//现金
		        this.othermoney=0//其他
		        this.xxmoney=0//其他
		        
		        this.Allp=0
		      },
		      //线下
		      xxfocus(){
		        this.zfbmoney=0//支付宝//微信
		        
		        this.skmoney=0////刷卡
		        this.xjmoney=0//现金
		        this.othermoney=0//其他
		       
		        this.Allp=0
		      },

		      otherfocus(){
		        this.zfbmoney=0//支付宝//微信
		        this.skmoney=0////刷卡
		        this.xjmoney=0//现金
		        // this.othermoney=0//其他
		        this.xxmoney=0//其他
		        this.Allp=0
		      },
		         //获取充值活动
	      getHd(){
	        this.axios.get('rechargea/query?uid='+this.uid).then(res=>{
	          if(res.data.status==200){
	            this.HdData=res.data.rows
	            this.hdtotal=res.data.total
	            this.hdpagesize=res.data.pageSize
	          }
	        })
	      },
	      //单击活动
	      clickLi(item,index){
	        this.numIndexC=index
          	this.itemhd=item
          	this.Allp=this.zfbmoney=item.charge//选择活动默认支付宝微信
           	this.skmoney=0////刷卡
          	this.xjmoney=0//现金
          	this.othermoney=0//其他
          	this.xxmoney=0//其他
	       
	      },
	      //取消选中
	      clickcancel(){
	        this.numIndexC=-1
	        this.itemhd={}
	      },
	      hdgetData(current){
	      	this.axios.get('rechargea/query?offset='+current+'&uid='+this.uid).then(res=>{
	          if(res.data.status==200){
	            this.HdData=res.data.rows
	            this.hdtotal=res.data.total
	            this.hdpagesize=res.data.pageSize
	          }
	        })
	      },
	      hdchangePageSize(size){
	      	this.hdpagesize=size
	      },
			//店铺弹框
			clickstore(){
				this.storeisshow=true
				this.axios.get('store/query?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.storeData=res.data.rows
						this.storetotal=res.data.total
						this.storepageSize=res.data.pageSize
					}
				})
			},
			//搜索店铺
			clicksearchstore(){
				this.axios.get('store/query?keyword='+this.storeKeyword+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.storeData=res.data.rows
						this.storetotal=res.data.total
						this.storepageSize=res.data.pageSize
					}
				})
			},
			cardEnterstore(){
				this.clicksearchstore()
			},
			//单击店铺一行
			crmrowstore(data,index){
				this.storeObj=data

			},
			storegetData(current){
				this.axios.get('store/query?offset='+current+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.storeData=res.data.rows
						this.storetotal=res.data.total
						this.storepageSize=res.data.pageSize
					}
				})
			},
			storechangePageSize(size){
				this.storepageSize=size
			},
			cancelStore1(){
				this.storeisshow=false
			},
			//店铺确认
			sureStore(){
				this.storeID=this.storeObj.id
				this.formValidate.store=this.storeObj.name
				this.storeisshow=false
			},
			//点击新增
			add(){
				this.addoredit='新增会员'
				this.addText = true
				this.xiugai=false
				this.leftphoto=true
				this.$refs.detail.style.display='none'
				this.code=''
				this.formValidate.crmCardName=''
				this.crmCardId=''
				this.photo='',//会员头像
				this.formValidate.name=''//会员名
				this.formValidate.mobile='' //手机号
				this.crmDetail.name=""
				this.employeeId=''
				this.address=''//地址
				this.chargeMoney=0
				this.storeName=''
				this.storeId=''
				this.gender='1'
				this.dqjf=0
				this.formValidate.loginPs=''
				this.remark=''
				this.province=''//省
				this.city=''//市
				this.district=''//区
				this.selectedOptions2=[]
				this.formValidate.discount='1'
				this.addressDetail=''//详细地址
				this.formValidate.store='' //
				this.storeID=''
				this.birthday=new Date(new Date().getFullYear()-18,0,0)
				this.employeeName= this.user.name
				this.employeeId = this.user.id
				this.getCardList()

			},
			//点击新增取消
			addCancel(){
				this.add()
			},
			//会员卡清单
	        getCardList(){
	            this.axios.get('mcrmlevel/query?uid='+this.uid).then((res)=>{
	                console.log(res)
	                if(res.data.status==200){
	                    this.crmCardData=res.data.rows
	                    this.cardpageSize=res.data.pageSize
	                    this.cardtotal=res.data.total
	                    this.crmCardData.forEach(x=>{
	                    	if(x.defaultValue){
	                    		x.defaultValueDesc="是"
	                    		this.formValidate.crmCardName= x.name
								this.crmCardId = x.id
	                    	}else{
	                    		x.defaultValueDesc="否"
	                    	}
	                    })
	                }
	            })
	        },
	        //点击选卡
	        crmCard(){

	        	this.crmCardisshow = true
	        	this.getCardList()
	        },
			//新建点击完成
			saveCgInfo(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						this.axios.post('/mcrm/add?uid='+this.uid,{
						code:this.code,
						level:this.formValidate.crmCardName,
						levelId:this.crmCardId,
						photo:this.photo,
						name:this.formValidate.name,//会员名
						mobile:this.formValidate.mobile,//手机号
						// storeName:this.formValidate.store,//店铺
						// storeId:this.storeID,//店铺ID
						employeeId:this.employeeId,
						employeeName:this.employeeName,
						address:this.address,//地址
						dqjf:this.dqjf,
						chargeMoney:this.chargeMoney,
						gender:this.gender,
						loginPs:this.formValidate.loginPs,
						birthday:this.birthday,
						endDate:this.formValidate.endDate,
						remark:this.remark,

					}).then((res)=>{
						console.log(res)
						if(res.data.status==200){

							this.$notify({
						        title:"",//
						        message: '新建会员成功',
						        type: 'success',
						        position: 'bottom-right'
					        });
					        this.employeeName= this.user.name//默认当前登录者为导购名称
							this.employeeId = this.user.id//默认当前登录者为Id
							this.code=''
							this.formValidate.crmCardName=''
							this.crmCardId=''
							this.photo='',//会员头像
							this.formValidate.name=''//会员名
							this.formValidate.mobile='' //手机号
							this.formValidate.store='' //
							this.storeID=''
							this.email=''
							
							this.address=''//地址
							this.storeName=''
							this.storeId=''
							this.gender='1'
							this.qq=''
							this.formValidate.loginPs=''
							this.dqjf=0
							this.chargeMoney=0
							this.selectedOptions2=[]
							
							this.getMentListSA()
							this.getCardList()
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
			//取消修改
			editCancel(){
				this.code=''
				this.formValidate.crmCardName=''
				this.crmCardId=''
				this.photo='http://dev.zsydian.com/img/d/yh.png',//会员头像
				this.formValidate.name=''//会员名
				this.formValidate.mobile='' //手机号
				this.email=''
				this.address=''//地址
				this.storeName=''
				this.storeId=''
				this.gender='1'
				this.qq=''
				this.formValidate.loginPs=''
				this.dqjf=0
				this.chargeMoney=0
				this.addText = false
				this.xiugai=false
				this.editshow=true
				this.leftphoto=false
				this.$refs.detail.style='block'
				this.selectedOptions2=[]

				this.formValidate.endDate=''
				this.formValidate.discount='10'
				this.formValidate.store='' //
				this.storeID=''
				this.employeeName= this.user.name
				this.employeeId = this.user.id
			},
			//点击修改
			edit(){
				this.$refs.detail.style.display='none'
				this.editshow=false
				this.xiugai=true
				this.leftphoto=true
				this.addoredit='修改会员'
				this.getCrmDetail(this.indexId)
			},
			//保存修改
			saveEdit(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						this.axios.put('mcrm/update?uid='+this.uid,{
							id:this.indexId,
							code:this.code,
							level:this.formValidate.crmCardName,
							levelId:this.crmCardId,
							photo:this.photo,
							name:this.formValidate.name,//会员名
							mobile:this.formValidate.mobile,//手机号
							employeeId:this.employeeId,
							employeeName:this.employeeName,
							address:this.address,//地址
							dqjf:this.dqjf,
							chargeMoney:this.chargeMoney,
							gender:this.gender,
							birthday:this.birthday,
							endDate:this.formValidate.endDate,
							// storeName:this.formValidate.store,
							// storeId:this.storeID
					}).then(res=>{
						if(res.data.status==200){
							this.$notify({
						        title:"",//
						        message: this.$t('public.editSuccess'),//
						        type: 'success',
						        position: 'bottom-right'
					        });
							this.code=''
							this.formValidate.crmCardName=''
							this.crmCardId=''
							this.photo='',//会员头像
							this.name=''//会员名
							this.formValidate.mobile='' //手机号
							this.formValidate.store='' //
							this.storeID=''
							this.email=''
							this.birthday=new Date(new Date().getFullYear()-18,0,0)
							this.address=''//地址
							this.storeName=''
							
							this.storeId=''
							this.gender='1'
							this.formValidate.endDate=''
							this.qq=''
							this.formValidate.loginPs=''
							this.dqjf=0
							this.chargeMoney=0
							this.addText = false
							this.xiugai=false
							this.editshow=true
							this.leftphoto=false
							this.$refs.detail.style='block'
							this.selectedOptions2=[]
							this.employeeName= this.user.name
							this.employeeId = this.user.id
							this.getMentListS()
							this.getCardList()
						}
					})
					}
				})
			},
			//点击差号
			cancelHome(){
				this.$router.push({
					path:"/storecrm",
					query:{
						index:1
					}
				})
			},
			//单击左侧列表
			getcginfo(id,index,item){
				this.item=item
            	this.crmid=item.id

				this.numIndex = index
				this.indexId = id
				this.addText = false
				this.xiugai=false
				this.editshow=true
				this.leftphoto=false
				this.addoredit='会员详情'
				this.$refs.detail.style.display='block'
				this.getCrmDetail(id)
				this.getOrder()//会员订单
				this.getAllAddress(id)//会员地址
				console.log(this.indexId)
			},
			//获取会员详情
			getCrmDetail(id){
				this.axios.get('mcrm/get/'+id+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						console.log(res.data.rows)
						this.crmDetail=res.data.rows
						this.code=res.data.rows.code
						this.formValidate.crmCardName=res.data.rows.level
						this.crmCardId=res.data.rows.levelId
						this.photo=res.data.rows.photo
						this.formValidate.name=res.data.rows.name//会员名
						this.formValidate.mobile=res.data.rows.mobile //手机号
				
						if(res.data.rows.birthday=="" || res.data.rows.birthday==undefined){
							this.birthday=""
						}else{
							this.birthday=this.getLocalTime(res.data.rows.birthday)
							
						}
						this.address=res.data.rows.address//地址
						this.employeeName= res.data.rows.employeeName//导购
						this.employeeId = res.data.rows.employeeId//导购
						this.storeName=res.data.rows.storeName
						this.storeId=res.data.rows.storeId
						this.gender=res.data.rows.gender
						this.chargeMoney=res.data.rows.chargeMoney
						this.dqjf=res.data.rows.dqjf
						this.formValidate.endDate=res.data.rows.endDate
						this.remark=res.data.rows.remark
						this.formValidate.store=res.data.rows.storeName//店铺
						this.storeID=res.data.storeId
						this.formValidate.discount=String(res.data.rows.discount)
						this.crmDetail.createTime=new Date(this.crmDetail.createTime).toLocaleDateString().replace(/\//g,'-')
					}
				})
			},
			 //下拉框选择
			orderselected(value){
				this.valueT = value
				this.getMentList(this.valueT)
			},
			//下拉加载更多
            handleReachEdge(){
				this.current++//默认10条
    	 		this.axios.get('mcrm/list?offset='+this.current+'&uid='+this.uid+'&status='+this.valueT).then((res)=>{
	 				 if(this.current>Math.ceil(this.totalcl/this.pageSizecl)){
                            this.current=Math.ceil(this.totalcl/this.pageSizecl)
                        }
			 			res.data.rows.forEach((item)=>{

			 			this.Allcrm.push(item)
			 			this.Allcrm.forEach((x,index)=>{

							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
			 		})

			 	})

            },
            //选择生日
            changeBirthday(date){
            	this.birthday = this.getLocalTime(date)
            },
            //选择性别
            selsectedSex(label){
            	this.gender = label
            	console.log(this.gender)
            },
            //取消确认
            cancelStore(){
            	
            	this.storeisshow=false
            },
            //单击员工列表一行
			ckrow(data,index){
				this.ygObj=data
				console.log(this.ygObj)
			},
			//双击
			dblclickrow(){
				this.surelyg()
			},
			//导购员工取消
			cancelyg(){
				this.ygisshow=false
			},
			//导购员工确认
			surelyg(){
				this.employeeName= this.ygObj.name
				this.employeeId = this.ygObj.id
				this.ygisshow=false
			},
            //获取员工导购
            selecteStore(){
            	this.ygisshow=true
            	this.axios.get('setting/dqmddg?uid='+this.uid).then((res)=>{
            		if(res.data.status==200){
            			this.allStore = res.data.rows
            			this.ygtotal=res.data.total
						this.ygpageSize=res.data.pageSize
						this.allStore.forEach((x)=>{
			               	x.createTime = new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
			               	if(x.birthday==null){
			               		x.birthday='未知'
			               	}else{
			               		x.birthday = new Date(x.birthday).toLocaleDateString().replace(/\//g,'-')
			               	}
			               	if(x.gender=='1'){
			               		x.genderDes='男'
			               	}else if(x.gender=='0'){
			               		x.genderDes='女'
			               	}else{
			               		x.genderDes='未知'
			               	}

		               })
            		}
            	})
            },
            //双击一行
            dblcrmrow(data){
            	this.sureCrmCard()
            },
            //会员卡确认
            sureCrmCard(){
            	this.formValidate.crmCardName= this.crmObj.name
				this.crmCardId = this.crmObj.id
				this.crmCardisshow=false
            },
            //取消
            cancelCrmCard(){
            	this.formValidate.crmCardName=''
            	this.crmCardId=''
            	this.crmCardisshow=false
            },
            //单击会员卡列表一行
			crmrow(data,index){
				this.crmObj=data
				console.log(data)
			},
             //选择省市县之后的回调函数
           //省市区
			handleChange(arr){
				this.province = this.CodeToText[arr[0]]
				this.city =this.CodeToText[arr[1]]
				this.district = this.CodeToText[arr[2]]
				console.log(this.selectedOptions2)

			},
			//上传前
            beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isPng = file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isJPG && !isPng) {
			          this.$notify({
				        title: "",//'失败',
				        message:this.$t('public.upJpngOrPng'),
				        type: 'error',
				        position: 'bottom-right'
			        });
		        }
		        if (!isLt2M) {
			         this.$notify({
				        title: "",//'失败',
				        message:this.$t('public.upJpngTwoM'),
				        type: 'error',
				        position: 'bottom-right'
			        });
		        }
		        return isJPG || isPng && isLt2M;
		      },
            //上传图片成功
            addsucess(res,file){
                this.photo=res.rows.url
            },
            del(){
            	this.$Modal.confirm({
                    title: '删除会员',
                    content: '<p>确定要删除吗?</p>',
                    onOk: () => {
                        this.axios.delete('crm/delete/'+this.indexId+'?uid='+this.uid).then((res)=>{
		            		if(res.data.status==200){
		            			this.$notify({
							       title:"",
							        message: this.$t('public.deleteSuccess'),
							        type: 'success',
							        position: 'bottom-right'
						        });
		            			this.getMentList()
		            		}else{
		            			this.$notify({
							        title:"",
							        message: res.data.errorMessage,
							        type: 'error',
							        position: 'bottom-right'
						        });
		            		}
		            	})
                    },
                });
            },
             stop(){
            	if(this.indexId){
             		this.axios.post('crm/disabled/'+this.indexId+'?uid='+this.uid).then((res)=>{
            		if(res.data.status==200){
            			this.$notify({
					        title:"",//
					        message:  '停用成功',
					        type: 'success',
					        position: 'bottom-right'
				        });
            			this.getMentList()
            			
            		}else{

            			this.$notify({
					        title:"",//
					        message:  res.data.errorMessage,
					        type: 'error',
					        position: 'bottom-right'
				        });
            		}
            	})
             	}
            },
             start(){
             	if(this.indexId){
             		this.axios.post('crm/enabled/'+this.indexId+'?uid='+this.uid).then((res)=>{
            		if(res.data.status==200){

            			this.$notify({
					        title:"",//
					        message:  '启用成功',
					        type: 'success',
					        position: 'bottom-right'
				        });
            			this.getMentList()

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
            //点击了订单
            getOrder(){
            	this.axios.get('orderon/crmOrder/'+this.indexId+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.orderdataList = res.data.rows
						this.total=res.data.total;
						this.pageSize = res.data.pageSize
						console.log(res.data.rows)
					}
				})
            },
            //选择失效时间
            changeEndDate(d){
            	console.log(d)
            	this.endDate=d
            },
            //添加下边框
			addborder(index){
				this.num2 = index
				//index为1点击了订单orderdataList
				if(index==0){
					this.getOrder()
				}
				//点击积分
				if(index==1){
					this.axios.get('mcrm/integral/'+this.indexId+'?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.jfdataList=res.data.rows
							this.jftotal = res.data.total
							this.jfpageSize =res.data.pageSize
						}
					})
				}
				//点击充值历史
				if(index==2){
					this.axios.get('mcrm/recharge/'+this.indexId+'?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.czdataList=res.data.rows
							this.cztotal=res.data.total
							this.czpageSize=res.data.pageSize
							this.czdataList.forEach(x=>{
								x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							})
						}

					})
				}
				//点击地址
				if(index==3){
					this.getAllAddress(this.indexId)
				}
			},
			//消费翻页
     //        xfgetData(current){
     //            this.axios.get('mcrm/pay?offset='+current+'&uid='+this.uid).then((res)=>{
     //                //console.log(res)
     //                this.xfdataList = res.data.rows
     //               	this.xftotal=res.data.total
					// this.xfpageSize=res.data.pageSize
     //                this.xfdataList.forEach((x,index)=>{

					// 		x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
					// 	})
     //            })
     //        },
     //        //翻页
     //        xfchangePageSize(size){
     //            this.xfpageSize = size
     //        },
			//充值翻页
            czgetData(current){
                this.axios.get('mcrm/recharge/'+this.indexId+'?offset='+current+'&uid='+this.uid).then((res)=>{
                    //console.log(res)
                    this.czdataList = res.data.rows
                    this.cztotal=res.data.total
					this.czpageSize=res.data.pageSize
                    this.czdataList.forEach((x,index)=>{

							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
                })
            },
            //翻页
            czchangePageSize(size){
                this.czpageSize = size
            },
			//订单翻页
			 //切换一条页
            getData(current){
                this.axios.get('orderon/crmOrder/'+this.indexId+'?offset='+current+'&uid='+this.uid).then((res)=>{
                    //console.log(res)
                    this.orderdataList = res.data.rows
                    this.total=res.data.total;
					this.pageSize = res.data.pageSize
                    this.orderdataList.forEach((x,index)=>{

							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
            },
            //积分翻页
             //切换一条页
            jfgetData(current){
                this.axios.get('mcrm/integral/'+this.indexId+'?offset='+current+'&uid='+this.uid).then((res)=>{
                    //console.log(res)
                    this.jfdataList = res.data.rows
                    this.jftotal = res.data.total
					this.jfpageSize =res.data.pageSize
                    this.jfdataList.forEach((x,index)=>{

							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
                })
            },
            //翻页
            jfchangePageSize(size){
                this.jfpageSize = size
            },
			//获取所有会员
	        getMentList(){
	            this.axios.get('mcrm/list?uid='+this.uid).then((res)=>{
	                if(res.data.status==200){
	                	this.Allcrm = res.data.rows
	                	this.totalcl=res.data.total
	                	this.pageSizecl=res.data.pageSize
	                	console.log(this.Allcrm)
	                }
	               this.Allcrm.forEach((x)=>{

	               	x.createTime = new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
	               })
	            })
	        },//
	        getMentListSA(){
	            this.axios.get('mcrm/list?uid='+this.uid).then((res)=>{
	                if(res.data.status==200){
	                	this.Allcrm = res.data.rows
	                	this.totalcl=res.data.total
	                	this.pageSizecl=res.data.pageSize
	                	console.log(this.Allcrm)
	                	this.Allcrm.forEach((x)=>{

		               	x.createTime = new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
		               })
	                	this.getcginfo(this.Allcrm[0].id,0,{})
	                }
	               
	            })
	        },
	         getMentListS(){
	            this.axios.get('mcrm/list?uid='+this.uid).then((res)=>{
	                if(res.data.status==200){
	                	this.Allcrm = res.data.rows
	                	this.totalcl=res.data.total
	                	this.pageSizecl=res.data.pageSize
	                	this.Allcrm.forEach((x)=>{

			               	x.createTime = new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
			               })
	                	this.getcginfo(this.indexId,this.numIndex,{})
	                }
	               
	            })
	        },
	        
	        getygData(current){
	        	 this.axios.get('employee/list?offset='+current+'&uid='+this.uid).then((res)=>{
	        	 		this.allStore = res.data.rows
						this.ygtotal=res.data.total
						this.ygpageSize=res.data.pageSize
	        	 })
	        },
	        changeygPageSize(size){
	        	this.ygpageSize=size
	        },
	        //搜索导购会员
	        searchYG(){
	        	this.axios.get('employee/list?keyword='+this.ygkeyword+'&uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						this.allStore = res.data.rows
						this.ygtotal=res.data.total
						this.ygpageSize=res.data.pageSize
					}
				})
	        },
	        entersearchYG(){
	        	this.searchYG()
	        },
	        //回车搜索会员卡
	        cardEnter(){
	        	this.clicksearch()
	        },
	        //会员卡关键字搜索
	        clicksearch(){
	            this.axios.get('mcrmlevel/query?keyword='+this.cardKeyword+'&uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						this.crmCardData = res.data.rows
						this.cardtotal=res.data.total
						this.cardpageSize=res.data.pageSize
						this.crmCardData.forEach(x=>{
	                    	if(x.default){
	                    		x.defaultValueDesc="是"
	                    		this.formValidate.crmCardName= x.name
								this.crmCardId = x.id
	                    	}else{
	                    		x.defaultValueDesc="否"
	                    	}
	                    })
					}
				})
	        },
	        //会员卡翻页
	        cardgetData(current){
	        	 this.axios.get('mcrmlevel/query?offset='+current+'&uid='+this.uid).then((res)=>{
                  	this.crmCardData = res.data.rows
					this.cardtotal=res.data.total
					this.cardpageSize=res.data.pageSize
					this.crmCardData.forEach(x=>{
	                    	if(x.default){
	                    		x.defaultValueDesc="是"
	                    		this.formValidate.crmCardName= x.name
								this.crmCardId = x.id
	                    	}else{
	                    		x.defaultValueDesc="否"
	                    	}
	                    })
                })
	        },
	        cardchangePageSize(size){
	        	this.cardpageSize=size
	        },
	        //搜索
            searchdd(){
                this.axios.get('/mcrm/query?keyword='+this.searchKeyword+'&uid=' + this.uid).then((res) => {
                   if(res.data.status==200){
	                	this.Allcrm = res.data.rows
	                	this.totalcl=res.data.total
	                	this.pageSizecl=res.data.pageSize
	                	this.Allcrm.forEach((x)=>{
		               		x.createTime = new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
		               })
	                }

                })
            },

            //回车搜索
            enterSearchdd(){
                this.searchdd()
            },
		},
		created(){
			this.$nextTick(()=>{

				this.getMentList()
			})
		},
		mounted(){
			//默认导购
			console.log(this.user)
			this.employeeName= this.user.name//默认当前登录者为导购名称
			this.employeeId = this.user.id//默认当前登录者为Id
			this.getCardList()
			if(this.$route.query.id){
				this.indexId = this.$route.query.id
				this.numIndex = this.$route.query.index
				this.valueT = this.$route.query.s
				this.item=this.$route.query.item
				this.getcginfo(this.indexId,this.numIndex,this.$route.query.item)
				this.employeeName= this.user.name
				this.employeeId = this.user.id
			}
			this.height = document.documentElement.clientHeight
			window.onresize=function(){
				this.height = document.documentElement.clientHeight
			}
		}
	}
</script>
<style type="text/css" scoped>
.lanrenLeft{
	position: absolute;
    text-align: center;
    top: 0px;
    right: 0px;
    width: 0;
    height: 0;
    border-top:40px solid #d53c39;
    border-left:40px solid transparent;
}
.lanrenLeft span{
width: 40px;
    height: 23px;
    color: #fff;
    display: block;
    position: relative;
    z-index: 9;
    top: -36px;
    right: 36px;
    font-size: 12px;
     font-weight: 100;
    transform: rotate(46deg);
}

.bg3{
 border-top: 40px solid #40ca98;
}
.bg4{
 border-top: 40px solid #d53C39;
}
.addCrm{
	width:100%;
	height:100%
}
.head{
	width:100%;
	  height:60px;
	  display: flex;
	  position: fixed;
	  z-index:10;
	  background: #fff;
	  border-bottom:1px solid #e4e4e4;

}
.tot{
    position:fixed;
    bottom:10px;
    left:15%;
    z-index:12;
}
.left-top{
	height: 60px;
	width:360px;
	flex:0 0 360px;
	line-height: 60px;

	display:flex;
	background: #fff;
	border-right:1px solid #eee;
	border-bottom:1px solid #eee;
	justify-content: space-between;
}
.right-top{
	height: 60px;
	line-height: 60px;
	display:flex;
	margin-left:360px;
	justify-content: space-between;

}
.colorGender1{
	color:#40ca98;
}
.colorGender0{
	color:#d53c39;
}
.wldw{
	margin-left:10px;
}
.left-img{
    margin-right: 10px;
width: 60px;
height: 60px;
border-radius: 50%;
overflow: hidden;
/* margin-bottom: -8px; */
display: block;

line-height: 80px;
text-align: center;
}
.top-left-btn{
background: #3B77E3;
margin-right: 10px;
color: #fff;
border: none;
width: 26px;
height: 26px;
border-radius: 26px;
display: inline-block;
position: relative;
top: 12px;
}
.top-left-btn1{
background: #FF7D16;
}
.top-left-btn:hover{
cursor:pointer;
}
.left-content {
	height:100%;
		width:360px;
    flex: 0 0 360px;
		margin-bottom:300px;
		z-index:9;
		border-right:1px solid #E6E6E6;
		position:fixed;
		background:#F9F9F9;
}
.con-list {
	display:flex;
	align-items: center;
	width: 100%;
	word-wrap:break-word;

	border-bottom: solid 1px #E6E6E6;
	padding: 0px 25px;

	cursor: pointer;
	position:relative;
}
.con-list:hover{
	cursor:pointer;
}
.con-list .date{
	position:absolute;
	right:10px;
	top:60px;
}
.con-list .status{
	width:100px;

	text-align: center;
	position: absolute;
    right: 0px;
    top: 47px;
}
.con-list .list-title {
	color: #0d0d0d;
	font-size: 14px;
	margin-bottom: 10px;
	margin-top: 20px;
}

  .lanren {
    position: absolute;
    text-align: center;
    top: -20px;
    right: -20px;
    width: 0;
    height: 0;
    border-top: 80px solid #d53c39;
    border-left: 80px solid transparent;
}
.lanren span{
    width: 60px;
    height: 60px;
    color: #fff;
    display: block;
    position: relative;
    z-index: 9;
    top: -70px;
    right: 70px;
    font-size: 16px;
    font-weight: 900;
    transform: rotate(46deg);
}
.bgd1{
	  border-top: 80px solid #40ca98;
}
.bgd2{
	  border-top: 80px solid #d53c39;
}
.con-list .txt {
	color: #585858;
	font-size: 12px;
}
.bg{
	background:#dbe5f1
}

.add-right {
	padding:0 20px;
	padding-top:10px;
	display:flex;
	background: #fff;
	height:100%;
	margin-left:360px;
	padding-top:20px;
}
.list-box{
	display: flex;
	height:35px;
	line-height: 35px;
	margin:25px 10px;
}
.list-box1{
		margin:4px 10px;
}
.list-box span{
	height:40px;
	width:120px;
	text-align: center;
	padding:0 10px;

}
.list-box input.ivu-input{
	height:40px!important;
}
.list-box1{
	margin-left:20px;
}
.list-box1 span{
	width:auto;
	text-align: left
}
.right-left{
	width: 230px;
    margin-top: 26px;
	border: 1px dashed #d9d9d9;
	height:180px;
	text-align: center;
}
.right-right{
	width:100%;
	height:100%;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
	/* background: url("http://img.zsydian.com/icon/goodsBg.png") no-repeat center;
	background-size: cover; */
  }
   .title{
    	display:flex;justify-content: space-between;margin-top:20px
    }
    .title:hover{
    	cursor:pointer;
    }
	.right-content{
		width: 100%;
		height:100%;
		/*	margin-bottom:100px;*/
	}
     .detail-top{
        margin-top:10px;
    }
.detail-top ul.cgtable1{
        margin-bottom: 20px
    }
    .detail-top ul li{
        display:inline-block;
        width:150px;
        /*border:1px solid red;*/
        margin:5px 10px;
    }
    .detail-top ul.cgtable li{
        color:#2B8F8F;
        margin:0px 10px;
        font-weight:600;
    }
	.detail-bottom{
		margin-bottom: 120px
	}
	.detail-title-mark{
		display:flex;
		justify-content: flex-start;
		border-bottom:1px solid #eee;
		margin-top:1px;
		margin-left: 10px;
	}
	.detail-title{
		padding:10px 40px;

	}
	.table{

	}
	.page-box{
		margin-top:4px;
		text-align: left;
	}
	.detail-public{
		width:100%;
		margin:10px;
	}
	.bor{
		border-bottom:2px solid #086CA2;
	}
	.addressDetail{
		display: inline-block;

		height: 34px;
		margin-left:28px;
		text-indent: 10px;
		color: #555;
		background-color: #fff;
		background-image: none;
		border: 1px solid #eee;

		-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
		-webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
		-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
		transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	}
.addRess{
      width:94%;
      height:100%;
      border:1px solid #f5f5f5;
    }
    .addRess-top{
      width:100%;
      height:50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      background: #F1F1F1
    }
     .addRess-top .addressTitle{
      font-weight:600;
      font-size:14px;
     }
     .addRess-top1{
      width:100%;
      padding:20px 0;

      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom:1px solid #f1f1f1;
    }
     .addRess-top1:last-child{
        margin-bottom:400px;

     }
     .addressbtn0{
      width:10%;
      text-align: center;
     border-left:1px solid #f1f1f1;
     }
    .addressbtn{
      width:10%;
      text-align: center;


     border-left:1px solid #f1f1f1;
    }
    .address-left{
      padding:0 10px;
      width:10%;
      text-align: center;
      border-right:1px solid #f1f1f1;

    }
.paydialog{
	width:100%;
	border-bottom:1px solid #E4E4E4;
	padding:10px 0;
	text-align: center;
	margin: 20px auto 0 auto;
}
.step{
	margin-left:25%;
}
.dialog-bottom{
	display:flex;
	justify-content:space-between;
	
}
.dialog-left{
	width:40%;
	display:flex;
	justify-content: flex-start;
	
	flex-direction: column;
	/*text-align: right;*/
	/*padding-bottom:30px;*/
}
  .czmian{
  	height:355px;overflow:auto;width:100%;background:#f5f5f5;
  	border-top:1px solid #e4e4e4;
  }
  .czmian::-webkit-scrollbar{
	width: 2px;
	height: 4px;
	background-color: #f5f5f5;
}
.czmian::-webkit-scrollbar-track{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	border-radius: 10px;
	background-color: #f5f5f5;
}
.czmian::-webkit-scrollbar-thumb{
	
	height: 2px;
	border-radius: 18px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #ccc;
}
.left-info li{
		display: flex;
		margin:10px 0;
	}
	.left-info div{
		width:200px;
		margin:5px 0;
		/*text-align: right*/
	}
	.left-info li .span{
	  width:90px;
	  text-align: right
	}
.left-infoli{
	margin:10px;
	font-size:16px;
}
.dialog-right{
	width:60%;
	display:flex;
	flex-wrap: wrap;
	border-left:1px solid #E4E4E4;
	/*padding-bottom:30px;*/
}
.dialog-right li{
	/*height:80px;*/
	width:50%;
	padding:5px 0;
	display:flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border-bottom:1px solid #E4E4E4;
	border-right:1px solid #E4E4E4;
	text-align: center
}
.dialog-right li:nth-child(2n){
	border-right:none;
}
.dialog-btn{
	display:flex;
	width:100%;
	padding:20px 0;
	justify-content: center;
	align-items: center
}
.payWay-dialog img{
	vertical-align: middle;
	margin-right:20px;
}
.payBtn{
	display:inline-block;
	width:80px;
	height:36px;
	line-height: 36px;
	text-align: center;
	font-size:18px;
	background-color: #13CE66;
	color:#fff;
	border-radius:4px;
}
.payBtn:hover{
	cursor:pointer;
}
.payBtn1{
	width:140px;
}
.dialog-btn1{
  width:100%;
  line-height: 60px;
    height: 60px;
}
.dialog-btn1 span{
  display: inline-block;
}
.dialog-btn1 div{
display: inline-block;
 
   width: 200px;
   float: right;
   margin-right:-30px;
   margin-top:20px;
}
li{
	list-style: none;
}
.page-box2{
	width:100%;
	text-align: center;
	margin-top:10px;
	justify-content: space-between;
	
}
 .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        /*border: 1px solid #eee;*/
    }
   .bottom-btn{
	width:100%;
	height:80px;
	/*border:1px solid red;*/
	margin-top:10px;
	background: #f8f8f8;
	line-height: 80px;
	margin-right:56px;
	margin-bottom:90px;
	text-align:right;

}
.cztitle{
  	width:100%;
  	text-align: center;
  	height:40px;
  	line-height: 40px;
  	font-size:16px;
  	
  	border-bottom:1px solid #e4e4e4;
  	background-color: #fff
  }
  .bgss{
    background:#dbe5f1
  }
 .list-box{
	display: flex;
	height:35px;
	line-height: 35px;
	margin:25px 10px;
}
.list-box1{
	margin:4px 10px;
}
.list-box2{
	margin:10px 0;
}
.list-box span{
	height:40px;
	width:120px;
	text-align: center;
	padding:0 10px;
	
}
.list-box input.ivu-input{
	height:40px!important;
}
.list-box1{
	margin-left:20px;
}
.list-box1 span{
	width:auto;
	text-align: left
}
.dialog-left1{
  width:40%;
 font-size: 16px;
}
.dialog-left1 li{
  display: flex;
  justify-content: center;
}
.page-box44{
	width: 100%;
    margin: 10px 0;
    text-align: center;
}
</style>
<style type="text/css">
 .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
 @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}

</style>
