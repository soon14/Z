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
            data:[],
			titleName:'概览'
        }
    }    
}
</script>
<style scoped>

</style>

