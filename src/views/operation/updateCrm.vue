<template>
  <div id="coupon">
    <!--会员卡-->
		<div class="head">
				<div class="left-top">
					<p class="wldw">
						<!-- <span style="width:42px;font-weight:900">{{$t('public.screen')}}：</span>
						 <Select style="width:100px"  :placeholder="$t('public.all')"  >
					        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
					    </Select> -->
					</p>
					<div>
						<!--新建-->
						<span class="top-left-btn"  @click="add">
							<Icon type="plus" style="position:absolute;top:7px;left:8px"></Icon></span>
					</div>
				</div>
				<div class="right-top">
				<div style='position:absolute;left:360px'>
					<span style="margin-left:20px;font-size:14px;font-weight:900">{{addoredit}}</span> 
				</div>
				<div style='position:absolute;right:280px'>
					<div v-if="addText">
						<Button shape="circle"  style="background:#3b77e3;color:#fff;border:none" @click="saveCgInfo('formValidate')" >
						<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}</Button>
						
						<Button shape="circle"  @click="addCancel"  style="background:#999999;color:#fff;" ><Icon type="close" style="margin-right:5px;"></Icon>{{$t('public.cancel')}}</Button>
						
						<span @click="cancelHome" style="cursor:pointer"><Icon type="close"></Icon></span>
					</div>

					<div v-if="!addText" class="changebutton">

						<Button type="ghost"  shape="circle"  @click="edit" v-if="editshow" style="background:#40ca98;color:#fff;border:none">
							 <i class="el-icon-edit" style=";margin-right:5px;"></i>
						{{$t('public.EditBtn')}}<!--修改-->
						</Button>

						<Button type="ghost"  shape="circle" @click="saveEdit('formValidateE')" v-if="!editshow" style="background:#3b77e3;color:#fff;border:none">
							<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}<!--保存-->
						</Button>
						<Button shape="circle" v-if="!editshow"  @click="editCancel"  style="background:#999999;color:#fff;" ><Icon type="close" style="margin-right:5px;"></Icon>{{$t('public.cancel')}}</Button>
						
						<Dropdown trigger="click"  v-if='editshow'>
			                  <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">{{$t('public.more')}}
			                  <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
			              </Button>

			              <DropdownMenu slot="list">
			                <span  @click="start"><DropdownItem >{{$t('public.start')}}</DropdownItem></span>
			                  <span  @click="stop"><DropdownItem >{{$t('public.stop')}}</DropdownItem></span>
			                  
			                  <span  @click="del"><DropdownItem >{{$t('public.del')}}</DropdownItem></span>
			                
			              </DropdownMenu>
			           </Dropdown>
						<span @click="cancelHome" style="cursor:pointer;margin-left:5px" ><Icon type="close" class="cha" ></Icon></span>
					</div>	
				</div>		
				</div>
			<!-- </Col> -->
		</div>
	<!--左侧会员卡列表-->
	<div style='height:60px'></div>
	<!--左侧列表-->
		<div class="left-content">
			<div class='locationSearch'>
				<Input style='padding:10px 20px' v-model='searchKeyword' :placeholder="$t('public.inputname')" @on-enter='enterSearchTop'>
                <span slot="append"  @click='search' style='cursor:pointer;'>{{$t('public.search')}}</span>
                </Input>
			</div>
			<p v-if="AllcrmCard.length==0" class='scrollFix'>
				<Spin>
	                <div>{{$t('public.NoData')}}</div>
	            </Spin>
		    </p>
			<Scroll :on-reach-bottom="handleReachEdge" :height="height" v-else >
				<div class="con-list" v-for="(item,index) in AllcrmCard" :key='index' @click="getcginfo(item.id,index)" :class="{bg:numIndex==index}">
					 <span style="margin-right: 10px;">
				 	 	<Checkbox :value="numIndex==index"></Checkbox>
					</span>
					 <div>
					<p class="list-title">{{item.name}}</p>
					<p class="list-title">{{item.useTypeDesc}}</p>
					<span class="date">有效期：{{item.timeMonth==0?"无限制":item.timeMonth+'个月'}}</span>
					<span class="date" style='position:absolute;top:50px;right:20px;'>消费折扣：{{item.discount}}折</span>
					</div>
				</div>
			</Scroll>
		</div>
		<!--新增-->
		<div class="add-right" v-if='addText'>
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
					<Row class="rowClass">
						<h4 class="font-700">基本信息</h4>
						<FormItem label="名称" prop="name">
                            <Input v-model="formValidate.name" style="width:200px"></Input>
                            <span class="spanColor">设置会员名称</span>
                        </FormItem>
						<FormItem label="消费金额" prop="consumptionAmount">
                            <InputNumber v-model="formValidate.consumptionAmount" @on-change="changeconsumptionAmount" :min='0' style="width:200px" ></InputNumber> <span>元</span> 
                            <span class="spanColor">设置消费金额</span>
                        </FormItem>
                        <FormItem label="获得积分" prop="earnPoint">
                            <InputNumber v-model="formValidate.earnPoint" :min='0' style="width:200px" @on-change='changeearnPoint'></InputNumber>
                            <span class="spanColor">消费可获得的积分</span>
                        </FormItem>
                        <FormItem label="时间限制" prop="timeMonth">
                            <InputNumber v-model="formValidate.timeMonth" :min='0' style="width:200px" @on-change='changetimeMonth'></InputNumber>月
                            <span class="spanColor">会员卡的时效（月份）填写0为无限制</span>
                        </FormItem>
                        <FormItem label="押金" prop="deposit">
                            <InputNumber  v-model="formValidate.deposit" :min='0' style="width:200px" @on-change="changedeposit"></InputNumber>
                            <span class="spanColor">设置开卡押金</span>
                        </FormItem>
                        <FormItem label="是否默认">
                            <i-Switch v-model="formValidate.defaultValue" @on-change='change'>
									        
							</i-Switch>
							<span style="margin-left:20px">{{formValidate.defaultValue?"已开启":"已关闭"}}</span>
                        </FormItem>
					</Row>
					<Row class="rowClass">
						<h4 class="font-700">开卡信息</h4>
						<FormItem label="消费折扣" prop="discount">
                            <InputNumber v-model="formValidate.discount" :max='1' :min='0.1' style="width:200px" @on-change='changediscount'></InputNumber>
                            <span class="spanColor">设置会员购物的消费折扣</span>
                        </FormItem>
                        <FormItem label="赠送积分" prop="giftIntegral">
                            <InputNumber v-model="formValidate.giftIntegral"  :min='0' style="width:200px" @on-change='changegiftIntegral'></InputNumber>
                            <span class="spanColor">设置开卡即送送积分</span>
                        </FormItem>
                        <FormItem label="开卡送优惠券" prop="couponName">
                        	<span @click="clickjfgz">
                            <Input v-model="formValidate.couponName"  style="width:200px" ></Input>
                            </span>
                            <span class="spanColor">设置开卡即送优惠券</span>
                        </FormItem>
					</Row>
					<Row class="rowClass">
						<h4 class="font-700">升级规则</h4>
						<FormItem label="累计消费" prop="cumulativeConsumptionAmount">
                            <InputNumber v-model="formValidate.cumulativeConsumptionAmount" :min='0' style="width:200px" @on-change='changecumulativeConsumptionAmount'></InputNumber>
                            <span class="spanColor">设置累计消费</span>
                        </FormItem>
                        <FormItem label="累计积分" prop="cumulativeIntegral">
                            <InputNumber v-model="formValidate.cumulativeIntegral" :min='0' style="width:200px" @on-change='changecumulativeIntegral'></InputNumber>
                            <span class="spanColor">设置累计积分</span>
                        </FormItem>
					</Row>

					<Row class="rowClass">
						<h4 class="font-700">使用权限说明</h4>
						<FormItem label="使用权限说明" >
                           <Input v-model="formValidate.roleMemo" type="textarea" style="width:100%" ></Input>
                        </FormItem>
					</Row>
					<Row class="rowClass">
						<h4 class="font-700">使用须知</h4>
						<FormItem label="使用须知" >
                           <Input v-model="formValidate.remark" type="textarea" style="width:100%" ></Input>
                        </FormItem>
					</Row>
	           		<!--活动店铺：-->
	           		<Row class="rowClass">
						<div style="display:flex;height:36px;line-height:36px;margin:10px 0 0 40px">
							<span style="width:70px">{{$t('member.crmCard.systore')}}：</span><!--适用店铺：-->
							<RadioGroup v-model="stores" @on-change="getstoresname">
						        <Radio label="全部店铺"></Radio>
						        <Radio label="指定店铺"></Radio>
						        <span>
						        ({{$t('member.crmCard.ys')}}
						    	{{selectedstores.length}}
								{{$t('member.crmCard.ge')}})</span><!--指定店铺-->
						    </RadioGroup>
						</div>
						<div class="table1"  v-if='storesinshow'>
							<Tabs value="name1" :animated='false'>
						        <TabPane :label="$t('member.crmCard.choosestore')" name='name1'><!--选择店铺-->
						        	<Table size="small" border  height="300"  :columns="storeskey1" :data="Allstores" >
									</Table>
									<div class="page-box">
										 <Page :total="storetotal" show-total size='small' :pageSize='storepageSize'  @on-change="storegetData" @on-page-size-change="storechangePageSize"></Page>
									</div>
						        </TabPane>
						        <TabPane :label="$t('member.crmCard.choosestoreY')" ><!--已选店铺-->
						        	<Table size="small" border  height="300"  :columns="storeskey2" :data="selectedstores" >
									</Table>
						        </TabPane>
						    </Tabs>
						</div>
					</Row>
				</Form>

		</div>
		<!--修改-->
		<div class="add-right" v-if='xiugai'>
			<Form ref="formValidateE" :model="formValidate" :rules="ruleValidate" :label-width="120">
					<Row class="rowClass">
						<h4 class="font-700">基本信息</h4>
						<FormItem label="名称" prop="name">
                            <Input v-model="formValidate.name" style="width:200px"></Input>
                            <span class="spanColor">设置会员名称</span>
                        </FormItem>
						<FormItem label="消费金额" prop="consumptionAmount">
                            <InputNumber v-model="formValidate.consumptionAmount" @on-change="changeconsumptionAmount" :min='0' style="width:200px" ></InputNumber> <span>元</span> 
                            <span class="spanColor">设置消费金额</span>
                        </FormItem>
                        <FormItem label="获得积分" prop="earnPoint">
                            <InputNumber v-model="formValidate.earnPoint" :min='0' style="width:200px" @on-change='changeearnPoint'></InputNumber>
                            <span class="spanColor">消费可获得的积分</span>
                        </FormItem>
                        <FormItem label="时间限制" prop="timeMonth">
                            <InputNumber v-model="formValidate.timeMonth" :min='0' style="width:200px" @on-change='changetimeMonth'></InputNumber>月
                            <span class="spanColor">会员卡的时效（月份）填写0为无限制</span>
                        </FormItem>
                        <FormItem label="押金" prop="deposit">
                            <InputNumber  v-model="formValidate.deposit" :min='0' style="width:200px" @on-change="changedeposit"></InputNumber>
                            <span class="spanColor">设置开卡押金</span>
                        </FormItem>
                        <FormItem label="是否默认">
                            <i-Switch v-model="formValidate.defaultValue" @on-change='change'>
									        
							</i-Switch>
							<span style="margin-left:20px">{{formValidate.defaultValue?"已开启":"已关闭"}}</span>
                        </FormItem>
					</Row>
					<Row class="rowClass">
						<h4 class="font-700">开卡信息</h4>
						<FormItem label="消费折扣" prop="discount">
                            <InputNumber v-model="formValidate.discount" :max='1' :min='0.1' style="width:200px" @on-change='changediscount'></InputNumber>
                            <span class="spanColor">设置会员购物的消费折扣</span>
                        </FormItem>
                        <FormItem label="赠送积分" prop="giftIntegral">
                            <InputNumber v-model="formValidate.giftIntegral"  :min='0' style="width:200px" @on-change='changegiftIntegral'></InputNumber>
                            <span class="spanColor">设置开卡即送送积分</span>
                        </FormItem>
                        <FormItem label="开卡送优惠券" prop="couponName">
                        	<span @click="clickjfgz">
                            <Input v-model="formValidate.couponName"  style="width:200px" ></Input>
                            </span>
                            <span class="spanColor">设置开卡即送优惠券</span>
                        </FormItem>
					</Row>
					<Row class="rowClass">
						<h4 class="font-700">升级规则</h4>
						<FormItem label="累计消费" prop="cumulativeConsumptionAmount">
                            <InputNumber v-model="formValidate.cumulativeConsumptionAmount" :min='0' style="width:200px" @on-change='changecumulativeConsumptionAmount'></InputNumber>
                            <span class="spanColor">设置累计消费</span>
                        </FormItem>
                        <FormItem label="累计积分" prop="cumulativeIntegral">
                            <InputNumber v-model="formValidate.cumulativeIntegral" :min='0' style="width:200px" @on-change='changecumulativeIntegral'></InputNumber>
                            <span class="spanColor">设置累计积分</span>
                        </FormItem>
					</Row>

					<Row class="rowClass">
						<h4 class="font-700">使用权限说明</h4>
						<FormItem label="使用权限说明" >
                           <Input v-model="formValidate.roleMemo" type="textarea" style="width:100%" ></Input>
                        </FormItem>
					</Row>
					<Row class="rowClass">
						<h4 class="font-700">使用须知</h4>
						<FormItem label="使用须知" >
                           <Input v-model="formValidate.remark" type="textarea" style="width:100%" ></Input>
                        </FormItem>
					</Row>
           		<!--活动店铺：-->
           		<Row class="rowClass">
				<div style="display:flex;height:36px;line-height:36px;margin:10px 0 0 40px">
					<span style="width:70px">{{$t('member.crmCard.systore')}}：</span>
					<RadioGroup v-model="stores" @on-change="getstoresname">
				        <Radio label="全部店铺"></Radio>
				        <Radio label="指定店铺"></Radio>
				        <span>
				        ({{$t('member.crmCard.ys')}}
				    	{{selectedstores.length}}
						{{$t('member.crmCard.ge')}})</span><!--指定店铺-->
				    </RadioGroup>
				</div>
				<div class="table1"  v-if='storesinshow'>
					<Tabs value="name1" :animated='false'>
				        <TabPane :label="$t('member.crmCard.choosestore')" name='name1'>
				        	<Table size="small" border  height="300"  :columns="storeskey1" :data="Allstores" >
							</Table>
							<div class="page-box">
								 <Page :total="storetotal" show-total size='small' :pageSize='storepageSize'  @on-change="storegetData" @on-page-size-change="storechangePageSize"></Page>
							</div>
				        </TabPane>
				        <TabPane :label="$t('member.crmCard.choosestoreY')" >
				        	<Table size="small" border  height="300"  :columns="storeskey2" :data="selectedstores" >
							</Table>
				        </TabPane>
				    </Tabs>
				</div>
				</Row>
			</Form>
			

		</div>
		<!--详情-->
		<div class="right-content right-detail add-right" ref="detail" style="display:none">
			
			<Form :label-width="120">
				<Row class="rowClass">
						<h4 class="font-700">基本信息</h4>
						<FormItem label="名称" prop="name">
                            <Input disabled v-model="formValidate.name" style="width:200px"></Input>
                            <span class="spanColor">设置会员名称</span>
                        </FormItem>
						<FormItem label="消费金额" prop="consumptionAmount">
                            <InputNumber disabled v-model="formValidate.consumptionAmount" @on-change="changeconsumptionAmount" :min='0' style="width:200px" ></InputNumber> <span>元</span> 
                            <span class="spanColor">设置消费金额</span>
                        </FormItem>
                        <FormItem label="获得积分" prop="earnPoint">
                            <InputNumber disabled v-model="formValidate.earnPoint" :min='0' style="width:200px" @on-change='changeearnPoint'></InputNumber>
                            <span class="spanColor">消费可获得的积分</span>
                        </FormItem>
                        <FormItem label="时间限制" prop="timeMonth">
                            <InputNumber disabled v-model="formValidate.timeMonth" :min='0' style="width:200px" @on-change='changetimeMonth'></InputNumber>月
                            <span class="spanColor">会员卡的时效（月份）填写0为无限制</span>
                        </FormItem>
                        <FormItem label="押金" prop="deposit">
                            <InputNumber disabled v-model="formValidate.deposit" :min='0' style="width:200px"></InputNumber>
                            <span class="spanColor">设置开卡押金</span>
                        </FormItem>
                        <FormItem label="是否默认">
                            <i-Switch disabled v-model="formValidate.defaultValue" @on-change='change'>
									        
							</i-Switch>
							<span style="margin-left:20px">{{formValidate.defaultValue?"已开启":"已关闭"}}</span>
                        </FormItem>
					</Row>
					<Row class="rowClass">
						<h4 class="font-700">开卡信息</h4>
						<FormItem label="消费折扣" prop="discount">
                            <InputNumber disabled v-model="formValidate.discount" :max='1' :min='0.1' style="width:200px" @on-change='changediscount'></InputNumber>
                            <span class="spanColor">设置会员购物的消费折扣</span>
                        </FormItem>
                        <FormItem label="赠送积分" prop="giftIntegral">
                            <InputNumber disabled v-model="formValidate.giftIntegral"  :min='0' style="width:200px" @on-change='changegiftIntegral'></InputNumber>
                            <span class="spanColor">设置开卡即送送积分</span>
                        </FormItem>
                        <FormItem label="开卡送优惠券" prop="couponName">
                        	<span @click="clickjfgz">
                            <Input disabled v-model="formValidate.couponName"  style="width:200px" ></Input>
                            </span>
                            <span class="spanColor">设置开卡即送优惠券</span>
                        </FormItem>
					</Row>
					<Row class="rowClass">
						<h4 class="font-700">升级规则</h4>
						<FormItem label="累计消费" prop="cumulativeConsumptionAmount">
                            <InputNumber disabled v-model="formValidate.cumulativeConsumptionAmount" :min='0' style="width:200px" @on-change='changecumulativeConsumptionAmount'></InputNumber>
                            <span class="spanColor">设置累计消费</span>
                        </FormItem>
                        <FormItem label="累计积分" prop="cumulativeIntegral">
                            <InputNumber disabled v-model="formValidate.cumulativeIntegral" :min='0' style="width:200px" @on-change='changecumulativeIntegral'></InputNumber>
                            <span class="spanColor">设置累计积分</span>
                        </FormItem>
					</Row>

					<Row class="rowClass">
						<h4 class="font-700">使用权限说明</h4>
						<FormItem label="使用权限说明" >
                           <Input disabled v-model="formValidate.roleMemo" type="textarea" style="width:100%" ></Input>
                        </FormItem>
					</Row>
					<Row class="rowClass">
						<h4 class="font-700">使用须知</h4>
						<FormItem label="使用须知" >
                           <Input disabled v-model="formValidate.remark" type="textarea" style="width:100%" ></Input>
                        </FormItem>
					</Row>
				<Row class="rowClass">
	           		<!--活动店铺：-->
					<div style="display:flex;height:36px;line-height:36px;margin:10px 0 0 40px">
						<span style="width:70px">{{$t('member.crmCard.systore')}}：</span><!--适用店铺：-->
						<RadioGroup v-model="stores"  disabled>
					        <Radio disabled :label="$t('member.crmCard.allstore')"></Radio><!--全部店铺-->
					        <Radio disabled :label="$t('member.crmCard.zdstore')"></Radio>
					        <span>
					        ({{$t('member.crmCard.ys')}}
					    	{{selectedstores.length}}
							{{$t('member.crmCard.ge')}})</span><!--指定店铺-->
					    </RadioGroup>
					</div>
					<div class="table1"  v-if='storesinshow'>
						<Tabs value="name1" :animated='false' v-if="selectedstores.length">
					        <TabPane :label="$t('member.crmCard.choosestore')" name='name1'><!--选择店铺-->
					        	<Table  size="small" border  height="300"  :columns="storeskey1" :data="Allstores" >
								</Table>
								<div class="page-box">
									 <Page :total="storetotal" show-total size='small' :pageSize='storepageSize'  @on-change="storegetData" @on-page-size-change="storechangePageSize"></Page>
								</div>
					        </TabPane>
					        <TabPane :label="$t('member.crmCard.choosestoreY')" ><!--已选店铺-->
					        	<Table size="small" border  height="300"  :columns="storeskey2" :data="selectedstores" >
								</Table>
					        </TabPane>
					    </Tabs>
					</div>
				</Row>
			</Form>
				 <!--状态-->
                <!-- <div class="lanren" :class="{bgd1:CrmCardDetail.useTypeDesc=='全店通用',bgd2:CrmCardDetail.useTypeDesc=='新增'}">
                   <span>{{CrmCardDetail.useTypeDesc}}</span> 
                </div>​ -->
		</div>
		<div class='totBottom'>
            <span>共<span style='color:#ff0000'> {{totalcl}} </span>条</span>
            <span>当前第<span style='color:#ff0000'> {{current}} </span>页</span>
     </div>
     <!--优惠券-->
     <Modal v-model="jfgzisshow" width="750px">
		<p slot="header" style="height:30px;line-height:30px">
			
			<span>优惠券</span>
		</p>
		<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
			<Input   :placeholder="$t('public.codeandname')" style="padding:2px 0" v-model="goodskeyword" @on-enter='enterSearch'></Input>
			<span @click="searchInput">
			<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>
			</span>
		</div>
		<!--优惠券-->
		<div slot="footer" style='margin-top:-20px'>
			<div class="table">
				<Table  border  height='300' highlight-row :columns="coupon" :data="couponList" @on-row-click="clickgoodsrow">
				</Table>
				<div class="page-box1">
				 <Page :total="total1" show-total  :pageSize='pageSize1'  @on-change="getData1" @on-page-size-change="changePageSize1"></Page>
				</div>
           	</div>
			
			<div class='title' style='margin:0px'>
				<div style='color:#D15151;font-size:14px'>
					
					</div>
				<div>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="makegoods"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
				</div>
			</div>
		</div>
	</Modal>
  </div>
</template>
<script>
export default{
	data(){
		return{
			couponList:[],
			coupon:[

				{
					title:this.$t('operation.yhqHome.yhqname'),//"优惠券",
					
					align: 'center',
					width:150,
					key:"name"
				},
				{
					title:this.$t('operation.yhqHome.xfje'),//"消费金额",
					
					width:100,
					align: 'center',
					key:"orderAmount"
				},
				{
					title:this.$t('operation.yhqHome.dkje'),//'抵扣金额',
					width:100,
					
					align: 'center',
					key:"amount"
				},
				{
					title:this.$t('operation.yhqHome.xl'),//"限领",
					width:100,
					align: 'center',
					key:"perCount"
				},
				
				
				{
					title:this.$t('operation.yhqHome.beginTime'),//"开始时间",
					
					key:"beginTime",
					align: 'center',
					width:100
				},
				{
					title:this.$t('operation.yhqHome.endTime'),//"结束时间",
					
					key:"endTime",
					align: 'center',
					width:100
				},
				{
					title:this.$t('operation.yhqHome.ylnum'),//"已领数量",
					width:100,
					align: 'center',
					key:"useCount"
				},
				
				{
					title:this.$t('operation.yhqHome.yfnum'),//"已发数量",
					width:100,
					align: 'center',
					key:"sendCount"
				},
				{
					title:this.$t('public.status'),//"活动状态",
					width:100,
					align: 'center',
					key:"statusDesc",
				},
				
			],
			searchKeyword:"",
			gzObj:{},
			total1:0,
			pageSize1:0,
			goodskeyword:"",
			jfgzisshow:false,
			
			stores:"全部店铺",
			issdisabled:true,
			allStore:0,//全店通用
			useType:1,//1全店通用 2部分

			storesinshow:false,
			storesNum:0,
			storepageSize:0,
			storetotal:0,
			storeIds:"",//店铺编号逗号分割
			Allstores:[],
			selectedstores:[],//店铺
			//弹出框店铺data
       		storeskey1:[
                	{
                		title:this.$t('member.crmCard.sotreCode'),//"店铺编号",
                		
                		key:"code"
                	},
                	{
                		title:this.$t('member.crmCard.sotreName'),//"店铺名",
                		
                		key:"name"
                	},
                	
                	{
                		title:this.$t('member.crmCard.person'),//"联系人",
                		
                		key:"person"
                	},
                	{
                		title:"手机号",
                		
                		key:"phone"
                	},
                	{
                	title:this.$t('public.action'),//'操作',
                	width:100,
                	key:"actiion",
                	render:(h,params)=>{
                		return h('Button',{
                			props:{
                				type:"primary"
                			},
                			on:{
                				'click':()=>{
                					this.selectedstores.push(params.row)
                					console.log(this.selectedstores)
                					//对象去重
					                for(var i = 0; i < this.selectedstores.length - 1; i++) {
					                    for(var j = i+1; j < this.selectedstores.length; j++) {
					                      if(this.selectedstores[i].id == this.selectedstores[j].id) {
					                        this.$notify({
					                            title:"",//
					                            message:'该店铺已添加！',
					                            type: 'error',
					                            position: 'bottom-right'
					                        });
					                        console.log(this.selectedstores)
					                        this.selectedstores.splice(j, 1)
					                      }else{
					                        console.log('n')
					                      }
					                    }
					                  }
                					
                				}
                			}
                		},this.$t('public.choosed'))//选取
                	}
                }
                	
            ],
            storeskey2:[
            	{
            		title:"店铺名1",//"",
            		
            		key:"name"
            	},
            	{
            		title:this.$t('member.crmCard.sotreCode'),//"店铺编号",
            		
            		key:"code"
            	},
            	{
            		title:this.$t('member.crmCard.person'),//"联系人",
            		
            		key:"person"
            	},
            	{
            	title:this.$t('public.action'),//'操作',
            	width:100,
            	key:"actiion",
            	render:(h,params)=>{
            		return h('Button',{
            			props:{
            				type:"primary"
            			},
            			on:{
            				'click':()=>{
            					this.selectedstores.splice(params.row.index,1)
            				}
            			}
            		},this.$t('public.cancel'))
            	}
            	}
            	
        	],
			TIME:"无限制",
			
			formValidate:{
				name:"",//会员卡名称
				consumptionAmount:0,//消费金额
				earnPoint:0,//消费获得积分
				discount:1,//会员卡折扣
				giftIntegral:0,//开卡送积分
				couponName:"",//优惠群
				couponId:"",//优惠券id
				cumulativeConsumptionAmount:0,//累计消费
				cumulativeIntegral:0,//累计积分
				remark:"",//备注
				roleMemo:"",//使用权限说明
				deposit:0,
				timeMonth:0,//期限0:时间永久有效    1:有时间限制
				deposit:0,//押金
				tel:"",//电话
				defaultValue:false,//是否默认值 ,
				
			
				yhqZ:1,//张
			},
			ruleValidate:{
				name:[{ required: true, message: '会员卡名称不能为空', trigger: 'blur' }],
				consumptionAmount:[{type:"number", required: true, message: '消费金额不能为空', trigger: 'blur' }],
				
				timeMonth:[{ pattern: /^[1-9]\d*$|^0$/, message: '时间应为数字', trigger: 'blur'  }]
			},
			totalcl:0,
			pageSizecl:0,
			
			xiugai:false,
			
			numIndex:-1,
			current:1,
			addText:true,
			editshow:false,
			addoredit:"",//"新增会员卡",
			height:"",
			indexId:"",//会员卡ID
			AllcrmCard:[],
			uid: this.$store.state.common.token,
			orderListname:[
				{
					label:"全部",
					value:1
				},
				
			],
			CrmCardDetail:{},
	
		}
	},
	methods:{
		
		//是否默认
		change(v){
			this.formValidate.defaultValue=v
		},
		changecumulativeIntegral(s){
			this.formValidate.cumulativeIntegral=s
		},
		changecumulativeConsumptionAmount(s){
			this.formValidate.cumulativeConsumptionAmount=s
		},
		changegiftIntegral(s){
			this.formValidate.giftIntegral=s
		},
		changediscount(s){
			this.formValidate.discount=s
		},
		changetimeMonth(s){
			this.formValidate.timeMonth=s
		},
		changeearnPoint(s){
			this.formValidate.earnPoint=s
		},
		changedeposit(s){
			this.formValidate.deposit=s
		},
		
		//店铺单选
		//获取店铺单选框
		getstoresname(s){
			if(s==this.$t('member.crmCard.allstore')){//全部店铺
				this.allStore=0,//全店通用
				this.useType=1,//全店通用
				this.storesinshow = false
				this.axios.get('/store/query?uid='+this.uid).then((res)=>{
					this.storesNum=res.data.total
				})
			}else if(s=this.$t('member.crmCard.zdstore')){//指定店铺
					this.useType=2,//指定店铺
					this.storesinshow = true 
					this.axios.get('/store/query?uid='+this.uid).then((res)=>{
					this.Allstores= res.data.rows
					this.storepageSize=res.data.pageSize
					this.storetotal=res.data.total
				})
			}
		},
		 //切换一条页
        storegetData(current){
            this.axios.get('/store/query?offset='+current+'&uid='+this.uid).then((res)=>{
                //console.log(res)
                this.Allstores = res.data.rows
                this.storepageSize=res.data.pageSize
				this.storetotal=res.data.total
            })
        },
        //翻页
        storechangePageSize(size){
            this.storepageSize = size
        },
		//店铺编号逗号分隔
		selectStoreMore(){
			this.storesNum = this.selectedstores.length
			this.storeList=this.selectedstores
			let str=[]
			for(let i =0;i<this.selectedstores.length;i++){
				str.push(this.selectedstores[i].id)
			}
			let s = str.join(',')
			this.storeIds = s
			// console.log(this.storeIds)
			
		},
		changeconsumptionAmount(s){
			this.formValidate.consumptionAmount=s
		},
		//点击新增会员卡
		add(){
			this.xiugai=false
			this.addText = true
			this.addoredit=this.$t('member.crmCard.addcrmCard'),//'新增会员卡'
			this.$refs.detail.style.display='none'
			this.formValidate.name=''
			this.formValidate.discount=1
			this.formValidate.timeMonth=0//
			this.formValidate.giftIntegral=0//积分规则id
			this.formValidate.remark=''//备注
			this.formValidate.earnPoint=0//电话
			this.formValidate.defaultValue=false//是否默认值 ,
			this.formValidate.roleMemo=''//使用权限说明
			this.formValidate.consumptionAmount=0
			this.formValidate.couponName=''
			this.formValidate.couponId=''
			this.formValidate.cumulativeConsumptionAmount=0
			this.formValidate.cumulativeIntegral=0
			this.formValidate.discount=1
			this.formValidate.deposit=0
			this.selectedstores=[]
			this.storeIds=''
			this.useType=1
			this.stores="全部店铺"
			
		},
		//点击保存完成POST
		saveCgInfo(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.selectStoreMore()//店铺编号
					this.axios({
						method:"post",
						url:'/crmlevel/add?uid='+this.uid,
						data:{
							name:this.formValidate.name,
							giftIntegral:this.formValidate.giftIntegral,//开卡送积分
							earnPoint:this.formValidate.earnPoint,//消费送积分
							consumptionAmount:this.formValidate.consumptionAmount,//消费金额
							couponName:this.formValidate.couponName,//优惠券名称
							couponId :this.formValidate.couponId,//优惠券id
							cumulativeConsumptionAmount:this.formValidate.cumulativeConsumptionAmount,//累计消费
							cumulativeIntegral:this.formValidate.cumulativeIntegral,//累计积分
							discount:this.formValidate.discount,
							remark:this.formValidate.remark,
							roleMemo:this.formValidate.roleMemo,
							defaultValue:this.formValidate.defaultValue,//是否默认值 ,
							timeMonth:this.formValidate.timeMonth,
							deposit:this.formValidate.deposit,
							storeIds:this.storeIds,
							storeList:this.selectedstores,
							useType:this.useType,
						}
					}).then(res=>{
						if(res.data.status==200){
							this.$notify({
						        title:"",//
						        message:this.$t('public.SaveSuccess'),//
						        type: 'success',
						        position: 'bottom-right'
					        });
					        this.getAllCrmCardS()
					        this.formValidate.name=''
							this.formValidate.discount=1
							this.storeIds=''
							this.formValidate.timeMonth=0//
							this.formValidate.giftIntegral=0//积分规则id
							this.formValidate.remark=''//备注
							this.formValidate.earnPoint=0//电话
							this.formValidate.defaultValue=false//是否默认值 ,
							this.formValidate.roleMemo=''//使用权限说明
							this.formValidate.consumptionAmount=0
							this.formValidate.couponName=''
							this.formValidate.couponId=''
							this.formValidate.cumulativeConsumptionAmount=0
							this.formValidate.cumulativeIntegral=0
							this.formValidate.discount=1
							this.selectedstores=[]
							this.storeIds=''
							this.useType=1
							this.stores="全部店铺"
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
		
		//取消保存
		addCancel(){
			this.formValidate.name=''
			this.formValidate.discount=1
			this.storeIds=''
			
			this.formValidate.timeMonth=0//
			this.formValidate.giftIntegral=0//积分规则id
			this.formValidate.remark=''//备注
			this.formValidate.deposit=0
			this.formValidate.earnPoint=0//电话
			this.formValidate.defaultValue=false//是否默认值 ,
			this.formValidate.roleMemo=''//使用权限说明
			this.formValidate.consumptionAmount=0
			this.formValidate.couponName=''
			this.formValidate.couponId=''
			this.formValidate.cumulativeConsumptionAmount=0
			this.formValidate.cumulativeIntegral=0
			this.formValidate.discount=1
			this.selectedstores=[]
			this.storeIds=''
			this.useType=1
			this.stores="全部店铺"
			
		},
		//点击叉号
		cancelHome(){
			this.$router.push('/operationHome')
		},
		//点击修改
		edit(){
			this.$refs.detail.style.display='none'
			this.editshow=false
			this.xiugai=true
			this.addText=false

		},
		//保存修改
		saveEdit(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.selectStoreMore()
					this.axios.put('crmlevel/update?uid='+this.uid,{
						id:this.indexId,
						name:this.formValidate.name,
						giftIntegral:this.formValidate.giftIntegral,//开卡送积分
						earnPoint:this.formValidate.earnPoint,//消费送积分
						consumptionAmount:this.formValidate.consumptionAmount,//消费金额
						couponName:this.formValidate.couponName,//优惠券名称
						couponId :this.formValidate.couponId,//优惠券id
						cumulativeConsumptionAmount:this.formValidate.cumulativeConsumptionAmount,//累计消费
						cumulativeIntegral:this.formValidate.cumulativeIntegral,//累计积分
						discount:this.formValidate.discount,
						remark:this.formValidate.remark,
						roleMemo:this.formValidate.roleMemo,
						defaultValue:this.formValidate.defaultValue,//是否默认值 ,
						timeMonth:this.formValidate.timeMonth,
						deposit:this.formValidate.deposit,
						storeIds:this.storeIds,
						storeList:this.selectedstores,
						useType:this.useType,
					}).then(res=>{
						if(res.data.status==200){
							this.$notify({
			                        title:"",//
			                        message:this.$t('public.editSuccess'),//
			                        type: 'success',
			                        position: 'bottom-right'
			                    });
							this.getAllCrmCardSA()

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
		//取消修改
		editCancel(){
			this.formValidate.name=''
			this.formValidate.discount=1
			this.storeIds=''
			
			this.formValidate.timeMonth=0//
			this.formValidate.giftIntegral=0//积分规则id
			this.formValidate.remark=''//备注
			this.formValidate.earnPoint=0//电话
			this.formValidate.defaultValue=false//是否默认值 ,
			this.formValidate.roleMemo=''//使用权限说明
			this.formValidate.consumptionAmount=0
			this.formValidate.couponName=''
			this.formValidate.couponId=''
			this.formValidate.cumulativeConsumptionAmount=0
			this.formValidate.cumulativeIntegral=0
			this.formValidate.discount=1
			this.formValidate.deposit=0
			this.selectedstores=[]
			this.storeIds=''
			this.useType=1
			this.stores="全部店铺"
		},
		
		//点击左侧列表
		getcginfo(id,index){
			this.indexId=id
			this.numIndex=index
			this.addText=false
			this.editshow=true
			this.xiugai=false
			this.$refs.detail.style.display='block'
			
			this.getCrmCardDetail(id)
		},
		//会员卡详情
		getCrmCardDetail(id){
			this.axios.get('crmlevel/get/'+this.indexId+'?uid='+this.uid).then(res=>{
				let data=res.data.rows
				this.CrmCardDetail=res.data.rows

				this.formValidate.name=data.name
				this.formValidate.discount=data.discount
				this.storeIds=data.storeIds
				this.formValidate.timeMonth=data.timeMonth
				this.formValidate.giftIntegral=data.giftIntegral
				this.formValidate.remark=data.remark//备注
				this.formValidate.earnPoint=data.earnPoint//电话
				this.formValidate.defaultValue=data.defaultValue//是否默认值 ,
				this.formValidate.roleMemo=data.roleMemo//使用权限说明
				this.formValidate.consumptionAmount=data.consumptionAmount
				this.formValidate.couponName=data.couponName
				this.formValidate.couponId=data.couponId
				this.formValidate.cumulativeConsumptionAmount=data.cumulativeConsumptionAmount
				this.formValidate.cumulativeIntegral=data.cumulativeIntegral
				this.formValidate.discount=data.discount
				this.formValidate.deposit=data.deposit
				this.storeIds=data.storeIds
				this.selectedstores=data.storeList==undefined?[]:data.storeList
				console.log(data.storeList)
				this.useType=data.useType
				if(this.useType==1){
					this.stores="全部店铺"
				}else{
					this.stores="指定店铺"
				}
				console.log(this.CrmCardDetail)
				this.CrmCardDetail.createTime=new Date(this.CrmCardDetail.createTime).toLocaleDateString().replace(/\//g,'-')
			})
		},
		//下拉加载更多
        handleReachEdge(){
			this.current++//默认10条
	 		this.axios.get('crmlevel/query?offset='+this.current+'&uid='+this.uid).then((res)=>{
 				if(this.current>Math.ceil(this.totalcl/this.pageSizecl)){
                        this.current=Math.ceil(this.totalcl/this.pageSizecl)
                    }
		 		res.data.rows.forEach((item)=>{
		 			
		 			this.AllcrmCard.push(item)
		 			this.AllcrmCard.forEach((x,index)=>{
		 				
						x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
					})
		 		})

		 	})
                  
        },
        enterSearchTop(){
        	this.search()
        },
        //点击搜索
        search(){
        	this.axios.get('crmlevel/query?uid='+this.uid+'&keyword='+this.searchKeyword).then(res=>{
        		if(res.data.status==200){
        			this.AllcrmCard=res.data.rows
        			this.totalcl=res.data.total
        			this.pageSizecl=res.data.pageSize
        			this.AllcrmCard.forEach((x,index)=>{
		 				
						x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
					})
        		}
        	})
        },
        //获取所有会员卡
        getAllCrmCard(){
        	this.axios.get('crmlevel/query?uid='+this.uid).then(res=>{
        		if(res.data.status==200){
        			this.AllcrmCard=res.data.rows
        			this.totalcl=res.data.total
        			this.pageSizecl=res.data.pageSize
        			this.AllcrmCard.forEach((x,index)=>{
		 				
						x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
					})
        		}
        	})
        },
         getAllCrmCardS(){
        	this.axios.get('crmlevel/query?uid='+this.uid).then(res=>{
        		if(res.data.status==200){
        			this.AllcrmCard=res.data.rows
        			this.totalcl=res.data.total
        			this.pageSizecl=res.data.pageSize
        			this.AllcrmCard.forEach((x,index)=>{
		 				
						x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
					})
					this.getcginfo(this.AllcrmCard[0].id,0)
        		}
        	})
        },  
         getAllCrmCardSA(){
        	this.axios.get('crmlevel/query?uid='+this.uid).then(res=>{
        		if(res.data.status==200){
        			this.AllcrmCard=res.data.rows
        			this.totalcl=res.data.total
        			this.pageSizecl=res.data.pageSize
        			this.AllcrmCard.forEach((x,index)=>{
		 				
						x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
					})
					this.getcginfo(this.indexId,this.numIndex)
        		}
        	})
        }, 
        del(){
        	if(this.indexId){
         		this.axios.delete('crmlevel/delete/'+this.indexId+'?uid='+this.uid).then((res)=>{
        		if(res.data.status==200){
						this.$notify({
	                        title:"",//
	                        message:this.$t('public.deleteSuccess'),//
	                        type: 'success',
	                        position: 'bottom-right'
	                    });
        			this.getAllCrmCard()
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
        stop(){
        	if(this.indexId){
         		this.axios.post('crmlevel/disabled/'+this.indexId+'?uid='+this.uid).then((res)=>{
        		if(res.data.status==200){
        			
        			this.$notify({
	                        title:"",//
	                        message:this.$t('public.normalT'),
	                        type: 'success',
	                        position: 'bottom-right'
	                    });
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
        start(){
         	if(this.indexId){
         		this.axios.post('crmlevel/enabled/'+this.indexId+'?uid='+this.uid).then((res)=>{
        		if(res.data.status==200){
        			
        			this.$notify({
	                        title:"",//
	                        message:this.$t('public.normalS'),
	                        type: 'success',
	                        position: 'bottom-right'
	                    });
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
        //积分规则弹框
         clickjfgz(){
         	console.log("s")
         	this.jfgzisshow=true
         }, 
         //获取优惠券
         getgz(){
         	this.axios.get('yhj/query?uid='+this.uid).then(res=>{
         		if(res.data.status==200){
         			this.couponList=res.data.rows
         			this.total1=res.data.total
         			this.pageSize1=res.data.pageSize
         		}
         	})
         },
         //点击优惠券一行
         clickgoodsrow(data){
         	this.gzObj=data
         },
         getData1(current){
         	this.axios.get('yhj/query?offset='+current+'&uid='+this.uid).then(res=>{
         		if(res.data.status==200){
         			this.couponList=res.data.rows
         			this.total1=res.data.total
         			this.pageSize1=res.data.pageSize
         		}
         	})
         },
         changePageSize1(size){
         	this.pageSize1=size
         },
         search(){

         },
         //搜索优惠券
          searchInput(){
          		this.axios.get('yhj/query?keyword='+this.goodskeyword+'&uid='+this.uid).then(res=>{
         		if(res.data.status==200){
         			this.couponList=res.data.rows
         			this.total1=res.data.total
         			this.pageSize1=res.data.pageSize
         		}
         	})
          }, 
          //回车搜索
          enterSearch(){
          	this.searchInput()
          },
          modelCancel(){
          	this.jfgzisshow=false
          },
          makegoods(){
          	console.log(this.gzObj)
          	this.formValidate.couponName=this.gzObj.name
          	this.formValidate.couponId=this.gzObj.id
          	this.jfgzisshow=false
          },
        
	},
	mounted(){
		this.TIME="无限制"
		this.timeLimit=0
		this.getgz()
		this.getAllCrmCard()
		this.height = document.documentElement.clientHeight
		
		window.onresize=function(){
			this.height = document.documentElement.clientHeight
		}
	}
}
</script>
<style scoped>
.rowClass{
	padding: 5px 15px 15px 15px;
	background: #f2f2f6;
	margin:10px;
	border-radius: 6px
}
.spanColor{
	color: #9797a1;
}
/*.top-rom */
.rowClass:last-child{
	margin-bottom:120px;
}
.font-700{
	font-weight: 700;
	font-size:18px;
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
.wldw{
	margin-left:20px;
}
.right-top{
height: 60px;
	line-height: 60px;
	display:flex;
	margin-left:360px;
	justify-content: space-between;
	

}
.bg{
	background: #dbe5f1;
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
.page-box1{
	text-align: left;
}
.con-list {
	display:flex;
	align-items: center;
	width: 100%;
	word-wrap:break-word;
	
	border-bottom: solid 1px #E6E6E6;
	padding: 15px 25px;
	
	cursor: pointer;
	position:relative;
}
.con-list:hover{
	cursor:pointer;
}
.con-list .date{
	position:absolute;
	right:10px;
	top:10px;
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
	
	margin-bottom: 10px;
}

.con-list .txt {
	color: #585858;
	font-size: 12px;
}
.add-right {
background: #fff;
height:100%;
margin-left:360px;
padding-top:20px;

}


.add-right-top,.crmCard-top{
	width:100%;
	display:flex;
	margin-top:10px;
}
.crmCard-top{
	margin-right:10px;
}
.crmCard-top span{
	width:120px;
	height:34px;
	line-height: 34px;
	text-align: center
}
.page-box{
	
	margin:5px;
}
 input.qyinput{
	display: inline-block;
	width: 300px;
	height: 30px;
	
	text-indent: 10px;
	color: #555;
	background-color: #fff;
	background-image: none;
	border: 1px solid #eee;
	border-radius:6px;
}
.right-content{
	position:relative;
}
  .lanren {
    position: absolute;
    text-align: center;
    top: 0;
    right: 0;
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
    z-index: 9999999999999;
    top: -66px;
    right: 70px;
    font-size: 12px;
    font-weight: 900;
    transform: rotate(46deg);
}
 input.qyinput:focus{
	border-color: #66afe9;
	outline: 0;
	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 4px rgba(102, 175, 233, .6);
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 4px rgba(102, 175, 233, .6);
}
.crmqy{
	margin-top:30px;
	
}
.bottom{
	margin-top: 20px;
	margin-bottom: 120px;
	width:100%;
	text-align: center;
	display:flex;
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
</style>
<style type="text/css">
.ivu-color-picker{
	padding:0!important;
	margin-top:5px!important;

}
</style>