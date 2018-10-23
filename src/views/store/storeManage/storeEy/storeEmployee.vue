<template>
    <div class='storeCode'>
	    <div class='dytitle'>
	        <Breadcrumb class='dytitlespan'>
	            <BreadcrumbItem :to="{name:'storemanage',params:{index:2}}">打印设置</BreadcrumbItem>
	            <BreadcrumbItem to="/storeEmployee">员工二维码</BreadcrumbItem>
	        </Breadcrumb>
	    </div>
	    <div class='store-EWM'>
            <div v-if='dgdata.length==0' >暂无员工</div>
	    	<ul @mouseover='over(index)' @mouseleave='leave' v-for="(item,index) in dgdata">
		    	<li>
		    		<div class="title">
			    		<img :src="item.headPic?item.headPic:'http://img.zsydian.com/img/d/yh.png'" width='60' height='60' style='vertical-align: middle;margin-right:20px'>
			    		<span>{{item.name}}</span>
		    		</div>
		    		<div class='store-content'>
		    			<div class="welcom">
		    				<p>扫码进入公众号</p>
		    			</div>
		    		</div>
		    		<div class='center-ewm'>
		    			<img :src="item.Url" alt="" width='200' height='200'>
		    		</div>
		    		<div class='bottom-p'>
		    			<p>微信扫一扫，进入公众号</p>
		    		</div>
		    	</li>
		    	<div class='store-mark' v-if="numIndex==index">
		    		<button type="button" class="ant-btn download-button" @click="downimg(item)">
                        下载图片
                    </button>
		    	</div>
	    	</ul>
           
	    </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            numIndex:-1,
        	dgdata:[],
            storeName:"",//当前店铺名称
            storeimg:"",//店铺图标
            uid: this.$store.state.common.token,
            storeCode:"",//店铺code
            storeEwm:"",//店铺二维码
        }

    },
    methods:{
        savepic(src) { 
        　　 var $a = document.createElement('a');
                $a.setAttribute("href", src);
                $a.setAttribute("class", "downA");
               
                $a.setAttribute("download", "");
                var evObj = document.createEvent('MouseEvents');
                evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
                $a.dispatchEvent(evObj);
                $('.downA').remove()
        },
        downimg(item){
            console.log(item)
            this.savepic(item.Url)
        },
    	over(index){
           this.numIndex=index
    	
    	},
    	leave(){
            this.numIndex=-1
    		
    	},
         //获取当前店铺
        getAllstore(){
            this.axios.get('setting/nows?uid='+this.uid).then((res)=>{
                if(res.data.status==200){
                    let data=res.data.rows
                    this.storeName = data.name
                    this.storeimg = data.logo
                    this.storeCode=data.code
                    console.log(this.storeCode)
                     
                }else{
                    this.$notify({
                        title:"",//错误
                        message:res.data.errorMessage,
                        type: 'error',
                        position: 'bottom-right'
                    });
                }
            })
        },
        //导购
		getey(){
			this.axios.get('setting/dqmddg?uid='+this.uid).then((res)=>{
				if(res.data.status==200){
					let row = res.data.rows;
                    for(let i=0;i<row.length;i++){
                        this.axios.get('/wxqrcode/qrcode/'+row[i].code+'?name='+row[i].name+'&uid='+this.uid).then(res=>{
                            if(res.data.status==200){
                                let dataS=res.data.rows
                                let Obj={
                                    name:row[i].name,
                                    Url:dataS.imgUrl
                                }
                                this.dgdata.push(Obj)
                               
                            }
                        })
                    }
				}
			})
		},
    },
    mounted(){
        this.getAllstore()
        this.getey()
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
    flex-wrap: wrap;
    margin:20px 20px 120px 20px;

}
.store-EWM ul{
	width: 300px;
    height: 500px;
    flex:0 0 300px;
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
    left: 110px;
    top: 238px;
    border: solid 1px #5491de;
    color: #5491de;
}
.store-right-dg{
	padding: 10px 0;
}
.store-right-item{
	padding-bottom:10px;
}
</style>

