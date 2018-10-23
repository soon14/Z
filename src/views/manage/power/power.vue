<template>
    <!--用户-->
    <div class="employee-box">
        <div class='employee-left'>
            <div class='left-top'><span style='font-size:18px;font-weight:600;margin-left:10px'>{{$t('manage.power.powerManage')}}</span><!--权限管理-->
                <span style='margin-right:10px'><a @click='addpower'>+ {{$t('manage.power.add')}}</a></span><!--新增-->
            </div>
            <div>
                <Scroll :on-reach-bottom="handleReachEdge" :height="height" >
                    <li @click='clickAllPower()' style='cursor:pointer' :class="{bg1:numIndex1==0}"><span>{{$t('manage.power.allpower')}}</span></li><!--所有权限-->
                    <li v-for='(item,index) in Allqx' :key='index' @click='addBg(item,index)' :class="{bg:numIndex==index}" style='display:flex;justify-content: space-between' class='flclass'>
                        <div style='margin-left:10px'>{{item.name}}</div>
                        <div style='margin-right:10px'>
                            <span  @click.stop='edit(item,index)' class='edit'>
                                <Icon type="edit" style='color:#d53c39;cursor:pointer' v-if='numIndex==index'></Icon>
                                <Icon type="edit" style='color:#ccc;cursor:pointer' v-else></Icon>
                            </span>
                            <span  @click.stop='delqx(index,item.id)'>
                                <Icon type="trash-a" style='color:#ccc;cursor:pointer'></Icon>
                            </span>
                        </div>
                    </li>
                </Scroll>
            </div>
        </div>
        <div style='width:3px;background: rgb(230,233,236);flex:0 0 3px'></div>
        <div class='employee-right'>
            <!--顶部的按钮-->
            <div class="btns-box" >
                <div class="wldw">
                    <div v-if='istrue' style="display:flex">
                        <span style="width:42px;font-weight:900">{{$t('public.screen')}}：</span><!--筛选-->
                         <Select style="width:100px;margin-top: 11px;margin-right:10px" v-model='valueT' placeholder="全部"  @on-change="orderselected">
                            <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <!--员工搜索-->
                        <Input style='margin-top:10px;width:300px' v-model='keyword' :placeholder="$t('public.nameandphone')" @on-enter='entersSearchNewSku' v-if='istrue'>
                            <span slot="append"  @click='searchNewSku' style='cursor:pointer'>{{$t('public.search')}}</span><!--搜索-->
                        </Input>
                    </div>
                    

                    <!--权限名称-->
                    <span style='display:block;margin-top:-5px'>
                    <Input style='margin-top:10px;margin-left:10px;width:300px' v-model='name' :maxlength="6" v-if='qxisshow'>
                    </Input>
                    </span>
                    <!--新增权限名称-->
                    <span style='display:block;margin-top:-5px'>
                    <Input style='margin-top:10px;margin-left:10px;width:300px' :maxlength="6" v-model='addname' placeholder="请输入权限名称(最大6个字符)" v-if='addisshow'><!--请输入权限名称-->
                    </Input>
                    </span>
                </div>
                
                <div style='margin-right:10px;'>
                    
                    <Button type="ghost" shape="circle" style="border:none;background:#3b77e3;color:#fff"  @click="gotoAdd" v-if='istrue'><Icon type="plus-round" style="margin-right:5px;color:#fff" ></Icon>{{$t('public.addnew')}}</Button>
                    
                    <Button type="ghost" shape="circle" style="margin-right:5px;border:none;background:#40ca98;color:#fff"  @click="saveEdit" v-if='qxisshow'> <Icon type="edit" style="position:relative;right:5px"></Icon>修改</Button>

                    <!--新建-->
                    <Button type="ghost" shape="circle" style="border:none;background:#3b77e3;color:#fff"  @click="addqx" v-if='addisshow'> <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}</Button>
                    <Button shape="circle"  @click="cancel"  style="background:#999999;color:#fff;margin-right:10px;" v-if='!istrue'><Icon type="close" style="margin-right:5px;"></Icon>{{$t('public.cancel')}}</Button>
                    <!-- <span v-if='qxisshow' @click="cancelHome" style="cursor:pointer;margin-right:10px"><Icon type="close" class="cha" ></Icon></span> -->

                     <!-- 更多-->
                        <Dropdown trigger="click"  v-if='istrue'>
                              <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">
                                {{$t('public.more')}}<!--更多-->
                              <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
                          </Button>

                          <DropdownMenu slot="list">
                              <span  @click="start"><DropdownItem >{{$t('public.start')}}</DropdownItem></span><!--启用-->
                              <span  @click="stop"><DropdownItem >{{$t('public.stop')}}</DropdownItem></span><!--停用-->
                              <span  @click="del"><DropdownItem >{{$t('public.del')}}</DropdownItem></span><!--删除-->
                                <span  @click="passwordRest"><DropdownItem >{{$t('orders.Reset')}}</DropdownItem></span>
                          </DropdownMenu>
                       </Dropdown>
                       
                </div>
            
            
            </div>

            <!--表格数据-->
            <div class="table">
                <div v-show='istrue' style='margin-top:10px'><!-- -->
                    <Table border ref="selection" highlight-row :columns="columns" :data="dataList" @on-row-dblclick="dbl" @on-row-click='onclickrow'></Table>
                    <!--底部的分页-->
                    <div class="page-box">
                         <Page :total="total" show-total size='small' show-sizer :page-size-opts="[10,20,30,40,50]" :pageSize='pageSize' @on-change="getData" @on-page-size-change="changePageSize"></Page>
                    </div>
                </div>
                <!--当前权限列表-->
                <div v-show='qxisshow' class='qxmain'>
                    <div class='legend' >
                        <fieldset v-for='(item, key, n)  in obj' :key='key' class='legend-list'>
                            <legend style='font-weight:600;font-size:14px'> 
                                <Checkbox @on-change='changeCheckboxPre(item,$event)'></Checkbox>
                                {{key}}
                            </legend>
                            <Checkbox v-model="j.checked" v-for='(j,index) in item' :key='index' @on-change='changeCheckbox(j,$event)'>
                                {{j.displayName}}
                            </Checkbox>
                        </fieldset>
                    </div>
                </div>
                <!--新增权限-->
                <div v-show='addisshow' class='qxmain'>
                   
                    <div class='legend' >
                        <fieldset v-for='(item, key, n)  in Addobj' :key='key' class='legend-list'>
                            <legend style='font-weight:600;font-size:14px'> 
                                <Checkbox @on-change='changeCheckboxPreAdd(item,$event)'></Checkbox>
                                {{key}}
                            </legend>
                            <Checkbox v-model="j.checked" v-for='(j,index) in item' :key='index' @on-change='changeCheckboxAdd(j,$event)'>
                                {{j.displayName}}
                            </Checkbox>
                        </fieldset>
                    </div>
                </div>
            </div>
            
            
        </div>
        <!--重置密码-->
        <Modal v-model="passIsshow" width="360"   :mask-closable='false' :closable='false'>
            <p slot="header" style="height:30px;line-height:30px">
              <span>密码重置：</span>
            </p>
            <Form ref="loginformValidate" :model="loginformValidate" :rules="loginruleValidate" :label-width="80">
                <FormItem :label="$t('login.Rpassword')" prop="rpass">
                    <Input type='password' v-model="loginformValidate.rpass" :placeholder="$t('login.RpasswordPlaceholder')"></Input>
                </FormItem>
                <FormItem :label="$t('login.RaginPassword')" prop="repeatpass">
                    <Input type='password' v-model="loginformValidate.repeatpass" :placeholder="$t('login.RaginPasswordPlaceholder')" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <div>
                    <Button shape="circle"
                    type="ghost"
                    style="display:inline-block;background:#ACACAC;border:none;color:#fff"
                    @click='cancelPass'><Icon type="close" style="margin-right:5px;" >
                        </Icon>{{$t('public.cancel')}}</Button>
                    <Button shape="circle" type="ghost"
                    style="display:inline-block;background:#00A7F5;color:#fff"
                    @click="surePss('loginformValidate')"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff">
                        </Icon>{{$t('public.sure')}}</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.loginformValidate.repeatpass !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.loginformValidate.validateField('repeatpass');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.loginformValidate.rpass) {

                    callback(new Error(this.$t('login.oneOrTwoPss')));
                } else {
                    callback();
                }
            };
            return {
                passIsshow:false,
                loginformValidate:{
                    rpass:'',//密码
                    repeatpass:'',//确认密码
                },
                loginruleValidate:{
                    rpass: [
                    { required: true, message: this.$t('login.RpasswordPlaceholder'), trigger: 'blur' },
                    { pattern: /^[0-9a-zA-Z]+$/, message: this.$t('login.RaginPasswordOnum'),trigger: 'blur' },

                    { validator: validatePass, trigger: 'blur' },

                    ],
                    repeatpass: [
                    { required: true, message: this.$t('login.RaginPasswordPlaceholder'), trigger: 'blur' },
                    { pattern: /^[0-9a-zA-Z]+$/, message: this.$t('login.RaginPasswordOnum')},

                    { validator: validatePassCheck, trigger: 'blur' },

                    ],

                },
                numIndex1:0,
                preCheckboxAdd:false,
                subCheckedAdd:'',//子是否选中
                actsAdd:[],
                addname:'',//新增名字
                addisshow:false,//新增
                qxisshow:false,//修改
                is:false,
                istrue:true,//正常
                obj:{},//权限组
                Addobj:{},//新增的所属有权限列表
                name:'',//组名称
                height:'',
                current:1,
                keyword:'',
                numIndex:-1,
                Allqx:[
                    
                ],
                ygID:'',//员工ID
                visible: false,
                dataList: [], //员工列表
                total: 0,
                pageSize: 0,
                valId:"",
                uid: this.$store.state.common.token,
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
                        value:5
                    },
                    {
                        label:"已删除",
                        value:8
                    },

                ],
                columns: [
                    
                    {
                        title:this.$t('manage.power.tableImg'),//"头像",
                        key:"logo",
                         width: 80,
                        align: 'center',
                        render:(h, params) =>{
                            return h('div',[
                                    h('img',{
                                        attrs:{
                                            src:params.row.logo 
                                        },
                                        style:{
                                            width:'40px',
                                            height:'40px',
                                            marginTop:'4px'
                                        }
                                    })
                                ])
                        }
                    },
                    {
                        title:this.$t('manage.power.tableAccount'),//"账号",
                        key:"name"
                    },
                    {
                        title: this.$t('manage.power.tableName'),//'姓名',
                        align: 'center',
                        key: 'trueName'
                    },
                   
                    {
                        title: this.$t('manage.power.tableGender'),//'性别',
                        align: 'center',
                        
                        key: 'genderDesc',
                       
                    },
                    
                    {
                        title: this.$t('manage.power.tableMobile'),//''手机号',
                        align: 'center',
                        key: 'mobile'
                    },
                    
                    {
                        title: this.$t('manage.power.tableTime'),//'时间',
                        align: 'center',     
                        key: 'creationDate'
                    },
                    {
                        title: this.$t('public.status'),//'状态',
                        align: 'center',
                        width:120,
                        key: 'statusDesc',
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    fontWeight:"900",
                                    color:params.row.status==1?'#40ca98':params.row.status==8 || params.row.status==5?'#d53c39':''
                                }
                            },params.row.statusDesc)
                        }
                    },
                ],
                //修改传的数据
                preCheckbox:false,
                subChecked:'',//子是否选中
                acts:[],
                editObj:{},//修改的对象
                liObj:{},//左侧列表的对象
                
            }
        },
        methods: {
            //用户搜索
            searchNewSku(){
                this.axios.get('customer/query?keyword='+this.keyword+'&uid='+this.uid).then(res=>{
                    if(res.data.status==200){
                        this.dataList=res.data.rows
                        this.pageSize = res.data.pageSize;
                        this.total = res.data.total;
                        this.dataList.forEach((x)=>{
                        
                         if(x.status==1){
                                x.statusDesc=this.$t('public.normal')
                            }
                            if(x.status==5){
                                x.statusDesc=this.$t('public.normalT')
                            }
                            if(x.status==0){
                                x.statusDesc=this.$t('public.addnew')
                            }
                             if(x.status==8){
                                x.statusDesc=this.$t('public.del')
                            }
                    
                            x.creationDate=new Date(x.creationDate).toLocaleDateString().replace(/\//g,'-')
                            
                            
                        })
                    }
                })
            },
            //回车搜索
            entersSearchNewSku(){
                this.searchNewSku()
            },
            //关闭批处理气泡提示框
            close: function() {
                this.visible = false;
            },
            //点击增加  跳转到 新增加员工页面
            gotoAdd: function() {
                this.$router.push({
                    path: '/addEmployee',
                    // path: '/addEy',
                    query: {
                        id: ''
                    }
                });
            },
            //双击表格一行
            dbl(row,index){
                this.$router.push({
                    path:'/addemployee',
                    // path:'/addEy',
                    query:{
                        id:row.id,
                        index:index,
                        s:row.status
                    }
                })
            },
            //获取用户列表信息
            getEmployeeList(s){
                this.axios.get('customer/query?uid='+this.uid+'&status='+s).then((res)=>{
                    if(res.data.status==200){
                        let data = res.data;
                        
                        this.isLoading = false
                        this.dataList = res.data.rows
                        this.pageSize = data.pageSize;
                        this.total = data.total;
                        this.dataList.forEach((x)=>{
                            x.creationDate=new Date(x.creationDate).toLocaleDateString().replace(/\//g,'-')
                             if(x.status==1){
                                x.statusDesc=this.$t('public.normal')
                            }
                            if(x.status==5){
                                x.statusDesc=this.$t('public.normalT')
                            }
                            if(x.status==0){
                                x.statusDesc=this.$t('public.addnew')
                            }
                             if(x.status==8){
                                x.statusDesc=this.$t('public.del')
                            }
                            if(x.gender==1){
                                x.genderDesc=this.$t('public.man')
                            }
                             if(x.gender==0){
                                x.genderDesc=this.$t('public.woman')
                            }
                        })
                    }
                })
            },
            
             //切换一条页
            getData(current){
                this.axios.get('/customer/query?offset='+current+'&uid='+this.uid+'&status='+this.valueT).then((res)=>{
                    // //console.log(res)
                    this.dataList = res.data.rows
                    this.pageSize = data.pageSize;
                    this.total = data.total;
                    this.dataList.forEach(x=>{
                         x.creationDate=new Date(x.creationDate).toLocaleDateString().replace(/\//g,'-')
                         if(x.status==1){
                                x.statusDesc=this.$t('public.normal')
                            }
                            if(x.status==5){
                                x.statusDesc=this.$t('public.normalT')
                            }
                            if(x.status==0){
                                x.statusDesc=this.$t('public.addnew')
                            }
                             if(x.status==8){
                                x.statusDesc=this.$t('public.del')
                            }
                    })
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
                this.axios.get('/customer/query?length='+size+'&uid='+this.uid+'&status='+this.valueT).then((res)=>{
                    let data=res.data
                    this.dataList = res.data.rows
                    this.pageSize = data.pageSize;
                    this.total = data.total;
                    this.dataList.forEach(x=>{
                         x.creationDate=new Date(x.creationDate).toLocaleDateString().replace(/\//g,'-')
                         if(x.status==1){
                                x.statusDesc=this.$t('public.normal')
                            }
                            if(x.status==5){
                                x.statusDesc=this.$t('public.normalT')
                            }
                            if(x.status==0){
                                x.statusDesc=this.$t('public.addnew')
                            }
                             if(x.status==8){
                                x.statusDesc=this.$t('public.del')
                            }
                    })
                })
            },
            //点击新增权限组
            addpower(){
                this.istrue=false
                this.qxisshow=false
                this.addisshow=true
                this.numIndex=-1
                this.getAllqxLists()
            },
            //新建权限搜索所有列表
            getAllqxLists(){
                this.axios.get('role/listPermission?uid='+this.uid).then(res=>{
                    if(res.data.status==200){
                        this.Addobj=res.data.rows.rolePerMap
                        let ids=res.data.rows.rolePerMap
                        for(let i in ids){
                            for(let j in ids[i]){
                                if(ids[i][j].checked){
                                    let id=ids[i][j].permissionId
                                    this.actsAdd.push(id)
                                }
                                
                            }
                            
                        }
                    }
                })
            },
            //获取权限组
            getAllqx(){
                this.axios.get('role/query?uid='+this.uid).then(res=>{
                    if(res.data.status==200){
                        this.Allqx=res.data.rows
                        //console.log(this.Allqx)
                    }
                })
            },
            //点击所有权限获取所有用户
            clickAllPower(){
                this.istrue=true
                this.qxisshow=false
                this.addisshow=false
                this.numIndex1=0
                this.numIndex=-1
                this.getEmployeeList(this.valueT)
            },
            //选中左侧列表
            addBg(item,index){
                this.liObj=item
                this.numIndex=index
                this.numIndex1=-1
                this.istrue=true
                this.is=false
                this.qxisshow=false
                this.addisshow=false
                this.getCustomerPerson(item.id)
            },
            //获取点击左侧的权限的人customer/query?roleId=8
            getCustomerPerson(id){
                this.axios.get('customer/query?roleId='+id+'&uid='+this.uid).then(res=>{
                    if(res.data.status==200){

                        this.dataList = res.data.rows
                        this.pageSize = res.data.pageSize;
                        this.total = res.data.total;
                        this.dataList.forEach((x)=>{
                            x.creationDate=new Date(x.creationDate).toLocaleDateString().replace(/\//g,'-')
                             if(x.status==1){
                                x.statusDesc=this.$t('public.normal')
                            }
                            if(x.status==5){
                                x.statusDesc=this.$t('public.normalT')
                            }
                            if(x.status==0){
                                x.statusDesc=this.$t('public.addnew')
                            }
                             if(x.status==8){
                                x.statusDesc=this.$t('public.del')
                            }
                            if(x.gender==1){
                                x.genderDesc=this.$t('public.man')
                            }
                             if(x.gender==0){
                                x.genderDesc=this.$t('public.woman')
                            }
                            
                            
                            
                        })
                    }
                })
            },
             //新增权限选中父级
            changeCheckboxPreAdd(item,e){
                this.preCheckboxAdd=e
                item.forEach(x=>{
                    if(e){
                        x.checked=true
                        this.actsAdd.push(x.permissionId)
                        this.subCheckedAdd=true
                        //console.log(this.actsAdd)
                    }else{
                        x.checked=false
                        this.subCheckedAdd=false
                        this.actsAdd.forEach((j,index)=>{
                            if(j==x.permissionId){
                                this.actsAdd.splice(index,1)
                            }
                       })
                        //console.log(this.actsAdd)
                    }
                })
            },
            //新增权限选中子类
            changeCheckboxAdd(j,e){
                if(e){
                    j.checked=true
                    this.subCheckedAdd=true
                    this.actsAdd.push(j.permissionId)
                    console.log(this.actsAdd)
                }else{
                    j.checked=false
                   this.actsAdd.forEach((x,index)=>{
                        if(x==j.permissionId){
                            this.actsAdd.splice(index,1)
                        }
                   })
                    console.log(this.actsAdd)
                    this.subCheckedAdd=false
                }
            },
            //保存后获取权限组
            getAllqxSaveQ(){
                this.axios.get('role/query?uid='+this.uid).then(res=>{
                    if(res.data.status==200){
                        this.Allqx=res.data.rows
                        this.edit(this.Allqx[0],0)
                    }
                })
            },
            //新增角色
            addqx(){
                if(this.addname==''){
                    this.$notify({
                            title:"",//
                            message:'权限名称不能为空',
                            type: 'error',
                            position: 'bottom-right'
                        });
                }else{
                    this.axios.post('role/add?uid='+this.uid,{
                        name:this.addname,
                        acts:this.actsAdd
                    }).then(res=>{
                        if(res.data.status==200){
                            this.$notify({
                                title:"",//
                                message:"新增成功",
                                type: 'success',
                                position: 'bottom-right'
                            });
                            this.getAllqxSaveQ()
                            this.istrue=true//正常
                            this.qxisshow=false//修改
                            this.addisshow=false//新增
                            this.addname=''
                            this.actsAdd=[]
                           
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
                
            },
            //点击修改权限组
            edit(item,index){
                this.acts=[]
                this.editObj=item
                this.valId=item.id//角色id
                this.numIndex=index
                this.name=item.name
                this.istrue=false
                this.is=false
                this.qxisshow=true
                this.addisshow=false
                this.preCheckbox=false
                this.numIndex1=-1
                //console.log(item)
                this.getObjQx(item.id)
            },
            //获取点击修改的ID再获取当前权限
            getObjQx(id){
                this.axios.get('role/grantRoleList/'+id+'?uid='+this.uid).then(res=>{
                    if(res.data.status==200){
                        this.obj=res.data.rows.rolePerMap
                        let ids=res.data.rows.rolePerMap
                        for(let i in ids){
                            for(let j in ids[i]){
                                if(ids[i][j].checked){

                                    let id=ids[i][j].permissionId
                                    this.acts.push(id)
                                }
                               
                            }
                            
                        }
                        
                    }
                })
            },
             //权限选中父级
            changeCheckboxPre(item,e){
                this.preCheckbox=e
                item.forEach(x=>{
                    if(e){
                        x.checked=true
                        this.acts.push(x.permissionId)
                        this.subChecked=true
                        //console.log(this.acts)
                    }else{
                        x.checked=false
                        this.subChecked=false
                        this.acts.forEach((j,index)=>{
                            if(j==x.permissionId){
                                this.acts.splice(index,1)
                            }
                       })
                        //console.log(this.acts)
                    }
                })
            },
            //权限选中子类
            changeCheckbox(j,e){
                if(e){
                    j.checked=true
                    this.subChecked=true
                    
                    this.acts.push(j.permissionId)
                    //console.log(this.acts)
                }else{
                    j.checked=false
                   this.acts.forEach((x,index)=>{
                        if(x==j.permissionId){
                            this.acts.splice(index,1)
                        }
                   })
                    //console.log(this.acts)
                    this.subChecked=false
                }
            },
            //修改权限PUT 
            saveEdit(){
                this.axios.put('/role/update?uid='+this.uid,{
                    id:this.valId,
                    checked:this.subChecked,
                    name:this.name,
                    acts:this.acts
                }).then(res=>{
                    if(res.data.status==200){
                        this.$notify({
                                title:"",//
                                message:"修改成功",
                                type: 'success',
                                position: 'bottom-right'
                            });
                        this.getAllqx()
                        this.istrue=true//正常
                        this.qxisshow=false//修改
                        this.addisshow=false//新增
                        this.acts=[]
                        this.name=''
                        this.subChecked=''
                        this.valId=''
                        this.edit(this.editObj,this.numIndex)
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
            //删除权限组
            delqx(index,id){
                this.$Modal.confirm({
                    title: '删除',
                    content: '<p>确定要删除吗?</p>',
                    onOk: () => {
                        this.numIndex1=-1
                        this.axios.delete('role/delete/'+id+'?uid='+this.uid).then(res=>{
                            if(res.data.status==200){
                                this.getAllqx()
                            }
                        })
                    },
                });
                
            },
            //下拉加载更多
            handleReachEdge(){
                this.current++//默认10条
                this.axios.get('role/query?offset='+this.current+'&uid='+this.uid).then((res)=>{
                    
                    res.data.rows.forEach((item)=>{
                        this.Allqx.push(item)
                    })

                })
                      
            },
            //搜索权限
            searchQx(){

            },
            //点击差号
            cancelHome(){
                this.istrue=true//正常
                this.qxisshow=false//修改
                this.addisshow=false//新增
                this.addname=''
            },
            //点击取消
            cancel(){
                this.istrue=true//正常
                this.qxisshow=false//修改
                this.addisshow=false//新增
                this.addname=''
            },
            //权限选中顶级
            // changeCheckboxP(e){
            //  for(var iable  in this.obj){
            //      this.obj[iable].forEach(x=>{
            //          x.checked=e
            //          this.subChecked=e
            //      })
            //  }
            // },
           
            //单击表格某一行
            onclickrow(data,index){
                this.ygID=data.id
            },
            //启用员工
            start(){
                if(this.ygID==''){
                    this.$notify({
                        title:"",//
                        message: this.$t('public.vaild.chooseOneData'),//,//'请选择一条数据！',
                        type: 'error',
                        position: 'bottom-right'
                    });
                }else{
                    this.axios.post('customer/enabled/'+this.ygID+'?uid='+this.uid).then(res=>{
                        if(res.data.status==200){
                            this.$notify({
                                title:"",//
                                message:this.$t('public.normalS'),//
                                type: 'success',
                                position: 'bottom-right'
                            });
                            this.ygID=''
                            this.getEmployeeList(this.valueT)
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
            //停用用户POST /employee/disabled/{id}
            stop(){
                if(this.ygID==''){
                    this.$notify({
                        title:"",//
                        message: this.$t('public.vaild.chooseOneData'),//,//'请选择一条数据！',
                        type: 'error',
                        position: 'bottom-right'
                    });
                }else{
                this.axios.post('customer/disabled/'+this.ygID+'?uid='+this.uid).then(res=>{
                    if(res.data.status==200){
                        this.$notify({
                            title:"",//
                            message:this.$t('public.normalT'),//
                            type: 'success',
                            position: 'bottom-right'
                        });
                        this.ygID=''
                        this.getEmployeeList(this.valueT)
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
            //删除用户
            del(){
                if(this.ygID==''){
                    this.$notify({
                        title:"",//
                        message: this.$t('public.vaild.chooseOneData'),//,//'请选择一条数据！',
                        type: 'error',
                        position: 'bottom-right'
                    });
                    }else{
                        this.$Modal.confirm({
                            title: '删除',
                            content: '<p>确定要删除吗?</p>',
                            onOk: () => {
                                this.axios.post('customer/delete/'+this.ygID+'?uid='+this.uid).then(res=>{
                                    if(res.data.status==200){
                                         this.$notify({
                                           title:"",//
                                            message: this.$t('public.deleteSuccess'),//
                                            type: 'success',
                                            position: 'bottom-right'
                                        });
                                         this.ygID=''
                                        this.getEmployeeList(this.valueT)
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
            //下拉框选择
            orderselected(value){
                this.valueT = value
               this.getEmployeeList(this.valueT);//获取所有用户
            },
            //密码重置
            passwordRest(){
                if(this.ygID==''){
                    this.$notify({
                        title:"",//
                        message:'请选中一条用户！',
                        type: 'error',
                        position: 'bottom-right'
                    });
                }else{
                    this.passIsshow=true
                }
            },
            //GET /customer/resetPassword 密码重置
            surePss(name){
                this.$refs[name].validate((valid) => {
                    if(this.ygID){
                        this.axios.get('/customer/resetPassword?uid='+this.uid,{
                            params:{
                                id:this.ygID,
                                password:this.loginformValidate.rpass
                            }

                        }).then(res=>{
                            if(res.data.status==200){
                                this.$notify({
                                    title:"",//
                                    message: this.$t('orders.passRestS'),
                                    type: 'success',
                                    position: 'bottom-right'
                                });
                                this.cancelPass()

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
            cancelPass(){
                this.loginformValidate.rpass=''
                this.loginformValidate.repeatpass=''
              
                this.passIsshow=false
            },
        },
        mounted() {
            this.getEmployeeList(this.valueT);//获取所有用户
            this.getAllqx()//获取所有权限
            this.height = document.documentElement.clientHeight
          
        }
    }
</script>

<style lang="css" scoped>
    .employee-box {
        width: 100%;
        height: auto;
       
        display:flex;

    }
    .btns-box {
        width: 100%;
        height: 50px;
        display:flex;
        justify-content: space-between;
        margin-right:20px;
        line-height: 50px;
        border-bottom:1px solid #e4e4e4;
    }
    .wldw {
      
        position:relative;
        font-size: 14px;
        color: #585858;
        margin-left:10px;
        
    }
    
    .left-top{
        height:50px;
        line-height: 50px;
        display: flex;
        justify-content:space-between;
        background: #fff;
        border-bottom:1px solid #DDDEE1;
        
    }
    .employee-left li{
        list-style: none;
        height:40px;
        line-height: 40px;
        width:100%;
    }
    .employee-left li span{
        margin-left:5px;
    }
    .bg{
        background:rgb(241,245,247);
        color:rgb(59,119,227);
    }
    .bg1{
      background:rgb(241,245,247);
        color:rgb(59,119,227);
    }
    .wldw input{
        padding:0 30px;
    }
    .qxmain{
        height:100%;
    }
    .employee-left{
       width: 140px;
     
        flex: 0 0 140px;
        font-size: 14px;
        background: #fff;
    }
    .employee-right{
        width:100%;
        background: #fff
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
        margin: 0 10px 100px 7px;
        
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
    .legend{
        display:flex;
        flex-wrap: wrap;
         /*border: 1px solid transparent*/
        /*justify-content: space-around;*/
    }
    .legend .legend-list{
        width:300px;
        flex:0 0 300px;
        padding:10px;
        margin:10px;
        border-color: #e4e4e4
    }
    
    /*.legend .legend-list:focus-within{
        border-color: #05CE3E
    }*/
</style>
