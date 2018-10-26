//处理二级菜单
export default {
	//data 菜单目录 包括所有二级
	//path 当前路由path
	getMenu:(data,path)=>{
		let child=[]
		for(let i=0;i<data.length;i++){
			if(data[i].child==undefined){
				continue;//没有子类跳过此次，下次继续
			}else if(data.length==1){
				return child=data[0].child
			}else{
				for(let j=0;j<data[i].child.length;j++){
					if( data[i].path==path){
						child.push(data[i].child[j])
					}
				}
			}
		}
		return child
		
	}
}