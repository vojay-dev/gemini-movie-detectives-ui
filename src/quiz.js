import {API_BASE_URI} from './config.js'
import {getHeaders} from './main.js'

async function getRequestOptions(method, body) {
    return {
        method,
        headers: await getHeaders(),
        body: JSON.stringify(body),
        redirect: 'follow'
    }
}

async function handleFetchResponse(response) {
    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText)
    }
    return response.json()
}

export async function startQuiz(personality, quizType) {
    const url = `${API_BASE_URI}/quiz/${quizType}`
    const requestBody = {
        quiz_type: quizType,
        personality: personality
    }

    try {
        const response = await fetch(url, await getRequestOptions('POST', requestBody))
        const startQuizResponse = await handleFetchResponse(response)

        return {
            quiz_id: startQuizResponse.quiz_id,
            quiz_type: quizType,
            quiz_data: startQuizResponse.quiz_data,
            error: null
        }
    } catch (err) {
        return {
            quiz_id: null,
            quiz_type: quizType,
            quiz_data: null,
            error: err.message
        }
    }
}

export async function finishQuiz(quizId, answer) {
    const url = `${API_BASE_URI}/quiz/${quizId}/answer`
    const requestBody = {
        quiz_id: quizId,
        answer: answer
    }

    try {
        const response = await fetch(url, await getRequestOptions('POST', requestBody))
        const finishQuizResponse = await handleFetchResponse(response)

        return {
            quiz_id: quizId,
            quiz_result: finishQuizResponse.quiz_result,
            error: null
        }
    } catch (err) {
        return {
            quiz_id: quizId,
            quiz_result: null,
            error: err.message
        }
    }
}
