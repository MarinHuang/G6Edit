
import Vue from 'vue';
import App from './App';
/*antd*/
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);

/*右键菜单组件*/
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
Vue.use(contentmenu)


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    render: h => h(App),
}).$mount('#app')
