//处理二级菜单
export default {
	//data 菜单目录 包括所有二级
	//path 当前路由path
	getMenu:(data,path)=>{
		let child=[]
		if(data.length==1){
			return child=data[0].child
		}else{
			for(let i=0;i<data.length;i++){
				for(let j=0;j<data[i].child.length;j++){
					if( data[i].path==path){
						child.push(data[i].child[j])
					}
				}
			}
			return child
		}
	}
}