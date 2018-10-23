<template>
	<div class="timeMessage">
		<!--微信用户-->
		<div class='head-bottom1'>
			<li class='head-bottom1-li'>
				<div class="car-body">
					<span >今日关注</span>
					<h3 class="f-50 font-weight-100">0</h3>
				</div>
			</li>
			<li class='head-bottom1-li'>
				<div class="car-body">
					<span >今日取消</span>
					<h3 class="f-50 font-weight-100">0</h3>
				</div>
			</li>
			<li class='head-bottom1-li'>
				<div class="car-body">
					<span >已关注用户</span>
					<h3 class="f-50 font-weight-100">0</h3>
				</div>
			</li>
			
			<li class='head-bottom1-li'>
				<div class="car-body">
					<span >未开会员卡用户</span>
					<h3 class="f-50 font-weight-100">0</h3>
				</div>
			</li>
			<li class='head-bottom1-li'>
				<div class="car-body">
					<span >全部用户</span>
					<h3 class="f-50 font-weight-100">0</h3>
				</div>
			</li>
    	</div>
    	<!--表格数据-->
		<div class="table">
			<Table border ref="selection" size="small" :columns="columns" :data="dataList"></Table>
		<!--底部的分页-->
		<div class="page-box" >
			 <Page :total="total" show-total size="small" :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize">
			 </Page>
		</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			uid: this.$store.state.common.token,
			columns:[
				{
					title:"头像",
					key:"headImgUrl",
					width:80,
					render:(h, params) =>{
                      return h('div',[
                          h('img',{
                            attrs:{
                              src:params.row.headImgUrl
                            },
                            style:{
                              width:'40px',
                              height:'40px',
                              marginTop:'4px'
                            }
                          })
                        ])
                    }
				},
				
				{
					title:"用户名",
					key:'nickName'
				},
				{
					title:"国家",
					key:'country'
				},
				{
					title:"所在地区",
					key:'Raddress'
				},
				{
					title:"性别",
					key:'genderDesc'
				},
				{
					title:"关注时间",
					key:'subscribeTime'
				},
				{
					title:"状态",
					key:'subscribe'
				},
			],
			dataList:[],
			total:0,
			pageSize:0
			
		}

	},
	methods:{
		//拉用户列表
		getMessage(){
			this.axios.get('/wxuser/query?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					// console.log(res)
					this.dataList=res.data.rows
					this.total=res.data.total
					this.pageSize=res.data.pageSize
					this.dataList.forEach((x)=>{
						x.Raddress=x.province+x.city
						x.subscribeTime=new Date(x.subscribeTime*1000).toLocaleString().replace(/\//g,'-')
						if(x.sex==1){
							x.genderDesc="男"
						}else{
							x.genderDesc="女"
						}
						if(x.subscribe==1){
							x.subscribe="已关注"
						}else{
							x.subscribe="取消关注"
						}

					})
				}
			})
		},
		 //用户列表切换一条页
        getData(current){
            this.axios.get('/wxuser/query?offset='+current+'&uid='+this.uid).then((res)=>{
                this.dataList = res.data.rows
                this.total=res.data.total
				this.pageSize=res.data.pageSize
				this.dataList.forEach(x=>{
					x.Raddress=x.province+x.city
					x.subscribeTime=new Date(x.subscribeTime*1000).toLocaleString().replace(/\//g,'-')
					if(x.sex==1){
						x.genderDesc="男"
					}else{
						x.genderDesc="女"
					}
				})
            })
        },
        //用户列表翻页
        changePageSize(size){
            this.pageSize = size
        },
		
	},
	created(){
		this.$nextTick(()=>{
			this.getMessage()//拉用户列表
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
	margin-bottom:120px;
}
.page-box{
	text-align: center;
    margin-top: 10px;
    margin-bottom:120px;
}

.table{
	margin-top:20px;
}
.head-bottom1{
	display:flex;
	flex-wrap: wrap;
	margin: 10px;
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
    margin:10px 10px 0 10px;

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