import {createApp} from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import Particles from "@tsparticles/vue3";
import {loadFull} from "tsparticles";
import VueGtag from "vue-gtag";
import {initializeApp} from 'firebase/app'
import {VueFire, VueFireAuth} from 'vuefire'
import {getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect} from 'firebase/auth'
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore'
import VueKinesis from 'vue-kinesis'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyBGlPfTQpNVpMS3Nu_mpSiEOwIXXE-PE74",
    authDomain: "gemini-movie-detectives.firebaseapp.com",
    projectId: "gemini-movie-detectives",
    storageBucket: "gemini-movie-detectives.appspot.com",
    messagingSenderId: "1041770080046",
    appId: "1:1041770080046:web:b66df3eea3a6421109bcbf"
})

export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const googleAuthProvider = new GoogleAuthProvider()

export function signinRedirect() {
    return signInWithRedirect(auth, googleAuthProvider)
}

export async function handleRedirectResult() {
    try {
        const result = await getRedirectResult(auth)
        if (result && result.user) {
            const userRef = doc(db, "users", result.user.uid)
            const userDoc = await getDoc(userRef)

            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    name: result.user.displayName,
                    email: result.user.email,
                    score: 0,
                    games: 0,
                    lastLogin: Date.now(),
                    uid: result.user.uid
                })
            } else {
                await setDoc(userRef, {
                    lastLogin: Date.now()
                }, { merge: true })
            }
        }
    } catch (error) {
        console.error('Error handling redirect result:', error.message)
    }
}

export function signOutUser() {
    return auth.signOut()
}

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
}).use(VueKinesis).mount('#app')
