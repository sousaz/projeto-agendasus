import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import VueTheMask from 'vue-the-mask'
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCalendarCheck, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import './config/axios'
import store from './config/store'

library.add(faCalendarCheck, faXmarkCircle)

createApp(App)
    .component("fa", FontAwesomeIcon)
    .use(router)
    .use(store)
    .use(VueTheMask)
    .mount('#app')

