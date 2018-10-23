import Vue from 'vue'
import 'iview/dist/styles/iview.css'

import {
  Button,
  ButtonGroup,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  Checkbox,
  CheckboxGroup,
  Circle,
  Col,
  Collapse,
  ColorPicker,
  Content,
  DatePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Icon,
  Input,
  InputNumber,
  Scroll,
  MenuItem,
  Message,
  Modal,
  Notice,
  Option,
  OptionGroup,
  Page,
  Panel,
  Badge,
  Progress,
  Radio,
  RadioGroup,
  Row,
  Select,
  Spin,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tooltip,
  TabPane,
  Tree,
} from 'iview'
const iviewModule = {
  Button:Button,
  ButtonGroup:ButtonGroup,
  Card:Card,
  Carousel:Carousel,
  CarouselItem:CarouselItem,
  Cascader:Cascader,
  Checkbox:Checkbox,
  CheckboxGroup:CheckboxGroup,
  Col:Col,
  Collapse:Collapse,
  ColorPicker:ColorPicker,
  Content:Content,
  DatePicker:DatePicker,
  Dropdown:Dropdown,
  DropdownItem:DropdownItem,
  DropdownMenu:DropdownMenu,
  Form:Form,
  FormItem:FormItem,
  Icon:Icon,
  Input:Input,
  InputNumber:InputNumber,
  Scroll:Scroll,
  MenuItem:MenuItem,
  Message:Message,
  Modal:Modal,
  Notice:Notice,
  Option:Option,
  OptionGroup:OptionGroup,
  Page:Page,
  Badge:Badge,
  Panel:Panel,
  Progress:Progress,
  Radio:Radio,
  RadioGroup:RadioGroup,
  Row:Row,
  Select:Select,
  Spin:Spin,
  TabPane:TabPane,
  Table:Table,
  Tabs:Tabs,
  Tag:Tag,
  TimePicker:TimePicker,
  Tooltip:Tooltip,
  Tree:Tree,
  // 不能和html标签重复的组件，添加别名(除了Switch、Circle在使用中必须是iSwitch、iCircle,其他都可以不加"i")
  iButton: Button,
  iCircle: Circle,
  iCol: Col,
  iContent: Content,
  iForm: Form,
  iInput: Input,
  iOption: Option,
 
  iSelect: Select,
  iSwitch: Switch,
  iTable: Table
}
Vue.prototype.$Modal = Modal;//通知组件不能使用use,否则初始化会出现一次弹框
Vue.prototype.$Notice = Notice;//通知组件不能使用use,否则初始化会出现一次弹框
Vue.prototype.$Message = Message;//通知组件不能使用use,否则初始化会出现一次弹框
// 循环注册全局组件
Object.keys(iviewModule).forEach(key => {
  Vue.component(key, iviewModule[key])
})