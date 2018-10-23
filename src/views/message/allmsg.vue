<template>
	<div>
		<div class='head'>
			<div>
				<span style='font-size:14px;font-weight:600;margin-left:20px'>{{$t('public.screen')}}：</span>
				<Select style="width:100px"  placeholder="全部" @on-change="orderselected">
			        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
			    </Select>
		    </div>
			<div style='margin-left:40px;width:300px;margin-right:20px'>
				<Input style='margin-top:8px;width:300px' v-model='keyword' :placeholder="$t('public.PreciseSearchPlaceholder')">
					<span slot="append"  @click='search' style='cursor:pointer'>{{$t('public.search')}}</span>
				</Input>
            </div>
		</div>
		<div class='main'>
			<div class='nomsgimg' v-if='dataList.length==0' >
	    		<img src="http://img.zsydian.com/nomsg.png">
	    		<span>{{$t('info.NonewM')}}</span><!--暂无新消息-->
	    	</div>
	    	<div  v-else>
				<div class='main-mark' >
					<li v-for='(item,index) in dataList' :class='{bg:numIndex==index}' @mouseover='mouseover(index)'>
						<div style='margin:10px 0 0px 30px;font-size:14px;font-weight:600' >
							<span :class='{red:item.status==1,black:item.status==9}'>{{item.subject}}</span>
						</div>
						<div style='margin-left:30px'>
							<div style='display:flex;hieght:30px;line-height:30px'>
							<span class='msgcontent'>{{item.content}}</span>
							<span style='display:inline-block;margin-top:10px;'><a target='_blank' :href='item.url' @click='goInfo'>
							{{$t('info.seeInfo')}}</a></span><!--查看详情-->
							</div>
							<div style='color:#999'>{{item.creationDate}}</div>
						</div>
						<span style='font-size:26px;cursor:pointer;position:absolute;right:30px;top:10px' v-if='numIndex==index' @click='clickDelete(item)' >×</span>
					</li>
					
				</div>
				<!--底部的分页-->
				<div class="page-box">
					 <Page :total="total" show-total  :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			infoUrl:'',//详情url
			total: 0,
			pageSize: 0,
			numIndex:-1,//移动下标
			uid: this.$store.state.common.token,
			//下拉数据
			orderListname:[
					{
						label:"今日",
						value:0
					},
					{
						label:"三天内",
						value:1
					},
					{
						label:"七天内",
						value:3
					},
					
				],
			keyword:'',//输入框搜索值
			dataList:[],//全部消息数据
		}
	},
	methods:{
		//下拉搜索
		orderselected(value){

		},
		//移动
		mouseover(index){
			this.numIndex=index
		},
		//输入框搜索
		search(){
			this.axios.get('/msg/query?keyword='+this.keyword+'&uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.dataList = res.data.rows

					this.total=res.data.total
                    this.pageSize=res.data.pageSize
                    res.data.rows.forEach((x)=>{
                    	x.creationDate=new Date(x.creationDate).toLocaleDateString().replace(/\//g,'-')
                    })
				}
			})
		},
		//删除
		clickDelete(item){

			this.axios.delete('/msg/delete/'+item.id+'?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.getAllMsg()
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
		//点击查看详情
		goInfo(item){
			// if(item.status==1){
			// 	item.status=9
			// }
		},
		//获取全部消息 1未读 9已读
		getAllMsg(){
			this.axios.get('/msg/query?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.dataList = res.data.rows

					this.total=res.data.total
                    this.pageSize=res.data.pageSize
                    res.data.rows.forEach((x)=>{
                    	
                    	x.creationDate=new Date(x.creationDate).toLocaleDateString().replace(/\//g,'-')
                    })
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
		 //切换一条页
            getData(current){
                this.axios.get('/msg/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    //console.log(res)
                    this.dataList = res.data.rows
                    this.total=res.data.total
                    this.pageSize=res.data.pageSize
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
            }
	},
	created(){
		this.$nextTick(res=>{
			this.getAllMsg()
		})
	},
	mounted(){
		
	}
}
</script>
<style type="text/css" scoped>
.head{
	height:50px;
	line-height: 50px;
	width:100%;
	display:flex;
	justify-content: space-between;
	border-bottom:1px solid #e4e4e4;
}
.main{
	width:100%;
	height:100%;

}
.main-mark{
	width:95%;
	margin:20px auto;
	
}
.main-mark li{
	border-bottom:1px solid #F5F5F5;
	padding:10px 0;
	position:relative

}
.main-mark li:last-child{
	margin-bottom:380px;
}
.bg{
	background: #F4F4F4
}
.red{
	color:red;
}
.black{
	color:#000;
}
.msgcontent{
	display:inline-block;margin:10px 0;
	width:600px;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	color:#999;
}
.page-box{
	width:100%;
	margin:0 auto;
	text-align: center;
	margin-top:-370px;
}
.nomsgimg{
		height:300px;
		width:100%;
		display:flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

	}
	.nomsgimg span{
		margin-top:10px;
	}
li{
	list-style: none
}
</style>