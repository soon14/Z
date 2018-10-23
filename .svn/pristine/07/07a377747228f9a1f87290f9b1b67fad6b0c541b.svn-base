<template>
	<div class="imageText">

	    	<!--顶部的按钮-->
		<div class="btns-box">
			<p class="wldw">
			</p>
			<div class="right">
				<Button type="primary" shape="circle" @click="addImgText">
					 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>新建图文
				</Button>

			</div>
		</div>
		<!--图文数据-->
		<div class='imgText-table' v-if='imgtable'>
			<div class='msg'>
				<div class='msg-title'>
					<li><span>标题</span></li>
					<li><span>创建时间</span></li>
					<li><span>上次发送</span></li>
					<li><span>操作</span></li>
				</div>
				<div class='msg-title msg-title1' v-for='(item,index) in dataList'>
					<li>

						<span style='margin-left:10px'>
							<a>{{item.name}}</a>
						</span>

					</li>
					<li>
						<span>{{item.time}}</span>

					</li>
					<li><span>----</span></li>
					<li>
						<div>
						<a @click=''>发送</a>
						-
						<a @click=''>编辑</a>
						-
						<a href="">删除</a>
						</div>
					</li>
				</div>

			</div>
		</div>

		<!--新建图文-->
		<div class='addimgText-main' v-if='imgText'>

			<div class='main-imgtitle'>
				<div>
					<img src="http://img.zsydian.com/img/tuwen.png" width='250' height='50'>
				</div>
				<div class='mark'>
					<img :src="formValidate.photo" width='240' height='150' >
					<span class='topimg' v-if='imgmark'>封面图片</span>
					<span style='margin-right:-210px'><a @click='editBig'>编辑</a></span>
				</div>
				<span class='imgTextTitle'><span style='margin-left:5px'>{{formValidate.name}}</span></span>
				<div style='margin-top:"20px;width:240px;'>

					<div class='listimgText' v-for='(item,index) in listimgTextData' @click='edit(item,index) ':class='{bg:listIndex==index}' v-on:mouseenter='mouseenter(item,index)'>
						<div><span  style='display:inline-block;margin-top:25px'>{{item.name}}</span></div>

						<div>
						<img :src="formValidate2.photo" width='40' height='40' >
						<div style='margin-left:150px'><a @click='editSmall'>编辑</a> | <a @click='deletelistimgText(index)'>删除</a></div>
						</div>
					</div>
					<div class='addlistimgText'>
						<span><a  @click='addOneListImgText'><Icon type="plus-round"></Icon> 新增</a></span>
					</div>
				</div>


			</div>
			<div class='main-imgtitle-right'>
				<div v-if='smallOrBig'>
					 <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

						<FormItem label="标题：" prop="name">
				            <Input v-model="formValidate.name" placeholder="标题" style='width:200px'></Input>
				        </FormItem>
						<FormItem label="作者：" prop="title">
					            <Input v-model="formValidate.title" placeholder="选填" style='width:200px'></Input>
					    </FormItem>
						<FormItem label="封面：" prop="photo">

				            <span>封面（图片建议尺寸：900 x 500像素）</span>
				    	</FormItem>
						<FormItem>
						<div class='upimg'>
							<el-upload
							  class="upload-demo"
							  action="uplocation"
								:show-file-list="false"

							  :on-success="addsucess"
							  >
							  <a>添加图片</a>

							</el-upload>

						</div>
						</FormItem>
					</Form>

					<div class='UE'>
					<Col span='10'>
					<quill-editor v-model="contentsmall" ref="myQuillEditor" @change="onEditorChange($event)">
							</quill-editor>
						<!-- <Uediter :value="ueditor.value" :id='editor1' :config="ueditor.config" ref="ue"></Uediter> -->
					</Col>
					</div>
				</div>
				<div v-if='!smallOrBig'>
					 <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="80">

						<FormItem label="标题2：" prop="name">
				            <Input v-model="formValidate2.name" placeholder="标题" style='width:200px'></Input>
				        </FormItem>
						<FormItem label="作者：" prop="title">
					            <Input v-model="formValidate2.title" placeholder="选填" style='width:200px'></Input>
					    </FormItem>
						<FormItem label="封面：" prop="photo">

				            <span>封面（图片建议尺寸：900 x 500像素）</span>
				    	</FormItem>
						<FormItem>
						<div class='upimg'>
							<el-upload
							  class="upload-demo"
							  action="uplocation"
								:show-file-list="false"

							  :on-success="addsucess2"
							  >
							  <a>添加图片</a>

							</el-upload>

						</div>
						</FormItem>
					</Form>

					<div class='UE'>
					<Col span='10'>
					<quill-editor v-model="contentsmall" ref="myQuillEditor" @change="onEditorChange($event)">
							</quill-editor>
						<!-- <Uediter :value="ueditor.value" :id='editor1' :config="ueditor.config" ref="ue"></Uediter> -->
					</Col>
					</div>
				</div>
				<div class='imgSaveBtn'>
					<Button type="primary" style=';margin-left:20px;width:80px' @click="handleSubmit('formValidate')">发送</Button>
					<Button type="primary" style=';margin-left:20px;width:80px' @click="handleSubmit('formValidate')">保存</Button>
					<Button style='background:#e4e4e4;margin-left:20px;width:80px'>预览</Button>
				</div>
			</div>

		</div>
	</div>
</template>
<script type="text/javascript">
import LoadUrl from '@/components/common/actionLoad'
import Uediter from '@/components/ue.vue'
export default {
	components: {Uediter},
	data(){
		return{
			// editor1:'editor1',
			// ueditor: {
		 //          value: '',
		 //          config: {}//编辑器配置
		 //        },
		 smallOrBig:true,
		 	photo:'',//小标题图片
		   contentsmall:'',
			name:'标题',
			listIndex:-1,//点击添加背景的小标
			//每条图文数组
			listimgTextData:[

			],
			uplocation:LoadUrl.httpPrefix.Url+'file/action/upload/image/url?uid='+this.$store.state.common.token,
			imgtable:true,
			imgText:false,
			imgmark:true,
			details:'',//图文详细
			formValidate:{
				name:'',
				title:'',
				photo:'',//封面图片
			},
			ruleValidate:{
				name:[
					 { required: true, message: '标题不能为空', trigger: 'blur' }
				],
				photo:[
					 { required: true, message: '图片不能为空', trigger: 'blur' }
				],

			},
			//小图文
			formValidate2:{
				name:'',
				title:'',
				photo:'',//封面图片
			},
			ruleValidate2:{
				name:[
					 { required: true, message: '标题不能为空', trigger: 'blur' }
				],
				photo:[
					 { required: true, message: '图片不能为空', trigger: 'blur' }
				],

			},
			dataList:[
				{
					name:'我是标题',

					time:'2018-3-9'
				},
				{
					name:'我是标题',

					time:'2018-3-9'
				},
			]
		}
	},
	methods:{
		//新建图文按钮
		addImgText(){
			this.imgText=true
			this.imgtable=false

		},
		//输入框改变时的name值
		nameBlur(e){
			this.name=e.target.value
		},
		//增加一条图文
		addOneListImgText(){
			this.listimgTextData.push({'name':this.name,'img':''})
		},
		//修改增加的图文
		edit(item,index){
			this.listIndex=index
		},
		//上传图片成功
		addsucess(res,file){
			this.formValidate.photo=res.rows.url

			if(this.formValidate.photo==''){
				this.imgmark=true
			}else{

				this.imgmark=false

			}
		},
		//上传图片成功
		addsucess2(res,file){
			this.formValidate2.photo=res.rows.url

			// if(this.formValidate2.photo==''){
			// 	this.imgmark=true
			// }else{

			// 	this.imgmark=false

			// }
		},
		//移入
		mouseenter(){

		},
		//删除一条
		deletelistimgText(index){
			this.listimgTextData.splice(index,1)
		},
		//编辑器文本改变
		onEditorChange({ editor, html, text }){
			this.details=html
			console.log(text)
		},
		//点击小图文编辑
		editSmall(){
			this.smallOrBig=false
		},
		//点击大图文编辑
		editBig(){
			this.smallOrBig=true
		},
		//保存图文
		handleSubmit (name) {
			this.$router.go({path:'/wxHome'})

            this.$refs[name].validate((valid) => {
                if (valid) {

                	this.imgtable=true
                	this.imgText=false
                	this.formValidate.name=''
                	this.formValidate2.name=''

                } else {
                    this.$notify({
                        title:"",//
                        message: res.data.errorMessage,
                        type: 'error',
                        position: 'bottom-right'
                    });
                }
            })
        },
	},
	mounted(){

	}
}
</script>
<style type="text/css" scoped>
.imageText{
	width: 100%;
	height:100%;
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
.imgText-table{
	width:100%;
	height:100%;

}
.addimgText-main{
	width:100%;
	margin:10px 10px 300px 10px;
	display:flex;


}
.main-imgtitle{
	width:250px;

	display:flex;
	flex-direction: column;
	align-items: center;
	border:1px solid #ccc;
	margin-right:10px;

}
.mark{
	width:250px;

	display:flex;
	flex-direction: column;
	align-items: center;
	position:relative;
}
.mark img{
	vertical-align: middle;
	margin-top:10px;
	border:none;
}
.topimg{
	position:absolute;
	top:10px;
	left:4px;
	z-index:9;
	width:240px;
	height:150px;
	line-height: 150px;
	font-size:16px;
	text-align: center;
	margin:0 auto;
	color:#C0C0C0;
	background: #ECECEC
}
.imgTextTitle{
	display:block;
	text-align:left;width:240px;height:30px;line-height: 30px;
	background: #5E5E5E;
	overflow: hidden;
	color:#fff;

}
.main-imgtitle-right{


}
.UE{
	margin-left:33px;
	margin-top:-30px;
}
.imgText-list{
	display:flex;
	height:35px;
	line-height: 35px
}
.text-title{
	width:60px;
}
.text-title1{
	width:100%;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .avatar {
    width: 180px;
    height: 90px;
    display: block;

  }
  .upimg{
  	margin-left: -60px;


  }
  .listimgText{
  	width:240px;

  	display:flex;
  	justify-content: space-between;
  	border-bottom:1px solid #ccc;
  }

  .listimgText img{
  	vertical-align: middle;

    margin: 7px 0 7px 160px;
  }
  .addlistimgText{
  	width:240px;
  	margin:4px auto;

  	text-align: center;
  }
  .bg{
  	background:#f8f8f8;
  }
  .msg{
	margin-top:10px;
}
.msg-title{
	height:40px;
	line-height: 22px;
	background: #F8F8F8;
	border-bottom:1px solid #e4e4e4;
	display:flex;
	justify-content: space-around;
}
.msg-title{
	display:flex;
	justify-content: space-around;
	padding-top:10px;
}
.msg-title li{
	text-align: center
}
.msg-title img{
	vertical-align: top
}
.msg-title li:nth-child(1){
	width:200px;

}
.msg-title li:nth-child(2){
	width:200px;

}
.msg-title li:nth-child(3){
	width:200px;

}
.msg-title li:nth-child(4){
	width:100px;

}
.msg-title1{
	background: #fff;
	height:auto
}
.msg-title1:hover{
	background: #f8f8f8
}
.msg-title1 li{
	height:auto;
}
.msg-title1{
	line-height: 40px
}
.imgSaveBtn{
	position:fixed;
	bottom:0;

	transform: translateX(60px);
	height:35px;
	width:100%;
	background: #f8f8f8;
	z-index:999999999;
}
li{
	list-style: none
}
.editlistimgText{
	position:absolute;
	top:0;
	right:0;
}
</style>

