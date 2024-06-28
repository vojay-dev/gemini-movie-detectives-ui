# REFACTORING NOTES

https://codepen.io/1kodum/embed/VwGGXNe?height=300&theme-id=dark&default-tab=result&slug-hash=VwGGXNe&user=1kodum&name=cp_embed_57#result-box
https://codepen.io/1kodum/embed/MWqqXYa?height=300&theme-id=dark&default-tab=result&slug-hash=MWqqXYa&user=1kodum&name=cp_embed_54#result-box
https://codepen.io/jackrugile/embed/GROaam?height=300&default-tab=result&slug-hash=GROaam&user=jackrugile&name=cp_embed_41#result-box
https://codepen.io/ahmadbassamemran/embed/bXRPdr?height=423&theme-id=dark&default-tab=result&slug-hash=bXRPdr&user=ahmadbassamemran&name=cp_embed_29#result-box




# Gemini Movie Detectives UI

**This project was created as part of the [Google AI Hackathon 2024](https://googleai.devpost.com/)**.

![logo](doc/logo.png)

Gemini Movie Detectives is a project aimed at leveraging the power of the Gemini Pro model via VertexAI to
create an engaging quiz game using the latest movie data from The Movie Database (TMDB).

Try it yourself: [movie-detectives.com](https://movie-detectives.com/)

## Backend

The backend infrastructure is built with FastAPI and Python, employing the Retrieval-Augmented Generation (RAG)
methodology to enrich queries with real-time metadata. Utilizing Jinja templating, the backend modularizes
prompt generation into base, personality, and data enhancement templates, enabling the generation of accurate
and engaging quiz questions.

## Frontend

The frontend is powered by Vue 3 and Vite, supported by daisyUI and Tailwind CSS for efficient frontend
development. Together, these tools provide users with a sleek and modern interface for seamless interaction
with the backend.

## Summary

In Movie Detectives, quiz answers are interpreted by the Language Model (LLM) once again, allowing for dynamic
scoring and personalized responses. This showcases the potential of integrating LLM with RAG in game design and
development, paving the way for truly individualized gaming experiences. Furthermore, it demonstrates the
potential for creating engaging quiz trivia or educational games by involving LLM. Adding and changing personalities
or languages is as easy as adding more Jinja template modules. With very little effort, this can change the
full game experience, reducing the effort for developers. Try it yourself and change the AI personality
in the quiz configuration.

![demo](doc/mobile-browser-demo.png)

Backend: [gemini-movie-detectives-api](https://github.com/vojay-dev/gemini-movie-detectives-api)

## Project overview

- VueJS 3.4
- Vite

![system overview](doc/system-overview.png)
*Movie Detectives - System Overview*

## Components

The Movie Detectives frontend is split into four main components and uses vue-router to navigate between them.

### Home

The Home component simply displays the welcome message.

### Quiz

The Quiz component displays the quiz itself and talks to the API via `fetch`. To create a quiz, it sends a POST
request to `api/quiz` with the desired settings. The backend is then selecting a random movie based on the user
settings, creates the prompt with the modular prompt generator, uses Gemini to generate the question and hints and
finally returns everything back to the component so that the quiz can be rendered.

Additionally, each quiz gets a session ID assigned in the backend and is stored in a limited LRU cache.

### Sessions

For debugging purposes, this component fetches data from the `api/sessions` endpoint. This returns all **active**
sessions from the cache.

### Stats

This component displays statistics about the service. However, so far there is only one category of data displayed,
which is the quiz limit. To limit the costs for VertexAI and GCP usage in general, there is a daily limit of quiz
sessions, which will reset with the first quiz of the next day. Data is retrieved form the `api/limit` endpoint.

![system overview](doc/frontend-components.png)
*Movie Detectives - Vue Components*

## Project setup

Ensure to configure the correct API endpoint for local or live usage in `src/config.js`.

```sh
npm install
```

## Run

```sh
npm run dev
```

## Build

```sh
npm run build
```
