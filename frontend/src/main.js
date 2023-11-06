import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import VueTheMask from 'vue-the-mask'
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faPhone, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import './config/axios'

library.add(faCalendarCheck, faPhone)

createApp(App)
    .component("fa", FontAwesomeIcon)
    .use(router)
    .use(VueTheMask)
    .mount('#app')

