import {createApp} from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import Particles from "@tsparticles/vue3";
import {loadFull} from "tsparticles";
import VueGtag from "vue-gtag";
import {initializeApp} from 'firebase/app'
import {VueFire, VueFireAuth} from "vuefire";
import { GoogleAuthProvider } from 'firebase/auth'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyBGlPfTQpNVpMS3Nu_mpSiEOwIXXE-PE74",
    authDomain: "gemini-movie-detectives.firebaseapp.com",
    projectId: "gemini-movie-detectives",
    storageBucket: "gemini-movie-detectives.appspot.com",
    messagingSenderId: "1041770080046",
    appId: "1:1041770080046:web:b66df3eea3a6421109bcbf"
})

export const googleAuthProvider = new GoogleAuthProvider()

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
}, router).use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth()
    ]
}).mount('#app')
