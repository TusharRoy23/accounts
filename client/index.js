import Vue from 'vue';
import router from './router';
import store from './store';
import Validator from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';

// import Main from './pages/Main.vue';
const Main = () => import('./pages/Main.vue');

const TextInput = () => import('@components/TextInput.vue');
const Loader = () => import('@components/Loader.vue');
const Button = () => import('@components/Button.vue');

import authMixin from '@client/mixins/auth';
import various from '@client/mixins/various';

Vue.use(Validator);
Vue.use(store);
Vue.use(BootstrapVue);
Vue.component('form-input', TextInput);
Vue.component('loader', Loader);
Vue.component('btn', Button);

Vue.mixin(authMixin);
Vue.mixin(various);

const app = new Vue({
    el: "#app",
    router,
    store,
    render: h => h(Main)
});