<template>
    <div class='main'>

        <div class="main-top">
            <div style='display:flex'>
                <!-- <mu-select  @change='selectChange' v-model="value" full-width style="width:200px">
                    <mu-option ripple v-for="(item,index)  in orderListname"
                     :key="index" :label="item.label"
                     :value="item.value"></mu-option>
                </mu-select>
                <mu-text-field v-model="keyword" style='width:300px;flex:0 0 300px;margin-bottom:0' @keyup.enter='enter' placeholder='请输入关键词'></mu-text-field> -->
                <Select style="width:100px;margin-right:10px;margin-top: 15px;" v-model='value' :placeholder="$t('public.all')" @on-change="selectChange">
                    <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <!-- <mu-text-field v-model="keyword" style='width:300px;margin-bottom:0' @keyup.enter='enter' placeholder='请输入关键词'></mu-text-field> -->
                <div style='margin-right:20px;display:flex'>
                    <Input style=';margin-top: 15px;;width:300px' v-model='keyword' placeholder="请输入单号或名称" @on-enter='enter'>
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
        <!-- <div v-if='loadingisshow' >
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
        :enableSorting="true"
        :enableFilter="true"
        ></ag-grid-vue>
      <div class='page-box'>
            <Page :total="total" size='small' show-total :pageSize='pageSize'  @on-change="changeSize"></Page>
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
                    :gridOptions="gridstore"
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
import * as DateUtil from '@/utils/DateUtil'
import { AgGridVue } from "ag-grid-vue";
export default {
    components:{
        AgGridVue
    },
    data(){
        return {
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
            loadingisshow:false,
            gridstore:{
                enableFilter:true,
                enableSorting:true,
                animateRows:true,
                rowHeight:40,
                // pagination: true,
                enableColResize:true,
            },
            btime:"",
            etime:"",
            grid:{
                
                enableFilter:true,
                enableSorting:true,
                animateRows:true,
                rowHeight:40,
                rowSelection: 'single',
                // pagination: true,
                floatingFilter: true,
                enableColResize:true,
               
                
            },
            rowData:[],
            dataKey:[],
            keyword:"",//搜索词
            rowId:"",//一行id
            current:1,
            uid: this.$store.state.common.token,
            total:0,
            pageSize:0,

            skuLoad:LoadUrl.actionLoad.wordOrder,//工单导入模板
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
            importType:1,
            importStoreType:[
                {
                    value:1,
                    label:'Excel'
                }
            ],
            // /workOrder/import 导入
            actionUrl:LoadUrl.httpPrefix.Url+'workOrder/import?uid='+this.$store.state.common.token,//导入地址
            //导入的商品文件数据key
            importstore:[
              
                {
                    headerName: "编号",
                    field: "code"
                },
                {
                    headerName: "记录方式",
                    field: "reportType",
                },
                {
                    headerName: "护理员",
                    field: "caregiversName"
                },
                {
                    headerName: "护理手机",
                    field: "caregiversMobile",
                    editable: true,
                    cellRenderer:'agAnimateShowChangeCellRenderer'
                },
                {
                    headerName: "客户姓名",
                    field: "auntName"
                },
                {
                    headerName: "客户手机",
                    field: "auntMobile"
                },
                {
                    headerName: "开始时间",
                    field: "startTime"
                },
                {
                    headerName: "结束时间",
                    field: "endTime"
                },
                {
                    headerName: "实际开始时间",
                    field: "actStartTime"
                },
                {
                    headerName: "实际结束时间",
                    field: "actEndTime"
                },
                {
                    headerName: "状态",
                    field: "statusDesc"
                    
                }
            ],
            importstoredataList:[],//导入的文件数据
        }
    },
    methods:{
        selectChange(s){
            this.value=s
            this.getUnitsList(this.value)
        },
        //开始时间
        changebtime(d){
            this.btime=d
        },
        //结束时间
        changeetime(d){
            this.etime=d
        },
        //双击
        dblClick(row){
            this.$router.push({
                path:'/addWordOrder',
                query:{
                    id:row.data.id,
                    index:row.rowIndex,
                    s:row.data.status 
                }
            })
        },
         mouseDown(row){
            this.$router.push({
                path:'/addattendant',
                query:{
                    id:row.data.id,
                    index:row.rowIndex,
                    s:row.data.status
                }
            })
        },
        add(){
            this.$router.push('/addWordOrder')
        },
        search(){
            this.axios.get('/workOrder/query?keyword='+this.keyword+'&uid=' + this.uid+'&length=500').then((res) => {
                let data = res.data;
                if(res.data.status == '200') {
                    this.rowData = data.rows;
                    this.pageSize = data.pageSize;
                    this.total = data.total;
                    this.rowData.forEach(x=>{
                        this.getWeek(x)
                        if(x.reportType==0){
                            x.reportType='系统'
                        }else{
                            x.reportType='手动'
                        }
                        
                        x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                       if(x.startTime==undefined || x.startTime==''){
                            x.startTime=''
                        }else{
                             x.startTime=new Date(parseInt(x.startTime)).toTimeString().substring(0, 5)
                        }
                        if(x.endTime==undefined || x.endTime==''){
                            x.endTime=''
                        }else{
                             x.endTime=new Date(parseInt(x.endTime)).toTimeString().substring(0, 5)
                        }


                        if(x.actEndTime==undefined || x.actEndTime==''){
                            x.actEndTime=''
                        }else{
                             x.actEndTime=new Date(parseInt(x.actEndTime)).toTimeString().substring(0, 5)
                        }
                        if(x.actStartTime==undefined || x.actStartTime==''){
                            x.actStartTime=''
                        }else{
                            x.actStartTime=new Date(parseInt(x.actStartTime)).toTimeString().substring(0, 5)
                             
                        }
                    })
                }
            })
        },
        //回车搜索
        enter(){
            this.search()
        },
        //查询
        search(){
            this.axios.get('/workOrder/query?uid=' + this.uid,{
                params:{
                    startTime:this.btime,
                    endTime:this.etime
                }
            }).then((res) => {
                let data = res.data;
                if(res.data.status == '200') {
                    this.rowData = data.rows;
                    this.pageSize = data.pageSize;
                    this.total = data.total;
                    this.rowData.forEach(x=>{
                        this.getWeek(x)
                        if(x.reportType==0){
                            x.reportType='系统'
                        }else{
                            x.reportType='手动'
                        }
                       x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        if(x.startTime==undefined || x.startTime==''){
                            x.startTime=''
                        }else{
                             x.startTime=new Date(parseInt(x.startTime)).toTimeString().substring(0, 5)
                        }
                        if(x.endTime==undefined || x.endTime==''){
                            x.endTime=''
                        }else{
                             x.endTime=new Date(parseInt(x.endTime)).toTimeString().substring(0, 5)
                        }


                        if(x.actEndTime==undefined || x.actEndTime==''){
                            x.actEndTime=''
                        }else{
                             x.actEndTime=new Date(parseInt(x.actEndTime)).toTimeString().substring(0, 5)
                        }
                        if(x.actStartTime==undefined || x.actStartTime==''){
                            x.actStartTime=''
                        }else{
                            x.actStartTime=new Date(parseInt(x.actStartTime)).toTimeString().substring(0, 5)
                             
                        }
                    })
                }
            })
        },
       //GET /workOrder/query 工单清单
        getUnitsList(s){
            this.loadingisshow=true
            this.axios.get('/workOrder/query?length=500&uid=' + this.uid+'&status='+s).then((res) => {
                let data = res.data;
                if(res.data.status == '200') {
                    this.loadingisshow=false
                    this.rowData = data.rows;
                    this.pageSize = data.pageSize;
                    this.total = data.total;
                    this.rowData.forEach(x=>{
                        this.getWeek(x)
                        if(x.reportType==0){
                            x.reportType='系统'
                        }else{
                            x.reportType='手动'
                        }

                        x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        if(x.startTime==undefined || x.startTime==''){
                            x.startTime=''
                        }else{
                             x.startTime=new Date(parseInt(x.startTime)).toTimeString().substring(0, 5)
                        }
                        if(x.endTime==undefined || x.endTime==''){
                            x.endTime=''
                        }else{
                             x.endTime=new Date(parseInt(x.endTime)).toTimeString().substring(0, 5)
                        }


                        if(x.actEndTime==undefined || x.actEndTime==''){
                            x.actEndTime=''
                        }else{
                             x.actEndTime=new Date(parseInt(x.actEndTime)).toTimeString().substring(0, 5)
                        }
                        if(x.actStartTime==undefined || x.actStartTime==''){
                            x.actStartTime=''
                        }else{
                            x.actStartTime=new Date(parseInt(x.actStartTime)).toTimeString().substring(0, 5)
                             
                        }
                    })
                }
            })
        },
        //页码改变
        changeSize(size){
            this.current=size
            this.axios.get('/workOrder/query?length=500&offset='+this.current+'&uid=' + this.uid).then((res) => {
                let data = res.data;
                if(res.data.status == '200') {
                    this.rowData = data.rows;
                    this.pageSize = data.pageSize;
                    this.total = data.total;
                    this.rowData.forEach(x=>{
                        this.getWeek(x)
                        if(x.reportType==0){
                            x.reportType='系统'
                        }else{
                            x.reportType='手动'
                        }
                        x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                       if(x.startTime==undefined || x.startTime==''){
                            x.startTime=''
                        }else{
                             x.startTime=new Date(parseInt(x.startTime)).toTimeString().substring(0, 5)
                        }
                        if(x.endTime==undefined || x.endTime==''){
                            x.endTime=''
                        }else{
                             x.endTime=new Date(parseInt(x.endTime)).toTimeString().substring(0, 5)
                        }


                        if(x.actEndTime==undefined || x.actEndTime==''){
                            x.actEndTime=''
                        }else{
                             x.actEndTime=new Date(parseInt(x.actEndTime)).toTimeString().substring(0, 5)
                        }
                        if(x.actStartTime==undefined || x.actStartTime==''){
                            x.actStartTime=''
                        }else{
                            x.actStartTime=new Date(parseInt(x.actStartTime)).toTimeString().substring(0, 5)
                             
                        }
                    })
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
            //进入第二
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
        //导出GET /workOrder/excel 导出
            storeExport(){
                this.axios.get('/workOrder/excel?uid='+this.uid).then(res=>{
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
        getUnitsListP(s,startTime,endTime){
            this.loadingisshow=true
            this.axios.get('/workOrder/query?length=500&uid=' + this.uid+'&status='+s+'&startTime='+startTime+'&endTimeTime='+endTime).then((res) => {
                let data = res.data;
                if(res.data.status == '200') {
                    this.loadingisshow=false
                    this.rowData = data.rows;
                    this.pageSize = data.pageSize;
                    this.total = data.total;
                    this.rowData.forEach(x=>{
                        this.getWeek(x)
                        if(x.reportType==0){
                            x.reportType='系统'
                        }else{
                            x.reportType='手动'
                        }

                        x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                        if(x.startTime==undefined || x.startTime==''){
                            x.startTime=''
                        }else{
                             x.startTime=new Date(parseInt(x.startTime)).toTimeString().substring(0, 5)
                        }
                        if(x.endTime==undefined || x.endTime==''){
                            x.endTime=''
                        }else{
                             x.endTime=new Date(parseInt(x.endTime)).toTimeString().substring(0, 5)
                        }


                        if(x.actEndTime==undefined || x.actEndTime==''){
                            x.actEndTime=''
                        }else{
                             x.actEndTime=new Date(parseInt(x.actEndTime)).toTimeString().substring(0, 5)
                        }
                        if(x.actStartTime==undefined || x.actStartTime==''){
                            x.actStartTime=''
                        }else{
                            x.actStartTime=new Date(parseInt(x.actStartTime)).toTimeString().substring(0, 5)
                             
                        }
                        
                        
                    })
                }
            })
        },
       
    },
    //实例挂在之前
    beforeMount(){
       this.dataKey=[
                {
                    headerName: "工单号",
                    field: "code",
                     suppressSizeToFit: true,
                     width:120,
                     pinned: 'left'
                },
                
                {
                    headerName: "护理员",
                    field: "caregiversName",
                    width:120,
                     suppressSizeToFit: true,
                },
                {
                    headerName: "护理手机",
                    field: "caregiversMobile",
                    width:120,
                     suppressSizeToFit: true,
                    
                },
                {
                    headerName: "客户姓名",
                    width:120,
                     suppressSizeToFit: true,
                    field: "auntName"
                },
                {
                    headerName: "客户手机",
                    width:120,
                     suppressSizeToFit: true,
                    field: "auntMobile"
                },
                {
                    headerName: "开始时间",
                    width:120,
                     suppressSizeToFit: true,
                    field: "startTime",
                    cellStyle: function(params) {
                        return {background:"#008222",color:"#fff"}
                    }
                },
                {
                    headerName: "结束时间",
                    width:120,
                     suppressSizeToFit: true,
                    field: "endTime"
                },
                 {
                    headerName: "实际开始时间",
                    width:120,
                     suppressSizeToFit: true,
                    field: "actStartTime",
                    cellStyle: function(params) {
                        return {background:"#008222",color:"#fff"}
                    }
                },
                {
                    headerName: "实际结束时间",
                    width:120,
                     suppressSizeToFit: true,
                    field: "actEndTime"
                },
                {
                    headerName:"日期",
                   
                    field:"createTime"
                },
                {
                    headerName: "状态",
                     suppressSizeToFit: true,
                     width:80,
                    field: "statusDesc",
                    pinned: 'right',
                    cellStyle: function(params) {
                        switch(params.data.status){
                            case 1:
                                return {color:"#3b77e3"}
                            break;
                            case 2:
                                return {color:"#FF7D16"}
                            break;
                            case 3:
                                return {color:"#03733F"}
                            break;
                            case 5:
                                return {color:"#d53c39"}
                            break;
                            case 8:
                                return {color:"#40ca98"}
                            break;
                            case 9:
                                return {color:"#d53c39"}
                            break;
                        }
                    }
                }
            ]


    },   
    mounted(){
        console.log(DateUtil.getWeekStartDate())//本周第一天
        if(this.$route.query.index==0){
            this.value=8
            this.getUnitsListP(this.value,this.getLocalTime(new Date()),null)
        }else if(this.$route.query.index==1){
            this.value=8
            this.getUnitsListP(this.value,DateUtil.getWeekStartDate(),this.getLocalTime(new Date()))
        }else{
            this.getUnitsList(this.value)
            this.grid.api.sizeColumnsToFit()
        }
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

.page-box{
    margin:0 0 120px 10px;
}
.rowStyle{
    background: red
}
</style>