import {createApp} from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import Particles from "@tsparticles/vue3"
import {loadFull} from "tsparticles"
import VueGtag from "vue-gtag"
import {initializeApp} from 'firebase/app'
import {getCurrentUser, VueFire, VueFireAuth} from 'vuefire'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {doc, getDoc} from 'firebase/firestore'
import VueKinesis from 'vue-kinesis'
import {API_BASE_URI} from "./config.js"

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

export function signInUser() {
    return signInWithPopup(auth, new GoogleAuthProvider())
}

export function signOutUser() {
    return auth.signOut()
}

export async function getHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    }

    const currentUser = await getCurrentUser()

    if (currentUser) {
        const token = await currentUser.getIdToken()
        headers['Authorization'] = `Bearer ${token}`

        const userDocRef = doc(db, 'users', currentUser.uid)
        const userDoc = await getDoc(userDocRef)

        if (!userDoc.exists()) {
            // send additional info for new registrations
            headers['X-User-Info'] = JSON.stringify({
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
            })
        }
    }

    return headers
}

export async function fetchProfile() {
    let profile = null
    let error = null
    let signedOut = false

    try {
        const response = await fetch(`${API_BASE_URI}/profile`, { headers: await getHeaders(), redirect: 'follow' })

        if (response.status === 401) {
            signedOut = true
            throw new Error('Unauthorized access')
        }

        if (!response.ok) {
            throw new Error('Failed to fetch profile')
        }

        profile = await response.json()
    } catch (err) {
        error = err.message
    }

    return {
        profile,
        error,
        signedOut
    }
}

createApp(App).use(router).use(Particles, {
    init: async engine => {
        await loadFull(engine)
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
