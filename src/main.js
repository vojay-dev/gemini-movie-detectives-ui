import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles";
import VueGtag from "vue-gtag";

createApp(App).use(router).use(Particles, {
    init: async engine => {
        await loadFull(engine);
    },
}).use(VueGtag, {
    config: {
        id: "G-C3F9PD7XWL",
        params: {
            anonymize_ip: true
        }
    }
}, router).mount('#app')
