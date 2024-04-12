import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

createApp(App).use(router).use(Particles, {
    init: async engine => {
        await loadFull(engine);
    },
}).mount('#app')
