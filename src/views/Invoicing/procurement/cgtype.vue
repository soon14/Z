<template>
	<div>
		<!--固定导航-->
		<div class="head">
			<Col span='6'>
				<div class="left-top">
					<p class="wldw">
						<span style="width:42px;font-weight:900">订单：</span>
						 <!-- <Select style="width:100px" size="small" placeholder="全部">
					        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
					    </Select> -->
					</p>
					<div>
						<span class="top-left-btn"  @click="">
							<Icon type="plus" style="position:absolute;top:7px;left:8px"></Icon></span>
						<span class="top-left-btn top-left-btn1">
							<Icon type="navicon-round" style="position:absolute;top:7px;left:8px"></Icon></span>
					</div>
				</div>
			</Col>
			<Col span='18'>
				<div class="right-top">

				<div >
					<span style="margin-left:40px;font-size:14px;font-weight:900">xxxx</span> 
				</div>
				<div style="margin-right:110px">
					<div v-if="addText">
						<Button shape="circle"  style="background:#00A8FF;margin-right:5px;color:#fff;border:none" @click="save" >
						<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>完成</Button>
						
						<Button shape="circle"  @click=""  style="background:#999999;color:#fff;margin-right:10px;" ><Icon type="close" style="margin-right:5px;"></Icon>取消</Button>
						
						<span @click="" style="cursor:pointer"><Icon type="close" class="cha" ></Icon></span>
					</div>

					<!-- <div v-if="!addText" class="changebutton">

						<Button type="ghost"  shape="circle"  @click="" v-if="editshow" style	="background:#278A8B;margin-right:5px;color:#fff;border:none">
							<Icon type="edit" style="position:relative;right:5px"></Icon>
						修改
						</Button>

						<Button type="ghost"  shape="circle" @click="" v-if="!editshow" style="background:#00A8FF;margin-right:5px;color:#fff;border:none">
							<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>完成
						</Button>
						<Button shape="circle" v-if="!editshow"  @click=""  style="background:#999999;color:#fff;margin-right:10px;" ><Icon type="close" style="margin-right:5px;"></Icon>取消</Button>
						<Poptip placement="bottom-end">
							<div type="ghost">
								<Button shape="circle"  type="ghost" style="color:#308DBF">
									<Icon type="navicon" size="14" style="position:relative;right:5px;top:1px"></Icon>更多
									
								</Button>
							</div>
							<div slot="content" style="width:80px;overflow: hidden;">
								<p style="font-size:14px;color:#0d0d0d;margin-bottom:10px;" @click="">删除</p>

								</div>
						</Poptip>
						<span @click="" style="cursor:pointer"><Icon type="close" class="cha" ></Icon></span>
				</div> -->
								
				</div>		
			</div>
			</Col>
		</div>
		<div class="type-left">
			<div class="con-list" v-for="(item,index) in dataList" @click="" >
				 <!-- <span style="margin-right: 10px;"><Checkbox v-model="isindex"></Checkbox></span> -->
				 <div>
				<p class="list-title">{{item.title }}</p>
				<p class="txt" style="margin-top:10px;">{{item.value}}</p>
				<p class="txt">{{item.orderCode}}</p>
				<span class="date">{{item.group }}</span>
				</div>
			</div>
		</div>
		<div class="type-right">
			<Col span='12'>
				<div class="list-box">
					<span>group : </span>
					<Input  placeholder="group" v-model="group"></Input>
				</div>
				<div class="list-box">
					<span>title : </span>
					<Input  placeholder="title" v-model="title"></Input>
				</div>
				<div class="list-box">
					<span>value : </span>
					<Input  placeholder="value" v-model="value"></Input>
				</div>
				<div class="list-box">
					<span>remark : </span>
					<Input  placeholder="remark" v-model="remark"></Input>
				</div>
			</Col>
			<Col span='12'>
				<div class="list-box">
					<span>key : </span>
					<Input  placeholder="key" v-model="key"></Input>
				</div>
				<div class="list-box">
					<span>updateTime : </span>
					<Input  placeholder="updateTime" v-model="updateTime"></Input>
				</div>
				<div class="list-box">
					<span>ownerType : </span>
					<Input  placeholder="ownerType" v-model="ownerType"></Input>
				</div>
				<div class="list-box">
					<span>ownerId : </span>
					<Input  placeholder="ownerId" v-model="ownerId"></Input>
				</div>
			
			</Col>
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			uid: this.$store.state.common.token,
			addText:true,
			editshow:false,
			dataList:[],
			group:'',
			id:'',
			key:'',
			orderCode:'',
			ownerId:'',
			ownerType:'',
			remark:'',
			status:'',
			title:'',
			updateTime:'',
			value:''
		}
	},
	methods:{
		//保存采购类型
		save(){
			this.axios.post('potype/add?uid='+this.uid,{
				key:this.key,
				orderCode:this.orderCode,
				ownerId:this.ownerId,
				ownerType:this.ownerType,
				remark:this.remark,
				status:this.status,
				title:this.title,
				updateTime:this.updateTime,
				value:this.value
			}).then((res)=>{
				console.log(res)
				if(res.data.status==200){
					this.$Notice.success({
						title:"",//
						desc: '成功'
					});
					console.log(res.data.rows)
				}else{
					this.$Notice.error({
						title:"",//
						desc: '失败'
					});
				}
			})
		},
		getAllList(){
			this.axios.get('potype/query?uid='+this.uid).then((res)=>{
				if(res.data.status==200){
					this.dataList = res.data.rows
				}
			})
		}
	},
	mounted(){
		this.getAllList()
	}
}
</script>
<style type="text/css" scoped>
.top-left-btn{
		background: #3B77E3;
	    margin-right: 10px;
	    color: #fff;
	    border: none;
	    width: 26px;
	    height: 26px;
	    border-radius: 26px;
	    display: inline-block;
	    position: relative;
	    top: 12px;
	}
	.top-left-btn1{
		background: #FF7D16;
	}
	.top-left-btn:hover{
		cursor:pointer;
	}
.left-top{
	height: 60px;
	width:25%;
	line-height: 60px;
	position:fixed;
	z-index:9;
	display:flex;
	background: #fff;
	padding-right:10px;
	
	border-right:1px solid #eee;
	justify-content: space-between;
}
.right-top{
	height: 60px;

	
	line-height: 60px;
	position:fixed;
	z-index:10;
	display:flex;
	width:70%;
	margin-left:25%;
	background: #fff;
	justify-content: space-between;

}
.type-left{
	width: 25%;
  
    position: fixed;
    top: 110px;
}
.type-right{
	width: 70%;
    margin-left: 30%;
   
    padding-top: 60px;
}
.list-box{
	display: flex;
	height:35px;
	line-height: 35px;
	margin:20px 10px;
}
.list-box span{
	height:40px;
	width:118px;
	text-align: center;
	padding:0 10px;
}
.right-content {
	width: 70%;
	padding-top: 60px;
	margin-left:30%;

}
.list-box input.ivu-input{
	height:40px!important;
}
.con-list {
	display:flex;
	align-items: center;
	width: 100%;
	word-wrap:break-word;
	
	border: solid 1px #EFEFEF;
	padding: 15px 25px;
	
	cursor: pointer;
	position:relative;
}
.con-list:hover{
	cursor:pointer;
}
.con-list .date{
	position:absolute;
	right:10px;
	top:10px;
}
.con-list .status{
	width:100px;
	
	text-align: center;
	position: absolute;
    right: 0px;
    top: 47px;
}
.con-list .list-title {
	color: #0d0d0d;
	font-size: 14px;
	margin-bottom: 10px;
}



.con-list .txt {
	color: #585858;
	font-size: 12px;
	}
</style>