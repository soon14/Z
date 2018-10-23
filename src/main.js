import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import axios from './api/http'
import router from './router/index'
import store from './store/index'

//canvas
import VueParticles from 'vue-particles'  
Vue.use(VueParticles)

//baidu
import ECharts from 'vue2-echarts/src/ECharts/ECharts.vue'
require('echarts/theme/shine');//个性化设置
require('echarts/map/js/china.js');
Vue.component('chart', ECharts);
//International
import VueI18n from 'vue-i18n'
import en from './components/common/en'
import zh from './components/common/zh'
let lang='zh'
//判断浏览器所用语言
let language = navigator.browserLanguage?navigator.browserLanguage:navigator.language;
if(language=="zh-CN"){
  if(sessionStorage.local){
    lang=sessionStorage.local
  }else{
    lang='zh'
  }
}else{
  lang='en'
}
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale:lang,    // 语言标识
    messages: {
      'zh':zh,   // 中文语言包
      'en':en // 英文语言包
    }
})
//引入百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'BBe8b008fb274f9544aa96828ac8c10e'
  // ak:'l0I6Y4dBBPKe3rPLfWWMun1pRgbESfeR'
})
import {Collapse,Dialog,CollapseItem,Steps,Step,Cascader,Notification,Upload} from 'element-ui'
Vue.use(Steps)
Vue.use(Step)
Vue.use(Dialog)
Vue.use(Cascader)
Vue.use(Upload)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.prototype.$notify = Notification;//通知组件不能使用use,否则初始化会出现一次弹框
//iview组件导入
// require('./components/iviewPublic') 
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

require('muse-ui/lib/styles/base.less') ;
import {FormM,ButtonM,pagination,DateInput,RadioM,Checkbox,SelectM,Popover,AppBar,Avatar,List,IconM,Paper,TextField} from 'muse-ui';
require('muse-ui/lib/styles/theme.less');
Vue.use(FormM);
Vue.use(pagination);

Vue.use(SelectM);
Vue.use(ButtonM);
Vue.use(Popover);
Vue.use(List);
Vue.use(IconM);
Vue.use(AppBar);
Vue.use(Avatar);
Vue.use(Paper);
Vue.use(TextField);
Vue.use(DateInput);
Vue.use(RadioM);
Vue.use(Checkbox);


// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;
//年月日 2018-12-15 时分秒
import {getLocalTime,getLocalTimeH} from './components/getLocalTime'
Vue.prototype.getLocalTime=getLocalTime
Vue.prototype.getLocalTimeH=getLocalTimeH

//接口地址
import {Crm,Management,Store,Purchase,Sales,Operation,Order,Inventory,Finance,Data,Zhb} from './config/Prefix'
Vue.prototype.prefixManagement=Management//管理
Vue.prototype.prefixStore= Store//门店
Vue.prototype.prefixPurchase=Purchase//采购
Vue.prototype.prefixSales=Sales//销售
Vue.prototype.prefixCrm=Crm//会员
Vue.prototype.prefixOperation=Operation//运营
Vue.prototype.prefixOrder=Order//订单
Vue.prototype.prefixInventory=Inventory//库存
Vue.prototype.prefixFinance=Finance//财务
Vue.prototype.prefixData=Data//数据
Vue.prototype.prefixZhb=Zhb//长护宝

//当前日期之前都无法选择
Vue.prototype.optionsB={
  disabledDate (date) {
          return date.getTime() < (new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())).getTime();
      } 
}
//生日(最小18岁)
Vue.prototype.optionsBirthday={
   disabledDate (date) {
          return date.getTime() > (new Date(new Date().getFullYear()-18,0,0)).getTime();
      }
}
new Vue({
  el: '#app',
  i18n,  // vue-i18n不要忘记
  router,
  axios,
  store,
  render: h => h(App),
  components: { App }

})
