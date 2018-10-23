<template>
	<div class="autoReply">
		
		<div style="position:relative;top:5px;left:5px">
			<Tabs type="card" :animated='false'>
		        <TabPane label="关键词自动回复">
		        	
			    	<div class="table">
						<Button type="primary" style='background:#44BB00;border:none;margin-bottom:20px;margin-left:10px' @click="addhf">
						 	<Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>新建回复
						</Button>
					</div>
					<div class="tableContent">
						<Table border size="small" :columns="allAutoReplayKey" :data="allAutoReplay"></Table>
						<div class="page-box" v-if='totalReplay!=0'>
							<Page :total="totalReplay" size="small" show-total  :pageSize='pageSizeReplay'  @on-change="getDataReplay" @on-page-size-change="changePageSizeReplay">
					 		</Page>
				 		</div>
			 		</div>
				</TabPane>
		        <TabPane label="关注后自动回复">
		        	<div class='hfdata'>
		        		<Button type="primary" style='background:#44BB00;border:none;margin-bottom:20px;margin-left:10px' @click="saveReply">
						 	<Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>保存
						</Button>
						<Uediter :value="ueditor.value" :id='editor1' :config="ueditor.config" ref="ue"></Uediter>
					</div>
		        </TabPane>
	    	</Tabs>
    	</div>
    	<!--回复内容：-->
	<Modal v-model="hfisshow" width="560px" title='自动回复' :closable='false'>
		<div style='height:40px;display:flex;line-height:36px;text-align:center'>
			<span style='width:100px'>关键词：</span>
			<Input v-model='keyword'></Input>
		</div>
		<div style='display:flex;line-height:36px;text-align:center'>
			<span style='width:100px'>回复内容：</span>
			<div style="width:100%;">
			<Input v-model='replyContent' type="textarea" :maxlength='255' :rows="6" placeholder="最大字数255" style="width:100%"></Input>
			
			<div style="text-align:right">{{replyContent.length}} / 255</div>
			</div>
		</div>
		<div slot="footer">
			<div >
				<div>
				 <Button shape="circle" type="ghost" style="display:inline-block;background:#acacac;color:#fff" @click="cancel"><Icon type="close" style=";margin-right:5px;color:#fff"></Icon>取消</Button>
				 <Button shape="circle" type="ghost" style="display:inline-block;background:#44BB00;color:#fff" @click="sure" v-if='addsure'><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
				 <Button shape="circle" type="ghost" style="display:inline-block;background:#44BB00;color:#fff" @click="sureedit" v-if='!addsure'><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>修改</Button>
				</div>
			</div>
		</div>
	</Modal>
	
	</div>
</template>
<script type="text/javascript">
import '../../../../static/ue/ueditor.config.js'
import '../../../../static/ue/ueditor.all.min.js'
import '../../../../static/ue/lang/zh-cn/zh-cn.js'
import '../../../../static/ue/ueditor.parse.min.js'
import Uediter from '@/components/ue.vue'
export default {
	name:"autoReply",
	components: {Uediter},
	data(){
		return{
			gzreplyContent:'',//关注后自动回复
			//编辑器提交的内容
			editor1:'editor1',
			editor2:'editor2',
	        ueditor: {
	          value: '000',
	          config: {}//编辑器配置
	        },
			social:[],
			content:'',//消息托管编辑框内容
			contentsmall:'',//小尾巴编辑框内容
			hfisshow:false,//新建回复弹框
			replyContent:"",//回复内容
			keyword:'',//回复关键字
			v:true,
			hfkeywordisshow:false,//关键词的显示
			addkeyword:'',//单独添加的关键词
			addsure:true,//判断弹框确认与修改按钮显示
			allAutoReplay:[],//全部回复内容
			totalReplay:0,
			pageSizeReplay:0,
			allAutoReplayKey:[
				{
					title:"关键词",
					key:"keyword",
					width:120,
					align:"center"
				},
				{
					title:"回复内容",
					key:"replyContent",

				},
				{
					title:"操作",
					width:120,
					key:"action",
					render:(h,params)=>{
						return h('div',[
								h('a',{
									on:{
										"click":()=>{
											this.editAutoReply(params.row)
										}
									}
								},'编辑'),
								h('a',{
									style:{
										marginLeft:"10px"
									},
									on:{
										"click":()=>{
											this.deleteAutoReply(params.row)
										}
									}
								},'删除'),
							])
					}
				},
			],//全部回复内容
			uid: this.$store.state.common.token,
			allreplyContent:[],//关注后自动回复的数据
			replyContent:'',//关注后自动回复的内容
		}
	},
	methods:{
		//获取全部回复
		getAutoReplay(){
			this.axios.get('weixin/auto/query?uid='+this.uid).then(res=>{
				console.log(res.data)
				if(res.data.status==200){
					this.allAutoReplay=res.data.rows
					this.totalReplay=res.data.total
					this.pageSizeReplay=res.data.pageSize
				}
			})
		},
		getDataReplay(current){
			this.axios.get('weixin/auto/query?offset='+current+'&uid='+this.uid).then(res=>{
				console.log(res.data)
				if(res.data.status==200){
					this.allAutoReplay=res.data.rows
					this.totalReplay=res.data.total
					this.pageSizeReplay=res.data.pageSize
				}
			})
		},
		changePageSizeReplay(size){
			this.pageSizeReplay=size
		},
		//新建回复
		addhf(){
			this.hfisshow=true
			this.addsure=true
			this.keyword=''
			this.replyContent=''
		},
		//新建自动回复，回复确认
		sure(){
			// var test=/^[A-Za-z\d_\-\u4e00-\u9fa5]{1,255}$/
			// if(!test.test(this.replyContent)){
			// 	this.$notify({
   //                  title:"",//
   //                  message:"超过最大字符数(255)",
   //                  type: 'error',
   //                  position: 'bottom-right'
   //              });
			// }else{
				
			// }
			this.axios.post('weixin/auto/add?uid='+this.uid,{
					keyword:this.keyword,
					replyContent:this.replyContent
				}).then(res=>{
					if(res.data.status==200){
						this.getAutoReplay()//新建成功后重新获取
						this.hfisshow=false
						this.keyword=''
						this.replyContent=''
					}
			})
			
		},
		//编辑弹框
		editAutoReply(item){
			this.hfisshow=true
			this.addsure=false
			this.keyword=item.keyword//当前回复关键字
			this.replyContent=item.replyContent//当前回复内容
			this.id=item.id//当前回复id
		},
		//确认修改按钮
		sureedit(){
			this.axios.put('weixin/auto/update?uid='+this.uid,{
					id:this.id,
					keyword:this.keyword,
					replyContent:this.replyContent
				}).then(res=>{
					if(res.data.status==200){
						this.$notify({
	                        title:"",//
	                        message: this.$t('public.editSuccess'),//
	                        type: 'success',
	                        position: 'bottom-right'
	                    });
						this.hfisshow=false
						this.getAutoReplay()//重新获取回复内容
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
		//添加关键字的确认
		sureKeyword(){
			this.hfkeywordisshow=false
			this.addkeyword=""
		},
		//删除
		deleteAutoReply(item){
			this.axios.delete('weixin/auto/delete/'+item.id+'?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.$notify({
                        title:"",//
                        message: this.$t('public.deleteSuccess'),//
                        type: 'success',
                        position: 'bottom-right'
                    });
					this.getAutoReplay()//重新获取回复内容
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
		//取消
		cancel(){
			this.hfisshow=false
			this.hfkeywordisshow=false
		},
		//关注后自动回复的修改
		saveReply(){
			let msg=this.$refs.ue.getUEContent()
			this.axios.post('weixin/auto/uattnauto?uid='+this.uid,msg).then(res=>{
				if(res.data.status==200){
					this.$notify({
                        title:"",//
                        message: this.$t('public.SaveSuccess'),//
                        type: 'success',
                        position: 'bottom-right'
                    });
					this.getgzcontent()
					this.ueditor.value=''
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
		//删除自动回复
		deleteReply(){
			// this.axios.delete('weixin/focus/delete/'+this.replyContentId+'?uid='+this.uid).then(res=>{
			// 	if(res.data.status==200){
			// 		this.$Notice.success({
			// 			title:"",//
			// 			desc: '清空成功'
			// 		});
			// 		this.getAllReply()//获取所有自动回复的内容
			// 	}else{
			// 		this.$Notice.error({
			// 			title:"",//
			// 			desc: res.data.errorMessage
			// 		});
			// 	}
			// })
		},
		//获取所有关键词自动回复的内容
		// getAllReply(){
		// 	this.axios.get('weixin/focus/query?uid='+this.uid).then(res=>{
		// 		if(res.data.status==200){
		// 			this.allreplyContent=res.data.rows
		// 			this.replyContent=this.allreplyContent[this.allreplyContent.length-1].replyContent
		// 			this.replyContentId=this.allreplyContent[this.allreplyContent.length-1].id
		// 		}
		// 	})
		// },
		//获取关注后自动回复的内容
		getgzcontent(){
			this.axios.get('weixin/auto/vattnauto?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					let data=res.data.rows
					this.ueditor.value=this.$refs.ue.setUEContent(data)
					
				}
			})
		},
		created(){

		},
	},
	mounted(){
		this.getgzcontent()//获取关注后自动回复的内容
		this.getAutoReplay()//获取所有回复的内容
		// this.getAllReply()//获取所有自动回复的内容
	},
}
</script>
<style type="text/css" scoped>
.autoReply{
	height:100%;
	/*margin-bottom:100px;*/
}
.table{
	margin-top:20px;
}
.btns-box {
	width:100%;
	height: 50px;
	display:flex;
	justify-content: space-between;
	line-height: 50px;
	border-bottom:1px solid #e4e4e4;
}
.btns-box .right{
	margin-right:10px;
}
li{
	list-style: none
}
.hfdata{

	margin:0 10px;
	margin-bottom:10px;
}
.page-box{
	margin-top:5px;
	margin-bottom:100px;
}
.tableContent{
	padding:0 10px;
}
.hfdata li{
	
	display:flex;
	justify-content: space-between;
	border:1px solid #E3E3E3;
}
.hfdata li.li2{
	
	display:flex;
	justify-content: flex-start;
}
.hfdata:last-child{
	margin-bottom:250px;
}
.msg{
	background: #F8F8F8;
	padding:30px;
	display:flex;
	justify-content: space-between;
	align-items: center;
}
.hftitle{
	width:100%;
	height:30px;
	line-height: 30px;
	margin:20px auto;
	text-align: center;
}
.timeTable li{
	height:60px;
	line-height: 60px;
	width:100%;
	display:flex;
	border:1px solid #ccc;
}
.edit{
	margin-top:10px;
	margin-bottom:200px;
}
.hfeverydata li.li2{
	border:1px solid #ccc;
}
.hfeverydata li.li3{
	height:60px;
	line-height: 60px
}
.hfeverydata li.li3{
	border:1px solid #ccc;
	display: flex;
	border-left:none;
	border-bottom:none;
	justify-content: space-between;
}
</style>
