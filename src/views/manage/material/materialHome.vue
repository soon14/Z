<template>
	<!--管理-->
	<div class="units-box">
		<div style='display:flex;height:100%;overflow:hidden'>
			<!-- <div class='main-left'>
				<div style='height: 50px; border-bottom: 1px solid rgb(228, 228, 228); font-size: 18px; font-weight: 900; line-height: 50px;'>
					<div style='margin-left:10px'>素材管理</div>
				</div>
				<li v-for='(item,index) in fhlist' @click='getfhlistbg(index)' :class="{borIndex:index==fhindex}">
					<span>{{item.label}}</span>
				</li>
			</div> -->
			<Tabs :animated="false" style="background:#fff;width:100%;height:100%">
		        <TabPane label="商品">
		        	<div class="right-main">
						 <div class="material-right-content">
							<el-upload
							  class="upload-demo"
							  drag
							  :show-file-list="false"
							  :action="goodsImgs"
							  :on-progress='onprogressGoods'
							  :on-success='successGoods'
							  :before-upload='beforeAvatarUploadGoods'
							  multiple accept="image/*">
							  <i class="el-icon-upload"></i>
							  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							  <div v-if='loadingisshow' >
								<Spin>
									<mu-icon value="rotate_right" color="blue"  class="demo-spin-icon-load"></mu-icon>
									<div>Loading...</div>
								</Spin>
				            </div>
							</el-upload>
						</div>
						<div class="waterHeight">
							<vue-waterfall-easy ref="waterfall" :imgsArr="imgsArr" :imgWidth="180" :reachBottomDistance="50" @scrollReachBottom="getData">
								<div slot="waterfall-over">数据已全部加载完成</div>
							</vue-waterfall-easy>
						</div>
					</div> 
		        </TabPane>
		    </Tabs>
			

		</div>
	</div>
</template>
<script>
import LoadUrl from '@/components/common/actionLoad'
import vueWaterfallEasy from 'vue-waterfall-easy'

	export default {
		components: {
			    vueWaterfallEasy,
			},
		data() {
			return {
				fhindex:0,
				fhlist:[
					{
						label:"商品图片",
						value:0
					},
				],
				imgName:"商品图片",
				loadingisshow:false,
				group:0,//每次滚动加载的图片数量
				
				imgsArr:[],
				uid:this.$store.state.common.token,
				goodsImgs:LoadUrl.httpPrefix.Url+'file/action/upload/image/url?c='+this.imgName+'&uid='+this.$store.state.common.token,
			}
		},
		methods: {
			//切换
			getfhlistbg(index){
				this.fhindex=index
				if(this.fhindex==0){
					this.imgName="商品图片"
				}
				if(this.fhindex==1){
					
				}
			},
			//滚动获取图片
			getData(){
				this.axios.get('/file/action/query?offset='+this.group+'&uid='+this.uid).then(res => {
					if(res.data.status==200){
							this.group++
							let data=res.data.rows
							if(data<11){
								this.$refs.waterfall.waterfallOver()
								return
							}
				          	data= data.concat(data)
			          		data.forEach(x=>{
			          			let Obj={
					          		src:x.thumbUrl,
					          		link:x.thumbUrl,
					          		info:x.fileName
					          	}
					          	this.imgsArr.push(Obj)
			          		})
			          		
					}
					
			    })
			},
			//上传时
            onprogressGoods(event, file, fileList){
            	this.loadingisshow=true
            },
            //上传前
            beforeAvatarUploadGoods(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isPng = file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isJPG && !isPng) {
			          this.$notify({
				        title: "",//'失败',
				        message:this.$t('public.upJpngOrPng'),
				        type: 'error',
				        position: 'bottom-right'
			        });
		        }
		        if (!isLt2M) {
			         this.$notify({
				        title: "",//'失败',
				        message:this.$t('public.upJpngTwoM'),
				        type: 'error',
				        position: 'bottom-right'
			        });
		        }
		        return isJPG || isPng && isLt2M;
		      },
			//上传图片成功
			successGoods(res,file){
				if(file.response.status==200){
					// this.mainPhoto=res.rows.url
					// this.mainImgshw=false
					this.loadingisshow=false
					this.getData()
				}else{
					this.$notify({
				        title: "",//'失败',
				        message:this.$t('public.fileUpError'),
				        type: 'error',
				        position: 'bottom-right'
			        });
				}
			},
		},
		created() {
		    this.getData()
		},
		mounted() {
			let rightHead=$('.material-right-content').height()
			let clientHeight=document.body.clientHeight
			let H=clientHeight-rightHead-150
			$('.waterHeight').height(H)
			
		}
	}
</script>

<style lang="css" scoped>
	.material-right-content {
	    width: 100%;
	    padding:0px 20px 0 10px;
	   
	}

	.units-box {
		width: 100%;
		background: rgb(230,233,236);
	}
	.btns-box {
		width: 100%;
		height: 50px;
		display:flex;
		justify-content: space-between;
		background: #fff;
		line-height: 50px;
	}
	 .wldw{
    	margin-left: 15px;
    	font-size:18px;font-weight:bold;
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
	.main-left{
		width: 120px;
		margin-right: 3px;
		flex: 0 0 120px;
		font-size: 14px;
		background: #fff;
	}
	.main-left li{
		list-style: none;
		padding:10px 0;
		width:100%;
		
	}
	.main-left li span{
		margin-left:20px;
	}
.right-main{
	width:100%;
	background-color: #fff;
}
.borIndex{
	background:rgb(241,245,247);
    color:rgb(59,119,227);
}	
.waterHeight{
	margin-bottom:120px;
}
</style>
<style type="text/css">
.material-right-content .upload-demo .el-upload--text{
	width:100%!important;
}
.material-right-content .upload-demo .el-upload--text .el-upload-dragger{
	width:100%!important;
}
.material-right-content .upload-demo{
	padding:10px 0;
}
</style>