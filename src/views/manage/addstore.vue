<template>
    <!--新建仓库-->
    <div class="add-box">
        <!--固定导航-->
        <div class="add-header">
            <div class="top">

                    <div class="left-top">
                        <p class="wldw">
                            <span style="width:42px;font-weight:900">{{$t('public.screen')}}：</span><!--筛选-->
                             <Select style="width:100px" v-model='value' :placeholder="$t('public.all')" @on-change="orderselected"><!--全部-->
                                <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </p>
                        <div>
                        <!--新建-->
                        <span class="top-left-btn"  @click="addStoreInfo">
                            <Icon type="plus" style="position:absolute;top:7px;left:8px"></Icon></span>
                    </div>
                    </div>
                    <!-- <div style='background: rgb(230,233,236);width:3px;height:100%'></div> -->
                    <div class="right-top">
                        <span style="margin-left:20px;font-weight:600;font-size:19px">{{storeTxt}}</span>
                        <div style="margin-right: 25px;">
                            <Button shape="circle"  style="background:#3b77e3;color:#fff;border:none" @click="saveAddInfo('formValidate')" v-show="addText">
                            <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>
                            {{$t('public.SaveBtn')}}<!--保存-->
                            </Button>
                            <Button shape="circle" v-show="addText"  @click="addCancel"  style="background:#999999;color:#fff;" ><Icon type="close" style="margin-right:5px;">
                            </Icon>{{$t('public.cancel')}}</Button><!--取消-->
                            <Button shape="circle" @click="updateStoreInfo1" v-if="xiugaibtn1" style="background:#40ca98;color:#fff;border:none" ><i class="el-icon-edit" style=";margin-right:5px;"></i>{{$t('public.EditBtn')}}</Button><!--修改-->
                            <Button shape="circle" @click="updateStoreInfo2('formValidate1')" v-if="xiugaibtn2"  style="background:#3b77e3;color:#fff;border:none" ><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon> {{$t('public.SaveBtn')}}<!--保存--></Button>
                            <Button shape="circle" v-show="xiugaibtn2"  @click="editCancel"  style="background:#999999;color:#fff;" ><Icon type="close" style="margin-right:5px;">
                            </Icon>{{$t('public.cancel')}}</Button><!--取消-->
                            <Dropdown trigger="click"  v-if='xiugaibtn1'>
                                <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">
                                    {{$t('public.more')}}<!--更多-->
                                <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>

                            </Button>

                            <DropdownMenu slot="list">

                                <span @click="startUser"><DropdownItem >{{$t('public.start')}}</DropdownItem></span>
                                <span @click="stopUser"><DropdownItem >{{$t('public.stop')}}</DropdownItem></span>
                                <span  @click="delUser"><DropdownItem >{{$t('public.del')}}</DropdownItem></span>

                            </DropdownMenu>
                            </Dropdown>

                <span @click="cancelHome" style="cursor:pointer;margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
                        </div>
                    </div>
                <!-- </Col> -->
            </div>
        </div>
        <!-- <div class="cheng"></div> -->
        <div style="display:flex;height:100%;background: rgb(230,233,236);">
            <!-- <Col span="6"> -->
                <div class="add-left">
                    <!--左边内容-->

                    <div class="left-content">
                        <div class='locationSearch'>
                            <Input style='padding:10px 20px;' v-model='searchKeyword' :placeholder="$t('public.codeandname')" @on-enter='enterSearch'>
                            <span slot="append"  @click='search' style='cursor:pointer;'>{{$t('public.search')}}</span><!--搜索-->
                            </Input>
                             <!-- <a style='font-size:14px;font-weight:600;margin-left:20px;border-bottom:1px solid #3b77e3;height:35px;line-hegiht:35px;line-height: 35px;margin-top: -2px;' @click='lsearch'>{{$t('public.PreciseSearch')}}</a> -->
                        </div>
                        <p v-if="storeList.length==0" class='scrollFix'>
                            <Spin>
                                <div>{{$t('public.NoData')}}</div><!--暂无数据-->
                            </Spin>
                        </p>
                        <Scroll :on-reach-bottom="handleReachEdge" :height="height" v-else>
                            <div class="con-list" v-for="(item,index) in storeList" @click="seeStoreInfo(item.id,index)" :class="{bg:numIndex==index}">
                                 <span style="margin-right: 10px;">
                                     <Checkbox :value="numIndex==index"></Checkbox>
                                 </span>
                                 <div>
                                <p class="list-title">{{item.code}}</p>
                                <p class="txt" style="margin-top:10px;">{{item.name}}</p>
                                <div class="lanrenLeft" :class="{bgd4:item.status==1,bgd5:item.status==0,bgd6:item.status==99,bgd61:item.status==9999}">
                                <span >{{item.statusDesc}}</span>
                                </div>​
                                <span class="date1">{{item.person}}</span>
                                <span class="date">{{item.createTime}}</span>
                                </div>
                            </div>

                        </Scroll>
                    </div>
                </div>
            <!--新增内容-->
                <div class="add-right">
                    <div class="right-content" v-show="addText">
                         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style='margin-top:30px'>
                                <div style='display:flex'>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Name')" prop="name">
                                            <Input v-model="formValidate.name" :placeholder="$t('manage.warehouse.nameplaceholder')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Code')" prop="code"><!--编号-->
                                            <Input v-model="formValidate.code" :placeholder="$t('manage.warehouse.codeplaceholder')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.FL')" >
                                            <Select  @on-change="getType" filterable v-model='category' :placeholder="$t('public.pleseSelect')">
                                                <Option v-for="item in storeType" :value='item.value' :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </div>
                                <div  style='display:flex'>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Person')" prop="person">
                                            <Input v-model="formValidate.person" :placeholder="$t('manage.warehouse.Person')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Mobile')" prop="phone">
                                            <Input v-model="formValidate.phone" :placeholder="$t('manage.warehouse.Mobile')"></Input>
                                        </FormItem>
                                     </Col>
                                     <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Tel')" prop="tel">
                                            <Input v-model="formValidate.tel" :placeholder="$t('manage.warehouse.Tel')"></Input>
                                        </FormItem>
                                    </Col>
                                </div>
                                <div>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.zip')" prop="zipcode">
                                            <Input v-model="formValidate.zipcode" :placeholder="$t('manage.warehouse.zip')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.email')" prop="email">
                                            <Input v-model="formValidate.email" :placeholder="$t('manage.warehouse.zipplaceholder')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem label="是否默认" prop="default">
                                            <Checkbox v-model="formValidate.default" @on-change="changeDefault"></Checkbox>
                                        </FormItem>
                                    </Col>
                                </div>
                            <div>
                                <Col span="12">
                                    <div  style='width:100%;display:flex;;position:relative; margin-bottom: 20px;'>
                                        <div style='display: flex;'>
                                            <span class="imgnifo" style='display:inline-block;position:relative;top:-25px;left:0;text-align:right'>
                                               关联员工
                                            </span>
                                            <span @click="getCRM" style='width:100px;height:80px;display:inline-block;' class='sedg'>
                                                <span style='display:inline-block;width:100px;height:60px;border-radius:8px;text-align:center;line-height:60px'>
                                                    <Icon type="android-add" size='36' style='color:#8C939D;position:relative;top:-15px;left:0px'></Icon>
                                                </span>
                                            </span>
                                        </div>
                                        <div style='margin-left: 10px;' >
                                            <Tag type="border" closable color="#199DFF" :fade='false' v-for='(item,index) in employees' :key='index' @on-close="handleClose(index)">{{item.name}}</Tag>
                                        </div>
                                    </div>
                                    <div class="code-box" style="width:100%;height:1%;position:relative;display:flex">
                                      <span class="imgnifo" v-if="imgnifoisshow" >{{$t('manage.warehouse.warehouseLogo')}}</span>
                                            <div style='display: flex;flex-wrap:wrap'>
                                                <div style='border:1px dashed #C0CCDA;border-radius: 6px;'>
                                                <el-upload
                                                  class="avatar-uploader"
                                                  :action="logoUrl"
                                                  :show-file-list="false"
                                                  :before-upload="beforeAvatarUpload"
                                                  :on-success="addsucess"
                                                  name='file' multiple accept="image/*">
                                                  <!-- <img v-if="logo" :src="imageUrl" class="avatar"> -->
                                                  <i class="el-icon-plus avatar-uploader-icon" ></i>
                                                </el-upload>
                                                </div>
                                                <!--仓库图片可选择多个-->
                                                <div v-for='(item,index) in picArr' :key='index' class='cklogos' @mouseover='chaOver(item,index)' @mouseleave='chleave(item,index)'>
                                                    <img :src="item" width='100%' height='100%' >
                                                    <div class='imgBg' v-if='chaIndex==index'>
                                                    </div>
                                                    <span v-if='chaIndex==index' @click.stop='delUp(item,index)'>
                                                    <Icon type="trash-a" size='25' style='color:#333;position:absolute;top:0;right:10px;z-index:3' ></Icon>
                                                    </span>
                                                </div>
                                            </div>
                                    </div>
                                    <div style='margin-bottom:300px;display:flex'>
                                        <div style='margin-top:10px;margin-left:40px;width:40px;;flex:0 0 40px'>{{$t('public.remark')}}</div><!--备注-->
                                        <Input type='textarea' v-model='remark' :placeholder="$t('public.remark')" style='padding-right:10px'></Input>
                                    </div>
                                </Col>
                                <Col span="12">
                                 <FormItem label="地址" style="margin-left:-40px" prop="province">
                                    <div style="display:flex;">
                                        <el-cascader
                                            filterable
                                            expand-trigger="click"
                                            :options="cityInfo"
                                            v-model="selectedOptions2"
                                            @change="handleChange" style="width:400px">
                                        </el-cascader>
                                        <Input type="text" :placeholder="$t('manage.warehouse.dAddress')" v-model="address"  v-on:input="getLngLat"></Input>
                                    </div>
                                </FormItem>
                                    <div class="map-box">
                                        <!--百度地图-->
                                        <baidu-map :center="center" :zoom="zoom" @ready="handler" style="width:100%;height:100%;">
                                            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                                            
                                            <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://img.zsydian.com/icon/zspo.png', size: {width: 80, height: 100}}">
                                            </bm-marker>
                                        </baidu-map>
                                    </div>
                                </Col>
                                
                            </div>
                        </Form>
                    </div>
                     <!--修改信息-->
                    <div class="right-content" v-show="xiugai">
                        <Form ref="formValidate1" :model="formValidate" :rules="ruleValidate" :label-width="80" style='margin-top:30px'>
                                <div style='display:flex'>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Name')" prop="name">
                                            <Input v-model="formValidate.name" :placeholder="$t('manage.warehouse.nameplaceholder')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Code')" prop="code"><!--编号-->
                                            <Input disabled v-model="formValidate.code" :placeholder="$t('manage.warehouse.codeplaceholder')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.FL')" >
                                            <Select  @on-change="getType" filterable v-model='category' :placeholder="$t('public.pleseSelect')">
                                                <Option v-for="item in storeType" :value='item.value' :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </div>
                                <div  style='display:flex'>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Person')" prop="person">
                                            <Input v-model="formValidate.person" :placeholder="$t('manage.warehouse.Person')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Mobile')" prop="phone">
                                            <Input v-model="formValidate.phone" :placeholder="$t('manage.warehouse.Mobile')"></Input>
                                        </FormItem>
                                     </Col>
                                     <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Tel')" prop="tel">
                                            <Input v-model="formValidate.tel" :placeholder="$t('manage.warehouse.Tel')"></Input>
                                        </FormItem>
                                    </Col>
                                </div>
                                <div>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.zip')" prop="zipcode">
                                            <Input v-model="formValidate.zipcode" :placeholder="$t('manage.warehouse.zip')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.email')" prop="email">
                                            <Input v-model="formValidate.email" :placeholder="$t('manage.warehouse.zipplaceholder')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem label="是否默认" prop="default">
                                            <Checkbox v-model="formValidate.default" @on-change="changeDefault"></Checkbox>
                                        </FormItem>
                                    </Col>
                                </div>
                            <div>
                                <Col span="12">
                                <div  style='width:100%;display:flex;;position:relative; margin-bottom: 20px;'>
                                        <div style='display: flex;'>
                                            <span class="imgnifo" style='display:inline-block;position:relative;top:-25px;left:0;text-align:right'>
                                               关联员工
                                            </span>
                                            <span @click="getCRM" style='width:100px;height:80px;display:inline-block;' class='sedg'>
                                                <span style='display:inline-block;width:100px;height:60px;border-radius:8px;text-align:center;line-height:60px'>
                                                    <Icon type="android-add" size='36' style='color:#8C939D;position:relative;top:-15px;left:0px'></Icon>
                                                </span>
                                            </span>
                                        </div>
                                        <div style='margin-left: 10px;' >
                                            <Tag type="border" closable color="#199DFF" :fade='false' v-for='(item,index) in employees' :key='index' @on-close="handleClose(index)">{{item.name}}</Tag>
                                        </div>
                                    </div>
                                    <div class="code-box" style="width:100%;height:1%;position:relative;display:flex">
                                      <!--关联导购-->
                                      <span class="imgnifo" v-if="imgnifoisshow" >{{$t('manage.warehouse.warehouseLogo')}}</span>
                                            <div style='display: flex;flex-wrap:wrap'>
                                                <div style='border:1px dashed #C0CCDA;border-radius: 6px;'>
                                                <el-upload
                                                  class="avatar-uploader"
                                                  :action="logoUrl"
                                                  :show-file-list="false"
                                                  :before-upload="beforeAvatarUpload"
                                                  :on-success="addsucess"
                                                  name='file' multiple accept="image/*">
                                                  <!-- <img v-if="logo" :src="imageUrl" class="avatar"> -->
                                                  <i class="el-icon-plus avatar-uploader-icon" ></i>
                                                </el-upload>
                                                </div>
                                                <!--仓库图片可选择多个-->
                                                <div v-for='(item,index) in picArr' :key='index' class='cklogos' @mouseover='chaOver(item,index)' @mouseleave='chleave(item,index)'>
                                                    <img :src="item" width='100%' height='100%' >
                                                    <div class='imgBg' v-if='chaIndex==index'>
                                                    </div>
                                                    <span v-if='chaIndex==index' @click.stop='delUp(item,index)'>
                                                    <Icon type="trash-a" size='25' style='color:#333;position:absolute;top:0;right:10px;z-index:3' ></Icon>
                                                    </span>
                                                </div>
                                            </div>
                                    </div>
                                    <div style='margin-bottom:300px;display:flex'>
                                        <div style='margin-top:10px;margin-left:40px;width:40px;;flex:0 0 40px'>{{$t('public.remark')}}</div><!--备注-->
                                        <Input type='textarea' v-model='remark' :placeholder="$t('public.remark')" style='padding-right:10px'></Input>
                                    </div>
                                </Col>
                                <Col span="12">
                                    <FormItem label="地址" style="margin-left:-40px" prop="province">
                                    <div style="display:flex;">
                                        <el-cascader
                                            filterable
                                            expand-trigger="click"
                                            :options="cityInfo"
                                            v-model="selectedOptions2"
                                            @change="handleChange" style="width:400px">
                                        </el-cascader>
                                        <Input type="text" :placeholder="$t('manage.warehouse.dAddress')" v-model="address"  v-on:input="getLngLat"></Input>
                                    </div>
                                </FormItem>
                                    <div class="map-box">
                                        <!--百度地图-->
                                        <baidu-map :center="center" :zoom="zoom" @ready="handler" style="width:100%;height:100%;">
                                            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                                            <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://img.zsydian.com/icon/zspo.png', size: {width: 80, height: 100}}">
                                            </bm-marker>
                                        </baidu-map>
                                    </div>
                                </Col>
                                
                            </div>
                        </Form>

                    </div>
                    <!--详情明细订单页面-->
                    <div class="right-content right-detail" ref="detail"  v-if='details'>
                        <div >
                            <Form :label-width="80" style='margin-top:30px'>
                                <div style='display:flex'>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Name')">
                                            <Input disabled v-model="formValidate.name" :placeholder="$t('manage.warehouse.nameplaceholder')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Code')"><!--编号-->
                                            <Input disabled v-model="formValidate.code" :placeholder="$t('manage.warehouse.codeplaceholder')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.FL')" >
                                            <Select disabled @on-change="getType" v-model='category' :placeholder="$t('public.pleseSelect')">
                                                <Option v-for="item in storeType" :value='item.value' :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </div>
                                <div  style='display:flex'>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Person')">
                                            <Input disabled v-model="formValidate.person" :placeholder="$t('manage.warehouse.Person')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Mobile')">
                                            <Input disabled v-model="formValidate.phone" :placeholder="$t('manage.warehouse.Mobile')"></Input>
                                        </FormItem>
                                     </Col>
                                     <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.Tel')">
                                            <Input  disabled v-model="formValidate.tel" :placeholder="$t('manage.warehouse.Tel')"></Input>
                                        </FormItem>
                                    </Col>
                                </div>
                                <div>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.zip')">
                                            <Input disabled v-model="formValidate.zipcode" :placeholder="$t('manage.warehouse.zip')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <FormItem :label="$t('manage.warehouse.email')">
                                            <Input disabled v-model="formValidate.email" :placeholder="$t('manage.warehouse.zipplaceholder')"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span='8'>
                                        <Col span="6">
                                            <FormItem label="是否默认" prop="default">
                                                    <Checkbox disabled v-model="formValidate.default" @on-change="changeDefault"></Checkbox>
                                            </FormItem>
                                        </Col>
                                        <Col span="18">
                                            <FormItem label="状态：">
                                                <span>{{storeDetails.statusDesc}}</span>
                                            </FormItem>
                                        </Col>
                                    </Col>
                                </div>
                            <div>
                                <Col span="12">
                                    <div  style='width:100%;display:flex;;position:relative; margin-bottom: 20px;'>
                                        <div style='display: flex;'>
                                            <span class="imgnifo" style='display:inline-block;position:relative;top:-25px;left:0;text-align:right'>
                                               关联员工
                                            </span>
                                            <!-- <span @click="getCRM" style='width:100px;height:80px;display:inline-block;' class='sedg'>
                                                <span style='display:inline-block;width:100px;height:60px;border-radius:8px;text-align:center;line-height:60px'>
                                                    <Icon type="android-add" size='36' style='color:#8C939D;position:relative;top:-15px;left:0px'></Icon>
                                                </span>
                                            </span> -->
                                        </div>
                                        <div v-if='employees.length==0' style='margin-top: 37px;'>暂无员工</div>
                                        <div style='margin-left: 10px;' >
                                            <Tag type="border" disabled closable color="#199DFF" :fade='false' v-for='(item,index) in employees' :key='index' @on-close="handleClose(index)">{{item.name}}</Tag>
                                        </div>
                                    </div>
                                    <div class="code-box" style="width:100%;height:1%;position:relative;display:flex">
                                      <!--关联导购-->
                                      <span class="imgnifo" v-if="imgnifoisshow" >{{$t('manage.warehouse.warehouseLogo')}}</span>
                                            <div style='display: flex;flex-wrap:wrap'>
                                                
                                                <!--仓库图片可选择多个-->
                                                <div v-for='(item,index) in picArr' :key='index' class='cklogos'>
                                                    <img :src="item" width='100%' height='100%' >
                                                    <div class='imgBg' v-if='chaIndex==index'>
                                                    </div>
                                                    <span v-if='chaIndex==index'>
                                                    <Icon type="trash-a" size='25' style='color:#333;position:absolute;top:0;right:10px;z-index:3' ></Icon>
                                                    </span>
                                                </div>
                                            </div>
                                    </div>
                                    <div style='margin-bottom:300px;display:flex'>
                                        <div style='margin-top:10px;margin-left:40px;width:40px;;flex:0 0 40px'>{{$t('public.remark')}}</div><!--备注-->
                                        <Input disabled type='textarea' v-model='remark' :placeholder="$t('public.remark')" style='padding-right:10px'></Input>
                                    </div>
                                </Col>
                                <Col span="12">

                                    <div class="code-box" style="width:100%;height:30%;display:flex">
                                        <p style="width:40px;flex: 0 0 40px;">{{$t('manage.warehouse.Address')}}：</p>
                                        <el-cascader
                                        disabled
                                            expand-trigger="click"
                                            :options="cityInfo"
                                            v-model="selectedOptions2"
                                            @change="handleChange" style='width:430px'>
                                        </el-cascader>
                                        <Input type="text" disabled :placeholder="$t('manage.warehouse.dAddress')" v-model="address" v-on:input="getLngLat"></Input>
                                        
                                    </div>
                                    <div class="map-box">
                                        <!--百度地图-->
                                        <baidu-map :center="center" :zoom="zoom" @ready="handler" style="width:100%;height:100%;">
                                            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                                            <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://img.zsydian.com/icon/zspo.png', size: {width: 80, height: 100}}">
                                            </bm-marker>
                                        </baidu-map>
                                    </div>
                                </Col>
                                
                            </div>
                        </Form>
                            <!--状态-->

                            <!-- <div class="lanren" :class="{bgd1:storeDetails.status==1,bgd2:storeDetails.status==99,bgd21:storeDetails.status==0,bgd22:storeDetails.status==9999}">

                               <span  >{{storeDetails.statusDesc}}</span>
                            </div>​ -->
                        </div>

                    </div>
                </div>
            <!-- </Col> -->
        </div>
        <!--导购-->
        <Modal v-model="model1" width="660px">
        <p slot="header" style="height:30px;line-height:30px">
            <span>员工搜索</span>
        </p>
        <div slot="footer">
            <Table border height="200" :columns="columns2" :data="data2"
             @on-row-click='clickDGsrow' 
             @on-row-dblclick='dblclickDGsrow'></Table>
            <!--分页-->
            <div style="text-align:left;margin-top:10px">
             <Page :total="dgt" :pageSize='dgp' show-sizer @on-change="getunitData" @on-page-size-change="changedgp"></Page>
            </div>
            <div class='title'>
                <div style='color:#D15151;font-size:14px'>
                </div>
                <div>
                    <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
                    <Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="sureCancel"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
                </div>
            
            </div>
        </div>
    </Modal>
    <!--精准搜索-->
    <Modal v-model="psisshow" width="360px">
        <p slot="header" style="height:30px;line-height:30px;text-align:center">

          <span>精准搜索</span>
        </p>
         <Form :label-width="60">

            <FormItem label="名称" >
               <Input v-model='ckNameL' ></Input>
            </FormItem>
            <FormItem label="编码" >
               <Input v-model='ckcodeL' ></Input>
            </FormItem>
            <FormItem label="联系人" >
               <Input v-model='personL' ></Input>
            </FormItem>
            <FormItem label="手机" >
               <Input v-model='phoneL' ></Input>
            </FormItem>
        </Form>
        <div slot="footer">
          <div class='footer-mark'>
            <span><a style='color:#999;font-size:14px' @click='cancelSearchLocation'>取消</a></span>
            <span style='font-size:20px;width:1px;height:40px;background:#e4e4e4'></span>
            <span ><a style='color:#3B77E3;font-size:14px' @click='sureSearchLocation'>确认</a></span>
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
import LoadUrl from '@/components/common/actionLoad'
import { regionData,CodeToText,TextToCode} from 'element-china-area-data'
    export default {
        // components:{
        //  selectbtn
        // },
        data() {
            return {
                emp:'',
                dgt:0,
                dgp:0,
                employees:[],//导购
                //精准搜索
                ckNameL:'',//仓库名称
                ckcodeL:'',//编号
                personL:'',//联系人
                phoneL:'',//手机
                psisshow:false,//精准搜索是否显示
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
                        label:'全部',
                        value:0
                    },
                    {
                        label:this.$t('public.normal'),//正常
                        value:1
                    },
                    {
                        label:this.$t('public.normalT'),//"已停用",
                        value:99
                    },
                ],
                dialogVisible:false,
                xiugaibtn2:false,//修改的保存按钮
                xiugaibtn1:false,//修改按钮
                details:false,//详情页是否显示
                xiugai:false,//修改页面是否显示
                storeDetails:{},//仓库详情
                //会员
                employeeVoList:[],
                 columns2: [
                    
                    {
                        title:"编码",
                        key:"code"
                    },
                    {
                        title: '姓名',
                        ellipsis:true,
                        key: 'name',
                    },
                    {
                        title: '电话',
                        ellipsis:true,
                        key: 'mobile',

                    },
                    {
                        title: '地址',
                        ellipsis:true,
                        key: 'address',
                    },

                ],
                data2: [],//导购
                model1:false,
                height:'',
                current:1,
                numIndex:-1,//侧栏下标
                indexId:0,//仓库id
                addText: true, //新建仓库true  修改仓库false
                storeTxt:this.$t('manage.warehouse.addnewS'),
                storeList: [],
                total: 0, //页码总数
                pageSize: 0, //页面条数
                province: '', //省
                city: '', //市
                district: '', //区
                center: {
                    lng: 116.404,
                    lat: 39.915
                },
                zoom: 16,
                //新增仓库保存数据
                formValidate:{
                    name:'',//出库名称
                    person:'',//联系人
                    phone:'',//手机
                    tel:'',//电话
                    code:"",//编码
                    email:"",//邮箱
                    zipcode:"",//邮编
                    default:false,//是否默认仓库
                    province:""
                },
                //验证
                ruleValidate:{
                name:[
                        { required: true, message: '仓库名称不能为空', trigger: 'blur' },
                          { pattern:/^[A-Za-z\d_\-\u4e00-\u9fa5]{1,20}$/, message: '存在非法字符或超过指定长度20个字符' }
                    ],
                province:[
                         { required: true, message: '地址不能为空', trigger: 'change' },
                         
                    ],
                person:[
                         { required: true, message: '联系人不能为空', trigger: 'blur' },
                         { pattern:/^[A-Za-z\d_\-\u4e00-\u9fa5]{1,20}$/, message: '存在非法字符或超过指定长度20个字符' }

                    ],
                 phone:[
                        { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号码' }],
                    tel:[
                        { pattern: /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/, message: '请输入正确的电话号码' }
                    ],
                    email:[{ pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请输入正确的邮箱',trigger: 'blur' }],
                    // zipcode:[{ pattern:/^[1-9][0-9]{5}$/, message: '邮政编码格式不正确！' }]
                },
                address: '', //详细地址
                businessHours:'',//经营时间
                remark: '', //备注
                id: '', //仓库的id
                DG:'',//导购人选
                imgnifoisshow:true,
                category:'',//类型
                logo:"",//仓库图片
                picArr:[],//仓库图片数组
                chaIndex:-1,
                // selectionDefaule:"普通库",//默认选择
                 storeType: [],//出库类型数据
            }
        },
        methods: {
            
            //默认仓库选择
            changeDefault(t){
                this.formValidate.default=t
               
            },
            //双击后可修改仓库信息
            seeStoreInfo(id,index) {
                this.addText = false;
                this.xiugai=false
                this.details=true
                this.indexId = id;
                this.emp=''
                this.numIndex = index;
                this.xiugaibtn2=false
                this.xiugaibtn1=true
                this.getStoreDetail(this.indexId);
            },
            //新建仓库
            addStoreInfo() {
                this.addText = true;
                this.xiugaibtn2=false
                this.xiugaibtn1=false
                this.details=false
                this.xiugai=false
                this.storeTxt = this.$t('manage.warehouse.addnewS');
                this.id = '';
                
                this.formValidate.name = '';
                this.formValidate.person = '';
                this.formValidate.phone = '';
                this.formValidate.email = '';
                this.formValidate.zipcode = '';
                this.formValidate.code = '';
                // this.formValidate.province = '';
                this.address = '';
                // this.city = '';
                // this.district = '';
                this.remark = '';
                this.businessHours='';

                this.formValidate.tel='';
                this.DG='',
                this.logo='',
                this.category =''
                this.selectedOptions2=[]
                this.picArr=[]
                
            },
            //取消保存
            addCancel(){
                this.addStoreInfo()
            },
            //取消修改
            editCancel(){
                this.seeStoreInfo(this.indexId,this.numIndex)
            },
            //保存后获取所有仓库信息列表
            getStoreLists() {
                this.axios.get('/warehouse/query?uid=' + this.uid+'&status=1').then((res) => {
                    if(res.data.status == '200') {
                        let data = res.data;
                        this.storeList = data.rows;
                        this.pageSize = data.pageSize;
                        this.total = data.total;
                        this.storeList.forEach((x,index)=>{
                            if(x.status==1){
                                x.statusDesc=this.$t('public.normal')
                            }
                            if(x.status==99){
                                x.statusDesc=this.$t('public.normalT')
                            }
                            if(x.status==0){
                                x.statusDesc=this.$t('public.normal')
                            }
                             if(x.status==9999){
                                x.statusDesc=this.$t('public.del')
                            }
                            x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        })
                        if(this.storeList.length==0){
                            return
                        }else{
                            

                            this.seeStoreInfo(this.storeList[0].id,0)
                            this.getStoreDetail(this.storeList[0].id)
                        }
                    }
                })
            },
            //获取所有仓库信息列表
            getStoreList(s) {
                this.axios.get('/warehouse/query?uid=' + this.uid+'&status='+s).then((res) => {
                    if(res.data.status == '200') {
                        let data = res.data;
                        this.storeList = data.rows;
                        this.pageSize = data.pageSize;
                        this.total = data.total;
                        this.storeList.forEach((x,index)=>{
                            if(x.status==1){
                                x.statusDesc=this.$t('public.normal')
                            }
                            if(x.status==99){
                                x.statusDesc=this.$t('public.normalT')
                            }
                            if(x.status==0){
                                x.statusDesc=this.$t('public.normal')
                            }
                             if(x.status==9999){
                                x.statusDesc=this.$t('public.del')
                            }
                            x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        })
                        if(this.storeList.length==0){
                            this.addStoreInfo()
                        }else if(this.$route.query.id){
                            this.seeStoreInfo(this.indexId,this.numIndex)
                        }else{
                            this.addStoreInfo()
                        }
                    }
                })
            },
             //修改获取所有仓库信息列表
            getStoreListss() {
                this.axios.get('/warehouse/query?uid=' + this.uid+'&status=1').then((res) => {
                    if(res.data.status == '200') {
                        let data = res.data;
                        this.storeList = data.rows;
                        this.pageSize = data.pageSize;
                        this.total = data.total;
                        this.storeList.forEach((x,index)=>{
                            if(x.status==1){
                                x.statusDesc=this.$t('public.normal')
                            }
                            if(x.status==99){
                                x.statusDesc=this.$t('public.normalT')
                            }
                            if(x.status==0){
                                x.statusDesc=this.$t('public.normal')
                            }
                             if(x.status==9999){
                                x.statusDesc=this.$t('public.del')
                            }
                            x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        })
                        this.seeStoreInfo(this.indexId,this.numIndex)
                    }
                })
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

            //输入详细地址后 根据输入的地址  获取地址的经度和纬度
            getLngLat() {
                var _this = this;
                $.ajax({
                    dataType: 'jsonp',
                    url: 'https://api.map.baidu.com/geocoder/v2/?address=' +_this.formValidate.province+_this.city+_this.district+ _this.address + '&output=json&ak=BBe8b008fb274f9544aa96828ac8c10e&callback=showLocation',
                    type: 'get',
                    crossDomain: true,
                }).done(function(data) {
                    var lngLat = data.result.location;
                    _this.center.lng = lngLat.lng;
                    _this.center.lat = lngLat.lat;
                });
            },
            //保存
             saveAddInfo (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.axios.post('/warehouse/add?uid=' + this.uid, {
                                code:this.formValidate.code,
                                address: this.address,
                                name: this.formValidate.name,
                                person: this.formValidate.person,
                                phone: this.formValidate.phone,
                                tel:this.formValidate.tel,
                                email:this.formValidate.email,
                                default:this.formValidate.default,
                                city:this.city,
                                district: this.district,
                                province: this.formValidate.province,
                                remark: this.remark,
                                businessHours:this.businessHours,
                                zipcode:this.formValidate.zipcode,
                                category : this.category,
                                logo:this.picArr.join(','),
                                employees:this.employees
                            }).then((res) => {
                                if(res.data.status == '200') {
                                    this.$notify({
                                        title:"",//
                                        message: this.$t('public.SaveSuccess'),//
                                        type: 'success',
                                        position: 'bottom-right'
                                    });
                                    this.getStoreLists();
                                    this.formValidate.code='';
                                    this.address = '';
                                    this.city = '';
                                    this.district = '';
                                    this.formValidate.name = '';
                                    this.formValidate.person = '';
                                    this.formValidate.phone = '';
                                    this.formValidate.email = '';
                                    this.formValidate.zipcode = '';
                                    this.formValidate.province = '';
                                    this.businessHours='';
                                    this.remark = '';
                                    this.formValidate.tel='';
                                    this.logo='';
                                    this.category ='';
                                    this.address='';
                                    this.selectedOptions2=[];
                                    this.picArr=[];
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
            //删除仓库信息
            delStoreInfo: function() {
                if(!this.id) { //新建时候的删除
                    this.$notify({
                        title:"",//
                        message: this.$t('public.errorOneData'),
                        type: 'error',
                        position: 'bottom-right'
                    });

                } else { //修改的时候 删除  删除仓库
                    this.$Modal.confirm({
                        title: this.$t('public.deleteInfo'),//'删除信息',
                        content: '<p>Are you sure ?</p>',
                        onOk: () => {
                                this.axios.delete('/warehouse/delete/' + this.id + '?uid=' + this.uid).then((res) => {
                                    if(res.data.status == 200) {
                                        this.$notify({
                                           title:"",//
                                            message: this.$t('public.deleteSuccess'),//
                                            type: 'success',
                                            position: 'bottom-right'
                                        });
                                        this.seeStoreInfo(this.indexId,this.numIndex)
                                        this.getStoreList(1);
                                        this.addText = true;
                                }
                            })
                        },
                        onCancel: () => {
                            this.$Message.info(this.$t('public.deleteCancel'));
                        }
                    });
                }
            },
            //鼠标移动到图片商
            chaOver(item,index){
                this.chaIndex=index
            },
            chleave(item,index){
                this.chaIndex=-1
            },
            delUp(item,index){
                this.picArr.splice(index,1)
                console.log(this.picArr)
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
                if(this.picArr.length==6){
                    this.$notify({
                        title: "",//'失败',
                        message:'最多上传6张图片',
                        type: 'error',
                        position: 'bottom-right'
                    });
                }else{
                    if(res.status==200){
                        this.picArr.push(res.rows.url)
                    }else{
                        this.$notify({
                            title: "",//'失败',
                            message:"上传失败",
                            type: 'error',
                            position: 'bottom-right'
                        });
                    }
                }
                
                
            },
            //id去获得仓库的详情
            getStoreDetail: function(id) {
                this.axios.get('/warehouse/get/' + id + '?uid=' + this.uid).then((res) => {
                    if(res.data.status == '200') {
                        let data = res.data.rows;
                        this.storeDetails=data
                        //导购
                        if(data.employees==null){
                            this.employees =[]
                        }else{
                           this.employees=data.employees

                        }
                        this.formValidate.name = data.name;
                        this.formValidate.person = data.person;
                        this.formValidate.phone = data.phone;
                        this.formValidate.code=data.code
                        this.formValidate.email=data.email
                        this.formValidate.default=data.default
                        this.formValidate.zipcode=data.zipcode
                        this.storeTxt =data.name;
                        this.address = data.address;
                        this.remark = data.remark;
                        this.businessHours = data.businessHours;
                            if(this.storeDetails.status==1){
                                this.storeDetails.statusDesc=this.$t('public.normal')
                            }
                            if(this.storeDetails.status==99){
                                this.storeDetails.statusDesc=this.$t('public.normalT')
                            }
                            if(this.storeDetails.status==0){
                                this.storeDetails.statusDesc=this.$t('public.addnew')
                            }
                             if(this.storeDetails.status==9999){
                                this.storeDetails.statusDesc=this.$t('public.del')
                            }
                        //导购数组转换字符串链接
                        let empArr=[]
                        if(this.storeDetails.employees==null){
                            empArr=[]
                            this.emp=''
                        }else{
                            this.storeDetails.employees.forEach(x=>{
                                empArr.push(x.name)
                            })
                            this.emp=empArr.join(',')
                        }
                        // this.logo = data.logo;
                        if(data.logo==null || data.logo==''){
                            this.picArr=[]
                        }else{
                            this.picArr=data.logo.split(',')
                        }
                        this.formValidate.tel = data.tel;
                        this.category  = data.category

                         data.createTime=new Date(data.createTime).toLocaleDateString().replace(/\//g,'-')
                         //接收地址
                            this.formValidate.province=data.province
                            this.city=data.city
                            this.district=data.district
                            if(data.province==null ||data.province=='' || data.city==null|| data.city=='' || data.district==null||data.district=='' ){
                                this.selectedOptions2=[]
                            }else{
                                //转为code
                                this.selectedOptions2=[this.TextToCode[this.formValidate.province].code,this.TextToCode[this.formValidate.province][this.city].code,this.TextToCode[this.formValidate.province][this.city][this.district].code]
                                this.getLngLat()//获取地图位置
                            }
                        this.getLngLat()//地图显示

                    }
                })
            },
            //点击修改
            updateStoreInfo1:function () {
                this.xiugai=true
                this.details=false
                this.addText=false
                this.xiugaibtn2=true
                this.xiugaibtn1=false
                this.getLngLat()
            },
            //执行修改
            updateStoreInfo2(name){
                  this.$refs[name].validate((valid) => {
                    if(valid){
                        this.axios.put('/warehouse/update?uid=' + this.uid, {
                        id:this.indexId,
                        province: this.formValidate.province,
                        address: this.address,
                        city:this.city,
                        district: this.district,
                        default:this.formValidate.default,
                        code:this.formValidate.code,
                        name: this.formValidate.name,
                        person: this.formValidate.person,
                        phone: this.formValidate.phone,
                        email: this.formValidate.email,
                        remark: this.remark,
                        businessHours: this.businessHours,
                        zipcode:this.formValidate.zipcode,
                        tel:this.formValidate.tel,
                        logo:this.picArr.join(','),
                        category :this.category,
                        employees:this.employees
                    }).then((res) => {
                        if(res.data.status==200){
                            this.$notify({
                                title:"",//
                                message: this.$t('public.editSuccess'),//
                                type: 'success',
                                position: 'bottom-right'
                            });
                            this.addStoreInfo()
                            this.getStoreListss()
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
            
            //获取地址
            //省市区
            handleChange(arr){
                this.formValidate.province = this.CodeToText[arr[0]]
                this.city =this.CodeToText[arr[1]]
                this.district = this.CodeToText[arr[2]]
                this.getLngLat()
            },
            //点击停用用户
            stopUser() {
                if(this.indexId==''){
                    this.$notify({
                        title:"",//
                        message: this.$t('public.errorOneData'),
                        type: 'error',
                        position: 'bottom-right'
                    });
                }else{
                    this.axios.post('/warehouse/disabled/' + this.indexId + '?uid=' + this.uid).then((res) => {
                    if(res.data.status == 200) {
                        this.$notify({
                            title:"",//
                           message:this.$t('public.normalS'),//
                            type: 'success',
                            position: 'bottom-right'
                        });
                        this.getStoreList(1);
                        this.indexId=''
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
            //启用仓库
            startUser: function() {
                if(this.indexId==''){
                    this.$notify({
                        title:"",//
                        message: this.$t('public.errorOneData'),
                        type: 'error',
                        position: 'bottom-right'
                    });
                }else{
                    this.axios.post('/warehouse/enabled/' + this.indexId + '?uid=' + this.uid).then((res) => {
                        if(res.data.status == 200) {

                             this.$notify({
                                title:"",//
                                message: this.$t('public.normalS'),// '启用成功!',
                                type: 'success',
                                position: 'bottom-right'
                            });
                            
                            this.getStoreList(1);
                            this.indexId=''
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
            //删除仓库
            delUser: function() {
                if(this.indexId==''){
                    this.$notify({
                        title:"",//
                        message: this.$t('public.errorOneData'),
                        type: 'error',
                        position: 'bottom-right'
                    });
                }else{
                    this.$Modal.confirm({
                            title: '删除仓库',
                            content: '<p>确定要删除吗?</p>',
                            onOk: () => {
                                this.axios.delete('/warehouse/delete/'+this.indexId+'?uid=' + this.uid).then((res) => {
                                    if(res.data.status == 200) {
                                        this.$notify({
                                            title:"",//
                                            message:this.$t('public.deleteSuccess'),//
                                            type: 'success',
                                            position: 'bottom-right'
                                        });
                                        this.getStoreList(1);
                                        this.indexId=''
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
                           
                        });
                }
            },
            changePerson(value){
                this.DG = value[0].name
            },
            //类型
            getType(value){
                console.log(value)
                this.category  = value
            },
            
            //获取仓库类型
            getstoreAllType(){
                this.axios.get('waretype/query?length=99&uid='+this.uid).then(res=>{
                    if(res.data.status==200){

                       res.data.rows.forEach((item,index)=>{
                            let arr={
                                value:res.data.rows[index].key,
                                label:res.data.rows[index].title
                            }
                           this.storeType.push(arr)
                           console.log(this.storeType)
                        })
                    }
                })
            },
            //点击差号
            cancelHome(){
                this.$router.push('/storehouse')
            },
            //下拉加载更多
            handleReachEdge(){
                this.current++//默认10条
                this.axios.get('/warehouse/query?offset='+this.current+'&uid='+this.uid+'&status='+ this.value).then((res)=>{
                    if(this.current>Math.ceil(this.total/this.pageSize)){
                        this.current=Math.ceil(this.total/this.pageSize)
                    }
                    res.data.rows.forEach((item)=>{
                        item.createTime=new Date(item.createTime).toLocaleDateString().replace(/\//g,'-')
                        this.storeList.push(item)
                        this.storeList.forEach((x,index)=>{
                            if(x.status==1){
                                x.statusDesc=this.$t('public.normal')
                            }
                            if(x.status==99){
                                x.statusDesc=this.$t('public.normalT')
                            }
                            if(x.status==0){
                                x.statusDesc=this.$t('public.addnew')
                            }
                             if(x.status==9999){
                                x.statusDesc=this.$t('public.del')
                            }
                            x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        })
                    })

                })

            },
            //搜索
            search(){
                this.axios.get('/warehouse/query?keyword='+this.searchKeyword+'&uid='+this.uid).then((res) => {
                    if(res.data.status==200){
                        let data = res.data;
                        this.storeList = data.rows;
                        this.pageSize = data.pageSize;
                        this.total=data.total;
                         this.storeList.forEach((x,index)=>{
                             if(x.status==1){
                                x.statusDesc=this.$t('public.normal')
                            }
                            if(x.status==99){
                                x.statusDesc=this.$t('public.normalT')
                            }
                            if(x.status==0){
                                x.statusDesc=this.$t('public.addnew')
                            }
                             if(x.status==9999){
                                x.statusDesc=this.$t('public.del')
                            }
                            x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        })
                    }
                })
            },
            //精准搜索回车
            enterSearch(){
                this. search()
            },
             //点击精准搜索
           lsearch(){
                this.ckNameL=''
                this.ckcodeL=''
                this.personL=''
                this.phoneL=''
                this.psisshow=true
           },
           //精准搜索取消
           cancelSearchLocation(){
                this.ckNameL=''
                this.ckcodeL=''
                this.personL=''
                this.phoneL=''
                this.psisshow=false
           },
           //精准搜索确认
           sureSearchLocation(){
                this.axios.get('/warehouse/query?uid='+this.uid,{
                    name:this.ckNameL,
                    code:this.ckcodeL,
                    person:this.personL,
                    phone:this.phoneL
                }).then((res) => {
                    if(res.data.status==200){
                        let data = res.data;
                        this.storeList = data.rows;
                        this.pageSize = data.pageSize;
                        this.total=data.total;
                        this.psisshow=false
                        this.storeList.forEach((x,index)=>{
                            if(x.status==1){
                                x.statusDesc=this.$t('public.normal')
                            }
                            if(x.status==99){
                                x.statusDesc=this.$t('public.normalT')
                            }
                            if(x.status==0){
                                x.statusDesc=this.$t('public.normal')
                            }
                             if(x.status==9999){
                                x.statusDesc=this.$t('public.del')
                            }
                            x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        })
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
             //下拉框选择
            orderselected(value){
                this.value = value
                this.getStoreList(value);
            },

            //获取导购
             modelCancel(){
                this.model1 = false;
            },
            //获取导购
            getCRM(){
                this.model1=true
                this.axios.get('employee/query?uid='+this.uid+'&status=1').then(res=>{
                    if(res.data.status==200){
                        this.data2=res.data.rows
                         this.dgt=res.data.total
                        this.dgp=res.data.pageSize
                    }
                })
            },

            handleClose(index){
                 this.employees.splice(index,1)
            },
             //单击一行导购
            clickDGsrow(data){
                this.dgbj=data
                console.log(data)
            },
            //确认
            sureCancel(){
                 let arr={
                    name:this.dgbj.name,
                    code:this.dgbj.code,
                    accountName:this.dgbj.accountName,
                    emergencyContact:this.dgbj.emergencyContact,
                    emergencyContactTel:this.dgbj.emergencyContactTel,
                    headPic:this.dgbj.headPic,
                    phone:this.dgbj.phone,
                    roleId:this.dgbj.roleId,
                    positionId:this.dgbj.positionId,
                    id:this.dgbj.id,
                    gender:this.dgbj.gender,
                    roleId:this.dgbj.roleId
                }
                this.employees.push(arr)
                //对象去重
                for(var i = 0; i < this.employees.length - 1; i++) {
                    for(var j = i+1; j < this.employees.length; j++) {
                      if(this.employees[i].id == this.employees[j].id) {
                        this.$notify({
                            title:"",//
                            message:'该员工已存在！',
                            type: 'error',
                            position: 'bottom-right'
                        });
                        console.log(this.employees)
                        this.employees.splice(j, 1)
                      }else{
                        console.log('n')
                      }
                    }
                  }
                this.model1 = false;
            },
            //双击导购一行
            dblclickDGsrow(){
                this.sureCancel()
            },
            //搜索
            dgsearchInput(){
                 this.axios.get('employee/query?keyword='+this.dgkeyword+'&uid='+this.uid+'&status=1').then(res=>{
                    if(res.data.status==200){
                        this.data2=res.data.rows
                        this.dgt=res.data.total
                        this.dgp=res.data.pageSize
                    }
                })
            },
            onEenter(){
               this.dgsearchInput()
            },
            //导购翻页
            getunitData(current){
                this.axios.get('employee/query?offset='+current+'&uid='+this.uid+'&status=1').then(res=>{
                    if(res.data.status==200){
                        this.data2=res.data.rows
                        this.dgt=res.data.total
                        this.dgp=res.data.pageSize
                    }
                })
            },
            changedgp(size){
                this.dgp=size
            },
        },
        mounted() {
            this.getstoreAllType();//仓库类型
            if(this.$route.query.id){
                this.indexId= this.$route.query.id;
                this.numIndex = this.$route.query.index;
                this.value=this.$route.query.s;
                this.getStoreList(this.value);//仓库列表
                this.seeStoreInfo(this.indexId,this.numIndex)
                this.getStoreDetail(this.indexId)
            }else{
                this.getStoreList(1);//仓库列表
            }
            this.height = document.documentElement.clientHeight
            window.onresize=function(){
                this.height = document.documentElement.clientHeight
            }
        }
    }
</script>
<style  scoped>

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
    z-index: 9999999999999;
    top: -36px;
    right: 36px;
    font-size: 12px;
     font-weight: 100;
    transform: rotate(46deg);
}
.bgd4{
    border-top:40px solid #40ca98;
}
/*状态的颜色 新增*/
.bgd5{
    border-top:40px solid #3b77e3;
}
/*状态的颜色 已停用*/
.bgd6{
    border-top:40px solid #d53c39;
}
.bgd61{
    border-top:40px solid #d53c39;
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
        z-index: 1;
        background: #ffffff;
        display: flex;
        justify-content: space-between;
    }
    .top{
        display:flex;
        height:60px;
        line-height: 60px;
        width:100%;
        background: #fff;
       border-bottom:1px solid #eee;
    }
   .left-top{
    border-right:1px solid #eee;
   }
    .left-top{
        display:flex;
        justify-content: space-between;
        padding:0 10px;
        height:60px;
        width:360px;
        flex: 0 0 360px;
        line-height: 60px;
    }
    .imgBg{
        position:absolute;top:0;left:0;width:100%;height:100%;text-align:center;margin:0 auto;background:#ccc;opacity:0.5
    }
    .cklogos{
        width:130px;height:130px;display: flex;flex-wrap:wrap;margin:5px;position:relative;cursor:pointer
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
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
    .right-top{
        display: flex;
        justify-content: space-between;
        width:100%;

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

    .ivu-icon-navicon {
        font-size: 20px;
    }
.textbg1{
    color:#40ca98
    }
    .textbg2{
        color:#d53c39;
    }
  .detail-top{
        margin-top:20px;
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
     .sedg{
        display: inline-block;
    width: 150px;
    height: 147px;
    border-radius: 8px;
    border: 1px dashed #C0CCDA;
    text-align: center;
    line-height: 129px;
    margin-left: -2px;
    background: #FBFDFF
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
        right:70px;
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
   
   padding:0 10px;
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
    color:#40ca98;
    /*border-top: 80px solid #40ca98;*/
}
.bgd2{
    color:#d53c39;
    /*border-top: 80px solid #d53c39;*/
}
.bgd21{
    color:#d53c39;
    /*border-top:80px solid #3b77e3;*/
}

/*状态的颜色 已停用*/
.bgd22{
    border-top:80px solid #d53c39;
}
 .title{
        display:flex;justify-content: space-between;margin-top:20px
    }
    .title:hover{
       }
    .map-box {
        width: 100%;
        height: 300px;
    }

    button {
        outline: none;
    }

    input {
        outline: none;
    }

    option {
        outline: none;
    }


     .btn-group{
        display:flex;
        margin:20px 0 0 43px;
    }

    .btns {
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        color: #0d0d0d;
        padding: 0 12px;
        border: 1px solid #ececec;
        border-radius: 6px;
        margin-left: 12px;
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
    flex:0 0 80px;
    width:80px;
    display:block;
   margin-top:63px;
   margin-right:15px;
   margin-left:-15px;
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
.tot{
    position:fixed;
    bottom:10px;
    left:15%;
    z-index:12;
}
</style>

<style>
    .ivu-modal-close .ivu-icon{
        color: #fff;
    }

.el-input__inner{
  border: 1px solid #e4e4e4!important;
  height: 32px!important;
}
</style>
