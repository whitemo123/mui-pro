import { createApp } from 'vue'

import global from './global'

import App from './App.vue'

const app = createApp(App)
app.use(global)
app.mount('#app')
