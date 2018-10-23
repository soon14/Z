<template>
    <div class="zhb">
        <v-user :data='data' :titleName='titleName'></v-user>
    </div>
</template>
<script>
import user from '../components/common/publicUser'
export default {
    components:{
		'v-user':user
	},
    data(){
        return {
            user:this.$store.state.common.user,
            //概览|工单|客户|护理员|设置|
            data:[
				{
					title:"概览",
					url:"/zhb",
					icon:"http://img.zsydian.com/icon/gl.png",
          			icon1:"http://img.zsydian.com/icon/gl1.png",
				},
				{
					title:"客户",
					url:"/customerIndex",
					icon:"http://img.zsydian.com/icon/gys.png",
          			icon1:"http://img.zsydian.com/icon/gys1.png",
                },
                {
					title:"护理员",
					url:"/attendantIndex",
					icon:"http://img.zsydian.com/icon/gys.png",
          			icon1:"http://img.zsydian.com/icon/gys1.png",
				},
				{
					title:"工单",
					url:"/wordOrderIndex",
					icon:"http://img.zsydian.com/icon/gys.png",
          			icon1:"http://img.zsydian.com/icon/gys1.png",
                },
                
                
				{
					title:"日程",
					url:"/zhbDate",
					icon:"http://img.zsydian.com/icon/gys.png",
          			icon1:"http://img.zsydian.com/icon/gys1.png",
                },
                {
					title:"设置",
					url:"/settingIndex",
					icon:"http://img.zsydian.com/icon/setting.png",
		            icon1:"http://img.zsydian.com/icon/setting1.png",
				},
			],
			titleName:'长护宝'
        }
    }    
}
</script>
<style scoped>

</style>

