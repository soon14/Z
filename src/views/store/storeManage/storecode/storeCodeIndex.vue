<template>
    <div class='storeCode'>
	    <div class='dytitle'>
	        <Breadcrumb class='dytitlespan'>
	            <BreadcrumbItem :to="{name:'storeprinting',params:{index:2}}">打印设置</BreadcrumbItem>
	            <BreadcrumbItem to="/storeCode">店铺二维码</BreadcrumbItem>
	        </Breadcrumb>

	    </div>
	    <div class='store-EWM'>
	    	<ul @mouseover='over(0)' @mouseleave='leave'>
		    	<li>
		    		<div class="title"><!--http://img.zsydian.com/icon/storeRed.png-->
			    		<img :src="storeimg?storeimg:'http://img.zsydian.com/icon/storeRed.png'" width='60' height='60' style='vertical-align: middle;margin-right:20px'>
			    		<span>{{storeName}}</span>
		    		</div>
		    		<div class='store-content'>
		    			<div class="welcom">
		    				<p>欢迎扫码进店线上购物</p>
		    			</div>
		    		</div>
		    		<div class='center-ewm'>
		    			<img :src="storeEwm" alt="" width='300' height='300' id="downim">
		    		</div>
                    <div v-if='loadingisshow' >
                        <Spin fix>
                            <mu-icon value="rotate_right" color="blue"  class="demo-spin-icon-load"></mu-icon>
                            
                            <div>Loading...</div>
                        </Spin>
                    </div>
		    		<div class='bottom-p'>
		    			<p>微信扫一扫，进入店铺线上购物</p>
		    		</div>
		    	</li>
		    	<div class='store-mark' v-if="numIndex==0" ><!---->
		    		<button class="ant-btn download-button"  @click="downimg" id="down">
                       <a  id="downLoad"></a>下载图片
                    </button>
		    	</div>
	    	</ul>
            <div class='store-right'>
                <div class='store-right-top'><span>详情介绍</span></div>
                
                <div class="line"></div>
                <p class="title" style='margin-bottom:10px'>什么是店铺二维码？</p>
                <span>店铺二维码是您的云小店店铺专属二维码，顾客扫描该二维码即可进入您的微商城进行商品查看和网购。打印店铺二维码，粘贴于店内以便顾客扫码进行店铺关注、收藏及购物</span>

                 <p class="title" style='margin-top:20px'>如何打印？</p>
                 <span>方式一</span></br>
                 <span>1.点击左侧图片，下载店铺二维码</span></br>
                 <span>2.自主打印图片</span></br>
                 <div style='height:20px'></div>
                 <span>方式二</span></br>
                 <span>使用零链提供的专业打印服务，成品更精美</span></br>
                 <span>1.点击左侧图片，下载店铺二维码</span></br>
                 <span>2.前往周边商城，选择打印服务类目下“店铺二维码”商品，选择打印规格</span></br>
                 <span>3.周边商城上联系客服提交打印图片，确认后下单</span></br>
            </div>
	    </div>
        <canvas id="myCanvas"></canvas>
    </div>
</template>
<script>
var FileSaver = require('file-saver')
export default {
    data(){
        return {
            loadingisshow:false,
            numIndex:-1,
            storeName:"",//当前店铺名称
            storeimg:"",//店铺图标
            uid: this.$store.state.common.token,
            storeCode:"",//店铺code
            storeEwm:"",//店铺二维码
        }

    },
    methods:{
        //下载二维码
        savepic(src) { 
        　　 var $a = document.createElement('a');
                $a.setAttribute("href", src);
                $a.setAttribute("download", "");
                var evObj = document.createEvent('MouseEvents');
                evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
                $a.dispatchEvent(evObj);
        },
        downimg(){
            this.savepic(this.storeEwm)
        },
        
    	over(index){
            this.numIndex=index
    	},
    	leave(){
            this.numIndex=-1
    	},
         //获取当前店铺
        getAllstore(){
            this.loadingisshow=true
            this.axios.get('setting/nows?uid='+this.uid).then((res)=>{
                if(res.data.status==200){
                    let data=res.data.rows
                    this.storeName = data.name
                    this.storeimg = data.logo
                    this.storeCode=data.code
                     this.axios.get('/wxqrcode/qrcode/'+data.code+'?name='+data.name+'&uid='+this.uid).then(res=>{
                        if(res.data.status==200){
                            let data=res.data.rows
                            this.storeEwm=data.imgUrl
                            this.loadingisshow=false
                        }
                    })
                }else{
                    this.$notify({
                        title:"",//错误
                        message:res.data.errorMessage,
                        type: 'error',
                        position: 'bottom-right'
                    });
                    this.loadingisshow=false
                }
            })
        },

 

    },
   
    mounted(){
        this.getAllstore()
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
.store-EWM{
    display:flex;
    margin:20px 20px 120px 20px;

}
.store-EWM ul{
	width: 400px;
    height: 556px;
    flex:0 0 400px;
    background-color: #ff4f4f;
    text-align: center;
    border: solid 1px #eee;
	position:relative;
}
.store-EWM ul li .title{
	height: 80px;
    line-height: 80px;
    text-align: center;
    background: #fff;
    margin-bottom:20px;
}
.store-mark{
	position:absolute;
	width:100%;
	height:100%;
	z-index:9;
	top:0;
	left:0;
	background-color: rgba(0, 0, 0, 0.65);
}
.store-right{
    margin-left:20px
}
.store-content{
   
}
.welcom{
	display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin:0 20px;
    height: 48px;
    text-align: center;
    background-color: white;
    border-radius: 20px;
}
.welcom p{
	font-size: 24px;
}
.center-ewm{
	margin-top:20px;
}
.bottom-p p{
	font-size:20px;
	margin-top:20px;
	color:#fff;
}
.store-right{
	width:100%;
}
.store-right .title{
	font-size:16px;
	color: #313030;
}
.line{
	border-top: solid 1px #eee;
    margin: 5px 0 10px 0;
}
.store-mark{
	/*display: none*/
}
.ant-btn:not([disabled]):active{
	outline: 0;
    transition: none;
}
.ant-btn:not([disabled]):hover{
	text-decoration: none;
}
.ant-btn:hover, .ant-btn:focus, .ant-btn:active, .ant-btn.active{
	 background: #fff;
}
.download-button{
	cursor:pointer;
	z-index: 10;
    background-color: #fff;
    border-radius: 50px;
    text-align: center;
    position: absolute;
    width: 80px;
    height: 80px;
    left: 160px;
    top: 238px;
    border: solid 1px #5491de;
    color: #5491de;
}
</style>

