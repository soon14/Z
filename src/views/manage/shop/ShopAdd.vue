<template>
    <!--新建门店-->
        <div class="add-box">
        <!--固定导航-->
        <div class="add-header">
            <div class="top">
                    <div class="left-top">
                        <p class="wldw">
                        <span style="width:42px;font-weight:900">{{$t('public.screen')}}：</span>
                         <Select style="width:100px" v-model='valueT' placeholder="全部"  @on-change="orderselected">
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
                        <span style="margin-left:20px;font-size:19px;font-weight:bold">{{storeTxt}}</span>
                    <div style="display: inline-block;position:absolute;right:270px;">
                            <Button shape="circle" type="ghost" style="background:#3b77e3;color:#fff;border:none" @click="saveAddInfo('formValidate')" v-show="addText" ><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}</Button><!--保存-->
                            <Button shape="circle" v-show="addText"  @click="addCancel"  style="background:#999999;color:#fff;" ><Icon type="close" style="margin-right:5px;">
                            </Icon>{{$t('public.cancel')}}</Button><!--取消-->
                            <Button type="ghost" v-if='xiugaibtn1' shape="circle"  @click="updateStoreInfo"   style="background:#40ca98;color:#fff;border:none">
                            <i class="el-icon-edit" style=";margin-right:5px;"></i>
                        {{$t('public.EditBtn')}}
                        </Button>
                        <Button type="ghost"  shape="circle"  @click="updateStoreInfo1('formValidate1')" v-if="xiugaibtn"  style="background:#3b77e3;color:#fff;border:none">
                           <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>
                        {{$t('public.SaveBtn')}}
                        </Button>
                        <Button shape="circle" v-show="xiugaibtn"  @click="editCancel"  style="background:#999999;color:#fff;" ><Icon type="close" style="margin-right:5px;">
                            </Icon>{{$t('public.cancel')}}</Button><!--取消-->
                            <Dropdown trigger="click"  v-if='xiugaibtn1'>
                                <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">
                                    {{$t('public.more')}}
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

        <div class="cheng"></div>
        <div style="display:flex;background: rgb(230,233,236);height: 100%;">
              <!-- <Col span="6"> -->
            <div class="add-left">

               <div class="left-content" >
                       <!--左边内容-->
              <div class='locationSearch'>
                    <Input style='padding: 10px 20px;' v-model='searchKeyword' :placeholder="$t('public.codeandname')" @on-enter='entersSearch'>
                        <span slot="append"  @click='search' style='cursor:pointer;'>{{$t('public.search')}}</span>
                    </Input>
                     <!-- <a style='font-size:14px;font-weight:600;margin-left:20px;border-bottom:1px solid #3b77e3;height:35px;line-hegiht:35px;line-height: 35px;margin-top: -2px;' @click='searchLocation'>精准搜索</a> -->
                </div>
                    <p v-if="storeList.length==0" class='scrollFix'>
                        <Spin>

                            <div>{{$t('public.NoData')}}</div>
                        </Spin>
                    </p>
                    <Scroll :on-reach-bottom="handleReachEdge" :height="height" v-else >

                        <div class="con-list" v-for="(item,index) in storeList" :key='index' @click="seeStoreInfo(item.id,index)" :class="{bg:numIndex==index}">
                             <span style="margin-right: 10px;">
                                 <Checkbox :value="numIndex==index"></Checkbox>
                             </span>
                             <div>
                            <p class="list-title">
                                <span>{{item.code}}</span>
                                <span class='file' >
                                    <Tooltip content="有附件" placement="right-start">
                                        <img src="http://img.zsydian.com/icon/gys_file.png" width='10' height='10' v-if='item.attachs' >
                                    </Tooltip>
                                </span>
                            </p>
                            <p class="txt" style="margin-top:10px;">{{item.name}}</p>

                            <span class="status">{{item.person}}</span>

                            <span class="date">{{item.createTime}}</span>
                            </div>
                            <div class="lanrenLeft" :class="{bgd4:item.status==1,bgd5:item.status==0,bgd6:item.status==99}">
                               <span >{{item.statusDesc}}</span>
                            </div>​
                        </div>

                    </Scroll>
                </div>
            </div>
          <!-- </Col> -->
            <!--右边内容-->
             <!-- <Col span="18"> -->
            <div class="add-right">
                <!--保存-->
                <div class="right-content" v-if="addText">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
                            <div style='display:flex'>
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.Name')" prop="name">
                                        <Input v-model="formValidate.name" :placeholder="$t('manage.store.nameplaceholder')"></Input>
                                    </FormItem>
                                </Col span="8">
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.Code')" prop="code">
                                        <Input v-model="formValidate.code" :placeholder="$t('manage.store.codeplaceholder')"></Input>
                                    </FormItem>
                                </Col span="8">
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.fl')" prop="category">
                                        <Select filterable v-model='formValidate.category' :placeholder="$t('public.all')" @on-change="changetype">
                                            <Option v-for="(item,index) in cktype" :value="item.value" :key="index">{{ item.label }}</Option>
                                        </Select>
                                     </FormItem>
                                 </Col span="8">
                            </div>
                            <div style='display:flex'>
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.Person')" prop="person">
                                        <Input v-model="formValidate.person" :placeholder="$t('manage.store.Person')"></Input>
                                    </FormItem>
                                </Col span="8">
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.Mobile')" prop="phone">
                                        <Input v-model="formValidate.phone" :placeholder="$t('manage.store.Mobile')"></Input>
                                    </FormItem>
                                </Col span="8">
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.email')" prop="email">
                                        <Input v-model="formValidate.email" :placeholder="$t('manage.store.emailplaceholder')"></Input>
                                    </FormItem>
                                </Col span="8">
                            </div>
                    
                    <div style='height:100%'>
                        <Col span="12">
                            <div  style='width:100%;display:flex;;position:relative; margin-bottom: 20px;'>
                                <div style='display: flex;'>
                                    <span class="imgnifo" style='display:inline-block;position:relative;top:-25px;left:0;text-align:right'>
                                       门店导购
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
                            <!--仓库图片-->
                            <div style='display:flex'>
                                    <span class="imgnifo" v-if="imgnifoisshow" > {{$t('manage.store.storeLogo')}}</span>
                                    <div style='display: flex;flex-wrap:wrap'>
                                        <div style='border:1px dashed #C0CCDA;;border-radius:6px'>
                                            <el-upload
                                              class="avatar-uploader"
                                              :action="logoUrl"
                                              :show-file-list="false"
                                              
                                                :before-upload="beforeAvatarUpload"
                                              :on-success="addsucess"
                                              name='file' multiple accept="image/*">
                                              <i class="el-icon-plus avatar-uploader-icon" ></i>
                                            </el-upload>
                                        </div>
                                        <!--仓库图片可选择多个-->
                                        <div v-for='(item,index) in picArr' :key='index' class='cklogos' @mouseover='chaOver(item,index)' @mouseleave='chleave(item,index)'>
                                            <img :src="item" width='100%' height='100%' >
                                            <div class='imgBg' v-if='chaIndex==index'>
                                            </div>
                                            <span v-if='chaIndex==index' @click.stop='delUp(item,index)'>
                                            <Icon type="trash-a" size='25' style='color:#d53c39;position:absolute;top:0;right:10px;z-index:3' ></Icon>
                                            </span>
                                        </div>
                                    </div>
                            </div>
                            <!--经营时间-->
                            <div style="width:100%;float:none;height:40px;margin-top:10px;line-height:35px;display:flex;">
                                <span style='width:70px;flex:0 0 70px;text-align:right;margin-left: -5px;'>{{$t('manage.store.time')}}</span>
                                <Input v-model='businessHours' style='margin-right:10px;margin-left:15px' placeholder='请输入营业时间'></Input>
                            </div>
                            <!--简介-->
                            <div style="margin-top: 10px;width:100%;float:none;height:40px;line-height:35px;display:flex;">
                                <span style="width:70px;flex:0 0 70px;text-align:right;margin-left: -5px;">{{$t('manage.store.storeinfo')}}</span><!--店铺简介-->
                                <Input type='textarea' v-model='info' style='margin-right:10px;margin-left:15px' placeholder='请输入店铺简介'></Input>
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
                                        @change="handleChange" style='width:430px'>
                                    </el-cascader>
                                    <Input type="text" :placeholder="$t('manage.warehouse.dAddress')" v-model="address"  v-on:input="getLngLat"></Input>
                                </div>
                            </FormItem>
                            <div class="map-box" style="width:100%;float:none">
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
                <div class="right-content" v-if="xiugai">
                   <Form ref="formValidate1" :model="formValidate" :rules="ruleValidate" :label-width="80" >
                            <div style='display:flex'>
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.Name')" prop="name">
                                        <Input v-model="formValidate.name" :placeholder="$t('manage.store.nameplaceholder')"></Input>
                                    </FormItem>
                                </Col span="8">
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.Code')" prop="code">
                                        <Input disabled v-model="formValidate.code" :placeholder="$t('manage.store.codeplaceholder')"></Input>
                                    </FormItem>
                                </Col span="8">
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.fl')" prop="category">
                                        <Select filterable v-model='formValidate.category' :placeholder="$t('public.all')" @on-change="changetype">
                                            <Option v-for="(item,index) in cktype" :value="item.value" :key="index">{{ item.label }}</Option>
                                        </Select>
                                     </FormItem>
                                 </Col span="8">
                            </div>
                            <div style='display:flex'>
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.Person')" prop="person">
                                        <Input v-model="formValidate.person" :placeholder="$t('manage.store.Person')"></Input>
                                    </FormItem>
                                </Col span="8">
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.Mobile')" prop="phone">
                                        <Input v-model="formValidate.phone" :placeholder="$t('manage.store.Mobile')"></Input>
                                    </FormItem>
                                </Col span="8">
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.email')" prop="email">
                                        <Input v-model="formValidate.email" :placeholder="$t('manage.store.emailplaceholder')"></Input>
                                    </FormItem>
                                </Col span="8">
                            </div>
                    
                    <div style='height:100%'>
                        <Col span="12">
                            <div  style='width:100%;display:flex;;position:relative; margin-bottom: 20px;'>
                                <div style='display: flex;'>
                                    <span class="imgnifo" style='display:inline-block;position:relative;top:-25px;left:0;text-align:right'>
                                       门店导购
                                    </span>
                                    <span @click="getCRM" style='width:100px;height:80px;display:inline-block;' class='sedg'>
                                    <!-- <Input  v-model="DG" placeholder="请选择导购人" style="width:300px;" /></Input> -->
                                    <span style='display:inline-block;width:100px;height:60px;border-radius:8px;text-align:center;line-height:60px'>
                                        <Icon type="android-add" size='36' style='color:#8C939D;position:relative;top:-15px;left:0px'></Icon>
                                    </span>
                                    </span>
                                </div>
                                <div style='margin-left: 10px;' >
                                    <Tag type="border" closable color="#199DFF" :fade='false' v-for='(item,index) in employees' :key='index' @on-close="handleClose(index)">{{item.name}}</Tag>
                                </div>
                            </div>
                            <!--门店图片-->
                            <div style='display:flex'>
                                <span class="imgnifo" v-if="imgnifoisshow" > {{$t('manage.store.storeLogo')}}</span>
                                <div style='display: flex;flex-wrap:wrap'>
                                    <div style='border:1px dashed #C0CCDA;;border-radius:6px'>
                                        <el-upload
                                          class="avatar-uploader"
                                          :action="logoUrl"
                                          :show-file-list="false"
                                          
                                           :before-upload="beforeAvatarUpload"
                                          :on-success="addsucess"
                                          name='file' multiple accept="image/*">
                                          <i class="el-icon-plus avatar-uploader-icon" ></i>
                                        </el-upload>
                                    </div>
                                    <!--门店图片可选择多个-->
                                    <div v-for='(item,index) in picArr' :key='index' class='cklogos' @mouseover='chaOver(item,index)' @mouseleave='chleave(item,index)'>
                                        <img :src="item" width='100%' height='100%' >
                                        <div class='imgBg' v-if='chaIndex==index'>
                                        </div>
                                        <span v-if='chaIndex==index' @click.stop='delUp(item,index)'>
                                        <Icon type="trash-a" size='25' style='color:#d53c39;position:absolute;top:0;right:10px;z-index:3' ></Icon>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!--经营时间-->
                            <div style="width:100%;float:none;height:40px;margin-top:10px;line-height:35px;display:flex;">
                                <span style='width:70px;flex:0 0 70px;text-align:right;margin-left: -5px;'>{{$t('manage.store.time')}}</span>
                                <Input v-model='businessHours' style='margin-right:10px;margin-left:15px' placeholder='请输入营业时间'></Input>
                            </div>
                            <!--简介-->
                            <div style="margin-top: 10px;width:100%;float:none;height:40px;line-height:35px;display:flex;">
                                <span style="width:70px;flex:0 0 70px;text-align:right;margin-left: -5px;">{{$t('manage.store.storeinfo')}}</span><!--店铺简介-->
                                <Input type='textarea' v-model='info' style='margin-right:10px;margin-left:15px' placeholder='请输入店铺简介'></Input>
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
                                            @change="handleChange" style='width:430px'>
                                        </el-cascader>
                                        <Input type="text" :placeholder="$t('manage.warehouse.dAddress')" v-model="address"  v-on:input="getLngLat"></Input>
                                    </div>
                                </FormItem>
                            
                            <div class="map-box" style="width:100%;float:none">
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
                        <Form :label-width="80" >
                            <div style='display:flex'>
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.Name')">
                                        <Input disabled v-model="formValidate.name" :placeholder="$t('manage.store.nameplaceholder')"></Input>
                                    </FormItem>
                                </Col span="8">
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.Code')" prop="code">
                                        <Input disabled v-model="formValidate.code" :placeholder="$t('manage.store.codeplaceholder')"></Input>
                                    </FormItem>
                                </Col span="8">
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.fl')">
                                        <Select disabled v-model='formValidate.category' :placeholder="$t('public.all')" @on-change="changetype">
                                            <Option v-for="(item,index) in cktype" :value="item.value" :key="index">{{ item.label }}</Option>
                                        </Select>
                                     </FormItem>
                                 </Col span="8">
                            </div>
                            <div style='display:flex'>
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.Person')">
                                        <Input disabled v-model="formValidate.person" :placeholder="$t('manage.store.Person')"></Input>
                                    </FormItem>
                                </Col span="8">
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.Mobile')">
                                        <Input disabled v-model="formValidate.phone" :placeholder="$t('manage.store.Mobile')"></Input>
                                    </FormItem>
                                </Col span="8">
                                <Col span="8">
                                    <FormItem :label="$t('manage.store.email')">
                                        <Input disabled v-model="formValidate.email" :placeholder="$t('manage.store.emailplaceholder')"></Input>
                                    </FormItem>
                                </Col span="8">
                            </div>
                    </Form>
                    <div style='height:100%'>
                        <Col span="12">
                            <div  style='width:100%;display:flex;;position:relative; margin-bottom: 20px;'>
                                <div style='display: flex;'>
                                    <span class="imgnifo" style='display:inline-block;position:relative;top:-25px;left:0;text-align:right'>
                                       门店导购
                                    </span>
                                    
                                </div>
                                <div v-if='employees.length==0' style='margin-top: 37px;'>暂无导购</div>
                                <div style='padding:10px 0;margin-top:20px' disabled>
                                    <Tag type="border" closable color="#199DFF" :fade='false' v-for='(item,index) in employees' :key='index' >{{item.name}}</Tag>
                                </div>
                            </div>
                            <!--关联导购-->
                            <div style='display:flex'>
                                    <span class="imgnifo" v-if="imgnifoisshow" > {{$t('manage.store.storeLogo')}}</span>
                                    <div style='display: flex;flex-wrap:wrap'>
                                      
                                        <!--仓库图片可选择多个-->
                                        <div disabled v-for='(item,index) in picArr' :key='index' class='cklogos' >
                                            <img :src="item" width='100%' height='100%' >
                                            <div class='imgBg' v-if='chaIndex==index'>
                                            </div>
                                            <span v-if='chaIndex==index'>
                                            
                                            </span>
                                        </div>
                                    </div>
                            </div>
                            <!--经营时间-->
                            <div style="width:100%;float:none;height:40px;margin-top:10px;line-height:35px;display:flex;">
                                <span style='width:70px;flex:0 0 70px;text-align:right;margin-left: -5px;'>{{$t('manage.store.time')}}</span>
                                <Input disabled v-model='businessHours' style='margin-right:10px;margin-left:15px' placeholder='请输入营业时间'></Input>
                            </div>
                            <!--简介-->
                            <div style="margin-top: 10px;width:100%;float:none;height:40px;line-height:35px;display:flex;">
                                <span style="width:70px;flex:0 0 70px;text-align:right;margin-left: -5px;">{{$t('manage.store.storeinfo')}}</span><!--店铺简介-->
                                <Input disabled type='textarea' v-model='info' style='margin-right:10px;margin-left:15px' placeholder='请输入店铺简介'></Input>
                            </div>
                        </Col>
                         <Col span="12">
                         <div style='margin:-10px 0 5px 0'>状态：
                            <span >{{storeDetails.statusDesc}}</span>

                         </div>
                            <div class="code-box" style="width:100%;height:30%;display:flex">
                                <p style="width:40px;flex: 0 0 40px;">{{$t('manage.warehouse.Address')}}：</p>
                                <el-cascader

                                    disabled
                                    expand-trigger="click"
                                    :options="cityInfo"
                                    v-model="selectedOptions2"
                                    @change="handleChange" style='width:430px'>
                                </el-cascader>
                                <Input disabled type="text" :placeholder="$t('manage.warehouse.dAddress')" v-model="address"  v-on:input="getLngLat"></Input>
                               
                            </div>
                            <div class="map-box" style="width:100%;float:none">
                            <!--百度地图-->
                                <baidu-map :center="center" :zoom="zoom" @ready="handler" style="width:100%;height:100%;">
                                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                                    <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://img.zsydian.com/icon/zspo.png', size: {width: 80, height: 100}}">
                                    </bm-marker>
                                </baidu-map>
                            </div>
                        </Col>
                    </div>
                        <!--状态-->
                        <!-- <div class="lanren" :class="{bgd1:storeDetails.status==1,bgd2:storeDetails.status==0,bgd3:storeDetails.status==99,bgd31:storeDetails.status==9999}">
                           <span>{{storeDetails.statusDesc}}</span>
                        </div>​ -->
                    </div>
            </div>
            <!-- </Col> -->
        </div>
        <!--导购-->
        <Modal v-model="model1" width="660px">
            <p slot="header" style="height:30px;line-height:30px;">
                <!--导购搜索@on-select="changePerson"-->
                <span>{{$t('manage.store.DG')}}</span>
            </p>
            <div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;margin-bottom:10px">
    			<Input placeholder="请输入导购名称" style="padding:2px 0" v-model="dgkeyword" @on-enter='onEenter'></Input>
    			<span @click="dgsearchInput" style='cursor:pointer'>
    			<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>
    			</span>
    		</div>
            <Table  border highlight-row height="300"
            :columns="columns2" :data="data2"
             @on-row-click="clickDGsrow"
             @on-row-dblclick="dblclickDGsrow"
            ></Table>
         <!--分页-->
            <div class="page-box" style="text-align:left">
             <Page :total="dgt" :pageSize='dgp' @on-change="getData" @on-page-size-change="changePageSize"></Page>
            </div>
            <div slot="footer">
                <div class='title'>
                    <div style='color:#D15151;font-size:14px'>
                       <!--  <Icon type="plus" style='margin-right:5px'></Icon>
                        <span >添加导购</span> -->
                        </div>
                    <div>
                        <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
                        <Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="sureCancel"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
                    </div>
                </div>
            </div>
        </Modal>
        <div class='totBottom'>
            <span>共<span style='color:#ff0000'> {{total1}} </span>条</span>
            <span>当前第<span style='color:#ff0000'> {{current}} </span>页</span>
         </div>
    </div>
</template>

<script>
import LoadUrl from '@/components/common/actionLoad'
import { regionData,CodeToText,TextToCode} from 'element-china-area-data'
    export default {
        data() {
            return {
                loadingisshow:false,
                dgkeyword:"",//
                searchKeyword:'',
                picArr:[],
                chaIndex:-1,
                logoUrl:LoadUrl.httpPrefix.Url+'file/action/upload/image/url?c=店铺图片&uid='+this.$store.state.common.token,
                //保存消息
                cktype:[],
                formValidate:{
                    code:'',
                    name:'',//店铺名称
                    phone:'',//电话
                    person:'',//联系人
                    category:'',//类型
                    email:'',
                    province:""
                },
                 ruleValidate:{
                name:[
                         { required: true, message: '店铺名称不能为空', trigger: 'blur' },
                         { pattern:/^[A-Za-z\d_\-\u4e00-\u9fa5]{1,20}$/, message: '存在非法字符或超过指定长度20个字符' }
                    ],
                province:[
                         { required: true, message: '店铺地址不能为空', trigger: 'change' },
                         
                    ],
                  email:[{ pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请输入正确的邮箱'}],
                person:[
                         { required: true, message: '联系人不能为空', trigger: 'blur' },
                         { pattern:/^[A-Za-z\d_\-\u4e00-\u9fa5]{1,20}$/, message: '存在非法字符或超过指定长度20个字符' }

                    ],
                 phone:[

                       { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号码' }],
                    

                },
                num4:0,
                titles:['店铺信息','备注'],
                valueT:1,
                orderListname:[
                    {
                        label:this.$t('public.all'),//
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
                CodeToText:CodeToText,//code转为Text
                TextToCode:TextToCode,//Text转为code
                cityInfo:regionData,//地址数据
                selectedOptions2:[],//绑定的数据
                dialogVisible: false,
                xiugaibtn1:false,
                xiugaibtn:false,
                details:false,
                xiugai:false,
                model1:false,
                current:1,
                height:'',
                numIndex:0,
                indexId:0,
                uid: this.$store.state.common.token,

                info: '',//店铺简介
                addText: true, //新建门店true  修改门店false
                storeTxt:this.$t('manage.store.addnewS'),
                storeList: [],//店铺数组
                total: 0, //页码总数
                pageSize: 0, //页面条数
                total1: 0, //页码总数
                pageSize1: 0, //页面条数
                province: '', //省
                city: '', //市
                district: '', //区
                //百度地图
                center: {
                    lng: 116.404,
                    lat: 39.915
                },
                zoom: 16,
                name:'',//店铺名称
                person:'',//店铺联系人
                phone:'',//联系人电话
                address: '', //详细地址
                businessHours:'',//经营时间
                remark: '', //商家推荐
                quhao:'',
                zuoji:'',
                daogou:'',
                content:'',
                id:'', //门店的id
                msg:'',
                code:'',

                DG:'',//导购人选
                dgbj:{},
                // week:['周一','周二','周三','周四','周五','周六','周日'],
                num:0,
                // weekone:'周一',
                starttime:'',
                endtime:'',
                imgnifoisshow:true,
                category :"",
                logo:"",
                columns2: [

                    {
                        title:this.$t('manage.store.Code'),//"编码",
                        key:"code"
                    },
                    {
                        title: this.$t('manage.store.Name'),//'姓名',
                        ellipsis:true,
                        key: 'name',


                    },
                    {
                        title: this.$t('manage.store.Mobile'),//'电话',
                        ellipsis:true,
                        key: 'phone',

                    },
                    {
                        title: this.$t('manage.store.Address'),//'地址',
                        ellipsis:true,
                        key: 'address',

                    },


                ],
                dgt:0,
                dgp:0,
                data2: [],
                employees:[],
                storeDetails:{},
                daogouarr:[],
                emp:'',//详情导购数据
            }
        },
        methods: {
            //双击修改门店信息
            seeStoreInfo(id,index) {

                this.addText = false;
                this.xiugai=false
                this.emp=''
                this.details=true
                this.indexId = id;
                this.numIndex = index;
                this.xiugaibtn=false
                this.xiugaibtn1=true
                this.getStoreDetail(this.indexId);
            },
            //根据id去获得门店的详情
            getStoreDetail(id) {
                    this.axios.get('store/get/' + id + '?uid=' + this.uid).then((res) => {
                        if(res.data.status == '200') {
                        
                        let data = res.data.rows;
                         console.log(data)
                         //导购
                        if(data.employees==null){
                            this.employees =[]
                        }else{
                           this.employees=data.employees

                        }
                        //详情
                        this.storeDetails=res.data.rows;
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
                        this.storeDetails.createTime=new Date( this.storeDetails.createTime).toLocaleDateString().replace(/\//g,'-')
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
                        //门店照片
                        if(data.logo==null || data.logo==''){
                            this.picArr=[]
                        }else{
                            this.picArr=data.logo.split(',')
                        }
                        console.log(this.emp)
                        this.formValidate.email=data.email
                        this.formValidate.name = data.name;
                        this.formValidate.person = data.person;
                        this.formValidate.phone = data.phone;
                        this.info=data.info
                        this.address = data.address;
                        this.remark = data.remark;
                        this.businessHours = data.businessHours;
                        this.formValidate.code=data.code;
                        this.logo = data.logo
                        this.storeTxt=data.name
                        this.formValidate.category=data.category
                        //接收地址
                        this.formValidate.province=data.province
                        this.city=data.city
                        this.district=data.district
                        //转为code
                        if(this.formValidate.province==''|| this.city=='' || this.district==''){
                            this.selectedOptions2=[]
                        }else{
                            this.selectedOptions2=[this.TextToCode[this.formValidate.province].code,this.TextToCode[this.formValidate.province][this.city].code,this.TextToCode[this.formValidate.province][this.city][this.district].code]
                        }
                        this.getLngLat()//地图显示
                    }
                })
            },
            //点击保存  保存新建门店信息
            saveAddInfo(name) {
                 this.$refs[name].validate((valid) => {
                    if(valid){
                        //调用添加接口
                        this.axios.post('/store/add?uid='+ this.uid,{
                            address: this.address,
                            latitude: this.center.lat,
                            longitude: this.center.lng,
                            name: this.formValidate.name,
                            person: this.formValidate.person,
                            phone: this.formValidate.phone,
                            city:this.city,
                            district: this.district,
                            province: this.formValidate.province,
                            remark: this.remark,
                            businessHours:this.businessHours,
                            code:this.formValidate.code,
                            category:this.formValidate.category,
                            email:this.formValidate.email,
                            logo:this.picArr.join(','),
                            info:this.info,
                            employees:this.employees
                        }).then(res=>{
                            if(res.data.status==200){

                            this.$notify({
                                title:"",//
                                message: '保存成功',
                                type: 'success',
                                position: 'bottom-right'
                            });
                                this.employees=[]
                                this.addStoreInfo()
                                this.getStoreLists()
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
                 })

            },
            //保存获取所有门店信息列表
            getStoreLists() {
                this.axios.get('/store/query?uid=' + this.uid+'&status=1').then((res) => {
                    if(res.data.status == '200') {
                        let data = res.data;
                        this.storeList = data.rows;
                        this.total1=res.data.total
                        this.pageSize1=res.data.pageSize
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
                            if(this.storeList.length==0){
                                return
                            }else{
                                this.seeStoreInfo(this.storeList[0].id,0)
                                this.getStoreDetail(this.storeList[0].id)
                            }
                            } else {
                            this.$notify({
                                title:"",//
                                message:  res.data.errorMessage,
                                type: 'error',
                                position: 'bottom-right'
                            });
                        }
                })
            },
            //获取所有门店信息列表
            getStoreList(s) {
                this.axios.get('/store/query?uid=' + this.uid+'&status='+s).then((res) => {
                    if(res.data.status == '200') {
                    let data = res.data;
                    this.storeList = data.rows;
                    this.total1=res.data.total
                    this.pageSize1=res.data.pageSize
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
            //修改获取当前修改的仓库详情
            getStoreListss() {
                this.axios.get('/store/query?uid=' + this.uid+'&status=1').then((res) => {
                    if(res.data.status == '200') {
                    let data = res.data;
                    this.storeList = data.rows;
                    this.total1=res.data.total
                    this.pageSize1=res.data.pageSize
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
                     this.seeStoreInfo(this.indexId,this.numIndex)  
                })
            },
            //点击修改 执行修改门店
            updateStoreInfo:function () {

                this.xiugai=true//修改页面显示
                this.details=false//详情页面隐藏
                this.addText=false//新建页面隐藏
                this.xiugaibtn=true//修改保存按钮显示
                this.xiugaibtn1=false//修改按钮显示
                this.getLngLat()
               
            },
            addborder1(index){
                this.num4=index
            },
            //执行修改
            updateStoreInfo1(name){
                 this.$refs[name].validate((valid) => {
                    if(valid){
                        this.axios.put('/store/update?uid=' + this.uid, {
                            id:this.indexId,
                            address: this.address,
                            city:this.city,
                            district: this.district,
                            latitude: this.center.lat,
                            longitude: this.center.lng,
                            name: this.formValidate.name,
                            person: this.formValidate.person,
                            phone: this.formValidate.phone,
                            province: this.formValidate.province,
                            remark: this.remark,
                            businessHours: this.businessHours,
                            email:this.formValidate.email,
                            logo:this.picArr.join(','),
                            info:this.info,
                            code:this.formValidate.code,
                            category:this.formValidate.category,
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
            
            //新建门店
            addStoreInfo() {
                this.addText = true;
                this.xiugai=false
                this.details=false
                this.xiugaibtn=false
                this.xiugaibtn1=false
                this.storeTxt = this.$t('manage.store.addnewS');
                this.id = '';
                this.address = '';
                this.city = '';
                this.district = '';
                this.formValidate.name = '';
                this.formValidate.person = '';
                this.formValidate.phone = '';
                this.formValidate.province = '';
                this.remark = '';
                this.businessHours='';
                this.code='';
                this.DG=''
                this.logo=''
                this.formValidate.category=''
                this.employees =[]
                this.picArr =[]

                this.info=''
                this.formValidate.code=''
                this.formValidate.email=''
                this.selectedOptions2=[]
                
            },
            //取消保存
            addCancel(){
                this.addStoreInfo()
            },
            //取消修改
            editCancel(){
                this.seeStoreInfo(this.indexId,this.numIndex)
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

            //省市区
            handleChange(arr){
                this.formValidate.province = this.CodeToText[arr[0]]
                this.city =this.CodeToText[arr[1]]
                this.district = this.CodeToText[arr[2]]
                console.log(this.selectedOptions2)
                this.getLngLat()
            },

            getLngLat(){
                var _this = this;
                $.ajax({
                    dataType: 'jsonp',
                    url: 'https://api.map.baidu.com/geocoder/v2/?address='+_this.formValidate.province+_this.city+_this.district+ _this.address + '&output=json&ak=BBe8b008fb274f9544aa96828ac8c10e&callback=showLocation',
                    type: 'get',
                    crossDomain: true,
                    success:function(data){
                     // console.log(data.result)
                     _this.center.lng =data.result.location.lng;
                    _this.center.lat = data.result.location.lat;
                    }
                })
            },
            ok (type) {
               this.$Message.info('确定');
            },
            //切换一条页
            getData(current){
                this.axios.get('employee/list?offset='+current+'&uid='+this.uid+'&status=1').then((res)=>{
                    console.log(res)
                    this.data2 = res.data.rows
                    this.dgt=res.data.total
                    this.dgp=res.data.pageSize
                })

            },
            //翻页
            changePageSize(size){
                this.pageSize = size
            },
          
            handleClose(index){
                 this.employees.splice(index,1)
            },
             //单击一行导购
            clickDGsrow(data){
                this.dgbj=data
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
                }
                this.employees.push(arr)
                //对象去重
                for(var i = 0; i < this.employees.length - 1; i++) {
                    for(var j = i+1; j < this.employees.length; j++) {
                      if(this.employees[i].id == this.employees[j].id) {
                        this.$notify({
                            title:"",//
                            message:'该导购已存在！',
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
            //开始营业时间
            getStartTime(data){
                this.starttime = data
            },
            //结束营业时间
            getEndTime(data){
                this.endtime = data
            },
            //上传图片成功

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
            //上传时
            // onprogress(event, file, fileList){
            //     this.loadingisshow=true
            // },
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
                        console.log(this.picArr.length)
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
            //下拉加载更多
            handleReachEdge(){
                this.current++//默认10条
                this.axios.get('/store/query?offset='+this.current+'&uid='+this.uid+'&status='+this.valueT).then((res)=>{
                    if(this.current>Math.ceil(this.total1/this.pageSize1)){
                            this.current=Math.ceil(this.total1/this.pageSize1)
                        }
                    res.data.rows.forEach((item)=>{
                        item.createTime=new Date(item.createTime).toLocaleDateString().replace(/\//g,'-')
                        this.storeList.push(item)
                        this.storeList.forEach((x,index)=>{
                            x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        })
                    })
                })
            },
             //下拉框选择
            orderselected(value){
                this.valueT=value
                this.getStoreList(this.valueT);
            },
            //点击差号
            cancelHome(){
                this.$router.push('ShopAddPage')
            },
             //删除仓库
            delUser() {
                if(this.indexId==''){
                     this.$notify({
                        title:"",//
                        message: this.$t('public.errorOneData'),
                        type: 'error',
                        position: 'bottom-right'
                    });
                 }else{
                     
                     this.$Modal.confirm({
                            title: '删除门店',
                            content: '<p>确定要删除吗?</p>',
                            onOk: () => {
                                this.axios.delete('/store/delete/'+this.indexId+'?uid=' + this.uid).then((res) => {
                                        if(res.data.status == 200) {
                                        this.$notify({
                                        title:"",//
                                            message: this.$t('public.deleteSuccess'),//
                                            type: 'success',
                                            position: 'bottom-right'
                                        });
                                        this.seeStoreInfo(this.indexId,this.numIndex)
                                        this.getStoreList(this.valueT);
                                    }
                                })
                            },
                        });
                 }

            },
             stopUser() {
                 if(this.indexId==''){
                     this.$notify({
                        title:"",//
                        message: this.$t('public.errorOneData'),
                        type: 'error',
                        position: 'bottom-right'
                    });
                 }else{
                     this.axios.post('/store/disabled/' + this.indexId + '?uid=' + this.uid).then((res) => {
                            if(res.data.status == 200) {

                            this.$notify({
                                title:"",//
                                message:this.$t('public.normalT'),//
                                type: 'success',
                                position: 'bottom-right'
                            });
                            this.seeStoreInfo(this.indexId,this.numIndex)
                            this.getStoreList(this.valueT);
                        }
                    })
                 }

            },
            //启用用户
            startUser() {
                if(this.indexId==''){
                    this.$notify({
                        title:"",//
                        message: this.$t('public.errorOneData'),
                        type: 'error',
                        position: 'bottom-right'
                    });
                }else{
                    this.axios.post('/store/enabled/' + this.indexId + '?uid=' + this.uid).then((res) => {
                            if(res.data.status == 200) {

                            this.$notify({
                                title:"",//
                                message:this.$t('public.normalS'),//
                                type: 'success',
                                position: 'bottom-right'
                            });
                            this.seeStoreInfo(this.indexId,this.numIndex)
                            this.getStoreList(this.valueT);
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

             //店铺类型GET /storetype/query 列表
                getdptype(){
                    this.axios.get('/storetype/query?uid='+this.uid).then(res=>{
                        if(res.data.status==200){
                            res.data.rows.forEach((x,index)=>{
                               let arr={
                                label:res.data.rows[index].title,
                                value:res.data.rows[index].key,
                               }
                                this.cktype.push(arr)
                            })
                        }
                    })
                },
            //门店类型
            changetype(v){
                this.formValidate.category=v
            },
            //搜索店铺
            search(){
               this.axios.get('store/query?keyword='+this.searchKeyword+'&uid='+this.uid).then((res)=>{
                     if(res.data.status == '200') {
                        let data = res.data;
                        this.storeList = data.rows;
                        this.total1=res.data.total
                        this.pageSize1=res.data.pageSize
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
                            } else {
                            this.$notify({
                                title:"",//
                                message:  res.data.errorMessage,
                                type: 'error',
                                position: 'bottom-right'
                            });
                        }
                })
            },
            entersSearch(){
                this.search()
            },
        },
        created(){
            this.$nextTick(x=>{
                this.getStoreList(this.valueT);//所有门店
            })
        },
        mounted() {
            if(this.$route.query.id){
                this.addText=false
                this.details=true
                this.xiugai=false
                this.indexId = this.$route.query.id;
                this.valueT = this.$route.query.s;
                this.numIndex = this.$route.query.index;
                this.seeStoreInfo(this.indexId,this.numIndex)
                this.getStoreDetail(this.indexId)
            }

            this.getdptype()//门店类型
            // this.checkAddOrEdit();
            this.height = document.documentElement.clientHeight
            // this.handleReachEdge()//滚动加载

        },
        updated(){

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
    z-index: 9;
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
.locationSearch{

}
.tot{
    position:fixed;
    bottom:10px;
    left:15%;
    z-index:12;
}
    .top-left-btn1{
        background: #FF7D16;
    }
    .top-left-btn:hover{
        cursor:pointer;
    }
   .add-box {
            width: 100%;
    height: 100%;
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
        position: fixed;
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
        display:flex;
        justify-content: space-between;
        padding:0 10px;

        height:60px;
        line-height: 60px;
        flex:0 0 360px;
         border-right:1px solid #eee;

    }
    .right-top{

        display: flex;
        justify-content: space-between;
    }
     .top button{

        cursor:pointer;
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
    .bor1{
        border-bottom:2px solid #086CA2;
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
        flex:0 0 360px;
        width:360px;
        border-right:1px solid #eee;
        margin-top:10px;
        display:flex;
        background:#fff;
    }
    .left-content {
        height:100%;
         flex:0 0 360px;
        width:360px;
        margin-top:10px;
        border-right:1px solid #E6E6E6;
        position:fixed;
        background:#F9F9F9;
    }
    .right-detail{
       
        margin-top:40px;
       
    }
    .dgclass{
        display:inline-block;
        width:60px;
        height:30px;
        border-radius: 8px;
        background: #fff;
        color:#333;
        list-style: none;
        border:1px solid #e4e4e4;
        margin:0 10px;
        line-height: 30px;
        text-align: center
    }

    li.dgclass:hover{
         cursor: pointer;
        border-color:#ccc;
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
        top:50px;
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
    .con-list .status{
        width:100px;

        text-align: center;
        position: absolute;
        right: 60px;
        top:50px;
    }
    .con-list .list-title {
        color: #0d0d0d;
        font-size: 14px;
        margin-bottom: 10px;
    }
  .detail-top{
        margin-top:20px;
    }
.blackinfo li{
      list-style: none;
      margin:15px 0;
      display: flex;

    }
    .blackinfo{
      margin-right:30px;
      width:33%;
    }
    .detail-top h4{
      color:#2B8F8F;
      width:60px;
      text-align: center;
      border-bottom:2px solid #2B8F8F;
    }
    .detail-top li span.info{
      width:67%;
    }
    .detail-top li span.blackinfo-left{
    color: #2B8F8F;
    font-weight: 600;
    width: 78px;
    text-align: right;
    }
    .detail-bottom{
        margin-top:20px;
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

    .con-list .txt {
        color: #585858;
        font-size: 12px;
    }
    .page-box {

       margin-top:10px;
    }

    .ivu-icon-navicon {
        font-size: 20px;
    }


    .con-list {
        word-wrap:break-word;
        padding:20px;

        cursor: pointer;
        border-bottom:1px solid #eee;
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
    div.con-list:last-child{
        margin-bottom:280px;
    }

    .add-right {
       width:100%;
        /*height: 100%;*/
        /*position:relative;*/
        margin-top:10px; background: #fff;
        overflow: auto;
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
        margin-top:40px;
        padding-left: 25px;
        padding-right: 10px;
    }

    .code-box {
        width: 40%;
        height: 40px;
        
        margin-bottom: 15px;
        position: relative;
    }

   /* .code-box img {

        position: absolute;
        right: 350px;
        top: 80px;
    }*/

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

    .bor{
        border:1px solid red;
    }
    .loadimg{
    display:inline-block;
    width:100px;
    height:100px;
    border:1px solid #ccc;
    overflow: hidden;
    border-radius: 10px;
   position:relative;
    font-size:12px;
    text-align: center;

  }
  .loadimg input{
    display:block;
    position:absolute;
    top:0;
    left:0;
    width:100px;
    height:100px;
    opacity:0;
    filter:alpha(opacity=0);

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
  .title{
        display:flex;justify-content: space-between;
    }
    .title:hover{
        cursor:pointer;
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


  .lanren {
    position: absolute;
    text-align: center;
    top: 10px;
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
    z-index: 9999999999999;
    top: -70px;
    right: 70px;
    font-size: 16px;
    font-weight: 900;
    transform: rotate(46deg);
}
/*侧栏状态颜色 正常*/
.textbg1{
    color:#40ca98;
}
/*侧栏状态颜色 新增*/
.textbg2{
    color:#3b77e3;
}
/*侧栏状态颜色 已停用*/
.textbg3{
    color:#d53c39;
}
/*状态的颜色 正常*/
.bgd1{
    color:#40ca98;
    /*border-top:80px solid #40ca98;*/
}
/*状态的颜色 新增*/
.bgd2{
    color:#3b77e3;
    /*border-top:80px solid #3b77e3;*/
}
/*状态的颜色 已停用*/
.bgd3{
    color:#d53c39;
    /*border-top:80px solid #d53c39;*/
}
.bgd31{
    color:#d53c39;
    /*border-top:80px solid #d53c39;*/
}
</style>
<style>
    /***城市选择器 样式设置***/

    .region-picker .province-select {
        color: #666666 !important;
        height: 35px !important;
        border-color: #ececec !important;
        border-radius: 4px !important;
        margin-left: -20px;
        background: #ffffff !important;
    }

    .region-picker .city-select {
        color: #666666 !important;
        height: 35px !important;
        border-color: #ececec !important;
        border-radius: 4px !important;
        background: #ffffff !important;
    }

    .region-picker .district-select {
        color: #666666 !important;
        height: 35px !important;
        border-color: #ececec !important;
        border-radius: 4px !important;
        background: #ffffff !important;
    }
</style>
<style>
    .ivu-modal-close .ivu-icon{
        color: #fff;
    }
    .DGSou{
        margin-bottom: 5px;
    }
    .DGSouSuo{
        width: 75px;
        height: 35px;
        margin-top: -5px;
    }
    .el-upload-dragger{
        width:180px!important;
    }

</style>
