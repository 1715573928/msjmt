// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import'mint-ui/lib/style.css'
Vue.config.productionTip = false

//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'



// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'
//1.引入header组件
import {Header,Button,} from 'mint-ui'
import {Swipe,SwipeItem} from "mint-ui"
import { Search } from 'mint-ui';
import { Lazyload } from 'mint-ui';
import { Popup } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui'; 

Vue.use(InfiniteScroll);
Vue.component(Popup.name, Popup);
Vue.use(Lazyload);
//2.注册header组件
Vue.component(Search.name, Search);
Vue.component(Header.name,Header);
Vue.component(Button.name,Button);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
//3.引入axios模块
import axios from "axios"
import qs from 'qs'
Vue.prototype.qs=qs
//4.配置跨域访问保存session值选项
axios.defaults.withCredentials=true;
//5.在main.js将axios配置vue实例中
Vue.prototype.axios=axios
//6.创建日期格式过滤器 main.js

Vue.filter("datatimeFilter",function(val){
  //依据原始日期格式创建日期对象
  var now=new Date(val);

  //获取日期对象 年月日
  var y=now.getFullYear();
  var m=now.getMonth();
  var d=now.getDate();
  //获取日期对象 时分秒
  var h=now.getHours();
  var mi=now.getMinutes();
  var s=now.getSeconds(); 
  //月份与日期 如果当前月份小于10前拼接0
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  //拼接字符串返回
  return `${y}年${m}月${d}日`;
})
Vue.filter("datatime",function(val){
  //依据原始日期格式创建日期对象
  var now=new Date(val);

  //获取日期对象 年月日
  var y=now.getFullYear();
  var m=now.getMonth();
  var d=now.getDate();
  //获取日期对象 时分秒
  var h=now.getHours();
  var mi=now.getMinutes();
  var s=now.getSeconds(); 
  //月份与日期 如果当前月份小于10前拼接0
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  //拼接字符串返回
  return `${h}:${mi}`;
})
Vue.filter("dianj",function(val){
  //依据原始日期格式创建日期对象
  if(val<9999){
	   return val;
  }
   else{
  	   return Math.round(val/10000)+"w+";
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
