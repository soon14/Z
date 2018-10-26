<template>
	<div>
		<!--导购信息-->
		<div class="table">
			<div style='margin:10px 0'>
				<Table border  :columns="dgKey" :data="dgdata" ></Table>
				<div class="page-box">
					 <Page v-if='dgtotal!=0' :total="dgtotal" show-total  :pageSize='dgpageSize' ></Page>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				dgdata: [],
				dgKey:[  
		            {
						title:this.$t('manage.ey.headImg'),//"头像",
						key:"headPic",
						width: 120,
                        align: 'center',
                        render:(h, params) =>{
                        	return h('div',[
                        			h('img',{
                        				attrs:{
                        					src:params.row.headPic
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
						title: this.$t('manage.ey.name'),//'姓名',
						
						key: 'name'
					},
					{
						title: this.$t('manage.ey.code'),//'工号',
						
						key: 'code'
					},
					{
						title: this.$t('public.gender'),//'性别',
						width:80,
						key: 'gender',
						render:(h,params)=>{
			              return h('div',{
			                  style:{
			                    color:params.row.gender==this.$t('public.man')?'#72B7EA':params.row.gender==this.$t('public.woman')?'#FF934D':''
			                  }
			                },params.row.gender)
			              }
					},
					{
						title: this.$t('manage.ey.position'),//'职位',
						
						key: 'positionName'
					},
					{
						title: this.$t('manage.ey.mobile'),//'手机号',
						
						key: 'phone'
					},
					{
						title:"登陆账号",//'邮箱',
						
						key: 'accountName'
					},
					{
						title: this.$t('manage.ey.person'),//'联系人',
						
						key: 'emergencyContact'
					},
					
					{
						title: this.$t('manage.ey.time'),//'入职时间 ',
						 
						key: 'createTime'
					},
					{
                        title:this.$t('public.status'),//"状态",
                        width:120,
                        align:'center',
                        key:"statusDesc",
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    fontWeight:'900',
                                    color:params.row.status==1 || params.row.status==0?'#40ca98':'#d53c39'
                                }
                            },params.row.statusDesc)
                        }
                    }
		        ],
		        dgtotal: 0,
				dgpageSize: 0,
				uid: this.$store.state.common.token,
			}
		},
		methods:{
			//导购
			geGuid(){
				this.axios.get('setting/dqmddg?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						let data = res.data;
						//console.log(res.data.rows)
						this.dgdata = res.data.rows
						this.dgdata.forEach((x)=>{
							if(x.gender==1){
								x.gender=this.$t('public.man')//'男'
								}
                            if(x.gender==0){
                                x.gender=this.$t('public.woman')//'女'
                            }
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
							
						})
					}
				})
			},
		},
		mounted(){
			this.geGuid()
		}
	}
</script>
<style type="text/css" scoped>
.table {
	width: 100%;
	height: 100%;
	background: #fff;
	padding: 0 10px;
}
</style>