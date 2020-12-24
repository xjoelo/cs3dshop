require('./bootstrap');

window.Vue = require('vue');

Vue.component('SProducto', require('./components/productos/productos.vue').default);
Vue.component('SUsuario', require('./components/usuarios/usuarios.vue').default);

Vue.component('pagination', require('laravel-vue-pagination'));

const app = new Vue({
    el: '#app',
});
