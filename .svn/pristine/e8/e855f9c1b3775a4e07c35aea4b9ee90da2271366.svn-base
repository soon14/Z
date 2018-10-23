<template>
	<div class="customMenu">
		<div class='main'>
			<div class="top-center">
				<div>
					<span style="font-size:18px;font-weight:600">自定义菜单</span>
					<div>由于微信接口延迟，菜单修改后最长可能需要30分钟才会更新。如需即时查看，可先取消关注，再重新关注。</div>
					<!-- <div><a>自定义菜单设置教程</a></div> -->
				</div>
				<div style="margin-top:20px">
					<i-Switch size="large" :value="v" @on-change='switchChange'>
				        <span slot="open">启用</span>
				        <span slot="close">停用</span>
				    </i-Switch>
				</div>
			</div>
			<!--菜单页面-->
			<div class="menu_setting_area js_editBox" style="margin: 14px 14px 120px 14px;">
        <div class="menu_preview_area">
            <div class="mobile_menu_preview" style="height:500px">
                <div class="mobile_hd tc">
                    {{ gzh_name }}
                </div>
                <div class="mobile_bd">
                    <ul class="pre_menu_list grid_line ui-sortable ui-sortable-disabled no_menu" style="z-index:3;" id="menuList">
                        <li v-for="(btn,index) in menu.button" :key="btn.id" class="jsMenu pre_menu_item grid_item jslevel1 size1of3 ui-sortable ui-sortable-disabled">
                                <a href="javascript:void(0);" @click="menu_selected(btn.name,index)" :class="[{pre_menu_link: index===activeMenuIndex && activeMenuType()==1}]" draggable="false">
                                <i class="icon_menu_dot js_icon_menu_dot dn"></i>
                                <i class="icon20_common sort_gray"></i>
                                <span class='js_l1Title'>{{ btn.name }}</span>
                            </a>
                            <div class="sub_pre_menu_box js_l2TitleBox" v-if="index===activeMenuIndex">
                                <ul class="sub_pre_menu_list">
                                    <li v-for="(sub,index) in btn.sonMenu" :key="sub.id" class='jslevel2'><a href="javascript:void(0);"  @click="menu_item_selected(sub.name,index)" :class="[{pre_menu_link: index===activeMenuItemIndex && activeMenuType()==2}]" class="jsSubView" draggable="false"><span class="sub_pre_menu_inner js_sub_pre_menu_inner"><i class="icon20_common sort_gray"></i><span class='js_l2Title'>{{ sub.name }}</span></span></a></li>
                                    <li class='js_addMenuBox' v-if="isSet(menu.button[activeMenuIndex].sonMenu)&&btn.sonMenu.length>=0&&btn.sonMenu.length<5"><a href="javascript:void(0);" class="jsSubView js_addL2Btn" title="最多添加5个子菜单" @click="menu_item_add()" draggable="false"><span class="sub_pre_menu_inner js_sub_pre_menu_inner"><i class="icon14_menu_add"></i></span></a></li>
                                </ul>
                                <i class="arrow arrow_out"></i>
                                <i class="arrow arrow_in"></i>
                            </div>
                        </li>
                        <li class="js_addMenuBox pre_menu_item grid_item no_extra size1of1"> <a href="javascript:void(0);" v-if="isSet(menu.button)?(menu.button.length>=0&&menu.button.length<3):false"  @click="menu_add()" :class="[{pre_menu_link: activeMenuIndex===''}]" class="js_addL1Btn" title="最多添加3个一级菜单" draggable="false"> <i class="icon14_menu_add"></i> </a> </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="menu_form_area">
            <div id="js_none" class="menu_initial_tips tips_global" style="display: none;"></div>
            <div id="js_rightBox" class="portable_editor to_left"  style="display: none;" v-show="activeMenuIndex > 0 || activeMenuIndex === 0 || activeMenuItemIndex > 0 || activeMenuIndex === 0 ">
                <div class="editor_inner" style="min-height:500px">
                    <div class="global_mod float_layout menu_form_hd js_second_title_bar">
                        <h4 class="global_info"> 菜单名称 </h4>
                        <div class="global_extra">
                            <a href="javascript:void(0);" id="jsDelBt" @click="menu_del()" v-if="showDelBtnType===1">删除菜单</a>
                            <a href="javascript:void(0);" id="jsDelBt" @click="menu_item_del()" v-if="showDelBtnType===2">删除子菜单</a>
                        </div>
                    </div>
                    <div class="menu_form_bd" id="view">
                        <div id="js_innerNone" style="display:none;" class="msg_sender_tips tips_global"></div>
                        <div class="frm_control_group js_setNameBox" style='display:flex;line-height:35px'>
                            <label for="" class="frm_label"> <strong class="title js_menuTitle" style='width:80px'>菜单名称</strong> </label>
                            <div class="frm_controls" style='width:100%'>
                                <span class="frm_input_box with_counter counter_in append" v-if="activeMenuType() == 1 && isSet(menu.button[activeMenuIndex])"> 
                                    <Input type="text" style='width:100%' class="frm_input js_menu_name" v-model="menu.button[activeMenuIndex].name" > </Input>
                                </span>
                                <span class="frm_input_box with_counter counter_in append" v-if="activeMenuType() == 2 && isSet(menu.button[activeMenuIndex].sonMenu[activeMenuItemIndex])"> 
                                    <Input type="text" class="frm_input js_menu_name" v-model="menu.button[activeMenuIndex].sonMenu[activeMenuItemIndex].name" style='width:100%'>
                                    </Input> 
                                </span>
                                <!-- <p class="frm_msg fail js_titleEorTips dn">字数超过上限</p> -->
                                <p class="frm_msg fail js_titlenoTips dn" style="display: none;">请输入菜单名称</p>
                                <p class="frm_tips js_titleNolTips">字数不超过4个汉字或8个字母</p>
                            </div>
                        </div>
                        <div class="frm_control_group" v-show="((activeMenuIndex > 0 || activeMenuIndex === 0) && (menu.button[activeMenuIndex].sonMenu.length == 0)) || (activeMenuItemIndex > 0 || activeMenuItemIndex === 0) " style="display: none;" >
                            
                            <div class="frm_controls frm_vertical_pt" style='display:flex;line-height:35px'>
                                <label for="" class="frm_label">
                             <strong class="title js_menuContent" style='display:inline-block;width:80px'>菜单内容</strong>
                            </label>
                                <!-- <label class="frm_radio_label js_radio_sendMsg" @click="radio_label_selected(1)" :class="[{selected:showMenuContentType===1}]" data-editing="0"> <i class="icon_radio"></i> <span class="lbl_content">发送消息</span> 
                                    <input type="radio" name="hello" class="frm_radio" /> 
                                </label> -->
                                <!--二级-->
                                <RadioGroup type="button" size="small" v-model="menu.button[activeMenuIndex].sonMenu[activeMenuItemIndex].url" @on-change="changeList2" v-if="activeMenuType() == 2 && isSet(menu.button[activeMenuIndex].sonMenu)">
                                    <Radio :label="item.value" v-for="(item,index) in subList" :value="item.value" :key="index" style="margin:0 5px">
                                        <span>{{item.label}}</span>
                                    </Radio>
                                </RadioGroup>
                                <!--一级-->
                                <RadioGroup type="button" size="small" v-model="menu.button[activeMenuIndex].url" @on-change="changeList1" v-if="activeMenuType() == 1 && isSet(menu.button[activeMenuIndex])">
                                    <Radio :label="item.value" v-for="(item,index) in subList" :value="item.value" :key="index"> 
                                        <span>{{item.label}}</span>
                                    </Radio>
                                </RadioGroup>
                                </div>
                                <div style='display:flex;line-height:35px;margin-top:20px' v-if="activeMenuType() == 2 && isSet(menu.button[activeMenuIndex].sonMenu)">
                                    <label class="frm_radio_label js_radio_url" @click="radio_label_selected(2)" :class="[{selected:showMenuContentType===2}]" data-editing="0"> 
                                   
                                    <!-- <i class="icon_radio"></i>  -->
                                    <span class="lbl_content" style='display:inline-block;width:60px'>网页地址</span>
                                    </label>
                                    <Input  name="hello" class="frm_radio" style='width:100%' v-model="menu.button[activeMenuIndex].sonMenu[activeMenuItemIndex].url" :disabled="normal2"> </Input>
                                </div>
                                <div style='display:flex;line-height:35px;margin-top:20px' v-if="activeMenuType() == 1 && isSet(menu.button[activeMenuIndex])">
                                    <label class="frm_radio_label js_radio_url" @click="radio_label_selected(1)" :class="[{selected:showMenuContentType===1}]" data-editing="0"> 
                                   
                                    <!-- <i class="icon_radio"></i>  -->
                                    <span class="lbl_content" style='display:inline-block;width:60px'>网页地址</span>
                                    </label>
                                    <Input  name="hello" class="frm_radio" style='width:100%' v-model="menu.button[activeMenuIndex].url" :disabled="normal1"> </Input>
                                </div>
                        </div>
                        <div class="menu_content_container">
                            <!-- <div class="menu_content send jsMain" id="edit" v-show="showMenuContentType===1" style="display: none;">
                                <div class="msg_sender" id="editDiv">
                                    <div class="msg_tab">
                                        <div class="tab_navs_panel">
                                            <span class="tab_navs_switch_wrp switch_prev js_switch_prev"> <span class="tab_navs_switch"></span> </span>
                                            <span class="tab_navs_switch_wrp switch_next js_switch_next" style="display: none;"> <span class="tab_navs_switch"></span> </span>
                                            <div class="tab_navs_wrp" style="width: 650px">
                                                <ul class="tab_navs js_tab_navs" style="margin-left:0;">
                                                    <li class="tab_nav tab_appmsg width4" :class="[{selected:showMenuContentMsgType===1}]" data-type="10" data-tab=".js_appmsgArea" data-tooltip="图文消息"> <a href="javascript:void(0);" @click="content_msg_tab_nav(1)">&nbsp;<i class="icon_msg_sender"></i><span class="msg_tab_title">图文消息</span></a> </li>
                                                    <li class="tab_nav tab_img width4" :class="[{selected:showMenuContentMsgType===2}]" data-type="2" data-tab=".js_imgArea" data-tooltip="图片"> <a href="javascript:void(0);" @click="content_msg_tab_nav(2)">&nbsp;<i class="icon_msg_sender"></i><span class="msg_tab_title">图片</span></a> </li>
                                                    <li class="tab_nav tab_audio width4" :class="[{selected:showMenuContentMsgType===3}]" data-type="3" data-tab=".js_audioArea" data-tooltip="语音"> <a href="javascript:void(0);" @click="content_msg_tab_nav(3)">&nbsp;<i class="icon_msg_sender"></i><span class="msg_tab_title">语音</span></a> </li>
                                                    <li class="tab_nav tab_video width4 no_extra" :class="[{selected:showMenuContentMsgType===4}]" data-type="15" data-tab=".js_videoArea" data-tooltip="视频"> <a href="javascript:void(0);" @click="content_msg_tab_nav(4)">&nbsp;<i class="icon_msg_sender"></i><span class="msg_tab_title">视频</span></a> </li>
                                                    <li class="tab_nav">
                                                        <label>KEY:</label>
                                                        <input style="width: 190px" type="text" v-if="activeMenuType() == 1 && isSet(menu.button[activeMenuIndex])" v-model="menu.button[activeMenuIndex].key" value="">
                                                        <input style="width: 190px" type="text" v-if="activeMenuType() == 2 && isSet(menu.button[activeMenuIndex].sonMenu[activeMenuItemIndex])" v-model="menu.button[activeMenuIndex].sonMenu[activeMenuItemIndex].key" value="">
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="tab_panel">
                                            <div class="tab_content" v-show="showMenuContentMsgType===1" style="display: none;">
                                                <div class="js_appmsgArea inner ">
                                                  
                                                    <div class="tab_cont_cover jsMsgSendTab" data-index="0">
                                                        <div class="media_cover">
                                                            <span class="create_access"> <a class="add_gray_wrp jsMsgSenderPopBt" href="javascript:void(0);" data-type="10" data-index="0"> <i class="icon36_common add_gray"></i> <strong>从素材库中选择</strong> </a> </span>
                                                        </div>
                                                        <div class="media_cover">
                                        <span class="create_access"> <a target="_blank" class="add_gray_wrp" href="javascript:void(0);"> <i class="icon36_common add_gray"></i> <strong>新建图文消息</strong> </a>
                     
                                        </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab_content" v-show="showMenuContentMsgType===2" style="display: none;">
                                                <div class="js_imgArea inner ">
                                                   
                                                    <div class="tab_cont_cover jsMsgSendTab" data-index="1" data-type="2">
                                                        <div class="media_cover">
                                                            <span class="create_access"> <a class="add_gray_wrp jsMsgSenderPopBt" href="javascript:void(0);" data-type="2" data-index="1"> <i class="icon36_common add_gray"></i> <strong>从素材库中选择</strong> </a> </span>
                                                        </div>
                                                        <div class="media_cover">
                                                            <span class="create_access"> <a class="add_gray_wrp" id="msgSendImgUploadBt" data-type="2" href="javascript:void(0);"> <i class="icon36_common add_gray"></i> <strong>上传图片</strong> </a> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab_content" v-show="showMenuContentMsgType===3" style="display: none;">
                                                <div class="js_audioArea inner ">
                                                  
                                                    <div class="tab_cont_cover jsMsgSendTab" data-index="2" data-type="3">
                                                        <div class="media_cover">
                                                            <span class="create_access"> <a class="add_gray_wrp jsMsgSenderPopBt" href="javascript:void(0);" data-type="3" data-index="2"> <i class="icon36_common add_gray"></i> <strong>从素材库中选择</strong> </a> </span>
                                                        </div>
                                                        <div class="media_cover">
                                                            <span class="create_access"> <a class="add_gray_wrp " id="msgSendAudioUploadBt" href="javascript:void(0);"> <i class="icon36_common add_gray"></i> <strong>新建语音</strong> </a> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab_content" v-show="showMenuContentMsgType===4" style="display: none;">
                                                <div class="js_videoArea inner ">
                                                   
                                                    <div class="tab_cont_cover jsMsgSendTab" data-index="3">
                                                        <div class="media_cover">
                                                            <span class="create_access"> <a class="add_gray_wrp jsMsgSenderPopBt" href="javascript:void(0);" data-type="15" data-index="3"> <i class="icon36_common add_gray"></i> <strong>从素材库中选择</strong> </a> </span>
                                                        </div>
                                                        <div class="media_cover">
                                                            <span class="create_access"> <a target="_blank" class="add_gray_wrp" href="javascript:void(0);"> <i class="icon36_common add_gray"></i> <strong>新建视频</strong> </a> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="profile_link_msg_global menu_send mini_tips warn dn js_warn"> 请勿添加其他公众号的主页链接 </p>
                            </div> -->
                            <!-- <div class="menu_content url jsMain" id="url" v-show="showMenuContentType===2" style="display: none;">
                                <form action="" id="urlForm" onsubmit="return false;">
                                    <p class="menu_content_tips tips_global">订阅者点击该子菜单会跳到以下链接</p>
                                    <div class="frm_control_group">
                                        <label for="" class="frm_label">页面地址</label>
                                        <div class="frm_controls">
                                            <span class="frm_input_box" v-if="activeMenuType() == 1"> <input type="text" class="frm_input" id="urlText" name="urlText" v-model="menu.button[activeMenuIndex].url" /> </span>
                                            <span class="frm_input_box" v-if="activeMenuType() == 2"> <input type="text" class="frm_input" id="urlText" name="urlText" v-model="menu.button[activeMenuIndex].sonMenu[activeMenuItemIndex].url" /> </span>
                                            <p class="profile_link_msg_global menu_url mini_tips warn dn js_warn"> 请勿添加其他公众号的主页链接 </p>
                                            <p class="frm_tips" id="js_urlTitle" style="display: none;"> 来自<span class="js_name"></span><span style="display:none;"> -《<span class="js_title"></span>》</span> </p>
                                        </div>
                                    </div>
                                    <div class="frm_control_group btn_appmsg_wrap">
                                        <div class="frm_controls">
                                            <p class="frm_msg fail dn" id="urlUnSelect" style="display: none;"> <span for="urlText" class="frm_msg_content" style="display: inline;">请选择一篇文章</span> </p>
                                            <a href="javascript:void(0);" id="js_appmsgPop">从公众号图文消息中选择</a>
                                            <a href="javascript:void(0);" class="dn btn btn_default" id="js_reChangeAppmsg">重新选择</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="menu_content sended" style="display:none;">
                                <p class="menu_content_tips tips_global">订阅者点击该子菜单会跳到以下链接</p>
                                <div class="msg_wrp" id="viewDiv"></div>
                                <p class="frm_tips">来自<span class="js_name">素材库</span><span style="display:none;"> -《<span class="js_title"></span>》</span></p>
                            </div>
                            <div id="js_errTips" style="display:none;" class="msg_sender_msg mini_tips warn"></div> -->
                        </div>
                    </div>
                </div>
                <!-- <span class="editor_arrow_wrp"> <i class="editor_arrow editor_arrow_out"></i> <i class="editor_arrow editor_arrow_in"></i> </span> -->
            </div>
        </div>
    </div>
        <div class="save">
            <Button @click='sendWX' type="primary" style='margin-right:20px;width:80px'>发送</Button>
            <Button @click='saveMenu' type="primary" style="width:80px"
            >保存</Button>
            
        </div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	name:"customMenu",
	data() {
                return {
                    normal1:"",//一级
                    normal2:"",//二级
                    appCode:"",
                    subList:[
                        {
                            label:'商城首页',
                            value:'http://www.zsydian.com',
                            type:'view'
                        },
                        {
                            label:'会员中心',
                            value:'http://www.baidu.com',
                            type:'view'
                        },
                        {
                            label:'我的订单',
                            value:'http://www.sina.com',
                            type:'view'
                        },
                        {
                            label:'优惠券',
                            value:'http://www.sousou.com',
                            type:'view'
                        },
                        {
                            label:'附近门店',
                            value:'http://www.sougou.com',
                            type:'view'
                        },
                        {
                            label:'关于我们',
                            value:'http://www.a.com',
                            type:'view'
                        },
                        {
                            label:'会员卡',
                            value:'http://www.b.com',
                            type:'view'
                        },
                        {
                            label:'新品上市',
                            value:'http://www.d.com',
                            type:'view'
                        },
                         {
                            label:'自定义',
                            value:'',
                            type:'view'
                        },
                    ],
                    uid: this.$store.state.common.token,
                    v:true,
                    "gzh_name":'微信公众号',
                    menu:{
                        "button":[
                            // {"type":"view","name":"菜单名称","key":"","url":"","sonMenu":[]},
                            // {
                            //     "name":"菜单名",
                            //     "sonMenu":[
                            //             {"type":"view","name":"菜单名称","key":"","url":"","sonMenu":[]},
                            //             {"type":"view","name":"菜单名称","key":"","url":"","sonMenu":[]},
                            //             {"type":"click","name":"菜单名称","key":"","url":"","sonMenu":[]}
                            //         ],
                            //     "url":"",
                            //     "type":"view",
                            // }
                        ]
                    },
//                    "menu":{'button':[]},
                    "new_menu":{'button':[]},
                    "activeMenuName":'',//默认菜单名
                    "activeMenuIndex":'',//默认菜单下标
                    "activeMenuItemName":'',//默认子菜单名
                    "activeMenuItemIndex":'',//默认子菜单下标
                    "showDelBtnType":'', //1:delMenu 2:delMenuItem
                    "showMenuContentType":'', //1:发送消息 2:跳转链接
                    "showMenuContentMsgType":'' //1:图文信息 2:图片 3:语音 4:视频
                }
            },
            mounted(){
                this.getMenu()
            },
        methods:{
            //开启菜单
            switchChange(v){
                this.v=v
            },
            //二级选择菜单内容
           changeList2(value){
                if(value==""){
                    this.normal2=false
                }else{
                    this.normal2=true
                }
                this.menu.button[this.activeMenuIndex].sonMenu[this.activeMenuItemIndex].url=value
           },
           //一级选择菜单内容
           changeList1(value){
                if(value==""){
                    this.normal1=false
                }else{
                    this.normal1=true
                }
                this.menu.button[this.activeMenuIndex].url=value
           },
            //发送到微信GET /wxmenu/${appCode}/send 发送至微信
            sendWX(){
                this.axios.get('/wxmenu/$dev/send?uid='+this.uid).then(res=>{
                    if(res.data.status==200){
                        this.$notify({
                            title:"",//
                            message: '发送成功',
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
        //保存菜单
        saveMenu(){
            if(this.v==false){
                this.$notify({
                    title:"",//
                    message: '请开启微信自定义菜单功能',
                    type: 'error',
                    position: 'bottom-right'
                });
            }else{
                  //补全数据,无数据也要为空
                this.menu_data_completing();
                console.log(this.menu);
                for(var i=0;i<this.menu.button.length;i++){
                    if(this.menu.button[i].sonMenu.length>0){
                        var _sonMenu = [];
                        for(var j=0;j<this.menu.button[i].sonMenu.length;j++){
                            if(this.menu.button[i].sonMenu[j].type == 'click'){
                                _sonMenu[j]={
                                    "type":this.menu.button[i].sonMenu[j].type,
                                    "name":this.menu.button[i].sonMenu[j].name,
                                    "key":this.menu.button[i].sonMenu[j].key,
                                    "url":this.menu.button[i].sonMenu[j].url
                                };
                            }else if(this.menu.button[i].sonMenu[j].type == 'view'){
                                _sonMenu[j]={
                                    "type":this.menu.button[i].sonMenu[j].type,
                                    "name":this.menu.button[i].sonMenu[j].name,
                                    "url":this.menu.button[i].sonMenu[j].url
                                };
                            }
                        }
                        if(this.menu.button[i].type == 'click'){
                            this.new_menu.button[i]={
                                'type':'click',
                                "name":this.menu.button[i].name,
                                "sonMenu":_sonMenu
                            };
                        }else if(this.menu.button[i].type == 'view'){
                            this.new_menu.button[i]={
                                'type':'view',
                                "url": this.menu.button[i].url,
                                "name":this.menu.button[i].name,
                                "sonMenu":_sonMenu
                            };
                        }
                    }else{
                        if(this.menu.button[i].type == 'click'){
                            this.new_menu.button[i]={
                                "type":this.menu.button[i].type,
                                "name":this.menu.button[i].name,
                                "key":this.menu.button[i].key
                            };
                        }else if(this.menu.button[i].type == 'view'){
                            this.new_menu.button[i]= {
                                "type": this.menu.button[i].type,
                                "name": this.menu.button[i].name,
                                "url": this.menu.button[i].url
                            };
                        }
                    }
                }
                console.log(this.new_menu);
// //                $('#result').html(this.new_menu);
//                 console.log(JSON.parse(JSON.stringify(this.new_menu)));
//                 console.log(JSON.stringify(this.new_menu));
                // $('#result').html(JSON.stringify(this.new_menu));
                 this.axios.post('wxmenu/save?uid='+this.uid,this.new_menu.button).then(res=>{
                    if(res.data.status==200){
                        this.$notify({
                            title:"",//
                            message: '发布自定义菜单成功',
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
           
        },
             //获取初始化目录
            getMenu(){
                this.axios.get('wxmenu/query?uid='+this.uid).then(res=>{
                    if(res.data.status==200){
                        console.log(res.data.rows)
                        this.menu.button=res.data.rows
                    }
                })
            },
            menu_data_completing() {
                for(var i=0;i<this.menu.button.length;i++){
                    if(!('type' in this.menu.button[i])){
                        this.menu.button[i].type = 'click';
                    }
                    if(!('name' in this.menu.button[i])){
                        this.menu.button[i].name = '';
                    }
                    if(!('key' in this.menu.button[i])){
                        this.menu.button[i].key = '';
                    }
                    if(!('url' in this.menu.button[i])){
                        this.menu.button[i].url = '';
                    }
                    if(!('sonMenu' in this.menu.button[i])){
                        this.menu.button[i].sonMenu = [];
                    }
                    if(this.menu.button[i].sonMenu.length>0){
                        for(var j=0;j<this.menu.button[i].sonMenu.length;j++) {
                            if (!('type' in this.menu.button[i].sonMenu[j])) {
                                this.menu.button[i].sonMenu[j].type = 'click';
                            }
                            if (!('name' in this.menu.button[i].sonMenu[j])) {
                                this.menu.button[i].sonMenu[j].name = '';
                            }
                            if (!('key' in this.menu.button[i].sonMenu[j])) {
                                this.menu.button[i].sonMenu[j].key = '';
                            }
                            if (!('url' in this.menu.button[i].sonMenu[j])) {
                                this.menu.button[i].sonMenu[j].url = '';
                            }
                            if (!('sonMenu' in this.menu.button[i].sonMenu[j])) {
                                this.menu.button[i].sonMenu[j].sonMenu = [];
                            }
                        }
                    }
                }
            },
//             saveData() {
//                 //补全数据,无数据也要为空
//                 this.menu_data_completing();
//                 console.log(this.menu);
//                 for(var i=0;i<this.menu.button.length;i++){
//                     if(this.menu.button[i].sonMenu.length>0){
//                         var _sonMenu = [];
//                         for(var j=0;j<this.menu.button[i].sonMenu.length;j++){
//                             if(this.menu.button[i].sonMenu[j].type == 'click'){
//                                 _sonMenu[j]={
//                                     "type":this.menu.button[i].sonMenu[j].type,
//                                     "name":this.menu.button[i].sonMenu[j].name,
//                                     "key":this.menu.button[i].sonMenu[j].key
//                                 };
//                             }else if(this.menu.button[i].sonMenu[j].type == 'view'){
//                                 _sonMenu[j]={
//                                     "type":this.menu.button[i].sonMenu[j].type,
//                                     "name":this.menu.button[i].sonMenu[j].name,
//                                     "url":this.menu.button[i].sonMenu[j].url
//                                 };
//                             }
//                         }
//                         if(this.menu.button[i].type == 'click'){
//                             this.new_menu.button[i]={
//                                 "name":this.menu.button[i].name,
//                                 "sonMenu":_sonMenu
//                             };
//                         }else if(this.menu.button[i].type == 'view'){
//                             this.new_menu.button[i]={
//                                 "name":this.menu.button[i].name,
//                                 "sonMenu":_sonMenu
//                             };
//                         }
//                     }else{
//                         if(this.menu.button[i].type == 'click'){
//                             this.new_menu.button[i]={
//                                 "type":this.menu.button[i].type,
//                                 "name":this.menu.button[i].name,
//                                 "key":this.menu.button[i].key
//                             };
//                         }else if(this.menu.button[i].type == 'view'){
//                             this.new_menu.button[i]= {
//                                 "type": this.menu.button[i].type,
//                                 "name": this.menu.button[i].name,
//                                 "url": this.menu.button[i].url
//                             };
//                         }
//                     }
//                 }
//                 console.log(this.new_menu);
// //                $('#result').html(this.new_menu);
//                 console.log(JSON.parse(JSON.stringify(this.new_menu)));
//                 console.log(JSON.stringify(this.new_menu));
//                 $('#result').html(JSON.stringify(this.new_menu));
//             },
            menu_selected:function (name,index) {
               
                this.showDelBtnType = 1;
                this.activeMenuName = name;
                this.activeMenuIndex = index;
                this.activeMenuItemName = '';
                this.activeMenuItemIndex = '';

                //补全数据,无数据也要为空
                this.menu_data_completing();

                if(this.menu.button[this.activeMenuIndex].sonMenu.length > 0){
                    this.showMenuContentType = '';
                }else{
                    this.showMenuContentType = this.activeMenuBtnType();
                }
            },
            //点击子菜单
            menu_item_selected:function (name,index) {
                this.showDelBtnType = 2;
                this.activeMenuItemName = name;
                this.activeMenuItemIndex = index;
                console.log(this.menu.button[this.activeMenuIndex].sonMenu[this.activeMenuItemIndex])
                //补全数据,无数据也要为空
                this.menu_data_completing();
                if(this.activeMenuIndex > 0 || this.activeMenuIndex === 0){
                    if(this.menu.button[this.activeMenuIndex].sonMenu.length > 0){
                        this.showMenuContentType = this.activeMenuBtnType();
                    }
                }
            },
            //添加菜单
            menu_add:function () {
                if(this.menu.button.length < 3){
                    this.activeMenuItemIndex = '';
                    this.activeMenuItemName = '';
                    this.menu.button.push({"type":"view","name":"菜单名称","key":"","url":"","sonMenu":[]});
                    this.activeMenuIndex = this.menu.button.length-1;
                    this.activeMenuName = '菜单名称';
                    this.showDelBtnType = 1;
                    //补全数据,无数据也要为空
                    this.menu_data_completing();
                }else{
                    alert('最多3个一级菜单');
                }
            },
             //添加子菜单
            menu_item_add:function () {
                if(this.menu.button[this.activeMenuIndex].sonMenu.length < 5){
                    this.menu.button[this.activeMenuIndex].sonMenu.push({"type":"view","name":"子菜单名称","key":"","url":"","sonMenu":[]});
                    this.activeMenuItemIndex = this.menu.button[this.activeMenuIndex].sonMenu.length-1;
                    this.activeMenuItemName = '子菜单名称';
                    this.showDelBtnType = 2;
                    //补全数据,无数据也要为空
                    this.menu_data_completing();
                }else{
                    alert('最多5个二级菜单');
                }
            },
            //删除菜单
            menu_del:function () {
                if(this.menu.button.length <= 3 && this.menu.button.length >0){

                    if((this.activeMenuIndex !== 0) && (this.activeMenuIndex == this.menu.button.length-1)){
                        this.menu.button.splice(this.activeMenuIndex,1);
                        this.activeMenuIndex -= 1;
                    }else if(this.activeMenuIndex == 0){
                        this.menu.button.splice(this.activeMenuIndex,1);
                        this.activeMenuIndex = 0;
                    }else{
                        this.menu.button.splice(this.activeMenuIndex,1);
                    }

                    if(this.menu.button.length == 0){
                        this.activeMenuIndex = '';
                        this.activeMenuName = '';
                        this.activeMenuItemIndex = '';
                        this.activeMenuItemName = '';
                    }
                }
            },
            //删除子菜单
            menu_item_del:function () {
                if(this.menu.button[this.activeMenuIndex].sonMenu.length <=5 && this.menu.button[this.activeMenuIndex].sonMenu.length>0 ){
                    if(this.activeMenuItemIndex == this.menu.button[this.activeMenuIndex].sonMenu.length-1){
                        this.menu.button[this.activeMenuIndex].sonMenu.splice(this.activeMenuItemIndex,1);
                        this.activeMenuItemIndex -= 1;
                    }else if(this.activeMenuItemIndex == 0){
                        this.menu.button[this.activeMenuIndex].sonMenu.splice(this.activeMenuItemIndex,1);
                        this.activeMenuItemIndex = 0;
                    }else{
                        this.menu.button[this.activeMenuIndex].sonMenu.splice(this.activeMenuItemIndex,1);
                    }

                    if(this.menu.button[this.activeMenuIndex].sonMenu.length == 0){
                        this.activeMenuIndex = '';
                        this.activeMenuName = '';
                        this.activeMenuItemIndex = '';
                        this.activeMenuItemName = '';
                    }
                    this.showMenuContentType = this.activeMenuBtnType();
                }
            },
            radio_label_selected:function (val) {
                this.showMenuContentType = val;
                if(val == 1){
                    this.setType('click');
                }else if(val == 2){
                    this.setType('view');
                }
            },
            content_msg_tab_nav:function (val) {
                this.showMenuContentMsgType = val;
            },
            activeMenuType:function () {
                if(this.activeMenuIndex !== '' && this.activeMenuItemIndex !== ''){
                    //子菜单、二级菜单
                    return 2;
                }else if(this.activeMenuIndex !== '' && this.activeMenuItemIndex === ''){
                    //一级菜单
                    return 1;
                }else{
                    return 0;
                }
            },
            activeMenuBtnType:function () {
                if(this.activeMenuType() === 1){
                    //一级菜单
                    switch(this.menu.button[this.activeMenuIndex].type){
                        case 'click':
                            return 1;
                        case 'view':
                            return 2;
                        default:
                            return 0;
                    }
                }else if(this.activeMenuType() === 2){
                    //子菜单、二级菜单
                    switch(this.menu.button[this.activeMenuIndex].sonMenu[this.activeMenuItemIndex].type){
                        case 'click':
                            return 1;
                        case 'view':
                            return 2;
                        default:
                            return 0;
                    }
                }else{
                    return '';
                }
            },
            isSet:function (variable) {
                if(typeof(variable)!='undefined'){
                    return true;
                }else{
                    return false;
                }
            },
            setType:function (type) {
                console.log(this.activeMenuIndex);
                if(this.activeMenuType() == 1){
                    this.menu.button[this.activeMenuIndex].type = type;
                }else if(this.activeMenuType() == 2){
                    this.menu.button[this.activeMenuIndex].sonMenu[this.activeMenuItemIndex].type = type;
                }
            },
            setNemMenuObj:function () {
                for(var i=0;i<this.menu.button.length;i++){
                    if(this.menu.button[i].sonMenu.length>0){
                        this.new_menu.push({"name":this.menu.button[i].name,"sonMenu":this.menu.button[i].sonMenu});
                    }else{
                        if(this.menu.button[i].type == 'click'){
                            this.new_menu.push({"name":this.menu.button[i].name,"type":this.menu.button[i].type,"key":this.menu.button[i].key,"sonMenu":[]});
                        }else if(this.menu.button[i].type == 'view'){
                            this.new_menu.push({"name":this.menu.button[i].name,"type":this.menu.button[i].type,"url":this.menu.button[i].url,"sonMenu":[]});
                        }
                    }
                }
            }
        }
}
</script>
<style type="text/css" scoped>
/*@import '../../../../static/css/menu.css';*/

@import '../../../../static/base.css';
@import '../../../../static/index.css';
@import '../../../../static/lib.css';
@import '../../../../static/s.css';
.menu_form_hd{
    display: flex;
    justify-content: space-between;
}
.customMenu{

	height:100%;
	
	margin-bottom:100px;
	background: #fff
}
.save{
    position:fixed;
    width:600px;
    height:40px;

    line-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F5F7F9;
    bottom:0px;
    left:38%;
    z-index:13;
    
}
.mobile_menu_preview .mobile_hd{
    background: url('http://img.zsydian.com/icon/bg_mobile_head_default2968da.png');
    margin:0;
}
.image{
	padding:10px;
	height:auto;
	width: 78%;
	/*margin-bottom:100px;*/
}
.top-center{
	background:#F8F8F8;

	padding:20px;
	display:flex;
	justify-content: space-between;
}
/*.menu{
	margin-top:10px;
	display:flex;
	margin-bottom:380px;

}
.menu-border{

	width:295px;

	border:1px solid #ccc;
	border-top:none;
	height:550px;
	margin:0px 10px;
	position:relative;
}
.content{
	position:absolute;
	bottom:0;
	left:43px;

	z-index:999;
}
.top-img{
	position:relative;

}
.top-img span{
	position:absolute;
	top:28px;
	left:115px;
	color:#fff;
	font-weight:600;
	font-size:14px;
}
.img-foot{
	height:50px;
	width:100%;
	position:absolute;
	background: url(../../../../static/img/bg_mobile_foot.png);
	bottom:0;
	left:0;
	border-top:1px solid #ccc;
}
.default-menu{
	position:absolute;
	height:50px;
	width:100%;
	bottom:0;
	line-height: 50px;
	text-align: center;
	font-size:16px;
	color:#44B549;
	border:1px solid #44B549;
	cursor:pointer;
}
.list-menu{
	position:absolute;
	height:50px;
	width:100%;
	bottom:0;
	line-height: 50px;
	text-align: center;
	font-size:16px;
	color:#44B549;
	cursor:pointer;
	border:1px solid #e4e4e4;
	border-bottom:none;
	display:flex;
}
.list-menu li.preli{
	
	flex:1 0 auto;
	
	list-style: none;
	height: 49px;
	font-size:14px;
	color:#333;
}
li{
	list-style: none;
	font-size:14px;
	color:#333;
}
.sunMenu{
	position:absolute;
	height:340px;
	width:100%;
	display:flex;
	flex-direction: column;
	justify-content: flex-end;
	top:-350px;
	left:0;

	z-index:9999;
}
.subMenuAdd{
	border:1px solid #ccc;
}

.sunMenu li:last-child{

}
.sunMenu li{
	

	border-bottom:none;

}
.sanjiao{
	position: absolute;
    width: 0;
    height: 0;
    bottom: -8px;
    left: 20px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #e4e4e4;
}
.menu-content{
	width:600px;
	margin-left:15px;
	border:1px solid #ccc;
	background: #f8f8f8;
}
.menu-content-top{
	display: flex;
	height:40px;
	margin:10px 10px 30px 10px;
	line-height: 40px;
	border-bottom:1px solid #ccc;
	justify-content: space-between;
}
.menu-content-top span{
	margin:0 10px;
}
.footer-btn{
	position:fixed;
	width:100%;
	bottom:0;
	left:50%;
	height:40px;
	line-height: 40px;
	background: #f8f8f8;
	z-index:999999;
}
.menuListborder{
	border:1px solid #44B549;
}
.submenuListborder{
	
	background: #ccc
}
.submenuListborder1{
	background: #fff
}*/

</style>
<style type="text/css">
.ql-toolbar.ql-snow + .ql-container.ql-snow{
	background: #fff
}

</style>