<template>
    <!--仓库管理-->
    <div>
        <div class="units-box">

        <!--顶部的按钮-->
        <div class="btns-box">
             <div style='margin-left:10px;display:flex;'>
                <div class="wldw1">
                    <span style="width:42px;font-weight:900">{{$t('public.screen')}}：</span><!--筛选-->
                     <Select style="width:100px" v-model='typeTOP' :placeholder="$t('public.all')" @on-change="orderselectedTop">
                        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <Input style='margin-top:8px;width:300px' v-model='keyword' :placeholder="$t('public.codeandname')">
                    <span slot="append"  @click='searchStore' style='cursor:pointer'>{{$t('public.search')}}</span><!--搜索-->
                </Input>
                <!-- <a style='font-size:14px;font-weight:600;margin-left:20px;margin-right:10px;border-bottom:1px solid #3b77e3;height:40px' @click='lsearch'>{{$t('public.PreciseSearch')}}</a>精准搜索 -->
            </div>

            <div style='margin-right: 10px;'>
                <Button shape="circle" type="ghost" @click="gotoAdd" style='border:none;background:#3b77e3;color:#fff'>
                     <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}<!--新建-->
                </Button>
                <!-- <Button type="ghost" shape="circle" style="margin-right:5px;border:none;background:#3b77e3;color:#fff"  @click="storeImport"><Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.import')}}</Button>导入-->
                <!-- 更多-->
                <Dropdown trigger="click">
                        <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">{{$t('public.more')}}
                            <!--更多-->
                        <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
                    </Button>
                    <DropdownMenu slot="list">
                        <span @click="startUser"><DropdownItem >{{$t('public.start')}}</DropdownItem></span>
                        <span @click="stopUser"><DropdownItem >{{$t('public.stop')}}</DropdownItem></span>
                        <span  @click="delUser"><DropdownItem >{{$t('public.del')}}</DropdownItem></span>

                    </DropdownMenu>
                 </Dropdown>
            </div>

        </div>
        <!--表格数据-->
        <div class="table">
            <Table border ref="selection" highlight-row :columns="columns" :data="storeList" @on-row-dblclick="dbl"  @on-row-click='clickOneRow'></Table>
            <!--底部的分页-->
        <div class="page-box" v-if='total!=0'>
             <Page :total="total" size='small' show-total placement='top' show-sizer :page-size-opts="[10,20,30,40,50]" :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
        </div>
        </div>
    </div>
    
    <!--精准搜索-->
    <Modal v-model="psisshow" width="360px">
        <p slot="header" style="height:30px;line-height:30px;text-align:center">
           <!--精准搜索-->
          <span>{{$t('public.PreciseSearch')}}</span>
        </p>
         <Form :label-width="60">

            <FormItem :label="$t('manage.warehouse.Name')" ><!--名称-->
               <Input v-model='ckName' ></Input>
            </FormItem>
            <FormItem :label="$t('manage.warehouse.Code')" ><!--编码-->
               <Input v-model='ckcode' ></Input>
            </FormItem>
            <FormItem :label="$t('manage.warehouse.Person')" ><!--联系人-->
               <Input v-model='person' ></Input>
            </FormItem>
            <FormItem :label="$t('manage.warehouse.Mobile')" ><!--手机-->
               <Input v-model='phone' ></Input>
            </FormItem>
        </Form>
        <div slot="footer">
          <div class='footer-mark'>
            <span><a style='color:#999;font-size:14px' @click='cancelSearchLocation'>{{$t('public.cancel')}}</a></span><!--取消-->
            <span style='font-size:20px;width:1px;height:40px;background:#e4e4e4'></span>
            <span ><a style='color:#3B77E3;font-size:14px' @click='sureSearchLocation'>{{$t('public.sureBtn')}}</a></span><!--确认-->
          </div>
        </div>
      </Modal>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                //精准搜索
                ckName:'',
                ckcode:'',
                person:'',
                phone:'',
                psisshow:false,
               

                errorisshow:false,
                error:'',//导入失败的提示
                keyword:'',//头部搜索
                uid:this.$store.state.common.token,
                actionUrl:'http://dev.zsydian.com/pss/warehouse/import?uid='+this.$store.state.common.token,//导入地址
                status:'',//上传状态

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
                //导入的仓库文件数据key
                importstore:[
                    {
                        title:this.$t('manage.warehouse.Code'),//"编号",
                        key:'code',
                    },
                    {
                        title:this.$t('manage.warehouse.Name'),//"名称",
                        ellipsis:true,
                        key:'name',

                    },

                     {
                        title:this.$t('manage.warehouse.Person'),//"联系人",
                        ellipsis:true,
                        key:"person",
                        align:'center'
                    },

                     {
                        title:this.$t('manage.warehouse.Tel'),//"电话",
                        ellipsis:true,
                        key:"tel",
                        align:'center'
                    },

                     {
                        title:this.$t('manage.warehouse.Mobile'),//"手机",
                        ellipsis:true,
                        key:"phone",
                        align:'center'
                    },

                     {
                        title:this.$t('manage.warehouse.Address'),//"地址",
                        key:'address',
                    },
                     {
                        title:this.$t('public.remark'),//"备注",
                        key:'remark',
                    },
                ],
                importstoredataList:[],//导入的仓库文件数据
                isLoading:true,
                typeTOP:1,
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
                storeList: [],
                columns:[

                    {
                        title:'',
                        key:'img',
                        width:80,
                        render:(h, params) =>{
                            return h('div',[
                                h('img',{
                                    attrs:{
                                        src:params.row.img
                                    },
                                    style:{
                                        width:'40px',
                                        height:'40px'
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title:this.$t('manage.warehouse.Code'),//"编码",
                        key:"code",
                    },
                    {
                        title:this.$t('manage.warehouse.Name'),//"名称",
                        key:'name',
                    },
                    {
                        title:'是否默认',
                        align:'center',
                        key:'defaultDesc',
                    },
                    {
                        title:this.$t('manage.warehouse.fl'),//"类型",
                        key:"category",
                        align:'center'
                    },
                     {
                        title:this.$t('manage.warehouse.Person'),//"联系人",
                        key:"person",
                        align:'center'
                    },
                    {
                        title:this.$t('manage.warehouse.Tel'),//"电话",
                        key:"tel",
                        align:'center'
                    },
                    {
                        title:this.$t('manage.warehouse.Mobile'),//"手机",
                        key:"phone",
                        align:'center'
                    },
                    {
                        title:this.$t('manage.warehouse.Address'),//"地址",
                        key:"Raddress",
                        align:'center'
                    },
                    {
                        title:this.$t('public.status'),//"状态",
                        width:120,
                        align:'center',
                        key:"statusDesc",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    fontWeight:'900',
                                    color:params.row.status==1?'#40ca98':params.row.status==0?'#3b77e3':params.row.status==99?'#d53c39':params.row.status==9999?"#d53c39":""
                                }
                            },params.row.statusDesc)
                        }
                    }
                ],
                pageSize:0,
                pageNum: '',

                total:0,
                pageNum:'',
                valId:'',
            }
        },
        methods: {
            gotoAdd: function() {
                this.$router.push({
                    path: '/addstore'
                });
            },
            //双击表格一行
            dbl(row,index){
                 this.isLoading = true
                this.$router.push({
                    path:'/addstore',
                    query:{
                        id:row.id,
                        index:index,
                        s:row.status
                    }
                })
            },
            //获取仓库列表
            getStoreList(s) {
                this.axios.get('/warehouse/query?uid='+this.uid+'&status='+s).then((res) => {
                    if(res.data.status==200){
                        let data = res.data.rows;
                        this.storeList = data;
                        this.total=res.data.total
                        this.pageSize=res.data.pageSize
                        this.storeList.forEach(x=>{
                            x.Raddress=x.province+x.city
                            if(x.default){
                                x.defaultDesc="是"
                            }else{
                                x.defaultDesc="否"
                            }
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
                           
                            if(x.logo==null || x.logo==''){
                                x.img=''
                            }else{
                                x.img=x.logo.split(',')[0]
                            }
                        })

                    }

                })
            },
            //单击某一行时
            clickOneRow(row,index){
                //获取id
                this.valId=row.id
                this.storeList[index]._checked=true
                // row._checked=true
                console.log(row)
            },
            //点击停用用户
            stopUser: function() {
                if(this.valId==''){
                    this.$notify({
                        title:"",//
                        message: this.$t('public.errorOneData'),
                        type: 'error',
                        position: 'bottom-right'
                    });
                }else{
                    this.axios.post('/warehouse/disabled/' + this.valId + '?uid=' + this.uid).then((res) => {
                        if(res.data.status == 200) {
                           this.$notify({
                                title:"",//
                                message:this.$t('public.normalT'),//
                                type: 'success',
                                position: 'bottom-right'
                            });
                            this.getStoreList(1);
                            this.valId=''
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
            //启用用户
            startUser: function() {
                if(this.valId==''){

                    this.$notify({
                        title:"",//
                        message: this.$t('public.errorOneData'),
                        type: 'error',
                        position: 'bottom-right'
                    });
                }else{
                    this.axios.post('/warehouse/enabled/' + this.valId + '?uid=' + this.uid).then((res) => {
                        if(res.data.status == 200) {
                            this.$notify({
                                title:"",//
                                message:this.$t('public.normalS'),//
                                type: 'success',
                                position: 'bottom-right'
                            });
                            this.getStoreList(1);
                            this.valId=''
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
                if(this.valId==''){

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
                                this.axios.delete('/warehouse/delete/'+this.valId+'?uid=' + this.uid).then((res) => {
                                    if(res.data.status == 200) {
                                        this.$notify({
                                            title:"",//
                                            message:this.$t('public.deleteSuccess'),//
                                            type: 'success',
                                            position: 'bottom-right'
                                        });
                                        this.getStoreList(1);
                                        this.valId=''
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
                            onCancel: () => {
                                this.$notify({
                                    title: '取消删除',
                                    message: '取消删除成功',
                                    type: 'success',
                                    position: 'bottom-right'
                                });

                            }
                        });
                }

            },

            //切换一条页
            getData(current){
                this.axios.get('warehouse/query?offset='+current+'&uid='+this.uid+'&status='+this.typeTOP).then((res)=>{
                   let data = res.data.rows;
                        this.storeList = data;
                        this.total=res.data.total
                        this.pageSize=res.data.pageSize
                        this.storeList.forEach(x=>{
                            x.Raddress=x.province+x.city
                            if(x.default){
                                x.defaultDesc="是"
                            }else{
                                x.defaultDesc="否"
                            }
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
                          
                            if(x.logo==null || x.logo==''){
                                x.img=''
                            }else{
                                x.img=x.logo.split(',')[0]
                            }
                        })

                })

            },
            //翻页
            changePageSize(size){
                this.pageSize = size
                this.axios.get('warehouse/query?length='+size+'&uid='+this.uid+'&status='+this.typeTOP).then((res)=>{
                   let data = res.data.rows;
                        this.storeList = data;
                        this.total=res.data.total
                        this.pageSize=res.data.pageSize
                        this.storeList.forEach(x=>{
                            x.Raddress=x.province+x.city
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
                            
                            if(x.logo==null || x.logo==''){
                                x.img=''
                            }else{
                                x.img=x.logo.split(',')[0]
                            }
                        })

                })
            },

            clear(){

            },
            //查询仓库
           searchStore(){
              this.axios.get('/warehouse/query?keyword='+this.keyword+'&uid='+this.uid).then((res) => {
                if(res.data.status==200){
                    let data = res.data.rows;
                        this.storeList = data;
                        this.total=res.data.total
                        this.pageSize=res.data.pageSize
                        this.storeList.forEach(x=>{
                            x.Raddress=x.province+x.city
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
                          
                            if(x.logo==null || x.logo==''){
                                x.img=''
                            }else{
                                x.img=x.logo.split(',')[0]
                            }
                        })
                }
            })
           },
           //点击精准搜索
           lsearch(){
            this.ckName=''
            this.ckcode=''
            this.person=''
            this.phone=''
            this.psisshow=true
           },
           //精准搜索取消
           cancelSearchLocation(){
            this.ckName=''
            this.ckcode=''
            this.person=''
            this.phone=''
            this.psisshow=false
           },
           //精准搜索确认
           sureSearchLocation(){
            this.axios.get('/warehouse/query?uid='+this.uid,{
                name:this.ckName,
                code:this.ckcode,
                person:this.person,
                phone:this.phone
            }).then((res) => {
                if(res.data.status==200){
                    let data = res.data;
                    this.storeList = data.rows;
                    this.pageSize = data.pageSize;
                    this.total=data.total;
                    this.psisshow=false
                    this.storeList.forEach(x=>{
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
              this.type=value
            },
            //下拉框选择
            orderselectedTop(value){
                this.typeTOP=value
                this.getStoreList(value);
            },
        },
        mounted() {
            this.getStoreList(1);
        }
    }
</script>

<style lang='css' scoped>
   .units-box {
        width: 100%;
        /*height: 100%;*/
        background: #fff;

    }
    .btns-box {

        width: 100%;
        height: 50px;
        display:flex;
        justify-content: space-between;

        line-height: 50px;
    }
    .wldw {
        font-size: 12px;
        color: #585858;
        margin-left:10px;
    }
    .wldw1{
        margin-right:20px;
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
    .table {
     margin:0 10px 120px 10px;
    }

    .page-box {
        text-align: center;
        margin-top:5px;
        margin-bottom:120px;
    }
    /***气泡提示样式设置***/

    .qp-con {
        width: 100%;
        height: 30px;
        color: #0d0d0d;
        font-size: 14px;
        line-height: 30px;
        cursor: pointer;
    }

    .qp-con img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
    }
</style>
<style>
    .ivu-poptip-popper {
        min-width: 60px !important;
    }

</style>
