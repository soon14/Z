<template>
    <div class="units-box">
        <div class="main">
            <div class='main-left'>
                <div class="main-title">
                    <span  class="main-title-top">
                        <span style='margin:0 10px;'>设置</span>
                    </span>
                </div>
                <ul>
                    <li class='flclass' v-for='(item,index) in fhlist' :key='index' @click='getfhlistbg(index)' :class="{bor:index==fhindex}">
                        <span>{{item.label}}</span>
                    </li>
                </ul>
            </div>
            <div class="main-right">
                <div class="table" v-if="fhindex==0">
                   硬件信息
                </div>
                <div class="table" v-if="fhindex==1">
                    <div class="top">
                        <span></span>
                        <div>
                        <mu-button small color="primary"  style="margin-right:5px;color:#fff;margin-top:10px;border:none;background:#3b77e3;"
                            @click="add">
                          
                            新建
                        </mu-button>
                        <mu-button small color="error" style="margin-right:5px;color:#fff;margin-top:10px;border:none"
                            @click="delUser" v-if='isdel'>
                           
                            删除
                        </mu-button>
                        </div>
                    </div>
                    <ag-grid-vue style='width:100%;' class="ag-theme-balham is-full-widthag" 
                        :gridOptions="grid"
                        :rowData="rowData"
                        :columnDefs="dataKey"
                        :rowDoubleClicked="dblClick"
                        :rowClicked="clickRow"
                        :gridAutoHeight="true"
                        :enableSorting="true"
                        :enableFilter="true"
                        ></ag-grid-vue>
                        <div class='page-box'>
                           <!--  <mu-pagination raised circle 
                            :current='current' :total="total" 
                             :pageSize='pageSize' @change='changeSize'></mu-pagination> -->
                              <Page :total="total" size='small' show-total :pageSize='pageSize'  @on-change="changeSize"></Page>
                        </div>
                    <Modal v-model="Saveisshow" width="560px" :closable="false" :title="saveTitle">
                        <mu-form ref="form" :model="validateForm">
                            <Row>
                            <Col span="24" style='margin:0 20px'>
                                <mu-form-item label="地址">
                                    <el-cascader
                                        filterable
                                        expand-trigger="click"
                                        :options="cityInfo"
                                        v-model="selectedOptions2"
                                        @change="handleChange" >
                                    </el-cascader>
                                </mu-form-item>   
                                
                                <mu-form-item label="街道">
                                    <mu-text-field v-model="validateForm.street"
                                    prop="street"
                                    placeholder="请输入街道"></mu-text-field>
                                </mu-form-item>
                                <mu-form-item label="居委会名称">
                                    <mu-text-field v-model="validateForm.name"
                                    prop="name"
                                    placeholder="请输入居委会名称"></mu-text-field>
                                </mu-form-item>
                            </Col>
                        </Row>
                             
                        </mu-form>
                        
                        <div slot="footer">
                            <div>
                                <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancel'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
                                <Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="saveAddInfo"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
              
            </div>
        </div>
        <Modal v-model="Saveisshow1" width="560px" :closable="false" :title="editTitle">
            
            <mu-form ref="form1" :model="validateForm">
                <Row>
                    <Col span="24" style='margin:0 20px'>
                        <mu-form-item label="地址">
                            <el-cascader
                                filterable
                                expand-trigger="click"
                                :options="cityInfo"
                                v-model="selectedOptions2"
                                @change="handleChange" >
                            </el-cascader>
                        </mu-form-item>   
                        
                        <mu-form-item label="街道">
                            <mu-text-field v-model="validateForm.street"
                            prop="street"
                            placeholder="请输入街道"></mu-text-field>
                        </mu-form-item>
                        <mu-form-item label="居委会名称"> 
                            <mu-text-field v-model="validateForm.name"
                            prop="name"
                            placeholder="请输入居委会名称"></mu-text-field>
                        </mu-form-item>
                        <mu-form-item label="详细地址"> 
                            <mu-text-field v-model="validateForm.addressDetail"
                            prop="name"
                            placeholder="请输入详细地址"></mu-text-field>
                        </mu-form-item>
                    </Col>
                </Row>
            </mu-form>
            <div slot="footer">
                <div>
                    <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancel1'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
                    <Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="saveAddInfo1"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
                </div>
            </div>
        </Modal>
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
    data(){
        return {
            wxModel:false,
            appId:'',//第三方平台appId
            token:'',//预授权码
            serverIp:'',//回掉地址
            auth_type:2,//类型小程序
            url:'javascript:void;',//跳转地址

            isdel:false,
            saveTitle:"新建居委会信息",
            editTitle:"修改居委会信息",
            grid:{
                enableFilter:true,
                enableSorting:true,
                animateRows:true,
                rowHeight:40,
                rowSelection: 'single',
                // pagination: true,
                enableColResize:true,
                floatingFilter: true,
               
            },
            rowData:[],
            dataKey:[
                {
                    headerName: "区",
                    field: "district",
               },
               {
                    headerName: "街道",
                    field: "street",
               },
               {
                    headerName: "居委会名称",
                    field: "name",
               },
               
               {
                    headerName: "详细地址",
                    field: "addressDetail",
               },
               
            ],
            item:{},
            Saveisshow:false,//保存弹框
            Saveisshow1:false,//保存弹框
            CodeToText:CodeToText,//code转为Text
            TextToCode:TextToCode,//Text转为code
            cityInfo:regionData,//地址数据
            selectedOptions2:['310000','310100','310107'],//绑定的数据
            province: '', //省
            city: '', //市
            district: '', //区
            address:"",//详细地址
            uid: this.$store.state.common.token,
                logoUrl:LoadUrl.httpPrefix.Url+'file/action/upload/image/url?c=仓库图片&uid='+this.$store.state.common.token,
            picArr:[],
            chaIndex:-1,
            validateForm:{
                name:"",//居委会名称
                street:"",//街道
                addressDetail:""
            },
            Pid:"",//居委会id
            pageSize:0,
            total:0,
            current:1,
            fhindex:0,
            fhlist:[
                {
                    label:"硬件信息",
                    value:0
                },
                {
                    label:"居委会信息",
                    value:1
                },
                {
                    label:"小程序",
                    value:2
                },
            ]
        }
    },
    methods:{
      
        clickRow(row){
            this.item=row.data
           this.isdel=true
        },
        delUser(){
            this.$Modal.confirm({
                title: '删除',
                content: '<p>确定要删除吗?删除后信息将不可恢复！</p>',
                onOk: () => {
                    this.axios.delete('/housingEstate/delete/'+this.item.id+'?uid='+this.uid).then(res=>{
                        if(res.data.status==200){   
                            this.$notify({
                                title:"",//
                                message:"已删除",
                                type: 'success',
                                position: 'bottom-right'
                            });
                            this.getproperty()//居委会信息
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
        //左侧列表点击
        getfhlistbg(index){
            this.fhindex=index
            switch(index){
                case 0:
                    //硬件信息
                break;
                case 1:
                    this.getproperty()//居委会信息
                break;
                case 2:
                   // this.$router.push('/wxxcxhomezhb')
                   this.getxcx()
                break;
            }
        },
        getxcx(){
            this.axios.get('wxa/app?uid='+this.uid).then(res=>{
                if(res.data.status==200){
                    //授权跳转设置页面
                    this.status1=false//有绑定的小程序显示
                    this.axios.get('acommit/wxaapp?uid='+this.uid).then(res=>{
                        if(res.data.status==200){
                            let data=res.data.rows
                            if(data.status==3 || data.status==7 || data.status==8){
                                //有审核小程序
                                this.$router.push('/wxxcxSubmitzhb')
                            }
                        }else{
                            //没有审核小程序
                            this.$router.push('/wxxcxshzhb')
                        }
                    })
                }else{
                    this.$router.push('/wxxcxhomezhb')
                }
            })
        },
        
        //省市区
        handleChange(arr){
            this.province = this.CodeToText[arr[0]]
            this.city =this.CodeToText[arr[1]]
            this.district = this.CodeToText[arr[2]]
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
            //新建
            add(){
                this.Saveisshow=true
                this.validateForm.name=''//居委会名称
                this.validateForm.propertyNo=''//居委会编号
                this.validateForm.addressDetail=''//详细地址
                this.picArr=[]//居委会照片
                this.validateForm.propertyPhone=''//
                this.validateForm.propertyName=''//
                this.address=''
                this.province='' //省
                this.city='' //市
                this.district=''//区
            },
            //取消
            cancel(){
                this.Saveisshow=false
            },
        //点击保存POST /housingEstate/add 新增居委会
        saveAddInfo(){
            this.$refs.form.validate().then((result) => {
                if(result){
                   this.axios.post('/housingEstate/add?uid='+this.uid,{
                        name:this.validateForm.name,//居委会名称
                        street:this.validateForm.street,
                        addressDetail:this.validateForm.addressDetail,//详细地址
                        province:this.CodeToText[this.selectedOptions2[0]],
                        city:this.CodeToText[this.selectedOptions2[1]],
                        district:this.CodeToText[this.selectedOptions2[2]],
                   }).then(res=>{
                    if(res.data.status==200){
                        this.$notify({
                            title:"成功",//
                            message:"保存成功",
                            type: 'success',
                            position: 'bottom-right'
                        });
                        this.getproperty()
                        this.Saveisshow=false
                        this.validateForm.name=''//居委会名称
                        this.validateForm.street=''
                        this.validateForm.addressDetail=''
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
        //双击修改
        dblClick(data){
            this.Saveisshow1=true
            let row=data.data
            this.Pid=row.id
            this.validateForm.name=row.name//居委会名称
            this.validateForm.street=row.street//居委会名称
            this.validateForm.propertyNo=row.propertyNo//居委会编号
            this.validateForm.propertyPhone=row.propertyPhone//
            this.validateForm.propertyName=row.propertyName//
            this.validateForm.addressDetail=row.addressDetail//
            if(row.photos==null || row.photos==''){
                this.picArr=[]
            }else{
                this.picArr=row.photos.split(',')
            }
            this.address=row.addressDetail
            this.province=row.province
            this.city=row.city
            this.district=row.district

            if(this.province==null || this.province==''  || this.city==null || this.city==''  ||  this.district==null ||this.district==''){
                this.selectedOptions2=['310000','310100','310107']
            }else{
                this.selectedOptions2=[this.TextToCode[this.province].code,this.TextToCode[this.province][this.city].code,this.TextToCode[this.province][this.city][this.district].code]
            }
        },
        //取消修改
        cancel1(){
            this.Saveisshow1=false
        },
        //PUT /housingEstate/update 修改居委会
        saveAddInfo1(){
            this.$refs.form1.validate().then((result) => {
                if(result){
                   this.axios.put('/housingEstate/update?uid='+this.uid,{
                        id:this.Pid,
                        name:this.validateForm.name,//居委会名称
                        street:this.validateForm.street,
                        addressDetail:this.validateForm.addressDetail,//详细地址
                        province:this.CodeToText[this.selectedOptions2[0]],
                        city:this.CodeToText[this.selectedOptions2[1]],
                        district:this.CodeToText[this.selectedOptions2[2]],
                   }).then(res=>{
                    if(res.data.status==200){
                        this.$notify({
                            title:"成功",//
                            message:"保存成功",
                            type: 'success',
                            position: 'bottom-right'
                        });
                        this.getproperty()
                        this.Saveisshow1=false
                        this.validateForm.name=''//居委会名称
                        this.validateForm.street=''
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
        //获取居委会GET /housingEstate/query 居委会清单
        getproperty(){
            this.axios.get('/housingEstate/query?uid='+this.uid).then(res=>{
                if(res.data.status==200){
                    let data=res.data.rows
                    this.rowData=res.data.rows
                    this.total=res.data.total
                    this.pageSize=res.data.pageSize
                    
                 
                }
            })
        },
        //页码改变
        changeSize(size){
            this.current=size
            this.axios.get('/housingEstate/query?offset='+this.current+'&uid=' + this.uid).then((res) => {
                let data = res.data;
                if(res.data.status == '200') {
                    let data=res.data.rows
                    this.rowData=res.data.rows
                    this.total=res.data.total
                    this.pageSize=res.data.pageSize
                    
                }
            })
            
        },
      
    },
    mounted(){

    }
}
</script>
<style scoped>
.editColor{
    color:red;
}
.units-box {
    width: 100%;
    height:100%;
    background: rgb(230,233,236)
}
.main{
    display:flex;height:100%
}
.main-title{
    display:flex;border-bottom:1px solid #e4e4e4
}
.main-title-top{
    height:50px;font-size:18px;font-weight:900;line-height:50px
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
.main-right{
    width: 100%;
    height: 100%;
    background: #fff;
}
.bor{
    background: #EBF1FC
}
.table .top{
    display: flex;
    justify-content: space-between;
    height:50px;
    width:100%;
    line-height: 50px;
    border-bottom: 1px solid #e4e4e4
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
</style>


