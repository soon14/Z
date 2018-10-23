<template>
    <!--工单-->
    <div class="add-box">
        <!--固定导航-->
        <div class="add-header">
            <div class="top">
                    
                    <div class="left-top">
                        <span style='margin-right:10px;margin-left:15px'>
                            <Checkbox v-model='single' @on-change='checkAll'></Checkbox>
                            <Select style="width:100px;" v-model='value' :placeholder="$t('public.all')" @on-change="selectChange">
                                <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </span>
                        <div>
                            <!--新建-->
                            <span class="top-left-btn"  @click="addStoreInfo">
                                <Icon type="plus" style="position:absolute;top:7px;left:8px"></Icon></span>
                        </div>
                    </div>
                    <div class="right-top">
                        <span style="margin-left:20px;font-weight:600;font-size:19px;color:#ff0000">{{storeTxt}}</span>
                        <div style="display:inline-block;position:absolute;right:265px">
                            <mu-button small  style="background:#3b77e3;margin-right:5px;color:#fff;border:none"
                            @click="saveAddInfo" v-show="addText">
                            <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>
                            {{$t('public.SaveBtn')}}<!--保存-->
                            </mu-button>
                            <mu-button small v-show="addText"  @click="addCancel"  style="background:#999999;color:#fff;" ><Icon type="close" style="margin-right:5px;">
                            </Icon>{{$t('public.cancel')}}</mu-button><!--取消-->
                            <mu-button small @click="updateStoreInfo1" v-if="xiugaibtn1" style="background:#40ca98;color:#fff;border:none" ><i class="el-icon-edit" style=";margin-right:5px;"></i>{{$t('public.EditBtn')}}</mu-button><!--修改-->
                            <mu-button small @click="updateStoreInfo2" v-if="xiugaibtn2"  style="background:#3b77e3;margin-right:5px;color:#fff;border:none" ><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon> {{$t('public.SaveBtn')}}<!--保存--></mu-button>
                            <mu-button small v-show="xiugaibtn2"  @click="editCancel"  style="background:#999999;color:#fff;" ><Icon type="close" style="margin-right:5px;">
                            </Icon>{{$t('public.cancel')}}</mu-button><!--取消-->
                            <Dropdown trigger="click" style="margin-left: 4px" v-if='xiugaibtn1'>
                                <mu-button small type="ghost" style="background:#ff7d16;color:#fff;border:none">
                                    {{$t('public.more')}}<!--更多-->
                                <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
                            </mu-button>
                            <DropdownMenu slot="list">
                                <span  @click="comite" v-if="comiteS"><DropdownItem >提交</DropdownItem></span>
                                <span  @click="startUser" v-if="start"><DropdownItem >开始</DropdownItem></span>
                                <span  @click="successUser" v-if='success'><DropdownItem >完成</DropdownItem></span>
                                <span  @click="stopUser" v-if="stop"><DropdownItem >终止</DropdownItem></span>
                                <span  @click="cancelUser" v-if='cancel'><DropdownItem>取消</DropdownItem></span>
                                <span  @click="workorder" v-if='order'><DropdownItem>派单</DropdownItem></span>
                                <!-- <span  @click=""><DropdownItem>导出</DropdownItem></span> -->
                                <span  @click="delUser" v-if='delisshow'><DropdownItem >删除</DropdownItem></span>
                            </DropdownMenu>
                            </Dropdown>

                        <span @click="cancelHome" style="cursor:pointer;margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
                        </div>
                    </div>
            </div>
        </div>
        <!-- <div class="cheng"></div> -->
        <div style="display:flex;height:100%;background: rgb(230,233,236);">
                <div class="add-left">
                    <!--左边内容-->
                    <div class="left-content">
                       <!--  <div class='locationSearch'>
                             <mu-text-field v-model="searchKeyword"
                              placeholder="请输入工单号"
                             style='width:100%;margin: 0 10px;'
                              @keyup.enter='search'
                              >
                            </mu-text-field><br/>

                        </div> -->
                        <div class='locationSearch'>
                            <Input style='padding:10px 20px;' v-model='searchKeyword' :placeholder="$t('public.orderornameandphone')" @on-enter='enterSearch'>
                            <span slot="append"  @click='search' style='cursor:pointer;'>{{$t('public.search')}}</span>
                            </Input>
                        </div>
                        <p v-if="storeList.length==0" class='scrollFix'>
                            <Spin>
                                <div>{{$t('public.NoData')}}</div><!--暂无数据-->
                            </Spin>
                        </p>
                        <Scroll :on-reach-bottom="handleReachEdge" :height="height" v-else>
                            <li class="con-list" v-for="(item,index) in storeList" :id='setId(item.id)' :key='index' @click="seeStoreInfo(item.id,index,item)" :class="{bg:numIndex==index}">
                                 <span style="margin-right: 10px;">
                                     <!-- <Checkbox :value="numIndex==index"></Checkbox> -->
                                      <Checkbox :value="item.check" @on-change='changeOnRowOrder(item,index,$event)'></Checkbox>
                                 </span>
                                <div>
                                    <p class="list-title">{{item.auntName}}</p>
                                    <p class="txt" style="margin-top:10px;">{{item.caregiversName}}</p>

                                    <div class="lanrenLeft" :class="{bgd4:item.status==1,bgd3:item.status==2,bgd5:item.status==9,bgd6:item.status==8,bgd7:item.status==3}">
                                    <span >{{item.statusDesc}}</span>
                                    </div>​
                                    <!-- <span class="date1">{{item.startTime}}</span>
                                    <span class="date2">-</span> -->
                                    <span class="date">{{item.reportType}}</span>
                                </div>
                            </li>
                        </Scroll>
                    </div>
                </div>
            <!--右边内容-->
                <div class="add-right">
                    <div class="right-content" v-show="addText">
                        <mu-form ref="form" :model="validateForm"  >
                            <div style="display:flex">
                                <div style='width:50%;'>
                                    <mu-form-item label="客户"  prop="name" >
                                        <mu-text-field v-model="validateForm.name"
                                        prop="name"
                                        placeholder="请输入客户姓名" @click="clickKh"></mu-text-field>
                                    </mu-form-item>
                                    <mu-form-item label="手机号"  prop="mobile">
                                        <mu-text-field v-model="validateForm.mobile"
                                        prop="mobile"
                                        placeholder="请输入客户手机号"></mu-text-field>
                                    </mu-form-item>
                                </div>
                                <div style='width:50%;margin-left:20px'>
                                
                                <div style='display:flex'>
                                <mu-form-item label="开始时间" prop="hlbtime">
                                    <mu-date-input  landscape
                                    v-model="validateForm.hlbtime"
                                    view-type='list'
                                    type="time"
                                    label-float
                                   clock-type="24hr"
                                    container="dialog"
                                    full-width @change='changebTime'></mu-date-input>
                                </mu-form-item>
                                <mu-form-item label="结束时间" prop="hletime" style='margin-left:20px'>
                                    <mu-date-input  landscape
                                    v-model="validateForm.hletime"
                                    view-type='list'
                                    type="time"
                                    label-float
                                   clock-type="24hr"
                                    container="dialog"
                                    full-width @change='changeeTime'></mu-date-input>
                                </mu-form-item>
                                </div>
                            </div>
                                
                            </div>
                             
                            <div style='width:50%;'>
                                    <mu-form-item label="护理员"  prop="hlyname" >
                                        <mu-text-field v-model="validateForm.hlyname"
                                        prop="hlyname"
                                        placeholder="请输入护理员姓名" @click="clickHLY"></mu-text-field>
                                    </mu-form-item>
                                    <mu-form-item label="护理员电话"  prop="hlyphone" >
                                        <mu-text-field v-model="validateForm.hlyphone"
                                        prop="hlyname"
                                        placeholder="请输入护理员电话"></mu-text-field>
                                    </mu-form-item>
                                    
                                </div>
                        </mu-form>
                    </div>
                     <!--修改信息-->
                    <div class="right-content" v-show="xiugai">
                       <mu-form ref="Editform" :model="validateForm"  >
                            <div style="display:flex">
                                <div style='width:50%;'>
                                    <mu-form-item label="客户"  prop="name" >
                                        <mu-text-field v-model="validateForm.name"
                                        prop="name"
                                        placeholder="请输入客户姓名" @click="clickKh"></mu-text-field>
                                    </mu-form-item>
                                    <mu-form-item label="手机号"  prop="mobile">
                                        <mu-text-field v-model="validateForm.mobile"
                                        prop="mobile"
                                        placeholder="请输入客户手机号"></mu-text-field>
                                    </mu-form-item>
                                    
                                </div>
                                <div style='width:50%;margin-left:20px'>
                               
                                <div style='display:flex'>
                                <mu-form-item label="开始时间" prop="hlbtime">
                                    <mu-date-input  landscape
                                    v-model="validateForm.hlbtime"
                                   clock-type="24hr"
                                    view-type='list'
                                    type="time"
                                    label-float
                                    container="dialog"
                                    full-width @change='changebTime'></mu-date-input>
                                </mu-form-item>
                                <mu-form-item label="结束时间" prop="hletime" style='margin-left:20px'>
                                    <mu-date-input  landscape
                                    v-model="validateForm.hletime"
                                    clock-type="24hr"
                                    view-type='list'
                                    type="time"
                                    label-float
                                    container="dialog"
                                    full-width @change='changeeTime'></mu-date-input>
                                </mu-form-item>
                                </div>
                            </div>
                                
                            </div>
                            <div style='width:50%;'>
                                    <mu-form-item label="护理员"  prop="hlyname" >
                                        <mu-text-field v-model="validateForm.hlyname"
                                        prop="hlyname"
                                        placeholder="请输入护理员姓名" @click="clickHLY"></mu-text-field>
                                    </mu-form-item>
                                    <mu-form-item label="护理员电话"  prop="hlyphone" >
                                        <mu-text-field v-model="validateForm.hlyphone"
                                        prop="hlyname"
                                        placeholder="请输入护理员电话"></mu-text-field>
                                    </mu-form-item>
                                    
                                </div>
                        </mu-form>
                    </div>
                    <!--详情明细订单页面-->
                    <div class="right-content right-detail" ref="detail"  v-if='details'>
                        <div>
                            <mu-form :model="validateForm">
                            <div style="display:flex">
                                <div style='width:50%;'>
                                    <mu-form-item label="客户"  prop="name" >
                                        <mu-text-field v-model="validateForm.name"
                                        prop="name"
                                        placeholder="请输入客户姓名" disabled></mu-text-field>
                                    </mu-form-item>
                                    <mu-form-item label="手机号"  prop="mobile">
                                        <mu-text-field v-model="validateForm.mobile"
                                        prop="mobile"
                                        placeholder="请输入客户手机号" disabled></mu-text-field>
                                    </mu-form-item>
                                    
                                </div>
                                <div style='width:50%;padding-left:40px'>
                                    <mu-form-item label="护理员"  prop="hlyname" >
                                        <mu-text-field v-model="validateForm.hlyname"
                                        prop="hlyname"
                                        placeholder="请输入护理员姓名" disabled></mu-text-field>
                                    </mu-form-item>
                                    <mu-form-item label="护理员电话"  prop="hlyphone" >
                                        <mu-text-field v-model="validateForm.hlyphone"
                                        prop="hlyname"
                                        placeholder="请输入护理员电话" disabled></mu-text-field>
                                    </mu-form-item>
                                    
                                </div>
                               
                               
                            </div>
                            <div style='display:flex'>
                                 <div style='width:50%;'>
                                        <div style='padding: 10px 10px 10px 0;color: rgba(0,0,0,.54);font-size:14px'>
                                        预计护理时间</div>
                                        <div style='display:flex'>
                                        <mu-form-item label="开始时间" prop="hlbtime">
                                            <mu-date-input  landscape
                                            v-model="validateForm.hlbtime"
                                            view-type='list'
                                            type="time"
                                            label-float
                                            container="dialog"
                                            full-width disabled></mu-date-input>
                                        </mu-form-item>
                                        <mu-form-item label="结束时间" prop="hletime" style='margin-left:20px'>
                                            <mu-date-input  landscape
                                            v-model="validateForm.hletime"
                                            view-type='list'
                                            type="time"
                                            label-float
                                            container="dialog"
                                            full-width disabled></mu-date-input>
                                        </mu-form-item>
                                        </div>
                                    </div>
                                <div style='width:50%;'>
                                    <div style='padding: 10px 10px 10px 0;color: rgba(0,0,0,.54);font-size:14px'>
                                    实际护理时间</div>
                                    <div style='display:flex'>
                                        <mu-form-item label="开始时间" prop="hlbtime">
                                            <mu-date-input  landscape
                                            v-model="actStartTime"
                                            view-type='list'
                                            type="time"
                                            label-float
                                            container="dialog"
                                            full-width disabled></mu-date-input>
                                        </mu-form-item>
                                        <mu-form-item label="结束时间" prop="hletime" style='margin-left:20px'>
                                            <mu-date-input  landscape
                                            v-model="actEndTime"
                                            view-type='list'
                                            type="time"
                                            label-float
                                            container="dialog"
                                            full-width disabled></mu-date-input>
                                        </mu-form-item>
                                    </div>
                            </div>
                            </div>
                           
                        </mu-form>
                                <ul class="detail-title-mark" style='margin-top:20px'>
                                    <li v-for="(item,index) in detailsArr" class="detail-title flclass" @click="addborderdefails(index)" :class="{bor:index==num5}">
                                        {{item}}
                                    </li>
                                </ul>
                            <!--工单历史-->
                            <div v-if='num5==0'>
                                <div style='margin: 10px 10px 0 0;'>
                                    <ag-grid-vue style='width:100%;' class="ag-theme-balham is-full-widthag"
                                    :rowData="gdhistory"
                                    :columnDefs="columnsgd"
                                    :gridAutoHeight="true"
                                    :enableSorting="true"
                                    :enableFilter="true"
                                    ></ag-grid-vue>
                                    <div justify-content="center" >
                                       
                                        <Page :total="total0" size='small' show-total :pageSize='pageSize0'  @on-change="changeSize0"></Page>
                                    </div>
                                </div>
                            </div>
                            <!--账单历史-->
                            <div v-if='num5==1'>
                                <div style='margin: 10px 10px 0 0;'>
                                  
                                    <ag-grid-vue style='width:100%;' class="ag-theme-balham is-full-widthag"
                                    :rowData="zdhistory"
                                    :columnDefs="columnszd"
                                    :gridAutoHeight="true"
                                    :enableSorting="true"
                                    :enableFilter="true"
                                    ></ag-grid-vue>
                                    <div justify-content="center" >
                                        
                                        <Page :total="total1" size='small' show-total :pageSize='pageSize1'  @on-change="changeSize1"></Page>
                                    </div>
                                </div>
                            </div>
                            <!--日志-->
                            <div v-if='num5==2'>
                                <div style='margin: 10px 10px 0 0;'>
                                   
                                    <ag-grid-vue style='width:100%;' class="ag-theme-balham is-full-widthag"
                                    :rowData="loghistory"
                                    :columnDefs="columnslog"
                                    :gridAutoHeight="true"
                                    :enableSorting="true"
                                    :enableFilter="true"
                                    ></ag-grid-vue>
                                    <div justify-content="center" >
                                     
                                         <Page :total="total2" size='small' show-total :pageSize='pageSize2'  @on-change="changeSize2"></Page>
                                    </div>
                                </div>
                            </div>
                            <!--状态-->
                            <div class="lanren" :class="{bgd1:storeDetails.status==1,bgd2:storeDetails.status==2,bgd21:storeDetails.status==3,bgd24:storeDetails.status==5,bgd22:storeDetails.status==8,bgd23:storeDetails.status==9}">
                            <span>{{storeDetails.statusDesc}}</span>
                            </div>​
                        </div>
                    </div>
                </div>
            <!-- </Col> -->
        </div>
         <Modal v-model="khisshow" width="760px">
            <p slot="header" style="height:30px;line-height:30px;">
              <span>选择客户</span>
            </p>
            <mu-text-field v-model="keyword" style='width:100%;padding:0 10px;margin-bottom:0' @keyup.enter='enterSearch' placeholder='请输入名称手机号'></mu-text-field>
             <ag-grid-vue style='width:100%;' class="ag-theme-balham is-full-widthag" 
                :gridOptions="gridk"
                :rowData="KHrowData"
                :columnDefs="KHdataKey"
                :cellClicked="ClickRow"
                :rowDoubleClicked="dblClickKH" 
                :gridAutoHeight="true"
                :enableSorting="true"
                :enableFilter="true"
                ></ag-grid-vue>
                <div>
                    <!-- <mu-pagination raised circle 
                    :current='KHcurrent' :total="KHtotal"  
                    :pageSize='KHpageSize' @change='KHchangeSize'></mu-pagination> -->
                    <Page :total="KHtotal" size='small' show-total :pageSize='KHpageSize'  @on-change="KHchangeSize"></Page>
                </div>
            <div slot="footer">
              <div class='footer-mark'>
                <span><a style='color:#999;font-size:14px' @click='KHcancel'>{{$t('public.cancel')}}</a></span>
                <span style='font-size:20px;width:1px;height:40px;background:#e4e4e4'></span>
                <span ><a style='color:#3B77E3;font-size:14px' @click='khSure'>{{$t('public.sure')}}</a></span>
              </div>
            </div>
          </Modal>

           <Modal v-model="hlyisshow" width="760px">
            <p slot="header" style="height:30px;line-height:30px;">
              <span>选择护理员</span>
            </p>
            <mu-text-field v-model="keyword1" style='width:100%;padding:0 10px;margin-bottom:0' @keyup.enter='enterSearch1' placeholder='请输入名称手机号'></mu-text-field>
             <ag-grid-vue style='width:100%;' class="ag-theme-balham is-full-widthag"
                :gridOptions="grid"
                :rowData="HLYrowData"
                :columnDefs="HLYdataKey"
                :cellClicked="hlyClickRow"
                :rowDoubleClicked="dblClickhyl1" 
                :gridAutoHeight="true"
                :enableSorting="true"
                :enableFilter="true"
                ></ag-grid-vue>
                <div>
                  <!--   <mu-pagination raised circle 
                    :current='HLYcurrent' :total="HLYtotal"  
                    :pageSize='HLYpageSize' @change='HLYchangeSize'></mu-pagination> -->
                    <Page :total="HLYtotal" size='small' show-total :pageSize='HLYpageSize'  @on-change="HLYchangeSize"></Page>
                </div>
            <div slot="footer">
              <div class='footer-mark'>
                <span><a style='color:#999;font-size:14px' @click='HLYcancel'>{{$t('public.cancel')}}</a></span>
                <span style='font-size:20px;width:1px;height:40px;background:#e4e4e4'></span>
                <span ><a style='color:#3B77E3;font-size:14px' @click='hlySure'>{{$t('public.sure')}}</a></span>
              </div>
            </div>
          </Modal>


        <Modal v-model="gdisshow" width="560px">
            <p slot="header" style="height:30px;line-height:30px;">
              <span>终止工单</span>
            </p>
            
             <mu-text-field v-model="stopRemark" placeholder="请输入终止信息" multi-line :rows="6" full-width></mu-text-field><br/>
            <div slot="footer">
              <div class='footer-mark'>
                <span><a style='color:#999;font-size:14px' @click='stopRemarkcancel'>{{$t('public.cancel')}}</a></span>
                <span style='font-size:20px;width:1px;height:40px;background:#e4e4e4'></span>
                <span ><a style='color:#3B77E3;font-size:14px' @click='stopRemarkSure'>{{$t('public.sure')}}</a></span>
              </div>
            </div>
          </Modal>


          <Modal v-model="pdisshow" width="760px">
            <p slot="header" style="height:30px;line-height:30px;">
              <span>派单</span>
            </p>
            <mu-text-field v-model="keywordpd" style='width:100%;padding:0 10px;margin-bottom:0' @keyup.enter='enterSearchpd' placeholder='请输入名称手机号'></mu-text-field>
            <ag-grid-vue style='width:100%;' class="ag-theme-balham is-full-widthag"
                :gridOptions="gridpd"
                :rowData="pdrowData"
                :columnDefs="pddataKey"
                :cellClicked="pdClickRow"
                :rowDoubleClicked="pdClickhyl1" 
                :gridAutoHeight="true"
                :enableSorting="true"
                :enableFilter="true"
                ></ag-grid-vue>
             <div style='text-align:left'>
                <!-- <mu-pagination raised circle :current='pdcurrent' :total="pdtotal"  :pageSize='pdpageSize' @change='pdchangeSize'></mu-pagination> -->
                <Page :total="pdtotal" size='small' show-total :pageSize='pdpageSize'  @on-change="pdchangeSize"></Page>
            </div>
            <div slot="footer">
              <div class='footer-mark'>
                <span><a style='color:#999;font-size:14px' @click='pdcancel'>{{$t('public.cancel')}}</a></span>
                <span style='font-size:20px;width:1px;height:40px;background:#e4e4e4'></span>
                <span ><a style='color:#3B77E3;font-size:14px' @click='pdSure'>{{$t('public.sure')}}</a></span>
              </div>
            </div>
          </Modal>
    <div class='totBottom'>
        <span>共<span style='color:#ff0000'> {{total}} </span>条</span>
        <span>当前第<span style='color:#ff0000'> {{current}} </span>页</span>
    </div>
    </div>
</template>
<script>
import { AgGridVue } from "ag-grid-vue";
import LoadUrl from '@/components/common/actionLoad'
import { regionData,CodeToText,TextToCode} from 'element-china-area-data'
    export default {
         components:{
            AgGridVue
        },
        data() {
            return {
                storeTxt:"",
                actStartTime:"",
                actEndTime:"",
                single:false,
                orderStrArr:[],
                orderStr:"",
                gdisshow:false,
                stopRemark:"",//终止信息
                start:false,//开始
                success:false,//完成派单
                stop:false,//终止护理
                cancel:false,//取消
                order:false,//派单
                comiteS:false,//提交
                delisshow:false,//删除
                gridk:{
                    enableFilter:true,
                    enableSorting:true,
                    animateRows:true,
                    rowHeight:40,
                    // pagination: true,
                    enableColResize:true,
                },
                 grid:{
                    enableFilter:true,
                    enableSorting:true,
                    animateRows:true,
                    rowHeight:40,
                    // pagination: true,
                    enableColResize:true,
                },
                gridpd:{
                    enableFilter:true,
                    enableSorting:true,
                    animateRows:true,
                    rowHeight:40,
                    // pagination: true,
                    enableColResize:true,
                },
                pdisshow:false,
                pdpageSize:0,
                pdtotal:0,
                pdcurrent:1,
                pdrowData:[],
                pdhlyObj:{},
                pdhlyId:"",
                keywordpd:"",
                pddataKey:[
                    {
                    headerName:"状态",
                    field: 'statusDesc',
                    width:180,
                    cellStyle: function(params) {
                        switch(params.data.status){
                            case 1:
                                return {color:"#40ca98"}
                            break;
                            case 3:
                                return {color:"#d53c39"}
                            break;
                            case 9:
                                return {color:"#d53c39"}
                            break;
                        }
                    }
                      
                },
                    {
                        headerName: "编号",
                        field: "code"
                    },
                    {
                        headerName:"护理员",
                        field: 'name',
                       
                    },
                    {
                        headerName:"性别",
                        field:'gender',
                     
                    },
                    {
                        headerName:"地址",//"地址",
                        field:'Raddress',
                       
                    },
                    {
                        headerName:"电话",//"电话",
                        field:'mobile',
                        
                    },
                    {
                        headerName:"周一",
                        field:'monday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="上班") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#333', backgroundColor: 'yellow'};;
                            }
                        }

                    },
                    {
                        headerName:"周二",
                        field:'tuesday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="上班") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#333', backgroundColor: 'yellow'};;
                            }
                        }
                    },
                    {
                        headerName:"周三",
                        field:'wednesday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="上班") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#333', backgroundColor: 'yellow'};;
                            }
                        }
                    },
                    {
                        headerName:"周四",
                        field:'thursday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="上班") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#333', backgroundColor: 'yellow'};;
                            }
                        }
                    },
                    {
                        headerName:"周五",
                        field:'friday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="上班") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#333', backgroundColor: 'yellow'};;
                            }
                        }
                    },
                    {
                        headerName:"周六",
                        field:'saturday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="上班") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#333', backgroundColor: 'yellow'};;
                            }
                        }
                    },
                    {
                        headerName:"周日",
                        field:'sunday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="上班") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#333', backgroundColor: 'yellow'};;
                            }
                        }
                    },
                    
                ],
                detailsArr:['当前日志','当日工单','当日账单',],
                gdhistory:[],
                current0:1,
                total0:0,
                pageSize0:0,
                columnsgd:[],
                zdhistory:[],
                current1:1,
                total1:0,
                pageSize1:0,
                columnszd:[
                ],
                loghistory:[],
                current2:1,
                total2:0,
                pageSize2:0,
                columnslog:[],
                num5:0,
                gender:0,
                genders:[
                    {
                        lable:"男",
                        value:0
                    },
                    {
                        lable:"女",
                        value:1
                    },
                ],
                
                searchKeyword:'',
                CodeToText:CodeToText,//code转为Text
                TextToCode:TextToCode,//Text转为code
                cityInfo:regionData,//地址数据
                selectedOptions2:[],//绑定的数据
                uid: this.$store.state.common.token,
                logoUrl:LoadUrl.httpPrefix.Url+'file/action/upload/image/url?c=仓库图片&uid='+this.$store.state.common.token,
                importstore:false,//导入
                value:1,
                orderListname:[
                    {
                        label:"待提交",
                        value:1
                    },
                    {
                        label:"待护理",
                        value:2
                    },
                    {
                        label:"护理中",
                        value:3
                    },
                    {
                        label:"护理完成",
                        value:8
                    },
                    {
                        label:"护理终止",
                        value:9
                    },
                    {
                        label:"已取消",
                        value:5
                    },
                ],
                validateForm:{
                    name:"",
                    mobile:"",
                    hlyname:"",
                    hlyphone:"",
                    hlbtime:null,//护理时间
                    hletime:null,//护理结束时间
                },
                // usernameRules:[{ validate: (val) => !!val, message:"必须填写用户姓名"}],//姓名不能为空,
                // mobileRules:[{ validate: (val) => !!val, message:"必须填写手机号"},//必须填写手机号
                //             { validate: (val) => /^1[3|4|5|7|8][0-9]{9}$/.test(val), message:"请输入正确的手机号"}],
                // hlynameRules:[{ validate: (val) => !!val, message:"必须填写护理员姓名"}],
                // phoneRules:[[{ validate: (val) => !!val, message:"必须填写手机号"},//必须填写手机号
                //             { validate: (val) => /^1[3|4|5|7|8][0-9]{9}$/.test(val), message:"请输入正确的手机号"}],],
                dialogVisible:false,
                xiugaibtn2:false,//修改的保存按钮
                xiugaibtn1:false,//修改按钮
                details:false,//详情页是否显示
                xiugai:false,//修改页面是否显示
                storeDetails:{},//详情
                height:'',
                current:1,
                numIndex:-1,//侧栏下标
                indexId:"",//id
                addText: true, //新建true  修改false
               
                storeList: [],//工单列表
                total: 0, //页码总数
                pageSize: 0, //页面条数
                province: '', //省
                city: '', //市
                district: '', //区
                address: '', //详细地址
                remark: '', //备注
                orderStratus:0,
                item:{},
                //客户
                ibeaconUUID:"",
                ibeaconMajor:"",
                keyword:"",
                KHdataKey: [
                    {
                        headerName:"状态",
                        field: 'statusDesc',
                        width:100,
                        pinned: 'left',
                        cellStyle: function(params) {
                            switch(params.data.status){
                                case 1:
                                    return {color:"#40ca98"}
                                break;
                                case 3:
                                    return {color:"#3b77e3"}
                                break;
                                case 9:
                                    return {color:"#d53c39"}
                                break;
                            }
                        }
                    },
                    {
                        headerName: "编号",
                        field: "code",
                        width:180,
                    },
                    {
                        headerName:"姓名",
                        field: 'name',
                        width:180,
                    },
                    {
                        headerName:"性别",
                        field:'genderDesc',
                        width:180,
                    },
                    
                    {
                        headerName:"家属姓名",
                       
                        field: 'familyName',
                        width:180,
                    },
                    {
                        headerName:"家属电话",
                        field: 'emergencyCall',
                        width:180,
                    },
                     {
                        headerName:"地址",//"地址",
                        field:'Raddress',
                        width:280,
                        
                    },
                    {
                        headerName:"周一",
                        field:'monday',
                        width:80,
                        cellStyle: function(params) {
                        if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }

                    },
                    {
                        headerName:"周二",
                        field:'tuesday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }
                    },
                    {
                        headerName:"周三",
                        field:'wednesday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }
                    },
                    {
                        headerName:"周四",
                        field:'thursday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }
                    },
                    {
                        headerName:"周五",
                        field:'friday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }
                    },
                    {
                        headerName:"周六",
                        field:'saturday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }
                    },
                    {
                        headerName:"周日",
                        field:'sunday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }
                    },
                   {
                        headerName:"电话",//"电话",
                        field:'mobile',
                        width:180,
                        pinned: 'right'
                    },
                ],
                KHrowData: [],
                KHtotal:0,
                KHpageSize:0,
                KHcurrent:1,
                khisshow:false,
                khObj:{},
                

                hlyisshow:false,
                HLYpageSize:0,
                HLYtotal:0,
                HLYcurrent:1,
                HLYObj:{},
                HLYrowData: [],
                keyword1:"",
                HLYdataKey:[
                    {
                        headerName:"状态",
                        field: 'statusDesc',
                        width:100,
                        pinned: 'left',
                        cellStyle: function(params) {
                            switch(params.data.status){
                                case 1:
                                    return {color:"#40ca98"}
                                break;
                                case 3:
                                    return {color:"#3b77e3"}
                                break;
                                case 9:
                                    return {color:"#d53c39"}
                                break;
                            }
                        }
                    },
                    {
                        headerName: "编号",
                        field: "code"
                    },
                    {
                        headerName:"护理员",
                        field: 'name',
                        
                    },
                    {
                        headerName:"性别",
                        field:'genderDesc',
                        width:80,
                       
                    },
                    {
                        headerName:"地址",//"地址",
                        field:'Raddress',
                        width:280,
                    },
                    {
                        headerName:"电话",//"电话",
                        field:'mobile',
                        width:180,
                    },
                    {
                        headerName:"周一",
                        field:'monday',
                        width:80,
                        cellStyle: function(params) {
                        if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }

                    },
                    {
                        headerName:"周二",
                        field:'tuesday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }
                    },
                    {
                        headerName:"周三",
                        field:'wednesday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }
                    },
                    {
                        headerName:"周四",
                        field:'thursday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }
                    },
                    {
                        headerName:"周五",
                        field:'friday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }
                    },
                    {
                        headerName:"周六",
                        field:'saturday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="服务") {
                                //mark police cells as red
                                return {color: '#fff', backgroundColor: 'green'};
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'};;
                            }
                        }
                    },
                    {
                        headerName:"周日",
                        field:'sunday',
                        width:80,
                        cellStyle: function(params) {
                            if (params.value=="服务") {
                                return {color: '#fff', backgroundColor: 'green'}
                            } else {
                                return {color: '#fff', backgroundColor: '#ff0000'}
                            }
                        }
                    },
                    {

                        headerName:"开始时间",
                        field:'serviceStartTime',
                        width:100,
                        pinned: 'right'
                    },
                    {
                        headerName:"结束时间",
                        field:'serviceEndTime',
                        width:100,
                       pinned: 'right'
                    },

                    
                ],
                hlyid:"",//护理员id
                btime:"",
            }
        },
        methods: {
            //点击了客户
            clickKh(){
                this.khisshow=true
                this.axios.get('/aunt/query?uid=' + this.uid+'&status=3').then((res) => {
                    let data = res.data;
                    if(res.data.status == '200') {
                        this.KHrowData = data.rows;
                        this.KHpageSize = data.pageSize;
                        this.KHtotal = data.total;
                        this.KHrowData.forEach(x=>{
                            if(x.gender==1){    
                                x.genderDesc="男"
                            }else{
                                x.genderDesc="女"
                            }
                            this.getWeek(x)
                            x.Raddress=x.addressDetail
                        })
                    }
                })
            },
            //客户翻页
            KHchangeSize(size){
                this.KHcurrent=size
                this.axios.get('/aunt/query?offset='+this.KHcurrent+'&uid=' + this.uid+'&status=3').then((res) => {
                    let data = res.data;
                    if(res.data.status == '200') {
                        this.KHrowData = data.rows;
                        this.KHpageSize = data.pageSize;
                        this.KHtotal = data.total;
                        this.KHrowData.forEach(x=>{
                            if(x.gender==1){    
                                x.genderDesc="男"
                            }else{
                                x.genderDesc="女"
                            }
                            this.getWeek(x)
                            x.Raddress=x.addressDetail
                        })
                    }
                })
            },
            //点击客户一行
            ClickRow(data){
                this.khObj=data.data
                //console.log(data)
            },
            dblClickKH(row){
                this.khSure()
            },
            //搜索
            enterSearch(){
                this.axios.get('/aunt/query?keyword='+this.keyword+'&uid=' + this.uid+'&status=3').then((res) => {
                    let data = res.data;
                    if(res.data.status == '200') {
                        this.KHrowData = data.rows;
                        this.KHpageSize = data.pageSize;
                        this.KHtotal = data.total;
                        this.KHrowData.forEach(x=>{
                            if(x.gender==1){    
                                x.genderDesc="男"
                            }else{
                                x.genderDesc="女"
                            }
                            this.getWeek(x)
                            x.Raddress=x.addressDetail
                        })
                    }
                })
            },
            //客户取消
            KHcancel(){
                this.khisshow=false
            },
            //客户确认
            khSure(){
                this.validateForm.name=this.khObj.name
                this.validateForm.mobile=this.khObj.mobile
                this.KHid=this.khObj.id
                this.ibeaconMajor=this.khObj.ibeaconMajor
                this.ibeaconUUID=this.khObj.ibeaconUUID
                // this.validateForm.hlyphone=this.khObj.emergencyCall
                // this.hlyid=this.khObj.caregiversId
                // this.validateForm.hlyname=this.khObj.caregiversName
                let date=new Date()
                let year=date.getFullYear()
                let month=date.getMonth()+1
                let day=date.getDate()
                let Minutes=date.getMinutes()
                if(this.khObj.purposeStartTime=="NaN:NaN"){
                    this.validateForm.hlbtime=""
                }else{
                     let Time=year+'-'+month+'-'+day+' '+this.khObj.purposeStartTime
                     this.validateForm.hlbtime=new Date(Time)
                }
                if(this.khObj.purposeEndTime=="NaN:NaN"){

                    this.validateForm.hletime=""
                }else{
                    let Time2=year+'-'+month+'-'+day+' '+this.khObj.purposeEndTime
                    this.validateForm.hletime =new Date(Time2)
                }
                
                this.khisshow=false
            },
            //转化星期
            getWeek(x){
                if(x.monday){
                    x.monday="服务"
                }else{x.monday="休息"}
                if(x.tuesday){
                    x.tuesday="服务"
                }else{x.tuesday="休息"}
                if(x.wednesday){
                     x.wednesday="服务"
                }else{x.wednesday="休息"}
                if(x.thursday){
                    x.thursday="服务"
                }else{x.thursday="休息"}
                if(x.friday){
                     x.friday="服务"
                }else{x.friday="休息"}
                if(x.saturday){
                    x.saturday="服务"
                }else{x.saturday="休息"}
                if(x.sunday){
                    x.sunday="服务"
                }else{x.sunday="休息"}
            },
            //点击护理员弹框GET /caregivers/rec 推荐护理员
            clickHLY(){
                this.hlyisshow=true
                this.axios.get('/caregivers/rec?uid=' + this.uid,{
                    params:{
                        startTime:this.khObj.purposeStartTime,
                        endTime:this.khObj.purposeEndTime,
                        caregiversId:this.khObj.caregiversId,
                        status:3
                    }
                }).then((res) => {

                    let data = res.data;
                    if(res.data.status == '200') {
                        this.HLYrowData = data.rows;
                        this.HLYpageSize = data.pageSize;
                        this.HLYtotal = data.total;
                        this.HLYrowData .forEach(x=>{
                            if(x.gender==1){    
                                x.genderDesc="男"
                            }else{
                                x.genderDesc="女"
                            }
                            this.getWeek(x)

                            x.Raddress=x.addressDetail

                        })
                    }
                })
            },
            //回车搜索护理员
            enterSearch1(){
                this.axios.get('/caregivers/rec?keyword='+this.keyword1+'&uid=' + this.uid+'&status=3').then((res) => {
                    let data = res.data;
                    if(res.data.status == '200') {
                        this.HLYrowData = data.rows;
                        this.HLYpageSize = data.pageSize;
                        this.HLYtotal = data.total;
                        this.HLYrowData .forEach(x=>{
                            if(x.gender==1){    
                                x.genderDesc="男"
                            }else{
                                x.genderDesc="女"
                            }
                            this.getWeek(x)
                            x.Raddress=x.addressDetail
                           
                        })
                    }
                })
            },
            //护理员翻页
            HLYchangeSize(size){
                this.HLYcurrent=size
                 this.axios.get('/caregivers/query?offset='+this.HLYcurrent+'&uid=' + this.uid+'&status=3').then((res) => {
                    let data = res.data;
                    if(res.data.status == '200') {
                        this.HLYrowData = data.rows;
                        this.HLYpageSize = data.pageSize;
                        this.HLYtotal = data.total;
                        this.HLYrowData .forEach(x=>{
                            if(x.gender==1){    
                                x.genderDesc="男"
                            }else{
                                x.genderDesc="女"
                            }
                            this.getWeek(x)
                            x.Raddress=x.addressDetail
                         
                        })
                    }
                })
            },
            //护理员取消
            HLYcancel(){
                this.hlyisshow=false
            },
            //点击护理员一行
            hlyClickRow(data){
                this.HLYObj=data.data
            },
            //双击护理员
            dblClickhyl1(row){
                this.hlySure()
                
            },
            //护理员确认
            hlySure(){
                this.validateForm.hlyphone=this.HLYObj.mobile
                this.hlyid=this.HLYObj.id
                this.validateForm.hlyname=this.HLYObj.name
                this.hlyisshow=false
            },
            //搜索
            search(){
                 this.axios.get('workOrder/query?keyword='+this.searchKeyword+'&uid='+this.uid+'&status='+this.value).then(res=>{
                    if(res.data.status==200){
                        this.storeList=res.data.rows
                        this.pageSize=res.data.pageSize
                        this.total=res.data.total
                        this.storeList.forEach(x=>{
                            x.check=false
                            if(x.startTime==""||x.startTime==undefined){
                            this.validateForm.hlbtime=""
                            }else{
                                this.validateForm.hlbtime=new Date(parseInt(x.startTime))
                            }
                            if(x.endTime==""||x.endTime==undefined){
                                this.validateForm.hletime=""
                            }else{
                                this.validateForm.hletime=new Date(parseInt(x.endTime))
                            }
                            
                        })
                    }
                })
            },
            enterSearch(){
                this.search()
            },
            //下拉选择
            selectChange(v){
                this.value=v
                this.numIndex=-1
                this.single=false
                this.current=1
                this.getStoreList(this.value);
            },
            //选择性别
            changeGender(value){
                this.gender=value
                //console.log(value)
            },
            //记录方式
            changeGenders1(v){
                this.genders11=v
            },
            //选择服务开始时间
            changebTime(time){
                this.validateForm.hlbtime=time
                // let date=new Date(time)
                // let h=date.getHours()
                // let m=date.getMinutes()
                // this.validateForm.hlbtime=h+':'+m
            
            },
            //选择服务结束时间
            changeeTime(time){
                this.validateForm.hletime=time
                // let date=new Date(time)
                // let h=date.getHours()
                // let m=date.getMinutes()
                // this.validateForm.hletime=h+':'+m
            },
            //省市区
            handleChange(arr){
                this.province = this.CodeToText[arr[0]]
                this.city =this.CodeToText[arr[1]]
                this.district = this.CodeToText[arr[2]]
            },
            //详情
            addborderdefails(index){
                this.num5=index
            },
            changeSize0(size){
                this.current0=size
            },
            changeSize1(size){
                this.current1=size
            },
            changeSize2(size){
                this.current2=size
            },
            //双击后可修工单信息
            seeStoreInfo(id,index,item) {
                this.addText = false;
                this.xiugai=false
                this.details=true
                this.indexId = id;
                this.numIndex = index;
                this.orderStr=id
                
                this.xiugaibtn2=false
                this.xiugaibtn1=true
               
                this.getStoreDetail(id);
                this.orderStratus=item.status
                this.item=item
                this.storeList.forEach((x)=>{
                    x.check=false
                    item.check=true
                })
            },
            getD(){
                let date=new Date(time)
                let h=date.getHours()
                let m=date.getMinutes()
                let t=h+':'+m
                return t
            },
            //GET /workOrder/getDetail/{id} 工单详情
            getStoreDetail(id) {
                this.axios.get('/workOrder/getDetail/'+this.indexId+'?uid='+this.uid).then(res=>{
                    if(res.data.status==200){
                        let rwos=res.data.rows
                        this.storeDetails=rwos
                        this.storeTxt=rwos.code
                        //console.log(rwos.startTime)
                        this.validateForm.name=rwos.auntName
                        this.KHid=rwos.auntId
                        this.validateForm.mobile=rwos.auntMobile
                        this.validateForm.hlyname=rwos.caregiversName
                        this.hlyid=rwos.caregiversId
                        this.validateForm.hlyphone=rwos.caregiversMobile
                        this.gender=rwos.gender
                        if(rwos.startTime==""||rwos.startTime==undefined){
                            this.validateForm.hlbtime=""
                        }else{
                            this.validateForm.hlbtime=new Date(parseInt(rwos.startTime))
                        }
                        if(rwos.endTime==""||rwos.endTime==undefined){
                            this.validateForm.hletime=""
                        }else{
                            this.validateForm.hletime=new Date(parseInt(rwos.endTime))
                        }
                        
                        this.ibeaconMajor=rwos.ibeaconMajor
                        this.ibeaconUUID=rwos.ibeaconUUID

                       if(rwos.actStartTime==undefined || rwos.actStartTime==''){
                            this.actStartTime=""
                       }else{

                            this.actStartTime =new Date(parseInt(rwos.actStartTime))

                       }

                       if(rwos.actEndTime==undefined || rwos.actEndTime==''){
                       
                            this.actEndTime=""
                       }else{

                            this.actEndTime =new Date(parseInt(rwos.actEndTime))
                       }
                      
                       
                        switch(rwos.status){
                            case 1://待提交
                                this.comiteS=true//提交
                                this.start=false//开始护理
                                this.success=false//完成
                                this.stop=true//终止
                                this.cancel=true//取消
                                this.order=true//派单
                                this.delisshow=true
                            break;
                            case 2://待护理
                                this.success=false
                                this.start=true
                                this.stop=true
                                this.cancel=true
                                this.comiteS=false
                                this.order=false
                                this.delisshow=true
                            break;
                            case 3://护理中
                                this.success=true
                                this.start=false
                                this.stop=true
                                this.cancel=true
                                this.comiteS=false
                                this.order=false
                                this.delisshow=true
                            break;
                            case 8://完成
                                this.success=false
                                this.start=false
                                this.stop=false
                                this.cancel=false
                                this.comiteS=false
                                 this.order=false
                                 this.delisshow=false
                            break;
                            case 9://终止
                                this.success=false
                                this.start=false
                                this.stop=false
                                this.cancel=false
                                this.comiteS=false
                                this.order=false
                                this.delisshow=false
                            break;
                            case 5://取消
                                this.success=false
                                this.start=false
                                this.stop=false
                                this.cancel=false
                                this.comiteS=false
                                this.order=false
                                this.delisshow=false
                            break;
                        }
                        if(this.storeDetails.reportType==0){
                            this.storeDetails.reportType='系统'
                         }else{
                            this.storeDetails.reportType='手动'
                        }
                        
                            // this.storeDetails.endTime= new Date(this.storeDetails.endTime).toTimeString().substring(0, 5)
                            // this.storeDetails.startTime= new Date(this.storeDetails.startTime).toTimeString().substring(0, 5)
                        
                        // this.province=data.province
                        // this.city=data.city
                        // this.district=data.district

                        // if(this.province=='' || this.city=='' || this.district==''){
                        //     this.selectedOptions2=[]
                        // }else{
                        //     this.selectedOptions2=[this.TextToCode[this.province].code,this.TextToCode[this.province][this.city].code,this.TextToCode[this.province][this.city][this.district].code]
                        // }
                    }
                })
            },
            //新建工单
            addStoreInfo() {
                this.addText = true;
                this.xiugaibtn2=false
                this.xiugaibtn1=false
                this.details=false
                this.xiugai=false
               
                this.selectedOptions2=[]
                this.address=''
                this.validateForm.name=''
                this.validateForm.mobile=''
                this.validateForm.hlyname=''
                this.gender=0
                this.genders11=0
                this.KHid=''
                this.khObj={}
                this.HLYObj={}
                this.validateForm.mobile=''
                this.validateForm.name=''
                this.validateForm.hlyphone=''
                this.hlyid=''
                this.validateForm.hlyname=''
                this.validateForm.hletime=''
                this.validateForm.hlbtime=''
            },
            //取消保存
            addCancel(){
                this.addStoreInfo()
            },
            //取消修改
            editCancel(){
                this.seeStoreInfo(this.indexId,this.numIndex,{})
            },
            //获取所有工单列表
            getStoreList(s) {
                this.axios.get('workOrder/query?length=500&uid='+this.uid+'&status='+s).then(res=>{
                    if(res.data.status==200){
                        this.storeList=res.data.rows
                        this.pageSize=res.data.pageSize
                        this.total=res.data.total
                        this.storeList.forEach(x=>{
                            x.check=false
                            if(x.reportType==0){
                                x.reportType='系统'
                             }else{
                                x.reportType='手动'
                            }
                            
                        })
                    }
                })
            },
            //保存POST /workOrder/add 新增工单
             saveAddInfo () {
                this.$refs.form.validate().then((result) => {
                    if(result){
                        this.axios.post('/workOrder/add?uid='+this.uid,{
                            //客户信息
                            auntId:this.KHid,
                            auntMobile:this.validateForm.mobile,
                            auntName:this.validateForm.name,
                            //护理员信息
                            caregiversMobile:this.validateForm.hlyphone,
                            caregiversId:this.hlyid,
                            caregiversName:this.validateForm.hlyname,

                            endTime:this.validateForm.hletime.getTime(),
                            startTime:this.validateForm.hlbtime.getTime(),
                            ibeaconMajor:this.ibeaconMajor,
                            ibeaconUUID:this.ibeaconUUID
                        }).then(res=>{
                            if(res.data.status==200){
                                this.addStoreInfo()
                                // this.getStoreList(1)
                                this.getStoreListS(this.value)
                                this.$notify({
                                    title:"",//
                                    message:"保存成功",
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
                    }
                })
            },
            //点击修改
            updateStoreInfo1() {
                this.xiugai=true
                this.details=false
                this.addText=false
                this.xiugaibtn2=true
                this.xiugaibtn1=false
            },
            //执行修改PUT /workOrder/update 修改工单
            updateStoreInfo2(){
                this.$refs.Editform.validate().then((result) => {
                    if(result){
                        this.axios.put('/workOrder/update?uid='+this.uid,{
                            id:this.indexId,
                            auntId:this.KHid,
                            auntMobile:this.validateForm.mobile,
                            auntName:this.validateForm.name,
                            caregiversMobile:this.validateForm.hlyphone,
                            caregiversId:this.hlyid,
                            caregiversName:this.validateForm.hlyname,
                            endTime:this.validateForm.hletime.getTime(),
                            startTime:this.validateForm.hlbtime.getTime(),
                            ibeaconMajor:this.ibeaconMajor,
                            ibeaconUUID:this.ibeaconUUID
                        }).then(res=>{
                            if(res.data.status==200){
                                this.addStoreInfo()
                                this.getStoreList(this.value)
                                this.seeStoreInfo(this.indexId,this.numIndex,{})
                                this.$notify({
                                    title:"",//
                                    message:"修改成功",
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
                    }
                })
            },
             //获取所有工单列表
            getStoreListS(s) {
                this.axios.get('workOrder/query?length=500&uid='+this.uid+'&status='+s).then(res=>{
                    if(res.data.status==200){
                        this.storeList=res.data.rows
                        this.pageSize=res.data.pageSize
                        this.total=res.data.total
                        this.storeList.forEach(x=>{
                            x.check=false
                        })
                        if(this.storeList.length!=0){
                           this.seeStoreInfo(this.storeList[0].id,0,{})
                            this.storeList[0].check=true
                        }
                    }
                })
            },
            //提交GET /workOrder/submit/{id} 提交
            comite(){
                this.axios.get('/workOrder/submit/'+this.orderStr+'?uid='+this.uid).then(res=>{
                    if(res.data.status==200){   
                        this.$notify({
                            title:"",//
                            message:"已提交",
                            type: 'success',
                            position: 'bottom-right'
                        });
                        this.slide()
                        this.getStoreListS(1)
                         
                        this.single=false
                        this.numIndex=0
                        this.storeList.forEach((x)=>{
                            x.check=false
                        })
                        this.orderStrArr=[]
                        this.orderStr=''
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
            //启用开始护理//get /workOrder/startNurse/{id} 开始护理
            startUser() {
                this.axios.get('/workOrder/startNurse/'+this.orderStr+'?uid='+this.uid).then(res=>{
                    if(res.data.status==200){   
                        this.$notify({
                            title:"",//
                            message:"已开始",
                            type: 'success',
                            position: 'bottom-right'
                        });
                        this.slide()
                         this.getStoreListS(2)
                         
                        this.single=false
                        this.numIndex=0
                        this.storeList.forEach((x)=>{
                            x.check=false
                        })
                        this.orderStrArr=[]
                        this.orderStr=''
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
            //get /workOrder/complete/{id} 完成
            successUser() {
                this.axios.get('/workOrder/complete/'+this.orderStr+'?uid='+this.uid).then(res=>{
                    if(res.data.status==200){   
                        this.$notify({
                            title:"",//
                            message:"已完成护理",
                            type: 'success',
                            position: 'bottom-right'
                        });
                        this.slide()
                        this.getStoreListS(3)
                        this.single=false
                        this.numIndex=0
                        this.storeList.forEach((x)=>{
                            x.check=false
                        })
                        this.orderStrArr=[]
                        this.orderStr=''
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
            //终止护理POST /workOrder/stop/{id} 终止
            stopUser(){
                this.gdisshow=true
            },
            //确认终止护理
            stopRemarkSure(){
                this.axios.get('/workOrder/stop/'+this.orderStr+'?uid='+this.uid,{
                    params:{
                        remark:this.stopRemark
                    }
                }).then(res=>{
                    if(res.data.status==200){   
                        this.$notify({
                            title:"",//
                            message:"已终止",
                            type: 'success',
                            position: 'bottom-right'
                        });
                        this.gdisshow=false
                        this.stopRemark=''
                        this.getStoreList(9)
                        this.getStoreDetail(this.indexId)
                        this.single=false
                        this.numIndex=-1
                        this.storeList.forEach((x)=>{
                            x.check=false
                        })
                        this.orderStrArr=[]
                        this.orderStr=''
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
            //取消终止护理
            stopRemarkcancel(){
                this.gdisshow=false
            },
            //取消护理POST /workOrder/cancelNurse/{id} 取消护理
            cancelUser(){
                this.axios.get('/workOrder/cancelNurse/'+this.indexId+'?uid='+this.uid).then(res=>{
                    if(res.data.status==200){   
                        this.$notify({
                            title:"",//
                            message:"已取消护理",
                            type: 'success',
                            position: 'bottom-right'
                        });
                        this.getStoreList(5)
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
            //删除工单
            delUser() {
                this.$Modal.confirm({
                    title: '删除工单',
                    content: '<p>确定要删除吗?删除后信息将不可恢复！</p>',
                    onOk: () => {
                        this.axios.delete('/workOrder/delete/'+this.indexId+'?uid='+this.uid).then(res=>{
                            if(res.data.status==200){   
                                this.$notify({
                                    title:"",//
                                    message:"已删除",
                                    type: 'success',
                                    position: 'bottom-right'
                                });
                               
                                this.getStoreList(this.value)
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
                   
                });
                
            },
            //p派单单机一行护理员
            pdClickRow(row){
                this.pdhlyObj=row.data
            },
            //取消派单
            pdcancel(){
                this.pdisshow=false
                this.pdhlyObj={}
            },
            //确认POST /workOrder/order/{id} 派单 //cid取客户id
            pdSure(){
                this.axios.get('/workOrder/order/'+this.indexId+'?cid='+this.pdhlyObj.id+'&uid='+this.uid).then(res=>{
                    if(res.data.status==200){   
                        this.$notify({
                            title:"",//
                            message:"已派单",
                            type: 'success',
                            position: 'bottom-right'
                        });
                        this.pdisshow=false
                        this.pdhlyObj={}
                        this.getStoreList(1)
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
            //双击即派单
            pdClickhyl1(row){
                this.pdhlyId=row.data.id
                this.axios.get('/workOrder/order/'+this.indexId+'?cid='+this.pdhlyId+'&uid='+this.uid).then(res=>{
                    if(res.data.status==200){   
                        this.$notify({
                            title:"",//
                            message:"已派单",
                            type: 'success',
                            position: 'bottom-right'
                        });
                        this.pdisshow=false
                        this.pdhlyId=''
                        this.getStoreList(1)
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
            //派单
            enterSearchpd(){
                this.axios.get('/caregivers/query?keyword='+this.keywordpd+'&uid=' + this.uid).then((res) => {
                    let data = res.data;
                    if(res.data.status == '200') {
                        this.pdrowData = data.rows;
                        this.pdpageSize = data.pageSize;
                        this.pdtotal = data.total;
                        this.pdrowData.forEach(x=>{
                            if(x.gender==1){    
                                x.gender="男"
                            }else{
                                x.gender="女"
                            }
                            if(x.monday){
                                x.monday="上班"
                            }else{x.monday="休息"}
                            if(x.tuesday){
                                x.tuesday="上班"
                            }else{x.tuesday="休息"}
                            if(x.wednesday){
                                 x.wednesday="上班"
                            }else{x.wednesday="休息"}
                            if(x.thursday){
                                x.thursday="上班"
                            }else{x.thursday="休息"}
                            if(x.friday){
                                 x.friday="上班"
                            }else{x.friday="休息"}
                            if(x.saturday){
                                x.saturday="上班"
                            }else{x.saturday="休息"}
                            if(x.sunday){
                                x.sunday="上班"
                            }else{x.sunday="休息"}
                            x.Raddress=x.province+x.city+x.district+x.addressDetail
                        })
                    }
                })
            },
            //派单
           workorder(){
                this.pdisshow=true
                 this.axios.get('/caregivers/query?uid=' + this.uid).then((res) => {
                    let data = res.data;
                    if(res.data.status == '200') {
                        this.pdrowData = data.rows;
                        this.pdpageSize = data.pageSize;
                        this.pdtotal = data.total;
                        this.pdrowData.forEach(x=>{
                            if(x.gender==1){    
                                x.gender="男"
                            }else{
                                x.gender="女"
                            }
                            if(x.monday){
                                x.monday="上班"
                            }else{x.monday="休息"}
                            if(x.tuesday){
                                x.tuesday="上班"
                            }else{x.tuesday="休息"}
                            if(x.wednesday){
                                 x.wednesday="上班"
                            }else{x.wednesday="休息"}
                            if(x.thursday){
                                x.thursday="上班"
                            }else{x.thursday="休息"}
                            if(x.friday){
                                 x.friday="上班"
                            }else{x.friday="休息"}
                            if(x.saturday){
                                x.saturday="上班"
                            }else{x.saturday="休息"}
                            if(x.sunday){
                                x.sunday="上班"
                            }else{x.sunday="休息"}
                            x.Raddress=x.province+x.city+x.district+x.addressDetail
                        })
                    }
                })
            },
            //派单护理员翻页
            pdchangeSize(size){
                this.pdcurrent=size
                this.axios.get('/caregivers/query?offset='+this.pdcurrent+'&uid=' + this.uid).then((res) => {
                    let data = res.data;
                    if(res.data.status == '200') {
                        this.pdrowData = data.rows;
                        this.pdpageSize = data.pageSize;
                        this.pdtotal = data.total;
                        this.pdrowData.forEach(x=>{
                            if(x.gender==1){    
                                x.gender="男"
                            }else{
                                x.gender="女"
                            }
                            if(x.monday){
                                x.monday="上班"
                            }else{x.monday="休息"}
                            if(x.tuesday){
                                x.tuesday="上班"
                            }else{x.tuesday="休息"}
                            if(x.wednesday){
                                 x.wednesday="上班"
                            }else{x.wednesday="休息"}
                            if(x.thursday){
                                x.thursday="上班"
                            }else{x.thursday="休息"}
                            if(x.friday){
                                 x.friday="上班"
                            }else{x.friday="休息"}
                            if(x.saturday){
                                x.saturday="上班"
                            }else{x.saturday="休息"}
                            if(x.sunday){
                                x.sunday="上班"
                            }else{x.sunday="休息"}
                            x.Raddress=x.province+x.city+x.district+x.addressDetail
                        })
                    }
                })
            },
            //点击差号
            cancelHome(){
                this.$router.push('/wordOrderIndex')
            },
            //下拉加载更多
            handleReachEdge(){
                this.current++//默认10条
                this.axios.get('workOrder/query?length=500&offset='+this.current+'&uid='+this.uid+'&status='+this.value).then(res=>{
                    if(this.current>Math.ceil(this.total/this.pageSize)){
                        this.current=Math.ceil(this.total/this.pageSize)
                    }
                    if(res.data.status==200){
                        let data=res.data.rows
                        data.forEach(x=>{
                            this.storeList.push(x)
                            this.storeList.forEach(x=>{
                                x.check=false
                                if(x.reportType==0){
                                    x.reportType='系统'
                                 }else{
                                    x.reportType='手动'
                                }
                                
                            })
                        })
                        
                    }
                })
                
            },
            //自定义左侧订单列表id
            setId(id){
                return "list"+id
            },
            //每次按钮操作向左滑动，后重置位置为0
            slide(){
                // //console.log($("#list"+this.indexId))
                $("#list"+this.indexId).animate({
                    "marginLeft":"-100%"
                },'fast').animate({
                    "marginLeft":"0"
                },1)
            },
            //全选
            checkAll(v){
                 //订单全选
                this.orderStrArr=[]
                this.orderStr=''
                this.single=v
                if(this.storeList.length!=0){
                    this.seeStoreInfo(this.storeList[0].id,0,{})
                }
                
                this.storeList.forEach((x)=>{
                    if(this.single){
                        x.check=true
                        if(this.orderStrArr.indexOf(x.id)>=0){
                            this.orderStrArr.splice(this.orderStrArr.indexOf(x.id),1)
                        }else{
                            this.orderStrArr.push(x.id)
                            this.orderStr=this.orderStrArr.join(',')
                            //console.log(this.orderStr)
                        }   
                    }else{
                        x.check=false
                        this.orderStrArr=[]
                        this.orderStr=''
                    }
                })
                
                
                
            },
            //单选
            changeOnRowOrder(item,index,event){
                if(event==false){
                    this.single=false
                    this.orderStrArr.splice(this.orderStrArr.indexOf(item.id),1)
                    this.orderStr=this.orderStrArr.join(',')
                    this.numIndex=-1
                    //console.log(this.orderStr)
                }else{
                    this.orderStrArr.push(item.id)
                    this.orderStr=this.orderStrArr.join(',')

                    //console.log(this.orderStr)
                }
            },
        },
        mounted() {
           
            this.height = document.documentElement.clientHeight
            if(this.$route.query.id){
                this.indexId= this.$route.query.id;
                this.numIndex = this.$route.query.index;
                this.value=this.$route.query.s;
                this.getStoreList(this.value);//工单列表
                this.seeStoreInfo(this.indexId,this.numIndex,{})
                this.getStoreDetail(this.indexId)
            }else{
                this.getStoreList(1);
            }
            if(this.$route.params.item!=undefined){
                //console.log(this.$route.params.item)
                this.hlyid=this.$route.params.item.id
                this.validateForm.hlyname=this.$route.params.item.name
                this.validateForm.hlyphone=this.$route.params.item.mobile
            }
            window.onresize=function(){
                this.height = document.documentElement.clientHeight
            }
        }
    }
</script>
<style  scoped>
.tot{
    position:fixed;
    bottom:10px;
    left:15%;
    z-index:12;
}
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
    z-index: 99;
    top: -36px;
    right: 36px;
    font-size: 12px;
     font-weight: 100;
    transform: rotate(46deg);
}
.bgd3{
    border-top:40px solid #FF7D16;
}
.bgd4{
    border-top:40px solid #3b77e3;
}
/*状态的颜色 新增*/
.bgd5{
    border-top:40px solid #d53c39;
}
/*状态的颜色 已停用*/
.bgd6{
    border-top:40px solid #40ca98;
}
.bgd7{
    border-top:40px solid #03733F;
}
.top-left-btn{
        background: #3B77E3;
        margin-left: 10px;
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
    .add-box {
        width: 100%;
        height:100%;
        overflow: hidden!important;
    }
    .cheng{
        width: 100%;
        height: 40px;
        /*margin-top: 10px;*/
    }
    .add-header{
        width: 100%;
        height: 60px;
       /* padding: 10px 0px;*/
        z-index: 1;
        background: #ffffff;

        display: flex;
        justify-content: space-between;
        /*position: fixed;*/
    }
    .top{
        display:flex;
        height:60px;
        line-height: 60px;
        position:fixed;
        width:100%;
        z-index:9;
        background: #fff;
       border-bottom:1px solid #eee;
    }
   .left-top{
    border-right:1px solid #eee;
   }
    .left-top{
        display:flex;
        justify-content: space-between;
        /* align-items: center; */
        padding:0 10px;
        /* height:60px; */
        width:360px;
        flex: 0 0 360px;
        /* line-height: 60px; */
    }



    .right-top{
        display: flex;
        justify-content: space-between;

    }
     .top button{

        cursor:pointer;
    }

    .right-top button:hover{
        color:#478FCA;
    }
    .right-top button img{
        position:relative;
        left:0px;
        top:-2px;
        vertical-align: middle
    }

    .add-box:after {
        content: '';
        display: block;
        clear: both;
    }

    .add-left {
        width:360px;
        flex:0 0 360px;
        display:flex;
         background:#fff;
    }
    .left-content {
        height:100%;
        width:100%;
        margin-bottom:100px;
        border-right:1px solid #E6E6E6;
    }
    .page-box {

        background: #fff;
        position:fixed;
        bottom:45px;
    }


.textbg1{
    color:#40ca98
    }
    .textbg2{
        color:#d53c39;
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
        right:5px;
        top:50px;
    }
    .con-list .date1{
        position:absolute;
        right:45px;
        top:50px;
    }
    .con-list .date2{
        position:absolute;
        right:37px;
        top:50px;
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
    }
    .con-list:last-child{
       margin-bottom: 150px;
    }


.con-list .txt {
    color: #585858;
    font-size: 12px;
    width: 180px;
    position: absolute;
    top: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
    div.con-list:last-child{
        margin-bottom:300px;
    }

    .add-right {
        width:100%;
        height: 100%;
        /*padding-top:30px;*/
        background: #fff;
        overflow: auto;
        position:relative;
    }
    .right-title p {
        width: 150px;
        font-size: 14px;
        color: #585858;
    }

    .title-btn {
        float: right;
        width: auto;
        height: 40px;
        margin-top: -10px;
    }

    .title-btn button {
        width: 80px;
        border-radius: 8px;
        font-size: 14px;
        line-height: 40px;
        border: 0;
    }

    .right-content {
       width: 100%;
    height: 100%;
    /*margin-top: 10px;*/
    /*padding: 15px 0;*/
    padding-left: 25px;

    margin-bottom: 280px;
    }

    .code-box {
        width: 40%;
        height: 40px;
        /*float: left;*/
        margin-bottom: 5px;
        position: relative;
    }

    .code-box img {

    }

    .code-box:after {
        content: '';
        display: block;
        clear: both;
    }

    .code-box p {
        color: #585858;
        font-size: 12px;
        float: left;
        width: auto;
        height: 35px;
        line-height: 35px;
        text-align: left;
    }

    .code-box input {
        /*width: 80%;*/
        height: 35px;
        border: 1px solid #ececec;
        border-radius: 4px;
        padding: 0 10px;
        float: left;
    }
  .lanren {
    position: absolute;
    text-align: center;
    top: 0px;
    right: 0px;
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

    top: -70px;
    right: 70px;
    font-size: 16px;
    font-weight: 900;
    transform: rotate(46deg);
}



.bgd1{
    border-top:80px solid #3b77e3;
}
.bgd2{
    border-top:80px solid #FF7D16;
}
/*状态的颜色 新增*/
.bgd22{
    border-top:80px solid #40ca98;
}
/*状态的颜色 已停用*/
.bgd21{
    border-top:80px solid #007445;
}
.bgd23,.bgd24{
    border-top:80px solid #d53c39;
}
 .title{
        display:flex;justify-content: space-between;margin-top:20px
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
    .detail-public{
        width:100%;
        margin:10px;
    }
    .bor{
       border-bottom:2px solid #086CA2;
    }

  .imgnifo{
    width:80px;
    display:block;
   margin-top:63px;

   height:30px;
   text-align: right
  }
  .bg{
    background-color: #dbe5f1
  }
.code-box .btn-group .week{
    cursor:default;
    position:relative;
}
.code-box .btn-group img{
    position:absolute;
    top:15px;
    left:60px
}
li{
    list-style: none
}
 .detail-top li{
    list-style: none;
  margin:0 20px 0 0;
}
   
.detail-top li span.blackinfo-left{
    color: #2B8F8F;
    /* margin: 0px 10px; */
    font-weight: 600;
    
}
</style>

