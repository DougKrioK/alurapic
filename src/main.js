import Vue from 'vue'
import App from './App.vue'
import './directives/Transform';

import VeeValidate, { Validator } from 'vee-validate';
import msg from './plugins/vee-validate/pt_BR.js';

Validator.addLocale(msg);
Vue.use(VeeValidate, {
  locale: 'pt_BR'
});

// ajax
//import VueResource from 'vue-resource';
//Vue.use(VueResource);
// removi por recomendação do Vinicius,  usar vue axios
//import axios from 'axios';
//Vue.use(axios);

// rotas
import VueRouter from 'vue-router';
import { routes } from './routes';

/**
* $http plugin based on axios
*/
import httpPlugin from './plugins/http/Axios'

/**
* Make $http avaible to all components
* Send store and router to httpPlugin (injection)
*/
Vue.use(httpPlugin)




Vue.use(VueRouter);

const router = new VueRouter({ 
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
  
})
