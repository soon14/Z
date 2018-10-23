<template>
    <div>
        <div style='display:flex;justify-content: space-between'>
            <div style='display:flex;height:50px;line-height:50px'>
                <div style='margin:0 10px;font-weight:600'>日期:
                    <span style="width: 200px;margin-top:8px;"><Tag>{{selecTime==""?"无数据":selecTime}}</Tag></span>
                    
                </div>
            </div>
            
            <mu-button small  color="primary" style='margin-top: 18px;margin-right:10px' @click='pbqj'>请假</mu-button>
            
        </div>
        <div class='table-center'>
            <Table border highlight-row :columns="pbKey" :data="pbdata" @on-row-click='clickRopb' ></Table>
            <div class='normal'>
                <div class='xx-pre'>
                    <span class='xx'></span>
                    <span>休息/请假</span>
                </div>
                <div class='xx1-pre' style='margin-left:20px'>
                    <span class='xx1'></span>
                    <span>值班</span>
                </div>
            </div>
            <div class="page-box">
                <Page :total="pbtotal" show-total  :pageSize='pbpageSize'  @on-change="pbgetData" @on-page-size-change="pbchangePageSize"></Page>
            </div>
        </div>
        <!--排班请假弹框-->
  	<Modal v-model="pbqjisshow" width="400px">
	    <p slot="header" style="height:30px;line-height:30px;text-align:center">

	      <span>请假申请</span>
	    </p>
	    <div>
	    	<Form ref="formValidatepbqj" :model="formValidatepbqj" :rules="ruleValidatepbqj" :label-width="80">

				<FormItem label="护理员" prop="name">
	                <Input v-model="formValidatepbqj.name" disabled placeholder="技师"></Input>
           		</FormItem>

	           		<FormItem label="请假时间" prop="btime">
		                <DatePicker type="date" :value='formValidatepbqj.btime' style="width:100%" @on-change='changeTimeB'></DatePicker>
	           		</FormItem>
	           		<FormItem label="截至时间" prop="etime">
		                <DatePicker type="date" :value='formValidatepbqj.etime' style="width:100%" @on-change='changeTimeE'></DatePicker>
	           		</FormItem>

           		<FormItem label="请假原因" prop="remark">
	                <Input type='textarea' v-model="formValidatepbqj.remark" placeholder="请假原因"></Input>
           		</FormItem>
			</Form>
	    </div>
	    <div slot="footer">
	      <div style='margin-top:-10px'>

	        <Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='cancelpbqj'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button> <!--取消-->

	        <Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="surepbqj('formValidatepbqj')"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button><!--确认-->
	      </div>
	    </div>
  	</Modal>
    </div>
</template>
<script>
export default {
    data(){
        return {
            pbqjObj:{},//排班一行数据
            pbqjisshow:false,//请假
            pbqjID:"",//技师id
            formValidatepbqj:{
                name:"",//技师
                btime:"",
                etime:"",
                remark:"",//请假原因
            },
            ruleValidatepbqj:{
                name:[{ required: true, message: '技师不能为空', trigger: 'change' }],
                btime:[{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
                etime:[{ required: true, message: '结束时间不能为空', trigger: 'blur' }],
                remark:[{ required: true, message: '请假原因不能为空', trigger: 'change' }]
            },
            selecTime:"",
            uid: this.$store.state.common.token,
            day0:"",
            day1:"",
            day2:"",
            day3:"",
            day4:"",
            day5:"",
            day6:"",
            pbtotal:0,
            pbdata:[],
            pbpageSize:0,
            pbKey:[
                {
                    title:"护理员",
                    align:"center",
                    width:100,
                    key:"name",
                },
                {
                    title:this.day0,
                    align:"center",
                    key:"isxx",
                    render:(h,params)=>{
                        return h('div',{
                            style:{
                                // background:params.row.xx[0].isxx?"#FCECED":"",
                                color:params.row.scheduling[0].type?"#d53c39":"",
                                width:'100%',
                                lineHeight:"47px",
                                height:"47px"
                            }
                        },params.row.scheduling[0].isxx)
                    },
                    renderHeader:(h,params)=>{
                        return h('span',{

                        },this.day0)
                    }
                },
                {
                    title:this.day1,
                    align:"center",
                    key:"isxx",
                    render:(h,params)=>{
                        return h('div',{
                            style:{
                                // background:params.row.xx[1].isxx?"#FCECED":"",
                                color:params.row.scheduling[1].type?"#d53c39":"",
                                width:'100%',
                                lineHeight:"47px",
                                height:"47px"
                            }
                        },params.row.scheduling[1].isxx)
                    },
                    renderHeader:(h,params)=>{
                        return h('span',{

                        },this.day1)
                    }
                },
                {
                    title:this.day2,
                    align:"center",
                    key:"isxx",
                    render:(h,params)=>{
                        return h('div',{
                            style:{
                                // background:params.row.xx[2].isxx?"#FCECED":"",
                                color:params.row.scheduling[2].type?"#d53c39":"",
                                width:'100%',
                                lineHeight:"47px",
                                height:"47px"
                            }
                        },params.row.scheduling[2].isxx)
                    },
                    renderHeader:(h,params)=>{
                        return h('span',{

                        },this.day2)
                    }
                },
                {
                    title:this.day3,
                    align:"center",
                    key:"isxx",
                    render:(h,params)=>{
                        return h('div',{
                            style:{
                                // background:params.row.xx[3].isxx?"#FCECED":"",
                                color:params.row.scheduling[3].type?"#d53c39":"",
                                width:'100%',
                                lineHeight:"47px",
                                height:"47px"
                            }
                        },params.row.scheduling[3].isxx)
                    },
                    renderHeader:(h,params)=>{
                        return h('span',{

                        },this.day3)
                    }

                },
                {
                    title:this.day4,
                    align:"center",
                    key:"isxx",
                    render:(h,params)=>{
                        return h('div',{
                            style:{
                                // background:params.row.xx[4].isxx?"#FCECED":"",
                                color:params.row.scheduling[4].type?"#d53c39":"",
                                width:'100%',
                                lineHeight:"47px",
                                height:"47px"
                            }
                        },params.row.scheduling[4].isxx)
                    },
                    renderHeader:(h,params)=>{
                        return h('span',{

                        },this.day4)
                    }
                },
                {
                    title:this.day5,
                    align:"center",
                    key:"isxx",
                    render:(h,params)=>{
                        return h('div',{
                            style:{
                                // background:params.row.xx[5].isxx?"#FCECED":"",
                                color:params.row.scheduling[5].type?"#d53c39":"",
                                width:'100%',
                                lineHeight:"47px",
                                height:"47px"
                            }
                        },params.row.scheduling[5].isxx)
                    },
                    renderHeader:(h,params)=>{
                        return h('span',{

                        },this.day5)
                    }
                },
                {
                    title:this.day6,
                    align:"center",
                    key:"isxx",
                    render:(h,params)=>{
                        return h('div',{
                            style:{
                                // background:params.row.xx[6].isxx?"#FCECED":"",
                                color:params.row.scheduling[6].type?"#d53c39":"",
                                width:'100%',
                                lineHeight:"47px",
                                height:"47px"
                            }
                        },params.row.scheduling[6].isxx)
                    },
                    renderHeader:(h,params)=>{
                        return h('span',{

                        },this.day6)
                    }
                },

            ],
        }
    },
    methods:{
        //获取排班列表
        getpb(){
            this.axios.get('/scheduling/query?uid='+this.uid).then(res=>{
                if(res.data.status==200){
                    this.pbdata=res.data.rows
                    this.pbtotal=res.data.total
                    this.pbpageSize=res.data.pageSize//
                    if(this.pbdata.length==0){
                        return
                    }else{
                        this.selecTime=new Date(this.pbdata[0].scheduling[0].startTime).toLocaleDateString().replace(/\//g,'-')+' '+'—'+' '+new Date(this.pbdata[0].scheduling[0].endTime).toLocaleDateString().replace(/\//g,'-')
                    this.pbdata.forEach((x,index)=>{
                        x.scheduling.forEach((j,i)=>{
                            switch(j.type){
                                case 0:
                                    j.isxx='休息'
                                break;
                                case 1:
                                    j.isxx='值班'
                                break;

                            }
                            let d= new Date(j.scheduling).getDay()
                            let dm= new Date(j.scheduling).getMonth()+1
                            let dd= new Date(j.scheduling).getDate()
                            if(i == 0){
                                this.day0 = this.match(d)+'  '+dm+'月'+dd+'日'
                            }else if(i == 1){
                                this.day1 = this.match(d)+'  '+dm+'月'+dd+'日';
                            }else if(i == 2){
                                this.day2 = this.match(d)+'  '+dm+'月'+dd+'日';
                            }else if(i == 3){
                                this.day3 = this.match(d)+'  '+dm+'月'+dd+'日';
                            }else if(i == 4){
                                this.day4 = this.match(d)+'  '+dm+'月'+dd+'日';
                            }else if(i == 5){
                                this.day5 = this.match(d)+'  '+dm+'月'+dd+'日';
                            }else if(i == 6){
                                this.day6 = this.match(d)+'  '+dm+'月'+dd+'日';
                            }

                        })

                    })
                    }

                }
            })
        },
        match(i){
            if(i == 0){
                return "星期日";
            }else if(i == 1){
                return "星期一";
            }else if(i == 2){
                return "星期二";
            }else if(i == 3){
                return "星期三";
            }else if(i == 4){
                return "星期四";
            }else if(i == 5){
                return "星期五";
            }else if(i == 6){
                return "星期六";
            }
        },
        //排班翻页
        pbgetData(current){
            this.axios.get('/scheduling/query?offset='+current+'&uid='+this.uid).then(res=>{
                if(res.data.status==200){
                    this.pbdata=res.data.rows
                    this.pbtotal=res.data.total
                    this.pbpageSize=res.data.pageSize//
                    this.selecTime=new Date(this.pbdata[0].scheduling[0].startTime).toLocaleDateString().replace(/\//g,'-')+' '+'—'+' '+new Date(this.pbdata[0].scheduling[0].endTime).toLocaleDateString().replace(/\//g,'-')
                    this.pbdata.forEach((x,index)=>{
                        x.scheduling.forEach((j,i)=>{
                            switch(j.type){
                                case 0:
                                    j.isxx='休息'
                                break;
                                case 1:
                                    j.isxx='值班'
                                break;

                            }
                            let d= new Date(j.scheduling).getDay()
                            if(i == 0){
                                this.day0 = this.match(d);
                            }else if(i == 1){
                                this.day1 = this.match(d);
                            }else if(i == 2){
                                this.day2 = this.match(d);
                            }else if(i == 3){
                                this.day3 = this.match(d);
                            }else if(i == 4){
                                this.day4 = this.match(d);
                            }else if(i == 5){
                                this.day5 = this.match(d);
                            }else if(i == 6){
                                this.day6 = this.match(d);
                            }

                        })

                    })
                }
            })
        },
        pbchangePageSize(size){
            this.pbpageSize=size
        },
        //点击排班一行
        clickRopb(data){
            this.pbqjObj=data
            this.pbqjID=data.id
            console.log(this.pbqjID)
        },
        //排班请假
        pbqj(){
            if(this.pbqjID==''){
                this.$notify({
                    title:"",//
                    message:'请选中护理员',
                    type: 'error',
                    position: 'bottom-right'
                });
            }else{
                this.pbqjisshow=true
                this.formValidatepbqj.name=this.pbqjObj.name
            }
        },
        //请假弹框选中时间
        changeTimeB(date){
            console.log(date)
            this.formValidatepbqj.btime=date
        },
        changeTimeE(date){
            this.formValidatepbqj.etime=date
        },
        //请假确认PUT /scheduling/add 请假
        surepbqj(){
            this.axios.post('?uid='+this.uid,{
                technicianId:this.pbqjID,
                // type:0,
                reason:this.formValidatepbqj.remark,
                schedulingStart:this.formValidatepbqj.btime,
                schedulingEnd:this.formValidatepbqj.etime,
            }).then(res=>{
                if(res.data.status==200){
                    this.$notify({
                        title:"",//
                        message:'请假成功',
                        type: 'success',
                        position: 'bottom-right'
                    });
                    this.cancelpbqj()
                    this.getpb()
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
        //取消
        cancelpbqj(){
            this.pbqjisshow=false
            this.pbqjisshow=false
            this.formValidatepbqj.btime=''
            this.formValidatepbqj.etime=''
            this.formValidatepbqj.remark=''
            this.pbqjID=''
            this.pbqjObj={}
        },
    },
    mounted(){
        this.getpb()
    }
}
</script>
<style scoped>
.table-center{
	margin:10px;
}
.normal{
	width:100%;
	height:50px;
	line-height: 50px;
	margin:10px;
	display: flex;
    align-items: center;
  
}
.xx{
	display: inline-block;
	width:30px;
	height:20px;
	background-color: #FCEDED;
	border:1px solid #e4e4e4;
	margin-right:10px;
}
.xx1{
	display: inline-block;
	width:30px;
	height:20px;
	background-color: #F9F9F9;
	border:1px solid #e4e4e4;
	margin-right:10px;
}
</style>


