<template>
    <!--仓库管理-->
    <div>
     
    <div class="units-box">
        
        <!--顶部的按钮-->
        <div class="btns-box">
            <div class="wldw">
                <div >
                <span style="width:42px;font-weight:900;">{{$t('public.screen')}}：</span>
                 <Select style="width:100px;margin-right:20px" v-model='valueT' :placeholder="$t('public.all')" @on-change="orderselected">
                    <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </div>
                <Input style='margin-top:10px;width:400px' v-model='keyword' :placeholder="$t('public.codeandname')" @on-enter='entersSearch' >
                    <span slot="append"  @click='search' style='cursor:pointer'>{{$t('public.search')}}</span>
                </Input>
            </div>
            <div class="right" >
                <Button shape="circle" type="ghost" @click="gotoAdd" style="border:none;background:#3b77e3;color:#fff">
                     <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}
                </Button>
                <!-- 更多-->
               
                <Dropdown trigger="click" >
                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">{{$t('public.more')}}
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
            <Table border ref="selection" highlight-row :columns="columns" :data="storeList" @on-row-dblclick="dbl"  @on-row-click='clickRow'></Table>
            <!--底部的分页-->
        <div class="page-box">
             <Page :total="total" size='small'  show-total show-total placement='top' show-sizer :page-size-opts="[10,20,30,40,50]"  :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
        </div>
        </div>
    </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
               keyword:'',
                storeList: [],
                pageSize: 0,
                pageNum: '',
                uid:this.$store.state.common.token,
                total:0,
                pageNum:'',
                valId:'',
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
                columns:[

                    {
                        title:"Logo",
                        width:80,
                        key:"logDesc",
                        render:(h, params) =>{
                            return h('div',[
                                h('img',{
                                    attrs:{
                                        src:params.row.logDesc
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
                        title:this.$t('manage.store.Code'),//"编码",
                     
                        key:"code"
                    },
                    {
                        title:this.$t('manage.store.Name'),//"名称",
                      
                        key:"name"
                    },
                     
                     {
                        title:this.$t('manage.store.Person'),//"联系人",
                        
                        key:"person"
                    },
                    {
                        title:this.$t('manage.store.Mobile'),//"手机",
                      
                        key:"phone"
                    },
                     {
                        title:this.$t('manage.store.time'),//"营业时间",
                        
                        key:"businessHours"
                    },
                    {
                        title:this.$t('manage.store.Address'),//"地址",
                       
                        key:"Raddress"
                    },
                     {
                        title:this.$t('public.status'),//"状态",
                      
                        width:120,
                        key:"statusDesc",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:params.row.status==1?'#40ca98':params.row.status==0?'#3b77e3':params.row.status==99?'#d53c39':params.row.status==9999?"#d53c39":""
                                }
                            },params.row.statusDesc)
                        }
                    },
                ]
            }
        },
        methods: {
            gotoAdd: function() {
                this.$router.push({
                    path: '/ShopAdd'
                });
            },
           
            //双击表格一行
            dbl(row,index){
                this.$router.push({
                    path:'/ShopAdd',
                    query:{
                        id:row.id,
                        index:index,
                        s:row.status
                    }
                })
            },
            //获取店铺列表
            getStoreList(s) {
                this.axios.get('/store/query?uid='+this.uid+'&status='+s).then((res) => {
                    if(res.data.status==200){
                       
                        let data = res.data;
                        this.storeList = data.rows;
                        this.pageSize = data.pageSize;
                        this.total=data.total;
                        this.storeList.forEach((x)=>{
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
                            if(x.default==false){
                                x.default='否'
                            }else{
                                x.default='是'
                            }
                            if(x.logo==null || x.logo==''){
                                x.logDesc=''
                            }else{
                                x.logDesc=x.logo.split(',')[0]
                            }
                   

                        })
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
            //单击某一行
            clickRow(data){
                this.valId=data.id
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
                     this.axios.post('/store/disabled/' + this.valId + '?uid=' + this.uid).then((res) => {
                        if(res.data.status == 200) {
                             this.$notify({
                                title:"",//
                                message:this.$t('public.normalT'),//
                                type: 'success',
                                position: 'bottom-right'
                            });
                            this.getStoreList(this.valueT);
                            this.valId=''
                            
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
            //启用用户
            startUser() {
                if(this.valId==''){
                    this.$notify({
                        title:"",//
                        message: this.$t('public.errorOneData'),
                        type: 'error',
                        position: 'bottom-right'
                    });
                }else{
                    this.axios.post('/store/enabled/' + this.valId + '?uid=' + this.uid).then((res) => {
                        if(res.data.status == 200) {
                            this.$notify({
                                title:"",//
                                message:this.$t('public.normalS'),//
                                type: 'success',
                                position: 'bottom-right'
                            });
                            this.getStoreList(this.valueT);
                            this.valId=''
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
            //删除门店
            delUser() {
                if(this.valId==''){
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
                                this.axios.delete('/store/delete/'+this.valId+'?uid=' + this.uid).then((res) => {
                                    if(res.data.status == 200) {
                                        this.$notify({
                                            title:"",//
                                            message: this.$t('public.deleteSuccess'),//
                                            type: 'success',
                                            position: 'bottom-right'
                                        });
                                    this.getStoreList(this.valueT);
                                    this.valId=''
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
                this.axios.get('store/query?offset='+current+'&uid='+this.uid+'&status='+this.valueT).then((res)=>{
               
                    this.storeList = res.data.rows
                    let data=res.data
                    this.pageSize = data.pageSize;
                    this.total=data.total;
                    this.storeList.forEach((x)=>{
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
                            if(x.default==false){
                                x.default='否'
                            }else{
                                x.default='是'
                            }
                            if(x.logo==null || x.logo==''){
                                x.logDesc=''
                            }else{
                                x.logDesc=x.logo.split(',')[0]
                            }
                           
                        })
                })
                
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
                this.axios.get('store/query?length='+size+'&uid='+this.uid+'&status='+this.valueT).then((res)=>{
               
                    this.storeList = res.data.rows
                    let data=res.data
                    this.pageSize = data.pageSize;
                    this.total=data.total;
                    this.storeList.forEach((x)=>{
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
                            if(x.default==false){
                                x.default='否'
                            }else{
                                x.default='是'
                            }
                            if(x.logo==null || x.logo==''){
                                x.logDesc=''
                            }else{
                                x.logDesc=x.logo.split(',')[0]
                            }
                          
                        })
                })
            },
            //搜索店铺
            search(){
               this.axios.get('store/query?keyword='+this.keyword+'&uid='+this.uid).then((res)=>{
                    if(res.data.status==200){
                        let data = res.data;
                        this.storeList = data.rows;
                        this.pageSize = data.pageSize;
                        this.total=data.total;
                        this.storeList.forEach((x)=>{
                            x.Raddress=x.province+x.city
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
                            if(x.default==false){
                                x.default='否'
                            }else{
                                x.default='是'
                            }
                           
                            if(x.logo==null || x.logo==''){
                                x.logDesc=''
                            }else{
                                x.logDesc=x.logo.split(',')[0]
                            }
                           
                        })
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
            entersSearch(){
                this.search()
            },
             //下拉框选择
            orderselected(value){
                this.valueT=value
                this.getStoreList(this.valueT);
            },
        },

        //路由拦截查看是否创建店铺
        // beforeRouteEnter(to, from, next) {
        //     next(vm=>{
        //         vm.axios.get('setting/role?uid='+vm.uid).then(res=>{

        //             if(res.data.rows.length==0){
                       
        //                 vm.$router.push('ShopHomePage')

        //             }else{
        //               next()
        //             }
        //         })
        //     })
            
        // },
        mounted() {
           this.getStoreList(this.valueT);
        }
    }
</script>

<style lang='css' scoped>
    .units-box {
        width: 100%;
        height: 100%;
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
        display: flex;
        font-size: 14px;
        color: #585858;
        margin-left:10px;
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