<template>
	<!--管理-->
	<div class="units-box">
		<div style='display:flex;height:100%;overflow:hidden'>
		
			<Tabs :animated="false"  style="background:#fff;width:100%;height:100%" @on-click="getfhlistbg">
		        <TabPane label="服务看板">
		        	<!--服务看板-->
					<div class="table" >
							<div style='display:flex;justify-content: space-between;line-height:50px;border-bottom:1px solid #e4e4e4'>
								<div style='display:flex;'>
									<div style='display:flex;height:50px;line-height:50px'>
										<div style='margin:0 10px;'>日期:</div>
				               		 	<DatePicker type="date" placeholder="Select date" style="width: 120px;margin-top:8px" v-model='sing' @on-change="dateselected"></DatePicker>
			               		 	</div>
			               		 	<div style='display:flex;height:50px;line-height:50px'>
										<div style='margin:0 10px;'>开始时间:</div>
										<DatePicker type='datetime' :value="kbSsingbTime" format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" style="width: 168px;margin-top:8px;" @on-change='kbSsingTimeChange'></DatePicker>
										<div style='margin:0 10px;'>结束时间:</div>
										<DatePicker type='datetime' :value="kbS1singeTime" format="yyyy-MM-dd HH:mm:ss" confirm  placeholder="结束时间" style="width: 168px;margin-top:8px;" @on-change='kbS1singTimeChange1' @on-ok='OK' @on-clear='CLEAR'></DatePicker>
			               		 	</div>
		               		 	</div>
		               		 	<div style='margin-right:10px' v-if='storeData.length!=0'>
		               		 		<Button type="primary" style='background:#3b77e3;border:none' shape="circle" @click="openOrder">
									 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>开单<!--开单-->
									</Button>
		               		 	</div>
							</div>
							<div class='table-center'>
								<!-- <Table border ref='table' :columns="storeKey" :data="storeData" @on-row-click='clickRowkb'></Table> -->
								 <div class='kbtop-main'>
									 	<div class='kbtop'>
									 		<span class='jsName'>技师</span>
									 		<div style='display:flex;width:100%;overflow:auto' class='timemain'>
										 		<div v-for='(item,index) in timeArr' :key='index' style='width:160px;text-align: center;'>
										 			<div >{{item}}:00</div>
										 		</div>
									 		</div>
									 	</div>
									 	<div class='kbtop1' v-for='(item,index) in storeData' :key='index'>

									 		<div @click='clickRowkb(item,index)'>
									 		<Checkbox :value="numIndex==index" style='position:relative;left:20px;top: 15px;'></Checkbox></div>
									 		<span class='jsName1'>{{item.name}}</span>
									 			<div class='linename' v-for='(j,index) in item.appointment' :key='index' @click='clickOneName(j,index)'>
									 				<div v-if='j.id!=0' :class='{c:j.status==3,s:j.status==31}' class='user'>
									 					<span>{{j.name}}</span>
									 					<span>{{j.mobile}}</span>
									 				</div>
									 			</div>

									 	</div>
								 </div>
								<div class='normal'>
									<div class='xx-pre' >
										<span class='xx' style='background:#EBF0FB'></span>
										<span>已开单</span>
									</div>
									<div class='xx-pre' style='margin-left:20px'>
										<span class='xx'></span>
										<span>已预约</span>
									</div>
									<div class='xx-pre' style='margin-left:20px'>
										<span class='xx' style='background:#e4e4e4'></span>
										<span>休息/请假</span>
									</div>
									<div class='xx1-pre' style='margin-left:20px'>
										<span class='xx1'></span>
										<span>正常值班</span>
									</div>
								</div>
								<div class="page-box">
									 <Page v-if='storetotal!=0' size='small' :total="storetotal" show-total  :pageSize='storepageSize'  @on-change="storegetData" @on-page-size-change="storechangePageSize"></Page>
								</div>
							</div>
					</div>
		        </TabPane>
		        <TabPane label="排班管理">
		        	<!--排班管理-->
					<div class="table" >
							<div style='display:flex;justify-content: space-between;line-height:50px;border-bottom:1px solid #e4e4e4'>
								<div style='display:flex;'>
									<div style='display:flex;height:50px;line-height:50px'>
										<div style='margin:0 10px;font-weight:600'>日期:
											<span style="width: 200px;margin-top:8px;"><Tag>{{selecTime==""?"无数据":selecTime}}</Tag></span>
										</div>
			               		 	</div>
		               		 	</div>
		               		 	<div style='margin-right:10px'>
		               		 		<!-- <Button type="primary" style='background:#3b77e3;border:none' shape="circle" @click="addpb">
									 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>新建排班
									</Button> -->
									<Button type="primary" style='background:#40ca98;border:none' shape="circle" @click="pbqj">
									 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>请假<!--请假-->
									</Button>
									<Dropdown trigger="click" >
				                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">{{$t('public.more')}}
				                		<span><i class="ivu-icon ivu-icon-chevron-down"></i></span><!--更多-->
				            		</Button>
				            		<DropdownMenu slot="list">
				                		<!-- <span @click="del"><DropdownItem >删除</DropdownItem></span>
				                		<span @click="stop"><DropdownItem >停用</DropdownItem></span>
				                		<span @click="start"><DropdownItem >启用</DropdownItem></span> -->
				            		</DropdownMenu>
			            		</Dropdown>
		               		 	</div>
							</div>
							<div class='table-center'>
								<Table border highlight-row :columns="pbKey" :data="pbdata" @on-row-click='clickRopb' ></Table>
								<div class='normal'>
									<div class='xx-pre'>
										<span class='xx'></span>
										<span>休息/请假</span>
									</div>
									<div class='xx1-pre' style='margin-left:20px'>
										<span class='xx1'></span>
										<span>值班</span>
									</div>
								</div>
								<div class="page-box">
									 <Page :total="pbtotal" size='small' show-total  :pageSize='pbpageSize'  @on-change="pbgetData" @on-page-size-change="pbchangePageSize"></Page>
								</div>
							</div>
					</div>
		        </TabPane>
		        <TabPane label="服务管理">
		        	<!--服务管理-->
					<div class="table" >
							<div style='display:flex;justify-content: space-between;line-height:50px;border-bottom:1px solid #e4e4e4'>
								<div style='display:flex;'>
									<div style='display:flex;height:50px;line-height:50px'>
										<div style='margin:0 10px;font-weight:600'>状态:</div><!--v-model='singserver' -->
										<Select style="width:100px;margin-top:8px;margin-right:10px" v-model='singserver' @on-change="serverselected">
				                    		<Option v-for="item in serverListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
				               		 	</Select>
			               		 	</div>
			               		 	<div>
			               		 		<Input style='margin-top:7px;width:400px' v-model='lskeyword' placeholder='请输入编码/名称' @on-enter='entersSearchls' >
				                    		<span slot="append"  @click='searchls' style='cursor:pointer'>搜索</span>
				            			</Input>
			               		 	</div>
		               		 	</div>
		               		 	<div style='margin-right:10px'>
		               		 		<Button type="primary" style='background:#3b77e3;border:none' shape="circle" @click="addservergoods">
									 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>添加<!--添加-->
									</Button>
									<Button type="primary" style='background:#40ca98;border:none' shape="circle" @click="serverOpen">
									 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>开放<!--开放-->
									</Button>
									<Dropdown trigger="click" >
				                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">{{$t('public.more')}}
				                		<span><i class="ivu-icon ivu-icon-chevron-down"></i></span><!--更多-->
				            		</Button>
				            		<DropdownMenu slot="list">
				                		<!-- <span @click="del"><DropdownItem >删除</DropdownItem></span>
				                		<span @click="stop"><DropdownItem >停用</DropdownItem></span>
				                		<span @click="start"><DropdownItem >启用</DropdownItem></span> -->
				            		</DropdownMenu>
			            		</Dropdown>
		               		 	</div>
							</div>
							<div class='table-center'>
								<Table border highlight-row :columns="serverkey" :data="serverData" @on-row-click='clickRowServer'></Table>
								<div class="page-box">
									 <Page size='small' :total="servertotal" show-total  :pageSize='serverpageSize'  @on-change="servergetData" @on-page-size-change="serverchangePageSize"></Page>
								</div>

							</div>
					</div>
		        </TabPane>
		        <TabPane label="技师管理">
		        	<!--技师管理-->
					<div class="table">
							<div style='display:flex;justify-content: space-between;line-height:50px;border-bottom:1px solid #e4e4e4'>

								<div style='display:flex;'>
			               		 	<div style='margin-left:10px'>
			               		 		<Input style='margin-top:7px;width:400px' v-model='jskeyword' placeholder='请输入编码/名称' @on-enter='entersSearchjs' >
				                    	<span slot="append"  @click='searchjs' style='cursor:pointer'>搜索</span>
				            		</Input>
			               		 	</div>
		               		 	</div>
		               		 	<div style='margin-right:10px'>
		               		 		<Button type="primary" style='background:#3b77e3;border:none' shape="circle" @click="addjs">
									 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>新增<!--新增-->
									</Button>

									<Dropdown trigger="click" >
				                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">{{$t('public.more')}}
				                		<span><i class="ivu-icon ivu-icon-chevron-down"></i></span><!--更多-->
				            		</Button>
				            		<DropdownMenu slot="list">
				                		<!-- <span @click="del"><DropdownItem >删除</DropdownItem></span>
				                		<span @click="stop"><DropdownItem >停用</DropdownItem></span>
				                		<span @click="start"><DropdownItem >启用</DropdownItem></span> -->
				            		</DropdownMenu>
			            		</Dropdown>
		               		 	</div>
							</div>
							<div class='table-center'>
								<Table border highlight-row :columns="jskey" :data="jsData" @on-row-click='clickjsrow'></Table>
								<div class="page-box">
									 <Page size='small' :total="jstotal" show-total  :pageSize='jspageSize'  @on-change="jsgetData" @on-page-size-change="jschangePageSize"></Page>
								</div>
							</div>
					</div>
		        </TabPane>
		        <TabPane label="设置">
		        	<!--设置-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;line-height:50px;border-bottom:1px solid #e4e4e4'>
								<div></div>
		               		 	<div style='margin-right:10px'>
		               		 		<Button type="primary" style='background:#3b77e3;border:none' shape="circle" @click="savekbB" v-if='issetting'>
									 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>保存
									</Button>
									<Button type="primary" style='background:#40ca98;border:none' shape="circle" @click="editKB" v-if='issettingE'>
									 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>修改
									</Button>
		               		 	</div>
							</div>
							<div>
								<div style='display:flex;'>
			               		 	<div style='display:flex;height:50px;line-height:50px'>
										<div style='margin:0 10px;font-weight:600'>上午时间段:</div>
										<TimePicker :value="SsingbTime" format="HH:mm" placeholder="Select time" style="width: 168px;margin-top:8px;" @on-change='SsingTimeChange'></TimePicker>

				               		 	<TimePicker :value="S1singeTime" format="HH:mm" placeholder="Select time" style="width: 168px;margin-top:8px;margin-left:10px" @on-change='S1singTimeChange1'></TimePicker>

			               		 	</div>
		               		 	</div>
		               		 	<div style='display:flex;'>
			               		 	<div style='display:flex;height:50px;line-height:50px'>
										<div style='margin:0 10px;font-weight:600'>下午时间段:</div>
										<TimePicker :value="XsingbTime" format="HH:mm" placeholder="Select time" style="width: 168px;margin-top:8px;" @on-change='XsingTimeChange'></TimePicker>
				               		 	<TimePicker :value="X1singeTime" format="HH:mm" placeholder="Select time" style="width: 168px;margin-top:8px;margin-left:10px" @on-change='X1singTimeChange1'></TimePicker>

			               		 	</div>
		               		 	</div>
							</div>
					</div>
		        </TabPane>
		    </Tabs>
		</div>
	<div class="mark"></div>
	<!--新增技师侧栏-->
	<div class='addHotjs'>
		<div class='addHot-head'>
			<div style='display:flex;height:50px;line-height:50px'>
				<div style='margin:0 10px;'>新增技师</div>
   		 	</div>
			<div>
				 <Button shape="circle" type="ghost" @click="addSildeJs('formValidatejs')" style='margin-right:5px;border:none;background:#3b77e3;color:#fff'>
                   <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>完成<!--完成-->
                </Button>
                <span @click="cancelhotjs" style="cursor:pointer; margin-right: 30px;margin-left: 5px;"><Icon type="close" ></Icon></span>
			</div>
		</div>
		<div style='padding:10px'>
			<div style='display:flex'>
				<div class='right-left'>
					<div>
	                    <el-upload
						  class="avatar-uploader"
						  :action="logoUrl"
						  name='file'
						  :show-file-list="false"
						  :on-success="addsucess"
						  >
						  <img v-if="pic" :src="pic" class="avatar" width='80' height='80'>
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
	                </div>
				</div>
				<div style='margin:25px 0 0 0px;width:600px'>
					<Form ref="formValidatejs" :model="formValidatejs" :rules="ruleValidatejs" :label-width="80">
						<div style='display:flex;width:100%'>
			           		<FormItem label="姓名" prop="name" style='width:50%'>
			                	<Input v-model="formValidatejs.name"  placeholder="姓名"></Input>
			           		</FormItem>
							<FormItem label="手机" prop="phone" style='width:50%'>
		                		<Input v-model="formValidatejs.phone"  placeholder="手机"></Input>
		           			</FormItem>
		           		</div>
						<FormItem label="密码" prop="password" style='width:100%'>
							<div style='display:flex'>
			                	<Input v-model="formValidatejs.password" type='password' style='width:218px' placeholder="密码"></Input>
			                	<div style='margin-left:20px;width:50%'>
				                	<RadioGroup v-model="gender" @on-change="selsectedSex">
								        <Radio label="1">
								            <span>{{$t('public.man')}}</span><!--男-->
								        </Radio>
								        <Radio label="0">
								            <span>{{$t('public.woman')}}</span>
								        </Radio>
									</RadioGroup>
								</div>
							</div>
		           		</FormItem>
		           		<div style='display:flex'>
			           		<FormItem label="服务项目" prop="serviceContentName" style='width:50%'>
			           			<span @click='clickSEVER'>
			                		<Input v-model="formValidatejs.serviceContentName"  placeholder="服务项目"></Input>
			                	</span>
			           		</FormItem>
			           		<FormItem label="擅长项目" prop="skilled" style='width:50%;margin-left:10px'>
			                	<Input v-model="formValidatejs.skilled"  placeholder="擅长项目"></Input>
			           		</FormItem>
		           		</div>
		           		<FormItem label="技师职位" >
		           			<Select @on-change='changePosition' v-model='jsPosition'>
						        <Option v-for="item in position"  :value="item.value" :key="item.value" >{{ item.label }}</Option>
						    </Select>
			              <!--  <Input v-model="formValidatejs.position"  placeholder="技师职位"></Input> -->
			           	</FormItem>
		           		<FormItem label="技师等级" prop="level">
			                	<Input v-model="formValidatejs.level"  placeholder="技师等级"></Input>
			           	</FormItem>
			           	<FormItem label="个人简介" prop="intro" >
			                	<Input type='textarea' v-model="formValidatejs.intro"  placeholder="个人简介"></Input>
			           	</FormItem>
					</Form>
				</div>
			</div>
		</div>
	</div>
	<div class="markjs"></div>
	<!--新增服务商品侧栏-->
	<div class='addHotgoods'>
		<div class='addHot-head'>
			<div style='display:flex;height:50px;line-height:50px'>
				<div style='margin:0 10px;'>新增服务商品</div>
   		 	</div>
			<div>
				 <Button shape="circle" type="ghost" @click="addSildegoods('formValidategoods')" style='margin-right:5px;border:none;background:#3b77e3;color:#fff'>
                   <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>完成<!--完成-->
                </Button>
                <span @click="cancelhotgoods" style="cursor:pointer; margin-right: 30px;margin-left: 5px;"><Icon type="close" ></Icon></span>

			</div>
		</div>
		<div style='padding:10px'>
			<div style='display:flex'>
				<div class='right-left'>
					<div>
	                    <el-upload
						  class="avatar-uploader"
						  :action="logoUrl"
						  name='file'
						  :show-file-list="false"
						  :on-success="addsucessgoods"
						  >
						  <img v-if="servicePic" :src="servicePic" class="avatar" width='80' height='80'>

						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						  <div style='margin-top:5px
						  '>尺寸800*800主图</div>
						</el-upload>
	                </div>
				</div>
				<div style='margin:25px 0 0 0px;width:600px'>
					<Form ref="formValidategoods" :model="formValidategoods" :rules="ruleValidategoods" :label-width="80">
						<FormItem label="服务名称" prop="name">
			                <Input v-model="formValidategoods.name" placeholder="服务名称"></Input>
		           		</FormItem>
		           		<FormItem label="服务价格" prop="price">
			                <Input v-model="formValidategoods.price" placeholder="服务价格"></Input>
		           		</FormItem>
		           		<FormItem label="服务消耗" prop="consumables">
			                <Input v-model="formValidategoods.consumables" placeholder="服务消耗"></Input>
		           		</FormItem>
		           		<FormItem label="服务时长" prop="time">
			                <Input v-model="formValidategoods.time" placeholder="服务时长"></Input>
		           		</FormItem>
					</Form>
				</div>
			</div>
			<!--服务人员技师-->
			<div class='serverjs'>
				<div class='serverjs-title'>服务人员</div>
				<div>
					<Table border highlight-row :columns="jshikey" :data="jshiData" @on-row-click='clickRowjshi' @on-select='checkedSjs' @on-select-all='checkedAllSjs' @on-select-cancel='cancelSelect' @on-selection-change='allSelectAndCancel1'></Table>
					<!-- <div class="page-box">
						<Page v-if='jshitotal!=0' :total="jshitotal" show-total  :pageSize='jshipageSize'  @on-change="jshigetData" @on-page-size-change="jshichangePageSize"></Page>
					</div> -->
				</div>
			</div>
		</div>
	</div>
	<div class="markgoods"></div>
	<!--新增技师下的弹框服务内容-->
	<Modal v-model="serverisshow" width="700px">
	    <p slot="header" style="height:30px;line-height:30px;text-align:center">

	      <span>服务项目</span>
	    </p>
	     	<Table border ref="selection" size="small" :columns="serverCkey" :data="serverCData"  @on-row-click='clickrowserverC' @on-select='seletedServerC' @on-select-cancel='cancelSelectedC' @on-select-all='selectedCall' @on-selection-change='allSelectAndCancel'></Table>
				<!--底部的分页-->
			<div style='margin-top:5px'>
				 <Page :total="serverCtotal" show-total  :pageSize='serverCpagesize'  @on-change="serverCgetData" @on-page-size-change="serverCchangePageSize"></Page>
			</div>
	    <div slot="footer">
	      <div style='margin-top:-10px'><!--class='footer-mark'-->
	        <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancelSeverC'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button> <!--取消-->
			<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="sureSeverC"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button><!--确认-->
	      </div>
	    </div>
  	</Modal>
  	<!--服务项目下技师修改-->
  	<Modal v-model="jsisshow" width="400px">
	    <p slot="header" style="height:30px;line-height:30px;text-align:center">

	      <span>技师修改</span>
	    </p>
	    <div>
	    	<Form ref="formValidategoodsJS" :model="formValidategoodsJS" :rules="ruleValidategoodsJS" :label-width="80">
				<FormItem label="名称" prop="name">
	                <Input v-model="formValidategoodsJS.name" placeholder="名称"></Input>
           		</FormItem>
           		<FormItem label="手机" prop="phone">
	                <Input v-model="formValidategoodsJS.phone" placeholder="手机"></Input>
           		</FormItem>
           		<FormItem label="技师项目">
	                <div  style='display:flex;flex-wrap: wrap;'>
	                	<!-- <div style='padding:5px 20px;margin:5px;border:1px solid #e4e4e4;position:relative' v-for='(item,index) in jswerverXM'  @mouseover='mouseover(index)' >
	                		<span>{{item.name}}</span>
	                		<span style='position:absolute;top:-8px;right:2px;cursor:pointer'v-if='chaIndex==index' @click='delSj(item,index)'><Icon type="close-round"></Icon></span>
	                	</div> -->
	                	<Tag type="border" closable color="#199DFF" :fade='false' v-for='(item,index) in jswerverXM' :key='index' @on-close="handleClose(item,index)">{{item.name}}</Tag>
	                </div>
	                <div style='color:#199DFF;cursor:pointer' @click='clickADD'><Icon type="plus-round" ></Icon><span style='margin-left:5px'>添加</span></div>
           		</FormItem>
			</Form>
	    </div>
	    <div slot="footer">
	      <div style='margin-top:-10px'><!--class='footer-mark'-->
	      	<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancelEditjs'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button> <!--取消-->

	        <Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="sureEditjs('formValidategoodsJS')"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button><!--确认-->
	      </div>
	    </div>
  	</Modal>
  	<!--排班请假弹框-->
  	<Modal v-model="pbqjisshow" width="400px">
	    <p slot="header" style="height:30px;line-height:30px;text-align:center">

	      <span>请假申请</span>
	    </p>
	    <div>
	    	<Form ref="formValidatepbqj" :model="formValidatepbqj" :rules="ruleValidatepbqj" :label-width="80">

				<FormItem label="技师" prop="name">
	                <Input v-model="formValidatepbqj.name" disabled placeholder="技师"></Input>
           		</FormItem>

	           		<FormItem label="请假时间" prop="btime">
		                <DatePicker type="date" :value='formValidatepbqj.btime' style="width:100%" @on-change='changeTimeB'></DatePicker>
	           		</FormItem>
	           		<FormItem label="截至时间" prop="etime">
		                <DatePicker type="date" :value='formValidatepbqj.etime' style="width:100%" @on-change='changeTimeE'></DatePicker>
	           		</FormItem>

           		<FormItem label="请假原因" prop="remark">
	                <Input type='textarea' v-model="formValidatepbqj.remark" placeholder="请假原因"></Input>
           		</FormItem>

			</Form>
	    </div>
	    <div slot="footer">
	      <div style='margin-top:-10px'>

	        <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancelpbqj'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button> <!--取消-->

	        <Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="surepbqj('formValidatepbqj')"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button><!--确认-->
	      </div>
	    </div>
  	</Modal>
  	<!--开单-->
  	<Modal v-model="kbkdisshow" width="500px">
	    <p slot="header" style="height:30px;line-height:30px;text-align:center">

	      <span>开单</span>
	    </p>
	    <div>
	    	<Form ref="formValidatepbkd" :model="formValidatepbkd" :rules="ruleValidatepbkd" :label-width="100">

				<FormItem label="技师" prop="name">
	                <Input v-model="formValidatepbkd.name" disabled placeholder="技师"></Input>
           		</FormItem>
           		<FormItem label="手机" prop="mobile">
	                <Input v-model="formValidatepbkd.mobile" disabled placeholder="手机"></Input>
           		</FormItem>
           		<FormItem label="预约人" prop="Reservations">
	                <Input v-model="formValidatepbkd.Reservations"  placeholder="预约人"></Input>
           		</FormItem>
           		<FormItem label="预约人手机" prop="ReservationsMobile">
	                <Input v-model="formValidatepbkd.ReservationsMobile"  placeholder="预约人手机"></Input>
           		</FormItem>
           		<FormItem label="预约服务项目" prop="items">
           			<span @click='clickYY'>
	                	<Input v-model="formValidatepbkd.items"  placeholder="预约服务项目"></Input>
	                </span>
           		</FormItem>

			</Form>
	    </div>
	    <div slot="footer">
	      <div style='margin-top:-10px'>

	        <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancelpbkd'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button> <!--取消-->

	        <Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="surepbkd('formValidatepbkd')"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button><!--确认-->
	      </div>
	    </div>
  	</Modal>
  	<!--开单选择服务内容-->
	<Modal v-model="KDserverisshow" width="700px">
	    <p slot="header" style="height:30px;line-height:30px;text-align:center">
	      <span>服务项目</span>
	    </p>
	     	<Table border highlight-row size="small" :columns="KDserverCkey" :data="KDserverCData"  @on-row-click='KDclickrowserverC'></Table>
				<!--底部的分页 @on-select='KDseletedServerC' @on-select-cancel='KDcancelSelectedC' @on-select-all='KDselectedCall'-->
			<div style='margin-top:5px'>
				 <Page :total="KDserverCtotal" show-total  :pageSize='KDserverCpagesize'  @on-change="KDserverCgetData" @on-page-size-change="KDserverCchangePageSize"></Page>
			</div>
	    <div slot="footer">
	      <div style='margin-top:-10px'><!--class='footer-mark'-->
	        <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='KDcancelSeverC'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button> <!--取消-->
			<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="KDsureSeverC"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button><!--确认-->
	      </div>
	    </div>
  	</Modal>

  	<Modal v-model="editJSisshow" width="700px">
	    <p slot="header" style="height:30px;line-height:30px;text-align:center">
	      <span>服务项目</span>
	    </p>
	     	<Table border highlight-row size="small" :columns="editJSkey" :data="editJSData"  @on-row-click='editJSclickrow'></Table>
				<!--底部的分页 @on-select='KDseletedServerC' @on-select-cancel='KDcancelSelectedC' @on-select-all='KDselectedCall'-->
			<div style='margin-top:5px'>
				 <Page :total="editJStotal" show-total  :pageSize='editJSpagesize'  @on-change="editJSgetData" @on-page-size-change="editJSchangePageSize"></Page>
			</div>
	    <div slot="footer">
	      <div style='margin-top:-60px'><!--class='footer-mark'-->
	        <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='editJScancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button> <!--取消-->
			<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="editJSsure"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button><!--确认-->
	      </div>
	    </div>
  	</Modal>
	</div>
</template>
<script>
import LoadUrl from '@/components/common/actionLoad'
	export default {
		data() {
			return {
				//看板与设置***********************************************************
				//设置保存与修改
				issetting:true,
				issettingE:false,
				SsingbTime:"",//上午上班时间
				S1singeTime:"",//上午下班时间

				XsingbTime:"",//下午上班时间
				X1singeTime:"",//下午上班时间

				settingId:"",//修改设置的id
				kbkdisshow:false,//开单
				formValidatepbkd:{
					name:"",//技师名称
					mobile:"",//技师手机号
					Reservations:"",//预约人
					ReservationsMobile:"",//预约人手机
					items:"",//预约项目
					itemsid:"",//预约项目id
				},
				ruleValidatepbkd:{
					Reservations:[{ required: true, message: '预约人不能为空', trigger: 'blur' },],
					ReservationsMobile:[
						{ required: true, message:this.$t('orders.phoneNoEmpty'), trigger: 'blur' },
						{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号码' }
					],
					items:[{ required: true, message: '预约项目不能为空', trigger: 'blur' }],

				},
				//开单技师的服务项目
				KDserverisshow:false,
				KDserver:{},
				KDserverCData:[],
				KDserverCtotal:0,
				KDserverCpagesize:0,
				KDserverCkey:[
					{
						title:"服务名称",
						key:"name"
					},
					{
						title:"服务价格",
						key:"price"
					},
					{
						title:"服务时长",
						key:"serviceTime"
					},
					{
						title:"服务消耗",
						key:"consumables"
					},

					{
						title:"服务状态",
						key:"statusDesc",
						render:(h,params)=>{
							return h('span',{
								style:{
									color:params.row.status==0?"#d53c39":"#40ca98"
								}
							},params.row.statusDesc)
						}
					},

				],
				//日期：
				dateListname:[
					{
						label:"今天",
						value:"0"
					},
				],

				singTime:"",
				kbsingTime:"",
				kbSsingbTime:"",//上午
				kbS1singeTime:"",

				kbXsingbTime:"",//下午
				kbX1singeTime:"",
				numIndex:-1,
				sing:"",
				singS:"",
				//服务看板
				kbObj:{},//看板一行数据
				kbId:"",//服务看版id
				storeData:[],
				storeKey:[
					{
						title:"技师",
						key:"name"
					},

				],
				timeArr:[],//时间段数组
				storetotal: 0,
				storepageSize: 0,
				fhindex:0,
				fhlist:[
					{
						label:"服务看板",
						value:0
					},
					{
						label:"排班管理",
						value:1
					},
					{
						label:"服务管理",
						value:2
					},
					{
						label:"技师管理",
						value:3
					},
					{
						label:"设置",
						value:4
					},
				],
				type:'',//下拉选中
		//排班管理******************************************************************
				pbtotal: 0,
				pbpageSize: 0,
				selecTime:"",

				pbqjObj:{},//排班一行数据
				pbqjisshow:false,//请假
				pbqjID:"",//技师id
				formValidatepbqj:{
					name:"",//技师
					btime:"",
					etime:"",
					remark:"",//请假原因
				},
				ruleValidatepbqj:{
					name:[{ required: true, message: '技师不能为空', trigger: 'change' }],
					btime:[{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
					etime:[{ required: true, message: '结束时间不能为空', trigger: 'blur' }],
					remark:[{ required: true, message: '请假原因不能为空', trigger: 'change' }]
				},
				day0:"",
				day1:"",
				day2:"",
				day3:"",
				day4:"",
				day5:"",
				day6:"",
				pbdata:[],
				pbKey:[
					{
						title:"技师",
						align:"center",
						width:100,
						key:"name",

					},
					{
						title:this.day0,
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('div',{
								style:{
									// background:params.row.xx[0].isxx?"#FCECED":"",
									color:params.row.scheduling[0].type?"#d53c39":"",
									width:'100%',
									lineHeight:"47px",
									height:"47px"
								}
							},params.row.scheduling[0].isxx)
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day0)
						}
					},
					{
						title:this.day1,
						align:"center",

						key:"isxx",
						render:(h,params)=>{
							return h('div',{
								style:{
									// background:params.row.xx[1].isxx?"#FCECED":"",
									color:params.row.scheduling[1].type?"#d53c39":"",
									width:'100%',
									lineHeight:"47px",
									height:"47px"
								}
							},params.row.scheduling[1].isxx)
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day1)
						}
					},
					{
						title:this.day2,
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('div',{
								style:{
									// background:params.row.xx[2].isxx?"#FCECED":"",
									color:params.row.scheduling[2].type?"#d53c39":"",
									width:'100%',
									lineHeight:"47px",
									height:"47px"
								}
							},params.row.scheduling[2].isxx)
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day2)
						}
					},
					{
						title:this.day3,
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('div',{
								style:{
									// background:params.row.xx[3].isxx?"#FCECED":"",
									color:params.row.scheduling[3].type?"#d53c39":"",
									width:'100%',
									lineHeight:"47px",
									height:"47px"
								}
							},params.row.scheduling[3].isxx)
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day3)
						}

					},
					{
						title:this.day4,
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('div',{
								style:{
									// background:params.row.xx[4].isxx?"#FCECED":"",
									color:params.row.scheduling[4].type?"#d53c39":"",
									width:'100%',
									lineHeight:"47px",
									height:"47px"
								}
							},params.row.scheduling[4].isxx)
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day4)
						}
					},
					{
						title:this.day5,
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('div',{
								style:{
									// background:params.row.xx[5].isxx?"#FCECED":"",
									color:params.row.scheduling[5].type?"#d53c39":"",
									width:'100%',
									lineHeight:"47px",
									height:"47px"
								}
							},params.row.scheduling[5].isxx)
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day5)
						}
					},
					{
						title:this.day6,
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('div',{
								style:{
									// background:params.row.xx[6].isxx?"#FCECED":"",
									color:params.row.scheduling[6].type?"#d53c39":"",
									width:'100%',
									lineHeight:"47px",
									height:"47px"
								}
							},params.row.scheduling[6].isxx)
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day6)
						}
					},

				],
				//新建排班的数据
				day00:"",
				day01:"",
				day02:"",
				day03:"",
				day04:"",
				day05:"",
				day06:"",
				pbdata1:[],
				pbKey1:[
					{
						title:"技师",
						align:"center",
						key:"name"
					},
					{
						title:this.day00,//"周一",
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('Checkbox',{
								props:{
									value:params.row.scheduling[0].type==0?true:false
								}
							})
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day0)
						}
					},
					{
						title:this.day01,//"周二",
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('Checkbox',{
								props:{
									value:params.row.scheduling[1].type==0?true:false
								}
							})
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day01)
						}
					},
					{
						title:this.day02,//"周三",
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('Checkbox',{
								props:{
									value:params.row.scheduling[2].type==0?true:false
								}
							})
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day02)
						}
					},
					{
						title:this.day03,//"周四",
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('Checkbox',{
								props:{
									value:params.row.scheduling[3].type==0?true:false
								}
							})
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day03)
						}
					},
					{
						title:this.day04,//"周五",
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('Checkbox',{
								props:{
									value:params.row.scheduling[4].type==0?true:false
								}
							})
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day04)
						}
					},
					{
						title:this.day05,//"周六",
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('Checkbox',{
								props:{
									value:params.row.scheduling[5].type==0?true:false
								}
							})
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day05)
						}
					},
					{
						title:this.day06,//"周日",
						align:"center",
						key:"isxx",
						render:(h,params)=>{
							return h('Checkbox',{
								props:{
									value:params.row.scheduling[6].type==0?true:false
								}
							})
						},
						renderHeader:(h,params)=>{
							return h('span',{

							},this.day06)
						}
					},
				],
				// pbListnameadd:[],//新建排班日期
				singpbadd:"",//排班起始时间

				uid: this.$store.state.common.token,
		//服务管理******************************************************************
				editJSisshow:false,
				editJSpagesize:0,
				editJStotal:0,
				editJSData:[],
				editJSobj:{},
				editJSkey:[
					{
						title:"服务名称",
						key:"name"
					},
					{
						title:"服务价格",
						key:"price"
					},
					{
						title:"服务时长",
						key:"serviceTime"
					},
					{
						title:"服务消耗",
						key:"consumables"
					},

					{
						title:"服务状态",
						key:"statusDesc",
						render:(h,params)=>{
							return h('span',{
								style:{
									color:params.row.status==0?"#d53c39":"#40ca98"
								}
							},params.row.statusDesc)
						}
					},
				],
				jswerverXM:[],//技师的服务项目
				chaIndex:-1,
				servicePic:"",//服务商品图片
				//服务项目下修改技师
				serverID:"",//服务id
				servergoodsJsId:"",//技师id
				servergoodsJsObj:{},//添加服务商品下的一行技师数据
				formValidategoodsJS:{
					name:"",//
					phone:"",//手机号
				},
				ruleValidategoodsJS:{
					name:[{ required: true, message: '技师名称不能为空', trigger: 'blur' }],
					phone:[
						{ required: true, message:this.$t('orders.phoneNoEmpty'), trigger: 'blur' },
						{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号码' }
					],
				},
				jshikey:[
					{
						type:"selection",
						width:60
					},
					{
						title:"服务技师",
						align:"center",
						key:"name",
					},
					{
						title:"职位",
						align:"center",
						key:"positionDesc",
					},
					{
						title:"联系电话",
						align:"center",
						key:"phone",
					},
					{
						title:"主要服务项目",
						align:"center",
						key:"appointments",
					},
					{
						title:"操作",
						align:"center",
						key:"",
						render:(h,params)=>{
							return h('span',{
								style:{
									color:"#4F83E5",
									cursor:"pointer"
								},
								on:{
									"click":(e)=>{
										//jswerverXM
										//GET /technician/TbyA 技师下服务项目列表
										this.jsisshow=true
										this.jswerverXM=[]
										this.axios.get('/technician/TbyA?id='+params.row.id+'&uid='+this.uid).then(res=>{
											if(res.data.status==200){
												res.data.rows.forEach((x,index)=>{
													let arr={
														id:res.data.rows[index].id,
														name:res.data.rows[index].name,
													}
													this.jswerverXM.push(arr)
													console.log(this.jswerverXM)
												})
											}
										})
										this.servergoodsJsId=params.row.id
										this.formValidategoodsJS.name=params.row.name
										this.formValidategoodsJS.phone=params.row.phone
									}
								}
							},'编辑')
						}
					},
				],//技师
				jshiData:[],
				jshiArr:[],//技师拼接字符串数组
				jshiArrStr:[],//技师拼接字符串
				jshitotal:0,
				jshipageSize:0,
				jsisshow:false,
				//服务管理新增数据
				formValidategoods:{
					name:"",//服务名称
					price:"",//服务价格
					time:"",//服务时间
					consumables:"",//服务消耗
				},
				ruleValidategoods:{
					name:[{ required: true, message: '服务名称不能为空', trigger: 'blur' }],//
					price:[{ required: true, message: '服务价格不能为空', trigger: 'blur' },
							{ pattern: /^[1-9]\d*$|^0$/, message: '服务价格应为数字', trigger: 'change' }
							],//服务价格
					time:[
						 { required: true, message: '服务时长不能为空', trigger: 'blur' },
						 ]

				},
				singserver:'3',
				serverListname:[
					{
						label:"全部",
						value:'3'
					},
					{
						label:"未开放",
						value:"0"
					},
					{
						label:"开放",
						value:"1"
					},
				],
				lskeyword:"",//搜索关键词
				serverData:[],
				serverkey:[

					{
						title:"服务名称",
						key:"name"
					},
					{
						title:"服务时间",
						key:"serviceTime",

					},
					{
						title:"服务消耗",
						key:"consumables"
					},
					{
						title:"服务费用",
						key:"price"
					},
					{
						title:"服务状态",
						key:"statusDesc",
						render:(h,params)=>{
							return h('span',{
								style:{
									color:params.row.status==0?"#d53c39":"#40ca98"
								}
							},params.row.statusDesc)
						}
					},
				],
				servertotal:0,
				serverpageSize:0,
		//技师管理******************************************************************
				position:[
					{
						label:"员工",
						value:"0"
					},
					// {
					// 	label:"店长",
					// 	value:"1"
					// },
				],
				jsrowId:"",//技师id
				jsData:[],
				jskey:[
					{
						title:"头像",
						key:"pic",
						align:"center",
						width:80,
						render:(h, params) =>{
	                    	return h('div',[
	                			h('img',{
	                				attrs:{
	                					src:params.row.pic
	                				},
	                				style:{
	                					width:'40px',
	                					height:'40px',
	                					borderRadius:"50%"
	                				}
	                			})
	                		])
                    	}
					},
					{
						title:"工名",
						key:"name"
					},
					{
						title:"工号",
						key:"id"
					},
					{
						title:"性别",
						key:"genderDesc"
					},
					{
						title:"职位",
						key:"positionDesc"
					},
					{
						title:"手机号",
						key:"phone"
					},
					{
						title:"服务项目",
						key:"appointments"
					},
					// {
					// 	title:"权限",
					// 	key:"roleId"
					// },
					{
						title:"入职时间",
						key:"createTime"
					},

				],
				jstotal:0,
				jspageSize:0,
				jskeyword:"",
				logoUrl:LoadUrl.httpPrefix.Url+'file/action/upload/image/url?uid='+this.$store.state.common.token,
				pic:'',
				//新增技师数据
				gender:'1',//性别
				serverisshow:false,//服务项目弹框
				serverCkey:[
					{
						type:"selection",
						width:60
					},
					{
						title:"服务名称",
						key:"name"
					},
					{
						title:"服务价格",
						key:"price"
					},
					{
						title:"服务时长",
						key:"serviceTime"
					},
					{
						title:"服务消耗",
						key:"consumables"
					},
					{
						title:"服务描述",
						key:"serviceDetails"
					},
					{
						title:"服务状态",
						key:"statusDesc",
						render:(h,params)=>{
							return h('span',{
								style:{
									color:params.row.status==0?"#d53c39":"#40ca98"
								}
							},params.row.statusDesc)
						}
					},

				],
				serverCData:[],
				serverCtotal:0,
				serverCpagesize:0,
				serverCobj:{name:"xx",id:1},
				serverCid:"",//服务项目id字符串拼接
				serverCArrId:[],
				serverCArrName:[],
				jsPosition:'0',
				formValidatejs:{
					// accountName:"",//账号
					password:"",//密码
					name:"",//技师名称
					phone:"",//手机号
					level:"",//等级
					position:"",//职位
					email:"",//邮箱
					intro:"",// 个人简介 ,
					serviceContentid:"",//服务内容
					serviceContentName:"",//服务内容
					skilled:"",//擅长项目
				},
				ruleValidatejs:{
					accountName:[{ required: true, message: '账号不能为空', trigger: 'blur' }],
					password:[
						{ required: true, message:this.$t('public.pssEmpty'), trigger: 'blur' },
						{ pattern: /^[0-9a-zA-Z]+$/, message: '密码应为数字或字母' }
						],
					name:[{ required: true, message: '技师名称不能为空', trigger: 'blur' }],
					email:[{type:"email", message: '请输入正确的邮箱' }],
					phone:[
						{ required: true, message:this.$t('orders.phoneNoEmpty'), trigger: 'blur' },
						{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号码' }

					],
				},

			}
		},
		methods: {
			//切换
			getfhlistbg(index){
				this.fhindex=index
				switch(index){
					case 0:
						//'服务看板'
						// this.getServerKB()
					break;
					case 1:
						//'排班管理'
						this.getpb()
					break;
					case 2:
						//'服务管理'
						this.getServerList()
					break;
					case 3:
						//'技师管理'savekbB()
						this.getJS()
					break;
					case 4:
						//设置
						this.getSetting()
					break;
				}

			},
		//服务看板*****************************************************************
			//服务看板列表GET /appointment/query 预约管理
			getServerKB(btime,etime){
				if(btime=='' || etime==''){
					this.$notify({
                        title:"",//
                        message:'请选择时间段',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.axios.get('/appointment/query?uid='+this.uid,{
						params:{
							startTime:btime,
							endTime:etime
						}

					}).then(res=>{
						if(res.data.status==200){
							console.log(res.data.rows)
							this.storeData=res.data.rows
							// console.log(this.$refs.table.columns)
							// this.storeData.forEach((x=>{
							// 	let arr={
							// 		key:x.name,
							// 		title:"技师"
							// 	}
							// 	this.$refs.table.columns.push(arr)
							// }))
							this.storetotal=res.data.total
							this.storepageSize=res.data.pageSize
						}
					})
				}

			},

			//选择时间段
			//上午开始时间
			 kbSsingTimeChange(date){
        		this.kbSsingbTime=date
	        },
	        //结束开始时间
	        kbS1singTimeChange1(date){
	        	this.kbS1singeTime=date
	        	console.log(this.kbS1singeTime)
	        },
	         //时间确认
	        OK(){
	        	this.timeArr=[]
	        	this.storeData=[]
	        	let bTime=new Date(new Date(this.kbSsingbTime).getTime()).getHours()//获取小时
	        	let eTime=new Date(new Date(this.kbS1singeTime).getTime()).getHours()//获取小时
	        	this.timeArr=this.itemarray(bTime,eTime)//页面显示时间
	        	this.getServerKB(this.kbSsingbTime,this.kbS1singeTime)//获取看板
	        },
	        //获取两个时间之间的数
	        itemarray(btime,etime){
				var arr=[];
				for(var i=btime;i<=etime;i++){
					arr.push(i);
				}
				return arr;
			},
	        //时间取消
	        CLEAR(){
	        	this.kbSsingbTime=''
        		this.kbS1singeTime=''
	        },
	        //开单
	        //确认 POST /appointment/add 开单
	        surepbkd(name){
	        	this.$refs[name].validate((valid) => {
	        		if(valid){
	        			this.axios.post('/appointment/add?uid='+this.uid,{

	        					technicianId:this.kbId,
	        					// startDate:this.formValidatepbkd.btime,
	        					// endDate:this.formValidatepbkd.btime,
	        					name:this.formValidatepbkd.Reservations,
	        					mobile:this.formValidatepbkd.ReservationsMobile,
	        					itemId:this.formValidatepbkd.itemsid,

	        			}).then(res=>{
							if(res.data.status==200){
								this.$notify({
				                        title:"",//
				                        message:'开单成功',
				                        type: 'success',
				                        position: 'bottom-right'
				                    });
								this.cancelpbkd()//调点击取消按钮
								this.OK()
								// this.getServerKB()//服务看板列表
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
	        //开单取消
	        cancelpbkd(){
	        	this.kbId=''
				this.formValidatepbkd.Reservations=''
				this.formValidatepbkd.ReservationsMobile=''
				this.formValidatepbkd.itemsid=''
				this.numIndex=-1

				this.kbkdisshow=false
	        },
	        //开单
			openOrder(){
				if(this.kbId==''){
					this.$notify({
                        title:"",//
                        message:'请选择技师',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.kbkdisshow=true
				}
			},
			//点击获取技师预约项目
			clickYY(){
				this.KDserverisshow=true
				this.axios.get('technician/TbyA?id='+this.kbId+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.KDserverCData=res.data.rows
						this.KDserverCtotal=res.data.total
						this.KDserverCpageSize=res.data.pageSize
					}
				})
			},
			//单击开单获取技师服务项目一行
			KDclickrowserverC(data,index){
				console.log(data)
				this.KDserver=data
			},
			//开单获取技师服务确认
			KDsureSeverC(){
				this.formValidatepbkd.itemsid=this.KDserver.id
				this.formValidatepbkd.items=this.KDserver.name
				this.KDserverisshow=false
			},
			//开单获取技师服务取消
			KDcancelSeverC(){
				this.formValidatepbkd.itemsid=''
				this.formValidatepbkd.items=''
				this.KDserverisshow=false
			},
			//开单获取技师服务翻页
			KDserverCgetData(current){
				this.axios.get('technician/TbyA?offset='+current+'&id='+this.kbId+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.KDserverCData=res.data.rows
						this.KDserverCtotal=res.data.total
						this.KDserverCpageSize=res.data.pageSize
					}
				})
			},
			KDserverCchangePageSize(size){
				this.KDserverCpageSize=size
			},

			//单击看板一行
			clickRowkb(item,index){
				console.log(item)
				this.numIndex=index
				this.kbObj=item
				this.kbId=item.id//技师id
				this.formValidatepbkd.name=item.name//技师名称
				this.formValidatepbkd.mobile=item.phone//技师手机

			},
			//服务看板下拉
			//日期
			dateselected(v){
				this.sing=v
			},
			//时间段
			timeselected(v){
				this.singTime=v
			},

			//单击一个方框
			clickOneName(item,index){
				console.log(item)
			},
			//看板翻页
			storegetData(current){
				this.axios.get('/appointment/query?offset='+current+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.storeData=res.data.rows
						this.storetotal=res.data.total
						this.storepageSize=res.data.pageSize
					}
				})
			},
			storechangePageSize(size){
				this.storepageSize==size
			},
		//获取排班GET /scheduling/query 排班列表**********************************************************************************************************************

			//获取排班列表
			getpb(){
				this.axios.get('/scheduling/query?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.pbdata=res.data.rows
						this.pbtotal=res.data.total
						this.pbpageSize=res.data.pageSize//
						if(this.pbdata.length==0){
							return
						}else{
							this.selecTime=new Date(this.pbdata[0].scheduling[0].startTime).toLocaleDateString().replace(/\//g,'-')+' '+'—'+' '+new Date(this.pbdata[0].scheduling[0].endTime).toLocaleDateString().replace(/\//g,'-')
						this.pbdata.forEach((x,index)=>{
							x.scheduling.forEach((j,i)=>{
								switch(j.type){
									case 0:
										j.isxx='休息'
									break;
									case 1:
										j.isxx='值班'
									break;

								}
								let d= new Date(j.scheduling).getDay()
								let dm= new Date(j.scheduling).getMonth()+1
								let dd= new Date(j.scheduling).getDate()
								if(i == 0){
									this.day0 = this.match(d)+'  '+dm+'月'+dd+'日'
								}else if(i == 1){
									this.day1 = this.match(d)+'  '+dm+'月'+dd+'日';
								}else if(i == 2){
									this.day2 = this.match(d)+'  '+dm+'月'+dd+'日';
								}else if(i == 3){
									this.day3 = this.match(d)+'  '+dm+'月'+dd+'日';
								}else if(i == 4){
									this.day4 = this.match(d)+'  '+dm+'月'+dd+'日';
								}else if(i == 5){
									this.day5 = this.match(d)+'  '+dm+'月'+dd+'日';
								}else if(i == 6){
									this.day6 = this.match(d)+'  '+dm+'月'+dd+'日';
								}

							})

						})
						}

					}
				})
			},
			match(i){
				if(i == 0){
					return "星期日";
				}else if(i == 1){
					return "星期一";
				}else if(i == 2){
					return "星期二";
				}else if(i == 3){
					return "星期三";
				}else if(i == 4){
					return "星期四";
				}else if(i == 5){
					return "星期五";
				}else if(i == 6){
					return "星期六";
				}
			},
			//点击排班一行
			clickRopb(data){
				this.pbqjObj=data
				this.pbqjID=data.id
				console.log(this.pbqjID)
			},
			//排班请假
			pbqj(){
				if(this.pbqjID==''){
					this.$notify({
                        title:"",//
                        message:'请选中技师',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.pbqjisshow=true
					this.formValidatepbqj.name=this.pbqjObj.name
				}
			},
			//请假弹框选中时间
			changeTimeB(date){
				console.log(date)
				this.formValidatepbqj.btime=date
			},
			changeTimeE(date){
				this.formValidatepbqj.etime=date
			},
			//请假确认PUT /scheduling/add 请假
			surepbqj(){
				this.axios.post('/scheduling/add?uid='+this.uid,{
					technicianId:this.pbqjID,
					// type:0,
					reason:this.formValidatepbqj.remark,
					schedulingStart:this.formValidatepbqj.btime,
					schedulingEnd:this.formValidatepbqj.etime,
				}).then(res=>{
					if(res.data.status==200){
						this.$notify({
	                        title:"",//
	                        message:'请假成功',
	                        type: 'success',
	                        position: 'bottom-right'
	                    });
	                   this.cancelpbqj()//取消侧栏
						this.getpb()
					}else{
						this.$notify({
	                        title:"",//
	                        message:res.data.errorMessage,
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
					}
				})
			},
			//取消
			cancelpbqj(){
				this.pbqjisshow=false
				this.pbqjisshow=false
               	this.formValidatepbqj.btime=''
				this.formValidatepbqj.etime=''
				this.formValidatepbqj.remark=''
				this.pbqjID=''
				this.pbqjObj={}
			},
			//排班翻页
			pbgetData(current){
				this.axios.get('/scheduling/query?offset='+current+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.pbdata=res.data.rows
						this.pbtotal=res.data.total
						this.pbpageSize=res.data.pageSize//
						this.selecTime=new Date(this.pbdata[0].scheduling[0].startTime).toLocaleDateString().replace(/\//g,'-')+' '+'—'+' '+new Date(this.pbdata[0].scheduling[0].endTime).toLocaleDateString().replace(/\//g,'-')
						this.pbdata.forEach((x,index)=>{
							x.scheduling.forEach((j,i)=>{
								switch(j.type){
									case 0:
										j.isxx='休息'
									break;
									case 1:
										j.isxx='值班'
									break;

								}
								let d= new Date(j.scheduling).getDay()
								if(i == 0){
									this.day0 = this.match(d);
								}else if(i == 1){
									this.day1 = this.match(d);
								}else if(i == 2){
									this.day2 = this.match(d);
								}else if(i == 3){
									this.day3 = this.match(d);
								}else if(i == 4){
									this.day4 = this.match(d);
								}else if(i == 5){
									this.day5 = this.match(d);
								}else if(i == 6){
									this.day6 = this.match(d);
								}

							})

						})
					}
				})
			},
			pbchangePageSize(size){
				this.pbpageSize=size
			},
		//服务管理**********************************************************************************************************************
		//服务开放PUT /beautyItem/open/{id} 开单
			serverOpen(){
				if(this.serverID==''){
					this.$notify({
                        title:"",//
                        message:'请选中服务！',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.axios.put('/beautyItem/open/'+this.serverID+'?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.$notify({
		                        title:"",//
		                        message:'服务开放成功',
		                        type: 'success',
		                        position: 'bottom-right'
		                    });
		                    this.serverID=''
		                    this.getServerList()//获取服务
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
			//点击服务一行
			clickRowServer(data){
				this.serverID=data.id
			},
			//GET /beautyItem/query 服务项目列表
			getServerList(){
				this.axios.get('/beautyItem/query?uid='+this.uid+'&status=3').then(res=>{
					if(res.data.status==200){
						this.serverData=res.data.rows
						this.servertotal=res.data.total
						this.serverpageSize=res.data.pageSize
					}
				})
			},
			//服务管理翻页
			servergetData(current){
				this.axios.get('/beautyItem/query?offset='+current+'&uid='+this.uid+'&status='+this.singserver).then(res=>{
					if(res.data.status==200){
						this.serverData=res.data.rows
						this.servertotal=res.data.total
						this.serverpageSize=res.data.pageSize
					}
				})
			},
			serverchangePageSize(size){
				this.serverpageSize=size
			},
			//点击添加服务管理
			addservergoods(){
				$('.addHotgoods').animate({right:"0px"});
				$('.markgoods').css('display','block')
				this.getservergoodsjsList()//添加服务下查询的技师
			},
			//添加服务下查询的技师
			getservergoodsjsList(){
				this.axios.get('/technician/query?length=999&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.jshiData=res.data.rows
						this.jshitotal=res.data.total
						this.jshipageSize=res.data.pageSize
						this.jshiData.forEach(x=>{
							x._checked=false
						})
					}
				})
			},
			//勾选服务下技师
			checkedSjs(selection,row){
				row._checked=true
				if(row._checked){
					this.jshiArr.push(row.id)
					this.jshiArrStr=this.jshiArr.join(',')
					console.log(this.jshiArrStr)
				}
			},
			//取消选中某一项
			cancelSelect(selection,row){//selection：已选项数据 row：取消选择的项数据
				if(!row._checked){
					this.jshiArr.splice(this.jshiArr.indexOf(row.id),1)
					this.jshiArrStr=this.jshiArr.join(',')
					console.log(this.jshiArrStr)
				}
			},
			//全选服务下技师
			checkedAllSjs(selection){//已选项数据
				selection.forEach(x=>{
					if(!x._checked){
						this.jshiArr.push(x.id)
						this.jshiArrStr=this.jshiArr.join(',')
						console.log(this.jshiArrStr)
					}

				})
			},
			//全选发生变化
			allSelectAndCancel1(selection){
				this.jshiArrStr=''
				this.jshiArr=[]
				selection.forEach((x,index)=>{
					if(this.selectAllStatus){
						this.jshiArr.push(x.id)
						this.jshiArrStr=this.jshiArr.join(',')
					}
				})

			},
			//添加服务下的技师翻页
			jshigetData(current){
				this.axios.get('/technician/query?offset='+current+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.jshiData=res.data.rows
						this.jshitotal=res.data.total
						this.jshipageSize=res.data.pageSize
					}
				})
			},
			jshichangePageSize(size){
				this.jshipageSize=size
			},
			//添加服务商品侧栏取消
			cancelhotgoods(){
				$('.addHotgoods').animate({right:"-800px"});
				$('.markgoods').css('display','none')
				this.formValidategoods.name=''
				this.formValidategoods.price=''
				this.servicePic=''//服务商品图片
				this.formValidategoods.time=''//服务时间
				this.formValidategoods.consumables=''//消耗品
				this.jshiArr=[]
				this.jshiArrStr=''
			},
			//服务管理查询技师
			//单击技师一行id technicianId
			clickRowjshi(data){
				this.servergoodsJsObj=data
				//GET /technician/TbyA 技师下服务项目列
				// this.jswerverXM=data.appointments.split('|')//转为数组

			},

			//删除
			handleClose(item,index){
				this.jswerverXM.splice(index,1)
			},
			//点击添加
			clickADD(){
				this.editJSisshow=true
				this.axios.get('/beautyItem/query?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.editJSData=res.data.rows
						this.editJStotal=res.data.total
						this.editJSpagesize=res.data.pageSize

					}
				})
			},
			//服务翻页
			editJSgetData(current){
				this.editJSisshow=true
				this.axios.get('/beautyItem/query?offset='+current+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.editJSData=res.data.rows
						this.editJStotal=res.data.total
						this.editJSpagesize=res.data.pageSize
					}
				})
			},
			editJSchangePageSize(size){
				this.editJSpagesize=size
			},
			//点击一行
			editJSclickrow(data){
				this.editJSobj={
					id:data.id,
					name:data.name
				}
				console.log(this.editJSobj)
				// this.editJSobj.id=data.id
				// this.editJSobj.name=data.name

			},
			//添加技师确认
			editJSsure(){
				this.jswerverXM.push(this.editJSobj)
				//对象去重
				for(var i = 0; i < this.jswerverXM.length - 1; i++) {
			        for(var j = i+1; j < this.jswerverXM.length; j++) {
			          if(this.jswerverXM[i].id == this.jswerverXM[j].id) {
			          	this.$notify({
	                        title:"",//
	                        message:'该项目已存在！',
	                        type: 'error',
	                        position: 'bottom-right'
	                    });
			            this.jswerverXM.splice(j, 1)
			          }else{
			          	console.log('d1')
			          }
			        }
			      }
				console.log(this.jswerverXM)

				this.editJSisshow=false
			},

			//取消
			editJScancel(){
				this.editJSisshow=false
			},

			//添加服务商品下的编辑技师确认
			sureEditjs(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						let arr=[]
						let arrStr=''
						this.jswerverXM.forEach((x)=>{
							arr.push(x.id)
							arrStr=arr.join(',')
						})
						console.log(arrStr)
						this.axios.put('/technician/update?uid='+this.uid,{
							id:this.servergoodsJsId,
							appointments:arrStr,
							name:this.formValidategoodsJS.name,
							phone:this.formValidategoodsJS.phone
						}).then(res=>{
							if(res.data.status==200){
								this.$notify({
			                        title:"",//
			                        message:'修改技师成功',
			                        type: 'success',
			                        position: 'bottom-right'
			                    });
			                    this.jsisshow=false
								this.servergoodsJsId=''
								this.formValidategoodsJS.name=''
								this.formValidategoodsJS.phone=''
			                    this.getservergoodsjsList()//添加服务下查询的技师
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
			//编辑技师取消
			cancelEditjs(){
				this.jsisshow=false
				this.servergoodsJsId=''
				this.formValidategoodsJS.name=''
				this.formValidategoodsJS.phone=''
			},
			//保存服务项目POST /beautyItem/add 服务项目添加
			addSildegoods(name){
				this.$refs[name].validate((valid) => {
					if(valid){


						this.axios.post('/beautyItem/add?uid='+this.uid,{
							servicePic:this.servicePic,//服务商品图片
							serviceTime:this.formValidategoods.time,//服务时间
							consumables:this.formValidategoods.consumables,//消耗品
							name:this.formValidategoods.name,//服务名称
							price:Number(this.formValidategoods.price),//服务价格
							tec:this.jshiArrStr//技师id
						}).then(res=>{
							if(res.data.status==200){
								this.$notify({
			                        title:"",//
			                        message:'新增技师成功',
			                        type: 'success',
			                        position: 'bottom-right'
			                    });

								this.cancelhotgoods()
								this.getServerList()//获取服务项目
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
			//服务管理上传图片
			addsucessgoods(res,file){
				this.servicePic=res.rows.url
			},

			//服务管理状态下拉singserver
			serverselected(v){
				this.singserver=v
				this.getS(this.singserver)
			},
			//下拉查询服务状态
			getS(s){
				this.axios.get('/beautyItem/query?uid='+this.uid+'&status='+s).then(res=>{
					if(res.data.status==200){
						this.serverData=res.data.rows
						this.servertotal=res.data.total
						this.serverpageSize=res.data.pageSize
					}
				})
			},
			//服务管理下搜索商品
			searchls(){
				this.axios.get('/beautyItem/query?keyword='+this.lskeyword+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.serverData=res.data.rows
						this.servertotal=res.data.total
						this.serverpageSize=res.data.pageSize
					}
				})
			},
			//回车搜索
			entersSearchls(){
				this.searchls()
			},
		//技师管理GET /technician/query 技师列表***********************************************************
			getJS(){
				this.axios.get('/technician/query?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.jsData=res.data.rows
						this.jspageSize=res.data.pageSize
						this.jstotal=res.data.total
						this.jsData.forEach((x)=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							if(x.gender==1){
								x.genderDesc='男'
							}else if(x.gender==0){
								x.genderDesc='女'
							}else{
								x.genderDesc='未知'
							}
						})
					}
				})
			},
			//单击技师列表一行
			clickjsrow(data){
				console.log(data)
				this.jsrowId=data.id//技师列表一行的id
			},
			//删除技师
			del(){
				if(this.jsrowId==''){
					this.$notify({
                        title:"",//
                        message:'请选择技师',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.axios.delete().then(res=>{
						if(res.data.status==200){
							this.$notify({
		                        title:"",//
		                        message:this.$t('public.deleteSuccess'),//
		                        type: 'success',
		                        position: 'bottom-right'
		                    });
							this.getJS()
							this.jsrowId=''
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
			//启用
			start(){
				if(this.jsrowId==''){
					this.$notify({
                        title:"",//
                        message:'请选择技师',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.axios.post().then(res=>{
						if(res.data.status==200){
							this.$notify({
		                        title:"",//
		                        message:this.$t('public.normalS'),
		                        type: 'success',
		                        position: 'bottom-right'
		                    });
							this.getJS()
							this.jsrowId=''
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
			//停用
			stop(){
				if(this.jsrowId==''){
					this.$notify({
                        title:"",//
                        message:'请选择技师',
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.axios.post().then(res=>{
						if(res.data.status==200){
							this.$notify({
		                        title:"",//
		                        message:this.$t('public.normalT'),
		                        type: 'success',
		                        position: 'bottom-right'
		                    });
							this.getJS()
							this.jsrowId=''
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
			//搜索技师
			searchjs(){
				this.axios.get('/technician/query?keyword='+this.jskeyword+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.jsData=res.data.rows
						this.jspageSize=res.data.pageSize
						this.jstotal=res.data.total
						this.jsData.forEach((x)=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							if(x.gender==1){
								x.genderDesc='男'
							}else if(x.gender==0){
								x.genderDesc='女'
							}else{
								x.genderDesc='未知'
							}
						})
						this.jskeyword=''
					}
				})
			},
			//回车搜索
			entersSearchjs(){
				this.searchjs()
			},
			//技师翻页
			jsgetData(current){
				this.axios.get('/technician/query?offset='+current+'&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.jsData=res.data.rows
						this.jspageSize=res.data.pageSize
						this.jstotal=res.data.total
						this.jsData.forEach((x)=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							if(x.gender==1){
								x.genderDesc='男'
							}else if(x.gender==0){
								x.genderDesc='女'
							}else{
								x.genderDesc='未知'
							}
						})
					}
				})
			},
			jschangePageSize(size){
				this.jspageSize=size
			},
			//新增技师
			addjs(){
				$('.addHotjs').animate({right:"0px"});
				$('.markjs').css('display','block')
			},
			 //上传图片成功
            addsucess(res,file){
                this.pic=res.rows.url
            },
            //技师取消
			cancelhotjs(){
				$('.addHotjs').animate({right:"-800px"});
				$('.markjs').css('display','none')
				this.formValidatejs.name=''
				this.pic=''
				this.formValidatejs.phone=''
				this.formValidatejs.level=''
				this.formValidatejs.email=''
				this.formValidatejs.skilled=''
				this.formValidatejs.password=''
				this.formValidatejs.intro=''
				this.formValidatepbqj.position=''
				//服务项目id,name
				this.serverCArrId=[]
            	this.serverCArrName=[]
            	this.formValidatejs.serviceContentid=''
            	this.formValidatejs.serviceContentName=''
				this.gender='1'
			},
			//选中职位
			changePosition(p){
				this.formValidatejs.position=p
			},
			//保存新增技师POST /technician/add 技师添加
			addSildeJs(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						this.axios.post('/technician/add?uid='+this.uid,{
							name:this.formValidatejs.name,
							pic:this.pic,
							password:this.formValidatejs.password,
							level:this.formValidatejs.level,
							position:Number(this.formValidatepbqj.position),
							phone:this.formValidatejs.phone,
							email:this.formValidatejs.email,
							skilled:this.formValidatejs.skilled,
							appointments:this.formValidatejs.serviceContentid,//服务项目id
							intro:this.formValidatejs.intro,
							gender:Number(this.gender),
						}).then(res=>{
							if(res.data.status==200){
								this.$notify({
			                        title:"",//
			                        message:'新增技师成功',
			                        type: 'success',
			                        position: 'bottom-right'
			                    });
			                    this.getJS()
			                    this.cancelhotjs()

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
			//选择性别
            selsectedSex(label){
            	this.gender = label
            },
            //新增技师服务内容弹框
            clickSEVER(){
            	this.serverisshow=true
            	this.serverCArrId=[]
            	this.serverCArrName=[]
            	this.formValidatejs.serviceContentid=''
            	this.formValidatejs.serviceContentName=''
            	this.getserverData()
            },
            //获取服务内容GET /beautyItem/query 服务项目列表
            getserverData(){
            	this.axios.get('/beautyItem/query?uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			this.serverCData=res.data.rows
            			this.serverCpagesize=res.data.pageSize
            			this.serverCtotal=res.data.total
            			//x._checked
            			this.serverCData.forEach((x)=>{
            				x._checked=false
            			})

            		}
            	})
            },
            //服务内容翻页
            serverCgetData(current){
            	this.axios.get('/beautyItem/query?offset='+current+'&uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			this.serverCData=res.data.rows
            			this.serverCpagesize=res.data.pageSize
            			this.serverCtotal=res.data.total
            			this.serverCData.forEach((x)=>{
            				x._checked=false
            			})
            		}
            	})
            },
            serverCchangePageSize(size){
            	this.serverCpagesize=size
            },
            //单击一条服务内容formValidatejs.serviceContent
            clickrowserverC(selection){
            	this.serverCobj=selection
            },
            //添加技师选中服务一项
            seletedServerC(selection,row){
            	row._checked=true
            	if(row._checked){
            		this.serverCArrId.push(row.id)
	            	this.serverCArrName.push(row.name)
	            	this.formValidatejs.serviceContentid=this.serverCArrId.join(',')
            		this.formValidatejs.serviceContentName=this.serverCArrName.join(',')
            	}
            	console.log(this.formValidatejs.serviceContentid)
            },
            //取消选中服务一项
            cancelSelectedC(selection,row){
            	if(!row._checked){
            		this.serverCArrId.splice(this.serverCArrId.indexOf(row.id),1)
            		this.serverCArrName.splice(this.serverCArrName.indexOf(row.name),1)
            		this.formValidatejs.serviceContentid=this.serverCArrId.join(',')
            		this.formValidatejs.serviceContentName=this.serverCArrName.join(',')
            	}
            	console.log(this.formValidatejs.serviceContentid)
            },
            //全选
            selectedCall(selection){
            	selection.forEach(x=>{
					if(!x._checked){
						this.serverCArrId.push(x.id)
						this.formValidatejs.serviceContentid=this.serverCArrId.join(',')
						this.serverCArrName.push(x.name)
						this.formValidatejs.serviceContentName=this.serverCArrName.join(',')
						console.log(this.formValidatejs.serviceContentName)
					}

				})
            },
            //全选发生变化
			allSelectAndCancel(selection){
				this.serverCArrName=''
				this.serverCArrId=[]
				selection.forEach((x,index)=>{
					this.serverCArrId.push(x.id)
					this.formValidatejs.serviceContentid=this.serverCArrId.join(',')
					this.serverCArrName.push(x.name)
					this.formValidatejs.serviceContentName=this.serverCArrName.join(',')
				})
				console.log(this.jshiArrStr)
			},
            //服务内容弹框确认
            sureSeverC(){
            	this.serverisshow=false
            	// let arrId=[]
            	// let arrName=[]
            	// arrId.push(this.serverCobj.id)
            	// arrName.push(this.serverCobj.name)
           		// this.formValidatejs.serviceContentid=arrId.join(',')
            	// this.formValidatejs.serviceContentName=arrName.join(',')
            	// console.log(this.formValidatejs.serviceContentid)

            },
            //服务内容弹框取消
            cancelSeverC(){
            	this.serverisshow=false
            	this.serverCArrId=[]
            	this.serverCArrName=[]
            	this.formValidatejs.serviceContentid=''
            	this.formValidatejs.serviceContentName=''
            },
    	//**********************************************************************************************************************
        //设置
        //上午开始时间
        SsingTimeChange(date){
        	this.SsingbTime=date
        },
        S1singTimeChange1(date){
        	this.S1singeTime=date
        },
        //下午
         XsingTimeChange(date){
         	this.XsingbTime=date

        },
        X1singTimeChange1(date){
        	this.X1singeTime=date
        },
        //获取设置GET /beautySettig/query 设置列表
        getSetting(){
        	this.axios.get('/beautySettig/query?uid='+this.uid).then(res=>{
        		if(res.data.status==200){
        			if(res.data.rows.rows.length==1){
        				this.issettingE=true
        				this.issetting=false
        				this.SsingbTime=res.data.rows.rows[0].morningDutyTime
		        		this.S1singeTime=res.data.rows.rows[0].morningEndTime
		        		this.XsingbTime=res.data.rows.rows[0].afternoonDutyTime
		        		this.X1singeTime=res.data.rows.rows[0].afternoonEndTime
		        		this.settingId=res.data.rows.rows[0].id
        			}else{
        				this.issetting=true
        				this.issettingE=false
        			}

        		}
        	})
        },
        //保存POST /beautySettig/add 设置添加
        savekbB(){
        	this.axios.post('/beautySettig/add?uid='+this.uid,{

        		morningDutyTime:this.SsingbTime,
        		morningEndTime:this.S1singeTime,

        		afternoonDutyTime:this.XsingbTime,
        		afternoonEndTime:this.X1singeTime,

        		// subscription
        	}).then(res=>{
        		if(res.data.status==200){
        			this.$notify({
                        title:"",//
                        message:'设置成功',
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
        },
        //修改POST /beautySettig/update 修改设置
        editKB(){
        	this.axios.post('/beautySettig/update?uid='+this.uid,{
        		id:this.settingId,
        		morningDutyTime:this.SsingbTime,
        		morningEndTime:this.S1singeTime,

        		afternoonDutyTime:this.XsingbTime,
        		afternoonEndTime:this.X1singeTime,

        		// subscription
        	}).then(res=>{
        		if(res.data.status==200){
        			this.$notify({
                        title:"",//
                        message:this.$t('public.editSuccess'),//
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
        },
        //获取当前时间
		getDate(){
			let date=new Date()
			this.singpbadd=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()
			this.sing=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
		},
		},
		computed : {

		},
		mounted() {
			this.getDate()//获取当前时间
		}
	}
</script>

<style lang="css" scoped>

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
		width: 120px;
		margin-right: 3px;
		flex: 0 0 120px;
		font-size: 14px;
		background: #fff;
	}
	.main-left li{
		list-style: none;
		padding:10px 0;
		width:100%;

	}
	.main-left li span{
		margin-left:20px;
	}
.table {
	width: 100%;
	height: 100%;
	overflow: auto;
	background: #fff;
	padding: 0 10px;
}
	.bor{
		background:rgb(241,245,247);
        color:rgb(59,119,227);
	}
.mtewm{
width:100%;

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

.ygewm{
	 padding:10px;
	width:100%;
	height:100%;
	/*border:1px solid red;*/
	display: flex;
	flex-wrap: wrap;
	 /*justify-content: center;*/
    text-align: center;
	/*justify-content: center;*/
	/*flex-direction: column*/
	background:#fff
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
	margin-top:5px;
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
.table-center{
	margin:10px 0;
}
.xx-pre,.xx1-pre{
	display: flex;
	align-items: center;
}
.normal{
	width:100%;
	height:50px;
	line-height: 50px;
	margin:10 0px;
	display: flex;
	align-items: center;
}
.xx{
	display: inline-block;
	width:30px;
	height:20px;
	background-color: #FCEDED;
	border:1px solid #e4e4e4;
	margin-right:10px;
}
.xx1{
	display: inline-block;
	width:30px;
	height:20px;
	background-color: #F9F9F9;
	border:1px solid #e4e4e4;
	margin-right:10px;
}
.addHot,.addHotjs,.addHotgoods{
	position:fixed;
	height:89%;
	width:800px;
	right:-1080px;
	top:48px;
	background: #fff;
	z-index:10;
	overflow-y: auto;
	box-shadow: 0 0 20px #ccc
	/*border:1px solid red;*/
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
	margin-left:10px;
}
.mark,.markjs,.markgoods{
	position:fixed;
	display:none;
	width:100%;
	height:100%;
	z-index:9;
	background: #B2B2B2;
	opacity:0.4;
	/*z-index:12;*/
	top: 48px;
}
.right-left{
	width: 178px;
    margin-top: 26px;
	border: 1px dashed #d9d9d9;
	height:180px;
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
  }
  .serverjs{
  	margin-top:40px;
  }
  .serverjs-title{

  	width:60px;
  	text-align: center;
  	margin-bottom: 10px;
  	color:#4F83E5;
  	border-bottom: 1px solid #4F83E5
  }
  .kbtop-main{
  
  	border:1px solid #e4e4e4;
  	border-bottom:none;
  }
  .kbtop{
  	display: flex;
  	border-bottom:1px solid #e4e4e4;
  	height:50px;
  	line-height: 50px
  }
  .kbtop1{
  	display: flex;
  	border-bottom:1px solid #e4e4e4;
  	height:50px;
  	/*line-height: 50px*/
  }
  .jsName{
  	width:150px;text-align:center;border-right:1px solid #e4e4e4;flex:0 0 150px;
  }
  .jsName1{
  	width:128px;text-align:center;border-right:1px solid #e4e4e4;flex:0 0 128px;line-height: 50px
  }
 .timemain::-webkit-scrollbar{
	width: 0px;
	height: 4px;
	background-color: #f5f5f5;
}
.timemain::-webkit-scrollbar-track{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	border-radius: 10px;
	background-color: #f5f5f5;
}
.timemain::-webkit-scrollbar-thumb{

	height: 2px;
	border-radius: 18px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #ccc;
}
.linename{
	width:160px;text-align: center;border-right: 1px solid #e4e4e4;
}
/*预约*/
div.c{
	color:#d53c39;
	background: #FCEEEE
}
.user{
	height: 50px;

	display: flex;flex-direction: column;
	align-items: center;
	justify-content: center;
}
/*开单*/
div.s{
	color:#648FE8;
	background: #EBF1FC
}
</style>
