<template>
	<div class="add-box">
		<div class="add-header">
			<Col span=6>
				<div class="left-top">

					<span style="margin-left: 10px;">全部销售订单</span>
					<div style="margin-left:70px">
						<Button  type="ghost" style="background:#00A8FF;margin-right:10px;color:#fff;border:none" @click="addUnit">新建</Button>
						<Button style="background:#FF8B00;color:#fff;border:none">
							<Icon type="navicon-round"></Icon>
						</Button>
					</div>
				</div> 
			</Col>
			<Col span=18>
				<div class="right-top" style="position:relative;">
					<div style="display:block">
						<span style="">{{orderText}}</span>
						<div v-if="bordercodeisshow" style="margin-top:-20px">{{poId}}</div>
					</div>
					<div style="position:absolute;right:20%;top:0">
						<div v-if="addText">
							<Button  type="ghost" style="background:#086CA2;color:#fff;" @click="saveCgInfo" >保存</Button>
							<Button @click=""  style="background:#D8D5DE;margin-right:20px;" >取消</Button>
						</div>
						<div v-if="!addText"  class="changebutton">
							<Button  type="ghost" @click="edit" v-if="editshow" style="background:#00A8FF;color:#fff">修改</Button>
							<Button  type="ghost" @click="saveEdit" v-if="!editshow">保存</Button>
							<Poptip placement="bottom-end">
                        		<div type="ghost" style="margin-right:6px;color:#308DBF">
                        			<Button  type="ghost" style="color:#308DBF">创建
                        				<span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
                        			</Button>
                        		</div>
                        		<div slot="content" style="width:80px;overflow: hidden;">
                        			<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;">账单</p>
                        			<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;">销售账单</p>
                        			<p style="font-size:14px;color:#0d0d0d;">账单付款</p>
                        		</div>
                        	</Poptip>

                        	<Poptip placement="bottom-end">
                        		<div type="ghost">
                        			<Button  type="ghost" style="color:#308DBF">更多
                        				<span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
                        			</Button>
                        		</div>
                        		<div slot="content" style="width:80px;overflow: hidden;">
                        			<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;" @click="delcg(id)">删除</p>
									<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;" @click="examine">审核</p>
									<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;" @click="cancel">弃审</p>
									<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;" @click="success">完成</p>
									<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;" @click="seebordercode">订单条码</p>
									<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;" @click="allsign">全部签收</p>
									<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;" @click="onebyone">明细签收</p>
									<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;" @click="Logistics">物流登记</p>
								</div>
							</Poptip>
						</div>

					<!--条码按钮-->
						<div class="borderbtn" v-if="bordercodeisshow" style="position:absolute;top:0;right:-80px;background:#fff;width:400px;">
							<Checkbox v-model="alltrue" @on-change="allcheckbordercode">全部选择</Checkbox>
							<div class="btns" style="display:inline-block">全部打印</div>
							<div class="btns" style="display:inline-block">打印选中</div>
						</div>
					</div>
				</div>
			</Col>
		</div>
		<div class="cheng"></div>

			<!--左边销售列表-->
	
				<!--左边内容-->
				<div class="left-content">
					<div class="con-list" v-for="item in Allpo" @click="getcginfo(item.id)">
						<p class="list-title">{{item.recordNo}}</p>
						<p class="txt" style="margin-top:10px;">{{item.deliverWarehouseName}}</p>
						<p class="txt">{{item.price}}</p>
						<span class="date">{{item.createTime}}</span>
					</div>
				</div> 
				
	
			<!--右边保存与详情明细-->
	
			<!--保存-->
			<div class="add-right">
				<div class="right-content" ref="divsave">
					<!--销售明细-->
					<div v-if="addText">
						<Row>
							<Col span="12">
								<div class="list-box">
									<span>销售订单 : </span>
									<Input v-model="pono" placeholder="不填自动生成" ></Input>
								</div>
								<div class="list-box">
									<span>发票状态 : </span>
									<Select >
										<Option </Option>
									</Select>
								</div>
								<div class="list-box">
									<span>订单日期 : </span>
									<Input v-model="poDate" placeholder="没有自动生成" ></Input>
									<!--  <TimePicker format="HH:mm" placeholder="请选择时间" style="width:100%" @on-change="setorderdate"></TimePicker> -->
								</div>
								<div class="list-box">
									<span>客户联系人 : </span>
									<Select v-model="model2" @on-change="getwarhouse" >
										<Option v-for="item in allwarehouseNAMEID"  :value="item.value" :key="item.value">{{ item.name }}</Option>
									</Select>
								</div>
									<!-- <div class="list-box">
										<span>手机号 : </span>
										<Input v-model="deliverMobile" placeholder="请输入收货人手机号" ></Input>
									</div>
									<div class="list-box">
										<span>发运数量 : </span>
										<Input v-model="deliveryQty" placeholder="发运数量" ></Input>
									</div> -->
								</Col>

								<Col span="12">
								<div class="list-box">
									<span>销售订单状态 : </span>
									<Select  style="100%" >
										<Option</Option>
									</Select>
									
								</div>
								<div class="list-box" @click="alertchModal">
									<span>供应商(0/{{allgyslength}}) : </span>
									<Input  v-model="supplierName" placeholder="请选择供应商名称" ></Input>
										<!-- <Select v-model="supplierName" style="100%" placeholder="请选择供应商名称">
									        <Option :value="supplierName">{{supplierName}}</Option>
									    </Select> -->
									    
									</div>
									<div class="list-box">
										<span>参考单号 : </span>
										<Input  placeholder="REFG986567" ></Input>
									</div>
									<div class="list-box">
										<span style="text-align:left">预期到货日期 : </span>
										<DatePicker type="date" placeholder="请选择时间"style="width:100%" @on-change="shdate"></DatePicker>
										
									</div>
									<!-- <div class="list-box">
										<span>电话 : </span>
										<Input v-model="deliverTel" placeholder="请输入电话" ></Input>
									</div> -->
									
								</Col>
							</Row>
							<!--发货收货地址-->
							<div class="address">
								<div style="width:100%">
									
									<div class="list-box" style="margin:0;">
										<span style="margin-left:10px">账单地址 : </span>
										<span style="text-align:right;width:100%">添加新地址</span>
									</div>
									<div class="list-box" style="margin:0;" >
										<div style="width:100%;margin:0 0 0 20px"><Input v-model="address" placeholder="请输入账单地址"></Input></div>
									</div>
								</div>
								
								<!-- <div class="tb"><img src="../../../../static/img/tb.png" alt=""></div> -->
								<div style="width:100%">
									<div class="list-box" style="margin:0;">
										<span style="margin-left:10px">收货地址 : </span>
										<span style="text-align:right;width:100%">添加新地址</span>
									</div>
									<div class="list-box" style="margin:0 0 0 10px">
										<div style="width:100%;"><Input v-model="deliverAddress" placeholder="请输入收货地址" class="getaddress"></Input></div>
									</div>
								</div>
							</div>
							
							<div class="address">
								<div class="list-box" style="width:100%">
									<span>销售类型 : </span>
									<Select >
										<Option</Option>
									</Select>
								</div>
								<div class="list-box" style="width:100%">
									<span>发运方式 : </span>
									<Select v-model="model1" @on-change="getlogistics">
										<Option v-for="item in logisticstype" :value="item.value" :key="item.value">{{ item.value }}</Option>
										
									</Select>
								</div>
							</div>
							<!--存货表格-->
							<Table size="small" :highlight-row="true" border :columns="cunhuo" :data="cunhuodata" @on-row-click="clickchrow"></Table>
							<div class="list-box">
								
								<span>备注信息 : </span>
								<Input v-model="remark" type="textarea" placeholder="请输入您的备内容" class="getaddress" :min-row="6"></Input>
							</div>

						</div>
					</div>
					<div class="right-content" ref="edit">
						<!--修改-->
						<div v-if="!addText" >
							<Row>
								<Col span="12">
								<div class="list-box">
									<span>销售订单2 : </span>
									<Input v-model="pono" placeholder="没有自动生成" ></Input>
								</div>
								<div class="list-box">
									<span>发票状态 : </span>
									<Select  >
										<Option</Option>
									</Select>
								</div>
								<div class="list-box">
									<span>订单日期 : </span>
									<Input v-model="poDate" placeholder="没有自动生成" ></Input>
									<!--  <TimePicker format="HH:mm" placeholder="请选择时间" style="width:100%" @on-change="setorderdate"></TimePicker> -->
								</div>
								<div class="list-box">
									<span>交付对象 : </span>
									<Select v-model="model2" @on-change="getwarhouse" >
										<Option v-for="item in allwarehouseNAMEID"  :value="item.value" :key="item.value">{{ item.name }}</Option>
									</Select>
								</div>
								<!--收货人手机号-->
									<!-- <div class="list-box">
										<span>手机号 : </span>
										<Input v-model="deliverMobile" placeholder="没有自动生成" ></Input>
									</div> -->
								</Col>

								<Col span="12">
								<div class="list-box">
									<span>销售订单状态 : </span>
									<Select  style="100%" disabled>
										<Option</Option>
									</Select>
									
								</div>
								<div class="list-box" @click="alertchModal">
									<span>销售客户(0/{{allgyslength}}) : </span>
									<Input  v-model="supplierName" placeholder="请选择供应商名称" ></Input>
										<!-- <Select v-model="supplierName" style="100%" placeholder="请选择供应商名称">
									        <Option :value="supplierName">{{supplierName}}</Option>
									    </Select> -->
									    
									</div>
									<div class="list-box">
										<span>参考单号 : </span>
										<Input  placeholder="REFG986567" ></Input>
									</div>
									<div class="list-box">
										<span style="text-align:left">预期到货日期 : </span>
										
										<DatePicker type="date" placeholder="请选择时间"style="width:100%" @on-change="shdate"></DatePicker>
									</div>
									<!-- <div class="list-box">
										<span>电话 : </span>
										<Input v-model="deliverTel" placeholder="没有自动生成" ></Input>
									</div> -->
									
								</Col>
							</Row>
							<!--发货收货地址-->
							<div class="address">
								<div style="width:100%">
									
									<div class="list-box" style="margin:0;">
										<span style="margin-left:10px">账单地址 : </span>
										<span style="text-align:right;width:100%">添加新地址</span>
									</div>
									<div class="list-box" style="margin:0;" >
										<div style="width:100%;margin:0 0 0 20px"><Input v-model="address" placeholder="请输入账单地址"></Input></div>
									</div>
								</div>
								
								<!-- <div class="tb"><img src="../../../../static/img/tb.png" alt=""></div> -->
								<div style="width:100%">
									<div class="list-box" style="margin:0;">
										<span style="margin-left:10px">收货地址 : </span>
										<span style="text-align:right;width:100%">添加新地址</span>
									</div>
									<div class="list-box" style="margin:0 0 0 10px">
										<div style="width:100%;"><Input v-model="deliverAddress" placeholder="请输入收货地址" class="getaddress"></Input></div>
									</div>
								</div>
							</div>
							
							<div class="address">
								<div class="list-box" style="width:100%">
									<span>销售类型 : </span>
									<Select >
										<Option</Option>
									</Select>
								</div>
								<div class="list-box" style="width:100%">
									<span>发运方式 : </span>
									<Select v-model="model1" @on-change="getlogistics">
										<Option v-for="item in logisticstype" :value="item.value" :key="item.value">{{ item.value }}</Option>
										
									</Select>
								</div>
							</div>
							<!--商品表格-->
							<Table size="small" :highlight-row="true" border :columns="cunhuo" :data="cunhuodata" @on-row-click="clickchrow"></Table>
							<div class="list-box">
								
								<span>备注信息 : </span>
								<Input v-model="remark" type="textarea" placeholder="请输入您的备内容" class="getaddress"></Input>
							</div>

						</div>
					</div>	
					<!--详情明细订单页面-->
					<div class="right-content right-detail" ref="detail" style="display:none">
						<div >
							<!--订单详情页面cgxqInfo-->
							<div class="detail-top">
								<table class="cgtable">
									<tr>
										<th>销售订单：</th>
										<th>销售订单状态</th>
										<th>发票状态：</th>
										<th>客户联系人(0/{{cgxqInfo.length}})：</th>
										<th>账单地址：</th>
									</tr>
									<tr>
										<td>{{cgxqInfo.recordNo}}</td>
										<td>{{cgxqInfo.statusDesc}}</td>
										<td>{{cgxqInfo.statusDesc}}</td>
										<td>{{cgxqInfo.supplierName}}</td>
										<td>{{cgxqInfo.deliverAddress}}</td>
									</tr>
								</table>
								<table class="cgtable">
									<tr>
										<th>订单日期：</th>
										<th>参考单号：</th>
										<th>交付对象：</th>
										<th>预期收货日期：</th>
										<th>收货地址：</th>
									</tr>
									<tr>
										<td>{{cgxqInfo.poDate}}</td>
										<td></td>
										<td>{{cgxqInfo.deliverWarehouseName}}</td>
										<td>{{cgxqInfo.modifyTime}}</td>
										<td>{{cgxqInfo.address}}</td>
									</tr>
								</table>
								<!--**********下方数据***********-->
								
							</div>
							<div class="detail-bottom">
								<div class="detail-title-mark">
									<div v-for="(item,index) in titles" class="detail-title" @click="addborder(index)" :class="{bor:index==num2}">
										{{item}}
									</div>
								</div>
								<!--明细-->
								<div v-if="num2==0" class="detail-public">
									<Table size="small" border height="200"  :columns="cgListInfoKey" :data="cgListInfo"></Table>
								</div>
								<!--收货记录-->
								<div v-if="num2==1" class="detail-public">
									
									<Table size="small" border height="200"  :columns="chListjl" :data="chreceipt"></Table>
								</div>
								<!--附件-->
								<!-- <div v-if="num2==2" class="detail-public">2</div> -->
								<!--记录-->
								<div v-if="num2==2" class="detail-public">
									<Table size="small" border height="200"  :columns="jl" :data="jldata"></Table>
								</div>
								<!--备注-->
								<div v-if="num2==3" class="detail-public">
									<Input v-model="remark" type="textarea" :rows="4"></Input>

								</div>
								
							</div>
						</div>
						
					</div>	
					<!--订单条码-->
					<div v-if="bordercodeisshow" class="flexbordercode" >
						<span v-if="bordercode.length==0">无条码</span>
						<div class="bordercode" v-for="(item,index) in bordercode" @click="addbordercolor(index)" :class="{bordercodecolor:isshowborder,b:borderNum==index}">
							<span style="display:inline-block;margin-right:10px;margin-bottom:10px">{{item.skucode}}</span>
							<span>{{item.skuTypeId}}</span>
							<div>
								<img src="" alt="" class="borderimg">
							</div>
							<div class="alltotal">
								<span>标签数量</span>
								<InputNumber size="small" :min="1" v-model="item.qty"></InputNumber>
							</div>
							<span class="bordercodeicon" v-if="isshowborder"></span>
							<span class="bordercodeicon" v-if="borderNum==index"></span>
						</div>
						<div style="clear:both"></div>
					</div>		
				</div>				
	
		<Modal v-model="alertch" width="660px">
			<p slot="header" style="height:30px;line-height:30px">
				<!-- <img src="../../../../static/img/chsearch.png" alt="" width="30" height="30" style="vertical-align:middle"> -->
				<span>往来单位参照</span>
			</p>
			<div style="text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
				<Input v-model="remark"  placeholder="单位编码、名称、助记码、单位电话、联系人、分管部门" style="padding:2px 0"></Input>
				<span class="filter">过滤</span>
				
				
				<!-- <img src="../../../../static/img/chreload.png" alt="" width="20" height="20" style="position: relative;top: 6px;left:-36px"> -->
				<span style="width:100px;margin-left:-50px;color:#9AC293" @click="reloadgys()">刷新数据</span>
				
			</div>
			<div slot="footer">
				<!--供应商表格-->
				<Table size="small" border height="200"  :columns="gyskey" :data="gysdata" @on-row-click="gysrow">
				</Table>
				<!--分页-->
		           <!--  <div class="page-box" style="text-align:left">
					 <Page :total="unittotal" :pageSize='unitpageSize' show-sizer @on-change="getunitData" @on-page-size-change="changeunitPageSize"></Page>
					</div> -->
					<div style="display:flex;justify-content: space-between;margin-top:20px">
						<div class="btns" style="background:#00A7F5;color:#fff">添加销售客户</div>
						<div>
							<div class="btns" style="display:inline-block;background:#ACACAC;border:none;color:#fff">取消</div>
							<div class="btns" style="display:inline-block;background:#00A7F5;color:#fff" @click="makegys">选入</div>
						</div>
					</div>
				</div>
			</Modal>
			<!--选择商品-->
			<Modal v-model="goodsinshow" width="660px">
				<p slot="header" style="height:30px;line-height:30px">
					<!-- <img src="../../../../static/img/chsearch.png" alt="" width="30" height="30" style="vertical-align:middle"> -->
					<span>商品列别参照</span>
				</p>
				<div style="text-align:center;width:100%;height:35px;line-height:35px;display:flex;justify-content: space-between">
					<Input v-model="remark"  placeholder="单位编码、名称、助记码、单位电话、联系人、分管部门" style="padding:2px 0"></Input>
					<span class="filter">过滤</span>
					<!-- <img src="../../../../static/img/chreload.png" alt="" width="20" height="20" style="position: relative;top: 6px;left:-36px"> -->
					<span style="width:100px;margin-left:-50px;color:#9AC293" @click="reloadgys()">刷新数据</span>
				</div>
				<!--商品数据-->
				<div slot="footer">
					<Table size="small" border width="100%" height="200"  :columns="goodskey" :data="goods" @on-row-click="clickgoodsrow">
					</Table>
		            <!-- <div class="page-box" style="text-align:left">
					 <Page :total="unittotal" :pageSize='unitpageSize' show-sizer @on-change="getunitData" @on-page-size-change="changeunitPageSize"></Page>
					</div> -->
					<div style="display:flex;justify-content: space-between;margin-top:20px">
						<div class="btns" style="background:#00A7F5;color:#fff">添加商品</div>
						<div>
							<div class="btns" style="display:inline-block;background:#ACACAC;border:none;color:#fff">取消</div>
							<div class="btns" style="display:inline-block;background:#00A7F5;color:#fff;cursor:default" @click="makegoods">选入</div>
						</div>
					</div>
				</div>
			</Modal>
	</div>
</template>
<script>
export default {

		data() {
			return {
				
				bordercode:[],
				borderNum:0,
				isshowborder:false,
				total:1,
				pageSize:1,
				unittotal:1,
				unitpageSize:1,
				num: 1, //判断基本信息 切换的样式
				num2:0,
				addNewUnits:"",
				orderText:"新增销售订单",
				addText:true,
				// cgbordercode: false,  //供应商详细信息
				alertch:false,
				bordercodeisshow:false,
				editshow:true,
				alltrue:false,//选中全部条码
				//运送方式
				logisticstype:[
				{
					value: '顺丰',
					label: '顺丰'
				},
				{
					value: '韵达',
					label: '韵达'
				},
				{
					value: '圆通',
					label: '圆通'
				}
				],
				//发票状态
				fpstatus: [
				{
					value: '不开发票',
					label: '不开发票'
				},
				{
					value: '开发票',
					label: '开发票'
				}
				],
				

				model1: '',
				model2: '',
				columns: [
				{
					title: '订单编号',
					key: 'code'
				},
				{
					title: '参考号',
					key: 'ckhao'
				},
				{
					title: '日期',
					key: 'date'
				},
				{
					title: '金额',
					key: 'price'
				},
				{
					title: '状态',
					key: 'status'
				}
				],
				//销售订单明细
				cgListInfoKey:[
				{
					title:"产品/描述",
					
					key:"id"
				},
				{
					title:"数量",
					
					key:"qty"
				},
				{
					title:"价格",
					
					key:"costPrice"
				},
				{
					title:"仓库",
					
					key:"warehouseName"
				},
				{
					title:"小计",
					
					key:'totalP'
				},
				{
					title:"备注",
					
					key:"remark"
				}
				],
				//收货记录
				chListjl:[
				{
					title:"编号",
					key:"poId"
				},
				{
					title:"产品/描述",
					key:"skuTypeDesc"
				},
				{
					title:"数量",
					key:"qty"
				},
				{
					title:"已收数量",
					key:"deliveryQty"
				},
				{
					title:"收货仓库",
					key:"warehouseName"
				},
				{
					title:"收货人",
					key:"deliverName"
				},
				{
					title:"收货时间",
					key:"signDate"
				},
				{
					title:"状态",
					key:"statusDesc"
				},
				],
				//收货记录数据
				chreceipt:[],
				//存货的数组数据
				cunhuodata: [
				{
					skuName:'选择商品'
				}
				],
				//操作存货 新增时
				cunhuo:[
				{
					type: 'index',
					width: 60,
					align: 'center'

				},
				{
					title: '操作',
					key: 'action',
					width: 100,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('div', {
								style: {
									float: 'left',
									marginRight: '5px'
								},
								on: {
									click: (e) => {
											//点击加号
											e.stopPropagation()
											// this.cunhuodata.push({})
										}
									}
								}, [
								h('img', {
									domProps: {
										src: 'http://img.zsydian.com/icon/add.png',
										style: "width:20px;height:20px"
									},
								})
								]),
							h('div', {
								style: {
									float: 'left',
									marginRight: '5px'

								},
								on: {
									click: () => {
											// this.delGoods(params.row.id);
										}
									}
								}, [
								h('img', {
									domProps: {
										src: 'http://img.zsydian.com/icon/tabledel.png',
										style: "width:20px;height:20px;"
									},
									on:{
										click:(e)=>{
											e.stopPropagation()
												//删除行
												//////console.log(params)
												this.remove(params.index)
												////console.log(this.detailVoList)
											}
										}

									})
								])
							]);
					}
				},
				{
					title:"存货名称",
					width: 130,
					key:"skuName",
					ellipsis:"true",
					align: 'left'
				},
				{
					title:"数量",
					width: 100,
					key:"volume",
					render:(h,parmas)=>{
						return h('input',{
							style:{
								display:"block",
								width:"97px",
								height:"40px",
								marginLeft:"-17px",
								border:"none",
								background:"transparent"
							},
							attrs:{

								value:'输入数量'
							},
							on:{
								'click':(e)=>{
									e.stopPropagation()
								},
								"change":(e)=>{
									
										// this.detailVoList.qty=e.target.value
										this.detailVoList.forEach((item)=>{
											
											item.qty+=e.target.value
											
											
										})
										
									}
								}
							})
					}
				},
				{
					title:"货号",
					width: 100,
					key:"skucode"
				},
				{
					title:"存货编码",
					width: 100,
					key:"barCode"
				},
				{
					title:"规格型号",
					width: 100,
					key:"skuCode"
				},
				{
					title:"颜色",
					width: 100,
					key:""
				},
				{
					title:"单位",
					width: 100,
					key:"unit"
				},
				{
					title:"仓库",
					width: 100,
					key:"warehouseName"
				},
				
				{
					title:"单价",
					width: 100,
					key:"wholePrice"
				},
				{
					title:"销售金额",
					width: 100,
					key:""
				},
				{
					title:"备注",
					width: 100,
					key:"remark"
				},
				{
					title:"预期交货日期",
					width: 100,
					key:""
				}
				],

                //弹出框供应商table
                gyskey:[
                {
                	title:"单位名称",
                	width:100,
                	key:"name"
                },
                {
                	title:"单位编码",
                	width:100,
                	key:"code"
                },
                {
                	title:"单位分类",
                	width:100,
                	key:""
                },
                {
                	title:"助记码",
                	width:100,
                	key:""
                },
                {
                	title:"分管单位",
                	width:100,
                	key:""
                },
                {
                	title:"分管员",
                	width:100,
                	key:""
                },
                {
                	title:"单位电话",
                	width:100,
                	key:"tel"
                },
                {
                	title:"首要联系人",
                	width:100,
                	key:""
                },
                ],
                //弹出框商品data
                goodskey:[
                {
                	title:"商品名称",
                	width:100,
                	ellipsis:'true',
                	key:"skuName"
                },
                {
                	title: '存货编号',
                	key:'id',
                	width:100,
                	align: 'center'
                },
                {
                	title: '存货地址',
                	ellipsis:'true',
                	width:100,
                	key:'produce',
                	align: 'center'
                },
                {
                	title: '存货名称',
                	ellipsis:'true',
                	key:"skuName",

                	width:100,
                	align: 'center'
                },
                {
                	title: '规格型号',
                	key:'skuCode',

                	width:100,
                	align: 'center'
                },
                {
                	title: '存货分类',
                	key:'type',

                	width:100,
                	align: 'center'
                },
                {
                	title: '计量单位',
                	key:'unit',

                	width:100,
                	align: 'center'
                },
                {
                	title: '参考售价',
                	key:'costPrice',

                	width:100,
                	align: 'center'
                },
                {
                	title: '零售价',
                	key:'wholePrice',

                	width:100,
                	align: 'center'
                }
                ],
                //记录
                jl:[

                ],
                //记录数据
                jldata:[],
                titles:["明细","收货记录","记录","备注"],
                id:"",
				// data:[],
				userList:[],//联系人列表
				Allpo: [], //销售列表
				cgListInfo:[],//销售订单明细列表
				cgxqInfo:{},//销售订单详情
				goods:[],//商品列表
				poDate:"",//订单日期
				recordNo:"",//单号
				poId :"",//销售编号 ,
				pono :"", //销售单号 ,
				deliveryQty:"",//已发运数量
				//供应商信息
				deliverWarehouseName:'',//供应商仓库名
		        deliverWarehouseCode:'',//供应商仓库名编号
		        deliverWarehouseId:'',//供应商仓库名id
				gysdata:[],//供应商列表
				supplierCode:"",//供应商编号
				supplierId:"",//供应商id
				supplierName:"",//供应商名称
				tel:"",//供应商电话
				phone:"",//供应商手机
				totalAmount:"",//总货值 
				fax:"",//供应商传真
				person:"",//供应商联系人 
  				email:"",//联系人邮箱
  				address:"",//联系人地址
  				//仓库信息
  				allwarehouse:[],//所有仓库
  				allwarehouseNAMEID:[],
  				warehouseId:"",//仓库id
  				warehouseCode:"",//仓库编号
  				warehouseName:"",//仓库名
				//收货方
				deliverName:"",//收货方名称
				deliverTel:"",//收货人电话
				deliverMobile:"",//收货人手机
				deliverAddress:"",//收货人地址
				//销售订单明细
				detailVoList:[],
				skuId:"",//商品编号 ,
				skuTypeId:"",//属性编号 ,
				skuTypeDesc:"", //属性描述 ,
				costPrice:"",// 销售价格 ,
				skucode:"",//商品编码
				logistics:'',//物流公司
				logisticsNo:'',//物流编号
				
				totalQty:"",//销售的总数量
				remark:"",//备注 ,
				uid: this.$store.state.common.token,
				qty:"",
				allgyslength:0,
				goodsinshow:false,
				goodsrow:{},//弹框获取商品一行数据
				goodsId:""
			}
		},
		methods: {
			
			//点击保存新建基本信息
			saveCgInfo: function() {
				////console.log(this.warehouseName)
					//保存新建
					let arr = Object.keys(this.goodsrow)//判断是否选了商品
					if(this.allgyslength==0){
						this.$Message.error('供应商不能空！');
					}else if(this.allwarehouse.length==0){
						this.$Message.error('交付对象不能空！');
					}else if(arr.length == 0){
						this.$Message.error('商品不能空！');
					}else if(this.address==''){
						this.$Message.error('账单地址不能为空！');
					}else if(this.address==''){
						this.$Message.error('账单地址不能为空！');
					}
					else{
						
						this.axios.post('/po/add?uid=' + this.uid, {
							
							address:this.address,//发货人地址
							deliverName:this.deliverName,//收货方名称
							deliverAddress:this.deliverAddress,
							deliverTel:this.deliverTel,//收货人电话
							deliverMobile:this.deliverMobile,//收货人手机
	            			detailVoList:this.detailVoList,//销售明细
	            			//仓库
		            		deliverWarehouseName:this.deliverWarehouseName,//仓库名
		            		deliverWarehouseCode:this.deliverWarehouseCode,//仓库编号
		            		deliverWarehouseId:this.deliverWarehouseId,//仓库名id

		            		supplierName:this.supplierName,//供应商名称
			            	supplierId:this.supplierId,//供应商id
							recordNo:this.recordNo,//单号
							// totalQty:this.totalQty,//销售数量
							deliveryQty:this.deliveryQty,//已发运数量
							logistics:this.logistics,//物流公司
							logisticsNo:this.logisticsNo,//物流编号
							tel:this.tel,
							poDate:this.poDate,//订单日期
							recordNo:this.recordNo,
						}).then((res) => {
							if(res.data.status=='200'){
								this.$Notice.success({
									title: '新建基本信息',
									desc: 'this.$t('public.SaveSuccess'),//'
								});
								this.getcgList()
								
							this.address=''//发货人地址
							this.deliverName=''//收货方名称
							this.deliverAddress=''
							this.deliverTel=''//收货人电话
							this.deliverMobile=''//收货人手机
							this.detailVoList=[]
	            			//仓库
		            		this.deliverWarehouseName=''//仓库名
		            		this.deliverWarehouseCode=''//仓库名编号
		            		this.deliverWarehouseId=''//仓库名id

		            		this.supplierName=''//供应商名称
			            	this.supplierId=''//供应商id
							this.recordNo=''//单号
							this.totalQty=''//销售数量
							this.deliveryQty=''//已发运数量
							this.logistics=''//物流公司
							this.logisticsNo=''//物流编号
							this.tel=''
							this.poDate=''//订单日期
							this.recordNo=''
							// this.addUnit()
						}else{
							this.$Message.error(res.data.errorMessage);
						}
					})
					}
				},
			// //设置收货日期
			shdate(date){
				// this.detailVoList = date
			},
			//弹出框，获取往来单位列表--供应商
			alertchModal(){
				this.alertch = true;
				this.getAllgysLists()
			},
			//弹框获取所有供应商列表
			getAllgysLists(){
				this.axios.get('/partner/query?uid=' + this.uid).then((res) => {
					
					let data = res.data;
					console.log(data.rows)
					if(res.data.status == '200') {

						this.gysdata = data.rows;
						this.allgyslength = data.rows.length
						this.unitpageSize = data.pageSize;
						this.unittotal = data.total;
					} else {
						this.$Message.error(res.data.errorMessage);
					}
				})
			},
			//刷新 获取往来单位列表--供应商
			reloadgys(){
				this.getAllgysLists()
			},
			//选择供应商弹框的确认按钮
			makegys(){
				this.alertch = false
			},
			//供应商弹框出现后点击表格行数据
			gysrow(data,index){
				//////console.log(data)
				this.supplierName = data.name
				this.supplierCode = data.code
				this.supplierId = data.id
				this.tel=data.tel//供应商电话
				this.phone=data.phone//供应商手机
				this.totalAmount=data.totalAmount//总货值 
				this.fax=data.fax//供应商传真
				this.person=data.person//供应商联系人 
  				this.email=data.email//联系人邮箱
  				this.address=data.address//联系人地址
  				
  			},
  			
			//获取全部销售订单
			getcgList: function() {
				this.axios.get('/po/query?uid=' + this.uid).then((res) => {
					let data = res.data;
					//////console.log(data.rows)
					if(res.data.status == '200') {
						
						this.Allpo = data.rows;

						this.Allpo.forEach((x)=>{
							x.createTime=new Date(x.createTime).toLocaleDateString()
						})
						this.pageSize = data.pageSize;
						this.total = data.total;
					} else {
						this.$Message.error(res.data.errorMessage);
					}
				})
			},
			
			//单击存货表格一行弹出商品弹出框，并获取商品数据
			clickchrow(data,index){
				this.goodsinshow = true;
				this.axios.get('/sku/query?uid='+this.uid).then((res)=>{
					this.goods= res.data.rows
				})
			},
			//商品弹框点击一行获取数据
			clickgoodsrow(data){
				this.goodsrow = data
				////console.log(data)
			},
			//选择商品弹框的确认按钮
			makegoods(){
				this.goodsinshow = false
				let goodsarr={
					skuName:this.goodsrow.skuName,
					skuId:this.goodsrow.id,
					skuTypeId:this.goodsrow.skuTypeId,
					skuTypeDesc:this.goodsrow.skuTypeDesc,
					qty:this.qty,
					price:this.goodsrow.price,
					costPrice:this.goodsrow.costPrice,
					skucode:this.goodsrow.skuCode,
					unit:this.goodsrow.unit,
					wholePrice:this.goodsrow.wholePrice,
					warehouseName:this.goodsrow.warehouseName
				}
				this.cunhuodata.push(goodsarr)
				this.detailVoList.push(goodsarr)
				//////console.log(this.detailVoList)
			},
			//删除一行已选定的商品数据
			remove (index) {
				this.cunhuodata.splice(index, 1);
				this.detailVoList.splice(index, 1);
			},
			//获取所有仓库
			getallwarhose(){
				this.axios.get('/warehouse/query?uid='+this.uid).then((res)=>{
					this.allwarehouse=res.data.rows
					////console.log(res.data.rows)
					this.allwarehouse.forEach((value,index)=>{
					
						//选择仓库时的中转变量对象
						let warehouseNAME ={
							value:this.allwarehouse[index].id,//仓库ID
							name:this.allwarehouse[index].name,//名称
							code:this.allwarehouse[index].code,//code
							person:this.allwarehouse[index].person,//联系人
							phone:this.allwarehouse[index].phone,//手机号
							address:this.allwarehouse[index].address//地址

						}
						//提交给交付对象下拉框
						this.allwarehouseNAMEID.push(warehouseNAME)
					})
					
				})
			},
			//选择一条仓库
			getwarhouse(value){
				this.model2 = value
				//依据id选择相应仓库
				for(let i=0;i<this.allwarehouseNAMEID.length;i++){
					if(value==this.allwarehouseNAMEID[i].value){
						this.deliverWarehouseId = value
						this.deliverWarehouseName = this.allwarehouseNAMEID[i].name
						this.deliverWarehouseCode = this.allwarehouseNAMEID[i].code
						this.deliverName = this.allwarehouseNAMEID[i].person
						this.deliverMobile = this.allwarehouseNAMEID[i].phone
						this.deliverAddress = this.allwarehouseNAMEID[i].address
					}
				}

			},
			//点击修改
			edit(){
				this.$refs.divsave.style.display="block"//保存按钮
				this.$refs.detail.style.display="none"//详情页面
				this.$refs.edit.style.display="block"//修改
				this.addText = false
				this.editshow = false
				this.orderText="修改订单"
				//获取销售订单详情上方
				this.axios.get('/po/get/'+this.id+'?uid='+this.uid).then((res)=>{
					//////console.log(res.data)
					if(res.data.status==200){
						let data = res.data.rows
						
						this.model2=data.deliverWarehouseName
						this.poDate = data.poDate
						this.supplierName = data.supplierName
						this.supplierId = data.supplierId
						this.logistics = data.logistics
						this.logisticsNo = data.logisticsNo
						this.deliverWarehouseName = data.deliverWarehouseName
						this.deliverWarehouseId = data.deliverWarehouseId
						this.deliverAddress = data.deliverAddress
						this.address = data.address
						
						//////console.log( res.data.rows)
						
					}else{
						this.$Message.error(res.data.errorMessage);
					}
				})
				//获取销售订单明细下方
				this.axios.get('/po/listDetail?id='+this.id+'&uid='+this.uid).then((res)=>{
					
					if(res.data.status==200){
						let data = res.data.rows
						this.cunhuodata = this.detailVoList = data
						
						
						//console.log(this.cunhuodata)
						// this.cunhuodata.forEach((item)=>{
						// 	totalP = item.price*item.qty
						// 	item['totalP'] = totalP//添加一个属性总价
						// })
					}else{
						this.$Message.error(res.data.errorMessage);
					}
				})

			},
			//保存修改
			saveEdit(){
				//console.log(this.detailVoList)
				this.axios.put('po/update?uid='+this.uid,{
					id:this.id,
							address:this.address,//发货人地址
							deliverName:this.deliverName,//收货方名称
							deliverAddress:this.deliverAddress,
							deliverTel:this.deliverTel,//收货人电话
							deliverMobile:this.deliverMobile,//收货人手机
							detailVoList:this.detailVoList,
	            			//仓库
		            		deliverWarehouseName:this.deliverWarehouseName,//仓库名
		            		deliverWarehouseCode:this.deliverWarehouseCode,//仓库名编号
		            		deliverWarehouseId:this.deliverWarehouseId,//仓库名id

		            		supplierName:this.supplierName,//供应商名称
			            	supplierId:this.supplierId,//供应商id
							recordNo:this.recordNo,//单号
							totalQty:this.totalQty,//销售数量
							deliveryQty:this.deliveryQty,//已发运数量
							logistics:this.logistics,//物流公司
							logisticsNo:this.logisticsNo,//物流编号
							tel:this.tel,
							poDate:this.poDate,//订单日期
							recordNo:this.recordNo,
						}).then((res)=>{
							
							if(res.data.status=='200'){
								//console.log(this.detailVoList)
								this.$Notice.success({
									title: '修改信息',
									desc: '修改信息成功'
								});
								this.getcgList()
								this.address=''//发货人地址
								this.deliverName=''//收货方名称
								this.deliverAddress=''
								this.deliverTel=''//收货人电话
								this.deliverMobile=''//收货人手机
								this.detailVoList=[]
		            			//仓库
			            		this.deliverWarehouseName=''//仓库名
			            		this.deliverWarehouseCode=''//仓库名编号
			            		this.deliverWarehouseId=''//仓库名id

			            		this.supplierName=''//供应商名称
				            	this.supplierId=''//供应商id
								this.recordNo=''//单号
								this.totalQty=''//销售数量
								this.deliveryQty=''//已发运数量
								this.logistics=''//物流公司
								this.logisticsNo=''//物流编号
								this.tel=''
								this.poDate=''//订单日期
								this.recordNo=''
								this.cunhuodata=[{skuName:'选择商品'}]
								this.model2=""
								

							}else{
								this.$Message.error(res.data.errorMessage);
							}
						})
					},
			//双击获取订单详情
			getcginfo(id){
				this.id = id;//当前双击的ID
				let totalP;//添加总价变量
				//////console.log(this.id)
				this.addText = false
				this.bordercodeisshow=false
				this.editshow = true
				this.orderText = "销售明细"
				this.$refs.divsave.style.display="none"
				this.$refs.detail.style.display="block"
				this.$refs.edit.style.display="none"
				//获取销售订单详情上方
				this.axios.get('/so/get/'+this.id+'?uid='+this.uid).then((res)=>{
					//////console.log(res.data)
					if(res.data.status==200){
						this.cgxqInfo = res.data.rows
						console.log(res.data.rows)

					}else{
						this.$Message.error(res.data.errorMessage);
					}
				})
				//获取销售；；；；；；；；；；；；；；；；；；；；；；；；；；；；订单明细下方
				this.axios.get('/so/soDetailList?id='+this.id+'&uid='+this.uid).then((res)=>{
					
					if(res.data.status==200){
						////console.log(res.data.rows)
						this.cgListInfo = res.data.rows
						
						this.cgListInfo.forEach((item)=>{
							totalP = item.price*item.qty
							item['totalP'] = totalP//添加一个属性总价
						})
					}else{
						this.$Message.error(res.data.errorMessage);
					}
				})
				
			},
			//点击新建
			addUnit(){
				this.addText = true
				this.bordercodeisshow = false
				this.$refs.detail.style.display="none"
				this.orderText = "新增销售订单"
				//新增日期时间
				this.poDate = new Date().toLocaleString()
				
				this.$refs.divsave.style.display="block"
				this.address=''//发货人地址
				this.deliverName=''//收货方名称
				this.deliverAddress=''
				this.deliverTel=''//收货人电话
				this.deliverMobile=''//收货人手机
				this.detailVoList=[]
    			//仓库
        		this.deliverWarehouseName=''//供应商仓库名
        		this.deliverWarehouseCode=''//供应商仓库名编号
        		this.deliverWarehouseId=''//供应商仓库名id

        		this.supplierName=''//供应商名称
            	this.supplierId=''//供应商id
				this.recordNo=''//单号
				this.totalQty=''//销售数量
				this.deliveryQty=''//已发运数量
				this.logistics=''//物流公司
				this.logisticsNo=''//物流编号
				this.tel=''
				
				this.recordNo=''
				this.model2 = ""
				this.cunhuodata=[{skuName:'选择商品'}]
				this.getallwarhose()

			},
			//删除订单
			delcg(id){
				this.id = id
				////////////console.log(this.id)
				this.$Modal.confirm({
					title: this.$t('public.deleteInfo'),//'删除信息',
					content: '<p>Are you sure ?</p>',
					onOk: () => {
						this.axios.delete('/po/delete/'+id+'?uid='+this.uid).then((res)=>{
                        		//////////console.log(res)
                        		if(res.data.status==200){
                        			this.$Notice.success({
                        				title: '删除',
                        				desc: '删除成功'
                        			});
                        			this.getcgList()
                        		}else{
                        			this.$Message.error(res.data.errorMessage);
                        		}
                        	})
					},
					onCancel: () => {
						this.$Message.info(this.$t('public.deleteCancel'));
					}
				});
			},
			//审核订单
			examine(){
				this.axios.get('po/submit/'+this.id+'?uid='+this.uid).then((res)=>{
					if(res.status==200){
						this.$Message.success('已审核！')
					}else {
						this.$Message.error(res.data.errorMessage);
					}
				})
			},
			//弃审
			cancel(){
				this.axios.get('po/cancel/'+this.id+'?uid='+this.uid).then((res)=>{
					if(res.status==200){
						this.$Message.success('已弃审！')
					}else {
						this.$Message.error(res.data.errorMessage);
					}
				})
			},
			//完成
			success(){
				this.axios.get('po/confirm/'+this.id+'?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						this.$Message.success('已完成！')
					}else{
						this.$Message.error(res.data.errorMessage);
					}
				})
			},
			//全部签收
			allsign(){	
				this.axios.get('po/allsign/'+this.id+'?uid='+this.uid).then((res)=>{
					if(res.status==200){
						this.$Message.success('已全部签收！')
					}else {
						this.$Message.error(res.data.errorMessage);
					}
				})
			},
			//逐条签收
			onebyone(){
				this.axios.delete('po/sign?id='+this.id+'&uid='+this.uid).then((res)=>{
					////console.log(res.data)
				})
			},
			//物流登记
			Logistics(){
				this.axios.put('/po/logistics?'+this.id+'&logistics='+this.logistics+'&logisticsNo='+this.logisticsNo+'&uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						
					}else{
						this.$notify({
	                        title: '提示',
	                        message:  res.data.errorMessage,
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
					}
				})
			},
			//点击查看订单条码
			seebordercode(){
				this.cgbordercode = true//
				this.orderText ="销售订单"
				this.addText = true//显示新建页面
				this.$refs.detail.style.display="none"//详情页面
				this.bordercodeisshow = true//显示订单条码
				this.$refs.divsave.style.display="none"
				this.axios.get('/po/barcode?id='+this.id+'&uid='+this.uid).then(res=>{
					////////console.log(res.data)
					if(res.data.status==200){
						this.bordercode = res.data.rows
					}else{
						this.$notify({
	                        title: '提示',
	                        message:  res.data.errorMessage,
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
					}
				})
			},
			getlogistics(value){
				this.logistics = value
			},
			//添加下边框 请求收货记录
			addborder(index){
				this.num2 = index
				//index为1点击了收货记录
				if(index==1){
					this.axios.get('/po/receipt?id='+this.id+'&uid='+this.uid).then((res)=>{
						////////console.log(res.data)
						if(res.data.status==200){
							this.chreceipt = res.data.rows
						}else{
						this.$notify({
	                        title: '提示',
	                        message:  res.data.errorMessage,
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
						}
						
					})
				}
				//点击附件
				if(index==2){
					////////////console.log()
				}
				if(index==3){
					this.axios.get('po/log?id='+this.id).then((res)=>{
						this.jldata = res.data.rows
					})
				}
			},
			//点击条码添加边框
			addbordercolor(index){

				this.borderNum = index
			},
			//条码全部选中
			allcheckbordercode(){
				if(this.alltrue){
					this.isshowborder=true
				}else{
					this.isshowborder=false
				}
			},
			 //切换一条页
			 getunitData(current){
			 	this.axios.get('/po/query?offset='+current+'&uid='+this.uid).then((res)=>{
			 		
			 		this.Allpo = res.data.rows
			 	})
			 },
            //翻页
            changeunitPageSize(size){
            	this.unitpageSize = size
            }
        },
        mounted:function() {
        	this.$nextTick(()=>{

        		if(this.$route.query.id){
					this.id = this.$route.query.id//保存要修改的订单ID
					this.$refs.divsave.style.display="block"//保存按钮
					this.$refs.detail.style.display="none"//详情页面
					this.$refs.edit.style.display="block"//修改
					this.addText = false
					this.editshow = false
					this.orderText="修改订单"
					
					
				}else{
					//带入新增日期时间
					this.poDate = new Date().toLocaleDateString()
				}
				this.getcgList()//获取全部销售订单
				this.getallwarhose()//获取仓库列表
				
			})
        	
        }
    }
    </script>
  <style scoped>
    .add-box {
    	width: 100%;
    	height: auto;
    }
    
    .cheng{
    	width: 100%;
    	height: 60px;
    	/*margin-top: 10px;*/
    }
    .add-header{
    	width: 100%;
    	height: 60px;
    	z-index: 4;
    	background: #ffffff;
    	margin-bottom: 25px;
    	border-bottom:1px solid #ccc;
        /*display: flex;
        justify-content: space-between;*/
        position: fixed;
    }
    .top{
    	display:flex;
    	height:60px;
    	line-height: 60px;
    	position:fixed;
    	width:100%;
    	z-index:9999;
    	background: #fff;
    	border-bottom:1px solid #ccc;
    }
    
     
    .left-content::-webkit-scrollbar{
      width: 6px;
      height: 4px;
      background-color: #f5f5f5;
    }
    .left-content::-webkit-scrollbar-track{
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      border-radius: 10px;
      background-color: #f5f5f5;
    }
    .left-content::-webkit-scrollbar-thumb{
      /*width: 10px;*/
      height: 6px;
      border-radius: 18px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #ccc;
    }
    .right-content{
    	width: 100%;
    	height:100%;
    	padding:0 20px;
    	/*	margin-bottom:100px;*/
    }
    
    .list-box{
    	display: flex;
    	height:35px;
    	line-height: 35px;
    	margin:20px 10px;
    }
    .list-box span{
    	height:40px;
    	width:118px;
    	text-align: center;
    	padding:0 10px;
    }
    .list-box input.ivu-input{
    	height:40px!important;
    }

    .left-top{
    
    	
    }
    .left-top,.right-top{
    	display:flex;
    	height:40px;
    	line-height: 40px;
    	margin-top:6px;

    }
    .filter{
    	width: 80px;
    	height: 32px;
    	line-height: 33px;
    	border-top-right-radius: 6px;
    	border-bottom-right-radius: 6px;
    	margin-top: 2px;
    	position: relative;
    	left: -65px;
    	background: #00A7F5;
    	color: #fff;
    	border-left: 1px solid #ccc;
    }
   
    .detail-top{
		/*border:1px solid red;
		display:flex;
		flex-wrap: wrap;
		margin-bottom:20px;*/
	}
	.cgtable{
		width:100%;
		margin-top:20px;
		text-align: center
	}
	.cgtable th{
		width:200px;
		text-align: center;
		color:#2B8F8F;
	}
	.cgtable td{
		text-align: center
	}
	.detail-bottom{
		margin-top:20px;
	}
	.detail-title-mark{
		display:flex;
		justify-content: flex-start;
		border-bottom:1px solid #eee;
		margin-top:1px;
	}
	.detail-title{
		padding:10px 40px;

	}
	.detail-public{
		width:100%;
		margin:10px;
	}
	.bor{
		border-bottom:2px solid #086CA2;
	}

	.address{
		display:flex;
		justify-content: space-between;
		width:100%;
	}
	.address .tb{
		margin-top: 40px;
		margin-left: 20px;
		margin-right: 8px;
	}
	.right-detail{
		padding:10px;
	}

	.flexbordercode{
		
		width:100%;
		height:100%;
		display:flex;
		flex-wrap: wrap;
		align-items: center;
		padding:10px;
		margin-left:10px;
	}
	.bordercode{
		width:200px;
		height:140px;
		text-align: center;
		margin-right:10px;
		margin-top:10px;

		position:relative;
	}
	.bordercodecolor{
		border:1px solid red;
		background: linear-gradient(#eee,#fff);
	}
	.b{
		border:1px solid red;
		background: linear-gradient(#eee,#fff);
	}
	.bordercodeicon{
		position:absolute;
		top:5px;
		left:5px;
		width:16px;
		height:16px;
		/*background:url(../../../../static/img/duihao1.png);*/
	}
	.borderimg{
		max-height:100%;
		height:100px;
	}
	.changebutton p{
		width:100%;
		cursor:default;
	}
	.changebutton p:hover{
	}

	.ivu-poptip-inner .ivu-poptip-body{
		padding:0;
	}
	.add-box:after {
		content: '';
		display: block;
		clear: both;
	}
	
	
	.left-btn {
		height: 40px;
		float: right;
		margin-top: -40px;
	}
	
	.left-btn button {
		width: 70px;
		height: 40px;
		color: #fff;
		font-size: 14px;
		color: #ececec;
		border: 0;
		border-radius: 6px;
	}
	
	.ivu-icon-navicon {
		font-size: 20px;
	}
	
	
	
	.con-list {
		width: 100%;
		word-wrap:break-word;
		border-bottom:1px solid #eee;
	
		
		padding: 15px 20px;
	
		cursor: pointer;
		position:relative;
	}
	
	.con-list .date{
		position:absolute;
		right:10px;
		top:10px;
	}
	.con-list .list-title {
		color: #0d0d0d;
		font-size: 14px;
		margin-bottom: 10px;
	}
	
	.con-list button {
		width: auto;
		height: 25px;
		padding-left: 14px;
		padding-right: 14px;
		margin-right: 10px;
		color: #607d8b;
		font-size: 12px;
		border: 0;
		background: #ececec;
	}
	
	.con-list .txt {
		color: #585858;
		font-size: 12px;
	}
	
	.page-box {
		margin-top:10px;
	}
	 .left-content {
      height:100%;
      width:25%;
      overflow: hidden;
      margin-bottom:10px;
      border-right:1px solid #eee;
      position:fixed;

    }
	.add-right {
		width: 70%;
		height: 100%;
		margin-left:30%;
		background: #fff;
		position:relative;
		border-radius: 6px;
		margin-bottom:300px;
		position:relative;
	}
	
	/**激活的button样式**/
	
	.btnact {
		background: #086ca2 !important;
		color: #fff !important;
	}
	/***正常的样式***/
	
	.normal {
		background: #d9dbdc !important;
		color: #585858 !important;
	}

	</style>
