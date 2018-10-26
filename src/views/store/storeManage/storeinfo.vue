<template>
	<div>
		<!--店铺信息-->
		<div class="table">
			<!-- <div class="right-content"> -->
				<div style='display:flex;justify-content:space-between;height:50px;line-height:50px'>
					<span></span>
					<div>
					<Button type="ghost"  shape="circle"  @click="updateStoreInfo1('formValidate1')"style="background:#3b77e3;margin-right:5px;color:#fff;border:none">
	                   <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>
	                {{$t('public.SaveBtn')}}
	                </Button>
	                </div>
                </div>
				<Form ref="formValidate1" :model="formValidate" :rules="ruleValidate" :label-width="80" >
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
                                <FormItem :label="$t('manage.store.fl')" prop="category">
                                    <Select disabled v-model='formValidate.category' :placeholder="$t('public.all')" @on-change="changetype">
                                        <Option v-for="(item,index) in cktype" :value="item.value" :key="index">{{ item.label }}</Option>
                                    </Select>
                                 </FormItem>
                             </Col span="8">
                        </div>
                        <div style='display:flex'>
                            <Col span="8">
                                <FormItem :label="$t('manage.store.Person')" prop="person">
                                    <Input  v-model="formValidate.person" :placeholder="$t('manage.store.Person')"></Input>
                                </FormItem>
                            </Col span="8">
                            <Col span="8">
                                <FormItem :label="$t('manage.store.Mobile')" prop="phone">
                                    <Input  v-model="formValidate.phone" :placeholder="$t('manage.store.Mobile')"></Input>
                                </FormItem>
                            </Col span="8">
                            <Col span="8">
                                <FormItem :label="$t('manage.store.email')" prop="email">
                                    <Input  v-model="formValidate.email" :placeholder="$t('manage.store.emailplaceholder')"></Input>
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
                            <div style='padding:10px 0px;margin-top:20px' disabled>
                                <Tag type="border" closable color="#199DFF" :fade='false' v-for='(item,index) in employees' :key='index' >{{item.name}}</Tag>
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
                         <div style='margin:-10px 0 5px 0'>状态：
                            <span >{{storeData.statusDesc}}</span>
                         </div>
                            <div class="code-box" style="width:100%;display:flex">
                                <p style="width:45px;flex: 0 0 45px;margin-top:5px">{{$t('manage.warehouse.Address')}}：</p>
                                <el-cascader
                                	filterable
                                    expand-trigger="click"
                                    :options="cityInfo"
                                    v-model="selectedOptions2"
                                    @change="handleChange" style='width:430px'>
                                </el-cascader>
                                <Input  type="text" :placeholder="$t('manage.warehouse.dAddress')" v-model="address" 
                                v-on:input="getLngLat"></Input>
                               
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
			<!-- </div> -->
		</div>
	</div>
</template>
<script type="text/javascript">
import LoadUrl from '@/components/common/actionLoad'
import { regionData,CodeToText,TextToCode} from 'element-china-area-data'
export default{
	data(){
		return {
				logoUrl:LoadUrl.httpPrefix.Url+'file/action/upload/image/url?c=店铺图片&uid='+this.$store.state.common.token,
				title:"店铺信息",
				//店铺信息
				storeData:{},
				picArr:[],
				emp:'',
				province: '', //省
                city: '', //市
                district: '', //区
                //百度地图
                center: {
                    lng: 116.404,
                    lat: 39.915
                },
                zoom: 16,
				employees:[],
				address:"",
				chaIndex:-1,
				uid: this.$store.state.common.token,
				logoUrl:LoadUrl.httpPrefix.Url+'file/action/upload/image/url?c=店铺图片&uid='+this.$store.state.common.token,
                //保存消息
                cktype:[],
                imgnifoisshow:true,
                category :"",
                logo:"",
                info: '',//店铺简介
                indexId:"",
                CodeToText:CodeToText,//code转为Text
                TextToCode:TextToCode,//Text转为code
                cityInfo:regionData,//地址数据
                selectedOptions2:[],//绑定的数据
                businessHours:"",
                formValidate:{
                    code:'',
                    name:'',//店铺名称
                    phone:'',//电话
                    person:'',//联系人
                    category:'',//类型
                    email:'',
                },
                 ruleValidate:{
                
                  email:[{ pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请输入正确的邮箱'}],
                person:[
                         { required: true, message: '联系人不能为空', trigger: 'blur' },
                         { pattern:/^[A-Za-z\d_\-\u4e00-\u9fa5]{1,10}$/, message: '存在非法字符或超过指定长度10个字符' }

                    ],
                 phone:[

                       { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号码' }],
                    

                },
		}
	},
	methods:{
		//导购
			getey(){
				this.axios.get('setting/dqmddg?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						let data = res.data;
						//console.log(res.data.rows)
						this.dgdata = res.data.rows
						this.dgdata.forEach((x)=>{
							if(x.gender==1){
								x.gender=this.$t('public.man')//'男'
								}
                            if(x.gender==0){
                                x.gender=this.$t('public.woman')//'女'
                            }
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							
						})
					}
				})
			},
			//当前店铺信息setting/nows
			getStoreInfo(){
				this.axios.get('setting/nows?uid='+this.uid).then(res=>{
					if(res.data.status == '200') {
                        let data = res.data.rows;
                        this.indexId=data.id
                         //console.log(data)
                         //导购
                        if(data.employees==null){
                            this.employees =[]
                        }else{
                           this.employees=data.employees

                        }
                        //详情
                        this.storeData=res.data.rows;
                        if(this.storeData.status==1){
                            this.storeData.statusDesc=this.$t('public.normal')
                        }
                         if(this.storeData.status==99){
                            this.storeData.statusDesc=this.$t('public.normalT')
                        }
                         if(this.storeData.status==0){
                            this.storeData.statusDesc=this.$t('public.addnew')
                        }
                         if(this.storeData.status==9999){
                            this.storeData.statusDesc=this.$t('public.del')
                        }
                        this.storeData.createTime=new Date( this.storeData.createTime).toLocaleDateString().replace(/\//g,'-')
                        //导购数组转换字符串链接
                        let empArr=[]
                        if(this.storeData.employees==null){
                            empArr=[]
                            this.emp=''
                        }else{
                            this.storeData.employees.forEach(x=>{
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
                        //console.log(this.emp)
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
                        this.province=data.province
                        this.city=data.city
                        this.district=data.district
                        //转为code
                        if(this.province==null||this.province==''||this.city==null|| this.city=='' ||this.district==null|| this.district==''){
                            this.selectedOptions2=[]
                        }else{
                            this.selectedOptions2=[this.TextToCode[this.province].code,this.TextToCode[this.province][this.city].code,this.TextToCode[this.province][this.city][this.district].code]
                            this.getLngLat()//地图显示
                        }
                        
                    }
				})
			},
			//门店类型
            changetype(v){
                this.formValidate.category=v
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
                this.province = this.CodeToText[arr[0]]
                this.city =this.CodeToText[arr[1]]
                this.district = this.CodeToText[arr[2]]
                //console.log(this.selectedOptions2)
                this.getLngLat()
            },

            getLngLat(){
                var _this = this;
                $.ajax({
                    dataType: 'jsonp',
                    url: 'https://api.map.baidu.com/geocoder/v2/?address='+_this.province+_this.city+_this.district+ _this.address + '&output=json&ak=BBe8b008fb274f9544aa96828ac8c10e&callback=showLocation',
                    type: 'get',
                    crossDomain: true,
                    success:function(data){
                     //console.log(data.result)
                     _this.center.lng =data.result.location.lng;
                    _this.center.lat = data.result.location.lat;
                    }
                })
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
                //console.log(this.picArr)
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
                        //console.log(this.picArr.length)
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
                            province: this.province,
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
                                    this.getStoreInfo()
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
                  //  //获取营业时间
                // this.businessHours = this.starttime

            },
    },
    mounted(){
    	this.getStoreInfo()
    }
}
</script>
<style type="text/css" scoped>
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
.imgBg{
    position:absolute;top:0;left:0;width:100%;height:100%;text-align:center;margin:0 auto;background:#ccc;opacity:0.5
}
.cklogos{
    width:130px;height:130px;display: flex;flex-wrap:wrap;margin:5px;position:relative;cursor:pointer
}
.table {
	width: 100%;
	height: 100%;
	overflow: initial;
	background: #fff;
	padding: 0 10px;
}
.map-box {
    width: 100%;
    height: 300px;
    margin-top:10px;
}
</style>