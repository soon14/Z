<template>
	<!--黑名单-->
	<div class="units-box">
		<div class="btns-box">
			<div class="wldw">
                <Input style='margin-top:10px;width:400px;' v-model='keyword' placeholder='请输入编码/名称' @on-enter='entersSearch' >
                    <span slot="append"  @click='search' style='cursor:pointer'>搜索</span>
                </Input>
            </div>
			<div style="margin-right:10px;">
				
			</div>
		</div>
		<!--表格数据-->
		<div class="table">
			<Table border highlight-row  :columns="columns" :data="dataList"></Table>
		<!--底部的分页-->
		<div class="page-box">
			 <Page :total="total" show-total placement='top' size='small' show-sizer :page-size-opts="[10,20,30,40,50]" :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize">
			 </Page>
		</div>
		</div>
	
	</div>
</template>

<script>
	export default {
		data() {
			return {
				keyword:'',
				current:1,
				visible: false,
				dataList: [], 
				total: 0,
				pageSize: 0,
				valId:"",
				uid: this.$store.state.common.token,
				
			columns: [
					{
		              title:this.$t('member.avt'),//"头像",
		              key:'photo',
		               width:80,
		              render:(h, params) =>{
		                  return h('div',[
		                      h('img',{
		                        attrs:{
		                          src:params.row.photo
		                        },
		                        style:{
		                          width:'40px',
		                          height:'40px'
		                        }
		                      })
		                    ])
		                }
		            },
		             {
		               title:this.$t('member.code'),//'编号',
		             
		               key:'code'
		            },
		            {
		              title:this.$t('member.name'),//"姓名",
		              
		             align:"center",
		              key:"name",
		            },
		           
		            {
		              title:this.$t('public.gender'),//"性别",
		               align:"center",
		              key:"gender",
		              render:(h,params)=>{
		                return h('div',{
		                    
		                  },params.row.gender=='1'?"男":params.row.gender=='0'?"女":"")
		                }
		            },
		            {
		              title:this.$t('member.mobile'),//'手机',
		               
		                align:"center",
		              key:'mobile'
		            },
		             {
		              title:this.$t('member.birsday'),//'生日',
		             
		               align:"center",
		             
		              key:'birthday'
		            },
		            {
		              title:this.$t('member.ye'),//'余额',
		             
		               align:"center",
		            
		              key:'chargeMoney'
		            },
		            {
		              title:this.$t('member.jf'),//'积分',
		              
		               align:"center",
		              key:'dqjf'
		            },
		            {
		              title:"等级",//'积分',
		              
		               align:"center",
		              key:'level'
		            },
		            {
		               title:this.$t('member.time'),//'注册时间',
		              
		               key:'createTime',
		                align:"center",
		            },
		           
				]
			}
		},
		methods: {
			//双击表格一行
			dbl(row,index){
				
			},
			 //搜索
            search(){
               this.axios.get('crm/hmd?keyword='+this.keyword+'&uid='+this.uid).then((res)=>{
                if(res.data.status==200){
                  this.dataList = res.data.rows
                  this.total=res.data.total
                  this.pageSize=res.data.pageSize
                  this.dataList.forEach((x)=>{
                    x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
                    console.log( x.createTime)
                    if(x.birthday==null || x.birthday==''){
                      x.birthday=''
                    }else{
                      x.birthday=this.getLocalTime(x.birthday)

                    }
                    
                  })
                }
            })
            },
            entersSearch(){
                this.search()
            },
			//获
			getUnitsList() {
				this.axios.get('crm/hmd?uid='+this.uid).then((res)=>{
	                if(res.data.status==200){
	                  this.dataList = res.data.rows
	                  this.total=res.data.total
	                  this.pageSize=res.data.pageSize
	                  this.dataList.forEach((x)=>{
	                    x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
	                    if(x.birthday==null || x.birthday==''){
		                      x.birthday=''
		                    }else{
		                      x.birthday=this.getLocalTime(x.birthday)

                    	}
	                    
	                  })
	                }
	            })
			},
			
			 //切换一条页
            getData(current){
                
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
            },
            //下拉框选择
            orderselected(value){
               
            },
           
		},
		mounted() {
			this.getUnitsList()
		}
	}
</script>

<style lang="css" scoped>
 .zsiscrm{
        padding-top:30px;
        margin-top:10px;
        border-top:1px solid #e4e4e4;
        display:flex;
        justify-content: center;
        align-items: center
    }
    .zsiscrm span{
        display:block;
        width:80px;
        text-align: center;
    }
    .searchBtn{
        width:100%;
        text-align: center;
        margin-top:40px;
    }
    .INFO{
        padding-top:30px;
        margin-top:10px;
        border-top:1px solid #e4e4e4;
        display: flex;;
        justify-content: center;
        align-items: center
    }
    .crmInfo{
        display: flex;
        flex-direction: column;
        padding:0 30px;
    }
     .crmInfo span{
        font-weight:600;
        padding:3px 0;
     }
     .INFO1{
        padding-top:30px;
        margin-top:10px;
        display: flex;;
        justify-content: center;
        align-items: center
     }
	.units-box {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.btns-box {
		width: 100%;
		height: 50px;
		display:flex;
		justify-content: space-between;
		
		line-height: 50px;
	}
	.wldw {
		display: flex;
		font-size: 14px;
		color: #585858;
		margin-left:10px;
	}
	.right{
		margin-right:10px;
		margin-bottom:10px;
	}
	.right-btn{
		background: #FF7D16;
	    margin-right: 10px;
	    color: #fff;
	    border: none;
	    width: 26px;
	    height: 26px;
	    border-radius: 26px;
	    display: inline-block;
	    position: relative;
	    top: 10px;
	}
	.ivu-icon-chevron-down {
		font-size: 10px;
	}
	.btns img {
		width: 14px;
		height: 14px;
		vertical-align: middle;
	}
	.table {
		margin:0 10px 120px 10px;
	}

	.page-box {
		text-align: center;
		margin-top:5px;
	}

</style>
