<template>
    <div >
        <div class="module">
            <p class="title">运营工作台</p>
    		<ul class='head-bottom1'>
                <li class='head-bottom1-li'>
                    <div class="car-body">
                        <span >待评估</span>
                        <h3 class="f-50 font-weight-100" ><span class="span" @click="geToPath(0)">{{assessAunt}}</span></h3>
                    </div>
                </li>
                <li class='head-bottom1-li'>
                    <div class="car-body">
                        <span >合约中的客户数</span>
                        <h3 class="f-50 font-weight-100" ><span class="span" @click="geToPath(1)">{{contractAunt}}</span></h3>
                    </div>
                </li>

                <li class='head-bottom1-li'>
                    <div class="car-body">
                        <span >待审核护理员</span>
                        <h3 class="f-50 font-weight-100" ><span class="span" @click="geToPath(2)">{{assessCaregivers}}</span></h3>
                    </div>
                </li>
                <li class='head-bottom1-li'>
                    <div class="car-body">
                        <span >工作记录</span>
                        <h3 class="f-50 font-weight-100" ><span class="span" @click="geToPath(3)">{{workReport}}</span></h3>
                    </div>
                </li>
                <li class='head-bottom1-li'>
                    <div class="car-body">
                        <span >本周已完成工单</span>
                        <h3 class="f-50 font-weight-100" ><span class="span" @click="geToPath(4)">{{weekOrderNum}}</span></h3>
                    </div>
                </li>
    			<li class='head-bottom1-li'>
    				<div class="car-body">
    					<span >今日已完成工单</span>
    					<h3 class="f-50 font-weight-100" ><span class="span" @click="geToPath(5)">{{dayOrderNum}}</span></h3>
    				</div>
    			</li>
    			
    			<li class='head-bottom1-li'>
    				<div class="car-body">
    					<span >本月完成工单</span>
    					<h3 class="f-50 font-weight-100" ><span class="span" @click="geToPath(6)">{{monthOrderNum}}</span></h3>
    				</div>
    			</li>
    		</ul>
        </div>

        <div class="module">
            <p class="title">市场工作台</p>
            <ul class='head-bottom1'>
                
                <li class='head-bottom1-li'>
                    <div class="car-body">
                        <span >待申请客户</span>
                        <h3 class="f-50 font-weight-100" ><span class="span" @click="geToPathC(0)">{{applyAunt}}</span></h3>
                    </div>
                </li>
                <li class='head-bottom1-li'>
                    <div class="car-body">
                        <span >待派单客户</span>
                        <h3 class="f-50 font-weight-100" ><span class="span" @click="geToPathC(1)">{{sendOrderAunt}}</span></h3>
                    </div>
                </li>
            </ul>
        </div>
        <div class="module">
            <p class="title">客服工作台</p>
            <ul class='head-bottom1'>
                
                <li class='head-bottom1-li'>
                    <div class="car-body">
                        <span >昨日未完成工单</span>
                        <h3 class="f-50 font-weight-100" ><span class="span" @click="geToPathK(0)">{{yesDayOrderNoDone}}</span></h3>
                    </div>
                </li>
                <li class='head-bottom1-li'>
                    <div class="car-body">
                        <span >待中止客户</span>
                        <h3 class="f-50 font-weight-100" ><span class="span" @click="geToPathK(1)">{{waitDiscontinueAunt}}</span></h3>
                    </div>
                </li>
                <li class='head-bottom1-li'>
                    <div class="car-body">
                        <span >待恢复客户</span>
                        <h3 class="f-50 font-weight-100" ><span class="span" @click="geToPathK(2)">{{waitRecoverAunt}}</span></h3>
                    </div>
                </li>
                <li class='head-bottom1-li'>
                    <div class="car-body">
                        <span >已中止客户</span>
                        <h3 class="f-50 font-weight-100" ><span class="span" @click="geToPathK(3)">{{discontinueAunt}}</span></h3>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            assessAunt:0,//待评估
            contractAunt:0,//合约中的客户数
            assessCaregivers:0,//待审核护理员
            workReport:0,//工作记录
            weekOrderNum:0,//本周已完成工单
            dayOrderNum:0,//今日已完成工单
            monthOrderNum:0,//本月完成工单
            applyAunt:0,//待申请
            sendOrderAunt:0,//待派单客户
            yesDayOrderNoDone:0,//昨日未完成工单
            waitDiscontinueAunt:0,//待中止客户
            waitRecoverAunt:0,//待恢复客户
            discontinueAunt:0,//已中止客户
            uid: this.$store.state.common.token,
        }
    },
    methods:{
        
    	getNum(){
    		this.axios.get('zhbStatement/workbench?uid='+this.uid).then(res=>{
    			if(res.data.status==200){
    				let data=res.data.rows
    				this.assessAunt=data.assessAunt//待评估
                    this.contractAunt=data.contractAunt//合约中的客户数
                    this.assessCaregivers=data.assessCaregivers//待审核护理员
                    this.workReport=data.workReport//工作记录
                    this.weekOrderNum=data.weekOrderNum//本周已完成工单
                    this.dayOrderNum=data.dayOrderNum//今日已完成工单
                    this.monthOrderNum=data.monthOrderNum//本月完成工单
                    this.applyAunt=data.applyAunt//待申请
                    this.sendOrderAunt=data.sendOrderAunt//待派单客户
                    this.yesDayOrderNoDone=data.yesDayOrderNoDone//昨日未完成工单
                    this.waitDiscontinueAunt=data.waitDiscontinueAunt//待中止客户
                    this.waitRecoverAunt=data.waitRecoverAunt//待恢复客户
                    this.discontinueAunt=data.discontinueAunt//已中止客户
    			}
    		})
    	},
    	geToPath(num){
    		switch(num){
    			case 0:
    				//待评估
    				this.$router.push({
    					path:'/customerIndex',
    					query:{
    						index:11
    					}
    				})
    			break;
    			case 1:
    				//合约中的客户数
    				this.$router.push({
    					path:'/customerIndex',
    					query:{
    						index:3
    					}
    				})
    			break;
    			case 2:
    				//待审核护理员
    				this.$router.push({
    					path:'/attendantIndex',
    					query:{
    						index:1
    					}
    				})
    			break;
    			case 3:
    				//工作记录
    				// this.$router.push({
    				// 	path:'/attendantIndex',
    				// 	query:{
    				// 		index:3
    				// 	}
    				// })
    			break;
                //客户
                case 4:
                    //本周已完成工单
                    // this.$router.push({
                    //     path:'/customerIndex',
                    //     query:{
                    //         index:3
                    //     }
                    // })
                break;
                case 5:
                    //今日已完成工单
                    // this.$router.push({
                    //     path:'/customerIndex',
                    //     query:{
                    //         index:3
                    //     }
                    // })
                break;
                 case 6:
                    //本月完成工单
                    // this.$router.push({
                    //     path:'/customerIndex',
                    //     query:{
                    //         index:3
                    //     }
                    // })
                break;
    		}

    	},
        //市场
        geToPathC(num){
            switch(num){
                //待申请客户
                case 0:
                    this.$router.push({
                        path:'/customerIndex',
                        query:{
                            index:1
                        }
                    })
                break;
                //派单客户
                case 1:
                    this.$router.push({
                        path:'/customerIndex',
                        query:{
                            index:22
                        }
                    })
                break;
            }
        },
        geToPathK(num){
            switch(num){
                //待申请客户
                case 0:
                    // this.$router.push({
                    //     path:'/customerIndex',
                    //     query:{
                    //         index:1
                    //     }
                    // })
                break;
                //待中止客户
                case 1:
                    this.$router.push({
                        path:'/customerIndex',
                        query:{
                            index:5
                        }
                    })
                break;
                //待恢复客户
                case 2:
                    this.$router.push({
                        path:'/customerIndex',
                        query:{
                            index:4
                        }
                    })
                break;
                //已终止
                case 3:
                    this.$router.push({
                        path:'/customerIndex',
                        query:{
                            index:9
                        }
                    })
                break;
            }
        },
    },
    created(){
       
    	this.$nextTick(()=>{
    		this.getNum()
    	})
    }
}
</script>
<style scoped>
.module{
    padding:10px 0;
}
.module:last-child{
    margin-bottom:120px;
}
.title{
    font-size:20px;
    font-weight:600;
    margin:10px 10px 0 10px;
}
.order-top{
	display:flex;
	justify-content: space-around;
	background: #F8F8F8;
	height:80px;
	
}
.top-list{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column
}
.head-bottom1{
	display:flex;
	flex-wrap: wrap;
	margin: 0px 10px 10px 5px;
}
.head-bottom1-li{
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
   	width:260px;
    margin:10px 10px 0 5px;

}

.head-bottom1 .head-bottom1-li:focus-within{
	background:red;
	border:1px solid red;
}
.car-body{
	padding: 1.25rem;

}
.car-body span{
	color:#666f73;

}
.f-50{
	font-size:35px;
}
.font-weight-100{
	font-weight:100;
	
}
.span{
	cursor:pointer;
}
</style>