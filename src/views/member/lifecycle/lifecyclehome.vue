<template>
    <div>
        <div style="margin:10px">
            <Tabs :animated='false' @on-click="clickNomsg">
                <!--消费者-->
    	        <TabPane :label="label0">
                    <Table border :columns="crmdatakey0" :data="crmdataList0" ></Table>
                    <!--底部的分页-->
                    <div class="page-box" v-if='crmtotal0>10'>
                         <Page :total="crmtotal0" size='small' show-sizer placement='top' :page-size-opts="[10,20,30,40,50]" show-total  :pageSize='crmpageSize0'  @on-change="jfgetData" @on-page-size-change="jfchangePageSizeCrm"></Page>
                    </div>
                </TabPane>
                 <!--顾客-->
    	        <TabPane :label="label1" >
                    <Table border :columns="crmdatakey1" :data="crmdataList1" ></Table>
                    <!--底部的分页-->
                    <div class="page-box" v-if='crmtotal1>10'>
                         <Page :total="crmtotal1" size='small' show-sizer placement='top' :page-size-opts="[10,20,30,40,50]" show-total  :pageSize='crmpageSize1'  @on-change="jfgetData" @on-page-size-change="jfchangePageSizeCrm"></Page>
                    </div>
                </TabPane>
                <!--新会员-->
    	        <TabPane :label="label2" >
                    <Table border :columns="crmdatakey2" :data="crmdataList2" ></Table>
                    <!--底部的分页-->
                    <div class="page-box" v-if='crmtotal2>10'>
                         <Page :total="crmtotal2" size='small' show-sizer placement='top' :page-size-opts="[10,20,30,40,50]" show-total  :pageSize='crmpageSize2'  @on-change="jfgetData" @on-page-size-change="jfchangePageSizeCrm"></Page>
                    </div>
                </TabPane>
                <!--活跃会员-->
    	        <TabPane :label="label3" >
                    <Table border :columns="crmdatakey3" :data="crmdataList3" ></Table>
                    <!--底部的分页-->
                    <div class="page-box" v-if='crmtotal3>10'>
                         <Page :total="crmtotal3" size='small' show-sizer placement='top' :page-size-opts="[10,20,30,40,50]" show-total  :pageSize='crmpageSize3'  @on-change="jfgetData" @on-page-size-change="jfchangePageSizeCrm"></Page>
                    </div>
                </TabPane>
                <!--沉默会员-->
    	        <TabPane :label="label4" >
                     <Table border :columns="crmdatakey4" :data="crmdataList4" ></Table>
                    <!--底部的分页-->
                    <div class="page-box" v-if='crmtotal4>10'>
                         <Page :total="crmtotal4" size='small' show-sizer placement='top' :page-size-opts="[10,20,30,40,50]" show-total  :pageSize='crmpageSize4'  @on-change="jfgetData" @on-page-size-change="jfchangePageSizeCrm"></Page>
                    </div>
                </TabPane>
                <!--睡眠会员-->
    	        <TabPane :label="label5" >
                    <Table border :columns="crmdatakey5" :data="crmdataList5" ></Table>
                    <!--底部的分页-->
                    <div class="page-box" v-if='crmtotal5>10'>
                         <Page :total="crmtotal5" size='small' show-sizer placement='top' :page-size-opts="[10,20,30,40,50]" show-total  :pageSize='crmpageSize5'  @on-change="jfgetData" @on-page-size-change="jfchangePageSizeCrm"></Page>
                    </div>
                </TabPane>
                <!--流失会员-->
    	        <TabPane :label="label6" >
                    <Table border :columns="crmdatakey6" :data="crmdataList6" ></Table>
                    <!--底部的分页-->
                    <div class="page-box" v-if='crmtotal6>10'>
                         <Page :total="crmtotal6" size='small' show-sizer placement='top' :page-size-opts="[10,20,30,40,50]" show-total  :pageSize='crmpageSize6'  @on-change="jfgetData" @on-page-size-change="jfchangePageSizeCrm"></Page>
                    </div>
                </TabPane>
        	</Tabs>
        </div>
    </div>
</template>
<script>
export default {
    data(){
    	return {
            uid: this.$store.state.common.token,
            //消费者
            crmdataList0:[],
            crmdatakey0:[
                    {
                        title:this.$t('member.avt'),//"头像",
                        key:'photo',
                        width:80,
                        render:(h, params) =>{
                          return h('div',[
                              h('img',{
                                attrs:{
                                  src:params.row.photo
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
                        title:this.$t('member.code'),//'编号',
                        key:'code'
                    },
                    {
                        title:this.$t('member.name'),//"姓名",
                        align:"center",
                        key:"name",
                    },
                    {
                        title:this.$t('public.gender'),//"性别",
                        align:"center",
                        key:"gender",
                        render:(h,params)=>{
                        return h('div',{
                            
                          },params.row.gender=='1'?"男":params.row.gender=='0'?"女":"")
                        }
                    },
                    {
                        title:this.$t('member.mobile'),//'手机',
                        align:"center",
                        key:'mobile'
                    },
                     {
                        title:this.$t('member.birsday'),//'生日',
                        align:"center",
                        key:'birthday',
                        render:(h,params)=>{
                            return h("span",{
                            },params.row.birthday==null || params.row.birthday==""?"":this.getLocalTime(params.row.birthday))
                        }
                    },
                    {
                        title:this.$t('member.ye'),//'余额',
                        align:"center",
                        key:'chargeMoney'
                    },
                    {
                        title:this.$t('member.jf'),//'积分',
                      
                        align:"center",
                        key:'dqjf'
                    },
                    {
                        title:"等级",//'积分',
                      
                        align:"center",
                        key:'level'
                    },
                   
                    {
                        title:this.$t('public.status'),//'状态',
                        align:"center",
                        width:120,
                        key:'statusDesc',
                        render:(h,params)=>{
                          return h('span',{
                              style:{
                                  color:params.row.status==1?'#40ca98':'#d53c39'
                              }
                          },params.row.statusDesc)
                      }
                    }
            ],
            crmtotal0:0,
            crmtotal00:0,
            crmpageSize0:0,
            //顾客
            crmdataList1:[],
            crmdatakey1:[
                {
                        title:this.$t('member.avt'),//"头像",
                        key:'photo',
                        width:80,
                        render:(h, params) =>{
                          return h('div',[
                              h('img',{
                                attrs:{
                                  src:params.row.photo
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
                        title:this.$t('member.code'),//'编号',
                        key:'code'
                    },
                    {
                        title:this.$t('member.name'),//"姓名",
                        align:"center",
                        key:"name",
                    },
                    {
                        title:this.$t('public.gender'),//"性别",
                        align:"center",
                        key:"gender",
                        render:(h,params)=>{
                        return h('div',{
                            
                          },params.row.gender=='1'?"男":params.row.gender=='0'?"女":"")
                        }
                    },
                    {
                        title:this.$t('member.mobile'),//'手机',
                        align:"center",
                        key:'mobile'
                    },
                     {
                        title:this.$t('member.birsday'),//'生日',
                        align:"center",
                        key:'birthday',
                        render:(h,params)=>{
                            return h("span",{
                            },params.row.birthday==null || params.row.birthday==""?"":this.getLocalTime(params.row.birthday))
                        }
                    },
                    {
                        title:this.$t('member.ye'),//'余额',
                        align:"center",
                        key:'chargeMoney'
                    },
                    {
                        title:this.$t('member.jf'),//'积分',
                      
                        align:"center",
                        key:'dqjf'
                    },
                    {
                        title:"等级",//'积分',
                      
                        align:"center",
                        key:'level'
                    },
                    
                    {
                        title:this.$t('public.status'),//'状态',
                        align:"center",
                        width:120,
                        key:'statusDesc',
                        render:(h,params)=>{
                          return h('span',{
                              style:{
                                  color:params.row.status==1?'#40ca98':'#d53c39'
                              }
                          },params.row.statusDesc)
                      }
                    }
            ],
            crmtotal1:0,
            crmtotal11:0,
            crmpageSize1:0,
            //新会员
            crmdataList2:[],
            crmdatakey2:[
                {
                        title:this.$t('member.avt'),//"头像",
                        key:'photo',
                        width:80,
                        render:(h, params) =>{
                          return h('div',[
                              h('img',{
                                attrs:{
                                  src:params.row.photo
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
                        title:this.$t('member.code'),//'编号',
                        key:'code'
                    },
                    {
                        title:this.$t('member.name'),//"姓名",
                        align:"center",
                        key:"name",
                    },
                    {
                        title:this.$t('public.gender'),//"性别",
                        align:"center",
                        key:"gender",
                        render:(h,params)=>{
                        return h('div',{
                            
                          },params.row.gender=='1'?"男":params.row.gender=='0'?"女":"")
                        }
                    },
                    {
                        title:this.$t('member.mobile'),//'手机',
                        align:"center",
                        key:'mobile'
                    },
                     {
                        title:this.$t('member.birsday'),//'生日',
                        align:"center",
                        key:'birthday',
                        render:(h,params)=>{
                            return h("span",{
                            },params.row.birthday==null || params.row.birthday==""?"":this.getLocalTime(params.row.birthday))
                        }
                    },
                    {
                        title:this.$t('member.ye'),//'余额',
                        align:"center",
                        key:'chargeMoney'
                    },
                    {
                        title:this.$t('member.jf'),//'积分',
                      
                        align:"center",
                        key:'dqjf'
                    },
                    {
                        title:"等级",//'积分',
                      
                        align:"center",
                        key:'level'
                    },
                    
                    {
                        title:this.$t('public.status'),//'状态',
                        align:"center",
                        width:120,
                        key:'statusDesc',
                        render:(h,params)=>{
                          return h('span',{
                              style:{
                                  color:params.row.status==1?'#40ca98':'#d53c39'
                              }
                          },params.row.statusDesc)
                      }
                    }
            ],
            crmtotal2:0,
            crmtotal22:0,
            crmpageSize2:0,
            //活跃会员
            crmdataList3:[],
            crmdatakey3:[
                {
                        title:this.$t('member.avt'),//"头像",
                        key:'photo',
                        width:80,
                        render:(h, params) =>{
                          return h('div',[
                              h('img',{
                                attrs:{
                                  src:params.row.photo
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
                        title:this.$t('member.code'),//'编号',
                        key:'code'
                    },
                    {
                        title:this.$t('member.name'),//"姓名",
                        align:"center",
                        key:"name",
                    },
                    {
                        title:this.$t('public.gender'),//"性别",
                        align:"center",
                        key:"gender",
                        render:(h,params)=>{
                        return h('div',{
                            
                          },params.row.gender=='1'?"男":params.row.gender=='0'?"女":"")
                        }
                    },
                    {
                        title:this.$t('member.mobile'),//'手机',
                        align:"center",
                        key:'mobile'
                    },
                     {
                        title:this.$t('member.birsday'),//'生日',
                        align:"center",
                        key:'birthday',
                        render:(h,params)=>{
                            return h("span",{
                            },params.row.birthday==null || params.row.birthday==""?"":this.getLocalTime(params.row.birthday))
                        }
                    },
                    {
                        title:this.$t('member.ye'),//'余额',
                        align:"center",
                        key:'chargeMoney'
                    },
                    {
                        title:this.$t('member.jf'),//'积分',
                      
                        align:"center",
                        key:'dqjf'
                    },
                    {
                        title:"等级",//'积分',
                      
                        align:"center",
                        key:'level'
                    },
                    
                    {
                        title:this.$t('public.status'),//'状态',
                        align:"center",
                        width:120,
                        key:'statusDesc',
                        render:(h,params)=>{
                          return h('span',{
                              style:{
                                  color:params.row.status==1?'#40ca98':'#d53c39'
                              }
                          },params.row.statusDesc)
                      }
                    }
            ],
            crmtotal3:0,
            crmtotal33:0,
            crmpageSize3:0,
            //沉默会员
            crmdataList4:[],
            crmdatakey4:[
                {
                        title:this.$t('member.avt'),//"头像",
                        key:'photo',
                        width:80,
                        render:(h, params) =>{
                          return h('div',[
                              h('img',{
                                attrs:{
                                  src:params.row.photo
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
                        title:this.$t('member.code'),//'编号',
                        key:'code'
                    },
                    {
                        title:this.$t('member.name'),//"姓名",
                        align:"center",
                        key:"name",
                    },
                    {
                        title:this.$t('public.gender'),//"性别",
                        align:"center",
                        key:"gender",
                        render:(h,params)=>{
                        return h('div',{
                            
                          },params.row.gender=='1'?"男":params.row.gender=='0'?"女":"")
                        }
                    },
                    {
                        title:this.$t('member.mobile'),//'手机',
                        align:"center",
                        key:'mobile'
                    },
                     {
                        title:this.$t('member.birsday'),//'生日',
                        align:"center",
                        key:'birthday',
                        render:(h,params)=>{
                            return h("span",{
                            },params.row.birthday==null || params.row.birthday==""?"":this.getLocalTime(params.row.birthday))
                        }
                    },
                    {
                        title:this.$t('member.ye'),//'余额',
                        align:"center",
                        key:'chargeMoney'
                    },
                    {
                        title:this.$t('member.jf'),//'积分',
                      
                        align:"center",
                        key:'dqjf'
                    },
                    {
                        title:"等级",//'积分',
                      
                        align:"center",
                        key:'level'
                    },
                    
                    {
                        title:this.$t('public.status'),//'状态',
                        align:"center",
                        width:120,
                        key:'statusDesc',
                        render:(h,params)=>{
                          return h('span',{
                              style:{
                                  color:params.row.status==1?'#40ca98':'#d53c39'
                              }
                          },params.row.statusDesc)
                      }
                    }
            ],
            crmtotal4:0,
            crmtotal44:0,
            crmpageSize4:0,
            //睡眠会员
            crmdataList5:[],
            crmdatakey5:[
                {
                        title:this.$t('member.avt'),//"头像",
                        key:'photo',
                        width:80,
                        render:(h, params) =>{
                          return h('div',[
                              h('img',{
                                attrs:{
                                  src:params.row.photo
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
                        title:this.$t('member.code'),//'编号',
                        key:'code'
                    },
                    {
                        title:this.$t('member.name'),//"姓名",
                        align:"center",
                        key:"name",
                    },
                    {
                        title:this.$t('public.gender'),//"性别",
                        align:"center",
                        key:"gender",
                        render:(h,params)=>{
                        return h('div',{
                            
                          },params.row.gender=='1'?"男":params.row.gender=='0'?"女":"")
                        }
                    },
                    {
                        title:this.$t('member.mobile'),//'手机',
                        align:"center",
                        key:'mobile'
                    },
                     {
                        title:this.$t('member.birsday'),//'生日',
                        align:"center",
                        key:'birthday',
                        render:(h,params)=>{
                            return h("span",{
                            },params.row.birthday==null || params.row.birthday==""?"":this.getLocalTime(params.row.birthday))
                        }
                    },
                    {
                        title:this.$t('member.ye'),//'余额',
                        align:"center",
                        key:'chargeMoney'
                    },
                    {
                        title:this.$t('member.jf'),//'积分',
                      
                        align:"center",
                        key:'dqjf'
                    },
                    {
                        title:"等级",//'积分',
                      
                        align:"center",
                        key:'level'
                    },
                    
                    {
                        title:this.$t('public.status'),//'状态',
                        align:"center",
                        width:120,
                        key:'statusDesc',
                        render:(h,params)=>{
                          return h('span',{
                              style:{
                                  color:params.row.status==1?'#40ca98':'#d53c39'
                              }
                          },params.row.statusDesc)
                      }
                    }
            ],
            crmtotal5:0,
            crmtotal55:0,
            crmpageSize5:0,
            //流失会员
            crmdataList6:[],
            crmdatakey6:[
                {
                        title:this.$t('member.avt'),//"头像",
                        key:'photo',
                        width:80,
                        render:(h, params) =>{
                          return h('div',[
                              h('img',{
                                attrs:{
                                  src:params.row.photo
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
                        title:this.$t('member.code'),//'编号',
                        key:'code'
                    },
                    {
                        title:this.$t('member.name'),//"姓名",
                        align:"center",
                        key:"name",
                    },
                    {
                        title:this.$t('public.gender'),//"性别",
                        align:"center",
                        key:"gender",
                        render:(h,params)=>{
                        return h('div',{
                           
                          },params.row.gender=='1'?"男":params.row.gender=='0'?"女":"")
                        }
                    },
                    {
                        title:this.$t('member.mobile'),//'手机',
                        align:"center",
                        key:'mobile'
                    },
                     {
                        title:this.$t('member.birsday'),//'生日',
                        align:"center",
                        key:'birthday',
                        render:(h,params)=>{
                            return h("span",{
                            },params.row.birthday==null || params.row.birthday==""?"":this.getLocalTime(params.row.birthday))
                        }
                    },
                    {
                        title:this.$t('member.ye'),//'余额',
                        align:"center",
                        key:'chargeMoney'
                    },
                    {
                        title:this.$t('member.jf'),//'积分',
                      
                        align:"center",
                        key:'dqjf'
                    },
                    {
                        title:"等级",//'积分',
                      
                        align:"center",
                        key:'level'
                    },
                    
                    {
                        title:this.$t('public.status'),//'状态',
                        align:"center",
                        width:120,
                        key:'statusDesc',
                        render:(h,params)=>{
                          return h('span',{
                              style:{
                                  color:params.row.status==1?'#40ca98':'#d53c39'
                              }
                          },params.row.statusDesc)
                      }
                    }
            ],
            crmtotal6:0,
            crmtotal66:0,
            crmpageSize6:0,
    		label0: (h) => {
                return h('div', [
                    h('span', '消费者'),
                    h('Badge', {
                        props: {
                            count: this.crmtotal00
                        }
                    })
                ])
            },
            label1: (h) => {
                return h('div', [
                    h('span', '顾客'),
                    h('Badge', {
                        props: {
                            count: this.crmtotal11
                        }
                    })
                ])
            },
            label2: (h) => {
                return h('div', [
                    h('span', '新会员'),
                    h('Badge', {
                        props: {
                            count: this.crmtotal22
                        }
                    })
                ])
            },
            label3: (h) => {
                return h('div', [
                    h('span', '活跃会员'),
                    h('Badge', {
                        props: {
                            count: this.crmtotal33
                        }
                    })
                ])
            },
            label4: (h) => {
                return h('div', [
                    h('span', '沉默会员'),
                    h('Badge', {
                        props: {
                            count: this.crmtotal44
                        }
                    })
                ])
            },
            label5: (h) => {
                return h('div', [
                    h('span', '睡眠会员'),
                    h('Badge', {
                        props: {
                            count: this.crmtotal55
                        }
                    })
                ])
            },
            label6: (h) => {
                return h('div', [
                    h('span', '流失会员'),
                    h('Badge', {
                        props: {
                            count: this.crmtotal66
                        }
                    })
                ])
            },
    		indexNum:0,
     
    	}
    },
    methods:{
        //GET /crm/life 会员生命周
        //1:消费者 2：顾客 3：会员 4：活跃会员 5：沉默会员 6：睡眠会员 7：流失会员
        clickNomsg(num){
            this.indexNum=num
            switch(num){
                //1:消费者
                case 0:
                   
                break;
                //2：顾客
                case 1:
                    
                break;
                //新会员
                case 2:
                    this.getTotal00('/crm/today',2)
            
                break;
                case 3:
                  this.getTotal00('/crm/active',3)
            
                break;
                case 4:
                 this.getTotal00('/crm/silence',4)//GET /crm/silence 沉默会员
            
                break;
                case 5:
                   this.getTotal00('/crm/sleep',5)//GET /crm/sleep 睡眠会员
            
                break;
                case 6:
                  this.getTotal00('/crm/loss',6)//GET /crm/loss 流失会员
                break;
            }
        },
        
        //翻页
        jfgetData(current){
            switch(this.indexNum){
                case 0:
                break;
                case 1:
                break;
                case 2:
                    this.getPage('/crm/today',current,2)
                break;
                case 3:
                    this.getPage('/crm/active',current,3)
                break;
                case 4:
                    this.getPage('/crm/silence',current,4)
                break;
                case 5:
                    this.getPage('/crm/sleep',current,5)
                break;
                case 6:
                    this.getPage('/crm/loss',current,6)
                break;
            }
        },
        //翻页
        getPage(path,current,day){
            this.axios.get(path+'?uid='+this.uid+'&offset='+current).then(res=>{
                if(res.data.status==200){
                    let data=res.data
                    switch(day){
                        case 0:
                            this.indexNum=0
                            this.crmtotal00=data.total
                            this.crmdataList0=data.rows
                            this.crmtotal0=data.total
                            this.crmpageSize0=data.pageSize
                        break;
                        case 1:
                            this.indexNum=21
                            this.crmtotal11=data.total
                            this.crmdataList1=data.rows
                            this.crmtotal1=data.total
                            this.crmpageSize1=data.pageSize
                        break;
                        //今日会员
                        case 2:
                            this.indexNum=2
                            this.crmtotal22=data.total
                            this.crmdataList2=data.rows
                            this.crmtotal2=data.total
                            this.crmpageSize2=data.pageSize
                        break;
                        //活跃会员
                        case 3:
                            this.indexNum=3
                            this.crmtotal33=data.total
                            this.crmdataList3=data.rows
                            this.crmtotal3=data.total
                            this.crmpageSize3=data.pageSize
                        break;
                        //沉默
                        case 4:
                            this.indexNum=4
                            this.crmtotal44=data.total
                            this.crmdataList4=data.rows
                            this.crmtotal4=data.total
                            this.crmpageSize4=data.pageSize
                        break;
                        //睡眠
                        case 5:
                            this.indexNum=5
                            this.crmtotal55=data.total
                            this.crmdataList5=data.rows
                            this.crmtotal5=data.total
                            this.crmpageSize5=data.pageSize
                        break;
                        //流失
                        case 6:
                            this.indexNum=6
                            this.crmtotal66=data.total
                            this.crmdataList6=data.rows
                            this.crmtotal6=data.total
                            this.crmpageSize6=data.pageSize
                        break;
                    }
                    
                }
            })
        },
        getPageSize(path,size,day){
            this.axios.get(path+'?uid='+this.uid+'&length='+size).then(res=>{
                if(res.data.status==200){
                    let data=res.data
                    switch(day){
                        case 0:
                            this.indexNum=0
                            this.crmtotal00=data.total
                            this.crmdataList0=data.rows
                            this.crmtotal0=data.total
                            this.crmpageSize0=data.pageSize
                        break;
                        case 1:
                            this.indexNum=1
                            this.crmtotal11=data.total
                            this.crmdataList1=data.rows
                            this.crmtotal1=data.total
                            this.crmpageSize1=data.pageSize
                        break;
                        //今日会员
                        case 2:
                            this.indexNum=2
                            this.crmtotal22=data.total
                            this.crmdataList2=data.rows
                            this.crmtotal2=data.total
                            this.crmpageSize2=data.pageSize
                        break;
                        //活跃会员
                        case 3:
                            this.indexNum=3
                            this.crmtotal33=data.total
                            this.crmdataList3=data.rows
                            this.crmtotal3=data.total
                            this.crmpageSize3=data.pageSize
                        break;
                        //沉默
                        case 4:
                            this.indexNum=4
                            this.crmtotal44=data.total
                            this.crmdataList4=data.rows
                            this.crmtotal4=data.total
                            this.crmpageSize4=data.pageSize
                        break;
                        //睡眠
                        case 5:
                            this.indexNum=5
                            this.crmtotal55=data.total
                            this.crmdataList5=data.rows
                            this.crmtotal5=data.total
                            this.crmpageSize5=data.pageSize
                        break;
                        //流失
                        case 6:
                            this.indexNum=6
                            this.crmtotal66=data.total
                            this.crmdataList6=data.rows
                            this.crmtotal6=data.total
                            this.crmpageSize6=data.pageSize
                        break;
                    }
                    
                }
            })
        },
        jfchangePageSizeCrm(size){
            switch(this.indexNum){
                case 0:
                break;
                case 1:
                break;
                case 2:
                    this.getPageSize('/crm/today',size,2)
                break;
                case 3:
                    this.getPageSize('/crm/active',size,3)
                break;
                case 4:
                    this.getPageSize('/crm/silence',size,4)
                break;
                case 5:
                    this.getPageSize('/crm/sleep',size,5)
                break;
                case 6:
                    this.getPageSize('/crm/loss',size,6)
                break;
            }
        },
        
        //会员
        getTotal00(path,day){
            this.axios.get(path+'?uid='+this.uid).then(res=>{
                if(res.data.status==200){
                    let data=res.data
                    switch(day){
                        //今日会员
                        case 2:
                            this.indexNum=2
                            this.crmtotal22=data.total
                            this.crmdataList2=data.rows
                            this.crmtotal2=data.total
                            this.crmpageSize2=data.pageSize
                        break;
                        //活跃会员
                        case 3:
                            this.indexNum=3
                            this.crmtotal33=data.total
                            this.crmdataList3=data.rows
                            this.crmtotal3=data.total
                            this.crmpageSize3=data.pageSize
                        break;
                        //沉默
                        case 4:
                            this.indexNum=4
                            this.crmtotal44=data.total
                            this.crmdataList4=data.rows
                            this.crmtotal4=data.total
                            this.crmpageSize4=data.pageSize
                        break;
                        //睡眠
                        case 5:
                            this.indexNum=5
                            this.crmtotal55=data.total
                            this.crmdataList5=data.rows
                            this.crmtotal5=data.total
                            this.crmpageSize5=data.pageSize
                        break;
                        //流失
                        case 6:
                            this.indexNum=6
                            this.crmtotal66=data.total
                            this.crmdataList6=data.rows
                            this.crmtotal6=data.total
                            this.crmpageSize6=data.pageSize
                        break;
                    }
                    
                }
            })
        }
    },
    created(){
        this.$nextTick(x=>{
            
            this.getTotal00('/crm/today',2)
            this.getTotal00('/crm/active',3)
            this.getTotal00('/crm/silence',4)//GET /crm/silence 沉默会员
            this.getTotal00('/crm/sleep',5)//GET /crm/sleep 睡眠会员
            this.getTotal00('/crm/loss',6)//GET /crm/loss 流失会员
            
        })
    },
}
</script>
<style scoped>
.page-box{
    text-align: center;
    margin:5px 0 120px 0;
}
</style>
