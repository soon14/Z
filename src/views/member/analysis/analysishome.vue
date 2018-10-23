<template>
	<!--会员分析-->
	<div class="units-box">
		<div class="btns-box">
			<div class="wldw">
				<div>
	                <span style="width:42px;font-weight:900">会员分析：</span>
	                 <Select style="width:100px"  placeholder="全部" @on-change="orderselected">
	                    <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
	                </Select>
                </div>
                <Input style='margin-top:10px;width:400px;margin-left:20px' v-model='keyword' placeholder='请输入编码/名称' @on-enter='entersSearch' >
                    <span slot="append"  @click='search' style='cursor:pointer'>搜索</span>
                </Input>
            </div>
			<div style="margin-right:10px;">
				<Dropdown trigger="click" style="margin-left: 4px">
                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
                    	<span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
	                </Button>
	                <DropdownMenu slot="list">
	                    <span @click="startUnits"><DropdownItem >启用</DropdownItem></span>
	                    <span @click="stopUnits"><DropdownItem >停用</DropdownItem></span>
	                    <span  @click="delUnits"><DropdownItem >删除</DropdownItem></span>
	                </DropdownMenu>
             	</Dropdown>
			</div>
		</div>
		<!--表格数据-->
		<div class="table">
			<Table border highlight-row  :columns="columns" :data="dataList" @on-row-dblclick="dbl"  @on-row-click='clickRow'></Table>
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
				  orderListname:[
                    {
                        label:"全部",
                        value:0
                    },
                   
                ],
				columns: [
					
				]
				
			}
		},
		methods: {
			//双击表格一行
			dbl(row,index){
				
			},
			 //搜索供应商
            search(){
               
            },
            entersSearch(){
                this.search()
            },
			//获取供应商
			getUnitsList: function() {
				
			},
			//单击某一行
			clickRow(data){
				this.valId=data.id
			},
			//点击删除
			delUnits: function() {
				
				
			},
			//点击停用
			stopUnits:function(id){
				
			},
			//点击启用
			startUnits:function(){
				
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
			this.getUnitsList();
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
