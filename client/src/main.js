import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPenToSquare,faTrash,faPlus,faEye,faLeftLong} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

library.add(faPenToSquare,faTrash,faPlus,faEye,faLeftLong)

createApp(App).use(router).use(ToastPlugin).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
