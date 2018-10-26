<template>
  <div id="investigate">
    <div class="investigate_head">
     <p class="wldw">
        <span style="width:42px;font-weight:900">调拨：</span>
         <Select style="width:100px" v-model="valueT" placeholder="全部" @on-change="orderselected">
              <Option v-for="item in orderListname" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
      </p>
      <div class="btn" style='margin-right:20px'>
        <Button type="primary" style='background:#3b77e3' shape="circle" @click="add"><Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>新建</Button>
        <!-- 更多-->
        <Dropdown trigger="click" style="margin-left: 4px" v-if="isdel">
              <Button shape="circle" type="ghost" style="background:#ff7d16;color:#fff;border:none">更多
              <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
          </Button>

          <DropdownMenu slot="list">
              <span  @click="delcg" ><DropdownItem >删除</DropdownItem></span>
          </DropdownMenu>
       </Dropdown>
      </div>
    </div>
    <!--表格数据-->
    <div class="table">
        <Table  border ref="selection" highlight-row :columns="columns" :data="Alldata" @on-row-dblclick="dbl" @on-row-click="selected"></Table>
         <!--底部的分页-->
      <div class="page-box">
         <Page :total="total" show-sizer :page-size-opts="[10,20,30,40,50]" size='small' placement='top' show-total  :pageSize='pageSize'  @on-change="getData" @on-page-size-change="changePageSize"></Page>
      </div>
    </div>
   
  </div>
</template>
<script>
export default{
      data(){
        return {
          isdel:true,
          valId:'',//每一条id
          pageSize:0,
          total:0,
          valueT:0,
          orderListname:[
          {
            label:"全部",
            value:0
          },
          {
            label:"未提交",
            value:1
          },
          {
            label:"未签收",
            value:15
          },
          {
            label:"签收中",
            value:77
          },
          {
            label:"已完成",
            value:88
          },
         
        ],
          columns: [
            {
              title: '单号',

              width:140,
              key: 'recordNo'
            },
            
            {
              title: '来源仓/店',
              key: 'fromWarehouseName',
 
              align: 'center'
            },
            {
              title: '目的仓/店',
              key: 'toWarehouseName',
     
          
            },
            {
              title: '总数量',
              key: 'totalQty',

            },
            {
              title: '实际数量',
              key: 'signQty',

            },
           
            {
              title: '调拨人',
              key: 'initiator',

            },
             {
              title: '单据日期',
              key: 'recordDate',
        
              align: 'center'
            },
            {
              title: '到货时间',
              key: 'expectDeliveryDate',
 
            },
            {
              title: '状态',
              key: 'statusDesc',

              width:100,
              render:(h,params)=>{
              return h('div',{
                style:{
                    color:params.row.status==77?'#40ca98':params.row.status==0?'#278fa3':params.row.status==1?'#3b77e3':params.row.status==88?'#40ca98':params.row.status==15?'#d53c39':''
                  }
                },params.row.statusDesc)
              }
            },
          

          ],
          Alldata: [],
          uid: this.$store.state.common.token,
        }
      },
      methods: {
        handleSelectAll (status) {
          this.$refs.selection.selectAll(status);
        },
        add(){
            this.$router.push('/skuaddinvestigate')
        },
        //表格选中时的数据，数组
      selected(row){
        console.log(row)
          this.valId = row.id
          if(row.status==88){
            this.isdel=false
          }else{
            this.isdel=true
          }
        },
        //点击删除DELETE /mtransfer/delete/{id} 删除
      delcg() {
        console.log(this.valId)
          this.axios.delete('transfer/delete/' + this.valId + '?uid=' + this.uid).then((res) => {

            if(res.data.status == '200') {
               this.$notify({
                  title:"",//
                  message: this.$t('public.deleteSuccess'),//
                  type: 'success',
                  position: 'bottom-right'
              });
               this.getcgList();
               this.valId=''
            }else{
              
             this.$notify({
                  title:"",//
                  message: res.data.errorMessage,
                  type: 'error',
                  position: 'bottom-right'
              });
            }
          })
        },
        //双击表格一行
        dbl(row,index){
          this.isLoading = true
          this.$router.push({
            path:'/addinvestigate',
            query:{
              id:row.id,
              index:index
            }
          })
        },
         //切换一条页
              getData(current){
                  this.axios.get('/transfer/query?offset='+current+'&uid='+this.uid+"&status="+this.valueT).then((res)=>{
                     console.log(res.data.rows)
                      this.Alldata = res.data.rows
                      this.total=res.data.total
                      this.pageSize=res.data.pageSize
                      this.Alldata.forEach((x,index)=>{
                        x.recordDate=new Date(x.recordDate).toLocaleDateString().replace(/\//g,'-')
                        if(x.expectDeliveryDate===undefined){
                          x.expectDeliveryDate='未指定'
                          console.log( x.expectDeliveryDate)
                         }else{
                           x.expectDeliveryDate=new Date(x.expectDeliveryDate).toLocaleDateString().replace(/\//g,'-')
                         }
                       switch(x.status){
                        
                        case 88:
                          x.statusDesc='签收完成'
                        break;
                      }
                })
            })
        },
            //翻页
            changePageSize(size){
                this.pageSize = size
                this.axios.get('/transfer/query?length='+size+'&uid='+this.uid+"&status="+this.valueT).then((res)=>{
                     console.log(res.data.rows)
                      this.Alldata = res.data.rows
                      this.total=res.data.total
                      this.pageSize=res.data.pageSize
                      this.Alldata.forEach((x,index)=>{
                        x.recordDate=new Date(x.recordDate).toLocaleDateString().replace(/\//g,'-')
                        if(x.expectDeliveryDate===undefined){
                          x.expectDeliveryDate='未指定'
                          console.log( x.expectDeliveryDate)
                         }else{
                           x.expectDeliveryDate=new Date(x.expectDeliveryDate).toLocaleDateString().replace(/\//g,'-')
                         }
                       switch(x.status){
                        
                        case 88:
                          x.statusDesc='签收完成'
                        break;
                      }
                })
            })
            },
        //获取调拨列表
        getDataList(){
            this.axios({
              methods:'get',
              url:'transfer/query?uid='+this.uid
            }).then((res)=>{
                if(res.data.status==200){
             
                   this.Alldata = res.data.rows

                  this.pageSize = res.data.pageSize;
                  this.total = res.data.total;
                 
                  this.Alldata.forEach((x,index)=>{
                    console.log(x.expectDeliveryDate)
                     if(x.expectDeliveryDate==undefined){
                      x.expectDeliveryDate='未指定'
                     }else{
                       x.expectDeliveryDate=new Date(x.expectDeliveryDate).toLocaleDateString().replace(/\//g,'-')
                     }
                     x.recordDate=new Date(x.recordDate).toLocaleDateString().replace(/\//g,'-')
                    switch(x.status){
                      case 88:
                        x.statusDesc='签收完成'
                      break;
                    }
                  })
                }

            })

        },
        //下拉框选择
      orderselected(s){
        this.axios.get('transfer/query?uid=' + this.uid+'&status='+s).then((res) => {
          if(res.data.status == '200') {
            //console.log(this.value)
            let data = res.data
            this.Alldata = data.rows;
            this.total=res.data.total
            this.pageSize=res.data.pageSize
            this.isLoading = false
             this.Alldata.forEach((x,index)=>{
                    console.log(x.expectDeliveryDate)
                     if(x.expectDeliveryDate==undefined){
                      x.expectDeliveryDate='未指定'
                     }else{
                       x.expectDeliveryDate=new Date(x.expectDeliveryDate).toLocaleDateString().replace(/\//g,'-')
                     }
                     x.recordDate=new Date(x.recordDate).toLocaleDateString().replace(/\//g,'-')
                    switch(x.status){
                      case 88:
                        x.statusDesc='签收完成'
                      break;
                    }
                  })
            
          }
        })
      },
      },
      mounted(){
        this.$nextTick(function () {

          this.getDataList()
        })

      }

}
</script>
<style lang="scss" scoped>
#investigate{
  .investigate_head{
    display:flex;
    justify-content: space-between;
    width:100%;
    height: 50px;
    line-height:50px;
    .wldw {
     margin-left:10px;
      
    }
    .btn{
     
      margin-right:10px;
    }
  }
  .table {
    margin:0 10px
   
  }
  .page-box{
    text-align:center;
    margin-top:5px;
    margin-bottom:120px;
  }

}
</style>
