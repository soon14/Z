<template>
    <div>
        <Table border :columns="locationkey" :data="locationdata"></Table>
		<div style='margin-top:10px' class='page-box'>
			<Page :total="locationtotal" show-total  :pageSize='locationpageSize'  @on-change="getDatalocation" 
			@on-page-size-change="changePageSizelocation"></Page>
		</div>
    </div>
</template>
<script>
export default {
    data(){
    	return {
    		uid:this.$store.state.common.token,
    		locationkey:[],
    		locationdata:[],
    		locationtotal:0,
    		locationpageSize:0,
    		locationCurrent:1,
    	}
    },
    methods:{
    	//GET /location/query 库位管理
    	getlocation(){
    		this.axios.get('/location/query?uid='+this.uid).then(res=>{
    			if(res.data.status==200){
    				this.locationdata=res.data.rows
    				this.locationtotal=res.data.total
    				this.locationpageSize=res.data.pageSize
    			}
    		})
    	},
    	//库区翻页
    	getDatalocation(current){
    		this.axios.get('/location/query?offset='+current+'&uid='+this.uid).then(res=>{
    			if(res.data.status==200){
    				this.locationdata=res.data.rows
    				this.locationtotal=res.data.total
    				this.locationpageSize=res.data.pageSize
    			}
    		})
    	},
    	changePageSizelocation(size){
    		this.locationpageSize=size
    	},
    },
    mounted(){
    	this.getreservoir()
    }
}
</script>
<style scoped>

</style>
