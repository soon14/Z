<template>
  <!--往来单位-->
  <div class="units-box">
   
    <!--顶部的按钮-->
    <div class="btns-box">
      <p class="wldw">全部销售
        <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
      </p>
      <div class="right">
        <Button  type="primary" shape="circle" @click="gotoAdd">
           <Icon type="plus-round" style="margin-right:5px;color:#fff"></Icon>增加
        </Button>
        
       
        <!-- 更多-->
         <Poptip v-model="visible" placement="bottom-end">
          <Button type="ghost" shape="circle">
            更多
            <span><i class="ivu-icon ivu-icon-chevron-down"></i></span>
          </Button>
          <div slot="content" @click="del">
            <p class="qp-con">
              <!-- <img src="../../../../static/img/plqy.png" alt="" /> 删除 -->
            </p>
          </div>
        </Poptip>
      </div>
    </div>
    <!--表格数据-->
    <div class="table">
      <Table border ref="selection" height="400" @on-select="selected" :columns="columns" :data="dataList"></Table>
       <!--底部的分页-->
    <div class="page-box">
       <Page :total="total" :pageSize='pageSize' show-total  @on-change="getData" @on-page-size-change="changePageSize"></Page>
    </div>
    </div>


  </div>
</template>

<script>

  export default {
   
    data() {
      return {
        visible: false,
        dataList: [], //销售列表
        total: 1,
        x:"ddddd",
        pageSize: 1,
        valId:"",
        sellingId:'',
        uid: this.$store.state.common.token,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title:"单号",
            key:"recordNo"
          },
          {
            title:"客户名称",
            key:"partnerName"
          },
          {
            title:"收货方名称",
            key:"deliverName"
          },
          {
            title:"已经发运数量",
            key:"deliveryQty"
          },
          {
            title:"发票号码",
            key:"invoiceNo"
          },
          {
            title:"总货值",
            key:"totalAmount"
          },
          {
            title:"总数量",
            key:"totalQty"
          },
          {
            title:"物流公司",
            key:"logistics"
          },
          {
            title:"物流编号",
            key:"logisticsNo"
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', [

                // h('a', {
                //   style: {
                //     display:"inline-block"
                //   },
                //   on: {
                //     click: () => {
                //       this.gotoEdit(params.row);
                //     }
                //   }
                // }, '编辑'),
                h('div', {
                  style: {
                    display:"inline-block",
                    padding:"0 5px",
                    color:"#00A8FF"

                  }

                }, '|'),
                h('a', {
                  style: {
                    display:"inline-block"
                  },
                  on: {
                    click: () => {
                      console.log(params)

                    }
                  },
                }, '更多')
              ]);
            }
          }
        ]

      }
    },
    methods: {
      //关闭批处理气泡提示框
      close: function() {
        this.visible = false;
      },
      //点击增加  跳转到 增加新增销售页面
      gotoAdd: function() {
        this.$router.push({
          path: '/addSelling'
        });
      },
      //获取销售列表
      getcgList: function() {
        this.axios.get('/so/query?uid=' + this.uid).then((res) => {
          let data = res.data;
          console.log(data.rows)
          if(res.data.status == '200') {
            this.dataList = data.rows;
            this.dataList.forEach((x)=>{
              x.createTime=new Date(x.createTime).toLocaleDateString()
            })
            
            this.pageSize = data.pageSize;
            this.total = data.total;
          } else {
           this.$Message.error(res.data.errorMessage);
          }
        })
      },
      selected(selection,row){
        this.sellingId = selection.rows.id
      },
      //点击删除
      del: function() {
       this.axios.delete('/so/delete/' + this.sellingId + '?uid=' + this.uid).then((res) => {

         if(res.data.status == '200') {

           this.$Notice.success({
            title:"",//
             desc: '删除成功'
           });
            this.getcgList();
         }
       })
      },

       //切换一条页
            getData(current){
                this.axios.get('/po/query?offset='+current+'&uid='+this.uid).then((res)=>{
                    //console.log(res)
                    this.dataList = res.data.rows
                })
            },
            //翻页
            changePageSize(size){
                this.pageSize = size
            }
    },
    mounted() {
      this.getcgList();
      
    }
  }
</script>

<style lang="css" scoped>
  .units-box {
    width: 100%;
    height: auto;
    background: #fff;
  }

  .search-box {
    width: 300px;
    height: auto;
    position: fixed;
    top: 15px;
    left: 250px;
    z-index: 9999;
  }

  .search-box .add {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #00a8ff;
    line-height: 28px;
    text-align: center;
    color: #fff;
    font-size: 22px;
    float: left;
    margin-right: 10px;
  }

  .btns-box {
    width: 100%;
    height: 40px;
    display:flex;
    justify-content: space-between;

    line-height: 40px;
    padding: 0 20px;
  }
  .btns-box .btns{
    cursor:default;
  }
  .wldw {
    font-size: 14px;
    color: #585858;
    float: left;
    width: 100px;
    float: left;
  }

  .ivu-icon-chevron-down {
    font-size: 10px;
  }

  .btns {
    float: left;
    width: auto;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    color: #0d0d0d;
    padding: 0 12px;
    border: 1px solid #ececec;
    border-radius: 6px;
    margin-left: 12px;
  }

  .btns img {
    width: 14px;
    height: 14px;
    vertical-align: middle;
  }

  .table {
    width: 100%;
    height: auto;
    margin-top: 10px;
  }

  .page-box {
    text-align: center;
    margin:20px;
  }
  /***气泡提示样式设置***/

  .qp-con {
    width: 100%;
    height: 30px;
    color: #0d0d0d;
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
  }

  .qp-con img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
</style>
