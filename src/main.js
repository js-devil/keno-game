import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

window.Swal = require('sweetalert2')
window.Bus = new Vue({});
// window.Toast = Swal.mixin({
//   toast: true,
//   position: 'top-end',
//   showConfirmButton: false,
//   timer: 3000
// });

new Vue({
  render: h => h(App),
}).$mount('#app')
