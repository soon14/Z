<template>
	<!--采购报表-->
	<div class="units-box">
		<div style='display:flex;height:100%'>
			<Tabs :animated="false" :value="fhindex" style="background:#fff;width:100%;height:100%" @on-click="getfhlistbg">
		        <TabPane label="采购统计" name="0">
		        	<!--采购统计-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;;margin-bottom:7px'>
							<div style='display:flex;'>
								
								<Input style='margin-top:10px;width:300px;' v-model='fuzzySearch' :placeholder="$t('public.PreciseSearchPlaceholder')">
				                    <span slot="append" style='cursor:pointer' @click='search'>{{$t('public.search')}}</span><!--搜索-->
				                </Input>
				                <div style='margin-left:10px;margin-top:15px'>
				                
								</div>
							</div>
							<div>
							<Button type="primary" shape="circle" @click="cliskImport(0)" style='margin-top:10px' >
							 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.export')}}<!--导出-->
							</Button>
							</div>
						</div>
						<div >
							<Table border highlight-row  :columns="columns" :data="dataList" @on-select="selected"></Table>
							<div class="page-box">
								 <Page :total="total" show-total size="small" :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="采购订货" name="1">
		        	<!--采购订货统计表-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;;margin-bottom:7px'>
							<div style='display:flex;'>
								
								<Input style='margin-top:10px;width:300px;' v-model='fuzzySearch' :placeholder="$t('public.PreciseSearchPlaceholder')">
				                    <span slot="append" style='cursor:pointer' @click='search'>{{$t('public.search')}}</span><!--搜索-->
				                </Input>
				                <div style='margin-left:10px;margin-top:15px'>
				                	<!-- <a style='font-size:14px;font-weight:600;margin-left:10px;margin-right:20px;border-bottom:1px solid #3b77e3;height:40px' @click='searchNo2'>{{$t('public.PreciseSearch')}}</a><!--精准搜索-->
				                </div>
		                	</div>
			                <div>
								<Button type="primary" shape="circle" @click="cliskImport(1)" style='margin-top:10px' >
									 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.export')}}<!--导出-->
								</Button>
							</div>
						
						</div>
						<div >
							<Table border highlight-row :columns="dhcolumns" :data="dhdataList" ></Table>
							<!--@on-row-dblclick="dbl" @on-select="selected"-->
							<!--底部的分页-->
							<div class="page-box">
								 <Page :total="dhtotal" show-total size="small" :pageSize='dhpageSize'  @on-change="dhgetData" @on-page-size-change="dhchangePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="采购订货明细" name="2">
		        	<!--采购订货明细-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;;margin-bottom:7px'>
							<div style='display:flex;'>
								
								<Input style='margin-top:10px;width:300px;' v-model='fuzzySearch' :placeholder="$t('public.PreciseSearchPlaceholder')">
				                    <span slot="append" style='cursor:pointer' @click='search'>{{$t('public.search')}}</span><!--搜索-->
				                </Input>
				                <div style='margin-left:10px;margin-top:15px'>
				                	<!-- <a style='font-size:14px;font-weight:600;margin-left:10px;margin-right:20px;border-bottom:1px solid #3b77e3;height:40px' @click='searchNo3'>{{$t('public.PreciseSearch')}}</a><!--精准搜索 -->
								
								</div>
							</div>
							<div>
							<Button type="primary" shape="circle" @click="cliskImport(2)" style='margin-top:10px' >
								 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.export')}}<!--导出-->
							</Button>
							</div>
						</div>
						<div >
							<Table border  highlight-row :columns="dhmxcolumns" :data="dhmxdataList" ></Table>
							<div class="page-box">
								 <Page :total="dhmxtotal" show-total size="small" :pageSize='dhmxpageSize'  @on-change="dhmxgetData" @on-page-size-change="dhmxchangePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="进货明细" name="3">
		        	<!--进货明细-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;;margin-bottom:7px'>
							<div style='display:flex;'>
								
								<Input style='margin-top:10px;width:300px;' v-model='fuzzySearch' :placeholder="$t('public.PreciseSearchPlaceholder')">
				                    <span slot="append" style='cursor:pointer' @click='search'>{{$t('public.search')}}</span><!--搜索-->
				                </Input>
				                <div style='margin-left:10px;margin-top:15px'>
				                	<!-- <a style='font-size:14px;font-weight:600;margin-left:10px;margin-right:20px;border-bottom:1px solid #3b77e3;height:40px' @click='searchNo4'>{{$t('public.PreciseSearch')}}</a><!--精准搜索-->
								
								</div>
							</div>
							<div>
								<Button type="primary" shape="circle" @click="cliskImport(3)" style='margin-top:10px'>
								 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.export')}}<!--导出-->
								</Button>
							</div>
						</div>
						<div >
							<Table border  highlight-row :columns="jhmxcolumns" :data="jhmxdataList" ></Table>
							<div class="page-box">
								 <Page :total="jhmxtotal" show-total size="small" :pageSize='jhmxpageSize'  @on-change="jhmxgetData" @on-page-size-change="jhmxchangePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="价格分析" name="4">
		        	<!--价格分析-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;;margin-bottom:7px'>
							<div style='display:flex;'>
								
								<Input style='margin-top:10px;width:300px;' v-model='fuzzySearch' :placeholder="$t('public.PreciseSearchPlaceholder')">
				                    <span slot="append" style='cursor:pointer' @click='search'>{{$t('public.search')}}</span><!--搜索-->
				                </Input>
							</div>
							<div>
								<Button type="primary" shape="circle" @click="cliskImport(4)" style='margin-top:10px' >
								 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>{{$t('public.export')}}<!--导出-->
							</Button>
							</div>
						</div>
						<div >
							<Table border  highlight-row :columns="pricecolumns" :data="pricedataList" ></Table>
							<div class="page-box">
								 <Page :total="pricetotal" show-total size="small" :pageSize='pricepageSize'  @on-change="pricegetData" @on-page-size-change="pricechangePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="采购曲线" name="5">
		        	<!--采购曲线-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;;margin-bottom:7px'>
							<div style='display:flex;'>
							
			                <DatePicker type="year" placeholder="Select year"  :value="nowYear" style="margin-top:10px;width: 100px" @on-change="changeYearSku"></DatePicker>
						</div>
						<div>
							<!-- <Button type="primary" shape="circle" @click="" style='margin-top:10px' >
							 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>导出
							</Button> -->
						</div>
					</div>
						<div >
							<Table border  highlight-row :columns="qxkey" :data="qxdata" ></Table>
							<div class="page-box">
								 <Page :total="qxtotal" show-total size="small" :pageSize='qxpageSize'  @on-change="qxgetData" @on-page-size-change="qxchangePageSize"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="供应商采购" name="6">
		        	<!--供应商采购-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;;margin-bottom:7px'>
								<div style='display:flex;'>
								
				                <DatePicker type="year" placeholder="Select year"  :value="nowYear1" style="margin-top:10px;width: 100px" @on-change="changeYearSku1"></DatePicker>
							</div>
							<div>
								<!-- <Button type="primary" shape="circle" @click="" style='margin-top:10px' >
								 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>导出
							</Button> -->
							</div>
						</div>
						<div >
							<Table border  highlight-row :columns="gyskey6" :data="gysdata6" ></Table>
							<div class="page-box">
								 <Page :total="gystotal6" show-total size="small" :pageSize='gyspageSize6'  @on-change="gysgetData6" @on-page-size-change="gyschangePageSize6"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="商品排名" name="7">
		        	<!--商品排名-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;;margin-bottom:7px'>
								<div style='display:flex;'>
								
				                <DatePicker type="year" placeholder="Select year"  :value="nowYear2" style="margin-top:10px;width: 100px" @on-change="changeYearSku2"></DatePicker>
							</div>
							<div>
								<!-- <Button type="primary" shape="circle" @click="" style='margin-top:10px' >
								 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>导出
							</Button> -->
							</div>
						</div>
						<div >
							<Table border  highlight-row :columns="skukey6" :data="skudata6" ></Table>
							<div class="page-box">
								 <Page :total="skutotal6" show-total size="small" :pageSize='skupageSize6'  @on-change="skugetData6" @on-page-size-change="skuchangePageSize6"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		        <TabPane label="商品分类" name="8">
		        	<!--分类-->
					<div class="table">
						<div style='display:flex;justify-content: space-between;;margin-bottom:7px'>
								<div style='display:flex;'>
								
				                <DatePicker type="year" placeholder="Select year"  :value="nowYear3" style="margin-top:10px;width: 100px" @on-change="changeYearSku3"></DatePicker>
							</div>
							<div>
								<!-- <Button type="primary" shape="circle" @click="" style='margin-top:10px' >
								 <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>导出
							</Button> -->
							</div>
						</div>
						<div >
							<Table border  highlight-row :columns="classkey6" :data="classdata6" ></Table>
							<div class="page-box">
								 <Page :total="classtotal6" show-total size="small" :pageSize='classpageSize6'  @on-change="classgetData6" @on-page-size-change="classchangePageSize6"></Page>
							</div>
						</div>
					</div>
		        </TabPane>
		    </Tabs>
			
		</div>
		<!--查询-->
	<Modal v-model="searchNo1isshow" width="460px">
	    <p slot="header" style="height:30px;line-height:30px;text-align:center">
	      
	      <span>{{cgtitle}}</span>
	    </p>
     <Form :label-width="100">
    
        <FormItem :label="$t('data.sku.orderNo')" ><!--单号-->
           <Input v-model='reNo1' ></Input>
        </FormItem>
        
        <FormItem :label="$t('data.sku.skuname')"  ><!--商品-->
           <Input v-model='skunmae'></Input>
           <span @click="clickSku"><Icon type="ios-search" size="16" style='position:absolute;top:8px;right:8px;cursor:pointer' ></Icon></span>
        </FormItem>
         <FormItem :label="$t('data.inv.ck')" ><!--仓库-->
           <Input v-model='ckname'></Input>
           <span @click="clickStore"><Icon type="ios-search" size="16" style='position:absolute;top:8px;right:8px;cursor:pointer' ></Icon></span>
        </FormItem>
        <FormItem :label="$t('data.cg.gys')" ><!--供应商-->
           <Input v-model='gysname'></Input>
           <span @click="clickSupplier"><Icon type="ios-search" size="16" style='position:absolute;top:8px;right:8px;cursor:pointer' ></Icon></span>
        </FormItem>
        <FormItem  :label="$t('data.orderTime')"><!--单据日期-->
        	<div style='display: flex;justify-content: space-between;'>
				<DatePicker type="date" :value='beginNo1'  style="width:48%" @on-change="beginChange"></DatePicker>
				<DatePicker type="date" :value='endNo1'  style="width:48%" @on-change="endChange"></DatePicker>
			</div>
        </FormItem>
    </Form>
    <div slot="footer">
      <div class='footer-mark'>
        <span><a style='color:#999;font-size:14px' @click='secancel'>{{$t('public.cancel')}}</a></span>
        <span style='font-size:20px;width:1px;height:40px;background:#e4e4e4'></span>
        <span ><a style='color:#3B77E3;font-size:14px' @click='sure'>{{$t('public.sure')}}</a></span>
      </div>
    </div>
  </Modal>
  <!--选择商品-->
	<Modal v-model="goodsinshow" width="700px">
		<p slot="header" style="height:30px;line-height:30px">
			
			<span>{{$t('public.search')}}</span><!--搜索-->
		</p>
		<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
			<Input  class="modelInput"  style="padding:2px 0" v-model="goodskeyword" ></Input>
			<span @click="searchInput">
			<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>
			</span>
		</div>
		<!--商品数据-->
		<div slot="footer">
			<div  style='margin-top:-10px;'>
				<Table  border  height='200' highlight-row  :columns="goodskey" :data="goods" @on-row-click="clickgoodsrow">
				</Table>
				<div style='text-align:left;margin-top:5px'>
				 <Page :total="skutotal" show-total  :pageSize='skupageSize'  @on-change="skugetData" @on-page-size-change="skuchangePageSize"></Page>
				</div>
           	</div>
			
			<div class='title' style='margin:0px'>
				<div style='color:#D15151;font-size:14px'>
					<!-- <Icon type="plus" style='margin-right:5px'></Icon>
					<span >添加商品</span> -->
				</div>
				<div>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='skucancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="skusure"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
				</div>
			</div>
		</div>
	</Modal>
	<!--选择仓库弹出框-->
	<Modal v-model="warehouseshow" width="660px">
		<p slot="header" style="height:30px;line-height:30px">
			
			<span>{{$t('public.search')}}</span><!--搜索-->
		</p>
		<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
			<Input v-model="ckkeyword"  style="padding:2px 0;"></Input>
			<span @click="getckKeyword">
				<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>
			</span>
		</div>
		<div slot="footer">
			<!--仓库表格-->
			<Table  border height='200' highlight-row  :columns="ckkey" :data="allwarehouse" @on-row-click="ckrow">
			</Table>
			<!--分页-->
            <div class="page-box" style="text-align:left">
			 <Page :total="cktotal" :pageSize='ckpageSize' show-total @on-change="getckData" @on-page-size-change="changeckPageSize"></Page>
			</div>
			<div class='title' style='margin:0px'>
				<div style='color:#D15151;font-size:14px'>
					<!-- <Icon type="plus" style='margin-right:5px'></Icon>
					<span >添加仓库</span> -->
				</div>
				<div>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='ckCancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="makeck"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
				</div>
			</div>
		</div>
	</Modal>
	<!--选择供应商弹出框-->
	<Modal v-model="alertch" width="660px">
		<p slot="header" style="height:30px;line-height:30px">
			
			<span>{{$t('public.search')}}</span><!--搜索-->
		</p>
		<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
			<Input v-model="gyskeyword"  style="padding:2px 0"></Input>
			<span @click="getgysKeyword">
			<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>

			</span>
		</div>
		<div slot="footer">
			<!--供应商表格-->
			<Table  border height="200" highlight-row  :columns="gyskey" :data="gysdata" @on-row-click="gysrow">
			</Table>
			<!--分页-->
            <div class="page-box" style="text-align:left">
			 <Page :total="gystotal" :pageSize='gyspageSize' show-total @on-change="getgysData" @on-page-size-change="changegysPageSize"></Page>
			</div>
			<div class='title' style='margin:0px'>
				<div style='color:#D15151;font-size:14px'>
					<!-- <Icon type="plus" style='margin-right:5px'></Icon>
					<span >添加往来单位</span> -->
				</div>
				<div>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='gysCancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button>
					<Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="makegys"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button>
				</div>
			</div>
		</div>
	</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value0:"0",
				//采购曲线
				nowYear:new Date(),
				qxtotal:0,
				qxpageSize:0,
				qxdata:[],
				qxkey:[
					{
						title:"货号",
						key:"skuCode"
					},
					{
						title:"商品",
						key:"skuName"
					},
					{
						title:"金额",
						key:"amount"
					},
					{
						title:"供应商",
						key:"supplierName"
					},
					{
						title:"仓库",
						key:"warehouseName"
					},
					{
						title:"日期",
						key:"YM"
					},
					
				],
				//供应商
				nowYear1:new Date(),
				gystotal6:0,
				gyspageSize6:0,
				gysdata6:[],
				gyskey6:[
					{
						title:"货号",
						key:"skuCode"
					},
					{
						title:"商品",
						key:"skuName"
					},
					{
						title:"金额",
						key:"amount"
					},
					{
						title:"供应商",
						key:"supplierName"
					},
					{
						title:"仓库",
						key:"warehouseName"
					},
					{
						title:"日期",
						key:"YM"
					},
					
				],
				//商品排名
				//供应商
				nowYear2:new Date(),
				skutotal6:0,
				skupageSize6:0,
				skudata6:[],
				skukey6:[
					{
						title:"货号",
						key:"sku_code"
					},
					{
						title:"商品",
						key:"skuName"
					},
					{
						title:"金额",
						key:"amount"
					},
					{
						title:"供应商",
						key:"supplierName"
					},
					{
						title:"仓库",
						key:"warehouseName"
					},
					{
						title:"日期",
						key:"YM"
					},
					
				],
				//商品分类
				nowYear3:new Date(),
				classtotal6:0,
				classpageSize6:0,
				classdata6:[],
				classkey6:[
					{
						title:"货号",
						key:"sku_code"
					},
					{
						title:"分类",
						key:"className"
					},
					{
						title:"商品",
						key:"skuName"
					},
					{
						title:"金额",
						key:"amount"
					},
					{
						title:"供应商",
						key:"supplierName"
					},
					
					{
						title:"日期",
						key:"YM"
					},
					
				],

				fuzzySearch:'',//关键词查询
				cgtitle:this.$t('data.cg.cgtj'),//"采购统计",
				searchNo1isshow:false,//采购统计查询
				reNo1:'',//采购单号
				beginNo1:'',//查询开始日期
				endNo1:'',//查询结束日期
				goodsinshow:false,//商品弹框是否显示
				//弹出框商品data
				skutotal:0,
				skupageSize:0,
				skuObj:{},//一行商品数据
				skuid:'',//商品id
				skunmae:'',//商品名称
				goodskeyword:'',//查询关键字
				goods:[],
                goodskey:[
	                {
	                	title:"",
	                	width:100,
	                	key:"mainPhoto",
	                	 render:(h, params) =>{
                        	return h('div',[
                        			h('img',{
                        				attrs:{
                        					src:params.row.mainPhoto
                        				},
                        				style:{
                        					width:'40px',
                        					height:'40px'
                        				}
                        			})
                        		])
                        }
	                },
	                {
	                	title:this.$t('manage.sku.SkuName'),//"商品名称",
	             		ellipsis:true,
	                	ellipsis:'true',
	                	key:"skuName"
	                },
	                {
	                	title:this.$t('manage.sku.SkuCode'),// '商品货号',
	                	key:'skuCode',
	               		//ellipsis:true,
	                	align: 'center'
	                },
	                {
	                	title: this.$t('manage.sku.barnd'),//'商品品牌',
	                	key:'barnd',
	               		//ellipsis:true,
	                	align: 'center'
	                },
	                {
	                	title:this.$t('manage.sku.FL'),//'商品分类',
	                	key:'className',
	               		//ellipsis:true,
	                	align: 'center'
	                },
	              	{
	                	title: this.$t('manage.sku.price'),//'单价',
	                	key:'price',
						//ellipsis:true,
	                	align: 'center'
	                },
	                {
	                	title: this.$t('manage.sku.inventory'),//'库存',
	                	key:'inventoryUp',
						//ellipsis:true,
	                	align: 'center'
	                },
	                
                ],
                //仓库
                warehouseshow:false,
                ckkeyword:'',//仓库搜索关键字
                cktotal:0,
                ckpageSize:0,
                ckObj:{},//一行仓库数据
                ckname:"",//仓库名称
                ckid:'',//仓库id
                allwarehouse:[],
                ckkey:[
					{
						title:this.$t('manage.warehouse.Name'),//"仓库名",
						//ellipsis:true,
						key:"name"
					},
					{
						title:this.$t('manage.warehouse.Code'),//"仓库编号",
					
						key:"code"
					},
					{
						title:this.$t('manage.warehouse.Type'),//"类型",
						
						key:"category"
					},
					{
						title:this.$t('public.status'),//"状态",
						
						key:"statusDesc"
					},
				],
				//供应商
				alertch:false,
				gyskeyword:'',//关键词
				//弹出框供应商table
				gystotal:0,
				gyspageSize:0,
				gysObj:{},//一行数据
				gysname:"",//供应商名称
				gysid:"",//供应商id
				gysdata:[],
                gyskey:[
	                {
	                	title:this.$t('data.cg.gys'),//"供应商",
	                	
	                	key:"name"
	                },
	                {
	                	title:this.$t('data.cg.code'),//"编码",
	             
	                	key:"code"
	                },
	                {
	                	title:this.$t('data.cg.person'),//"联系人",
	                	
	                	key:"contract"
	                },
	                {
	                	title:this.$t('data.cg.level'),//"等级",
	               
	                	key:"level"
	                },
	                {
	                	title:this.$t('data.cg.mobile'),//"手机号",
	                
	                	key:"contractPhone"
	                }
                ],
                //侧栏
				fhindex:'0',
				row:{},
				visible: false,
				dataList: [], //采购统计
				total:0,
				pageSize:0,
				valId:"",//选中别个复选框获取的id
				type:'',//下拉选中
				uid: this.$store.state.common.token,
				user:this.$store.state.common.user,
				columns: [
					
					{
						title: this.$t('data.cg.gys'),//'供应商',
						
					
						key: 'supplierName'
					},
					{
						title:this.$t('data.sales.ckname'),//"仓库名",
						
						key: 'warehouseName'
					},
					{
						title:this.$t('data.sku.skuname'),//"商品名称",
						
						key: 'skuName'
					},
					
					
					{
						title: this.$t('data.cg.ysnum'),//'应收数量',
						
						key: 'qty'
					},
					{
						title: this.$t('data.cg.ssnum'),//'实收数量',
						
						key: 'receiptQty'
					},
					{
						title:this.$t('data.cg.sgje'),//"实购金额",
						
						key:"actualPrice"
					},
					{
						title:this.$t('data.cg.ygje'),//"应购金额",
						
						key:"oughtPrice"
					},
					
				],
				dhtotal:0,//订货统计
				dhpageSize:0,
				dhdataList:[],
				dhcolumns:[
					
					{
						title: this.$t('data.cg.gys'),//'供应商',
						
					
						key: 'supplierName'
					},
					{
						title:this.$t('data.sales.ckname'),//"仓库名",
						
						key: 'warehouseName'
					},
					{
						title:this.$t('data.sku.skuname'),//"商品名称",
						
					
						key: 'skuName'
					},
					
					
					{
						title:this.$t('data.cg.pjj'),//"平均价",
						
						key:"avgPrice"
					},
					
					{
						title: this.$t('data.cg.ssnum'),//'实收数量',
						
						key: 'receiptQty'
					},
					{
						title:this.$t('data.cg.sgje'),//"实购金额",
						
						key:"actualPrice"
					},
					{
						title:this.$t('data.cg.ygje'),//"应购金额",
						
						key:"oughtPrice"
					},
					
				],
				//订货明细
				dhmxtotal:0,
				dhmxpageSize:0,
				dhmxdataList:[],
				dhmxcolumns:[
					
					
					{
						title:this.$t('data.sales.ckname'),//"仓库名",
						
						key: 'warehouseName'
					},
					{
						title:this.$t('data.sku.skuname'),//"商品名称",
						
						key: 'skuName'
					},
					
					{
						title: this.$t('data.cg.ysnum'),//'应收数量',
						
						key: 'qty'
					},
					{
						title: this.$t('data.cg.ssnum'),//'实收数量',
						
						key: 'receiptQty'
					},
					{
						title:this.$t('data.cg.sgje'),//"实购金额",
						
						key:"actualPrice"
					},
					{
						title:this.$t('data.cg.ygje'),//"应购金额",
						
						key:"oughtPrice"
					},
					
					
				],
				//进货明细
				jhmxtotal:0,
				jhmxpageSize:0,
				jhmxdataList:[],
				jhmxcolumns:[
					
					{
						title: this.$t('data.cg.gys'),//'供应商',
						
						key: 'supplierName'
					},
					{
						title: this.$t('data.cg.shc'),//'收货仓',
						
						key: 'deliverWarehouseName'
					},
					{
						title: this.$t('data.cg.shP'),//'收货人',
						
						key: 'deliverName'
					},
					{
						title: this.$t('data.cg.alljs'),//'总件数',
						
						key: 'totalCount'
					},
					{
						title:this.$t('data.cg.allNum'),//"总数量",
						
						key:"totalQty"
					},
					{
						title: this.$t('data.cg.qsnum'),//'签收数量',
						
						key: 'deliveryQty'
					},
					{
						title:this.$t('data.cg.pjj'),//"平均价",
						
						key:"avgPrice"
					},
					
					{
						title:this.$t('data.cg.sgje'),//"实购金额",
						
						key:"actualPrice"
					},
					
				],
				//价格分析
				pricetotal:0,
				pricepageSize:0,
				pricedataList:[],
				pricecolumns:[
					
					{
						title: this.$t('data.cg.gys'),//'供应商',
						
						key: 'supplierName'
					},
					{
						title:this.$t('data.sales.ckname'),//"仓库名",
						
						key: 'warehouseName'
					},
					{
						title:this.$t('data.sku.skuname'),//"商品名称",
						
						key: 'skuName'
					},
					
					{
						title: this.$t('data.cg.ysnum'),//'应收数量',
						
						key: 'qty'
					},
					{
						title: this.$t('data.cg.ssnum'),//'实收数量',
						
						key: 'receiptQty'
					},
					{
						title:this.$t('data.cg.sgje'),//"实购金额",
						
						key:"actualPrice"
					},
					{
						title:this.$t('data.cg.ygje'),//"应购金额",
						
						key:"oughtPrice"
					},
					
				],
				

			}
		},
		methods: {
			//切换
			getfhlistbg(index){
				this.fhindex=index
				this.reNo1=''//采购单号
				this.beginNo1='',//查询开始日期
				this.endNo1=''//查询结束日期
				this.skuid='',
				this.skunmae=''
				this.ckname=''
				this.ckid=''
				this.gysname=''
				this.gysid=''
				if(this.fhindex=='0'){
					this.getcgList()//采购统计
				}
				if(this.fhindex=='1'){
					//订货统计POST /purchasingreport/purchasestatistics
					this.axios.post('purchasingreport/purchasestatistics?uid='+this.uid,{}).then(res=>{
						if(res.data.status==200){
							this.dhdataList=res.data.rows
							this.dhtotal=res.data.total
							this.dhpageSize=res.data.pageSize
						}
					})
				}
				//订货明细
				if(this.fhindex=='2'){
					////订货明细POST /purchasingreport/purchasestatistics
					this.axios.post('purchasingreport/purchaseorder?uid='+this.uid,{}).then(res=>{
						if(res.data.status==200){
							this.dhmxdataList=res.data.rows
							this.dhmxtotal=res.data.total
							this.dhmxpageSize=res.data.pageSize
							this.dhmxdataList.forEach((x)=>{
								x.expectDeliveryDate=new Date(x.expectDeliveryDate).toLocaleDateString().replace(/\//g,'-')
							})
						}
					})

				}
				//进货明细
				if(this.fhindex=='3'){
					//进货明细POST /purchasingreport/purchasesdetails
					this.axios.post('purchasingreport/purchasesdetails?uid='+this.uid,{}).then(res=>{
						if(res.data.status==200){
							this.jhmxdataList=res.data.rows
							this.jhmxtotal=res.data.total
							this.jhmxpageSize=res.data.pageSize
						}
					})
				}
				//价格分析
				if(this.fhindex=='4'){
					//价格分析POST /purchasingreport/procurementana
					this.axios.post('purchasingreport/procurementana?uid='+this.uid,{}).then(res=>{
						if(res.data.status==200){
							this.pricedataList=res.data.rows
							this.pricetotal=res.data.total
							this.pricepageSize=res.data.pageSize
						}
					})
				}
				//曲线
				if(this.fhindex=='5'){
					this.getqx(new Date().getFullYear())
				}
				if(this.fhindex=='6'){
					this.getgys6(new Date().getFullYear())
				}
				if(this.fhindex=='7'){
					this.getsku6(new Date().getFullYear())
				}
				if(this.fhindex=='8'){
					this.getclass6(new Date().getFullYear())
				}
			},

			//获取采购统计列表POST /purchasingreport/procurementsta
			getcgList() {
				this.axios.post('/purchasingreport/procurementsta?uid='+this.uid,{}).then(res=>{
					if(res.data.status==200){
						this.dataList=res.data.rows
						this.total=res.data.total
						this.pageSize=res.data.pageSize
					}
				})
			},
			//表格选中时的数据，数组
			selected(selection,row){
				this.valId = row.id
				this.row = row
			},
			 //采购统计切换一条页
            getData(current){
                this.axios.post('purchasingreport/procurementsta?offset='+current+'&uid='+this.uid,{}).then((res)=>{
                    this.dataList = res.data.rows
                    this.total=res.data.total
					this.pageSize=res.data.pageSize
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
            },
            //订货统计切换
            dhgetData(current){
                this.axios.post('purchasingreport/purchasestatistics?offset='+current+'&uid='+this.uid,{}).then((res)=>{
                    this.dhdataList = res.data.rows
                    this.dhtotal=res.data.total
					this.dhpageSize=res.data.pageSize
                })
            },
            //翻页
            dhchangePageSize(size){
                this.dhpageSize = size
            },
            //订货明细切换
            dhmxgetData(current){
                this.axios.post('purchasingreport/purchaseorder?offset='+current+'&uid='+this.uid,{}).then((res)=>{
                    this.dhmxdataList = res.data.rows
                    this.dhmxtotal=res.data.total
					this.dhmxpageSize=res.data.pageSize
                })
            },
            //翻页
            dhmxchangePageSize(size){
                this.dhmxpageSize = size
            },
            //进货明细切换
            jhmxgetData(current){
                this.axios.post('purchasingreport/purchasesdetails?offset='+current+'&uid='+this.uid,{}).then((res)=>{
                    this.jhmxdataList = res.data.rows
                    this.jhmxtotal=res.data.total
					this.jhmxpageSize=res.data.pageSize
                })
            },
            //翻页
            jhmxchangePageSize(size){
                this.jhmxpageSize = size
            },
             //价格分析切换
            pricegetData(current){
                this.axios.post('purchasingreport/procurementana?offset='+current+'&uid='+this.uid,{}).then((res)=>{
                    this.pricedataList = res.data.rows
                    this.pricetotal=res.data.total
					this.pricepageSize=res.data.pageSize
                })
            },
            //翻页
            pricechangePageSize(size){
                this.pricepageSize = size
            },
            //采购统计查询
            searchNo1(){
            	this.reNo1=''//采购单号
				this.beginNo1='',//查询开始日期
				this.endNo1=''//查询结束日期
				this.skuid='',
				this.skunmae=''
				this.ckname=''
				this.ckid=''
				this.gysname=''
				this.gysid=''
            	this.cgtitle=this.$t('data.cg.cgtj'),//'采购统计查询'
            	this.searchNo1isshow=true
            },
             //采购订货统计查询
            searchNo2(){
            	this.reNo1=''//采购单号
				this.beginNo1='',//查询开始日期
				this.endNo1=''//查询结束日期
				this.skuid='',
				this.skunmae=''
				this.ckname=''
				this.ckid=''
				this.gysname=''
				this.gysid=''
            	this.cgtitle=this.$t('data.cg.cgdh'),//'采购订货查询'
            	this.searchNo1isshow=true
            },
             //采购订货明细查询
            searchNo3(){
            	this.reNo1=''//采购单号
				this.beginNo1='',//查询开始日期
				this.endNo1=''//查询结束日期
				this.skuid='',
				this.skunmae=''
				this.ckname=''
				this.ckid=''
				this.gysname=''
				this.gysid=''
            	this.cgtitle=this.$t('data.cg.cgdhmx'),//'采购订货明细查询'
            	this.searchNo1isshow=true
            },
            //采购进货明细查询
            searchNo4(){
            	this.reNo1=''//采购单号
				this.beginNo1='',//查询开始日期
				this.endNo1=''//查询结束日期
				this.skuid='',
				this.skunmae=''
				this.ckname=''
				this.ckid=''
				this.gysname=''
				this.gysid=''
            	this.cgtitle=this.$t('data.cg.cgjhmx'),//'采购进货明细查询'
            	this.searchNo1isshow=true
            },
            //采购价格查询
            searchNo5(){
            	this.reNo1=''//采购单号
				this.beginNo1='',//查询开始日期
				this.endNo1=''//查询结束日期
				this.skuid='',
				this.skunmae=''
				this.ckname=''
				this.ckid=''
				this.gysname=''
				this.gysid=''
            	this.cgtitle=this.$t('data.cg.cgjgfx'),//'采购价格查询'
            	this.searchNo1isshow=true
            },
            //查询商品
            clickSku(){
            	this.goodsinshow=true
            	this.axios.get('sku/query?uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			this.goods=res.data.rows
            			this.skutotal=res.data.total
            			this.skupageSize=res.data.pageSize
            		}
            	})
            },
            //商品弹框点击一行获取数据
			clickgoodsrow(data){
				this.skuObj=data
				console.log(data)
			},
			//商品确认
			skusure(){
				this.skuid=this.skuObj.id
				this.skunmae=this.skuObj.skuName
				this.goodsinshow=false
			},
			//商品取消
			skucancel(){
				this.goodsinshow=false
			},
			  //商品模糊搜索
            searchInput(){
				this.axios.get('sku/query?keyword='+this.goodskeyword+'&uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						this.goods = res.data.rows
						this.skutotal=res.data.total
						this.skupageSize=res.data.pageSize
					}
				})
			
            },
            //回车搜索商品
           enterSearch(){
           	this.searchInput()
           },
           //商品切换
            skugetData(current){
                this.axios.get('sku/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    this.goods = res.data.rows
					this.skutotal=res.data.total
					this.skupageSize=res.data.pageSize
                })
            },
            //翻页
            skuchangePageSize(size){
                this.skupageSize = size
            },
            //查询仓库
            clickStore(){
            	this.axios.get('/warehouse/list?uid='+this.uid).then((res)=>{
					this.allwarehouse=res.data.rows
					this.cktotal=res.data.total
					this.ckpageSize=res.data.pageSize
				})
            	this.warehouseshow=true
            },
             // //仓库翻页
            getckData(current){
                this.axios.get('warehouse/list?offset='+current+'&uid='+this.uid).then((res)=>{
                    this.allwarehouse = res.data.rows
                    this.cktotal=res.data.total
					this.ckpageSize=res.data.pageSize
                })
            },
            //翻页
           changeckPageSize(size){
                this.jhmxpageSize = size
            },
            //单击仓库列表一行
			ckrow(data,index){
				this.ckObj=data
				
			},
			//仓库确认
			makeck(){
				this.ckname=this.ckObj.name
				this.ckid=this.ckObj.id
				this.warehouseshow=false
			},
			//仓库取消
			ckCancel(){
				this.warehouseshow=false
			},
            //仓库模糊搜索
			getckKeyword(){
				this.axios.get('warehouse/list?keyword='+this.ckkeyword+'&uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						this.allwarehouse = res.data.rows
						this.cktotal=res.data.total
						this.ckpageSize=res.data.pageSize
					}
				})
			},
            //查询供应商
            clickSupplier(){
            	this.axios.get('/partner/list?uid=' + this.uid).then((res) => {
					
					if(res.data.status == '200') {
						let data = res.data;
						this.gysdata = data.rows;
						this.gyspageSize = data.pageSize;
						this.gystotal = data.total;
					}
				})
            	this.alertch=true
            },
             //供应商切换
            getgysData(current){
                this.axios.get('/partner/list?offset='+current+'&uid='+this.uid).then((res)=>{
                    if(res.data.status == '200') {
						let data = res.data;
						this.gysdata = data.rows;
						this.gyspageSize = data.pageSize;
						this.gystotal = data.total;
					}
                })
            },
            //翻页
           changegysPageSize(size){
                this.gyspageSize = size
            },
            //供应商弹框出现后点击表格行数据
			gysrow(data){
				this.gysObj=data
  			},
  			makegys(){
  				this.gysid=this.gysObj.id
  				this.gysname=this.gysObj.name
  				this.alertch=false
  			},
  			gysCancel(){
				this.alertch=false
  			},
            //供应商模糊搜索
			getgysKeyword(){
				this.axios.get('partner/list?keyword='+this.gyskeyword+'&uid='+this.uid).then((res)=>{
				if(res.data.status==200){
					this.gysdata = res.data.rows
					}
				})
			},

            //开始日期选择
            beginChange(d){
            	this.beginNo1=d
            },
            //结束日期选择
            endChange(d){
            	this.endNo1=d
            },
            //关键词查询
            search(){
            	//采购统计
            	if(this.fhindex==0){
	            	this.axios.post('/purchasingreport/procurementsta?fuzzySearch='+this.fuzzySearch+'&uid='+this.uid,{}).then(res=>{
	            		if(res.data.status==200){
	            			this.dataList=res.data.rows
							this.total=res.data.total
							this.pageSize=res.data.pageSize
							// this.fuzzySearch=''
	            		}else{
							this.$notify({
		                        title:"",//
		                        message:  res.data.errorMessage,
		                        type: 'error',
		                        position: 'bottom-right'
		                    });
						}
	            	})
	            }
	            if(this.fhindex==1){
	            	this.axios.post('/purchasingreport/purchasestatistics?fuzzySearch='+this.fuzzySearch+'&uid='+this.uid,{}).then(res=>{
	            		if(res.data.status==200){
	            			this.dhdataList=res.data.rows
							this.dhtotal=res.data.total
							this.dhpageSize=res.data.pageSize
							// this.fuzzySearch=''
	            		}else{
							this.$notify({
		                        title:"",//
		                        message:  res.data.errorMessage,
		                        type: 'error',
		                        position: 'bottom-right'
		                    });
						}
	            	})
	            }
	            if(this.fhindex==2){
	            	this.axios.post('/purchasingreport/purchaseorder?fuzzySearch='+this.fuzzySearch+'&uid='+this.uid,{}).then(res=>{
	            		if(res.data.status==200){
	            			this.dhmxdataList=res.data.rows
							this.dhmxtotal=res.data.total
							this.dhmxpageSize=res.data.pageSize
							// this.fuzzySearch=''
	            		}else{
							this.$notify({
		                        title:"",//
		                        message:  res.data.errorMessage,
		                        type: 'error',
		                        position: 'bottom-right'
		                    });
						}
	            	})
	            }
	            if(this.fhindex==3){
	            	this.axios.post('/purchasingreport/purchasesdetails?fuzzySearch='+this.fuzzySearch+'&uid='+this.uid,{}).then(res=>{
	            		if(res.data.status==200){
	            			this.jhmxdataList=res.data.rows
							this.jhmxtotal=res.data.total
							this.jhmxpageSize=res.data.pageSize
							// this.fuzzySearch=''
	            		}else{
							this.$notify({
		                        title:"",//
		                        message:  res.data.errorMessage,
		                        type: 'error',
		                        position: 'bottom-right'
		                    });
						}
	            	})
	            }
	            if(this.fhindex==4){
	            	this.axios.post('/purchasingreport/procurementana?fuzzySearch='+this.fuzzySearch+'&uid='+this.uid,{}).then(res=>{
	            		if(res.data.status==200){
	            			this.pricedataList=res.data.rows
							this.pricetotal=res.data.total
							this.pricepageSize=res.data.pageSize
							// this.fuzzySearch=''
	            		}else{
							this.$notify({
		                        title:"",//
		                        message:  res.data.errorMessage,
		                        type: 'error',
		                        position: 'bottom-right'
		                    });
						}
	            	})
	            }
            },
            //确认
            sure(){
            	//采购统计
            	//ownerId='+this.user.ownerId+'&pono='+this.reNo1+'&supplierId='+this.gysid+'&warehouseId='+this.ckid+'&skuId='+this.skuid+'&poDateUp='+this.beginNo1+'&poDateFloor='+this.endNo1+'&
            	if(this.fhindex==0){
            		this.axios.post('/purchasingreport/procurementsta?uid='+this.uid,{
            			pono:this.reNo1,
            			poDateFloor:this.beginNo1,
            			poDateUp:this.endNo1,
            			skuId:this.skuid,
            			warehouseId:this.ckid,
            			skuName:this.skunmae,//商品名称
            			warehouseName:this.ckname,//仓库名称
            			partnerName:this.gysname,//客户名称
            			supplierId:this.gysid,

            		}).then(res=>{
						if(res.data.status==200){
							this.dataList=res.data.rows
							this.total=res.data.total
							this.pageSize=res.data.pageSize
							this.searchNo1isshow=false
							// this.reNo1=''//采购单号
							// this.beginNo1='',//查询开始日期
							// this.endNo1=''//查询结束日期
							// this.skuid='',
							// this.skunmae=''
							// this.ckname=''
							// this.ckid=''
							// this.gysname=''
							// this.gysid=''

						}else{
							this.$notify({
		                        title:"",//
		                        message:  res.data.errorMessage,
		                        type: 'error',
		                        position: 'bottom-right'
		                    });
						}
					})
            	}
            	//采购订货统计ownerId='+this.user.ownerId+'&pono='+this.reNo1+'&supplierId='+this.gysid+'&warehouseId='+this.ckid+'&skuId='+this.skuid+'&poDateUp='+this.beginNo1+'&poDateFloor='+this.endNo1+'&
            	if(this.fhindex==1){
            		this.axios.post('/purchasingreport/purchasestatistics?uid='+this.uid,{
            			pono:this.reNo1,
            			poDateFloor:this.beginNo1,
            			poDateUp:this.endNo1,
            			skuId:this.skuid,
            			warehouseId:this.ckid,
            			skuName:this.skunmae,//商品名称
            			warehouseName:this.ckname,//仓库名称
            			partnerName:this.gysname,//客户名称
            			supplierId:this.gysid,

            		}).then(res=>{
						if(res.data.status==200){
							this.dhdataList=res.data.rows
							this.dhtotal=res.data.total
							this.dhpageSize=res.data.pageSize
							this.searchNo1isshow=false
							// this.reNo1=''//采购单号
							// this.beginNo1='',//查询开始日期
							// this.endNo1=''//查询结束日期
							// this.skuid='',
							// this.skunmae=''
							// this.ckname=''
							// this.ckid=''
							// this.gysname=''
							// this.gysid=''
						}else{
							this.$notify({
		                        title:"",//
		                        message:  res.data.errorMessage,
		                        type: 'error',
		                        position: 'bottom-right'
		                    });
						}
					})
            	}
            	//订货明细ownerId='+this.user.ownerId+'&pono='+this.reNo1+'&supplierId='+this.gysid+'&warehouseId='+this.ckid+'&skuId='+this.skuid+'&poDateUp='+this.beginNo1+'&poDateFloor='+this.endNo1+'&
            	if(this.fhindex==2){
            		this.axios.post('/purchasingreport/purchaseorder?uid='+this.uid,{
            			pono:this.reNo1,
            			poDateFloor:this.beginNo1,
            			poDateUp:this.endNo1,
            			skuId:this.skuid,
            			warehouseId:this.ckid,
            			skuName:this.skunmae,//商品名称
            			warehouseName:this.ckname,//仓库名称
            			partnerName:this.gysname,//客户名称
            			supplierId:this.gysid,

            		}).then(res=>{
						if(res.data.status==200){
							this.dhmxdataList=res.data.rows
							this.dhmxtotal=res.data.total
							this.dhmxpageSize=res.data.pageSize
							this.searchNo1isshow=false
							// this.reNo1=''//采购单号
							// this.beginNo1='',//查询开始日期
							// this.endNo1=''//查询结束日期
							// this.skuid='',
							// this.skunmae=''
							// this.ckname=''
							// this.ckid=''
							// this.gysname=''
							// this.gysid=''
						}else{
							this.$notify({
		                        title:"",//
		                        message:  res.data.errorMessage,
		                        type: 'error',
		                        position: 'bottom-right'
		                    });
						}
					})
            	}
            	//进货明细ownerId='+this.user.ownerId+'&pono='+this.reNo1+'&supplierId='+this.gysid+'&warehouseId='+this.ckid+'&skuId='+this.skuid+'&poDateUp='+this.beginNo1+'&poDateFloor='+this.endNo1+'&
            	if(this.fhindex==3){
            		this.axios.post('/purchasingreport/purchasesdetails?uid='+this.uid,{
            			pono:this.reNo1,
            			poDateFloor:this.beginNo1,
            			poDateUp:this.endNo1,
            			skuId:this.skuid,
            			warehouseId:this.ckid,
            			skuName:this.skunmae,//商品名称
            			warehouseName:this.ckname,//仓库名称
            			partnerName:this.gysname,//客户名称
            			supplierId:this.gysid,

            		}).then(res=>{
						if(res.data.status==200){
							this.jhmxdataList=res.data.rows
							this.jhmxtotal=res.data.total
							this.jhmxpageSize=res.data.pageSize
							this.searchNo1isshow=false
							// this.reNo1=''//采购单号
							// this.beginNo1='',//查询开始日期
							// this.endNo1=''//查询结束日期
							// this.skuid='',
							// this.skunmae=''
							// this.ckname=''
							// this.ckid=''
							// this.gysname=''
							// this.gysid=''
						}else{
							this.$notify({
		                        title:"",//
		                        message:  res.data.errorMessage,
		                        type: 'error',
		                        position: 'bottom-right'
		                    });
						}
					})
            	}
            	//价格分析ownerId='+this.user.ownerId+'&pono='+this.reNo1+'&supplierId='+this.gysid+'&warehouseId='+this.ckid+'&skuId='+this.skuid+'&poDateUp='+this.beginNo1+'&poDateFloor='+this.endNo1+'&
            	if(this.fhindex==4){
            		this.axios.post('/purchasingreport/procurementana?uid='+this.uid,{
            			pono:this.reNo1,
            			poDateFloor:this.beginNo1,
            			poDateUp:this.endNo1,
            			skuId:this.skuid,
            			warehouseId:this.ckid,
            			skuName:this.skunmae,//商品名称
            			warehouseName:this.ckname,//仓库名称
            			partnerName:this.gysname,//客户名称
            			supplierId:this.gysid,

            		}).then(res=>{
						if(res.data.status==200){
							this.pricedataList=res.data.rows
							this.pricetotal=res.data.total
							this.pricepageSize=res.data.pageSize
							this.searchNo1isshow=false
							// this.reNo1=''//采购单号
							// this.beginNo1='',//查询开始日期
							// this.endNo1=''//查询结束日期
							// this.skuid='',
							// this.skunmae=''
							// this.ckname=''
							// this.ckid=''
							// this.gysname=''
							// this.gysid=''
						}else{
							this.$notify({
		                        title:"",//
		                        message:  res.data.errorMessage,
		                        type: 'error',
		                        position: 'bottom-right'
		                    });
						}
					})
            	}
            },
            //取消
            secancel(){
            	this.reNo1=''//采购单号
				this.beginNo1='',//查询开始日期
				this.endNo1=''//查询结束日期
				this.skuid='',
				this.skunmae=''
				this.ckname=''
				this.ckid=''
				this.gysname=''
				this.gysid=''
            	this.searchNo1isshow=false
            },
            //{{$t('public.export')}}<!--导出-->
            cliskImport(n){
            	//采购统计GET /purchasingreport/downmentsta 采购统计{{$t('public.export')}}<!--导出-->
            	if(n==0){
            		this.axios.get('/purchasingreport/downmentsta?uid='+this.uid,{
            			params:{
            				fuzzySearch:this.fuzzySearch,
            				pono:this.reNo1,
	            			poDateFloor:this.beginNo1,
	            			poDateUp:this.endNo1,
	            			skuId:this.skuid,
	            			warehouseId:this.ckid,
	            			skuName:this.skunmae,//商品名称
            				warehouseName:this.ckname,//仓库名称
            				partnerName:this.gysname,//客户名称
	            			supplierId:this.gysid
            			}
            		}).then(res=>{
            			console.log(res)
            			window.location.href=res.request.responseURL
            		})
            	}
            	//采购订货统计GET /purchasingreport/downtatistics 采购订货统计{{$t('public.export')}}<!--导出-->
            	if(n==1){
            		this.axios.get('/purchasingreport/downtatistics?uid='+this.uid,{
            			params:{
            				fuzzySearch:this.fuzzySearch,
            				pono:this.reNo1,
	            			poDateFloor:this.beginNo1,
	            			poDateUp:this.endNo1,
	            			skuId:this.skuid,
	            			warehouseId:this.ckid,
	            			skuName:this.skunmae,//商品名称
            				warehouseName:this.ckname,//仓库名称
            				partnerName:this.gysname,//客户名称
	            			supplierId:this.gysid
            			}
            		}).then(res=>{
            			window.location.href=res.request.responseURL
            		})
            	}
            	//采购订货明细GET /purchasingreport/downorder 采购订货明细{{$t('public.export')}}<!--导出-->
            	if(n==2){
            		this.axios.get('/purchasingreport/downorder?uid='+this.uid,{
            			params:{
            				fuzzySearch:this.fuzzySearch,
            				pono:this.reNo1,
	            			poDateFloor:this.beginNo1,
	            			poDateUp:this.endNo1,
	            			skuId:this.skuid,
	            			warehouseId:this.ckid,
	            			skuName:this.skunmae,//商品名称
            				warehouseName:this.ckname,//仓库名称
            				partnerName:this.gysname,//客户名称
	            			supplierId:this.gysid
            			}
            		}).then(res=>{
            			window.location.href=res.request.responseURL
            		})
            	}
            	//采购进货明细GET /purchasingreport/downdetails 采购进货明细{{$t('public.export')}}<!--导出-->
            	if(n==3){
            		this.axios.get('/purchasingreport/downdetails?uid='+this.uid,{
            			params:{
            				fuzzySearch:this.fuzzySearch,
            				pono:this.reNo1,
	            			poDateFloor:this.beginNo1,
	            			poDateUp:this.endNo1,
	            			skuId:this.skuid,
	            			warehouseId:this.ckid,
	            			skuName:this.skunmae,//商品名称
            				warehouseName:this.ckname,//仓库名称
            				partnerName:this.gysname,//客户名称
	            			supplierId:this.gysid
            			}
            		}).then(res=>{
            			window.location.href=res.request.responseURL
            		})
            	}
            	//采购价格分析GET /purchasingreport/downmentana 采购价格分析{{$t('public.export')}}<!--导出-->
            	if(n==4){
            		this.axios.get('/purchasingreport/downmentana?uid='+this.uid,{
            			params:{
            				fuzzySearch:this.fuzzySearch,
            				pono:this.reNo1,
	            			poDateFloor:this.beginNo1,
	            			poDateUp:this.endNo1,
	            			skuId:this.skuid,
	            			warehouseId:this.ckid,
	            			skuName:this.skunmae,//商品名称
            				warehouseName:this.ckname,//仓库名称
            				partnerName:this.gysname,//客户名称
	            			supplierId:this.gysid
            			}
            		}).then(res=>{
            			window.location.href=res.request.responseURL
            		})
            	}
            	
            },
            //曲线
            changeYearSku(y){
            	this.nowYear=y
				this.getqx(this.nowYear)
			},
            getqx(y){
            	this.axios.get('purdata/curve?year='+y+'&uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			this.qxdata=res.data.rows.rows
            			this.qxtotal=res.data.rows.total
						this.qxpageSize=res.data.rows.pageSize
            		}
            	})
            },
            qxgetData(current){
            	this.axios.get('purdata/curve?year='+y+'&uid='+this.uid+'&offset='+current).then(res=>{
            		if(res.data.status==200){
            			this.qxdata=res.data.rows.rows
            			this.qxtotal=res.data.rows.total
						this.qxpageSize=res.data.rows.pageSize
            		}
            	})
            },
            qxchangePageSize(size){
            	this.qxpageSize=size
            },

            //供应商采购
            changeYearSku1(y){
            	this.nowYear1=y
				this.getgys6(this.nowYear1)
			},
            getgys6(y){
            	this.axios.get('purdata/supplier?year='+y+'&uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			this.gysdata6=res.data.rows.rows
            			this.gystotal6=res.data.rows.total
						this.gyspageSize6=res.data.pageSize
            		}
            	})
            },
            gysgetData6(current){
            	this.axios.get('purdata/supplier?year='+y+'&uid='+this.uid+'&offset='+current).then(res=>{
            		if(res.data.status==200){
            			this.gysdata6=res.data.rows.rows
            			this.gystotal6=res.data.rows.total
						this.gyspageSize6=res.data.rows.pageSize
            		}
            	})
            },
            gyschangePageSize6(size){
            	this.gyspageSize6=size
            },
            //商品排名
          
            changeYearSku2(y){
            	this.nowYear2=y
				this.getsku6(this.nowYear2)
			},
            getsku6(y){
            	this.axios.get('purdata/pursku?year='+y+'&uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			this.skudata6=res.data.rows.rows
            			this.skutotal6=res.data.rows.total
						this.skupageSize6=res.data.pageSize
            		}
            	})
            },
            skugetData6(current){
            	this.axios.get('purdata/pursku?year='+y+'&uid='+this.uid+'&offset='+current).then(res=>{
            		if(res.data.status==200){
            			this.skudata6=res.data.rows.rows
            			this.skutotal6=res.data.rows.total
						this.skupageSize6=res.data.rows.pageSize
            		}
            	})
            },
            skuchangePageSize6(size){
            	this.skupageSize6=size
            },

            //商品分类
          
            changeYearSku3(y){
            	this.nowYear3=y
				this.getsku6(this.nowYear3)
			},
            getclass6(y){
            	this.axios.get('purdata/pursku?year='+y+'&uid='+this.uid).then(res=>{
            		if(res.data.status==200){
            			this.classdata6=res.data.rows.rows
            			this.classtotal6=res.data.rows.total
						this.classpageSize6=res.data.pageSize
            		}
            	})
            },
            classgetData6(current){
            	this.axios.get('purdata/pursku?year='+y+'&uid='+this.uid+'&offset='+current).then(res=>{
            		if(res.data.status==200){
            			this.classdata6=res.data.rows.rows
            			this.classtotal6=res.data.rows.total
						this.classpageSize6=res.data.rows.pageSize
            		}
            	})
            },
            classchangePageSize6(size){
            	this.classpageSize6=size
            },
		},
		mounted() {
			this.getcgList();//采购统计
			console.log(this.$route.path)
			sessionStorage.setItem('isselect',this.$route.path)//一级菜单选中

			if(this.$route.query.index==5){
				this.fhindex='5'
				this.getqx(new Date().getFullYear())
			}
			if(this.$route.query.index==6){
				this.fhindex='6'
				this.getgys6(new Date().getFullYear())
				
			}
			if(this.$route.query.index==7){
				this.fhindex='7'
				this.getsku6(new Date().getFullYear())
			}
			if(this.$route.query.index==8){
				this.fhindex='8'
				this.getclass6(new Date().getFullYear())
			}
			sessionStorage.setItem('isselectTWO',this.$parent.data[0].url)
		}
	}
</script>

<style lang="css" scoped>
p.edit:hover{
	color:blue;
}
	.units-box {
		width: 100%;
		background: rgb(230,233,236);
	}
	.btns-box {
		width: 100%;
		height: 50px;
		display:flex;
		justify-content: space-between;
		background: #fff;
		line-height: 50px;
	}
	 .wldw{
    	margin-left:15px;
    }
	.right{
		margin-right:7px;
		margin-bottom:7px;
		display: flex;
	}
	.ivu-icon-chevron-down {
		font-size: 10px;
	}
	.btns img {
		width: 14px;
		height: 14px;
		vertical-align: middle;
	}
	.main-left{
		width: 120px;
		margin-right: 3px;
		flex: 0 0 120px;
		font-size: 14px;
		background: #fff;
	}
	.main-left li{
		list-style: none;
		padding:10px 0;
		width:100%;
		
	}
	.main-left li span{
		margin-left:20px;
	}
	.table {
	    width: 100%;
	    height: 100%;
	    overflow: auto;
	    background: #fff;
	    padding: 0 10px;
	}
	.bor{
		background:rgb(241,245,247);
        color:rgb(59,119,227);
	}
	.page-box {
		text-align: center;
		margin-top:2px;
	}
	.footer-mark{
  width:100%;
  height:40px;
  border-top:1px solid #E4E4E4;
  display: flex;
  justify-content: space-around;
  margin-bottom:-10px;
}
.footer-mark span{
  height:40px;
  line-height: 40px
}
</style>
