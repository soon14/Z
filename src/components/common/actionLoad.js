//文件导入
module.exports = {
	//导入模板
	actionLoad:{
		YG:"http://img.zsydian.com/mb/YG.xls",//员工
		SKU:"http://img.zsydian.com/mb/SKU.xls",//商品
		supplier:"http://dev.zsydian.com/mb/ys/供应商导入模版.xls",
		customerK:"http://dev.zsydian.com/mb/yd/客户导入模版.xls",
		YS:"http://dev.zsydian.com/mb/yd/应收导入模版.xls",
		customer:"http://img.zsydian.com/zhb/KH.xls",//长户宝下 客户导入
		attendant:"http://img.zsydian.com/zhb/HLY.xls",//长户宝下 护理员导入
		wordOrder:"http://img.zsydian.com/mb/ZHBGD.xls",//长户宝下 工单导入
	},
	/*
		接口前缀(主要是上传导入地址)
		正式机需要改
	*/
	httpPrefix:{
		Url:"http://dev.zsydian.com/pss/",//测试机接口
	},
	//跳转网址
	Website:{
		dev:"http://dev.zsydian.com/yd",//测试
		Offdev:"http://dev.zsydian.com",//测试官网
		prod:"https://www.zsydian.com/yd/",//正式机
		prodERP:"http://erp.zsydian.com/",//ERP
		OffProd:"https://www.zsydian.com",//正式机官网
	}
}
