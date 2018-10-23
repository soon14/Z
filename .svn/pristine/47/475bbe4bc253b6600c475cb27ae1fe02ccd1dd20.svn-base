<template>
	<div class="timeMessage">
		<div style="position:relative">
			<div class='head-bottom1'>
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >接待中的客户</span>
						<h3 class="f-50 font-weight-100">0</h3>
					</div>
				</li>
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >接待的客户</span>
						<h3 class="f-50 font-weight-100">0</h3>
					</div>
				</li>
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >我的客户</span>
						<h3 class="f-50 font-weight-100">0</h3>
					</div>
				</li>
				
				<li class='head-bottom1-li'>
					<div class="car-body">
						<span >未回复的客户</span>
						<h3 class="f-50 font-weight-100">0</h3>
					</div>
				</li>
				
	    	</div>
			 <Tabs type="card" :animated='false'  @on-click="clickNomsg">
		        <TabPane :label="myAllMsg">
		        	
					
					<div class='msg'>
						<div class='msg-title'>
							<li><span>会员</span></li>
							<li><span>信息</span></li>
							<li><span>时间</span></li>
							<li><span>操作</span></li>
						</div>
						<!--消息列表-->
						<div class='msg-title msg-title1' v-for='(item,index) in dataList'>
							<li>
								<span><img :src="item.headimgurl" width='40' height='40'></span>
								<span style='margin-left:10px'>{{item.nickname}}</span></li>
							<li>
								<!--文本-->
								<span v-if='item.msgType=="text"'>{{item.content}}</span>
								<!--图片-->
								<span v-if='item.msgType=="image"'><img :src="item.picUrl" width='100' height='100'></span>
								<!--位置-->
								<span v-if='item.msgType=="location"'>{{item.label}}</span>
								
							</li>
							<li><span>{{item.createTime}}</span></li>
							<li>
								<div>
								<a @click='addx(item,index)' v-if='item.isshow'  style='color:#FF9800'>加星</a>
								<a @click='cancelx1(item,index)' v-if='!item.isshow' style='color:#FF9800'>去星</a>
								| 
								<a  @click='addRemark(item,index)'>备注</a>
								</div>
							</li>
						</div>
						<div class="page-box" v-if='total!=0'>
						 	<Page :total="total" show-total size="small" :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
						</div>
					</div>
				
		        </TabPane>
		        <TabPane  :label="myWDMsg">
		        	
					<div class='msg'>
						<div class='msg-title'>
							<li><span>会员</span></li>
							<li><span>信息</span></li>
							<li><span>时间</span></li>
							<li><span>备注</span></li>
						</div>
						<!--加星后的页面数据-->
						<div class='msg-title msg-title1' v-for='(item,index) in dataListaWD' >
							<li><span><img :src="item.headimgurl" width='40' height='40'></span><span style='margin-left:10px'>{{item.nickname}}</span></li>
							<li>
								<!--文本-->
								<span v-if='item.msgType=="text"'>{{item.content}}</span>
								<!--图片-->
								<span v-if='item.msgType=="image"'><img :src="item.picUrl"></span>
								<!--位置-->
								<span v-if='item.msgType=="location"'>{{item.label}}</span>
								
							</li>
							<li><span>{{item.createTime}}</span></li>
							<li>
								<div>
								{{item.remark}}
								</div>
							</li>
						</div>
						<div class="page-box" >
						 	<Page :total="totalWD" show-total size="small" :pageSize='pageSizeWD'  @on-change="getDataWD" @on-page-size-change="changePageSizeWD"></Page>
						</div>
					</div>
		        </TabPane>
		        <TabPane :label="myNoMsg">
		        	
					<div class='msg'>
						<div class='msg-title'>
							<li><span>会员</span></li>
							<li><span>信息</span></li>
							<li><span>时间</span></li>
						</div>
						<!--加星后的页面数据-->
						<div class='msg-title msg-title1' v-for='(item,index) in dataListNo' >
							<li><span><img :src="item.headimgurl" width='40' height='40'></span><span style='margin-left:10px'>{{item.nickname}}</span></li>
							<li>
								<div >
									<div style="display:flex">
										<!--文本-->
										<span v-if='item.msgType=="text"' v-html="item.content"></span>
										<!--图片-->
										<span v-if='item.msgType=="image"'><img :src="item.picUrl"></span>
										<!--位置-->
										<span v-if='item.msgType=="location"'>{{item.label}}</span>
										<span v-if='item.msgType=="video"'>{{item.label}}</span>
										<span v-if='item.msgType=="voice"'>{{item.label}}</span>
										<!--快速回复-->
										<span class='faseAnswerBtn' style="margin-left:20px" @click='faseAnswer(index)'>点击快速回复</span>
									</div>
									<div v-if='numindex==index'>
										<Input v-model='content'></Input>
										<Button type="primary" @click='hfSure(item)' style="margin-top:5px">确认</Button>  
										<Button  @click='cancel(index)' style="margin-top:5px">取消</Button>
									</div>
								</div>
								
								<div style="padding:5px 5px 5px 0" v-if="item.replyDate">

									<li  style="padding:5px 5px 5px 0">回复人：<span>{{item.replyName}}</span></li>
									
									<li style="padding:5px 5px 5px 0">回复内容：<span>{{item.replyContent}}</span></li>
									<li style="padding:5px 5px 5px 0">回复时间：<span>{{new Date(item.replyDate).toLocaleString().replace(/\//g,'-')}}</span></li>

									
								</div>
							</li>
							<li><span>{{item.createTime}}</span></li>
							
						</div>
						<div class="page-box" >
						 	<Page :total="totalNo" show-total size="small" :pageSize='pageSizeNo'  @on-change="getDataNo" @on-page-size-change="changePageSizeNo"></Page>
						</div>
					</div>
				</TabPane>
		        <TabPane  :label="myRemarkMsg">
		        	
					<div class='msg'>
						<div class='msg-title'>
							<li><span>会员</span></li>
							<li><span>信息</span></li>
							<li><span>时间</span></li>
							<li><span>备注</span></li>
						</div>
						<!--加星后的页面数据-->
						<div class='msg-title msg-title1' v-for='(item,index) in dataListaRemark' >
							<li><span><img :src="item.headimgurl" width='40' height='40'></span><span style='margin-left:10px'>{{item.nickname}}</span></li>
							<li>
								<!--文本-->
								<span v-if='item.msgType=="text"'>{{item.content}}</span>
								<!--图片-->
								<span v-if='item.msgType=="image"'><img :src="item.picUrl"></span>
								<!--位置-->
								<span v-if='item.msgType=="location"'>{{item.label}}</span>
								<!-- <span class='faseAnswerBtn' @click='faseAnswer(index)'>点击快速回复</span> -->
								<!-- <div v-if='numindex==index'>

									<Input v-model='content'></Input>
									 <Button type="primary">确认</Button>  
									  <Button  @click='cancel(index)'>取消</Button>
								</div> -->
							</li>
							<li><span>{{item.createTime}}</span></li>
							<li>
								<div>
								{{item.remark}}
								</div>
							</li>
						</div>

					</div>
					<div class="page-box">
						 	<Page :total="totalRemark" show-total size="small" :pageSize='pageSizeRemark'  @on-change="getDataRemark" @on-page-size-change="changePageSizeRemark"></Page>
					</div>
				</TabPane>
		        <TabPane :label="myAddMsg">
		        	<ul class="top">
						<li v-for="item in msg">
							<span>{{item.title}}</span>
							<div>{{item.num}}</div>
						</li>
					</ul>
					<div class='msg'>
						<div class='msg-title'>
							<li><span>会员</span></li>
							<li><span>信息</span></li>
							<li><span>时间</span></li>
							<li><span>操作</span></li>
						</div>
						<!--加星后的页面数据-->
						<div class='msg-title msg-title1' v-for='(item,index) in dataListaddx' >
							<li><span><img :src="item.headimgurl" width='40' height='40'></span><span style='margin-left:10px'>{{item.nickname}}</span></li>
							<li>
								<!--文本-->
								<span v-if='item.msgType=="text"'>{{item.content}}</span>
								<!--图片-->
								<span v-if='item.msgType=="image"'><img :src="item.picUrl"></span>
								<!--位置-->
								<span v-if='item.msgType=="location"'>{{item.label}}</span>
								
							</li>
							<li><span>{{item.createTime}}</span></li>
							<li>
								<div>
								<a @click='cancelx(item,index)'>去星</a>
								
								</div>
							</li>
						</div>
						<div class="page-box" >
						 	<Page :total="totaladd" show-total size="small" :pageSize='pageSizeadd'  @on-change="getDataadd" @on-page-size-change="changePageSizeadd"></Page>
					</div>
					</div>
				</TabPane>
		        <!-- <TabPane label="未导出信息">
		        	<ul class="top">
						<li v-for="item in msg">
							<span>{{item.num}}</span>
							<div>{{item.title}}</div>
						</li>
					</ul>
				</TabPane> -->
	    	</Tabs>
    	</div>
    <Modal v-model="remarkIsshow" width="360px" title='备注信息' :closable='false'>
		<div style='height:40px;display:flex;line-height:36px;text-align:center'>
					
					<Input type="textarea" v-model='contemtRemark'></Input>
				</div>
		<div slot="footer">
			<div >
				<div>
				 <Button shape="circle" type="ghost" style="display:inline-block;background:#acacac;color:#fff" @click="cancelremark"><Icon type="close" style=";margin-right:5px;color:#fff"></Icon>取消</Button>
				 <Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="sureremark" ><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
				 
				</div>
			</div>
		</div>
	</Modal>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			H:"",
			myAllMsg: (h) => {
                return h('div', [
                    h('span', '我的所有信息'),
                    h('Badge', {
                        props: {
                            count: this.total==0?"":this.total
                        }
                    })
                ])
            },
            myWDMsg: (h) => {
                return h('div', [
                    h('span', '未读消息'),
                    h('Badge', {
                        props: {
                            count:this.totalWD==0?"":this.totalWD
                        }
                    })
                ])
            },
            myNoMsg: (h) => {
                return h('div', [
                    h('span', '未回复'),
                    h('Badge', {
                        props: {
                            count:this.totalNo==0?"":this.totalNo
                        }
                    })
                ])
            },
            myRemarkMsg: (h) => {
                return h('div', [
                    h('span', '有备注'),
                    h('Badge', {
                        props: {
                            count: this.totalRemark==0?"":this.totalRemark
                        }
                    })
                ])
            },
            myAddMsg: (h) => {
                return h('div', [
                    h('span', '已加星'),
                    h('Badge', {
                        props: {
                            count: this.totaladd==0?"":this.totaladd
                        }
                    })
                ])
            },
			dataListaRemark:[],//备注
			totalRemark:0,
			pageSizeRemark:0,
			dataListNo:[],//未回复
			totalNo:0,
			pageSizeNo:0,
			dataListaWD:[],//未读
			totalWD:0,
			pageSizeWD:0,
			uid: this.$store.state.common.token,
			addisshow:true,//加星显示
			remarkIsshow:false,
			contemtRemark:"",
			id:"",
			name:"dd",
			numindex:-1,
			total:0,
			pageSize:0,
			info:"我是信息",
			msg:[

				{
					title:"接待的客户",
					num:0

				},
				{
					title:"我接待中的客户",
					num:76

				},
				{
					title:"我的客户",
					num:999

				},
				{
					title:"我未回复的客户",
					num:10000

				},
			],

			//未加星前的数据
			dataList:[],
			dataListaddx:[],//加星后的数据
			totaladd:0,
			pageSizeadd:0,
			addindex:'',
			addindex1:0,
			content:'',//快速回复内容
		}

	},
	methods:{
		//拉消息列表
		getMessage(){
			this.axios.get('weixin/message/query?ctype=0&uid='+this.uid).then(res=>{
				if(res.data.status==200){
					console.log(res)
					this.dataList=res.data.rows
					this.total=res.data.total
					this.pageSize=res.data.pageSize
					this.dataList.forEach((x)=>{
						x.isshow=true
						x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
					})
				}
			})
		},
		 //消息列表切换一条页
        getData(current){
            this.axios.get('/weixin/message/query?ctype=0&offset='+current+'&uid='+this.uid).then((res)=>{
                this.dataList = res.data.rows
                this.dataList.forEach((x)=>{
						x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
					})
                
            })
        },
        //消息列表翻页
        changePageSize(size){
            this.pageSize = size
        },
         //未读翻页
        getDataWD(current){
            this.axios.get('/weixin/message/query?ctype=1&offset='+current+'&uid='+this.uid).then((res)=>{
                this.dataListaWD = res.data.rows
                this.totalWD=res.data.total
                this.pageSizeWD=res.data.pageSize
                this.dataListaWD.forEach((x)=>{
						x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
					})
                
            })
        },
        //消息列表翻页
        changePageSizeWD(size){
            this.pageSizeWD = size
        },


         //未回复翻页
        getDataNo(current){
            this.axios.get('/weixin/message/query?ctype=2&offset='+current+'&uid='+this.uid).then((res)=>{
                this.dataListNo = res.data.rows
                this.totalNo=res.data.total
                this.pageSizeNo=res.data.pageSize

                this.dataListNo.forEach((x)=>{
						x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
					})
            })
        },
        //消息列表翻页
        changePageSizeNo(size){
            this.pageSizeNo = size
        },

         //有备注翻页
        getDataRemark(current){
            this.axios.get('/weixin/message/query?ctype=3&offset='+current+'&uid='+this.uid).then((res)=>{
                this.dataListaRemark = res.data.rows
                this.totalRemark=res.data.total
                this.pageSizeRemark=res.data.pageSize
                this.dataListaRemark.forEach((x)=>{
						x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
					})
            })
        },
        //消息列表翻页
        changePageSizeRemark(size){
            this.pageSizeRemark = size
        },

         //有加星翻页
        getDataadd(current){
            this.axios.get('/weixin/message/query?ctype=4&offset='+current+'&uid='+this.uid).then((res)=>{
                this.dataListaadd = res.data.rows
                this.totaladd=res.data.total
                this.pageSizeadd=res.data.pageSize
                this.dataListaadd.forEach((x)=>{
						x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
					})
            })
        },
        //消息列表翻页
        changePageSizeadd(size){
            this.pageSizeadd = size
        },
        //消息
        clickNomsg(num){
        	switch(num){
        		//全部消息
        		case 0:
        			this.getMessage()
        		break;
        		//未读消息
        		case 1:
        			this.getWDmsg()
        		break;
        		//未回复
        		case 2:
        			this.getNomsg()
        		break;
        		//有备注
        		case 3:
    				this.getRemarkmsg()
        		break;
        		//已加星
        		case 4:
        			this.getadd()
        		break;
        	}
        },
        //有备注
        getRemarkmsg(){
        	this.axios.get('weixin/message/query?ctype='+3+'&uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.dataListaRemark=res.data.rows
					this.totalRemark=res.data.total
        			this.pageSizeRemark=res.data.pageSize
					this.dataListaRemark.forEach((x)=>{
						x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
					})
				}
			})
        },
        //未读
        getWDmsg(){
        	this.axios.get('weixin/message/query?ctype='+1+'&uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.dataListaWD=res.data.rows
					this.totalWD=res.data.total
       				this.pageSizeWD=res.data.pageSize
					this.dataListaWD.forEach((x)=>{
						x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
					})
				}
			})
        },
       
        //未回复消息
       getNomsg(){
       	this.axios.get('weixin/message/query?ctype='+2+'&uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.dataListNo=res.data.rows
					 this.totalNo=res.data.total
        			this.pageSizeNo=res.data.pageSize
					this.dataListNo.forEach((x)=>{
						x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
						
					})
				}
			})
       },
		//快速回复
		faseAnswer(index){
			this.numindex=index
		},
		//快速回复确认
		hfSure(item){
			this.axios.post('weixin/message/reply/'+item.id+'?uid='+this.uid,this.content).then(res=>{
				if(res.data.status==200){
					this.getNomsg()
					this.content=''
					this.numindex=-1//成功回复后调用隐藏
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
		//取消快速回复
		cancel(index){
			this.content=''
			this.numindex=-1
		},

		//加星GET /weixin/message/star/{id} 加星
		getadd(){
			this.axios.get('weixin/message/query?ctype=4&uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.dataListaddx=res.data.rows
					this.totaladd=res.data.total
                	this.pageSizeadd=res.data.pageSize
					this.dataListaddx.forEach((x)=>{
						x.isshow=true
						x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
					})
				}
			})
		},
		addx(item,index){
			item.isshow=!item.isshow
			this.axios.get('/weixin/message/star/'+item.id+'?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.getadd()
				}
			})
		},
		//去星GET /weixin/message/cancelstar/{id} 取消加星
		cancelx1(item,index){
			item.isshow=!item.isshow
			this.axios.get('/weixin/message/cancelstar/'+item.id+'?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.getadd()
				}
			})
			this.getMessage()
			
		},
		//去星 加星后的数据--去星
		cancelx(item,index){
			this.axios.get('/weixin/message/cancelstar/'+item.id+'?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.getadd()
				}
			})
			
		},
		//备注POST /weixin/message/remark/{id} 备注
		cancelremark(){
			this.remarkIsshow=false
			this.contemtRemark=""
		},
		sureremark(){
			this.axios.post('/weixin/message/remark/'+this.id+'?uid='+this.uid,this.contemtRemark).then(res=>{
				if(res.data.status!=200){
					this.$notify({
                        title:"",//
                        message: res.data.errorMessage,
                        type: 'error',
                        position: 'bottom-right'
                    });
				}else{
					this.remarkIsshow=false
					this.contemtRemark=""
				}
			})
		},
		addRemark(item,index){
			this.id=item.id
			this.remarkIsshow=true
		},
	},
	created(){
		this.$nextTick(()=>{
			this.getMessage()//消息列表
			this.getWDmsg()
			this.getRemarkmsg()
			this.getadd()
			this.getNomsg()
		})
	},
	mounted(){
		
	},
}
</script>
<style type="text/css" scoped>
.timeMessage{
	padding:10px;
	height:auto;
	overflow: hidden;
}
.page-box{
	text-align: center;
    margin-top: 10px;
    margin-bottom: 120px;
}
.top{
	display:flex;
	width:100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	background:#F8F8F8;
	padding:24px;
}
.top li{
	
	width:100%;
	text-align: center;
	border-right:1px dotted #ccc;
}
li{
	list-style: none;
}
.top li:last-child{
	border:none;
}

.msg{
	margin-top:30px;
}
.msg-title{
	height:40px;
	/*line-height: 22px;*/
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
.msg-title img{
	vertical-align: top
}
.msg-title li:nth-child(1){
	/*width:200px;*/

}
.msg-title li:nth-child(2){
	width:300px;
	
}
.msg-title li:nth-child(3){
	/*width:100px;*/

}
.msg-title li:nth-child(4){
	width:100px;
	word-wrap: break-word;
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
	/*line-height: 40px;*/
}
.msg-title1{
	padding:10px 0;
}
.faseAnswerBtn{
	display:block;
}
.faseAnswerBtn:hover{
	color:blue;
	cursor:pointer;
}
.cancelBtn{
	display:inline-block;
	width:30px;
	height:30px;
	line-height: 30px;
	border:1px solid blue;
}
.cancelBtn:hover{
	cursor:pointer;
}
.head-bottom1{
	display:flex;
	flex-wrap: wrap;
	margin: 0px 0 10px 0;
}
.head-bottom1-li{
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
   	width:200px;
    margin: 10px 10px 0 0px;

}
li{
	list-style: none
}
.car-body{
	padding: 1.25rem;

}
.car-body span{
	color:#666f73;

}
.f-50{
	font-size:35px;
}
.font-weight-100{
	font-weight:100;
}
</style>
