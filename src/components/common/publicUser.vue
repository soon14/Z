<template>
	<!--公用头部，左侧导航-->
	<div class="home-box" @mouseover='mouseOver($event)'>
		<div class='main-nav'>
			<nav class='nav-left'>
				<!--左侧一级菜单-->
				<div class="navList userImgclass"> <p><img :src="storelogo" width='45' height='45'></p></div>
				<div v-if="Datalenght>1">
					<li v-for='(item,index) in firstMenuData'  :key='index' class="navList navListbg" style="position:relative" >
						<ul @click='gotourlNav(item,index)' class='bgdiv' :class="{bgMenu:isselect==item.path}">
							<li >
								<img :src="item.activeIcon" width='18' height='18' class='icon-img' v-if='isselect==item.path'>
								<img :src="item.icon" width='18' height='18' class='icon-img' v-else>
							</li>
							<li style="width: 100%;text-align: left;">
								<span class="layout-text sildeTitle"  v-if='isselect==item.path'>
									<span class="sildeTitleSpan">{{item.displayName}}</span>
									<span class='sjx'></span>
								</span>
								<span class="layout-text layout-textActive" v-else>{{item.displayName}}</span>
							</li>
						</ul>
					</li>
				</div>	
				<!--只有一个菜单时显示-->
				<div v-else>
					<li v-for='(item,index) in secondMenu'  :key='index' class="navList navListbg" style="position:relative" >
						<ul @click='gotourlNav(item,index)' class='bgdiv' :class="{bgMenu:isselect==item.path}">
							<li style="width: 100%;text-align:center;">
								<span class="layout-text sildeTitleOne"  v-if='isselect==item.path'>
									<span class="sildeTitleSpan" style="margin-left:30px">{{item.name}}</span>
									<span class='sjx'></span>
								</span>
								<span class="layout-text layout-textActiveOne" v-else>{{item.name}}</span>
							</li>
						</ul>
					</li>
				</div>
			</nav>
			<div class='main-right'>
				<header class="layout-header">
					<div class="publicuser">
						<ul style="display:flex;justify-content: flex-end;">
							<li style="margin-right:35px;cursor:pointer;position:relative" @click='clickmsg'>
								<img src="http://img.zsydian.com/icon/head_msg.png" width='25' height='25' style='vertical-align: middle;'>
								<span class='Alltotal' v-if='dataList.length>0'>
								</span>
							</li>
							<li style="margin-right:27px;cursor:pointer">
								<a href="http://help.zsydian.com/" target='_blank'>
								<img src="http://img.zsydian.com/icon/head_help1.png" width='25' height='25' style='vertical-align: middle;' ></a>
							</li>
							<li style="margin-right:27px;margin-top: 4px;">
								<mu-button flat ref="button" @click="open = !open">
									<span>{{user.trueName}}</span>
								</mu-button>
								<mu-popover placement='bottom-start' :open.sync="open" :trigger="trigger" style='margin-top:10px;'>
										<mu-appbar color="#4A7DFA" class='centerImg'>
										    <mu-avatar color="#4A7DFA" style='vertical-align: middle;'>
										      <img :src="user.logo">
										    </mu-avatar>
										  
									   		<span>{{user.trueName}}</span>
										    <mu-button icon slot="right" color="#4A7DFA">
										    	.
										    </mu-button>
									  </mu-appbar>
									   <mu-list>
									    <mu-list-item button @click="personal">
									    	<mu-list-item-action>
									        	<mu-icon value="folder_shared" color="#4A7DFA"></mu-icon>
									      	</mu-list-item-action>
									      	<mu-list-item-title>{{$t('info.pCenter')}}</mu-list-item-title>
									    </mu-list-item>
									    <mu-list-item button @click="settingPs">
									    	<mu-list-item-action>
									        	<mu-icon value="lock" color="#4A7DFA"></mu-icon>
									      	</mu-list-item-action>
									      <mu-list-item-title>{{$t('info.sPSS')}}</mu-list-item-title>
									    </mu-list-item>
									    <mu-list-item button>
									    	<mu-list-item-action>
									        	<mu-icon value="headset_mic" color="#4A7DFA"></mu-icon>
									      	</mu-list-item-action>
									      <mu-list-item-title>{{$t('info.zxkf')}}</mu-list-item-title>
									    </mu-list-item>
									    <mu-list-item button @click="help">
									    	<mu-list-item-action>
									        	<mu-icon value="live_help" color="#4A7DFA"></mu-icon>
									      	</mu-list-item-action>
									      <mu-list-item-title>{{$t('info.helcenter')}}</mu-list-item-title>
									    </mu-list-item>
									    <mu-list-item button @click="recommend">
									    	<mu-list-item-action>
									        	<mu-icon value="compare_arrows" color="#4A7DFA"></mu-icon>
									      	</mu-list-item-action>
									      <mu-list-item-title>推荐码</mu-list-item-title>
									    </mu-list-item>
									    <mu-list-item button @click="lockScreen">
									    	<mu-list-item-action>
									        	<mu-icon value="stop_screen_share" color="#4A7DFA"></mu-icon>
									      	</mu-list-item-action>
									      <mu-list-item-title>锁屏</mu-list-item-title>
									    </mu-list-item>
									    <hr style='border-color: #fff;'>
									    
									    <mu-list-item button @click="logout">
									    	<mu-list-item-action>
									        	<mu-icon value="keyboard_return" color="#4A7DFA"></mu-icon>
									      	</mu-list-item-action>
									      <mu-list-item-title>{{$t('info.loginOut')}}</mu-list-item-title>
									    </mu-list-item>
									    
									  </mu-list>
								</mu-popover>
							</li>
						</ul>
					</div>
				</header>
				<article class="layout-content-main">
					<div style="height:100%" >
						<!--左侧二级菜单（一级菜单大于1个时显示）-->
						<ul style="background:#fff;height:100%" class="nav-leftTWO" v-show="Datalenght>1">
							<li v-for='(item,index) in secondMenu'  :key='index' class="navListTWO">
								<div @click='gotourl(item,index)' class='bgdiv' :class="{bgMenuTWO:isselectTWO==item.path}">
									<div style='width:100%'>
										<span class="layout-text sildeTitle"  v-if='isselectTWO==item.path'>
											<span style="color:#333">{{item.name}}</span>
											<span class='sjxT'></span>
										</span>
										<span class="layout-text" style='margin-left: 10px;' v-else>{{item.name}}</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<router-view keep-alive class='Router'></router-view>
				</article>
				<!-- <footer class="layout-copy">
					<p>&copy;2018-2020
						<a :href="backUrl" target='_blank'>智胜云</a>
					</p>
				</footer> -->
			</div>
		</div>
		<!--消息-->
	    <div class='allMsg'>
	    	<div class='allMsg-top'>
	    		<span style='font-size:16px'>消息通知</span>
	    		<span style='font-size:26px;cursor:pointer' @click='chafalse'>×</span>
	    	</div>
	    	<div class='listMsg-main-mark'>
	    		<div class='listMsg-main' v-for='(item,index) in dataList' :key='index'>
	    			<div class='listMsg-title'>
	    				<span style='vertical-align:middle'>
	    					<span class='statusCircle' :class='{red:item.status==1,black:item.status==9}'></span>
	    					{{item.subject}}
	    				</span>
	    				<span><a :href='item.url' target='_blank'>查看详情</a></span>
	    			</div>
	    			<div class='listMsg-content'>
	    				<span>{{item.content}}</span>
	    			</div>
	    			<p style="margin-left:20px">{{item.creationDate}}</p>
	    		</div>
	    		<!--底部的分页-->
				<div class="page-box">
					 <Page :total="total" size="small" show-total  :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
				</div>
	    	</div>
	    	<div class='allMsg-bottom'>
	    		<span style='color:#487EE4;font-size:14px'><a @click='allyd'>全部标为已读</a></span>
	    		<span ><a style='color:#A2A2A2;font-size:14px' @click='goAllMsg'>消息中心</a></span>
	    	</div>
	    </div>
	    <div class='noMsg' v-if='noMsgisshow'>
	    	<div class='allMsg-top'>
	    		<span style='font-size:16px'>消息通知</span>
	    		<span style='font-size:26px;cursor:pointer' @click='allMsgchafalse'>×</span>
	    	</div>
	    	<div class='nomsgimg'>
	    		<img src="http://img.zsydian.com/icon/nomsg.png">
	    		<span>暂时没有新消息</span>
	    	</div>
	    	<div class='allMsg-bottom'>
	    		<span style='color:#487EE4;font-size:14px'><a @click='allyd'>全部标为已读</a></span>
	    		<span ><a style='color:#A2A2A2;font-size:14px' @click='goAllMsg'>消息中心</a></span>
	    	</div>
	    </div>
	    <div v-if='!isshow' class='changestoreZSY'>
			<span>智胜云</span>
		</div>
		<div v-if='isshow' class='changestore'>
			<div class='storename'>{{storeName}}</div>
			<div @click='changeS' v-if='storeisshow' class='changeStore'>切换店铺</div>
		</div>
		<!--锁屏-->
		<div class='lockMain' v-if='lockMainisshow' @contextmenu.prevent="show($event)">
			<div style="width:100%;height:100%">
				<vue-particles
			        color="#fff"
			        :particleOpacity="0.7"
			        :particlesNumber="60"
			        shapeType="circle"
			        :particleSize="4"
			        linesColor="#fff"
			        :linesWidth="1"
			        :lineLinked="true"
			        :lineOpacity="0.4"
			        :linesDistance="150"
			        :moveSpeed="2"
			        :hoverEffect="true"
			        hoverMode="grab"
			        :clickEffect="true"
			        clickMode="push"
			        class="lizi"
			      >
			      </vue-particles>
		      </div>
				<div class='inputAvatar position'>
					<div class="lockCenterBack">
						<div class='avatarImg'>
							<div class='userImgMain'>
								<img :src="userImg" class='imglog'>
							</div>
							<div class='usernameTxt'>{{trueNameS}}</div>
						</div>
						<div style='display:flex'>
							<div style='height:80px;'>
							<div style='display:flex'>
							<mu-text-field ref="pssInput" type="password" v-model="password" autofocus  placeholder="请输入登陆密码" @keyup.enter='login' style='width:100%'></mu-text-field style="color:#fff"><br/>
								<div>
									<Button  style='height: 30px;color:#5C8AD9;margin-top:5px;text-align:center;border-color:#5C8AD9;background#fff' @click='login'>登录</Button>
								</div>
							</div>	
								<div v-if='errCodeIsshow' style='color:#ff0000;height:30px;line-height:30px;margin:5px 0'>{{errCode}}</div>
				       		</div>
					   		<!-- <span @click="login" class='lockClick'><Icon type="ios-arrow-forward" /></span> -->
					   </div>
				   </div>
	       		</div>
		</div>
		<Modal v-model="detailsisshow" width="460px">
			<p slot="header" style="height:30px;line-height:30px">
				<span>推荐码</span>
			</p>
			<div class="shareCodeClass">
	            <p>{{user.shareCode}}</p>
			</div>
			<div slot="footer">
				<div class='title' style='margin:0px'>
					<div style='color:#D15151;font-size:14px'>
					</div>
					<div style='margin-top:10px'>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#ccc;color:#fff" @click="cancelDetails"><Icon type="close" style="margin-right:5px;" ></Icon>关闭</Button>
					</div>
				</div>
			</div>
		</Modal>
	</div>
</template>
<script>

import * as types from '../../store/types'
import LoadUrl from '@/components/common/actionLoad'
import store from '@/store/index'
import m from '../common/meta.js'

	export default {
		props:{
			//基础数据
			data:{
				type:Array,
				required:true
			},
			//标题
			titleName:{
				type:String,
				required:true
			},
			storeName:{
				type:String
			},
			//只有门店有选择店铺
			isshow:{
				type:false
			},
			storeisshow:{
				type:Boolean
			},
			//点击事件
			changeS:{
				default:function(){}
			}
		},
		data() {
			return {
			
				m:m,
				Datalenght:"",
				isselectTWO:"",
				isselect:this.$route.path,
				backUrl:LoadUrl.Website.OffProd,//官网
				detailsisshow:false,
				errCodeIsshow:false,
				open:false,
				trigger: null,
				loadMainisshow:false,
				types:types,

				getSystem:[],//菜单
				firstMenuData:[
					// {
					// 	"displayName":"概览",
					// 	"path":"/dashbord",
					// 	"icon":"http://img.zsydian.com/icon/sidebaricon/dashbord.png",
					// 	"activeIcon":"http://img.zsydian.com/icon/sidebaricon/dashbordActive.png",
					// 	"child":[]
					// },
					{
						"displayName":"管理",
						"path":"/enterprise",
						"icon":"http://img.zsydian.com/icon/sidebaricon/manage.png",
						"activeIcon":"http://img.zsydian.com/icon/sidebaricon/manageActive.png",
						"child":[
							{
								"name":"概览",			
								"path":"/enterprise"
							},
							{
								"name":"安全",
								"path":"/power"
							},
							{
								"name":"仓库",
								"path":"/storehouse"
							},
							{
								"name":"门店",
								"path":"/ShopAddPage"
							},
							{
								"name":"商品",
								"path":"/goods"
							},
							{
								"name":"员工",
								"path":"/ey"
							},
							{
								"name":"设置",
								"path":"/settingDetails"
							},
							{
								"name":"素材库",
								"path":"/materialHome"
							},
						]
					},
					{
						"displayName":"采购",
						"path":"/purchase",
						"icon":"http://img.zsydian.com/icon/sidebaricon/purchase.png",
						"activeIcon":"http://img.zsydian.com/icon/sidebaricon/purchaseActive.png",
						"child":[
							{
								"name":"概览",
								"path":"/purchase"
							},
							{
								"name":"供应商",
								"path":"/supplier"
							},
							{
								"name":"采购",
								"path":"/purchasehome"
							},
							{
								"name":"收货",
								"path":"/cgsend"
							},
							{
								"name":"设置",
								"path":"/purchaseSetting"
							},
						]
					},
					// {
					// 	"displayName":"销售",
					// 	"path":"/sales",
					// 	"icon":"http://img.zsydian.com/icon/sidebaricon/sales.png",
					// 	"activeIcon":"http://img.zsydian.com/icon/sidebaricon/salesActive.png",
					// 	"child":[
					// 		{
					// 			"name":"概览",
					// 			"path":"/sales"
					// 		},
					// 		{
					// 			"name":"客户",
					// 			"path":"/customer"
					// 		},
					// 		{
					// 			"name":"报价单",
					// 			"path":"/quotation"
					// 		},
					// 		{
					// 			"name":"订单",
					// 			"path":"/salespage"
					// 		},
					// 		{
					// 			"name":"发货",
					// 			"path":"/send"
					// 		},
					// 		{
					// 			"name":"设置",
					// 			"path":"/salesSetting"
					// 		}

					// 	]
					// },
					// {
					// 	"displayName":"会员",
					// 	"path":"/memberHome",
					// 	"icon":"http://img.zsydian.com/icon/sidebaricon/crm.png",
					// 	"activeIcon":"http://img.zsydian.com/icon/sidebaricon/crmActive.png",
					// 	"child":[
					// 		{
					// 			"name":"概览",
					// 			"path":"/memberHome"
					// 		},
					// 		{
					// 			"name":"会员",
					// 			"path":"/management"
					// 		},
					// 		{
					// 			"name":"黑名单",
					// 			"path":"/blacklisthome"
					// 		},
					// 		{
					// 			"name":"生命周期",
					// 			"path":"/lifecyclehome"
					// 		},
					// 		{
					// 			"name":"近期生日",
					// 			"path":"/birthdayhome"
					// 		}
					// 	]
					// },
					// {
					// 	"displayName":"门店",
					// 	"path":"/storeHome",
					// 	"icon":"http://img.zsydian.com/icon/sidebaricon/store.png",
					// 	"activeIcon":"http://img.zsydian.com/icon/sidebaricon/storeActive.png",
					// 	"child":[
					// 		{
					// 			"name":"概览",
					// 			"path":"/storeHome"
					// 		},
					// 		{
					// 			"name":"收银",
					// 			"path":"/storecashier"
					// 		},
					// 		{
					// 			"name":"会员",
					// 			"path":"/storeCrm"
					// 		},
					// 		{
					// 			"name":"订单",
					// 			"path":"/storeorder"
					// 		},
					// 		{
					// 			"name":"商品",
					// 			"path":"/storejxc"
					// 		},
					// 		{
					// 			"name":"运营",
					// 			"path":"/storeoperation"
					// 		},

					// 		{
					// 			"name":"交易",
					// 			"path":"/storefinancial"
					// 		},
					// 		{
					// 			"name":"美业",
					// 			"path":"/storesever"
					// 		},
					// 		{
					// 			"name":"统计",
					// 			"path":"/storedata"
					// 		},
					// 		{
					// 			"name":"管理",
					// 			"path":"/storemanage"
					// 		}
					// 	]
					// },
					// {
					// 	"displayName":"运营",
					// 	"path":"/operationHome",
					// 	"icon":"http://img.zsydian.com/icon/sidebaricon/markting.png",
					// 	"activeIcon":"http://img.zsydian.com/icon/sidebaricon/marktingActive.png",
					// 	"child":[
					// 		{
					// 			"name":"概览",
					// 			"path":"/operationHome"
					// 		},
					// 		{
					// 			"name":"投诉与建议",
					// 			"path":"/complain"
					// 		},
					// 	]
					// },
					// {
					// 	"displayName":"订单",
					// 	"path":"/orderHome",
					// 	"icon":"http://img.zsydian.com/icon/sidebaricon/order.png",
					// 	"activeIcon":"http://img.zsydian.com/icon/sidebaricon/orderActive.png",
					// 	"child":[
					// 		{
					// 			"name":"概览",
					// 			"path":"/orderHome"
					// 		},
					// 		{
					// 			"name":"线上订单",
					// 			"path":"/order"
					// 		},
					// 		{
					// 			"name":"线下订单",
					// 			"path":"/networdOrder"
					// 		},
					// 		{
					// 			"name":"跨店订单",
					// 			"path":"kdOrder"
					// 		},
					// 		{
					// 			"name":"退货订单",
					// 			"path":"/returnorder"
					// 		},
					// 		{
					// 			"name":"订单配置",
					// 			"path":"/logtSetting"
					// 		}

					// 	]
					// },
					// {
					// 	"displayName":"库存",
					// 	"path":"/sku",
					// 	"icon":"http://img.zsydian.com/icon/sidebaricon/inv.png",
					// 	"activeIcon":"http://img.zsydian.com/icon/sidebaricon/invActive.png",
					// 	"child":[
					// 		{
					// 			"name":"概览",
					// 			"path":"/sku"
					// 		},
					// 		{
					// 			"name":"库存",
					// 			"path":"/skuinventory"
					// 		},
					// 		{
					// 			"name":"调拨",
					// 			"path":"/investigate"
					// 		},
					// 		{
					// 			"name":"盘点",
					// 			"path":"/pdhome"
					// 		},
					// 		{
					// 			"name":"渠道库存",
					// 			"path":"/channelInventory"
					// 		},
					// 		{
					// 			"name":"入库明细",
					// 			"path":"/Ininventoryhome"
					// 		},
					// 		{
					// 			"name":"出库明细",
					// 			"path":"/OutInventoryhome"
					// 		},
					// 		{
					// 			"name":"设置",
					// 			"path":"/InventorySetting"
					// 		},
					// 	]
					// },
					// {
					// 	"displayName":"财务",
					// 	"path":"/financeHome",
					// 	"icon":"http://img.zsydian.com/icon/sidebaricon/finance.png",
					// 	"activeIcon":"http://img.zsydian.com/icon/sidebaricon/financeActive.png",
					// 	"child":[
					// 		{
					// 			"name":"概览",
					// 			"path":"/financeHome"
					// 		},
					// 		{
					// 			"name":"收款",
					// 			"path":"/receipts"
					// 		},
					// 		{
					// 			"name":"应收",
					// 			"path":"/receivablea"
					// 		},
					// 		{
					// 			"name":"付款",
					// 			"path":"/payment"
					// 		},
					// 		{
					// 			"name":"应付",
					// 			"path":"receivable"
					// 		},
					// 		{
					// 			"name":"交易流水",
					// 			"path":"/withdraw"
					// 		},
					// 		{
					// 			"name":"设置",
					// 			"path":"/financeSetting"
					// 		},
					// 	]
					// },
					// {
					// 	"displayName":"数据",
					// 	"path":"/dataHome",
					// 	"icon":"http://img.zsydian.com/icon/sidebaricon/report.png",
					// 	"activeIcon":"http://img.zsydian.com/icon/sidebaricon/reportActive.png",
					// 	"child":[
					// 		{
					// 			"name":"采购",
					// 			"path":"/dataHome"
					// 		},
					// 		{
					// 			"name":"销售",
					// 			"path":"/salesreport"
					// 		},
					// 		{
					// 			"name":"库存",
					// 			"path":"/dataInv"
					// 		},
					// 		{
					// 			"name":"零售",
					// 			"path":"/dataretail"
					// 		},
					// 		{
					// 			"name":"商品",
					// 			"path":"/datasku"
					// 		},
					// 		{
					// 			"name":"店铺",
					// 			"path":"/storeReport"
					// 		},
					// 		{
					// 			"name":"会员",
					// 			"path":"/crmreport"
					// 		},
					// 		{
					// 			"name":"财务",
					// 			"path":"/datacw"
					// 		},
					// 	]
					// },
					// {
					// 	"displayName":"长护宝",
					// 	"path":"/zhb",
					// 	"icon":"http://img.zsydian.com/icon/sidebaricon/zhb.png",
					// 	"activeIcon":"http://img.zsydian.com/icon/sidebaricon/zhbActive.png",
					// 	"child":[
					// 		{
					// 			"name":"概览",
					// 			"path":"/zhb"
					// 		},
					// 		{
					// 			"name":"客户",
					// 			"path":"/customerIndex"
					// 		},
					// 		{
					// 			"name":"护理员",
					// 			"path":"/attendantIndex"
					// 		},
					// 		{
					// 			"name":"工单",
					// 			"path":"/wordOrderIndex"
					// 		},
					// 		{
					// 			"name":"日程",
					// 			"path":"/zhbDate"
					// 		},
					// 		{
					// 			"name":"设置",
					// 			"path":"/settingIndex"
					// 		}
					// 	]
					// }
				],
				//二级菜单
				secondMenu:[],
				// isSetting:false,//是否有设置项
				zh:"zh",
				storeType:[
					{
						label:"中文",
						value:'zh'
					},
					{
						label:"English",
						value:'en'
					}
				],
		
				numberIndex:0,
				total:0,
				pageSize:0,
				allMsgisshow:true,//全部消息弹框
				noMsgisshow:false,//没有消息
				iconisshow:true,//红点是否显示
				listMsg:[],//消息列表
				dataList:[],//全部消息
				msgisshow:true,//消息弹框
				
				numIndex:0,
				uid: this.$store.state.common.token,
				user:this.$store.state.common.user,
		
				trueNameS:"",
				password:"",//锁频登陆密码
				lockMainisshow:false,
				oldTime:new Date().getTime(),
				newTime:new Date().getTime(),
      			outTime:1000*60*30,//超时时间30分钟
      			userName:"",//当前用户名
      			userImg:"",//当前头像
      			storelogo:"",//企业logo
      			
			}
		},
		
		methods: {
			//判断是否有鼠标移动
			mouseOver(e){
				//重置时间
				this.oldTime = new Date().getTime()
			},
			//判断超时跳转锁屏
			OutTime(){
	            this.newTime = new Date().getTime(); //更新未进行操作的当前时间
	            if(this.newTime - this.oldTime > this.outTime){ //判断是否超30分钟无操作
					this.lockMainisshow=true//锁屏界面显示
					this.$store.commit(types.LOGOUT);
	            }
	        },
	        //点击锁屏
	        lockScreen(){
	        	this.lockMainisshow=true//锁屏界面显示
	        	this.$store.commit(types.LOGOUT);
	        },
	        //解锁登陆调登录接口
	        login(){
    			this.axios.post('/login?username='+this.userName+'&password='+this.password).then((res) => {
					if(res.data.status == 200) { //登录成功 
						let data=res.data;
                        this.$store.commit(types.LOGIN, data.rows.uid);//登陆凭证uid
                        this.$store.commit(types.USER, data.rows);//个人信息
                        this.lockMainisshow=false//锁屏界面隐藏
                        this.$router.push('/lock')//登陆成功跳转过度页面
                        this.System()
                        setTimeout(()=>{
                        	this.loadMainisshow=false
                        	this.$router.go(-1)
                        },1000)//一秒后返回原来的页面
                        this.password=''

                        this.errCodeIsshow=false
                        
					}else{
						this.errCodeIsshow=true
						this.errCode=res.data.errorMessage
					}
				})
				
			},
			
			getv(s){
				switch(s){
					case '管理':
						return this.$t('public.manage')
					break;
					case '门店':
						return this.$t('public.Store')
					break;
					case '采购':
						return this.$t('public.Purchase')
					break;
					case '销售':
						return this.$t('public.Sale')
					break;
					case '会员':
						return this.$t('public.Member')
					break;
					case '运营':
						return this.$t('public.Operate')
					break;
					case '订单':
						return this.$t('public.Order')
					break;
					case '库存':
						return this.$t('public.Inventory')
					break;
					case '财务':
						return this.$t('public.Finance')
					break;
					case '数据':
						return this.$t('public.Data')
					break;
					case '长护包':
						return this.$t('public.zhb')
					break;
				}
				
			},
			//一级菜单
			gotourlNav(item){
				console.log(item)
				this.isselect=item.path
           		sessionStorage.setItem('isselect', this.isselect)
           		this.$router.push(item.path);
           		if(item.child==undefined){
           			return
           		}else{
           			sessionStorage.setItem('isselectTWO',item.child[0].path)
           		}
				
			},
			//二级点击菜单的跳转
           gotourl(item,index) {
           		this.isselectTWO=item.path
           		sessionStorage.setItem('isselectTWO', this.isselectTWO)
				this.$router.push(item.path);
			},
			//调到设置
			setting(){
				this.$router.push('/settingDetails')
				//获取父路由数据this.$parent.$data
			},
			//退出
			logout(){
				this.axios.post('logout?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						this.$store.commit(types.LOGOUT);
						sessionStorage.removeItem('getSystem');
						sessionStorage.removeItem('numberIndex');
						sessionStorage.removeItem('storelogo');
						sessionStorage.removeItem('isselect');
						sessionStorage.removeItem('isselectTWO');
						this.deleteCookie(); //删除指定cook
						this.$router.push('/')
						// this.$router.go('/')

					}
				})
			},
            //清除cookie
            deleteCookie() {
            	document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+ ";path=/";
            	document.cookie = "pss=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+ ";path=/";
            },
			//个人中心
			personal(){
				this.$router.push({
					path:'/personalHome',
					query:{
						ps:0
					}
				})
			},
			//跳转设置密码
			settingPs(){
				this.$router.push({
					path:'/personalHome',
					query:{
						ps:1
					}
				})
			},
			//点击消息
			clickmsg(){
				
				// this.msgisshow=!this.msgisshow
				if(this.msgisshow){
					 $(".allMsg").animate({right:"0px"});
					 
					 this.msgisshow=false
				}else{
					 $(".allMsg").animate({right:"-700px"});
					 this.msgisshow=true

				}
			},
			//标记为已读
			allyd(){
				this.iconisshow=false
				this.noMsgisshow=true
				$(".allMsg").animate({right:"-700px"})
				this.msgisshow=true
			},
			//跳转到消息中心
			goAllMsg(){
				this.$router.push('/msgHome')
			},
			//跳转帮助页面
			help(){
				// window.location.href='http://help.zsydian.com/'
				window.open('http://help.zsydian.com/')
			},
			//推荐码
			recommend(){
				this.detailsisshow=true
			},
			cancelDetails(){
				this.detailsisshow=false
			},
			//点击差号
			chafalse(){
				$(".allMsg").animate({right:"-700px"});
				this.msgisshow=true
			},
			//没有消息点击的差号
			allMsgchafalse(){
				this.noMsgisshow=false
			},
			//获取全部消息
			getAllMsg(){
				this.axios.get('/msg/query?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.dataList = res.data.rows
						this.total=res.data.total
	                    this.pageSize=res.data.pageSize
	                    res.data.rows.forEach((x)=>{
	                    	x.creationDate=this.getLocalTimeH(x.creationDate)
	                    	
	                    })
					}
				})
			},
			 //切换一条页
	            getData(current){
	                this.axios.get('/msg/query?offset='+current+'&uid='+this.uid).then((res)=>{
	                    //////console.log(res)
	                    this.dataList = res.data.rows
	                    this.total=res.data.total
	                    this.pageSize=res.data.pageSize
	                    res.data.rows.forEach((x)=>{
	                    	x.creationDate=this.getLocalTimeH(x.creationDate)
	                    	
	                    })
	                })
	            },
	            //翻页
	            changePageSize(size){
	                this.pageSize = size
	            },
	            
	            //当前企业信息
	        getenterprise(){
	        	this.axios.get('enterprise/view?uid='+this.uid).then(res=>{
	        		if(res.data.status==200){
	        			let data=res.data
	        			console.log(res)
						// this.storelogo=res.data.rows.logo==undefined?"http://img.zsydian.com/icon/logoin.png":res.data.rows.logo//保存头像
						sessionStorage.setItem("storelogo",data==undefined?"http://img.zsydian.com/icon/logoin.png":data.rows==undefined?"http://img.zsydian.com/icon/logoin.png":data.rows.logo==undefined?"http://img.zsydian.com/icon/logoin.png":data.rows.logo)
	        		}else{
	        			this.$notify({
		                    title:"",//
		                    message:  res.data.errorMessage,
		                    type: 'error',
		                    position: 'bottom-right'
		                });
	        		}
	        	})
	        },
			//获取模块列表
			System(){
				this.axios.get('getSystem?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						this.getSystem=res.data.rows
						let data=res.data.rows
						let stm=JSON.stringify(data)
						sessionStorage.setItem("getSystem",stm)
					}else{
						this.$notify({
					        title: "",//'错误',
					        message: res.data.errorMessage,
					        type: 'error',
					        position: 'bottom-right'
				        });
					}
				})
			},
			

			},
			created(){
				this.$nextTick(()=>{
					this.System();//下拉模块
				})
			},
			mounted() {
				
				//一级菜单个数 ==1就不显示，显示二级菜单;
				//>1显示一级和二级
				this.secondMenu=this.m.getMenu(this.firstMenuData,this.$parent.data.length==0?this.$route.path:this.$parent.data[0].url)//依据路由显示二级菜单
				this.Datalenght=this.firstMenuData.length
				
				// if(sessionStorage.getItem('getSystem')){
				// 	this.getSystem=JSON.parse(sessionStorage.getItem('getSystem'))//将sessionStorage存储得字符串转为对象数组
				// 	this.secondMenu=this.m.getMenu(this.getSystem,this.$parent.data.length==0?this.$route.path:this.$parent.data[0].url)//依据路由显示二级菜单
				// 	 this.Datalenght=this.getSystem.length
				// }else{
				// 	this.System();//菜单模块
				// 	this.getSystem=JSON.parse(sessionStorage.getItem('getSystem'))//将sessionStorage存储得字符串转为对象数组
				// 	this.secondMenu=this.m.getMenu(this.getSystem,this.$parent.data.length==0?this.$route.path:this.$parent.data[0].url)//依据路由显示二级菜单
				// 	 this.Datalenght=this.getSystem.length
					
				// }
				if(sessionStorage.getItem('storelogo')){
					this.storelogo=sessionStorage.getItem('storelogo')
				}else{
					this.getenterprise();//企业信息
					this.storelogo=sessionStorage.getItem('storelogo')
				}
				//一级菜单
				if(sessionStorage.getItem('isselect')){
					if(this.Datalenght>1){
						this.isselect = sessionStorage.getItem('isselect')
						console.log(this.isselect )
					}else{
						this.isselect = sessionStorage.setItem(this.$route.path)
					}
					
				}else{
					this.isselect=this.getSystem[0].path
				}
				//二级菜单
				if(sessionStorage.getItem('isselectTWO')){
					this.isselectTWO = sessionStorage.getItem('isselectTWO')
				}

				this.getenterprise()//企业信息
				this.getAllMsg()//消息
				this.otime=setInterval(this.OutTime,1000*60*15)//15分钟轮询一次查看用户有没有操作
				this.trigger = this.$refs.button.$el;
				this.userName=this.user.name//保存用户名
				this.trueNameS=this.user.trueName//保存用户名
				this.userImg=this.user.logo==undefined || this.user.logo==''?"http://img.zsydian.com/icon/logoin.png":this.user.logo//保存头像
				

			}
	}
</script>
<style lang="css" scoped>
	#particles-js{
	    background-color: #000;
	    height: 100%;

	}
	.userImgclass{
		padding: 30px 0px;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}

	.userImgclass p{
		width:45px;
		height:45px;
		border-radius: 50%;
		overflow: hidden;
	}
	.navListbg:hover{
		background-color:#333;
		color:#fff;
	}
	.position{
	    position: absolute;
	    z-index: 2;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	    overflow: auto;
	}
	.lockCenterBack{
		display: flex;
		justify-content: center;
		align-items: center;
	    flex-direction: column;
	    background-color: #fff;
	    padding: 60px;
	    box-shadow: 0 0 20px #fff;
	    border-radius: 6px;
	}
	.main-nav{
		width:100%;
		height:100%;
		display: flex;
	}

	.nav-left{
		height:100%;background:#273543;
		flex:0 0 120px;
		width:120px;
		font-size: 14px;
		overflow-y: scroll;
	}
	.nav-leftTWO{
		height:100%;
		overflow-y: scroll;
		
	}
	.main-right{
		height:100%;
		width:100%;
		overflow: hidden;
	}
	/* .hoverbg{
		background: #d0d0d0
	} */
	.nav-list:hover{
		background: #ff0000
	}
	.Router {
		width: 100%;
	  	height: 100%;
		overflow: auto ;

	}  
	.slide-left-enter, .slide-right-leave-active {  
	  opacity: 0;  
	  -webkit-transform: translate(100%, 0);  
	  transform: translate(100%, 0);  
	}  
	.slide-left-leave-active, .slide-right-enter {  
	  opacity: 0;  
	  -webkit-transform: translate(-100%, 0);  
	  transform: translate(-100%, 0);  
	} 
	.changestore{
		position:fixed;
		left:0px;
		width:106px;
		flex:0 0 106px;
		bottom:5px;
		z-index:999;
		color:#fff;
		background:#273543;
		/*background:#12161B;*/
		cursor:pointer;
		text-align: center;
	}
	.changestoreZSY{
		position:fixed;
		left:0px;
		width:106px;
		flex:0 0 106px;
		bottom:5px;
		z-index:999;
		color:#697790;

		text-align: center;
	}
	.changeStore:hover{
		color:#3091F9
	}
	.Copyright{
		text-align: center;
	}
	.model-main{
		display:flex;
		border-radius:8px;
	}
	.model-main .left{
		width:40%;
		height:408px;
		background: #495060;
		display:flex;
		flex-direction: column;
		justify-content: center;;
		align-items: center;
		color:#fff;
	}
	.model-main .right{
		flex: 2 0 60%;
		background: #e2e2e2;

	}
	.right-top-search{
		position:relative;
		width:100%;
		height:60px;
		background: #fff;
		line-height: 60px;
		
	}
	.right-top-search input{
		width:80%;
	}

	.right-bottom-main{
		display:flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

	}
	.item{
		display:flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;
		background: #fff;
		margin:10px;
		border-radius:6px;
	}
	.item img{
		margin-top:10px;
	}

	.item .x-name{
		width:100%;
		padding:5px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.bgMenu{
		background: #4A7DFA;
		color:#fff;
	}
	.bgMenuTWO{
		background: #E9E9EF;
		border-radius: 4px;

	}
	.home-box {
	    width: 100%;
    height: 100%;
    background: rgb(230,233,236);
	}
	
	.layout {
		
		background: #f5f7f9;
		position: relative;
		
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
	
	.layout-content {
		height:100%;
		overflow: hidden;
		background: #fff;
		border-radius: 4px;
		width:100%;
		
	}
	
	.layout-content-main {
		height:100%;

		width:100%;
		display: flex;
		background: #fff;
	}
	.layout-content-main ul{
		border-right: 1px solid #e4e4e4;
		
	}
	.layout-content-main ul li{
	    
	}
	.navListTWO{
		background: #fff;
	    -ms-flex: 0 0 110px;
	    flex: 0 0 110px;
	    width: 110px;
	    font-size: 14px;
	    margin:10px;
		color:#333;
	}
	.layout-copy {
		width: 100%;
		color: #9ea7b4;
		height:40px;
		line-height: 40px;
		position: fixed;
		bottom:0;
		background: #f5f7f9;
		z-index:10;
		display: flex;
		justify-content: center;
		align-items: center;

	}
	.layout-copy a{
		color:#777;
	}
	.layout-menu-left {
		background: #464c5b;
		/*height:100%;*/
		/*overflow-y: scroll*/
	}
	.logout{
		margin-top:10px;
		margin-left:10px;
	}
	.logout:hover{
		cursor:pointer;
	}

	.layout-header {
		width:100%;
		display: flex;
		justify-content: space-between;
		height:50px;
		background: #fff;
		line-height: 50px;
		border-bottom: 1px solid rgba(0,0,0,.125);
	}
	
	.page-title {
		height: 60px;
		line-height: 60px;
		margin-left: 40px;
	}
	.layout-logo-left {
		width: 100%;
	    background: #fff;
	    display: -ms-flexbox;
	    display: flex;
	    border-bottom:1px solid #e4e4e4;
	    justify-content: space-between;
	    box-shadow: 0 0 20px rgb(230,233,236);
		
	}
		.layout-menu-left::-webkit-scrollbar{
	width: 0px;
	height: 4px;
	background-color: #f5f5f5;
}
	.layout-menu-left::-webkit-scrollbar-track{
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
		border-radius: 10px;
		background-color: #f5f5f5;
	}
	.layout-menu-left::-webkit-scrollbar-thumb{
		
		height: 2px;
		border-radius: 18px;
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
		background-color: #ccc;
	}
	.layout-ceiling-main a {
		color: #9ba7b5;
	}
	
	.layout-hide-text .layout-text {
	display:inline-block;
		width:95px;
		/*width:100%;*/
		display: flex;
		justify-content: space-between;
		color: #fff;
		margin-top:-2px;
		font-weight:600;font-family: verdana;
	}
	
	.ivu-col {
		transition: width .2s ease-in-out;
	}
	
	.mynav {
		width: 100%;
		height: 30px;
	}
	.icon-img{
		vertical-align: middle;
    	margin-top: -2px;
    	margin-left: 15px;
	}
	.publicuser{
		width:100%;
		height:48px;
		line-height: 48px;
		
	}
	.publicuser-left{
		position:relative;
		margin-left:20px;
	}
	.search{
		position: absolute;
	    top: 6px;
	    left: 35px;
	}
	.search span{
		color:#000;
	}
	.avatar{
		vertical-align: middle;
		border-radius: 50%
	}
	.logo-img{
		border-radius: 50%;
    overflow: hidden;
    height: 80px;
    line-height: 80px;
    text-align: center;
    margin-bottom:20px;
	}
	.publicuser-left .addbtn{
		display: inline-block;
	    width: 27px;
	    height: 27px;
	    line-height: 27px;
	    border-radius: 50%;
	    text-align: center;
	    background: #3B77E3;
	    color: #fff;
	    font-size:20px;
	    margin-left:10px;
	    position:relative;
	    top: 9px;	}
	.jia{
		position:absolute;
		top:0px;
		left: 8px;
	}
	.bgdiv{
		display:block;width:100%;
		display:flex;
		height:36px;
		line-height: 36px;
		margin-bottom: 14px;
		cursor:pointer;
	}
	
	 input.seartop{
		display: inline-block;
		width: 300px;
		height: 34px;
		margin-left:28px;
		text-indent: 10px;
		color: #555;
		background-color: #fff;
		background-image: none;
		border: 1px solid #eee;
		border-radius: 50px;
		-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
		-webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
		-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
		transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	}
	 input.seartop:focus{
		border-color: #66afe9;
		outline: 0;
		-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 4px rgba(102, 175, 233, .6);
		box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 4px rgba(102, 175, 233, .6);
	}
	
	
	.publicuser-rightdiv span{
			font-size:14px;
			margin-right:10px;

	}
	.sjx{
		display: inline-block;
	    width: 4px;
	    height:14px;
	    background: #fff;
	    margin-right: 10px;
	    border-radius: 2px;
	}
	.sjxT{
	    margin-right: 10px;
	    width: 0;
	    height: 0;
	    border-top: 4px solid transparent;
	    border-left: 6px solid #333;
	    border-bottom: 4px solid transparent;
	}
	.shareCodeClass{
		margin-bottom:-20px;margin-top:-10px;text-align: center;font-size: 160px;
	}
.manTop{

	width:240px;
	/*height:100px;*/
	background: #4081E0;
	color:#fff;
	padding:10px;
}
.msgTop{
	display:flex;
	margin-top:10px;
	align-items: center
}
.msgTop span{
	margin-left:20px;
	
}
.centerImg{
	display: flex;
	justify-content: center;
	align-content: center;
}
.centerImg img{
	width:100%;
	height:100%;
}
.allMsg{
		position:fixed;
		
		width:700px;
		box-shadow: 0 0 20px #ccc;
		right:-700px;
		top:48px;
		bottom:0;
		z-index:999999999;
		background: #fff
		/*animation:mymove 1s*/
	}
	.allMsg-top{
		height:50px;
		line-height: 50px;
		border-bottom:1px solid #e4e4e4;
		display: flex;
		justify-content: space-between;
		padding:0 20px;
	}
	
	.listMsg-title{
		
		height:30px;
		line-height: 30px;
		background: #F4F4F4;
		border-top-left-radius: 8px;
    	border-top-right-radius: 8px;
		display:flex;
		justify-content: space-between;
	}
	.listMsg-title span:nth-child(1){
		margin-left:10px;
	}
	.listMsg-title span:nth-child(2){
		margin-right:20px;
	}
	.listMsg-content{
		margin:20px;
	}
	.storename{
		width:110px;
		margin:20px 0;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	li{
		list-style: none
	}
	.listMsg-main-mark{
		height:100%;
		overflow-y: auto;
		
	}
	
	.allMsg-bottom{
		position:absolute;
		width:100%;
		bottom:0;
		left:0;
		height:60px;
		line-height: 60px;
		padding:0 10px;
		display:flex;
		background: #F4F4F4;
		justify-content: space-between;
	}
	.noMsg{
		position:fixed;
		height:400px;
		width:500px;
		box-shadow: 0 0 20px #ccc;
		/*border:1px solid red;*/
		right:0px;
		
		bottom:0;
		z-index:999999999;
		background: #fff
		/*animation:mymove 1s*/
	}
	.nomsgimg{
		height:300px;
		width:500px;
		display:flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

	}
	.nomsgimg span{
		margin-top:10px;
	}
	.listMsg-main{
		border:1px solid #ccc;
		border-radius:8px;
		margin:20px;
	}
	
	.page-box{
		margin-bottom:120px;
		text-align: center

	}
/*	.bg{
		color:#fff;
	}*/
	.Alltotal{
	position: absolute;
    top: 7px;
    left: 15px;
    width: 10px;
    height: 10px;
    background: #ff0000;
    text-align: center;
    line-height: 20px;
    color: #fff;
    border-radius: 50%;
    font-size: 12px;
	}

.statusCircle{
	display:inline-block;
	width:10px;
	height:10px;
	border-radius:50%;
	
}
.red{
	background: #ff0000
}
.black{
	background: #000
}
.sildeTitle{
	margin-left: 10px;display:flex;justify-content: space-between;align-items: center;
}
.sildeTitleOne{
	display:flex;justify-content: space-around;align-items: center;
}
.sildeTitleSpan{
	color:#fff;
	font-weight:900;
}

.lockMain{
	position:fixed;
	z-index:9999999999999999;
	
	top: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
	height: 100%;
	overflow: hidden;
	/*background-size: cover;
  	background-image: url('http://img.zsydian.com/icon/lock.png');*/
  
  }
.inputAvatar {
    width: 100%;
    margin-bottom: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.avatarImg{
    text-align: center;
    display: flex;
    flex-direction: column;
    
    position: relative;
    padding:10px 0;
}
.userImgMain{
	width: 150px;
    height: 150px;
    text-align: center;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 3px 10px #72757D;
}
.usernameTxt{
	padding:10px 0;
	
	font-size:16px;
	margin: 10px 0;
}
.imglog{
	width:100%;
	height:auto;
	border:0;
}
.lockInput{
	background: #878A91;
	outline: none;
	border:none;
	text-indent: 10px;
	border-radius: 2px;
	display: block;
	height:28px;
	box-shadow: 0 0 60px #878A91 inset
}

.lockClick{
	font-weight:600;cursor:pointer;display:block;
	width:25px;
	height:25px;
	font-size: 16px;
	margin-left: 10px;
	margin-top: 2px;
	color:#000;
	text-align: center;line-height: 28px;
	background: #96989E;
	border-radius: 50%;
	box-shadow: 0 0 2px #96989E inset
}

.loadMain{
	position:fixed;
	z-index:999999999999999999;
	width: 100%;
	height: 100%;
	top: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    background: #fff;
    justify-content: center;
    align-items: center;

}
.navList{
	text-align: center;
}
.navList:last-child{
	margin-bottom:150px;
}
.navListTWO:hover{
	background:#E9E9EF;
}
.nav-left::-webkit-scrollbar{
	width: 0px;
	height: 4px;
	background-color: #f5f5f5;
}
.nav-left::-webkit-scrollbar-track{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	border-radius: 10px;
	background-color: #f5f5f5;
}
.nav-left::-webkit-scrollbar-thumb{
	height: 2px;
	border-radius: 18px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #ccc;
}
.layout-textActive{
	margin-left: 10px;
}
.layout-textActive,.layout-textActiveOne{
	/*color:#767790;*/
	color:#a4a5b3;
	font-weight:900;
}
.nav-leftTWO::-webkit-scrollbar{
	width: 1px;
	height: 4px;
	background-color: #E4E4E4;
}
.nav-leftTWO::-webkit-scrollbar-track{
	-webkit-box-shadow: inset 0 0 2px rgba(255,255,255,.8);
	border-radius: 10px;
	background-color: #E4E4E4;
}
.nav-leftTWO::-webkit-scrollbar-thumb{

	height: 2px;
	border-radius: 18px;
	-webkit-box-shadow: inset 0 0 2px rgba(255,255,255,.8);
	background-color: #E4E4E4;
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
<style type="text/css">
.ivu-scroll-content{
	margin-bottom:100px;
}
.ivu-scroll-container::-webkit-scrollbar{
	width: 0px;
	height: 4px;
	background-color: #f5f5f5;
}
.ivu-scroll-container::-webkit-scrollbar-track{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	border-radius: 10px;
	background-color: #f5f5f5;
}
.ivu-scroll-container::-webkit-scrollbar-thumb{
	
	height: 2px;
	border-radius: 18px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #ccc;
}
.layout-content-main{
	margin-top:0px!important;
}
.ivu-btn{
	padding:4px 15px!important;
}
.ivu-modal-header{
	padding: 4px 16px;
}
.ivu-input-group-prepend{
	background-color: transparent!important;
	
}
.ivu-input-group-prepend .ivu-select-placeholder{
	color:#000!important;
}
.ivu-modal-footer{
	border-top:none!important;
	
}
.el-dialog__header{
	display:none;
}
.el-dialog__body{
	padding:0!important;
}
/*.el-dialog--small{
	width:60%!important;
}*/
.ivu-poptip-rel:hover{
	cursor:pointer!important;
}
.logo-top{
	height: 45px;
    width: 45px;
    display: block;
    border-radius: 50%;
    overflow: hidden;
}

</style>
<style type="text/css">
 img[src = ""]{
 	opacity:0;
 }
	/*.el-dialog--small{
		width:600px!important;
	}*/
	.ivu-menu-item{
		width:100%!important;
		height:100%!important;
	}
	.ivu-menu{
		height:100%!important;
	}
	.ivu-menu-vertical .ivu-menu-submenu-title-icon{
		    /*float: right;
		    position: relative;
		    top: 4px;
		    right: -15px;*/
		    display:none!important;
	}
	.ivu-poptip-body{
		padding:0px!important;
	}
	.ivu-poptip-popper[x-placement^=bottom] .ivu-poptip-arrow:after{
		    border-bottom-color: #4081E0!important;
	}
</style>
