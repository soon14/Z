<template>
<!--商城公告-->
    <div class="notice">
		<div class='goods-right'>
			<Tabs :animated="false"  style="background:#fff;width:100%;height:100%" @on-click="addBg">
		        <TabPane label="商城公告">
		        	<div class="btns-box">
						<div style='display:flex'>
						</div>
						<div class="right">
							<Button type="primary" style='background:#3b77e3' shape="circle" @click="addNotice">
								<Icon type="plus" style="margin-right:5px;color:#fff"></Icon>
								新建
							</Button>
							<span @click="cancelHome" style="cursor:pointer; margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
						</div>
					</div>
					<div class="table">
						<Table border highlight-row :columns="columns" :data="noticeData"></Table>
						<!--底部的分页-->
						<div class="page-box">
							<Page :total="total" show-total size='small' :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
						</div>
					</div>
		        </TabPane>
		        <Button type="ghost" @click="cancelHome" size="small" slot="extra" style='margin-top:3px;margin-right:20px'>返回</Button>
		    </Tabs>
		</div>
	<!--新建弹框-->
	<Modal v-model="noticeinshow" width="660px">
		<p slot="header" style="height:30px;line-height:30px">
			<span v-if='isshow'>新建公告</span>
			<span v-if='!isshow'>修改公告</span>
		</p>
		<div>
			<Form ref="formNotice" :model="formNotice" :rules="formNoticeRule" :label-width="60" v-if='isshow'>
                <FormItem label="标题" prop="title">
                    <Input v-model='formNotice.title' :maxlength="50" placeholder="请输入标题 最多50个字符"></Input>
                    <div style="text-align:left">{{formNotice.title.length}} / 50</div>
                </FormItem>
                <FormItem label="内容" prop="content">
                    <Input type="textarea"  :rows="5"  placeholder="请输入内容" v-model='formNotice.content'></Input>
                   
                </FormItem>
	        </Form>
	        <Form ref="formNoticeE" :model="formNotice" :rules="formNoticeRule" :label-width="60" v-if='!isshow'>
                 <FormItem label="标题" prop="title">
                    <Input v-model='formNotice.title' :maxlength="50" placeholder="请输入标题 最多50个字符"></Input>
                    <div style="text-align:left">{{formNotice.title.length}} / 50</div>
                </FormItem>
                <FormItem label="内容" prop="content">
                    <Input type="textarea"  :rows="5"  placeholder="请输入内容" v-model='formNotice.content'></Input>
                    
                </FormItem>
	        </Form>
		</div>
		<div slot="footer">
			<Button shape="circle" type="ghost" style="background:#ACACAC;border:none;color:#fff" @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
			<Button shape="circle" type="ghost" style="background:#3b77e3;color:#fff;border:none" 
				@click="makegoods('formNotice')"v-if='isshow'><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>
				确认
			</Button>

			<Button type="primary" style='background:#40ca98;border:none' shape="circle" @click="makegoodsedit('formNoticeE')" v-if='!isshow'>
                <i class="el-icon-edit" style=";margin-right:5px;"></i>
                修改
            </Button>
		</div>
	</Modal>
    </div>
</template>
<script>
export default {
    data(){
    	return {
    		isshow:true,//新建还是修改
    		noticeinshow:false,//弹框
    		formNotice:{
    			title:"",
    			content:""
    		},
    		formNoticeRule:{
    			title:[{ required: true, message: '请填写标题', trigger: 'blur' }],
    			content:[{ required: true, message: '请填写内容', trigger: 'blur' }],
    		},
    		title:"公告管理",
    		noticeId:"",
    		columns:[
    			{
    				title:"标题",
    				key:"title",
    				width:160
    			},
    			{
    				title:"内容",
    				key:"content"
    			},
    			{
    				title:"状态",
    				width:80,
    				key:"statusDesc"
    			},
    			{
    				title:"操作",
    				width:100,
    				align:"center",
    				key:"action",
    				render:(h,params)=>{
    					return h('div',[
    						h('span',{
    							style:{
    								marginRight:"10px",
    								cursor:"pointer",
    								color:"#4283EB"
    							},
    							on:{
    								"click":()=>{
    									this.noticeId=params.row.id
    									this.formNotice.title=params.row.title
    									this.formNotice.content=params.row.content
    									this.noticeinshow=true
    									this.isshow=false
    								}
    							}
    						},'修改'),


    						h('span',{
    							style:{
    								color:'#d53c39',
									cursor:'pointer'
    							},
    							on:{
    								"click":()=>{
    									this.remove(params.row.id,params.row.title)
    								}
    							}
    						},'删除'),

    					])
    				}
    			},
    		],
    		noticeData:[],
    		total:0,
    		pageSize:0,
    		uid:this.$store.state.common.token,
    		numIndex:0,
    		NoticeSide:[
    			{
    				label:"公告管理"
    			},
    		]
    	}
    },
    methods:{
    	//单击左侧列表
		addBg(index){
			this.numIndex=index
			switch(this.numIndex){
				case 0:
					this.title="公告管理"
					this.getNotice()
				break;
			}
		},
		//新建公告
		addNotice(){
			this.formNotice.title=""
    		this.formNotice.content=""
			this.noticeinshow=true
			this.isshow=true
		},
		//公告确认
		makegoods(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.axios.post('op/notice/add?uid='+this.uid,{
						title:this.formNotice.title,
						content:this.formNotice.content
					}).then(res=>{
						if(res.data.status==200){
							this.$notify({
						        title: '',
						        message: '新建成功',
						        type: 'success',
						        position: 'bottom-right'
					        });
					        this.formNotice.title=""
    						this.formNotice.content=""
							this.noticeinshow=false
					        this.getNotice()
						}else{
							this.$notify({
						        title: '',
						        message: '新建失败',
						        type: 'error',
						        position: 'bottom-right'
					        });
						}
					})
				}
			})
		},
		//修改确认
		makegoodsedit(name){
			this.$refs[name].validate((valid) => {
				if(valid){
					this.axios.put('op/notice/update?uid='+this.uid,{
						id:this.noticeId,
						title:this.formNotice.title,
						content:this.formNotice.content
					}).then(res=>{
						if(res.data.status==200){
							this.$notify({
						        title: '',
						        message: '修改成功',
						        type: 'success',
						        position: 'bottom-right'
					        });
					        this.formNotice.title=""
    						this.formNotice.content=""
    						this.noticeId=""
							this.noticeinshow=false
					        this.getNotice()
						}else{
							this.$notify({
						        title: '',
						        message: '修改失败',
						        type: 'error',
						        position: 'bottom-right'
					        });
						}
					})
				}
			})
		},
		//取消新建
		modelCancel(){
			this.formNotice.title=""
			this.formNotice.content=""
			this.noticeinshow=false
		},
		//返回
		cancelHome(){
			this.$router.push('/operationhome')
		},
		//删除
		remove(id,name){
			this.$Modal.confirm({
                title: '删除公告'+' '+ name,
                content: '<p>确定要删除吗?</p>',
                onOk: () => {
                    this.axios.delete('op/notice/delete/'+id+'?uid='+this.uid).then(res=>{
						if(res.data.status==200){
							this.$notify({
						        title: '',
						        message: '删除成功',
						        type: 'success',
						        position: 'bottom-right'
					        });
					        this.getNotice()
						}else{
							this.$notify({
						        title: '',
						        message: '删除失败',
						        type: 'error',
						        position: 'bottom-right'
					        });
						}
					})
                }
            });
			
		},
		//获取公告列表
		getNotice(){
			this.axios.get('op/notice/query?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data
					this.noticeData=data.rows
					this.total=data.total
					this.pageSize=data.pageSize
				}
			})
		},
		getData(current){
			this.axios.get('op/notice/query?offset='+current+'&uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data
					this.noticeData=data.rows
					this.total=data.total
					this.pageSize=data.pageSize
				}
			})
		},
		changePageSize(size){
			this.pageSize=size
		},
    },
    mounted(){
    	this.getNotice()
    }
}
</script>
<style scoped>
.notice{
	width: 100%;
	height: 100%;
	background: rgb(230,233,236);
	display:flex;
	overflow: hidden;
}
.goods-right{
 	width: 100%;
 	background: #fff;
 	overflow: auto;
}
.goods-left{
	width: 120px;
	margin-right: 3px;
	flex: 0 0 120px;
	font-size: 14px;
	background: #fff;
}
.goods-left li{
	list-style: none;
	height:40px;
	line-height: 40px;
	width:100%;
}
.goods-left li span{
	margin-right:10px;
}
.left-top{
	height:50px;
	line-height: 50px;
	border-bottom:1px solid #F5F5F5;
	display: flex;
	justify-content: space-around;
}
.btns-box {
	height: 40px;
	display:flex;
	justify-content: space-between;
	line-height: 40px;
	background: #fff;
	border-bottom:1px solid #e4e4e4;
}
.table{
	margin:10px;
}
 .wldw{
	margin-left:10px;
	width:300px;
}
.right{
	margin-right:20px;
	margin-bottom:10px;
}
.bg{
	background: #EBF1FC
}
.page-box{
	margin:5px 0 120px 0;
}
</style>
