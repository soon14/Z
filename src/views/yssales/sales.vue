<template>
	<div class='order'>
		<div v-show="isclick">
			<div class='head-bottom1'>
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >待处理</span>
						<h3 class="f-50 font-weight-100"><span class="top-num" @click="clickpTopNum(0)">{{pendingOrder}}</span></h3>
					</div>
				</li>
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >待审核</span>
						<h3 class="f-50 font-weight-100"><span class="top-num" @click="clickpTopNum(1)">{{auditOrder}}</span></h3>
					</div>
				</li>
				
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >待发货</span>
						<h3 class="f-50 font-weight-100"><span class="top-num" @click="clickpTopNum(2)">{{shipmentsOrder}}</span></h3>
					</div>
				</li>
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >发货中</span>
						<h3 class="f-50 font-weight-100"><span class="top-num" @click="clickpTopNum(3)">{{shipmentsInOrder}}</span></h3>
					</div>
				</li>
				<!-- <li class='head-bottom1-li'>
					<div class="car-body">
						<span >退货</span>
						<h3 class="f-50 font-weight-100"><span class="top-num" @click="clickpTopNum(4)">{{returnOrder}}</span></h3>
					</div>
				</li> -->
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >已完成</span>
						<h3 class="f-50 font-weight-100"><span class="top-num" @click="clickpTopNum(4)">{{accomplishOrder}}</span></h3>
					</div>
				</li>
			</div>
			<!--中间-->
			<div class='echarts' style='position:relative;'>
			   	<div id="myEcharts" style="width: 100%;margin:10px;border:1px solid #ccc;"></div>
				 
	        	<div id="myEchartsInv" style="width: 100%;margin:10px;border:1px solid #ccc;"></div>
	        	<div style='width:80px;position:absolute;left: 20px;;top:15px'>
	        		<Select v-model="model1" @on-change="orderselected">
					    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
	        	</div>
				<div v-if='len1==0'  style="position:absolute;left:25%;;top:25%">{{$t('public.NoData')}}</div>
	        	<div v-if='len==0'  style="position:absolute;left:75%;;top:25%">{{$t('public.NoData')}}</div>
			</div>
			<!--客户-->
			<div style="margin-bottom:120px">
				<ul class='ul-list'>
					<li  v-for="(item,index) in salesListC" :key="index" >
						<div class="car-list">
							<span >{{item.name}}</span>
						</div>
					</li>
				</ul>
				<!--销售订单-->
				<ul class='ul-list'>
					<li  v-for="(item,index) in salesListS" :key="index" @click="clicksalesListS(index)">
						<div class="car-list">
							<span >{{item.name}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div v-show="!isclick">
			<div  style="height:100%;overflow-y:auto">
				<div class="stepTop">
				    <ul class="list" v-if="numIndex!=3">
				    	<li v-for="(item,index) in steps" :key="index" :class="{backgroundStep:numIndex==item.id}">{{item.title}}</li>
				    	<Button type="ghost" size="large" style="margin-left:10px" @click="clickBackStep(0)" v-if="numIndex==0">返回</Button>
				    	<Button type="ghost" size="large" style="margin-left:10px" @click="clickBackStep(1)" v-if="numIndex==1">返回</Button>
				    	<Button type="ghost" size="large" style="margin-left:10px" @click="clickBackStep(2)" v-if="numIndex==2">返回</Button>
				    </ul>
				    <!--选客户选商品-->
				    <div class="contentC" v-if="numIndex==0">
				    	<Form ref="xiaoshousave" :model="xiaoshouformValidate" :rules="xiaoshouruleValidate">
				    		<FormItem prop="clientName" style="position:relative">
				    			<Input v-model="xiaoshouformValidate.clientName" placeholder="请输入选择客户" style="width:200px" @on-keyup="changeInputClient"></Input>
				    			<Button type="ghost" size="large" style="margin-left:10px" @click="searchClient">查询客户</Button>
				    			<div style="position:absolute;z-index:999;width:100%;top:35px">
                        			<Table v-if="alertchT" border highlight-row height="300" :columns="clientdataKey" :data="clientdata" 
											@on-row-click="clientrow2">
									</Table>
                        		</div>
	                   		</FormItem>
	                   		
	                   		<FormItem>
				    			<el-upload
								  	class="upload-demo"
								  	drag
								  	:action="actionUrl"
								  	:on-success='success'
								  	:on-remove="handleRemove"
                          			:before-upload="beforeAvatarUpload"
                          			
								  multiple>
								  <i class="el-icon-upload"></i>
								  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
								  <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
								</el-upload>
	                   		</FormItem>
	                   		<div class="bottom-save">
		                   		<Button type="ghost" size="large" style="margin-left:10px" @click="clickSaveC">保存</Button>	
		                   	</div>
				    	</Form>
				    </div>
				    <div class="Goods" v-if="numIndex==1">
				     	<div class="selectGoods">
				     		<Input v-model="goodsClientSku" style="width:50%;margin-left: 150px;" @on-enter="EntersearchClientSku">
						        <Select v-model="selectG" slot="prepend" style="width: 80px">
						            <Option value="goods">宝贝</Option>
						        </Select>
						    </Input>
						      <Button type="ghost" size="large" style="color:#fff;background:#ff0000" @click="searchClientSku">搜索</Button>	
						      <Button type="ghost" size="large" style="margin-left:10px">导入明细</Button>	
				     	</div>
				     	<!--商品列表-->
				     	<ul>
				     		<div class="classMain">
					     		<li v-if="goodsAttrs.length!=0">选择条件：</li>
					     		<div class="classgoods" v-if="goodsAttrs.length!=0">
					     			<li v-for="(item,index) in goodsAttrs" class="classList">{{item.name}}</li>
					     		</div>
				     		</div>
				     		<!--商品-->
				     		<div>
				     			<ul class="classMain classMain-goods">
				     				<li  v-for="(item,index) in goodsC" :key="index" class="li-goods">
				     					<img :src="item.mainPhoto" width="200" height="200">
				     					<p>{{item.skuName}}</p>
				     					<div class="goods-price">
				     						<span class="money">￥:{{item.price}}</span>
				     					</div>
				     					<div class='addGoods-to-order' @click="ClickAddSalesOrder(item,index,$event)">
				     						<span>加入销售订单</span>
				     					</div>
				     					
				     				</li>
				     				<div style="margin:5px 0" v-if="goodsC.length==0">
						                暂无商品
						            </div>
				     				<!--小球-->
				     				<!-- <div class="ball-container">
								        <div v-for="ball in balls">
								            <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
									                <div class="ball" v-show="ball.show">
									                    <div class="inner inner-hook"></div>
									               </div>
									       </transition>
										</div>
									</div> -->
				     			</ul>
				     			<div class="page-box" style="text-align:left;margin:10px 0" v-if="goodsCtotal>10">
								 	<Page :total="goodsCtotal" size="small" :pageSize='goodsCpageSize' show-total @on-change="getclientCData"></Page>
								</div>
				     		</div>
				     	</ul>
				     	<!--结算-->
				     	<div class="bill">
				     		<ul class="bill-div">
				     			<div class="billQty">
				     				<div>{{selectAllgoods.length}}件商品</div>
						     		<div>{{NumAll(selectAllgoods)}}件</div>
				     			</div>
				     			<div >
				     				<div style='color:#d53c39'>总价：￥<span style="font-size:38px">{{amountAll(selectAllgoods)}}</span>元</div>
				     			</div>
				     			<li class="billQty"></li>
				     			<div class="billBtn" @click="clickBill">结算</div>
				     		</ul>
				     	</div>
				    </div>
				    <!--提交订单-->
				    <div v-if="numIndex==2">
				    	<ul style="margin:20px">
				    		<li style="font-weight:600">客户信息</li>
				    		<li >{{xiaoshouformValidate.clientName}} | {{xiaoshouformValidate.contractPhone}}</li>
				    	</ul>
				    	<ul style="margin:20px">
				    		<li style="font-weight:600;margin:10px 0">选择收货地址</li>
				    		<div class="address-main">
					    		<li v-for="(item,index) in addressC" :key="index" @click="clickAddress(item)" style="position:relative" class="address-li" :class="{backgroundaddress:item.default==true}">
					    			<div style="border-bottom:1px solid #e4e4e4;margin:10px 0">
						    			<span>{{item.province}}</span>
						    			<span>{{item.city}}</span>
						    			<span>({{item.name}} 收)</span>
					    			</div>
					    			<div>
					    				<span>{{item.province}}{{item.city}}{{item.county}}{{item.address}}</span>
					    				<p>{{item.mobile}}</p>
					    			</div>
					    			<span class="duihao" v-if="item.default"></span>
					    		</li>
					    		<div style="margin:5px 0" v-if="addressC.length==0">
					                暂无地址
					            </div>
				    		</div>
				    		 <Button type="ghost" size="large" @click="addNewAddress">使用新地址</Button>
				    		 <div style="margin:20px 10px">
				    		 	<span style="font-weight:600">确认订单信息</span>
				    		 	<div class='table-head'>
									<div style="width:330px;flex:0 0 330px;display: flex;text-align: center;">
										<span >商品</span>
									</div>
									<span >商品属性</span>
									<span >单价</span>
									<span >数量</span>
									<span >优惠方式</span>
									<span >小计</span>
								</div>
								<div class='table-head1' v-for='(item,index) in selectAllgoods' :key="index">
									
									<div class='table-sub-order-list'>
										<li style='flex:1 0 330px;text-align:left;position:relative'>
											<img :src="item.mainPhoto" width='60' height='60' class='skuImg'>
											<span class='skuname'>{{item.skuName}}</span>
										</li>
										<li>
											<span>{{item.skuTypeDesc}}</span>
										</li>
										<li>
											<span>{{item.price}}</span>
										</li>
										<li @click="clickQtyRow(item,index)">
											
											<InputNumber :min="1" v-model="item.qty" @on-change="changeQty"></InputNumber>
										</li>
										<li>
											<span>{{item.discount}}</span>
										</li>
										<li>
											<span style='color:#d53c39'>{{item.qty*item.price}} 元</span>
										</li>
									</div>
								</div>
								<div style='margin:20px 0'>
									<span style="font-weight:600">财务信息</span>
									<li style="margin:10px 0">
										<span style="margin:0 10px;display:inline-block">总金额：
											<span style="color:#ff0000">{{amountAll(selectAllgoods)}}元</span>
										</span>

										已收货款：<InputNumber  :min="0" v-model="payAmount" @on-change="changepayAmount"></InputNumber>元
										
										<span style="margin:0 10px;display:inline-block">优惠货款：<InputNumber  :min="0" v-model="discountAmount" @on-change="changediscountAmount"></InputNumber>元</span>

										<span style="margin:0 10px;display:inline-block">应收货款：
											<span style="color:#ff0000">{{amountAll(selectAllgoods)-discountAmount-payAmount}}</span>
										</span>元
									</li>
								</div>
								<div style='margin:20px 0'>
									<Input type="textarea" placeholder="客户备注" v-model="remark" :rows="6" style="width:400px"></Input>
								</div>
								<!--提交订单-->
						     	<div class="bill">
						     		<ul class="bill-div">
						     			<div class="billQty">
						     				<div>{{selectAllgoods.length}}件商品</div>
						     				<div>{{NumAll(selectAllgoods)}}件</div>
						     			</div>
						     			<div >
						     				<div style='color:#d53c39'>总价：￥<span style="font-size:38px">{{amountAll(selectAllgoods)}}</span>元</div>
						     			</div>
						     			<li class="billQty">{{xiaoshouformValidate.clientName}} | {{deliverProvince}}{{deliverCity}}{{deliverCountry}}{{deliverAddress}}</li>
						     			<div class="billBtn" @click="comitOrder">提交订单</div>
						     		</ul>
						     	</div>
				    		 </div>
				    	</ul>
				    </div>
				    <!--完成-->
				    <div v-if="numIndex==3">
				    	<el-steps :active="activeThree" center>
						  	<el-step title="拍下商品" description="2018-10-19 16:50"></el-step>
						  	<el-step title="收款到支付宝" description="2018-10-19 16:50"></el-step>
						  	<el-step title="卖家发货" description="2018-10-19 16:50"></el-step>
						  	<el-step title="确认收货" description="2018-10-19 16:50"></el-step>
						  	<el-step title="评价" description="2018-10-19 16:50"></el-step>
						</el-steps>
						<div style="margin:20px 0">
							<ul class="orderDetailsinfo">
								<li class="left-li infoli">
									<p class="left-top-p1">订单信息</p>
									<p style="margin:10px 0;display: flex;">
										<span class="left-title">收货地址：</span>
										<span >
											{{xiaoshouformValidate.clientName}} | {{xiaoshouformValidate.contractPhone}} | {{deliverProvince}}{{deliverCity}}{{deliverCountry}}{{deliverAddress}}
											
										</span>
									</p>
									<p style="margin:10px 0;display: flex;">
										<span class="left-title">买家留言：</span>
										<span>
											{{remark}}
										</span>
									</p>
									<p style="margin:10px 0;display: flex;">
										<span class="left-title">订单编号：</span>
										<span>
											2548481848484848
										</span>
									</p>
									<p style="margin:10px 0;display: flex;">
										<span class="left-title">商家：</span>
										<span>
											金鸡湖大道99号
										</span>
									</p>
								</li>
								<li class="infoli infoli-right" style="border-left:none;width: 100%;">
									<p >
										<span style="font-weight:600">订单已确认，等待买家确认</span>
									</p>
									<p>
										您还有<span style="color:#ff0000">1天24小时55分45秒</span>；来确认收货；超时订单自动确认收货
									</p>
									<p>
										物流：<span>圆通快递</span>；运单号：55559849138486
									</p>
									<p style="color:#D8893A">
										<span>2018-10-19 18:40:35</span>
										<span>江苏省苏州是姑苏区金鸡湖大道99号苏州纳米城西北20区300 </span>
										<span >已签收 </span>
										<span>签收人： </span>
										<span>xxx</span>

									</p>
									<p>
										<span>您可以</span>
										<Button type="ghost" size="large" style="margin-left:10px">确认收货</Button>
										<a style="color:#4167B2;margin:0 5px">申请退款</a>	
										<a style="color:#4167B2;margin:0 5px">延长收货时间</a>	
										<a style="color:#4167B2;margin:0 5px">备忘</a>	
									</p>
								</li>
							</ul>
							<div style="margin-bottom:120px">
								<div class='table-head'>
									<div style="width:330px;flex:0 0 330px;display: flex;text-align: center;">
										<span >商品</span>
									</div>
									<span >商品属性</span>
									<span >单价</span>
									<span >数量</span>
									<span >优惠方式</span>
									<span >状态</span>
								</div>
								<div class='table-head1' v-for='(item,index) in selectAllgoods' :key="index">
									<div class='table-sub-order-list'>
										<li style='flex:1 0 330px;text-align:left;position:relative'>
											<img :src="item.mainPhoto" width='60' height='60'>
											<span class='skuname'>{{item.skuName}}</span>
										</li>
										<li>
											<span>{{item.skuTypeDesc}}</span>
										</li>
										<li>
											<span>{{item.price}}</span>
										</li>
										<li>
											<span>{{item.qty}}</span>
										</li>
										<li>
											<span>{{item.discount}}</span>
										</li>
										<li>
											<span style='color:#d53c39'>{{item.statusDesc}}</span>
										</li>
									</div>

								</div>
								<Button type="ghost" size="large" style="margin:10px 0" @click="clickBackStep(0)" >重新下单</Button>
							</div>
							
						</div>
				    </div>
			    </div>
		    </div>
		</div>
	<!--选择客户弹出框-->
	<Modal v-model="alertch" width="660px">
		<p slot="header" style="height:30px;line-height:30px">
			<span>客户搜索</span>
		</p>
		<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
			<Input v-model="PclientName"  placeholder="客户编码/客户名称" style="padding:2px 0" @on-enter='searkh'></Input>
			<span @click="getgysKeyword">
			<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9;cursor:pointer" ></Icon>
			</span>
		</div>
		<div slot="footer"  style='margin-top:-10px'>
			<!--客户表格-->
			<Table  border highlight-row height="300" :columns="clientdataKey" :data="clientdata" 
			@on-row-click="clientrow" @on-row-dblclick="dblclientrow">
			</Table>
			<!--分页-->
            <div class="page-box" style="text-align:left;margin:10px 0">
			 	<Page :total="clienttotal" size="small" :pageSize='clientpageSize' show-total @on-change="getclientData"></Page>
			</div>
			<div class='title'>
				<div style='color:#3b77e3;font-size:14px;text-align:left'>
					<Icon type="plus" style='margin-right:5px'></Icon>
					<span style="cursor:pointer;"  @click="addClientFast">快速添加客户</span>
				</div>
				<div>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="makeClient"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
				</div>
			</div>
		</div>
	</Modal>
	<Modal v-model="alertchadd" width="460px">
		<p slot="header" style="height:30px;line-height:30px">
			<span>快速添加客户</span>
		</p>
		<div >
			<Form ref="xiaoshousaveadd" :model="xiaoshouformValidateadd" :rules="xiaoshouruleValidateadd" :label-width="80">
				<FormItem label="客户名称" prop="clientName">
					<Input v-model="xiaoshouformValidateadd.clientName" placeholder="请输入客户名称" style="width:300px"></Input>
				</FormItem>
				<FormItem label="手机号" prop="contractPhone">
					<Input v-model="xiaoshouformValidateadd.contractPhone" placeholder="请输入手机号" style="width:300px"></Input>
				</FormItem>
			</Form>
		</div>
		<div slot="footer"  style='margin-top:-10px'>
			<div >
				<div>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCanceladd'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="makeClientadd('xiaoshousaveadd')"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
				</div>
			</div>
		</div>
	</Modal>
	<!--保存地址-->
    <Modal v-model="saveaddressisshow" width="460px" >
        <p slot="header" style="height:30px;line-height:30px">
          <span>新增地址</span>
        </p>
        <Form ref="formValidateAddress" :model="formValidateAddress" :rules="ruleValidateAddress" :label-width="80" >
        	<FormItem label="联系人"  prop="addressName">
                <Input  v-model="formValidateAddress.addressName" placeholder="请输入联系人姓名" ></Input>
          </FormItem>
          <FormItem label="手机号"  prop="addressMobile">
                <Input  v-model="formValidateAddress.addressMobile" placeholder="请输入联系手机" ></Input>
          </FormItem>
           <FormItem label="地址" prop="country">
            <el-cascader
              filterable
              expand-trigger="click"
              :options="cityInfo"
              v-model="selectedOptions3"
              @change="handleChange1" style="width:100%">
            </el-cascader>
            
          </FormItem> 
          <FormItem label="详细地址" prop="addressAddress">
             <Input type="text" v-model="formValidateAddress.addressAddress" placeholder="请输入详细地址"></Input>
          </FormItem>
          
          <FormItem label="设为默认">
              <Checkbox v-model='isdefault' @on-change="changeisdefault"></Checkbox>
          </FormItem>
        </Form>
        <div slot="footer">
          <div class='title' style='margin-top:-20px'>
            <div style='color:#D15151;font-size:14px'>
              </div>
            <div>
              <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancelAddress'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
              <Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="saveAddRess('formValidateAddress')" ><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>保存</Button>
            </div>
          </div>
        </div>
    </Modal>

    <!--商品属性弹框-->
	<Modal v-model="attrModel" width="460px" >
		<p slot="header" style="height:30px;line-height:30px">
			<span>辅助属性</span>
		</p>
		<div class="table1">
			
			<div class='goodsInfoTop'>
				<span>{{$t('purchase.purchaseOrder.goodsInfo')}}：</span><span>{{skuItem.skuName}}-{{skuItem.barcode}} - {{skuItem.unit}}</span><!--商品信息-->
			</div>
			<Table  border  height='300' highlight-row  :columns="sAttrskey" :data="sAttrsData"
			 @on-row-click="clickAttrRow" ></Table>
		</div>
		<div slot="footer"  style='margin-top:20px'>
			<div >
				<div>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCancelattr'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff;border:none" @click="cgtypeSureattr"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>添加</Button>
				</div>
			</div>
		</div>
	</Modal>
	</div>
</template>
<script type="text/javascript">
import echarts from 'echarts'
import LoadUrl from '@/components/common/actionLoad'
import { regionData,CodeToText,TextToCode} from 'element-china-area-data'
export default{
	data(){
		return{
			// count:0,
			// balls: [ //小球 设为3个
   //              {
   //                   show: false
   //              },
   //              {
   //                  show: false
   //              },
   //              {
   //                   show: false
   //              },
   //          ],
   //          dropBalls:[],
			numIndex:0,
			steps:[
				{
					title:"第一步 选择客户",
					id:0
				},
				{
					title:"第二步 选择商品",
					id:1
				},
				{
					title:"第三步 财务确认",
					id:2
				},
				{
					title:"完成",
					id:3
				},
			],
			actionUrl:LoadUrl.httpPrefix.Url+'file/action/upload?uid='+this.$store.state.common.token,//客户附件地址
			upData:[],//附件数据
			
			upDataIds:"",//附件字符串链接
			//客户信息
			alertch:false,
			alertchT:false,
			alertchadd:false,//快速添加客户弹框
			clientRowData:{},//客户一行数据
			clientdata:[],//客户数据数组
			clientdataKey:[
				{
                	title:"编码",
                	key:"code",
                },
                {
                	title:"名称",
                	key:"name"
                },
                {
                	title:"手机号",
                	key:"contractPhone"
                },
                {
					title:"状态",
					width:80,
					key:"statusDesc",
					 render:(h,parmas)=>{
                        return h('span',{
                            style:{
                                color:parmas.row.status==1?'#40ca98':'#d53c39'
                            }
                        },parmas.row.statusDesc)
                    }
				}
			],//客户数据数组

			PclientName:"",//客户弹框搜索关键词
			clientpageSize:0,
			clienttotal:0,
			clientId:"",//客户ID
			xiaoshouformValidate:{
				clientName:"",//客户名称
				
				contractPhone:"",
			},
			xiaoshouruleValidate:{
				clientName:[{ required: true, message: '必须填写', trigger: 'blur' }],
			},
			//快速添加客户
			xiaoshouformValidateadd:{
				clientName:"",//客户名称
				contractPhone:'',//手机
			},
			xiaoshouruleValidateadd:{
				clientName:[{ required: true, message: '必须填写', trigger: 'blur' }],
				contractPhone:[{ required: true, message: '必须填写', trigger: 'blur' },{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号码' } ],
			},
			//新建地址
			isdefault:false,
			CodeToText:CodeToText,//code转为Text-
	        TextToCode:TextToCode,//Text转为code
	        cityInfo:regionData,//地址数据
	        selectedOptions3:[],//绑定的数据
	        province:"",
	        city:"",
			formValidateAddress:{
				addressName:"",
				addressMobile:"",
				country:"",
				addressAddress:"",
			},
			ruleValidateAddress:{
				country:[{ required: true, message: '必须填写', trigger: 'blur' }],
				addressName:[{ required: true, message: '必须填写', trigger: 'blur' }],
				addressMobile:[{ required: true, message: '必须填写', trigger: 'blur' }],
			},
			saveaddressisshow:false,//
			goodsClientSku:"",//第二部商品搜索下拉
			selectG:"goods",
			goodsAttrs:[
				{
					name:"颜色"
				},
				{
					name:"尺码"
				},
				{
					name:"形状"
				}
			],
			goodsC:[],//客户商品数据
			goodsCtotal:0,
			goodsCpageSize:0,
			activeThree:3,
			//客户地址
			addressC:[],
			numaddress:false,//是否默认地址
			selectAllgoods:[],//已选商品数据
			attrsIndex:-1,//商品属性得下表

			skuItem:{},//一行商品数据
			skuItemIndex:0,//一行商品数据小标
			countQty:1,//默认数量1
			isclick:true,
			salesListC:[
				{
					name:"我的客户",
					id:0
				},
				{
					name:"待合作",
					id:1
				},
				{
					name:"合作客户",
					id:2
				},
				{
					name:"退货订单",
					id:3
				},
				
			],
			salesListS:[
				{
					name:"开单",
					id:0
				},
				{
					name:"待发货",
					id:1
				},
				{
					name:"待开票",
					id:2
				},
				{
					name:"退货订单",
					id:3
				},
				
			],
			deliverAddress:'',
			deliverProvince:'',
			deliverCity:'',
			deliverCountry:'',
			discountAmount:0,//优惠金额
			payAmount:0,//已收金额
			deliverName:"",//地址收货人
			remark:"",//备注

			attrIdData:{},//一行属性数据
			sAttrsData:[],//属性数组
			allCouunt:1,
			attrModel:false,
			sAttrskey:[
					{
						title:this.$t('purchase.purchaseOrder.num'),//数量
						key:"qty",
						width:100,
						align:"center",
						render:(h,parmas)=>{
						return h('InputNumber',{
								props:{
									value:parmas.row.qty,
									min:0
								},
								style:{
									width:"100%",
								},
								on:{
									'on-click':(e)=>{
										e.stopPropagation()
									},
									"on-change":(e)=>{
										this.allCouunt=e
										parmas.row.qty=this.allCouunt
										this.sAttrsData[parmas.index].qty=this.allCouunt
										
									},
									'on-blur':()=>{
										parmas.row.qty=this.allCouunt
										this.sAttrsData[parmas.index].qty=this.allCouunt
										

									}
								}
							})
						}
					},
					{
						title:this.$t('purchase.purchaseOrder.attrs'),//辅助属性
						key:"skuTypeDesc"
					},
				],


			len:0,
			len1:0,
			pendingOrder:0,//待处理
			auditOrder:0,//待审核
			shipmentsOrder:0,//待发货
			shipmentsInOrder:0,//发货中
			returnOrder:0,//退货
			accomplishOrder:0,//待完成
			value:'',//下拉的数值
			uid: this.$store.state.common.token,
			
			model1:1,//默认本月
			cityList:[
				
				{
					value:1,
					label:"本月"
				},
				{
					value:2,
					label:"本季度"
				},
				{
					value:3,
					label:"本年"
				},
			],
		}
	},
	methods:{

		clicksalesListS(index){
			this.isclick=false
		},
		//
		clicksalesListC(index){
			this.isclick=false
		},

		//上传客户附件
		 //上传之前类型之前
        beforeAvatarUpload(file){
           var fileName=new Array()
            fileName =file.name.split('.');
            // const extension = fileName[fileName.length-1] === 'xls'
            // const extension2 =  fileName[fileName.length-1]=== 'xlsx'
            const isLt2M = file.size / 1024 / 1024 < 20
 //            if (!extension && !extension2) {
 //                // this.$message({
 //                //     message: '',
 //                //     type: 'warning'
 //                // });
 //                this.$Notice.error({
      //  title: '提示',
      //  desc: '上传文件只能是xls、xlsx格式!'
      // });
 //            }
            if (!isLt2M) {

                this.$notify({
                    title: '提示',
                    message:  '上传文件大小不能超过 20MB!',
                    type: 'error',
                    position: 'bottom-right'
                });
            }
           //  if (extension || extension2 && isLt2M == true) {

           //      // let fd = new FormData()

           //      // fd.append('file', file)
           //      // //console.log(fd)
           //      // this.newImport(file)
           //      return true
           //  }
          return isLt2M

        },
       
        //删除附件
        handleRemove(file, fileList) {
        	console.log(file)
        	if(this.upData.length==0){
        		return
        	}else{
        		this.upData.splice(this.upData.indexOf(file.response.rows.key),1)
        	}
	       
	    },
       	//成功后的会掉
        success(response, file, fileList){
            if(response.status==200){
               	this.upData.push(response.rows.key)
               	this.upDataIds=this.upData.join(',')
            }else{
	            this.$notify({
	                title:"",//
	                message: response.errorMessage,
	                type: 'error',
	                position: 'bottom-right'
	            });
            }
        },
        //输入客户实时查询
        changeInputClient(){
        	if(this.xiaoshouformValidate.clientName==''){
				this.alertchT = false;
				this.clientdata=[]
				return 
			}else{
				this.axios.get('/client/query?keyword='+this.xiaoshouformValidate.clientName+'&uid=' + this.uid+'&status=1').then((res) => {
					
					if(res.data.status == '200') {
						let data=res.data
						this.clientdata = data.rows
						this.clientpageSize = data.pageSize;
						this.clienttotal = data.total;
						this.alertchT = true;
					}
				})
			}
        },
        //点击查询客户按钮
        searchClient(){
        	this.alertch=true
    		this.axios.get('client/query?uid='+this.uid+'&status=1').then((res)=>{
				if(res.data.status==200){
					let data=res.data
					this.clientdata = data.rows
					this.clientpageSize = data.pageSize;
					this.clienttotal = data.total;
				}
			})
        	
        },
        //客户弹框点击查询
        getgysKeyword(){
        	this.axios.get('client/query?keyword='+this.PclientName+'&uid='+this.uid+'&status=1').then((res)=>{
				if(res.data.status==200){
					let data=res.data
					this.clientdata = data.rows
					this.clientpageSize = data.pageSize;
					this.clienttotal = data.total;
				}
			})
        },
        //回车查询客户
        searkh(){
        	this.getgysKeyword()
        },
        //单击客户一行
        clientrow(row){
        	this.clientRowData=row
        },
        //双击客户一行
        dblclientrow(row){
        	this.makeClient()
        	this.alertch=false
        },
         //当前页面表格单击客户一行
        clientrow2(row){
        	this.xiaoshouformValidate.clientName=row.name
        	this.xiaoshouformValidate.contractPhone=row.contractPhone
        	this.clientId=row.id
        	this.alertchT=false
        },
       
        //确认客户
        makeClient(){
        	this.clientId=this.clientRowData.id
        	this.xiaoshouformValidate.clientName=this.clientRowData.name
        	this.xiaoshouformValidate.contractPhone=this.clientRowData.contractPhone
        	this.modelCancel()
        },
        //取消客户
        modelCancel(){
        	this.alertch=false
        	this.PclientName=''
        },
        //客户翻页
        getclientData(current){
        	if(this.PclientName==''){
        		this.axios.get('client/query?offset='+current+'&uid='+this.uid+'&status=1').then((res)=>{
					if(res.data.status==200){
						let data=res.data
						this.clientdata = data.rows
						this.clientpageSize = data.pageSize;
						this.clienttotal = data.total;
					}
				})
        	}else{
        		this.axios.get('client/query?offset='+current+'&keyword='+this.PclientName+'&uid='+this.uid+'&status=1').then((res)=>{
					if(res.data.status==200){
						let data=res.data
						this.clientdata = data.rows
						this.clientpageSize = data.pageSize;
						this.clienttotal = data.total;
					}
				})
        	}
        },
        //快速添加客户
        addClientFast(){
        	this.alertchadd=true
        },
        //快速添加客户取消
        modelCanceladd(){
        	this.alertchadd=false
        	this.xiaoshouformValidateadd.clientName=''
        	this.xiaoshouformValidateadd.contractPhone=''
        },
        //快速添加客户确认
        makeClientadd(name){
        	this.$refs[name].validate((valid) => {
        		if(valid){
        			this.axios.post('/client/add?uid=' + this.uid,{
        				name:this.xiaoshouformValidateadd.clientName,
        				contractPhone:this.xiaoshouformValidateadd.contractPhone
        			}).then(res=>{
        				if(res.data.status==200){
	                      this.$notify({
	                          title: '',
	                          message:'添加成功',
	                          type: 'success',
	                          position: 'bottom-right'
	                      });
	                      	this.alertchadd=false
        					this.xiaoshouformValidateadd.clientName=''
        					this.xiaoshouformValidateadd.contractPhone=''
        					this.getClientAll()
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
        },
        //获取所有客户
        getClientAll(){
        	this.axios.get('client/query?uid='+this.uid+'&status=1').then((res)=>{
				if(res.data.status==200){
					let data=res.data
					this.clientdata = data.rows
					this.clientpageSize = data.pageSize;
					this.clienttotal = data.total;
				}
			})
        },
		//第一步保存
		clickSaveC(){
			if(this.xiaoshouformValidate.clientName==''){
				this.$notify({
                  	title:"",
                  	message:'必须填写客户',
                 	type: 'error',
                  	position: 'bottom-right'
              	});
			}else{
				this.numIndex=1
				this.getGoodsC()
				console.log(this.upData)
			}
			
		},
		//第一步保存后搜索客户商品
		getGoodsC(){
			this.axios.get('/quotation/sku/'+this.clientId+'?uid='+this.uid).then((res)=>{
				if(res.data.status==200){
					let data=res.data
					this.goodsC=data.rows
					this.goodsCtotal=data.total
					this.goodsCpageSize=data.pageSize
				}
			})
		},
		//翻页
		getclientCData(current){
			this.axios.get('/quotation/sku/'+this.clientId+'?offset='+current+'&uid='+this.uid).then((res)=>{
				if(res.data.status==200){
					let data=res.data
					this.goodsC=data.rows
					this.goodsCtotal=data.total
					this.goodsCpageSize=data.pageSize
				}
			})
		},
		//第二部点击上方搜索goodsClientSku
		searchClientSku(){
			this.axios.get('/quotation/sku/'+this.clientId+'?keyword='+this.goodsClientSku+'&uid='+this.uid).then((res)=>{
				if(res.data.status==200){
					let data=res.data
					this.goodsC=data.rows
					this.goodsCtotal=data.total
					this.goodsCpageSize=data.pageSize
				}
			})
		},
		//回车第二部点击上方搜索goodsClientSku
		EntersearchClientSku(){
			this.searchClientSku()
		},
		//优惠金额改变
		changediscountAmount(s){
			this.discountAmount=s
		},
		//已收金额
		changepayAmount(s){
			this.payAmount=s
		},
		//点击结算
		clickBill(){
			if(this.selectAllgoods.length==0){
				this.$notify({
			        title:"",//
			        message:"请添加商品",
			        type: 'error',
			        position: 'bottom-right'
		        });
			}else{
				this.numIndex=2
				this.getAllAddress(this.clientId)//获取客户地址
			}
			
		},
		//点击加入销售订单
		ClickAddSalesOrder(item,index,event){
			// this.drop(event.target);
   			//this.count ++;
			if(item.attrDetailList!=null && item.attrDetailList.length!=0){
				this.skuItem=data//商品一行数据
				this.attrModel=true
				this.sAttrsData=item.attrDetailList//属性
				this.sAttrsData.forEach(x=>{
					x.qty=0
				})
			}else{
				this.skuItem=item//商品一行数据
				this.$set(item,'qty',1)//解决动态添加属性无法触发视图更新
				let goodsarr={
						skuName:this.skuItem.skuName,
						skuId:this.skuItem.skuId,
						mainPhoto:this.skuItem.mainPhoto,
						inventoryUp:this.skuItem.inventoryUp,
						inventory:this.skuItem.inventory,
						qty:item.qty,
						price:this.skuItem.price,
						costPrice:this.skuItem.costPrice,
						skucode:this.skuItem.skuCode,
						barcode:this.skuItem.barcode,
						unit:this.skuItem.unit,
						wholePrice:this.skuItem.wholePrice,
						skuPic:this.skuItem.mainPhoto,
						skuTypeId:'',//属性编号
						skuTypeDesc:'',//属性描述
						salesPrice:this.skuItem.price,
					}
				this.selectAllgoods.push(item)
				this.attrModel=false
			}
		},
		//单击一行属性
		clickAttrRow(data){
			this.attrIdData=data
		},
		//取消确认
		// //继续添加属性按钮
        cgtypeSureattr(){
         	this.sAttrsData.forEach(x=>{
         		if(x.qty>0){
         			let goodsarr={
						skuName:this.skuItem.skuName,
						skuId:this.skuItem.skuId,
						mainPhoto:this.skuItem.mainPhoto,
						inventoryUp:this.skuItem.inventoryUp,
						inventory:this.skuItem.inventory,
						qty:x.qty,
						price:this.skuItem.price,
						costPrice:this.skuItem.costPrice,
						skucode:this.skuItem.skuCode,
						barcode:this.skuItem.barcode,
						unit:this.skuItem.unit,
						wholePrice:this.skuItem.wholePrice,
						skuPic:this.skuItem.mainPhoto,
						skuTypeId:x.skuTypeId,//属性编号
						skuTypeDesc:x.skuTypeDesc,//属性描述
						salesPrice:this.skuItem.price,
					}
					this.selectAllgoods.push(goodsarr)
     			}
     		})
         	this.allCouunt=1
			this.attrsArr=[]
			this.attrIdData={}
			this.skuItem={}
			this.attrModel=false

        },
		//属性取消
        modelCancelattr(){
        	this.attrModel=false
        	this.sAttrsData=[]
        	// this.attrIdDataALL=[]
        	this.skuItem={}
        },

		//单击一行商品、、提交订单页面
		clickQtyRow(item,index){
			this.skuItemIndex=index
		},
		//修改数量
		changeQty(q){
			this.selectAllgoods[this.skuItemIndex].qty=q
			console.log(this.selectAllgoods)
		},
		//点击地址
		clickAddress(item){
			console.log(item)
			 this.axios.get('clienta/default/'+item.id+'?uid='+this.uid).then(res=>{
		        if(res.data.status==200){
		        	this.deliverAddress=item.address
					this.deliverProvince=item.province
					this.deliverCity=item.city
					this.deliverCountry=item.country
		            this.getAllAddress(this.clientId)//获取客户地址
		        }
		    })
		},
		//新建地址
		addNewAddress(){
			this.saveaddressisshow=true
		},
		//新建地址是否默认
		changeisdefault(s){
			this.isdefault=s
		},
		//省市区
	    handleChange1(arr){
	        this.province = this.CodeToText[arr[0]]
	        this.city =this.CodeToText[arr[1]]
	        this.formValidateAddress.country = this.CodeToText[arr[2]]

	    },
	    //获取地址列表
	    getAllAddress(id){
	        this.axios.get('clienta/query/'+id+'?uid='+this.uid).then(res=>{
	          if(res.data.status==200){
	            this.addressC=res.data.rows
	            this.addressC.forEach(x=>{
	            	if(x.default){
	            		this.deliverAddress=x.address
						this.deliverProvince=x.province
						this.deliverCity=x.city
						this.deliverCountry=x.country
						this.deliverName=x.name//收货人
	            	}
	            })
	          }
	        })
	   	},
	    //保存新地址
	    saveAddRess(name){
	    	this.$refs[name].validate((valid) => {
	    	 	if(valid){
	    	 		this.axios.post('clienta/add?uid='+this.uid,{
	    	 			partnerId:this.clientId,
		              	name:this.formValidateAddress.addressName,//联系人
		              	mobile:this.formValidateAddress.addressMobile,//联系手机
		              	province:this.province,//省
		              	city:this.city,//市
		              	country:this.formValidateAddress.country ,//区
		              	address:this.formValidateAddress.addressAddress,//详细地址
		              	default:this.isdefault//是否设置为默认地址
	    	 		}).then(res=>{
	    	 			 if(res.data.status==200){
			                  this.getAllAddress(this.clientId)
			                  this.formValidateAddress.addressName=''//联系人
			                  this.formValidateAddress.addressMobile=''//联系电话
			                  this.province=''//省
			                  this.city=''//市
			                  this.formValidateAddress.country=''//区
			                  this.formValidateAddress.addressAddress=''//详细地址
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
	    },
	    //取消保存地址
	    cancelAddress(){
	    	this.saveaddressisshow=false
	    },
	    //提交订单
	    comitOrder(){
	    	
			if(this.deliverProvince==''){
				this.$notify({
				        title:"",//
				        message:"请选择收货地址",
				        type: 'error',
				        position: 'bottom-right'
			        });
				}else{
					if((this.amountAll(this.selectAllgoods)-this.discountAmount-this.payAmount)<0){
			 			this.$notify({
					        title:"",//
					        message:'应收金额不能小于0',//
					        type: 'error',
					        position: 'bottom-right'
				        });
			 		}else{
			 		this.axios.post('/so/add?uid=' + this.uid, {
		            		partnerName:this.xiaoshouformValidate.clientName,//供应商名称
			            	partnerId:this.clientId,//供应商id
			  				deliverName:this.deliverName,//收货人
			  				deliverMobile:this.xiaoshouformValidate.contractPhone,//收货人手机
			  				deliverAddress:this.deliverAddress,
			  				deliverProvince:this.deliverProvince,
			  				deliverCity:this.deliverCity,
			  				deliverCountry:this.deliverCountry,
							soDetailList:this.selectAllgoods,//销售明细
							receivedAmount:this.amountAll(this.selectAllgoods)-this.discountAmount-this.payAmount,//应收金额
							payAmount:this.payAmount,//已收金额
							discountAmount:this.discountAmount,//优惠金额
							totalAmount:this.amountAll(this.selectAllgoods),
							remark:this.remark,
							attachs:this.upDataIds//多附件地址
					}).then((res) => {

							if(res.data.status=='200'){
								this.$notify({
							        title: '',
							        message: '成功',
							        type: 'success',
							        position: 'bottom-right'
						        });
								this.numIndex=3
								// this.clearData()
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

	    },
	   //提交订单后清空数据
	    clearData(){
	    	this.xiaoshouformValidate.clientName=''//供应商名称
        	this.clientId=''//供应商id
			this.deliverName=''//收货人
			this.xiaoshouformValidate.contractPhone=''//收货人手机
			this.deliverAddress=''
			this.deliverProvince=''
			this.deliverCity=''
			this.deliverCountry=''
			this.selectAllgoods=[]//销售明细
			this.discountAmoun=0//应收金额
			this.payAmount=0//已收金额
			this.discountAmount=0//优惠金额
			this.remark=''
			this.upDataIds=''//多附件地址
			this.upData=[]//多附件地址
	    },
	    //第一步返回
		clickBackStep(index){
			switch(index){
				case 0:
					this.numIndex=0
					this.isclick=true
					this.clearData()
				break;
				case 1:
					this.numIndex=0
				break;
				case 2:
					this.numIndex=1
				break;
			}
		},
	    //商品数量
		NumAll(arr){
			let num=0;
			if(arr.length==0){
				return 0
			}else{
				arr.forEach(x=>{
					num+=x.qty
				})
				return num
			}
			
		},
		//获取加商品后的总金额
		amountAll(arr){
			let amount=0;
			if(arr.length==0){
				return 0
			}else{
				arr.forEach(x=>{
					amount+=x.qty*x.price
				})
				return amount
			}
			
		},
		//点击头部数字
		clickpTopNum(n){
			switch(n){
				case 0:
					this.goRouterValue(0,"/salespage")//待处理
				break;
				case 1:
					this.goRouterValue(1,"/salespage")//待审核
				break;
				case 2:
					this.goRouterValue(5,"/send")//待发货
				break;
				case 3:
					this.goRouterValue(8,"/salespage")//发货中
				break;
				case 4:
					this.goRouterValue(88,"/salespage")//完成
				break;
			}
		},
		//点击头部数字
		goRouterValue(value,path){
			this.$router.push({
				path:path,
				query:{
					value:value
				}
			})
		},
		//数字显示
		getNumber(){
			this.axios.get('xsbb/digIsPlay?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.pendingOrder=res.data.rows.pendingOrder
					this.auditOrder=res.data.rows.auditOrder
					this.shipmentsOrder=res.data.rows.shipmentsOrder
					this.shipmentsInOrder=res.data.rows.shipmentsInOrder
					this.returnOrder=res.data.rows.returnOrder
					this.accomplishOrder=res.data.rows.accomplishOrder
				}
			})
		},
		//下拉选择
		orderselected(value){
			this.draw(value)
		},
		draw(value){
			let myChart = echarts.init(document.getElementById('myEcharts'),'shine')
			myChart.showLoading()
			//本月GET  订单salesOverview/mOrder
			if(value==1){
				this.axios.get('xsbb/mOrder?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.len=res.data.rows.morderChange.length
						let tm=[]//时间
						let qty=[]//数量
						res.data.rows.morderChange.forEach((x,index)=>{
							tm.push(res.data.rows.morderChange[index].tm)
							qty.push(res.data.rows.morderChange[index].qty)
						})
						let option={
							title:{
								text:"订单变化曲线",
								 x: 'center',
							},
							//提示框
						    tooltip : {
						    	axisPointer: {
						            type: 'cross'
						        }
						    },
						    legend: {
						    	left:'right',
						    	tyle:"scroll",
						    	// show:false,
						        data:['销售数量'],
						    },
						     xAxis: {
						     	type:'category',
				                data: tm//时间数组
				            },
				            yAxis: {

				            },
				            series: [
					            {
					                name: '销售数量',
					                type: 'line',
					                data:qty,//数量数组
					                
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
						myChart.hideLoading()
						}
					
				})
			}
			//本季度
			if(value==2){
				this.axios.get('/xsbb/order?uid='+this.uid).then(res=>{
					myChart.showLoading()
					if(res.data.status==200){
						this.len=res.data.rows.orderChange.length
						let tm=[]//时间
						let qty=[]//数量
						res.data.rows.orderChange.forEach((x,index)=>{
							tm.push(res.data.rows.orderChange[index].tm)
							qty.push(res.data.rows.orderChange[index].qty)
						})
						let option={
					    tooltip : {},
					    legend: {
					    	tyle:"scroll",
					        data:['销售数量'],

					    },
					     xAxis: {
					     	type:'category',
			                data: tm
			            },
			            yAxis: {},
			            series: [
				            {
				                name: '销售数量',
				                type: 'line',
				                data:qty,
				                normal: {
					                  
					                    label: {
					                        show: true,
					                        position: 'top',
					                        formatter: '{c}'
					                    }
					                }
				            },
			            ]
					};
					myChart.setOption(option);
					myChart.hideLoading()
					}
				})
			}
			//本年
			if(value==3){
				this.axios.get('/xsbb/yOrder?uid='+this.uid).then(res=>{
					myChart.showLoading()
					if(res.data.status==200){
						this.len=res.data.rows.yorderChange.length
						let tm=[]//时间
						let qty=[]//数量
						res.data.rows.yorderChange.forEach((x,index)=>{
							tm.push(res.data.rows.yorderChange[index].tm)
							qty.push(res.data.rows.yorderChange[index].qty)
						})
						let option={
					    tooltip : {},
					    legend: {
					    	tyle:"scroll",
					        data:['销售数量'],

					    },
					     xAxis: {
					     	type:'category',
			                data: tm
			            },
			            yAxis: {},
			            series: [
				            {
				                name: '销售数量',
				                type: 'line',
				                data:qty,
				                normal: {
					                  
					                    label: {
					                        show: true,
					                        position: 'top',
					                        formatter: '{c}'
					                    }
					                }
				            },
			            ]
					};
					myChart.setOption(option);
					myChart.hideLoading()
					}
				})
			}
		},
		//TOP10商品
		drawInv(){
			let myEchartsInv = echarts.init(document.getElementById('myEchartsInv'),'shine')
			this.axios.get('/xsbb/skuRank?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.len1=res.data.rows.skuRank.length
					let mprocurementRank=[]
					let totalAmount=[]
					res.data.rows.skuRank.forEach((x,index)=>{
						mprocurementRank.push(res.data.rows.skuRank[index].skuName)
						totalAmount.push(res.data.rows.skuRank[index].qty)
					})
					let option={
						title:{
							text:"商品TOP10",
						
							x: 'center',
						},
					    tooltip : {
					    	 trigger: 'item',
					    	 axisPointer: {
					            type: 'cross'
					        },
					        formatter: "{a} <br/>{b} : {c}"
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
					    legend: {},
					      xAxis: [
					      	{
				      			type : 'category',
				      			data:mprocurementRank,
				      			//文字过多竖直显示
				      			axisLabel: {
	                               interval: 0,  
	                               formatter:function(value){
	                                   return value.split("").join("\n");  
	                               }  
	                           }  
				      		}
					      ],
			            yAxis: {},
			            series: [{
			              	name:'数量',
			              	// name:this.$t('purchase.cgPriceN'),
			                type: 'bar',
			                data: totalAmount,
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
					                        formatter: '{c}'
					                    }
					                }
					            },
			            },
			            
			            ]
					}
					myEchartsInv.setOption(option);
				}
			})
		},
		// drop(el){ //抛物
  //                for(let i=0;i<this.balls.length;i++){
  //                    let ball= this.balls[i];
  //                   if(!ball.show){
  //                        ball.show = true;
  //                        ball.el=el;
  //                       this.dropBalls.push(ball);
  //                       return;
  //                    }
  //                }
  //           },
  //       beforeDrop(el) {/* 购物车小球动画实现 */
  //               let count = this.balls.length;
  //               while (count--) {
  //                   let ball = this.balls[count];
  //                    if (ball.show) {
  //                       let rect = ball.el.getBoundingClientRect(); //元素相对于视口的位置
  //                        let x = rect.right - 32;
  //                        let y = -(window.innerHeight - rect.top-22);  //获取y
  //                        el.style.display = '';
  //                        el.style.webkitTransform = 'translateY('+y+'px)';  //translateY
  //                       el.style.transform = 'translateY('+y+'px)';
  //                      let inner = el.getElementsByClassName('inner-hook')[0];
  //                        inner.style.webkitTransform = 'translateX('+x+'px)';
  //                       inner.style.transform = 'translateX('+x+'px)';
  //                    }
  //                }
  //       },
  //       dropping(el, done) { /*重置小球数量  样式重置*/
  //               let rf = el.offsetHeight;
  //               el.style.webkitTransform = 'translate3d(0,0,0)';
  //               el.style.transform = 'translate3d(0,0,0)';
  //                let inner = el.getElementsByClassName('inner-hook')[0];
  //               inner.style.webkitTransform = 'translate3d(0,0,0)';
  //                inner.style.transform = 'translate3d(0,0,0)';
  //               el.addEventListener('transitionend', done);
  //       },
  //       afterDrop(el) { /*初始化小球*/
  //               let ball = this.dropBalls.shift();
  //                if (ball) {
  //                ball.show=false;
  //                el.style.display = 'none';
  //            }
  //       }
	},
	created(){
		this.$nextTick(()=>{
			this.getNumber()//数字显示
			this.draw(1)//本月
			this.drawInv()//TOP10商品
		
		})
	},
	mounted(){

	}
	
}
</script>
<style type="text/css" scoped>
.order{
	width:100%;
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
.ul-list{
	 display: flex;
}

.ul-list li{
	position: relative;
    flex-wrap: wrap;
    background: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
   	width:200px;
    margin:30px;
}
.head-bottom1 .head-bottom1-li:focus-within{
	background:red;
	border:1px solid red;
}
.car-body{
	padding: 1.25rem;

}
.car-body span{
	color:#666f73;

}
.top-num{
	cursor: pointer
}
.f-50{
	font-size:35px;
	
}
.font-weight-100{
	font-weight:100;
}
.center-main{
	/*display:flex;*/
	margin:10px;
	border-bottom:1px solid #ccc;
	border-top:1px solid #ccc;
}
.center-main-left{
	/*width:350px;*/
	border-right:1px solid #ccc;
}
.center-main-right{
	width:100%;
	height:300px;
	border:1px solid red;
}
li{
	list-style: none
}
.echarts{
	width:100%;
	display:flex;
	justify-content: space-around;
	
	
}
.shop{
	
	display:flex;
	margin:0 10px;
	height:40px;
	line-height: 40px;
	background: #F8F8F8;
	justify-content: space-between;
}
.shop1{
	display:flex;
	margin-top:20px;
	height:40px;
	padding-bottom:10px;
	line-height: 40px;
	background: #F8F8F8;
	
}
.echarts1{
	/*margin-bottom:440px;*/
}
.shop span{
	height:20px;
	margin:0 20px;
	line-height: 20px
}
.shop span:nth-child(1){
	margin-top:10px;
	border-left:3px solid #FF7700;
}
.shop span:nth-child(2){
	margin-top:10px;

}
.table{
	margin-bottom:90px;
}
.zj{
	width:100%;
	margin-bottom:80px;
	display:flex;
	margin-top: 10px;
	justify-content: space-around;
}
.zj-style{
	width:100%;
	margin:0 10px;
}
.zj-style>span{
	display:block;
	width:100%;
	height:40px;
	background: #F8F8F8;
	line-height: 40px;
	text-align: left
}
.echarts-right div{
	margin-top:10px;
}
.echarts{
	width:100%;
	/*height: auto;*/
	display:flex;
	justify-content: space-around;
}

.car-list{
	padding:30px;
	text-align: center;
	cursor:pointer;
}
.stepTop{
	width: 100%;
    padding: 20px;
    
}
.stepTop .list{
	display: flex;
	/*margin-left:80px;*/
	/*justify-content: center;*/
}
.stepTop .list>li{
	width:300px;
	height:50px;
	line-height: 50px;
	text-align: center;
	
	border:1px solid #ccc;
}
.backgroundStep{
	background:#009587;
	color:#fff;
}
.contentC{
	margin:50px 10px 0 10px;
}
.bottom-save{
	
	padding:20px;
	margin: 20px 20px 120px 0px;
	border:1px solid #e4e4e4;
}
.Goods{
	margin: 10px 0;
	width:100%;
}
.selectGoods{
	width:100%;
	display: flex;
	/*justify-content: center;*/

}
.classMain{
	display: flex;
    margin: 20px 0;
   
    padding: 10px;
    border: 1px solid #e4e4e4;
}
.classMain-goods{
	display: flex;
	flex-wrap: wrap;
}
.classMain-goods p{
	max-width:220px;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.classgoods{
	display: flex;
	/*justify-content: center;*/
}
.classList{
	margin:0 10px;
}
.li-goods{
	margin:10px;
	padding:20px;
	border:1px solid #e4e4e4;
	position:relative;
}
.attrsGoods-right{
	position: absolute;
    left: 101%;
    z-index: 9;
    top: 0;
    border: 1px solid #e4e4e4;
    width: 300px;
    height: 100%;
}
.goods-price{
	display: flex;
	justify-content: space-between;
}
.money{
	font-size:16px;
	font-weight: 600;
	color:#ff0000;
}
.addGoods-to-order{
	height:40px;
	line-height: 40px;
	color:#fff;
	font-size:16px;
	text-align: center;
	margin-top:10px;
	background:#FF063A;
}
.addGoods-to-order:hover{
	cursor:pointer;
	background:#aF063A;
}
.bill{
	margin-bottom:140px;
	width:100%;
}
.bill .bill-div{
	display:flex;
	justify-content: space-between;
	border:1px solid #e4e4e4;
	align-items: center;
	
	height:90px;
}
.billQty{
	margin-left:20px;
}
.billBtn{
	background: #FF9800;
    height: 90px;
    line-height: 90px;
    width: 140px;
    text-align: center;
    cursor:pointer;
    color:#fff;
    font-size:16px;
}
.address-main{
	display: flex;
}
.address-li{
	border: 4px solid #e4e4e4;
    width: 300px;
    margin: 10px;
    padding: 10px;
    border-image:url(../../assets/timg2.jpg) 30 30 stretch;
    cursor: pointer

}

.backgroundaddress{
	border-color:blue;
}
.table-head{
	display:flex;
	justify-content: space-around;
	
	border-bottom:2px solid #B5D3FF;
	height:40px;
	margin:10px 0;
	line-height: 40px;
	margin-bottom:10px;
	
	position:relative;
}
.table-head span{
	width:100%;
	text-align: center;
}
.table-head1{
	border-bottom:1px solid #e4e4e4;
}
.orderDetailsinfo{
	padding:20px;
	display: flex;
}
.orderDetailsinfo li.infoli{
	border:1px solid #e4e4e4;
}
.left-top-p1{
	font-weight: 600;
    border-bottom: 1px solid #ccc;
    background: rgb(243, 243, 243);
    padding: 5px 20px;
}

.left-li{
	flex:0 0 335px;
	background-color: #FBFBFB;
	
}
.infoli-right{
	border-left: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.left-li p,.infoli p{
	padding:5px 20px;
}
.left-title{
	display: inline-block;
	width:70px;
	text-align: right;
	flex:0 0 70px;
}
.table-sub-order-list{
	height:100%;
	display:flex;
	justify-content: center;
	align-items: center;
	padding:10px 0;

}
.skuname{
    position: absolute;
    width: 280px;
  
 	cursor:pointer;
    left: 80px;
    bottom: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.table-sub-order-list li{
	text-align: center;
	width:100%;
	/*	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;*/
}
.title{
	display: flex;
	margin:20px 0;
	justify-content: space-between;
	align-items: center;
}
.duihao{
	position:absolute;
	right:0;
	bottom:0;
	text-align: center;
	width:0px;
    height:0px;
    border-width:20px;
    border-style:solid;
    transform:rotate(90deg);
    border-color:#FF0036 #FF0036 transparent  transparent ;
}
.ball{
    position: fixed;
    right: 230px;
    bottom: 22px;
    z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41); /*贝塞尔曲线*/
 }
 .inner{
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #ff0000;
      transition: all 0.4s linear;
 }
</style>