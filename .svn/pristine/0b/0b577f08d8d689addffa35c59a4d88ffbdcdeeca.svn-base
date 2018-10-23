<template>
	<div class='qf'>
		<div style="margin-top:10px">
		<Tabs type="card" :animated='false'>
	        <TabPane label="编辑内容">
	        	
		    	<div class="table">
		    		<div class='choose'>
		    			<span>群发被判定为转载的文章：</span>
						<i-Switch  :value="v"></i-Switch>
		    		</div>
					<div class='choose'>
						<span>选中发送范围：</span>
						
						<RadioGroup v-model="vertical">
					        <Radio label="全部粉丝">
					       
					        </Radio>
					        <Radio label="全部粉丝1">
					          
					        </Radio>
					        <Radio label="手动选中粉丝">
					            
					        </Radio>
					    </RadioGroup>

					</div>
					<div class='sendNum'>
						<div class='sendNum-top'>
							<p><span>将发送给<span style='font-size:18px;font-weight:900'>80000</span>人</span></p>
							<p><span>由于编辑过程中会有粉丝的增加和减少，最后群发人数以群发结果为准。</span></p>
						</div>
					</div>
					<div class='edit'>
						<quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
						      @change="onEditorChange($event)">
						</quill-editor>
						<div class='btn'>
							<Button type="primary" style='border:none' @click="">
								 立即发送
							</Button>
							<Button @click="">
								群发预览
							</Button>
						</div>
					</div>
				</div>
			</TabPane>
	        <TabPane label="发送内容">
	        	<Table  border height="400" :columns="flkey" :data="fldata"></Table>
					<!--分页-->
		            <!-- <div class="page-box" style="text-align:left">
					 <Page :total="total" :pageSize='pageSize' show-sizer @on-change="getData" @on-page-size-change="changePageSize"></Page> </div>-->
				
	        </TabPane>
	        
	       
    	</Tabs>
    	</div>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			v:true,//开发
			//单选框
			vertical:'全部粉丝',
			content:'',//编辑器内容
			fldata:[{}],//发送记录data
			//发送记录key
			flkey:[
				{
					title:"内容",
					key:'',
					
					 ellipsis:true,
				},
				{
					title:"发送状态",
					key:'',
					width:200,
				},
				{
					title:"发送时间",
					key:'',
					width:200,	
				},
				{
					title:"操作",
					key:'action',
					width:100,
					render:(h,params)=>{
						return h('div',[
								h('a',{

								},'撤回  |  '),
								h('a',{

								},'删除'),
							])
					}
				}
			],
		}
	}
}
</script>
<style type="text/css" scoped>
.qf{
	font-size:14px;
}
.choose{
	width:100%;
	margin:20px 0;
	
}
.sendNum{
	width:100%;
	margin-top:50px;
}
.sendNum-top{
	
	width:100%;
	margin:0px auto;
	text-align: center
}
.edit{
	margin-top:10px;
}
.btn{
	margin-top:10px;
}
</style>