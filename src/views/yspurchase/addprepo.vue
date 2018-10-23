<template>
	<div class='addCrm'>
	<!--采购预测-->
		<div class="head">
			<Col span='6'>
				<div class="left-top">
					<p class="wldw">
						<span style="width:42px;font-weight:900">筛选：</span>
						 <Select style="width:100px"  placeholder="全部"  @on-change="orderselected">
					        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
					    </Select>
					</p>
					<div>
						<!--新建-->
						<span class="top-left-btn"  @click="add">
							<Icon type="plus" style="position:absolute;top:7px;left:8px"></Icon></span>
						
					</div>
				</div>
			</Col>
			<Col span='18'>
				<div class="right-top">

				<div >
					<span style="margin-left:40px;font-size:14px;font-weight:900;font-size:19px">{{addoredit}}</span> 
				</div>
				<div style="margin-right:120px">
					<div v-if="addText">
						<!-- <Button shape="circle"  style="background:#3b77e3;margin-right:5px;color:#fff;border:none" @click="saveCgInfo" >
						<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>保存</Button>
						
						<Button shape="circle"  @click="addCancel"  style="background:#999999;color:#fff;margin-right:10px;" ><Icon type="close" style="margin-right:5px;"></Icon>取消</Button> -->
						
						<span @click="cancelHome" style="cursor:pointer"><Icon type="close" class="cha" ></Icon></span>
					</div>

					<div v-if="!addText" class="changebutton">

						<!-- <Button type="ghost"  shape="circle"  @click="edit" v-if="editshow" style="background:#40ca98;margin-right:5px;color:#fff;border:none">
							<Icon type="edit" style="position:relative;right:5px"></Icon>
						修改
						</Button>

						<Button type="ghost"  shape="circle" @click="saveEdit" v-if="!editshow" style="background:#3b77e3;margin-right:5px;color:#fff;border:none">
							<Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>保存
						</Button>
						<Button shape="circle" v-if="!editshow"  @click="editCancel"  style="background:#999999;color:#fff;margin-right:10px;" ><Icon type="close" style="margin-right:5px;"></Icon>取消</Button> -->
						
						<!-- 更多-->
			            <!-- <Dropdown trigger="click">
			                  <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
			                  <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
			              </Button>

			              <DropdownMenu slot="list">
			                  <span  @click="start"><DropdownItem >启用</DropdownItem></span>
			                  <span  @click="stop"><DropdownItem >停用</DropdownItem></span>
			                  <span  @click="del"><DropdownItem >删除</DropdownItem></span>
			                
			              </DropdownMenu>
			           </Dropdown> -->
						<span @click="cancelHome" style="cursor:pointer;margin-left:5px;" ><Icon type="close" class="cha" ></Icon>
						</span>
					</div>	
				</div>		
				</div>
			</Col>
		</div>
		<!--左侧列表-->
		<div class="left-content">
			<p v-if="Allprepo.length==0" class='scrollFix'>
				<Spin>
	             
	                <div>暂无数据</div>
	            </Spin>
		    </p>
			<Scroll :on-reach-bottom="handleReachEdge" :height="height" v-else>
				<div class="con-list" v-for="(item,index) in Allprepo" :key='index' @click="getcginfo(item.id,index)" :class="{bg:numIndex==index}">
					  <span class='left-img'>
					 	 <img :src="item.headPic" width='60' height='60'>
					 </span> 

					 <div>
					<p class="list-title">{{item.code}}</p>
					<p style='position: absolute;right: 10px;top: 50px;'>{{item.jopTitle}}</p>
					<p class="txt" style="margin-top:10px;">
						{{item.name}} 
						<span style='margin-left:4px'>{{item.gender}}</span>
					</p>
					
					<span class="date">{{item.createTime}}</span>
					
					</div>
				</div>
				
			</Scroll>
		</div>
		<!--右侧-->
		<div class="add-right" >
			
			<!--新增-->
			<div class='right-right' v-if='addText'>
				<Col span='12'>
					
				</Col>
				<Col span='12'>
				
				</Col>
			</div>
			<!--修改-->
			<div class='right-right' v-if='xiugai'>
				<Col span='12'>
				</Col>
				<Col span='12'>
				</Col>
			</div>
			<!--详情-->
			<!--详情明细订单页面-->
			<div class="right-content right-detail" ref="detail" style="display:none">
						
						<div class='detail-top'>
                            <ul class="cgtable">
                                <li>采购订单</li>
                                <li>供应商</li>
                                <li>订单状态</li>
                            </ul>
                            <ul class="cgtable1">
                                <li>{{cgxqInfo.recordNo}}</li>
                                <li>{{cgxqInfo.supplierName}}</li>
                                <li>{{cgxqInfo.statusDesc}}</li>
                            </ul>
                           <ul class="cgtable">
                           		<li>仓库</li>
                                <li>订单日期</li>
                                
                                <li>预期收货日期</li>
                            </ul>
                            <ul class="cgtable1">
                            	<li>{{cgxqInfo.deliverWarehouseName}}</li>
                                <li>{{cgxqInfo.createTime}}</li>
                                
                                <li>{{cgxqInfo.deliveryDate}}</li>
                            </ul>


                             <ul class="cgtable">
                                <li>收货人</li>
                                <li>收货人手机</li>
                                <li>收货人电话</li>
                            </ul>
                            <ul class="cgtable1">
                                <li>{{cgxqInfo.deliverName}}</li>
                                <li>{{cgxqInfo.deliverMobile}}</li>
                                <li>{{cgxqInfo.deliverTel}}</li>
                            </ul>
                        </div>
			</div>	
		</div>
		<!--列表分页-->
	<div class='totBottom'>
        <span>共<span style='color:#ff0000'> {{total}} </span>条</span>
        <span>当前第<span style='color:#ff0000'> {{current}} </span>页</span>
	 </div>
	</div>
</template>
<script type="text/javascript">
// import cityData from '../../../../static/js/citydata.js'
	export default{
		data(){
			return{
				addoredit:'',
				xiugai:false,
				current:1,
				height:'',
				numIndex:0,
				indexId:'',
				addText:true,
				editshow:false,
				storeisshow:false,
				crmCardisshow:false,
				storekeyword:'',
				cartype:'',
				num2:0,
				orderdataList:[],
				pageSize:0,
				total:0,
				titles:["基本信息"],//,"订单","积分","充值历史","消费历史"
				cgxqInfo:{},//详情
				Allprepo:[],
				uid: this.$store.state.common.token,
				orderListname:[
					{
						label:"全部",
						value:0
					},
					{
						label:"未审核",
						value:1
					},
					{
						label:"未签收",
						value:3
					},
					{
						label:"进货单",
						value:5
					},
					{
						label:"退货单",
						value:7
					},
					{
						label:"已签收",
						value:9
					}
				],
				value:'',
				
			}
		},
		methods:{
			//点击新增
			add(){
				
				this.addText = true
				this.xiugai=false
				this.$refs.detail.style.display='none'
			},
			
			//点击新增取消
			addCancel(){
				this.add()
			},
			
			//新建点击完成
			saveCgInfo(){
				
				
			},
			//取消修改
			editCancel(){
				this.addText = false
				this.xiugai=false
				this.editshow=true
				this.$refs.detail.style='block'
			},
			//点击修改
			edit(){
				this.$refs.detail.style.display='none'
				this.editshow=false
				this.xiugai=true
				this.leftphoto=true
				
				this.getprepoDetail(this.indexId)
			},
			//保存修改
			saveEdit(){
				
			},
			//点击差号
			cancelHome(){
				this.$router.push('/prepo')
			},
			//单击左侧列表
			getcginfo(id,index){
				this.numIndex = index
				this.indexId = id
				this.addText = false
				this.xiugai=false
				this.editshow=true
				this.leftphoto=false
				this.addoredit=''
				this.$refs.detail.style.display='block'
				this.getprepoDetail(id)
			},
			//获取采购预测详情prepo
			getprepoDetail(id){
				this.axios.get('prepo/get/'+this.indexId+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
						this.cgxqInfo=res.data.rows
						this.addoredit=res.data.rows.recordNo
					}
				})
			},
			 //下拉框选择
			
			orderselected(value){
				this.value = value
				// this.axios.get('/employee/query/'+'?uid=' + this.uid).then((res) => {
				// 	if(res.data.status == '200') {
				// 		//console.log(this.value)
				// 		let data = res.data
				// 		this.Allprepo = data.rows;
						
				// 		this.isLoading = false
						
						
						
				// 	} else {
				// 		 this.$Message.error(res.data.errorMessage);
				// 	}
				// })
			},
			//删除
			del(){

			},
			//下拉加载更多
            handleReachEdge(){
				this.current++//默认10条
    	 		this.axios.get('prepo/query?offset='+this.current+'&uid='+this.uid).then((res)=>{
	 				if(this.current>Math.ceil(this.total/this.pageSize)){
                        this.current=Math.ceil(this.total/this.pageSize)
                    }
			 		res.data.rows.forEach((item)=>{
			 			
			 			this.Allprepo.push(item)
			 			this.Allprepo.forEach((x,index)=>{
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
			 		})

			 	})
	                  
            },
			 //切换一条页
            getData(current){
                
            },
            //翻页
            changePageSize(size){
               
            },
          
			//获取所有采购预测
	        getMentList(){
	            this.axios.get('prepo/query?uid='+this.uid).then((res)=>{
	            	
	                if(res.data.status==200){
	                	this.Allprepo = res.data.rows
	                	this.total=res.data.total
	                	this.pageSize=res.data.pageSize
	                	console.log(this.Allprepo)
	                }
	                
	               this.Allprepo.forEach((item)=>{
	               	item.createTime = new Date(item.createTime).toLocaleDateString().replace(/\//g,'-')
	               })
	            })
	        },
		},
		created(){
			this.$nextTick(()=>{
				this.getMentList()
			})
		},
		mounted(){
			if(this.$route.query.id){
				this.indexId = this.$route.query.id
				this.numIndex = this.$route.query.index
				this.getcginfo(this.indexId,this.numIndex)
			}
			this.height = document.documentElement.clientHeight
			
			window.onresize=function(){
				this.height = document.documentElement.clientHeight
			}
		}
	}
</script>
<style type="text/css" scoped>
.head{
	height:60px;
	background: #fff;
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
	border-bottom:1px solid #eee;
	border-right:1px solid #eee;
	justify-content: space-between;
}
.right-top{
	height: 60px;

	border-bottom:1px solid #eee;
	line-height: 60px;
	position:fixed;
	z-index:10;
	display:flex;
	width:70%;
	margin-left:25%;
	background: #fff;
	justify-content: space-between;

}
.detail-top{
       margin-top:80px;
       border-bottom:1px solid #f5f5f5;
    }
.detail-top ul.cgtable1{
        margin-bottom: 20px
    }
    .detail-top ul li{
        display:inline-block;
        width:150px;
        /*border:1px solid red;*/
        margin:5px 10px;
    }
    .detail-top ul.cgtable li{
        color:#2B8F8F;
        margin:0px 10px;
        font-weight:600;
    }
.cha{
	margin-right:25px
}
.colorGender1{
	color:#72B7EA;
}
.colorGender0{
	color:#FF934D;
}
.wldw{
	margin-left:10px;
}
.left-img{
margin-right: 10px;
width: 60px;
height: 60px;
border-radius: 50%;
overflow: hidden;
/* margin-bottom: -8px; */
display: block;

line-height: 80px;
text-align: center;
}
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
.left-content {
	height:100%;
	width:25%;
	
	margin-bottom:300px;
	
	border-right:1px solid #E6E6E6;
	position:fixed;
	background:#F9F9F9;
}
.con-list {
	display:flex;
	align-items: center;
	width: 100%;
	word-wrap:break-word;
	
	border-bottom: solid 1px #E6E6E6;
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
.bg{
	background:#dbe5f1;
}
.add-right {
	width: 100%;
	background: #fff;
	height:100%;
	width:70%;
	margin-left:30%;
	padding-right:20px;
	padding-top:10px;
	display:flex;
}

.right-left{
	width: 230px;
    margin-top: 26px;
	
}
.right-right{
	width:100%;
}

.title{
	display:flex;justify-content: space-between;margin-top:20px
}
.title:hover{
	cursor:pointer;
}
.right-content{
	width: 100%;
	height:100%;
	/*	margin-bottom:100px;*/
}
.tot{
    position:fixed;
    bottom:10px;
    left:15%;
    z-index:12;
}

.page-box{
	margin-top:4px;
}

.bor{
	border-bottom:2px solid #086CA2;
}

</style>
<style type="text/css">
 .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }

</style>