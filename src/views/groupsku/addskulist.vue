<template>
	<div>
		<div class="main" >
		    <!--左边-->
	        <aside class="left">
        		<div class="left-top">
                    <p class="wldw">
						<span style="width:42px;font-weight:900">{{$t('public.screen')}}：</span>
						 <Select style="width:100px" v-model='valueT' :placeholder="$t('public.all')" @on-change="orderselected">
					        <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
					    </Select>
					</p>
                    <div>
					<span class="top-left-btn"  @click="addGoodsInfo">
						<Icon type="plus" style="position:absolute;top:7px;left:8px"></Icon></span>
					</div>
                </div>
				<div class='locationSearch'>
					<Input style='padding:10px 20px' v-model='searchKeyword' :placeholder="$t('public.codeandname')" @on-enter='enterSearch'>
	                <span slot="append"  @click='search' style='cursor:pointer;'>{{$t('public.search')}}</span>
	                </Input>
				</div>
				<p v-if="goods.length==0" class='scrollFix'>
                        <Spin>
                            <div>{{$t('public.NoData')}}</div>
                        </Spin>
                </p>
				<Scroll :on-reach-bottom="handleReachEdge" :height="height" v-else >
					<div class="con-list" v-for="(item,index) in goods" :key='index' :class="{bg:numIndex==index}" @click='clickGoods(item.id,index)'>
						 <span>
						  	<span class='left-img'>
							 	 <img :src="item.mainPhoto" >
							 </span>
						 </span>
						 <div>
						<div class="list-title" >{{item.skuCode}}</div>
						<div class="txt" >{{item.skuName}}</div>
						<!-- <span class="status"
						:class="{textbg1:item.statusDesc=='已上架',textbg3:item.statusDesc==''}">{{item.statusDesc}}</span> -->

						<div class="lanrenLeft" :class="{bgd3:item.status==1,bgd4:item.status==99}">
	                           <span >{{item.statusDesc}}</span>
	                     </div>​
						<span class="date">{{item.createTime}}</span>
						<span class="date1">{{item.className}}</span>
						</div>
					</div>
				</Scroll>
			</aside>
	        <div style='width:100%;background:#fff;overflow: hidden;'>
        		<div class="right-top">
                    <div class='goodsName'>{{goodsText}} </div>
                    <div class='top-btn'>
                        <Button type="ghost"  shape="circle" style="background:#3b77e3;color:#fff;" @click="savegoods('formValidate')" v-show="addText" ><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}</Button><!--保存-->

                        <Button type="ghost"  shape="circle" @click="updataGoods('formValidateEdit')" v-show="xiugaibtn2" style="background:#3b77e3;color:#fff;border:none" ><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.SaveBtn')}}</Button><!--保存-->
                        <Button type="ghost"  shape="circle" @click="editBtn" v-show="xiugaibtn1" style="background:#40ca98;color:#fff;border:none" >
                        <i class="el-icon-edit" style=";margin-right:5px;"></i>{{$t('public.EditBtn')}}</Button><!--修改-->

                        <Button type="ghost" v-show="xiugaibtn2" shape="circle" style="color:#1d2531;background:#999;color:#fff" @click="delGoods"><Icon type="close" style="margin-right:5px;"></Icon>{{$t('public.cancel')}}</Button><!--取消-->
                        <Dropdown trigger="click" >
			                    <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">
									 {{$t('public.more')}}<!--更多-->
			                		<span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
			            		</Button>
			            		<DropdownMenu slot="list">
			                		<span @click="start" style='text-align: left;'><DropdownItem > {{$t('public.start')}}</DropdownItem></span>
			                        <span @click="stop" style='text-align: left;'><DropdownItem > {{$t('public.stop')}}</DropdownItem></span>
			                        <span  @click="del" style='text-align: left;'><DropdownItem >{{$t('public.del')}}</DropdownItem></span>
			            		</DropdownMenu>
			            </Dropdown>
                        <span @click="cancelHome" style="cursor:pointer; margin-left: 10px;"><Icon type="close" class="cha" ></Icon></span>
                    </div>
                </div>
				<div class="detail-bottom" v-show="addText">
					<div class="detail-public">
						<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
						    <Col span="6">
								<div class='right-left' style='display:flex'>
									<div style='display:flex;flex-direction: column;' @mouseover='chaisshw' @mouseleave='chaishide'>
										<div style='position:relative'>
											<div class='mainIbg'>
												<img  :src="mainPhoto"  class="avatar">
											</div>
											<span v-if='mainPhotoisshw' @click.stop='delUp'>
                                            	<Icon type="trash-a" size='25' style='color:#d53c39;position:absolute;top:10px;right:10px;z-index:3;cursor:pointer' ></Icon>
                                            </span>
										</div>
										<el-upload
										  class="upload-demo"
										  :action="logoUrl"
								  			name='file'
										  :show-file-list="false"
										  :on-progress='onprogress'
										  :before-upload="beforeAvatarUpload"
										  :on-success="addsucess"
										  accept="image/*"
										  v-if='mainImgshw'>

										  <span style='display:block;width:160px;text-align:center;margin-top: 10px;'>{{$t('public.upload')}}</span><!--点击上传-->

										  <div slot="tip" class="el-upload__tip" style='text-align: center;padding-bottom:10px'>800*800{{$t('public.goodsPicSize')}}</div>
										</el-upload>
										<!--子图-->
										<el-upload
										  class="upload-demo"
										  :action="logoUrl"
										  :limit='4'
								  			name='file'
										  :show-file-list="false"
										  :on-progress='onprogress'
										  :before-upload="beforeAvatarUpload"
										  :on-success="addsucessSub"
										  accept="image/*"
										  v-if='!mainImgshw'>
										  <span style='display:block;width:160px;text-align:center;margin-top: 10px;'>{{$t('public.upload')}}</span><!--点击上传-->
										  <div slot="tip" class="el-upload__tip" style='text-align: center;padding-bottom:10px'>800*800{{$t('public.goodsPicSize')}}</div><!--尺寸800*800的商品主图-->
										</el-upload>
									</div>
									<ul style='margin: 10px 0 0 5px;'>
										<li style='position:relative;margin-top:5px;width:40px;height:40px' v-for='(item,index) in picArr' :key='index'>
											<img :src="item"  class='subImg'>
											<span  @click.stop='delSub1(item,index)'>
                                            	<Icon type="trash-a" size='15' style='color:#d53c39;position:absolute;top:-5px;right:-12px;z-index:3;cursor:pointer' ></Icon>
                                            </span>
										</li>
									</ul>
									<div v-if='loadingisshow' >
										<Spin fix>
											<mu-icon value="rotate_right" color="blue"  class="demo-spin-icon-load"></mu-icon>
            								<div>Loading...</div>
										</Spin>
						            </div>
								</div>
							</Col>
						    <Col span="18">
								<FormItem :label="$t('manage.sku.SkuName')" prop="skuName"><!--名称-->
                                    <Input v-model="formValidate.skuName" :placeholder="$t('manage.sku.PSkuName')"></Input>
                                </FormItem>
						    </Col>
						    <Col span="9">
					        	<FormItem :label="$t('manage.sku.SkuCode')" prop="skuCode">
                                    <Input v-model="formValidate.skuCode" :placeholder="$t('manage.sku.SkuCode')"></Input>
                                </FormItem>
                                <FormItem label="默认供应商">
                                	<div style="position:relative;">
	                                	<Input placeholder="默认供应商" v-model="formValidate.partnerName" @on-keyup="changeSupplierInput"></Input>
	                                 	<span @click='getGys'>
	                                 		<Icon type="ios-search" size="16" style='position:absolute;top:8px;right:8px;cursor:pointer'></Icon>
	                                 	</span>
	                                 	<div style="position:absolute;z-index:999;width:100%">
	                                 		<Table v-if="alertch1" border height="300" highlight-row  :columns="gyskey" :data="gysdata" 
											@on-row-click="gysrow1" @on-row-dblclick="dblgysrow">
											</Table>
	                                 	</div>
                                 	</div>
                                 </FormItem>
                                <FormItem :label="$t('manage.sku.costprice')" prop="costPrice" ><!--成本价-->
                                    <InputNumber :min="0" v-model="formValidate.costPrice" :placeholder="$t('manage.sku.costprice')" style="width:100%" @on-change="changecostPrice"></InputNumber>
                                </FormItem>
                                <FormItem :label="$t('manage.sku.price')" prop="price">
                                   
                                    <InputNumber :min="0" v-model="formValidate.price" :placeholder="$t('manage.sku.price')" style="width:100%" @on-change="changepricee"></InputNumber>
                                </FormItem>
                                <FormItem :label="$t('manage.sku.wholeprice')" prop="wholePrice">
                                    <InputNumber :min="0" v-model="formValidate.wholePrice" :placeholder="$t('manage.sku.wholeprice')" style="width:100%" @on-change="changewholePrice"></InputNumber>
                                </FormItem>
                                
                                <FormItem :label="$t('manage.sku.SkuUnit')" prop="unit">
                                    <Select  v-model='formValidate.unitId'  :placeholder="$t('manage.sku.SkuUnit')" @on-change="changeunit" label-in-value>
			                        	<Option v-for="(item,index) in unitData" :value="item.value" :key="index">{{ item.label }}</Option>
			                   	 	</Select>
                                </FormItem>
                                <div class='ishot'>
                                	<span><span style='display:inline-block;margin-right:5px'>{{$t('manage.sku.sing1')}}</span><i-switch v-model="sing1" @on-change='single11' size="large"><!--推荐-->
                                		<span slot="open">{{$t('manage.sku.yes')}}</span>
        								<span slot="close">{{$t('manage.sku.noe')}}</span>
                                	</i-switch></span>
                                	<span><span style='display:inline-block;margin-right:5px'>{{$t('manage.sku.sing2')}}</span><i-switch v-model="sing2" @on-change='single12' size="large"><!--新品-->
                                		<span slot="open">{{$t('manage.sku.yes')}}</span>
        								<span slot="close">{{$t('manage.sku.noe')}}</span>
                                	</i-switch></span>
                                	<span><span style='display:inline-block;margin-right:5px'>{{$t('manage.sku.sing3')}}</span><i-switch v-model="sing3" @on-change='single13' size="large"><!--热门-->
                                		<span slot="open">{{$t('manage.sku.yes')}}</span>
        								<span slot="close">{{$t('manage.sku.noe')}}</span>
                                	</i-switch></span>
                                	<span><span style='display:inline-block;margin-right:5px'>{{$t('manage.sku.sing4')}}</span><i-switch v-model="sing4" @on-change='single14' size="large"><!--是否可售-->
                                		<span slot="open">{{$t('manage.sku.yes')}}</span>
        								<span slot="close">{{$t('manage.sku.noe')}}</span>
                                	</i-switch></span>
                                </div>
						    </Col>
						    <Col span="9" style="padding-left:10px">
                               <FormItem :label="$t('manage.sku.barnd')" prop="barnd" ><!--品牌-->
                                	
                                	<div style="position:relative;">
	                                	<Input placeholder="品牌" v-model="formValidate.barnd" @on-keyup="changeBInput"></Input>
	                                 	<span @click='getbarnd'>
	                                 		<Icon type="ios-search" size="16" style='position:absolute;top:8px;right:8px;cursor:pointer'></Icon>
	                                 	</span>
	                                 	<div style="position:absolute;z-index:999;width:100%">
	                                 		<Table v-if='barndisshow1' border height="300" highlight-row   :columns="barndkey" :data="barnddata" 
												@on-row-click="barndrow1">
												</Table>
	                                 	</div>
                                 	</div>
                                </FormItem>
                                 <FormItem :label="$t('manage.sku.FL')" prop="flname" ><!--分类-->
                                	<span @click='searchfl'>
                                		 <Input v-model="formValidate.flname" :placeholder="$t('manage.sku.FL')"></Input>
                                	</span>
                                </FormItem>
                                <FormItem :label="$t('manage.sku.inventoryUp')" prop="inventoryUp"><!--最高库存-->
                                    
                                    <InputNumber :min="0" v-model="formValidate.inventoryUp" :placeholder="$t('manage.sku.inventoryUp')" style="width:100%" @on-change="changeinventoryUp"></InputNumber>
                                </FormItem>
                                <div style='display:flex'>
	                                <FormItem :label="$t('manage.sku.inventory')" prop="inventory"><!--最低库存-->
	                                   
	                                     <InputNumber :min="0" v-model="formValidate.inventory" :placeholder="$t('manage.sku.inventory')" style="width:100%;margin-right:10px" @on-change="changeinventory"></InputNumber>
	                                </FormItem>
	                                 <FormItem :label="$t('manage.sku.inven')" prop="inven">
	                                 	<div style='display:flex;'>

	                                    <InputNumber :min="0" v-model="formValidate.inven" :placeholder="$t('manage.sku.inven')" style="width:100%;margin-right:10px" @on-change="changeinven"></InputNumber>
	                                    <span>%</span>
	                                    </div>
	                                </FormItem>
                                </div>
                                <FormItem :label="$t('manage.sku.unitDesc')" prop="unitDesc"><!--商品单位描述-->
		                            <Input v-model="formValidate.unitDesc" style='margin-right:10px' :placeholder="$t('manage.sku.unitDescP')"></Input><!--如：一条10包-->
		                        </FormItem>
						    </Col>
						</Form>
					<!--tab切换规格-->
						<ul class='detail-title-mark'>
							<li v-for="(item,index) in titles" class="detail-title" @click="addborder(index)" :class="{bor:index==num2}" >
							{{item}}
							</li>
						</ul>
						
						<div v-show='num2==0'>
							<Uediter :value="ueditor.value" :id='editor1' :config="ueditor.config" ref="ue"></Uediter>
						</div>
						
						<!--单位配置-->
						<div v-if='num2==1'>

							<div class='unitInfo'>
								<span> {{$t('manage.sku.about')}}：</span><!--说明-->
								<div>
									{{$t('manage.sku.about1')}}<!--只能设置一个库存单位,当库存单位设置为浮动换算时,只能设置一个辅单位-->。
								</div>
								<div>{{$t('manage.sku.about2')}}。</div><!--主计量单位数量=辅计量单位数量*换算率-->
								<div>{{$t('manage.sku.about3')}}。</div><!--例如：一箱有100包，主单位为"包"，辅单位为"箱"，换算率为100（包装数）, 或者 主单位为"箱"，辅单位为"包"，换算率为0.01（1/100）-->
							</div>
							<Table  border highlight-row  :columns="unitListkey" :data="unitList"></Table>
						</div>
						<!--规格参数-->
						<div v-show='num2==2'>
							<Uediter :value="ueditor4.value" :id='editor4' :config="ueditor4.config" ref="ue4"></Uediter>
						</div>
						<!--售后保障-->
						<div v-show='num2==3'>
							<Uediter :value="ueditor5.value" :id='editor5' :config="ueditor5.config" ref="ue5"></Uediter>
						</div>
						<div v-if='num2==4'>

                            <div class='con-list1'>
		                    	<div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr1')}}</span><!--自定义属性1-->
		                            <Input v-model="userDef01"  :placeholder="$t('manage.sku.attr1')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr2')}}</span>
		                        	<Input v-model="userDef02"  :placeholder="$t('manage.sku.attr2')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr3')}}</span>
		                            <Input v-model="userDef03"  :placeholder="$t('manage.sku.attr3')"></Input>
		                        </div>
		                    </div>
		                    <div class='con-list1'>
		                    	
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr4')}}</span>
		                        	<Input v-model="userDef04"  :placeholder="$t('manage.sku.attr4')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr5')}}</span>
		                            <Input v-model="userDef05"  :placeholder="$t('manage.sku.attr5')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr6')}}</span>
		                        	<Input v-model="userDef06"  :placeholder="$t('manage.sku.attr6')"></Input>
		                        </div>
		                    </div>
		                    
		                    <div class='con-list1'>
		                    	<div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr7')}}</span>
		                            <Input v-model="userDef07"  :placeholder="$t('manage.sku.attr7')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr8')}}</span>
		                        	<Input v-model="userDef08"  :placeholder="$t('manage.sku.attr8')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr9')}}</span>
		                            <Input v-model="userDef09"  :placeholder="$t('manage.sku.attr9')"></Input>
		                        </div>
		                    </div>
		                    <div class='con-list1'>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr10')}}</span>
		                        	<Input v-model="userDef010"  :placeholder="$t('manage.sku.attr10')"></Input>
		                        </div>
		                    </div>
						</div>
					</div>
				</div>
				<!--显示商品修改-->
			    <div class="detail-bottom" v-show="xiugai">
					<div class="detail-public">
						<Form ref="formValidateEdit" :model="formValidate" :rules="ruleValidate" :label-width="100">
						    <Col span="6">
								<div class='right-left' style='display:flex'>
									<div style='display:flex;flex-direction: column;' @mouseover='chaisshw' @mouseleave='chaishide'>
										<div style='position:relative'>
											<div class='mainIbg'>
												<img  :src="mainPhoto"  class="avatar">
											</div>
											<span v-if='mainPhotoisshw' @click.stop='delUp'>
	                                        	<Icon type="trash-a" size='25' style='color:#d53c39;position:absolute;top:10px;right:10px;z-index:3;cursor:pointer' ></Icon>
	                                        </span>
										</div>
										<el-upload
										  class="upload-demo"
										  :action="logoUrl"
										  :limit='4'
								  			name='file'
										  :show-file-list="false"
										  :on-progress='onprogress'
										  :before-upload="beforeAvatarUpload"
										  :on-success="addsucess"
										  accept="image/*"
										  v-if='mainImgshw'>
										  <span style='display:block;width:160px;text-align:center;margin-top: 10px;'>{{$t('public.upload')}}</span><!--点击上传-->
										  <div slot="tip" class="el-upload__tip" style='text-align: center;padding-bottom:10px'>800*800{{$t('public.goodsPicSize')}}</div>
										</el-upload>
										<!--子图-->
										<el-upload
										  class="upload-demo"
										  :action="logoUrl"
										  :limit='4'
								  			name='file'
										  :show-file-list="false"
										  :on-progress='onprogress'
										  :before-upload="beforeAvatarUpload"
										  :on-success="addsucessSub"
										  accept="image/*"
										  v-if='!mainImgshw'>

										  <span style='display:block;width:160px;text-align:center;margin-top: 10px;'>{{$t('public.upload')}}</span><!--点击上传-->

										  <div slot="tip" class="el-upload__tip" style='text-align: center;padding-bottom:10px'>800*800{{$t('public.goodsPicSize')}}</div>
										</el-upload>
									</div>
									<div style='margin: 10px 0 0 5px;'>
										<li style='position:relative;margin-top:5px;width:48px;height:48px' v-for='(item,index) in picArr'>
											<img :src="item"class='subImg'>
											<span  @click.stop='delSub1(item,index)'>
	                                        	<Icon type="trash-a" size='15' style='color:#d53c39;position:absolute;top:-5px;right:-12px;z-index:3;cursor:pointer' ></Icon>
	                                        </span>
										</li>

									</div>
									<div v-if='loadingisshow' >
										<Spin fix>
											<mu-icon value="rotate_right" color="blue"  class="demo-spin-icon-load"></mu-icon>
	        								<div>Loading...</div>
										</Spin>
						            </div>
								</div>
							</Col>
						    <Col span="18">
								<FormItem :label="$t('manage.sku.SkuName')" prop="skuName"><!--名称-->
                                    <Input v-model="formValidate.skuName" :placeholder="$t('manage.sku.PSkuName')"></Input>
                                </FormItem>
						    </Col>
						    <Col span="9">
					        	<FormItem :label="$t('manage.sku.SkuCode')" prop="skuCode"><!--货号-->
                                    <Input v-model="formValidate.skuCode" disabled :placeholder="$t('manage.sku.SkuCode')"></Input>
                                </FormItem>
                                <FormItem label="默认供应商">
                                 	<div style="position:relative;">
	                                	<Input placeholder="默认供应商" v-model="formValidate.partnerName" @on-keyup="changeSupplierInput"></Input>
	                                 	<span @click='getGys'>
	                                 		<Icon type="ios-search" size="16" style='position:absolute;top:8px;right:8px;cursor:pointer'></Icon>
	                                 	</span>
	                                 	<div style="position:absolute;z-index:999;width:100%">
	                                 		<Table v-if="alertch1" border height="300" highlight-row  :columns="gyskey" :data="gysdata" 
											@on-row-click="gysrow1" @on-row-dblclick="dblgysrow">
											</Table>
	                                 	</div>
                                 	</div>
                                 </FormItem>
                                <FormItem :label="$t('manage.sku.costprice')" prop="costPrice" ><!--成本价-->
                                    <InputNumber :min="0" v-model="formValidate.costPrice" :placeholder="$t('manage.sku.costprice')" style="width:100%" @on-change="changecostPrice"></InputNumber>
                                </FormItem>
                                <FormItem :label="$t('manage.sku.price')" prop="price">
                                   
                                    <InputNumber :min="0" v-model="formValidate.price" :placeholder="$t('manage.sku.price')" style="width:100%" @on-change="changepricee"></InputNumber>
                                </FormItem>
                                <FormItem :label="$t('manage.sku.wholeprice')" prop="wholePrice">
                                    <InputNumber :min="0" v-model="formValidate.wholePrice" :placeholder="$t('manage.sku.wholeprice')" style="width:100%" @on-change="changewholePrice"></InputNumber>
                                </FormItem>
                                
                                <FormItem :label="$t('manage.sku.SkuUnit')" prop="unit"><!--单位-->
                                    <Select  v-model='formValidate.unitId'  :placeholder="$t('manage.sku.SkuUnit')" @on-change="changeunit" label-in-value>
			                        	<Option v-for="(item,index) in unitData" :value="item.value" :key="index">{{ item.label }}</Option>
			                   	 	</Select>
                                </FormItem>
                                <div class='ishot'>
                                	<span><span style='display:inline-block;margin-right:5px'>{{$t('manage.sku.sing1')}}</span>
                                	<i-switch v-model="sing1" @on-change='single11' size="large"><!--推荐-->
                                		<span slot="open">{{$t('manage.sku.yes')}}</span>
        								<span slot="close">{{$t('manage.sku.noe')}}</span>
                                	</i-switch></span>
                                	<span><span style='display:inline-block;margin-right:5px'>{{$t('manage.sku.sing2')}}</span><i-switch v-model="sing2" @on-change='single12' size="large"><!--新品-->
                                		<span slot="open">{{$t('manage.sku.yes')}}</span>
        								<span slot="close">{{$t('manage.sku.noe')}}</span>
                                	</i-switch></span>
                                	<span><span style='display:inline-block;margin-right:5px'>{{$t('manage.sku.sing3')}}</span><i-switch v-model="sing3" @on-change='single13' size="large"><!--热门-->
                                		<span slot="open">{{$t('manage.sku.yes')}}</span>
        								<span slot="close">{{$t('manage.sku.noe')}}</span>
                                	</i-switch></span>

                                	<span><span style='display:inline-block;margin-right:5px'>{{$t('manage.sku.sing4')}}</span><i-switch v-model="sing4" @on-change='single14' size="large"><!--是否可售-->
                                		<span slot="open">{{$t('manage.sku.yes')}}</span>
        								<span slot="close">{{$t('manage.sku.noe')}}</span>
                                	</i-switch></span>
                                </div>
						    </Col>
						    <Col span="9" style="padding-left:10px">
                               	<FormItem :label="$t('manage.sku.barnd')" prop="barnd" ><!--品牌-->
                                	<div style="position:relative;">
	                                	<Input placeholder="品牌" v-model="formValidate.barnd" @on-keyup="changeBInput"></Input>
	                                 	<span @click='getbarnd'>
	                                 		<Icon type="ios-search" size="16" style='position:absolute;top:8px;right:8px;cursor:pointer'></Icon>
	                                 	</span>
	                                 	<div style="position:absolute;z-index:999;width:100%">
	                                 		<Table v-if='barndisshow1' border height="300" highlight-row   :columns="barndkey" :data="barnddata" 
												@on-row-click="barndrow1" @on-row-dblclick="dblbarndrow">
												</Table>
	                                 	</div>
                                 	</div>
                                </FormItem>
                                 <FormItem :label="$t('manage.sku.FL')" prop="flname" ><!--分类-->
                                	<span @click='searchfl'>
                                		 <Input v-model="formValidate.flname" :placeholder="$t('manage.sku.FL')"></Input>
                                	</span>
                                </FormItem>
                                <FormItem :label="$t('manage.sku.inventoryUp')" prop="inventoryUp"><!--最高库存-->
                                    
                                    <InputNumber :min="0" v-model="formValidate.inventoryUp" :placeholder="$t('manage.sku.inventoryUp')" style="width:100%" @on-change="changeinventoryUp"></InputNumber>
                                </FormItem>
                                <div style='display:flex'>
	                                <FormItem :label="$t('manage.sku.inventory')" prop="inventory"><!--最低库存-->
	                                   
	                                     <InputNumber :min="0" v-model="formValidate.inventory" :placeholder="$t('manage.sku.inventory')" style="width:100%;margin-right:10px" @on-change="changeinventory"></InputNumber>
	                                </FormItem>
	                                 <FormItem :label="$t('manage.sku.inven')" prop="inven">
	                                 	<div style='display:flex;'>

	                                    <InputNumber :min="0" v-model="formValidate.inven" :placeholder="$t('manage.sku.inven')" style="width:100%;margin-right:10px" @on-change="changeinven"></InputNumber>
	                                    <span>%</span>
	                                    </div>
	                                </FormItem>
                                </div>
                                 <FormItem :label="$t('manage.sku.unitDesc')" prop="unitDesc"><!--商品单位描述-->
	                                    <Input v-model="formValidate.unitDesc" style='margin-right:10px' :placeholder="$t('manage.sku.unitDescP')"></Input><!--如：一条10包-->
	                             </FormItem>
						    </Col>
						</Form>
						<!--tab切换规格-->
						<div class='detail-title-mark'>
							<div v-for="(item,index) in titles" class="detail-title" @click="addborder(index)" :class="{bor:index==num2}" >
							{{item}}
							</div>
						</div>
						
						<!--详情-->
						<div v-show='num2==0' style='margin-right:10px'>
							<Uediter :value="ueditor3.value" :id='editor2' :config="ueditor.config" ref="ue2"></Uediter>
						</div>
						<!--单位配置-->
						<div v-if='num2==1'>
							<div class='unitInfo'>
								<span> {{$t('manage.sku.about')}}：</span><!--说明-->
								<div>
									{{$t('manage.sku.about1')}}<!--只能设置一个库存单位,当库存单位设置为浮动换算时,只能设置一个辅单位-->。
								</div>
								<div>{{$t('manage.sku.about2')}}。</div><!--主计量单位数量=辅计量单位数量*换算率-->
								<div>{{$t('manage.sku.about3')}}。</div><!--例如：一箱有100包，主单位为"包"，辅单位为"箱"，换算率为100（包装数）, 或者 主单位为"箱"，辅单位为"包"，换算率为0.01（1/100）-->
							</div>
							<Table  border highlight-row :columns="unitListkey" :data="unitList"></Table>
						</div>
						<!--规格参数-->
						<div v-show='num2==2'>
							<Uediter :value="ueditor6.value" :id='editor6' :config="ueditor6.config" ref="ue6"></Uediter>
						</div>
						<!--售后保障-->
						<div v-show='num2==3'>
							<Uediter :value="ueditor7.value" :id='editor7' :config="ueditor7.config" ref="ue7"></Uediter>
						</div>
						<div v-if='num2==4'>
							<div class='con-list1'>
		                    	<div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr1')}}</span><!--自定义属性1-->
		                            <Input v-model="userDef01"  :placeholder="$t('manage.sku.attr1')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr2')}}</span>
		                        	<Input v-model="userDef02"  :placeholder="$t('manage.sku.attr2')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr3')}}</span>
		                            <Input v-model="userDef03"  :placeholder="$t('manage.sku.attr3')"></Input>
		                        </div>
		                    </div>
		                    <div class='con-list1'>
		                    	
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr4')}}</span>
		                        	<Input v-model="userDef04"  :placeholder="$t('manage.sku.attr4')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr5')}}</span>
		                            <Input v-model="userDef05"  :placeholder="$t('manage.sku.attr5')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr6')}}</span>
		                        	<Input v-model="userDef06"  :placeholder="$t('manage.sku.attr6')"></Input>
		                        </div>
		                    </div>
		                   
		                    <div class='con-list1'>
		                    	<div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr7')}}</span>
		                            <Input v-model="userDef07"  :placeholder="$t('manage.sku.attr7')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr8')}}</span>
		                        	<Input v-model="userDef08"  :placeholder="$t('manage.sku.attr8')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr9')}}</span>
		                            <Input v-model="userDef09"  :placeholder="$t('manage.sku.attr9')"></Input>
		                        </div>
		                    </div>
		                    <div class='con-list1'>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr10')}}</span>
		                        	<Input v-model="userDef010"  :placeholder="$t('manage.sku.attr10')"></Input>
		                        </div>
		                    </div>
						</div>
					</div>
				</div>
					<!--详情-->
				<div v-if='isdetails' style='height:98%;margin-left:7px;overflow:auto'>
	                <div  style='padding:0 10px;display:flex;'>
	                    <div style='display:inline-block;margin-top:30px;text-align:center;;width:220px;height:265px;flex:0 0 220px;vertical-align: middle;'>
	                        <div style='display:flex;flex-direction: column;'>
	                        	<div style='width:220px;height:220px'>
	                        		<img :src="ImgInfoSrc"   class='subImg' style='vertical-align:middle'>
	                        	</div>
	                        	<ul style='margin-top:5px' v-if='imgArr.length>0'>
	                        		<li style='float:left;height:40px;width:40px;margin:0 2px'   @click='clickInfoImg(item,index)' v-for='(item,index) in imgArr' :key='index'>
	                        			<img :src="item" class='subImg'>
	                        		</li>
	                        	</ul>
	                        </div>
	                    </div>
	                    <div style='position:relative;width:100%;display:inline-block;vertical-align:middle;margin-left:10px;margin-top:30px;'>
	                    	<!--订单详情页面cgxqInfo-->
							<div class="detail-top">
								<h3>
									{{cgxqInfo.skuName}}
								</h3>
								<div style='display:flex'>
								<div class='blackinfo'>
				                  <li><span class='blackinfo-left'>{{$t('manage.sku.FL')}}：</span><span class='info'>{{cgxqInfo.className}}</span></li><!--分类-->
				                  <li><span class='blackinfo-left'>{{$t('manage.sku.barcode')}}：</span><span class='info'>{{cgxqInfo.barcode}}</span></li><!--条码-->
				                  <li><span class='blackinfo-left'>{{$t('manage.sku.SkuCode')}}：</span><span class='info'>{{cgxqInfo.skuCode}}</span></li><!--编码-->
				                  <li><span class='blackinfo-left'>{{$t('manage.sku.inventoryUp')}}：</span><span class='info'>{{cgxqInfo.inventoryUp}}</span></li><!--最高库存-->
				                  <li><span class='blackinfo-left'>{{$t('manage.sku.inventory')}}：</span><span class='info'>{{cgxqInfo.inventory}}</span></li><!--最低库存-->
				                 </div>

				                 <div class='blackinfo'>
					                  <li><span class='blackinfo-left'>{{$t('manage.sku.barnd')}}：</span><span class='info'>{{cgxqInfo.brand}}</span></li><!--品牌-->
					                  <li><span class='blackinfo-left'>{{$t('manage.sku.SkuUnit')}}：</span><span class='info'>{{cgxqInfo.unit}}</span></li><!--单位-->
					                  <li><span class='blackinfo-left'>{{$t('manage.sku.costprice')}}：</span><span class='info' style='color:#d53c39'>{{cgxqInfo.costPrice}}</span></li><!--成本价-->
					                  <li><span class='blackinfo-left'>{{$t('manage.sku.wholeprice')}}：</span><span class='info' style='color:#d53c39'>{{cgxqInfo.wholePrice}}</span></li><!--批发价-->
					                  <li><span class='blackinfo-left'>{{$t('manage.sku.price')}}：</span><span class='info' style='color:#d53c39'>{{cgxqInfo.price}}</span></li><!--吊牌价-->

				                 </div>
				                 <div class='blackinfo'>
				                 	 <li><span class='blackinfo-left'>供应商：</span><span class='info'>{{cgxqInfo.partnerName}}</span></li>
					                  <li><span class='blackinfo-left'>{{$t('manage.sku.sing1')}}：</span><span class='info'>{{cgxqInfo.recSku==true?this.$t('manage.sku.yes'):this.$t('manage.sku.noe')}}</span></li><!--推荐-->

					                  <li><span class='blackinfo-left'>{{$t('manage.sku.sing2')}}：</span><span class='info'>{{cgxqInfo.newSku==true?this.$t('manage.sku.yes'):this.$t('manage.sku.noe')}}</span></li><!--新品-->

					                  <li><span class='blackinfo-left'>{{$t('manage.sku.sing3')}}：</span><span class='info'>{{cgxqInfo.hotSku==true?this.$t('manage.sku.yes'):this.$t('manage.sku.noe')}}</span></li><!--热门-->

					                  <li><span class='blackinfo-left'>{{$t('manage.sku.sing4')}}：</span><span class='info'>{{cgxqInfo.onlingSals==true?this.$t('manage.sku.yes'):this.$t('manage.sku.noe')}}</span></li><!--线上销售-->

				                 </div>
				                 </div>
							</div>
							  <!--状态-->
	                        <div class="lanren" :class="{bgd11:cgxqInfo.status==1,bgd2:cgxqInfo.status==99}">
	                           <span  >{{cgxqInfo.statusDesc}}</span>
	                        </div>​
	                	</div>
	            	</div>
		            <div class="detail-title-mark1">
		                <div v-for="(item,index) in titles1" :key='index' class="detail-title" @click="addborder1(index)" :class="{bor:index==num4}">
		                    {{item}}
		                </div>
		            </div>
		            
					<!--详情-->
		            <div  v-if='num4==0' style='margin-bottom:140px'>
		                <div v-if='cgxqInfo.details==""' class='noDataTxt'>{{$t('public.NoData')}}</div>
		                <div v-html='cgxqInfo.details' style='padding:0 10px' v-else></div>
		            </div>
		            
		            <!--单位配置-->
					<div v-if='num4==1' style='margin-bottom:140px'>
						<div class='unitInfo'>
							<span> {{$t('manage.sku.about')}}：</span><!--说明-->
							<div>
								{{$t('manage.sku.about1')}}<!--只能设置一个库存单位,当库存单位设置为浮动换算时,只能设置一个辅单位-->。
							</div>
							<div>{{$t('manage.sku.about2')}}。</div><!--主计量单位数量=辅计量单位数量*换算率-->
							<div>{{$t('manage.sku.about3')}}。</div><!--例如：一箱有100包，主单位为"包"，辅单位为"箱"，换算率为100（包装数）, 或者 主单位为"箱"，辅单位为"包"，换算率为0.01（1/100）-->
						</div>
						<Table  border highlight-row :columns="unitListkey1" :data="unitList1"></Table>
					</div>
					<!--规格参数-->
					<div v-show='num4==2' style='margin-bottom:140px'>
						<div v-if='cgxqInfo.specification==""' class='noDataTxt'>{{$t('public.NoData')}}</div>
						<div v-html='cgxqInfo.specification' v-else></div>
					</div>
					<!--售后保障-->
					<div v-show='num4==3' style='margin-bottom:140px'>
						<div v-if='cgxqInfo.protection==""' class='noDataTxt'>{{$t('public.NoData')}}</div>
						<div v-html='cgxqInfo.protection' v-else></div>
					</div>
		            <!--评论-->
		            <div  v-if='num4==4' style='margin-bottom:140px'>
		                <ul class='comment-main' >
		                	<li class='commnet' v-for='(item,index) in commnet' :key='index' >
		                		<div class='comment-c'>
			                		<ul>
			                			<li>
			                				{{item.content}}
			                			</li>
			                			<li>
			                				<img :src="i" width='60' height='60'  v-for='(i,index) in commentImg' class='comment-img'>

			                				<!-- <div><img :src="bigImg" width='250' height='250'></div> -->
			                			</li>
			                		</ul>
			                		<p class='comment-time'>
			                			{{item.createTime}}
			                		</p>
		                		</div>
		                		<div class='commnet-right'>
			                		<ul>
			                			<li class='commnetLi' ><span class='commnetLispan'>条码：</span><span>{{cgxqInfo.barcode}}</span></li>
			                			<li class='commnetLi' v-if="cgxqInfo.className!=''"><span class='commnetLispan'>分类：</span><span>{{cgxqInfo.className}}</span></li>
			                			<li class='commnetLi'  v-if='cgxqInfo.attrDetailList!=null && cgxqInfo.attrDetailList.length!=0'>
			                				<span class='commnetLispan'>属性：</span>
			                				<span v-for='item in cgxqInfo.attrDetailList'>
			                					{{item.skuTypeDesc}}
			                				</span>
			                			</li>
			                		</ul>
			                		<div class='comment-user'>
			                			<img :src='item.crmPhoto' width='40' height='40' style='border-radius:50%;    vertical-align: middle;' v-if='item.crmPhoto!=null'>
			                			<span v-if='item.crmName!=null' class='crmName'>{{item.crmName}}</span>
			                		</div>
		                		</div>
		                	</li>

		                	<!--分页-->
				            <div class="page-box" style="text-align:left" v-if='commnet.length>10'>
							 <Page :total="commenttotal" :pageSize='commentpageSize' show-total @on-change="commentgetData" @on-page-size-change="commentchangePageSize"></Page>
							</div>
		                </ul>
		                <div v-if='commnet.length==0' class='noDataTxt'>
			                {{$t('public.NoData')}}
			            </div>
		            </div>
		            <!--自定义属性-->
			        <div  v-if='num4==5'  style='margin-bottom:140px'>
		            	<div style='margin-top: 10px;padding:0 10px'>
		            		<div class='con-list1'>
		                    	<div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr1')}}</span><!--自定义属性1-->
		                            <Input v-model="userDef01"  :placeholder="$t('manage.sku.attr1')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr2')}}</span>
		                        	<Input v-model="userDef02"  :placeholder="$t('manage.sku.attr2')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr3')}}</span>
		                            <Input v-model="userDef03"  :placeholder="$t('manage.sku.attr3')"></Input>
		                        </div>
		                    </div>
		                    <div class='con-list1'>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr4')}}</span>
		                        	<Input v-model="userDef04"  :placeholder="$t('manage.sku.attr4')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr5')}}</span>
		                            <Input v-model="userDef05"  :placeholder="$t('manage.sku.attr5')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr6')}}</span>
		                        	<Input v-model="userDef06"  :placeholder="$t('manage.sku.attr6')"></Input>
		                        </div>
		                    </div>  
		                    <div class='con-list1'>
		                    	<div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr7')}}</span>
		                            <Input v-model="userDef07"  :placeholder="$t('manage.sku.attr7')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr8')}}</span>
		                        	<Input v-model="userDef08"  :placeholder="$t('manage.sku.attr8')"></Input>
		                        </div>
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
									<span class='listname'>{{$t('manage.sku.attr9')}}</span>
		                            <Input v-model="userDef09"  :placeholder="$t('manage.sku.attr9')"></Input>
		                        </div>
		                    </div>
		                    <div class='con-list1'>
		                    	
		                        <div style='display:flex;height:35px;line-height:35px;margin-left:10px'>
		                        	<span class='listname'>{{$t('manage.sku.attr10')}}</span>
		                        	<Input v-model="userDef010"  :placeholder="$t('manage.sku.attr10')"></Input>
		                        </div>
		                    </div>
		            	</div>
			        </div>
		        </div>
    		</div>
		</div>
		<!--商品分类-->
		<Modal v-model="flisshow" width="460px">
			<p slot="header" style="height:30px;line-height:30px">
				<span>{{$t('manage.sku.serarFL')}}</span><!--分类搜索-->
			</p>
			<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
				<Input   :placeholder="$t('public.codeandname')" style="padding:2px 0" v-model="flkeyword" @on-enter='flenterSearch'></Input>
				<span @click="flsearchInput">
				<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>
				</span>
			</div>
			<div slot="footer">
				<div style='width:100%;margin:0 auto;text-align:left'>
					<Tree :data="Allfl" @on-select-change='seletChange' ></Tree>
				</div>
				<div class="page-box" style="text-align:left">
				 <Page :total="total" size="small" :pageSize='pageSize' show-total @on-change="getData" @on-page-size-change="changePageSize"></Page>
				</div>
				<div class='title' style='margin:0px'>
					<div style='color:#D15151;font-size:14px'>
						<!-- <Icon type="plus" style='margin-right:5px'></Icon>
						<span >添加分类</span> -->
					</div>
					<div>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='modelCancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button><!--取消-->
						<Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="makegys"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button><!--确认-->
					</div>
				</div>
			</div>
		</Modal>
		<!--品牌的弹框-->
		<Modal v-model="barndisshow" width="660px">
			<p slot="header" style="height:30px;line-height:30px">

				<span>{{$t('manage.sku.serarBarnd')}}</span><!--品牌搜索-->
			</p>
			<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
				<Input   :placeholder="$t('public.codeandname')" style="padding:2px 0" v-model="brandkeyword" @on-enter='brandenterSearch'></Input>
				<span @click="brandsearchInput" style=';cursor:pointer'>
				<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>
				</span>
			</div>
			<div slot="footer" style='margin-top:-20px'>
				<!--品牌表格-->
				<Table  border height="300" highlight-row   :columns="barndkey" :data="barnddata" 
				@on-row-click="barndrow" @on-row-dblclick="dblbarndrow">
				</Table>
				<!--分页-->
	            <div class="page-box" style="text-align:left">
				 <Page :total="barndtotal" size="small" :pageSize='barndpageSize' show-total  @on-change="barndgetData" @on-page-size-change="barndchangePageSize"></Page>
				</div>
				<div class='title' style='margin:0px'>
					<div style='color:#D15151;font-size:14px'>
						<!-- <Icon type="plus" style='margin-right:5px'></Icon>
						<span >添加品牌</span> -->
					</div>
					<div>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='barndCancel'><Icon type="close" style="margin-right:5px;" ></Icon>{{$t('public.cancel')}}</Button><!--取消-->
						<Button shape="circle" type="ghost" style="display:inline-block;background:#00A7F5;color:#fff" @click="makebarnd"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>{{$t('public.sure')}}</Button><!--确认-->
					</div>
				</div>
			</div>
		</Modal>
		
	

		<!--精准搜索-->
	    <Modal v-model="psisshow" width="400px">
		    <p slot="header" style="height:30px;line-height:30px;text-align:center">

		      <span>{{$t('manage.sku.attrsq')}}</span>
		    </p>
		     <Form :label-width="100">
		    	<FormItem :label="$t('manage.sku.FL')" ><!--分类-->
		           <Select v-model="locationFL" @on-change="getdztype">
					<Option v-for="(item,index) in Allfl" :value="item.id" :key="index">{{item.name}}</Option>
					</Select>
		        </FormItem>
		        <FormItem :label="$t('purchase.purchaseOrder.skuname')"><!--名称-->
		           <Input v-model='skuNameL' ></Input>
		        </FormItem>
		        <FormItem :label="$t('manage.sku.SkuCode')" ><!--货号-->
		           <Input v-model='skuCodeL' ></Input>
		        </FormItem>
		         <FormItem :label="$t('manage.sku.barcode')" ><!--条码-->
		           <Input v-model='skuBarcodeL' ></Input>
		        </FormItem>

		        <FormItem :label="$t('manage.sku.price')" ><!--吊牌价-->
		           <Input v-model='skuPriceL' ></Input>
		        </FormItem>
		    </Form>
		    <div slot="footer">
		      <div class='footer-mark'>
		        <span><a style='color:#999;font-size:14px' @click='cancelSearchLocation'>{{$t('public.cancel')}}</a></span>
		        <span style='font-size:20px;width:1px;height:40px;background:#e4e4e4'></span>
		        <span ><a style='color:#3B77E3;font-size:14px' @click='sureSearchLocation'>{{$t('public.sure')}}</a></span>
		      </div>
		    </div>
	  	</Modal>
	  <!--选择供应商弹出框-->
		<Modal v-model="alertch" width="700px">
			<p slot="header" style="height:30px;line-height:30px">

				<span>供应商搜索</span>
			</p>
			<div style="position:relative;text-align:center;width:100%;height:35px;line-height:35px;display:flex;">
				<Input v-model="gyskeyword"   style="padding:2px 0" @on-enter='gysenterSearch'></Input>
				<span @click="getgysKeyword">
				<Icon type="search" size="16" style="display:inline-block;position:absolute;top:10px;right:18px;z-index:9" ></Icon>
				</span>
				
			</div>
			<div slot="footer" style='margin-top:-20px'>
				<!--供应商表格-->
				<Table  border height="300" highlight-row  :columns="gyskey" :data="gysdata" 
				@on-row-click="gysrow" @on-row-dblclick="dblgysrow">
				</Table>
				<!--分页-->
	            <div class="page-box" style="text-align:left">
				 <Page :total="gystotal" size="small" :pageSize='gyspageSize' show-total @on-change="gysgetData" @on-page-size-change="gyschangePageSize"></Page>
				</div>
				<div class='title'>
					<div style='color:#D15151;font-size:14px'>
						<!-- <Icon type="plus" style='margin-right:5px'></Icon>
						<span >添加往来单位</span> -->
					</div>
					<div>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#ACACAC;border:none;color:#fff" @click='gysCancel'><Icon type="close" style="margin-right:5px;" ></Icon>取消</Button>
						<Button shape="circle" type="ghost" style="display:inline-block;background:#3b77e3;color:#fff" @click="gysSure"><Icon type="checkmark-round" style=";margin-right:5px;color:#fff"></Icon>确认</Button>
					</div>
				</div>
			</div>
		</Modal>
		<div class='totBottom'>
	        <span>共<span style='color:#ff0000'> {{allTotal}} </span>条</span>
	        <span>当前第<span style='color:#ff0000'> {{current}} </span>页</span>
	    </div>
</div>
</template>
<script>
import '../../../static/ue/ueditor.config.js'
import '../../../static/ue/ueditor.all.min.js'
import '../../../static/ue/lang/zh-cn/zh-cn.js'
import '../../../static/ue/ueditor.parse.min.js'
import LoadUrl from '@/components/common/actionLoad'
import Uediter from '@/components/ue.vue'
	export default {
		components: {
			Uediter
		},
		data(){
			return {
				brandObj:{},//品牌一行数据
				loadingisshow:false,
				brandkeyword:"",//品牌搜索名称
				flkeyword:"",//分类搜索名称
				imgArr:[],//详情图片预览数组
				ImgInfoSrc:"",//详情图片主图
				mainPhotoisshw:false,
				mainImgshw:true,//主图的上传显示
				// titles:["规格属性","商品详情","自定义属性","单位配置","规格参数","售后保障"],
				// titles1:['规格属性','商品详情','自定义属性',"单位配置","规格参数","售后保障",'用户评论'],
				titles1:[this.$t('manage.sku.titles2'),this.$t('manage.sku.titles4'),this.$t('manage.sku.titles5'),this.$t('manage.sku.titles6'),this.$t('manage.sku.titles7'),this.$t('manage.sku.titles3')],
				titles:[this.$t('manage.sku.titles2'),this.$t('manage.sku.titles4'),this.$t('manage.sku.titles5'),this.$t('manage.sku.titles6'),this.$t('manage.sku.titles3')],
				//编辑器提交的内容
				editor1:'editor1',
				editor2:'editor2',

				editor4:'editor4',
				editor6:'editor6',

				editor5:'editor5',
				editor7:'editor7',
				details:'',//商品详细
				protection:"",//售后保障
				specification:"",//规格参数
		        ueditor: {
		          value: '',
		          config: {}//编辑器配置
		        },
		         ueditor3: {
		          value: '',
		          config: {}//编辑器配置
		        },
		        ueditor4: {
		          value: '',
		          config: {}//编辑器配置
		        },
		        ueditor5: {
		          value: '',
		          config: {}//编辑器配置
		        },
		        ueditor6: {
		          value: '',
		          config: {}//编辑器配置
		        },
		         ueditor7: {
		          value: '',
		          config: {}//编辑器配置
		        },
		        unitList1:[],//单位换算
				//详情
				unitListkey1:[
					{
						title:this.$t('manage.sku.UnitF'),//"辅单位",
						key:"unitName",
						width:160,
						align:"center",
						render:(h,parmas)=>{
							return h('Input',{
								props:{
									value:parmas.row.unitName,
									disabled:true
								},
								on:{

								}
							})
						}
					},
					{
						title:this.$t('manage.sku.UnitH'),//"换算率",
						key:"rate",
						width:160,
						align:"center",
						render:(h,parmas)=>{
							return h('Input',{
								props:{
									value:parmas.row.rate,
									disabled:true
								},

							})
						}
					},
				],
				unitList:[{unitName:"请输入辅单位",rate:0}],//单位换算
				unitListkey:[
					{
					title:this.$t('manage.sku.action'),// '操作',
					key: 'action',
					width: 100,
					align: 'center',
					render: (h, parmas) => {
						return h('div', [
							h('div', {
								style: {
									float: 'left',
									marginRight: '5px'
								},

								}, [
								h('img', {
									domProps: {
										src: 'http://img.zsydian.com/icon/add.png',
										style: "width:20px;height:20px;cursor:pointer"
									},
									on:{
										click: (e) => {
											e.stopPropagation()
											//点击加号
											this.unitList.push({
												unitName:"请输入辅单位",
												rate:0
											})
										}
									}
								})
								]),
							h('div', {
								style: {
									float: 'left',
									marginRight: '5px'

								},

								}, [
								h('img', {
									domProps: {
										src: 'http://img.zsydian.com/icon/tabledel.png',
										style: "width:20px;height:20px;cursor:pointer"
									},
									on:{
										click:(e)=>{
											e.stopPropagation()
												if(parmas.index==0){
													return
												}else{
													this.unitList.splice(parmas.index,1)
												}
											}
										}

									})
								])
							]);
					}
				},
					{
						title:this.$t('manage.sku.UnitF'),//"辅单位",
						key:"unitName",
						width:160,
						align:"center",
						render:(h,parmas)=>{
							return h('Input',{
								props:{
									value:parmas.row.unitName
								},
								// style:{
								// 	display:parmas.
								// },
								on:{
									'on-change':(e)=>{
										parmas.row.unitName=e.target.value
									},
									"on-blur":()=>{
										this.unitList[parmas.index].unitName=parmas.row.unitName
									}
								}
							})
						}
					},
					{
						title:this.$t('manage.sku.UnitH'),//"换算率",
						key:"rate",
						width:160,
						align:"center",
						render:(h,parmas)=>{
							return h('Input',{
								props:{
									value:parmas.row.rate
								},
								on:{
									'on-change':(e)=>{
										parmas.row.rate=Number(e.target.value)
									},
									"on-blur":()=>{
										this.unitList[parmas.index].rate=parmas.row.rate
									}
								}
							})
						}
					},
				],
				commnet:[],//评论
				mainingisshow:false,
				chaIndex:-1,
				alertch:false,
				alertch1:false,
				gyskeyword:"",
				gyspageSize:0,
				gystotal:0,
				gysdata:[],//供应商列表
				supplierObj:{},
			//弹出框供应商table
                gyskey:[
               		{
	                	title:"编码",
	                	width:180,
	                	key:"code"
                	},
					{
	                	title:"名称",
	                	width:180,
	                	key:"name"
                	},
                	{
                		title:"等级",
              			width:180,
                		align:'center',
                		key:'level'
                	},
                	{
                		title:"联系人",
               			width:180,
                		align:'center',
                		key:'contract'
                	},
                	{
	                	title:"地址",
	              		width:180,
	                	key:"Raddress"
                	},
                ],
				sing1:false,
				sing2:false,
				sing3:false,
				sing4:false,
				searchKeyword:'',
				//精准搜索
				Allfl:[],
				locationFL:'',
				psisshow:false,
				skuNameL:'',//商品名称
				skuCodeL:'',//商品货号
				skuBarcodeL:'',//商品条码
				skuPriceL:'',//商品零售价
				allTotal:0,//共几条商品数据
				onepageSize:0,//每页显示的条数

				cgxqInfo:{},
				xiugai:false,
				isdetails:false,
				xiugaibtn1:false,
				xiugaibtn2:false,
				preSelected:false,//主属性的选中

				SubSelected:false,//子主属性的选中
				num4:0,
				unitData:[],//单位数组
				userDef01:'',
				userDef02:'',
				userDef03:'',
				userDef04:'',
				userDef05:'',
				userDef06:'',
				userDef07:'',
				userDef08:'',
				userDef09:'',
				userDef010:'',
				//自定义属性
				sx:true,
				attrsisshow:false,//商品属性添加的弹框
				atisshow:false,
				detailVos1:[],
				columns:[
				{
					title:this.$t('manage.sku.SkuName'),//"名称",{{$t('manage.sku.editAttrName')}}
					key:"name",
					width:'140',
					align:'center'
				},
				{
					title:this.$t('manage.sku.editAttrName'),//"规格",
					key:"attrname",

				},
				{
					title:this.$t('manage.sku.action'),//"操作",
					key:"action",
					width:'140',
					align:'center',
					render:(h,parmas)=>{
						return h('div',[
								h('a',{
									on:{
										'click':()=>{

											this.attrsisshow=true
											this.sx=false
											this.attrName=parmas.row.name
											this.attrsid=parmas.row.id
											this.detailVos1=parmas.row.detailVos
											this.attrdata=parmas.row.detailVos
											//////////////console.log(this.detailVos)
										}
									}
								},this.$t('public.EditBtn')),//'修改'
								h('a',{
									style:{
										marginLeft:'20px'
									},
									on:{
										'click':()=>{
											//////////////console.log(parmas.row.id)
											this.axios.delete('skuspec/delete/'+parmas.row.id+'?uid='+this.uid).then(res=>{
												if(res.data.status==200){
													this.$notify({
												        title: this.$t('public.success'),//'成功',
												        message: this.$t('public.valid.DelSuccess'),//'成功',
												        type: 'success',
												        position: 'bottom-right'
											        });
													this.getmoreAttrs()
												}
											})
										}
									}
								},this.$t('public.del'))//'删除'this.$t('public.valid.success'),//'成功',
							])
					}

				}
			],
			comment:[],//评论
			commentImg:[],//评论图片

			commenttotal:0,
			commentpagesize:0,
			bigImg:"",//评论的大图
			dataList:[],//属性data

			attrsid:'',
			attrName:'',//属性一级名
			attrName1:'',//属性明细名
			sequence:'',//属性明细排序
			code:'',//属性明细编码

			detailVos1:[],//属性明细编码
			//添加规格属性
			attrdata:[{name:""}],
			attrkey:[
				{
					title: this.$t('manage.sku.action'),//'操作',
					key: 'action',
					width: 100,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('div', {
								style: {
									float: 'left',
									marginRight: '5px'
								},
								on: {
									click: (e) => {
											//点击加号
										}
									}
								}, [
								h('img', {
									domProps: {
										src: 'http://img.zsydian.com/icon/add.png',
										style: "width:20px;height:20px;cursor:pointer"
									},
									on:{
										'click':()=>{
											// if(this.s==false){
											// 	return
											// }else{
											// 	this.atisshow=true
											// }
											this.attrdata.push({
												name:""
											})
										}
									}
								})
								]),
							h('div', {
								style: {
									float: 'left',
									marginRight: '5px'

								},
								on: {
									click: () => {

										}
									}
								}, [
								h('img', {
									domProps: {
										src: 'http://img.zsydian.com/icon/tabledel.png',
										style: "width:20px;height:20px;cursor:pointer"
									},
									on:{
										click:(e)=>{
											e.stopPropagation()
												//删除行

												if(params.index==0){
													return
												}else if(this.s==false){
													return
												}else{
													this.attrdata.splice(params.index,1)
												}


											}
										}

									})
								])
							]);
					}
				},
				{
					title:this.$t('manage.sku.editAttrName'),//"名称",
					key:"name",
					render:(h,parmas)=>{
						return h('Input',{
							props:{
								value:parmas.row.name
							},
							on:{
								'on-change':(e)=>{
									parmas.row.name=e.target.value
								},
								"on-blur":()=>{
									// this.detailVos1[parmas.index].name=parmas.row.name
									this.attrdata[parmas.index].name=parmas.row.name
								}
							}
						},parmas.row.name)
					}

				},
				{
					title:this.$t('manage.sku.attrcode'),//"编码",
					key:"code",
					render:(h,parmas)=>{
						return h('Input',{
							props:{
								value:parmas.row.code
							},
							on:{
								'on-change':(e)=>{
									parmas.row.code=e.target.value


								},
								"on-blur":()=>{
									// this.detailVos1[parmas.index].code=parmas.row.code
									this.attrdata[parmas.index].code=parmas.row.code
								}
							}
						},parmas.row.code)
					}

				},
				// {
				// 	title:this.$t('manage.sku.attrsq'),//"排序",
				// 	key:"sequence",
				// 	render:(h,parmas)=>{
				// 		return h('Input',{
				// 			props:{
				// 				value:parmas.row.sequence,
				// 				number:true
				// 			},
				// 			on:{
				// 				'on-change':(e)=>{
				// 					parmas.row.sequence=e.target.value


				// 				},
				// 				"on-blur":()=>{
				// 					this.detailVos1[parmas.index].sequence=parmas.row.sequence
				// 				}
				// 			}
				// 		},parmas.row.sequence)
				// 	}
				// },
			],

				editAttrName:'',//编辑属性的名称
				editAttrId:'',//编辑属性的id
				editAttrSubArr:[],//编辑属性的子属性数组
				editAttrIshowSure:false,//编辑属性的弹框显示
				AcostPrice:0,//备用成本价
				Aprice:0,//备用零售价
				AwholePrice:0,//备用批发价
				Aqty:0,//备用规格数量
				attrTb:false,//同步规格
				imgKey:"",//上传的图片key
				//保存商品数据
				formValidate:{
					skuName:'',//商品名称
					skuCode:'',//SKU
					flname:'',//分类
					inventoryUp:0,//最高库存
					barnd:'',//品牌
					unit:'',//单位
					unitId:'',//单位id
					barcode:'',//条码
					inventory:0,//最低库存
					costPrice:0,//成本价
					wholePrice:0,//批发价
					price:0,//吊牌价
					partnerName:'',
					inven:0,//浮动比
					unitDesc:"",//商品单位描述
				},
				//验证
				ruleValidate:{
					// unit:[{ required: true, message: this.$t('public.valid.skuEmpty'), trigger: 'change' }],
					skuName:[{ required: true, message: this.$t('public.valid.skuEmpty'), trigger: 'blur' }],//'商品名称不能为空'
					inventoryUp:[
					{ type:"number",pattern: /^[1-9]\d*$|^0$/, message: this.$t('public.valid.inventoryIsNum'), trigger: 'blur'  }//'库存应为数字'
					],
					inventory:[
					{ type:"number",pattern: /^[1-9]\d*$|^0$/, message: this.$t('public.valid.inventoryIsNum'), trigger: 'blur'  }//'库存应为数字'
					],
					inven:[
					{ pattern: /^[1-9]\d*$|^0$/, message: this.$t('public.valid.FIsNum'), trigger: 'blur'  }//'浮动比应为数字'
					],
					costPrice:[
						{required: true,type:"number", message: this.$t('public.valid.CEmpty'), trigger: 'blur' },//
					],
					wholePrice:[
						
						{type:"number", pattern: /^\d{1,14}(\.\d{1,2})?$/, message:this.$t('public.valid.WIsNum'), trigger: 'blur'  }//批发价应为数字或小数且小数点后两位
					],
					price:[
						{ required: true,type:"number", message:this.$t('public.valid.PEmpty') , trigger: 'blur' },//
					],

				},
				//选择规格后的数据展示
				chooseGoodData:[],
				chooseGoodskey:[

					{
						title:this.$t('manage.sku.attrsq'),//"规格类型",
						key:'specDetailName',
						align:'center'
					},
					{
						title:this.$t('manage.sku.costprice'),//"成本价",
						key:'costPrice',
						align:'center',
						render:(h,parmas)=>{
							return h('Input',{
									style:{
										width:"100%",
										height:"40px",
										marginLeft:"0px",
										lineHeight:'40px',
										border:'none'
									},
									props:{
										value:parmas.row.costPrice,
										number:true
									},
									on:{
										'on-click':(e)=>{
											e.stopPropagation()
										},
										"on-blur":(e)=>{
											this.AcostPrice=Number(e.target.value)
											parmas.row.costPrice=this.AcostPrice
											this.chooseGoodData[parmas.index].costPrice=this.AcostPrice

									},

								}
							})
						}
					},
					{
						title:this.$t('manage.sku.wholeprice'),//"批发价",
						align:'center',
						key:'wholePrice',
						render:(h,parmas)=>{
						return h('Input',{
								style:{
									width:"100%",
									height:"40px",
									marginLeft:"0px",
									lineHeight:'40px',
									border:'none'
								},
								props:{
									value:parmas.row.wholePrice,
									number:true
								},
								on:{
									'on-click':(e)=>{
										e.stopPropagation()
									},
									"on-blur":(e)=>{
										this.AwholePrice=Number(e.target.value)
										parmas.row.wholePrice=this.AwholePrice
										this.chooseGoodData[parmas.index].wholePrice=this.AwholePrice
								},

							}
						})
					}
					},
					{
						title:this.$t('manage.sku.price'),//"吊牌价",
						align:'center',
						key:'price',
						render:(h,parmas)=>{
						return h('Input',{
								style:{
									width:"100%",
									height:"40px",
									marginLeft:"0px",
									lineHeight:'40px',
									border:'none'
								},
								props:{
									value:parmas.row.price,
									number:true
								},
								on:{
									'on-click':(e)=>{

										e.stopPropagation()

									},
									"on-blur":(e)=>{
										this.Aprice=Number(e.target.value)
										parmas.row.price=Number(e.target.value)
										this.chooseGoodData[parmas.index].price=this.Aprice
								},

							}
						})
					}
					},
					// {
					// 	title:"库存数量1",
					// 	align:'center',
					// 	key:'inventory',
					// 	render:(h,parmas)=>{
					// 	return h('Input',{
					// 			style:{
					// 				width:"100%",
					// 				height:"40px",
					// 				marginLeft:"0px",
					// 				lineHeight:'40px',
					// 				border:'none'
					// 			},
					// 			props:{
					// 				value:parmas.row.inventory,
					// 				number:true
					// 			},
					// 			on:{
					// 				'on-click':(e)=>{
					// 					e.stopPropagation()
					// 				},
					// 				"on-blur":(e)=>{
					// 					this.Aqty=Number(e.target.value)
					// 					parmas.row.inventory=this.Aqty
					// 					this.chooseGoodData[parmas.index].inventory=this.Aqty
					// 			},

					// 		}
					// 	})
					// }
					// },
				],
				chooseGoodskey1:[

					{
						title:this.$t('manage.sku.price'),//"规格类型",
						key:'specDetailName',
						align:'center'
					},
					{
						title:this.$t('manage.sku.costprice'),//"成本价",
						key:'costPrice',
						align:'center',
						render:(h,parmas)=>{
							return h('Input',{
									style:{
										width:"100%",
										height:"40px",
										marginLeft:"0px",
										lineHeight:'40px',
										border:'none'
									},
									props:{
										value:parmas.row.costPrice,
										number:true,
										disabled:true
									},
									on:{
										'on-click':(e)=>{
											e.stopPropagation()
										},
										"on-blur":(e)=>{
											this.AcostPrice=Number(e.target.value)
											parmas.row.costPrice=this.AcostPrice
											this.chooseGoodData[parmas.index].costPrice=this.AcostPrice

									},

								}
							})
						}
					},
					{
						title:this.$t('manage.sku.wholeprice'),//"批发价",
						align:'center',
						key:'wholePrice',
						render:(h,parmas)=>{
						return h('Input',{
								style:{
									width:"100%",
									height:"40px",
									marginLeft:"0px",
									lineHeight:'40px',
									border:'none'
								},
								props:{
									value:parmas.row.wholePrice,
									number:true,
									disabled:true
								},
								on:{
									'on-click':(e)=>{
										e.stopPropagation()
									},
									"on-blur":(e)=>{
										this.AwholePrice=Number(e.target.value)
										parmas.row.wholePrice=this.AwholePrice
										this.chooseGoodData[parmas.index].wholePrice=this.AwholePrice
								},

							}
						})
					}
					},
					{
						title:this.$t('manage.sku.price'),//"吊牌价",
						align:'center',
						key:'price',
						render:(h,parmas)=>{
						return h('Input',{
								style:{
									width:"100%",
									height:"40px",
									marginLeft:"0px",
									lineHeight:'40px',
									border:'none'
								},
								props:{
									value:parmas.row.price,
									number:true,
									disabled:true
								},
								on:{
									'on-click':(e)=>{

										e.stopPropagation()

									},
									"on-blur":(e)=>{
										this.Aprice=Number(e.target.value)
										parmas.row.price=Number(e.target.value)
										this.chooseGoodData[parmas.index].price=this.Aprice
								},

							}
						})
					}
					},
					// {
					// 	title:"库存数量1",
					// 	align:'center',
					// 	key:'inventory',
					// 	render:(h,parmas)=>{
					// 	return h('Input',{
					// 			style:{
					// 				width:"100%",
					// 				height:"40px",
					// 				marginLeft:"0px",
					// 				lineHeight:'40px',
					// 				border:'none'
					// 			},
					// 			props:{
					// 				value:parmas.row.inventory,
					// 				number:true
					// 			},
					// 			on:{
					// 				'on-click':(e)=>{
					// 					e.stopPropagation()
					// 				},
					// 				"on-blur":(e)=>{
					// 					this.Aqty=Number(e.target.value)
					// 					parmas.row.inventory=this.Aqty
					// 					this.chooseGoodData[parmas.index].inventory=this.Aqty
					// 			},

					// 		}
					// 	})
					// }
					// },
				],
				logoUrl:LoadUrl.httpPrefix.Url+'file/action/upload/image/url?c=商品图片&uid='+this.$store.state.common.token,
				checked:[],//选中
				attrsgoods:[{}],
				attrsgoods1:[],
				goodskey:[
						{
						title: this.$t('manage.sku.action'),//'操作',
						key: 'action',
						width: 100,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('div', {
									style: {
										float: 'left',
										marginRight: '5px'
									},
									on: {
										click: (e) => {
												//点击加号
												e.stopPropagation()
												// this.cunhuodata.push({})
											}
										}
									}, [
									h('img', {
										domProps: {
											src: 'http://img.zsydian.com/icon/add.png',
											style: "width:20px;height:20px;cursor:pointer"
										},
										on:{
											'click':()=>{
												//单击添加，调用双击表格时间
												this.attrtwoisshow=true
											}
										}
									})
									]),
								h('div', {
									style: {
										float: 'left',
										marginRight: '5px'

									},
									on: {
										click: () => {
												// this.delGoods(params.row.id);
											}
										}
									}, [
									h('img', {
										domProps: {
											src: 'http://img.zsydian.com/icon/tabledel.png',
											style: "width:20px;height:20px;cursor:pointer"
										},
										on:{
											click:(e)=>{
												e.stopPropagation()
													//删除行

													// if(params.index==0){
													// 	return
													// }
													this.attrsgoods.splice(params.index,1)
													this.detailVos.splice(params.index,1)

												}
											}

										})
									])
								]);
						}
					},
					{
						title:this.$t('manage.sku.editAttrName'),//"属性名",
						key:"name1",

					},

					{
						title:this.$t('manage.sku.details'),//"属性明细",
						key:"name"
					},

					{
					title:this.$t('public.num'),//"数量",
					width:70,
					key:"qty",
					render:(h,parmas)=>{
						return h('Input',{
								style:{

									width:"67px",
									height:"40px",
									marginLeft:"-17px",
									lineHeight:'40px',

									border:'none'

								},
								props:{

									value:parmas.row.qty


								},

								on:{
									'on-click':(e)=>{
										// this.nindex=parmas.index
										e.stopPropagation()
									},
									"on-change":(e)=>{

										this.allCouunt = Number(e.target.value)
										parmas.row.qty= parseInt(Number(e.target.value))



										},

									}
								})
					}
				},
				],
				attrtwoisshow:false,
				barndtotal:1,
				barndpageSize:1,

				sing:[],
				item:{},
				allselectedAttrs:false,
				//扩展属性
				barnd:'',//品牌
				produce:'',//产地
				seo:'',//seo关键字
				volume:'',//体积
				weight:'',//重量
				userDef01:'',//自定属性
				userDef02:'',//自定属性
				userDef03:'',//自定属性
				userDef04:'',//自定属性
				userDef05:'',//自定属性
				userDef06:'',//自定属性
				// attrsisshow:true,

				attrsData:[],

				num2:0,
                //分类
				fldata:[],
				flid:'',
				flname:'',
				flisshow:false,
				flkey:[
				{
                    text: '分类名称',
                    dataIndex: 'name'
                },
                {
                    text: '图标',
                    dataIndex: 'photo',
                    width:100
                },
				// {
				// 	title:this.$t('manage.sku.editAttrName'),//"名称",
				// 	key:"name"
				// },
				// {
				// 	title:this.$t('manage.sku.remark'),//"描述",
				// 	key:"description"
				// },
				// {
				// 	title:this.$t('public.status'),//"状态",
				// 	key:"statusDesc"
				// },
				// {
				// 	title:"子类",
				// 	key:"childs",
				// 	render:(h,params)=>{
				// 		return h('Tree',{
				// 			props:{
				// 				emptyText:"暂无子类",
				// 				data:[]
				// 			}
				// 		},[
				// 			h('a',{
				// 				on:{
				// 					'click':()=>{
				// 						//////////////console.log(params)
				// 					}
				// 				}
				// 			},'点击')
				// 		])
				// 	}
				// },
			],

				gysname:'',
				flname:'',
				height:'',
				current:1,
				status:true,
				goodsText:this.$t('manage.sku.addskuManage'),//"新增商品",
				addText:true,
				numIndex:-1,
				indexId:0,
                formItem:'',
                model1: '',
                content:"测试",
                goods:[],
                gys:[],//选择默认供应商
                total:1,
                pageSize:1,
				uid: this.$store.state.common.token,
				//提交参数
				skuName:"",//商品名称
				skuCode:"",//商品编号
				unit :"",//单位，(双)
				barcode :"",//商品条码
				price :0,//零售价
				costPrice:0,//成本价
				wholePrice:0,//批发价
				skuAttributeList:[],//商品属性明细
				details:"",//商品详细
				specs:[],//商品属性
				specsArr:[],//商品属性详情显示的规格属性
				mainPhoto:'',//宣传照
				partnerId:'',
				id:"",
                num:1,
               	picArr:[],//商品图片
                attrBarcode:'',
                attrSequence:'',
                valueT:1,
                orderListname:[
					
                    {
                        label:this.$t('public.normalS'),//正常
                        value:1
                    },
                    {
                        label:this.$t('public.normalT'),//"已停用",
                        value:99
                    },

				],

                    partnerName:'',
                    attName:'',//每条属性名称
                    attIndex:'',//每条属性下标
                    attrsNameInfo:'',//保存的属性名
                    moreAttrs:[],//全部商品属性
                    addAttrs:[],//获取每条detailVos
                    dialogIndex:'',
                    label:"",
                    barndName:"",
                    barndId:"",
                    barndisshow:false,
                    barndisshow1:false,
                    barnddata:[],
                    barndkey:[
                    	{
                    		title:this.$t('manage.sku.barnd'),//"品牌",
                    		width:180,
                    		key:"name"
                    	},
                    	{
                    		title:this.$t('manage.sku.attrcode'),//"编码",
                    		width:180,
                    		key:"code"
                    	},
                    	{
                    		title:this.$t('manage.sku.remark'),//"描述",
                    		width:180,
                    		key:"remark"
                    	},

                    ],
                    xiugaiDetails:'',

                    attrsArr:[],
                    name:"",
                    attrqty:0,
                    sequence:'',
                    attrnamearr:[],

                    detailVos:[],//子属性数组
                  editChooseData:[],//修改的表格中间数据
                  chooseGoodData1:[],
                   arr:{},//主属性对象
                   mxname:'',
                   subDetailVos:[],//子属性显示的数据
                   subIndex:'',//当前点击的子属性下标
                   tableObject:{},//承载选中的子属性
                   addAttr:{},//承载选中的子属性
                 	attrname2:'',//子属性组合后的名称

                 	attrID:'',//子属性组合后的id
                   arr1:{},
                   subeditDetailVos:[],//子属性修改的数组
                  isSelected:false,//选中的状态
                  isSubSelected:false,//子属性选中的状态
                  single:false,//主属性选中状态
			}
		},
		methods:{
			changecostPrice(s){
				this.formValidate.costPrice=s
			},
			changepricee(s){
				this.formValidate.price=s
			},
			changewholePrice(s){
				this.formValidate.wholePrice=s
			},
			changeinventoryUp(s){
				this.formValidate.inventoryUp=s
			},
			changeinventory(s){
				this.formValidate.inventory=s
			},
			changeinven(s){
				this.formValidate.inven=s
			},
			//点击li
			clickCheckbox(item,index,e){
				this.attName=item
				this.attIndex=index

				this.detailVos=[]
				//console.log(item)
			},
			//修改的选中商品属性
			editselectedAttr(e,i,index){
				if(i.detailVos==null || i.detailVos.length==0){
					return
				}else{
					if(e.target.checked){
					i.checked=true
						this.arr={
							name:i.name,
							id:i.id,
							detailVos:this.detailVos
						}
					this.addAttrs.push(i)//选中一条属性加入到adAttrs
					this.editChooseData.push(this.arr)//中间数组，存在选中后的数据

					this.addAttrs.forEach((x)=>{
						if(x.id==i.id){

							x.detailVos.forEach((v)=>{

								v.checked=false
							})
						}

					})

				}
				//取消选中
				if(e.target.checked==false){
					i.checked=false//把自定义属性checked设为false
					for(let j=0;j<this.editChooseData.length;j++){
						if(this.editChooseData[j].id==i.id){//判断id是否相同
							this.editChooseData.splice(j,1)
							this.addAttrs.splice(j,1)

							this.addAttrs.forEach((x)=>{
								if(x.checked==false){
									x.detailVos.forEach((v)=>{
										v.checked=false
									})
								}
								// //////console.log(this.addAttrs)
							})

							this.chooseGoodData=this.editspecCombinations();//页面显示的数据
						}
					}
				}
				}

			},
			

				//查询商品
			getAllgoods(s){
				this.axios.get('/sku/query?uid='+this.uid+'&status='+s).then((res)=>{
					if(res.data.status==200){
						let data = res.data;
						this.goods = data.rows
						////console.log(data.rows)
						this.allTotal=res.data.total
						this.onepageSize=res.data.pageSize
						this.goods.forEach((x,index)=>{
							if(x.status==1){
								x.statusDesc=this.$t('public.normalS')
							}
							if(x.status==0){
								x.statusDesc=this.$t('public.normalT')
							}
							if(x.status==99){
								x.statusDesc=this.$t('public.normalT')
							}
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')

						})
					}
				})
			},
			//修改后的详情
			getAllgoodsss(){
				this.axios.get('/sku/query?uid='+this.uid+'&status=1').then((res)=>{
					if(res.data.status==200){
						let data = res.data;
						this.goods = data.rows
						////console.log(data.rows)
						this.allTotal=res.data.total
						this.onepageSize=res.data.pageSize
						this.goods.forEach((x,index)=>{
							if(x.status==1){
								x.statusDesc=this.$t('public.normalS')
							}
							if(x.status==0){
								x.statusDesc=this.$t('public.normalT')
							}
							if(x.status==99){
								x.statusDesc=this.$t('public.normalT')
							}
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')

						})
						this.clickGoods(this.id,this.numIndex)
					}
				})
			},
			//保存商品
			savegoods(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						// let len=this.unitList.length
						// for(let i =0;i<len;i++){
						// 	if(x.unitName!="" && x.unitName!="请输入辅单位"){
						// 		this.saveInfo()

						// 	}else{
						// 		this.unitList[i].splice(i,1);i=i-1
						// 		this.saveInfo()
						// 	}
						// }
						this.unitList.forEach((x,index)=>{
							if(x.unitName!="请输入辅单位" && x.unitName!=""){
								this.saveInfo()
							}else{
								this.unitList.splice(this.unitList[index],1)
								this.saveInfo()
							}
						})
						
					}
				})
			},
			//保存商品
			saveInfo(){
				this.axios.post('sku/add?uid='+this.uid,{
					// attributeList:this.chooseGoodData,//商品属性
					classId:this.flid,//分类ID
					unitList:this.unitList,//辅助单位
					details:this.$refs.ue.getUEContent(),//商品详细
					specification:this.$refs.ue4.getUEContent(),//规格参数
					protection:this.$refs.ue5.getUEContent(),//售后保障
					className:this.formValidate.flname,//分类名称
					costPrice:Number(this.formValidate.costPrice),//成本价
					recSku:this.sing1,//推荐
					newSku:this.sing2,//新品
					hotSku:this.sing3,//热门
					onlingSals:this.sing4,//可售
					wholePrice:Number(this.formValidate.wholePrice),//批发价
					price:Number(this.formValidate.price),//
					inventoryUp:Number(this.formValidate.inventoryUp),//库存
					inventory:Number(this.formValidate.inventory),//库存
					mainPhoto:this.mainPhoto,
					photos:this.picArr.join(','),//宣传照逗号分割
					skuCode:this.formValidate.skuCode,//编码
					skuName:this.formValidate.skuName,//商品名称
					partnerId:this.partnerId,
					partnerName:this.formValidate.partnerName,
					// barcode:this.formValidate.barcode,//商品条码
					unit:this.formValidate.unit,
					unitId:this.formValidate.unitId,
					unitDesc:this.formValidate.unitDesc,
					userDef01:this.userDef01,
					userDef02:this.userDef02,
					userDef03:this.userDef03,
					userDef04:this.userDef04,
					userDef05:this.userDef05,
					userDef06:this.userDef06,
					userDef07:this.userDef07,
					userDef08:this.userDef08,
					userDef09:this.userDef09,
					userDef010:this.userDef010,
			}).then(res=>{
				if(res.data.status==200){

                    this.$notify({
				        title: "",//'保存',
				        message: this.$t('public.valid.SaveSuccess'),//this.$t('public.SaveSuccess'),//
				        type: 'success',
				        position: 'bottom-right'
			        });
                    this.ueditor.value=''
					this.ueditor3.value=''
					this.ueditor4.value=''
					this.ueditor5.value=''
					this.ueditor6.value=''
					this.ueditor7.value=''
					this.unitList=[{unitName:"请输入辅单位",rate:0}]
					this.addGoodsInfo()//点击新建
					this.getAllgoodss()//重新获取商品
					// this.clickGoods(this.goods[0].id,0)
					
				}else{

                    this.$notify({
				        title: "",//'失败',
				        message: res.data.errorMessage,
				        type: 'error',
				        position: 'bottom-right'
			        });
				}
			})
			},
			//保存后的搜索点击第一个
			getAllgoodss(){
				this.axios.get('/sku/query?uid='+this.uid+'&status=1').then((res)=>{
					if(res.data.status==200){
						let data = res.data;
						this.goods = data.rows
						this.allTotal=res.data.total
						this.onepageSize=res.data.pageSize
						this.goods.forEach((x,index)=>{
							if(x.status==1){
								x.statusDesc=this.$t('public.normalS')
							}
							if(x.status==99 ){
								x.statusDesc=this.$t('public.normalT')
							}
							if(x.status==0){
								x.statusDesc=this.$t('public.normalT')
							}
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')

						})
						if(this.goods.length==0){
							return
						}else{
							this.clickGoods(this.goods[0].id,0)
							this.getGoodsInfo(this.goods[0].id)
						}
					}else{
						this.$notify({
                            title:"",//
                            message:  res.data.errorMessage,
                            type: 'error',
                            position: 'bottom-right'
                        });
					}
				})
			},
			//点击修改
			editBtn(){
				this.xiugai=true
				this.addText=false
				this.isdetails=false
				this.xiugaibtn2=true
				this.xiugaibtn1=false
				//点击修改获取编辑内容，不要在点击左侧时获取
				this.axios.get('sku/get/'+this.id+'?uid='+this.uid).then((res)=>{
					let data=res.data.rows
					this.ueditor3.value=this.$refs.ue2.setUEContent(data.details)
					
					this.ueditor6.value=this.$refs.ue6.setUEContent(data.specification)
					this.ueditor7.value=this.$refs.ue7.setUEContent(data.protection)	
				})
			},
			//修改库存商品
			updataGoods(name){
				this.$refs[name].validate((valid) => {
					if(valid){
						let len=this.unitList.length
						// for(let i =0;i<len;i++){
						// 	if(x.unitName!="" && x.unitName!="请输入辅单位"){
						// 		this.editInfo()
						// 	}else{
						// 		this.unitList[i].splice(i,1);i=i-1
						// 		this.editInfo()
						// 	}
						// }
						this.unitList.forEach((x,index)=>{
							if(x.unitName!="请输入辅单位" && x.unitName!=""){
								this.editInfo()
							}else{
								this.unitList.splice(this.unitList[index],1)
								this.editInfo()
							}
						})
					}
				})
			},
			editInfo(){
				this.axios.put('/sku/update?uid='+this.uid,{
					id:this.id,
					recSku:this.sing1,//推荐
					newSku:this.sing2,//新品
					hotSku:this.sing3,//热门
					onlingSals:this.sing4,//线上可售
					// attributeList:this.chooseGoodData,//商品属性
					classId:this.flid,//分类ID
					className:this.formValidate.flname,//分类名称
					costPrice:Number(this.formValidate.costPrice),//成本价
					// price:this.formValidate.price,//零售价
					wholePrice:Number(this.formValidate.wholePrice),//批发价
					price:Number(this.formValidate.price),//
					unitList:this.unitList,//辅助单位
					details:this.$refs.ue2.getUEContent(),//商品详细
					specification:this.$refs.ue6.getUEContent(),//规格参数
					protection:this.$refs.ue7.getUEContent(),//售后保障
					inventoryUp:Number(this.formValidate.inventoryUp),//库存
					inventory:Number(this.formValidate.inventory),//库存
					mainPhoto:this.mainPhoto,
					photos:this.picArr.join(','),//宣传照逗号分割
					skuCode:this.formValidate.skuCode,//编码
					skuName:this.formValidate.skuName,//名称
					barcode:this.formValidate.barcode,//名称
					unit:this.formValidate.unit,//单位
					unitId:this.formValidate.unitId,
					unitDesc:this.formValidate.unitDesc,
					partnerId:this.partnerId,
					partnerName:this.formValidate.partnerName,
					userDef01:this.userDef01,
					userDef02:this.userDef02,
					userDef03:this.userDef03,
					userDef04:this.userDef04,
					userDef05:this.userDef05,
					userDef06:this.userDef06,
					userDef07:this.userDef07,
					userDef08:this.userDef08,
					userDef09:this.userDef09,
					userDef010:this.userDef010,
				}).then(res=>{

					if(res.data.status==200){

						 this.$notify({
					        title:"",//'修改',
					        message: this.$t('public.editSuccess'),//this.$t('public.editSuccess'),//
					        type: 'success',
					        position: 'bottom-right'
				        });
					
						this.addGoodsInfo()//点击新建
						this.getAllgoodsss()//重新获取商品
						// this.clickGoods(this.id,this.numIndex)
						// this.getGoodsInfo(this.id)
						this.ueditor.value=''
						this.ueditor3.value=''
						this.ueditor4.value=''
						this.ueditor5.value=''
						this.ueditor6.value=''
						this.ueditor7.value=''
						this.unitList=[{unitName:"请输入辅单位",rate:0}]

					}else{
                         this.$notify({
					        title: "",//'失败',
					        message: res.data.errorMessage,
					        type: 'error',
					        position: 'bottom-right'
				        });

					}
				})
			},
			//删除商品
			del(){
				if(this.id==''){
					this.$notify({
				        title: this.$t('public.valid.del'),//'删除',
				        message:this.$t('public.valid.chooseOneData'),//'请选择一条数据！',
				        type: 'error',
				        position: 'bottom-right'
			        });
					}else{
						this.$Modal.confirm({
                            title: '删除商品',
                            content: '<p>确定要删除吗?</p>',
                            onOk: () => {
                                this.axios.delete('/sku/delete/'+this.id+'?uid=' + this.uid).then((res) => {
									if(res.data.status == 200) {
										this.$notify({
									        title:"",//'删除',
									        message:this.$t('public.valid.DelSuccess'),//'成功',
									        type: 'success',
									        position: 'bottom-right'
								        });
										this.getAllgoods(1)
										this.id=''
									}
								})
                            },
                        });
					}

			},
			 //下架POST
		      stop(){
		      	if(this.id==''){
					this.$notify({
				        title: "",//'错',
				        message:this.$t('public.valid.chooseOneData'),//'请选择一条数据！',
				        type: 'error',
				        position: 'bottom-right'
			        });
				}else{
					this.axios.post('/sku/disabled/'+this.id+'?uid='+this.uid).then((res)=>{
						if(res.data.status==200){
							this.$notify({
						        title:  "",//'下架',
						        message:this.$t('public.normalT'),//'下架成功',
						        type: 'success',
						        position: 'bottom-right'
							});
							this.clickGoods(this.id,this.numIndex)
                            this.getAllgoods(1);
                            this.id=''
						}
		      		})
				}

		      },
		      //删除商品
			del(){
				if(this.id==''){
						this.$notify({
                        title:"",//
                        message: this.$t('public.valid.chooseOneData'),//,//'请选择一条数据！',
                        type: 'error',
                        position: 'bottom-right'
                    });
					}else{
						
                        this.$Modal.confirm({
                            title: '删除商品',
                            content: '<p>确定要删除吗?</p>',
                            onOk: () => {
                                this.axios.delete('/sku/delete/'+this.id+'?uid=' + this.uid).then((res) => {
                                    if(res.data.status == 200) {
                                    this.$notify({
                                        title:"",//
                                        message: this.$t('public.deleteSuccess'),//
                                        type: 'success',
                                        position: 'bottom-right'
                                    });
									this.getAllgoods(1);
		                            this.id=''
                                    }
                                })
                            },
                           
                        });
					}

			},

		      //上架POST
		      start(){
		      	if(this.id==''){
					this.$notify({
				        title:  "",//'错误',
				        message: this.$t('public.valid.chooseOneData'),//'请选择一条数据！',
				        type: 'error',
				        position: 'bottom-right'
			        });
				}else{
					this.axios.post('sku/enabled/'+this.id+'?uid='+this.uid).then((res)=>{
						if(res.data.status==200){
							this.$notify({
						        title: "",//'上架',
						        message:this.$t('public.normalS'),//'上架成功',
						        type: 'success',
								position: 'bottom-right'
								
							});
							this.clickGoods(this.id,this.numIndex)
							this.getAllgoods(1);
                            this.id=''
						}
		      		})
				}
		      },
			//单击获取详情
			clickGoods(id,index){
				this.id = id
				this.numIndex = index
				this.isdetails=true//详情页面
				this.addText=false//保存页面
				this.xiugai=false//修改页面
				this.xiugaibtn2=false//修改保存按钮
				this.xiugaibtn1=true//修改按钮
				this.chooseGoodData=[]//每次点击清空显示的组合数据
				this.editChooseData=[]//修改的需要组合的数组，每次点击需清空
				this.specsArr=[]//修改的需要组合的数组，每次点击需清空
				this.attrsData=[]//修改的需要组合的数组，每次点击需清空
				this.getGoodsInfo(id)//获取详情

				// this.chooseGoodData=this.editspecCombinations();//页面显示的数据
				this.attrsgoods1.forEach((i)=>{
					i.checked=false
					i.detailVos.forEach((j)=>{
						j.checked=false
					})
				})

			},
			//GET /skuevel/sku/{id} 指定商品评论
			getComment(id){
				this.axios.get('skuevel/sku/'+id+'?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						let data=res.data.rows
						this.commnet=res.data.rows
						this.commenttotal=res.data.total
						this.commentpagesize=res.data.pageSize
						this.commnet.forEach((x,index)=>{
							x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
							if(x.attachs==null || x.attachs==undefined){
								this.commentImg=[]
							}else{
								this.commentImg=x.attachs.split(',')
							}
						})

					}
				})
			},
			//评论翻页
			commentgetData(current){
				this.axios.get('skuevel/sku/'+id+'?offset='+current+'&uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						this.commnet=res.data.rows
						this.commenttotal=res.data.total
						this.commentpagesize=res.data.pageSize
						this.commnet.forEach((x,index)=>{
							x.createTime=new Date(x.createTime).toLocaleString().replace(/\//g,'-')
							if(x.attachs==null || x.attachs==undefined){
								this.commentImg=[]
							}else{
								this.commentImg=x.attachs.split(',')
							}
						})
					}
				})
			},
			commentchangePageSize(size){
				this.commentpagesize=size
			},
			//根据ID查看'/inventory/viewsku商品详情sku/get/specs
			getGoodsInfo(id){
				this.axios.get('sku/get/'+id+'?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						let data = res.data.rows
						this.goodsText=data.skuName
						this.formValidate.skuName=data.skuName
						this.formValidate.skuCode=data.skuCode
						this.formValidate.unit=data.unit
						this.formValidate.unitId=data.unitId
						this.formValidate.unitId=data.unitId
						this.formValidate.unitDesc=data.unitDesc
						this.formValidate.barcode=data.barcode
						this.formValidate.price=data.price
						this.formValidate.costPrice=data.costPrice
						this.formValidate.wholePrice=data.wholePrice
						this.formValidate.price=data.price
						this.formValidate.partnerName=data.partnerName
						this.partnerId=data.partnerId
						this.formValidate.inventoryUp=data.inventoryUp
						this.formValidate.inventory=data.inventory
						this.formValidate.flname=data.className
						this.flid=data.classId
						this.cgxqInfo=res.data.rows//详情

						
						// console.log(this.$refs.ue2.setUEContent(data.details))
						if(this.cgxqInfo.status==1){
							this.cgxqInfo.statusDesc=this.$t('public.normalS')
						}
						if(this.cgxqInfo.status==99){
							this.cgxqInfo.statusDesc=this.$t('public.normalT')
						}
						if( this.cgxqInfo.status==0){
							this.cgxqInfo.statusDesc=this.$t('public.normalT')
						}
						this.sing1=data.recSku//推荐
						this.sing2=data.newSku//新品
						this.sing3=data.hotSku//热门
						this.sing4=data.onlingSals//新品
						this.userDef01=data.userDef01
						this.userDef02=data.userDef02
						this.userDef03=data.userDef03
						this.userDef04=data.userDef04
						this.userDef05=data.userDef05
						this.userDef06=data.userDef06
						this.userDef07=data.userDef07
						this.userDef08=data.userDef08
						this.userDef09=data.userDef09
						this.userDef010=data.userDef010
						this.formValidate.barnd=data.barnd
						this.barndId=data.barndId
						//辅助单位
						if(data.unitList==undefined || data.unitList.length==0){
							this.unitList=[{unitName:"请输入辅单位",rate:0}]
						}else{
							this.unitList=data.unitList
							console.log(this.unitList)
						}
						this.unitList1=data.unitList
						//商品图片
						
						if(data.photos==null || data.photos==""){
							this.picArr=[]
							this.imgArr=[]
							// this.imgArr.push(data.mainPhoto)//详情图片预览
							this.ImgInfoSrc=data.mainPhoto
							this.mainPhoto=data.mainPhoto
						}else{

							// this.imgArr.push(data.mainPhoto)//详情图片预览
							this.picArr=data.photos.split(',')
							this.imgArr=data.photos.split(',')//详情图片预览
							this.imgArr.unshift(data.mainPhoto)
							// this.imgArr.push(data.mainPhoto)
							
							this.ImgInfoSrc=data.mainPhoto
							this.mainPhoto=data.mainPhoto
							
						}
						
					}
				})
			},
			//点击图片预览
			clickInfoImg(item,index){

				this.ImgInfoSrc=item
			},
			
			//详情tabs切换
			addborder(index){
				this.num2 = index

			},
			addborder1(index){
				this.num4=index
				if(this.num4==6){
					this.getComment(this.id)
				}
			},
			//获取单位数据
			getUnit(){
				this.axios.get('skuunit/query?length=99&uid='+this.uid).then(res=>{
					if(res.data.status==200){
						//console.log(res.data.rows)
						res.data.rows.forEach((x,index)=>{
							let arr={
								value:res.data.rows[index].id,
								label:res.data.rows[index].title
							}
							this.unitData.push(arr)
						})
					}
				})
			},
			//选择单位
			changeunit(v){
				this.formValidate.unit=v.label
				this.formValidate.unitId=v.value
			},
			changeSearchunit(q){
				this.formValidate.unit=q
				console.log(this.formValidate.unit)
			},
			//单击新建
			addGoodsInfo(){
				this.addText = true;
				this.xiugai=false
				this.isdetails=false
				this.xiugaibtn1=false
				this.xiugaibtn2=false
				this.sing1=false//推荐
				this.sing2=false//新品
				this.sing3=false//热门
				this.sing4=false//线上恪守
				this.picArr=[]//商品图片逗号分割
				this.mainPhoto=''//默认商品图片
				this.mainImgshw=true
				this.alertch1=false
				this.flid=''//分类id
				this.ueditor.value=''
				this.formValidate.inventoryUp=0//库存上限
				this.formValidate.inventory=0//库存上限
				this.formValidate.skuName=''//商品名称
				this.formValidate.skuCode=''//sku编码
				this.formValidate.flname=''//分类名称
				this.formValidate.unit=''
				this.formValidate.costPrice=0//成本价
				this.formValidate.wholePrice=0//批发价
				this.formValidate.price=0//批发价
				this.formValidate.barcode=''//条码
				this.formValidate.partnerName=''
				this.partnerId=''
				//选中状态去掉m
				this.editChooseData=[]
				this.addAttrs=[]//
				this.attrsData=[]//商品属性规格
				this.chooseGoodData=[]//商品属性规格
				this.ueditor.value=''
				this.ueditor3.value=''
				this.ueditor4.value=''
				this.ueditor5.value=''
				this.ueditor6.value=''
				this.ueditor7.value=''
				this.unitList=[{unitName:"请输入辅单位",rate:0}]
				this.details=''

				this.skuAttributeList=[]
				this.partnerId=''//供应商id
				this.formValidate.barnd=''//品牌
				this.Aprice=0
				this.AwholePrice=0
				this.AcostPrice=0
				this.inventory=0
				this.produce=''//产地
				this.seo=''//seo关键字
				this.volume=''//体积
				this.weight=''//重量
				this.userDef01=''//自定属性
				this.userDef02=''//自定属性
				this.userDef03=''//自定属性
				this.userDef04=''//自定属性
				this.userDef05=''//自定属性
				this.userDef06=''//自定属性
				this.userDef07=''//自定属性
				this.userDef08=''//自定属性
				this.userDef09=''//自定属性
				this.userDef010=''//自定属性
				this.goodsText=this.$t('manage.sku.addskuManage'),//"新增商品"
				this.moreAttrs.forEach((x)=>{
					x.checked=false
					x.detailVos.forEach((j)=>{
						j.checked=false
					})
				})//商品属性规格
				this.attrsgoods1.forEach((x)=>{
					x.checked=false
					x.detailVos.forEach((j)=>{
						j.checked=false
					})
				})//商品属性规格

			},
  			//供应商弹框出现后点击表格行数据flrow
			gysrow(data,index){
				this.supplierObj=data
  			},
  			changeSupplierInput(){
  				if(this.formValidate.partnerName==""){
  					this.gysdata=[]
  					this.alertch1=false
  					return
  				}else{
  					this.axios.get('partner/query?keyword='+this.formValidate.partnerName+'&uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						let data = res.data.rows
						this.gysdata = res.data.rows
						this.gystotal=res.data.total
						this.gyspageSize=res.data.pageSize
						data.forEach((x,index)=>{
							x.Raddress=x.province+x.city+x.district
						})
						this.alertch1=true

					}

				})
  				}
  			},
  			gysrow1(data){
  				this.formValidate.partnerName = data.name
				this.supplierCode = data.code
				this.partnerId = data.id
				this.tel=data.tel//供应商电话
				this.alertch=false
				this.alertch1=false
  			},
  			//供应商确认
  			gysSure(){
  				this.formValidate.partnerName = this.supplierObj.name
				this.supplierCode = this.supplierObj.code
				this.partnerId = this.supplierObj.id
				this.tel=this.supplierObj.tel//供应商电话
				this.alertch=false
				this.alertch1=false
  			},
  			//供应商取消
  			gysCancel(){
  				this.formValidate.partnerName = ""
				this.supplierCode = ""
				this.partnerId = ""
				this.tel=""
				this.alertch=false
  			},
  			//双击供应商一行
  			dblgysrow(){
  				this.gysSure()
  			},
			//品牌弹框
			getbarnd(){
				this.barndisshow=true
				this.getAllbarndLists()
			},
			changeBInput(){
				if(this.formValidate.barnd==''){
					this.barnddata=[]
					this.barndisshow=false
				}else{
					this.axios.get('skubrand/query?keyword='+this.formValidate.barnd+'&uid=' + this.uid).then((res) => {
						if(res.data.status == '200') {
							let data = res.data;
							this.barnddata = data.rows;
							this.barndtotal=data.total
							this.barndpageSize=data.pageSize
							this.barndisshow1=true
						}
					})
				}
			},
			//弹框获取所有品牌列表
			getAllbarndLists(){
				this.axios.get('skubrand/query?uid=' + this.uid).then((res) => {
					if(res.data.status == '200') {
						let data = res.data;
						this.barnddata = data.rows;
						this.barndtotal=data.total
						this.barndpageSize=data.pageSize
					}
				})
			},
			//搜索品牌
			brandsearchInput(){
				this.axios.get('skubrand/query?uid=' + this.uid+'&keyword='+this.brandkeyword).then((res) => {
					if(res.data.status == '200') {
						let data = res.data;
						this.barnddata = data.rows;
						this.barndtotal=data.total
						this.barndpageSize=data.pageSize
					}
				})
			},
			//回车搜索品牌
			brandenterSearch(){
				this.brandsearchInput()
			},
			//品牌框出现后点击表格行数据flrow
			barndrow(data,index){
				this.brandObj=data
				
  			},
  			//取消品牌
  			barndCancel(){
  				this.formValidate.barnd = ""
				this.barndId = ""
				this.barndisshow=false
  			},
  			barndrow1(data){
  				this.formValidate.barnd = data.name
				this.barndId = data.id
				this.barndisshow=false
				this.barndisshow1=false
  			},
  			//品牌确认
  			makebarnd(){
  				this.formValidate.barnd = this.brandObj.name
				this.barndId = this.brandObj.id
				this.barndisshow=false
				this.barndisshow1=false
  			},
  			//双击品牌一行
  			dblbarndrow(){
  				this.makebarnd()
  			},
			 //取消保存商品信息
            delGoods() {
               this.addGoodsInfo()
            },
            makegys(){
				this.flisshow=false
			},
			modelCancel(){
		
				this.flisshow=false
		
				this.attrtwoisshow=false
				// this.formValidate.flname=''
				// this.flid=''
			},
            //查找分类
  			searchfl(){
  				this.axios.get('skuclass/query?uid='+this.uid).then(res=>{
  					if(res.data.status==200){
  						this.fldata=res.data.rows
  						this.total=res.data.total
  						this.pageSize=res.data.pageSize
  						//console.log(this.fldata)
  					}
  				})
  				this.flisshow=true
  			},


            //翻页
            gyschangePageSize(size){
                this.gyspageSize = size
            },
           	//切换供应商
           	gysgetData(current){
                this.axios.get('partner/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    this.gysdata = res.data.rows
                    this.gystotal=res.data.total
					this.gyspageSize=res.data.pageSize
					data.forEach((x,index)=>{
						x.Raddress=x.province+x.city+x.district
					})
            })

            },

             //切换品牌一条页
            barndgetData(current){
                this.axios.get('skubrand/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    // ////////////////////console.log(res)

                    this.barnddata = res.data.rows
                })

            },
            //翻页
           barndchangePageSize(size){
                this.barndpageSize = size
            },
            //获取供应商
			getGys(){
				this.alertch=true
				this.axios.get('partner/query?uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						let data = res.data.rows
						this.gysdata = res.data.rows
						this.gystotal=res.data.total
						this.gyspageSize=res.data.pageSize
						data.forEach((x,index)=>{
							x.Raddress=x.province+x.city+x.district
						})

					}

				})
			},
			//选择供应商
			selectgys(value){
				this.partnerId= value
			},
			//点击差号
            cancelHome(){
                this.$router.push('/skulist')
            },
            //上传时
            onprogress(event, file, fileList){
            	this.loadingisshow=true
            },
            //上传前
            beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isPng = file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isJPG && !isPng) {
			          this.$notify({
				        title: "",//'失败',
				        message:this.$t('public.upJpngOrPng'),
				        type: 'error',
				        position: 'bottom-right'
			        });
		        }
		        if (!isLt2M) {
			         this.$notify({
				        title: "",//'失败',
				        message:this.$t('public.upJpngTwoM'),
				        type: 'error',
				        position: 'bottom-right'
			        });
		        }
		        return isJPG || isPng && isLt2M;
		      },
		      //主图差显示
            chaisshw(){
            	if(this.mainPhoto==''){
            		return
            	}else{
            		this.mainPhotoisshw=true
            	}

            },
            //删除图标隐藏
            chaishide(){
            	this.mainPhotoisshw=false

            },
            //删除主图
            delUp(){
            	// this.axios.post('file/action/delete?key='+this.imgKey).then(res=>{
            	// 	if(res.data.status==200){
            	// 		this.mainPhotoisshw=false
		           //  	this.mainImgshw=true
		           //  	this.mainPhoto=''
            	// 	}
            	// })
            	this.mainPhotoisshw=false
            	this.mainImgshw=true
            	this.mainPhoto=''
            },
            //删除子图
            delSub1(item,index){
            	// this.axios.post('file/action/delete?key='+item.key).then(res=>{
            	// 	if(res.data.status==200){
            			
            	// 	}
            	// })
            	this.picArr.splice(index,1)
            	
            },
			//上传图片成功
			addsucess(res,file){
				if(file.response.status==200){
					this.mainPhoto=res.rows.url
					this.mainImgshw=false
					this.loadingisshow=false
					this.imgKey=res.rows.key
				}else{
					this.$notify({
				        title: "",//'失败',
				        message:this.$t('public.fileUpError'),
				        type: 'error',
				        position: 'bottom-right'
			        });
				}
			},
			//子图
			addsucessSub(res,file){
				if(this.picArr.length>3){
					this.$notify({
				        title: "",//'失败',
				        message: this.$t('public.fourOnly'),//'只能上传4张',
				        type: 'error',
				        position: 'bottom-right'
			        });
				}else if(file.response.status==200){
					// let arr={
					// 	key:res.rows.key,
					// 	url:res.rows.url
					// }
					this.picArr.push(res.rows.url)
					this.loadingisshow=false
					console.log(this.picArr.join(','))
				}else{
					this.$notify({
				        title: "",//'失败',
				        message:this.$t('public.fileUpError'),
				        type: 'error',
				        position: 'bottom-right'
			        });
			        this.loadingisshow=false
				}
			},
			//下拉加载更多
            handleReachEdge(){
            	this.current++//默认10条
 				this.axios.get('sku/query?offset='+this.current+'&uid='+this.uid+'&status='+this.valueT).then((res)=>{
 					if(this.current>Math.ceil(this.allTotal/this.onepageSize)){
 						this.current=Math.ceil(this.allTotal/this.onepageSize)
 					}
			 		res.data.rows.forEach((item)=>{
			 			this.goods.push(item)
			 			this.goods.forEach((x,index)=>{
							if(x.status==1){
								x.statusDesc=this.$t('public.normalS')
							}
							if(x.status==0){
								x.statusDesc=this.$t('public.normalT')
							}
							if(x.status==99){
								x.statusDesc=this.$t('public.normalT')
							}
			 				// x.mainPhoto=x.mainPhoto.split(',')[0]
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
			 		})

			 	})
            },
        
           //下拉框选择
            orderselected(value){
				this.current=1
            	this.valueT=value
            	this.axios.get('/sku/query?uid='+this.uid+'&status='+value).then((res)=>{
						if(res.data.status==200){
							let data = res.data;
							this.goods = data.rows
							////console.log(data.rows)
							this.allTotal=res.data.total
							this.onepageSize=res.data.pageSize
							this.goods.forEach((x,index)=>{
								if(x.status==1){
								x.statusDesc=this.$t('public.normalS')
							}
							if(x.status==0){
								x.statusDesc=this.$t('public.normalT')
							}
							if(x.status==99){
								x.statusDesc=this.$t('public.normalT')
							}
								x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')

							})
							if(this.goods.length==0){
								this.addGoodsInfo()
							}else if(this.$route.query.id){
								this.clickGoods(this.goods[0].id,0)
							}else{
								this.addGoodsInfo()
							}
						}
					})
            },
            //新建属性
		
	      //弹框获取所有供应商列表
			getAllgysLists(){
				this.axios.get('/partner/query?uid=' + this.uid).then((res) => {
					if(res.data.status == '200') {
						let data = res.data;

						this.gysdata = data.rows;
						this.allgyslength = data.rows.length
						this.gystotal=res.data.total
						this.gyspageSize=res.data.pageSize
						data.rows.forEach((x)=>{
							x.Raddress=x.province+x.city+x.district
						})
					}
				})
			},
			//供应商模糊搜索
			getgysKeyword(){
				this.axios.get('partner/query?keyword='+this.gyskeyword+'&uid='+this.uid).then((res)=>{
					if(res.data.status==200){
						this.gysdata = res.data.rows
						this.gystotal=res.data.total
						this.gyspageSize=res.data.pageSize
						res.data.rows.forEach((x)=>{
							x.Raddress=x.province+x.city+x.district
						})
					}
				})
			},
			//回车搜索
			gysenterSearch(){
				this.getgysKeyword()
			},
	       //左侧列表点击搜索
            search(){
                this.axios.get('/sku/query?keyword='+this.searchKeyword+'&uid=' + this.uid).then((res) => {
                   let data = res.data.rows;
					////console.log(data)
					if(res.data.status == '200') {
						this.goods = data
						this.allTotal=res.data.total
						this.onepageSize=res.data.pageSize

						this.goods.forEach(x=>{
							if(x.status==1){
								x.statusDesc=this.$t('public.normalS')
							}
							if(x.status==0){
								x.statusDesc=this.$t('public.normalT')
							}
							if(x.status==99){
								x.statusDesc=this.$t('public.normalT')
							}
							x.mainPhoto=x.mainPhoto
							x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
						})
					}
                })
            },

            //回车搜索
            enterSearch(){
                this.search()
            },
	      //精准搜索
            searchLocation(){
              this.psisshow=true
            },
            //精准搜索确认
            sureSearchLocation(){
               this.axios.get('/sku/query?uid=' + this.uid,{
                skuName:this.skuNameL,
                skuCode:this.skuCodeL,
                barcode:this.skuBarcodeL,
                price:this.skuPriceL,
                classId:this.locationFL
               }).then((res) => {
                if(res.data.status==200){
                  let data = res.data
                    this.goods = data.rows
					this.allTotal=res.data.total
					this.onepageSize=res.data.pageSize
					this.goods.forEach((x,index)=>{
						x.mainPhoto=x.mainPhoto.split(',')[0]
						x.createTime=new Date(x.createTime).toLocaleDateString().replace(/\//g,'-')
					})
                    this.skuNameL='',//商品名称
					this.skuCodeL='',//商品货号
					this.skuBarcodeL='',//商品条码
					this.skuPriceL='',//商品零售价
                    this.psisshow=false
                  }
               })
            },
             //精准搜索取消
            cancelSearchLocation(){
               this.skuNameL='',//商品名称
				this.skuCodeL='',//商品货号
				this.skuBarcodeL='',//商品条码
				this.skuPriceL='',//商品零售价
              this.psisshow=false
            },
            //获取所有付类
            getAllfl(){
            	this.axios.get('skuclass/query?uid='+this.uid).then(res=>{
	            		if(res.data.status==200){
							let arr=[]
							arr=res.data.rows
	            			// this.total1=res.data.total
	            			// this.pageSize1=res.data.pageSize
	            			this.Allfl=arr.map(x=>{
								let bj={
									title:x.name,
									id:x.id,
									icon:x.photo,

									children:x.childs

								}
								bj.children=bj.children.map(j=>{
									let b={
										title:j.name,
										id:j.id,
										parentId:x.id,
										icon:j.photo,
										children:j.childs
									}
									return b
								})
								bj.children.forEach(n=>{
									n.children=n.children.map(m=>{
										let c={
											title:m.name,
											id:m.id,
											parentId:j.id,
											icon:m.photo,
										}
										return m
									})
								})
								return bj
							})
							//console.log(this.Allfl)
	            		}
	            	})
            },
            //付类翻页
            changePageSize(size){
                this.pageSize = size
            },
            //切换分类一条页
            getData(current){
                this.axios.get('skuclass/query?offset='+current+'&uid='+this.uid).then((res)=>{

                    if(res.data.status==200){
							let arr=[]
							arr=res.data.rows
	            			this.Allfl=arr.map(x=>{
								let bj={
									title:x.name,
									id:x.id,
									icon:x.photo,

									children:x.childs

								}
								bj.children=bj.children.map(j=>{
									let b={
										title:j.name,
										id:j.id,
										parentId:x.id,
										icon:j.photo,
										children:j.childs
									}
									return b
								})
								bj.children.forEach(n=>{
									n.children=n.children.map(m=>{
										let c={
											title:m.name,
											id:m.id,
											parentId:j.id,
											icon:m.photo,
										}
										return m
									})
								})
								return bj
							})
							
	            		}
                })

            },
            //选中分类
			seletChange(data){
				//console.log(data)
				this.flid=data[0].id
				this.formValidate.flname=data[0].title
				// this.classSku(this.classId)
				//console.log(data)
			},
			//回车搜索
			flenterSearch(){
				this.flsearchInput()
			},
			//分类搜索
			flsearchInput(){
				this.axios.get('skuclass/query?uid='+this.uid+"&keyword="+this.flkeyword).then(res=>{
            		if(res.data.status==200){
							let arr=[]
							arr=res.data.rows
	            			this.total=res.data.total
	            			this.pageSize=res.data.pageSize
	            			this.Allfl=arr.map(x=>{
								let bj={
									title:x.name,
									id:x.id,
									icon:x.photo,

									children:x.childs

								}
								bj.children=bj.children.map(j=>{
									let b={
										title:j.name,
										id:j.id,
										parentId:x.id,
										icon:j.photo,
										children:j.childs
									}
									return b
								})
								bj.children.forEach(n=>{
									n.children=n.children.map(m=>{
										let c={
											title:m.name,
											id:m.id,
											parentId:j.id,
											icon:m.photo,
										}
										return m
									})
								})
								return bj
							})
							//console.log(this.Allfl)
	            		}
            	})
			},
            //精准搜索分类
            getdztype(v){
            	this.locationFL=v
				//console.log(v)
            },
            //是否推荐
            single11(v){
            this.sing1=v
            },
            single12(v){
            	this.sing2=v
            },
            single13(v){
            	this.sing3=v
            },
            single14(v){
            	this.sing4=v
            },
            

		},
		created(){
			this.$nextTick(()=>{
				
		
		
				this.getAllfl()//分类
				this.getUnit()//获取单位数据
			})
		},
		mounted(){
			this.height = document.documentElement.clientHeight
				if(this.$route.query.id){
					this.id = this.$route.query.id;
					// this.numIndex = this.$route.query.index
					this.valueT=this.$route.query.s
					this.getAllgoods(this.valueT)//商品
					this.addText=false
					this.clickGoods(this.id,this.numIndex)
					this.getGoodsInfo(this.id)

				}else{
					
					this.getAllgoods(this.valueT)//商品
					this.addGoodsInfo()
				}
		},
		destroyed() {
	　　// 将editor进行销毁
	// 　　this.editor.destroy();
	     }

	}
</script>
<style scoped>

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
.lanrenLeft{
	position: absolute;
    text-align: center;
    top: 0px;
    right: 0px;
	width: 0;
	z-index:9;
    height: 0;
    border-top:50px solid #d53c39;
    border-left:50px solid transparent;
}
.lanrenLeft span{
	width: 45px;
    height: 23px;
    color: #fff;
    display: block;
    position: relative;
    z-index: 9;
    top: -41px;
    right: 42px;
    font-size: 12px;
    font-weight: 100;
    transform: rotate(46deg);
}

/*详情状态*/
.bgd11{
 border-top: 80px solid #40ca98!important;
}
.bgd2{
 border-top: 80px solid #d53C39!important;
}
/*列表状态*/
.bgd3{
 border-top: 50px solid #40ca98;
}
.bgd4{
 border-top: 50px solid #d53C39;
}
	.main{
		width:100%;
		height:100%;
		background: #fff;
		display: flex;
		background: rgb(230,233,236);
		overflow: hidden;
	}
	.top{

		height:60px;
		line-height: 60px;
		border-bottom: 1px solid #eee;
		width:100%;
		background: #fff;

	}
.tot{
    position:fixed;
    bottom:10px;
    left:15%;
    z-index:12;
}
.changebutton span{
	text-align: left
}
	.wldw{
		margin-left:10px;
	}
	.left-bottom{
		border-bottom:1px solid #eee;

		padding: 10px;
		position:relative;
	}
	.left-bottom p{
		padding:4px;
		margin:8px;
	}
	.page-box{
		margin:5px 0 0 5px;
	}
	.list-box {
		display:flex;
		margin:10px 0;
	}
	.ishot{
		width:200%;
		display: flex;
		justify-content: space-around;
	}
 .left-top{
    	display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    -ms-flex: 0 0 360px;
    width: 100%;
    /* flex: 0 0 360px; */
    border-bottom: 1px solid #eee;

    }
    .right-top{
    	display:flex;
    	justify-content: space-between;
    	height:60px;
    	line-height: 60px;
    	background-color: #fff;
    	border-bottom: 1px solid #eee;

    }
.goodsName{
	width:500px;
    margin-left: 20px;
    font-weight: 600;
    font-size: 19px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    white-space: nowrap;
}
    .top-btn{
		margin-right: 10px;
		width: 300px;
		flex: 0 0 300px;
		text-align: right;
		position:absolute;
		right:15px
    }
    .top-left-btn{
		background: #3B77E3;
	    margin-right: 10px;
	    color: #fff;
	    border: none;
	    width: 26px;
	    height: 26px;
	    border-radius: 26px;
	    display: inline-block;
	    position: relative;
	    top: 12px;
	}
	.top-left-btn1{
		background: #FF7D16;
	}
	.top-left-btn:hover{
		cursor:pointer;
	}
    .left{

    	height:100%;

    	flex:1 0 360px;
    	width:360px;
    	border-right:1px solid #eee;
    	background:#fff;
    }
	.right,.detail-bottom{
	height: 100%;
    overflow: scroll;
    /*margin-left: 28%;*/
    /*position: fixed;*/


	}
	.mainImgin{
		display: flex;
		flex-direction: column;
		justify-content: center;align-items: center;
	}
	.detail-bottom{
		/*margin-top:20px;*/
	}
	.detail-title-mark{
		display:flex;
        width:100%;
        justify-content: flex-start;
        border-bottom:1px solid #eee;
        margin-bottom:10px;
        background: #fff;
		padding-top:10px;
	}
	.detail-title-mark1{
		display: flex;
	    width: 100%;
	    /*margin-left: 28.5%;*/
	    -ms-flex-pack: start;
	    justify-content: flex-start;
	    border-bottom: 1px solid #eee;
	    margin-bottom: 10px;
	    background: #fff;
	    padding-top:10px;
	}
	.detail-title{
		padding:10px 25px;

	}
	.detail-title:hover{
		cursor:pointer;
	}
	.detail-public{
		width:100%;
		/*margin-top:60px;*/
		padding:10px;
		margin-bottom: 250px;
	}
	.con-list {
		display:flex;
		align-items: center;
		width: 100%;
		word-wrap:break-word;

		border-bottom: solid 1px #E6E6E6;
		padding: 15px 25px;

		cursor: pointer;
		position:relative;
	}
	.con-list1 {
		display:flex;
		align-items: center;
		width: 100%;
		word-wrap:break-word;
		padding: 15px 25px;
		cursor: pointer;
		position:relative;
	}
	.issing{
		display: inline-block;
		margin-right:10px;
	}
	.listname{
		width:135px;
	}
	.con-list:hover{
		cursor:pointer;
	}
	.con-list .date{
		position:absolute;
		right:5px;
		top:60px;
	}
	.con-list .date1{
		position:absolute;
		right:70px;
		top:60px;
	}
	.con-list .status{
		width:100px;

		text-align: center;
		position: absolute;
	    right: 0px;
	    top: 65px;
	}
	.con-list .list-title {
		width:100px;
		color: #0d0d0d;
		font-size: 14px;
		margin-bottom: 20px;
		width: 200px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	div.con-list:last-child{
		margin-bottom:300px;
	}
	.show-table li{
		display: flex;
	    height: 40px;
	    line-height: 40px;
	    border: 1px solid #ccc;
	    border-top:none;
	    justify-content: space-around;
	}
	.show-table li:first-child{
		border-top:1px solid #ccc;
	}
	.list-attr1{
		width: 100%;
		display:flex;
		justify-content: space-around;
	}
	.list-attr1 span:first-child{
		display:inline-block;
		width:100px;

		border-right:1px solid #ccc;
	}
	div.list-attr{
		width: 100px;

		border-right: 1px solid #ccc;
	}
	 .attrname{
		width: 100px;
    	text-align: center;
    	overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.bor{
		border-bottom:2px solid #086CA2;
	}
	.mainIbg{
		width:170px;
		height:170px;
		margin-left:5px;
		margin-top: 5px;
		padding:2px;
		background: url("http://img.zsydian.com/icon/goodsBg.png") no-repeat center;
		background-size: cover;
	}
	.mainIbg img,.subImg{
		width:100%;
		height:100%;
		/*border: 1px solid #e4e4e4;*/
		box-shadow: 0 0 2px #e4e4e4;
    	padding: 1px;

	}
	.left-img{
    margin-right: 10px;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	overflow: hidden;
	/* margin-bottom: -8px; */
	display: block;

	line-height: 95px;
	text-align: center;
}
.left-img img{
	width:100%;
	height:100%;
}


.con-list .txt {
    color: #585858;
    font-size: 12px;
    width: 135px;
    position: absolute;
    top: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

	.right-top button:hover{
		border-color: #478FCA;
		color:#478FCA;
		cursor:pointer;
	}
	.right-top button img{
		position:relative;
		left:0px;
		top:-2px;
		vertical-align: middle
	}
	.right-bottom ul{
		border-bottom:2px solid #086CA2;
		width:100%;
	}
	.right-bottom{
		margin-top:10px;
		/*padding:0 10px;*/
	}
	.left-bottom:hover{
		cursor:pointer;
	}
	.right-bottom .lis li{
		width:80px;
		height:30px;
		line-height: 30px;
		display: inline-block;
		margin-right: 10px;
		text-align: center;
		border-top-left-radius:6px;
		border-top-right-radius:6px;
		cursor: pointer;
		background: #eee;
	}

	 .add-header{
    	width: 100%;
    	height: 60px;
    	z-index: 9;

    	background: #ffffff;

        /*display: flex;
        justify-content: space-between;*/
        position: fixed;
    }
    .cheng{
    	width: 100%;
    	height: 60px;
    	/*margin-top: 10px;*/
    }
	.btnact {
		background: #086ca2 !important;
		color: #fff !important;
	}
	/***正常的样式***/

	.normal {
		background: #d9dbdc !important;
		color: #585858 !important;
	}
	.right-bottom-list{
		margin:10px;
		flex-direction: column;
	}
	.right-bottom-list li{
		text-align: right;
		line-height: 40px
	}
	.right-bottom-list span{
		margin-right:10px;
	}
	.addbox{
		position:relative;
	}
	.attrNum{
		display:inline-block;
		height:35px;
		line-height: 35px;
		margin:10px 0 10px 48px;
	}
	.attrNum span{
		width:100px;
	}
	.commnetLi{
		display: flex;
	}
	.commnetLi .commnetLispan{
		width:80px;
		flex:0 0 80px;
		text-align: right
	}
	.shi{
	    width: 200px;
	    height: 200px;
	    /*background:url(../../../assets/add.png) no-repeat center;*/
	    background-size: 40%;
	    text-align: center;
	    line-height: 200px;
	    font-size: 80px;
	    font-weight:400;
	    border:1px dotted #ccc;
	}
	.addbrand{
		position: absolute;
	    width: 100px;
	    text-align: center;
	    left: 28%;
	    bottom: 30px;
	    font-size:16px;
	    transform: translate(-50px,0);
	}
	.subimg{
		display:inline-block;
	}
	.subimg img{
		display: block;
		border:1px solid #ccc;
		margin-top:6px;

	}
	.textbg3{
		color:#d53c39;
	}
	.textbg1{
		color:#40ca98;
	}
	.yunfei{
		display:flex;
		width:100%;
		height:32px;
		line-height: 32px;

	}
	.yunfei-one-div img{
		vertical-align: middle;
		margin:0 4px 4px 0;
	}
	.yunfei div{
		display:inline-block;
	}

	.yunfei input{
		display:inline-block;
		width:60px;
		height:32px;

	}
	.unitInfo{
		border: 1px solid #e4e4e4;
   	 	padding: 10px;
    	background: rgb(245, 245, 245);
    	margin-bottom:20px;
	}
	.moneyicon{
		display:inline-block;
		height:32px;
		width:30px;
		background: #EEEEEE;
		line-height: 32px;
		font-weight:900;
		color:#000;
		text-align: center;
		border-top-left-radius:6px;
		border-bottom-left-radius:6px;
	}
	li{
		list-style: none
	}
	.li li span{
		text-align: center;

	}
	.bg{
		background: #dbe5f1
	}
	.dingshi{
		margin-top:20px;
	}
	.xiangou span{
		display:block;
		width:100px;
	}
	.xiangou{
		display:flex;
		height:30px;
		line-height: 30px;
		margin-top:20px;
	}
  .lanren {
    position: absolute;
    text-align: center;
    top: -25px;
    right: -6px;
    width: 0;
    height: 0;
    z-index:0;
    border-top: 80px solid #d53c39;
    border-left: 80px solid transparent;
}
.lanren span{
    width: 60px;
    height: 60px;
    color: #fff;
    display: block;
    position: relative;

    top: -70px;
    right: 70px;
    font-size: 16px;
    font-weight: 900;
    transform: rotate(46deg);
}
 	.detail-top{

    }

    .detail-top ul.cgtable1{
    	margin-bottom: 20px
    }
    .detail-top ul li{
    	display:inline-block;
    	width:150px;
    	/*border:1px solid red;*/
    	margin:0px 10px;
    	overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
    }
    .detail-top ul.cgtable li{
    	color:#2B8F8F;
    	margin:5px 10px;
    	font-weight:600;
    }
.addAttrs{
	width:100%;
	display: flex;
	justify-content: space-between;
	height:70px;
	overflow-y: scroll;
	padding:25px;
	border:1px solid #eee;
	margin-bottom:10px;

}
.addAttrs>div{
	display: flex
}
.addAttrs li{
	margin:0 10px;
}
.addAttrs li:hover{
	cursor:pointer;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    position:relative;
  }
  .mainingMark{
  	position:absolute;
  	top:0;
  	left:0;
  	height:100%;
  	width: 100%;
  	background:#ccc;
  	opacity:.5;
  	z-index:3;
  }
  .mainImg{
  	width:190px;
  	height:190px;
  }
  .right-left{
	width: 240px;
    margin-top: 26px;
	border:1px dashed #e1e1e1;
}
.comment-main{
	width:100%;

	margin-right:20px;
}
.commnet{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:10px;
	border-bottom:1px solid #e4e4e4;
}
.comment-c{
	
}
.comment-time{
	margin-top:10px;
}
.comment-img{
	margin:10px 5px;
}
.commnet-right{
	display: flex;
	flex:0 0 300px;
}
.comment-user{
	padding:0 20px;
	display: flex;
	text-align: center;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.comment-user .crmName{
	width:100px;
	display: block;
	text-align: center;
}
.upskutext{
	text-align: center;
	margin:10px 0 0 -10px;
}
.title{
    	display:flex;justify-content: space-between;
    }
    .title:hover{
    	cursor:pointer;
    }
    .model-main{
    	width: 100%;
    	padding:10px;
    }
   .detail-top{
    	position:relative;
    	display: flex;
    	flex-direction: column;
    }
.blackinfo li{
      list-style: none;
      margin:15px 0;
      display: flex;

    }
    .blackinfo{
      margin-right:30px;
      width:33%;
    }
    .detail-top h3{
		width:500px;
		overflow: hidden;
	    text-overflow: ellipsis;
	    display: block;
	    white-space: nowrap;
	    margin-left:20px;
    }
    .detail-top li span.info{
      width:67%;
    }
    .detail-top li span.blackinfo-left{

    color: #2B8F8F;
    /* margin: 0px 10px; */
    font-weight: 600;
    width: 78px;
   text-align: right;
    margin-left:-10px;
    }
.dialog-checkBox{
	display: flex;
    width: 100%;
}
.gg-border{
	width:100%;
	height:50px;
	line-height: 50px;
	border:1px solid #ccc;
	width:100%;
	margin-bottom:20px;
}
.gg-border span{
	display:inline-block;
}
.gg-border span.first{
	height:50px;

	width:85px;
	text-align: center;
	border-right:1px solid #ccc;
	font-weight:600;
}
.gg-border span.two span{
	margin-left:10px;
}
.gg-border span.three{
	width:80px;
	text-align: center;
	border-left:1px solid #ccc;
	float:right;
	cursor:pointer;
	color:#3B77E3;
}
.nobordertop{
	border-color:red;
}
.gg-border1{
        align-items: center;
    border: 1px solid #ccc;
    width: 100%;
    margin: 2px 0;
    display: flex;
    justify-content: space-between;
}
.gg-border1 span{
	display:inline-block;
}
.gg-border1 span.first{
	width: 85px;
	flex:0 0 85px;
    text-align: center;

    font-weight: 600;

}
.gg-border1 span.two span{
	margin-left:10px;
}
.gg-border1 span.three{
	width:80px;
	flex:0 0 80px;
	text-align: center;


	cursor:pointer;
	color:#3B77E3;
}

</style>
<style>
.ivu-tree-title{
	font-size:14px
}
</style>


