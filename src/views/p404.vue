<template>
	<div class="main404">
		<div class='login-top'>
            <div class='login-left'>
                <a :href="backUrl" target="_blank"> <img src="http://img.zsydian.com/icon/logoin.png" width='50' height='50'></a>
                <div>
                    <h1>智胜云</h1>
                    <p class="h1info">助力零售数智化转型</p>
                </div>
            </div>
            <div class='login-right'>
                <span>客服热线：0512 - 87816917</span>
            </div>
        </div>
        <div class="main-center">
        	<div class="login-left-img"></div>
        	<div class="main-btn">
        		<p class="p1">出错了......</p>
        		<p class="p2">找不到您请求的页面</p>
        		<Button type="primary" class='loginBtn' @click='back'>返回</Button>
        	</div>
        </div>
         <div class='Copyright'>
            <p>Copyright &copy;2018-2020  <a href="https://www.zsydian.com" target="_blank" >智胜云</a>
                <span style="margin-left:10px">沪ICP备14051887号-22</span>
            </p>
        </div>
	</div>
</template>
<script>
import LoadUrl from '@/components/common/actionLoad'
export default{
	data(){
		return{
			backUrl:LoadUrl.Website.OffProd,//官网
		}
	},
	methods:{
		back(){
			this.$router.go(-1)
		},
	},
	mounted(){
		
	}
}
</script>
<style scoped>
.main-center{
	width: 100%;
	height: 100%;
	overflow: auto;
   display: flex;
   justify-content: center;
   margin-top:150px;
}
.login-left-img{
	background: url(http://img.zsydian.com/icon/404.png) center center no-repeat;
	height:300px;
	width:400px;
}
h1{
	margin:0;color:rgba(45,139,241,0.9)
}
.h1info{
	margin:-30px 0 0 0;color:rgba(45,139,241,0.7)
}
.login-top{
    display: flex;;
    justify-content: space-between;
    width:100%;
    height:60px;
    line-height: 60px;
    margin-top:10px;
    padding-left:100px
}
.login-left{
    display: flex;
}
.login-left img{
    vertical-align: middle;
    margin-top: 15px;
    margin-right: 10px;
}
.login-right{
     font-size: 16px;
    display:flex;
    padding-right:80px;
    color:rgba(110,110,110,0.9);
}
.main-btn{
	margin-left:60px;
	margin-top:55px;
}
.loginBtn{
    width:160px;
    height:40px;
    font-size:16px;
    margin-top:48px;
}
.p1{
	margin-bottom:10px;font-weight:600;font-size:24px
}
.p2{
	color:#999;font-size:14px
}
.Copyright{
    position:fixed;
    text-align: center;
    right: 0;
    bottom: 2px;
    left: 0;
    color: #9ea7b4;
    font-size: 12px;
    padding:10px
}
.Copyright a{
    color: #9ea7b4;
}
</style>
