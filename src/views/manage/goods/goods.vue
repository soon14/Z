<template>
  <div class="">
  <!--商品管理首页-->
  		<div class="main">
	    	<v-goodsg></v-goodsg>
	    	<router-view keep-alive></router-view>
    	</div>
  </div>
</template>
<script type="text/javascript">
import goodsg from "./goodsg"
export default{
	components:{
		'v-goodsg':goodsg,
	},
	data(){
		return{
			
		}
	},
	methods:{
		
	}
}
</script>
<style scoped>
.main{
	width:100%;
	height:100%;
}
</style>