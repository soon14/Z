<template>
	<div>
		<div class='hothead'>
			<div class='hothead-left'>
                <Input style='margin-top:10px;margin-left:20px;width: 300px;' v-model='keyword' :placeholder="$t('public.codeandname')" @on-enter='entersSearchNewSku'>
                    <span slot="append"  @click='searchNewSku' style='cursor:pointer'>{{$t('public.search')}}</span>
                </Input>
			</div>
			<div class='hothead-right'>
				 <Button shape="circle" type="ghost" @click="addhot" style='margin-right:5px;border:none;background:#3b77e3;color:#fff'>
                     <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.addnew')}}
                </Button>
                <Button shape="circle" type="ghost" @click="del" style='margin-right:5px;border:none;background:#d53c39;color:#fff'>
                      <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>取消热门
                </Button>
                <span @click="cancelHome" style="cursor:pointer;"><Icon type="close" class="cha" ></Icon></span>
			</div>
		</div>
		<div style='height:50px'></div>
		<div class='main'>
            <p v-if="AllHotSku.length==0" >
                <Spin>
                    
                    <div style="margin-top:40px">{{$t('public.NoData')}}</div>
                </Spin>
            </p>
			<div class='ygewm' v-else>
        		<div v-for='(item,index) in AllHotSku' class='ygewm-list' @click='clickradio(index,item)' :class='{bor:ygewmIndex==index}'>
        			
        			<img :src="item.mainPhoto" width='150' height='160' >
        			<div class='skuname'>
        				{{item.skuName}}
        			</div>
        			<div style='display:flex;justify-content: space-between;margin-top:10px'>
        				<span style='color:#ccc'>{{$t('manage.store.Code')}} {{item.barcode}}</span>
        				<span style='color:#ff0000'>￥{{item.price}}</span>
        			</div>
                    <div class="lanren" :class='{hotbg:item.status==1,hotbg1:item.status==99}'>
                       <span>{{item.statusDesc}}</span> 
                    </div>​
        		</div>
        		<!--底部的分页-->
				<div class="page-box" v-if='total!=0'>
					 <Page :total="total" show-total size='small' :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
				</div>
        	</div>
        	
		</div>
		<!--新建热品-->
        	<div class='addHot'>
        		<div class='addHot-head'>
        			<span>{{$t('public.addnew')}}</span>
        			<div>
        				 <Button shape="circle" type="ghost" @click="save" style='margin-right:5px;border:none;background:#3b77e3;color:#fff'>
		                   <Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}
		                </Button>
		                <Button shape="circle"  @click="cancelhot"  style="background:#999999;color:#fff;margin-right:10px;" ><Icon type="close" style="margin-right:5px;"></Icon>{{$t('public.cancel')}}</Button>
        			</div>
        		</div>
        		<div style='margin:20px;border:1px solid #e4e4e4;background:#FCFCFC'>
        			<div class='searchInput'>
        				<span style='display:inline-block;width:60px'>{{$t('operation.yhqHome.choosesku')}}</span><!--选择商品-->
        				<span @click='searchsku' >
        				<Input v-model='skuName' type="text" style="width:360px"></Input>
        				</span>
        			</div>
        			<div class='table1'>
	        			<Table  border  height='400' highlight-row :columns="seleckey" :data="selecGoods">
						</Table>
					</div>
        		</div>
        	</div>
        <!--选择商品-->
	<Modal v-model="goodsinshow" width="760px">
		<p slot="header" style="height:30px;line-height:30px">
			
			<span>{{$t('public.search')}}</span>
		</p>
		<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
			<Input   :placeholder="$t('public.codeandname')" style="padding:2px 0" v-model="goodskeyword" @on-enter='enterSearch'></Input>
			<span @click="searchInput">
			<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>
			</span>
		</div>
		<!--商品数据-->
		<div slot="footer" style='margin-top:-20px'>
			<div class="table">
				<Table  border  height='300' highlight-row :columns="goodskey" :data="goods" @on-row-click="clickgoodsrow">
				</Table>
				<div class="page-box1">
				 <Page :total="total1" show-total  :pageSize='pageSize1'  @on-change="getData1" @on-page-size-change="changePageSize1"></Page>
				</div>
           	</div>
			
			<div class='title' style='margin:0px'>
				<div style='color:#D15151;font-size:14px'>
						<!-- <Icon type="plus" style='margin-right:5px'></Icon>
					<span >添加商品</span> -->
					</div>
				<div>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="makegoods"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
				</div>
			</div>
		</div>
	</Modal>
    <div class="mark"></div>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
            loading:'暂无数据',
			 orderListname:[
                {
                    label:this.$t('public.all'),//"全部",
                    value:0
                },
                
            ],
            skuName:'',//搜索后的商品名称
            uid: this.$store.state.common.token,
            AllHotSku:[],//热门商品列表
            total:0,
            pageSize:0,
            total1:0,
            pageSize1:0,
            keyword:'',
            ygewmIndex:-1,
            vid:'',//id
            selecGoods:[],//选中后商品数组
            seleckey:[
            	{
                    title:this.$t('manage.sku.SkuName'),//'商品名称',
                    key:'skuName'
                },
                {
                    title: this.$t('manage.sku.price'),//'吊牌价',
                    key:'price',
                    width:100,
                    align: 'center'
                },
                {
                    title:this.$t('public.action'),//"操作",
                    key:'action',
                    render:(h,params)=>{
                        return h('a',{
                            on:{
                                'click':()=>{
                                    this.selecGoods.splice(params.index,1)
                                }
                            }
                        },this.$t('public.del'))
                    }
                }
            ],
            //弹出框商品data
            goodskeyword:'',
            goodsinshow:false,
            goods:[],
            selecObj:{},//选中商品一行的数据
            goodskey:[
                {
                	title:"",
                	width:100,
                	key:"mainPhoto",
                	 render:(h, params) =>{
                    	return h('div',[
                    			h('img',{
                    				attrs:{
                    					src:params.row.mainPhoto
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
                    title:this.$t('manage.sku.SkuName'),//"商品名称",
                    ellipsis:true,
                    ellipsis:'true',
                    key:"skuName"
                },
                {
                    title: this.$t('manage.sku.SkuCode'),//'商品编码',
                    key:'skuCode',
                    ellipsis:true,
                    align: 'center'
                },
                {
                    title: this.$t('manage.sku.price'),//'吊牌价',
                    key:'price',
                    width:100,
                    align: 'center'
                },
                {
                    title: this.$t('manage.sku.costprice'),//'成本价',
                    key:'costPrice',
                    width:100,
                    align: 'center'
                },
                {
                    title:this.$t('manage.sku.wholeprice'),// '批发价',
                    key:'wholePrice',
                    width:100,
                    
                    align: 'center'
                },
                 {
                title: this.$t('public.status'),//'状态',
                key:'statusDesc',
                width:80,
                ellipsis:true,
                render:(h,params)=>{
                    return h('span',{
                        style:{
                            color:params.row.status==1?'#40ca98':'#d53c39'
                        }
                    },params.row.statusDesc)
                }
                
            }
            ],
		}
	},
	methods:{
        //获取所有热门商品
		getAllHotSku(){
			this.axios.get('sp/hot?uid='+this.uid).then(res=>{
				if(res.data.status==200){
					this.AllHotSku=res.data.rows
					this.total=res.data.total
					this.pageSize=res.data.pageSize
				}else{
                    this.$notify({
                        title:"",//
                        message:res.data.errorMessage,
                        type: 'error',
                        position: 'bottom-right'
                    });
                }
			})
		},
		//翻页
		getData(current){
    	 this.axios.get('sp/hot?offset='+current+'&uid='+this.uid).then((res)=>{
    	 		this.AllHotSku = res.data.rows
				this.total=res.data.total
				this.pageSize=res.data.pageSize
    	 })
        },
        //翻页
        changePageSize(size){
        	this.pageSize=size
        },
		//点击某一个
		clickradio(index,item){
			this.vid=item.id
			this.ygewmIndex=index
		},
		//删除
		del(){
			if(this.vid==''){
				
                this.$notify({
                    title:"",//
                    message: '请选择一条热门商品！',
                    type: 'error',
                    position: 'bottom-right'
                });
			}else{
				this.axios.get('sp/cancelh/'+this.vid+'?uid='+this.uid).then(res=>{
					if(res.data.status==200){
                        
                        this.$notify({
                            title:"",//
                            message: '取消热门商品成功！',
                            type: 'success',
                            position: 'bottom-right'
                        });
						this.getAllHotSku()
					}else{
                        this.$notify({
                            title:"",//
                            message: res.data.errorMessage,
                            type: 'error',
                            position: 'bottom-right'
                        });
                    }
				})
			}
			
		},
		//点击新建
		addhot(){
			$('.addHot').animate({right:"0px"});
            $('.mark').css('display','block')
		},
		//点击取消
		cancelhot(){
			$('.addHot').animate({right:"-500px"});
            $('.mark').css('display','none')
		},
		//搜索商品
		searchsku(){
			this.axios.get('/sku/list?uid='+this.uid).then((res)=>{
				this.goods= res.data.rows
				this.pageSize1 = res.data.pageSize
				this.total1 = res.data.total
			})
			this.goodsinshow = true;
		},
		//商品弹框点击一行获取数据
		clickgoodsrow(data){
			this.skuName=data.skuName
			this.selecObj=data
		},

		getData1(current){
    	 this.axios.get('sku/list?offset='+current+'&uid='+this.uid).then((res)=>{
    	 		this.goods = res.data.rows
				this.total1=res.data.total
				this.pageSize1=res.data.pageSize
    	 })
        },
        changePageSize1(size){
        	this.pageSize1=size
        },
		  //商品模糊搜索
        searchInput(){
			this.axios.get('sku/query?keyword='+this.goodskeyword+'&uid='+this.uid).then((res)=>{
				////////console.log(res)
				if(res.data.status==200){
					this.goods = res.data.rows
					this.total1=res.data.total
					this.pageSize1=res.data.pageSize
				}
			})
		
        },
        //回车搜索商品
       enterSearch(){
       	this.searchInput()
       },
       //商品弹框取消
       modelCancel(){
       	this.goodsinshow = false;
       },

  		//商品弹框确认
       makegoods(){
       	this.selecGoods.push(this.selecObj)//push进选中的数组
       	this.goodsinshow=false
       },
       //头部搜索
       searchNewSku(){
       	this.axios.get('sp/hot?keyword='+this.goodskeyword+'&uid='+this.uid).then((res)=>{
				
			if(res.data.status==200){
				console.log(res.data.rows)
				this.AllHotSku=res.data.rows
				this.total=res.data.total
				this.pageSize=res.data.pageSize
			}
		})
       },
       //保存设置新品
       save(){
        if(this.selecGoods.length==0){
             this.$notify({
                title:"",//
                message: '请选择需要设置的热门商品',
                type: 'error',
                position: 'bottom-right'
            });
        }else{
            let strname=[]//id链接
            for(let i =0;i<this.selecGoods.length;i++){
                strname.push(this.selecGoods[i].id)
        }
        let s1 = strname.join(',')
            this.axios.get('/sp/setr/'+s1+'?uid='+this.uid).then(res=>{
                if(res.data.status==200){
                        this.$notify({
                            title:"",//
                            message: '设置热门商品成功！',
                            type: 'success',
                            position: 'bottom-right'
                        });
                    $('.addHot').animate({right:"-500px"});
                    $('.mark').css('display','none')
                    this.getAllHotSku()
                    this.selecGoods=[]
                    this.selecObj={}
                    this.skuName=''
                }
            })
        }
       },
       //头部回车搜索
       entersSearchNewSku(){
       	this.searchNewSku()
       },
        //差号返回
        cancelHome(){
            this.$router.push('/operationhome')
        },
		
		change(v){
			console.log(v)
		},
	},
	created(){
		this.$nextTick(()=>{
			this.getAllHotSku()
		})
	},
	mounted(){
		
		
	}
}
</script>
<style type="text/css" scoped>
.hothead{
	position:fixed;
	background: #fff;
	z-index:9;
	width:100%;
	height:50px;
	display:flex;
	justify-content: space-between;;
	line-height: 50px;
	border-bottom:1px solid #e4e4e4;
}
.hothead-left{
	display:flex;
}
.hothead-right{
	margin-right: 265px;
}
.main{
	width:100%;
}
.ygewm{
	 padding:10px;
	width:100%;
	
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
    text-align: center;
	
	background: #fff
}
.ygewm-list{
	margin:10px;
    height: 240px;
    width: 240px;
    padding:10px;
    position:relative;
    justify-content: center;
    text-align: center;
    border: 1px solid #e4e4e4;
    cursor:pointer;
}
.page-box{
	width:100%;
	margin-right:56px;
	margin-top:10px;
	text-align: left;
    margin-bottom:120px;
}
.page-box1{
    width:100%;
    margin-right:56px;
    margin-top:10px;
    text-align: left;
    
}
.name{
	display:inline-block;
	width:100px;
	overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.addHot{
	position:fixed;
	z-index:99;
	height:89%;
	width:500px;
	right:-500px;
	top:48px;
	background: #fff;
	z-index:100;
	box-shadow: 0 0 20px #ccc
	/*border:1px solid red;*/
}
.addHot-head{
	width:100%;
	height:50px;
	line-height: 50px;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #e4e4e4;
	
	
}
 .lanren {
    position: absolute;
    text-align: center;
    top: -23px;
    left: -5px;
    width: 0;
    height: 0;
    border-width: 35px 0 35px 35px;
    border-style: solid;
    transform: rotate(-135deg);
    border-color: transparent transparent transparent #40ca98;
}
.lanren span{
   width: 60px;
    height: 60px;
    color: #fff;
    display: block;
    position: relative;
    z-index: 9999999999999;
    top: -29px;
    right: 75px;
    font-size: 12px;
    font-weight: 900;
    transform: rotate(85deg);
}

.searchInput{
	width:100%;
	line-height: 35px;
	margin:20px;
	text-align: center;
	display: flex;

}
.addHot-head span{
	font-size:14px;
	font-weight:600;
	margin-left:20px;
}
.table1{
	margin: 20px 10px
}
.skuname{
	width:100%;

	overflow: hidden;
	text-overflow:ellipsis;

	white-space: nowrap;
}
.hotbg1{
	border-color: transparent transparent transparent #d53c39;
}
.bor{
	border-color:#d53c39;
}
.mark{
    position:fixed;
    display:none;
    top:48px;
    left:0;
    width:100%;
    height:100%;
    background: #B2B2B2;
    opacity:0.4;
    z-index:9;
}

</style>
