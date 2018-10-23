<template>
    <div class='main'>
        <div class="main-top">
            <div style='display:flex'>
                
                 <Select style="width:100px;margin-right:10px;margin-top: 15px;" v-model='value' :placeholder="$t('public.all')" @on-change="selectChange">
                    <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <!-- <mu-text-field v-model="keyword" style='width:300px;margin-bottom:0' @keyup.enter='enter' placeholder='请输入关键词'></mu-text-field> -->
                <div style='margin-right:20px;display:flex'>
                    <Input style=';margin-top: 15px;;width:300px' v-model='keyword' placeholder="请输入姓名或手机号" @on-enter='enter'>
                    <span slot="append"  @click='search' style='cursor:pointer;'>{{$t('public.search')}}</span>
                    </Input>
                </div>
            </div>
            <div>
                <mu-button small  color="primary" style='margin-top: 18px;background:#3b77e3;' @click='add'>新增</mu-button>
                <mu-button small  color="success" style='margin-top: 18px' @click='storeImport'>导入</mu-button>
                <mu-button small  color="primary" style='margin-top: 18px' @click='storeExport'>导出</mu-button>
            </div>
        </div>
        <!-- <div v-if='loadingisshow1' >
            <Spin >
                <mu-icon value="rotate_right" color="blue"  class="demo-spin-icon-load"></mu-icon>
                <div>Loading...</div>
            </Spin>
        </div> -->
        <ag-grid-vue style='width:100%;' id="agGridTable" class="ag-theme-balham is-full-widthag" 
        :gridOptions="grid"
        :rowData="rowData"
        :columnDefs="dataKey"
        :rowDoubleClicked="dblClick"
        :rowClicked="dblClick"
    
        ></ag-grid-vue>
        <!--:cellMouseDown="mouseDown"-->
        
        <div class='page-box'>
            <Page :total="total" size='small' show-total :pageSize='pageSize'  @on-change="changeSize"></Page>
           <!--  <mu-pagination raised circle 
            :current='current' :total="total" 
             :pageSize='pageSize' @change='changeSize'></mu-pagination> -->
        </div>
       
        <!--导入-->
    <Modal v-model="importisshow" width="700" :mask-closable='false' :closable='false' :title="$t('manage.warehouse.fileImport')"><!--文件导入-->
        <el-steps  :active="active"  :align-center='true' style='margin-left:120px'>
              <el-step :title="$t('manage.warehouse.fileImport')" ></el-step>
              <el-step :title="$t('manage.warehouse.fileY')" ></el-step>
              <el-step :title="$t('manage.warehouse.fileS')" ></el-step>
            </el-steps>

       <!--第一步-->
        <div style='width:100%;margin:20px auto;text-align:center;' v-if='oneStep'>
           <div style='width:100%;margin:20px auto;text-align:center;font-size:14px;font-weight:600;border-top:1px solid #e4e4e4'>
                <span style='display:block;margin: 20px auto 30px 0;'>{{$t('manage.warehouse.fileImport')}}</span><!--文件导入-->
            </div>
            <div style='width:100%;margin:20px auto;text-align:center;position:relative'>
                <div style='margin-left:-108px'>
                    <span>{{$t('manage.warehouse.filechoose')}}：</span><!--选择文件-->
                    <Input  disabled style='width:202px' v-model='url'></Input>
                    <div style='position:absolute;top: 0px;right:175px;height: 35px;width: 80px;overflow: hidden;'>
                        <el-upload
                        ref="upload"
                        :show-file-list='false'
                        class="upload-demo"
                        :action="actionUrl"
                        :on-progress='onprogress'
                        :on-success='success'
                        :before-upload='beforeAvatarUpload'
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" >
                        <Button size="small" type="primary" style='background:#169BD5'>
                        {{$t('manage.warehouse.upload')}}</Button><!--点击上传-->

                        </el-upload>
                    </div>
                    <div v-if='loadingisshow' >
                        <Spin fix>
                            <mu-icon value="rotate_right" color="blue"  class="demo-spin-icon-load"></mu-icon>
                            
                            <div>Loading...</div>
                        </Spin>
                    </div>
                    <div v-if='errorisshow' class='importErrTxt'>{{error}}</div>
                </div>
            </div>
            <div style='margin-top:40px;display: flex;justify-content:space-between;;margin-bottom:-40px;font-size:14px;cursor:pointer'>
                <Button  type="ghost" style='margin-left:5px;border:none;background:#169BD5;color:#fff'>

                     <a :href="skuLoad" style='color:#fff' @click.stop='stopsku($event)'>
                     {{$t('manage.warehouse.fileD')}}</a>
                </Button>
                <span style="" @click="cancel">{{$t('public.cancel')}}</span><!--取消-->
            </div>
        </div>
        <!--第二步-->
         <div style='width:100%;margin:20px auto;text-align:center;' v-if='twoStep'>
            <div style='width:100%;margin:20px auto;text-align:center;position:relative'>
             
                <ag-grid-vue style='width:100%;height:240px;overflow:auto' class="ag-theme-balham is-full-widthag" 
                    :gridOptions="gridIm"
                    :rowData="importstoredataList"
                    :columnDefs="importstore"
                    gridAutoHeight
                    ></ag-grid-vue>
            </div>
            <div style='margin-top:40px;display: flex;justify-content:space-between;;margin-bottom:-40px;font-size:14px'>
                <div>共导入：<span style='color:blue'>{{importstoredataList.length}}</span> 条数据</div>
                <div>
                    <span style="color:#448AFF;font-size:14px" @click="gothree"><a>{{$t('public.sureBtn')}}</a></span><!--确认-->
                </div>
            </div>
         </div>
         
        <div slot="footer">

        </div>
    </Modal>
    </div>
</template>
<script>
import LoadUrl from '@/components/common/actionLoad'
import { AgGridVue } from "ag-grid-vue";
var autoGroupColumnDef = {
    headerName: "护理员",
    width: 200,
    field: 'caregiversName',
    valueGetter: function(params) {
        if (params.node.group) {
            return params.node.key;
        } else {
            return params.data[params.colDef.field];
        }
    },
    
    
};
export default {
    components:{
        AgGridVue
    },
    data(){
        return {
            value:1,
            orderListname:[
                {
                    label:"全部",
                    value:0
                },
                {
                    label:"待申请",
                    value:1
                },
                {
                    label:"待评估",
                    value:11
                },
                {
                    label:"待派单",
                    value:22
                },
                {
                    label:"合约中",
                    value:3
                },
                {
                    label:"待恢复",
                    value:4
                },
                {
                    label:"中止中",
                    value:5
                },
                {
                    label:"已终止",
                    value:9
                },
            ],
            loadingisshow1:false,
            rowData: [],
            grid:{
               
                floatingFilter: true,
                enableFilter:true,
                enableSorting:true,
                animateRows:true,
                rowHeight:40,
                enableColResize:true,
                enableRangeSelection:true,
                 animateRows: true,
                //单行选中，"multiple" 多选（ctrl）,"single" 单选
                 rowSelection: 'multiple',
                 autoGroupColumnDef: autoGroupColumnDef,
                
            },
            gridIm:{
                enableFilter:true,
                enableSorting:true,
                animateRows:true,
                rowHeight:40,
                // pagination: true,
                enableColResize:true,
            },
            keyword:"",//搜索词
            rowId:"",//一行id
            current:1,
            uid: this.$store.state.common.token,
            dataKey: [
                {
                    headerName: "编号",
                    field: "code",
                    pinned: 'left',
                    suppressSizeToFit: true,
                    width:120,
                    
                },
                {
                    headerName:"护理员",
                    field:'caregiversName',
                    width:120,
                    suppressSizeToFit: true,
               
                },
                {
                    headerName:"客户",
                    field: 'name',
                    suppressSizeToFit: true,
                    width:120,
                },
                
                {
                    headerName:"街道",
                   
                    field: 'street',
                    suppressSizeToFit: true,
                    width:120,
                },
                {
                    headerName:"居委会",
                    field: 'committees',
                     suppressSizeToFit: true,
                    width:120,
                },
                {
                    headerName:"详细地址",
                    field: 'addressDetail',
                    suppressSizeToFit: true,
                    width:200,
                },
                {
                    headerName:"开始时间",
                    field: 'purposeStartTime',
                    suppressSizeToFit: true,
                    width:120,
                },
                {
                    headerName:"结束时间",
                    field: 'purposeEndTime',
                    suppressSizeToFit: true,
                    width:120,
                },
                {
                    headerName:"次数",
                    field: 'weekTimes',
                    suppressSizeToFit: true,
                    width:80,
                },
                {
                    headerName:"等级",
                    field: 'level',
                    suppressSizeToFit: true,
                    width:80,
                },
                {
                    headerName:"一",
                    field:'monday',
                    suppressSizeToFit: true,
                   
                    width:80,
                    cellStyle: function(params) {
                        if (params.value=="班") {
                            //mark police cells as red
                            return {color: '#fff', backgroundColor: 'green'};
                        } else {
                            return {color: '#fff', backgroundColor: '#ff0000'};;
                        }
                    }

                },
                {
                    headerName:"二",
                    field:'tuesday',
                    suppressSizeToFit: true,
                    width:80,
                    cellStyle: function(params) {
                        if (params.value=="班") {
                            //mark police cells as red
                            return {color: '#fff', backgroundColor: 'green'};
                        } else {
                            return {color: '#fff', backgroundColor: '#ff0000'};;
                        }
                    }
                },
                {
                    headerName:"三",
                    field:'wednesday',
                    suppressSizeToFit: true,
                    width:80,
                    cellStyle: function(params) {
                        if (params.value=="班") {
                            //mark police cells as red
                            return {color: '#fff', backgroundColor: 'green'};
                        } else {
                            return {color: '#fff', backgroundColor: '#ff0000'};;
                        }
                    }
                },
                {
                    headerName:"四",
                    field:'thursday',
                    suppressSizeToFit: true,
                    width:80,
                    cellStyle: function(params) {
                        if (params.value=="班") {
                            //mark police cells as red
                            return {color: '#fff', backgroundColor: 'green'};
                        } else {
                            return {color: '#fff', backgroundColor: '#ff0000'};;
                        }
                    }
                },
                {
                    headerName:"五",
                    field:'friday',
                    suppressSizeToFit: true,
                    width:80,
                    cellStyle: function(params) {
                        if (params.value=="班") {
                            //mark police cells as red
                            return {color: '#fff', backgroundColor: 'green'};
                        } else {
                            return {color: '#fff', backgroundColor: '#ff0000'};;
                        }
                    }
                },
                {
                    headerName:"六",
                    field:'saturday',
                    suppressSizeToFit: true,
                    width:80,
                    cellStyle: function(params) {
                        if (params.value=="班") {
                            //mark police cells as red
                            return {color: '#fff', backgroundColor: 'green'};
                        } else {
                            return {color: '#fff', backgroundColor: '#ff0000'};;
                        }
                    }
                },
                {
                    headerName:"日",
                    field:'sunday',
                    suppressSizeToFit: true,
                    width:80,
                    cellStyle: function(params) {
                        if (params.value=="班") {
                            //mark police cells as red
                            return {color: '#fff', backgroundColor: 'green'};
                        } else {
                            return {color: '#fff', backgroundColor: '#ff0000'};;
                        }
                    }
                },
                {
                    headerName:"状态",
                    field: 'statusDesc',
                    pinned: 'right',
                    suppressSizeToFit: true,
                    width:80,
                     cellStyle: function(params) {
                        switch(params.data.status){
                            case 1:
                                return {color:"#3B77E3"}
                            break;
                            case 11:
                                return {color:"#3B57E3"}
                            break;
                            case 22:
                                return {color:"#3B87E3"}
                            break;
                            case 3:
                                return {color:"#40ca98"}
                            break;
                            case 9:
                                return {color:"#d53c39"}
                            break;
                        }
                    }
                },
               
            ],
            
            total:0,
            pageSize:0,

            skuLoad:LoadUrl.actionLoad.customer,//商品导入模板
            loadingisshow:false,
            isshowtable:true,
            errorisshow:false,
            error:'',//导入失败的提示
            type:1,
            oneStep:true,//第一步显示
            twoStep:false,//第2步显示
            threeStep:false,//第3步显示
            active:1,//步数
            importisshow:false,//导入显示
            url:'',//选择文件后或名称
            
            //POST /aunt/import 导入
            actionUrl:LoadUrl.httpPrefix.Url+'aunt/import?uid='+this.$store.state.common.token,//导入地址
            //导入的商品文件数据key
            importstore:[
                {
                    headerName: "编号",
                    field: "code"
                },
                {
                    headerName:"姓名",
                    field: 'name',
                },
                {
                    headerName:"性别",
                    field:'genderDesc',
                },
                
                {
                    headerName:"手机号",//"电话",
                    field:'mobile',
                 
                },
                {
                    headerName:"家属姓名",
                   
                    field: 'familyName',
                },
                {
                    headerName:"家属电话",
                    field: 'emergencyCall',
                },
                {
                    headerName:"地址",//"地址",
                    field:'Raddress',
                },
                {
                    headerName:"状态",
                    field: 'statusDesc',
                },
            ],
            importstoredataList:[],//导入的仓库文件数据
        }
    },
    methods:{
        selectChange(s){
            this.value=s
            this.getUnitsList(this.value)
        },
        add(){
            this.$router.push('/addcustomer')
        },
        search(){
            this.axios.get('/aunt/query?keyword='+this.keyword+'&uid=' + this.uid+'&length=500').then((res) => {
                let data = res.data;
                if(res.data.status == '200') {
                    this.rowData = data.rows;
                    this.pageSize = data.pageSize;
                    this.total = data.total;
                    this.rowData.forEach(x=>{
                        if(x.gender==1){    
                            x.gender="男"
                        }else{
                            x.gender="女"
                        }
                        this.getWeek(x)
                        x.Raddress=x.addressDetail
                        if(x.purposeEndTime=="NaN:NaN"){
                            x.purposeEndTime=''
                        }
                        if(x.purposeStartTime=="NaN:NaN"){
                            x.purposeStartTime=''
                        }
                    })
                }
            })
        },
        //回车搜索
        enter(){
             this.search()
        },
        //转化星期
        getWeek(x){
            if(x.monday){
                x.monday="班"
            }else{x.monday="休"}
            if(x.tuesday){
                x.tuesday="班"
            }else{x.tuesday="休"}
            if(x.wednesday){
                 x.wednesday="班"
            }else{x.wednesday="休"}
            if(x.thursday){
                x.thursday="班"
            }else{x.thursday="休"}
            if(x.friday){
                 x.friday="班"
            }else{x.friday="休"}
            if(x.saturday){
                x.saturday="班"
            }else{x.saturday="休"}
            if(x.sunday){
                x.sunday="班"
            }else{x.sunday="休"}
        },
       //GET /aunt/query 客户清单
        getUnitsList(s){
            this.loadingisshow1=true
            this.axios.get('/aunt/query?length=500&uid=' + this.uid+'&status='+s).then((res) => {
                
                if(res.data.status == '200') {
                    this.loadingisshow1=false
                    let data = res.data;
                   
                    this.rowData = data.rows;
                    this.pageSize = data.pageSize;
                    this.total = data.total;
                    this.rowData.forEach(x=>{
                        if(x.gender==1){    
                            x.gender="男"
                        }else{
                            x.gender="女"
                        }
                        this.getWeek(x)
                        x.Raddress=x.addressDetail
                        if(x.purposeEndTime=="NaN:NaN"){
                            x.purposeEndTime=''
                        }
                        if(x.purposeStartTime=="NaN:NaN"){
                            x.purposeStartTime=''
                        }
                       
                       
                    })
                }
            })
        },
        //页码改变
        changeSize(size){
            this.current=size
            this.axios.get('/aunt/query?length=500&offset='+this.current+'&uid=' + this.uid+'&status='+this.value).then((res) => {
                let data = res.data;
                if(res.data.status == '200') {
                    this.rowData = data.rows;
                    this.pageSize = data.pageSize;
                    this.total = data.total;
                    this.rowData.forEach(x=>{
                        if(x.gender==1){    
                            x.gender="男"
                        }else{
                            x.gender="女"
                        }
                        this.getWeek(x)
                        x.Raddress=x.addressDetail
                       
                        if(x.purposeEndTime=="NaN:NaN"){
                            x.purposeEndTime=''
                        }
                        if(x.purposeStartTime=="NaN:NaN"){
                            x.purposeStartTime=''
                        }

                    })
                }
            })
            
        },
        //双击一行dblrowclick
        dblClick(row){
            console.log(row)
            this.$router.push({
                path:'/addcustomer',
                query:{
                    id:row.data.id,
                    index:row.rowIndex,
                    s:row.data.status
                }
            })
        },
        mouseDown(row){
            this.$router.push({
                path:'/addcustomer',
                query:{
                    id:row.data.id,
                    index:row.rowIndex,
                    s:row.data.status
                }
            })
        },
        //导入
            //下载阻止冒泡
            stopsku(event){
               event.stopPropagation()
            },
            //点击
            storeImport(){
                this.importisshow=true
                this.active=1
                this.oneStep=true//第一步显示
                this.twoStep=false//第2步隐藏
                this.threeStep=false//第3步隐藏
                this.url=''
                this.errorisshow=false
                this.error=''
                this.importstoredataList=[]
            },
            //取消
            cancel(){
                this.importisshow=false//弹框消失
                this.oneStep=true//第一步显示
                this.twoStep=false//第2步隐藏
                this.threeStep=false//第3步隐藏
                this.url=''
                this.errorisshow=false
                this.error=''
                this.importstoredataList=[]
                this.$refs.upload.abort()
            },
            //第一步
            importOne(){
                if(this.url==''){
                    this.errorisshow=true
                    this.error=this.$t('manage.warehouse.upmb')
                    return
                }else{
                    this.active=2
                    this.oneStep=false
                    this.twoStep=true

                }

            },
            //返回第一步
            goOneStep(){
                this.active=1
                this.oneStep=true
                this.twoStep=false
            },
            //进入第三
            gothree(){
               this.importisshow=false//弹框消失
                this.oneStep=true//第一步显示
                this.twoStep=false//第2步隐藏
                this.threeStep=false//第3步隐藏
                this.url=''
                this.errorisshow=false
                this.error=''
                this.importstoredataList=[]
            },
           
             //上传时
            onprogress(event, file, fileList){
                this.loadingisshow=true
            },
             //上传之前类型之前
            beforeAvatarUpload(file){

               var fileName=new Array()
                fileName =file.name.split('.');
                const extension = fileName[fileName.length-1] === 'xls'
                const extension2 =  fileName[fileName.length-1]=== 'xlsx'
                const isLt2M = file.size / 1024 / 1024 < 10
                if (!extension && !extension2) {

                    this.$notify({
                        title: "",
                        message:this.$t('finance.upTemplate'),//'上传模板只能是xls、xlsx格式!',
                        type: 'error',
                        position: 'bottom-right'
                    });
                }
                if (!isLt2M) {
                    this.$notify({
                        title: "",
                        message: this.$t('finance.upTemplateB'),//'上传模板大小不能超过 10MB!',
                        type: 'error',
                        position: 'bottom-right'
                    });
                }

             return extension || extension2 && isLt2M

            },
            //成功后的会掉
            success(response, file, fileList){
                 if(response.status==200){
                    this.error=this.$t('finance.upTemplateS')
                    this.errorisshow=true
                    this.url=file.name
                    console.log(response)
                    this.loadingisshow=false
                    this.importstoredataList=response.rows
                     this.importstoredataList.forEach(x=>{
                        if(x.gender==1){    
                            x.gender="男"
                        }else{
                            x.gender="女"
                        }
                        this.getWeek(x)
                        x.Raddress=x.province+x.city+x.district+x.addressDetail
                        x.serviceStartTime  = new Date(x.serviceStartTime).toTimeString().substring(0, 5)
                        x.serviceEndTime = new Date(x.serviceEndTime ).toTimeString().substring(0, 5)
                    })
                    this.active=2
                    this.oneStep=false
                    this.twoStep=true
                    this.getUnitsList(this.value)
                }else{
                    this.errorisshow=true
                    this.loadingisshow=false
                    this.error=response.errorMessage
                   //console.log(response)
                }
            },
            //导出GET /aunt/excel 导出
            storeExport(){
                this.axios.get('/aunt/excel?uid='+this.uid).then(res=>{
                    if(res.data!=null){
                        this.$notify({
                            title:"",//
                            message: res.data.errorMessage,
                            type: 'error',
                            position: 'bottom-right'
                        });
                    }else{
                        window.location.href=res.request.responseURL
                    }
                })
            },
    },
    mounted(){
        switch(this.$route.query.index){
            case 1:
                this.value=1
                this.getUnitsList(this.value)
            break;
            case 3:
                this.value=3
                this.getUnitsList(this.value)
            break;
            case 11:
                this.value=11
                this.getUnitsList(this.value)
            break;
            case 22:
                this.value=22
                this.getUnitsList(this.value)
            break;
            case 5:
                this.value=5
                this.getUnitsList(this.value)
            break;
            case 4:
                this.value=4
                this.getUnitsList(this.value)
            break;
            case 9:
                this.value=9
                this.getUnitsList(this.value)
            break;
           
           
        }
        
        
        this.getUnitsList(this.value)
       
        let rightHead=$('.main-top').height()
        let clientHeight=document.body.clientHeight
        let H=clientHeight-rightHead-65-48-40
        $('#agGridTable').height(H)
        window.onresize=function(){
            let rightHead=$('.main-top').height()
            let clientHeight=document.body.clientHeight
            let H=clientHeight-rightHead-65-48-40
            $('#agGridTable').height(H)
        }
        
      
    }
}
</script>
<style scoped>
.main{
    width:100%
}
.main-top{
    width:100%;
    padding:0 10px 0 10px;
    height:50px;
    line-break: 50px;
    display:flex;
    justify-content: space-between
}
.is-full-width{
    width: 100%;
    padding:0px 20px 20px 20px
}
.page-box{
      margin:0 0 120px 10px;
}
.rowStyle{
    background: red
}
</style>