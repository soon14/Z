<template>
    <div>
        <div class='dytitle'>
	        <Breadcrumb class='dytitlespan'>
	            <BreadcrumbItem :to="{name:'storemanage',params:{index:2}}">打印设置</BreadcrumbItem>
	            <BreadcrumbItem to="/goodsLabel">商品标签</BreadcrumbItem>
	        </Breadcrumb>
	    </div>
        <div class="center">
            <div class='title'>
		    	<p>商品价签为您提供全新的商品标签功能，打印机连接、页面设置完成后请前往商品资料进行标签打印</p>
		    </div>
            <div>
                <Button shape="circle" type="primary" style="border:none;margin: 0 0px 20px 0"
                 @click="add" >
				新增模板</Button>
            </div>
            <div>
                <Table  border highlight-row  :columns="temp" :data="tempData"
                 @on-row-click="clickTempRow">
			    </Table>
                <div class="page-box">
                <Page :total="total" :pageSize='pageSize' show-total @on-change="getData" 
                @on-page-size-change="changePageSize"></Page>
                </div>
                <div class='store-right'>
                    <div class='store-right-top'><span>详情介绍</span></div>
                    <div class="line"></div>
                    <p class="title" style='margin-bottom:10px'>商品价签是什么？</p>
                    <span>商品价签，是云小店专门为线下零售门店、无人货架等销售场景提供的商品标签打印服务，结合云小店微商城和小程序，为小店无缝连接线下和线上。顾客到店，了解商品基本信息的同时，扫描标签二维码即可进入小店微商城或小程序进行详情了解和下单。</span>

                    <p class="title" style='margin-top:20px'>如何打印商品价签？</p>
                    <span>方式一</span></br>
                    <span>1.准备标签打印机。如尚未购买标签打印机，可前往周边商城采购匹配的设备</span></br>
                    <span>2.为标签打印机装填标签纸，标签纸尺寸大小应与所选择模板大小一致</span></br>
                    <span>3.连接标签打印机和PC</span></br>
                    <span>4.打开桌面客户端。如未安装，点击下载页面选择”桌面端“进行下载</span></br>
                    <span>5.编辑并选择商品价签模板</span></br>
                    <span>6.桌面客户端内前往商品资料页面进行价签打印</span></br>
                    <div style='height:20px'></div>
                    <span>方式二</span></br>
                    <span>1.编辑并选择商品价签模板</span></br>
                    <span>2.前往商品资料页面批量导出商品价签图片，自主进行图片打印</span></br>
                    <div style='height:20px'></div>
                    <span>方式三</span></br>
                    <span>使用零链提供的专业打印服务，成品更精美</span></br>
                    <span>1.编辑并选择商品价签模板</span></br>
                    <span>2.前往商品资料页面批量导出商品价签图片</span></br>
                    <span>3.前往周边商城选择打印服务类目下“商品价签”商品，选择规格</span></br>
                    <span>4.周边商城上联系客服提交打印图片，确认后下单</span></br>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            total:0,
            pageSize:0,
            temp:[
                {
                    title:"模板名称",
                    key:"name",
                },
                {
                    title:"纸张尺寸",
                    key:"size",
                },
                {
                    title:"创建时间",
                    key:"creatTime",
                },
                {
                    title:"操作",
                    key:"action",
                },
            ],
            tempData:[],
        }
    },
    methods:{
        add(){

        },
        //点击模板一行
        clickTempRow(data){

        },
        //翻页
        getData(current){

        },
        changePageSize(size){
            this.pageSize=size
        },
    },
    mounted(){

    }
}
</script>
<style scoped>
li{
    list-style-type: none;
}
.dytitle{
	display: block;
	height:50px;
	line-height: 50px;
	background: #F9F9F9;
	margin-top:20px;
}
.dytitlespan{
    margin-left:20px
}
.center{
	margin:0 20px 120px 20px;
}
.title{
	margin: 20px 0;
}
.title p{
	width: 100%;
    height: 34px;
    padding-left: 15px;
    background-color: #F2F8FF;
    margin-bottom: 10px;
    align-items: center;
    display: flex;
    border: 1px solid #e9e9e9;
}
.page-box{
    margin:10px 0;
    text-align: center;
}
.store-right{
    width:100%;
    margin-bottom:120px
}
.store-right .title{
	font-size:16px;
	color: #313030;
}
.line{
	border-top: solid 1px #eee;
    margin: 5px 0 10px 0;
}
</style>

