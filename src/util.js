import avatar1 from "./assets/cool.jpg";
import avatar2 from "./assets/dad.jpg";
import avatar3 from "./assets/santa.jpg";
import avatar4 from "./assets/prof.jpg";

const randomRobot = Math.floor(Math.random() * 1000)

export async function playAudio(audioUrl) {
    const audio = new Audio(audioUrl)

    if (audio) {
        try {
            await audio.play()
        } catch (err) {
            console.log('could not play audio')
        }
    }
}

export function getBotAvatar(personality) {
    switch (personality) {
        case 'default': return avatar1
        case 'dad': return avatar2
        case 'christmas': return avatar3
        case 'scientist': return avatar4
        default: return `https://robohash.org/${randomRobot.value}`
    }
}
